/* ===== 評分：依官方評分方式給分（不是只有對或錯）
   英檢初級寫作（gept.org.tw 寫作分數說明）：單句寫作每題 0／1／2 分；段落寫作 0～5 級分；
     寫作成績 =（單句得分 ÷ 30 ＋ 段落級分 ÷ 5）× 50，70 分通過。
   TOEFL iBT 2026（ETS 規格書）：Build a Sentence、閱讀、聽力每題 1 分；Email、Academic Discussion、
     Listen and Repeat、Take an Interview 每題 0～5 分（描述依 ETS 評分面向整理）。
   國中翻譯沒有官方標準，比照單句寫作 0／1／2 分。其他客觀題每題 1 分。 ===== */
const RUBRICS = {
  gs: { name: "單句寫作評分（英檢官方 0～2 分）", max: 2, pass: 2, levels: [
    [2, "正確無誤"], [1, "有誤，但重點結構正確"], [0, "錯誤過多、未答、等同未答"]] },
  ge: { name: "段落寫作評分（英檢官方 0～5 級分）", max: 5, pass: 3, levels: [
    [5, "正確表達題目要求；文法、用字等幾乎無誤"], [4, "大致正確表達題目要求；有錯誤，但不影響理解"],
    [3, "未能完全達意；文法、用字有誤，稍影響理解"], [2, "表達有令人不解或誤解之處，讀者須耐心解讀"],
    [1, "只回答部分要求；錯誤過多，嚴重影響理解"], [0, "未答、等同未答"]] },
  tw: { name: "TOEFL Writing 評分（ETS 0～5 分）", max: 5, pass: 3, levels: [
    [5, "完全達成任務：切題、充分發展；句型多樣、用字精準，幾乎沒有錯誤"], [4, "大致達成：切題且有發展；偶有小錯，不影響理解"],
    [3, "部分達成：有回應任務，但發展不足或部分不清楚；錯誤較明顯"], [2, "大多未達成：內容有限、組織鬆散；錯誤常造成理解困難"],
    [1, "未達成：只有零星想法；錯誤嚴重"], [0, "空白、離題、照抄題目或不是英文"]] },
  tr: { name: "Listen and Repeat 評分（ETS 0～5 分）", max: 5, pass: 3, levels: [
    [5, "一字不差地完整重複，發音清楚、節奏自然"], [4, "意思完整，只有一兩個小錯"],
    [3, "句子結構還在，但漏掉或改變了關鍵字"], [2, "漏掉大段內容，句子不完整"],
    [1, "只說出零星片段，或很難聽懂"], [0, "沒有回答，或內容無關"]] },
  gp: { name: "英檢口說：發音、語調和流利度（官方 0～5 級分）", max: 5, pass: 4, levels: [
    [5, "發音、語調正確、自然，表達流利，無礙溝通"], [4, "發音、語調大致正確、自然，雖然有錯但不妨礙了解；尚稱流利"],
    [3, "發音、語調時有錯誤，但仍可理解；速度較慢、時有停頓，但仍可溝通"], [2, "發音、語調常有錯誤，影響理解；速度慢、時常停頓"],
    [1, "發音、語調錯誤甚多，不當停頓甚多，難以理解"], [0, "未答或等同未答"]] },
  gg: { name: "英檢口說：文法、字彙之正確性和適切性（官方 0～5 級分）", max: 5, pass: 4, levels: [
    [5, "內容符合題目要求，能大致掌握基本語法及字彙"], [4, "內容大致符合要求，語法及字彙大致正確，但尚未能自在應用"],
    [3, "內容多不可解，語法常有錯誤，字彙有限，阻礙表達"], [2, "內容難解，語法錯誤多，語句多呈片段，字彙不足"],
    [1, "幾乎無句型語法可言，字彙嚴重不足，難以表達"], [0, "未答或等同未答"]] },
  ti: { name: "Take an Interview 評分（ETS 0～5 分）", max: 5, pass: 3, levels: [
    [5, "流暢清楚、語調自然；文法精準、用字豐富；回答完整有條理"], [4, "大致流暢清楚，偶有停頓或小錯；回答充分"],
    [3, "停頓較多但聽得懂；有些文法錯誤；回答切題但發展不足"], [2, "停頓頻繁、要費力聽；錯誤多；回答發展不足或組織不清"],
    [1, "嚴重停頓、難以理解；回答零碎"], [0, "沒有回答，或內容無關"]] }
};
function rubricOf(q, bank) {
  if (!q) return null;
  if (q.type === "essay") return RUBRICS[q.label ? "tw" : "ge"];
  if (q.type === "speak" && q.gept) return RUBRICS[q.mode === "g-answer" ? "gg" : "gp"];   // 英檢初級口說（gept.org.tw 口說分數說明）
  if (q.type === "speak") return RUBRICS[q.mode === "repeat" ? "tr" : "ti"];
  if (q.type === "rewrite" || q.type === "trans") return RUBRICS.gs;
  if (q.type === "scramble" && !q.ctx && bank && /^gept/.test(bank.id)) return RUBRICS.gs;   // 英檢重組也是單句寫作
  return null;
}
function maxPts(q, bank) { const r = rubricOf(q, bank); return r ? r.max : 1; }
function passPts(q, bank) { const r = rubricOf(q, bank); return r ? r.pass : 1; }
/* 這題得幾分：老師／自評給的分數 > 自評等級 > 系統判對錯 */
function ptsOf(q, bank, a) {
  if (!a) return 0;
  const m = maxPts(q, bank);
  if (typeof a.pts === "number") return Math.max(0, Math.min(m, a.pts));
  if (a.resp && typeof a.resp.level === "number") return Math.max(0, Math.min(m, a.resp.level));
  return a.correct ? m : 0;
}
function attPoints(att) {
  let s = 0, t = 0;
  (att.qs || []).forEach((_, i) => { const X = getQ(i, att); if (!X) return; t += maxPts(X.q, X.bank); s += ptsOf(X.q, X.bank, (att.ans || {})[i]); });
  return { s, t };
}
function levelDesc(q, bank, lv) { const r = rubricOf(q, bank); const l = r && r.levels.find(x => x[0] === lv); return l ? l[1] : ""; }
/* 分數按鈕（自評或老師批改共用）：act = 事件名稱，cur = 目前分數 */
const SHORT = { 2: ["錯誤", "小錯", "正確"], 5: ["未答", "很弱", "不足", "尚可", "良好", "優秀"] };
function rubricButtonsHTML(q, bank, act, cur, extra) {
  const r = rubricOf(q, bank); if (!r) return "";
  const short = SHORT[r.max] || [];
  return `<div class="rubric"><div class="rb-row">${r.levels.map(([lv, d]) =>
    `<button class="rb ${cur === lv ? "on" : ""}" data-act="${act}" data-v="${lv}" title="${esc(d)}" ${extra || ""}><b>${lv}</b>${short[lv] ? `<span>${short[lv]}</span>` : ""}</button>`).join("")}</div>
  <div class="muted rb-desc">${cur === null || cur === undefined ? `${esc(r.name)}・把滑鼠移到按鈕上可以看說明` : `${cur} 分：${esc(levelDesc(q, bank, cur))}`}</div></div>`;
}
/* 英檢初級初試（聽力＋閱讀）成績：官方是量尺分數、各科滿分 120，
   通過標準＝兩科總和 160 分以上，且任一科不低於 72 分（LTTC）。這裡依答對率估算：答對率 × 120。 */
function geptLRHTML(att) {
  const P = { l: [0, 0], r: [0, 0] };
  (att.qs || []).forEach((_, i) => {
    const X = getQ(i, att); if (!X || !X.bank || !/^gept/.test(X.bank.id)) return;
    const k = X.q.type === "listen" ? "l" : /^(g[123]|r[123])$/.test(X.q.tag || (X.group && X.group.tag) || "") ? "r" : null; if (!k) return;
    P[k][1]++; if ((att.ans || {})[i] && att.ans[i].correct) P[k][0]++;
  });
  if (!P.l[1] && !P.r[1]) return "";
  const sc = k => P[k][1] ? Math.round(P[k][0] / P[k][1] * 120) : null, L = sc("l"), R = sc("r"), both = L !== null && R !== null;
  const pass = both && L + R >= 160 && L >= 72 && R >= 72, full = P.l[1] === 30 && P.r[1] === 30;
  const cell = (name, v, p) => v === null ? "" : `<div class="stat"><div class="k">${name}</div><div class="v" style="color:${v >= 72 ? "var(--good)" : "var(--bad)"}">${v}<span class="muted" style="font-size:15px"> / 120</span></div><div class="muted" style="font-size:12.5px">答對 ${p[0]} / ${p[1]} 題${v < 72 ? "・低於 72" : ""}</div></div>`;
  return `<div class="glass card" style="display:flex;flex-direction:column;gap:14px"><div class="section-h" style="margin:0"><h2>英檢初試成績（估算）</h2>${both ? `<span class="tag" style="background:${pass ? "var(--good)" : "var(--bad)"};color:#fff">${pass ? "達到通過標準" : "未達通過標準"}</span>` : ""}</div>
  <div class="stats">${cell("聽力", L, P.l)}${cell("閱讀", R, P.r)}${both ? `<div class="stat"><div class="k">兩科總和</div><div class="v" style="color:${L + R >= 160 ? "var(--good)" : "var(--bad)"}">${L + R}<span class="muted" style="font-size:15px"> / 240</span></div><div class="muted" style="font-size:12.5px">${L + R >= 160 ? "已達 160" : `差 ${160 - L - R} 分到 160`}</div></div>` : ""}</div>
  <div class="muted" style="font-size:12.5px">通過標準：聽力＋閱讀總和 160 分以上，且任一科不低於 72 分。官方成績是量尺分數，這裡用答對率 × 120 估算${full ? "" : "；這次題數不是完整的 30＋30 題，估算僅供參考"}${both ? "" : "；這次只做了一科，所以不判斷是否通過"}。</div></div>`;
}
/* 英檢初級寫作成績（官方換算） */
function geptWritingHTML(att) {
  let p1 = 0, m1 = 0, p2 = [], any = false;
  (att.qs || []).forEach((_, i) => {
    const X = getQ(i, att); if (!X || !X.bank || !/^gept/.test(X.bank.id)) return;
    const r = rubricOf(X.q, X.bank); if (!r) return; any = true;
    const p = ptsOf(X.q, X.bank, (att.ans || {})[i]);
    if (r === RUBRICS.gs) { p1 += p; m1 += r.max; } else if (r === RUBRICS.ge) p2.push(p);
  });
  if (!any) return "";
  const lv = p2.length ? p2.reduce((a, b) => a + b, 0) / p2.length : null;
  const full = m1 && lv !== null, score = full ? Math.round((p1 / m1 + lv / 5) * 50) : null;
  return `<div class="glass card" style="display:flex;flex-direction:column;gap:14px"><div class="section-h" style="margin:0"><h2>英檢寫作成績（官方換算）</h2>${full ? `<span class="tag" style="background:${score >= 70 ? "var(--good)" : "var(--bad)"};color:#fff">${score} / 100・${score >= 70 ? "通過" : "未通過"}</span>` : ""}</div>
  <div class="stats">${m1 ? `<div class="stat"><div class="k">單句寫作</div><div class="v">${p1}<span class="muted" style="font-size:15px"> / ${m1}</span></div></div>` : ""}${lv !== null ? `<div class="stat"><div class="k">段落寫作</div><div class="v">${Number.isInteger(lv) ? lv : lv.toFixed(1)}<span class="muted" style="font-size:15px"> / 5 級分</span></div></div>` : ""}</div>
  <div class="muted" style="font-size:12.5px">單句寫作每題 0～2 分、段落寫作 0～5 級分；寫作成績＝（單句得分 ÷ 30 ＋ 段落級分 ÷ 5）× 50，70 分通過。${full ? "" : "這次只做了部分題型，所以不換算總分。"}</div></div>`;
}

/* 學生自評：簡化成三個選項（老師批改才用完整的官方量表） */
function selfLevels(max) { return max >= 5 ? [[1, "還需加強"], [3, "中等"], [5, "達到要求"]] : [[0, "還需加強"], [1, "中等"], [max, "達到要求"]]; }
function selfButtonsHTML(q, bank, act) {
  const m = maxPts(q, bank);
  return `<div class="row self-rate">${selfLevels(m).map(([lv, t]) => `<button class="btn ${lv === m ? "primary" : ""}" data-act="${act}" data-v="${lv}">${t}<span class="muted" style="font-size:12px;margin-left:4px">${lv} 分</span></button>`).join("")}</div>`;
}
/* 系統原本判錯嗎（判對的就不用老師批改） */
function sysWrong(a) { if (!a) return false; if (a.sys !== undefined) return !a.sys; if (a.self || a.claim) return true; return a.auto !== undefined ? !a.auto : !a.correct; }
/* 套用老師評分：保留批改前的結果（auto），回傳有變動的題目 */
function applyMarks(att, marks) {
  const changes = [];
  Object.entries(att.ans || {}).forEach(([i, a]) => {
    const X = getQ(+i, att); if (!X) return;
    if (a.auto === undefined) { a.auto = a.correct; a.autoPts = ptsOf(X.q, X.bank, a); }
    const mk = marks && X.group && X.group.kind === "readaloud" ? recIdx(att, +i) : i;   // 英檢朗讀 6 題共用一個評分
    if (marks && mk in marks && marks[mk] !== null) {
      const v = typeof marks[mk] === "number" ? marks[mk] : (marks[mk] ? maxPts(X.q, X.bank) : 0);
      a.pts = v; a.correct = v >= passPts(X.q, X.bank); a.tmark = true;
      if (v !== a.autoPts) changes.push({ i: +i, from: a.autoPts, to: v });
    } else { a.correct = a.auto; a.pts = a.autoPts; delete a.tmark; }
  });
  if (att.origScore === undefined) { att.origScore = att.score; att.origTotal = att.total; }
  // 題庫改版後已刪除的題目算不出分數：保留原本的成績，不要重算
  if ((att.qs || []).every((_, i) => getQ(i, att))) { const P = attPoints(att); att.score = P.s; att.total = P.t; }
  att.regrade = changes;
  return changes;
}
/* 英檢口說朗讀（5 句＋短文＝6 題）共用一段錄音：錄音、評分都記在這段的第一題 */
function recIdx(att, i) {
  const X = getQ(i, att); if (!X || !X.group || X.group.kind !== "readaloud") return i;
  return (att.qs || []).findIndex((_, k) => { const y = getQ(k, att); return y && y.group === X.group; });
}
