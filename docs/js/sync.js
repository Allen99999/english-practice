/* ===== 成績同步（Google 試算表 / Apps Script） ===== */
const SYNC_ON = !!(SITE_CONFIG.SYNC_URL);
store.outbox = store.outbox || [];
function compactAttempt(a) { return { id: a.id, optv: a.optv, who: a.who, kind: a.kind, title: a.title, banks: a.banks, date: a.date, duration: a.duration, qs: a.qs, ans: a.ans, words: a.words, maxCombo: a.maxCombo, score: a.score, total: a.total, hints: a.hints }; }
async function postSync(payload) {
  const r = await fetch(SITE_CONFIG.SYNC_URL, { method: "POST", headers: { "Content-Type": "text/plain;charset=utf-8" }, body: JSON.stringify(payload) });
  const j = await r.json(); if (!j.ok) throw new Error(j.error || "sync failed"); return j;
}
let flushing = false;
async function flushOutbox() {
  if (!SYNC_ON || flushing || !store.outbox.length) return;
  flushing = true;
  try {
    while (store.outbox.length) {
      await postSync({ action: "submit", attempt: store.outbox[0] });
      store.outbox.shift(); save(true);
    }
    toast("成績已同步到老師那邊");
  } catch (e) { }
  flushing = false; if (view === "home") rerenderKeep();
}
function onAttemptSaved(att) {
  if (!SYNC_ON) return;
  store.outbox.push(compactAttempt(att)); save(true);
  flushOutbox();
}
function syncHomeHTML() {
  if (!SYNC_ON) return "";
  const n = store.outbox.length;
  return `<div class="muted" style="font-size:13px">${n ? `還有 ${n} 筆成績等待上傳 <button class="chip" data-act="sync-now">重新上傳</button>` : "交卷後成績會自動同步給老師"}</div>`;
}
function syncTeacherHTML() {
  if (!SYNC_ON) return "";
  return `<div class="glass card" style="display:flex;flex-direction:column;gap:10px"><div style="font-weight:700">雲端成績</div>
  <div class="row"><input id="tcodein" class="field" type="password" placeholder="老師代碼" value="${esc(store.teacherCode || "")}" style="max-width:220px"><button class="btn primary" data-act="sync-pull">${store.remoteAt ? "更新" : "載入"}全班成績</button></div>
  <div class="muted" style="font-size:13px">${store.remoteAt ? `上次更新 ${fmtDate(store.remoteAt)}，共 ${store.remoteCount || 0} 筆` : "輸入老師代碼就能看到所有學生交卷的紀錄"}</div></div>`;
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
    imp.at = store.remoteAt = Date.now(); store.remoteCount = j.attempts.length;
    save(true); render(); toast(`載入 ${j.attempts.length} 筆雲端紀錄`);
  } catch (e) { toast(String(e.message).includes("teacher") ? "老師代碼不對" : "載入失敗，請檢查網路"); }
}
document.addEventListener("click", e => {
  const act = e.target.closest("[data-act]"); if (!act) return;
  if (act.dataset.act === "sync-now") flushOutbox();
  if (act.dataset.act === "sync-pull") pullRemote();
});
addEventListener("online", flushOutbox);
setTimeout(flushOutbox, 1500);
if (typeof render === "function" && view === "home") render();
