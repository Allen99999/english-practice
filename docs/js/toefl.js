/* ===== 托福（2026 新制）：Complete the Words、聽力題組、口說錄音、適應性第二階段、預估級分 ===== */

/* ---------- Complete the Words ---------- */
function groupIdx(g) { return S.qs.map((r, k) => k).filter(k => { const y = getQ(k); return y && y.group === g; }); }
function ctestPassageHTML(X, i) {
  const g = X.group, idxs = groupIdx(g), first = idxs[0], w = S.work[first] || {}, vals = w.ct || {};
  const show = !S.blind && idxs.every(k => S.ans[k]);
  let n = 0;
  const html = esc(g.passage[0]).replace(/([A-Za-z'-]*)\{([A-Za-z'-]+)\}/g, (m, pre, miss) => {
    n++; const k = idxs.find(j => getQ(j).q.blank === n), a = k !== undefined ? S.ans[k] : null;
    if (show && a) return `<span class="ct-word ${a.correct ? "ok" : "no"}">${pre}<b>${esc(a.resp.slice(pre.length) || "＿")}</b>${a.correct ? "" : `<i>${esc(miss)}</i>`}</span>`;
    const v = vals[n] ?? (a ? a.resp.slice(pre.length) : "");
    return `<span class="ct-word ${k === i ? "now" : ""}">${pre}<input class="ct-in" data-n="${n}" maxlength="${miss.length}" placeholder="${"_".repeat(miss.length)}" style="width:${miss.length + 1.2}ch" value="${esc(v)}" autocomplete="off" autocapitalize="off" spellcheck="false" aria-label="第 ${n} 格，缺 ${miss.length} 個字母"></span>`;
  });
  return `<div class="glass card passage"><div class="eyebrow">Reading・Complete the Words</div><h3 class="ptitle">${esc(g.title)}</h3>
  <div class="muted" style="font-size:13.5px">Fill in the missing letters in the paragraph. 每個空格的底線長度＝缺少的字母數。</div>
  <div class="ptext ctest">${html}</div></div>`;
}
function ctestCardHTML(X, i, a) {
  const idxs = groupIdx(X.group), done = idxs.filter(k => S.ans[k]).length;
  if (!S.blind && idxs.every(k => S.ans[k])) {
    const ok = idxs.filter(k => S.ans[k].correct).length;
    return `<div class="stem" style="font-size:17px">這一段答對 <b>${ok} / ${idxs.length}</b> 格。綠色是答對，紅色後面是正確拼法。</div>`;
  }
  return `<div class="stem" style="font-size:17px">在段落的空格裡補上缺少的字母（共 ${idxs.length} 格），全部填好再按確認。</div>
  ${S.blind && done ? `<div class="muted" style="font-size:13.5px">已作答 ${done} 格，可以修改後再按一次確認。</div>` : ""}
  <div class="row"><button class="btn primary" data-act="ct-submit">確認這一段</button></div>`;
}
function ctSubmit() {
  const X = getQ(S.idx), g = X.group, idxs = groupIdx(g), first = idxs[0], w = work(first), vals = w.ct || (w.ct = {});
  document.querySelectorAll(".ct-in").forEach(inp => vals[inp.dataset.n] = inp.value.trim());
  idxs.forEach(k => {
    const q = getQ(k).q, typed = (vals[q.blank] || "").replace(/\s+/g, "");
    const resp = q.pre + typed;
    S.ans[k] = { resp, correct: grade(q, resp), hint: false, t: Math.round(S.elapsed) };
  });
  S.tipSeen = true; save(true);
  if (S.blind) { const nx = Math.max(...idxs) + 1; if (nx < S.qs.length || (typeof adaptPending === "function" && adaptPending())) gotoQ(nx); else rerenderKeep(); toast("已記錄這一段的答案"); }
  else { rerenderKeep(); const ok = idxs.filter(k => S.ans[k].correct).length; ok === idxs.length ? sfxGood(3) : sfxBad(); }
}

/* ---------- 聽力題組（一段錄音接幾題） ---------- */
const SPK_NAME = { W: "Woman", M: "Man", N: "Narrator", WB: "Woman", MB: "Man", WA: "Woman", MA: "Man", WC: "Woman", MC: "Man" };
function listenGroupScript(g) {
  return g.passage.map(l => l.replace(/^([A-Z]{1,2})(\d?): /, (m, w) => (SPK_NAME[w] || w) + ": "));
}
function listenGroupHTML(X, i) {
  const g = X.group, idxs = groupIdx(g), first = idxs[0], w = S.work[first] || {};
  const once = S.blind, used = once && w.played, done = idxs.every(k => S.ans[k]);
  const who = [...new Set(g.passage.map(l => (/^([A-Z]{1,2})\d?: /.exec(l) || [])[1]).filter(Boolean))];
  const ppl = who.map(c => `<span class="spk ${c[0] === "W" ? "w" : c[0] === "M" ? "m" : "n"}">${c[0] === "N" ? I.speaker : `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="8" r="4"/><path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6"/></svg>`}</span>`).join("");
  return `<div class="glass card passage"><div class="eyebrow">Listening</div><h3 class="ptitle">${esc(g.title)}</h3>
  <div class="spk-row">${ppl}</div>
  <div class="listen-bar"><button class="btn ${used ? "" : "primary"}" data-act="lg-play" ${used ? "disabled" : ""}>${I.speaker}<span>${used ? "已播放" : w.played ? "再聽一次" : "播放錄音"}</span></button>
  <span class="muted" style="font-size:13.5px">${once ? "正式考：錄音只播一遍，聽完再作答" : "可以重複聽；這組題目都答完會顯示原文"}</span></div>
  ${!once && done ? `<details class="script"><summary>聽力原文</summary>${listenGroupScript(g).map(l => `<div data-ctx>${wrapWords(l, S.words)}</div>`).join("")}</details>` : ""}</div>`;
}
function playListenGroup() {
  const X = S && getQ(S.idx); if (!X || !X.group) return;
  const first = groupIdx(X.group)[0], w = work(first);
  if (S.blind && w.played) return;
  const items = passageSpeech(X.group).map((it, k, arr) => Object.assign({ gap: k === arr.length - 1 ? 0 : 450 }, it)).filter(it => /[A-Za-z]/.test(it.text));
  w.played = (w.played || 0) + 1; save(true);
  const b = document.querySelector('[data-act="lg-play"]'); if (b) { b.disabled = true; b.innerHTML = `${I.speaker}<span>播放中…</span>`; }
  playItems(items, () => { if (view === "quiz") rerenderKeep(); });
}

/* ---------- 口說：播放題目、錄音、重聽、看參考答案自評 ---------- */
let REC = null;   // { mr, chunks, url, idx, t0, timer }
function speakHTML(q, i, a) {
  const w = S.work[i] || {}, rec = REC && REC.idx === i ? REC : null, locked = !!a;
  const reveal = locked || w.reveal;
  return `<div class="eyebrow">${q.mode === "repeat" ? "Speaking・Listen and Repeat" : "Speaking・Take an Interview"}</div>
  ${q.scenario ? `<div class="boxed" style="font-size:15.5px">${esc(q.scenario)}</div>` : ""}
  <div class="stem" style="font-size:17px">${q.mode === "repeat" ? "聽一句話，然後完整照著說一次（不需要準備時間）。" : "聽訪問者的問題，用約 45 秒回答，要有理由和例子。"}</div>
  <div class="listen-bar"><button class="btn primary" data-act="sp-play">${I.speaker}<span>${w.played ? "再聽一次題目" : "播放題目"}</span></button></div>
  ${q.mode === "interview" && (w.played || reveal) ? `<div class="muted" style="font-size:15px">Q：${esc(q.text)}</div>` : ""}
  <div class="rec-box">${rec && rec.mr && rec.mr.state === "recording"
    ? `<button class="btn danger" data-act="rec-stop"><span class="rec-dot"></span>停止錄音</button><span class="tnum muted" id="rectime">0:00 / ${fmtTime(q.secs)}</span>`
    : `<button class="btn" data-act="rec-start"><span class="rec-dot"></span>${rec && rec.url ? "重新錄音" : "開始錄音"}</button><span class="muted" style="font-size:13px">建議作答時間約 ${q.secs} 秒；${typeof SYNC_ON !== "undefined" && SYNC_ON ? "自評後錄音會上傳給老師" : "錄音只存在這台裝置"}</span>`}
  ${rec && rec.url ? `<audio controls src="${rec.url}" style="width:100%;margin-top:8px"></audio>` : ""}</div>
  ${!reveal ? `<div class="row"><button class="btn ${rec && rec.url ? "primary" : ""}" data-act="sp-reveal">${q.mode === "repeat" ? "看原句並自評" : "看參考回答並自評"}</button></div>`
    : `<div class="model"><div class="step-label">${q.mode === "repeat" ? "原句" : "參考回答"}</div><div class="ptext" style="font-size:16px">${esc(q.mode === "repeat" ? q.text : q.model)}</div></div>
    ${locked ? "" : rubricButtonsHTML(q, null, "sp-rate", null)}`}`;
}
async function recStart() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mr = new MediaRecorder(stream), chunks = [];
    if (REC && REC.url) URL.revokeObjectURL(REC.url);
    REC = { mr, chunks, idx: S.idx, t0: Date.now(), url: null };
    mr.ondataavailable = e => chunks.push(e.data);
    mr.onstop = () => { stream.getTracks().forEach(t => t.stop()); REC.blob = new Blob(chunks, { type: mr.mimeType || "audio/mp4" }); REC.url = URL.createObjectURL(REC.blob); clearInterval(REC.timer); if (view === "quiz") rerenderKeep(); };
    mr.start(); rerenderKeep();
    const lim = getQ(S.idx).q.secs || 45;
    REC.timer = setInterval(() => { const t = (Date.now() - REC.t0) / 1000, el = $("#rectime"); if (el) el.textContent = `${fmtTime(t)} / ${fmtTime(lim)}`; if (t >= lim + 2 && mr.state === "recording") mr.stop(); }, 250);
  } catch (e) { toast("無法使用麥克風：請在瀏覽器允許麥克風權限，或直接用說的再自評"); }
}

/* ---------- 適應性測驗：第一階段（router）答完，依答對率接上較難或較易的第二階段 ---------- */
function toeflAdaptivePlan(gm) {
  return (gm.adaptive || []).filter(sec => sec.tags.some(t => gm.tags.includes(t))).map(sec => {
    const us = unitsFor({ banks: [gm.bank.id], tags: sec.tags, types: TYPE_ORDER });
    const pick = st => us.filter(u => u.stage === st).flatMap(u => u.refs);
    return { name: sec.name, cut: sec.cut || 0.6, router: pick("router"), lower: pick("lower"), upper: pick("upper"), done: false };
  });
}
function adaptPending() { return !!(S && S.adaptive && S.adaptive.some(p => !p.done)); }
function adaptAdvance(n) {
  if (!S.adaptive) return;
  S.adaptive.forEach(p => {
    if (p.done) return;
    const last = Math.max(...p.router.map(r => S.qs.indexOf(r)));
    if (last < 0 || n <= last) return;
    const ok = p.router.filter(r => { const k = S.qs.indexOf(r); return S.ans[k] && S.ans[k].correct; }).length;
    p.level = ok / p.router.length >= p.cut ? "upper" : "lower";
    S.qs.splice(last + 1, 0, ...p[p.level]); p.done = true; save(true);
    toast(`${p.name} 第二階段：${p.level === "upper" ? "較難的題組" : "較基礎的題組"}`);
  });
}

/* ---------- 預估級分（1～6，每 0.5 一級）：依各部分答對率估算，僅供參考 ---------- */
const BAND_CUTS = [[.95, 6], [.9, 5.5], [.83, 5], [.75, 4.5], [.66, 4], [.57, 3.5], [.48, 3], [.38, 2.5], [.28, 2], [.18, 1.5], [0, 1]];
function toeflBandHTML(att) {
  const secs = { r: ["Reading", 0, 0], l: ["Listening", 0, 0], w: ["Writing", 0, 0], s: ["Speaking", 0, 0] };
  let any = false;
  att.qs.forEach((r, i) => {
    const X = getQ(i, att); if (!X || !X.bank || !/^toefl/.test(X.bank.id)) return;
    const sec = secs[(X.q.tag || "")[0]]; if (!sec) return;
    any = true; sec[2] += maxPts(X.q, X.bank); sec[1] += ptsOf(X.q, X.bank, att.ans[i]);
  });
  if (!any) return "";
  const band = p => BAND_CUTS.find(([c]) => p >= c)[1];
  const rows = Object.values(secs).filter(s => s[2]);
  const avg = Math.round(rows.reduce((t, s) => t + band(s[1] / s[2]), 0) / rows.length * 2) / 2;
  return `<div class="glass card" style="display:flex;flex-direction:column;gap:14px"><div class="section-h" style="margin:0"><h2>預估級分（TOEFL 1～6）</h2>${rows.length > 1 ? `<span class="tag">總分約 ${avg.toFixed(1)}</span>` : ""}</div>
  <div class="stats">${rows.map(([n, o, t]) => `<div class="stat"><div class="k">${n}</div><div class="v">${band(o / t).toFixed(1)}</div><div class="muted tnum" style="font-size:12px">${o}/${t}</div></div>`).join("")}</div>
  <div class="muted" style="font-size:12.5px">依得分率估算的參考級分（ETS 沒有公開換算表）；Email、討論、口說每題 0～5 分，依自評或老師評分計算。</div></div>`;
}

/* ---------- 事件 ---------- */
document.addEventListener("click", e => {
  const ra = e.target.closest('[data-act="rec-fetch"]'); if (ra) { fetchRec(ra); return; }   // 老師總覽、結果頁也要能播（不在作答中）
  const act = e.target.closest("[data-act]"); if (!act || !S) return;
  const d = act.dataset, a = d.act;
  if (a === "ct-submit") ctSubmit();
  if (a === "lg-play" && !act.disabled) playListenGroup();
  if (a === "sp-play") { const w = work(S.idx); w.played = (w.played || 0) + 1; save(); playItems(questionSpeech(getQ(S.idx).q), () => { if (view === "quiz") rerenderKeep(); }); }
  if (a === "rec-start") recStart();
  if (a === "rec-stop" && REC && REC.mr && REC.mr.state === "recording") REC.mr.stop();
  if (a === "sp-reveal") { work(S.idx).reveal = true; save(); rerenderKeep(); }
  if (a === "sp-rate") {
    const i = S.idx, rec = REC && REC.idx === i && REC.blob ? REC.blob : null;
    commit({ level: +d.v, rec: !!rec });
    if (rec) uploadRec(rec, S.id, i, S.who);
  }
});
document.addEventListener("input", e => {
  if (!e.target.classList || !e.target.classList.contains("ct-in") || !S) return;
  const first = groupIdx(getQ(S.idx).group)[0], w = work(first); (w.ct || (w.ct = {}))[e.target.dataset.n] = e.target.value; save();
  if (e.target.value.length >= +e.target.maxLength) { const all = [...document.querySelectorAll(".ct-in")], k = all.indexOf(e.target); if (all[k + 1]) all[k + 1].focus(); }
});

/* ---------- 錄音上傳給老師（學生要有個人代碼）；老師在解析裡播放 ---------- */
function uploadRec(blob, attemptId, idx, who, tries = 0) {
  if (typeof SYNC_ON === "undefined" || !SYNC_ON || !store.codes[who]) return;
  if (blob.size > 2900000) { toast("錄音太長，沒有上傳"); return; }
  const fr = new FileReader();
  fr.onload = async () => {
    try { await postSync({ action: "audio", name: who, code: store.codes[who], attemptId, idx, mime: blob.type, data: String(fr.result).split(",")[1] }, 60000); toast("錄音已上傳給老師"); }
    catch (e) { if (tries < 1 && !e.server) setTimeout(() => uploadRec(blob, attemptId, idx, who, tries + 1), 4000); else toast("錄音上傳失敗"); }
  };
  fr.readAsDataURL(blob);
}
async function fetchRec(btn) {
  const code = store.teacherCode; if (!code) { toast("請先在總覽輸入老師代碼"); return; }
  btn.disabled = true; btn.textContent = "載入錄音中…";
  try {
    const r = await fetch(SITE_CONFIG.SYNC_URL + "?action=audio&teacherCode=" + encodeURIComponent(code) + "&att=" + encodeURIComponent(btn.dataset.att) + "&i=" + btn.dataset.i);
    const j = await r.json(); if (!j.ok) throw new Error(j.error);
    const au = document.createElement("audio"); au.controls = true; au.style.width = "100%"; const d0 = j.data.slice(0, 8), mime = d0.startsWith("GkXf") ? "audio/webm" : d0.startsWith("T2dn") ? "audio/ogg" : /^(SUQz|\/\/)/.test(d0) ? "audio/mpeg" : "audio/mp4";   // 依檔案內容判斷格式
    au.src = `data:${mime};base64,${j.data}`;
    btn.replaceWith(au); au.play().catch(() => { });
  } catch (e) { btn.disabled = false; btn.textContent = String(e.message).includes("no audio") ? "找不到錄音（可能還沒上傳完成）" : "載入失敗，再試一次"; }
}
