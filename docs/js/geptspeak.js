/* ===== 全民英檢初級口說：照 LTTC 官方流程自動進行 =====
   複誦：題目播兩次（間隔約 1.5 秒）→ 嗶一聲 → 跟著唸（錄音，時間到自動停）
   朗讀句子與短文：看 1 分鐘 → 嗶 → 錄 1 分鐘（5 句＋短文照官方算 6 題，共用一段錄音）
   回答問題：題目播兩次 → 嗶 → 回答 15 秒
   正式模擬卷（S.mock）：像正式考試一樣一路考完：不能重聽、重錄，不自評，錄完自動上傳並進下一題；評分交給老師（之後接 AI 批改）
   練習：可以重聽、重錄，錄完看原句／參考回答、聽示範，再自評 */
let GSP = null;                 // 這一題的進行狀態 { key, i, phase: play|prep|rec|done, n, t0, dur, timer, mr, blob, url }
let GSTREAM = null, GACTX = null;
const GS_PART = {
  "g-repeat": ["第一部分・複誦", "題目不印在試卷上，會播出兩次，兩次之間約有 1～2 秒的間隔。聽完兩次、聽到嗶聲後，請立刻跟著唸一次。"],
  "g-read": ["第二部分・朗讀句子與短文", "請先用 1 分鐘的時間閱讀下面的句子與短文，聽到嗶聲後，以正常的速度在 1 分鐘內將句子和短文清楚正確地唸出來。"],
  "g-answer": ["第三部分・回答問題", "題目不印在試卷上，每題播出兩次。聽到嗶聲後請馬上回答，每題回答時間 15 秒；不一定要用完整的句子，請在作答時間內盡量表達。"]
};
const gsKey = i => S.id + ":" + ctSpan(i)[0];
const gsCur = i => GSP && GSP.key === gsKey(i) ? GSP : null;
const gsMock = () => !!(S && S.mock);
function gsAnswered(i) { const [a, b] = ctSpan(i); for (let k = a; k <= b; k++) if (!S.ans[k]) return false; return true; }
const gsAlive = G => GSP === G && view === "quiz" && S && gsKey(S.idx) === G.key;
function gsRender() { if (view === "quiz") rerenderKeep(); }

/* ---------- 畫面 ---------- */
function geptSpeakHTML(q, i, a) {
  const X = getQ(i), mock = gsMock(), G = gsCur(i), done = gsAnswered(i), [part, instr] = GS_PART[q.mode], s0 = ctSpan(i)[0];
  let h = `<div class="eyebrow">全民英檢初級口說・${part}</div><div class="instr">${instr}</div>`;
  if (q.mode === "g-read") h += `<div class="gsp-read">${X.group.passage.map((t, k, arr) => `<div class="gsp-line ${k === arr.length - 1 ? "psg" : ""}"><span class="tag">${s0 + k + 1}</span><span>${esc(t)}</span></div>`).join("")}</div>`;
  h += `<div class="rec-box">${gsStatusHTML(q, G, done, mock)}</div>`;
  if (!mock && (done || (G && G.phase === "done"))) h += gsRevealHTML(q, X, done);
  return h;
}
function gsStatusHTML(q, G, done, mock) {
  if (done && mock) return `<span class="gsp-st">${I.check}<span>這題已錄音${(S.ans[ctSpan(S.idx)[0]].resp || {}).rec ? "" : "（沒有錄到聲音）"}。正式考試不能重錄。</span></span>`;
  if (done) return `${G && G.url ? `<audio controls src="${G.url}" style="width:100%"></audio>` : `<span class="gsp-st">${I.check}<span>這題已完成。</span></span>`}<button class="btn" data-act="gsp-redo">重新作答</button>`;
  if (!G) {
    const label = mock ? (S.gspStarted ? "繼續口說測驗" : "開始口說測驗") : q.mode === "g-read" ? "開始（先看 1 分鐘）" : "播放題目";
    return `<button class="btn primary" data-act="gsp-go">${q.mode === "g-read" ? I.play : I.speaker}<span>${label}</span></button>
    <span class="muted" style="font-size:13px">${mock ? "開始後會一路自動進行到口說測驗結束：播題目 → 嗶聲 → 錄音 → 下一題，中間不能重聽或重錄。請先確認麥克風可以使用、周圍安靜。" : "播完題目會嗶一聲，接著自動錄音。"}${typeof SYNC_ON !== "undefined" && SYNC_ON ? "錄音會上傳給老師。" : "錄音只存在這台裝置。"}</span>`;
  }
  if (G.phase === "play") return `<span class="gsp-st">${I.speaker}<span>播放題目中（第 ${G.n} 次，共 2 次）…</span></span>`;
  if (G.phase === "prep") return `<span class="gsp-st">閱讀準備時間，剩 <b class="tnum" id="gsp-time">${fmtTime(G.dur)}</b></span>${mock ? "" : `<button class="btn" data-act="gsp-skip">準備好了，開始朗讀</button>`}`;
  if (G.phase === "rec") return `<span class="gsp-st"><span class="rec-dot"></span>錄音中 <b class="tnum" id="gsp-time">0:00 / ${fmtTime(G.dur)}</b></span>${mock ? "" : `<button class="btn danger" data-act="gsp-stop"><span class="rec-dot"></span>${q.mode === "g-read" ? "唸完了" : "停止錄音"}</button>`}`;
  if (mock) return `<span class="gsp-st">${I.check}<span>錄音完成，準備下一題…</span></span>`;
  return `${G.url ? `<audio controls src="${G.url}" style="width:100%"></audio>` : `<span class="muted">沒有錄到聲音。</span>`}<button class="btn" data-act="gsp-redo">重新作答</button>`;
}
function gsRevealHTML(q, X, done) {
  const btn = t => `<button class="btn sm" data-act="gsp-model">${I.speaker}<span>${t}</span></button>`, i = S.idx;
  const aiH = typeof gsaQuizHTML === "function" ? gsaQuizHTML(q, i) : "", aiWait = typeof gsaBusy === "function" && (gsaBusy(S, i) || gsaHasAi(i) || (gsaOn() && !(S.work[ctSpan(i)[0]] || {}).gsaErr));
  let h = aiH;
  if (q.mode === "g-repeat") h += `<div class="model"><div class="step-label">原句</div><div class="ptext" style="font-size:16px">${esc(q.text)}</div>${btn("再聽一次")}</div>`;
  if (q.mode === "g-read") h += `<div class="model"><div class="step-label">示範朗讀</div>${btn("聽示範朗讀")}</div>`;
  if (q.mode === "g-answer") h += `<div class="model"><div class="step-label">題目</div><div class="ptext" style="font-size:16px">${esc(q.text)}</div>
    <div class="step-label" style="margin-top:8px">參考回答</div><div class="ptext" style="font-size:16px">${esc(q.model)}</div>${btn("聽參考回答")}</div>`;
  if (q.exp) h += `<div class="muted" style="font-size:14px">${esc(q.exp)}</div>`;
  if (!done && !aiWait) h += `<div class="muted" style="font-size:13px">先自己評一次：</div>` + selfButtonsHTML(q, X.bank, "gsp-rate");
  return h;
}

/* ---------- 流程 ---------- */
async function gsStream() {
  if (GSTREAM && GSTREAM.getTracks().some(t => t.readyState === "live")) return GSTREAM;
  return GSTREAM = await navigator.mediaDevices.getUserMedia({ audio: { channelCount: 1, echoCancellation: true, noiseSuppression: true } });
}
function gsRelease() { if (GSTREAM) GSTREAM.getTracks().forEach(t => t.stop()); GSTREAM = null; }
function gsBeep() {
  try { GACTX = GACTX || new (window.AudioContext || window.webkitAudioContext)(); const o = GACTX.createOscillator(), g = GACTX.createGain();
    o.frequency.value = 880; g.gain.value = .12; o.connect(g); g.connect(GACTX.destination); o.start(); o.stop(GACTX.currentTime + .25); } catch (e) { }
}
async function gsGo(i) {
  const q = getQ(i).q;
  try { GACTX = GACTX || new (window.AudioContext || window.webkitAudioContext)(); GACTX.resume(); } catch (e) { }
  try { await gsStream(); } catch (e) { toast("無法使用麥克風：請在瀏覽器允許麥克風權限後再試一次"); return; }
  if (gsMock()) { S.gspStarted = true; save(); }
  const G = GSP = { key: gsKey(i), i: ctSpan(i)[0] };
  if (q.mode === "g-read") gsCount(G, "prep", 60, () => gsRec(G, 60)); else gsPlay(G, q);
}
/* 播一次題目；最多等 12 秒（瀏覽器語音偶爾不會回報「播完」，不能讓考試卡住） */
function gsPlayOnce(items, cb) {
  let fin = false; const end = () => { if (fin) return; fin = true; clearTimeout(tm); cb(); }, tm = setTimeout(() => { stopReading(); end(); }, 12000);
  playItems(items, end);
}
function gsPlay(G, q) {
  const one = questionSpeech(q);
  G.phase = "play"; G.n = 1; gsRender();
  gsPlayOnce(one, () => setTimeout(() => {
    if (!gsAlive(G)) return;
    G.n = 2; gsRender();
    gsPlayOnce(one, () => { if (gsAlive(G)) gsRec(G, q.secs); });
  }, 1500));
}
/* 倒數（準備或錄音）：每 0.25 秒更新畫面上的時間；離開這題就中止 */
function gsCount(G, phase, secs, onEnd) {
  clearInterval(G.timer); G.phase = phase; G.t0 = Date.now(); G.dur = secs; gsRender();
  G.timer = setInterval(() => {
    if (!gsAlive(G)) { gsAbort(G); return; }
    const t = (Date.now() - G.t0) / 1000, el = document.getElementById("gsp-time");
    if (el) el.textContent = phase === "prep" ? fmtTime(Math.max(0, Math.ceil(secs - t))) : `${fmtTime(Math.min(t, secs))} / ${fmtTime(secs)}`;
    if (t >= secs) { clearInterval(G.timer); onEnd(); }
  }, 250);
}
function gsRec(G, secs) {
  if (!gsAlive(G)) return;
  clearInterval(G.timer); gsBeep();
  setTimeout(() => {
    if (!gsAlive(G)) return;
    // 壓縮：單聲道、約 24 kbps（和托福口說一樣）
    const opt = { audioBitsPerSecond: 24000 }; ["audio/mp4", "audio/webm;codecs=opus", "audio/webm"].some(t => MediaRecorder.isTypeSupported && MediaRecorder.isTypeSupported(t) && (opt.mimeType = t));
    let mr; try { mr = new MediaRecorder(GSTREAM, opt); } catch (e) { mr = new MediaRecorder(GSTREAM); }
    const chunks = []; G.mr = mr;
    mr.ondataavailable = e => chunks.push(e.data);
    mr.onstop = () => {
      clearInterval(G.timer);
      G.blob = new Blob(chunks, { type: mr.mimeType || "audio/mp4" }); G.url = URL.createObjectURL(G.blob); G.phase = "done";
      const ai = typeof gsaRun === "function";
      if (gsMock()) { gsSave(G, null); if (ai) gsaRun(S, G.i, G.blob); if (!G.aborted) gsNext(G); else gsRender(); }   // 模擬卷：背景批改，不顯示結果
      else { gsRelease(); if (!G.aborted) { gsRender(); if (ai) gsaRun(S, G.i, G.blob); } }
    };
    try { mr.start(); } catch (e) { gsRelease(); if (GSP === G) GSP = null; gsRender(); toast("麥克風沒有辦法開始錄音，請再按一次開始"); return; }
    gsCount(G, "rec", secs, () => { if (mr.state === "recording") mr.stop(); });
  }, 350);
}
/* 離開這題（換題、離開作答、交卷）：停止播放與倒數；正式模擬卷已錄的部分照樣存下來（不能重錄） */
function gsAbort(G) {
  if (G.aborted) return; G.aborted = true; clearInterval(G.timer);
  if (G.mr && G.mr.state === "recording") G.mr.stop(); else if (gsMock()) gsRelease();
  if (GSP === G) GSP = null;
}
/* 存答案：朗讀的 6 題一起存；錄音記在第一題（rec_<作答id>_<第一題>） */
function gsSave(G, level) {
  const [a, b] = ctSpan(G.i), rec = !!(G.blob && G.blob.size > 200), resp = level === null ? { rec } : { level, rec };
  for (let k = a; k <= b; k++) {
    const X = getQ(k), ans = { resp, correct: grade(X.q, resp), hint: false, t: Math.round(S.elapsed) };
    ans.max = maxPts(X.q, X.bank); ans.pts = ptsOf(X.q, X.bank, ans); ans.sys = ans.correct; S.ans[k] = ans;
  }
  S.tipSeen = true; save();
  if (rec) uploadRec(G.blob, S.id, a, S.who);
}
/* 正式模擬卷：自動進下一題；口說考完就停下來等交卷 */
function gsNext(G) {
  gsRender();
  setTimeout(() => {
    if (!gsAlive(G)) return;
    const n = ctSpan(G.i)[1] + 1, X = n < S.qs.length ? getQ(n) : null;
    GSP = null;
    if (X && X.q.gept && X.q.type === "speak" && !gsAnswered(n)) { gotoQ(n); gsGo(n); }
    else { gsRelease(); gsRender(); toast("口說測驗結束，請按「交卷」"); }
  }, 1200);
}

/* 換題時中止進行中的口說流程 */
{ const go0 = gotoQ; gotoQ = function (n) { if (GSP) gsAbort(GSP); return go0(n); }; }

document.addEventListener("click", e => {
  const el = e.target.closest("[data-act]"); if (!el || !S || view !== "quiz") return;
  const a = el.dataset.act, i = S.idx, G = gsCur(i);
  if (a === "gsp-go" && !G) gsGo(i);
  if (a === "gsp-skip" && G && G.phase === "prep" && !gsMock()) { clearInterval(G.timer); gsRec(G, 60); }
  if (a === "gsp-stop" && G && G.mr && G.mr.state === "recording" && !gsMock()) G.mr.stop();
  if (a === "gsp-redo" && !gsMock() && !(typeof gsaBusy === "function" && gsaBusy(S, i))) { if (G && G.url) URL.revokeObjectURL(G.url); GSP = null; gsGo(i); }
  if (a === "gsp-rate" && G && G.phase === "done" && !gsMock()) { gsSave(G, +el.dataset.v); gsRender(); }
  if (a === "gsp-model" && !gsMock()) {
    const X = getQ(i), q = X.q;
    const items = q.mode === "g-read" ? passageSpeech(X.group).map(x => Object.assign({ gap: 500 }, x)) : q.mode === "g-answer" ? gsModelSpeech(q) : questionSpeech(q);
    playItems(items);
  }
});
