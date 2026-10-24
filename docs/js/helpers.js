/* ===== 出題小工具（讓題庫寫得精簡） ===== */
const M = (id, tag, stem, opts, ans, hint, exp) => ({ id, type: "mc", tag, stem: stem.includes("\n") ? stem.split("\n") : stem, opts, ans, hint, exp });
const D = (id, tag, name, word, box, opts, ans, hint, exp) => ({ id, type: "dict", tag,
  stem: `${name} didn't understand what "${word}" meant in the ${box.length > 1 ? "sentences" : "sentence"} below.`,
  box, uline: word, post: `${name} looked it up in the dictionary. What does "${word}" mean here?`, opts, ans, hint, exp });
const SP = (id, tag, stem, ans, hint, exp) => ({ id, type: "spell", tag, stem, ans, hint, exp });
const T = (id, tag, zh, ans, hint, exp) => ({ id, type: "trans", tag, zh, ans: [].concat(ans), hint, exp });
const R = (id, tag, zh, tiles, hint, exp, alt) => ({ id, type: "scramble", tag, zh, tiles, ans: tiles.join(" "), alt, hint, exp });
const X = (id, tag, stem, left, right, hint, exp) => ({ id, type: "match", tag, stem, left, right, hint, exp });
const E = (id, tag, sent, wrongWord, fix, hint, exp) => {
  const wrong = sent.split(" ").findIndex(t => t.replace(/[.,?!]/g, "") === wrongWord);
  return { id, type: "error", tag, sent, wrong, fix: [].concat(fix), hint, exp };
};
const G = (id, tag, kind, title, passage, gloss, qs) => ({ id, type: "group", tag, kind, title, passage, gloss, qs });
const Q = (id, stem, opts, ans, hint, exp) => ({ id, type: "mc", stem, opts, ans, hint, exp });
const B = (id, blank, opts, ans, hint, exp) => ({ id, type: "mc", blank, stem: `第 ${blank} 格`, opts, ans, hint, exp });
const O = (id, stem, items, ans, hint, exp) => ({ id, type: "order", stem, items, ans, hint, exp });
const bank = id => BANKS.find(b => b.id === id);
/* 聽力：part 1 看圖辨義（選項用念的，自動接在題目後）、2 問答、3 簡短對話、4 短文聽解（三張圖選一）
   script 每行一句；"W: " 女聲、"M: " 男聲、沒有標記 = 旁白。pic = 畫圖用的英文描述 */
const L = (id, tag, part, script, opts, ans, hint, exp, pic) => ({
  id, type: "listen", tag, part, opts, ans, hint, exp, pic,
  script: part === 1 ? script.concat(opts.map((o, k) => "ABC"[k] + ". " + o)) : script,
  fixedOrder: part === 1 || part === 4,
  v2: [...id].reduce((s, c) => s + c.charCodeAt(0), 0) % 2 === 1
});
/* 第 1、4 部分的圖片：docs/img/listen/<題庫>-<題號>.png（沒有圖檔時畫面會自動隱藏） */
const listenImages = b => b.items.forEach(it => { if (it.type === "listen" && (it.part === 1 || it.part === 4)) it.img = `img/listen/${b.id}-${it.id}.png`; });

/* ===== 托福（2026 新制）出題工具 ===== */
/* Complete the Words：text 裡用 字首{缺的字母} 標出空格，例如 "manu{scripts}"；每個空格算一題 */
const CT = (id, tag, title, text, exp, alts) => {
  const qs = []; let k = 0;
  text.replace(/([A-Za-z'-]*)\{([A-Za-z'-]+)\}/g, (m, pre, miss) => { k++; qs.push({ id: id + "-" + k, type: "cword", blank: k, pre, miss, ans: pre + miss, alt: (alts || {})[pre + miss], exp: exp || "" }); return m; });
  return { id, type: "group", tag, kind: "ctest", title, passage: [text], qs };
};
/* Complete the Words（自動挖空，照 ETS 的 C-test 規則）：第一句完整；從第二句起每隔一個字挖掉後半（保留前 ⌊n/2⌋ 個字母），共 10 格；
   輪到的字如果是大寫（專有名詞、句首）、單一字母或有連字號，就順延到下一個字 */
const ctGaps = (text, n = 10) => {
  const cut = text.search(/[.!?]\s+[A-Z]/) + 1; let k = 0, par = 0;
  return text.slice(0, cut) + text.slice(cut).replace(/[A-Za-z][A-Za-z'’-]*/g, w => {
    if (k >= n || par++ % 2 === 0) return w;
    if (!/^[a-z]{2,}$/.test(w)) { par--; return w; }
    k++; const h = Math.floor(w.length / 2); return w.slice(0, h) + "{" + w.slice(h) + "}";
  });
};
/* alts：也算對的其他字，例如 { their: ["these"] }（同樣長度、前後文也通的字） */
const CTW = (id, tag, title, text, alts, exp) => CT(id, tag, title, ctGaps(text), exp, alts);
/* 聽力題組：一段錄音後接幾題（題目和選項印出來）；script 用 "W: " "M: " "N: "（旁白）"WB: "（英國腔）… */
const LG = (id, tag, title, script, qs) => ({ id, type: "group", tag, kind: "listening", title, passage: script, qs,
  v2: [...id].reduce((s, c) => s + c.charCodeAt(0), 0) % 2 === 1 });
/* Build a Sentence：ctx = 對方說的話；frame = 回應句，_ 是要放字卡的空格（固定的字可以在任何位置，例如 "Do you know if _ _ _ _?"）；
   tiles 照正確順序；extra = 多出來不用的干擾字卡；alt = 其他也對的排法（字卡用空白連起來） */
const BS = (id, tag, ctx, frame, tiles, extra, exp, alt) => {
  if ((frame.match(/_/g) || []).length !== tiles.length) console.warn("Build a Sentence 空格數和字卡數不符：", id);
  return { id, type: "scramble", tag, zh: "", ctx, frame, tiles, extra: extra || [], ans: tiles.join(" "), alt, hint: "", exp };
};
/* Read in Daily Life（kind notice：第一行粗體）／Academic Passage（uline = 詞彙題要畫底線的字） */
const DL = (id, tag, title, lines, qs) => ({ id, type: "group", tag, kind: "notice", title, passage: lines, qs });
const AP = (id, tag, title, paras, uline, qs) => ({ id, type: "group", tag, kind: "article", title, passage: paras, uline: uline || [], qs });
/* 句子插入題：文章裡用 ■ 標出四個位置（畫面會自動編號 1～4）；ans = 0～3。選項順序固定 */
const INS = (id, sentence, ans, exp) => ({ id, type: "mc", ins: sentence, fixedOrder: true,
  stem: "Look at the four squares [■] in the passage. Where would the following sentence best fit?", box: [sentence],
  opts: ["Square 1", "Square 2", "Square 3", "Square 4"], ans, hint: "看插入句的代名詞、連接詞，和前後句的邏輯。", exp });
/* Write an Email／Academic Discussion：自評＋範文 */
const EMAIL_CHECK = ["三個要求都寫到了，而且每一點都有具體細節（時間、原因、例子）", "有稱呼、開頭說明來意、結尾與署名，語氣符合收件人的身分", "建議 100～130 字（低於 80 字通常細節不夠，超過 150 字容易出錯）", "句型有變化（I was wondering if…／Since…／so that…），不是一直用簡單句", "文法、拼字、標點都檢查過"];
const DISC_CHECK = ["第一句就清楚回答教授的問題", "提出自己的新理由，不只是重複同學說過的話", "用具體例子、數據或親身經驗支持", "至少 100 字（高分回答多在 120～180 字）", "用了轉折與連接詞（While…／Admittedly…／For instance…）"];
/* Email：c1、c2 是兩個等級的範文（作答後一起顯示）；AI 批改見 aigrade.js */
const EM = (id, tag, scenario, bullets, to, subject, c1, c2, exp) => ({ id, type: "essay", tag, label: "Write an Email", minWords: 100, check: EMAIL_CHECK,
  prompt: "You will read some information and use the information to write an email. You will have 7 minutes to write the email. Write as much as you can and in complete sentences.",
  scenario, bullets, mail: { to, subject }, model: c1, models: { C1: c1, C2: c2 }, exp, keywords: null, secs: 420 });
const AD = (id, tag, course, professor, posts, model, exp) => ({ id, type: "essay", tag, label: "Academic Discussion", minWords: 100, check: DISC_CHECK,
  prompt: `Your professor is teaching a class on ${course}. Write a post responding to the professor's question. In your response, you should express and support your opinion and make a contribution to the discussion in your own words. An effective response will contain at least 100 words. You have 10 minutes to write.`,
  posts: [professor].concat(posts), model, exp, keywords: null });
/* 口說：Listen and Repeat（聽一句、照著說）／Take an Interview（回答訪問的問題） */
const SR = (id, tag, scenario, line, exp) => ({ id, type: "speak", mode: "repeat", tag, scenario, script: [line], text: line.replace(/^[A-Z]{1,2}\d?: /, ""), exp: exp || "重點：完整、正確地照原句說出來，注意重音和語調。", secs: Math.max(8, Math.ceil(line.split(/\s+/).length * 0.75)) });
const SI = (id, tag, scenario, question, model, exp) => ({ id, type: "speak", mode: "interview", tag, scenario, script: [question], text: question.replace(/^[A-Z]{1,2}\d?: /, ""), model, exp, secs: 45 });

/* ===== 全民英檢初級口說（照 LTTC 官方流程；作答畫面在 geptspeak.js） =====
   GS1 複誦：題目播兩次，聽完立刻跟著唸一次。GS3 回答問題：題目播兩次，回答 15 秒（model＝參考回答，也做成語音）
   GS2 朗讀句子與短文：5 句＋1 篇短文，先看 1 分鐘、再用 1 分鐘全部唸完；照官方每句、短文各算 1 題（共 6 題），畫面上是一頁、錄一次音
   出題的聲音男女輪流（依題號） */
const gsVoice = id => [...id].reduce((s, c) => s + c.charCodeAt(0), 0) % 2 ? "M: " : "W: ";
const GS1 = (id, tag, line, exp) => ({ id, type: "speak", mode: "g-repeat", gept: true, tag, script: [gsVoice(id) + line], text: line,
  exp: exp || "重點：一字不漏照原句唸，注意重音、連音和句尾語調（問句上揚）。", secs: Math.max(7, Math.ceil(line.split(/\s+/).length * 0.6) + 3) });
const GS2 = (id, tag, sents, passage, exp) => { const all = sents.concat([passage]);
  return { id, type: "group", tag, kind: "readaloud", title: "朗讀句子與短文", passage: all, exp,
    qs: all.map((t, k) => ({ id: id + "-" + (k + 1), type: "speak", mode: "g-read", gept: true, text: t, n: k, exp: exp || "", secs: 60 })) }; };
const GS3 = (id, tag, question, model, exp) => ({ id, type: "speak", mode: "g-answer", gept: true, tag, script: [gsVoice(id) + question], text: question, model, exp, secs: 15 });
