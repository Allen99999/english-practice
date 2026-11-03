/**
 * 托福（2026 新制）口說 AI 批改：Listen and Repeat、Take an Interview。評分基準照本機文件「新制托福 Speaking 評分與回饋系統.md」（ETS 官方量表不可改動）。
 * POST {action:"aigrade", kind:"toefl-speak", sub:"lr"|"iv"|"report", name, code (或 teacherCode), audio (base64), mime,
 *       task:{text}|{question}, metrics:{dur, speech, pauses, pauses2, longest, onset, span, ratio}}
 *   report：{items:[每題摘要], est:{raw, band}}（不帶錄音）
 * 方案 A（2026-11-01 比較測試勝出）：
 * - Listen and Repeat：2.5-flash 不看原句逐字轉寫＋判斷清晰度 → 程式逐字比對、依官方量表換成分數（約 2 秒）。原句給模型的話，它會照原句「聽」（重口音 light 被聽成 right 給 5 分）。
 * - Take an Interview：2.5-flash 不看題目盲轉寫 → 3.1-pro 拿題目＋轉寫＋錄音＋音量數據詳細批改（約 15～30 秒）。
 * - 沒有人聲直接 0 分，不呼叫 AI（靜音會讓模型憑空聽出句子）。
 * 共用 AiSpeak.gs 的 gsGemini_、GS_FAST、GS_PRO、GS_REPORT_MODELS，額度和英檢口說共用（aiQuota_ 的 speak）。
 */
const TS_CODES = "Pronunciation/fluency codes: P1 final consonants dropped or an extra vowel added, P2 th sound, P3 v/f/w/b, P4 l/r/n, P5 vowels (ship/sheep), P6 word stress, P7 sentence intonation, P8 -s/-ed endings, P9 rhythm & linking (every word equally stressed), F1 too many/long pauses, F2 too slow/fast, F3 repetitions & fillers.";
const TS_CALIB = "Calibration: an accent by itself is not an error. Normal native connected speech and weak forms are not errors. Only report problems you clearly hear; never guess. Write all explanations in Traditional Chinese (台灣用語) for a Taiwanese high-school or university student, plain words, no linguistics jargon, address the learner as 你 (never 您); keep English words as they are.";

const TS_LR_SYSTEM = `You transcribe a short recording of an English learner who was asked to repeat a sentence they heard (TOEFL iBT Listen and Repeat). You are NOT told the sentence on purpose: just listen.
1. transcript: EXACTLY the words the learner said, in order. Do not correct grammar or word endings, do not complete or improve anything, do not guess words you cannot hear: write [?] for an unclear word. Keep fillers (um, uh). If the learner restarts a word or phrase, keep only the final version. Empty string if there is no English speech.
2. intelligibility (how easy it is to understand for a listener who does not know the sentence): "clear" = every word easy to understand; "minor" = one or two content words ambiguous because of imprecise pronunciation; "occasional" = occasional difficulty: struggles over a word or phrase, or runs words together; "low" = hard to understand for someone who did not hear the sentence; "mostly" = mostly unintelligible.
3. problems: at most 2 pronunciation problems you clearly hear, most important first: {code, word, tip (one short Traditional Chinese sentence: how to fix)}. ${TS_CODES}
${TS_CALIB}
Return JSON only.`;
const TS_P = ["P1", "P2", "P3", "P4", "P5", "P6", "P7", "P8", "P9", "F1", "F2", "F3"];
const TS_PROB = { type: "OBJECT", properties: { code: { type: "STRING", enum: TS_P }, word: { type: "STRING" }, tip: { type: "STRING" } }, required: ["code", "word", "tip"] };
const TS_INTEL = { type: "STRING", enum: ["clear", "minor", "occasional", "low", "mostly"] };
const TS_LR_SCHEMA = { type: "OBJECT", properties: { transcript: { type: "STRING" }, intelligibility: TS_INTEL, problems: { type: "ARRAY", items: TS_PROB } },
  required: ["transcript", "intelligibility", "problems"], propertyOrdering: ["transcript", "intelligibility", "problems"] };

const TS_IV_RUBRIC = `TOEFL iBT (2026) Take an Interview scoring guide (ETS, holistic 0-5; 45 seconds, no preparation):
5 fully successful: fully addresses the question, clear and fluent. Typically: on topic and well elaborated; good conversational pace with natural, appropriate pauses; easily intelligible pronunciation, rhythm and intonation that convey meaning; a range of accurate grammar and vocabulary that expresses precise meanings.
4 generally successful: addresses the question, reasonably clear. Typically: on topic and elaborated but may lack effective sentence-level connectors; good pace generally maintained with some pausing that minimally affects flow; intelligibility not impeded though occasional words need minor effort; grammar and vocabulary adequate for general meanings most of the time.
3 partially successful: addresses the question but with limited elaboration and/or clarity. Typically: generally on topic, elaboration relatively limited; frequent or lengthy pauses make the pace choppy, fillers frequent; intelligibility sometimes affected by word-level pronunciation or stress/rhythm; limited range and accuracy of grammar and vocabulary noticeably restrict precision and clarity.
2 mostly unsuccessful: attempts the question but not supported in a meaningful and/or intelligible way. Typically: minimally connected to the question, little or no relevant elaboration, or mainly language taken from the question; limited intelligibility, meaning often hard to discern; very limited range of grammar and vocabulary.
1 unsuccessful: minimally addresses the question; only vaguely connected to the question's language; mostly unintelligible; mainly isolated words or phrases.
0: no response, entirely unintelligible, no English, entirely unconnected, or only phrases like "I don't know".`;
const TS_IV_SYSTEM = `You are a certified TOEFL iBT Speaking rater giving feedback to a Taiwanese learner. Listen to the recording itself (judge pronunciation, pace and intonation from the audio).
${TS_IV_RUBRIC}
How to decide (apply exactly):
- Diagnostic dimensions, each 0-5 using the same level descriptions: respond (answers every part of the question + elaboration with reasons/examples/details + connectors), pace (conversational pace, pauses, fillers), pron (pronunciation, word stress, rhythm, intonation, intelligibility), lang (range and accuracy of grammar and vocabulary).
- Choose the holistic level from the bold judgment first, then check: the level may not be more than 1 above the lowest dimension, and not above the highest dimension.
- Caps (only lower the level), list the codes you apply: X0 no English / unrelated / only "I don't know" -> 0; ISO mostly isolated words or phrases -> max 1; OFF only minimally connected to the question or mostly repeats the question's words -> max 2; UNC meaning often hard to discern -> max 2; THIN answers with only one idea and no reason/example, or speaks less than 15 seconds -> max 3; CHOP the delivery is choppy: long silent stretches break up the answer (METRICS: speaking ratio below 55% AND 3+ pauses over 2 s; normal thinking pauses and fillers do NOT count) -> max 3; PART the question has two or more parts and one part is not answered -> max 4.
- Deciding 5 vs 4 (ETS is less strict than most raters): give 5 when ALL are true: (a) every part of the question is answered; (b) there are at least two supporting points, or one point developed with a detail; (c) the speaker keeps talking at a conversational pace without struggling (speaking ratio about 60% or more, thinking pauses are fine); (d) no word needs effort to understand and errors never blur the meaning. 5 does NOT require complex sentences, advanced vocabulary, a personal example, perfect grammar, or no fillers. Give 4 only when you can name a concrete weakness from the level-4 description (e.g. a part answered thinly, ideas listed with no linking at all, pausing that interrupts the flow, a few words that need effort).
- Do NOT lower the score for: natural um/uh/like, self-corrections, one or two small grammar slips that do not affect meaning, an accent, a response of only 60-90 words that is still well elaborated, or being cut off at the time limit. ETS's own 5-point sample answers contain many fillers, a repeated word and small errors, and are only 65-90 words long — they are still 5.
Output (all explanations in Traditional Chinese; English examples stay English):
- transcript: what the learner said (keep um/uh; write (...) for pauses longer than about 1.5 s). Use the BLIND TRANSCRIPT as the record of the words.
- parts: split the interviewer's question into its parts; for each {part (short Chinese), status: yes|partial|no, note}.
- dims: {respond, pace, pron, lang} each {score 0-5, note (one Chinese sentence)}.
- level (0-5) and caps (codes applied, empty if none).
- diagnosis: one Chinese sentence on what decided the score. nextLevel: what exactly is needed for one level higher ("" if 5).
- errors: grammar/vocabulary errors (at most 6, most serious first) {original (copied exactly from the transcript), corrected, code, why}. Codes: G1 tense, G2 subject-verb agreement, G3 be/verb mix-up, G4 singular/plural, G5 articles, G6 prepositions, G7 word form, G8 incomplete sentence, G9 word order, G11 auxiliaries & questions, V1 word choice, V2 Chinglish, V3 vocabulary too basic/repetitive.
- pronWords: at most 3 pronunciation problems you clearly hear {word, heard (what it sounded like, in English letters), code, tip}. ${TS_CODES}
- structure: which of these the answer contains: {direct (states the answer directly), reason, example (example or detail), wrap (closing)} booleans.
- fixes: exactly 3 priorities ordered by how much they would raise the score {title, how}.
- better: rewrite the learner's own ideas as a 5-point answer of about 80-100 words (natural spoken English a student can say in 45 seconds).
- upgrades: up to 3 {from (copied from the transcript), to, example}.
${TS_CALIB}
Return JSON only.`;
const TS_G = ["G1", "G2", "G3", "G4", "G5", "G6", "G7", "G8", "G9", "G11", "V1", "V2", "V3"];
const TS_DIM = { type: "OBJECT", properties: { score: { type: "INTEGER" }, note: { type: "STRING" } }, required: ["score", "note"] };
const TS_IV_SCHEMA = { type: "OBJECT", properties: {
  transcript: { type: "STRING" },
  parts: { type: "ARRAY", items: { type: "OBJECT", properties: { part: { type: "STRING" }, status: { type: "STRING", enum: ["yes", "partial", "no"] }, note: { type: "STRING" } }, required: ["part", "status", "note"] } },
  dims: { type: "OBJECT", properties: { respond: TS_DIM, pace: TS_DIM, pron: TS_DIM, lang: TS_DIM }, required: ["respond", "pace", "pron", "lang"] },
  level: { type: "INTEGER" }, caps: { type: "ARRAY", items: { type: "STRING", enum: ["X0", "ISO", "OFF", "UNC", "THIN", "CHOP", "PART"] } }, diagnosis: { type: "STRING" }, nextLevel: { type: "STRING" },
  errors: { type: "ARRAY", items: { type: "OBJECT", properties: { original: { type: "STRING" }, corrected: { type: "STRING" }, code: { type: "STRING", enum: TS_G }, why: { type: "STRING" } }, required: ["original", "corrected", "code", "why"] } },
  pronWords: { type: "ARRAY", items: { type: "OBJECT", properties: { word: { type: "STRING" }, heard: { type: "STRING" }, code: { type: "STRING", enum: TS_P }, tip: { type: "STRING" } }, required: ["word", "heard", "code", "tip"] } },
  structure: { type: "OBJECT", properties: { direct: { type: "BOOLEAN" }, reason: { type: "BOOLEAN" }, example: { type: "BOOLEAN" }, wrap: { type: "BOOLEAN" } }, required: ["direct", "reason", "example", "wrap"] },
  fixes: { type: "ARRAY", items: { type: "OBJECT", properties: { title: { type: "STRING" }, how: { type: "STRING" } }, required: ["title", "how"] } },
  better: { type: "STRING" },
  upgrades: { type: "ARRAY", items: { type: "OBJECT", properties: { from: { type: "STRING" }, to: { type: "STRING" }, example: { type: "STRING" } }, required: ["from", "to", "example"] } },
  inappropriate: { type: "BOOLEAN", description: "true only if the answer contains profanity, sexual content, slurs, or violent or hateful content (being off-topic alone is not inappropriate). Even when true, still give all the normal feedback, corrections and a better answer; the website handles the score." }   // 和 AiSpeak.gs 的 GS_INAPPROPRIATE 相同（頂層不能引用別的檔案的常數）
}, required: ["transcript", "parts", "dims", "level", "caps", "diagnosis", "nextLevel", "errors", "pronWords", "structure", "fixes", "better", "upgrades", "inappropriate"],
  propertyOrdering: ["transcript", "parts", "dims", "level", "caps", "diagnosis", "nextLevel", "errors", "pronWords", "structure", "fixes", "better", "upgrades", "inappropriate"] };
const TS_IV_TR = `Transcribe this English learner's spoken answer EXACTLY as said: do not correct grammar or word choice, keep fillers (um, uh, like) and repetitions, write (...) where there is a pause longer than about 1.5 seconds, write [?] for words you cannot understand. Empty string if there is no English speech. If the speaker uses Chinese, write the Chinese.`;

const TS_REPORT_SYSTEM = `You are a TOEFL iBT Speaking coach. You get the AI rating results of every item in one full Speaking section (Listen and Repeat ×7, Take an Interview ×4, each 0-5 by the ETS scoring guides) by a Taiwanese learner, plus the estimated band computed from them. Write a short overall report in Traditional Chinese (台灣用語, plain words, no jargon), addressing the learner as 你 (never 您).
Output JSON only:
- oneLine: ONE sentence summary of the whole section.
- lr: ONE sentence about Listen and Repeat (what was missed or changed most often, intelligibility).
- iv: ONE sentence about Take an Interview (elaboration, pace, pronunciation, grammar and vocabulary).
- strengths: 1-2 short phrases.
- priorities: exactly 3 {title (short), why (one sentence, cite where it happened, e.g. 複述第 6 句、訪談第 3 題), how (one concrete practice action)}.
- week: exactly 3 short daily practice actions for the next week (each one sentence).
Base everything only on the results given; do not invent. Never write codes such as P1, G2 or THIN — always use plain Chinese.`;
const TS_REPORT_SCHEMA = { type: "OBJECT", properties: { oneLine: { type: "STRING" }, lr: { type: "STRING" }, iv: { type: "STRING" }, strengths: { type: "ARRAY", items: { type: "STRING" } },
  priorities: { type: "ARRAY", items: { type: "OBJECT", properties: { title: { type: "STRING" }, why: { type: "STRING" }, how: { type: "STRING" } }, required: ["title", "why", "how"] } },
  week: { type: "ARRAY", items: { type: "STRING" } } }, required: ["oneLine", "lr", "iv", "strengths", "priorities", "week"] };

/* ---------- Listen and Repeat：逐字比對＋依 ETS 量表換成分數（文件第四節） ---------- */
const TS_FUNC = {}; "a an the to of in on at by for from with into onto about as and or but so if than that this these those it its is are was were be been being am do does did have has had will would can could may might must shall should i you he she we they me him her us them my your his our their not no there here what which who when where how all each every some any".split(" ").forEach(w => TS_FUNC[w] = 1);
const TS_CONTR = { "you're": "you are", "we're": "we are", "they're": "they are", "it's": "it is", "don't": "do not", "doesn't": "does not", "can't": "can not", "cannot": "can not", "i'm": "i am", "that's": "that is", "there's": "there is", "won't": "will not", "isn't": "is not", "aren't": "are not", "let's": "let us", "i'll": "i will", "you'll": "you will", "we'll": "we will", "i've": "i have", "you've": "you have" };
function tsWords_(s) {
  return String(s || "").toLowerCase().replace(/[’‘]/g, "'").replace(/\[\?\]/g, " xunclear ").replace(/\b(\d{1,2}):(\d{2})\b/g, (m, h, mm) => gsNum_(+h) + (+mm ? " " + gsNum_(+mm) : " o'clock"))
    .replace(/\d+/g, d => " " + gsNum_(+d) + " ").replace(/-/g, " ").replace(/[^a-z' ]/g, " ").split(/\s+/).filter(Boolean)
    .reduce((out, w) => out.concat((TS_CONTR[w] || w.replace(/'s$/, "s").replace(/'/g, "")).split(" ")), [])
    .filter(w => w && !/^(um+|uh+|er+|ah+|hmm+|mm+)$/.test(w));
}
const tsStem_ = w => w.replace(/(ing|ed|es|s)$/, "");
function tsLrScore_(target, said) {
  const T = tsWords_(target), A = tsWords_(said).filter(w => w !== "xunclear"), n = T.length, m = A.length;
  const marks = [];
  if (!m) return { level: 0, why: "none", marks: T.map(w => ({ w, st: "miss" })), cOk: 0 };
  const dp = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(0));
  for (let i = n - 1; i >= 0; i--) for (let j = m - 1; j >= 0; j--) dp[i][j] = T[i] === A[j] ? dp[i + 1][j + 1] + 1 : Math.max(dp[i + 1][j], dp[i][j + 1]);
  let i = 0, j = 0;
  while (i < n) {
    if (j < m && T[i] === A[j]) { marks.push({ w: T[i], st: "ok" }); i++; j++; }
    else if (j < m && tsStem_(T[i]) === tsStem_(A[j]) && tsStem_(T[i]).length >= 3) { marks.push({ w: T[i], st: "marker", said: A[j] }); i++; j++; }
    else if (j < m && dp[i + 1][j + 1] >= dp[i + 1][j] && dp[i + 1][j + 1] >= dp[i][j + 1]) { marks.push({ w: T[i], st: "sub", said: A[j] }); i++; j++; }
    else if (j < m && dp[i][j + 1] > dp[i + 1][j]) j++;
    else { marks.push({ w: T[i], st: "miss" }); i++; }
  }
  const content = marks.filter(x => !TS_FUNC[x.w]), cOk = content.filter(x => x.st === "ok" || x.st === "marker").length / Math.max(1, content.length);
  const err = marks.filter(x => x.st !== "ok"), errC = err.filter(x => !TS_FUNC[x.w] && x.st !== "marker"), errF = err.filter(x => TS_FUNC[x.w] && x.st !== "marker");
  const extra = Math.max(0, m - marks.filter(x => x.st !== "miss").length);
  let tail = 0; for (let k = marks.length - 1; k >= 0 && marks[k].st === "miss"; k--) tail++;
  const full = tail < Math.max(3, Math.ceil(n * 0.3));
  let level, why;
  if (!err.length && !extra) { level = 5; why = "exact"; }
  else if (err.length + (extra ? 1 : 0) <= 2 && errC.length === 0) { level = 4; why = "minor"; }
  else if (err.length <= 2 && errC.length === 1 && n >= 10 && errF.length === 0) { level = 4; why = "long1"; }
  else if (cOk >= 0.5 && full) { level = 3; why = "most"; }
  else if (cOk >= 0.35 && m > 3) { level = 2; why = full ? "partial" : "half"; }
  else if (cOk > 0) { level = 1; why = "few"; }
  else { level = 0; why = "unrelated"; }
  return { level, why, cOk: Math.round(cOk * 100), marks, extra };
}
const TS_CAP = { clear: 5, minor: 4, occasional: 3, low: 2, mostly: 1 };

function toeflSpeakGrade_(body) {
  const teacher = body.teacherCode && String(body.teacherCode) === TEACHER_CODE;
  const name = name_(body.name);
  if (!teacher) { const err = check_(name, code_(body.code)); if (err) return json_({ ok: false, error: err }); }
  const sub = String(body.sub || ""), t = body.task || {}, m = body.metrics || {}, clip = (s, n) => String(s || "").slice(0, n);
  if (["lr", "iv", "report"].indexOf(sub) < 0) return json_({ ok: false, error: "bad kind" });
  const num = k => Number(m[k]) || 0, metrics = { dur: num("dur"), speech: num("speech"), pauses: num("pauses"), pauses2: num("pauses2"), longest: num("longest"), onset: num("onset"), span: num("span"), ratio: num("ratio") };
  if (sub !== "report") {
    if (!/^[A-Za-z0-9+/=]{100,}$/.test(String(body.audio || "")) || String(body.audio).length > 2800000) return json_({ ok: false, error: "bad audio" });
    if (m.speech !== undefined && metrics.speech < 0.3) return json_({ ok: true, result: tsSilent_(sub, t), model: "none" });
  }
  const quota = aiQuota_(name, teacher || AI_NO_LIMIT.includes(name.toLowerCase()), "speak"); if (quota) return json_({ ok: false, error: quota });
  if (sub === "report") {
    const items = [].concat(body.items || []).slice(0, 12).map(x => JSON.stringify(x).slice(0, 1500)).join("\n"), est = body.est || {};
    const r = gsGemini_(TS_REPORT_SYSTEM, [{ text: "ESTIMATED: raw " + est.raw + "/55, band " + est.band + " (1-6)\n\nITEM RESULTS:\n" + items }], TS_REPORT_SCHEMA, GS_REPORT_MODELS);
    return json_(r.ok ? { ok: true, result: r.result, model: r.model } : { ok: false, error: r.error });
  }
  const aud = { inlineData: { mimeType: String(body.mime || "audio/webm").split(";")[0].slice(0, 30), data: String(body.audio) } };
  if (sub === "lr") {
    const text = clip(t.text, 300);
    const r = gsGemini_(TS_LR_SYSTEM, [aud, { text: "Transcribe and rate this recording." }], TS_LR_SCHEMA, GS_FAST);
    if (!r.ok) return json_({ ok: false, error: r.error });
    const c = tsLrScore_(text, r.result.transcript);
    let intel = r.result.intelligibility in TS_CAP ? r.result.intelligibility : "clear";
    if (c.level === 5 && intel === "minor" && !(r.result.problems || []).length) intel = "clear";   // R5：一字不差又沒聽到問題，快速模型習慣保留
    const level = Math.min(c.level, TS_CAP[intel]);
    return json_({ ok: true, model: r.model, result: gsRude_({ transcript: r.result.transcript, intelligibility: intel, problems: r.result.problems || [], level, content: c.level, why: c.why, cOk: c.cOk, marks: c.marks, extra: c.extra }) });
  }
  // iv：盲轉寫 → Pro 批改
  const question = clip(t.question, 600);
  const [tr, pr] = gsGeminiAll_([{ system: TS_IV_TR, parts: [aud], schema: GS_TR_SCHEMA, chain: GS_FAST }, { system: GS_PRON_SYSTEM, parts: [aud, { text: "Check this recording." }], schema: GS_PRON_SCHEMA, chain: GS_PRON_MODELS }]);   // 盲轉寫和發音專門檢查同時跑
  if (!tr.ok) return json_({ ok: false, error: tr.error });
  const said = String(tr.result.transcript || ""), pron = pr.ok ? gsPronClean_(pr.result) : null;
  if (!gsWords_(said).length) return json_({ ok: true, result: tsSilent_(sub, t), model: tr.model });
  const mt = "METRICS (measured by the website from the audio volume): recording " + metrics.dur + "s of 45s, actual speech " + metrics.speech + "s, first word after " + metrics.onset + "s, pauses over 0.6s: " + metrics.pauses +
    ", over 2s: " + metrics.pauses2 + ", longest pause " + metrics.longest + "s, speaking ratio (time with voice ÷ time from first to last word) " + metrics.ratio + "%. For reference, ETS 5-point sample answers have ratios around 65% with several short thinking pauses.";
  const r = gsGemini_(TS_IV_SYSTEM, [{ text: "INTERVIEWER'S QUESTION: " + question }, { text: mt }, { text: "BLIND TRANSCRIPT (made without seeing the question): " + said }, { text: gsPronText_(pron) }, aud], TS_IV_SCHEMA, GS_PRO);
  if (!r.ok) return json_({ ok: false, error: r.error });
  const x = r.result; x.level = Math.max(0, Math.min(5, Math.round(Number(x.level) || 0)));
  if (/[一-鿿]/.test(said) && gsWords_(said).length < 4) { x.level = 0; x.caps = ["X0"]; }
  x.blind = said; if (pron) x.pronCheck = pron;
  return json_({ ok: true, result: gsRude_(x, said), model: tr.model + " → " + r.model + (pron ? " ＋發音 " + pr.model : "") });
}
function tsSilent_(sub, t) {
  const msg = "沒有聽到英文的聲音，請確認麥克風有收到聲音，再試一次。";
  if (sub === "lr") return { transcript: "", intelligibility: "mostly", problems: [], level: 0, content: 0, why: "none", cOk: 0, marks: tsWords_((t || {}).text).map(w => ({ w, st: "miss" })), extra: 0, comment: msg };
  return { transcript: "", parts: [], dims: {}, level: 0, caps: ["X0"], diagnosis: msg, nextLevel: "", errors: [], pronWords: [], structure: {}, fixes: [], better: "", upgrades: [] };
}
