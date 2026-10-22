/* ===== 開場動畫：景深字雨（遠、中、近三層字母落過畫面）；品牌字 Apex English 一個字母一個字母落定 =====
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
    /* 景深字雨：遠、中、近三層字母落過畫面（近的超大、模糊、很快；遠的小而淡），不在底部堆積 */
    const unit = Math.min(W, H), A = "ABCDEFGHIJKLMNOPQRSTUVWXYZ", rnd = (a, b) => a + Math.random() * (b - a);
    const layers = [{ n: 26, s: [.07, .11], blur: 2.5, op: .35, dur: [1500, 2100], cls: "ghost" }, { n: 16, s: [.14, .22], blur: 0, op: .85, dur: [1100, 1500] }, { n: 6, s: [.38, .6], blur: 7, op: .28, dur: [700, 950], z: 6 }];
    const rain = document.createDocumentFragment();
    layers.forEach(L => { for (let k = 0; k < L.n; k++) {
      const s = Math.round(unit * rnd(L.s[0], L.s[1])), t = document.createElement("span");
      t.className = "it " + (L.cls || (L.z ? "" : Math.random() < .2 ? "solid" : ""));
      t.textContent = A[Math.floor(Math.random() * 26)];
      t.style.cssText = `width:${s}px;height:${s}px;font-size:${Math.round(s * .54)}px;left:0;top:0;${L.blur ? `filter:blur(${L.blur}px);` : ""}${L.z ? `z-index:${L.z};` : ""}`;
      rain.appendChild(t);
      const x = rnd(-s * .3, W - s * .7), r0 = rnd(-40, 40), r1 = r0 + rnd(-30, 30);
      anims.push(t.animate([{ transform: `translate(${x}px,${-s * 1.2}px) rotate(${r0}deg)`, opacity: L.op }, { transform: `translate(${x + rnd(-30, 30)}px,${H + s * .2}px) rotate(${r1}deg)`, opacity: L.op }],
        { duration: rnd(L.dur[0], L.dur[1]), delay: rnd(0, 1900 - L.dur[0] * .4), easing: "cubic-bezier(.4,0,.85,.6)", fill: "both" }));
    } });
    el.appendChild(rain);

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
