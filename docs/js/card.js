/* ===== 個人名片（遊戲風）＋ 紀錄頁的個人 Dashboard =====
   - 第一次輸入名字（或第一次選到某個名字）時彈出名片：先放大到接近全螢幕，再退回版面約 70% 大小，下面是客製化面板。
   - 5 種背景（奇幻 RPG／科幻霓虹／日系手遊，圖在 img/card/），14 種小物件可以拖曳、縮放、旋轉。
   - 名片設定存在 store.cards[名字]（這台裝置）；交卷時會跟著成績一起上傳，老師總覽看得到。
   - 等級：每份作答 20 XP＋每得 1 分 10 XP。 ===== */
const CARD_THEMES = [
  { id: "arcane", name: "星界法典", en: "Arcane Codex", kind: "fantasy", style: "奇幻 RPG" },
  { id: "emerald", name: "翡翠秘境", en: "Emerald Grove", kind: "fantasy", style: "奇幻 RPG" },
  { id: "neon", name: "霓虹都市", en: "Neon District", kind: "scifi", style: "科幻霓虹" },
  { id: "starlane", name: "星艦航道", en: "Starlane", kind: "scifi", style: "科幻霓虹" },
  { id: "sakura", name: "櫻空之約", en: "Sakura Sky", kind: "anime", style: "日系手遊" }
];
const CARD_TITLES = [[1, "新手冒險者", "Rookie Adventurer"], [3, "單字見習生", "Word Apprentice"], [5, "文法騎士", "Grammar Knight"], [8, "閱讀遊俠", "Reading Ranger"],
  [12, "語言術士", "Lingua Mage"], [17, "傳奇講者", "Legendary Orator"], [24, "英語大賢者", "Grand Sage"]];
const MAX_STICKERS = 8;
/* 小物件（SVG，外圍的白邊與陰影由 CSS 加上） */
const STICKERS = {
  crown: ["皇冠", `<path d="M10 46 14 20 24 32 32 14 40 32 50 20 54 46Z" fill="#f6c443"/><rect x="10" y="43" width="44" height="9" rx="2" fill="#e0a52a"/><circle cx="14" cy="20" r="3.5" fill="#f6c443"/><circle cx="32" cy="14" r="3.5" fill="#f6c443"/><circle cx="50" cy="20" r="3.5" fill="#f6c443"/><circle cx="32" cy="47.5" r="3" fill="#e5484d"/><circle cx="21" cy="47.5" r="2.4" fill="#3fa7ff"/><circle cx="43" cy="47.5" r="2.4" fill="#3fa7ff"/>`],
  star: ["星星", `<path d="M32 9 38.5 25.1 55.8 26.3 42.5 37.4 46.7 54.2 32 45 17.3 54.2 21.5 37.4 8.2 26.3 25.5 25.1Z" fill="#ffd23f"/><path d="M32 15 36 25.6 32 24Z" fill="#fff6c9"/>`],
  sword: ["寶劍", `<g transform="rotate(45 32 32)"><path d="M32 3 36 9V40H28V9Z" fill="#e4eaf1"/><path d="M32 6V39" stroke="#b5c0cc" stroke-width="1.6"/><rect x="19" y="39" width="26" height="5.5" rx="2.5" fill="#c99a3c"/><rect x="29.5" y="44.5" width="5" height="11" rx="1.5" fill="#7a4b2a"/><circle cx="32" cy="58" r="3.6" fill="#c99a3c"/></g>`],
  shield: ["盾牌", `<path d="M32 6 52 13V30C52 44 43 53 32 58 21 53 12 44 12 30V13Z" fill="#3d7bf2"/><path d="M32 11 47 16.5V30C47 41 40 48.5 32 52.5 24 48.5 17 41 17 30V16.5Z" fill="#5b93ff"/><path d="M22 29 32 37 42 29" fill="none" stroke="#fff" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/>`],
  flame: ["火焰", `<path d="M32 5C36 15 48 22 48 38 48 50 40 58 32 58 24 58 16 50 16 38 16 28 22 24 24 15 27 21 28 25 30 26 30 19 30 11 32 5Z" fill="#ff7a2f"/><path d="M32 29C35 35 40 39 40 46 40 52 36 56 32 56 28 56 24 52 24 46 24 41 28 37 32 29Z" fill="#ffd23f"/>`],
  bolt: ["閃電", `<path d="M37 4 14 36H30L25 60 50 26H34L41 4Z" fill="#ffd23f"/><path d="M37 4 30 18 34 18 41 4Z" fill="#fff3b0"/>`],
  gem: ["寶石", `<path d="M20 10H44L56 24 32 58 8 24Z" fill="#45d4e6"/><path d="M20 10 26 24H8Z" fill="#8ff0fb"/><path d="M8 24H56M20 10 26 24 32 10 38 24 44 10M26 24 32 58 38 24" fill="none" stroke="#1aa3b8" stroke-width="1.6" stroke-linejoin="round"/>`],
  heart: ["愛心", `<path d="M32 56C10 42 6 30 10 21 14 12 26 11 32 20 38 11 50 12 54 21 58 30 54 42 32 56Z" fill="#ff5f8a"/><ellipse cx="20" cy="23" rx="5" ry="3.4" transform="rotate(-35 20 23)" fill="#ffc2d3"/>`],
  book: ["魔法書", `<path d="M6 20C15 17 24 18 32 22 40 18 49 17 58 20V54C49 51 40 52 32 56 24 52 15 51 6 54Z" fill="#7b5cff"/><path d="M9 21C17 19 25 20 31 23V52C25 49 17 48 9 50Z" fill="#fff"/><path d="M55 21C47 19 39 20 33 23V52C39 49 47 48 55 50Z" fill="#fff"/><path d="M13 28C18 27 23 28 27 30M13 35C18 34 23 35 27 37M37 30C41 28 46 27 51 28M37 37C41 35 46 34 51 35" fill="none" stroke="#c9c2ff" stroke-width="2" stroke-linecap="round"/>`],
  potion: ["藥水", `<rect x="25" y="4" width="14" height="6" rx="2" fill="#a8743f"/><rect x="26.5" y="9" width="11" height="13" fill="#dbe7f0"/><circle cx="32" cy="40" r="18" fill="#dbe7f0"/><path d="M15 40C20 37 26 43 32 40 38 37 44 43 49 40A17.5 17.5 0 0 1 15 40Z" fill="#4fd18b"/><circle cx="27" cy="47" r="2.2" fill="#fff"/><circle cx="35" cy="50" r="1.6" fill="#fff"/><ellipse cx="24" cy="32" rx="3" ry="5" transform="rotate(30 24 32)" fill="#fff" opacity=".8"/>`],
  trophy: ["獎盃", `<path d="M18 12H10C10 22 14 27 20 28M46 12H54C54 22 50 27 44 28" fill="none" stroke="#f6c443" stroke-width="4.5" stroke-linecap="round"/><path d="M18 8H46V24C46 34 40 40 32 40 24 40 18 34 18 24Z" fill="#f6c443"/><rect x="29" y="39" width="6" height="9" fill="#e0a52a"/><rect x="20" y="47" width="24" height="8" rx="2.5" fill="#c98f26"/><path d="M32 15 34 20H39L35 23 36.5 28 32 25 27.5 28 29 23 25 20H30Z" fill="#fff6c9"/>`],
  rocket: ["火箭", `<path d="M26 44C28 52 30 56 32 61 34 56 36 52 38 44Z" fill="#ff9d2f"/><path d="M22 34 11 47 22 44ZM42 34 53 47 42 44Z" fill="#e5484d"/><path d="M32 4C42 12 44 26 42 44H22C20 26 22 12 32 4Z" fill="#f4f6fb"/><circle cx="32" cy="22" r="5.5" fill="#3fa7ff" stroke="#c9d3e3" stroke-width="2.5"/>`],
  aplus: ["A+", `<circle cx="32" cy="32" r="25" fill="#e5484d"/><circle cx="32" cy="32" r="19.5" fill="none" stroke="#fff" stroke-width="2" stroke-dasharray="4 3"/><text x="32" y="40" text-anchor="middle" font-family="ui-rounded,-apple-system,sans-serif" font-weight="900" font-size="22" fill="#fff">A+</text>`],
  hi: ["Hi!", `<path d="M10 10H54A6 6 0 0 1 60 16V38A6 6 0 0 1 54 44H31L18 56V44H10A6 6 0 0 1 4 38V16A6 6 0 0 1 10 10Z" fill="#fff" stroke="#1c2340" stroke-width="2.5" stroke-linejoin="round"/><text x="32" y="34" text-anchor="middle" font-family="ui-rounded,-apple-system,sans-serif" font-weight="900" font-size="17" fill="#1c2340">Hi!</text>`]
};
const stickerSVG = k => `<svg viewBox="0 0 64 64" aria-hidden="true">${(STICKERS[k] || STICKERS.star)[1]}</svg>`;

const cardOf = who => (store.cards || {})[who] || null;
function cardNo(name) { let h = 7; for (const c of String(name)) h = (h * 31 + c.codePointAt(0)) % 9973; return String(h).padStart(4, "0"); }

/* ---------- 數據：等級、統計、連續天數 ---------- */
function attsOf(who) { return store.attempts.filter(a => (a.who || "未署名") === who); }
function levelOf(xp) { let L = 1; while (50 * L * (L + 1) <= xp) L++; return { L, cur: xp - 50 * (L - 1) * L, need: 100 * L }; }
function titleOf(L) { let t = CARD_TITLES[0]; CARD_TITLES.forEach(x => { if (L >= x[0]) t = x; }); return t; }
const dayKey = t => { const d = new Date(t); return d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate(); };
function playerStats(who, atts) {
  atts = atts || attsOf(who);
  const ex = atts.filter(a => a.kind !== "vocab" && a.total);
  const xp = atts.reduce((s, a) => s + 20 + Math.round(a.score || 0) * 10, 0);
  const days = new Set(atts.map(a => dayKey(a.date || 0)));
  let streak = 0, d = new Date(); if (!days.has(dayKey(d))) d = new Date(d - 864e5);   // 今天還沒練也算延續到昨天
  while (days.has(dayKey(d))) { streak++; d = new Date(d - 864e5); }
  return {
    count: atts.length, xp, lv: levelOf(xp),
    acc: ex.length ? Math.round(ex.reduce((s, a) => s + a.score / a.total, 0) / ex.length * 100) : null,
    combo: atts.reduce((m, a) => Math.max(m, typeof attCombo === "function" ? attCombo(a) : (a.maxCombo || 0)), 0),
    answered: atts.reduce((s, a) => s + Object.keys(a.ans || {}).length, 0),
    time: atts.reduce((s, a) => s + (a.duration || 0), 0), streak,
    words: typeof vocabOf === "function" ? vocabOf(who).length : Object.keys((store.vocab || {})[who] || {}).length,
    recent: ex.slice().sort((a, b) => (a.date || 0) - (b.date || 0)).slice(-12),
    activity: [...Array(14).keys()].reverse().map(k => { const d = new Date(Date.now() - k * 864e5), key = dayKey(d); return { d, n: atts.filter(a => dayKey(a.date || 0) === key).length }; })
  };
}

/* ---------- 名片 ---------- */
function playerCardHTML(who, cfg, opt = {}) {
  cfg = cfg || cardOf(who) || { bg: "arcane", stickers: [] };
  const th = CARD_THEMES.find(t => t.id === cfg.bg) || CARD_THEMES[0], st = opt.stats || playerStats(who, opt.atts), lv = st.lv, title = titleOf(lv.L);
  const initial = [...String(who || "?").trim()][0] || "?";
  return `<div class="pcard k-${th.kind} t-${th.id} ${opt.cls || ""}" data-theme="${th.id}" role="img" aria-label="${esc(who)} 的名片：Lv ${lv.L} ${esc(title[1])}">
    <div class="pc-art" style="background-image:url(img/card/${th.id}.webp)"></div><div class="pc-scrim"></div>
    <div class="pc-frame"><i class="c1"></i><i class="c2"></i><i class="c3"></i><i class="c4"></i></div>
    <div class="pc-emblem"><span class="pc-ini">${esc(initial)}</span><span class="pc-lv">Lv ${lv.L}</span></div>
    <div class="pc-body">
      <div class="pc-top"><span class="pc-kicker">Welcome,</span><span class="pc-no">No.${cardNo(who)}</span></div>
      <div class="pc-name">${esc(who)}</div>
      <div class="pc-title">${esc(title[1])}<span>${esc(title[2])}</span></div>
      <div class="pc-xp"><i style="width:${Math.round(lv.cur / lv.need * 100)}%"></i></div>
      <div class="pc-xpt">XP ${lv.cur} / ${lv.need}</div>
      <div class="pc-stats"><div><b>${st.count}</b><span>練習</span></div><div><b>${st.acc === null ? "—" : st.acc + "%"}</b><span>答對率</span></div><div><b>×${st.combo}</b><span>最佳 Combo</span></div></div>
    </div>
    <div class="pc-foot">APEX ENGLISH · PLAYER CARD · ${esc(th.en)}</div>
    <div class="pc-stickers">${(cfg.stickers || []).map((s, k) => `<span class="stk ${opt.edit && opt.sel === k ? "sel" : ""}" data-k="${k}" style="left:${s.x * 100}%;top:${s.y * 100}%;--s:${s.s};--r:${s.r}deg">${stickerSVG(s.k)}</span>`).join("")}</div>
    <div class="pc-shine"></div>
  </div>`;
}
/* 首頁的名片 */
function homeCardHTML() {
  const who = store.who; if (!who || !cardOf(who)) return "";
  return `<div class="home-card"><div class="pc-holder tilt">${playerCardHTML(who)}</div>
  <div class="row hc-actions"><button class="btn sm" data-act="card-edit">編輯名片</button><button class="btn sm ghost" data-act="tab" data-v="hist">我的 Dashboard</button></div></div>`;
}

/* ---------- 編輯器（彈出名片） ---------- */
let CE = null;   // { who, cfg, sel, welcome }
function openCardEditor(who, welcome) {
  if (!who || document.querySelector(".cm-scrim")) return;
  const old = cardOf(who);
  CE = { who, welcome, cfg: old ? JSON.parse(JSON.stringify(old)) : { bg: CARD_THEMES[Math.floor(Math.random() * CARD_THEMES.length)].id, stickers: [] }, sel: -1 };
  const sc = document.createElement("div"); sc.className = "cm-scrim"; sc.setAttribute("role", "dialog"); sc.setAttribute("aria-modal", "true"); sc.setAttribute("aria-label", "打造你的專屬名片");
  sc.innerHTML = `<div class="cm-stage"><div class="cm-wrap">${playerCardHTML(who, CE.cfg, { edit: true, sel: -1 })}</div></div><div class="cm-panel glass" hidden>${cmPanelHTML()}</div>`;
  document.body.appendChild(sc);
  const wrap = sc.querySelector(".cm-wrap"), panel = sc.querySelector(".cm-panel");
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  sc.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 220, fill: "both" });
  const showPanel = () => { panel.hidden = false; panel.animate([{ opacity: 0, transform: "translateY(18px)" }, { opacity: 1, transform: "none" }], { duration: 320, easing: "cubic-bezier(.16,1,.3,1)", fill: "both" }); };
  if (reduce || !welcome) {
    wrap.animate([{ opacity: 0, transform: "scale(.94)" }, { opacity: 1, transform: "none" }], { duration: reduce ? 150 : 320, easing: "cubic-bezier(.16,1,.3,1)", fill: "both" });
    showPanel(); return;
  }
  // 歡迎動畫：從下方翻起、放大到接近全螢幕，停一下再退回 70%
  requestAnimationFrame(() => {
    const r = wrap.getBoundingClientRect(), big = Math.min(innerWidth * .94 / r.width, innerHeight * .82 / r.height);
    const dy = innerHeight / 2 - (r.top + r.height / 2);
    const a = wrap.animate([
      { transform: `translateY(${dy + innerHeight * .45}px) scale(.2) rotateX(70deg) rotateZ(-6deg)`, opacity: 0 },
      { transform: `translateY(${dy}px) scale(${big}) rotateX(0deg) rotateZ(0deg)`, opacity: 1, offset: .36, easing: "cubic-bezier(.16,1,.3,1)" },
      { transform: `translateY(${dy}px) scale(${big * .985}) rotateX(0deg)`, opacity: 1, offset: .64, easing: "cubic-bezier(.22,1,.36,1)" },
      { transform: "none", opacity: 1 }
    ], { duration: 2100, easing: "cubic-bezier(.22,1,.36,1)", fill: "both" });
    const shine = wrap.querySelector(".pc-shine"); if (shine) shine.animate([{ transform: "translateX(-120%) skewX(-18deg)" }, { transform: "translateX(220%) skewX(-18deg)" }], { duration: 900, delay: 700, easing: "ease-in-out" });
    a.onfinish = showPanel;
    sc.addEventListener("pointerdown", () => { if (a.playState === "running") a.finish(); }, { once: true });
  });
}
function cmPanelHTML() {
  const c = CE.cfg, s = CE.sel >= 0 ? c.stickers[CE.sel] : null;
  return `<div class="cm-head"><h3>${CE.welcome ? `Welcome, ${esc(CE.who)}！打造你的專屬名片` : "編輯名片"}</h3><span class="muted" style="font-size:13px">等級和數據會隨練習自動更新</span></div>
  <div class="cm-label">背景</div>
  <div class="cm-bgs">${CARD_THEMES.map(t => `<button class="cm-bg ${c.bg === t.id ? "on" : ""}" data-act="cm-bg" data-v="${t.id}" aria-pressed="${c.bg === t.id}"><img src="img/card/${t.id}-s.webp" alt="" loading="lazy"><span><b>${esc(t.name)}</b><small>${esc(t.style)}</small></span></button>`).join("")}</div>
  <div class="cm-label">小物件 <span class="muted">點一下加到名片上，可以拖曳位置（${c.stickers.length} / ${MAX_STICKERS}）</span></div>
  <div class="cm-stk">${Object.entries(STICKERS).map(([k, [n]]) => `<button class="cm-sk" data-act="cm-add" data-v="${k}" aria-label="加入${esc(n)}" title="${esc(n)}">${stickerSVG(k)}</button>`).join("")}</div>
  <div class="cm-tools ${s ? "" : "off"}">${s ? `<span class="muted" style="font-size:13px">已選取：${esc(STICKERS[s.k][0])}</span>
    <button class="btn sm" data-act="cm-scale" data-v="-1" aria-label="縮小">－</button><button class="btn sm" data-act="cm-scale" data-v="1" aria-label="放大">＋</button>
    <button class="btn sm" data-act="cm-rot" aria-label="旋轉">↻</button><button class="btn sm" data-act="cm-front" aria-label="移到最上層">置頂</button><button class="btn sm danger-ghost" data-act="cm-del">刪除</button>`
    : `<span class="muted" style="font-size:13px">點名片上的小物件可以縮放、旋轉或刪除</span>`}</div>
  <div class="row cm-actions"><button class="btn ghost" data-act="cm-close">${CE.welcome ? "先用這樣" : "取消"}</button><button class="btn primary" data-act="cm-done">${I.check}完成</button></div>`;
}
function cmRefresh(cardToo) {
  const sc = document.querySelector(".cm-scrim"); if (!sc) return;
  if (cardToo) sc.querySelector(".cm-wrap").innerHTML = playerCardHTML(CE.who, CE.cfg, { edit: true, sel: CE.sel });
  else sc.querySelectorAll(".pc-stickers .stk").forEach(el => el.classList.toggle("sel", +el.dataset.k === CE.sel));
  sc.querySelector(".cm-panel").innerHTML = cmPanelHTML();
}
function closeCardEditor(saveIt) {
  const sc = document.querySelector(".cm-scrim"); if (!sc || !CE) return;
  if (saveIt || CE.welcome) { (store.cards || (store.cards = {}))[CE.who] = Object.assign(CE.cfg, { updated: Date.now() }); save(true); }
  const out = sc.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 200, fill: "forwards" });
  const w = sc.querySelector(".cm-wrap"); if (w && saveIt) w.animate([{ transform: "none" }, { transform: "translateY(-12px) scale(.96)" }], { duration: 200, fill: "forwards" });
  out.onfinish = () => { sc.remove(); CE = null; if (view === "home" || view === "hist") rerenderKeep(); };
  if (saveIt) toast("名片已儲存");
}
document.addEventListener("click", e => {
  const a = e.target.closest("[data-act]"); if (!a) return;
  const act = a.dataset.act, v = a.dataset.v;
  if (act === "card-edit") { openCardEditor(a.dataset.who || store.who, false); return; }
  if (!CE || !act.startsWith("cm-")) return;
  const c = CE.cfg;
  if (act === "cm-bg") { c.bg = v; cmRefresh(true); }
  if (act === "cm-add") {
    if (c.stickers.length >= MAX_STICKERS) { toast(`最多 ${MAX_STICKERS} 個小物件`); return; }
    c.stickers.push({ k: v, x: .2 + Math.random() * .6, y: .25 + Math.random() * .5, s: 1, r: Math.round((Math.random() - .5) * 24) }); CE.sel = c.stickers.length - 1; cmRefresh(true);
    const el = document.querySelector(`.cm-wrap .stk[data-k="${CE.sel}"]`); if (el) el.animate([{ transform: "translate(-50%,-50%) scale(0) rotate(-40deg)" }, { transform: `translate(-50%,-50%) scale(${1.15}) rotate(var(--r))`, offset: .7 }, { transform: "translate(-50%,-50%) scale(var(--s)) rotate(var(--r))" }], { duration: 380, easing: "cubic-bezier(.16,1,.3,1)" });
  }
  const s = c.stickers[CE.sel];
  if (s && act === "cm-scale") { s.s = Math.max(.5, Math.min(2, Math.round((s.s + (+v) * .15) * 100) / 100)); cmRefresh(true); }
  if (s && act === "cm-rot") { s.r = ((s.r + 15 + 180) % 360) - 180; cmRefresh(true); }
  if (s && act === "cm-front") { c.stickers.push(c.stickers.splice(CE.sel, 1)[0]); CE.sel = c.stickers.length - 1; cmRefresh(true); }
  if (s && act === "cm-del") { c.stickers.splice(CE.sel, 1); CE.sel = -1; cmRefresh(true); }
  if (act === "cm-close") closeCardEditor(false);
  if (act === "cm-done") closeCardEditor(true);
});
/* 拖曳小物件 */
let DRAG = null;
document.addEventListener("pointerdown", e => {
  const st = CE && e.target.closest(".cm-wrap .stk"); if (!st) return;
  const card = st.closest(".pcard"), k = +st.dataset.k, r = card.getBoundingClientRect();
  CE.sel = k; DRAG = { k, r, x0: e.clientX, y0: e.clientY, moved: false, el: st };
  st.setPointerCapture(e.pointerId); cmRefresh(false); e.preventDefault();
});
document.addEventListener("pointermove", e => {
  if (!DRAG || !CE) return;
  if (!DRAG.moved && Math.hypot(e.clientX - DRAG.x0, e.clientY - DRAG.y0) < 4) return;
  DRAG.moved = true;
  const s = CE.cfg.stickers[DRAG.k]; s.x = Math.max(0, Math.min(1, (e.clientX - DRAG.r.left) / DRAG.r.width)); s.y = Math.max(0, Math.min(1, (e.clientY - DRAG.r.top) / DRAG.r.height));
  DRAG.el.style.left = s.x * 100 + "%"; DRAG.el.style.top = s.y * 100 + "%";
});
document.addEventListener("pointerup", () => { DRAG = null; });
document.addEventListener("keydown", e => { if (e.key === "Escape" && CE) closeCardEditor(false); });
/* 首頁、Dashboard 的名片：滑鼠移動時輕微立體傾斜（觸控裝置不動） */
document.addEventListener("pointermove", e => {
  if (e.pointerType !== "mouse") return;
  const h = e.target.closest && e.target.closest(".pc-holder.tilt");
  document.querySelectorAll(".pc-holder.tilt").forEach(x => { if (x !== h) { x.style.setProperty("--rx", "0deg"); x.style.setProperty("--ry", "0deg"); } });
  if (!h) return;
  const r = h.getBoundingClientRect(), px = (e.clientX - r.left) / r.width - .5, py = (e.clientY - r.top) / r.height - .5;
  h.style.setProperty("--rx", (-py * 7).toFixed(2) + "deg"); h.style.setProperty("--ry", (px * 9).toFixed(2) + "deg"); h.style.setProperty("--gx", (px * 100 + 50).toFixed(0) + "%");
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
  const st = playerStats(who, atts), lv = st.lv, title = titleOf(lv.L), hasCard = !!cardOf(who) || opt.cfg;
  const maxA = Math.max(1, ...st.activity.map(a => a.n));
  const wk = ["日", "一", "二", "三", "四", "五", "六"];
  return `<section class="dash" aria-label="${esc(who)} 的個人 Dashboard">
  <div class="dash-hero">
    <div class="pc-holder tilt">${playerCardHTML(who, opt.cfg || cardOf(who), { stats: st })}</div>
    <div class="dash-lv">
      <div class="dash-ring" style="--p:${Math.round(lv.cur / lv.need * 100)}"><b>Lv ${lv.L}</b><span>${lv.cur} / ${lv.need} XP</span></div>
      <div><div style="font-size:18px;font-weight:750">${esc(title[1])}</div><div class="muted" style="font-size:13px">${esc(title[2])}・距離下一級還差 ${lv.need - lv.cur} XP</div>
      ${opt.readonly ? "" : `<div class="row" style="margin-top:10px"><button class="btn sm" data-act="card-edit" data-who="${esc(who)}">${hasCard ? "編輯名片" : "建立名片"}</button></div>`}</div>
    </div>
  </div>
  <div class="dash-grid">
    <div class="dg dg-stat"><span>練習次數</span><b class="tnum">${st.count}</b><small>共作答 ${st.answered} 題</small></div>
    <div class="dg dg-stat"><span>平均答對率</span><b class="tnum" style="color:${st.acc === null ? "inherit" : scoreColor(st.acc / 100)}">${st.acc === null ? "—" : st.acc + "%"}</b><small>不含單字練習</small></div>
    <div class="dg dg-stat"><span>最佳 Combo</span><b class="tnum" style="color:var(--gold)">×${st.combo}</b><small>連續答對最多題</small></div>
    <div class="dg dg-stat"><span>連續練習</span><b class="tnum">${st.streak}<small style="font-size:15px"> 天</small></b><small>${st.streak ? "保持下去！" : "今天練一下就開始計算"}</small></div>
    <div class="dg dg-stat"><span>總練習時間</span><b class="tnum">${st.time >= 3600 ? `${Math.floor(st.time / 3600)}<small style="font-size:15px"> 時 </small>${Math.round(st.time % 3600 / 60)}<small style="font-size:15px"> 分</small>` : `${Math.round(st.time / 60)}<small style="font-size:15px"> 分鐘</small>`}</b><small>生字 ${st.words} 個</small></div>
    <div class="dg dg-wide"><span>最近 14 天</span><div class="dg-act">${st.activity.map(a => `<i style="--a:${a.n ? .25 + .75 * a.n / maxA : 0}" title="${a.d.getMonth() + 1}/${a.d.getDate()}：${a.n} 次"><em>${wk[a.d.getDay()]}</em></i>`).join("")}</div></div>
    <div class="dg dg-wide"><span>最近 ${st.recent.length} 次成績</span>${st.recent.length ? `<div class="dg-trend">${st.recent.map(a => { const p = a.score / a.total; return `<i style="height:${Math.max(6, p * 100)}%;background:${scoreColor(p)}" title="${esc(a.title)}：${Math.round(p * 100)}%"></i>`; }).join("")}</div>` : `<div class="muted" style="font-size:13.5px">做完第一份練習就會出現。</div>`}</div>
  </div></section>`;
}
