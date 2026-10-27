/* ===== 英檢初級口說 AI 批改（畫面）：後端 apps-script/AiSpeak.gs；評分規則見本機「全民英檢初級口說 評分與回饋系統.md」
   練習：錄完自動送 AI（複誦、回答約 3～5 秒；朗讀約 15～35 秒），AI 分數就是這題的分數；AI 不能用時才退回自評。
   正式模擬卷：考試中在背景批改、不顯示結果；交卷前等批改完成，再整理整份口說的官方換算與總回饋。 ===== */
const GSA_SUB = { "g-repeat": "repeat", "g-read": "read", "g-answer": "answer" };
const GSA_CODE = { P1: "尾音", P2: "th 音", P3: "v／f／w 音", P4: "l／r／n 音", P5: "母音", P6: "單字重音", P7: "句子語調", P8: "字尾 -s／-ed", P9: "節奏與連音",
  F1: "停頓", F2: "速度", F3: "重複、um", C1: "漏字", C2: "加字或換字", C3: "數字時間唸法",
  G1: "動詞時間", G2: "主詞動詞搭配", G3: "be 動詞混用", G4: "單複數", G5: "a／an／the", G6: "介系詞", G7: "詞性", G8: "句子不完整", G9: "語序", G11: "助動詞與問句", V1: "用字", V2: "中式英文" };
const gsaKind = c => /^P/.test(c) ? "pr" : /^F/.test(c) ? "fl" : /^C/.test(c) ? "ct" : "gr";   // 顏色分類：發音、流利、內容、文法用字
const GSA_SEG = { ok: ["ok", "唸得好"], minor: ["mi", "小問題"], major: ["ma", "要改"], skipped: ["sk", "沒唸到"] };
const GSA_TONE = { flat: "語調太平", wrong: "語調方向不對" };
const GSA_BUSY = new Map();   // "作答id:第一題" → Promise（批改中）

/* ---------- 錄音數據：說話秒數、停頓（音量偵測，不用 AI） ---------- */
async function gsaMetrics(blob) {
  try {
    const AC = window.OfflineAudioContext || window.webkitOfflineAudioContext, ab = await new AC(1, 16000, 16000).decodeAudioData(await blob.arrayBuffer());
    const d = ab.getChannelData(0), sr = ab.sampleRate, hop = Math.max(1, Math.round(sr * 0.02)), n = Math.floor(d.length / hop), rms = new Float32Array(n);
    for (let f = 0; f < n; f++) { let s = 0; for (let k = f * hop; k < (f + 1) * hop; k++) s += d[k] * d[k]; rms[f] = Math.sqrt(s / hop); }
    const srt = Array.from(rms).sort((a, b) => a - b), floor = srt[Math.floor(n * 0.1)] || 0, peak = srt[Math.floor(n * 0.98)] || 0;
    const dur = Math.round(ab.duration * 10) / 10;
    if (peak < 0.006) return { dur, speech: 0, pauses: 0, longest: 0, onset: 0, span: 0 };   // 幾乎沒有聲音
    const thr = Math.max(0.005, floor * 2.5, peak * 0.05), segs = [];
    for (let f = 0; f < n; f++) if (rms[f] > thr) { const t = f * 0.02, last = segs[segs.length - 1]; if (last && t - last[1] < 0.25) last[1] = t + 0.02; else segs.push([t, t + 0.02]); }
    const sp = segs.filter(s => s[1] - s[0] >= 0.1);
    if (!sp.length) return { dur, speech: 0, pauses: 0, longest: 0, onset: 0, span: 0 };
    const gaps = sp.slice(1).map((s, k) => s[0] - sp[k][1]).filter(g => g >= 0.6), r1 = x => Math.round(x * 10) / 10;
    return { dur, speech: r1(sp.reduce((t, s) => t + s[1] - s[0], 0)), pauses: gaps.length, longest: r1(gaps.length ? Math.max(...gaps) : 0), onset: r1(sp[0][0]), span: r1(sp[sp.length - 1][1] - sp[0][0]) };   // span：第一個字到最後一個字（算語速）
  } catch (e) { return null; }
}
const gsaB64 = blob => new Promise((ok, no) => { const fr = new FileReader(); fr.onload = () => ok(String(fr.result).split(",")[1]); fr.onerror = no; fr.readAsDataURL(blob); });
const gsaOn = () => typeof SYNC_ON !== "undefined" && SYNC_ON;
function gsaSpan(sess, i) { const X = getQ(i, sess); if (!X || !X.group) return [i]; return sess.qs.map((_, k) => k).filter(k => { const y = getQ(k, sess); return y && y.group === X.group; }); }

/* ---------- 送 AI 批改；結果寫進這題（朗讀 6 題一起）的答案 ---------- */
function gsaRun(sess, i, blob) {
  const span = gsaSpan(sess, i), a0 = span[0], key = sess.id + ":" + a0;
  if (GSA_BUSY.has(key)) return GSA_BUSY.get(key);
  const X = getQ(a0, sess), q = X.q, sub = GSA_SUB[q.mode], w = sess.work[a0] || (sess.work[a0] = {});
  const refresh = () => { save(true); if (S === sess && view === "quiz" && span.includes(sess.idx) && !(GSP && GSP.phase === "rec")) rerenderKeep(); };
  w.gsaErr = "";
  const job = (async () => {
    await null;   // 先登記「批改中」再更新畫面（不然畫面要等批完才出現狀態）
    try {
      if (!gsaOn()) { const e = new Error("offline"); e.server = true; throw e; }
      const metrics = await gsaMetrics(blob);
      const payload = { action: "aigrade", kind: "gept-speak", sub, name: sess.who, code: store.codes[sess.who] || "", mime: blob.type || "audio/webm", audio: await gsaB64(blob),
        task: sub === "read" ? { segs: X.group.passage } : sub === "answer" ? { question: q.text } : { text: q.text } };
      if (metrics) payload.metrics = metrics;
      if (!payload.code && store.teacherCode) payload.teacherCode = store.teacherCode;
      if (!payload.code && !payload.teacherCode && typeof ensureCode === "function") { await ensureCode(sess.who); payload.code = store.codes[sess.who] || ""; }
      const r = await postSync(payload, sub === "read" ? 150000 : 60000), ai = r.result;
      ai.m = metrics || {};
      const lv = Math.max(0, Math.min(5, Math.round(Number(ai.level)) || 0));
      span.forEach(k => {
        const Y = getQ(k, sess), old = sess.ans[k] || {}, resp = Object.assign({}, old.resp || {}, { level: lv, ai, model: r.model, rec: (old.resp || {}).rec ?? true });
        const ans = Object.assign({ hint: false, t: Math.round(sess.elapsed) }, old, { resp, max: maxPts(Y.q, Y.bank), ai: true });
        delete ans.pts; ans.correct = grade(Y.q, resp); ans.sys = ans.correct; ans.pts = ptsOf(Y.q, Y.bank, ans); sess.ans[k] = ans;
      });
      if (S === sess && span.includes(sess.idx) && !sess.mock) sfxGood(1);
    } catch (e) { w.gsaErr = e.server ? e.message : e.name === "AbortError" ? "timeout" : "error"; }
    GSA_BUSY.delete(key); refresh();
  })();
  GSA_BUSY.set(key, job); refresh();
  return job;
}
const gsaBusy = (sess, i) => GSA_BUSY.has(sess.id + ":" + gsaSpan(sess, i)[0]);
const gsaPending = sess => [...GSA_BUSY.keys()].filter(k => k.startsWith(sess.id + ":")).length;
function gsaErrText(e) {
  return e === "klimit-1h" ? "AI 口說批改每小時最多 60 題，先用自評，老師也會再批改。" : e === "klimit-5h" ? "AI 口說批改每 5 小時最多 150 題，先用自評。" : e === "busy" ? "AI 批改的人太多，請稍後再試，或先自評。"
    : e === "offline" ? "目前沒有連線到批改伺服器，請先自評。" : e === "timeout" ? "AI 批改等太久了，可以再試一次或先自評。" : "AI 批改沒有完成，可以再試一次或先自評。";
}

/* ---------- 畫面 ---------- */
const gsaCol = v => v >= 5 ? "var(--good)" : v >= 4 ? "var(--sp-ok)" : v >= 3 ? "var(--gold)" : v >= 2 ? "var(--sp-warn)" : "var(--bad)";
function gsaMeter(lv, label, desc) {
  return `<div class="sp-meter"><div class="sp-num" style="color:${gsaCol(lv)}">${lv}<span>/ 5</span></div><div style="min-width:0;flex:1">
  <div class="sp-pips">${[1, 2, 3, 4, 5].map(k => `<i style="${k <= lv ? `background:${gsaCol(lv)}` : ""}"></i>`).join("")}</div>
  <div class="sp-lab">${esc(label)}</div>${desc ? `<div class="sp-desc">${esc(desc)}</div>` : ""}</div></div>`;
}
function gsaChips(ai, kind) {
  const m = ai.m || {}, c = [];
  if (m.speech !== undefined) c.push(`🎙️ 說了 ${m.speech} 秒`);
  if (kind === "read" && ai.wpm) c.push(`⏩ 每分鐘 ${ai.wpm} 字${ai.wpm < 90 ? "・偏慢" : ai.wpm > 170 ? "・偏快" : ""}`);
  if (kind !== "answer" && ai.acc !== undefined) c.push(`🎯 唸到 ${ai.acc}%`);
  if (m.pauses !== undefined) c.push(`⏸️ 停頓 ${m.pauses} 次${m.longest >= 1.5 ? `（最長 ${m.longest} 秒）` : ""}`);
  if (kind === "answer" && m.onset >= 3) c.push(`⌛ ${m.onset} 秒後才開口`);
  return c.length ? `<div class="sp-chips">${c.map(x => `<span>${x}</span>`).join("")}</div>` : "";
}
const gsaTag = code => `<span class="sp-code ${gsaKind(code)}">${esc(GSA_CODE[code] || code)}</span>`;
/* 原句：漏掉或唸錯的字畫底線（前端重新比對一次，標出位置） */
function gsaMarkTarget(text, said) {
  const toks = String(text).split(/\s+/), norm = t => typeof gsNormWord === "function" ? gsNormWord(t) : t.toLowerCase().replace(/[^a-z']/g, "");
  const T = toks.map(norm), A = String(said || "").split(/\s+/).map(norm).filter(Boolean), n = T.length, m = A.length;
  const dp = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(0));
  for (let i = n - 1; i >= 0; i--) for (let j = m - 1; j >= 0; j--) dp[i][j] = T[i] && T[i] === A[j] ? dp[i + 1][j + 1] + 1 : Math.max(dp[i + 1][j], dp[i][j + 1]);
  const hit = new Set(); let i = 0, j = 0;
  while (i < n && j < m) { if (T[i] && T[i] === A[j]) { hit.add(i); i++; j++; } else if (dp[i + 1][j] >= dp[i][j + 1]) i++; else j++; }
  return toks.map((t, k) => !T[k] || hit.has(k) || /\d/.test(t) ? esc(t) : `<span class="sp-miss" title="漏掉或沒唸清楚">${esc(t)}</span>`).join(" ");
}
function gsaShortHTML(q, ai) {
  const sub = GSA_SUB[q.mode], lv = Number(ai.level) || 0, rub = RUBRICS[sub === "answer" ? "gg" : "gp"];
  const desc = (rub.levels.find(x => x[0] === lv) || [])[1] || "";
  let h = `<div class="sp-card" style="--lv:${gsaCol(lv)}"><div class="eyebrow">🤖 AI 依英檢官方標準・${sub === "answer" ? "文法、字彙" : "發音、語調和流利度"}</div>${gsaMeter(lv, sub === "answer" ? (ai.answered === false ? "沒有回答到問題" : "回答問題") : "複誦", desc)}${gsaChips(ai, sub)}`;
  if (ai.comment) h += `<div class="sp-say">${esc(ai.comment)}</div>`;
  if (sub === "repeat" && ai.transcript) h += `<div class="sp-line"><span class="sp-k">原句</span><span>${gsaMarkTarget(q.text, ai.transcript)}</span></div><div class="sp-line"><span class="sp-k">你說</span><span class="muted">${esc(ai.transcript)}</span></div>`;
  if (sub === "answer") {
    if (ai.transcript) h += `<div class="sp-line"><span class="sp-k">你說</span><span>${esc(ai.transcript)}</span></div>`;
    (ai.errors || []).forEach(e => { h += `<div class="sp-fix">${gsaTag(e.code)}<div><s>${esc(e.original)}</s> → <b>${esc(e.corrected)}</b><div class="muted">${esc(e.why)}</div></div></div>`; });
  }
  (ai.problems || []).forEach(p => { h += `<div class="sp-fix">${gsaTag(p.code)}<div><b>${esc(p.word)}</b><div class="muted">${esc(p.tip)}</div></div></div>`; });
  if (sub === "answer" && ai.better) h += `<div class="sp-better"><div class="sp-k">💬 可以這樣說</div><div>${esc(ai.better)}</div></div>`;
  if (ai.tip) h += `<div class="sp-tip">📌 ${esc(ai.tip)}</div>`;
  return h + `</div>`;
}
/* 朗讀：逐段燈號＋問題字上色＋三個優先改進 */
function gsaReadHTML(g, ai, s0) {
  const lv = Number(ai.level) || 0, desc = (RUBRICS.gp.levels.find(x => x[0] === lv) || [])[1] || "", words = ai.words || [];
  const mark = t => { let h = esc(t); words.forEach((w, k) => { if (!w.word || /^\d/.test(w.word) && !t.includes(w.word)) return; const re = new RegExp(`(^|[^A-Za-z'])(${w.word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})(?![A-Za-z'])`, "i");
    h = h.replace(re, (m, a, b) => `${a}<span class="sp-w ${gsaKind(w.code)}" title="${esc((w.heard ? `聽起來像「${w.heard}」・` : "") + w.tip)}">${b}<sup>${k + 1}</sup></span>`); }); return h; };
  let h = `<div class="sp-card" style="--lv:${gsaCol(lv)}"><div class="eyebrow">🤖 AI 依英檢官方標準・發音、語調和流利度</div>${gsaMeter(lv, "朗讀句子與短文", desc)}${gsaChips(ai, "read")}
  ${ai.diagnosis ? `<div class="sp-say">🎯 ${esc(ai.diagnosis)}</div>` : ""}${lv < 5 && ai.nextLevel ? `<div class="sp-up">⬆️ <b>要拿到 ${lv + 1} 級分：</b>${esc(ai.nextLevel)}</div>` : ""}
  ${(ai.strengths || []).length ? `<div class="sp-good">👍 ${ai.strengths.map(esc).join("　")}</div>` : ""}</div>`;
  h += `<div class="sp-sec"><h4>逐句檢查</h4><div class="muted" style="font-size:12.5px">🟢 唸得好　🟡 小問題　🔴 要改　⚪ 沒唸到・畫線的字可以點開看說明</div><div class="sp-segs">${g.passage.map((t, k) => {
    const s = (ai.segments || []).find(x => x.n === k + 1) || { status: "ok", intonation: "na", note: "" }, st = GSA_SEG[s.status] || GSA_SEG.ok;
    return `<div class="sp-seg ${st[0]} ${k === g.passage.length - 1 ? "psg" : ""}"><span class="sp-dot" title="${st[1]}"></span><span class="tag">${s0 + k + 1}</span><div style="min-width:0"><div>${mark(t)}</div>
    ${s.note || GSA_TONE[s.intonation] ? `<div class="sp-note">${GSA_TONE[s.intonation] ? `<b>${GSA_TONE[s.intonation]}</b>　` : ""}${esc(s.note || "")}</div>` : ""}</div></div>`; }).join("")}</div>
  ${words.length ? `<ol class="sp-wlist">${words.map(w => `<li>${gsaTag(w.code)}<div><b>${esc(w.word)}</b>${w.heard && w.heard.toLowerCase() !== String(w.word).toLowerCase() ? `<span class="muted">　聽起來像「${esc(w.heard)}」</span>` : ""}<div class="muted">${esc(w.tip)}</div></div></li>`).join("")}</ol>` : ""}</div>`;
  if ((ai.fixes || []).length) h += `<div class="sp-sec"><h4>先改這三件事</h4><div class="sp-fixes">${ai.fixes.slice(0, 3).map((f, k) => `<div class="sp-pri ${gsaKind(f.code)}"><b><span class="tnum">${k + 1}</span>${esc(f.title)}</b><div>${esc(f.how)}</div></div>`).join("")}</div></div>`;
  if ((ai.drill || []).length) h += `<div class="sp-sec"><h4>跟讀練習</h4><div class="muted" style="font-size:12.5px">先聽一次示範朗讀，再把這幾個字詞慢慢唸 3 遍、放回句子裡唸一次。</div><div class="sp-drill">${ai.drill.map(d => `<span class="sp-dw">${esc(d)}</span>`).join("")}</div></div>`;
  if (ai.transcript) h += `<details class="pfold" data-key="gsa-tr-${s0}"><summary><span>📝 AI 聽到的內容</span>${I.chevR.replace("<svg", '<svg width="16" height="16"')}</summary><div class="ptext muted" style="font-size:15px;margin-top:8px">${esc(ai.transcript)}</div></details>`;
  return h;
}
/* 作答頁（練習）：批改中、結果、失敗 */
function gsaQuizHTML(q, i) {
  const span = gsaSpan(S, i), a = S.ans[span[0]], w = S.work[span[0]] || {};
  if (gsaBusy(S, i)) return `<div class="ai-busy glass"><span class="ai-spin"></span><div><b>AI 正在聽你的錄音…</b><div class="muted" style="font-size:13px">${q.mode === "g-read" ? "朗讀會逐句檢查，大約 15～35 秒" : "大約 3～5 秒"}</div></div></div>`;
  if (a && a.resp && a.resp.ai) return q.mode === "g-read" ? gsaReadHTML(getQ(i).group, a.resp.ai, span[0]) : gsaShortHTML(q, a.resp.ai);
  if (w.gsaErr) return `<div class="sp-err">${esc(gsaErrText(w.gsaErr))}${w.gsaErr !== "offline" && GSP && GSP.blob ? ` <button class="btn sm" data-act="gsa-retry">再試一次</button>` : ""}</div>`;
  return "";
}
const gsaHasAi = i => { const a = S.ans[gsaSpan(S, i)[0]]; return !!(a && a.resp && a.resp.ai); };

/* ---------- 解析頁（每題） ---------- */
function gsaReviewHTML(q, a, att, i) {
  if (!a || !a.resp || !a.resp.ai) return "";
  if (q.mode === "g-read") { const span = gsaSpan(att, i); return span[0] === i ? gsaReadHTML(getQ(i, att).group, a.resp.ai, i) : `<div class="muted" style="font-size:13.5px">朗讀 6 題一起批改，詳細回饋在第 ${span[0] + 1} 題。</div>`; }
  return gsaShortHTML(q, a.resp.ai);
}

/* ---------- 整份口說（模擬卷）：官方換算＋總回饋 ---------- */
function gsaItems(att) {
  const out = [];
  (att.qs || []).forEach((_, i) => {
    const X = getQ(i, att), a = (att.ans || {})[i]; if (!X || !X.q.gept || X.q.type !== "speak") return;
    if (X.group && gsaSpan(att, i)[0] !== i) return;
    const ai = a && a.resp && a.resp.ai, kind = GSA_SUB[X.q.mode];
    out.push({ i, kind, done: !!ai, level: ai ? Number(ai.level) || 0 : 0, pron: ai ? (kind === "answer" ? Number(ai.pron) || 0 : Number(ai.level) || 0) : 0, ai, q: X.q });
  });
  return out;
}
function gsaEstimate(items) {
  const avg = a => a.length ? a.reduce((s, x) => s + x, 0) / a.length : null, half = x => Math.round(x * 2) / 2;
  const p = ["repeat", "read", "answer"].map(k => avg(items.filter(x => x.kind === k).map(x => x.pron))).filter(x => x !== null), g = avg(items.filter(x => x.kind === "answer").map(x => x.level));
  if (!p.length || g === null) return null;
  const c1 = half(avg(p)), c2 = half(g); return { c1, c2, score: Math.round((c1 + c2) * 10) };
}
/* 交卷前：等背景批改完，再請 AI 寫總回饋（存在第一題口說的答案裡，跟著成績上傳） */
async function gsaReport(sess) {
  const items = gsaItems(sess); if (!items.length || items.some(x => !x.done)) return;
  const first = sess.ans[items[0].i]; if (!first || first.resp.report) return;
  const est = gsaEstimate(items); if (!est) return;
  const sum = items.map((x, k) => ({ n: x.i + 1, part: x.kind, level: x.level, pron: x.pron, said: String(x.ai.transcript || "").slice(0, 200),
    problems: (x.ai.problems || x.ai.words || []).map(p => (GSA_CODE[p.code] || "") + "：" + (p.word || "")).slice(0, 5), errors: (x.ai.errors || []).map(e => (GSA_CODE[e.code] || "") + "：" + e.original + " → " + e.corrected).slice(0, 3), note: x.ai.comment || x.ai.diagnosis || "" }));
  try {
    const payload = { action: "aigrade", kind: "gept-speak", sub: "report", name: sess.who, code: store.codes[sess.who] || "", items: sum, est };
    if (!payload.code && store.teacherCode) payload.teacherCode = store.teacherCode;
    const r = await postSync(payload, 60000);
    first.resp.report = Object.assign({ est }, r.result); save(true);
  } catch (e) { first.resp.report = { est, err: true }; }
}
function gsaReportHTML(att) {
  const items = gsaItems(att); if (!items.length) return "";
  const done = items.filter(x => x.done), est = done.length === items.length ? gsaEstimate(items) : null;
  const rep = (att.ans[items[0].i] || {}).resp && att.ans[items[0].i].resp.report;
  const full = items.length === 13;
  if (!done.length) return "";
  let h = `<div class="glass card sp-report"><div class="section-h" style="margin:0"><h2>🎙️ 英檢口說成績（AI 估算）</h2>${est && full ? `<span class="tag" style="background:${est.score >= 80 ? "var(--good)" : "var(--bad)"};color:#fff">${est.score} / 100・${est.score >= 80 ? "達到通過標準" : "未達通過標準"}</span>` : ""}</div>`;
  if (est) h += `<div class="sp-dials">${[["發音、語調和流利度", est.c1, "看三個部分"], ["文法、字彙", est.c2, "看回答問題"]].map(([n, v, s]) => `<div class="sp-dial"><div class="sp-ring" style="--p:${v / 5 * 100};--c:${gsaCol(Math.floor(v))}"><b>${v}</b></div><div><b>${n}</b><div class="muted" style="font-size:12.5px">${s}・滿分 5</div></div></div>`).join("")}
    <div class="sp-dial"><div class="sp-ring" style="--p:${est.score};--c:${est.score >= 80 ? "var(--good)" : "var(--bad)"}"><b>${est.score}</b></div><div><b>百分制</b><div class="muted" style="font-size:12.5px">(兩項相加) × 10・80 分通過</div></div></div></div>`;
  else h += `<div class="muted">AI 已批改 ${done.length} / ${items.length} 題，全部批完才換算成績。</div>`;
  h += `<div class="sp-parts">${items.map(x => `<span class="sp-pc ${x.kind}" title="${esc(x.q.text || "")}" style="--c:${x.done ? gsaCol(x.kind === "answer" ? x.level : x.pron) : "var(--ink-3)"}">${x.kind === "read" ? `${x.i + 1}–${x.i + 6}` : x.i + 1}<b>${x.done ? (x.kind === "answer" ? x.level : x.pron) : "–"}</b></span>`).join("")}</div>
  <div class="muted" style="font-size:12px">每格是一題的 AI 級分（複誦、朗讀看發音語調流利度；回答問題看文法字彙）。</div>`;
  if (rep && !rep.err) {
    h += `<div class="sp-say">🎯 ${esc(rep.oneLine || "")}</div><div class="sp-two"><div><b>🗣️ 發音、語調、流利度</b><div>${esc(rep.c1 || "")}</div></div><div><b>🧩 文法、字彙</b><div>${esc(rep.c2 || "")}</div></div></div>`;
    if ((rep.strengths || []).length) h += `<div class="sp-good">👍 ${rep.strengths.map(esc).join("　")}</div>`;
    h += `<div class="sp-sec"><h4>先改這三件事</h4><div class="sp-fixes">${(rep.priorities || []).slice(0, 3).map((p, k) => `<div class="sp-pri"><b><span class="tnum">${k + 1}</span>${esc(p.title)}</b><div class="muted">${esc(p.why)}</div><div>${esc(p.how)}</div></div>`).join("")}</div></div>`;
    if ((rep.week || []).length) h += `<details class="pfold" data-key="sp-week-${esc(att.id)}"><summary><span>📅 接下來一週每天練</span>${I.chevR.replace("<svg", '<svg width="16" height="16"')}</summary><ol style="margin:8px 0 0;padding-left:22px">${rep.week.map(x => `<li>${esc(x)}</li>`).join("")}</ol></details>`;
  }
  h += `<div class="muted" style="font-size:12px">官方是兩位評分老師各給 0～5 級分後平均；這裡依 AI 對每題的評分估算：（一）＝複誦、朗讀、回答問題三部分各自平均後再平均，（二）＝回答問題平均，各取到 0.5。${full ? "" : "這次不是完整的 18 題，估算僅供參考。"}每題的回饋在下方解析裡。</div></div>`;
  return h;
}

/* 交卷：口說 AI 還在批改就先等（模擬卷再整理總回饋），不然 AI 分數來不及跟著成績上傳 */
{ const ask0 = askFinish;
  askFinish = function () {
    if (!S || !S.qs.some((_, i) => { const y = getQ(i); return y && y.q.gept && y.q.type === "speak"; })) return ask0();
    const sess = S, tick = async () => {
      if (S !== sess) return;
      const left = gsaPending(sess);
      if (left) { const p = document.getElementById("gsa-left"); if (p) p.textContent = left; setTimeout(tick, 600); return; }
      if (sess.mock) { const p = document.getElementById("gsa-msg"); if (p) p.textContent = "正在整理整份口說的總回饋…"; await gsaReport(sess); }
      if (S === sess && document.getElementById("gsa-wait")) { closeSheet(); ask0(); }
    };
    if (!gsaPending(sess) && !(sess.mock && gsaItems(sess).every(x => x.done) && !(sess.ans[gsaItems(sess)[0].i].resp || {}).report)) return ask0();
    sheet(`<div id="gsa-wait"><h3>🎙️ AI 正在批改口說</h3><p class="muted" id="gsa-msg" style="margin:0 0 12px">還有 <b id="gsa-left">${gsaPending(sess)}</b> 題在批改，完成後會自動交卷。</p><div class="ai-busy" style="margin-bottom:12px"><span class="ai-spin"></span><div class="muted" style="font-size:13px">短題約 3～5 秒、朗讀約 15～35 秒</div></div>
    <div class="row" style="justify-content:flex-end"><button class="btn" data-act="gsa-skip">不等了，直接交卷</button></div></div>`);
    tick();
  };
}
document.addEventListener("click", e => {
  const el = e.target.closest("[data-act]"); if (!el) return;
  const a = el.dataset.act;
  if (a === "gsa-skip") { closeSheet(); if (S) { const left = S.qs.length - Object.keys(S.ans).length; left ? askFinishPlain() : finish(); } }
  if (a === "gsa-retry" && S && GSP && GSP.blob) { gsaRun(S, S.idx, GSP.blob); }
});
/* 「不等了」：直接走原本的交卷確認 */
function askFinishPlain() { const left = S.qs.length - Object.keys(S.ans).length; sheet(`<h3>還有 ${left} 題沒作答</h3><p class="muted" style="margin:0 0 16px">沒作答的題目會算錯。要現在交卷嗎？</p>
  <div class="row" style="justify-content:flex-end"><button class="btn" data-act="close-sheet">繼續作答</button><button class="btn primary" data-act="finish-now">交卷</button></div>`); }
