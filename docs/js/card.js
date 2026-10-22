/* ===== 個人名片 v2（角色＋造型＋場景）、每日任務、連續練習解鎖場景、紀錄頁 Dashboard =====
   - 6 位角色 × 4 套造型（img/avatar/<角色>-<造型>.webp，透明背景；-s 是編輯器縮圖、-face 是頭像），8 個場景（img/scene/<場景>.webp，-s 是縮圖）。
   - 名片＝場景（底層）＋角色（中層：腳下陰影、依場景調色和側光、待機呼吸）＋資訊面板（上層）。
   - 第一次輸入名字（或第一次點名字）時彈出：先放大到接近全螢幕，再退回約 70%，下面選角色、造型、場景。
   - 場景依「最長連續練習天數」解鎖（SCENES 的 need：3／7／14／30 天）。
   - 每日任務：每人每天 3 個（1 個簡單＋2 個進階，依名字和日期固定），每個 +30 XP，全部完成再 +50 XP。
   - 經驗值：每份作答 20 XP＋每得 1 分 10 XP＋每日任務。
   - 設定存在 store.cards[名字]＝{char, outfit, scene}；交卷時跟著成績上傳，老師總覽看得到。 ===== */
const CHARS = [
  { id: "kai", name: "Kai", from: "東亞", g: "m" }, { id: "jaylen", name: "Jaylen", from: "非裔", g: "m" }, { id: "mateo", name: "Mateo", from: "拉丁裔", g: "m" },
  { id: "yuna", name: "Yuna", from: "日系", g: "f" }, { id: "priya", name: "Priya", from: "南亞", g: "f" }, { id: "freya", name: "Freya", from: "北歐", g: "f" }
];
const OUTFITS = [
  { id: "court", name: "球場", desc: "球衣・球鞋・籃球" }, { id: "street", name: "街頭", desc: "粉色外套・隨身聽" },
  { id: "campus", name: "學院", desc: "制服・書包" }, { id: "neon", name: "夜城", desc: "機能外套・發光耳機" }
];
/* bg：圖片載入前的底色；tint：疊在角色上的環境色；rim：側光顏色，rd：側光從哪一邊來；x：角色站的位置（%） */
const SCENES = [
  { id: "court", name: "黃昏球場", need: 0, bg: "#b8806a", tint: "#ff9a6a", rim: "rgba(255,196,140,.95)", rd: "l", x: 24 },
  { id: "station", name: "海邊車站", need: 0, bg: "#e0a58a", tint: "#ffae8c", rim: "rgba(255,214,176,.9)", rd: "l", x: 25 },
  { id: "rooftop", name: "頂樓暮色", need: 0, bg: "#5f5680", tint: "#8f78d0", rim: "rgba(255,176,200,.85)", rd: "l", x: 24 },
  { id: "sakura", name: "櫻花河堤", need: 0, bg: "#c9dbe4", tint: "#ffd6e2", rim: "rgba(255,255,255,.9)", rd: "r", x: 26 },
  { id: "neon", name: "霓虹街頭", need: 3, bg: "#1f2b3a", tint: "#4f4ad0", rim: "rgba(255,70,190,.95)", rd: "l", x: 25 },
  { id: "alley", name: "雨夜巷弄", need: 7, bg: "#2a2f3a", tint: "#3d5c86", rim: "rgba(255,206,130,.95)", rd: "r", x: 23 },
  { id: "lookout", name: "山頂瞭望台", need: 14, bg: "#9cb08a", tint: "#ffe0a6", rim: "rgba(255,244,210,.9)", rd: "l", x: 24 },
  { id: "camp", name: "星空營地", need: 30, bg: "#1b1f48", tint: "#3a3f96", rim: "rgba(255,168,90,.95)", rd: "r", x: 24 }
];
const CARD_TITLES = [[1, "新手冒險者", "Rookie Adventurer"], [3, "單字見習生", "Word Apprentice"], [5, "文法騎士", "Grammar Knight"], [8, "閱讀遊俠", "Reading Ranger"],
  [12, "語言術士", "Lingua Mage"], [17, "傳奇講者", "Legendary Orator"], [24, "英語大賢者", "Grand Sage"]];
const CARD_DEFAULT = { char: "kai", outfit: "court", scene: "court" };
const avatarSrc = (c, o, small) => `img/avatar/${c}-${o}${small ? "-s" : ""}.webp`, sceneSrc = (s, small) => `img/scene/${s}${small ? "-s" : ""}.webp`;
const charOf = id => CHARS.find(c => c.id === id) || CHARS[0], outfitOf = id => OUTFITS.find(o => o.id === id) || OUTFITS[0], sceneOf = id => SCENES.find(s => s.id === id) || SCENES[0];
/* 只有新版設定（有選角色）才算有名片；舊版（背景＋小物件）會請學生重新選一次 */
const cardOf = who => { const c = (store.cards || {})[who]; return c && c.char ? c : null; };
function cardNo(name) { let h = 7; for (const c of String(name)) h = (h * 31 + c.codePointAt(0)) % 9973; return String(h).padStart(4, "0"); }
const CI = {   // 名片、任務用的小圖示（和 app.js 的 I 同樣的線條風格）
  flame: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3c1 3.5 5 5.6 5 10.2A5 5 0 0 1 7 13.2c0-2.4 1.2-3.7 2-5 .6 1.6 1.4 2.4 2.2 2.6C11 8 11.2 5.2 12 3z"/></svg>',
  lock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="10.5" width="14" height="10" rx="2.5"/><path d="M8.5 10.5V8a3.5 3.5 0 0 1 7 0v2.5"/></svg>',
  doc: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 3h7l4 4v14H7z"/><path d="M14 3v4h4M10 12h5M10 16h5"/></svg>',
  clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/></svg>',
  word: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 18 8.5 6 13 18M5.7 14h5.6"/><path d="M15 9.5h5M15 13.5h5M15 17.5h3"/></svg>',
  check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="8.5"/><path d="m8.3 12.2 2.5 2.5 4.9-5"/></svg>',
  combo: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 3 6 13h5l-1 8 7-10h-5z"/></svg>',
  target: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="4.5"/><circle cx="12" cy="12" r=".8" fill="currentColor"/></svg>',
  stack: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 4 8 4-8 4-8-4z"/><path d="m4 12 8 4 8-4M4 16l8 4 8-4"/></svg>',
  redo: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 8a8 8 0 1 0 1 6"/><path d="M19 3v5h-5"/></svg>',
  star: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="m12 3.2 2.6 5.6 6.1.7-4.5 4.2 1.2 6-5.4-3-5.4 3 1.2-6-4.5-4.2 6.1-.7z"/></svg>'
};

/* ---------- 日期、連續天數 ---------- */
const dayKey = t => { const d = new Date(t); return d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate(); };
const dayStart = t => { const d = new Date(t); return new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime(); };
function streaks(atts) {
  const days = [...new Set(atts.map(a => dayStart(a.date || 0)))].sort((a, b) => a - b), has = new Set(days);
  let best = 0, run = 0, prev = null;
  days.forEach(t => { run = prev !== null && Math.round((t - prev) / 864e5) === 1 ? run + 1 : 1; best = Math.max(best, run); prev = t; });
  let cur = 0, d = dayStart(Date.now()); if (!has.has(d)) d = dayStart(d - 432e5);   // 今天還沒練，從昨天往回算（連續還沒斷）
  while (has.has(d)) { cur++; d = dayStart(d - 432e5); }
  return { cur, best: Math.max(best, cur) };
}
const sceneOpen = (sc, best) => best >= sc.need;

/* ---------- 每日任務 ---------- */
const QUESTS = [
  { id: "finish", icon: "doc", text: "完成 1 份練習", target: 1, easy: true, val: d => d.atts.filter(a => (a.qs || []).length >= 5).length },
  { id: "time", icon: "clock", text: "練習滿 15 分鐘", target: 15, unit: " 分", easy: true, val: d => Math.floor(d.atts.reduce((s, a) => s + (a.duration || 0), 0) / 60) },
  { id: "words", icon: "word", text: "點查 5 個不會的單字", target: 5, easy: true, val: d => d.atts.reduce((s, a) => s + Object.keys(a.words || {}).length, 0) },
  { id: "correct", icon: "check", text: "今天答對 15 題", target: 15, val: d => d.correct },
  { id: "combo", icon: "combo", text: "連續答對 8 題（Combo ×8）", target: 8, val: d => d.combo },
  { id: "acc", icon: "target", text: "一份 10 題以上的練習答對 80%", target: 1, val: d => d.atts.filter(a => a.kind !== "vocab" && (a.qs || []).length >= 10 && a.total && a.score / a.total >= .8).length },
  { id: "two", icon: "stack", text: "完成 2 份練習", target: 2, val: d => d.atts.filter(a => (a.qs || []).length >= 5).length },
  { id: "review", icon: "redo", text: "做 1 次單字練習或錯題重練", target: 1, val: d => d.atts.filter(a => a.kind === "vocab" || /^錯題重練/.test(a.title || "")).length }
];
const QUEST_XP = 30, QUEST_BONUS = 50;
function seededPick(seed, arr, n) {
  let h = 2166136261; for (const c of seed) { h ^= c.charCodeAt(0); h = Math.imul(h, 16777619); }
  const a = arr.slice(), out = [];
  while (out.length < n && a.length) { h ^= h << 13; h ^= h >>> 17; h ^= h << 5; out.push(a.splice((h >>> 0) % a.length, 1)[0]); }
  return out;
}
function questsFor(who, key) { return seededPick(who + "|" + key, QUESTS.filter(q => q.easy), 1).concat(seededPick(key + "|" + who, QUESTS.filter(q => !q.easy), 2)); }
function questState(who, atts, key) {
  key = key || dayKey(Date.now());
  const today = atts.filter(a => dayKey(a.date || 0) === key);
  const d = { atts: today, correct: 0, combo: 0 };
  today.forEach(a => { d.combo = Math.max(d.combo, attCombo(a)); Object.values(a.ans || {}).forEach(x => { if (x && x.correct) d.correct++; }); });
  const qs = questsFor(who, key).map(q => { const v = q.val(d); return { q, v: Math.min(v, q.target), done: v >= q.target }; }), all = qs.every(x => x.done);
  return { qs, all, xp: qs.filter(x => x.done).length * QUEST_XP + (all ? QUEST_BONUS : 0) };
}
const questXP = (who, atts) => [...new Set(atts.map(a => dayKey(a.date || 0)))].reduce((s, k) => s + questState(who, atts, k).xp, 0);

/* ---------- 數據 ---------- */
function attsOf(who) { return store.attempts.filter(a => (a.who || "未署名") === who); }
function levelOf(xp) { let L = 1; while (50 * L * (L + 1) <= xp) L++; return { L, cur: xp - 50 * (L - 1) * L, need: 100 * L }; }
function titleOf(L) { let t = CARD_TITLES[0]; CARD_TITLES.forEach(x => { if (L >= x[0]) t = x; }); return t; }
function playerStats(who, atts) {
  atts = atts || attsOf(who);
  const ex = atts.filter(a => a.kind !== "vocab" && a.total), sk = streaks(atts);
  const xp = atts.reduce((s, a) => s + 20 + Math.round(a.score || 0) * 10, 0) + questXP(who, atts);
  return {
    count: atts.length, xp, lv: levelOf(xp), streak: sk.cur, best: sk.best,
    acc: ex.length ? Math.round(ex.reduce((s, a) => s + a.score / a.total, 0) / ex.length * 100) : null,
    combo: atts.reduce((m, a) => Math.max(m, attCombo(a)), 0),
    answered: atts.reduce((s, a) => s + Object.keys(a.ans || {}).length, 0),
    time: atts.reduce((s, a) => s + (a.duration || 0), 0),
    words: typeof vocabOf === "function" ? vocabOf(who).length : Object.keys((store.vocab || {})[who] || {}).length,
    recent: ex.slice().sort((a, b) => (a.date || 0) - (b.date || 0)).slice(-12),
    activity: [...Array(14).keys()].reverse().map(k => { const d = new Date(Date.now() - k * 864e5), key = dayKey(d); return { d, n: atts.filter(a => dayKey(a.date || 0) === key).length }; })
  };
}

/* ---------- 名片 ---------- */
function playerCardHTML(who, cfg, opt = {}) {
  cfg = cfg && cfg.char ? cfg : (cardOf(who) || CARD_DEFAULT);
  const ch = charOf(cfg.char), of = outfitOf(cfg.outfit), sc = sceneOf(cfg.scene), st = opt.stats || playerStats(who, opt.atts), lv = st.lv, title = titleOf(lv.L);
  const img = avatarSrc(ch.id, of.id), mask = `-webkit-mask-image:url(${img});mask-image:url(${img})`;
  return `<div class="pcard rd-${sc.rd} g-${ch.g}" data-scene="${sc.id}" style="--pc-bg:${sc.bg};--pc-tint:${sc.tint};--pc-rim:${sc.rim};--cx:${sc.x}%" role="img" aria-label="${esc(who)} 的名片：${esc(ch.name)}・${esc(of.name)}造型・${esc(sc.name)}，Lv ${lv.L} ${esc(title[1])}">
    <img class="pc-scene" src="${sceneSrc(sc.id)}" alt="" decoding="async">
    <i class="pc-ground"></i>
    <div class="pc-char"><img src="${img}" alt="" decoding="async"><i class="pc-tint" style="${mask}"></i><i class="pc-rim" style="${mask}"></i></div>
    <i class="pc-vig"></i>
    <span class="pc-place">${esc(sc.name)}</span><span class="pc-no">No.${cardNo(who)}</span>
    <div class="pc-info">
      <div class="pc-hi">Welcome,</div>
      <div class="pc-name">${esc(who)}</div>
      <div class="pc-title"><b>Lv ${lv.L}</b><span>${esc(title[1])}</span><small>${esc(title[2])}</small></div>
      <div class="pc-xp"><i style="width:${Math.round(lv.cur / lv.need * 100)}%"></i></div>
      <div class="pc-xpt"><span>XP ${lv.cur} / ${lv.need}</span><span class="pc-streak">${CI.flame}${st.streak} 天</span></div>
      <div class="pc-stats"><div><b>${st.count}</b><span>練習</span></div><div><b>${st.acc === null ? "—" : st.acc + "%"}</b><span>答對率</span></div><div><b>×${st.combo}</b><span>Combo</span></div></div>
    </div>
  </div>`;
}
/* 首頁：名片（寬螢幕時在作答人左邊） */
function homeCardHTML() {
  const who = store.who; if (!who || !cardOf(who)) return "";
  return `<div class="home-card"><div class="pc-holder tilt">${playerCardHTML(who)}</div>
  <div class="row hc-actions"><button class="btn sm" data-act="card-edit">換角色・造型・場景</button><button class="btn sm ghost" data-act="tab" data-v="hist">我的 Dashboard</button></div></div>`;
}
/* 作答人欄位下方：還沒有名片（或是舊版名片）時的入口 */
function cardCtaHTML() {
  const who = store.who; if (!who || cardOf(who)) return "";
  return `<button class="card-cta" data-act="card-edit" data-who="${esc(who)}" data-welcome="1"><span class="cta-faces">${CHARS.slice(0, 3).map(c => `<img src="img/avatar/${c.id}-face.webp" alt="">`).join("")}</span><span><b>選一位角色當你的分身</b><small>做出專屬名片，練習越多等級越高</small></span>${I.chevR}</button>`;
}
/* 首頁：今日任務 */
function questCardHTML(who) {
  if (!who) return "";
  const atts = attsOf(who), qs = questState(who, atts), sk = streaks(atts), done = qs.qs.filter(x => x.done).length;
  const end = new Date(); end.setHours(24, 0, 0, 0); const hrs = Math.max(1, Math.ceil((end - Date.now()) / 36e5));
  return `<div class="glass card quests"><div class="q-head"><h2>今日任務</h2><span class="q-streak" title="連續練習天數">${CI.flame}連續 ${sk.cur} 天</span><span class="muted q-left">${done} / 3・${hrs} 小時後換新任務</span></div>
  ${qs.qs.map(({ q, v, done }) => `<div class="q-row ${done ? "done" : ""}"><span class="q-ic" aria-hidden="true">${done ? CI.check : CI[q.icon]}</span><div class="q-main"><div class="q-text">${esc(q.text)}</div>
    <div class="q-bar" role="progressbar" aria-valuemin="0" aria-valuemax="${q.target}" aria-valuenow="${v}" aria-label="${esc(q.text)}"><i style="width:${Math.round(v / q.target * 100)}%"></i></div></div>
    <span class="q-num tnum">${done ? "完成" : `${v} / ${q.target}${q.unit || ""}`}</span><span class="q-xp">+${QUEST_XP}</span></div>`).join("")}
  <div class="q-bonus ${qs.all ? "done" : ""}">${qs.all ? `${CI.star}今天的任務全部完成，額外 +${QUEST_BONUS} XP` : `三個任務全部完成，再加 +${QUEST_BONUS} XP`}</div></div>`;
}

/* ---------- 交卷後：經驗值、任務、升級、解鎖場景（結果頁最上面，只在剛交卷時出現） ---------- */
function questResultHTML(att) {
  const who = att.who || "未署名", all = attsOf(who), before = all.filter(a => a.id !== att.id), key = dayKey(att.date || Date.now());
  const q1 = questState(who, all, key), q0 = questState(who, before, key), newly = q1.qs.filter((x, k) => x.done && !q0.qs[k].done);
  const s1 = playerStats(who, all), s0 = playerStats(who, before), gain = s1.xp - s0.xp;
  const opened = SCENES.filter(s => s.need && s1.best >= s.need && s0.best < s.need), up = s1.lv.L > s0.lv.L;
  const left = q1.qs.filter(x => !x.done);
  return `<div class="glass card q-result"><div class="q-gain"><b class="tnum">+${gain}</b><span>XP</span></div><div class="q-res">
    ${up ? `<div class="q-up">${CI.star}<span>升級了！Lv ${s1.lv.L}・${esc(titleOf(s1.lv.L)[1])}</span></div>` : ""}
    ${newly.map(({ q }) => `<div class="q-line">${CI.check}<span>任務完成：${esc(q.text)}</span><em>+${QUEST_XP}</em></div>`).join("")}
    ${q1.all && !q0.all ? `<div class="q-line">${CI.star}<span>今日任務全部完成</span><em>+${QUEST_BONUS}</em></div>` : ""}
    ${opened.map(s => `<div class="q-unlock"><img src="${sceneSrc(s.id, true)}" alt=""><span>連續練習 ${s.need} 天，解鎖新場景「${esc(s.name)}」</span><button class="btn sm" data-act="card-edit" data-who="${esc(who)}">換上</button></div>`).join("")}
    <div class="q-line muted">${left.length ? `今日任務還差 ${left.length} 個：${left.map(x => esc(x.q.text)).join("、")}` : "今日任務都完成了，明天見！"}・連續練習 ${s1.streak} 天</div>
  </div></div>`;
}

/* ---------- 編輯器（彈出名片） ---------- */
let CE = null;   // { who, cfg, welcome, best }
function openCardEditor(who, welcome) {
  if (!who || document.querySelector(".cm-scrim")) return;
  const old = cardOf(who);
  CE = { who, welcome, best: streaks(attsOf(who)).best, cfg: old ? Object.assign({}, old) : { char: CHARS[Math.floor(Math.random() * CHARS.length)].id, outfit: "court", scene: "court" } };
  const sc = document.createElement("div"); sc.className = "cm-scrim"; sc.setAttribute("role", "dialog"); sc.setAttribute("aria-modal", "true"); sc.setAttribute("aria-label", "打造你的專屬名片");
  sc.innerHTML = `<div class="cm-stage"><div class="cm-wrap">${playerCardHTML(who, CE.cfg)}</div></div><div class="cm-panel glass" hidden>${cmPanelHTML()}</div>`;
  document.body.appendChild(sc);
  const wrap = sc.querySelector(".cm-wrap"), panel = sc.querySelector(".cm-panel");
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  sc.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 220, fill: "both" });
  const showPanel = () => {
    panel.hidden = false;
    panel.animate([{ opacity: 0, transform: "translateY(18px)" }, { opacity: 1, transform: "none" }], { duration: reduce ? 150 : 320, easing: "cubic-bezier(.16,1,.3,1)", fill: "both" });
    const on = panel.querySelector(".cm-ch.on"); if (on) on.focus({ preventScroll: true });
  };
  if (reduce || !welcome) {
    wrap.animate([{ opacity: 0, transform: "scale(.94)" }, { opacity: 1, transform: "none" }], { duration: reduce ? 150 : 320, easing: "cubic-bezier(.16,1,.3,1)", fill: "both" });
    showPanel(); return;
  }
  // 歡迎動畫：從下方翻起、放大到接近全螢幕，停一下再退回 70%（點一下可以跳過）
  requestAnimationFrame(() => {
    const r = wrap.getBoundingClientRect(), big = Math.min(innerWidth * .94 / r.width, innerHeight * .82 / r.height);
    const dy = innerHeight / 2 - (r.top + r.height / 2);
    const a = wrap.animate([
      { transform: `translateY(${dy + innerHeight * .45}px) scale(.2) rotateX(70deg) rotateZ(-6deg)`, opacity: 0 },
      { transform: `translateY(${dy}px) scale(${big}) rotateX(0deg) rotateZ(0deg)`, opacity: 1, offset: .36, easing: "cubic-bezier(.16,1,.3,1)" },
      { transform: `translateY(${dy}px) scale(${big * .985}) rotateX(0deg)`, opacity: 1, offset: .64, easing: "cubic-bezier(.22,1,.36,1)" },
      { transform: "none", opacity: 1 }
    ], { duration: 2100, easing: "cubic-bezier(.22,1,.36,1)", fill: "both" });
    a.onfinish = showPanel;
    sc.addEventListener("pointerdown", () => { if (a.playState === "running") a.finish(); }, { once: true });
  });
}
function cmPanelHTML() {
  const c = CE.cfg;
  return `<div class="cm-head"><h3>${CE.welcome ? `Welcome, ${esc(CE.who)}！選一位角色當你的分身` : "換角色・造型・場景"}</h3><span class="muted">等級和數據會隨練習自動更新；連續練習可以解鎖更多場景</span></div>
  <div class="cm-label">角色</div>
  <div class="cm-chars">${CHARS.map(ch => `<button class="cm-ch ${c.char === ch.id ? "on" : ""}" data-act="cm-char" data-v="${ch.id}" aria-pressed="${c.char === ch.id}"><img src="img/avatar/${ch.id}-face.webp" alt=""><b>${esc(ch.name)}</b><small>${esc(ch.from)}</small></button>`).join("")}</div>
  <div class="cm-label">造型</div>
  <div class="cm-outfits">${OUTFITS.map(o => `<button class="cm-of ${c.outfit === o.id ? "on" : ""}" data-act="cm-outfit" data-v="${o.id}" aria-pressed="${c.outfit === o.id}"><span class="cm-ofimg"><img src="${avatarSrc(c.char, o.id, true)}" alt=""></span><b>${esc(o.name)}</b><small>${esc(o.desc)}</small></button>`).join("")}</div>
  <div class="cm-label">場景 <span class="muted">最長連續練習 ${CE.best} 天</span></div>
  <div class="cm-scenes">${SCENES.map(s => { const ok = sceneOpen(s, CE.best);
    return `<button class="cm-sc ${c.scene === s.id ? "on" : ""} ${ok ? "" : "locked"}" data-act="cm-scene" data-v="${s.id}" aria-pressed="${c.scene === s.id}" ${ok ? "" : `aria-disabled="true" aria-label="${esc(s.name)}：連續練習 ${s.need} 天解鎖"`}><span class="cm-scimg"><img src="${sceneSrc(s.id, true)}" alt="">${ok ? "" : `<span class="cm-lock">${CI.lock}連續 ${s.need} 天</span>`}</span><b>${esc(s.name)}</b></button>`; }).join("")}</div>
  <div class="row cm-actions"><button class="btn ghost" data-act="cm-close">${CE.welcome ? "先用這樣" : "取消"}</button><button class="btn primary" data-act="cm-done">${I.check}完成</button></div>`;
}
function cmRefresh(what) {
  const sc = document.querySelector(".cm-scrim"); if (!sc) return;
  sc.querySelector(".cm-wrap").innerHTML = playerCardHTML(CE.who, CE.cfg);
  const panel = sc.querySelector(".cm-panel"), focus = document.activeElement && document.activeElement.dataset && document.activeElement.dataset.act, y = sc.scrollTop;
  panel.innerHTML = cmPanelHTML(); sc.scrollTop = y;
  const back = focus && panel.querySelector(`[data-act="${focus}"][data-v="${CE.cfg[focus.slice(3)]}"]`); if (back) back.focus({ preventScroll: true });   // 鍵盤操作時焦點留在剛按的選項
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const el = sc.querySelector(what === "scene" ? ".pc-scene" : ".pc-char");
  if (el) el.animate(what === "scene" ? [{ opacity: .4 }, { opacity: 1 }] : [{ opacity: 0, transform: "translateY(3%)" }, { opacity: 1, transform: "none" }], { duration: 300, easing: "cubic-bezier(.16,1,.3,1)" });
}
function closeCardEditor(saveIt) {
  const sc = document.querySelector(".cm-scrim"); if (!sc || !CE) return;
  if (saveIt || CE.welcome) { (store.cards || (store.cards = {}))[CE.who] = { char: CE.cfg.char, outfit: CE.cfg.outfit, scene: CE.cfg.scene, updated: Date.now() }; save(true); }
  const out = sc.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 200, fill: "forwards" });
  out.onfinish = () => { sc.remove(); CE = null; if (view === "home" || view === "hist" || view === "result") rerenderKeep(); };
  if (saveIt) toast("名片已儲存");
}
document.addEventListener("click", e => {
  const a = e.target.closest("[data-act]"); if (!a) return;
  const act = a.dataset.act, v = a.dataset.v;
  if (act === "card-edit") { openCardEditor(a.dataset.who || store.who, !!a.dataset.welcome); return; }
  if (!CE || !act.startsWith("cm-")) return;
  const c = CE.cfg;
  if (act === "cm-char" && c.char !== v) { c.char = v; cmRefresh("char"); }
  if (act === "cm-outfit" && c.outfit !== v) { c.outfit = v; cmRefresh("outfit"); }
  if (act === "cm-scene" && c.scene !== v) { const s = sceneOf(v); if (!sceneOpen(s, CE.best)) { toast(`連續練習 ${s.need} 天就能解鎖「${s.name}」`); return; } c.scene = v; cmRefresh("scene"); }
  if (act === "cm-close") closeCardEditor(false);
  if (act === "cm-done") closeCardEditor(true);
});
document.addEventListener("keydown", e => { if (e.key === "Escape" && CE) closeCardEditor(false); });
/* 首頁、Dashboard 的名片：滑鼠移動時輕微傾斜，場景和角色錯開（景深）；觸控裝置不動 */
document.addEventListener("pointermove", e => {
  if (e.pointerType !== "mouse") return;
  const h = e.target.closest && e.target.closest(".pc-holder.tilt");
  document.querySelectorAll(".pc-holder.tilt").forEach(x => { if (x !== h && x.style.getPropertyValue("--px")) { x.style.removeProperty("--rx"); x.style.removeProperty("--ry"); x.style.removeProperty("--px"); } });
  if (!h) return;
  const r = h.getBoundingClientRect(), px = (e.clientX - r.left) / r.width - .5, py = (e.clientY - r.top) / r.height - .5;
  h.style.setProperty("--rx", (-py * 4).toFixed(2) + "deg"); h.style.setProperty("--ry", (px * 6).toFixed(2) + "deg"); h.style.setProperty("--px", px.toFixed(3));
}, { passive: true });
/* 輸入新名字後（按 Enter 或離開輸入框）：還沒有名片就彈出 */
document.addEventListener("change", e => {
  if (!e.target || e.target.id !== "who") return;
  const nm = e.target.value.trim();
  setTimeout(() => { if (nm && view === "home" && !cardOf(nm) && !document.querySelector(".scrim,.cm-scrim")) openCardEditor(nm, true); }, 160);
});
document.addEventListener("keydown", e => { if (e.key === "Enter" && e.target && e.target.id === "who") e.target.blur(); });

/* ---------- 紀錄頁：個人 Dashboard ---------- */
function dashboardHTML(who, atts, opt = {}) {
  const st = playerStats(who, atts), lv = st.lv, title = titleOf(lv.L), maxA = Math.max(1, ...st.activity.map(a => a.n));
  const next = SCENES.find(s => s.need > st.best);
  return `<section class="dash" aria-label="${esc(who)} 的個人 Dashboard">
  <div class="dash-hero">
    <div class="pc-holder tilt">${playerCardHTML(who, opt.cfg || cardOf(who), { stats: st })}</div>
    <div class="dash-lv">
      <div class="dash-ring" style="--p:${Math.round(lv.cur / lv.need * 100)}"><b>Lv ${lv.L}</b><span>${lv.cur} / ${lv.need} XP</span></div>
      <div><div style="font-size:18px;font-weight:750">${esc(title[1])}</div><div class="muted" style="font-size:13px">${esc(title[2])}・距離下一級還差 ${lv.need - lv.cur} XP</div>
      ${opt.readonly ? "" : `<div class="row" style="margin-top:10px"><button class="btn sm" data-act="card-edit" data-who="${esc(who)}" ${cardOf(who) ? "" : 'data-welcome="1"'}>${cardOf(who) ? "換角色・造型・場景" : "建立角色名片"}</button></div>`}</div>
    </div>
  </div>
  <div class="dash-grid">
    <div class="dg"><span>練習次數</span><b class="tnum">${st.count}</b><small>共作答 ${st.answered} 題</small></div>
    <div class="dg"><span>平均答對率</span><b class="tnum" style="color:${st.acc === null ? "inherit" : scoreColor(st.acc / 100)}">${st.acc === null ? "—" : st.acc + "%"}</b><small>不含單字練習</small></div>
    <div class="dg"><span>最佳 Combo</span><b class="tnum" style="color:var(--gold)">×${st.combo}</b><small>連續答對最多題</small></div>
    <div class="dg"><span>總練習時間</span><b class="tnum">${st.time >= 3600 ? `${Math.floor(st.time / 3600)}<small style="font-size:15px"> 時 </small>${Math.round(st.time % 3600 / 60)}<small style="font-size:15px"> 分</small>` : `${Math.round(st.time / 60)}<small style="font-size:15px"> 分鐘</small>`}</b><small>生字 ${st.words} 個</small></div>
    <div class="dg dg-wide dg-streak"><span>連續練習 <b class="tnum">${st.streak}</b> 天・最長 ${st.best} 天</span>
      <div class="ms-track">${SCENES.filter(s => s.need).map(s => { const ok = st.best >= s.need; return `<div class="ms ${ok ? "ok" : ""}"><span class="ms-img"><img src="${sceneSrc(s.id, true)}" alt="" loading="lazy">${ok ? "" : CI.lock}</span><b>${s.need} 天</b><small>${esc(s.name)}</small></div>`; }).join("")}</div>
      <small>${next ? `再連續練習 ${next.need - st.streak} 天，解鎖場景「${esc(next.name)}」` : "所有場景都解鎖了！"}</small></div>
    <div class="dg dg-wide"><span>最近 14 天</span><div class="dg-act">${st.activity.map(a => `<i style="--a:${a.n ? .25 + .75 * a.n / maxA : 0}" title="${a.d.getMonth() + 1}/${a.d.getDate()}：${a.n} 次"></i>`).join("")}</div>
      <span style="margin-top:10px">最近 ${st.recent.length} 次成績</span>${st.recent.length ? `<div class="dg-trend">${st.recent.map(a => { const p = a.score / a.total; return `<i style="height:${Math.max(6, p * 100)}%;background:${scoreColor(p)}" title="${esc(a.title)}：${Math.round(p * 100)}%"></i>`; }).join("")}</div>` : `<div class="muted" style="font-size:13.5px">做完第一份練習就會出現。</div>`}</div>
  </div></section>`;
}
