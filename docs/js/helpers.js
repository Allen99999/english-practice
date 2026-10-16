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
