/* ===== AI 批改：托福 Write an Email（後端 Apps Script → Vertex AI Gemini，評分標準見 apps-script/Ai.gs）
   作答時計時（隨機組卷只計時；正式模擬卷限時 7 分鐘、時間到自動送出）→ 交出後 AI 批改 → 顯示：
   估分卡、一句診斷、任務檢核、原文標註＋錯誤清單、語域檢查、替換字、錯誤日誌與分數趨勢、5 分鐘限時重寫、C1／C2 範文 ===== */
const EMAIL_LIMIT = 420, REWRITE_LIMIT = 300;
const AI_DIMS = [["task", "A 任務達成與內容發展"], ["register", "B 社交慣例與語域"], ["syntax", "C 句法多樣性與用字"], ["accuracy", "D 語言正確性"]];
const AI_LEVEL = { 5: "完全成功", 4: "大致成功", 3: "部分成功", 2: "大多不成功", 1: "不成功", 0: "無法計分" };
const AI_STATUS = { ok: ["✅", "完整"], thin: ["⚠️", "偏薄"], missing: ["❌", "缺漏"] };
const AI_SEV = { red: ["🔴", "影響理解，必改"], orange: ["🟠", "明顯錯誤，會扣分"], yellow: ["🟡", "小失誤或可以更好"] };
const isEmailQ = q => q && q.type === "essay" && !!q.mail;
const bodyWords = t => wcount(String(t || "").split("\n").filter((l, k, arr) => !(k === 0 && /^(dear|hi|hello|to)\b/i.test(l.trim())) && !(k >= arr.length - 3 && /^(best|sincerely|regards|kind regards|thanks|thank you|cheers|warm|all the best|wishing)/i.test(l.trim()) && l.trim().split(/\s+/).length <= 4)).join(" "));
const aiBand = s => s % 1 ? `介於「${AI_LEVEL[Math.ceil(s)]}」與「${AI_LEVEL[Math.floor(s)]}」之間` : AI_LEVEL[s] || "";

/* ---------- 作答畫面 ---------- */
function emailHTML(X, i, a, st, m) {
  const q = X.q, res = a && a.resp, sub = !!a || st.submitted, txt = res ? res.text : (st.val || "");
  const secs = res ? (res.secs || 0) : (st.secs || 0), mock = S.mock, left = EMAIL_LIMIT - secs;
  let h = `<div class="eyebrow">Write an Email${mock ? "・限時 7 分鐘" : ""}</div><div class="stem" style="font-size:17px">${esc(q.prompt)}</div>
  <div class="boxed" style="font-size:16px" data-ctx>${wrapWords(q.scenario, m)}<ul style="margin:8px 0 0;padding-left:22px">${q.bullets.map(b => `<li data-ctx>${wrapWords(b, m)}</li>`).join("")}</ul></div>
  <div class="mailhead"><div><span>To</span>${esc(q.mail.to)}</div><div><span>Subject</span>${esc(q.mail.subject)}</div></div>`;
  if (!sub) h += `<div class="etimer ${mock && left < 60 ? "low" : !mock && secs > EMAIL_LIMIT ? "over" : ""}" id="etime">${emailTimerText(secs, mock)}</div>`;
  h += `<textarea class="field essay" id="essayin" spellcheck="false" autocorrect="off" autocapitalize="sentences" placeholder="Dear …," ${sub ? "readonly" : ""}>${esc(txt)}</textarea>
  <div class="muted tnum" id="wc" style="font-size:13.5px">${wcount(txt)} 字・本文約 ${bodyWords(txt)} 字（建議 100～130 字）</div>`;
  if (!sub) return h + `<div class="row"><button class="btn primary" data-act="ai-submit">${I.check}寫好了，交給 AI 批改</button></div>
    <div class="muted" style="font-size:12.5px">AI 依 ETS 官方 0～5 分標準批改，約需 30～90 秒；老師之後也會再看。練習時建議關掉自動校正。</div>`;
  if (st.aiBusy && !a) return h + aiBusyHTML("AI 正在依 ETS 標準批改你的 Email…");
  if (!a) return h + `<div class="feedback no"><span class="fb-ic">${I.x}</span><div><b>AI 批改沒有完成</b><p>${esc(aiErrText(st.aiErr))}</p></div></div>
    <div class="row"><button class="btn primary" data-act="ai-retry">再試一次</button></div>
    <div class="muted" style="font-size:13px">也可以先看範文自評，之後老師會批改：</div>${modelsHTML(q)}${selfButtonsHTML(q, X.bank, "essay-rate")}`;
  if (!res.ai) return h + modelsHTML(q);   // 舊紀錄或自評（沒有 AI 結果）
  return h + aiFeedbackHTML(q, res, { who: S.who, live: true, i }) + rewriteHTML(q, res, st, i) + modelsHTML(q);
}
function emailTimerText(secs, mock) {
  return mock ? `${I.flag}剩 <b class="tnum">${fmtTime(Math.max(0, EMAIL_LIMIT - secs))}</b>・時間到會自動送出`
    : `本題用時 <b class="tnum">${fmtTime(secs)}</b> / 建議 7:00${secs > EMAIL_LIMIT ? `・已超過 ${fmtTime(secs - EMAIL_LIMIT)}` : ""}`;
}
function aiBusyHTML(msg) { return `<div class="ai-busy glass"><span class="ai-spin"></span><div><b>${esc(msg)}</b><div class="muted" style="font-size:13px">大約 30～90 秒，可以先看其他題，批完會自動顯示。</div></div></div>`; }
function aiErrText(e) {
  return { busy: "現在批改的人太多，請稍後再試。", "limit-1h": "AI 批改每小時最多 3 篇，請到下一個整點再試（可以先看範文自評）。", "limit-5h": "AI 批改每 5 小時最多 10 篇，請稍後再試（可以先看範文自評）。", empty: "內容太短，AI 無法批改。", "wrong code": "個人代碼不對，請到「紀錄」頁確認代碼。", "no such name": "這個名字還沒登記，請先完成一次作答讓系統產生代碼。", offline: "沒有網路連線。" }[e] || "連線逾時或發生錯誤，請再試一次。";
}
function modelsHTML(q) {
  if (!q.models) return q.model ? `<div class="model"><div class="step-label">參考範文</div><div class="ptext" style="font-size:16px">${esc(q.model)}</div></div>` : "";
  return `<div class="ai-sec"><h4>📝 範文（C1／C2）</h4><div class="muted" style="font-size:13px">C1 約等於寫作 band 5～5.5、C2 約等於 band 6。比較兩篇的句型和用字差在哪裡。</div>
  ${Object.entries(q.models).map(([lv, t]) => `<details class="pfold model-fold" data-key="m-${lv}"><summary><span><b>${lv} 等級範文</b><span class="muted" style="font-size:13px">・本文約 ${bodyWords(t)} 字</span></span>${I.chevR.replace("<svg", '<svg width="16" height="16"')}</summary><div class="ptext mail-model">${esc(t)}</div></details>`).join("")}
  ${q.exp ? `<div class="muted" style="font-size:13.5px">💡 ${esc(q.exp)}</div>` : ""}</div>`;
}

/* ---------- 批改結果 ---------- */
function aiFeedbackHTML(q, res, opt = {}) {
  const ai = res.ai, secs = res.secs || 0, wc = bodyWords(res.text);
  const dimRow = ([k, n]) => { const d = (ai.dims || {})[k] || {}; const v = Number(d.score) || 0;
    return `<div class="ai-dim"><div class="ai-dim-h"><span>${n}</span><b class="tnum" style="color:${scoreColor(v / 5)}">${v}</b></div><div class="sk-bar"><i style="width:${v / 5 * 100}%;background:${scoreColor(v / 5)}"></i></div><div class="muted" style="font-size:13px">${esc(d.comment || "")}</div></div>`; };
  let h = `<div class="ai-card glass">
  <div class="ai-score"><div class="ai-big" style="color:${scoreColor(ai.score / 5)}">${ai.score}<span>/ 5</span></div><div><div class="eyebrow">📊 AI 估分・ETS Write an Email</div><b style="font-size:18px">${esc(aiBand(ai.score))}</b>
    <div class="row" style="gap:6px;margin-top:6px"><span class="tag">本文 ${wc} 字${wc < 80 ? "・偏少" : wc > 150 ? "・偏多" : ""}</span><span class="tag ${secs > EMAIL_LIMIT ? "warn" : ""}">${secs > EMAIL_LIMIT ? "⏱️ " : ""}用時 ${fmtTime(secs)}${secs > EMAIL_LIMIT ? `（超過 ${fmtTime(secs - EMAIL_LIMIT)}）` : ""}</span></div></div></div>
  <div class="ai-dims">${AI_DIMS.map(dimRow).join("")}</div>
  ${ai.caps && ai.caps.length ? `<div class="ai-caps"><b>觸發封頂規則</b>${ai.caps.map(c => `<div>• ${esc(c)}</div>`).join("")}</div>` : ""}
  <div class="ai-diag">🎯 <b>一句診斷：</b>${esc(ai.diagnosis || "")}</div>
  ${(ai.strengths || []).length ? `<div class="ai-good">${ai.strengths.map(s => `<div>🟢 ${esc(s)}</div>`).join("")}</div>` : ""}</div>`;
  h += `<div class="ai-sec"><h4>✅ 任務檢核</h4><div class="ai-points">${(ai.points || []).map((p, k) => { const s = AI_STATUS[p.status] || AI_STATUS.thin;
    return `<div class="ai-point ${p.status}"><div class="ai-pt-h"><span>${s[0]} ${s[1]}</span><b>要點 ${k + 1}：${esc(p.point)}</b></div>${p.quote ? `<div class="ai-quote">「${esc(p.quote)}」</div>` : `<div class="ai-quote muted">（沒有回應這一點）</div>`}<div class="muted" style="font-size:13.5px">${esc(p.note)}</div></div>`; }).join("")}</div></div>`;
  const errs = ai.errors || [];
  h += `<div class="ai-sec"><h4>🔍 原文標註與錯誤清單</h4><div class="muted" style="font-size:12.5px">${Object.values(AI_SEV).map(([e, t]) => `${e} ${t}`).join("　")}</div>
  <div class="ptext ai-essay">${markEssay(res.text, errs)}</div>
  ${errs.length ? `<ol class="ai-errs">${errs.map((e, k) => `<li id="aie-${opt.i ?? "x"}-${k}"><span class="ai-sev"><b class="tnum">${k + 1}</b>${(AI_SEV[e.severity] || AI_SEV.yellow)[0]}</span><div><div><s>${esc(e.original)}</s> → <b>${esc(e.corrected)}</b></div><div class="muted" style="font-size:13px">${esc(e.category || "")}｜${esc(e.rule)}</div></div></li>`).join("")}</ol>` : `<div class="muted">沒有找到明顯錯誤，做得好！</div>`}</div>`;
  const rc = ai.registerCheck || {};
  h += `<div class="ai-sec"><h4>🗣️ 語域檢查</h4><dl class="kv ai-kv"><dt>稱謂</dt><dd>${esc(rc.greeting || "")}</dd><dt>結尾署名</dt><dd>${esc(rc.closing || "")}</dd><dt>請求句</dt><dd>${esc(rc.requests || "")}</dd><dt>語氣跳動</dt><dd>${esc(rc.toneShifts || "")}</dd></dl></div>`;
  if ((ai.upgrades || []).length) h += `<div class="ai-sec"><h4>🔄 替換字</h4><div class="ai-ups">${ai.upgrades.map(u => `<div class="ai-up"><div><s>${esc(u.vague)}</s> → <b>${esc(u.better)}</b></div><div class="muted" style="font-size:13.5px">${esc(u.example)}</div></div>`).join("")}</div></div>`;
  if (ai.nextFocus) h += `<div class="ai-next">📌 <b>下一篇只練一件事：</b>${esc(ai.nextFocus)}</div>`;
  if (opt.who !== undefined && !opt.noLog) h += emailLogHTML(opt.who, opt.atts);
  return h;
}
/* 原文標註：把 AI 指出的錯誤片段在原文裡標色（找不到的片段只列在清單） */
function markEssay(text, errs) {
  const spans = []; const lower = String(text);
  errs.forEach((e, k) => {
    const o = String(e.original || "").trim(); if (!o) return;
    let from = 0, at = -1;
    while ((at = lower.indexOf(o, from)) >= 0 && spans.some(s => at < s.end && at + o.length > s.start)) from = at + 1;
    if (at < 0) { const re = new RegExp(o.replace(/[.*+?^${}()|[\]\\]/g, "\\$&").replace(/\s+/g, "\\s+"), "i"), mm = re.exec(lower); if (mm && !spans.some(s => mm.index < s.end && mm.index + mm[0].length > s.start)) at = mm.index, spans.push({ start: at, end: at + mm[0].length, k, sev: e.severity }); return; }
    spans.push({ start: at, end: at + o.length, k, sev: e.severity });
  });
  spans.sort((a, b) => a.start - b.start);
  let out = "", p = 0;
  spans.forEach(s => { out += esc(lower.slice(p, s.start)) + `<mark class="m-${s.sev}" title="${esc(errs[s.k].corrected)}">${esc(lower.slice(s.start, s.end))}<sup>${s.k + 1}</sup></mark>`; p = s.end; });
  return out + esc(lower.slice(p));
}

/* ---------- 5 分鐘限時重寫 ---------- */
function rewriteHTML(q, res, st, i) {
  const rws = res.rewrites || [], rw = st.rw;
  let h = `<div class="ai-sec"><h4>✍️ 限時重寫（5 分鐘）</h4>`;
  if (rws.length) h += rws.map((r, k) => { const prev = k ? rws[k - 1].ai.score : res.ai.score, d = r.ai.score - prev;
    return `<details class="pfold rw-fold" data-key="rw-${k}"><summary><span>第 ${k + 1} 次重寫：<b style="color:${scoreColor(r.ai.score / 5)}">${r.ai.score} / 5</b> <span class="tag ${d > 0 ? "up" : d < 0 ? "down" : ""}">${d > 0 ? "📈 +" + d : d < 0 ? "📉 " + d : "➖ 持平"}</span><span class="muted" style="font-size:13px">・用時 ${fmtTime(r.secs || 0)}</span></span>${I.chevR.replace("<svg", '<svg width="16" height="16"')}</summary>
    ${aiFeedbackHTML(q, r, { noLog: true, i: i + "r" + k })}</details>`; }).join("");
  if (rw && rw.busy) return h + aiBusyHTML("AI 正在批改你的重寫…") + `</div>`;
  if (rw && !rw.done) return h + `<div class="muted" style="font-size:13.5px">參考上面的回饋，同一題在 5 分鐘內重寫一次，時間到會自動送出。</div>
    <div class="etimer ${REWRITE_LIMIT - (rw.secs || 0) < 60 ? "low" : ""}" id="rwtime">${I.flag}剩 <b class="tnum">${fmtTime(Math.max(0, REWRITE_LIMIT - (rw.secs || 0)))}</b></div>
    <textarea class="field essay" id="rwin" spellcheck="false" autocorrect="off" placeholder="重寫你的 Email…">${esc(rw.val || "")}</textarea>
    ${rw.err ? `<div class="muted" style="color:var(--bad)">${esc(aiErrText(rw.err))}</div>` : ""}
    <div class="row"><button class="btn primary" data-act="rw-submit">送出重寫</button></div></div>`;
  return h + `<div class="row"><button class="btn" data-act="rw-start">${I.redo}${rws.length ? "再重寫一次" : "開始 5 分鐘重寫"}</button></div></div>`;
}

/* ---------- 錯誤日誌與分數趨勢（同一個名字的所有 Email） ---------- */
function emailHistory(who, atts) {
  const list = [];
  const take = (att, date) => (att.qs || []).forEach((r, i) => { const a = (att.ans || {})[i], X = a && getQ(i, att); if (X && isEmailQ(X.q) && a.resp && a.resp.ai) list.push({ date, ai: a.resp.ai, rewrites: a.resp.rewrites || [] }); });
  (atts || store.attempts.filter(x => (x.who || "未署名") === (who || "未署名"))).forEach(att => take(att, att.date || 0));
  if (!atts && S && S.who === who && !store.attempts.some(x => x.id === S.id)) take(S, Date.now());
  return list.sort((a, b) => a.date - b.date);
}
function emailLogHTML(who, atts) {
  const hist = emailHistory(who, atts); if (!hist.length) return "";
  const cats = {};
  hist.forEach((e, n) => (e.ai.errors || []).forEach(x => { const c = x.category || "其他", o = cats[c] || (cats[c] = { n: 0, essays: new Set(), last: null, lastN: -1 }); o.n++; o.essays.add(n); o.last = x; o.lastN = n; }));
  const N = hist.length, rows = Object.entries(cats).map(([c, o]) => ({ c, ...o, status: N - 1 - o.lastN >= 3 ? "🟢" : (o.essays.size > 1 || o.n >= 2) ? "🔴" : "🟡" })).sort((a, b) => ({ "🔴": 0, "🟡": 1, "🟢": 2 }[a.status] - { "🔴": 0, "🟡": 1, "🟢": 2 }[b.status]) || b.n - a.n);
  const recent = hist.slice(-10), W = 100 / Math.max(recent.length, 1);
  const bars = recent.map((e, k) => `<div class="tr-col" style="width:${W}%"><div class="tr-bar" style="height:${e.ai.score / 5 * 100}%;background:${scoreColor(e.ai.score / 5)}"><span>${e.ai.score}</span></div><div class="tr-x">${k + 1}</div></div>`).join("");
  const dimAvg = AI_DIMS.map(([k, n]) => { const last = recent.slice(-3), v = last.reduce((s, e) => s + (Number((e.ai.dims || {})[k] && e.ai.dims[k].score) || 0), 0) / last.length; return [n, Math.round(v * 10) / 10]; });
  return `<div class="ai-sec ai-log"><h4>📒 ${esc(who || "")} 的 Email 錯誤日誌與分數趨勢</h4>
  <div class="muted" style="font-size:12.5px">累積 ${N} 篇。🔴 重複出現　🟡 偶爾出現　🟢 連續 3 篇沒再犯</div>
  ${rows.length ? `<table class="vtable ai-logt"><thead><tr><th>狀態</th><th>錯誤類型</th><th>次數</th><th>最近一次</th></tr></thead><tbody>${rows.map(r => `<tr><td>${r.status}</td><td>${esc(r.c)}</td><td class="tnum">${r.n}</td><td><s>${esc(r.last.original)}</s> → <b>${esc(r.last.corrected)}</b></td></tr>`).join("")}</tbody></table>` : ""}
  <div class="step-label" style="margin-top:6px">最近 ${recent.length} 篇任務分</div><div class="trend">${bars}</div>
  <div class="ai-dimavg">${dimAvg.map(([n, v]) => `<span class="tag">${esc(n.split(" ")[0])} ${esc(n.split(" ")[1])} ${v}</span>`).join("")}<span class="muted" style="font-size:12px">（最近 3 篇平均）</span></div></div>`;
}

/* ---------- 計時、送出、重寫 ---------- */
function emailTick() {
  if (!S || view !== "quiz") return;
  const i = S.idx, X = getQ(i); if (!X || !isEmailQ(X.q)) return;
  const w = work(i);
  if (!S.ans[i] && !w.submitted) {
    w.secs = (w.secs || 0) + 1;
    const el = $("#etime"); if (el) { el.innerHTML = emailTimerText(w.secs, S.mock); el.classList.toggle("low", S.mock && EMAIL_LIMIT - w.secs < 60); el.classList.toggle("over", !S.mock && w.secs > EMAIL_LIMIT); }
    if (S.mock && w.secs >= EMAIL_LIMIT) { toast("7 分鐘到，自動送出"); emailSubmit(true); }
  } else if (w.rw && !w.rw.done && !w.rw.busy) {
    w.rw.secs = (w.rw.secs || 0) + 1; const inp = $("#rwin"); if (inp) w.rw.val = inp.value;
    const el = $("#rwtime"); if (el) { el.innerHTML = `${I.flag}剩 <b class="tnum">${fmtTime(Math.max(0, REWRITE_LIMIT - w.rw.secs))}</b>`; el.classList.toggle("low", REWRITE_LIMIT - w.rw.secs < 60); }
    if (w.rw.secs >= REWRITE_LIMIT) { toast("5 分鐘到，自動送出重寫"); rewriteSubmit(true); }
  }
}
function emailSubmit(auto) {
  const i = S.idx, w = work(i), inp = $("#essayin"); if (inp) w.val = inp.value;
  if (!auto && wcount(w.val) < 5) { toast("先寫幾句再交出"); return; }
  w.submitted = true; save(true); aiRun(S, i, "first");
}
function rewriteSubmit(auto) {
  const w = work(S.idx), inp = $("#rwin"); if (inp) w.rw.val = inp.value;
  if (!auto && wcount(w.rw.val) < 5) { toast("先寫幾句再送出"); return; }
  aiRun(S, S.idx, "rw");
}
async function aiRun(sess, i, mode) {
  const X = getQ(i, sess), q = X.q, w = sess.work[i] || (sess.work[i] = {}), rw = mode === "rw";
  const text = rw ? w.rw.val : w.val, secs = rw ? w.rw.secs : w.secs;
  const refresh = () => { save(true); if (S === sess && view === "quiz") rerenderKeep(); };
  if (rw) { w.rw.busy = true; w.rw.err = ""; } else { w.aiBusy = true; w.aiErr = ""; }
  refresh();
  const payload = { action: "aigrade", kind: "email", name: sess.who, code: store.codes[sess.who] || "", essay: text, secs,
    task: { scenario: q.scenario, bullets: q.bullets, to: q.mail.to, subject: q.mail.subject } };
  if (!payload.code && store.teacherCode) payload.teacherCode = store.teacherCode;
  try {
    if (typeof SYNC_ON === "undefined" || !SYNC_ON) { const e = new Error("offline"); e.server = true; throw e; }
    if (!payload.code && !payload.teacherCode && typeof ensureCode === "function") { await ensureCode(sess.who); payload.code = store.codes[sess.who] || ""; }
    const r = await postSync(payload, 300000), ai = r.result;
    ai.score = Math.max(0, Math.min(5, Math.round(Number(ai.score) * 2) / 2 || 0));
    if (rw) { const a = sess.ans[i]; (a.resp.rewrites || (a.resp.rewrites = [])).push({ text, secs, ai, model: r.model }); w.rw = null; }
    else {
      const resp = { text, level: ai.score, ai, model: r.model, secs }, correct = grade(q, resp);
      sess.ans[i] = { resp, correct, hint: false, t: Math.round(sess.elapsed), max: maxPts(q, X.bank), sys: correct, ai: true };
      sess.ans[i].pts = ptsOf(q, X.bank, sess.ans[i]); w.aiBusy = false;
      if (S === sess && sess.idx === i) sfxGood(1);
    }
  } catch (e) {
    const msg = e.server ? e.message : e.name === "AbortError" ? "timeout" : "error";
    if (rw) { if (w.rw) { w.rw.busy = false; w.rw.err = msg; } } else { w.aiBusy = false; w.aiErr = msg; }
  }
  refresh();
}

document.addEventListener("click", e => {
  const act = e.target.closest("[data-act]"); if (!act || !S) return;
  const a = act.dataset.act;
  if (a === "ai-submit") emailSubmit(false);
  if (a === "ai-retry") { const w = work(S.idx); aiRun(S, S.idx, "first"); }
  if (a === "rw-start") { const w = work(S.idx); w.rw = { secs: 0, val: "" }; save(); rerenderKeep(); setTimeout(() => { const t = $("#rwin"); if (t) t.focus(); }, 50); }
  if (a === "rw-submit") rewriteSubmit(false);
});
document.addEventListener("input", e => {
  if (!S || !e.target) return;
  if (e.target.id === "rwin") { const w = work(S.idx); if (w.rw) w.rw.val = e.target.value; }
  if (e.target.id === "essayin" && isEmailQ((getQ(S.idx) || {}).q)) { const c = $("#wc"); if (c) c.textContent = `${wcount(e.target.value)} 字・本文約 ${bodyWords(e.target.value)} 字（建議 100～130 字）`; }
});

/* ---------- 解析頁、老師批改頁 ---------- */
function rewritesStaticHTML(q, res, key) {
  return (res.rewrites || []).map((r, k) => { const prev = k ? res.rewrites[k - 1].ai.score : res.ai.score, d = r.ai.score - prev;
    return `<details class="pfold rw-fold" data-key="${key}-rw-${k}"><summary><span>第 ${k + 1} 次限時重寫：<b style="color:${scoreColor(r.ai.score / 5)}">${r.ai.score} / 5</b> <span class="tag ${d > 0 ? "up" : d < 0 ? "down" : ""}">${d > 0 ? "📈 +" + d : d < 0 ? "📉 " + d : "➖ 持平"}</span></span>${I.chevR.replace("<svg", '<svg width="16" height="16"')}</summary>
    ${aiFeedbackHTML(q, r, { noLog: true, i: key + "r" + k })}</details>`; }).join("");
}
function aiReviewHTML(q, a, att, i) {
  const res = a && a.resp;
  if (!res || !res.ai) return modelsHTML(q);
  const who = att.who || "未署名", remote = typeof isRemote === "function" && isRemote(att);
  const pool = (remote && typeof allAttempts === "function" ? allAttempts() : store.attempts).filter(x => (x.who || "未署名") === who);
  return `<div class="ai-review">${aiFeedbackHTML(q, res, { who, atts: pool, i: "v" + i })}${rewritesStaticHTML(q, res, "v" + i)}${modelsHTML(q)}</div>`;
}
