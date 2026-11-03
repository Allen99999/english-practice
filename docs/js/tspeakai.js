/* ===== 托福（2026 新制）口說 AI 批改的畫面：後端 apps-script/AiToeflSpeak.gs；評分規則見本機「新制托福 Speaking 評分與回饋系統.md」
   送出、批改中、自評退回都沿用 gspeakai.js（gsaRun）。這裡只負責：Listen and Repeat 短卡片、Take an Interview 詳細回饋、整份口說的估算與總回饋。 ===== */
const TSA_LR = { 5: "完全照原句複述", 4: "意思都在，但不是一字不差", 3: "大致完整，但沒有準確表達原意", 2: "漏掉原句的重要部分，或錯誤很多", 1: "幾乎沒說到原句，或大部分聽不懂", 0: "沒有回答、沒有英文，或和原句無關" };
const TSA_IV = { 5: "完全成功：完整回答，清楚流暢", 4: "大致成功：有回答，相當清楚", 3: "部分成功：有回答，但展開有限或不夠清楚", 2: "大多不成功：有嘗試，但沒有有意義地支持", 1: "不成功：只沾到問題的一點邊", 0: "沒有回答、沒有英文，或和問題無關" };
const TSA_WHY = { exact: "一字不差", minor: "只有小字或字尾的小錯", long1: "長句漏掉或換掉一個字", most: "大部分重要的字都在，但意思沒有完全準確", partial: "漏掉了重要的部分", half: "只說了前半句", few: "只說了幾個字", unrelated: "和原句對不起來", none: "沒有聽到英文" };
const TSA_INTEL = { clear: "完全聽得懂", minor: "一兩個字不太清楚", occasional: "有時不好懂", low: "很難聽懂", mostly: "大部分聽不懂" };
const TSA_CAP = { X0: "沒有英文或和問題無關 → 0 分", ISO: "大多是零散的字詞 → 最高 1 分", OFF: "和問題只有一點關係，或大多照念題目 → 最高 2 分", UNC: "常常聽不出想說什麼 → 最高 2 分",
  THIN: "只有一個想法、沒有理由或例子 → 最高 3 分", CHOP: "停頓太多、斷斷續續 → 最高 3 分", PART: "問題有一部分沒回答 → 最高 4 分" };
const TSA_DIM = [["respond", "回答與展開"], ["pace", "語速與停頓"], ["pron", "發音與語調"], ["lang", "文法與字彙"]];
const tsaSub = q => GSA_SUB[q.mode];

function tsaHTML(q, ai) { return tsaSub(q) === "lr" ? tsaLrHTML(q, ai) : tsaIvHTML(q, ai); }

/* ---------- Listen and Repeat：短卡片 ---------- */
function tsaLrHTML(q, ai) {
  const lv = Number(ai.level) || 0, m = ai.m || {};
  // 原句逐字標記：漏掉＝波浪線、換掉＝劃掉＋你說的字、字尾錯＝底線＋你說的字
  const marks = ai.marks || [], toks = String(q.text).split(/\s+/);
  let k = 0;
  const fit = toks.reduce((t, w) => t + tsWords(w).length, 0) === marks.length;   // 對不上（例如數字）就直接用比對結果的字
  const shown = !fit ? marks.map(x => x.st === "ok" ? esc(x.w) : x.st === "miss" ? `<span class="sp-miss">${esc(x.w)}</span>` : `<span class="ts-chg"><s>${esc(x.w)}</s><i>${esc(x.said || "")}</i></span>`).join(" ") : toks.map(t => {
    const parts = tsWords(t); if (!parts.length) return esc(t);
    const ms = marks.slice(k, k + parts.length); k += parts.length;
    const bad = ms.find(x => x.st !== "ok"); if (!bad) return esc(t);
    if (bad.st === "miss") return `<span class="sp-miss" title="漏掉了">${esc(t)}</span>`;
    return `<span class="ts-chg" title="${bad.st === "marker" ? "字尾不對" : "換成別的字"}"><s>${esc(t)}</s><i>${esc(bad.said || "")}</i></span>`;
  }).join(" ");
  let h = `<div class="sp-card" style="--lv:${gsaCol(lv)}"><div class="eyebrow">🤖 AI 依 ETS 官方量表・Listen and Repeat</div>${gsaMeter(lv, TSA_LR[lv] || "", (TSA_WHY[ai.why] || "") + (ai.intelligibility && ai.intelligibility !== "clear" ? `・${TSA_INTEL[ai.intelligibility]}` : ""))}`;
  const c = []; if (m.speech !== undefined) c.push(`🎙️ 說了 ${m.speech} 秒`); if (ai.cOk !== undefined) c.push(`🎯 重要的字說到 ${ai.cOk}%`); if (ai.intelligibility) c.push(`👂 ${TSA_INTEL[ai.intelligibility] || ""}`);
  if (c.length) h += `<div class="sp-chips">${c.map(x => `<span>${x}</span>`).join("")}</div>`;
  h += `<div class="sp-line"><span class="sp-k">原句</span><span>${shown}</span></div>`;
  if (ai.transcript) h += `<div class="sp-line"><span class="sp-k">你說</span><span class="muted">${esc(ai.transcript)}</span></div>`;
  (ai.problems || []).forEach(p => { h += `<div class="sp-fix">${gsaTag(p.code)}<div><b>${esc(p.word)}</b><div class="muted">${esc(p.tip)}</div></div></div>`; });
  if (ai.comment) h += `<div class="sp-tip">${esc(ai.comment)}</div>`;
  return h + `</div>`;
}
/* 和後端 tsWords_ 一樣的斷字（原句標記對位用） */
function tsWords(s) {
  const C = { "you're": "you are", "we're": "we are", "they're": "they are", "it's": "it is", "don't": "do not", "doesn't": "does not", "can't": "can not", "cannot": "can not", "i'm": "i am", "that's": "that is", "there's": "there is", "won't": "will not", "isn't": "is not", "aren't": "are not", "let's": "let us", "i'll": "i will", "you'll": "you will", "we'll": "we will", "i've": "i have", "you've": "you have" };
  return String(s || "").toLowerCase().replace(/[’‘]/g, "'").replace(/\d+/g, d => " " + d + " ").replace(/-/g, " ").replace(/[^a-z0-9' ]/g, " ").split(/\s+/).filter(Boolean)
    .flatMap(w => /^\d+$/.test(w) ? ["n"] : (C[w] || w.replace(/'s$/, "s").replace(/'/g, "")).split(" ")).filter(w => w && !/^(um+|uh+|er+|ah+|hmm+|mm+)$/.test(w));
}

/* ---------- Take an Interview：詳細回饋 ---------- */
function tsaIvHTML(q, ai, opt) {   // opt：英檢中級看圖敘述換標題、級分說明、作答秒數、封頂說明
  opt = opt || {};
  const lv = Number(ai.level) || 0, m = ai.m || {}, d = ai.dims || {}, CAP = opt.caps || TSA_CAP;
  const words = String(ai.transcript || "").replace(/\(\.\.\.\)/g, " ").split(/\s+/).filter(w => /[A-Za-z]/.test(w) && !/^(um|uh|like)[,.]?$/i.test(w)).length;
  let h = `<div class="sp-card" style="--lv:${gsaCol(lv)}"><div class="eyebrow">🤖 ${opt.eyebrow || "AI 依 ETS 官方量表・Take an Interview"}</div>${gsaMeter(lv, (opt.judge ? opt.judge(lv) : TSA_IV[lv]) || "", opt.desc ? opt.desc(lv) : "")}`;
  const c = []; if (m.speech !== undefined) c.push(`🎙️ 說了 ${m.speech} 秒／${opt.total || 45} 秒`); if (words && m.span) c.push(`⏩ 每分鐘 ${Math.round(words / (m.span / 60))} 字`);
  if (m.pauses !== undefined) c.push(`⏸️ 停頓 ${m.pauses} 次${m.longest >= 1.5 ? `（最長 ${m.longest} 秒）` : ""}`); if (m.onset >= 3) c.push(`⌛ ${m.onset} 秒後才開口`);
  if (c.length) h += `<div class="sp-chips">${c.map(x => `<span>${x}</span>`).join("")}</div>`;
  (ai.caps || []).filter(x => CAP[x]).forEach(x => { h += `<div class="ts-cap">⚠️ ${esc(CAP[x])}</div>`; });
  if (ai.diagnosis) h += `<div class="sp-say">🎯 ${esc(ai.diagnosis)}</div>`;
  if (lv < 5 && ai.nextLevel) h += `<div class="sp-up">⬆️ <b>要拿到 ${lv + 1} 分：</b>${esc(ai.nextLevel)}</div>`;
  if (d.respond) h += `<div class="ts-dims">${TSA_DIM.map(([k, n]) => { const v = Number((d[k] || {}).score) || 0;
    return `<div class="ai-dim"><div class="ai-dim-h"><span>${n}</span><b class="tnum" style="color:${gsaCol(v)}">${v}</b></div><div class="sk-bar"><i style="width:${v / 5 * 100}%;background:${gsaCol(v)}"></i></div><div class="muted" style="font-size:13px">${esc((d[k] || {}).note || "")}</div></div>`; }).join("")}</div>
    <div class="muted" style="font-size:12px">四個面向是幫你找出哪裡拉低分數；${opt.who || "ETS"} 只給一個整體分數。</div>`;
  h += `</div>`;
  // 問題檢核＋回答結構
  if ((ai.parts || []).length) h += `<div class="sp-sec"><h4>問題有沒有回答到</h4><div class="ts-parts">${ai.parts.map(p => `<div class="ts-part ${p.status}"><span>${p.status === "yes" ? "✅" : p.status === "partial" ? "⚠️" : "❌"}</span><div><b>${esc(p.part)}</b>${p.note ? `<div class="muted">${esc(p.note)}</div>` : ""}</div></div>`).join("")}</div></div>`;
  const st = ai.structure || {};
  if (Object.keys(st).length) h += `<div class="sp-sec"><h4>回答結構</h4><div class="ts-chain">${[["direct", "直接回答"], ["reason", "理由"], ["example", "例子或細節"], ["wrap", "收尾"]].map(([k, n], j) => `${j ? "<i>→</i>" : ""}<span class="${st[k] ? "on" : ""}">${st[k] ? "✓" : "✕"} ${n}</span>`).join("")}</div></div>`;
  // 原文標註
  if (ai.transcript) {
    let t = esc(ai.transcript);
    (ai.errors || []).forEach((e, j) => { const o = esc(e.original || ""); if (o && t.includes(o)) t = t.replace(o, `<mark class="ts-hl" title="${esc(e.corrected + "：" + e.why)}">${o}<sup>${j + 1}</sup></mark>`); });
    t = t.replace(/\(\.\.\.\)/g, `<span class="ts-pause" title="停頓">⏸</span>`);
    h += `<div class="sp-sec"><h4>你說的內容</h4><div class="ptext" style="font-size:15.5px;line-height:1.9">${t}</div>`;
    if ((ai.errors || []).length) h += `<ol class="sp-wlist">${ai.errors.map(e => `<li>${gsaTag(e.code)}<div><div class="ts-diff">${tsaDiff(e.original, e.corrected)}</div><div class="muted">${esc(e.why)}</div></div></li>`).join("")}</ol>`;
    h += `</div>`;
  }
  if ((ai.pronWords || []).length) h += `<div class="sp-sec"><h4>發音要注意</h4>${ai.pronWords.map(p => `<div class="sp-fix">${gsaTag(p.code)}<div><b>${esc(p.word)}</b>${p.heard && p.heard.toLowerCase() !== String(p.word).toLowerCase() ? `<span class="muted">　聽起來像「${esc(p.heard)}」</span>` : ""}<div class="muted">${esc(p.tip)}</div></div></div>`).join("")}</div>`;
  if ((ai.fixes || []).length) h += `<div class="sp-sec"><h4>先改這三件事</h4><div class="sp-fixes">${ai.fixes.slice(0, 3).map((f, k) => `<div class="sp-pri"><b><span class="tnum">${k + 1}</span>${esc(f.title)}</b><div>${esc(f.how)}</div></div>`).join("")}</div></div>`;
  if (ai.better) h += `<div class="sp-better"><div class="sp-k">💬 用你的想法，5 分可以這樣說</div><div>${esc(ai.better)}</div></div>`;
  if ((ai.upgrades || []).length) h += `<details class="pfold" data-key="tsa-up-${esc(q.id)}"><summary><span>🔁 換個更好的說法（${ai.upgrades.length}）</span>${I.chevR.replace("<svg", '<svg width="16" height="16"')}</summary>${ai.upgrades.map(u => `<div class="sp-fix" style="margin-top:8px"><div><s>${esc(u.from)}</s> → <b>${esc(u.to)}</b><div class="muted">${esc(u.example)}</div></div></div>`).join("")}</details>`;
  return h;
}

/* ---------- 整份口說（模擬卷）：原始分 0～55 → 1～6 級分（估算）＋總回饋 ---------- */
function tsaItems(att) {
  const out = [];
  (att.qs || []).forEach((_, i) => {
    const X = getQ(i, att), a = (att.ans || {})[i]; if (!X || X.q.gept || X.q.gi || X.q.type !== "speak") return;   // 英檢中級（gi）不算托福
    const ai = a && a.resp && a.resp.ai;
    out.push({ i, kind: tsaSub(X.q), done: !!ai, level: ai ? Number(ai.level) || 0 : 0, ai, q: X.q });
  });
  return out;
}
const TSA_CEFR = b => b >= 6 ? "C2" : b >= 5 ? "C1" : b >= 4 ? "B2" : b >= 3 ? "B1" : b >= 2 ? "A2" : "A1";
function tsaEstimate(items) {
  if (!items.length) return null;
  const raw = items.reduce((t, x) => t + x.level, 0), ratio = raw / (items.length * 5), band = BAND_CUTS.find(([c]) => ratio >= c)[1];
  const avg = k => { const a = items.filter(x => x.kind === k); return a.length ? Math.round(a.reduce((t, x) => t + x.level, 0) / a.length * 10) / 10 : null; };
  return { raw: items.length === 11 ? raw : Math.round(ratio * 55), band, cefr: TSA_CEFR(band), lr: avg("lr"), iv: avg("iv"), full: items.length === 11 };
}
async function tsaReport(sess) {
  const items = tsaItems(sess); if (!items.length || items.some(x => !x.done)) return;
  const first = sess.ans[items[0].i]; if (!first || first.resp.report) return;
  const est = tsaEstimate(items);
  const sum = items.map(x => ({ n: x.i + 1, task: x.kind === "lr" ? "Listen and Repeat" : "Interview", level: x.level, said: String(x.ai.transcript || "").slice(0, 220),
    target: x.kind === "lr" ? x.q.text : undefined, why: x.kind === "lr" ? TSA_WHY[x.ai.why] : x.ai.diagnosis, caps: (x.ai.caps || []).map(c => TSA_CAP[c]).filter(Boolean),
    problems: (x.ai.problems || x.ai.pronWords || []).map(p => (GSA_CODE[p.code] || "") + "：" + (p.word || "")).slice(0, 3), errors: (x.ai.errors || []).map(e => (GSA_CODE[e.code] || "") + "：" + e.original + " → " + e.corrected).slice(0, 3) }));
  try {
    const payload = { action: "aigrade", kind: "toefl-speak", sub: "report", name: sess.who, code: store.codes[sess.who] || "", items: sum, est };
    if (!payload.code && store.teacherCode) payload.teacherCode = store.teacherCode;
    const r = await postSync(payload, 60000);
    first.resp.report = Object.assign({ est }, r.result); save(true);
  } catch (e) { first.resp.report = { est, err: true }; }
}
function tsaReportHTML(att) {
  const items = tsaItems(att), done = items.filter(x => x.done); if (!done.length) return "";
  const est = done.length === items.length ? tsaEstimate(items) : null, rep = (att.ans[items[0].i] || {}).resp && att.ans[items[0].i].resp.report;
  let h = `<div class="glass card sp-report"><div class="section-h" style="margin:0"><h2>🎙️ 托福口說成績（AI 估算）</h2>${est ? `<span class="tag" style="white-space:nowrap">Speaking ${est.band.toFixed(1)}・${est.cefr}</span>` : ""}</div>`;
  if (est) h += `<div class="sp-dials four">${[["口說級分", est.band.toFixed(1), est.band / 6 * 100, `1～6・CEFR ${est.cefr}`], ["原始分", est.raw, est.raw / 55 * 100, "滿分 55（11 題 × 5）"]].map(([n, v, p, s]) => `<div class="sp-dial"><div class="sp-ring" style="--p:${p};--c:${gsaCol(Math.round(p / 20))}"><b>${v}</b></div><div><b>${n}</b><div class="muted" style="font-size:12.5px">${s}</div></div></div>`).join("")}
    ${[["Listen and Repeat", est.lr], ["Take an Interview", est.iv]].filter(x => x[1] !== null).map(([n, v]) => `<div class="sp-dial"><div class="sp-ring" style="--p:${v / 5 * 100};--c:${gsaCol(Math.floor(v))}"><b>${v}</b></div><div><b>${n}</b><div class="muted" style="font-size:12.5px">每題平均・滿分 5</div></div></div>`).join("")}</div>`;
  else h += `<div class="muted">AI 已批改 ${done.length} / ${items.length} 題，全部批完才換算級分。</div>`;
  h += `<div class="sp-parts">${items.map(x => `<span class="sp-pc" title="${esc(x.q.text || "")}" style="--c:${x.done ? gsaCol(x.level) : "var(--ink-3)"}">${x.kind === "lr" ? "複述" : "訪談"} ${x.i + 1}<b>${x.done ? x.level : "–"}</b></span>`).join("")}</div>`;
  if (rep && !rep.err) {
    h += `<div class="sp-say">🎯 ${esc(rep.oneLine || "")}</div><div class="sp-two"><div><b>🔁 Listen and Repeat</b><div>${esc(rep.lr || "")}</div></div><div><b>💬 Take an Interview</b><div>${esc(rep.iv || "")}</div></div></div>`;
    if ((rep.strengths || []).length) h += `<div class="sp-good">👍 ${rep.strengths.map(esc).join("　")}</div>`;
    h += `<div class="sp-sec"><h4>先改這三件事</h4><div class="sp-fixes">${(rep.priorities || []).slice(0, 3).map((p, k) => `<div class="sp-pri"><b><span class="tnum">${k + 1}</span>${esc(p.title)}</b><div class="muted">${esc(p.why)}</div><div>${esc(p.how)}</div></div>`).join("")}</div></div>`;
    if ((rep.week || []).length) h += `<details class="pfold" data-key="ts-week-${esc(att.id)}"><summary><span>📅 接下來一週每天練</span>${I.chevR.replace("<svg", '<svg width="16" height="16"')}</summary><ol style="margin:8px 0 0;padding-left:22px">${rep.week.map(x => `<li>${esc(x)}</li>`).join("")}</ol></details>`;
  }
  h += `<div class="muted" style="font-size:12px">每題依 ETS 官方量表 0～5 分；ETS 沒有公布原始分換成 1～6 級分的方法，這裡用得分率估算（和其他科同一套）${est && !est.full ? "，這次不是完整的 11 題，原始分已換算成 55 分制" : ""}。每題的回饋在下方解析裡。</div></div>`;
  return h;
}

/* 改錯只標出不一樣的字：Last year, I ~~go~~ **went** to Japan（逐字比對，相同的字照原樣） */
function tsaDiff(a, b) {
  const A = String(a || "").split(/\s+/).filter(Boolean), B = String(b || "").split(/\s+/).filter(Boolean), n = A.length, m = B.length, nz = w => w.toLowerCase().replace(/[^a-z0-9']/g, "");
  if (!n || !m || n + m > 80) return `<s>${esc(a)}</s> → <b>${esc(b)}</b>`;
  const dp = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(0));
  for (let i = n - 1; i >= 0; i--) for (let j = m - 1; j >= 0; j--) dp[i][j] = nz(A[i]) === nz(B[j]) ? dp[i + 1][j + 1] + 1 : Math.max(dp[i + 1][j], dp[i][j + 1]);
  if (dp[0][0] < Math.min(n, m) / 3) return `<s>${esc(a)}</s> → <b>${esc(b)}</b>`;   // 幾乎整句改寫：整句對照比較清楚
  const out = []; let i = 0, j = 0;
  while (i < n || j < m) {
    if (i < n && j < m && nz(A[i]) === nz(B[j])) { out.push(esc(B[j])); i++; j++; }
    else if (i < n && (j >= m || dp[i + 1][j] >= dp[i][j + 1])) { out.push(`<s class="ts-del">${esc(A[i])}</s>`); i++; }   // 先劃掉錯的字，再接正確的字
    else { out.push(`<b class="ts-add">${esc(B[j])}</b>`); j++; }
  }
  return out.join(" ").replace(/(<\/s>) (<b class="ts-add">)/g, "$1$2");
}
