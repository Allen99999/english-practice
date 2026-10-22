/**
 * AI 批改（Vertex AI 上的 Gemini）：目前只批托福 Write an Email。
 * - POST {action:"aigrade", kind:"email", name, code, task:{scenario, bullets, to, subject}, essay, secs}
 *   學生要帶名字＋個人代碼；老師可以改帶 teacherCode。回傳 {ok, result, model}
 * - 用部署者（Allen）帳號的授權呼叫，費用記在 VERTEX_PROJECT（Secrets.gs）這個 Google Cloud 專案。
 * - 評分標準照「新制托福 Write an Email 評分與回饋系統」：ETS 0～5 整體評分、四面向、封頂規則。
 * 這段不放在 doPost 的鎖裡面（AI 要跑幾十秒，不能卡住交卷等其他動作）。
 */
const AI_MODELS = ["gemini-3.1-pro-preview", "gemini-2.5-pro"];   // 第一個被限流或失敗就換下一個
const AI_PER_STUDENT = 40;   // 每個名字 6 小時內最多批幾篇
const AI_TOTAL = 300;        // 全站 6 小時內最多批幾篇（保護額度）

const EMAIL_SYSTEM = `You are a certified TOEFL iBT (2026 format) rater for the "Write an Email" task, giving feedback to a Taiwanese learner. Score and give feedback strictly by the rules below. Write ALL feedback text in Traditional Chinese (台灣用語), but keep quoted English exactly as written.

## Task
The test taker reads a situation and must write an email covering three required points in 7 minutes. Score 0–5 (holistic). The response is treated as a timed first draft: minor slips are acceptable even at 5.

## ETS holistic levels
5 fully successful: effective, clearly expressed, consistent facility; elaboration effectively supports the purpose; effective variety of syntax, precise idiomatic word choice; consistently appropriate social conventions (politeness, register, organization of requests/refusals/complaints); almost no errors beyond typical timed-writing slips.
4 generally successful: generally effective, easy to understand; adequate elaboration; some syntactic variety, appropriate word choice; mostly appropriate conventions; a few lexical or grammatical errors.
3 partially successful: mostly accomplishes the task but language limits clarity in places; elaboration only partially supports purpose; moderate range; noticeable problems with social conventions; noticeable errors in structure, word forms or idiomatic use.
2 mostly unsuccessful: limited or unclear message; limited or irrelevant elaboration; narrow range; accumulation of errors.
1 unsuccessful: telegraphic phrases, very limited vocabulary, serious frequent errors; intelligible parts mostly borrowed from the prompt.
0 blank, off-topic, not English, entirely copied from the prompt, or random keystrokes.

## Four dimensions (score each 0–5, halves allowed)
A Task & elaboration: 5 = all three points answered, each with at least 2 sentences and a concrete detail (name, date, number, reason, consequence), explaining why; 4 = all answered but one is vague; 3 = all touched but one is a single vague sentence or partly off; 2 = one point missing or all just restate the prompt; ≤1 = two+ points missing or mostly borrowed.
Count required ACTIONS: every verb in a bullet is a separate required action (e.g. "Introduce yourself and explain how..." = two actions). Missing any action makes that point "thin" or "missing".
B Social conventions & register: 5 = greeting, opening, closing, sign-off consistent with the recipient; requests softened (Would it be possible...?); complaints/refusals buffered; consistent tone. 4 = one or two slightly casual/stiff spots. 3 = noticeably inconsistent tone (formal opening but "really", "pretty sure"), overly direct requests ("Please give me..."). 2 = register wrong overall or missing greeting/closing.
C Syntax variety & word choice: 5 = at least three structures used naturally (complex sentences, relative clauses, participle/infinitive phrases, conditionals, indirect questions), precise collocations; 4 = some variety, occasional vague words (good, thing, big); 3 = mostly simple/short sentences, repetition; 2 = single pattern, limited vocabulary.
D Accuracy (per ~100–130 words): 5 = 0–2 slips; 4 = 3–5 errors, none impede meaning, no repeated pattern; 3 = 6–9 errors or a repeated pattern (articles, tense, number); 2 = 10+ or sentences that must be reread.

## Caps (override the average)
- One required point missing → max 3. Two or more missing → max 2.
- Two or more points each missing one action → treat as one point missing (max 3); if also under 80 words or a point is a single vague sentence → 2.5.
- Mostly borrowed from the prompt → max 1; entirely copied → 0.
- Register completely wrong (e.g. "Hey", "gonna" to a professor) → max 3.
- Any error causing misunderstanding → max 2.5.
Final task score: start from the dimension average, apply caps, then choose the holistic level the response most resembles; when dimensions diverge, lean toward the weaker one. Report the final score as an integer or .5. List every cap you applied in "caps" (empty if none).

## Errors typical of Chinese-speaking learners (check carefully)
articles; countable/uncountable and plurals (informations); tense consistency; subject–verb agreement; prepositions (discuss about, in Monday, apply the program); comma splices and fragments ("Because I was sick."); literal translations (Hope you can understand / Sorry to bother you); collocations (look forward to hear); lowercase "i"; titles (Dear Teacher Wang → Dear Professor Wang).

## Word count
Count only the body (exclude greeting and sign-off). 100–130 words is the target; under 80 usually lacks detail; over 150 risks errors. Word count itself is not scored.

## Output rules
Return JSON only, following the schema.
- points: one entry per required bullet, in order; "point" = the bullet text; "quote" = the learner's sentence(s) that answer it copied exactly ("" if none); status ok / thin / missing; "note" = why, and how to fix it (one or two short sentences).
- errors: at most 8, most serious first. "original" MUST be copied character-for-character from the learner's email (a short span of 1–12 words, so it can be highlighted); "corrected" = the fixed span; "rule" = one short sentence; severity red = blocks understanding, orange = clear error that lowers the score, yellow = minor slip or could be better; "category" = one of the listed categories.
- strengths: 1–3 concrete things done well.
- upgrades: 3–5 vague or weak words/phrases from the learner's email with more precise replacements and one example sentence each.
- diagnosis: ONE sentence naming the single thing that limits the score most.
- nextFocus: ONE thing to practice in the next email.
Do not write a model email.`;

const EMAIL_SCHEMA = { type: "OBJECT", properties: {
  score: { type: "NUMBER" }, wordCount: { type: "INTEGER" },
  dims: { type: "OBJECT", properties: {
    task: { type: "OBJECT", properties: { score: { type: "NUMBER" }, comment: { type: "STRING" } }, required: ["score", "comment"] },
    register: { type: "OBJECT", properties: { score: { type: "NUMBER" }, comment: { type: "STRING" } }, required: ["score", "comment"] },
    syntax: { type: "OBJECT", properties: { score: { type: "NUMBER" }, comment: { type: "STRING" } }, required: ["score", "comment"] },
    accuracy: { type: "OBJECT", properties: { score: { type: "NUMBER" }, comment: { type: "STRING" } }, required: ["score", "comment"] } },
    required: ["task", "register", "syntax", "accuracy"] },
  caps: { type: "ARRAY", items: { type: "STRING" } },
  diagnosis: { type: "STRING" },
  points: { type: "ARRAY", items: { type: "OBJECT", properties: { point: { type: "STRING" }, quote: { type: "STRING" }, status: { type: "STRING", enum: ["ok", "thin", "missing"] }, note: { type: "STRING" } }, required: ["point", "quote", "status", "note"] } },
  registerCheck: { type: "OBJECT", properties: { greeting: { type: "STRING" }, closing: { type: "STRING" }, requests: { type: "STRING" }, toneShifts: { type: "STRING" } }, required: ["greeting", "closing", "requests", "toneShifts"] },
  strengths: { type: "ARRAY", items: { type: "STRING" } },
  errors: { type: "ARRAY", items: { type: "OBJECT", properties: {
    severity: { type: "STRING", enum: ["red", "orange", "yellow"] }, original: { type: "STRING" }, corrected: { type: "STRING" }, rule: { type: "STRING" },
    category: { type: "STRING", enum: ["冠詞", "單複數／不可數", "時態", "主詞動詞一致", "介系詞", "句子結構", "語序／間接問句", "用字搭配", "語域語氣", "拼字", "大小寫標點", "其他"] } },
    required: ["severity", "original", "corrected", "rule", "category"] } },
  upgrades: { type: "ARRAY", items: { type: "OBJECT", properties: { vague: { type: "STRING" }, better: { type: "STRING" }, example: { type: "STRING" } }, required: ["vague", "better", "example"] } },
  nextFocus: { type: "STRING" } },
  required: ["score", "wordCount", "dims", "caps", "diagnosis", "points", "registerCheck", "strengths", "errors", "upgrades", "nextFocus"] };

function aiCount_(key, max) {   // 6 小時內的使用次數（超過就擋）
  const c = CacheService.getScriptCache(), k = "ai:" + key, n = Number(c.get(k) || 0);
  if (n >= max) return true;
  c.put(k, String(n + 1), 21600); return false;
}
function aiGrade_(body) {
  const teacher = body.teacherCode && String(body.teacherCode) === TEACHER_CODE;
  const name = name_(body.name);
  if (!teacher) { const err = check_(name, code_(body.code)); if (err) return json_({ ok: false, error: err }); }
  if (body.kind !== "email") return json_({ ok: false, error: "bad kind" });
  const t = body.task || {}, essay = String(body.essay || "").slice(0, 5000);
  if ((essay.match(/[A-Za-z]+/g) || []).length < 3) return json_({ ok: false, error: "empty" });
  if (aiCount_("all", AI_TOTAL) || (!teacher && aiCount_("n:" + name, AI_PER_STUDENT))) return json_({ ok: false, error: "busy" });
  const clip = (s, n) => String(s || "").slice(0, n);
  const prompt = "TASK PROMPT:\n" + clip(t.scenario, 1500) + "\n" + [].concat(t.bullets || []).slice(0, 5).map(b => "- " + clip(b, 300)).join("\n") +
    "\nTo: " + clip(t.to, 120) + "\nSubject: " + clip(t.subject, 200) +
    "\n\nLEARNER'S EMAIL:\n" + essay + "\n\nTime used: " + Math.round(Number(body.secs) || 0) + " seconds (limit 7 minutes)";
  const r = gemini_(EMAIL_SYSTEM, prompt, EMAIL_SCHEMA);
  if (!r.ok) return json_({ ok: false, error: r.error });
  return json_({ ok: true, result: r.result, model: r.model });
}
function gemini_(system, prompt, schema) {
  const token = ScriptApp.getOAuthToken(), errs = [];
  for (const model of AI_MODELS) {
    const url = "https://aiplatform.googleapis.com/v1/projects/" + VERTEX_PROJECT + "/locations/global/publishers/google/models/" + model + ":generateContent";
    const res = UrlFetchApp.fetch(url, { method: "post", contentType: "application/json", muteHttpExceptions: true, timeoutSeconds: 240,
      headers: { Authorization: "Bearer " + token, "x-goog-user-project": VERTEX_PROJECT },
      payload: JSON.stringify({ systemInstruction: { parts: [{ text: system }] }, contents: [{ role: "user", parts: [{ text: prompt }] }],
        generationConfig: { temperature: 0.2, responseMimeType: "application/json", responseSchema: schema } }) });
    const code = res.getResponseCode();
    if (code === 200) {
      try { const d = JSON.parse(res.getContentText()); return { ok: true, model, result: JSON.parse(d.candidates[0].content.parts[0].text) }; }
      catch (e) { errs.push(model + ": bad json"); continue; }
    }
    errs.push(model + ": " + code);
  }
  return { ok: false, error: "ai failed (" + errs.join(", ") + ")" };
}
/* 在編輯器手動執行一次：授權呼叫 Vertex AI（會出現「允許」視窗），並確認連得上 */
function testAi() {
  const r = gemini_("Reply with JSON {\"ok\":true}.", "ping", { type: "OBJECT", properties: { ok: { type: "BOOLEAN" } }, required: ["ok"] });
  Logger.log(JSON.stringify(r));
}
