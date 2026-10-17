/* ================= 工具 ================= */
const $ = (s, el = document) => el.querySelector(s);
const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
const LETTERS = "ABCDEFGH";
const fmtTime = s => { s = Math.max(0, Math.round(s)); const m = Math.floor(s / 60); return `${m}:${String(s % 60).padStart(2, "0")}`; };
const fmtDate = t => { const d = new Date(t); return `${d.getFullYear()}/${d.getMonth() + 1}/${d.getDate()} ${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`; };

const I = {
  sun: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="4.2"/><path d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2M5.3 5.3l1.6 1.6M17.1 17.1l1.6 1.6M5.3 18.7l1.6-1.6M17.1 6.9l1.6-1.6"/></svg>',
  moon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z"/></svg>',
  chevL: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M15 5l-7 7 7 7"/></svg>',
  chevR: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M9 5l7 7-7 7"/></svg>',
  bulb: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3.6 10.8c.6.5 1 1.2 1.1 2V16h5v-.2c.1-.8.5-1.5 1.1-2A6 6 0 0 0 12 3z"/></svg>',
  grid: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="4" y="4" width="6" height="6" rx="1.6"/><rect x="14" y="4" width="6" height="6" rx="1.6"/><rect x="4" y="14" width="6" height="6" rx="1.6"/><rect x="14" y="14" width="6" height="6" rx="1.6"/></svg>',
  aa: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 18l4.5-12L12 18M4.6 14h5.8"/><path d="M19.5 18v-5.2a2.6 2.6 0 0 0-5 -1"/><path d="M19.5 15.2c-3.6-.5-5.4.4-5.4 1.6 0 .9.8 1.4 1.9 1.4 1.6 0 3.5-1.2 3.5-3"/></svg>',
  x: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>',
  check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>',
  strike: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><circle cx="12" cy="12" r="8.5"/><path d="M6 18L18 6"/></svg>',
  speaker: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 9.5v5h3.5L12 18.5v-13L7.5 9.5z" fill="currentColor" fill-opacity=".15"/><path d="M15.5 9a4 4 0 0 1 0 6M18 6.5a7.5 7.5 0 0 1 0 11"/></svg>',
  home: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 11l8-6.5 8 6.5V19a1.5 1.5 0 0 1-1.5 1.5H15v-5.5H9v5.5H5.5A1.5 1.5 0 0 1 4 19z"/></svg>',
  clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/></svg>',
  book: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 4.5h10.5A3.5 3.5 0 0 1 19 8v11.5H8.5A3.5 3.5 0 0 1 5 16z"/><path d="M5 16a3.5 3.5 0 0 1 3.5-3.5H19M9 8.5h6"/></svg>',
  play: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5.5v13a1 1 0 0 0 1.5.9l10.4-6.5a1 1 0 0 0 0-1.8L9.5 4.6A1 1 0 0 0 8 5.5z"/></svg>',
  redo: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12a8 8 0 1 0 2.4-5.7L4 8.5"/><path d="M4 4v4.5h4.5"/></svg>',
  flag: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 21V4.5M5 5h11l-2 4 2 4H5"/></svg>',
  sound: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18V6l10-2v12"/><circle cx="6.5" cy="18" r="2.5"/><circle cx="16.5" cy="16" r="2.5"/></svg>',
  save: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 4.5h11l3.5 3.5V18a1.5 1.5 0 0 1-1.5 1.5H6A1.5 1.5 0 0 1 4.5 18V6A1.5 1.5 0 0 1 6 4.5z"/><path d="M8 4.5v4.5h7V4.5M8 19.5v-5.5h8v5.5"/></svg>',
  stop: '<svg viewBox="0 0 24 24" fill="currentColor"><rect x="6.5" y="6.5" width="11" height="11" rx="2.5"/></svg>',
  chart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 20h16M7 16v-5M12 16V7M17 16v-8"/></svg>',
  mute: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18V6l10-2v12"/><circle cx="6.5" cy="18" r="2.5"/><circle cx="16.5" cy="16" r="2.5"/><path d="M3 3l18 18"/></svg>'
};

/* ================= 儲存 ================= */
const LS = "glassquiz.v1";
function blankStore() { return { attempts: [], vocab: {}, sessions: [], names: [], who: "", histWho: "", vocabWho: "", settings: { sound: true }, sel: null }; }
let store = blankStore();
try { const raw = localStorage.getItem(LS); if (raw) store = Object.assign(blankStore(), JSON.parse(raw)); } catch (e) { }
/* 舊版資料搬家：單一 session → sessions；vocab → 依作答人分開 */
if (store.session) { store.sessions = store.sessions || []; store.sessions.push(store.session); delete store.session; }
store.sessions = store.sessions || []; store.names = store.names || [];
if (store.vocab && Object.values(store.vocab).some(v => v && typeof v.k === "string")) store.vocab = { "未署名": store.vocab };
let saveTimer = null;
function save(now) {
  const run = () => { try { localStorage.setItem(LS, JSON.stringify(store)); } catch (e) { } };
  clearTimeout(saveTimer); if (now) run(); else saveTimer = setTimeout(run, 250);
}

/* ================= 題庫索引 ================= */
const TYPE_LABEL = { listen: "聽力", cword: "補字母", speak: "口說", lgroup: "聽力題組", rewrite: "句子改寫／合併", essay: "段落寫作", mc: "單選題", dict: "字典題", group: "閱讀題組", spell: "文意字彙", trans: "翻譯", scramble: "句子重組", match: "配對", error: "挑錯改正", order: "排序", vocab: "單字練習" };
const TYPE_ORDER = ["cword", "listen", "lgroup", "mc", "dict", "group", "spell", "trans", "scramble", "match", "error", "rewrite", "essay", "speak"];
const ESSAY_CHECK = ["寫了大約 50 個字以上", "每一個提示（圖或問題）都有寫到", "時態正確（過去的事用過去式）", "句首大寫、句尾有標點", "至少用了一個連接詞（and / but / so / because / when）"];
const isMC = q => q.type === "mc" || q.type === "dict" || q.type === "listen";
/* 題組依內容分類：補字母（Complete the Words）、聽力題組、一般閱讀題組 */
const unitType = it => it.type === "group" ? (it.kind === "ctest" ? "cword" : it.kind === "listening" ? "lgroup" : "group") : it.type;
const KIND_LABEL = { ctest: "Complete the Words", listening: "聽力題組" };
const wcount = s => (String(s || "").match(/[A-Za-z]+(?:['’-][A-Za-z]+)*/g) || []).length;
/* 選項順序平衡：每份題庫的單選正解輪流落在 A/B/C/D，其餘選項以題號為種子固定打散；
   解析裡的 (A)（B 錯）等字母會跟著換。舊紀錄（沒有 optv）仍用原始順序顯示。 */
const OPTV = 2;
function seeded(str) { let h = 2166136261; for (const c of str) { h ^= c.charCodeAt(0); h = Math.imul(h, 16777619); } return () => { h ^= h << 13; h ^= h >>> 17; h ^= h << 5; return ((h >>> 0) % 100000) / 100000; }; }
BANKS.forEach(b => {
  let k = 0;
  b.items.forEach(it => (it.type === "group" ? it.qs : [it]).forEach(q => {
    if (!isMC(q) || q.fixedOrder) return;
    const n = q.opts.length, rnd = seeded(b.id + ":" + q.id), target = (k++) % n;
    const others = [...Array(n).keys()].filter(i => i !== q.ans);
    for (let i = others.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [others[i], others[j]] = [others[j], others[i]]; }
    const perm = others.slice(); perm.splice(target, 0, q.ans);           // perm[新位置] = 舊位置
    const newOf = {}; perm.forEach((o, ni) => newOf[o] = ni);
    const remap = s => s && s.replace(/([(（])([A-D])(?=[)）\s])/g, (m, p, l) => p + LETTERS[newOf[LETTERS.indexOf(l)]]);
    q.orig = { opts: q.opts, ans: q.ans, exp: q.exp, hint: q.hint };
    q.opts = perm.map(o => q.orig.opts[o]); q.ans = newOf[q.orig.ans]; q.exp = remap(q.exp); q.hint = remap(q.hint);
  }));
});
const QX = {};   // "bank:qid" -> {q, bank, group}
BANKS.forEach(b => b.items.forEach(it => {
  if (it.type === "group") it.qs.forEach(q => { QX[b.id + ":" + q.id] = { q: Object.assign({ tag: it.tag }, q), bank: b, group: it, ftype: "group" }; });
  else QX[b.id + ":" + it.id] = { q: it, bank: b, group: null, ftype: it.type };
}));
const bankById = id => BANKS.find(b => b.id === id);
function tagName(bank, tag) { return (bank && bank.tags[tag]) || (tag === "vocab-drill" ? "單字練習" : tag); }

/* ================= 狀態 ================= */
let view = "home", viewArg = null;
let S = null;          // 進行中的 session（= store.session）
let wordMode = false, showHint = false;
let tick = null, animNext = true;

function defaultSel() {
  const b = BANKS.filter(x => !x.fixed).slice(-1)[0];
  return { banks: [b.id], tags: Object.keys(b.tags), types: TYPE_ORDER.slice(), count: 20, mode: "exam", order: "type" };
}
if (!store.sel) store.sel = defaultSel();
store.sel.banks = store.sel.banks.filter(id => bankById(id) && !bankById(id).hidden);
if (!store.sel.multi && store.sel.banks.length > 1) store.sel.banks = store.sel.banks.slice(-1);
if (!store.sel.banks.length) store.sel = Object.assign(store.sel, { banks: defaultSel().banks, tags: defaultSel().tags });
store.ui = store.ui || {};
{ const pb = store.sel.banks.length === 1 && bankById(store.sel.banks[0]); if (pb && pb.mockPapers && store.sel.mode === "exam" && store.sel.gMock === 0) store.sel.mode = "custom"; }
if (store.sel.gPart === "lr") store.sel.gPart = 0; if (store.sel.gPart === "w") store.sel.gPart = 1;
if (!store.sel.types.includes("listen") && !store.sel.listenAdded) { store.sel.types.unshift("listen"); store.sel.listenAdded = true; }

/* ================= 文字 → 可點單字 ================= */
function wrapWords(str, marked, uline) {
  return String(str).split(/([A-Za-z][A-Za-z'’-]*[A-Za-z]|[A-Za-z])/).map((seg, i) => {
    if (i % 2 === 0) return esc(seg);
    const r = lookup(seg); const n = normWord(seg);
    const u = uline && uline.includes(seg.toLowerCase()) ? " u" : "";
    const tap = r && !(r.entry && r.entry.zh === "人名");
    const key = r ? r.key : (IRREG[n] || n);
    const base = IRREG[n] || key;
    return `<span class="t${tap ? " w" : ""}${tap && marked && marked[key] ? " marked" : ""}${u}" data-k="${esc(key)}" data-b="${esc(base)}">${esc(seg)}</span>`;
  }).join("");
}
/* 片語：把同一組的字標成同一個 data-g */
let GID = 0;
function matchAt(parts, keys, i, used) {
  const rec = (pi, ti, acc) => {
    if (pi === parts.length) return acc;
    const p = parts[pi];
    if (p === "*") return ti < keys.length && !used.has(ti) ? rec(pi + 1, ti + 1, acc) : null;
    if (p[0] === "~") { const n = +p.slice(1); for (let s = 0; s <= n; s++) { const r = rec(pi + 1, ti + s, acc); if (r) return r; } return null; }
    if (ti >= keys.length || used.has(ti) || !p.split("/").includes(keys[ti])) return null;
    return rec(pi + 1, ti + 1, acc.concat(ti));
  };
  return rec(0, i, []);
}
function linkPhrases(root, marked) {
  root.querySelectorAll("[data-ctx]").forEach(box => {
    if (box.querySelector("[data-ctx]")) return;
    const toks = [...box.querySelectorAll(".t")]; if (toks.length < 2) return;
    const keys = toks.map(t => t.dataset.b); const used = new Set();
    for (let i = 0; i < toks.length; i++) {
      if (used.has(i)) continue;
      for (const ph of PHRASES) {
        const m = matchAt(ph.parts, keys, i, used);
        if (!m) continue;
        const g = "g" + (++GID);
        m.forEach(j => { used.add(j); const el = toks[j]; el.classList.add("w", "ph"); el.dataset.g = g; el.dataset.p = ph.k; if (marked && marked[ph.k]) el.classList.add("marked"); });
        break;
      }
    }
  });
}
function stemHTML(text, marked, fills, uline) {
  let n = 0;
  return String(text).split("___").map((part, i, arr) => {
    let h = wrapWords(part, marked, uline);
    if (i < arr.length - 1) {
      const f = fills && fills[n]; n++;
      h += f ? `<span class="blank filled">${esc(f)}</span>` : `<span class="blank"></span>`;
    }
    return h;
  }).join("");
}
function lineHTML(line, marked, fills, uline) {
  const m = /^([A-Z][A-Za-z. ]{0,14}):\s(.*)$/.exec(line);
  if (m) return `<span class="spk">${esc(m[1])}:</span>${stemHTML(m[2], marked, fills, uline)}`;
  return stemHTML(line, marked, fills, uline);
}
function blankCount(stem) { return [].concat(stem).join("\n").split("___").length - 1; }

/* ================= 題目組卷 ================= */
function unitsFor(sel) {
  const units = [];
  sel.banks.forEach(bid => {
    const b = bankById(bid); if (!b) return;
    b.items.forEach(it => {
      if (!sel.types.includes(unitType(it)) && !b.fixed && !b.tagIsType) return;   // 英檢、托福：細項本身就是題型
      if (!sel.tags.includes(it.tag)) return;
      if (it.type === "group") units.push({ type: unitType(it), bank: b.id, tag: it.tag, stage: it.stage, refs: it.qs.map(q => b.id + ":" + q.id) });
      else units.push({ type: it.type, bank: b.id, tag: it.tag, stage: it.stage, refs: [b.id + ":" + it.id] });
    });
  });
  return units;
}
/* 有正式模擬卷的題庫（英檢、托福）：選「正式模擬卷 N」＝模擬段考（整卷固定順序）；「隨機組卷」＝自訂練習 */
function paperBank(sel) { const b = sel.banks.length === 1 && bankById(sel.banks[0]); return b && b.mockPapers ? b : null; }
function geptMock(sel) {
  const b = paperBank(sel); if (!b || sel.mode !== "exam") return null;
  const n = sel.gMock ?? 1; if (!n) return null;
  const mb = bankById(b.mockPapers[n - 1]); if (!mb) return null;
  const pi = Math.min(+sel.gPart || 0, mb.exams.length - 1), ex = mb.exams[pi];
  const blind = (mb.blind || []).some(t => ex.tags.includes(t));
  return { bank: mb, n, pi, part: blind ? "lr" : "w", name: ex.name, tags: ex.tags, blind, adaptive: mb.adaptive };
}
function adaptivePlan(gm) { return typeof toeflAdaptivePlan === "function" ? toeflAdaptivePlan(gm) : null; }
function isFixedSel(sel) { return sel.banks.length > 0 && sel.banks.every(id => (bankById(id) || {}).fixed); }
/* 做過的題目：從「這個名字」的作答紀錄和暫存即時計算。刪掉紀錄或暫存，那些題目就算沒做過 */
function seenRefs(who) {
  const set = new Set(), me = r => (r.who || "未署名") === (who || "未署名");
  store.attempts.filter(me).forEach(a => (a.qs || []).forEach(r => typeof r === "string" && set.add(r)));
  store.sessions.filter(me).forEach(s => (s.qs || []).forEach(r => typeof r === "string" && set.add(r)));
  return set;
}
/* 打亂後，把沒做過的題目排前面（題組看裡面做過的比例） */
function freshFirst(units, seen) {
  const rate = u => u.refs.filter(r => seen.has(r)).length / u.refs.length;
  return shuffle(units).map((u, k) => [u, rate(u), k]).sort((a, b) => a[1] - b[1] || a[2] - b[2]).map(x => x[0]);
}
function buildRefs(sel, countOnly) {
  const seen = countOnly ? null : seenRefs(((document.getElementById("who") || {}).value || store.who || "").trim());
  const mix = countOnly ? (x => x) : (u => freshFirst(u, seen));
  let units = unitsFor(sel);
  const gm = geptMock(sel);
  if (gm) return unitsFor({ banks: [gm.bank.id], tags: gm.tags, types: TYPE_ORDER }).filter(u => !u.stage || u.stage === "router").flatMap(u => u.refs);   // 正式考卷：整份照原本順序
  if (sel.mode === "exam") {
    // 有自訂配分（例如英檢）的題庫：照它的配分抽
    const mockBanks = sel.banks.map(bankById).filter(b => b && b.mock);
    const mockOut = [];
    mockBanks.forEach(b => b.mock.forEach(([tag, k]) => {
      if (!sel.tags.includes(tag)) return;
      mockOut.push(...mix(units.filter(u => u.bank === b.id && u.tag === tag)).slice(0, k));
    }));
    const isMock = u => mockBanks.some(b => b.id === u.bank);
    units = units.filter(u => !isMock(u));
    const quota = { mc: 15, dict: 1, group: 3, spell: 10, trans: 4 };
    const out = [];
    TYPE_ORDER.forEach(t => { const q = quota[t]; if (q) out.push(...mix(units.filter(u => u.type === t)).slice(0, q)); });
    // 範圍小（例如國一只考兩課）時，用重組、配對、挑錯補到約 30 題
    if (out.length) {
      let n = out.reduce((s, u) => s + u.refs.length, 0);
      const extra = mix(units.filter(u => ["scramble", "match", "error"].includes(u.type)));
      for (const u of extra) { if (n >= 30) break; out.push(u); n += u.refs.length; }
      out.sort((x, y) => TYPE_ORDER.indexOf(x.type) - TYPE_ORDER.indexOf(y.type));
    }
    return mockOut.concat(out).flatMap(u => u.refs);
  }
  units = mix(units);
  const out = []; let n = 0;
  for (const u of units) { if (sel.count && n >= sel.count) break; out.push(u); n += u.refs.length; }
  if (sel.order === "type") out.sort((a, b) => TYPE_ORDER.indexOf(a.type) - TYPE_ORDER.indexOf(b.type));
  return (sel.order === "type" || countOnly ? out : shuffle(out)).flatMap(u => u.refs);   // 選好題目後，完全隨機就再打亂一次
}

function newSession(refs, opts = {}) {
  S = {
    id: uid(), optv: OPTV, limit: opts.limit || 0, blind: !!opts.blind, adaptive: opts.adaptive || null, who: opts.who || store.who || "未署名", kind: opts.kind || "exam", title: opts.title || "", banks: opts.banks || [], saved: Date.now(),
    qs: refs, idx: 0, ans: {}, work: {}, words: {}, combo: 0, maxCombo: 0, elapsed: 0, started: Date.now()
  };
  store.sessions.unshift(S);
  wordMode = false; showHint = false;
  save(true); go("quiz");
}
function getQ(i, sess = S) {
  const r = sess.qs[i];
  if (typeof r === "string") {
    const x = QX[r]; if (!x) return null;
    const y = Object.assign({ ref: r }, x);
    if (!sess.optv && x.q.orig) y.q = Object.assign({}, x.q, x.q.orig);
    return y;
  }
  return { ref: r.id, q: r, bank: null, group: null, ftype: "vocab" };
}

/* ================= 判分 ================= */
const CONTR = [[/\bit's\b/g, "it is"], [/\bi'm\b/g, "i am"], [/\bi'll\b/g, "i will"], [/\bcan't\b/g, "cannot"], [/\bcan not\b/g, "cannot"],
[/\bdon't\b/g, "do not"], [/\bdoesn't\b/g, "does not"], [/\bdidn't\b/g, "did not"], [/\bisn't\b/g, "is not"], [/\baren't\b/g, "are not"],
[/\bwasn't\b/g, "was not"], [/\bhe's\b/g, "he is"], [/\bshe's\b/g, "she is"], [/\bthat's\b/g, "that is"], [/\bwhat's\b/g, "what is"],
[/\bthey're\b/g, "they are"], [/\bwe're\b/g, "we are"], [/\byou're\b/g, "you are"], [/\bwon't\b/g, "will not"], [/\bcouldn't\b/g, "could not"], [/\bwho's\b/g, "who is"], [/\bwhen's\b/g, "when is"], [/\bwe'll\b/g, "we will"], [/\byou'll\b/g, "you will"], [/\bhe'll\b/g, "he will"], [/\bshe'll\b/g, "she will"], [/\bthey'll\b/g, "they will"], [/\bit'll\b/g, "it will"], [/\bi'd\b/g, "i would"], [/\bhaven't\b/g, "have not"], [/\bhasn't\b/g, "has not"], [/\bweren't\b/g, "were not"], [/\bmustn't\b/g, "must not"], [/\bshouldn't\b/g, "should not"], [/\bwhere's\b/g, "where is"], [/\blet's\b/g, "let us"], [/\bthere's\b/g, "there is"], [/\bi've\b/g, "i have"], [/\byou've\b/g, "you have"], [/\bwe've\b/g, "we have"], [/\bthey've\b/g, "they have"], [/\b(he|she|it)'s (been|gone|had|seen|done|finished|lived|taught|eaten|made)\b/g, "$1 has $2"]];
CONTR.unshift(CONTR.pop()); // "he's been" 要先判成 has
function norm(s) {
  s = String(s || "").toLowerCase().replace(/[’‘`]/g, "'").replace(/[“”]/g, '"');
  CONTR.forEach(([re, r]) => s = s.replace(re, r));
  return s.replace(/[^a-z0-9'\s-]/g, " ").replace(/'/g, "").replace(/\s+/g, " ").trim();
}
function expand(p) {
  const m = /\{([^{}]*)\}/.exec(p);
  if (!m) return [p];
  return m[1].split("|").flatMap(alt => expand(p.slice(0, m.index) + alt + p.slice(m.index + m[0].length)));
}
function transRefs(q) { return q.ans.flatMap(expand).map(s => s.replace(/\s+/g, " ").trim()); }
function lcs(a, b) {
  const dp = Array.from({ length: a.length + 1 }, () => new Array(b.length + 1).fill(0));
  for (let i = a.length - 1; i >= 0; i--) for (let j = b.length - 1; j >= 0; j--) dp[i][j] = a[i] === b[j] ? dp[i + 1][j + 1] + 1 : Math.max(dp[i + 1][j], dp[i][j + 1]);
  const keepA = new Set(), keepB = new Set(); let i = 0, j = 0;
  while (i < a.length && j < b.length) { if (a[i] === b[j]) { keepA.add(i); keepB.add(j); i++; j++; } else if (dp[i + 1][j] >= dp[i][j + 1]) i++; else j++; }
  return { len: dp[0][0], keepA, keepB };
}
function bestRef(q, resp) {
  const u = norm(resp).split(" ").filter(Boolean);
  let best = null;
  transRefs(q).forEach(r => { const rw = norm(r).split(" "); const L = lcs(u, rw); const score = L.len * 2 / (u.length + rw.length || 1); if (!best || score > best.score) best = { r, rw, u, L, score }; });
  return best;
}
function diffHTML(q, resp) {
  const b = bestRef(q, resp); if (!b) return "";
  const mine = b.u.map((w, i) => b.L.keepA.has(i) ? esc(w) : `<span class="extra">${esc(w)}</span>`).join(" ");
  const ref = b.rw.map((w, j) => b.L.keepB.has(j) ? esc(w) : `<span class="miss">${esc(w)}</span>`).join(" ");
  return `<div class="diff"><div><span class="muted">你寫的：</span>${mine || "（空白）"}</div><div><span class="muted">對照：</span>${ref}</div></div>`;
}
function spellParts(ans) { const show = ans.length >= 4; return { first: ans[0], last: show ? ans[ans.length - 1] : "", mid: ans.length - 1 - (show ? 1 : 0) }; }
function spellFull(q, typed) {
  const p = spellParts(q.ans); const t = String(typed || "").trim();
  if (t.toLowerCase() === q.ans.toLowerCase()) return t;
  return p.first + t + p.last;
}
function grade(q, resp) {
  switch (q.type) {
    case "mc": case "dict": case "listen": return resp === q.ans;
    case "order": return JSON.stringify(resp) === JSON.stringify(q.ans);
    case "spell": return spellFull(q, resp).toLowerCase() === q.ans.toLowerCase();
    case "trans": case "rewrite": { const n = norm(resp); return transRefs(q).some(r => norm(r) === n); }
    case "essay": case "speak": return resp && resp.rate === "ok";
    case "cword": return norm(resp) === norm(q.ans);
    case "scramble": { const all = q.tiles.concat(q.extra || []); const s = norm(resp.map(i => all[i]).join(" ")); return [q.ans, ...(q.alt || [])].some(a => norm(a) === s); }
    case "match": return resp.every((r, i) => r === i);
    case "error": return resp.tok === q.wrong && q.fix.some(f => norm(f) === norm(resp.fix));
  }
  return false;
}
function correctText(q) {
  switch (q.type) {
    case "mc": case "dict": case "listen": return `(${LETTERS[q.ans]}) ${q.opts[q.ans]}`;
    case "order": return q.ans.map(i => "abcdefgh"[i]).join(" → ");
    case "spell": return q.ans;
    case "trans": case "rewrite": return q.ans.map(a => expand(a)[0]).filter((v, i, a) => a.indexOf(v) === i).slice(0, 2).join("／");
    case "essay": return "參考範文：" + q.model;
    case "speak": return q.mode === "repeat" ? q.text : "參考回答：" + (q.model || "");
    case "cword": return q.ans;
    case "scramble": return q.ans;
    case "match": return q.left.map((l, i) => `${l} → ${q.right[i]}`).join("；");
    case "error": return `${q.sent.split(" ")[q.wrong].replace(/[.,?!]/g, "")} → ${q.fix[0]}`;
  }
  return "";
}
function respText(q, a) {
  if (!a) return "未作答";
  const r = a.resp;
  switch (q.type) {
    case "mc": case "dict": case "listen": return `(${LETTERS[r]}) ${q.opts[r]}`;
    case "order": return r.map(i => "abcdefgh"[i]).join(" → ");
    case "spell": return spellFull(q, r);
    case "trans": case "rewrite": return r || "（空白）";
    case "essay": return `${r.text || "（空白）"}（${wcount(r.text)} 字・自評${r.rate === "ok" ? "達到要求" : "還需加強"}）`;
    case "speak": return `自評${r.rate === "ok" ? "達到要求" : "還需加強"}`;
    case "cword": return r || "（空白）";
    case "scramble": { const all = q.tiles.concat(q.extra || []); return (q.pre ? q.pre + " " : "") + r.map(i => all[i]).join(" ") + (q.post ? " " + q.post : ""); }
    case "match": return q.left.map((l, i) => `${l} → ${q.right[r[i]] ?? "?"}`).join("；");
    case "error": return `${(q.sent.split(" ")[r.tok] || "").replace(/[.,?!]/g, "")} → ${r.fix || "?"}`;
  }
  return "";
}

/* ================= 音效 / 發音 ================= */
let AC = null;
/* iPhone／iPad：第一次點畫面時解鎖音效；audioSession 設成 playback，靜音開關打開也能聽到（iOS 17+） */
try { if (navigator.audioSession) navigator.audioSession.type = "playback"; } catch (e) { }
function unlockAudio() {
  try {
    AC = AC || new (window.AudioContext || window.webkitAudioContext)();
    if (AC.state !== "running") AC.resume();
    const b = AC.createBuffer(1, 1, 22050), src = AC.createBufferSource(); src.buffer = b; src.connect(AC.destination); src.start(0);
  } catch (e) { }
}
["touchend", "pointerdown", "keydown"].forEach(ev => addEventListener(ev, unlockAudio, { passive: true }));
function audio() { if (!store.settings.sound) return null; try { AC = AC || new (window.AudioContext || window.webkitAudioContext)(); if (AC.state === "suspended") AC.resume(); return AC; } catch (e) { return null; } }
function tone(freq, t0, dur, type = "sine", vol = .16) {
  const ac = audio(); if (!ac) return;
  const o = ac.createOscillator(), g = ac.createGain(); o.type = type; o.frequency.value = freq;
  g.gain.setValueAtTime(0, ac.currentTime + t0); g.gain.linearRampToValueAtTime(vol, ac.currentTime + t0 + .015);
  g.gain.exponentialRampToValueAtTime(.0008, ac.currentTime + t0 + dur);
  o.connect(g); g.connect(ac.destination); o.start(ac.currentTime + t0); o.stop(ac.currentTime + t0 + dur + .05);
}
function sfxGood(c) { const base = 660 * Math.pow(2, Math.min(c - 1, 12) / 12); tone(base, 0, .18); tone(base * 1.26, .07, .22); if (c >= 3) tone(base * 1.5, .14, .3, "triangle", .1); if (c >= 5) tone(base * 2, .21, .4, "sine", .08); }
function sfxBad() { tone(196, 0, .28, "triangle", .14); tone(147, .08, .32, "sine", .1); }
function speak(w) {
  try { const u = new SpeechSynthesisUtterance(w); u.lang = "en-US"; u.rate = .88; speechSynthesis.cancel(); speechSynthesis.speak(u); } catch (e) { toast("這個瀏覽器不支援發音"); }
}

/* ================= Combo 特效 ================= */
const fx = { cv: null, ctx: null, parts: [], raf: 0 };
function fxInit() { fx.cv = $("#fx"); fx.ctx = fx.cv.getContext("2d"); const rs = () => { const d = devicePixelRatio || 1; fx.cv.width = innerWidth * d; fx.cv.height = innerHeight * d; fx.ctx.setTransform(d, 0, 0, d, 0, 0); }; rs(); addEventListener("resize", rs); }
const reduced = () => matchMedia("(prefers-reduced-motion: reduce)").matches;
const SPR = {};
function sprite(c) {
  if (SPR[c]) return SPR[c];
  const cv = document.createElement("canvas"); cv.width = cv.height = 48; const g = cv.getContext("2d");
  const gr = g.createRadialGradient(18, 17, 2, 24, 24, 23); gr.addColorStop(0, "rgba(255,255,255,.95)"); gr.addColorStop(.45, c); gr.addColorStop(1, c + "00");
  g.fillStyle = gr; g.beginPath(); g.arc(24, 24, 23, 0, Math.PI * 2); g.fill();
  return SPR[c] = cv;
}
function burst(x, y, n, palette) {
  if (reduced()) return;
  if (fx.parts.length > 160) fx.parts.splice(0, fx.parts.length - 160);
  for (let i = 0; i < n; i++) {
    const a = Math.random() * Math.PI * 2, sp = 3 + Math.random() * 7;
    fx.parts.push({ x, y, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp - 3, r: 3 + Math.random() * 6, life: 1, c: palette[i % palette.length], spin: Math.random() < .5 });
  }
  if (!fx.raf) fx.raf = requestAnimationFrame(fxLoop);
}
function fxLoop() {
  const c = fx.ctx; c.clearRect(0, 0, innerWidth, innerHeight);
  fx.parts = fx.parts.filter(p => p.life > 0);
  fx.parts.forEach(p => {
    p.x += p.vx; p.y += p.vy; p.vy += .22; p.vx *= .985; p.life -= .016;
    c.globalAlpha = Math.max(0, p.life);
    const rr = p.r * 2, ry = p.spin ? rr * (.55 + .45 * Math.abs(Math.cos(p.life * 6))) : rr;
    c.drawImage(sprite(p.c), p.x - rr / 2, p.y - ry / 2, rr, ry);
  });
  c.globalAlpha = 1;
  fx.raf = fx.parts.length ? requestAnimationFrame(fxLoop) : 0;
}
const COMBO_MSG = { 2: "Nice!", 3: "Great!", 4: "Excellent!", 5: "太強了！", 7: "勢不可擋！", 10: "英文之神！", 15: "完美節奏！", 20: "傳說級！" };
function comboFX(c, el) {
  const r = el ? el.getBoundingClientRect() : { left: innerWidth / 2, top: innerHeight / 2, width: 0, height: 0 };
  const cx = r.left + r.width / 2, cy = r.top + r.height / 2;
  const dark = document.documentElement.dataset.theme === "dark" || (document.documentElement.dataset.theme !== "light" && matchMedia("(prefers-color-scheme: dark)").matches);
  const mono = dark ? ["#ffffff", "#c9ccd2", "#8d9199"] : ["#5d6169", "#9a9ea6", "#2a2c31"];
  const pal = c >= 5 ? mono.concat(dark ? ["#e0c38c", "#f3e2bd"] : ["#a07d45", "#c9a96e"]) : mono;
  burst(cx, cy, Math.min(14 + c * 3, 48), pal);
  if (c < 2) return;
  document.querySelectorAll(".combo-burst,.ring,.edge-glow").forEach(e => e.remove());
  const msg = COMBO_MSG[c] || (c > 20 && c % 5 === 0 ? "停不下來！" : "");
  const d = document.createElement("div"); d.className = "combo-burst show";
  d.innerHTML = `<div class="cb-card glass"><div class="cb-n">${c}</div><div><div class="cb-t">COMBO</div>${msg ? `<div class="cb-m">${msg}</div>` : ""}</div></div>`;
  document.body.appendChild(d); setTimeout(() => d.remove(), 1300);
  if (c >= 5 || c % 5 === 0) {
    const ring = document.createElement("div"); ring.className = "ring"; document.body.appendChild(ring); setTimeout(() => ring.remove(), 950);
    if (!reduced()) burst(innerWidth / 2, 96, Math.min(20 + c * 2, 56), pal);
  }
  if (c >= 7 && !reduced()) { const g = document.createElement("div"); g.className = "edge-glow"; document.body.appendChild(g); setTimeout(() => g.remove(), 1250); }
}

/* ================= 共用 UI ================= */
function toast(msg) { document.querySelectorAll(".toast").forEach(t => t.remove()); const t = document.createElement("div"); t.className = "toast glass"; t.textContent = msg; document.body.appendChild(t); setTimeout(() => t.remove(), 2500); }
function sheet(html) { closeSheet(); const s = document.createElement("div"); s.className = "scrim"; s.id = "scrim"; s.innerHTML = `<div class="sheet glass" role="dialog" aria-modal="true">${html}</div>`; document.body.appendChild(s); s.addEventListener("click", e => { if (e.target === s) closeSheet(); }); }
function closeSheet() { const s = $("#scrim"); if (s) s.remove(); }
function closePop() { const p = $("#wpop"); if (p) p.remove(); }

function go(v, arg) {
  view = v; viewArg = arg ?? null; closePop(); closeSheet(); animNext = true; stopReading();
  if (fx.ctx) { fx.parts = []; fx.ctx.clearRect(0, 0, innerWidth, innerHeight); }
  document.querySelectorAll(".combo-burst,.ring,.edge-glow").forEach(e => e.remove());
  clearInterval(tick); tick = null;
  render(); scrollTo(0, 0);
}
function render() {
  const app = $("#app");
  if (view === "home") app.innerHTML = homeHTML();
  else if (view === "quiz") { app.innerHTML = quizHTML(); startTick(); }
  else if (view === "result") app.innerHTML = resultHTML(viewArg);
  else if (view === "hist") app.innerHTML = histHTML();
  else if (view === "vocab") app.innerHTML = vocabHTML();
  else if (view === "teacher") app.innerHTML = teacherHTML();
  if (view === "quiz" && S) linkPhrases(app, S.words); else linkPhrases(app, null);
  const vw = app.querySelector(".view");
  if (vw && animNext) { vw.classList.add("enter"); [...vw.children].forEach((c, k) => c.style.setProperty("--i", Math.min(k, 10))); }
  animNext = false;
  $("#tabbar").hidden = view === "quiz";
  $("#qbar").hidden = view !== "quiz";
  if (view === "quiz") $("#qbar").innerHTML = qbarHTML();
  document.querySelectorAll("#tabbar button").forEach(b => b.setAttribute("aria-current", b.dataset.v === (view === "result" ? resultBack : view) ? "page" : "false"));
  moveTabIndicator();
}
/* 底部選單：玻璃膠囊跟著目前的分頁滑動 */
function moveTabIndicator() {
  const bar = $("#tabbar"); if (!bar || bar.hidden) return;
  let ind = bar.querySelector(".tab-ind"); if (!ind) { ind = document.createElement("span"); ind.className = "tab-ind"; bar.prepend(ind); }
  const cur = bar.querySelector('button[aria-current="page"]'); if (!cur) { ind.style.opacity = 0; return; }
  const b = bar.getBoundingClientRect(), c = cur.getBoundingClientRect();
  ind.style.opacity = 1; ind.style.width = c.width + "px"; ind.style.transform = `translateX(${c.left - b.left - 6}px)`;
}
addEventListener("resize", () => moveTabIndicator());
/* 折疊群組：點一下展開／收合（有高度動畫） */
document.addEventListener("click", e => {
  const sm = e.target.closest(".bank-group > summary"); if (!sm) return;
  e.preventDefault();
  const g = sm.parentElement, body = g.querySelector(".bank-group-body"), opening = !g.open;
  const done = () => { store.ui[`open:${g.dataset.group}`] = g.open; save(); };
  if (reduced() || !body.animate) { g.open = opening; done(); return; }
  if (opening) {
    g.open = true; const h = body.scrollHeight;
    body.animate([{ height: "0px", opacity: 0, transform: "translateY(-6px)" }, { height: h + "px", opacity: 1, transform: "none" }], { duration: 420, easing: "cubic-bezier(.2,.9,.25,1)" });
    done();
  } else {
    const h = body.scrollHeight;
    const an = body.animate([{ height: h + "px", opacity: 1 }, { height: "0px", opacity: 0 }], { duration: 300, easing: "cubic-bezier(.4,0,.2,1)" });
    g.classList.add("closing"); an.onfinish = () => { g.open = false; g.classList.remove("closing"); done(); };
  }
});

/* ================= 首頁 ================= */
function countBy(sel, t) { return unitsFor(Object.assign({}, sel, { types: [t] })).reduce((n, u) => n + u.refs.length, 0); }
function homeHTML() {
  const sel = store.sel;
  const sess = store.sessions;
  const avail = unitsFor(sel).reduce((n, u) => n + u.refs.length, 0);
  const examN = sel.mode === "exam" ? buildRefsCount(sel) : Math.min(avail, sel.count || avail);
  const last = store.attempts[0];
  let h = `<section class="view">
  <div class="hero"><div><div class="eyebrow">國中段考・全民英檢・TOEFL iBT</div><div class="brand-row"><h1 class="large-title brand">Apex English</h1><span class="byline">Created and designed by Allen L.</span></div>
  <p class="subtitle">全方位英語訓練平台。選好範圍就開始，點題目裡不會的單字，交卷後自動整理成單字表。</p></div>
  <div class="row" style="gap:10px;flex-wrap:nowrap"><button class="icon-btn theme-btn" data-act="theme" aria-label="${curTheme() === "dark" ? "切換成淺色模式" : "切換成深色模式"}" title="${curTheme() === "dark" ? "淺色模式" : "深色模式"}">${curTheme() === "dark" ? I.sun : I.moon}</button>
  <button class="icon-btn" data-act="sound" aria-label="音效開關" title="音效">${store.settings.sound ? I.sound : I.mute}</button></div></div>`;
  h += `<div class="glass card who-card"><div class="opt-block"><label for="who">作答人</label>
    <div class="who-row"><input id="who" class="field" placeholder="輸入你的名字" autocomplete="off" value="${esc(store.who)}" maxlength="20"></div>
    ${typeof syncHomeHTML === "function" ? syncHomeHTML() : ""}
    ${store.names.length ? `<div class="chips">${store.names.map(n => `<button class="chip" data-act="pick-who" data-n="${esc(n)}" aria-pressed="${n === store.who}">${esc(n)}</button>`).join("")}</div>` : ""}</div></div>`;
  if (sess.length) {
    h += `<div class="section-h"><h2>已存檔，可繼續</h2><span class="muted" style="font-size:13px">${sess.length} 份</span></div><div class="glass card resume-list">`;
    sess.slice().sort((a, b) => (b.saved || 0) - (a.saved || 0)).forEach(ses => {
      const done = Object.keys(ses.ans).length;
      h += `<div class="resume"><div style="min-width:0"><div class="row" style="gap:8px"><span class="tag who-tag">${esc(ses.who || "未署名")}</span><span style="font-weight:700;font-size:16px">${esc(ses.title)}</span></div>
      <div class="muted tnum" style="font-size:13.5px;margin-top:4px">已作答 ${done} / ${ses.qs.length} 題・用時 ${fmtTime(ses.elapsed)}・存於 ${fmtDate(ses.saved || ses.started)}</div></div>
      <div class="row"><button class="btn ghost" data-act="discard" data-id="${esc(ses.id)}">刪除</button><button class="btn primary" data-act="resume" data-id="${esc(ses.id)}">${I.play}繼續作答</button></div></div>`;
    });
    h += `</div>`;
  }
  const shown = BANKS.filter(b => !b.hidden).sort((x, y) => (x.grade || 0) - (y.grade || 0));
  const gm = geptMock(sel);
  h += `<div class="section-h"><h2>考試範圍</h2><div class="row" style="gap:10px;flex-wrap:nowrap"><span class="muted" style="font-size:13px">${shown.length} 個題庫</span>
    <button class="chip" data-act="multi" aria-pressed="${!!sel.multi}">${sel.multi ? I.check : ""}複選</button></div></div>
    <div class="muted" style="font-size:13px;margin-top:-8px">${sel.multi ? "複選中：可以同時勾選多個範圍一起練習" : "一次選一個範圍；要合併多個範圍一起練習，請先按右邊的「複選」"}</div>`;
  const pubOf = b => b.publisher || (/翰林/.test(b.range || "") ? "翰林版" : "");
  const groups = [["國一～國三（翰林版）", shown.filter(b => pubOf(b) === "翰林版")], ["", shown.filter(b => pubOf(b) !== "翰林版")]];
  groups.forEach(([name, list]) => {
    if (!list.length) return;
    if (!name) { list.forEach(b => h += bankCardHTML(b, sel, gm)); return; }
    const picked = list.filter(b => sel.banks.includes(b.id));
    h += `<details class="bank-group" data-group="${esc(name)}" ${store.ui[`open:${name}`] ? "open" : ""}><summary class="glass card"><span style="min-width:0;flex:1"><span class="bank-title" style="display:block">${esc(name)}</span>
      <span class="muted" style="font-size:14px">${list.map(b => esc(b.title.replace(" 全冊", ""))).join("・")}${picked.length ? `<br>已選：<b style="color:var(--ink)">${picked.map(b => esc(b.title)).join("、")}</b>` : ""}</span></span><span class="fold-btn" aria-hidden="true"><span class="fold-hint">${store.ui[`open:${name}`] ? "收合" : "展開"}</span><span class="fold-ic">${I.chevR}</span></span></summary>
      <div class="bank-group-body">${list.map(b => bankCardHTML(b, sel, gm)).join("")}</div></details>`;
  });
  h += `<div class="glass card" style="display:flex;flex-direction:column;gap:18px">
    <div class="opt-block">${paperBank(sel) ? `<label>${gm ? "正式模擬卷" : "隨機組卷"}</label>` : `<label>模式</label><div class="seg">
      <button data-act="mode" data-v="exam" aria-pressed="${sel.mode === "exam"}">模擬段考</button>
      <button data-act="mode" data-v="custom" aria-pressed="${sel.mode === "custom"}">自訂練習</button></div>`}
      <div class="muted" style="font-size:13.5px">${gm ? `${esc(gm.bank.title)}・${esc(gm.name)}：${esc((gm.bank.partNotes || [])[gm.pi] || "")}${gm.blind ? "作答時不顯示對錯、沒有提示，聽力每題只播一遍，交卷後才看成績和解析。" : ""}`
      : sel.mode === "exam" ? (sel.banks.some(id => (bankById(id) || {}).mock) ? "依英檢各部分的題數，從練習題隨機抽題組卷" : "照段考配分抽題：單選 15・字典題 1・題組 3 組・文意字彙 10・翻譯 4；範圍小時自動用重組、配對、挑錯補到約 30 題") : sel.banks.length && sel.banks.every(id => (bankById(id) || {}).tagIsType) ? "依上方勾選的題型，隨機抽題" : "依下方題型與題數隨機抽題"}</div></div>
    ${gm || (sel.banks.length && sel.banks.every(id => (bankById(id) || {}).tagIsType)) ? "" : `<div class="opt-block"><label>題型</label><div class="chips">${TYPE_ORDER.map(t => {
      const c = countBy(sel, t); const dis = false; if (!c) return "";
      return `<button class="chip" data-act="type" data-t="${t}" aria-pressed="${sel.types.includes(t) && !dis}" ${dis ? "disabled style=\"opacity:.4\"" : ""}>${TYPE_LABEL[t]}<span class="n">${c}</span></button>`;
    }).join("")}</div></div>`}
    ${sel.mode === "custom" ? `<div class="opt-block"><label>題數</label><div class="seg">${[10, 20, 30, 0].map(c => `<button data-act="count" data-v="${c}" aria-pressed="${sel.count === c}">${c || "全部"}</button>`).join("")}</div></div>
    <div class="opt-block"><label>順序</label><div class="seg"><button data-act="order" data-v="type" aria-pressed="${sel.order === "type"}">依題型排列</button><button data-act="order" data-v="random" aria-pressed="${sel.order === "random"}">完全隨機</button></div></div>` : ""}
    <div class="start-bar"><div class="muted tnum">這次共 <b style="color:var(--ink);font-size:18px">${examN}</b> 題${store.who && !gm ? (() => { const seen = seenRefs(store.who), all = unitsFor(sel).flatMap(u => u.refs), left = all.filter(r => !seen.has(r)).length; return `<div style="font-size:12.5px">${esc(store.who)} 在這個範圍還有 ${left} / ${all.length} 題沒做過，會優先出</div>`; })() : ""}</div>
    <button class="btn primary big" data-act="start" ${examN ? "" : "disabled"}>${I.play}開始作答</button></div>
  </div>`;
  if (last) {
    h += `<div class="section-h"><h2>最近一次</h2><button class="btn ghost" data-act="tab" data-v="hist">全部紀錄</button></div>${histItem(last)}`;
  }
  return h + `</section>`;
}
function bankCardHTML(b, sel, gm) {
  const on = sel.banks.includes(b.id);
  const n = b.items.reduce((s, it) => s + (it.type === "group" ? it.qs.length : 1), 0);
  const papers = on && b.mockPapers && sel.banks.length === 1;   // 隨機組卷時也要顯示，才能切回正式模擬卷
  const chips = () => `<div class="opt-block"><label>${b.tagIsType ? "題型（可複選）" : "細項"}</label><div class="chips">${Object.entries(b.tags).map(([k, v]) => {
      const c = b.items.filter(it => it.tag === k).reduce((s, it) => s + (it.type === "group" ? it.qs.length : 1), 0);
      return `<button class="chip" data-act="tag" data-k="${k}" aria-pressed="${sel.tags.includes(k)}">${esc(v)}<span class="n">${c}</span></button>`;
    }).join("")}</div></div>`;
  return `<div class="glass card bank">
      <div class="bank-head"><button class="row" data-act="bank" data-id="${b.id}" style="text-align:left;flex:1;min-width:0;gap:14px;flex-wrap:nowrap" aria-pressed="${on}">
        <span class="check ${on ? "on" : ""}">${on ? I.check : ""}</span>
        <span style="min-width:0"><span class="bank-title" style="display:block">${esc(b.title)}</span><span class="muted" style="font-size:14px">${esc(b.range)}・${n} 題</span></span></button>
</div>
      ${b.note ? `<div class="muted" style="font-size:13.5px">${esc(b.note)}</div>` : ""}
      ${papers ? `<div class="opt-block"><label>選擇考卷</label><div class="seg">${b.mockPapers.map((id, i) => `<button data-act="gmock" data-v="${i + 1}" aria-pressed="${!!gm && gm.n === i + 1}">正式模擬卷 ${i + 1}</button>`).join("")}<button data-act="gmock" data-v="0" aria-pressed="${!gm}">隨機組卷</button></div>
      <div class="muted" style="font-size:13px">${gm ? "正式模擬卷＝照官方題型、題數、時間出的完整考卷" : "隨機組卷＝從練習題庫依題型、細項自由抽題"}</div></div>
      ${gm ? `<div class="opt-block"><label>考哪一部分</label><div class="seg">${gm.bank.exams.map((ex, i) => `<button data-act="gpart" data-v="${i}" aria-pressed="${gm.pi === i}">${esc(ex.name)}</button>`).join("")}</div></div>
      ${b.officialLinks ? `<div class="muted" style="font-size:13px">想做官方真題：${b.officialLinks.map(([t, u]) => `<a href="${esc(u)}" target="_blank" rel="noopener" style="color:var(--ink);text-decoration:underline">${esc(t)}</a>`).join("、")}</div>` : ""}` : chips()}`
      : `${on && b.exams ? `<div class="opt-block"><label>${b.tagIsType ? "快速選擇" : "段考範圍快選"}</label><div class="seg">${b.exams.map((ex, i) => `<button data-act="exam-pick" data-id="${b.id}" data-i="${i}" aria-pressed="${sameSet(Object.keys(b.tags).filter(t => sel.tags.includes(t)), ex.tags)}">${esc(ex.name)}</button>`).join("")}<button data-act="exam-pick" data-id="${b.id}" data-i="all" aria-pressed="${Object.keys(b.tags).every(t => sel.tags.includes(t))}">${b.tagIsType ? "全部" : "全冊"}</button></div></div>` : ""}
      ${on ? chips() : ""}`}
    </div>`;
}
/* 折疊的題庫群組：記住開合狀態 */
document.addEventListener("toggle", e => { const g = e.target.closest && e.target.closest(".bank-group"); if (g && e.target === g) { const t = g.querySelector(".fold-hint"); if (t) t.textContent = g.open ? "收合" : "展開"; } }, true);
function sameSet(a, b) { return a.length === b.length && a.every(x => b.includes(x)); }
function buildRefsCount(sel) { return buildRefs(sel, true).length; }

/* ================= 作答畫面 ================= */
function startTick() {
  clearInterval(tick); let lastT = Date.now();
  tick = setInterval(() => {
    if (!S || view !== "quiz" || document.hidden) { lastT = Date.now(); return; }
    const now = Date.now(); S.elapsed += (now - lastT) / 1000; lastT = now;
    const t = $("#qtime"); if (t) t.textContent = S.limit ? "剩 " + fmtTime(S.limit - S.elapsed) : fmtTime(S.elapsed);
    if (S.limit) {
      const left = S.limit - S.elapsed, tb = $("#tbar");
      if (tb) { tb.style.width = Math.max(0, left / S.limit * 100) + "%"; tb.classList.toggle("low", left < 300); }
      if (left <= 0) { clearInterval(tick); toast("時間到，自動交卷"); finish(); return; }
    }
    if (Math.round(S.elapsed) % 5 === 0) save();
  }, 1000);
}
function qbarHTML() {
  const last = S.idx === S.qs.length - 1 && !(typeof adaptPending === "function" && adaptPending());
  return `<button class="nav" data-act="prev" ${S.idx === 0 ? "disabled" : ""} aria-label="上一題">${I.chevL}<span>上一題</span></button>
  ${S.blind ? "" : `<button class="tb ${showHint ? "on" : ""}" data-act="hint">${I.bulb}提示</button>`}
  <button class="tb" data-act="grid">${I.grid}題號</button>
  ${S.blind ? "" : `<button class="tb ${wordMode ? "on" : ""}" data-act="wordmode">${I.aa}生字</button>`}
  <button class="nav next" data-act="${last ? "finish" : "next"}"><span>${last ? "交卷" : "下一題"}</span>${last ? I.flag : I.chevR}</button>`;
}
function quizHTML() {
  const i = S.idx, X = getQ(i); const q = X.q; const a = S.blind ? null : S.ans[i];
  const answered = Object.keys(S.ans).length;
  const typeLabel = X.ftype === "vocab" ? "單字練習" : q.label ? q.label : q.ctx ? "Build a Sentence" : X.group && KIND_LABEL[X.group.kind] ? KIND_LABEL[X.group.kind] : TYPE_LABEL[X.ftype] + (q.type === "order" ? "・排序" : "");
  let h = `<section class="view ${wordMode ? "wordmode" : ""}" style="gap:16px">
  <div class="qtop glass pill"><button class="icon-btn" data-act="exit" aria-label="離開">${I.x}</button>
    <button class="save-btn" data-act="save-now" aria-label="存檔">${I.save}<span>存檔</span></button>
    <div class="progress"><div class="meta"><span>第 ${i + 1} / ${S.qs.length} 題・已答 ${answered}</span><span id="qtime">${S.limit ? "剩 " + fmtTime(S.limit - S.elapsed) : fmtTime(S.elapsed)}</span></div>
    <div class="bar"><i style="width:${answered / S.qs.length * 100}%"></i></div>
    ${S.limit ? `<div class="tbar-track" title="剩餘時間"><i id="tbar" class="${S.limit - S.elapsed < 300 ? "low" : ""}" style="width:${Math.max(0, (S.limit - S.elapsed) / S.limit * 100)}%"></i></div>` : ""}</div>
    <div class="combo-mini ${S.combo ? "" : "zero"}" id="combomini">×${S.combo}</div></div>`;
  const passage = X.group ? passageHTML(X, i) : "";
  h += `<div class="qlayout ${passage ? "has-passage" : ""}">${passage}<div class="glass card qcard" id="qcard" data-i="${i}">
    <div class="qhead"><span class="qnum">Q${i + 1}</span>${["trans", "essay", "listen", "cword", "speak"].includes(q.type) || (X.group && X.group.kind === "listening") || (X.bank && /^toefl/.test(X.bank.id)) || q.zhPrompt || S.blind ? "" : `<button class="speak" data-act="read-q" aria-label="念題目" title="念題目">${I.speaker}</button>`}<span class="tag">${typeLabel}</span>${X.group ? "" : X.bank ? `<span class="tag">${esc(tagName(X.bank, q.tag))}</span>` : ""}</div>
    ${questionBody(X, i, a, false)}
    ${showHint && !a ? `<div class="hintbox">${I.bulb}<div>${esc(q.hint || "這題沒有提示")}</div></div>` : ""}
    ${a ? feedbackHTML(X, a) : ""}
    ${i === 0 && !a && !S.tipSeen && !S.blind ? `<div class="muted" style="font-size:13.5px">小技巧：題目裡不會的字直接點一下就會加入生字表；選項裡的字請先打開下方「生字」。選項右邊的圓圈斜線按鈕可以先劃掉不要的答案。</div>` : ""}
  </div></div></section>`;
  return h;
}
function passageHTML(X, i) {
  const g = X.group, m = S.words;
  let body = "";
  if (g.kind === "ctest") return ctestPassageHTML(X, i);
  if (g.kind === "listening") return listenGroupHTML(X, i);
  if (g.kind === "cloze") {
    body = g.passage.map(p => `<p data-ctx>${p.split(/(\[\[\d\]\])/).map(seg => {
      const mm = /\[\[(\d)\]\]/.exec(seg); if (!mm) return wrapWords(seg, m);
      const n = +mm[1]; const qi = S.qs.findIndex((r, k) => { const y = getQ(k); return y && y.group === g && y.q.blank === n; });
      const qa = qi >= 0 ? S.ans[qi] : null; const qq = qi >= 0 ? getQ(qi).q : null;
      if (qa) return `<span class="cz done">${n}. ${esc(qq.opts[qq.ans])}</span>`;
      return `<span class="cz ${qi === i ? "now" : ""}">${n}</span>`;
    }).join("")}</p>`).join("");
  } else if (g.kind === "dialogue") {
    body = g.passage.map(l => `<span class="dl" data-ctx>${lineHTML(l, m, null, g.uline)}</span>`).join("");
  } else if (g.kind === "notice") {
    body = g.passage.map((l, k) => `<span class="dl" data-ctx ${k === 0 ? 'style="font-weight:700"' : ""}>${wrapWords(l, m)}</span>`).join("");
  } else {
    body = g.passage.map(p => `<p data-ctx>${wrapWords(p, m, g.uline)}</p>`).join("");
  }
  return `<div class="glass card passage"><div class="eyebrow">題組・${{ dialogue: "對話", article: "短文", cloze: "克漏字", notice: "公告" }[g.kind]}</div>
  <h3 class="ptitle" data-ctx>${wrapWords(g.title, m)}</h3>
  ${S.blind || (X.bank && /^toefl/.test(X.bank.id)) ? "" : `<div class="read-bar"><button class="btn sm" data-act="read-all">${reading ? `${I.stop}<span>停止</span>` : `${I.speaker}<span>朗讀全文</span>`}</button>
  <div class="seg sm">${[0.7, 0.9, 1.1].map(r => `<button data-act="rate" data-v="${r}" aria-pressed="${(store.settings.rate || 0.9) === r}">${r === 0.7 ? "慢" : r === 0.9 ? "中" : "快"}</button>`).join("")}</div></div>`}
  <div class="ptext ${g.kind}">${body}</div>
  ${g.gloss ? `<div class="gloss">${g.gloss.map(([e, z]) => `<span><b>${esc(e)}</b> ${esc(z)}</span>`).join("")}</div>` : ""}</div>`;
}
/* ---------- 聽力 ---------- */
function listenScript(q) { return q.script.map(l => l.replace(/^([WM]\d?): /, (m, w) => (w[0] === "W" ? "女：" : "男："))); }
function listenHTML(q, i, a, review) {
  const w = review ? {} : (S.work[i] || {});
  const once = !review && S.blind, used = once && w.played;
  const reveal = review || (a && !once);
  let h = q.img ? `<div class="limg ${q.part === 4 ? "tri" : ""}"><img src="${esc(q.img)}" alt="聽力題圖片" onerror="this.parentNode.classList.add('noimg');this.remove()">${q.part === 4 ? "<span>A</span><span>B</span><span>C</span>" : ""}</div>` : "";
  if (!review) h += `<div class="listen-bar"><button class="btn ${used ? "" : "primary"}" data-act="listen-play" ${used ? "disabled" : ""}>${I.speaker}<span>${used ? "已播放" : w.played ? "再聽一次" : "播放題目"}</span></button>
  <span class="muted" style="font-size:13.5px">${once ? "正式考：每題只播一遍" : { 1: "看圖，聽問題和三個選項", 2: "聽一句話，選出最適合的回應", 3: "聽一段對話和問題", 4: "聽短文和問題，選出符合的圖", cr: "Listen and choose the best response. 聽一句話，選出最適合的回應" }[q.part]}</span></div>`;
  if (reveal && !review) h += `<details class="script"><summary>聽力原文</summary>${listenScript(q).map(l => `<div data-ctx>${wrapWords(l, S.words)}</div>`).join("")}</details>`;
  return h;
}
function fillsFor(q, a) {
  if (!a || !isMC(q)) return null;
  const n = blankCount(q.stem); if (!n) return null;
  const parts = n > 1 ? q.opts[q.ans].split(/;\s*/) : [q.opts[q.ans]];
  return parts.length === n ? parts : null;
}
function questionBody(X, i, a, review) {
  const q = X.q, m = review ? (review.words || {}) : S.words, locked = !!a;
  const st = review ? {} : (S.work[i] || {});
  let h = "";
  if (isMC(q)) {
    const fills = fillsFor(q, a);
    if (q.type === "listen") h += listenHTML(q, i, a, review);
    else if (q.blank) h += `<div class="stem">第 <b>${q.blank}</b> 格應填入哪一句？</div>`;
    else h += `<div class="stem" data-ctx>${[].concat(q.stem).map(l => `<span class="line" data-ctx>${lineHTML(l, m, fills)}</span>`).join("")}</div>`;
    if (q.box) h += `<div class="boxed" data-ctx>${q.box.map(l => `<div>${lineHTML(l, m, null, [q.uline])}</div>`).join("")}</div>`;
    if (q.post) h += `<div class="stem" style="font-size:17px" data-ctx>${wrapWords(q.post, m)}</div>`;
    const struck = st.struck || [];
    h += `<div class="opts ${locked ? "locked" : ""}">${q.opts.map((o, k) => {
      let cls = "opt"; if (locked) { cls += " locked"; if (k === q.ans) cls += " right"; else if (a.resp === k) cls += " wrong"; } else if (struck.includes(k)) cls += " struck";
      if (!review && !locked && S.blind && S.ans[i] && S.ans[i].resp === k) cls += " picked";
      const hideTxt = q.type === "listen" && (q.part === 1 || q.part === 4) && !locked;
      return `<div class="${cls}" data-k="${k}"><button class="opt-main" data-act="opt" data-k="${k}" ${locked ? 'aria-disabled="true"' : ""}><span class="letter">${LETTERS[k]}</span><span class="txt" data-ctx>${hideTxt ? `<span class="muted">${q.part === 1 ? "（聽選項 " + LETTERS[k] + "）" : "圖 " + LETTERS[k]}</span>` : q.zhOpts ? esc(o) : wrapWords(o, m)}</span></button>${locked ? "" : `<button class="strike" data-act="strike" data-k="${k}" aria-label="劃掉 ${LETTERS[k]}" title="劃掉">${I.strike}</button>`}</div>`;
    }).join("")}</div>`;
  }
  else if (q.type === "order") {
    const pick = locked ? a.resp : (st.pick || []);
    h += `<div class="stem" data-ctx>${wrapWords(q.stem, m)}</div><div class="order-list">${q.items.map((t, k) => {
      const pos = pick.indexOf(k); const ok = locked && q.ans[pos] === k;
      return `<button class="order-item ${pos >= 0 ? "picked" : ""}" data-act="opick" data-k="${k}" ${locked ? "disabled" : ""} style="${locked && pos >= 0 ? `box-shadow:inset 0 0 0 2px var(${ok ? "--good" : "--bad"})` : ""}">
      <span class="badge">${pos >= 0 ? pos + 1 : ""}</span><span><span class="lab">${"abcd"[k]}.</span> <span data-ctx>${wrapWords(t, m)}</span></span></button>`;
    }).join("")}</div>
    ${locked ? "" : `<div class="row"><button class="btn ghost" data-act="order-reset">重排</button><button class="btn primary" data-act="submit" ${pick.length === q.items.length ? "" : "disabled"}>確認順序</button></div>`}`;
  }
  else if (q.type === "spell") {
    const p = spellParts(q.ans); const val = locked ? a.resp : (st.val || "");
    const inp = `<span class="spellwrap"><span class="fixed">${esc(p.first)}</span><input id="spellin" style="--n:${p.mid}" autocomplete="off" autocapitalize="off" spellcheck="false" inputmode="latin" value="${esc(val)}" ${locked ? `readonly class="${a.correct ? "ok" : "no"}"` : ""} aria-label="填入單字中間的字母"><span class="fixed">${esc(p.last)}</span></span>`;
    if (q.zhPrompt) h += `<div class="zh">${esc(q.zhPrompt)}</div>`;
    h += `<div class="stem" data-ctx>${q.stem.split("___").map((s, k, arr) => wrapWords(s, m) + (k < arr.length - 1 ? inp : "")).join("")}</div>
    <div class="muted" style="font-size:13.5px">提示字母已給：第一個字母${p.last ? "和最後一個字母" : ""}，請填入中間 ${p.mid} 個字母（也可以打完整單字）。</div>
    ${locked ? "" : `<div class="row"><button class="btn primary" data-act="submit">確認</button></div>`}`;
  }
  else if (q.type === "trans") {
    h += `<div class="eyebrow">請翻譯成英文</div><div class="zh">${esc(q.zh)}</div>
    <textarea class="field" id="transin" placeholder="在這裡輸入英文句子…" autocapitalize="sentences" spellcheck="false" ${locked ? "readonly" : ""}>${esc(locked ? a.resp : (st.val || ""))}</textarea>
    ${locked ? "" : `<div class="row"><button class="btn primary" data-act="submit">確認</button></div>`}`;
  }
  else if (q.type === "rewrite") {
    h += `<div class="instr">${esc(q.instr)}</div><div class="boxed" data-ctx>${[].concat(q.src).map(s => `<div data-ctx>${wrapWords(s, m)}</div>`).join("")}</div>
    <textarea class="field" id="transin" autocapitalize="sentences" spellcheck="false" ${locked ? "readonly" : ""}>${esc(locked ? a.resp : (st.val !== undefined ? st.val : (q.start ? q.start + " " : "")))}</textarea>
    <div class="muted" style="font-size:13.5px">${q.start ? `已幫你寫好開頭「${esc(q.start)}」，請寫出完整的句子。` : "請寫出完整的句子。"}</div>
    ${locked ? "" : `<div class="row"><button class="btn primary" data-act="submit">確認</button></div>`}`;
  }
  else if (q.type === "cword") h += ctestCardHTML(X, i, a);
  else if (q.type === "speak") h += speakHTML(q, i, a);
  else if (q.type === "essay") {
    const sub = locked || st.submitted; const txt = locked ? a.resp.text : (st.val || "");
    h += `<div class="eyebrow">${esc(q.label || "段落寫作")}</div><div class="stem" style="font-size:17px">${esc(q.prompt)}</div>
    ${q.scenario ? `<div class="boxed" style="font-size:16px">${esc(q.scenario)}${q.bullets ? `<ul style="margin:8px 0 0;padding-left:22px">${q.bullets.map(b => `<li>${esc(b)}</li>`).join("")}</ul>` : ""}</div>` : ""}
    ${q.posts ? `<div class="posts">${q.posts.map(([who, t], k) => `<div class="post ${k ? "" : "prof"}"><div class="post-who">${esc(who)}</div><div data-ctx>${wrapWords(t, m)}</div></div>`).join("")}</div>` : ""}
    ${q.img ? `<img class="essay-img" src="${esc(q.img)}" alt="看圖寫作的圖片" onerror="this.remove()">` : ""}
    ${q.scenes ? `<div class="scenes">${q.scenes.map((s, k) => `<div class="scene"><span class="sn">${k + 1}</span><span data-ctx>${wrapWords(s, m)}</span></div>`).join("")}</div>` : ""}
    ${q.keywords ? `<div class="row" style="gap:6px"><span class="step-label">可以用的字：</span>${q.keywords.map(k => `<span class="tag">${esc(k)}</span>`).join("")}</div>` : ""}
    <textarea class="field essay" id="essayin" spellcheck="false" placeholder="在這裡寫你的短文…" ${sub ? "readonly" : ""}>${esc(txt)}</textarea>
    <div class="muted tnum" id="wc" style="font-size:13.5px">${wcount(txt)} 字（建議 ${q.minWords || 50} 字以上）</div>
    ${!sub ? `<div class="row"><button class="btn primary" data-act="essay-submit">寫好了，看範文和檢查表</button></div>` : `
    <div class="model"><div class="step-label">參考範文</div><div class="ptext" style="font-size:16px">${esc(q.model)}</div></div>
    <div class="step-label">自我檢查</div><div class="checklist">${(q.check || ESSAY_CHECK).map((c, k) => `<label class="ck"><input type="checkbox" id="ck${k}" ${locked ? "disabled" : ""}><span>${esc(c)}</span></label>`).join("")}</div>
    ${locked ? "" : `<div class="row"><button class="btn" data-act="essay-rate" data-v="no">還需加強</button><button class="btn primary" data-act="essay-rate" data-v="ok">我覺得達到要求</button></div>`}`}`;
  }
  else if (q.type === "scramble") {
    const seq = locked ? a.resp : (st.seq || []), all = q.tiles.concat(q.extra || []);
    h += `<div class="eyebrow">${q.ctx ? "Build a Sentence：用字卡完成回應的句子" + (q.extra && q.extra.length ? "（有一張字卡用不到）" : "") : "把字卡排成正確的句子"}</div>${q.zh ? `<div class="zh">${esc(q.zh)}</div>` : ""}
    ${q.ctx ? `<div class="bs-ctx" data-ctx>${wrapWords(q.ctx, m)}</div>` : ""}
    <div class="bs-line">${q.pre ? `<span class="bs-fix">${esc(q.pre)}</span>` : ""}<div class="slots ${seq.length ? "" : "empty"}">${seq.map((t, k) => `<button class="tile" data-act="slot" data-k="${k}" ${locked ? "disabled" : ""}>${esc(all[t])}</button>`).join("")}</div>${q.post ? `<span class="bs-fix">${esc(q.post)}</span>` : ""}</div>
    ${locked ? "" : `<div class="tiles">${(st.perm || all.map((_, k) => k)).map(t => `<button class="tile ${seq.includes(t) ? "used" : ""}" data-act="tile" data-k="${t}">${esc(all[t])}</button>`).join("")}</div>
    <div class="row"><button class="btn ghost" data-act="scr-reset">清除</button><button class="btn primary" data-act="submit" ${seq.length === q.tiles.length ? "" : "disabled"}>確認</button></div>`}`;
  }
  else if (q.type === "match") {
    const PC = Array(6).fill("var(--accent)");
    const pairs = locked ? a.resp : (st.pairs || {}); const perm = st.perm || (a && a.perm) || q.right.map((_, k) => k);
    const rightOwner = {}; Object.entries(pairs).forEach(([l, r]) => { if (r !== undefined && r !== null) rightOwner[r] = +l; });
    h += `<div class="stem" style="font-size:17px">${esc(q.stem)}</div><div class="muted" style="font-size:13.5px">先點左邊，再點右邊配成一對；點已配對的項目可以取消。</div>
    <div class="match"><div class="col">${q.left.map((l, k) => {
      const r = pairs[k]; const has = r !== undefined && r !== null; let cls = "mitem";
      if (locked) cls += r === k ? " ok" : " no"; else if (st.selL === k) cls += " sel";
      return `<button class="${cls}" data-act="m-left" data-k="${k}" ${locked ? "disabled" : ""}>${has ? `<span class="mk" style="background:${PC[k % 6]}">${k + 1}</span>` : `<span class="mk" style="background:var(--ink-3)">${k + 1}</span>`}<span data-ctx>${wrapWords(l, m)}</span></button>`;
    }).join("")}</div><div class="col">${perm.map(r => {
      const owner = rightOwner[r]; const has = owner !== undefined; let cls = "mitem";
      if (locked) cls += owner === r ? " ok" : " no";
      return `<button class="${cls}" data-act="m-right" data-k="${r}" ${locked ? "disabled" : ""}>${has ? `<span class="mk" style="background:${PC[owner % 6]}">${owner + 1}</span>` : ""}<span data-ctx>${wrapWords(q.right[r], m)}</span></button>`;
    }).join("")}</div></div>
    ${locked ? "" : `<div class="row"><button class="btn ghost" data-act="m-reset">清除</button><button class="btn primary" data-act="submit" ${Object.values(pairs).filter(v => v !== undefined && v !== null).length === q.left.length ? "" : "disabled"}>確認配對</button></div>`}`;
  }
  else if (q.type === "error") {
    const toks = q.sent.split(" "); const sel = locked ? a.resp.tok : st.tok;
    h += `<div class="step-label">① 點出句子中錯誤的那個字</div><div class="err-sent">${toks.map((t, k) => {
      let cls = "etok"; if (locked) { if (k === q.wrong) cls += " ok"; else if (k === sel) cls += " no"; } else if (k === sel) cls += " sel";
      return `<button class="${cls}" data-act="etok" data-k="${k}" ${locked ? "disabled" : ""}>${esc(t)}</button>`;
    }).join("")}</div>
    <div class="step-label">② 改成正確的字</div>
    <input class="field" id="errfix" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="${sel !== undefined && sel !== null ? `把「${esc(toks[sel].replace(/[.,?!]/g, ""))}」改成…` : "先選出錯字"}" value="${esc(locked ? a.resp.fix : (st.fix || ""))}" ${locked ? "readonly" : ""}>
    ${locked ? "" : `<div class="row"><button class="btn primary" data-act="submit">確認</button></div>`}`;
  }
  return h;
}
function feedbackHTML(X, a) {
  const q = X.q;
  if (q.type === "speak") return `<div class="feedback ${a.correct ? "ok" : "no"}"><span class="fb-ic">${a.correct ? I.check : I.x}</span><div style="min-width:0"><b>${a.correct ? "完成！自評達到要求" : "完成，自評還需加強"}</b><p>${esc(q.exp || "")}</p></div></div>`;
  if (q.type === "essay") return `<div class="feedback ${a.correct ? "ok" : "no"}"><span class="fb-ic">${a.correct ? I.check : I.x}</span><div style="min-width:0"><b>${a.correct ? "完成！自評達到要求" : "完成，自評還需加強"}</b><p>${esc(q.exp || "")}</p></div></div>`;
  const extra = (q.type === "trans" || q.type === "rewrite") && !a.correct ? diffHTML(q, a.resp) : "";
  const self = (q.type === "trans" || q.type === "rewrite") && !a.correct && !a.self ? `<button class="btn" data-act="selfok" style="margin-top:10px;min-height:38px;font-size:14px">我的寫法也對（自己改成對）</button>` : "";
  return `<div class="feedback ${a.correct ? "ok" : "no"}"><span class="fb-ic">${a.correct ? I.check : I.x}</span><div style="min-width:0">
  <b>${a.correct ? (a.self ? "已改判為正確" : ["答對了！", "正確！", "漂亮！", "沒錯！"][Math.floor(Math.random() * 4)]) : "答錯了"}</b>
  ${a.correct ? "" : `<p>正確答案：<b style="display:inline;color:var(--ink)">${esc(correctText(q))}</b></p>`}
  <p>${esc(q.exp || "")}</p>${extra}${self}</div></div>`;
}

/* ---------- 作答動作 ---------- */
function work(i) { return S.work[i] || (S.work[i] = {}); }
function commit(resp, el) {
  const i = S.idx, X = getQ(i), q = X.q;
  if (S.ans[i] && !S.blind) return;
  const correct = grade(q, resp);
  if (S.blind) { S.ans[i] = { resp, correct, hint: false, t: Math.round(S.elapsed) }; S.tipSeen = true; save(); rerenderKeep(); return; }
  S.ans[i] = { resp, correct, hint: !!(S.work[i] && S.work[i].hint), t: Math.round(S.elapsed) };
  if (q.type === "match") S.ans[i].perm = work(i).perm;
  if (correct) { S.combo++; S.maxCombo = Math.max(S.maxCombo, S.combo); } else S.combo = 0;
  S.tipSeen = true; showHint = false;
  save();
  const sy = scrollY; render(); scrollTo(0, sy);
  const card = $("#qcard");
  if (correct) {
    sfxGood(S.combo);
    let target = card;
    if (isMC(q)) target = $(`.opt[data-k="${q.ans}"]`) || card;
    target.classList.add("pop");
    comboFX(S.combo, target);
    const cm = $("#combomini"); if (cm) { cm.style.transform = "scale(1.3)"; setTimeout(() => cm.style.transform = "", 220); }
  } else {
    sfxBad();
    const t = isMC(q) ? $(`.opt[data-k="${resp}"]`) : card;
    if (t) t.classList.add("shake");
  }
  const fb = $(".feedback"); if (fb) fb.classList.add("fresh");   // 只有剛作答時播一次
  if (fb && fb.getBoundingClientRect().bottom > innerHeight - 90) fb.scrollIntoView({ behavior: reduced() ? "auto" : "smooth", block: "center" });
}
function submitCurrent() {
  const i = S.idx, q = getQ(i).q, w = work(i);
  if (q.type === "spell") { const v = $("#spellin").value.trim(); if (!v) { toast("先填入字母"); return; } commit(v); }
  else if (q.type === "trans" || q.type === "rewrite") { const v = $("#transin").value.trim(); if (!v) { toast("先輸入英文句子"); return; } commit(v); }
  else if (q.type === "order") { if ((w.pick || []).length === q.items.length) commit(w.pick.slice()); }
  else if (q.type === "scramble") { if ((w.seq || []).length === q.tiles.length) commit(w.seq.slice()); }
  else if (q.type === "match") { const arr = q.left.map((_, k) => w.pairs[k]); if (arr.every(v => v !== undefined && v !== null)) commit(arr); }
  else if (q.type === "error") {
    if (w.tok === undefined || w.tok === null) { toast("先點出錯誤的字"); return; }
    const v = $("#errfix").value.trim(); if (!v) { toast("輸入改正後的字"); return; }
    commit({ tok: w.tok, fix: v });
  }
}
function rerenderKeep() { const sy = scrollY; render(); scrollTo(0, sy); }
function gotoQ(n) {
  if (typeof adaptAdvance === "function" && n > S.idx) adaptAdvance(n);
  if (n < 0 || n >= S.qs.length) return;
  S.idx = n; showHint = false; save(); animNext = true; stopReading();
  render(); window.scrollTo({ top: 0 });
}
function prepWork(i) {
  const q = getQ(i).q, w = work(i);
  if (q.type === "scramble" && !w.perm) { const n = q.tiles.length + (q.extra || []).length; let p; do { p = shuffle([...Array(n).keys()]); } while (n > 2 && p.every((v, k) => v === k)); w.perm = p; }
  if (q.type === "match" && !w.perm) { let p; do { p = shuffle(q.right.map((_, k) => k)); } while (p.some((v, k) => v === k) && Math.random() < .9); w.perm = p; w.pairs = w.pairs || {}; }
}

/* ---------- 交卷 ---------- */
function askFinish() {
  if (typeof adaptPending === "function" && adaptPending()) { gotoQ(S.qs.length); return; }
  const left = S.qs.length - Object.keys(S.ans).length;
  if (!left) return finish();
  sheet(`<h3>還有 ${left} 題沒作答</h3><p class="muted" style="margin:0 0 16px">沒作答的題目會算錯。要現在交卷嗎？</p>
  <div class="row" style="justify-content:flex-end"><button class="btn" data-act="close-sheet">繼續作答</button><button class="btn primary" data-act="finish-now">交卷</button></div>`);
}
/* 最長連續答對：依題目順序和最後的答案計算（正式考模式作答時不累計 combo，舊紀錄也靠這個補算） */
function streakOf(att) {
  let run = 0, best = 0;
  (att.qs || []).forEach((_, i) => { const a = (att.ans || {})[i]; if (a && a.correct) { run++; if (run > best) best = run; } else run = 0; });
  return best;
}
function attCombo(att) { return Math.max(att.maxCombo || 0, att.kind === "vocab" ? 0 : streakOf(att)) || att.maxCombo || 0; }
function finish() {
  const total = S.qs.length, ok = Object.values(S.ans).filter(a => a.correct).length;
  const att = {
    id: S.id, optv: S.optv, who: S.who || "未署名", kind: S.kind, title: S.title, banks: S.banks, date: Date.now(), duration: Math.round(S.elapsed),
    qs: S.qs, ans: S.ans, words: S.words, maxCombo: Math.max(S.maxCombo, S.blind ? streakOf(S) : 0), score: ok, total,
    hints: Object.values(S.work).filter(w => w.hint).length
  };
  store.attempts.unshift(att);
  if (typeof onAttemptSaved === "function") { try { onAttemptSaved(att); } catch (e) { } }
  // 單字本
  const VB = store.vocab[att.who] || (store.vocab[att.who] = {});
  Object.values(S.words).forEach(w => {
    const v = VB[w.k] || (VB[w.k] = { k: w.k, pos: w.pos, zh: w.zh, ph: !!w.ph, surf: w.surf || null, n: 0, ctx: [], ok: 0, miss: 0, first: Date.now() });
    v.n++; v.last = Date.now(); if (w.ctx && !v.ctx.includes(w.ctx)) v.ctx.unshift(w.ctx); v.ctx = v.ctx.slice(0, 3);
  });
  if (S.kind === "vocab") S.qs.forEach((q, i) => { const v = VB[q.word]; const a = S.ans[i]; if (v && a) a.correct ? v.ok++ : v.miss++; });
  store.sessions = store.sessions.filter(x => x.id !== S.id); S = null; save(true);
  go("result", att.id);
}

/* ================= 單字 ================= */
function sentenceOf(el, word) {
  const box0 = el.closest("[data-ctx]"); if (!box0) return "";
  const box = box0.cloneNode(true);
  box.querySelectorAll(".spk").forEach(x => x.remove());
  box.querySelectorAll(".blank:not(.filled)").forEach(x => x.textContent = "___");
  box.querySelectorAll(".cz").forEach(x => x.textContent = " ___ ");
  const txt = box.textContent.replace(/\s+/g, " ").trim();
  const sents = txt.match(/[^.!?]+[.!?"]*/g) || [txt];
  const re = new RegExp("\\b" + word.replace(/[^a-z'-]/gi, "") + "\\b", "i");
  return (sents.find(s => re.test(s)) || txt).trim().slice(0, 180);
}
function markPhrase(el) {
  const k = el.dataset.p, ph = PHR[k]; const grp = el.dataset.g;
  const parts = [...document.querySelectorAll(`[data-g="${grp}"]`)];
  const surf = parts.map(x => x.textContent);
  if (!S.words[k]) {
    S.words[k] = { k, pos: "phr.", zh: ph.zh, ph: true, surf, ctx: sentenceOf(el, surf[0]), surface: surf.join(" "), q: S.idx };
    document.querySelectorAll(`[data-p="${CSS.escape(k)}"]`).forEach(x => x.classList.add("marked"));
    save();
  }
  showPop(el, k, true, true);
}
function markWord(el) {
  if (el.dataset.p && !el._single) return markPhrase(el);
  const k = el.dataset.k; const surface = el.textContent;
  const r = lookup(surface) || { key: k, entry: DICT[k] };
  const e = r.entry || DICT[k];
  const has = !!S.words[k];
  if (!has) {
    S.words[k] = { k, pos: e ? e.pos : "", zh: e ? e.zh : "（字典未收錄）", ctx: sentenceOf(el, surface), surface, q: S.idx };
    document.querySelectorAll(`.w[data-k="${CSS.escape(k)}"]`).forEach(x => x.classList.add("marked"));
    save();
  }
  showPop(el, k, true);
}
let popEl = null;
function showPop(el, k, inSession, isPh) {
  closePop(); popEl = el;
  const e = (isPh ? PHR[k] : DICT[k]) || (inSession && S.words[k]) || { pos: "", zh: "（字典未收錄）" };
  const p = document.createElement("div"); p.className = "wpop glass"; p.id = "wpop";
  const marked = inSession && S.words[k];
  p.innerHTML = `<div class="wh"><div><span class="ww">${esc(k)}</span><span class="wpos">${esc(e.pos)}</span></div><button class="speak" data-act="speak" data-w="${esc(k)}" aria-label="發音">${I.speaker}</button></div>
  <div class="wzh">${esc(e.zh)}</div>
  ${isPh ? `<div class="muted" style="font-size:13px;margin:-4px 0 10px">片語・整組加入</div>` : ""}
  ${inSession ? `<div class="wact">${marked ? `<span class="tag mark-tag">已加入生字表</span><button class="btn ghost" data-act="w-unmark" data-k="${esc(k)}">移除</button>` : ""}${isPh ? `<button class="btn ghost" data-act="w-single">只加「${esc(el.textContent)}」</button>` : ""}<button class="btn ghost" data-act="w-close" style="margin-left:auto">關閉</button></div>` : ""}`;
  document.body.appendChild(p);
  const r = el.getBoundingClientRect(); const pr = p.getBoundingClientRect();
  let left = Math.min(Math.max(12, r.left + r.width / 2 - pr.width / 2), innerWidth - pr.width - 12);
  let top = r.bottom + 10; if (top + pr.height > innerHeight - 90) top = Math.max(12, r.top - pr.height - 10);
  p.style.left = left + "px"; p.style.top = top + "px";
}

/* ---------- 單字練習生成 ---------- */
function distractors(k, field, n, ph) {
  const pos0 = ph ? "phr" : (DICT[k] && DICT[k].pos || "").split(/[./]/)[0];
  const pool = ph ? shuffle(PHRASES.filter(p => p.k !== k).map(p => ({ w: p.k, zh: p.zh, pos: "phr." })))
    : shuffle(Object.values(DICT).filter(e => e.w !== k && e.zh !== "人名" && !/[A-Z]/.test(e.zh) && e.w.length > 2));
  const same = pool.filter(e => e.pos.split(/[./]/)[0] === pos0), rest = pool.filter(e => e.pos.split(/[./]/)[0] !== pos0);
  const out = []; const seen = new Set([DICT[k] ? DICT[k][field] : k]);
  for (const e of same.concat(rest)) { if (out.length >= n) break; if (seen.has(e[field])) continue; seen.add(e[field]); out.push(e[field]); }
  return out;
}
function makeDrill(words, max) {
  const items = [];
  const kinds = ["en2zh", "ctx", "zh2en", "spell"];
  const list = shuffle(words);
  const per = list.length < 6 ? 2 : 1;
  list.forEach((w, wi) => {
    const ph = !!(w.ph || PHR[w.k]);
    const e = (ph ? PHR[w.k] && { w: w.k, pos: "phr.", zh: PHR[w.k].zh } : DICT[w.k]) || { w: w.k, pos: w.pos, zh: w.zh };
    const ks = ph ? shuffle(["en2zh", "zh2en"]).slice(0, per) : shuffle(kinds.filter(x => x !== "ctx" || (w.ctx && new RegExp("\\b" + (w.surface || w.k) + "\\b", "i").test(w.ctx)))).slice(0, per);
    ks.forEach(kind => {
      const id = "v-" + uid();
      if (kind === "en2zh") {
        const opts = shuffle([e.zh, ...distractors(w.k, "zh", 3, ph)]);
        items.push({ id, type: "mc", tag: "vocab-drill", word: w.k, zhOpts: true, stem: `What does "${w.k}" mean?`, opts, ans: opts.indexOf(e.zh), hint: `詞性：${e.pos}`, exp: `${w.k}（${e.pos}）${e.zh}` });
      } else if (kind === "zh2en") {
        const opts = shuffle([w.k, ...distractors(w.k, "w", 3, ph)]);
        items.push({ id, type: "mc", tag: "vocab-drill", word: w.k, stem: `「${e.zh}」的英文是哪一個？`, opts, ans: opts.indexOf(w.k), hint: `開頭字母是 ${w.k[0]}`, exp: `${e.zh} = ${w.k}（${e.pos}）` });
      } else if (kind === "spell") {
        items.push({ id, type: "spell", tag: "vocab-drill", word: w.k, zhPrompt: `${e.zh}（${e.pos}）`, stem: "___", ans: w.k, hint: `共 ${w.k.length} 個字母`, exp: `${w.k}（${e.pos}）${e.zh}` });
      } else {
        const surf = (w.ctx.match(new RegExp("\\b" + (w.surface || w.k) + "\\b", "i")) || [w.surface])[0];
        items.push({ id, type: "spell", tag: "vocab-drill", word: w.k, stem: w.ctx.replace(/_{3,}/g, "…").replace(new RegExp("\\b" + surf + "\\b", "i"), "___"), ans: surf, hint: `意思：${e.zh}`, exp: `${surf}：${w.k}（${e.pos}）${e.zh}` });
      }
    });
  });
  return shuffle(items).slice(0, max || items.length);
}
function startDrill(words, title, who) {
  if (!words.length) { toast("還沒有生字"); return; }
  const items = makeDrill(words, 30);
  newSession(items, { kind: "vocab", who: who || store.who, title: title || "單字練習" });
}
function vocabOwner() {
  const names = Object.keys(store.vocab).filter(n => Object.keys(store.vocab[n] || {}).length);
  if (store.vocabWho && names.includes(store.vocabWho)) return store.vocabWho;
  if (names.includes(store.who)) return store.who;
  return names[0] || store.who || "未署名";
}

/* ================= 結果 / 解析 ================= */
function scoreColor(p) { return p >= .85 ? "var(--good)" : p >= .6 ? "var(--gold)" : "var(--bad)"; }
function resultHTML(id) {
  const att = findAtt(id);
  if (!att) return `<section class="view"><div class="glass card empty"><b>找不到這筆紀錄</b><button class="btn" data-act="tab" data-v="hist">回紀錄</button></div></section>`;
  const p = att.total ? att.score / att.total : 0;
  const C = 2 * Math.PI * 70;
  const hintCount = Object.values(att.ans).filter(a => a.hint).length;
  let h = `<section class="view"><div class="row" style="justify-content:space-between"><button class="btn ghost" data-act="tab" data-v="${resultBack}">${I.chevL}${resultBack === "teacher" ? "總覽" : "紀錄"}</button><span class="muted" style="font-size:14px">${fmtDate(att.date)}</span></div>
  <div><div class="eyebrow">${att.kind === "vocab" ? "單字練習" : "作答結果"}・作答人 ${esc(att.who || "未署名")}</div><h1 class="large-title" style="font-size:clamp(26px,5vw,36px)">${esc(att.title)}</h1></div>
  <div class="glass card res-top"><div class="ring-score"><svg viewBox="0 0 160 160"><circle cx="80" cy="80" r="70" fill="none" stroke="var(--edge)" stroke-width="12"/>
  <circle cx="80" cy="80" r="70" fill="none" stroke="${scoreColor(p)}" stroke-width="12" stroke-linecap="round" stroke-dasharray="${C * p} ${C}"/></svg>
  <div class="lbl"><div><div class="big tnum">${Math.round(p * 100)}</div><div class="small">${att.score} / ${att.total} 題答對</div></div></div></div>
  <div class="stats"><div class="stat"><div class="k">用時</div><div class="v">${fmtTime(att.duration)}</div></div>
  <div class="stat"><div class="k">最高 Combo</div><div class="v" style="color:var(--gold)">×${attCombo(att)}</div></div>
  <div class="stat"><div class="k">用了提示</div><div class="v">${hintCount}</div></div>
  <div class="stat"><div class="k">生字</div><div class="v">${Object.keys(att.words || {}).length}</div></div></div></div>`;
  if (typeof toeflBandHTML === "function") h += toeflBandHTML(att);
  // 細項分析
  if (att.kind !== "vocab") {
    const by = {};
    att.qs.forEach((r, i) => { const X = getQ(i, att); if (!X) return; const t = tagName(X.bank, X.q.tag); by[t] = by[t] || [0, 0]; by[t][1]++; if (att.ans[i] && att.ans[i].correct) by[t][0]++; });
    h += `<div class="glass card" style="display:flex;flex-direction:column;gap:14px"><div class="section-h" style="margin:0"><h2>各細項答對率</h2></div><div class="tagbars">${Object.entries(by).sort((a, b) => a[1][0] / a[1][1] - b[1][0] / b[1][1]).map(([t, [o, n]]) =>
      `<div class="tb-row"><span>${esc(t)}</span><span class="track"><i style="width:${o / n * 100}%;background:${scoreColor(o / n)}"></i></span><span class="pct">${o}/${n}</span></div>`).join("")}</div></div>`;
  }
  // 單字表
  const words = Object.values(att.words || {});
  h += `<div class="glass card" style="display:flex;flex-direction:column;gap:14px"><div class="section-h" style="margin:0;flex-wrap:wrap"><h2>這次的生字表</h2>
  ${words.length ? `<button class="btn primary" data-act="drill-att" data-id="${esc(att.id)}">${I.play}用這些字練習</button>` : ""}</div>
  ${words.length ? vtable(words.map(w => ({ k: w.k, pos: w.pos, zh: w.zh, ctx: w.ctx ? [w.ctx] : [] }))) : `<div class="muted">這次沒有標記生字。作答時點一下不會的單字，就會出現在這裡。</div>`}</div>`;
  // 解析
  const wrong = att.qs.map((_, i) => i).filter(i => !(att.ans[i] && att.ans[i].correct));
  h += `<div class="section-h"><h2>完整解析</h2>${wrong.length && att.kind !== "vocab" ? `<button class="btn" data-act="retry-wrong" data-id="${esc(att.id)}">${I.redo}錯題再練（${wrong.length}）</button>` : ""}</div>
  <div class="seg" style="align-self:flex-start"><button data-act="rv-filter" data-v="all" aria-pressed="${!rvWrongOnly}">全部</button><button data-act="rv-filter" data-v="wrong" aria-pressed="${rvWrongOnly}">只看錯題（${wrong.length}）</button></div>
  <div class="rv-list">${att.qs.map((r, i) => reviewItem(att, i)).filter((x, i) => !rvWrongOnly || wrong.includes(i)).join("")}</div>`;
  h += `<div class="row" style="justify-content:center;margin-top:8px"><button class="btn" data-act="tab" data-v="home">${I.home}回首頁</button></div></section>`;
  return h;
}
let rvWrongOnly = false;
function reviewItem(att, i) {
  const X = getQ(i, att);
  if (!X) return `<details class="rv"><summary><span class="st skip">?</span><span class="sum">題目已從題庫移除</span></summary></details>`;
  const q = X.q, a = att.ans[i];
  const st = !a ? "skip" : a.correct ? "ok" : "no";
  const sumText = q.type === "cword" ? `${X.group.title}・第 ${q.blank} 格` : q.type === "speak" ? q.text : q.type === "listen" ? `${tagName(X.bank, q.tag)}・${(q.part === 1 ? listenScript(q)[0] : listenScript(q).slice(-1)[0]) || ""}` : q.zh || q.zhPrompt || q.prompt || (q.src ? [].concat(q.src).join(" ") : "") || (q.blank ? `${X.group.title}・第 ${q.blank} 格` : [].concat(q.stem || q.sent || "").join(" "));
  const typeL = X.ftype === "vocab" ? "單字" : X.group && KIND_LABEL[X.group.kind] ? KIND_LABEL[X.group.kind] : TYPE_LABEL[X.ftype];
  let body = "";
  if (X.group && X.group.kind === "listening") body += `<details class="pfold"><summary><span class="muted">聽力原文：${esc(X.group.title)}</span>${I.chevR.replace("<svg", '<svg width="16" height="16"')}</summary><div class="ptext dialogue" style="margin-top:8px;font-size:15.5px">${listenGroupScript(X.group).map(l => `<p>${esc(l)}</p>`).join("")}</div></details>`;
  else if (X.group && X.group.kind === "ctest") body += `<div class="ptext" style="font-size:15.5px">${esc(X.group.passage[0].replace(/\{([^}]*)\}/g, "$1"))}</div>`;
  else if (X.group) body += `<details class="pfold"><summary><span class="muted">題組：${esc(X.group.title)}（展開文章）</span>${I.chevR.replace("<svg", '<svg width="16" height="16"')}</summary><div class="ptext ${X.group.kind}" style="margin-top:8px;font-size:15.5px">${X.group.passage.map(p => `<p>${esc(p).replace(/\[\[(\d)\]\]/g, '<span class="cz">$1</span>')}</p>`).join("")}</div></details>`;
  body += `<div>${questionReview(q)}</div>`;
  body += `<dl class="kv"><dt>你的答案</dt><dd class="${a && a.correct ? "ans-ok" : "ans-no"}" style="${a && a.correct ? "" : "text-decoration:none"}">${esc(respText(q, a))}${a && a.self ? "（自評正確）" : ""}${a && a.hint ? ` <span class="tag">用了提示</span>` : ""}</dd>
  <dt>正確答案</dt><dd class="ans-ok">${esc(correctText(q))}</dd>
  ${q.type === "trans" || q.type === "rewrite" ? `<dt>可接受</dt><dd class="muted" style="font-size:14px">${q.ans.map(x => esc(x).replace(/\{([^}]*)\}/g, (m, g) => `[${g.split("|").map(s => s || "∅").join(" / ")}]`)).join("<br>")}</dd>` : ""}
  ${q.exp ? `<dt>解析</dt><dd>${esc(q.exp)}</dd>` : ""}
  ${q.hint ? `<dt>提示</dt><dd class="muted">${esc(q.hint)}</dd>` : ""}</dl>`;
  if ((q.type === "trans" || q.type === "rewrite") && a && !a.correct) body += diffHTML(q, a.resp);
  if (q.type === "speak" && a && a.resp && a.resp.rec && store.teacherCode) body += `<button class="btn" data-act="rec-fetch" data-att="${esc(att.id)}" data-i="${i}">${I.play}播放學生錄音</button>`;
  return `<details class="rv"><summary><span class="st ${st}">${st === "ok" ? I.check : st === "no" ? I.x : "–"}</span><span class="tag">${i + 1}</span><span class="sum">${esc(sumText)}</span><span class="tag">${typeL}</span><span class="chev">${I.chevR.replace("<svg", '<svg width="16" height="16"')}</span></summary><div class="rv-body">${body}</div></details>`;
}
function questionReview(q) {
  const opts = q.opts ? `<ol type="A" style="margin:6px 0 0;padding-left:26px">${q.opts.map((o, k) => `<li style="${k === q.ans ? "color:var(--good);font-weight:700" : ""}">${esc(o)}</li>`).join("")}</ol>` : "";
  if (q.type === "listen") return `${q.img ? `<div class="limg ${q.part === 4 ? "tri" : ""}" style="max-width:420px"><img src="${esc(q.img)}" alt="" onerror="this.parentNode.remove()">${q.part === 4 ? "<span>A</span><span>B</span><span>C</span>" : ""}</div>` : ""}<div class="script">${listenScript(q).map(l => `<div>${esc(l)}</div>`).join("")}</div>${q.part === 1 ? "" : opts}`;
  if (isMC(q)) return `${q.blank ? `<b>第 ${q.blank} 格</b>` : [].concat(q.stem).map(l => `<div>${esc(l)}</div>`).join("")}${q.box ? `<div class="boxed" style="font-size:15px;margin-top:6px">${q.box.map(esc).join("<br>")}</div>` : ""}${q.post ? `<div>${esc(q.post)}</div>` : ""}${opts}`;
  if (q.type === "order") return `<div>${esc(q.stem)}</div><div style="margin-top:6px">${q.items.map((t, k) => `<div><b>${"abcd"[k]}.</b> ${esc(t)}</div>`).join("")}</div>`;
  if (q.type === "spell") return `${q.zhPrompt ? `<div>${esc(q.zhPrompt)}</div>` : ""}<div>${esc(q.stem).replace("___", `<b>${esc(spellParts(q.ans).first)}____${esc(spellParts(q.ans).last)}</b>`)}</div>`;
  if (q.type === "trans") return `<div style="font-weight:650">${esc(q.zh)}</div>`;
  if (q.type === "rewrite") return `<div class="muted">${esc(q.instr)}</div>${[].concat(q.src).map(s => `<div style="font-weight:650">${esc(s)}</div>`).join("")}`;
  if (q.type === "essay") return `<div>${esc(q.prompt)}</div>${q.scenario ? `<div class="muted">${esc(q.scenario)}</div>` : ""}${(q.bullets || []).map(b => `<div class="muted">• ${esc(b)}</div>`).join("")}${(q.posts || []).map(([w, t]) => `<div class="muted"><b>${esc(w)}：</b>${esc(t)}</div>`).join("")}${(q.scenes || []).map((s, k) => `<div class="muted">${k + 1}. ${esc(s)}</div>`).join("")}<div style="margin-top:8px"><b>參考範文：</b>${esc(q.model)}</div>`;
  if (q.type === "scramble") return `${q.ctx ? `<div>${esc(q.ctx)}</div>` : ""}<div style="font-weight:650">${esc(q.zh || "")}</div><div class="muted">${q.tiles.concat(q.extra || []).map(esc).join(" / ")}</div>`;
  if (q.type === "cword") return `<div>${esc(q.pre)}<b>${"_".repeat(q.miss.length)}</b></div>`;
  if (q.type === "speak") return `${q.scenario ? `<div class="muted">${esc(q.scenario)}</div>` : ""}<div style="font-weight:650">${esc(q.text)}</div>${q.model ? `<div style="margin-top:8px"><b>參考回答：</b>${esc(q.model)}</div>` : ""}`;
  if (q.type === "match") return `<div>${esc(q.stem)}</div>`;
  if (q.type === "error") return `<div style="font-weight:650">${esc(q.sent)}</div>`;
  return "";
}
function vtable(rows, opts = {}) {
  return `<div class="vtable-wrap"><table class="vtable"><thead><tr><th></th><th>單字</th><th>詞性</th><th>中文</th><th>出現的句子</th>${opts.extra ? "<th>練習</th><th></th>" : ""}</tr></thead><tbody>
  ${rows.map(w => {
    const ctx = (w.ctx || [])[0] || "";
    let hl = esc(ctx);
    const words = (w.surf && w.surf.length ? w.surf : [w.k]).map(x => x.replace(/[^a-z'-]/gi, "")).filter(Boolean);
    if (ctx) words.forEach(x => { hl = hl.replace(new RegExp("\\b(" + x + (w.surf ? "" : "\\w*") + ")\\b", "i"), "<mark>$1</mark>"); });
    return `<tr><td><button class="speak" data-act="speak" data-w="${esc(w.k)}" aria-label="念 ${esc(w.k)}">${I.speaker}</button></td><td class="vw">${esc(w.k)}</td><td class="vp">${esc(w.pos)}</td><td>${esc(w.zh)}</td><td class="vc">${hl}</td>
    ${opts.extra ? `<td class="tnum muted" style="white-space:nowrap"><span style="color:var(--good)">✓${w.ok || 0}</span> <span style="color:var(--bad)">✗${w.miss || 0}</span></td><td><button class="btn ghost" style="min-height:34px;font-size:13px;padding:0 12px" data-act="vremove" data-k="${esc(w.k)}">記住了</button></td>` : ""}</tr>`;
  }).join("")}</tbody></table></div>`;
}

/* ================= 紀錄 ================= */
function histItem(a) {
  const p = a.total ? a.score / a.total : 0;
  return `<button class="hitem" data-act="open-att" data-id="${esc(a.id)}"><span class="hs" style="background:color-mix(in srgb,${scoreColor(p)} 16%,transparent);color:${scoreColor(p)}">${Math.round(p * 100)}</span>
  <span class="hm"><span class="ht" style="display:block"><span class="tag who-tag">${esc(a.who || "未署名")}</span> ${esc(a.title)}</span><span class="hd tnum">${fmtDate(a.date)}・${a.score}/${a.total} 題・${fmtTime(a.duration)}・Combo ×${attCombo(a)}・生字 ${Object.keys(a.words || {}).length}</span></span>
  <span style="color:var(--ink-3)">${I.chevR.replace("<svg", '<svg width="18" height="18"')}</span></button>`;
}
function whoChips(act, cur, names) {
  if (names.length < 2 && act === "vocab-who") return "";
  return `<div class="chips">${act === "hist-who" ? `<button class="chip" data-act="${act}" data-n="" aria-pressed="${!cur}">全部</button>` : ""}${names.map(n => `<button class="chip" data-act="${act}" data-n="${esc(n)}" aria-pressed="${cur === n}">${esc(n)}</button>`).join("")}</div>`;
}
function histHTML() {
  const names = [...new Set(store.attempts.map(a => a.who || "未署名"))];
  if (store.histWho && !names.includes(store.histWho)) store.histWho = "";
  const list = store.attempts.filter(a => !store.histWho || (a.who || "未署名") === store.histWho);
  let h = `<section class="view"><div><div class="eyebrow">History</div><h1 class="large-title">作答紀錄</h1><p class="subtitle">點任何一筆就能看完整解析和當次的生字表。</p></div>`;
  if (names.length > 1) h += whoChips("hist-who", store.histWho, names);
  if (!list.length) h += `<div class="glass card empty"><b>還沒有紀錄</b>完成第一次練習後，成績和解析都會存在這裡。</div>`;
  else {
    const avg = list.filter(a => a.kind === "exam").map(a => a.score / a.total);
    if (avg.length) h += `<div class="stats"><div class="stat glass"><div class="k">練習次數</div><div class="v">${list.length}</div></div><div class="stat glass"><div class="k">平均答對率</div><div class="v">${Math.round(avg.reduce((s, x) => s + x, 0) / avg.length * 100)}%</div></div><div class="stat glass"><div class="k">最佳 Combo</div><div class="v" style="color:var(--gold)">×${Math.max(...list.map(attCombo))}</div></div><div class="stat glass"><div class="k">作答人</div><div class="v">${names.length}</div></div></div>`;
    h += `<div class="glass card hist">${list.map(a => `<div style="display:flex;gap:8px;align-items:center">${histItem(a)}<button class="icon-btn" data-act="del-att" data-id="${esc(a.id)}" aria-label="刪除這筆" style="flex:none;background:transparent;box-shadow:none;color:var(--ink-3)">${I.x}</button></div>`).join("")}</div>`;
  }
  h += `
  ${typeof syncHistHTML === "function" ? syncHistHTML() : ""}`;
  return h + `</section>`;
}

/* ================= 單字本 ================= */
function vocabHTML() {
  const owner = vocabOwner();
  const names = Object.keys(store.vocab).filter(n => Object.keys(store.vocab[n] || {}).length);
  const list = Object.values(store.vocab[owner] || {}).sort((a, b) => (b.last || 0) - (a.last || 0));
  let h = `<section class="view"><div><div class="eyebrow">Word Bank</div><h1 class="large-title">${names.length ? esc(owner) + " 的單字本" : "單字本"}</h1><p class="subtitle">每次作答標記的生字和片語都會收進來。練到會了就按「記住了」。</p></div>${whoChips("vocab-who", owner, names)}`;
  if (!list.length) return h + `<div class="glass card empty"><b>單字本是空的</b>作答時點一下不會的單字，交卷後就會出現在這裡。</div></section>`;
  h += `<div class="glass card" style="display:flex;flex-direction:column;gap:14px"><div class="start-bar"><div class="muted tnum">共 <b style="color:var(--ink);font-size:18px">${list.length}</b> 個生字</div>
  <div class="row"><button class="btn" data-act="drill-weak">練最常錯的 10 個</button><button class="btn primary" data-act="drill-all">${I.play}全部練習</button></div></div>
  <div class="muted" style="font-size:13.5px">單字練習會自動出四種題：看英文選中文、看中文選英文、拼字、回到原本句子裡填空。</div>
  ${vtable(list, { extra: true })}</div>`;
  return h + `</section>`;
}

/* ================= 事件 ================= */
document.addEventListener("click", e => {
  const pop = $("#wpop");
  const w = e.target.closest(".w");
  const act = e.target.closest("[data-act]");
  if (pop && !e.target.closest("#wpop") && !w) closePop();

  // 點單字
  if (w && view === "quiz" && S) {
    const inOpt = w.closest(".opt-main, .mitem, .order-item, .tile");
    const locked = !!S.ans[S.idx];
    if (!inOpt || wordMode || locked) { e.preventDefault(); e.stopPropagation(); markWord(w); return; }
  } else if (w && view !== "quiz") { showPop(w, w.dataset.p || w.dataset.k, false, !!w.dataset.p); return; }

  if (!act) return;
  const A = act.dataset.act, d = act.dataset;
  const sel = store.sel;
  switch (A) {
    case "tab": go(d.v); break;
    case "sound": store.settings.sound = !store.settings.sound; save(); render(); if (store.settings.sound) tone(880, 0, .15); break;
    case "bank": {
      const i = sel.banks.indexOf(d.id), nb = bankById(d.id);
      if (i >= 0) sel.banks.splice(i, 1);
      else if (!sel.multi) { sel.banks = [d.id]; sel.tags = Object.keys(nb.tags); }   // 單選：換成這一冊
      else { sel.banks.push(d.id); Object.keys(nb.tags).forEach(t => { if (!sel.tags.includes(t)) sel.tags.push(t); }); }
      save(); rerenderKeep(); break;
    }
    case "multi": sel.multi = !sel.multi; if (!sel.multi && sel.banks.length > 1) { sel.banks = sel.banks.slice(-1); toast("已改回單選，只保留最後選的範圍"); } save(); rerenderKeep(); break;
    case "gmock": sel.gMock = +d.v; sel.mode = +d.v ? "exam" : "custom"; save(); rerenderKeep(); break;
    case "gpart": sel.gPart = +d.v; save(); rerenderKeep(); break;
    case "exam-pick": {
      const b = bankById(d.id); const own = Object.keys(b.tags);
      sel.tags = sel.tags.filter(t => !own.includes(t)).concat(d.i === "all" ? own : b.exams[+d.i].tags);
      save(); rerenderKeep(); break;
    }
    case "tag": { const i = sel.tags.indexOf(d.k); if (i >= 0) sel.tags.splice(i, 1); else sel.tags.push(d.k); save(); rerenderKeep(); break; }
    case "type": { const i = sel.types.indexOf(d.t); if (i >= 0) sel.types.splice(i, 1); else sel.types.push(d.t); save(); rerenderKeep(); break; }
    case "mode": sel.mode = d.v; if (d.v === "exam") TYPE_ORDER.slice(0, 5).forEach(t => { if (!sel.types.includes(t)) sel.types.push(t); }); save(); rerenderKeep(); break;
    case "count": sel.count = +d.v; save(); rerenderKeep(); break;
    case "order": sel.order = d.v; save(); rerenderKeep(); break;
    case "start": {
      if (!sel.banks.length) { toast("先勾選一個考試範圍"); break; }
      const refs = buildRefs(sel); if (!refs.length) { toast("這個範圍沒有題目"); break; }
      const nm = (($("#who") || {}).value || store.who || "").trim();
      if (!nm) { toast("請先輸入作答人名字"); const f = $("#who"); if (f) { f.focus(); f.scrollIntoView({ block: "center" }); } break; }
      store.who = nm; store.names = [nm, ...store.names.filter(n => n !== nm)].slice(0, 8);
      const titles = sel.banks.map(id => bankById(id).title).join("＋");
      // 英檢模擬考：照正式考試時間倒數（閱讀 35 分、寫作 40 分）
      let limit = 0;
      const gm = geptMock(sel);
      if (gm) (gm.bank.timeLimits || []).forEach(([tags, min]) => { if (tags.some(t => gm.tags.includes(t))) limit += min * 60; });
      else if (sel.mode === "exam") sel.banks.map(bankById).forEach(b => (b.timeLimits || []).forEach(([tags, min]) => { if (tags.some(t => sel.tags.includes(t))) limit += min * 60; }));
      const blind = !!gm && gm.blind;
      const opts = { kind: "exam", limit, blind, adaptive: gm && gm.adaptive ? adaptivePlan(gm) : null, title: gm ? `${titles}・正式模擬卷 ${gm.n}・${gm.name.replace(/（.*?）/, "")}` : `${titles}・${sel.mode === "exam" ? (limit ? "模擬測驗" : "模擬段考") : "自訂練習"}`, banks: gm ? [gm.bank.id] : sel.banks.slice() };
      // 這個名字在這台裝置還沒有個人代碼 → 先登記（名字被別人用了就請他輸入代碼）
      if (typeof ensureCode === "function" && !store.codes[nm]) { act.disabled = true; ensureCode(nm).then(ok => { act.disabled = false; if (ok) newSession(refs, opts); }); }
      else newSession(refs, opts);
      break;
    }
    case "resume": S = store.sessions.find(x => x.id === d.id); if (S) { if (S.who) store.who = S.who; wordMode = false; showHint = false; go("quiz"); } break;
    case "discard": sheet(`<h3>刪除這份存檔？</h3><p class="muted" style="margin:0 0 16px">還沒交卷的答案和生字都不會保存。</p><div class="row" style="justify-content:flex-end"><button class="btn" data-act="close-sheet">取消</button><button class="btn danger" data-act="discard-now" data-id="${d.id}">刪除</button></div>`); break;
    case "discard-now": store.sessions = store.sessions.filter(x => x.id !== d.id); save(true); closeSheet(); render(); break;
    case "pick-who": store.who = d.n; save(); rerenderKeep(); break;
    case "save-now": S.saved = Date.now(); save(true); toast("已存檔，下次在首頁「繼續作答」接著做"); break;
    case "hist-who": store.histWho = d.n; save(); rerenderKeep(); break;
    case "vocab-who": store.vocabWho = d.n; save(); rerenderKeep(); break;
    case "close-sheet": closeSheet(); break;

    // quiz
    case "opt": if (S && (!S.ans[S.idx] || S.blind)) { const st = work(S.idx).struck || []; if (st.includes(+d.k)) { toast("這個選項已劃掉，先取消劃掉再選"); break; } commit(+d.k); } break;
    case "strike": { const w2 = work(S.idx); const st = w2.struck || (w2.struck = []); const k = +d.k; const i = st.indexOf(k); if (i >= 0) st.splice(i, 1); else st.push(k); save(); const el = act.closest(".opt"); el.classList.toggle("struck"); break; }
    case "prev": gotoQ(S.idx - 1); break;
    case "next": gotoQ(S.idx + 1); break;
    case "hint": showHint = !showHint; if (showHint && !S.ans[S.idx]) work(S.idx).hint = true; save(); rerenderKeep(); break;
    case "wordmode": wordMode = !wordMode; toast(wordMode ? "生字模式：點任何單字都會加入生字表" : "已關閉生字模式"); rerenderKeep(); break;
    case "grid": {
      sheet(`<h3>題號</h3><div class="grid-nums">${S.qs.map((_, i) => { const a = S.ans[i]; return `<button class="gn ${a ? (S.blind ? "done" : a.correct ? "ok" : "no") : ""} ${i === S.idx ? "cur" : ""}" data-act="goto" data-i="${i}">${i + 1}</button>`; }).join("")}</div>
      <div class="legend">${S.blind ? `<span><i style="background:var(--accent)"></i>已作答</span>` : `<span><i style="background:var(--good)"></i>答對</span><span><i style="background:var(--bad)"></i>答錯</span>`}<span><i style="background:var(--glass-hi);box-shadow:inset 0 0 0 1px var(--edge)"></i>未作答</span></div>
      <div class="row" style="justify-content:flex-end;margin-top:16px"><button class="btn primary" data-act="finish">交卷</button></div>`);
      break;
    }
    case "goto": closeSheet(); gotoQ(+d.i); break;
    case "exit": sheet(`<h3>要離開嗎？</h3><p class="muted" style="margin:0 0 16px">選「暫存離開」之後可以從首頁繼續。</p><div class="row" style="justify-content:flex-end"><button class="btn" data-act="close-sheet">繼續作答</button><button class="btn" data-act="save-exit">暫存離開</button><button class="btn primary" data-act="finish">交卷</button></div>`); break;
    case "save-exit": S.saved = Date.now(); save(true); S = null; go("home"); toast("已存檔"); break;
    case "finish": closeSheet(); askFinish(); break;
    case "finish-now": closeSheet(); finish(); break;
    case "submit": submitCurrent(); break;
    case "essay-submit": { const w2 = work(S.idx); w2.val = $("#essayin").value; if (wcount(w2.val) < 5) { toast("先寫幾句再看範文"); break; } w2.submitted = true; save(); rerenderKeep(); break; }
    case "essay-rate": { const w2 = work(S.idx); commit({ text: w2.val, rate: d.v }); break; }
    case "selfok": { const a = S.ans[S.idx]; a.correct = true; a.self = true; save(); rerenderKeep(); break; }
    case "opick": { const w2 = work(S.idx); const p = w2.pick || (w2.pick = []); const k = +d.k; const i = p.indexOf(k); if (i >= 0) p.splice(i); else p.push(k); save(); rerenderKeep(); break; }
    case "order-reset": work(S.idx).pick = []; save(); rerenderKeep(); break;
    case "tile": { const w2 = work(S.idx); (w2.seq || (w2.seq = [])).push(+d.k); save(); rerenderKeep(); break; }
    case "slot": { const w2 = work(S.idx); w2.seq.splice(+d.k, 1); save(); rerenderKeep(); break; }
    case "scr-reset": work(S.idx).seq = []; save(); rerenderKeep(); break;
    case "m-left": { const w2 = work(S.idx); const k = +d.k; if (w2.pairs[k] !== undefined && w2.pairs[k] !== null) { delete w2.pairs[k]; w2.selL = null; } else w2.selL = w2.selL === k ? null : k; save(); rerenderKeep(); break; }
    case "m-right": {
      const w2 = work(S.idx); const r = +d.k;
      const owner = Object.keys(w2.pairs).find(l => w2.pairs[l] === r);
      if (owner !== undefined) { delete w2.pairs[owner]; save(); rerenderKeep(); break; }
      if (w2.selL === null || w2.selL === undefined) { toast("先點左邊的項目"); break; }
      w2.pairs[w2.selL] = r; w2.selL = null; save(); rerenderKeep(); break;
    }
    case "m-reset": { const w2 = work(S.idx); w2.pairs = {}; w2.selL = null; save(); rerenderKeep(); break; }
    case "etok": { const w2 = work(S.idx); w2.tok = +d.k; const f = $("#errfix"); w2.fix = f ? f.value : ""; save(); rerenderKeep(); setTimeout(() => { const f2 = $("#errfix"); if (f2) f2.focus(); }, 30); break; }

    // popover
    case "speak": speak(d.w); break;
    case "w-close": closePop(); break;
    case "w-unmark": delete S.words[d.k]; document.querySelectorAll(`.w[data-k="${CSS.escape(d.k)}"], [data-p="${CSS.escape(d.k)}"]`).forEach(x => { if (!x.dataset.p || x.dataset.p === d.k) x.classList.remove("marked"); }); save(); closePop(); break;
    case "w-single": if (popEl) { const el = popEl; closePop(); el._single = true; markWord(el); el._single = false; } break;

    // results
    case "open-att": rvWrongOnly = false; resultBack = view === "teacher" ? "teacher" : "hist"; go("result", d.id); break;
    case "rv-filter": rvWrongOnly = d.v === "wrong"; rerenderKeep(); break;
    case "drill-att": { const att = findAtt(d.id); startDrill(Object.values(att.words || {}), "單字練習・" + att.title.split("・")[0], att.who); break; }
    case "retry-wrong": {
      const att = findAtt(d.id);
      const refs = att.qs.filter((r, i) => !(att.ans[i] && att.ans[i].correct));
      newSession(refs, { kind: "exam", who: att.who, title: "錯題重練・" + att.title.split("・")[0], banks: att.banks });
      break;
    }
    case "del-att": {
      if (act.dataset.confirm) { store.attempts = store.attempts.filter(a => a.id !== d.id); save(true); render(); toast("已刪除"); }
      else { act.dataset.confirm = "1"; act.innerHTML = '<span style="font-size:12px;font-weight:700;color:var(--bad)">刪除?</span>'; setTimeout(() => { if (act.isConnected) { delete act.dataset.confirm; act.innerHTML = I.x; } }, 2500); }
      break;
    }
    case "backup-legacy": {
      let code = ""; try { code = btoa(unescape(encodeURIComponent(JSON.stringify({ v: 1, attempts: store.attempts, vocab: store.vocab })))); } catch (er) { }
      sheet(`<h3>備份碼</h3><p class="muted" style="margin:0 0 10px">把這段文字存到備忘錄或傳給自己，之後在「貼上備份碼還原」貼回來。</p><textarea class="field" id="bk" readonly style="font-size:12px;min-height:140px">${esc(code)}</textarea><div class="row" style="justify-content:flex-end;margin-top:12px"><button class="btn" data-act="close-sheet">關閉</button><button class="btn primary" data-act="copy">複製</button></div>`);
      break;
    }
    case "copy": { const t = $("#bk"); const v = t.value; const done = () => toast("已複製"); try { navigator.clipboard.writeText(v).then(done, () => { t.select(); toast("請手動複製（已全選）"); }); } catch (er) { t.select(); toast("請手動複製（已全選）"); } break; }
    case "restore": sheet(`<h3>貼上備份碼</h3><textarea class="field" id="rs" style="font-size:12px;min-height:140px" placeholder="在這裡貼上備份碼"></textarea><div class="row" style="justify-content:flex-end;margin-top:12px"><button class="btn" data-act="close-sheet">取消</button><button class="btn primary" data-act="do-restore">還原</button></div>`); break;
    case "do-restore-legacy": {
      try {
        const data = JSON.parse(decodeURIComponent(escape(atob($("#rs").value.trim()))));
        const ids = new Set(store.attempts.map(a => a.id)); let n = 0;
        (data.attempts || []).forEach(a => { if (!ids.has(a.id)) { store.attempts.push(a); n++; } });
        store.attempts.sort((a, b) => b.date - a.date);
        let vb = data.vocab || {}; if (Object.values(vb).some(v => v && typeof v.k === "string")) vb = { "未署名": vb };
        Object.entries(vb).forEach(([who, words]) => { const T = store.vocab[who] || (store.vocab[who] = {}); Object.entries(words).forEach(([k, v]) => { if (!T[k]) T[k] = v; }); });
        save(true); closeSheet(); render(); toast(`已還原 ${n} 筆紀錄`);
      } catch (er) { toast("備份碼格式不對，請確認有完整貼上"); }
      break;
    }

    // vocab
    case "vremove": delete (store.vocab[vocabOwner()] || {})[d.k]; save(); rerenderKeep(); toast(`「${d.k}」已移出單字本`); break;
    case "drill-all": startDrill(Object.values(store.vocab[vocabOwner()] || {}).map(v => ({ k: v.k, pos: v.pos, zh: v.zh, ph: v.ph, surf: v.surf, ctx: v.ctx[0] || "" })), "單字練習・單字本", vocabOwner()); break;
    case "drill-weak": {
      const list = Object.values(store.vocab[vocabOwner()] || {}).sort((a, b) => (b.miss - b.ok + b.n) - (a.miss - a.ok + a.n)).slice(0, 10);
      startDrill(list.map(v => ({ k: v.k, pos: v.pos, zh: v.zh, ph: v.ph, surf: v.surf, ctx: v.ctx[0] || "" })), "單字練習・最常錯的字", vocabOwner()); break;
    }
  }
});
document.addEventListener("mouseover", e => { const p = e.target.closest && e.target.closest(".ph"); document.querySelectorAll(".ph.hov").forEach(x => { if (!p || x.dataset.g !== p.dataset.g) x.classList.remove("hov"); }); if (p) document.querySelectorAll(`[data-g="${p.dataset.g}"]`).forEach(x => x.classList.add("hov")); });
document.addEventListener("input", e => {
  if (e.target.id === "who") { store.who = e.target.value.trim(); save(); document.querySelectorAll('[data-act="pick-who"]').forEach(c => c.setAttribute("aria-pressed", c.dataset.n === store.who)); return; }
  if (!S || view !== "quiz") return;
  const w = work(S.idx);
  if (e.target.id === "spellin" || e.target.id === "transin") { w.val = e.target.value; save(); }
  if (e.target.id === "errfix") { w.fix = e.target.value; save(); }
  if (e.target.id === "essayin") { w.val = e.target.value; save(); const c = $("#wc"); if (c) c.textContent = `${wcount(w.val)} 字（建議 ${getQ(S.idx).q.minWords || 50} 字以上）`; }
});
document.addEventListener("keydown", e => {
  if (view !== "quiz" || !S || $("#scrim")) return;
  const tag = (e.target.tagName || "").toLowerCase();
  if (e.key === "Enter" && (e.target.id === "spellin" || e.target.id === "errfix" || (e.target.id === "transin" && !e.shiftKey))) { e.preventDefault(); if (!S.ans[S.idx]) submitCurrent(); else gotoQ(S.idx + 1); return; }
  if (tag === "input" || tag === "textarea") return;
  if (e.key === "ArrowRight") gotoQ(S.idx + 1);
  if (e.key === "ArrowLeft") gotoQ(S.idx - 1);
  const q = getQ(S.idx).q;
  if (isMC(q) && (!S.ans[S.idx] || S.blind)) { const k = "abcd".indexOf(e.key.toLowerCase()); if (k >= 0 && k < q.opts.length) commit(k); }
});
// 每次進題目前準備亂序
const _render = render;
render = function () { if (view === "quiz" && S) prepWork(S.idx); _render(); };

/* ================= 啟動 ================= */
function start(data) {
  if (data && data.sessions && !store.sessions.length) store.sessions = data.sessions;
  fxInit();
  render();
}
if (window.claude && window.claude.hot) {
  window.claude.hot.snapshot && window.claude.hot.snapshot(() => ({ sessions: store.sessions }));
}
window.claude?.hot?.ready ? window.claude.hot.ready(start) : start(window.claude?.hot?.data ?? {});
/* 背景視差：滑鼠移動或手機傾斜時，背景跟著微微移動 */
(() => {
  const el = document.querySelector(".bg-photo"); if (!el || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  let tx = 0, ty = 0, x = 0, y = 0, raf = 0;
  const step = () => { x += (tx - x) * .06; y += (ty - y) * .06; el.style.setProperty("--px", x.toFixed(2)); el.style.setProperty("--py", y.toFixed(2)); raf = Math.abs(tx - x) + Math.abs(ty - y) > .05 ? requestAnimationFrame(step) : 0; };
  const go = (nx, ny) => { tx = nx * 18; ty = ny * 18; if (!raf) raf = requestAnimationFrame(step); };
  addEventListener("pointermove", e => go(e.clientX / innerWidth - .5, e.clientY / innerHeight - .5), { passive: true });
  addEventListener("deviceorientation", e => { if (e.gamma != null) go(Math.max(-1, Math.min(1, e.gamma / 30)) / 2, Math.max(-1, Math.min(1, (e.beta - 45) / 30)) / 2); }, { passive: true });
})();

/* 淺色／深色模式：沒手動選過就跟著系統；按右上角按鈕切換並記住 */
function curTheme() { return document.documentElement.dataset.theme === "dark" ? "dark" : "light"; }
function applyTheme() {
  const t = store.settings.theme || (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  document.documentElement.dataset.theme = t;
  document.documentElement.style.colorScheme = t;
  document.querySelectorAll('meta[name="theme-color"]').forEach(m => m.setAttribute("content", t === "dark" ? "#000000" : "#f3f0fa"));
}
applyTheme();
matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => { if (!store.settings.theme) { applyTheme(); if (view === "home") rerenderKeep(); } });
document.addEventListener("click", e => {
  if (!e.target.closest('[data-act="theme"]')) return;
  store.settings.theme = curTheme() === "dark" ? "light" : "dark"; save(true);
  document.documentElement.classList.add("theme-anim"); applyTheme(); rerenderKeep();
  setTimeout(() => document.documentElement.classList.remove("theme-anim"), 700);
});
