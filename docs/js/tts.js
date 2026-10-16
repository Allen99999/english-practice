/* ===== 朗讀：優先播放預先產生的 MP3，沒有檔案才退回瀏覽器語音 ===== */
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
/* items: [{text, voice, el?}] 依序播放 */
function playItems(items, onEnd) {
  const token = ++playToken;
  try { speechSynthesis.cancel(); } catch (e) { }
  PLAYER.pause();
  let i = 0;
  const next = () => {
    if (token !== playToken) return;
    document.querySelectorAll(".speaking").forEach(x => x.classList.remove("speaking"));
    if (i >= items.length) { onEnd && onEnd(); return; }
    const it = items[i++];
    if (it.el && it.el.isConnected) it.el.classList.add("speaking");
    const name = ttsName(it.voice, it.text);
    if (AUDIO_SET && AUDIO_SET.has(name)) {
      PLAYER.src = "audio/" + name + ".mp3";
      PLAYER.playbackRate = audioRate();
      PLAYER.onended = next; PLAYER.onerror = () => fallbackSpeak(it.text, next);
      PLAYER.play().catch(() => fallbackSpeak(it.text, next));
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
