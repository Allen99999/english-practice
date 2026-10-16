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
