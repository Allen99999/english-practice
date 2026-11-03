/* ===== 英檢中級口說 AI 批改：看圖敘述的畫面設定、整份口說的估算與總回饋 =====
   後端 apps-script/AiGeptISpeak.gs；評分規則見本機「全民英檢中級口說 評分與回饋系統.md」。
   送出、批改中沿用 gspeakai.js（gsaRun）；朗讀用 gsaReadHTML、回答問題用 gsaShortHTML、看圖敘述用 tsaIvHTML（套這裡的設定）。
   官方是整份一個整體級分（0～5，兩位評分員）；網站依作答時間加權估算：朗讀 28%、回答問題 52%、看圖 20%，取到 0.5，× 20 換百分制，80 分通過。 ===== */
const GIA_W = { read: 0.28, answer: 0.52, pic: 0.20 };
const giaShort = lv => (((RUBRICS.is.levels.find(x => x[0] === lv) || [])[1] || "").split("；")[0]);
const GIA_PIC = { eyebrow: "AI 依英檢中級官方標準・看圖敘述", judge: lv => ({ 5: "表達流暢、切題、語法字彙自如", 4: "大致清晰正確、切題，有錯但無礙溝通", 3: "錯誤影響理解、字彙有限", 2: "錯誤多，無法有效溝通", 1: "幾乎無溝通能力", 0: "未答或等同未答" })[lv],
  desc: lv => giaShort(lv), total: 90, who: "官方",
  caps: { X0: "沒有英文 → 0 級分", ISO: "大多是零散的字詞 → 最高 1 級分", OFF: "說的和圖片無關 → 最高 2 級分", THIN: "說不到 30 秒或只回答一半的問題 → 最高 3 級分", CHOP: "停頓太多、斷斷續續 → 最高 3 級分", PART: "有問題沒有回答 → 最高 4 級分" } };

function giaItems(att) {
  const out = [];
  (att.qs || []).forEach((_, i) => {
    const X = getQ(i, att), a = (att.ans || {})[i]; if (!X || !X.q.gi || X.q.type !== "speak") return;
    if (X.group && gsaSpan(att, i)[0] !== i) return;   // 朗讀 2 篇共用一段錄音、一個評分
    const ai = a && a.resp && a.resp.ai;
    out.push({ i, kind: GSA_SUB[X.q.mode], done: !!ai, level: ai ? Number(ai.level) || 0 : 0, ai, q: X.q });
  });
  return out;
}
function giaEstimate(items) {
  const avg = k => { const a = items.filter(x => x.kind === k); return a.length ? a.reduce((t, x) => t + x.level, 0) / a.length : null; };
  const parts = { read: avg("read"), answer: avg("answer"), pic: avg("pic") }, have = Object.keys(parts).filter(k => parts[k] !== null);
  if (!have.length) return null;
  const wsum = have.reduce((t, k) => t + GIA_W[k], 0), raw = have.reduce((t, k) => t + parts[k] * GIA_W[k], 0) / wsum;
  const level = Math.round(raw * 2) / 2, r1 = x => x === null ? null : Math.round(x * 10) / 10;
  return { level, score: Math.round(level * 20), pass: level >= 4, read: r1(parts.read), answer: r1(parts.answer), pic: r1(parts.pic), full: have.length === 3 };
}
/* 模擬卷交卷前：等背景批改完，再請 AI 寫整份總回饋（存在第一題口說的答案裡，跟著成績上傳） */
async function giaReport(sess) {
  const items = giaItems(sess); if (!items.length || items.some(x => !x.done)) return;
  const first = sess.ans[items[0].i]; if (!first || first.resp.report) return;
  const est = giaEstimate(items); if (!est) return;
  const name = { read: "朗讀短文", answer: "回答問題", pic: "看圖敘述" };
  const sum = items.map((x, k) => ({ n: k + 1, part: name[x.kind], level: x.level, question: x.kind === "read" ? undefined : String(x.q.text || "").slice(0, 160), said: String(x.ai.transcript || "").slice(0, 220),
    note: x.ai.comment || x.ai.diagnosis || "", problems: (x.ai.problems || x.ai.words || x.ai.pronWords || []).map(p => (GSA_CODE[p.code] || "") + "：" + (p.word || "")).slice(0, 3),
    errors: (x.ai.errors || []).map(e => (GSA_CODE[e.code] || "") + "：" + e.original + " → " + e.corrected).slice(0, 3) }));
  try {
    const payload = { action: "aigrade", kind: "gepti-speak", sub: "report", name: sess.who, code: store.codes[sess.who] || "", items: sum, est };
    if (!payload.code && store.teacherCode) payload.teacherCode = store.teacherCode;
    const r = await postSync(payload, 60000);
    first.resp.report = Object.assign({ est }, r.result); save(true);
  } catch (e) { first.resp.report = { est, err: true }; }
}
function giaReportHTML(att) {
  const items = giaItems(att), done = items.filter(x => x.done); if (!done.length) return "";
  const est = done.length === items.length ? giaEstimate(items) : null, rep = (att.ans[items[0].i] || {}).resp && att.ans[items[0].i].resp.report;
  let h = `<div class="glass card sp-report"><div class="section-h" style="margin:0"><h2>🎙️ 英檢中級口說成績（AI 估算）</h2>${est ? `<span class="tag" style="white-space:nowrap;background:${est.pass ? "var(--good)" : "var(--bad)"};color:#fff">${est.score} / 100・${est.pass ? "達到通過標準" : "未達通過標準"}</span>` : ""}</div>`;
  if (est) h += `<div class="sp-dials four">${[["整體級分", est.level, est.level / 5 * 100, "官方整份一個級分・4 級分通過"], ["朗讀短文", est.read, (est.read || 0) / 5 * 100, "佔 28%"], ["回答問題", est.answer, (est.answer || 0) / 5 * 100, `平均・佔 52%`], ["看圖敘述", est.pic, (est.pic || 0) / 5 * 100, "佔 20%"]]
    .filter(x => x[1] !== null).map(([n, v, p, s]) => `<div class="sp-dial"><div class="sp-ring" style="--p:${p};--c:${gsaCol(Math.floor(v))}"><b>${v}</b></div><div><b>${n}</b><div class="muted" style="font-size:12.5px">${s}</div></div></div>`).join("")}</div>`;
  else h += `<div class="muted">AI 已批改 ${done.length} / ${items.length} 題，全部批完才換算成績。</div>`;
  const lab = { read: "朗讀", answer: "回答", pic: "看圖" };
  h += `<div class="sp-parts">${items.map((x, k) => `<span class="sp-pc" title="${esc(x.q.text || "")}" style="--c:${x.done ? gsaCol(x.level) : "var(--ink-3)"}">${lab[x.kind]}${x.kind === "answer" ? " " + items.slice(0, k + 1).filter(y => y.kind === "answer").length : ""}<b>${x.done ? x.level : "–"}</b></span>`).join("")}</div>`;
  if (rep && !rep.err) {
    h += `<div class="sp-say">🎯 ${esc(rep.oneLine || "")}</div><div class="sp-two"><div><b>📖 朗讀短文</b><div>${esc(rep.read || "")}</div></div><div><b>💬 回答問題</b><div>${esc(rep.answer || "")}</div></div><div><b>🖼️ 看圖敘述</b><div>${esc(rep.pic || "")}</div></div></div>`;
    if ((rep.strengths || []).length) h += `<div class="sp-good">👍 ${rep.strengths.map(esc).join("　")}</div>`;
    h += `<div class="sp-sec"><h4>先改這三件事</h4><div class="sp-fixes">${(rep.priorities || []).slice(0, 3).map((p, k) => `<div class="sp-pri"><b><span class="tnum">${k + 1}</span>${esc(p.title)}</b><div class="muted">${esc(p.why)}</div><div>${esc(p.how)}</div></div>`).join("")}</div></div>`;
    if ((rep.week || []).length) h += `<details class="pfold" data-key="gi-week-${esc(att.id)}"><summary><span>📅 接下來一週每天練</span>${I.chevR.replace("<svg", '<svg width="16" height="16"')}</summary><ol style="margin:8px 0 0;padding-left:22px">${rep.week.map(x => `<li>${esc(x)}</li>`).join("")}</ol></details>`;
  }
  h += `<div class="muted" style="font-size:12px">官方是兩位評分老師就整份口說給一個 0～5 級分，× 20 換百分制，80 分（4 級分）通過；官方沒有公布三部分的比重，這裡依作答時間加權估算（朗讀 28%、回答問題 52%、看圖敘述 20%），取到 0.5 級分。${est && !est.full ? "這次不是完整的三部分，估算只供參考。" : ""}每題的回饋在下方解析裡。</div></div>`;
  return h;
}
