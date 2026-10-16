/* ===== 成績同步（Google 試算表 / Apps Script）＋ 個人代碼 ===== */
const SYNC_ON = !!(SITE_CONFIG.SYNC_URL);
store.outbox = store.outbox || [];
store.codes = store.codes || {};   // 名字 → 個人代碼（像密碼，換裝置時用來找回紀錄）
const CODE_CHARS = "abcdefghjkmnpqrstuvwxyz23456789"; // 拿掉容易看錯的 i l o 0 1
function newCode() { const r = crypto.getRandomValues(new Uint32Array(6)); return [...r].map(x => CODE_CHARS[x % CODE_CHARS.length]).join(""); }
function normCode(s) { return String(s || "").trim().toLowerCase(); }
function validCode(s) { return /^[a-z0-9]{4,12}$/.test(s); }
function compactAttempt(a) { return { id: a.id, optv: a.optv, who: a.who, kind: a.kind, title: a.title, banks: a.banks, date: a.date, duration: a.duration, qs: a.qs, ans: a.ans, words: a.words, maxCombo: a.maxCombo, score: a.score, total: a.total, hints: a.hints }; }
async function postSync(payload, timeout) {
  const ctl = timeout ? new AbortController() : null; const tm = ctl && setTimeout(() => ctl.abort(), timeout);
  try {
    const r = await fetch(SITE_CONFIG.SYNC_URL, { method: "POST", headers: { "Content-Type": "text/plain;charset=utf-8" }, body: JSON.stringify(payload), signal: ctl && ctl.signal });
    const j = await r.json(); if (!j.ok) { const e = new Error(j.error || "sync failed"); e.server = true; throw e; } return j;
  } finally { clearTimeout(tm); }
}
const CODE_ERR = { "wrong code": "代碼不對", "locked": "輸錯太多次，請 10 分鐘後再試", "no such name": "找不到這個名字，請確認和之前輸入的一模一樣", "bad code": "代碼要 4～12 個英文字母或數字" };

/* 開始作答前：這個名字在這台裝置還沒有代碼 → 向後端登記一個新的；名字已被登記 → 請他輸入代碼 */
async function ensureCode(name) {
  if (!SYNC_ON || !name || store.codes[name]) return true;
  const code = newCode();
  try { await postSync({ action: "claim", name, code }, 6000); }
  catch (e) {
    if (e.server && e.message === "taken") { loginSheet(name, "「" + name + "」這個名字已經有人登記了。如果是你，請輸入你的個人代碼；不是你的話，請換個名字（例如加上座號）。"); return false; }
    // 離線或逾時：先用新代碼，交卷同步時會再登記
  }
  store.codes[name] = code; save(true);
  toast(`你的個人代碼是 ${code}，在「紀錄」頁可以查看和修改`);
  return true;
}

let flushing = false;
async function flushOutbox() {
  if (!SYNC_ON || flushing || !store.outbox.length) return;
  flushing = true;
  try {
    while (store.outbox.length) {
      const a = store.outbox[0];
      await postSync({ action: "submit", attempt: a, code: store.codes[a.who] || "" });
      store.outbox.shift(); save(true);
    }
    toast("成績已同步到老師那邊");
  } catch (e) {
    if (e.server && e.message === "wrong code") { const who = store.outbox[0].who; flushing = false; loginSheet(who, `「${who}」的成績還沒上傳：這個名字已經登記過代碼，請輸入你的個人代碼。`); return; }
  }
  flushing = false; if (view === "home" || view === "hist") rerenderKeep();
}
function onAttemptSaved(att) {
  if (!SYNC_ON) return;
  store.outbox.push(compactAttempt(att)); save(true);
  flushOutbox();
}

/* 用代碼找回紀錄（換裝置時）：把雲端紀錄合併進這台裝置，並重建單字本 */
function mergeAttempts(list) {
  const ids = new Set(store.attempts.map(a => a.id)); let n = 0;
  list.forEach(a => {
    if (ids.has(a.id)) return; ids.add(a.id); store.attempts.push(a); n++;
    const VB = store.vocab[a.who] || (store.vocab[a.who] = {});
    Object.values(a.words || {}).forEach(w => {
      const v = VB[w.k] || (VB[w.k] = { k: w.k, pos: w.pos, zh: w.zh, ph: !!w.ph, surf: w.surf || null, n: 0, ctx: [], ok: 0, miss: 0, first: a.date });
      v.n++; v.last = Math.max(v.last || 0, a.date); if (w.ctx && !v.ctx.includes(w.ctx)) v.ctx.push(w.ctx); v.ctx = v.ctx.slice(0, 3);
    });
    if (a.kind === "vocab") (a.qs || []).forEach((q, i) => { const v = VB[q.word]; const r = (a.ans || {})[i]; if (v && r) r.correct ? v.ok++ : v.miss++; });
  });
  store.attempts.sort((a, b) => b.date - a.date);
  return n;
}
function loginSheet(name, msg) {
  sheet(`<h3>用個人代碼找回紀錄</h3><p class="muted" style="margin:0 0 12px">${esc(msg || "在其他裝置做過練習？輸入當時的名字和個人代碼，就能把紀錄找回這台裝置。")}</p>
  <div style="display:flex;flex-direction:column;gap:10px"><input id="lg-name" class="field" placeholder="名字（要和之前一模一樣）" autocomplete="off" maxlength="20" value="${esc(name || "")}">
  <input id="lg-code" class="field" placeholder="個人代碼" autocomplete="off" autocapitalize="off" spellcheck="false" maxlength="12"></div>
  <p class="muted" style="font-size:13px;margin:10px 0 0">忘記代碼的話，請問老師。</p>
  <div class="row" style="justify-content:flex-end;margin-top:12px"><button class="btn" data-act="close-sheet">取消</button><button class="btn primary" data-act="do-login">找回紀錄</button></div>`);
  setTimeout(() => { const f = $(name ? "#lg-code" : "#lg-name"); if (f) f.focus(); }, 50);
}
async function doLogin(btn) {
  const name = (($("#lg-name") || {}).value || "").trim(), code = normCode(($("#lg-code") || {}).value);
  if (!name || !code) { toast("請輸入名字和個人代碼"); return; }
  btn.disabled = true; btn.textContent = "查詢中…";
  try {
    const j = await postSync({ action: "login", name, code }, 15000);
    store.codes[name] = code; store.who = name; store.names = [name, ...store.names.filter(n => n !== name)].slice(0, 8);
    const n = mergeAttempts(j.attempts || []); save(true); closeSheet(); render();
    toast(n ? `找回 ${n} 筆紀錄` : "代碼正確，雲端沒有其他新紀錄");
    flushOutbox();
  } catch (e) { toast(e.server ? (CODE_ERR[e.message] || "找回失敗") : "連不上網路，請稍後再試"); btn.disabled = false; btn.textContent = "找回紀錄"; }
}
function codeEditSheet(name) {
  sheet(`<h3>修改個人代碼</h3><p class="muted" style="margin:0 0 12px">「${esc(name)}」的新代碼：4～12 個英文字母或數字（不分大小寫）。改好之後，換裝置時要用新代碼找回紀錄。</p>
  <input id="cd-new" class="field" placeholder="新代碼" autocomplete="off" autocapitalize="off" spellcheck="false" maxlength="12" value="${esc(store.codes[name] || "")}">
  <div class="row" style="justify-content:flex-end;margin-top:12px"><button class="btn" data-act="close-sheet">取消</button><button class="btn primary" data-act="do-setcode" data-n="${esc(name)}">儲存</button></div>`);
  setTimeout(() => { const f = $("#cd-new"); if (f) { f.focus(); f.select(); } }, 50);
}
async function doSetCode(btn, name) {
  const nc = normCode(($("#cd-new") || {}).value);
  if (!validCode(nc)) { toast(CODE_ERR["bad code"]); return; }
  if (nc === store.codes[name]) { closeSheet(); return; }
  btn.disabled = true; btn.textContent = "儲存中…";
  try {
    await postSync({ action: "setcode", name, code: store.codes[name], newCode: nc }, 15000);
    store.codes[name] = nc; save(true); closeSheet(); render(); toast("代碼已更新");
  } catch (e) {
    if (e.server && e.message === "no such name") { store.codes[name] = nc; save(true); closeSheet(); render(); toast("代碼已更新"); }
    else { toast(e.server ? (CODE_ERR[e.message] || "儲存失敗") : "連不上網路，請稍後再試"); btn.disabled = false; btn.textContent = "儲存"; }
  }
}

function syncHomeHTML() {
  if (!SYNC_ON) return "";
  const n = store.outbox.length;
  return `<div class="muted" style="font-size:13px">${n ? `還有 ${n} 筆成績等待上傳 <button class="chip" data-act="sync-now">重新上傳</button>` : "交卷後成績會自動同步給老師"}・<button class="chip" data-act="login">換裝置？用代碼找回紀錄</button></div>`;
}
function syncHistHTML() {
  if (!SYNC_ON) return "";
  const n = store.outbox.length;
  const who = store.histWho || store.who;
  const code = who && store.codes[who];
  return `<div class="glass card" style="display:flex;flex-direction:column;gap:10px"><div style="font-weight:700">我的個人代碼</div>
  ${code ? `<div class="row" style="align-items:center;gap:12px"><span>${esc(who)}</span><b style="font-size:22px;letter-spacing:.12em;font-family:ui-monospace,Menlo,monospace">${esc(code)}</b><button class="btn ghost" data-act="code-edit" data-n="${esc(who)}">修改</button></div>
  <div class="muted" style="font-size:14px">像密碼一樣，請記下來、不要給別人。換裝置時輸入名字和這個代碼，就能找回紀錄。</div>`
    : `<div class="muted" style="font-size:14px">${who ? `「${esc(who)}」在這台裝置還沒有代碼，開始作答時會自動產生。` : "輸入名字開始作答後，會自動產生個人代碼。"}</div>`}
  <div class="row"><button class="btn" data-act="login">在這台裝置找回其他紀錄</button></div>
  <div class="muted" style="font-size:13px">${n ? `還有 ${n} 筆成績等待上傳（網路恢復後會自動重試） <button class="chip" data-act="sync-now">重新上傳</button>` : "交卷後成績會自動同步給老師，不用另外傳。"}</div></div>`;
}
function syncTeacherHTML() {
  if (!SYNC_ON) return "";
  const st = store.remoteStudents || [];
  return `<div class="glass card" style="display:flex;flex-direction:column;gap:10px"><div style="font-weight:700">雲端成績</div>
  <div class="row"><input id="tcodein" class="field" type="password" placeholder="老師代碼" value="${esc(store.teacherCode || "")}" style="max-width:220px"><button class="btn primary" data-act="sync-pull">${store.remoteAt ? "更新" : "載入"}全班成績</button></div>
  <div class="muted" style="font-size:13px">${store.remoteAt ? `上次更新 ${fmtDate(store.remoteAt)}，共 ${store.remoteCount || 0} 筆` : "輸入老師代碼就能看到所有學生交卷的紀錄"}</div>
  ${st.length ? `<details><summary style="cursor:pointer;font-size:14px">學生個人代碼（${st.length} 人，學生忘記時可以查）</summary>
  <div style="display:grid;grid-template-columns:auto auto;gap:4px 16px;justify-content:start;margin-top:8px;font-size:14px">${st.map(s => `<span>${esc(s.name)}</span><b style="font-family:ui-monospace,Menlo,monospace">${esc(s.code)}</b>`).join("")}</div></details>` : ""}</div>`;
}
async function pullRemote() {
  const code = ($("#tcodein") || {}).value || store.teacherCode;
  if (!code) { toast("請輸入老師代碼"); return; }
  try {
    const r = await fetch(SITE_CONFIG.SYNC_URL + "?action=list&teacherCode=" + encodeURIComponent(code));
    const j = await r.json(); if (!j.ok) throw new Error(j.error || "");
    store.teacherCode = code;
    const imp = store.imported || (store.imported = { attempts: [], vocab: {}, at: 0 });
    const ids = new Set(imp.attempts.map(a => a.id));
    j.attempts.forEach(a => { if (!ids.has(a.id)) { imp.attempts.push(a); ids.add(a.id); } });
    imp.at = store.remoteAt = Date.now(); store.remoteCount = j.attempts.length; store.remoteStudents = j.students || [];
    save(true); render(); toast(`載入 ${j.attempts.length} 筆雲端紀錄`);
  } catch (e) { toast(String(e.message).includes("teacher") ? "老師代碼不對" : "載入失敗，請檢查網路"); }
}
document.addEventListener("click", e => {
  const act = e.target.closest("[data-act]"); if (!act) return;
  const a = act.dataset.act;
  if (a === "sync-now") flushOutbox();
  if (a === "sync-pull") pullRemote();
  if (a === "tab" && act.dataset.v === "teacher" && store.teacherCode) setTimeout(pullRemote, 0);
  if (a === "login") loginSheet(store.who);
  if (a === "do-login") doLogin(act);
  if (a === "code-edit") codeEditSheet(act.dataset.n);
  if (a === "do-setcode") doSetCode(act, act.dataset.n);
});
document.addEventListener("keydown", e => {
  if (e.key !== "Enter") return;
  if (e.target.id === "lg-code" || e.target.id === "lg-name") { const b = document.querySelector('[data-act="do-login"]'); if (b) b.click(); }
  if (e.target.id === "cd-new") { const b = document.querySelector('[data-act="do-setcode"]'); if (b) b.click(); }
});
addEventListener("online", flushOutbox);
setTimeout(flushOutbox, 1500);
if (typeof render === "function" && view === "home") render();
