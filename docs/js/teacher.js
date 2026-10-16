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
function findAtt(id) { return store.attempts.find(a => a.id === id) || ((store.imported || {}).attempts || []).find(a => a.id === id); }
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
  let h = `<section class="view"><div class="hero"><div><div class="eyebrow">Teacher</div><h1 class="large-title">老師總覽</h1>
  <p class="subtitle">貼上學生傳來的成績碼，就能看到每個人的分數、弱點和最常錯的題目。</p></div>
  <div class="row"><button class="btn primary" data-act="t-import">貼上成績碼</button>${imp ? `<button class="btn ghost" data-act="t-clear">清除匯入</button>` : ""}</div></div>
  <div class="row muted" style="font-size:13.5px;gap:10px"><button class="chip" data-act="t-local" aria-pressed="${store.tIncludeLocal !== false}">包含這台裝置的紀錄</button>
  ${imp ? `<span>已匯入 ${store.imported.attempts.length} 筆・最後匯入 ${fmtDate(store.imported.at)}</span>` : ""}</div>
  ${typeof syncTeacherHTML === "function" ? syncTeacherHTML() : ""}`;
  if (!atts.length) return h + `<div class="glass card empty"><b>還沒有資料</b>請學生到「紀錄」頁按「給老師的成績碼」，把那段文字傳給你，再貼到這裡。</div></section>`;

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
  h += `<div class="section-h"><h2>${esc(who)} 的學習狀況</h2></div>
  <div class="stats"><div class="stat glass"><div class="k">練習次數</div><div class="v">${mine.length}</div></div>
  <div class="stat glass"><div class="k">平均答對率</div><div class="v" style="color:${scoreColor(avg / 100)}">${exams.length ? avg + "%" : "—"}</div></div>
  <div class="stat glass"><div class="k">最佳成績</div><div class="v">${exams.length ? best + "%" : "—"}</div></div>
  <div class="stat glass"><div class="k">總練習時間</div><div class="v">${fmtTime(mine.reduce((s, a) => s + (a.duration || 0), 0))}</div></div></div>`;

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
      return `<g class="bar-g" data-act="open-att" data-id="${a.id}"><title>${fmtDate(a.date)}｜${a.title}｜${a.score}/${a.total}（${p}%）</title>
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
      else { act.dataset.confirm = "1"; act.textContent = "再按一次確認清除"; setTimeout(() => { if (act.isConnected) { delete act.dataset.confirm; act.textContent = "清除匯入"; } }, 2500); }
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
