/* ===== 朗讀：優先播放預先產生的 MP3；只有沒有 MP3 的字（托福 dict7／dict8 的單字）才用瀏覽器語音 ===== */
let AUDIO_SET = null;
fetch("audio/manifest.json", { cache: "no-cache" }).then(r => r.ok ? r.json() : []).then(a => { AUDIO_SET = new Set(a); }).catch(() => { AUDIO_SET = new Set(); });
const PLAYER = new Audio(); PLAYER.preload = "auto";
let playToken = 0;
function audioRate() { const r = store.settings.rate || 0.9; return r <= 0.7 ? 0.8 : r >= 1.1 ? 1.15 : 1; }
function fallbackSpeak(text, done) {
  try {
    const u = new SpeechSynthesisUtterance(text); u.lang = "en-US"; u.rate = store.settings.rate || 0.9;
    u.onend = done; u.onerror = done; speechSynthesis.speak(u);
  } catch (e) { done(); }
}
/* items: [{text, voice, el?, gap?}] 依序播放；gap = 播完這句後停幾毫秒 */
function playItems(items, onEnd) {
  const token = ++playToken;
  try { speechSynthesis.cancel(); } catch (e) { }
  PLAYER.pause();
  let i = 0;
  let prevGap = 0, waited = 0;
  const next = () => {
    if (token !== playToken) return;
    if (prevGap) { const g = prevGap; prevGap = 0; setTimeout(next, g); return; }
    if (!AUDIO_SET && waited++ < 25) { setTimeout(next, 200); return; }   // MP3 清單還沒載入：最多等 5 秒，不要先用瀏覽器語音
    document.querySelectorAll(".speaking").forEach(x => x.classList.remove("speaking"));
    if (i >= items.length) { onEnd && onEnd(); return; }
    const it = items[i++]; prevGap = it.gap || 0;
    if (it.el && it.el.isConnected) it.el.classList.add("speaking");
    const name = ttsName(it.voice, it.text);
    if (AUDIO_SET && AUDIO_SET.has(name)) {
      PLAYER.src = "audio/" + name + ".mp3";
      const nx = items[i]; if (nx) { const nn = ttsName(nx.voice, nx.text); if (AUDIO_SET.has(nn)) { const pre = new Audio(); pre.preload = "auto"; pre.src = "audio/" + nn + ".mp3"; } }   // 預先載入下一句，減少停頓
      PLAYER.playbackRate = audioRate();
      // 有 MP3 的句子一律只播 MP3：載入或播放失敗就重試一次，還是不行就跳過，不改用瀏覽器語音（聲音太怪）
      // 每次嘗試各自只處理一次失敗（onerror 和 play() 失敗可能同時發生）；第二次也失敗就跳過這句
      const attempt = k => {
        let done = false;
        const fail = () => { if (done || token !== playToken) return; done = true; if (k) { next(); return; } setTimeout(() => { if (token !== playToken) return; PLAYER.src = "audio/" + name + ".mp3?r=" + Date.now(); attempt(1); }, 400); };
        PLAYER.onended = next; PLAYER.onerror = fail; PLAYER.play().catch(fail);
      };
      attempt(0);
    } else fallbackSpeak(it.text, next);
  };
  next();
}
function stopReading() {
  playToken++;
  try { speechSynthesis.cancel(); } catch (e) { }
  try { PLAYER.pause(); } catch (e) { }
  reading = null;
  document.querySelectorAll(".speaking").forEach(x => x.classList.remove("speaking"));
  document.querySelectorAll('[data-act="read-all"]').forEach(b => b.innerHTML = `${I.speaker}<span>朗讀全文</span>`);
}
function speak(w) { playItems([{ text: ttsClean(w), voice: SITE_CONFIG.TTS.word }]); }
function readPassage() {
  if (reading) { stopReading(); return; }
  const X = S && getQ(S.idx); if (!X || !X.group) return;
  const els = [...document.querySelectorAll(".passage .ptext > p, .passage .ptext > .dl")];
  const items = passageSpeech(X.group).map((it, k) => Object.assign({ el: els[k] }, it)).filter(it => /[A-Za-z]/.test(it.text));
  if (!items.length) return;
  reading = { n: items.length };
  document.querySelectorAll('[data-act="read-all"]').forEach(b => b.innerHTML = `${I.stop}<span>停止</span>`);
  playItems(items, () => stopReading());
}
function readQuestion() {
  const X = S && getQ(S.idx); if (!X) return;
  const items = questionSpeech(X.q);
  if (!items.length) { toast("這題沒有英文可以念"); return; }
  playItems(items);
}
/* 聽力題：整段播放，句子之間停頓；正式考每題只能播一次 */
function playListen() {
  const X = S && getQ(S.idx); if (!X || X.q.type !== "listen") return;
  const w = work(S.idx);
  if (S.blind && w.played && !(X.bank && X.bank.relisten)) return;   // relisten 的考卷：正式考模式也能重聽
  const items = questionSpeech(X.q).map((it, k, arr) => Object.assign({ gap: k === arr.length - 1 ? 0 : (X.q.part === 1 && k > 0 ? 900 : 600) }, it));
  w.played = (w.played || 0) + 1; save(true);
  const b = document.querySelector('[data-act="listen-play"]');
  if (b) { b.disabled = true; b.innerHTML = `${I.speaker}<span>播放中…</span>`; }
  playItems(items, () => { if (view === "quiz") rerenderKeep(); });
}
document.addEventListener("click", e => { const b = e.target.closest('[data-act="listen-play"]'); if (b && !b.disabled) playListen(); });
