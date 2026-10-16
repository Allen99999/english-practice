/* ===== 單字查詢 ===== */
const DICT = {};
(DICT_RAW + "\n" + (typeof DICT_RAW2 === "string" ? DICT_RAW2 : "") + "\n" + (typeof DICT_RAW3 === "string" ? DICT_RAW3 : "") + "\n" + (typeof DICT_RAW4 === "string" ? DICT_RAW4 : "") + "\n" + (typeof DICT_RAW5 === "string" ? DICT_RAW5 : "") + "\n" + (typeof DICT_RAW6 === "string" ? DICT_RAW6 : "")).trim().split("\n").forEach(l => {
  const [w, pos, zh] = l.split("|");
  if (w && !DICT[w]) DICT[w] = { w, pos, zh };
});

function normWord(s) {
  return s.toLowerCase().replace(/[’]/g, "'").replace(/^[^a-z]+|[^a-z'-]+$/g, "").replace(/'s$/, "").replace(/s'$/, "s");
}

/* 回傳 {key, entry, base} 或 null */
function lookup(raw) {
  const w = normWord(raw);
  if (!w || w.length < 2 || STOP.has(w)) return null;
  const tries = [w];
  if (IRREG[w]) tries.push(IRREG[w]);
  const add = x => { if (x && x.length > 1) tries.push(x); };
  if (w.endsWith("ies")) add(w.slice(0, -3) + "y");
  if (w.endsWith("ied")) add(w.slice(0, -3) + "y");
  if (w.endsWith("es")) add(w.slice(0, -2));
  if (w.endsWith("s")) add(w.slice(0, -1));
  if (w.endsWith("ed")) { add(w.slice(0, -2)); add(w.slice(0, -1)); if (/(.)\1ed$/.test(w)) add(w.slice(0, -3)); }
  if (w.endsWith("ing")) { add(w.slice(0, -3)); add(w.slice(0, -3) + "e"); if (/(.)\1ing$/.test(w)) add(w.slice(0, -4)); }
  if (w.endsWith("er")) add(w.slice(0, -2));
  if (w.endsWith("ly")) add(w.slice(0, -2));
  for (const t of tries) if (DICT[t]) return { key: t, entry: DICT[t], surface: w };
  return { key: w, entry: null, surface: w };
}
