/**
 * 英檢初級口說 AI 批改（Vertex AI 上的 Gemini 直接聽錄音）。評分基準照本機文件「全民英檢初級口說 評分與回饋系統.md」，官方級分描述不可改動。
 * POST {action:"aigrade", kind:"gept-speak", sub:"repeat"|"answer"|"read"|"report", name, code (或 teacherCode),
 *       audio (base64), mime, task:{text}|{question}|{segs:[6 段]}, metrics:{dur, speech, pauses, longest, onset}}
 *   report：{items:[每題的摘要], est:{c1,c2,score}}（不帶錄音，只整理整份口說的總回饋）
 * - 複誦、回答問題：快速模型一次完成（約 2～4 秒）；複誦不把原句給模型（避免它照原句「聽」），漏字由程式逐字比對。
 * - 朗讀：先用快速模型「不看原文」轉寫，再把原文、轉寫和錄音交給 Pro 模型詳細批改（約 15～35 秒）。
 * - 沒有人聲（前端偵測，後端再檢查一次）就直接 0 分，不呼叫 AI（模型遇到靜音會憑空「聽出」句子）。
 */
const GS_FAST = [["gemini-2.5-flash", { thinkingBudget: 0 }], ["gemini-3-flash-preview", { thinkingLevel: "minimal" }]];
const GS_PRO = [["gemini-3.1-pro-preview", { thinkingLevel: "low" }], ["gemini-2.5-pro", null]];
const GS_REPORT_MODELS = [["gemini-2.5-flash", { thinkingBudget: 1024 }], ["gemini-3-flash-preview", { thinkingLevel: "low" }]];
/* 使用上限（和寫作分開計）：每個名字 1 小時 60 題、5 小時 150 題；全站 12 小時 3000 題（一份完整口說模擬卷約 14 次） */
const SPEAK_USER_LIMITS = [[60, 1], [150, 5]];
const SPEAK_TOTAL = [3000, 12];

/* ===== 英檢初級口說 AI 批改核心（提示詞、輸出格式、逐字比對、封頂規則）：node 測試和 Ai.gs 共用 ===== */
const GS_SCALE = `## Official LTTC rating scales (GEPT Elementary speaking, quoted)
(一) 發音、語調和流利度（就第一、二、三部分之整體表現評分）
5 發音、語調正確、自然，表達流利，無礙溝通。
4 發音、語調大致正確、自然，雖然有錯但不妨礙聽者的了解。表達尚稱流利，無礙溝通。
3 發音、語調時有錯誤，但仍可理解。說話速度較慢，時有停頓，但仍可溝通。
2 發音、語調常有錯誤，影響聽者的理解。說話速度慢，時常停頓，影響表達。
1 發音、語調錯誤甚多，不當停頓甚多，聽者難以理解。
0 未答或等同未答。
(二) 文法、字彙之正確性和適切性（就第三部分之表現評分）
5 表達內容符合題目要求，能大致掌握基本語法及字彙。
4 表達內容大致符合題目要求，基本語法及字彙大致正確，但尚未能自在應用。
3 表達內容多不可解，語法常有錯誤，且字彙有限，因而阻礙表達。
2 表達內容難解，語法錯誤多，語句多呈片段，不當停頓甚多，字彙不足，表達費力。
1 幾乎無句型語法可言，字彙嚴重不足，難以表達。
0 未答或等同未答。
Real raters give integers; two raters are averaged. The 2025 national average for Elementary speaking was 3.75; passing needs 4.`;

const GS_COMMON = `You are a certified GEPT Elementary (全民英檢初級, CEFR A2) speaking rater for LTTC. You are listening to a recording made by a Taiwanese junior high student (about 13–16 years old) on a practice website.
Write ALL feedback in Traditional Chinese (台灣用語) that a junior high student understands at once. Never use linguistics jargon (no 音素、超音段、母音弱化、同化). Say things like 「post 最後的 t 要輕輕發出來」「問句最後要往上揚」「each 不要唸成 itch」. Keep English words exactly as they are. Be warm but honest; never praise something that is wrong.

${GS_SCALE}

## How to listen (calibration — follow strictly)
- A Taiwanese accent by itself is NOT an error. Only count a pronunciation problem when it changes the word, makes it hard to recognise, or clearly breaks the rhythm/intonation.
- Listen for these common problems of Taiwanese learners and name them with these codes only:
  P1 字尾的子音沒發出來，或多加了「ㄜ」(e.g. "good-uh", "pos" for post)
  P2 th 音 (think/this 唸成 s/z/d)
  P3 v／f／w／b 混淆
  P4 l／r／n 混淆
  P5 母音不對 (長短音 sheep/ship、bad/bed、唸成別的母音)
  P6 單字重音放錯 (e.g. ho-TEL vs HO-tel)
  P7 句子語調 (問句、驚嘆句、句尾上揚下降不對，或整句平平的)
  P8 字尾 -s／-ed 沒唸
  P9 節奏與連音 (每個字一樣重、一個字一個字蹦出來)
  F1 停頓太多或太長　F2 速度太慢　F3 重複、自我修正、um／uh 太多
  C1 漏字　C2 多加字或換成別的字　C3 數字、時間、日期唸錯
- Natural connected speech of fluent speakers is NOT an error: linking, a soft or dropped t in "post office"/"next day", weak forms of to/a/the/and.
- Do not invent problems you did not clearly hear. If the recording is clear and correct, say so and give fewer items.
- If there is no speech, only noise, or the learner speaks Chinese instead of English, the level is 0.`;

const GS_TRANSCRIBE = `transcript: write EXACTLY what the learner said, word for word, as you hear it. Do NOT correct it toward the target. Missing words stay missing, wrong words stay wrong, added words stay added. Write fillers as "um". Write an unclear word as [?]. Write numbers, times and dates the same way the target text writes them only if the learner said them correctly (e.g. target "7:30" and the learner said "seven thirty" → write "7:30"). Empty string if there is no speech.`;

const GS_REPEAT_SYSTEM = GS_COMMON + `

## Task: Part 1 複誦 (repeat)
The learner heard a short sentence twice and then repeated it once. On purpose you are NOT told the sentence: just listen. A program will compare your transcript with the sentence to find missing words, so the transcript must be exactly what you hear. Rate only this item on scale (一) 發音、語調和流利度.
Procedure:
1. transcript: EXACTLY what the learner said, word by word. Do NOT correct grammar, do NOT complete the sentence, do NOT guess words you cannot hear. Fillers as "um", an unclear word as [?], numbers as words. Empty string if there is no speech. Chinese stays Chinese.
2. level (0–5, integer) by scale (一) for how it SOUNDS. Level 5 does not need a native accent: a clear, smooth repetition with correct sounds and natural intonation gets 5 — do not hold it back. 5 = clear, correct sounds, natural rhythm and intonation, smooth (an accent is fine); 4 = a few pronunciation slips or a short hesitation that do not hinder understanding; 3 = noticeable pronunciation errors or slow and halting, but understandable; 2 = errors often make words hard to recognise, or very halting; 1 = mostly unintelligible; 0 = no English speech. (Missing words are handled by the program, not by you.)
3. problems: at most 2, most important first: {code, word (the English word or short phrase as said), tip (one short Chinese sentence: what to do)}. Only problems you clearly hear; empty if none.
4. comment: ONE short Chinese sentence on how it sounded. tip: ONE concrete Chinese sentence for next time ("" if nothing to fix).
Return JSON only.`;

const GS_ANSWER_SYSTEM = GS_COMMON + `

## Task: Part 3 回答問題 (answer a question)
The learner heard the QUESTION twice and answered within 15 seconds. Official rule: the answer does not have to be a complete sentence; the learner should express as much as possible within the time.
Procedure:
1. ${GS_TRANSCRIBE.replace("toward the target", "")}
2. answered: true if the answer really responds to the question (even briefly); false if it is off topic, misunderstands the question, or is only "I don't know".
3. level (0–5, integer) = scale (二) 文法、字彙之正確性和適切性 for this answer. Fixed rules, check from 5 downward:
   5 = answers the question directly AND adds at least one more detail or reason; grammar and words basically correct (at most one small slip).
   4 = answers the question; grammar and words mostly correct but with a few errors, OR correct but only one short sentence with no detail.
   3 = answers the question but grammar errors are frequent or vocabulary is very limited, so meaning is partly unclear; OR only a word or short phrase that does answer it (e.g. "By bus.").
   2 = hard to understand: many grammar errors, mostly fragments, long struggles; OR the answer is off topic / misunderstands the question; OR only "Yes."/"No.".
   1 = almost no sentence structure, only a few English words.
   0 = no answer, only noise, only Chinese, or only repeats the question.
   Caps (only push down): off topic → max 2; one word or a short phrase only → max 3; mostly Chinese with a few English words → max 1.
4. pron (0–5, integer) = scale (一) for this answer (pronunciation, intonation, fluency), used for the whole-test estimate.
5. errors: at most 3 grammar/word errors, most serious first: {code, original (copied exactly from transcript), corrected, why (one short plain Chinese sentence)}. Codes: G1 動詞時間（時態） G2 主詞和動詞搭配（he/she 後面的動詞要加 s） G3 be 動詞和一般動詞混用 G4 單複數 G5 a/an/the G6 介系詞 G7 詞性 G8 句子不完整 G9 語序 G11 助動詞與問句 V1 用字不當 V2 中式英文.
6. problems: at most 2 pronunciation/fluency problems {code, word, tip} (same codes as above). Empty if none.
7. comment: ONE short Chinese sentence: did the answer fit the question and what holds the score back. better: a better answer the learner could say in 15 seconds, built on THEIR idea (if they had one), 2 short sentences, only GEPT Elementary words. tip: ONE concrete Chinese sentence for next time.
Return JSON only.`;

const GS_READ_SYSTEM = GS_COMMON + `

## Task: Part 2 朗讀句子與短文 (read aloud) — this is the main pronunciation task, give careful and detailed feedback
The learner read TEXT 1–6 aloud (five sentences and one short passage) after one minute of preparation, within one minute. Rate on scale (一) 發音、語調和流利度.
You also get TRANSCRIPT: what an independent listener (who did NOT see the text) heard. Trust it for which words were said; use the audio for how they sounded.
Procedure:
1. Compare TEXT with TRANSCRIPT and the audio: missed, changed or added words; numbers and dates.
2. Go through the text segment by segment (1–6). For each: status ok (correct, clear) / minor (small slips that do not hinder understanding) / major (missing or wrong words, or errors that hinder understanding) / skipped (not read); intonation: ok / flat / wrong / na (sentence 1–5: check question rise or fall, exclamation; passage: check sentence-final falls and natural phrasing); note: one short Chinese sentence (empty if ok).
3. level (0–5, integer) by scale (一). Anchors: 5 = everything read, clear and accurate, natural phrasing and intonation, steady pace (an accent is fine); 4 = everything read, some pronunciation slips or a few hesitations that do not hinder understanding; 3 = noticeable errors or several words wrong/missing, slow with pauses, but understandable; 2 = many errors that hinder understanding, frequent long pauses, word-by-word reading, or only about half read; 1 = little read or mostly unintelligible; 0 = nothing / not English.
4. words: only real problems you clearly heard (never list words that were fine), at most 8, most important first, empty if none: {word (exactly as in the text), code, heard (what it sounded like, in English letters, e.g. "pos" or "vegetable"; "" if skipped), tip (one short Chinese sentence)}.
5. strengths: 1–2 short Chinese phrases about what was done well (be specific; empty if nothing).
6. fixes: exactly 3 priorities, most important first: {code, title (short Chinese title), how (one concrete Chinese sentence: how to practise it today)}.
7. diagnosis: ONE Chinese sentence naming what holds the score back most. nextLevel: ONE Chinese sentence saying exactly what to change to reach the next level ("" if level is 5).
8. drill: 3–6 words or short phrases from the text to practise aloud (English only).
Return JSON only.`;

const GS_REPORT_SYSTEM = `You are a GEPT Elementary speaking coach. You get the AI rating results of every item in one full speaking test (Part 1 複誦 ×5, Part 2 朗讀句子與短文, Part 3 回答問題 ×7) by a Taiwanese junior high student, plus the estimated official scores computed from them. Write a short overall report in Traditional Chinese (台灣用語) that a junior high student understands at once (no jargon).
${GS_SCALE}
Output JSON only:
- oneLine: ONE sentence summary of the whole test.
- c1: ONE sentence about 發音、語調和流利度 across the test (mention the most repeated problem codes as plain Chinese).
- c2: ONE sentence about 文法、字彙 in Part 3.
- strengths: 1–2 short phrases.
- priorities: exactly 3 {title (short), why (one sentence, cite where it happened, e.g. 複誦第 2 題、回答第 5 題), how (one concrete practice action)}.
- week: exactly 3 short daily practice actions for the next week (each one sentence).
Base everything only on the results given; do not invent. Never write codes such as P1, G2 or C3 — always use the plain Chinese names.`;

const GS_TR_SYSTEM = `You are a careful transcriber of learner English for a speaking test. Write EXACTLY what the speaker says, word for word. Do NOT correct grammar, do NOT complete sentences, do NOT guess words you cannot hear. Write fillers as "um". Write an unclear word as [?]. Write numbers as words. If there is no speech, only noise or silence, return an empty transcript. If the speaker uses Chinese, write the Chinese.`;
const GS_TR_SCHEMA = { type: "OBJECT", properties: { transcript: { type: "STRING" } }, required: ["transcript"] };
const GS_P = ["P1", "P2", "P3", "P4", "P5", "P6", "P7", "P8", "P9", "F1", "F2", "F3", "C1", "C2", "C3"];
const GS_G = ["G1", "G2", "G3", "G4", "G5", "G6", "G7", "G8", "G9", "G11", "V1", "V2"];
const GS_PROB = { type: "OBJECT", properties: { code: { type: "STRING", enum: GS_P }, word: { type: "STRING" }, tip: { type: "STRING" } }, required: ["code", "word", "tip"] };
const GS_REPEAT_SCHEMA = { type: "OBJECT", properties: { transcript: { type: "STRING" }, level: { type: "INTEGER" }, problems: { type: "ARRAY", items: GS_PROB }, comment: { type: "STRING" }, tip: { type: "STRING" } },
  required: ["transcript", "level", "problems", "comment", "tip"], propertyOrdering: ["transcript", "level", "problems", "comment", "tip"] };
const GS_ANSWER_SCHEMA = { type: "OBJECT", properties: { transcript: { type: "STRING" }, answered: { type: "BOOLEAN" }, level: { type: "INTEGER" }, pron: { type: "INTEGER" },
  errors: { type: "ARRAY", items: { type: "OBJECT", properties: { code: { type: "STRING", enum: GS_G }, original: { type: "STRING" }, corrected: { type: "STRING" }, why: { type: "STRING" } }, required: ["code", "original", "corrected", "why"] } },
  problems: { type: "ARRAY", items: GS_PROB }, comment: { type: "STRING" }, better: { type: "STRING" }, tip: { type: "STRING" } },
  required: ["transcript", "answered", "level", "pron", "errors", "problems", "comment", "better", "tip"], propertyOrdering: ["transcript", "answered", "level", "pron", "errors", "problems", "comment", "better", "tip"] };
const GS_READ_SCHEMA = { type: "OBJECT", properties: {
  segments: { type: "ARRAY", items: { type: "OBJECT", properties: { n: { type: "INTEGER" }, status: { type: "STRING", enum: ["ok", "minor", "major", "skipped"] }, intonation: { type: "STRING", enum: ["ok", "flat", "wrong", "na"] }, note: { type: "STRING" } }, required: ["n", "status", "intonation", "note"] } },
  level: { type: "INTEGER" },
  words: { type: "ARRAY", items: { type: "OBJECT", properties: { word: { type: "STRING" }, code: { type: "STRING", enum: GS_P }, heard: { type: "STRING" }, tip: { type: "STRING" } }, required: ["word", "code", "heard", "tip"] } },
  strengths: { type: "ARRAY", items: { type: "STRING" } },
  fixes: { type: "ARRAY", items: { type: "OBJECT", properties: { code: { type: "STRING", enum: GS_P }, title: { type: "STRING" }, how: { type: "STRING" } }, required: ["code", "title", "how"] } },
  diagnosis: { type: "STRING" }, nextLevel: { type: "STRING" }, drill: { type: "ARRAY", items: { type: "STRING" } } },
  required: ["segments", "level", "words", "strengths", "fixes", "diagnosis", "nextLevel", "drill"],
  propertyOrdering: ["segments", "level", "words", "strengths", "fixes", "diagnosis", "nextLevel", "drill"] };
const GS_REPORT_SCHEMA = { type: "OBJECT", properties: { oneLine: { type: "STRING" }, c1: { type: "STRING" }, c2: { type: "STRING" }, strengths: { type: "ARRAY", items: { type: "STRING" } },
  priorities: { type: "ARRAY", items: { type: "OBJECT", properties: { title: { type: "STRING" }, why: { type: "STRING" }, how: { type: "STRING" } }, required: ["title", "why", "how"] } },
  week: { type: "ARRAY", items: { type: "STRING" } } }, required: ["oneLine", "c1", "c2", "strengths", "priorities", "week"] };

/* ---------- 逐字比對：學生唸了目標文字的多少（複誦、朗讀） ---------- */
const GS_NUM = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"];
const GS_TENS = ["", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"];
function gsNum_(n) {
  if (n < 20) return GS_NUM[n];
  if (n < 100) return GS_TENS[Math.floor(n / 10)] + (n % 10 ? " " + GS_NUM[n % 10] : "");
  if (n < 1000) return GS_NUM[Math.floor(n / 100)] + " hundred" + (n % 100 ? " " + gsNum_(n % 100) : "");
  if (n >= 2000 && n < 2100) return "twenty " + (n % 100 < 10 ? "o " : "") + gsNum_(n % 100);   // 年份 2012 → twenty twelve
  return gsNum_(Math.floor(n / 1000)) + " thousand" + (n % 1000 ? " " + gsNum_(n % 1000) : "");
}
const GS_ORD = { first: "one", second: "two", third: "three", fourth: "four", fifth: "five", sixth: "six", seventh: "seven", eighth: "eight", ninth: "nine", tenth: "ten", eleventh: "eleven", twelfth: "twelve", thirteenth: "thirteen", fifteenth: "fifteen", twentieth: "twenty", thirtieth: "thirty" };   // 日期的序數和基數都算對（兩邊一起換）
function gsWords_(s) {
  return String(s || "").toLowerCase().replace(/[’‘]/g, "'").replace(/\b(\d{1,2}):(\d{2})\b/g, (m, h, mm) => gsNum_(+h) + (+mm ? " " + gsNum_(+mm) : " o'clock"))
    .replace(/\ba\.m\./g, "am").replace(/\bp\.m\./g, "pm").replace(/\b(mr|mrs|ms)\./g, "$1").replace(/\d+/g, d => " " + gsNum_(+d) + " ")
    .replace(/\[\?\]/g, " xunclear ").replace(/-/g, " ").replace(/[^a-z' ]/g, " ").split(/\s+/).map(w => w.replace(/^'+|'+$/g, ""))
    .filter(w => w && !/^(um+|uh+|er+|ah+|hmm+)$/.test(w)).map(w => GS_ORD[w] || w);
}
/* LCS：目標裡被唸到的字數；回傳 {hit, total, missed[], extra} */
function gsAlign_(target, said) {
  const T = gsWords_(target), A = gsWords_(said), n = T.length, m = A.length;
  const dp = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(0));
  for (let i = n - 1; i >= 0; i--) for (let j = m - 1; j >= 0; j--) dp[i][j] = T[i] === A[j] ? dp[i + 1][j + 1] + 1 : Math.max(dp[i + 1][j], dp[i][j + 1]);
  const missed = []; let i = 0, j = 0;
  while (i < n && j < m) { if (T[i] === A[j]) { i++; j++; } else if (dp[i + 1][j] >= dp[i][j + 1]) missed.push(T[i++]); else j++; }
  while (i < n) missed.push(T[i++]);
  return { hit: dp[0][0], total: n, missed, extra: m - dp[0][0] };
}
/* 朗讀的覆蓋率：每一段（句子／短文）唸到的比例 */
function gsCoverage_(segs, said) {
  const all = gsAlign_(segs.join(" "), said);
  return { acc: all.total ? all.hit / all.total : 0, missed: all.missed, extra: all.extra };
}

/* ---------- 封頂（只往下壓）：照比對結果和沒有說話的情況 ---------- */
function gsFinal_(kind, r, task, metrics) {
  const caps = [], cap = (max, code) => { caps.push(code); r.level = Math.min(r.level, max); };
  r.level = Math.max(0, Math.min(5, Math.round(Number(r.level) || 0))); r.levelModel = r.level;
  const words = gsWords_(r.transcript).filter(w => w !== "xunclear").length;
  if (!words) { r.level = 0; if (kind === "answer") r.pron = 0; r.caps = ["X0"]; return r; }
  if (kind === "repeat" || kind === "read") {
    const al = kind === "read" ? gsCoverage_(task.segs, r.transcript) : gsAlign_(task.text, r.transcript);
    const acc = kind === "read" ? al.acc : (al.total ? al.hit / al.total : 0);
    r.acc = Math.round(acc * 100); r.missed = al.missed.slice(0, 30);
    // R5：完整複誦、而且一個問題都沒聽到，卻只給 4 → 5（不思考的快速模型習慣保留 5 分）
    if (kind === "repeat" && acc >= 0.95 && r.level === 4 && !(r.problems || []).length) r.level = 5;
    if (acc < 0.35) cap(1, "A35"); else if (acc < 0.6) cap(2, "A60"); else if (acc < 0.8) cap(3, "A80"); else if (acc < 0.92 && kind === "repeat") cap(4, "A92");
    if (kind === "read" && metrics && (metrics.span || metrics.dur)) r.wpm = Math.round(words / ((metrics.span || metrics.dur) / 60));   // 語速：第一個字到最後一個字（含停頓）
  }
  if (kind === "answer") {
    r.pron = Math.max(0, Math.min(5, Math.round(Number(r.pron) || 0)));
    if (r.answered === false) cap(2, "OFF");
    if (words <= 3) cap(3, "SHORT");
    if (/[一-鿿]/.test(r.transcript) && words < 4) cap(1, "ZH");
  }
  r.caps = caps;
  return r;
}
/* 整份口說的官方換算（估算）：(一) = 三個部分各自平均後再平均；(二) = 第三部分平均；各取到 0.5，百分制 = (一+二)×10，80 分通過 */
function gsEstimate_(items) {
  const avg = a => a.length ? a.reduce((s, x) => s + x, 0) / a.length : null, half = x => Math.round(x * 2) / 2;
  const p1 = avg(items.filter(x => x.kind === "repeat").map(x => x.level)), p2 = avg(items.filter(x => x.kind === "read").map(x => x.level)), p3 = avg(items.filter(x => x.kind === "answer").map(x => x.pron));
  const parts = [p1, p2, p3].filter(x => x !== null), g = avg(items.filter(x => x.kind === "answer").map(x => x.level));
  if (!parts.length || g === null) return null;
  const c1 = half(avg(parts)), c2 = half(g), score = Math.round((c1 + c2) * 10);
  return { c1, c2, score, pass: score >= 80, parts: { p1, p2, p3 } };
}

function speakGrade_(body) {
  const teacher = body.teacherCode && String(body.teacherCode) === TEACHER_CODE;
  const name = name_(body.name);
  if (!teacher) { const err = check_(name, code_(body.code)); if (err) return json_({ ok: false, error: err }); }
  const sub = String(body.sub || ""), t = body.task || {}, m = body.metrics || {}, clip = (s, n) => String(s || "").slice(0, n);
  if (["repeat", "answer", "read", "report"].indexOf(sub) < 0) return json_({ ok: false, error: "bad kind" });
  const metrics = { dur: Number(m.dur) || 0, speech: Number(m.speech) || 0, pauses: Number(m.pauses) || 0, longest: Number(m.longest) || 0, onset: Number(m.onset) || 0, span: Number(m.span) || 0 };
  if (sub !== "report") {
    if (!/^[A-Za-z0-9+/=]{100,}$/.test(String(body.audio || "")) || String(body.audio).length > 2800000) return json_({ ok: false, error: "bad audio" });
    if (m.speech !== undefined && metrics.speech < 0.3) return json_({ ok: true, result: gsSilent_(sub), model: "none" });   // 沒有人聲：0 分，不用 AI
  }
  const quota = aiQuota_(name, teacher || AI_NO_LIMIT.includes(name.toLowerCase()), "speak"); if (quota) return json_({ ok: false, error: quota });
  if (sub === "report") {
    const items = [].concat(body.items || []).slice(0, 20).map(x => JSON.stringify(x).slice(0, 1500)).join("\n");
    const est = body.est || {};
    const r = gsGemini_(GS_REPORT_SYSTEM, [{ text: "ESTIMATED OFFICIAL SCORES: (一) " + est.c1 + ", (二) " + est.c2 + ", total " + est.score + "/100 (pass 80)\n\nITEM RESULTS:\n" + items }], GS_REPORT_SCHEMA, GS_REPORT_MODELS);
    return json_(r.ok ? { ok: true, result: r.result, model: r.model } : { ok: false, error: r.error });
  }
  const aud = { inlineData: { mimeType: String(body.mime || "audio/webm").split(";")[0].slice(0, 30), data: String(body.audio) } };
  const fl = "\n\nRecording facts measured by the website: length " + metrics.dur.toFixed(1) + " s, speaking time " + metrics.speech.toFixed(1) + " s, pauses longer than 0.6 s: " + metrics.pauses +
    ", longest pause " + metrics.longest.toFixed(1) + " s, started speaking after " + metrics.onset.toFixed(1) + " s.";
  let r, task = {};
  if (sub === "repeat") { task = { text: clip(t.text, 300) }; r = gsGemini_(GS_REPEAT_SYSTEM, [{ text: "Part 1 repeat item." + fl + "\nThe learner's recording follows." }, aud], GS_REPEAT_SCHEMA, GS_FAST); }
  if (sub === "answer") r = gsGemini_(GS_ANSWER_SYSTEM, [{ text: "QUESTION: " + clip(t.question, 300) + fl + "\nThe learner's recording follows." }, aud], GS_ANSWER_SCHEMA, GS_FAST);
  if (sub === "read") {
    task = { segs: [].concat(t.segs || []).slice(0, 6).map(x => clip(x, 800)) };
    const tr = gsGemini_(GS_TR_SYSTEM, [aud], GS_TR_SCHEMA, GS_FAST);
    if (!tr.ok) return json_({ ok: false, error: tr.error });
    const said = String(tr.result.transcript || "");
    if (!gsWords_(said).length) return json_({ ok: true, result: gsSilent_(sub), model: tr.model });
    r = gsGemini_(GS_READ_SYSTEM, [{ text: "TEXT:\n" + task.segs.map((s, k) => (k + 1) + ". " + s).join("\n") + "\n\nTRANSCRIPT: " + said + fl + "\nThe learner's recording follows." }, aud], GS_READ_SCHEMA, GS_PRO);
    if (r.ok) r.result.transcript = said;
  }
  if (!r.ok) return json_({ ok: false, error: r.error });
  return json_({ ok: true, result: gsFinal_(sub, r.result, task, metrics), model: r.model });
}
function gsSilent_(sub) {
  const r = { transcript: "", level: 0, caps: ["X0"], problems: [], comment: "沒有聽到英文的聲音，請確認麥克風有收到聲音，再試一次。", tip: "" };
  if (sub === "answer") Object.assign(r, { answered: false, pron: 0, errors: [], better: "" });
  if (sub === "read") Object.assign(r, { segments: [], words: [], strengths: [], fixes: [], diagnosis: r.comment, nextLevel: "", drill: [] });
  return r;
}
/* parts 可以放錄音；chain = [[模型, thinkingConfig]]，失敗或限流就換下一個 */
function gsGemini_(system, parts, schema, chain) {
  const token = ScriptApp.getOAuthToken(), errs = [];
  for (const [model, thinking] of chain) {
    const url = "https://aiplatform.googleapis.com/v1/projects/" + VERTEX_PROJECT + "/locations/global/publishers/google/models/" + model + ":generateContent";
    const gc = { temperature: 0.2, responseMimeType: "application/json", responseSchema: schema }; if (thinking) gc.thinkingConfig = thinking;
    const res = UrlFetchApp.fetch(url, { method: "post", contentType: "application/json", muteHttpExceptions: true,
      headers: { Authorization: "Bearer " + token, "x-goog-user-project": VERTEX_PROJECT },
      payload: JSON.stringify({ systemInstruction: { parts: [{ text: system }] }, contents: [{ role: "user", parts }], generationConfig: gc }) });
    const code = res.getResponseCode();
    if (code === 200) {
      try { const d = JSON.parse(res.getContentText()), txt = d.candidates[0].content.parts.filter(p => !p.thought).map(p => p.text || "").join(""); return { ok: true, model: errs.length ? model + "（" + errs.join("、") + "）" : model, result: JSON.parse(txt) }; }
      catch (e) { errs.push(model + ": bad json"); continue; }
    }
    errs.push(model + ": " + code + " " + res.getContentText().slice(0, 120).replace(/\s+/g, " "));
  }
  return { ok: false, error: "ai failed (" + errs.join(", ") + ")" };
}
