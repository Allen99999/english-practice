/* ================= 成績碼（壓縮） ================= */
async function packCode(obj) {
  const json = JSON.stringify(obj);
  try {
    if (typeof CompressionStream === "function") {
      const cs = new Blob([json]).stream().pipeThrough(new CompressionStream("deflate-raw"));
      const buf = new Uint8Array(await new Response(cs).arrayBuffer());
      let bin = ""; for (let i = 0; i < buf.length; i += 0x8000) bin += String.fromCharCode.apply(null, buf.subarray(i, i + 0x8000));
      return "EP1:" + btoa(bin);
    }
  } catch (e) { }
  return "EP0:" + btoa(unescape(encodeURIComponent(json)));
}
async function unpackOne(code) {
  code = code.trim();
  if (code.startsWith("EP1:")) {
    const bin = atob(code.slice(4)); const buf = new Uint8Array(bin.length); for (let i = 0; i < bin.length; i++) buf[i] = bin.charCodeAt(i);
    const ds = new Blob([buf]).stream().pipeThrough(new DecompressionStream("deflate-raw"));
    return JSON.parse(await new Response(ds).text());
  }
  if (code.startsWith("EP0:")) code = code.slice(4);
  return JSON.parse(decodeURIComponent(escape(atob(code))));
}
/* 一次貼上多段成績碼（用空白或換行分開）也可以 */
async function unpackMany(text) {
  const parts = text.split(/\s+/).filter(Boolean);
  const out = [];
  for (const p of parts) out.push(await unpackOne(p));
  return out;
}
function normVocab(vb) { vb = vb || {}; return Object.values(vb).some(v => v && typeof v.k === "string") ? { "未署名": vb } : vb; }

/* ================= 老師總覽 ================= */
let resultBack = "hist";
function allAttempts() {
  const seen = new Set(), out = [];
  const add = (a, src) => { if (!a || seen.has(a.id)) return; seen.add(a.id); out.push(Object.assign({ _src: src }, a)); };
  if (store.tIncludeLocal !== false) store.attempts.forEach(a => add(a, "local"));
  ((store.imported || {}).attempts || []).forEach(a => add(a, "imported"));
  return out.sort((a, b) => b.date - a.date);
}
/* 雲端載入的那份優先（有老師的評分）；沒有才用這台裝置上的 */
function findAtt(id) { return ((store.imported || {}).attempts || []).find(a => a.id === id) || store.attempts.find(a => a.id === id); }
function vocabOf(who) {
  const m = {};
  const merge = src => Object.values((src || {})[who] || {}).forEach(v => { const x = m[v.k]; if (!x || (v.n || 0) > (x.n || 0)) m[v.k] = v; });
  if (store.tIncludeLocal !== false) merge(store.vocab);
  merge((store.imported || {}).vocab);
  ((store.imported || {}).attempts || []).filter(a => (a.who || "未署名") === who).forEach(a => Object.values(a.words || {}).forEach(w => { const v = m[w.k]; if (!v) m[w.k] = { k: w.k, pos: w.pos, zh: w.zh, ph: w.ph, surf: w.surf, ctx: w.ctx ? [w.ctx] : [], n: 1 }; else if (v._fromAtt) v.n++; if (!v) m[w.k]._fromAtt = true; }));
  return Object.values(m);
}
function pct(o, n) { return n ? Math.round(o / n * 100) : 0; }

function teacherHTML() {
  const atts = allAttempts();
  const names = [...new Set(atts.map(a => a.who || "未署名"))];
  if (!names.includes(store.tWho)) store.tWho = names[0] || "";
  const imp = store.imported && store.imported.attempts && store.imported.attempts.length;
  const hr = new Date().getHours(), greet = hr < 5 ? "Burning the midnight oil" : hr < 12 ? "Good morning" : hr < 18 ? "Good afternoon" : "Good evening";
  let h = `<section class="view"><div class="hero"><div class="welcome">
  <div class="eyebrow">${greet}・老師總覽</div>
  <h1 class="wl-title"><span class="wl-1">Welcome back,</span><span class="wl-2">Teacher <em>Allen</em></span></h1>
  <p class="subtitle">Your classroom at a glance — 學生交卷後成績會自動同步，待批改的作答會先出現在這裡。</p></div>
  ${imp ? `<div class="row"><button class="btn ghost" data-act="t-clear">清除已載入的成績</button></div>` : ""}</div>
  <div class="row muted" style="font-size:13.5px;gap:10px"><button class="chip" data-act="t-local" aria-pressed="${store.tIncludeLocal !== false}">包含這台裝置的紀錄</button>
  </div>
  ${typeof syncTeacherHTML === "function" ? syncTeacherHTML() : ""}`;
  h += pendingHTML(atts);
  if (!atts.length) return h + `<div class="glass card empty"><b>還沒有資料</b>在上方輸入老師代碼，按「載入全班成績」。學生交卷後成績會自動同步到這裡。</div></section>`;

  /* 全班摘要表 */
  const rows = names.map(n => {
    const list = atts.filter(a => (a.who || "未署名") === n);
    const ex = list.filter(a => a.kind !== "vocab");
    const avg = ex.length ? Math.round(ex.reduce((s, a) => s + a.score / a.total, 0) / ex.length * 100) : null;
    return { n, count: list.length, avg, last: list[0] ? list[0].date : 0, time: list.reduce((s, a) => s + (a.duration || 0), 0), words: vocabOf(n).length };
  });
  h += `<div class="glass card" style="display:flex;flex-direction:column;gap:12px"><div class="section-h" style="margin:0"><h2>學生一覽</h2><span class="muted" style="font-size:13px">點一列看詳細</span></div>
  <div class="vtable-wrap"><table class="vtable ttable"><thead><tr><th>作答人</th><th>練習次數</th><th>平均答對率</th><th>最近練習</th><th>總時間</th><th>生字</th></tr></thead><tbody>
  ${rows.map(r => `<tr class="trow ${r.n === store.tWho ? "on" : ""}" data-act="t-pick" data-n="${esc(r.n)}" tabindex="0"><td class="vw">${esc(r.n)}</td><td class="tnum">${r.count}</td>
  <td class="tnum">${r.avg === null ? "—" : `<span style="color:${scoreColor(r.avg / 100)};font-weight:750">${r.avg}%</span>`}</td><td class="tnum muted">${fmtDate(r.last)}</td><td class="tnum">${fmtTime(r.time)}</td><td class="tnum">${r.words}</td></tr>`).join("")}
  </tbody></table></div></div>`;

  /* 個人詳細 */
  const who = store.tWho;
  const mine = atts.filter(a => (a.who || "未署名") === who);
  const exams = mine.filter(a => a.kind !== "vocab");
  const best = exams.length ? Math.max(...exams.map(a => pct(a.score, a.total))) : 0;
  const avg = exams.length ? Math.round(exams.reduce((s, a) => s + a.score / a.total, 0) / exams.length * 100) : 0;
  const cardCfg = (mine.slice().sort((a, b) => (b.date || 0) - (a.date || 0)).find(a => a.card && a.card.char) || {}).card;   // 學生交卷時附上的名片
  h += `<div class="section-h"><h2>${esc(who)} 的學習狀況</h2></div>
  ${typeof dashboardHTML === "function" ? dashboardHTML(who, mine, { cfg: cardCfg, readonly: true }) : ""}
  <div class="stats" ${typeof dashboardHTML === "function" ? "hidden" : ""}><div class="stat glass"><div class="k">練習次數</div><div class="v">${mine.length}</div></div>
  <div class="stat glass"><div class="k">平均答對率</div><div class="v" style="color:${scoreColor(avg / 100)}">${exams.length ? avg + "%" : "—"}</div></div>
  <div class="stat glass"><div class="k">最佳成績</div><div class="v">${exams.length ? best + "%" : "—"}</div></div>
  <div class="stat glass"><div class="k">總練習時間</div><div class="v">${fmtTime(mine.reduce((s, a) => s + (a.duration || 0), 0))}</div></div></div>`;
  famRoots(mine).forEach(fr => h += skillBarsHTML(fr, mine, "", false));

  /* 成績走勢：單一數列長條圖（舊→新） */
  const trend = exams.slice(0, 12).reverse();
  if (trend.length) {
    const W = 640, H = 170, pad = 28, bw = Math.min(40, (W - pad * 2) / trend.length - 8);
    const step = (W - pad * 2) / trend.length;
    const y = v => H - 22 - (v / 100) * (H - 48);
    h += `<div class="glass card" style="display:flex;flex-direction:column;gap:10px"><div class="section-h" style="margin:0"><h2>最近成績</h2><span class="muted" style="font-size:13px">答對率（%），由舊到新</span></div>
    <div class="chart-wrap"><svg viewBox="0 0 ${W} ${H}" class="trend" role="img" aria-label="最近 ${trend.length} 次的答對率">
    ${[0, 50, 100].map(g => `<line x1="${pad}" x2="${W - pad}" y1="${y(g)}" y2="${y(g)}" class="gridl"/><text x="${pad - 6}" y="${y(g) + 4}" class="axl" text-anchor="end">${g}</text>`).join("")}
    ${trend.map((a, i) => { const p = pct(a.score, a.total); const x = pad + step * i + (step - bw) / 2; const top = y(p); const ht = Math.max(2, y(0) - top);
      return `<g class="bar-g" data-act="open-att" data-id="${esc(a.id)}"><title>${fmtDate(a.date)}｜${esc(a.title)}｜${a.score}/${a.total}（${p}%）</title>
      <rect x="${x - 4}" y="10" width="${bw + 8}" height="${H - 30}" fill="transparent"/>
      <path d="M${x},${y(0)} V${top + 4} Q${x},${top} ${x + 4},${top} H${x + bw - 4} Q${x + bw},${top} ${x + bw},${top + 4} V${y(0)} Z" class="barm"/>
      ${i === trend.length - 1 || i === 0 ? `<text x="${x + bw / 2}" y="${top - 6}" class="vall" text-anchor="middle">${p}</text>` : ""}</g>`; }).join("")}
    </svg></div></div>`;
  }

  /* 弱點細項 */
  const by = {};
  exams.forEach(a => a.qs.forEach((r, i) => {
    const X = getQ(i, a); if (!X || !X.bank) return;
    const key = X.bank.id + "|" + X.q.tag; const o = by[key] || (by[key] = { bank: X.bank.title, tag: tagName(X.bank, X.q.tag), ok: 0, n: 0 });
    o.n++; if (a.ans[i] && a.ans[i].correct) o.ok++;
  }));
  const weak = Object.values(by).sort((p, q) => p.ok / p.n - q.ok / q.n).slice(0, 10);
  if (weak.length) h += `<div class="glass card" style="display:flex;flex-direction:column;gap:14px"><div class="section-h" style="margin:0"><h2>弱點細項</h2><span class="muted" style="font-size:13px">答對率最低的在最上面</span></div>
  <div class="tagbars">${weak.map(w => `<div class="tb-row" title="${esc(w.bank)}・${esc(w.tag)}：${w.ok}/${w.n}"><span>${esc(w.tag)}<br><span class="muted" style="font-size:12px">${esc(w.bank)}</span></span><span class="track"><i style="width:${w.ok / w.n * 100}%;background:${scoreColor(w.ok / w.n)}"></i></span><span class="pct">${pct(w.ok, w.n)}%</span></div>`).join("")}</div></div>`;

  /* 最常錯的題目 */
  const miss = {};
  exams.forEach(a => a.qs.forEach((r, i) => {
    if (typeof r !== "string") return; const m = miss[r] || (miss[r] = { r, wrong: 0, seen: 0 }); m.seen++; if (!(a.ans[i] && a.ans[i].correct)) m.wrong++;
  }));
  const top = Object.values(miss).filter(m => m.wrong).sort((p, q) => q.wrong - p.wrong || q.wrong / q.seen - p.wrong / p.seen).slice(0, 12);
  if (top.length) h += `<div class="section-h"><h2>最常錯的題目</h2><button class="btn" data-act="t-retry" data-n="${esc(who)}">${I.redo}讓 ${esc(who)} 重練這些題</button></div>
  <div class="rv-list">${top.map(m => {
    const X = QX[m.r]; if (!X) return ""; const q = X.q;
    const sum = q.zh || q.zhPrompt || (q.blank ? `${X.group.title}・第 ${q.blank} 格` : [].concat(q.stem || q.sent || "").join(" "));
    return `<details class="rv"><summary><span class="st no">${m.wrong}</span><span class="sum">${esc(sum)}</span><span class="tag">錯 ${m.wrong}／${m.seen} 次</span><span class="tag">${esc(tagName(X.bank, q.tag))}</span></summary>
    <div class="rv-body">${X.group ? `<div class="muted">題組：${esc(X.group.title)}</div>` : ""}<div>${questionReview(q)}</div><dl class="kv"><dt>正確答案</dt><dd class="ans-ok">${esc(correctText(q))}</dd><dt>解析</dt><dd>${esc(q.exp)}</dd></dl></div></details>`;
  }).join("")}</div>`;

  /* 生字 */
  const words = vocabOf(who).sort((p, q) => (q.n || 0) - (p.n || 0)).slice(0, 20);
  if (words.length) h += `<div class="glass card" style="display:flex;flex-direction:column;gap:12px"><div class="section-h" style="margin:0"><h2>常標記的生字</h2><span class="muted" style="font-size:13px">依標記次數</span></div>${vtable(words)}</div>`;

  /* 最近紀錄 */
  h += `<div class="section-h"><h2>最近紀錄</h2></div><div class="glass card hist">${mine.slice(0, 15).map(histItem).join("")}</div>`;
  return h + `</section>`;
}

/* ================= 老師批改 ================= */
const GRADE_TYPES = ["rewrite", "trans", "essay", "speak"];   // 需要老師判斷的題型：寫作、句子改寫、翻譯、口說
/* 要老師批改的題目：作文、口說一律要；改寫、翻譯只有「系統判錯」的才要（不管學生有沒有反應） */
function gradeIdx(att) { return (att.qs || []).map((_, i) => i).filter(i => { const X = getQ(i, att), a = att.ans && att.ans[i]; if (!X || !a || !GRADE_TYPES.includes(X.q.type)) return false; if (X.group && X.group.kind === "readaloud" && recIdx(att, i) !== i) return false;   // 英檢朗讀 6 題共用一段錄音：只列第一題
    return X.q.type === "essay" || X.q.type === "speak" || sysWrong(a); }); }
function isRemote(att) { return ((store.imported || {}).attempts || []).some(a => a.id === att.id); }
function rv(att) { return (store.reviews || {})[att.id] || { done: false, marks: {} }; }
/* 把老師的改判套到載入的紀錄上（保留系統原本的判定，取消改判時可以還原） */
function applyReviews() { ((store.imported || {}).attempts || []).forEach(att => applyMarks(att, rv(att).marks || {})); }
function pendingHTML(atts) {
  if (!store.teacherCode) return "";
  const list = atts.filter(a => isRemote(a) && !rv(a).done && gradeIdx(a).length);
  if (!list.length) return `<div class="glass card" style="display:flex;align-items:center;gap:12px"><span class="fb-ic" style="width:30px;height:30px;border-radius:50%;display:grid;place-items:center;background:var(--good);color:#fff">${I.check}</span><div><b>沒有待批改的作答</b><div class="muted" style="font-size:13.5px">寫作、句子改寫、翻譯和口說題，都會先出現在這裡等你批改。</div></div></div>`;
  const byWho = {}; list.forEach(a => (byWho[a.who || "未署名"] = byWho[a.who || "未署名"] || []).push(a));
  return `<div class="section-h"><h2>待批改</h2><span class="tag" style="background:var(--bad);color:#fff">${list.length} 回</span></div>
  <div class="pending">${Object.entries(byWho).map(([who, arr]) => `<details class="glass card pend" data-who="${esc(who)}" ${store.ui && store.ui["pend:" + who] ? "open" : ""}>
    <summary><span class="pend-ava">${esc(who.slice(0, 1))}</span><b style="font-size:17px">${esc(who)}</b><span class="muted" style="font-size:13.5px">${arr.length} 回待批改</span><span class="fold-ic" style="margin-left:auto">${I.chevR}</span></summary>
    <div class="pend-list">${arr.map(att => `<button class="pend-row" data-act="t-grade" data-id="${esc(att.id)}"><span class="tag">第 ${roundNo(att)} 回</span><span style="flex:1;min-width:0;text-align:left"><b>${esc(att.title)}</b><br><span class="muted tnum" style="font-size:12.5px">${fmtDate(att.date)}・${gradeIdx(att).length} 題要批改</span></span>${I.chevR}</button>`).join("")}</div></details>`).join("")}</div>`;
}
/* 第幾回：這位學生的第幾份作答（由舊到新） */
function roundNo(att) { const mine = allAttempts().filter(a => (a.who || "未署名") === (att.who || "未署名")).sort((a, b) => a.date - b.date); return mine.findIndex(a => a.id === att.id) + 1; }
/* 批改頁：一回裡所有要批改的題目 */
function gradeHTML(id) {
  const att = findAtt(id);
  if (!att) return `<section class="view"><div class="glass card empty"><b>找不到這筆紀錄</b><button class="btn" data-act="tab" data-v="teacher">回總覽</button></div></section>`;
  const idx = gradeIdx(att), P = attPoints(att), done = rv(att).done;
  return `<section class="view"><div class="row" style="justify-content:space-between"><button class="btn ghost" data-act="tab" data-v="teacher">${I.chevL}總覽</button><span class="muted" style="font-size:14px">${fmtDate(att.date)}</span></div>
  <div><div class="eyebrow">批改・第 ${roundNo(att)} 回</div><h1 class="large-title" style="font-size:clamp(26px,5vw,36px)"><span class="tag who-tag" style="font-size:16px;vertical-align:middle">${esc(att.who || "未署名")}</span> ${esc(att.title)}</h1>
  <p class="subtitle">共 ${idx.length} 題需要你評分・目前得分 ${P.s} / ${P.t}</p></div>
  <div class="pend-list">${idx.map(i => gradeItemHTML(att, i)).join("")}</div>
  <div class="row" style="justify-content:flex-end;gap:10px"><button class="btn ghost" data-act="open-att" data-id="${esc(att.id)}">看整份解析</button>
  <button class="btn primary big" data-act="t-done" data-id="${esc(att.id)}" data-v="${done ? "" : "1"}" data-back="1">${done ? "改回未批改" : `${I.check}批改完成`}</button></div></section>`;
}
function gradeItemHTML(att, i) {
  const X = getQ(i, att), q = X.q, a = att.ans[i];
  return `<div class="pend-item"><div class="row" style="gap:8px"><span class="tag">第 ${i + 1} 題</span><span class="tag">${esc(tagName(X.bank, q.tag))}</span></div>
  <div style="font-size:15.5px">${questionReview(q)}</div>
  <dl class="kv"><dt>學生答案</dt><dd style="white-space:pre-wrap">${esc(respText(q, a))}</dd>${q.type === "essay" || q.type === "speak" ? "" : `<dt>參考答案</dt><dd class="ans-ok">${esc(correctText(q))}</dd>`}</dl>
  ${q.type === "speak" ? `<button class="btn" data-act="rec-fetch" data-att="${esc(att.id)}" data-i="${recIdx(att, i)}">${I.play}播放學生錄音</button>` : ""}
  ${typeof isAiQ === "function" && isAiQ(q) && a && a.resp && a.resp.ai && typeof aiReviewHTML === "function" ? `<div class="ai-tsum"><b>AI 評分 ${a.resp.ai.score} / 5</b>・${esc(a.resp.ai.diagnosis || "")}</div><details class="pfold" data-key="t-ai-${esc(att.id)}-${i}"><summary><span>看 AI 完整批改</span>${I.chevR.replace("<svg", '<svg width="16" height="16"')}</summary>${aiReviewHTML(q, a, att, i)}</details>` : ""}
  ${gradeButtonsHTML(att, i, true)}</div>`;
}
/* 改判按鈕（老師裝置、雲端紀錄、需批改的題型才顯示） */
function gradeButtonsHTML(att, i, full) {
  if (!store.teacherCode || !isRemote(att)) return "";
  const X = getQ(i, att); if (!X || !GRADE_TYPES.includes(X.q.type) || !att.ans[i]) return "";
  const a = att.ans[i], m = maxPts(X.q, X.bank), before = a.autoPts !== undefined ? a.autoPts : ptsOf(X.q, X.bank, a);
  const why = X.q.type === "essay" || X.q.type === "speak" ? `學生自評 ${before} 分` : (a.claim || a.self) ? `系統判錯・<b style="color:var(--gold)">學生反應「我寫的也對」</b>（暫給 ${before} 分）` : `系統判錯（${before} 分）`;
  return `<div class="grade-bar"><span style="font-size:13.5px">${why}${a.tmark ? `　→　<b class="tscore">老師評分 ${ptsOf(X.q, X.bank, a)} / ${m} 分</b>` : `　<span class="muted">尚未評分</span>`}</span>
  ${a.tmark ? `<button class="chip" data-act="t-mark" data-id="${esc(att.id)}" data-i="${i}" data-v="">還原</button>` : ""}</div>
  ${rubricButtonsHTML(X.q, X.bank, "t-mark", a.tmark ? ptsOf(X.q, X.bank, a) : null, `data-id="${esc(att.id)}" data-i="${i}"`)}`;
}
function teacherResultBar(att) {
  if (!store.teacherCode || !isRemote(att)) return "";
  const need = gradeIdx(att).length, done = rv(att).done;
  return `<div class="glass card row" style="justify-content:space-between;gap:10px">
  <span>${need ? (done ? `<b style="color:var(--good)">${I.check} 已批改完成</b>` : `<b style="color:var(--bad)">待批改</b>・${need} 題需要你判斷（在下方解析裡改判）`) : `<span class="muted">這份沒有需要人工批改的題目</span>`}</span>
  <div class="row" style="gap:8px">${need ? `<button class="btn ${done ? "ghost" : "primary"}" data-act="t-done" data-id="${esc(att.id)}" data-v="${done ? "" : "1"}">${done ? "改回未批改" : "標記批改完成"}</button>` : ""}
  <button class="btn danger" data-act="t-del" data-id="${esc(att.id)}">刪除這筆紀錄</button></div></div>`;
}
async function teacherPost(body, okMsg) {
  try { const j = await postSync(Object.assign({ teacherCode: store.teacherCode }, body), 30000); if (okMsg) toast(okMsg); return j; }
  catch (e) { toast(e.server ? (String(e.message).includes("teacher") ? "老師代碼不對" : String(e.message).includes("locked") ? "老師代碼輸錯太多次，請稍後再試" : "操作失敗") : "連不上網路，請稍後再試"); return null; }
}

/* ================= 朗讀 ================= */
let reading = null;
function stopReading() {
  try { speechSynthesis.cancel(); } catch (e) { }
  reading = null;
  document.querySelectorAll(".speaking").forEach(x => x.classList.remove("speaking"));
  document.querySelectorAll('[data-act="read-all"]').forEach(b => b.innerHTML = `${I.speaker}<span>朗讀全文</span>`);
}
function enVoices() {
  try { const v = speechSynthesis.getVoices().filter(x => /^en[-_]/i.test(x.lang) || x.lang === "en"); const us = v.filter(x => /US/i.test(x.lang)); return us.length >= 2 ? us : v; } catch (e) { return []; }
}
function speakQueue(items, onStart) {
  stopReading();
  let voices = enVoices(); const vmap = {}; let nextV = 0;
  const rate = store.settings.rate || 0.9;
  reading = { n: items.length };
  items.forEach((it, i) => {
    const u = new SpeechSynthesisUtterance(it.text); u.lang = "en-US"; u.rate = rate;
    if (it.who && voices.length > 1) { if (!(it.who in vmap)) vmap[it.who] = voices[(nextV++) % Math.min(voices.length, 3)]; u.voice = vmap[it.who]; }
    else if (voices[0]) u.voice = voices[0];
    u.onstart = () => { document.querySelectorAll(".speaking").forEach(x => x.classList.remove("speaking")); if (it.el && it.el.isConnected) it.el.classList.add("speaking"); onStart && onStart(i); };
    if (i === items.length - 1) u.onend = () => stopReading();
    speechSynthesis.speak(u);
  });
}
function readPassage() {
  if (reading) { stopReading(); return; }
  const els = [...document.querySelectorAll(".passage .ptext > p, .passage .ptext > .dl")];
  const items = els.map(el => {
    const c = el.cloneNode(true); let who = null;
    const sp = c.querySelector(".spk"); if (sp) { who = sp.textContent.replace(":", "").trim(); sp.remove(); }
    c.querySelectorAll(".cz").forEach(z => { z.textContent = z.classList.contains("done") ? " " + z.textContent.replace(/^\d+\.\s*/, "") + " " : " blank " + z.textContent + " "; });
    return { el, who, text: c.textContent.replace(/[•✔✘]/g, " ").replace(/\s+/g, " ").trim() };
  }).filter(x => x.text);
  if (!items.length) return;
  try { speakQueue(items); } catch (e) { toast("這個瀏覽器不支援朗讀"); return; }
  document.querySelectorAll('[data-act="read-all"]').forEach(b => b.innerHTML = `${I.stop}<span>停止</span>`);
}
function readQuestion() {
  const box = $("#qcard"); if (!box) return;
  const parts = [];
  box.querySelectorAll(".stem, .boxed").forEach(s => { const ls = s.querySelectorAll(".line, :scope > div"); if (ls.length) ls.forEach(l => parts.push(l)); else parts.push(s); });
  const items = parts.map(el => { const c = el.cloneNode(true); let who = null; const sp = c.querySelector(".spk"); if (sp) { who = sp.textContent.replace(":", "").trim(); sp.remove(); }
    c.querySelectorAll(".blank:not(.filled)").forEach(b => b.textContent = " blank "); c.querySelectorAll("input").forEach(inp => inp.replaceWith(" blank "));
    return { el, who, text: c.textContent.replace(/\s+/g, " ").trim() }; }).filter(x => x.text && /[A-Za-z]/.test(x.text));
  if (!items.length) { toast("這題沒有英文可以念"); return; }
  try { speakQueue(items); } catch (e) { toast("這個瀏覽器不支援朗讀"); }
}

/* ================= 事件（老師、朗讀、成績碼） ================= */
document.addEventListener("click", async e => {
  const act = e.target.closest("[data-act]"); if (!act) return;
  const d = act.dataset;
  switch (d.act) {
    case "read-all": readPassage(); break;
    case "read-q": readQuestion(); break;
    case "rate": store.settings.rate = +d.v; save(); document.querySelectorAll('[data-act="rate"]').forEach(b => b.setAttribute("aria-pressed", b.dataset.v === d.v)); if (reading) readPassage(); break;
    case "t-pick": store.tWho = d.n; save(); rerenderKeep(); break;
    case "t-grade": go("grade", d.id); break;
    case "t-mark": {
      const id = d.id, i = d.i, v = d.v === "" ? null : +d.v;
      const r = (store.reviews || (store.reviews = {}))[id] || (store.reviews[id] = { done: false, marks: {} });
      if (v === null) delete r.marks[i]; else r.marks[i] = v;
      applyReviews(); save(true); rerenderKeep();
      teacherPost({ action: "review", attemptId: id, marks: { [i]: v } }, v === null ? "已還原" : `已給 ${v} 分`);
      break;
    }
    case "t-done": {
      const id = d.id, done = d.v === "1";
      const r = (store.reviews || (store.reviews = {}))[id] || (store.reviews[id] = { done: false, marks: {} });
      r.done = done; save(true); if (d.back && done) go("teacher"); else rerenderKeep();
      teacherPost({ action: "review", attemptId: id, done }, done ? "已標記批改完成" : "已改回未批改");
      break;
    }
    case "t-del": {
      const att = findAtt(d.id);
      sheet(`<h3>刪除這筆紀錄？</h3><p class="muted" style="margin:0 0 16px">${esc(att ? (att.who || "未署名") + "・" + att.title : "")}<br>會從雲端成績、批改紀錄和錄音一起刪除，無法復原。如果這位學生的紀錄全部刪光，他也會從學生列表消失。</p>
      <div class="row" style="justify-content:flex-end"><button class="btn" data-act="close-sheet">取消</button><button class="btn danger" data-act="t-del-now" data-id="${esc(d.id)}">刪除</button></div>`);
      break;
    }
    case "t-del-now": {
      act.disabled = true; act.textContent = "刪除中…";
      const j = await teacherPost({ action: "delete", attemptId: d.id }, "已刪除這筆紀錄");
      if (!j) { act.disabled = false; act.textContent = "刪除"; break; }
      const imp = store.imported || { attempts: [] };
      imp.attempts = (imp.attempts || []).filter(a => a.id !== d.id); store.attempts = store.attempts.filter(a => a.id !== d.id);
      if (store.reviews) delete store.reviews[d.id];
      save(true); closeSheet(); go("teacher");
      break;
    }
    case "t-local": store.tIncludeLocal = store.tIncludeLocal === false; save(); rerenderKeep(); break;
    case "t-import": sheet(`<h3>貼上學生的成績碼</h3><p class="muted" style="margin:0 0 10px">可以一次貼好幾位學生的成績碼，用換行分開。重複的紀錄會自動略過。</p><textarea class="field" id="tcode" style="font-size:12px;min-height:160px" placeholder="EP1:..."></textarea><div class="row" style="justify-content:flex-end;margin-top:12px"><button class="btn" data-act="close-sheet">取消</button><button class="btn primary" data-act="t-do-import">匯入</button></div>`); break;
    case "t-do-import": {
      try {
        const packs = await unpackMany($("#tcode").value);
        const imp = store.imported || (store.imported = { attempts: [], vocab: {}, at: 0 });
        const ids = new Set(imp.attempts.map(a => a.id)); let n = 0;
        packs.forEach(p => {
          (p.attempts || []).forEach(a => { if (!ids.has(a.id)) { imp.attempts.push(a); ids.add(a.id); n++; } });
          Object.entries(normVocab(p.vocab)).forEach(([who, words]) => { const T0 = imp.vocab[who] || (imp.vocab[who] = {}); Object.entries(words).forEach(([k, v]) => { if (!T0[k] || (v.n || 0) > (T0[k].n || 0)) T0[k] = v; }); });
        });
        imp.at = Date.now(); save(true); closeSheet(); render(); toast(`匯入 ${n} 筆新紀錄`);
      } catch (er) { toast("成績碼格式不對，請確認有完整貼上"); }
      break;
    }
    case "t-clear":
      if (d.confirm) { store.imported = null; save(true); render(); toast("已清除匯入資料"); }
      else { act.dataset.confirm = "1"; act.textContent = "再按一次確認清除"; setTimeout(() => { if (act.isConnected) { delete act.dataset.confirm; act.textContent = "清除已載入的成績"; } }, 2500); }
      break;
    case "t-retry": {
      const refs = Object.values(allAttempts().filter(a => (a.who || "未署名") === d.n && a.kind !== "vocab").reduce((m, a) => { a.qs.forEach((r, i) => { if (typeof r === "string" && !(a.ans[i] && a.ans[i].correct)) m[r] = r; }); return m; }, {})).slice(0, 30);
      if (!refs.length) { toast("沒有錯題"); break; }
      newSession(shuffle(refs), { kind: "exam", who: d.n, title: "老師指定・錯題重練", banks: [] });
      break;
    }
    case "backup": {
      sheet(`<h3>備份碼</h3><p class="muted" style="margin:0 0 10px">把這段文字存到備忘錄或傳給自己，之後在「貼上備份碼還原」貼回來。</p><textarea class="field" id="bk" readonly style="font-size:12px;min-height:140px">產生中…</textarea><div class="row" style="justify-content:flex-end;margin-top:12px"><button class="btn" data-act="close-sheet">關閉</button><button class="btn primary" data-act="copy">複製</button></div>`);
      const code = await packCode({ v: 2, attempts: store.attempts, vocab: store.vocab });
      const t = $("#bk"); if (t) t.value = code; break;
    }
    case "do-restore": {
      try {
        const packs = await unpackMany($("#rs").value);
        const ids = new Set(store.attempts.map(a => a.id)); let n = 0;
        packs.forEach(p => {
          (p.attempts || []).forEach(a => { if (!ids.has(a.id)) { store.attempts.push(a); ids.add(a.id); n++; } });
          Object.entries(normVocab(p.vocab)).forEach(([who, words]) => { const T0 = store.vocab[who] || (store.vocab[who] = {}); Object.entries(words).forEach(([k, v]) => { if (!T0[k]) T0[k] = v; }); });
        });
        store.attempts.sort((a, b) => b.date - a.date);
        save(true); closeSheet(); render(); toast(`已還原 ${n} 筆紀錄`);
      } catch (er) { toast("備份碼格式不對，請確認有完整貼上"); }
      break;
    }
    case "share-code": {
      const who = store.histWho;
      const atts = store.attempts.filter(a => !who || (a.who || "未署名") === who);
      const vocab = who ? { [who]: store.vocab[who] || {} } : store.vocab;
      sheet(`<h3>${who ? esc(who) + " 的" : "全部"}成績碼</h3><p class="muted" style="margin:0 0 10px">把這段文字傳給老師（LINE、訊息都可以）。老師在「總覽」頁貼上就能看到成績。</p><textarea class="field" id="bk" readonly style="font-size:12px;min-height:140px">產生中…</textarea><div class="row" style="justify-content:flex-end;margin-top:12px"><button class="btn" data-act="close-sheet">關閉</button><button class="btn primary" data-act="copy">複製</button></div>`);
      const code = await packCode({ v: 2, attempts: atts, vocab });
      const t = $("#bk"); if (t) t.value = code;
      break;
    }
  }
});
/* 待批改的學生卡片：記住展開狀態 */
document.addEventListener("toggle", e => { const p = e.target; if (p.classList && p.classList.contains("pend")) { store.ui = store.ui || {}; store.ui["pend:" + p.dataset.who] = p.open; save(); } }, true);
