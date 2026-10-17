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
  ti: { name: "Take an Interview 評分（ETS 0～5 分）", max: 5, pass: 3, levels: [
    [5, "流暢清楚、語調自然；文法精準、用字豐富；回答完整有條理"], [4, "大致流暢清楚，偶有停頓或小錯；回答充分"],
    [3, "停頓較多但聽得懂；有些文法錯誤；回答切題但發展不足"], [2, "停頓頻繁、要費力聽；錯誤多；回答發展不足或組織不清"],
    [1, "嚴重停頓、難以理解；回答零碎"], [0, "沒有回答，或內容無關"]] }
};
function rubricOf(q, bank) {
  if (!q) return null;
  if (q.type === "essay") return RUBRICS[q.label ? "tw" : "ge"];
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
    if (marks && i in marks && marks[i] !== null) {
      const v = typeof marks[i] === "number" ? marks[i] : (marks[i] ? maxPts(X.q, X.bank) : 0);
      a.pts = v; a.correct = v >= passPts(X.q, X.bank); a.tmark = true;
      if (v !== a.autoPts) changes.push({ i: +i, from: a.autoPts, to: v });
    } else { a.correct = a.auto; a.pts = a.autoPts; delete a.tmark; }
  });
  if (att.origScore === undefined) { att.origScore = att.score; att.origTotal = att.total; }
  const P = attPoints(att); att.score = P.s; att.total = P.t; att.regrade = changes;
  return changes;
}
