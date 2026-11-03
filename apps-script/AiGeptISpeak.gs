/**
 * 全民英檢中級口說 AI 批改（Gemini 直接聽錄音）。評分基準＝本機文件「全民英檢中級口說 評分與回饋系統.md」（官方整體級分描述逐字、不可改）。
 * POST {action:"aigrade", kind:"gepti-speak", sub:"read"|"answer"|"pic"|"report", name, code (或 teacherCode), audio (base64), mime,
 *       task:{segs:[2 篇]}|{question, secs}|{questions:[...], draw}, metrics:{dur, speech, pauses, pauses2, longest, onset, span, ratio}}
 * - 朗讀短文：2.5-flash 不看原文盲轉寫 → 3.1-pro 拿原文＋轉寫＋錄音批改；唸到的比例由程式封頂（AiSpeak.gs 的 gsFinal_）。
 * - 回答問題：2.5-flash 一次完成（約 3～5 秒）。
 * - 看圖敘述：2.5-flash 盲轉寫 → 3.1-pro 拿問題＋圖片描述＋轉寫＋錄音批改。
 * 共用 AiSpeak.gs 的模型清單、gsGemini_、gsFinal_、gsSilent_ 和 speak 額度。
 */
const GIS_SCALE = `## Official LTTC rating scale (GEPT Intermediate speaking, quoted; one holistic level 0–5 for the whole test)
5 發音清晰、正確，語調正確、自然；對應內容切題，表達流暢；語法、字彙使用自如，雖仍偶有錯誤，但無礙溝通。
4 發音大致清晰、正確，語調大致正確、自然；對應內容切題，語法、字彙之使用雖有錯誤，但無礙溝通。
3 發音、語調時有錯誤，因而影響聽者對其語意的瞭解。已能掌握基本句型結構，語法仍有錯誤；且因字彙、片語有限，阻礙表達。
2 發音、語調錯誤均多，朗讀時常因缺乏辨識能力而略過不讀；因語法、字彙常有錯誤，而無法進行有效的溝通。
1 發音、語調錯誤多且嚴重，又因語法錯誤甚多，認識之單字片語有限，無法清楚表達，幾乎無溝通能力。
0 未答／等同未答。
Passing is level 4. The 2025 national average for Intermediate speaking was 3.68. You rate ONE part with this scale so the student sees their level on it.`;

const GIS_COMMON = `You are a certified GEPT Intermediate (全民英檢中級, CEFR B1) speaking rater for LTTC, listening to a recording by a Taiwanese senior high school student on a practice website.
Write ALL feedback in Traditional Chinese (台灣用語) for a high school student: plain words; school grammar terms are fine (過去式、現在進行式、主詞動詞一致), but no linguistics jargon. Keep English words exactly as they are. Be warm but honest.

${GIS_SCALE}

## How to listen (calibration — follow strictly)
- A Taiwanese accent by itself is NOT an error. Count a pronunciation problem only when it changes the word, makes it hard to recognise, or clearly breaks rhythm/intonation.
- Natural connected speech (linking, weak forms of to/a/the/and, a soft t) is NOT an error. Natural "um" and short thinking pauses are fine.
- Do not invent problems you did not clearly hear; if it is good, give fewer items.
- Problem codes (use only these): P1 字尾的子音沒發出來或多加音, P2 th 音, P3 v／f／w／b, P4 l／r／n, P5 母音, P6 單字重音, P7 句子語調, P8 字尾 -s／-ed, P9 節奏（內容字沒有重讀、一個字一個字蹦）, F1 停頓太多太長, F2 速度太慢, F3 重複、um 太多, C1 漏字或略過, C2 加字或換字, C3 數字時間價錢電話唸錯.
- No speech, only noise, or only Chinese → level 0.`;

const GIS_READ_SYSTEM = GIS_COMMON + `

## Task: Part 1 朗讀短文 (read two short passages aloud) — the main pronunciation task, give careful, detailed feedback
The learner read silently for 1 minute, then read TEXT 1 and TEXT 2 aloud within 2 minutes at a normal speed.
LTTC's official learning guide names two keys for this part: (1) reading NUMBERS correctly — floors (4th floor = fourth floor), prices ($7.95 = seven ninety-five or seven dollars and ninety-five cents), phone numbers (digit by digit), times (11:00 am = eleven a-m, 9:05 = nine-o-five); (2) rhythm — content words (nouns, main verbs, adjectives, adverbs) stressed and a bit slower, function words lighter and faster.
You also get TRANSCRIPT: what an independent listener (who did NOT see the text) heard. Trust it for which words were said; use the audio for how they sounded.
Procedure:
1. Compare TEXT with TRANSCRIPT and the audio: skipped, changed or added words; every number.
2. For each text (n = 1, 2): status ok / minor / major / skipped; intonation ok / flat / wrong / na; note: one short Chinese sentence (empty if ok). Mention number errors here.
3. level (0–5) for this part: 5 = both read completely, clear and correct, numbers right, natural stress and phrasing (accent is fine); 4 = complete, a few unclear words or a couple of hesitations, at most one number wrong; 3 = errors that sometimes make words hard to understand, slow with many pauses, several numbers wrong, or some words skipped; 2 = many errors, often skips words it cannot recognise, or only about half read; 1 = little read or mostly unintelligible; 0 = nothing / not English.
4. words: only real problems you clearly heard, at most 8, most important first, empty if none: {word (exactly as in the text; for numbers write the number as in the text), code, heard (what it sounded like in English letters; "" if skipped), tip}.
5. strengths: 1–2 specific short Chinese phrases. fixes: exactly 3 priorities {code, title, how (one concrete way to practise today)}. diagnosis: ONE sentence on what holds the score back most. nextLevel: ONE sentence on exactly what to change for the next level ("" if 5). drill: 3–6 words, numbers or short phrases from the text to practise (English only).
Return JSON only.`;

const GIS_ANSWER_SYSTEM = GIS_COMMON + `

## Task: Part 2 回答問題 (answer a question)
The learner heard the QUESTION twice and answered within the given time (questions 1–5: 15 seconds; questions 6–10: 30 seconds). Official rule: the answer need not be complete sentences, but should express as much as possible in the time. LTTC's official guide: answer in the tense the question asks — "What are you doing right now?" needs the present progressive ("I'm taking a test"); answering "I exercise every day" is off topic / does not answer the question. Later questions ask for opinions, hypotheses (What would you do if…) or suggestions and need a reason.
Procedure:
1. transcript: EXACTLY what the learner said, word by word; do not correct; fillers as "um"; unclear words [?]; empty if no speech; Chinese stays Chinese.
2. answered: true if it really answers THIS question (right topic and a tense that fits the question); false if off topic, misunderstands, answers a different question because of the tense, or only "I don't know".
3. level (0–5, integer) on the official scale for this answer, combining relevance, pronunciation/fluency and grammar/vocabulary. Check from 5 down:
   5 = answers directly in a fitting tense AND adds a reason, example or detail (for 30-second questions a real reason is required); clear and fluent; grammar and words basically correct (small slips only).
   4 = answers the question; a few grammar or word errors that do not block communication; or correct but only one short sentence with no reason (30-second question) / no detail.
   3 = answers but frequent errors, very limited words, or pronunciation problems make parts unclear; or only a word or short phrase.
   2 = hard to understand, mostly fragments, long struggles; or off topic / answers a different question; or only "Yes."/"No.".
   1 = almost no sentence structure, only a few English words. 0 = no answer, only noise, only Chinese, or only repeats the question.
   Caps (only push down): off topic → max 2; one word or a short phrase only → max 3; mostly Chinese → max 1.
4. pron (0–5): the official scale for pronunciation, intonation and fluency only (used for statistics).
5. errors: at most 3 grammar/word errors {code, original (copied exactly from transcript), corrected, why}. Codes: G1 時態, G2 主詞動詞一致, G3 be 動詞與一般動詞混用, G4 單複數, G5 冠詞, G6 介系詞, G7 詞性, G8 句子不完整, G9 語序, G11 助動詞與問句, V1 用字不當, V2 中式英文.
6. problems: at most 2 pronunciation/fluency problems {code, word, tip}.
7. comment: ONE Chinese sentence — did it answer the question (mention the tense if relevant) and what holds the level back. better: a better answer built on THEIR idea that fits the time (15 s: 2 short sentences; 30 s: 3–4 sentences with a reason), B1 words. tip: ONE concrete sentence for next time.
Return JSON only.`;

const GIS_PIC_SYSTEM = GIS_COMMON + `

## Task: Part 3 看圖敘述 (describe a picture)
The learner looked at a picture and several questions for 30 seconds, then answered within 1 minute 30 seconds without reading the question numbers. LTTC's official guide: answer the questions in order (where, what they are doing, how they feel and why…), then, if there is time, describe details of the picture. You cannot see the picture: PICTURE DESCRIPTION tells you what it shows. You also get BLIND TRANSCRIPT (made without seeing the questions) and METRICS measured from the audio volume.
Procedure:
1. transcript: what the learner said (keep um/uh; write (...) for pauses longer than about 1.5 s). Use the blind transcript as the record of the words.
2. parts: one row per question (short Chinese) plus a final row "細節描述"; status yes / partial / no; note one short Chinese sentence. A description that contradicts the picture counts as partial.
3. dims: respond (answers every question with reasons and details, matches the picture), pace (keeps talking, pauses), pron (pronunciation, stress, intonation), lang (grammar and words) — each {score 0–5, note}.
4. level (0–5) on the official scale for this part: 5 = every question answered with reasons and extra details, speaks for about a minute or more, clear and fluent, only small errors; 4 = every question answered with some details, errors that do not block communication; 3 = only some questions answered or very short (under about 40 seconds), or errors/pauses that make parts unclear; 2 = mostly fragments or hard to understand, or talks about something unrelated to the picture; 1 = only a few words; 0 = nothing / not English.
   The level may not be more than 1 above the lowest dimension.
   Caps (only push down), list the codes you apply: X0 no English → 0; ISO mostly isolated words → max 1; OFF unrelated to the picture → max 2; THIN speaks less than 30 seconds or answers only half of the questions → max 3; CHOP choppy (METRICS: speaking ratio below 55% AND 3+ pauses over 2 s) → max 3; PART one question not answered → max 4.
   Do NOT lower the score for natural um/uh, self-corrections, an accent, or being cut off at the time limit.
5. diagnosis: ONE sentence on what decided the level. nextLevel: ONE sentence for the next level ("" if 5).
6. errors: at most 6 {original (copied exactly from transcript), corrected, code, why}. Codes: G1 時態, G2 主詞動詞一致, G3 be 動詞與一般動詞混用, G4 單複數, G5 冠詞, G6 介系詞, G7 詞性, G8 句子不完整, G9 語序, G11 助動詞與問句, V1 用字不當, V2 中式英文, V3 字彙太簡單重複.
7. pronWords: at most 3 pronunciation problems you clearly heard {word, heard, code, tip}.
8. fixes: exactly 3 priorities ordered by how much they would raise the level {title, how}.
9. better: a level-5 answer built on the learner's own ideas and the picture (about 120–150 words, a student can say it in 90 seconds; answer the questions in order, then details with in front of / behind / on the left…).
10. upgrades: up to 3 {from (copied from the transcript), to, example}.
Return JSON only.`;

const GIS_REPORT_SYSTEM = `You are a GEPT Intermediate speaking coach. You get the AI results of every part of one full speaking test (Part 1 朗讀短文 ×2 in one recording, Part 2 回答問題 ×10, Part 3 看圖敘述 ×1) by a Taiwanese senior high school student, plus the estimated holistic level computed from them.
${GIS_SCALE}
Write a short overall report in Traditional Chinese (台灣用語, plain words). Output JSON only:
- oneLine: ONE sentence summary. read: ONE sentence about the read-aloud (numbers, skipped words, rhythm). answer: ONE sentence about answering questions (relevance and tense, reasons, grammar). pic: ONE sentence about the picture description.
- strengths: 1–2 short phrases.
- priorities: exactly 3 {title, why (cite where, e.g. 回答問題第 7 題、朗讀第 2 篇), how (one concrete practice action)}.
- week: exactly 3 short daily practice actions for the next week.
Base everything only on the results given. Never write codes such as P1 or G2 — always plain Chinese.`;
const GIS_REPORT_SCHEMA = { type: "OBJECT", properties: { oneLine: { type: "STRING" }, read: { type: "STRING" }, answer: { type: "STRING" }, pic: { type: "STRING" }, strengths: { type: "ARRAY", items: { type: "STRING" } },
  priorities: { type: "ARRAY", items: { type: "OBJECT", properties: { title: { type: "STRING" }, why: { type: "STRING" }, how: { type: "STRING" } }, required: ["title", "why", "how"] } },
  week: { type: "ARRAY", items: { type: "STRING" } } }, required: ["oneLine", "read", "answer", "pic", "strengths", "priorities", "week"] };

const GIS_P = ["P1", "P2", "P3", "P4", "P5", "P6", "P7", "P8", "P9", "F1", "F2", "F3", "C1", "C2", "C3"];   // 和 AiSpeak.gs 的 GS_P 相同；檔案載入順序不一定，頂層不要引用別的檔案的常數
const GIS_G = ["G1", "G2", "G3", "G4", "G5", "G6", "G7", "G8", "G9", "G11", "V1", "V2", "V3"];
const GIS_DIM = { type: "OBJECT", properties: { score: { type: "INTEGER" }, note: { type: "STRING" } }, required: ["score", "note"] };
const GIS_PIC_SCHEMA = { type: "OBJECT", properties: {
  transcript: { type: "STRING" },
  parts: { type: "ARRAY", items: { type: "OBJECT", properties: { part: { type: "STRING" }, status: { type: "STRING", enum: ["yes", "partial", "no"] }, note: { type: "STRING" } }, required: ["part", "status", "note"] } },
  dims: { type: "OBJECT", properties: { respond: GIS_DIM, pace: GIS_DIM, pron: GIS_DIM, lang: GIS_DIM }, required: ["respond", "pace", "pron", "lang"] },
  level: { type: "INTEGER" }, caps: { type: "ARRAY", items: { type: "STRING", enum: ["X0", "ISO", "OFF", "THIN", "CHOP", "PART"] } }, diagnosis: { type: "STRING" }, nextLevel: { type: "STRING" },
  errors: { type: "ARRAY", items: { type: "OBJECT", properties: { original: { type: "STRING" }, corrected: { type: "STRING" }, code: { type: "STRING", enum: GIS_G }, why: { type: "STRING" } }, required: ["original", "corrected", "code", "why"] } },
  pronWords: { type: "ARRAY", items: { type: "OBJECT", properties: { word: { type: "STRING" }, heard: { type: "STRING" }, code: { type: "STRING", enum: GIS_P }, tip: { type: "STRING" } }, required: ["word", "heard", "code", "tip"] } },
  fixes: { type: "ARRAY", items: { type: "OBJECT", properties: { title: { type: "STRING" }, how: { type: "STRING" } }, required: ["title", "how"] } },
  better: { type: "STRING" },
  upgrades: { type: "ARRAY", items: { type: "OBJECT", properties: { from: { type: "STRING" }, to: { type: "STRING" }, example: { type: "STRING" } }, required: ["from", "to", "example"] } },
  inappropriate: { type: "BOOLEAN", description: "true only if the answer contains profanity, sexual content, slurs, or violent or hateful content (being off-topic alone is not inappropriate). Even when true, still give all the normal feedback, corrections and a better answer; the website handles the score." }   // 和 AiSpeak.gs 的 GS_INAPPROPRIATE 相同（頂層不能引用別的檔案的常數）
}, required: ["transcript", "parts", "dims", "level", "caps", "diagnosis", "nextLevel", "errors", "pronWords", "fixes", "better", "upgrades", "inappropriate"],
  propertyOrdering: ["transcript", "parts", "dims", "level", "caps", "diagnosis", "nextLevel", "errors", "pronWords", "fixes", "better", "upgrades", "inappropriate"] };

function geptISpeakGrade_(body) {
  const teacher = body.teacherCode && String(body.teacherCode) === TEACHER_CODE;
  const name = name_(body.name);
  if (!teacher) { const err = check_(name, code_(body.code)); if (err) return json_({ ok: false, error: err }); }
  const sub = String(body.sub || ""), t = body.task || {}, m = body.metrics || {}, clip = (s, n) => String(s || "").slice(0, n);
  if (["read", "answer", "pic", "report"].indexOf(sub) < 0) return json_({ ok: false, error: "bad kind" });
  const num = k => Number(m[k]) || 0, metrics = { dur: num("dur"), speech: num("speech"), pauses: num("pauses"), pauses2: num("pauses2"), longest: num("longest"), onset: num("onset"), span: num("span"), ratio: num("ratio") };
  if (sub !== "report") {
    if (!/^[A-Za-z0-9+/=]{100,}$/.test(String(body.audio || "")) || String(body.audio).length > 4200000) return json_({ ok: false, error: "bad audio" });
    if (m.speech !== undefined && metrics.speech < 0.3) return json_({ ok: true, result: gisSilent_(sub), model: "none" });
  }
  const quota = aiQuota_(name, teacher || AI_NO_LIMIT.includes(name.toLowerCase()), "speak"); if (quota) return json_({ ok: false, error: quota });
  if (sub === "report") {
    const items = [].concat(body.items || []).slice(0, 16).map(x => JSON.stringify(x).slice(0, 1500)).join("\n"), est = body.est || {};
    const r = gsGemini_(GIS_REPORT_SYSTEM, [{ text: "ESTIMATED HOLISTIC LEVEL: " + est.level + " (score " + est.score + "/100, pass 80); part averages: read " + est.read + ", answer " + est.answer + ", picture " + est.pic + "\n\nPART RESULTS:\n" + items }], GIS_REPORT_SCHEMA, GS_REPORT_MODELS);
    return json_(r.ok ? { ok: true, result: r.result, model: r.model } : { ok: false, error: r.error });
  }
  const aud = { inlineData: { mimeType: String(body.mime || "audio/webm").split(";")[0].slice(0, 30), data: String(body.audio) } };
  const fl = "\n\nRecording facts measured by the website: length " + metrics.dur + " s, speaking time " + metrics.speech + " s, pauses longer than 0.6 s: " + metrics.pauses + ", over 2 s: " + metrics.pauses2 +
    ", longest pause " + metrics.longest + " s, started speaking after " + metrics.onset + " s, speaking ratio " + metrics.ratio + "%.";
  if (sub === "answer") {
    const secs = Number(t.secs) === 30 ? 30 : 15;
    const r = gsGemini_(GIS_ANSWER_SYSTEM, [{ text: "QUESTION (" + secs + "-second answer): " + clip(t.question, 300) + fl + "\nThe learner's recording follows." }, aud], GS_ANSWER_SCHEMA, GS_FAST);
    if (!r.ok) return json_({ ok: false, error: r.error });
    return json_({ ok: true, result: gsRude_(gsFinal_("answer", r.result, {}, metrics)), model: r.model });
  }
  const [tr, pr] = sub === "pic" ? gsGeminiAll_([{ system: GS_TR_SYSTEM, parts: [aud], schema: GS_TR_SCHEMA, chain: GS_FAST }, { system: GS_PRON_SYSTEM, parts: [aud, { text: "Check this recording." }], schema: GS_PRON_SCHEMA, chain: GS_PRON_MODELS }])
    : [gsGemini_(GS_TR_SYSTEM, [aud], GS_TR_SCHEMA, GS_FAST), { ok: false }];   // 看圖敘述：盲轉寫和發音專門檢查同時跑（朗讀已經逐句對原文檢查發音）
  if (!tr.ok) return json_({ ok: false, error: tr.error });
  const said = String(tr.result.transcript || ""), pron = pr.ok ? gsPronClean_(pr.result) : null;
  if (!gsWords_(said).length) return json_({ ok: true, result: gisSilent_(sub), model: tr.model });
  if (sub === "read") {
    const task = { segs: [].concat(t.segs || []).slice(0, 2).map(x => clip(x, 900)) };
    const r = gsGemini_(GIS_READ_SYSTEM, [{ text: "TEXT:\n" + task.segs.map((s, k) => (k + 1) + ". " + s).join("\n") + "\n\nTRANSCRIPT: " + said + fl + "\nThe learner's recording follows." }, aud], GS_READ_SCHEMA, GS_PRO);
    if (!r.ok) return json_({ ok: false, error: r.error });
    r.result.transcript = said;
    return json_({ ok: true, result: gsRude_(gsFinal_("read", r.result, task, metrics), said), model: tr.model + " → " + r.model });
  }
  const qs = [].concat(t.questions || []).slice(0, 6).map(x => clip(x, 300));
  const r = gsGemini_(GIS_PIC_SYSTEM, [{ text: "QUESTIONS:\n" + qs.map((s, k) => (k + 1) + ". " + s).join("\n") + "\n\nPICTURE DESCRIPTION: " + clip(t.draw, 1200) + "\n\nBLIND TRANSCRIPT: " + said + fl + "\nThe learner's recording follows." }, { text: gsPronText_(pron) }, aud], GIS_PIC_SCHEMA, GS_PRO);
  if (!r.ok) return json_({ ok: false, error: r.error });
  const x = r.result; x.level = Math.max(0, Math.min(5, Math.round(Number(x.level) || 0))); x.blind = said; if (pron) x.pronCheck = pron;
  if (/[一-鿿]/.test(said) && gsWords_(said).length < 4) { x.level = 0; x.caps = ["X0"]; }
  return json_({ ok: true, result: gsRude_(x, said), model: tr.model + " → " + r.model });
}
function gisSilent_(sub) {
  if (sub === "pic") return { transcript: "", parts: [], dims: {}, level: 0, caps: ["X0"], diagnosis: "沒有聽到英文的聲音，請確認麥克風有收到聲音，再試一次。", nextLevel: "", errors: [], pronWords: [], fixes: [], better: "", upgrades: [] };
  return gsSilent_(sub);
}
