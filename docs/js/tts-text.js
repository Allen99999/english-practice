/* ===== 朗讀文字（瀏覽器與語音產生腳本共用，兩邊算出的檔名必須一致） ===== */
const TTS_FEMALE = new Set(("jenny amy ivy mia ann lily lucy kate tina nina joy sue fay ella nora mina rita kim lisa mary " +
  "ms ms. mrs mrs. miss mom mother grandma aunt sister girl woman nurse w w2").split(" "));
function ttsClean(s) {
  return String(s).replace(/\[\[(\d)\]\]/g, " blank $1 ").replace(/_{3,}/g, " blank ")
    .replace(/[•✔✘★|]/g, " ").replace(/\s+/g, " ").trim();
}
function ttsSpeaker(line) {
  const m = /^([A-Z][A-Za-z. ]{0,14}):\s(.*)$/.exec(line);
  return m ? { who: m[1].trim(), text: m[2] } : { who: null, text: line };
}
function ttsVoice(who, map) {
  const V = SITE_CONFIG.TTS;
  if (!who) return V.narrator;
  if (map[who]) return map[who];
  const first = who.toLowerCase().split(/\s+/)[0];
  const pool = TTS_FEMALE.has(first) ? "female" : "male";
  map["_" + pool] = (map["_" + pool] || 0);
  const v = V[pool][map["_" + pool] % V[pool].length];
  map["_" + pool]++;
  return map[who] = v;
}
/* 題組文章：每一段一個項目（index 對應畫面上的段落） */
function passageSpeech(g) {
  const map = {};
  return g.passage.map(p => {
    const s = g.kind === "dialogue" ? ttsSpeaker(p) : { who: null, text: p };
    return { text: ttsClean(s.text), voice: ttsVoice(s.who, map) };
  });
}
/* 單題：題幹、方框、補充說明、改寫原句、挑錯句子 */
function questionSpeech(q) {
  const map = {}, out = [];
  const add = (line, dialog) => { const s = dialog ? ttsSpeaker(line) : { who: null, text: line }; const t = ttsClean(s.text); if (/[A-Za-z]/.test(t)) out.push({ text: t, voice: ttsVoice(s.who, map) }); };
  if (q.type === "listen") {   // 聽力：照稿念；用 v2 換一組聲音，讓不同題目聽起來不一樣
    if (q.v2) { map._female = 1; map._male = 1; }
    q.script.forEach(l => add(l, true));
    return out;
  }
  if (q.blank) return out;
  if (q.type === "trans" || q.type === "essay" || q.zhPrompt) return out;
  [].concat(q.stem || []).forEach(l => add(l, true));
  [].concat(q.box || []).forEach(l => add(l, true));
  if (q.post) add(q.post);
  [].concat(q.src || []).forEach(l => add(l));
  if (q.sent) add(q.sent);
  if (q.type === "order") q.items.forEach(l => add(l));
  return out;
}
/* 檔名：FNV-1a 32 位元雜湊（UTF-8）＋位元組長度 */
function ttsName(voice, text) {
  const bytes = new TextEncoder().encode(voice + "|" + text);
  let h = 0x811c9dc5;
  for (const b of bytes) { h ^= b; h = Math.imul(h, 0x01000193) >>> 0; }
  return h.toString(16).padStart(8, "0") + "-" + bytes.length;
}
