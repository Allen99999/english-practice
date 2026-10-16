// 列出所有要預先產生語音的文字 → tools/tts_jobs.json
// 用法：node tools/build_tts_jobs.mjs
import fs from "node:fs"; import vm from "node:vm"; import path from "node:path"; import { fileURLToPath } from "node:url";
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const html = fs.readFileSync(path.join(root, "docs/index.html"), "utf8");
const files = [...html.matchAll(/<script src="(js\/[^"]+)"/g)].map(m => m[1])
  .filter(f => !/(app|teacher|tts|sync)\.js$/.test(f));
const ctx = { TextEncoder, console };
vm.createContext(ctx);
vm.runInContext(files.map(f => fs.readFileSync(path.join(root, "docs", f), "utf8")).join("\n") +
  "\nthis.__out = { BANKS, DICT, PHRASES, SITE_CONFIG };", ctx);
const { BANKS, DICT, PHRASES, SITE_CONFIG } = ctx.__out;
const jobs = new Map();
const add = (voice, text) => { text = ctx.ttsClean(text); if (!/[A-Za-z]/.test(text)) return; const name = ctx.ttsName(voice, text); jobs.set(name, { name, voice, text }); };
const V = SITE_CONFIG.TTS;
for (const b of BANKS) for (const it of b.items) {
  if (it.type === "group") { ctx.passageSpeech(it).forEach(s => add(s.voice, s.text)); it.qs.forEach(q => ctx.questionSpeech(q).forEach(s => add(s.voice, s.text))); }
  else ctx.questionSpeech(it).forEach(s => add(s.voice, s.text));
}
for (const e of Object.values(DICT)) if (e.pos !== "×" && e.zh !== "人名") add(V.word, e.w);
for (const p of PHRASES) add(V.word, p.k);
const list = [...jobs.values()];
fs.writeFileSync(path.join(root, "tools/tts_jobs.json"), JSON.stringify(list));
console.log(`${list.length} 段語音 → tools/tts_jobs.json`);
