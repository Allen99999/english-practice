/* ===== AI 批改：托福 Write an Email、Write for an Academic Discussion（後端 Apps Script → Vertex AI Gemini，評分標準見 apps-script/Ai.gs）
   作答時計時（隨機組卷只計時；正式模擬卷限時 7／10 分鐘、時間到自動送出）→ 交出後 AI 批改 → 顯示：
   Email：估分卡、一句診斷、任務檢核、原文標註＋錯誤清單、語域檢查、替換字、錯誤日誌與分數趨勢、5 分鐘限時重寫、C1／C2 範文
   AD：估分卡、一句診斷、任務檢核（教授問句／同學回應／新增貢獻）、論證鏈、原文標註＋錯誤清單、替換字、升級一句、錯誤日誌（和 Email 共用）、7 分鐘限時重寫、範文 ===== */
const EMAIL_LIMIT = 420, REWRITE_LIMIT = 300;
const AI_DIMS = [["task", "A 任務達成與內容發展"], ["register", "B 社交慣例與語域"], ["syntax", "C 句法多樣性與用字"], ["accuracy", "D 語言正確性"]];
const AI_LEVEL = { 5: "完全成功", 4: "大致成功", 3: "部分成功", 2: "大多不成功", 1: "不成功", 0: "無法計分" };
const AI_STATUS = { ok: ["✅", "完整"], thin: ["⚠️", "偏薄"], missing: ["❌", "缺漏"] };
const AI_SEV = { red: ["🔴", "影響理解，必改"], orange: ["🟠", "明顯錯誤，會扣分"], yellow: ["🟡", "小失誤或可以更好"] };
const isEmailQ = q => q && q.type === "essay" && !!q.mail;
const isDiscQ = q => q && q.type === "essay" && !!q.posts && /Academic Discussion/.test(q.label || "");
const isGeptQ = q => q && q.type === "essay" && !!q.gept;
const isAiQ = q => isEmailQ(q) || isDiscQ(q) || isGeptQ(q);
const AI_CFG = {
  email: { kind: "email", name: "Email", tag: "E", limit: EMAIL_LIMIT, rw: REWRITE_LIMIT, dims: AI_DIMS, words: "100～130", what: "Email" },
  disc: { kind: "disc", name: "Academic Discussion", tag: "AD", limit: 600, rw: 420, words: "120～150", what: "回文",
    dims: [["respond", "A 回應與貢獻"], ["develop", "B 展開與連貫"], ["syntax", "C 句法與用字"], ["accuracy", "D 語言正確性"]] },
  gept: { kind: "gept-para", name: "段落寫作", tag: "G", limit: 0, rw: 0, words: "約 50", what: "短文", dims: [] }
};
const aiCfg = q => isGeptQ(q) ? AI_CFG.gept : isDiscQ(q) ? AI_CFG.disc : AI_CFG.email;
/* 英檢錯誤代碼 → 國中生看得懂的名稱 */
const GEPT_CODE = { G1: "動詞時間（時態）", G2: "主詞和動詞要搭配", G3: "be 動詞和一般動詞混用", G4: "單數、複數", G5: "a／an／the", G6: "介系詞", G7: "詞性用錯", G8: "句子不完整／逗號連接兩句",
  G9: "字的順序", G10: "比較級、最高級", G11: "助動詞與問句", V1: "用字不恰當", V2: "中式英文", V3: "拼字", M1: "大小寫", M2: "標點", O1: "漏寫重點", O2: "順序混亂", O3: "缺少連接詞", O4: "離題、和圖不符", UP: "升級挑戰" };
const GEPT_DIMS = [["T", "任務"], ["O", "組織"], ["G", "文法"], ["V", "用字"], ["M", "格式"]];
const GEPT_REQ = { ok: ["✅", "ok"], partial: ["⚠️", "thin"], missing: ["❌", "missing"] };
const AI_PEER = { advance: ["↗️", "有推進"], restate: ["↔️", "只點名或重述"], none: ["⛔", "未回應"] };
const AI_LINKS = [["claim", "主張"], ["reason", "理由"], ["example", "例子"], ["tieback", "回扣"]];
const bodyWords = t => wcount(String(t || "").split("\n").filter((l, k, arr) => !(k === 0 && /^(dear|hi|hello|to)\b/i.test(l.trim())) && !(k >= arr.length - 3 && /^(best|sincerely|regards|kind regards|thanks|thank you|cheers|warm|all the best|wishing)/i.test(l.trim()) && l.trim().split(/\s+/).length <= 4)).join(" "));
const aiBand = s => s % 1 ? `介於「${AI_LEVEL[Math.ceil(s)]}」與「${AI_LEVEL[Math.floor(s)]}」之間` : AI_LEVEL[s] || "";

/* ---------- 作答畫面 ---------- */
const wcText = (q, t) => isGeptQ(q) ? `${wcount(t)} 字（約 50 字）` : isDiscQ(q) ? `${wcount(t)} 字（建議 120～150 字，至少 100 字）` : `${wcount(t)} 字・本文約 ${bodyWords(t)} 字（建議 100～130 字）`;
function emailHTML(X, i, a, st, m) {
  const q = X.q, K = aiCfg(q), res = a && a.resp, sub = !!a || st.submitted, txt = res ? res.text : (st.val || "");
  const secs = res ? (res.secs || 0) : (st.secs || 0), mock = S.mock, left = K.limit - secs;
  let h = `<div class="eyebrow">${K.name === "Email" ? "Write an Email" : "Academic Discussion"}${mock ? `・限時 ${K.limit / 60} 分鐘` : ""}</div><div class="stem" style="font-size:17px">${esc(q.prompt)}</div>`;
  if (isGeptQ(q)) h = `<div class="eyebrow">段落寫作・看圖寫約 50 字</div><div class="stem" style="font-size:17px">${esc(q.prompt)}</div>
    ${q.img ? `<img class="essay-img" src="${esc(q.img)}" alt="看圖寫作的三格圖" onerror="this.remove()">` : ""}
    ${q.scenes ? `<div class="scenes">${q.scenes.map((s, k) => `<div class="scene"><span class="sn">${k + 1}</span><span data-ctx>${wrapWords(s, m)}</span></div>`).join("")}</div>` : ""}
    ${q.keywords ? `<div class="row" style="gap:6px"><span class="step-label">可以用的字：</span>${q.keywords.map(k => `<span class="tag">${esc(k)}</span>`).join("")}</div>` : ""}`;
  else if (isDiscQ(q)) h += `<div class="posts">${q.posts.map(([who, t], k) => `<div class="post ${k ? "" : "prof"}"><div class="post-who">${esc(who)}</div><div data-ctx>${wrapWords(t, m)}</div></div>`).join("")}</div>`;
  else h += `<div class="boxed" style="font-size:16px" data-ctx>${wrapWords(q.scenario, m)}<ul style="margin:8px 0 0;padding-left:22px">${q.bullets.map(b => `<li data-ctx>${wrapWords(b, m)}</li>`).join("")}</ul></div>
  <div class="mailhead"><div><span>To</span>${esc(q.mail.to)}</div><div><span>Subject</span>${esc(q.mail.subject)}</div></div>`;
  if (!sub) h += `<div class="etimer ${mock && left < 60 ? "low" : !mock && secs > K.limit ? "over" : ""}" id="etime">${emailTimerText(secs, mock, K)}</div>`;
  h += `<textarea class="field essay" id="essayin" spellcheck="false" autocorrect="off" autocapitalize="sentences" placeholder="${isGeptQ(q) ? "Write your paragraph…" : isDiscQ(q) ? "Write your post…" : "Dear …,"}" ${sub ? "readonly" : ""}>${esc(txt)}</textarea>
  <div class="muted tnum" id="wc" style="font-size:13.5px">${wcText(q, txt)}</div>`;
  if (!sub) return h + `<div class="row"><button class="btn primary" data-act="ai-submit">${I.check}寫好了，交給 AI 批改</button></div>
    <div class="muted" style="font-size:12.5px">${isGeptQ(q) ? "AI 依全民英檢官方 0～5 級分標準批改" : "AI 依 ETS 官方 0～5 分標準批改"}，約需 30～90 秒；老師之後也會再看。練習時建議關掉自動校正。</div>`;
  if (st.aiBusy && !a) return h + aiBusyHTML(`AI 正在依 ETS 標準批改你的${K.what}…`);
  if (!a) return h + `<div class="feedback no"><span class="fb-ic">${I.x}</span><div><b>AI 批改沒有完成</b><p>${esc(aiErrText(st.aiErr))}</p></div></div>
    <div class="row"><button class="btn primary" data-act="ai-retry">再試一次</button></div>
    <div class="muted" style="font-size:13px">也可以先看範文自評，之後老師會批改：</div>${modelsHTML(q)}${selfButtonsHTML(q, X.bank, "essay-rate")}`;
  if (!res.ai) return h + modelsHTML(q);   // 舊紀錄或自評（沒有 AI 結果）
  if (isGeptQ(q)) return h + geptFeedbackHTML(q, res, { who: S.who, i });
  return h + aiFeedbackHTML(q, res, { who: S.who, live: true, i }) + rewriteHTML(q, res, st, i) + modelsHTML(q);
}
function emailTimerText(secs, mock, K = AI_CFG.email) {
  if (!K.limit) return `本題用時 <b class="tnum">${fmtTime(secs)}</b>`;
  return mock ? `${I.flag}剩 <b class="tnum">${fmtTime(Math.max(0, K.limit - secs))}</b>・時間到會自動送出`
    : `本題用時 <b class="tnum">${fmtTime(secs)}</b> / 建議 ${fmtTime(K.limit)}${secs > K.limit ? `・已超過 ${fmtTime(secs - K.limit)}` : ""}`;
}
function aiBusyHTML(msg) { return `<div class="ai-busy glass"><span class="ai-spin"></span><div><b>${esc(msg)}</b><div class="muted" style="font-size:13px">大約 30～90 秒，可以先看其他題，批完會自動顯示。</div></div></div>`; }
function aiErrText(e) {
  return { busy: "現在批改的人太多，請稍後再試。", "limit-1h": "AI 批改每小時最多 3 篇，請到下一個整點再試（可以先看範文自評）。", "limit-5h": "AI 批改每 5 小時最多 10 篇，請稍後再試（可以先看範文自評）。", empty: "內容太短，AI 無法批改。", "wrong code": "個人代碼不對，請到「紀錄」頁確認代碼。", "no such name": "這個名字還沒登記，請先完成一次作答讓系統產生代碼。", offline: "沒有網路連線。" }[e] || "連線逾時或發生錯誤，請再試一次。";
}
function modelsHTML(q) {
  if (!q.models) return q.model ? `<div class="model"><div class="step-label">參考範文</div><div class="ptext" style="font-size:16px">${esc(q.model)}</div></div>` : "";
  return `<div class="ai-sec"><h4>📝 範文（C1／C2）</h4><div class="muted" style="font-size:13px">C1 約等於寫作 band 5～5.5、C2 約等於 band 6。比較兩篇的句型和用字差在哪裡。</div>
  ${Object.entries(q.models).map(([lv, t]) => `<details class="pfold model-fold" data-key="m-${lv}"><summary><span><b>${lv} 等級範文</b><span class="muted" style="font-size:13px">・本文約 ${bodyWords(t)} 字</span></span>${I.chevR.replace("<svg", '<svg width="16" height="16"')}</summary><div class="ptext mail-model">${esc(t)}</div></details>`).join("")}
  ${q.exp ? `<div class="muted" style="font-size:13.5px">💡 ${esc(q.exp)}</div>` : ""}</div>`;
}

/* ---------- 批改結果 ---------- */
function aiFeedbackHTML(q, res, opt = {}) {
  const ai = res.ai, K = aiCfg(q), D = isDiscQ(q), secs = res.secs || 0, wc = D ? wcount(res.text) : bodyWords(res.text);
  const dimRow = ([k, n]) => { const d = (ai.dims || {})[k] || {}; const v = Number(d.score) || 0;
    return `<div class="ai-dim"><div class="ai-dim-h"><span>${n}</span><b class="tnum" style="color:${scoreColor(v / 5)}">${v}</b></div><div class="sk-bar"><i style="width:${v / 5 * 100}%;background:${scoreColor(v / 5)}"></i></div><div class="muted" style="font-size:13px">${esc(d.comment || "")}</div></div>`; };
  let h = `<div class="ai-card glass">
  <div class="ai-score"><div class="ai-big" style="color:${scoreColor(ai.score / 5)}">${ai.score}<span>/ 5</span></div><div><div class="eyebrow">📊 AI 估分・ETS ${D ? "Academic Discussion" : "Write an Email"}</div><b style="font-size:18px">${esc(aiBand(ai.score))}</b>
    <div class="row" style="gap:6px;margin-top:6px"><span class="tag">${D ? "" : "本文 "}${wc} 字${wc < (D ? 100 : 80) ? "・偏少" : wc > (D ? 180 : 150) ? "・偏多" : ""}</span><span class="tag ${secs > K.limit ? "warn" : ""}">${secs > K.limit ? "⏱️ " : ""}用時 ${fmtTime(secs)}${secs > K.limit ? `（超過 ${fmtTime(secs - K.limit)}）` : ""}</span></div></div></div>
  <div class="ai-dims">${K.dims.map(dimRow).join("")}</div>
  ${ai.caps && ai.caps.length ? `<div class="ai-caps"><b>觸發封頂規則</b>${ai.caps.map(c => `<div>• ${esc(c)}</div>`).join("")}</div>` : ""}
  <div class="ai-diag">🎯 <b>一句診斷：</b>${esc(ai.diagnosis || "")}</div>
  ${(ai.strengths || []).length ? `<div class="ai-good">${ai.strengths.map(s => `<div>🟢 ${esc(s)}</div>`).join("")}</div>` : ""}</div>`;
  if (D) {
    h += `<div class="ai-sec"><h4>✅ 任務檢核</h4><div class="step-label">（a）教授的問題</div><div class="ai-points">${(ai.questionParts || []).map(p => { const st = AI_STATUS[p.status] || AI_STATUS.thin;
      return `<div class="ai-point ${p.status}"><div class="ai-pt-h"><span>${st[0]} ${st[1]}</span><b>${esc(p.part)}</b></div>${p.quote ? `<div class="ai-quote">「${esc(p.quote)}」</div>` : `<div class="ai-quote muted">（沒有回答這一部分）</div>`}<div class="muted" style="font-size:13.5px">${esc(p.note)}</div></div>`; }).join("")}</div>
    <div class="step-label">（b）同學觀點回應</div><div class="ai-points">${(ai.peers || []).map(p => { const st = AI_PEER[p.status] || AI_PEER.none;
      return `<div class="ai-point ${p.status === "advance" ? "ok" : p.status === "restate" ? "thin" : "missing"}"><div class="ai-pt-h"><span>${st[0]} ${st[1]}</span><b>${esc(p.name)}：${esc(p.stance)}</b></div>${p.quote ? `<div class="ai-quote">「${esc(p.quote)}」</div>` : `<div class="ai-quote muted">（未提及）</div>`}<div class="muted" style="font-size:13.5px">${esc(p.note)}</div></div>`; }).join("")}</div>
    <div class="step-label">（c）我的新增貢獻 🧩</div>${(c => `<div class="ai-point ${c.quote && c.isNew ? "ok" : "thin"}"><div class="ai-pt-h"><span>${c.quote && c.isNew ? "🟢 兩位同學都沒提" : c.quote ? "🟡 同學已經說過" : "⚠️ 沒有新增點"}</span></div>${c.quote ? `<div class="ai-quote">「${esc(c.quote)}」</div>` : ""}<div class="muted" style="font-size:13.5px">${esc(c.note || "")}</div></div>`)(ai.contribution || {})}</div>`;
    const ch = ai.chain || {};
    h += `<div class="ai-sec"><h4>🧱 論證鏈</h4><div class="ai-chain">${AI_LINKS.map(([k, n], x) => `${x ? `<span class="ai-arrow">→</span>` : ""}<div class="ai-link ${ch.broken === k ? "broken" : ch[k] ? "" : "empty"}"><span>${n}${ch.broken === k ? "・⛓️ 斷在這裡" : ""}</span><b>${esc(ch[k] || "（沒有）")}</b></div>`).join("")}</div>
    ${ch.note ? `<div class="muted" style="font-size:13.5px">${esc(ch.note)}</div>` : ""}</div>`;
  } else {
  h += `<div class="ai-sec"><h4>✅ 任務檢核</h4><div class="ai-points">${(ai.points || []).map((p, k) => { const s = AI_STATUS[p.status] || AI_STATUS.thin;
    return `<div class="ai-point ${p.status}"><div class="ai-pt-h"><span>${s[0]} ${s[1]}</span><b>要點 ${k + 1}：${esc(p.point)}</b></div>${p.quote ? `<div class="ai-quote">「${esc(p.quote)}」</div>` : `<div class="ai-quote muted">（沒有回應這一點）</div>`}<div class="muted" style="font-size:13.5px">${esc(p.note)}</div></div>`; }).join("")}</div></div>`;
  }
  const errs = ai.errors || [];
  h += `<div class="ai-sec"><h4>🔍 原文標註與錯誤清單</h4><div class="muted" style="font-size:12.5px">${Object.values(AI_SEV).map(([e, t]) => `${e} ${t}`).join("　")}</div>
  <div class="ptext ai-essay">${markEssay(res.text, errs)}</div>
  ${errs.length ? `<ol class="ai-errs">${errs.map((e, k) => `<li id="aie-${opt.i ?? "x"}-${k}"><span class="ai-sev"><b class="tnum">${k + 1}</b>${(AI_SEV[e.severity] || AI_SEV.yellow)[0]}</span><div><div><s>${esc(e.original)}</s> → <b>${esc(e.corrected)}</b></div><div class="muted" style="font-size:13px">${esc(e.category || "")}｜${esc(e.rule)}</div></div></li>`).join("")}</ol>` : `<div class="muted">沒有找到明顯錯誤，做得好！</div>`}</div>`;
  const rc = ai.registerCheck || {};
  if (!D) h += `<div class="ai-sec"><h4>🗣️ 語域檢查</h4><dl class="kv ai-kv"><dt>稱謂</dt><dd>${esc(rc.greeting || "")}</dd><dt>結尾署名</dt><dd>${esc(rc.closing || "")}</dd><dt>請求句</dt><dd>${esc(rc.requests || "")}</dd><dt>語氣跳動</dt><dd>${esc(rc.toneShifts || "")}</dd></dl></div>`;
  if ((ai.upgrades || []).length) h += `<div class="ai-sec"><h4>🔄 替換字</h4><div class="ai-ups">${ai.upgrades.map(u => `<div class="ai-up"><div><s>${esc(u.vague)}</s> → <b>${esc(u.better)}</b></div><div class="muted" style="font-size:13.5px">${esc(u.example)}</div></div>`).join("")}</div></div>`;
  const us = ai.upgradeSentence;
  if (D && us && us.original) h += `<div class="ai-sec"><h4>✍️ 升級一句</h4><div class="ai-up"><div><s>${esc(us.original)}</s></div><div>→ <b>${esc(us.improved)}</b></div><div class="muted" style="font-size:13.5px">${esc(us.why || "")}</div></div></div>`;
  if (ai.nextFocus) h += `<div class="ai-next">📌 <b>下一篇只練一件事：</b>${esc(ai.nextFocus)}</div>`;
  if (opt.who !== undefined && !opt.noLog) h += emailLogHTML(opt.who, opt.atts, K);
  return h;
}
/* 原文標註：把 AI 指出的錯誤片段在原文裡標色（找不到的片段只列在清單） */
function markEssay(text, errs) {
  const spans = []; const lower = String(text);
  errs.forEach((e, k) => {
    const o = String(e.original || "").trim(); if (!o) return;
    let from = 0, at = -1;
    while ((at = lower.indexOf(o, from)) >= 0 && spans.some(s => at < s.end && at + o.length > s.start)) from = at + 1;
    if (at < 0) { const re = new RegExp(o.replace(/[.*+?^${}()|[\]\\]/g, "\\$&").replace(/\s+/g, "\\s+"), "i"), mm = re.exec(lower); if (mm && !spans.some(s => mm.index < s.end && mm.index + mm[0].length > s.start)) at = mm.index, spans.push({ start: at, end: at + mm[0].length, k, sev: e.severity }); return; }
    spans.push({ start: at, end: at + o.length, k, sev: e.severity });
  });
  spans.sort((a, b) => a.start - b.start);
  let out = "", p = 0;
  spans.forEach(s => { out += esc(lower.slice(p, s.start)) + `<mark class="m-${s.sev}" title="${esc(errs[s.k].corrected)}">${esc(lower.slice(s.start, s.end))}<sup>${s.k + 1}</sup></mark>`; p = s.end; });
  return out + esc(lower.slice(p));
}

/* ---------- 限時重寫（Email 5 分鐘、AD 7 分鐘） ---------- */
function rewriteHTML(q, res, st, i) {
  const rws = res.rewrites || [], rw = st.rw, K = aiCfg(q), M = K.rw / 60;
  let h = `<div class="ai-sec"><h4>✍️ 限時重寫（${M} 分鐘）</h4>`;
  if (rws.length) h += rws.map((r, k) => { const prev = k ? rws[k - 1].ai.score : res.ai.score, d = r.ai.score - prev;
    return `<details class="pfold rw-fold" data-key="rw-${k}"><summary><span>第 ${k + 1} 次重寫：<b style="color:${scoreColor(r.ai.score / 5)}">${r.ai.score} / 5</b> <span class="tag ${d > 0 ? "up" : d < 0 ? "down" : ""}">${d > 0 ? "📈 +" + d : d < 0 ? "📉 " + d : "➖ 持平"}</span><span class="muted" style="font-size:13px">・用時 ${fmtTime(r.secs || 0)}</span></span>${I.chevR.replace("<svg", '<svg width="16" height="16"')}</summary>
    ${aiFeedbackHTML(q, r, { noLog: true, i: i + "r" + k })}</details>`; }).join("");
  if (rw && rw.busy) return h + aiBusyHTML("AI 正在批改你的重寫…") + `</div>`;
  if (rw && !rw.done) return h + `<div class="muted" style="font-size:13.5px">參考上面的回饋，同一題在 ${M} 分鐘內重寫一次，時間到會自動送出。</div>
    <div class="etimer ${K.rw - (rw.secs || 0) < 60 ? "low" : ""}" id="rwtime">${I.flag}剩 <b class="tnum">${fmtTime(Math.max(0, K.rw - (rw.secs || 0)))}</b></div>
    <textarea class="field essay" id="rwin" spellcheck="false" autocorrect="off" placeholder="重寫你的${K.what}…">${esc(rw.val || "")}</textarea>
    ${rw.err ? `<div class="muted" style="color:var(--bad)">${esc(aiErrText(rw.err))}</div>` : ""}
    <div class="row"><button class="btn primary" data-act="rw-submit">送出重寫</button></div></div>`;
  return h + `<div class="row"><button class="btn" data-act="rw-start">${I.redo}${rws.length ? "再重寫一次" : `開始 ${M} 分鐘重寫`}</button></div></div>`;
}

/* ---------- 錯誤日誌（Email＋AD 共用）與分數趨勢（只看同一題型），同一個名字 ---------- */
function emailHistory(who, atts) {
  const list = [];
  const take = (att, date) => (att.qs || []).forEach((r, i) => { const a = (att.ans || {})[i], X = a && getQ(i, att); if (X && isAiQ(X.q) && a.resp && a.resp.ai) list.push({ date, ai: a.resp.ai, rewrites: a.resp.rewrites || [], kind: aiCfg(X.q).kind }); });
  (atts || store.attempts.filter(x => (x.who || "未署名") === (who || "未署名"))).forEach(att => take(att, att.date || 0));
  if (!atts && S && S.who === who && !store.attempts.some(x => x.id === S.id)) take(S, Date.now());
  return list.sort((a, b) => a.date - b.date);
}
function emailLogHTML(who, atts, K = AI_CFG.email) {
  const hist = emailHistory(who, atts); if (!hist.length) return "";
  const nth = { email: 0, disc: 0 }; hist.forEach(e => e.no = AI_CFG[e.kind].tag + (++nth[e.kind]));
  const cats = {};
  hist.forEach((e, n) => (e.ai.errors || []).forEach(x => { const c = x.category || "其他", o = cats[c] || (cats[c] = { n: 0, essays: new Set(), last: null, lastN: -1 }); o.n++; o.essays.add(n); o.last = x; o.lastN = n; o.lastNo = e.no; }));
  const N = hist.length, rows = Object.entries(cats).map(([c, o]) => ({ c, ...o, status: N - 1 - o.lastN >= 3 ? "🟢" : (o.essays.size > 1 || o.n >= 2) ? "🔴" : "🟡" })).sort((a, b) => ({ "🔴": 0, "🟡": 1, "🟢": 2 }[a.status] - { "🔴": 0, "🟡": 1, "🟢": 2 }[b.status]) || b.n - a.n);
  const mine = hist.filter(e => e.kind === K.kind), recent = mine.slice(-10), W = 100 / Math.max(recent.length, 1);
  const bars = recent.map((e, k) => `<div class="tr-col" style="width:${W}%"><div class="tr-bar" style="height:${e.ai.score / 5 * 100}%;background:${scoreColor(e.ai.score / 5)}"><span>${e.ai.score}</span></div><div class="tr-x">${k + 1}</div></div>`).join("");
  const dimAvg = recent.length ? K.dims.map(([k, n]) => { const last = recent.slice(-3), v = last.reduce((s, e) => s + (Number((e.ai.dims || {})[k] && e.ai.dims[k].score) || 0), 0) / last.length; return [n, Math.round(v * 10) / 10]; }) : [];
  return `<div class="ai-sec ai-log"><h4>📒 ${esc(who || "")} 的寫作錯誤日誌（Email＋AD 共用）與 ${K.name} 分數趨勢</h4>
  <div class="muted" style="font-size:12.5px">累積 ${N} 篇（Email ${nth.email}、AD ${nth.disc}）。🔴 重複出現　🟡 偶爾出現　🟢 連續 3 篇沒再犯</div>
  ${rows.length ? `<table class="vtable ai-logt"><thead><tr><th>狀態</th><th>錯誤類型</th><th>次數</th><th>最近一次</th></tr></thead><tbody>${rows.map(r => `<tr><td>${r.status}</td><td>${esc(r.c)}</td><td class="tnum">${r.n}</td><td><span class="tag">${esc(r.lastNo)}</span> <s>${esc(r.last.original)}</s> → <b>${esc(r.last.corrected)}</b></td></tr>`).join("")}</tbody></table>` : ""}
  ${recent.length ? `<div class="step-label" style="margin-top:6px">${K.name} 最近 ${recent.length} 篇任務分</div><div class="trend">${bars}</div>` : ""}
  <div class="ai-dimavg">${dimAvg.map(([n, v]) => `<span class="tag">${esc(n.split(" ")[0])} ${esc(n.split(" ")[1])} ${v}</span>`).join("")}<span class="muted" style="font-size:12px">（最近 3 篇平均）</span></div></div>`;
}

/* ---------- 計時、送出、重寫 ---------- */
function emailTick() {
  if (!S || view !== "quiz") return;
  const i = S.idx, X = getQ(i); if (!X || !isAiQ(X.q)) return;
  const K = aiCfg(X.q);
  const w = work(i);
  if (!S.ans[i] && !w.submitted) {
    w.secs = (w.secs || 0) + 1;
    const el = $("#etime"); if (el) { el.innerHTML = emailTimerText(w.secs, S.mock, K); el.classList.toggle("low", S.mock && K.limit - w.secs < 60); el.classList.toggle("over", !S.mock && w.secs > K.limit); }
    if (S.mock && K.limit && w.secs >= K.limit) { toast(`${K.limit / 60} 分鐘到，自動送出`); emailSubmit(true); }
  } else if (w.rw && !w.rw.done && !w.rw.busy) {
    w.rw.secs = (w.rw.secs || 0) + 1; const inp = $("#rwin"); if (inp) w.rw.val = inp.value;
    const el = $("#rwtime"); if (el) { el.innerHTML = `${I.flag}剩 <b class="tnum">${fmtTime(Math.max(0, K.rw - w.rw.secs))}</b>`; el.classList.toggle("low", K.rw - w.rw.secs < 60); }
    if (w.rw.secs >= K.rw) { toast(`${K.rw / 60} 分鐘到，自動送出重寫`); rewriteSubmit(true); }
  }
}
function emailSubmit(auto) {
  const i = S.idx, w = work(i), inp = $("#essayin"); if (inp) w.val = inp.value;
  if (!auto && wcount(w.val) < 5) { toast("先寫幾句再交出"); return; }
  w.submitted = true; save(true); aiRun(S, i, "first");
}
function rewriteSubmit(auto) {
  const w = work(S.idx), inp = $("#rwin"); if (inp) w.rw.val = inp.value;
  if (!auto && wcount(w.rw.val) < 5) { toast("先寫幾句再送出"); return; }
  aiRun(S, S.idx, "rw");
}
async function aiRun(sess, i, mode) {
  const X = getQ(i, sess), q = X.q, w = sess.work[i] || (sess.work[i] = {}), rw = mode === "rw";
  const text = rw ? w.rw.val : w.val, secs = rw ? w.rw.secs : w.secs;
  const refresh = () => { save(true); if (S === sess && view === "quiz") rerenderKeep(); };
  if (rw) { w.rw.busy = true; w.rw.err = ""; } else { w.aiBusy = true; w.aiErr = ""; }
  refresh();
  const payload = { action: "aigrade", kind: aiCfg(q).kind, name: sess.who, code: store.codes[sess.who] || "", essay: text, secs,
    task: isGeptQ(q) ? { prompt: q.prompt, scenes: q.scenes, keywords: q.keywords } : isDiscQ(q) ? { prompt: q.prompt, posts: q.posts } : { scenario: q.scenario, bullets: q.bullets, to: q.mail.to, subject: q.mail.subject } };
  if (!payload.code && store.teacherCode) payload.teacherCode = store.teacherCode;
  try {
    if (typeof SYNC_ON === "undefined" || !SYNC_ON) { const e = new Error("offline"); e.server = true; throw e; }
    if (!payload.code && !payload.teacherCode && typeof ensureCode === "function") { await ensureCode(sess.who); payload.code = store.codes[sess.who] || ""; }
    const r = await postSync(payload, 300000), ai = r.result;
    if (isGeptQ(q)) ai.score = Math.max(0, Math.min(5, Math.round(Number(ai.level)) || 0));
    ai.score = Math.max(0, Math.min(5, Math.round(Number(ai.score) * 2) / 2 || 0));
    if (rw) { const a = sess.ans[i]; (a.resp.rewrites || (a.resp.rewrites = [])).push({ text, secs, ai, model: r.model }); w.rw = null; }
    else {
      const resp = { text, level: ai.score, ai, model: r.model, secs }, correct = grade(q, resp);
      sess.ans[i] = { resp, correct, hint: false, t: Math.round(sess.elapsed), max: maxPts(q, X.bank), sys: correct, ai: true };
      sess.ans[i].pts = ptsOf(q, X.bank, sess.ans[i]); w.aiBusy = false;
      if (S === sess && sess.idx === i) sfxGood(1);
    }
  } catch (e) {
    const msg = e.server ? e.message : e.name === "AbortError" ? "timeout" : "error";
    if (rw) { if (w.rw) { w.rw.busy = false; w.rw.err = msg; } } else { w.aiBusy = false; w.aiErr = msg; }
  }
  refresh();
}

document.addEventListener("click", e => {
  const act = e.target.closest("[data-act]"); if (!act || !S) return;
  const a = act.dataset.act;
  if (a === "ai-submit") emailSubmit(false);
  if (a === "ai-retry") { const w = work(S.idx); aiRun(S, S.idx, "first"); }
  if (a === "rw-start") { const w = work(S.idx); w.rw = { secs: 0, val: "" }; save(); rerenderKeep(); setTimeout(() => { const t = $("#rwin"); if (t) t.focus(); }, 50); }
  if (a === "rw-submit") rewriteSubmit(false);
});
document.addEventListener("input", e => {
  if (!S || !e.target) return;
  if (e.target.id === "rwin") { const w = work(S.idx); if (w.rw) w.rw.val = e.target.value; }
  if (e.target.id === "essayin") { const q = (getQ(S.idx) || {}).q; if (isAiQ(q)) { const c = $("#wc"); if (c) c.textContent = wcText(q, e.target.value); } }
});

/* ---------- 解析頁、老師批改頁 ---------- */
function rewritesStaticHTML(q, res, key) {
  return (res.rewrites || []).map((r, k) => { const prev = k ? res.rewrites[k - 1].ai.score : res.ai.score, d = r.ai.score - prev;
    return `<details class="pfold rw-fold" data-key="${key}-rw-${k}"><summary><span>第 ${k + 1} 次限時重寫：<b style="color:${scoreColor(r.ai.score / 5)}">${r.ai.score} / 5</b> <span class="tag ${d > 0 ? "up" : d < 0 ? "down" : ""}">${d > 0 ? "📈 +" + d : d < 0 ? "📉 " + d : "➖ 持平"}</span></span>${I.chevR.replace("<svg", '<svg width="16" height="16"')}</summary>
    ${aiFeedbackHTML(q, r, { noLog: true, i: key + "r" + k })}</details>`; }).join("");
}
function aiReviewHTML(q, a, att, i) {
  const res = a && a.resp;
  if (!res || !res.ai) return modelsHTML(q);
  if (isGeptQ(q)) { const who = att.who || "未署名", remote = typeof isRemote === "function" && isRemote(att);
    const pool = (remote && typeof allAttempts === "function" ? allAttempts() : store.attempts).filter(x => (x.who || "未署名") === who);
    return `<div class="ai-review">${geptFeedbackHTML(q, res, { who, atts: pool, i: "v" + i })}</div>`; }
  const who = att.who || "未署名", remote = typeof isRemote === "function" && isRemote(att);
  const pool = (remote && typeof allAttempts === "function" ? allAttempts() : store.attempts).filter(x => (x.who || "未署名") === who);
  return `<div class="ai-review">${aiFeedbackHTML(q, res, { who, atts: pool, i: "v" + i })}${rewritesStaticHTML(q, res, "v" + i)}${modelsHTML(q)}</div>`;
}

/* ===================== 全民英檢初級：段落寫作回饋（學生版，一頁看完） ===================== */
const gLv = v => scoreColor(v / 5);
function geptFeedbackHTML(q, res, opt = {}) {
  const ai = res.ai, lv = Math.max(0, Math.min(5, Number(ai.level) || 0)), wc = wcount(res.text), secs = res.secs || 0, errs = ai.errors || [];
  const desc = typeof levelDesc === "function" ? levelDesc(q, null, lv) : "";
  let h = `<div class="ai-card glass gx">
  <div class="ai-score"><div class="ai-big" style="color:${gLv(lv)}">${lv}<span>/ 5 級分</span></div><div style="min-width:0"><div class="eyebrow">📊 AI 估分・全民英檢初級 段落寫作</div><b style="font-size:17px">${esc(desc)}</b>
    <div class="row" style="gap:6px;margin-top:6px"><span class="tag ${wc < 35 ? "warn" : ""}">${wc} 字${wc < 35 ? "・偏少" : wc > 90 ? "・偏多" : ""}</span><span class="tag">⏱️ 用時 ${fmtTime(secs)}</span>${(ai.caps || []).length ? `<span class="tag warn">⚠️ 觸發上限規則</span>` : ""}</div></div></div>
  <div class="gx-dims">${GEPT_DIMS.map(([k, n]) => { const d = (ai.dims || {})[k] || {}, v = Number(d.score) || 0;
    return `<div class="gx-dim" title="${esc(d.comment || "")}"><span>${n}</span><b style="color:${gLv(v)}">${v}</b><i><em style="width:${v / 5 * 100}%;background:${gLv(v)}"></em></i></div>`; }).join("")}</div>
  <div class="muted" style="font-size:12px;margin-top:-4px">五個面向是診斷參考，官方只給一個整體級分。</div>
  <div class="ai-diag">🎯 <b>一句話診斷：</b>${esc(ai.diagnosis || "")}</div>
  ${lv < 5 && ai.nextLevel ? `<div class="gx-up">⬆️ <b>要拿到 ${lv + 1} 級分：</b>${esc(ai.nextLevel)}</div>` : ""}
  ${(ai.caps || []).map(c => `<div class="gx-cap">⚠️ ${esc(c.text)}</div>`).join("")}</div>`;
  h += `<div class="ai-sec"><h4>✅ 題目要求檢核</h4><div class="gx-reqs">${(ai.requirements || []).map(r => { const st = GEPT_REQ[r.status] || GEPT_REQ.partial;
    return `<div class="gx-req ${st[1]}"><span class="gx-ric">${st[0]}</span><div style="min-width:0"><b>${esc(r.item)}</b>${r.quote ? `<div class="ai-quote">「${esc(r.quote)}」</div>` : ""}<div class="muted" style="font-size:13px">${esc(r.note || "")}</div></div></div>`; }).join("")}</div></div>`;
  h += `<div class="ai-sec"><h4>🔍 原文標註與要改的地方</h4><div class="muted" style="font-size:12.5px">🔴 看不懂、一定要改　🟠 明顯錯誤　🟡 小地方</div>
  <div class="ptext ai-essay">${markEssay(res.text, errs)}</div>
  ${errs.length ? `<ol class="ai-errs">${errs.map((e, k) => `<li><span class="ai-sev"><b class="tnum">${k + 1}</b>${(AI_SEV[e.severity] || AI_SEV.yellow)[0]}</span><div><div><s>${esc(e.original)}</s> → <b>${esc(e.corrected)}</b><span class="tag gx-code">${esc(GEPT_CODE[e.code] || e.code)}</span></div><div class="muted" style="font-size:13px">${esc(e.why || "")}</div></div></li>`).join("")}</ol>` : `<div class="muted">沒有找到錯誤，很棒！</div>`}</div>`;
  if ((ai.upgrades || []).length) h += `<div class="ai-sec"><h4>💡 換個字更厲害</h4><div class="gx-ups">${ai.upgrades.map(u => `<div class="gx-upw"><div><s>${esc(u.vague)}</s> → <b>${esc(u.better)}</b></div><div class="muted" style="font-size:12.5px">${esc(u.when || "")}</div><div style="font-size:13.5px">${esc(u.example || "")}</div></div>`).join("")}</div></div>`;
  if (ai.rewrite) h += `<details class="pfold gx-rw" data-key="gx-rw-${opt.i ?? "x"}"><summary><span>✍️ 5 級分示範（先自己改完，再點開對照）</span>${I.chevR.replace("<svg", '<svg width="16" height="16"')}</summary><div class="ptext" style="font-size:16px;margin-top:8px">${esc(ai.rewrite)}</div></details>`;
  if (q.model) h += `<details class="pfold" data-key="gx-model-${opt.i ?? "x"}"><summary><span>📄 參考範文</span>${I.chevR.replace("<svg", '<svg width="16" height="16"')}</summary><div class="ptext" style="font-size:16px;margin-top:8px">${esc(q.model)}</div>${q.exp ? `<div class="muted" style="font-size:13.5px;margin-top:6px">💡 ${esc(q.exp)}</div>` : ""}</details>`;
  const nf = ai.nextFocus || {};
  if (nf.how) h += `<div class="ai-next">📌 <b>下一篇只練一件事：${esc(GEPT_CODE[nf.code] || "")}</b><br>${esc(nf.how)}</div>`;
  if (opt.who !== undefined) h += geptLogHTML(opt.who, opt.atts);
  return h;
}
/* 英檢寫作錯誤日誌與級分趨勢（同一個名字的所有英檢段落寫作） */
function geptLogHTML(who, atts) {
  const hist = [];
  const take = (att, date) => (att.qs || []).forEach((r, i) => { const a = (att.ans || {})[i], X = a && getQ(i, att); if (X && isGeptQ(X.q) && a.resp && a.resp.ai) hist.push({ date, ai: a.resp.ai }); });
  (atts || store.attempts.filter(x => (x.who || "未署名") === (who || "未署名"))).forEach(att => take(att, att.date || 0));
  if (!atts && S && S.who === who && !store.attempts.some(x => x.id === S.id)) take(S, Date.now());
  hist.sort((a, b) => a.date - b.date); if (!hist.length) return "";
  const cats = {}; hist.forEach((e, n) => (e.ai.errors || []).forEach(x => { const o = cats[x.code] || (cats[x.code] = { n: 0, essays: new Set(), last: null, lastN: -1 }); o.n++; o.essays.add(n); o.last = x; o.lastN = n; }));
  const N = hist.length, rows = Object.entries(cats).map(([c, o]) => ({ c, ...o, status: N - 1 - o.lastN >= 3 ? "🟢" : (o.essays.size > 1 || o.n >= 2) ? "🔴" : "🟡" }))
    .sort((a, b) => ({ "🔴": 0, "🟡": 1, "🟢": 2 }[a.status] - { "🔴": 0, "🟡": 1, "🟢": 2 }[b.status]) || b.n - a.n).slice(0, 8);
  const recent = hist.slice(-10), W = 100 / recent.length;
  const bars = recent.map((e, k) => { const v = Number(e.ai.level) || 0; return `<div class="tr-col" style="width:${W}%"><div class="tr-bar" style="height:${v / 5 * 100}%;background:${gLv(v)}"><span>${v}</span></div><div class="tr-x">${k + 1}</div></div>`; }).join("");
  return `<details class="pfold ai-log" data-key="gx-log" ${N > 1 ? "open" : ""}><summary><span>📒 ${esc(who || "")} 的英檢寫作錯誤日誌與級分趨勢（${N} 篇）</span>${I.chevR.replace("<svg", '<svg width="16" height="16"')}</summary>
  <div class="muted" style="font-size:12.5px;margin-top:6px">🔴 重複出現　🟡 偶爾出現　🟢 連續 3 篇沒再犯</div>
  ${rows.length ? `<table class="vtable ai-logt"><thead><tr><th>狀態</th><th>錯誤類型</th><th>次數</th><th>最近一次</th></tr></thead><tbody>${rows.map(r => `<tr><td>${r.status}</td><td>${esc(GEPT_CODE[r.c] || r.c)}</td><td class="tnum">${r.n}</td><td><s>${esc(r.last.original)}</s> → <b>${esc(r.last.corrected)}</b></td></tr>`).join("")}</tbody></table>` : ""}
  <div class="step-label" style="margin-top:6px">最近 ${recent.length} 篇級分</div><div class="trend">${bars}</div></details>`;
}

/* ===================== 全民英檢初級：單句寫作（改寫、合併）系統判錯時請 AI 依官方 0／1／2 分再判一次 ===================== */
const isGeptSent = (X, sess) => X && X.q && X.q.type === "rewrite" && X.bank && /^gept/.test(X.bank.id) && !(sess && sess.blind);
async function sentAiRun(sess, i) {
  const X = getQ(i, sess), q = X.q, a = sess.ans[i]; if (!a || a.correct || a.aiSent) return;
  const w = sess.work[i] || (sess.work[i] = {});
  const refresh = () => { save(true); if (S === sess && view === "quiz" && sess.idx === i) rerenderKeep(); };
  w.sentBusy = true; w.sentErr = ""; refresh();
  const payload = { action: "aigrade", kind: "gept-sent", name: sess.who, code: store.codes[sess.who] || "", essay: String(a.resp || ""),
    task: { type: X.q.tag === "g5" || X.q.tag === "w2" ? "句子合併" : "句子改寫", src: q.src, instr: q.instr, start: q.start, ans: q.ans.map(x => typeof expand === "function" ? expand(x)[0] : x) } };
  if (!payload.code && store.teacherCode) payload.teacherCode = store.teacherCode;
  try {
    if (typeof SYNC_ON === "undefined" || !SYNC_ON) { const e = new Error("offline"); e.server = true; throw e; }
    if (!payload.code && !payload.teacherCode && typeof ensureCode === "function") { await ensureCode(sess.who); payload.code = store.codes[sess.who] || ""; }
    const r = await postSync(payload, 120000), res = r.result, sc = Math.max(0, Math.min(2, Math.round(Number(res.score)) || 0));
    a.aiSent = { score: sc, point: res.point || "", reason: res.reason || "", corrected: res.corrected || "", model: r.model };
    if (!a.claim && !a.self && !a.tmark) { a.pts = sc; a.correct = sc >= 2; }
  } catch (e) { w.sentErr = e.server ? e.message : "error"; }
  w.sentBusy = false; refresh();
}
function sentAiHTML(X, a, w) {
  if (!isGeptSent(X) || !a || (a.sys !== false && !a.aiSent)) return "";
  if (w && w.sentBusy) return `<div class="gx-sent busy"><span class="ai-spin"></span>AI 正在依英檢標準評分（0～2 分）…</div>`;
  const s = a.aiSent;
  if (!s) return w && w.sentErr ? `<div class="gx-sent"><span class="muted">${esc(w.sentErr === "slimit-1h" ? "AI 單句評分每小時最多 10 句，先依系統判定，老師會再批改。" : w.sentErr === "slimit-5h" ? "AI 單句評分每 5 小時最多 30 句，先依系統判定，老師會再批改。" : "AI 評分沒有完成，先依系統判定，老師會再批改。")}</span></div>` : "";
  const col = s.score === 2 ? "var(--good)" : s.score === 1 ? "var(--gold)" : "var(--bad)";
  return `<div class="gx-sent"><div class="gx-sent-h"><b style="color:${col}">🤖 AI 依英檢標準：${s.score} / 2 分</b><span class="tag">${s.score === 2 ? "正確無誤" : s.score === 1 ? "重點對了，有小錯" : "重點結構有誤"}</span></div>
  ${s.point ? `<div class="muted" style="font-size:13px">考點：${esc(s.point)}</div>` : ""}<div style="font-size:14px">${esc(s.reason)}</div>
  ${s.corrected && s.score < 2 ? `<div style="font-size:14px">改成：<b>${esc(s.corrected)}</b></div>` : ""}</div>`;
}
