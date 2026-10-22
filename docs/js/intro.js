/* ===== 開場動畫：玻璃字母方塊從上方輕輕落下、在底部堆疊；品牌字 Apex English 一個字母一個字母落定 =====
   放在 <body> 最前面同步執行（題庫還在載入時就開始播）；點一下或按任意鍵可以跳過；
   減少動態效果時只淡入品牌字。CSS 有保險：就算 JS 出錯，3.5 秒後遮罩也會自動消失。 */
(function () {
  const el = document.getElementById("intro");
  if (!el) return;
  if (/[?&]nointro\b/.test(location.search)) { el.remove(); return; }   // 開場動畫試驗頁（intro-lab.html）內嵌網站時不播
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const W = innerWidth, H = innerHeight, t0 = performance.now();
  const MIN = reduce ? 650 : 2200, MAX = 6000;
  let ready = false, leaving = false;
  const anims = [];
  const ease = { gravity: "cubic-bezier(.45,0,.9,.55)", out: "cubic-bezier(.16,1,.3,1)" };

  /* 品牌字 */
  const mark = document.createElement("div");
  mark.className = "intro-mark";
  const word = (txt, cls) => `<span class="${cls}">${[...txt].map(c => `<span class="il">${c}</span>`).join("")}</span>`;
  mark.innerHTML = `${word("Apex", "iw1")}${word("English", "iw2")}<span class="intro-line"></span><span class="intro-by">Created and designed by Allen L.</span>`;
  el.appendChild(mark);

  if (reduce) {
    anims.push(mark.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 300, fill: "both" }));
  } else {
    /* 底部的字母堆：依欄位往上疊，每塊帶一點旋轉，落地時輕輕一沉 */
    const s = Math.round(Math.max(30, Math.min(52, W / 13)));
    const cols = Math.max(6, Math.floor(W / (s * 1.06)));
    const gap = (W - cols * s) / (cols + 1);
    const heights = new Array(cols).fill(0);
    const n = Math.min(70, Math.round(cols * 2.4));
    const A = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const pile = document.createDocumentFragment();
    for (let k = 0; k < n; k++) {
      // 中間略高、兩側略低，像自然堆起的小丘
      let c, tries = 0;
      do { c = Math.floor(Math.random() * cols); tries++; } while (tries < 4 && heights[c] > 2.6 - Math.abs(c - cols / 2) / (cols / 2) * 1.6 && Math.random() < .8);
      const level = heights[c]++;
      const x = gap + c * (s + gap) + (Math.random() - .5) * gap * .8;
      const y = H - (level + 1) * s * .98 - 6;
      const r0 = (Math.random() - .5) * 70, r1 = (Math.random() - .5) * 16;
      const t = document.createElement("span");
      t.className = "it" + (Math.random() < .14 ? " solid" : "");
      t.textContent = A[Math.floor(Math.random() * 26)];
      t.style.cssText = `width:${s}px;height:${s}px;font-size:${Math.round(s * .5)}px;left:${x}px;top:0`;
      pile.appendChild(t);
      const delay = k / n * 900 + Math.random() * 140 + level * 60, dur = 720 + Math.random() * 260;
      anims.push(t.animate([
        { transform: `translateY(${-s - 40 - Math.random() * H * .4}px) rotate(${r0}deg)`, opacity: 0 },
        { opacity: 1, offset: .08 },
        { transform: `translateY(${y}px) rotate(${r1}deg)`, offset: .86, easing: "ease-out" },
        { transform: `translateY(${y - 3}px) rotate(${r1 * .7}deg)`, offset: .93 },
        { transform: `translateY(${y}px) rotate(${r1 * .8}deg)`, opacity: 1 }
      ], { duration: dur, delay, easing: ease.gravity, fill: "both" }));
    }
    el.appendChild(pile);

    /* 品牌字母：一個一個落下定位 */
    mark.querySelectorAll(".il").forEach((l, k) => {
      const big = l.parentNode.classList.contains("iw1"), d = big ? 240 + k * 85 : 520 + (k - 4) * 55;
      anims.push(l.animate([
        { transform: `translateY(${-H * .55}px) rotate(${(Math.random() - .5) * 24}deg)`, opacity: 0, filter: "blur(6px)" },
        { opacity: 1, filter: "blur(0)", offset: .45 },
        { transform: "translateY(0) rotate(0)", offset: .82, easing: "ease-out" },
        { transform: "translateY(-2px)", offset: .91 },
        { transform: "none", opacity: 1, filter: "blur(0)" }
      ], { duration: big ? 760 : 680, delay: d, easing: ease.gravity, fill: "both" }));
    });
    anims.push(mark.querySelector(".intro-line").animate([{ transform: "scaleX(0)" }, { transform: "scaleX(1)" }], { duration: 600, delay: 1050, easing: ease.out, fill: "both" }));
    anims.push(mark.querySelector(".intro-by").animate([{ opacity: 0, transform: "translateY(6px)" }, { opacity: 1, transform: "none" }], { duration: 500, delay: 1200, easing: ease.out, fill: "both" }));
  }

  function leave(fast) {
    if (leaving) return; leaving = true;
    const d = fast ? 260 : reduce ? 300 : 520;
    if (!reduce) {
      el.querySelectorAll(".it").forEach((t, k) => t.animate([{ opacity: 1 }, { transform: getComputedStyle(t).transform + " translateY(" + (H * .35) + "px)", opacity: 0 }],
        { duration: d, delay: fast ? 0 : (k % 9) * 12, easing: "cubic-bezier(.5,0,.75,0)", fill: "forwards", composite: "replace" }));
      mark.animate([{ opacity: 1, transform: "translate(-50%,-50%)", filter: "blur(0)" }, { opacity: 0, transform: "translate(-50%,calc(-50% - 8px)) scale(.97)", filter: "blur(8px)" }], { duration: d, easing: "ease-in", fill: "forwards" });
    }
    const out = el.animate([{ opacity: 1 }, { opacity: 0 }], { duration: d + (reduce ? 0 : 160), easing: "cubic-bezier(.4,0,.2,1)", fill: "forwards" });
    out.onfinish = () => { el.remove(); document.documentElement.classList.remove("intro-on"); };
  }
  const tryLeave = () => { if (!ready) return; const left = MIN - (performance.now() - t0); left <= 20 ? leave(false) : setTimeout(tryLeave, left); };
  window.addEventListener("apex-ready", () => { ready = true; setTimeout(tryLeave, Math.max(0, MIN - (performance.now() - t0))); }, { once: true });
  setTimeout(() => leave(false), MAX);
  const skip = () => leave(true);
  el.addEventListener("pointerdown", skip);
  addEventListener("keydown", skip, { once: true });
  document.documentElement.classList.add("intro-on");
})();
