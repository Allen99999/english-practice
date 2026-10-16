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
const CT = (id, tag, title, text, exp) => {
  const qs = []; let k = 0;
  text.replace(/([A-Za-z'-]*)\{([A-Za-z'-]+)\}/g, (m, pre, miss) => { k++; qs.push({ id: id + "-" + k, type: "cword", blank: k, pre, miss, ans: pre + miss, exp: exp || "" }); return m; });
  return { id, type: "group", tag, kind: "ctest", title, passage: [text], qs };
};
/* 聽力題組：一段錄音後接幾題（題目和選項印出來）；script 用 "W: " "M: " "N: "（旁白）"WB: "（英國腔）… */
const LG = (id, tag, title, script, qs) => ({ id, type: "group", tag, kind: "listening", title, passage: script, qs,
  v2: [...id].reduce((s, c) => s + c.charCodeAt(0), 0) % 2 === 1 });
/* Build a Sentence：ctx = 對方說的話；pre / post = 固定的開頭結尾；tiles 照正確順序；extra = 多出來不用的干擾字卡 */
const BS = (id, tag, ctx, pre, tiles, post, extra, exp) => ({ id, type: "scramble", tag, zh: "", ctx, pre, post, tiles, extra: extra || [], ans: tiles.join(" "), hint: "", exp });
/* Write an Email／Academic Discussion：自評＋範文 */
const EMAIL_CHECK = ["寫到情境要求的每一個重點", "開頭稱呼、結尾署名都有，語氣有禮貌", "大約 80～120 字，段落清楚", "用了連接詞（First, Also, However, Therefore…）", "文法、拼字、標點檢查過"];
const DISC_CHECK = ["清楚表達自己的立場", "至少一個理由，並用例子或細節支持", "回應或提到其他同學的觀點", "至少 100 字", "用了轉折或連接詞（However, For example, In addition…）"];
const EM = (id, tag, scenario, bullets, model, exp) => ({ id, type: "essay", tag, label: "Write an Email", minWords: 80, check: EMAIL_CHECK,
  prompt: "You will read some information and use the information to write an email. You will have 7 minutes to write the email.", scenario, bullets, model, exp, keywords: null });
const AD = (id, tag, course, professor, posts, model, exp) => ({ id, type: "essay", tag, label: "Academic Discussion", minWords: 100, check: DISC_CHECK,
  prompt: `Your professor is teaching a class on ${course}. Write a post responding to the professor's question. In your response, express and support your opinion and make a contribution to the discussion in your own words. An effective response will contain at least 100 words. You have 10 minutes.`,
  posts: [professor].concat(posts), model, exp, keywords: null });
/* 口說：Listen and Repeat（聽一句、照著說）／Take an Interview（回答訪問的問題） */
const SR = (id, tag, scenario, line, exp) => ({ id, type: "speak", mode: "repeat", tag, scenario, script: [line], text: line.replace(/^[A-Z]{1,2}\d?: /, ""), exp: exp || "重點：完整、正確地照原句說出來，注意重音和語調。", secs: 12 });
const SI = (id, tag, scenario, question, model, exp) => ({ id, type: "speak", mode: "interview", tag, scenario, script: [question], text: question.replace(/^[A-Z]{1,2}\d?: /, ""), model, exp, secs: 45 });
