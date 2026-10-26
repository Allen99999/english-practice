// 列出所有要預先產生語音的文字 → tools/tts_jobs.json
// 用法：node tools/build_tts_jobs.mjs
import fs from "node:fs"; import vm from "node:vm"; import path from "node:path"; import { fileURLToPath } from "node:url";
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const html = fs.readFileSync(path.join(root, "docs/index.html"), "utf8");
const files = [...html.matchAll(/<script src="(js\/[^"?]+)/g)].map(m => m[1])
  .filter(f => !/\/(app|teacher|tts|sync|toefl|intro|aigrade|card|geptspeak|gspeakai)\.js$/.test(f));   // 只要題庫和設定，不載入畫面用的程式
const ctx = { TextEncoder, console };
vm.createContext(ctx);
vm.runInContext(files.map(f => fs.readFileSync(path.join(root, "docs", f), "utf8")).join("\n") +
  "\nthis.__out = { BANKS, DICT, PHRASES, SITE_CONFIG, DICT_RAW7: typeof DICT_RAW7 === 'string' ? DICT_RAW7 : '', DICT_RAW8: typeof DICT_RAW8 === 'string' ? DICT_RAW8 : '' };", ctx);
const { BANKS, DICT, PHRASES, SITE_CONFIG, DICT_RAW7, DICT_RAW8 } = ctx.__out;
const jobs = new Map();
const add = (voice, text) => { text = ctx.ttsClean(text); if (!/[A-Za-z]/.test(text)) return; const name = ctx.ttsName(voice, text); jobs.set(name, { name, voice, text }); };
const V = SITE_CONFIG.TTS;
for (const b of BANKS) for (const it of b.items) {
  // 托福：只做聽力（聽一句選回應、聽力題組的錄音）和口說的語音；閱讀、寫作、題目文字都不朗讀
  if (/^toefl/.test(b.id)) {
    if (it.type === "group" && it.kind === "listening") ctx.passageSpeech(it).forEach(s => add(s.voice, s.text));
    else if (it.type === "listen" || it.type === "speak") ctx.questionSpeech(it).forEach(s => add(s.voice, s.text));
    continue;
  }
  if (it.type === "group") { ctx.passageSpeech(it).forEach(s => add(s.voice, s.text)); it.qs.forEach(q => ctx.questionSpeech(q).forEach(s => add(s.voice, s.text))); }
  else ctx.questionSpeech(it).forEach(s => add(s.voice, s.text));
  ctx.gsModelSpeech(it).forEach(s => add(s.voice, s.text));   // 英檢口說：回答問題的參考回答（朗讀的示範＝上面的 passageSpeech）
}
// 單字發音：托福專用的字（dict7.js、dict8.js）不做 MP3，點字時改用瀏覽器內建語音
const toeflOnly = new Set((DICT_RAW7 + "\n" + DICT_RAW8).split("\n").map(l => l.split("|")[0]).filter(Boolean));
for (const e of Object.values(DICT)) if (e.pos !== "×" && e.zh !== "人名" && !toeflOnly.has(e.w)) add(V.word, e.w);
for (const p of PHRASES) add(V.word, p.k);
const list = [...jobs.values()];
fs.writeFileSync(path.join(root, "tools/tts_jobs.json"), JSON.stringify(list));
console.log(`${list.length} 段語音 → tools/tts_jobs.json`);
