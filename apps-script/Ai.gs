/**
 * AI 批改（Vertex AI 上的 Gemini）：目前只批托福 Write an Email。
 * - POST {action:"aigrade", kind:"email", name, code, task:{scenario, bullets, to, subject}, essay, secs}
 *   學生要帶名字＋個人代碼；老師可以改帶 teacherCode。回傳 {ok, result, model}
 * - 用部署者（Allen）帳號的授權呼叫，費用記在 VERTEX_PROJECT（Secrets.gs）這個 Google Cloud 專案。
 * - 評分標準照「新制托福 Write an Email 評分與回饋系統」：ETS 0～5 整體評分、四面向、封頂規則。
 * 這段不放在 doPost 的鎖裡面（AI 要跑幾十秒，不能卡住交卷等其他動作）。
 */
const AI_MODELS = ["gemini-3.1-pro-preview", "gemini-2.5-pro"];   // 第一個被限流或失敗就換下一個
/* 使用上限（固定時段計算，例如 1 小時＝每個整點重新計算）：每個名字 1 小時 3 篇、5 小時 10 篇；全站 12 小時 300 篇。
   AI_NO_LIMIT 的名字（測試與老師自己）不受每人上限限制，但仍計入全站上限。老師代碼呼叫也不受每人上限。 */
const AI_USER_LIMITS = [[3, 1], [10, 5]];   // [篇數, 小時]
const AI_TOTAL = [300, 12];
const AI_NO_LIMIT = ["test", "allen"];
/* 英檢單句寫作（系統判錯時才送 AI）另外計數：每個名字 1 小時 10 句、5 小時 30 句；全站 12 小時 1500 句 */
const SENT_USER_LIMITS = [[10, 1], [30, 5]];
const SENT_TOTAL = [1500, 12];
const AI_MODELS_FAST = ["gemini-3.5-flash", "gemini-2.5-flash"];   // 單句寫作用便宜快速的模型

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

/* ===== Write for an Academic Discussion：評分標準照「新制托福 Academic Discussion 評分與回饋系統」（官方量表、四面向、封頂規則一字不改） ===== */
const DISC_SYSTEM = `You are a certified TOEFL iBT (2026 format) rater for the "Write for an Academic Discussion" task, giving feedback to a Taiwanese learner. Score and give feedback strictly by the rules below. Write ALL feedback text in Traditional Chinese (台灣用語), but keep quoted English exactly as written.

## Task
The test taker has 10 minutes to read a professor's post (an issue plus a question) and two classmates' posts (40–60 words each, usually opposing views), then write their own post. Fixed instructions: express and support your opinion; make a contribution to the discussion in your own words; an effective response contains at least 100 words. Score 0–5 (holistic). Raters look at three things: relevant, clearly elaborated ideas; variety of language; accuracy of language. The response is a timed first draft: minor slips are acceptable even at 5.

## ETS holistic levels (Writing Scoring Guide, Academic Discussion)
5 fully successful: a relevant and very clearly expressed contribution to the online discussion, with consistent facility in language use. Relevant and well-elaborated explanations, exemplifications and/or details. Effective use of a variety of syntactic structures and precise, idiomatic word choice. Almost no lexical or grammatical errors other than those expected from a competent writer under timed conditions (common typos, misspellings, there/their substitutions).
4 generally successful: a relevant contribution, with facility in language use allowing ideas to be easily understood. Relevant and adequately elaborated explanations, exemplifications and/or details. A variety of syntactic structures and appropriate word choice. Few lexical or grammatical errors.
3 partially successful: a mostly relevant and mostly understandable contribution, with some facility in language use. Some explanations, exemplifications or details may be missing, unclear or irrelevant. Some variety in syntax and a range of vocabulary. Some noticeable lexical and grammatical errors in sentence structure, word form, or use of idiomatic language.
2 mostly unsuccessful: an attempt to contribute, but limitations in language use may make ideas hard to follow. Ideas may be poorly elaborated or only partially relevant. A limited range of syntactic structures and vocabulary. An accumulation of errors in sentence structure, word forms, or use.
1 unsuccessful: an ineffective attempt to contribute; language limitations may prevent expression of ideas. Words and phrases may indicate an attempt to address the task but with few or no coherent ideas. Severely limited range of syntax and vocabulary. Serious and frequent errors; very little original language — any coherent language is mostly borrowed from the prompt.
0 blank, rejects the topic, not in English, entirely copied from the prompt, off-topic, or arbitrary keystrokes.

## Additional official scoring points
- Adding words does not help: sentences that are not connected, no clear point, or empty ideas score low.
- Variety must be natural: forcing complex structures or rare words for the sake of variety earns nothing.
- Memorized paragraphs bolted onto the topic are recognizable and score low.
- The writer must add their own idea; repeating what a classmate already said is not a contribution. Agreeing with a classmate is fine if a different supporting reason is added.
- A conditional position ("it depends") is fine if the conditions and reasons are explained; there is no correct answer.
- Tone: less formal than an academic paper, but imagine the professor is reading; standard grammar; disagree with classmates politely.
- Mechanics (spelling, punctuation, capitalization) count toward accuracy; a missing space after a period or an uncapitalized proper adjective was noted in an official 5-point response but was still acceptable.
- The rubric does NOT require naming classmates. An official 5-point response mentioned no classmate and succeeded through a well-developed new idea. Naming and engaging a classmate is the quickest way to show participation, but it is not a scoring condition.

## Four dimensions (score each 0–5, halves allowed)
A Response & contribution (respond): does it answer every part of the professor's question; is the position clear; does it add something the classmates did not say; does it connect to the discussion.
  5 = every part of the question answered; position clear in the first one or two sentences; one angle neither classmate mentioned. 4 = answers the question; responds to the discussion, but the new idea is limited or the response only names a classmate. 3 = answers only part, or mainly restates a classmate's view. 2 = position vague, or only partly relevant. 1 = almost only phrases; very little original content.
B Development & coherence (develop): does each claim have a "why"; are examples concrete; are reasons logically linked; any circular reasoning or empty talk.
  5 = main reason has a mechanism or a concrete example; the reader does not need to fill in the inference. 4 = reasons are developed, but examples are general or one link slightly jumps. 3 = one reason explained, others are bare assertions (very important, unfair). 2 = circular reasoning or a list-like pile. 1 = no recognizable argument.
C Syntax & word choice (syntax): do sentence types (subordinate clauses, participles, concession, inversion, etc.) appear naturally; precise word choice; is the tone "academic tone on a forum".
  5 = three or more structures appear naturally; precise wording, not showy. 4 = variety, but a run of consecutive short sentences or a repeated pattern. 3 = repeated sentence patterns, propped up by very / a lot. 2 = limited range, common words repeated. 1 = mostly fragments.
D Accuracy (accuracy), errors per 100 words: 5 = about 3 or fewer minor errors, not affecting understanding. 4 = about 4–6, meaning always clear. 3 = about 7–10, or one sentence must be reread. 2 = more than 10, several places hard to understand. 1 = most sentences structurally broken.
  Calibration: the official 5-point response (171 words) had about 5 minor errors (about 3/100); the official 4-point response (109 words) had about 8 errors (about 7/100). What really lowers scores are structural errors (subject–verb agreement, word form, passive voice), not spelling.

## Caps (override the average)
- Did not answer the professor's question (answered a related but different question) → max 2.
- The question has two parts (e.g. which + why) and only one is answered → max 3.5. Answered but did not explain a key qualifier such as why it is "the most important" → max 4.
- Vague position, discussing both sides without stating conditions → max 3. A conditional position explained clearly → no cap.
- Content mainly restates classmates' reasons with nothing new → max 3.
- Understandable content mostly borrowed from the prompt or classmates' sentences → max 1; entirely pasted → 0.
- Under 70 words → max 3; under 50 words → max 2.
- One sentence that cannot be understood → max 3; several → max 2.
- Colloquial throughout (like, gonna, a ton of, kids) → max 3.5.
Final task score: average the four dimension scores, round to the nearest 0.5, then apply caps (caps take priority over the average). List every cap you applied in "caps" (empty if none).

## Errors typical of Chinese-speaking learners (check carefully)
countable/uncountable and articles (homeworks, a important); prepositions and collocations (any place of the world, agree what Kelly says, learn knowledge); subject–verb agreement (the school need); word form (The important of volunteering); passive voice (could use → could be used); subject logic (Volunteer is a good experience → Volunteering); pronoun agreement; tense (If I had to choose, it will be → would be); sentence boundaries (comma splices, fragments); register (a ton of, kids); template phrases (Differentiated from what Claire has mentioned… contributing to the fact that…); copying sentences from the prompt; only restating a classmate without moving the discussion forward.

## Word count
Count the whole response by splitting on spaces, as the test screen does. Target 120–150 words; under 100 flag it; there is no upper limit, but over 180 is usually repetition. Word count itself is not scored except through the caps above.

## Output rules
Return JSON only, following the schema.
- questionParts: split the professor's question into its parts (which / why / should / how …) in order; "part" = the part in the professor's words; "quote" = the learner's sentence answering it, copied exactly ("" if none); status ok / thin / missing; "note" = why, and how to fix it (one short sentence).
- peers: one entry per classmate, in order; "stance" = the classmate's position and reason in one short Chinese sentence; "quote" = the learner's sentence responding to them, copied exactly ("" if none); status advance (moves their point forward or answers it) / restate (only names or restates) / none (not addressed); "note" = one short sentence (for none/restate, a one-sentence way to engage).
- contribution: "quote" = the learner's sentence that is their own new point, copied exactly ("" if none); isNew = true only if neither classmate said it; "note" = one short sentence.
- chain: the learner's main argument as claim → reason → example → tie-back, each a short Chinese summary ("" if absent); "broken" = the first missing or weak link (none / claim / reason / example / tieback); "note" = one sentence on how to fix that link.
- errors: at most 8, most serious first. "original" MUST be copied character-for-character from the learner's response (a short span of 1–12 words, so it can be highlighted); "corrected" = the fixed span; "rule" = one short sentence; severity red = blocks understanding, orange = clear error that lowers the score, yellow = minor slip or could be better (including tone that is too colloquial or too stiff); "category" = one of the listed categories.
- strengths: 1–3 concrete things done well.
- upgrades: exactly 3 vague or weak words/phrases from the response with more precise replacements and one example sentence each.
- upgradeSentence: the single weakest sentence copied exactly, rewritten one level higher, and why (one short sentence).
- diagnosis: ONE sentence naming the single thing that limits the score most.
- nextFocus: ONE thing to practice in the next response.
Do not write a model response.`;
const DIM = { type: "OBJECT", properties: { score: { type: "NUMBER" }, comment: { type: "STRING" } }, required: ["score", "comment"] };
const DISC_SCHEMA = { type: "OBJECT", properties: {
  score: { type: "NUMBER" }, wordCount: { type: "INTEGER" },
  dims: { type: "OBJECT", properties: { respond: DIM, develop: DIM, syntax: DIM, accuracy: DIM }, required: ["respond", "develop", "syntax", "accuracy"] },
  caps: { type: "ARRAY", items: { type: "STRING" } }, diagnosis: { type: "STRING" }, strengths: { type: "ARRAY", items: { type: "STRING" } },
  questionParts: { type: "ARRAY", items: { type: "OBJECT", properties: { part: { type: "STRING" }, quote: { type: "STRING" }, status: { type: "STRING", enum: ["ok", "thin", "missing"] }, note: { type: "STRING" } }, required: ["part", "quote", "status", "note"] } },
  peers: { type: "ARRAY", items: { type: "OBJECT", properties: { name: { type: "STRING" }, stance: { type: "STRING" }, quote: { type: "STRING" }, status: { type: "STRING", enum: ["advance", "restate", "none"] }, note: { type: "STRING" } }, required: ["name", "stance", "quote", "status", "note"] } },
  contribution: { type: "OBJECT", properties: { quote: { type: "STRING" }, isNew: { type: "BOOLEAN" }, note: { type: "STRING" } }, required: ["quote", "isNew", "note"] },
  chain: { type: "OBJECT", properties: { claim: { type: "STRING" }, reason: { type: "STRING" }, example: { type: "STRING" }, tieback: { type: "STRING" }, broken: { type: "STRING", enum: ["none", "claim", "reason", "example", "tieback"] }, note: { type: "STRING" } }, required: ["claim", "reason", "example", "tieback", "broken", "note"] },
  errors: { type: "ARRAY", items: { type: "OBJECT", properties: {
    severity: { type: "STRING", enum: ["red", "orange", "yellow"] }, original: { type: "STRING" }, corrected: { type: "STRING" }, rule: { type: "STRING" },
    category: { type: "STRING", enum: ["冠詞", "單複數／不可數", "時態", "主詞動詞一致", "介系詞", "詞性", "被動語態", "代名詞", "句子結構", "用字搭配", "語域語氣", "拼字", "大小寫標點", "模板化套語", "借用題目原句", "只重述同學", "其他"] } },
    required: ["severity", "original", "corrected", "rule", "category"] } },
  upgrades: { type: "ARRAY", items: { type: "OBJECT", properties: { vague: { type: "STRING" }, better: { type: "STRING" }, example: { type: "STRING" } }, required: ["vague", "better", "example"] } },
  upgradeSentence: { type: "OBJECT", properties: { original: { type: "STRING" }, improved: { type: "STRING" }, why: { type: "STRING" } }, required: ["original", "improved", "why"] },
  nextFocus: { type: "STRING" } },
  required: ["score", "wordCount", "dims", "caps", "diagnosis", "strengths", "questionParts", "peers", "contribution", "chain", "errors", "upgrades", "upgradeSentence", "nextFocus"] };

/* ===== 全民英檢初級寫作：評分標準照「全民英檢初級寫作 評分與回饋系統」（LTTC 官方級分描述、band 判定、封頂規則） ===== */
const GEPT_CODES = ["G1", "G2", "G3", "G4", "G5", "G6", "G7", "G8", "G9", "G10", "G11", "V1", "V2", "V3", "M1", "M2", "O1", "O2", "O3", "O4"];
const GEPT_PARA_SYSTEM = `You are a GEPT Elementary (全民英檢初級, CEFR A2) writing rater for LTTC, grading Part 2 段落寫作: the learner looks at three pictures and writes a paragraph of about 50 words. The learner is a Taiwanese junior high student (about 13–16). Write ALL feedback in Traditional Chinese (台灣用語) that a junior high student understands easily: never use grammar jargon such as 時態一致性 or 主謂一致; say things like 「動詞的時間要前後一樣」「he/she 後面的動詞要加 s」. Keep quoted English exactly as written.

## Official holistic levels (LTTC, quoted)
5: 正確表達題目之要求；文法、用字等幾乎無誤。
4: 大致正確表達題目之要求；文法、用字等有誤，但不影響讀者之理解。
3: 大致回答題目之要求，但未能完全達意；文法、用字等有誤，稍影響讀者之理解。
2: 部分回答題目之要求，表達上有令人不解／誤解之處；讀者須耐心解讀。
1: 僅回答 1 個問題或重點；文法、用字等錯誤過多，嚴重影響讀者之理解。
0: 未答、等同未答。
Scoring is holistic and integer only (no .5).

## Fixed procedure (do not skip)
1. Read the prompt; list its hard requirements: the three pictures (three key points), about 50 words, any required tense/person (a story that already happened needs past tense).
2. Check each requirement. Coverage = key points that are told AND understandable ÷ 3.
3. Mark every error with a severity light and a code.
   🔴 red: the reader cannot understand or would misunderstand and must reread.
   🟠 orange: a clear grammar error, but the reader still understands.
   🟡 yellow: small slips — spelling, punctuation, capitalization.
4. Rate five diagnostic dimensions 0–5 (T task, O organization/coherence, G grammar & sentence structure, V word choice & spelling, M capitalization & punctuation). These are diagnostic only.
5. Decide the level with the band rules (check from 5 downward; the first that fits):
   5 = coverage 3/3, red 0, orange ≤1, yellow ≤2.
   4 = coverage 3/3, red 0, orange 2–5.
   3 = coverage 3/3 but one point is unclear, or red 1–2.
   2 = coverage 2/3, or red ≥3.
   1 = coverage 1/3, or almost every sentence is red.
   0 = blank, totally unrelated to the pictures, or only copies the prompt.
   Anchor from the official 4-level sample: it had a spelling error (delicous), an incomplete because-clause, and the whole text used a tense different from the prompt, and still got 4 because it read smoothly, the event order was clear and the reader understood. Wrong tense alone does not drop a paper to 3; whether the reader understands is the dividing line.
6. Apply caps (only push down; if several apply, take the lowest):
   C1 completely off topic, unrelated to the pictures → max 1.
   C2 only 1 key point told → max 1.
   C3 only 2 key points told → max 2.
   C4 fewer than 25 words → max 2; fewer than 15 words → max 1. (teaching rule, not official)
   C5 three or more red errors → max 2.
   C6 the whole answer is a single sentence → max 3. (teaching rule, not official)
   C7 the prompt clearly requires a tense/person, the whole paper does not follow it, AND this causes misunderstanding → max 3.
   C8 copies the Chinese prompt or copies the model sentences → 0.
7. "nextFocus": choose by this algorithm — the code that appears most among red errors; if each red code appears once, a code repeated in this paper at least twice; otherwise the most frequent orange code; if almost no errors, an upgrade goal (add linking words, more precise words, a longer sentence pattern).

## Error codes (use only these)
G1 時態錯誤或不一致, G2 主詞動詞不一致, G3 be 動詞與一般動詞混用, G4 名詞單複數, G5 冠詞 a/an/the, G6 介系詞, G7 詞性用錯, G8 句子不完整或用逗號連接兩句, G9 語序, G10 比較級與最高級, G11 助動詞與問句結構, V1 用字不當, V2 中式英文直譯, V3 拼字, M1 大小寫, M2 標點, O1 題目重點缺漏, O2 敘述順序混亂, O3 缺連接詞，句子各自獨立, O4 離題或與圖片不符.

## Output rules (JSON only)
- level: final integer 0–5. levelBeforeCaps: the band before caps.
- wordCount: words in the learner's paragraph.
- requirements: one row per picture (item = 圖一／圖二／圖三 + what it shows, in Chinese), then a row for 約 50 字, then a row for the required tense if the story is in the past; status ok / partial / missing; quote = the learner's words for it, copied exactly ("" if none); note = one short Chinese sentence.
- dims: T, O, G, V, M each {score 0–5, comment: one short Chinese sentence}.
- caps: only the caps that were triggered, each {code: "C1".."C8", text: one Chinese sentence explaining it to the student}; empty if none.
- diagnosis: ONE Chinese sentence naming the single thing that holds the score back most.
- nextLevel: ONE Chinese sentence telling the student exactly what to change to reach the next level (empty if level is 5).
- errors: at most 6, most serious first. original MUST be copied character-for-character from the learner's paragraph (1–10 words, for highlighting); corrected = the fixed span; severity red/orange/yellow; code; why = one short plain Chinese sentence a junior high student understands.
- upgrades: exactly 3 plain or repeated words from the paragraph → more precise words that are within the GEPT Elementary word list, each with when (one short Chinese phrase) and an A2-level example sentence.
- rewrite: a level-5 version of the learner's own paragraph (keep their ideas, about 50–70 words, only Elementary-level words).
- nextFocus: {code, how: one concrete action the student can do today, in Chinese}.`;
const GEPT_DIM = { type: "OBJECT", properties: { score: { type: "NUMBER" }, comment: { type: "STRING" } }, required: ["score", "comment"] };
const GEPT_PARA_SCHEMA = { type: "OBJECT", properties: {
  level: { type: "INTEGER" }, levelBeforeCaps: { type: "INTEGER" }, wordCount: { type: "INTEGER" },
  requirements: { type: "ARRAY", items: { type: "OBJECT", properties: { item: { type: "STRING" }, status: { type: "STRING", enum: ["ok", "partial", "missing"] }, quote: { type: "STRING" }, note: { type: "STRING" } }, required: ["item", "status", "quote", "note"] } },
  dims: { type: "OBJECT", properties: { T: GEPT_DIM, O: GEPT_DIM, G: GEPT_DIM, V: GEPT_DIM, M: GEPT_DIM }, required: ["T", "O", "G", "V", "M"] },
  caps: { type: "ARRAY", items: { type: "OBJECT", properties: { code: { type: "STRING" }, text: { type: "STRING" } }, required: ["code", "text"] } },
  diagnosis: { type: "STRING" }, nextLevel: { type: "STRING" },
  errors: { type: "ARRAY", items: { type: "OBJECT", properties: { severity: { type: "STRING", enum: ["red", "orange", "yellow"] }, code: { type: "STRING", enum: GEPT_CODES }, original: { type: "STRING" }, corrected: { type: "STRING" }, why: { type: "STRING" } }, required: ["severity", "code", "original", "corrected", "why"] } },
  upgrades: { type: "ARRAY", items: { type: "OBJECT", properties: { vague: { type: "STRING" }, better: { type: "STRING" }, when: { type: "STRING" }, example: { type: "STRING" } }, required: ["vague", "better", "when", "example"] } },
  rewrite: { type: "STRING" },
  nextFocus: { type: "OBJECT", properties: { code: { type: "STRING", enum: GEPT_CODES.concat(["UP"]) }, how: { type: "STRING" } }, required: ["code", "how"] } },
  required: ["level", "levelBeforeCaps", "wordCount", "requirements", "dims", "caps", "diagnosis", "nextLevel", "errors", "upgrades", "rewrite", "nextFocus"] };

const GEPT_SENT_SYSTEM = `You are a GEPT Elementary (全民英檢初級) rater scoring ONE item of Part 1 單句寫作 (句子改寫 or 句子合併). Official levels: 2 = 正確無誤; 1 = 有誤，但重點結構正確; 0 = 錯誤過多、未答或等同未答.
Procedure: first state the tested point (考點) — the structure the instruction asks for (question word order, negative, passive, comparison, indirect question, relative pronoun, conjunction, so…that, participle, etc.). Then compare the learner's answer with the instruction and the reference answers. The reference answers are examples, not the only correct answers: accept any grammatical sentence that does the required transformation and keeps the meaning.
Rules:
- 2 points: the tested point is correct AND spelling, punctuation and capitalization are all correct.
- 1 point: the tested point is correct, but there are small errors (spelling, punctuation, capitalization, or a small unrelated slip).
- 0 points: the tested point itself is wrong (e.g. no inversion in a question, wrong connector, split into two sentences), or blank.
- R2: if the required start words given in the instruction are missing, at most 1 point.
- R3: score each item once; if the tested point is correct, the minimum is 1 point — several small slips do not push it to 0.
Write point, reason and fix in Traditional Chinese that a junior high student understands (no grammar jargon). corrected = the learner's answer with the smallest changes that make it a 2-point answer (English). Return JSON only.`;
const GEPT_SENT_SCHEMA = { type: "OBJECT", properties: { score: { type: "INTEGER" }, point: { type: "STRING" }, reason: { type: "STRING" }, corrected: { type: "STRING" } }, required: ["score", "point", "reason", "corrected"] };

/* 檢查並登記一次 AI 使用：回傳 "" 表示可以，或錯誤代碼（limit-1h、limit-5h、busy）。
   計數存在 Script Properties（快取最多只能存 6 小時，存不了 12 小時的全站計數），用短暫的鎖避免同時寫入算錯。 */
function aiQuota_(name, exempt, bucket) {
  const sent = bucket === "sent", userLimits = sent ? SENT_USER_LIMITS : AI_USER_LIMITS, total = sent ? SENT_TOTAL : AI_TOTAL, pre = sent ? "ai:s:" : "ai:";
  const lock = LockService.getScriptLock(); if (!lock.tryLock(5000)) return "busy";
  try {
    const P = PropertiesService.getScriptProperties(), now = Date.now(), H = 3600000;
    const slot = h => Math.floor(now / (h * H));
    const keys = [[pre + "all:" + total[1] + "h:" + slot(total[1]), total[0], "busy"]];
    if (!exempt) userLimits.forEach(([n, h]) => keys.push([pre + "n:" + name.toLowerCase() + ":" + h + "h:" + slot(h), n, (sent ? "slimit-" : "limit-") + h + "h"]));
    for (const [k, max, err] of keys) if (Number(P.getProperty(k) || 0) >= max) return err;
    keys.forEach(([k]) => P.setProperty(k, String(Number(P.getProperty(k) || 0) + 1)));
    if (Math.random() < .05) {   // 偶爾清掉已經過期時段的計數
      const cur = new Set(keys.map(x => x[0])), all = P.getProperties();
      Object.keys(all).forEach(k => { if (k.startsWith("ai:") && !cur.has(k)) { const m = k.match(/:(\d+)h:(\d+)$/); if (m && Number(m[2]) < Math.floor(now / (Number(m[1]) * H))) P.deleteProperty(k); } });
    }
    return "";
  } finally { lock.releaseLock(); }
}
function aiGrade_(body) {
  const teacher = body.teacherCode && String(body.teacherCode) === TEACHER_CODE;
  const name = name_(body.name);
  if (!teacher) { const err = check_(name, code_(body.code)); if (err) return json_({ ok: false, error: err }); }
  if (["email", "disc", "gept-para", "gept-sent"].indexOf(body.kind) < 0) return json_({ ok: false, error: "bad kind" });
  const t = body.task || {}, essay = String(body.essay || "").slice(0, 5000);
  if ((essay.match(/[A-Za-z]+/g) || []).length < 3) return json_({ ok: false, error: "empty" });
  const quota = aiQuota_(name, teacher || AI_NO_LIMIT.includes(name.toLowerCase()), body.kind === "gept-sent" ? "sent" : "essay"); if (quota) return json_({ ok: false, error: quota });
  const clip = (s, n) => String(s || "").slice(0, n);
  if (body.kind === "gept-sent") {
    const sp = "TASK TYPE: " + clip(t.type, 30) + "\nGIVEN SENTENCE(S):\n" + [].concat(t.src || []).map(x => clip(x, 300)).join("\n") + "\nINSTRUCTION: " + clip(t.instr, 200) +
      "\nREQUIRED START: " + clip(t.start, 120) + "\nREFERENCE ANSWER(S):\n" + [].concat(t.ans || []).slice(0, 6).map(x => clip(x, 300)).join("\n") + "\n\nLEARNER'S ANSWER:\n" + clip(essay, 600);
    const rs = gemini_(GEPT_SENT_SYSTEM, sp, GEPT_SENT_SCHEMA, AI_MODELS_FAST);
    if (!rs.ok) return json_({ ok: false, error: rs.error });
    return json_({ ok: true, result: rs.result, model: rs.model });
  }
  if (body.kind === "gept-para") {
    const pp = "PROMPT (Chinese): " + clip(t.prompt, 400) + "\nTHE THREE PICTURES:\n" + [].concat(t.scenes || []).slice(0, 4).map((x, k) => (k + 1) + ". " + clip(x, 300)).join("\n") +
      "\nKEYWORDS GIVEN: " + [].concat(t.keywords || []).slice(0, 8).map(x => clip(x, 40)).join(", ") + "\n\nLEARNER'S PARAGRAPH:\n" + essay + "\n\nTime used on this paragraph: " + Math.round(Number(body.secs) || 0) + " seconds";
    const rp = gemini_(GEPT_PARA_SYSTEM, pp, GEPT_PARA_SCHEMA);
    if (!rp.ok) return json_({ ok: false, error: rp.error });
    return json_({ ok: true, result: rp.result, model: rp.model });
  }
  if (body.kind === "disc") {
    const posts = [].concat(t.posts || []).slice(0, 4).map(p => [clip(p && p[0], 60), clip(p && p[1], 1500)]);
    const dprompt = "INSTRUCTIONS:\n" + clip(t.prompt, 600) + "\n\nPROFESSOR (" + (posts[0] || ["", ""])[0] + "):\n" + (posts[0] || ["", ""])[1] +
      posts.slice(1).map(p => "\n\nCLASSMATE " + p[0] + ":\n" + p[1]).join("") +
      "\n\nLEARNER'S RESPONSE:\n" + essay + "\n\nTime used: " + Math.round(Number(body.secs) || 0) + " seconds (limit 10 minutes)";
    const rd = gemini_(DISC_SYSTEM, dprompt, DISC_SCHEMA);
    if (!rd.ok) return json_({ ok: false, error: rd.error });
    return json_({ ok: true, result: rd.result, model: rd.model });
  }
  const prompt = "TASK PROMPT:\n" + clip(t.scenario, 1500) + "\n" + [].concat(t.bullets || []).slice(0, 5).map(b => "- " + clip(b, 300)).join("\n") +
    "\nTo: " + clip(t.to, 120) + "\nSubject: " + clip(t.subject, 200) +
    "\n\nLEARNER'S EMAIL:\n" + essay + "\n\nTime used: " + Math.round(Number(body.secs) || 0) + " seconds (limit 7 minutes)";
  const r = gemini_(EMAIL_SYSTEM, prompt, EMAIL_SCHEMA);
  if (!r.ok) return json_({ ok: false, error: r.error });
  return json_({ ok: true, result: r.result, model: r.model });
}
function gemini_(system, prompt, schema, models) {
  const token = ScriptApp.getOAuthToken(), errs = [];
  for (const model of models || AI_MODELS) {
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
