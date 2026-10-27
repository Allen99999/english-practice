/**
 * 英文練習網站：成績同步後端（綁定在 Google 試算表上的 Apps Script）
 * - 學生交卷：POST {action:"submit", attempt, code}（名字已登記時，code 要對）
 * - 登記名字：POST {action:"claim", name, code} → 名字沒人用就登記；已登記回 taken
 * - 找回紀錄：POST {action:"login", name, code} → 回傳這個名字的全部作答紀錄
 * - 修改代碼：POST {action:"setcode", name, code, newCode}
 * - 老師讀取：GET ?action=list&teacherCode=...（含學生代碼，學生忘記時可以查）
 * 個人代碼存在「students」工作表；CLASS_CODE 留空就不檢查班級代碼。
 * - AI 批改：POST {action:"aigrade", ...}（見 Ai.gs）
 * 代碼放在 Secrets.gs（不會上傳到 GitHub）
 */
const SHEET_NAME = "attempts";
const HEADERS = ["receivedAt", "attemptId", "who", "title", "score", "total", "percent", "durationSec", "date", "json"];
const STUDENT_SHEET = "students";
const STUDENT_HEADERS = ["name", "code", "createdAt", "updatedAt"];
const CODE_RE = /^[a-z0-9]{4,12}$/;
const MAX_FAILS = 10; // 同一個名字連續輸錯這麼多次，鎖 10 分鐘

function sheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sh = ss.getSheetByName(SHEET_NAME);
  if (!sh) { sh = ss.insertSheet(SHEET_NAME); sh.appendRow(HEADERS); sh.setFrozenRows(1); }
  return sh;
}
function students_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sh = ss.getSheetByName(STUDENT_SHEET);
  if (!sh) { sh = ss.insertSheet(STUDENT_SHEET); sh.appendRow(STUDENT_HEADERS); sh.setFrozenRows(1); sh.getRange("B:B").setNumberFormat("@"); }
  return sh;
}
function json_(obj) { return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON); }
function name_(s) { return String(s || "").trim().replace(/\s+/g, " "); }
function code_(s) { return String(s || "").trim().toLowerCase(); }

/* 找名字在 students 的哪一列（回傳 {row, code} 或 null） */
function findStudent_(name) {
  const sh = students_();
  if (sh.getLastRow() < 2) return null;
  const rows = sh.getRange(2, 1, sh.getLastRow() - 1, 2).getValues();
  for (let i = 0; i < rows.length; i++) if (name_(rows[i][0]) === name) return { row: i + 2, code: code_(rows[i][1]) };
  return null;
}
function register_(name, code) {
  const now = new Date();
  students_().appendRow([name, code, now, now]);
}
/* 輸錯次數（CacheService，10 分鐘後自動歸零） */
function locked_(name) { return Number(CacheService.getScriptCache().get("fail:" + name) || 0) >= MAX_FAILS; }
function fail_(name) { const c = CacheService.getScriptCache(), k = "fail:" + name; c.put(k, String(Number(c.get(k) || 0) + 1), 600); }
function okCode_(name) { CacheService.getScriptCache().remove("fail:" + name); }
/* 檢查名字＋代碼；回傳錯誤字串或 "" */
function check_(name, code) {
  const st = findStudent_(name);
  if (!st) return "no such name";
  if (locked_(name)) return "locked";
  if (st.code !== code) { fail_(name); return "wrong code"; }
  okCode_(name); return "";
}

function doPost(e) {
  try {
    const body = JSON.parse(e.postData.contents);
    if (CLASS_CODE && String(body.classCode || "").trim() !== CLASS_CODE) return json_({ ok: false, error: "wrong class code" });
    if (body.action === "aigrade") return aiGrade_(body);
    if (body.action === "myaudio") return myAudio_(body);   // 學生重聽自己的錄音（只讀，不佔用鎖）   // AI 批改要跑幾十秒，不佔用鎖（見 Ai.gs）
    const lock = LockService.getScriptLock(); lock.waitLock(10000);
    try {
      switch (body.action) {
        case "submit": return submit_(body);
        case "claim": return claim_(body);
        case "login": if (rateLimited_("login", 200)) return json_({ ok: false, error: "busy" }); return login_(body);
        case "setcode": return setcode_(body);
        case "audio": return audioUpload_(body);
        case "review": return review_(body);
        case "delete": return deleteAttempt_(body);
        case "delstudent": return deleteStudent_(body);
        case "myreviews": if (rateLimited_("myreviews", 400)) return json_({ ok: false, error: "busy" }); return myReviews_(body);
      }
      return json_({ ok: false, error: "unknown action" });
    } finally { lock.releaseLock(); }
  } catch (err) { return json_({ ok: false, error: String(err) }); }
}

function submit_(body) {
  const a = body.attempt || {};
  if (!a.id) return json_({ ok: false, error: "missing attempt" });
  // 基本檢查：擋掉格式怪異或過大的資料（避免有人亂塞東西進試算表）
  if (!/^[A-Za-z0-9_-]{4,40}$/.test(String(a.id))) return json_({ ok: false, error: "bad attempt" });
  if (String(a.who || "").length > 30 || String(a.title || "").length > 200) return json_({ ok: false, error: "bad attempt" });
  if (JSON.stringify(a).length > 150000) return json_({ ok: false, error: "too large" });
  if (rateLimited_("submit", 300)) return json_({ ok: false, error: "busy" });
  const name = name_(a.who), code = code_(body.code);
  if (name && name !== "未署名") {
    const st = findStudent_(name);
    if (st) { if (st.code !== code) return json_({ ok: false, error: "wrong code" }); }
    else if (CODE_RE.test(code)) register_(name, code);
  }
  const sh = sheet_();
  const ids = sh.getLastRow() > 1 ? sh.getRange(2, 2, sh.getLastRow() - 1, 1).getValues().map(r => r[0]) : [];
  if (ids.indexOf(a.id) === -1) {
    sh.appendRow([new Date(), a.id, a.who || "未署名", a.title || "", a.score, a.total,
      a.total ? Math.round(a.score / a.total * 100) : "", a.duration || 0, a.date ? new Date(a.date) : "", JSON.stringify(a)]);
  }
  return json_({ ok: true });
}
function claim_(body) {
  if (rateLimited_("claim", 120)) return json_({ ok: false, error: "busy" });
  const name = name_(body.name), code = code_(body.code);
  if (!name) return json_({ ok: false, error: "missing name" });
  if (!CODE_RE.test(code)) return json_({ ok: false, error: "bad code" });
  const st = findStudent_(name);
  if (st) return json_({ ok: false, error: "taken" }); // 不透露代碼對不對，避免被拿來猜代碼
  register_(name, code);
  return json_({ ok: true, created: true });
}
function login_(body) {
  const name = name_(body.name), err = check_(name, code_(body.code));
  if (err) return json_({ ok: false, error: err });
  const sh = sheet_();
  if (sh.getLastRow() < 2) return json_({ ok: true, attempts: [] });
  const rows = sh.getRange(2, 1, sh.getLastRow() - 1, HEADERS.length).getValues();
  const attempts = rows.filter(r => name_(r[2]) === name).map(r => { try { return JSON.parse(r[9]); } catch (x) { return null; } }).filter(Boolean);
  return json_({ ok: true, attempts: attempts });
}
function setcode_(body) {
  const name = name_(body.name), newCode = code_(body.newCode);
  if (!CODE_RE.test(newCode)) return json_({ ok: false, error: "bad code" });
  const err = check_(name, code_(body.code));
  if (err) return json_({ ok: false, error: err });
  const st = findStudent_(name);
  const sh = students_(); sh.getRange(st.row, 2).setValue(newCode); sh.getRange(st.row, 4).setValue(new Date());
  return json_({ ok: true });
}

/* ---------- 口說錄音：學生上傳到老師的雲端硬碟「Apex English 錄音」資料夾，老師用老師代碼取回 ---------- */
const REC_FOLDER = "Apex English 錄音";
function recFolder_() {
  const props = PropertiesService.getScriptProperties(), id = props.getProperty("recFolder");
  if (id) { try { return DriveApp.getFolderById(id); } catch (e) { } }
  const f = DriveApp.createFolder(REC_FOLDER); props.setProperty("recFolder", f.getId()); return f;
}
function recName_(att, i) { return "rec_" + String(att).replace(/[^A-Za-z0-9_-]/g, "") + "_" + Number(i) + ".m4a"; }
function audioUpload_(body) {
  const name = name_(body.name), code = code_(body.code), st = findStudent_(name);
  if (!st || st.code !== code) return json_({ ok: false, error: "wrong code" });   // 只收已登記代碼的學生
  if (!/^[A-Za-z0-9_-]{4,40}$/.test(String(body.attemptId || ""))) return json_({ ok: false, error: "bad audio" });
  const data = String(body.data || "");
  if (!data || data.length > 4000000) return json_({ ok: false, error: "too large" });   // 約 3 MB 以內
  if (rateLimited_("audio", 150)) return json_({ ok: false, error: "busy" });
  const folder = recFolder_(), fname = recName_(body.attemptId, body.idx);
  const old = folder.getFilesByName(fname); while (old.hasNext()) old.next().setTrashed(true);
  const mime = /^audio\/[a-z0-9.+-]+$/i.test(String(body.mime || "")) ? String(body.mime).split(";")[0] : "audio/mp4";
  const file = folder.createFile(Utilities.newBlob(Utilities.base64Decode(data), mime, fname));
  file.setDescription(name + "｜" + new Date().toISOString());
  return json_({ ok: true });
}

/* 學生拿回自己的錄音：名字＋個人代碼要對，而且檔案是這個名字上傳的（檔案說明開頭是名字） */
function myAudio_(body) {
  const name = name_(body.name), code = code_(body.code), st = findStudent_(name);
  if (!st || st.code !== code) return json_({ ok: false, error: "wrong code" });
  if (rateLimited_("myaudio", 300)) return json_({ ok: false, error: "busy" });
  const it = recFolder_().getFilesByName(recName_(body.att, body.i));
  while (it.hasNext()) {
    const f = it.next();
    if (String(f.getDescription() || "").split("｜")[0] !== name) continue;
    const blob = f.getBlob();
    return json_({ ok: true, mime: blob.getContentType(), data: Utilities.base64Encode(blob.getBytes()) });
  }
  return json_({ ok: false, error: "no audio" });
}

function doGet(e) {
  const p = (e && e.parameter) || {};
  if (p.action === "ping") return json_({ ok: true });
  if (p.action === "audio") {   // 老師播放錄音
    const terr = teacherErr_(p.teacherCode); if (terr) return json_({ ok: false, error: terr });
    const it = recFolder_().getFilesByName(recName_(p.att, p.i));
    if (!it.hasNext()) return json_({ ok: false, error: "no audio" });
    const blob = it.next().getBlob();
    return json_({ ok: true, mime: blob.getContentType(), data: Utilities.base64Encode(blob.getBytes()) });
  }
  if (p.action !== "list") return json_({ ok: false, error: "unknown action" });
  const terr = teacherErr_(p.teacherCode); if (terr) return json_({ ok: false, error: terr });   // 連續輸錯 10 次鎖 15 分鐘
  const sh = sheet_(), st = students_();
  const students = st.getLastRow() < 2 ? [] : st.getRange(2, 1, st.getLastRow() - 1, 2).getValues().map(r => ({ name: name_(r[0]), code: code_(r[1]) }));
  const reviews = reviewMap_();
  if (sh.getLastRow() < 2) return json_({ ok: true, attempts: [], students: students, reviews: reviews });
  const rows = sh.getRange(2, 1, sh.getLastRow() - 1, HEADERS.length).getValues();
  const attempts = rows.map(r => { try { return JSON.parse(r[9]); } catch (x) { return null; } }).filter(Boolean);
  return json_({ ok: true, attempts: attempts, students: students, reviews: reviews });
}

/* 老師代碼檢查（連續輸錯 10 次鎖 15 分鐘）；回傳錯誤字串或 "" */
function teacherErr_(code) {
  const c = CacheService.getScriptCache();
  if (Number(c.get("tfail") || 0) >= 10) return "locked";
  if (String(code || "") !== TEACHER_CODE) { c.put("tfail", String(Number(c.get("tfail") || 0) + 1), 900); return "wrong teacher code"; }
  c.remove("tfail"); return "";
}
/* 批改紀錄：reviews 工作表（attemptId、是否批改完成、逐題改判、更新時間） */
function reviews_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sh = ss.getSheetByName("reviews");
  if (!sh) { sh = ss.insertSheet("reviews"); sh.appendRow(["attemptId", "done", "marks", "updatedAt"]); sh.setFrozenRows(1); }
  return sh;
}
function reviewMap_() {
  const sh = reviews_(), out = {};
  if (sh.getLastRow() < 2) return out;
  sh.getRange(2, 1, sh.getLastRow() - 1, 3).getValues().forEach(r => { let m = {}; try { m = JSON.parse(r[2] || "{}"); } catch (e) { } out[r[0]] = { done: r[1] === true || r[1] === "TRUE", marks: m }; });
  return out;
}
function review_(body) {
  const err = teacherErr_(body.teacherCode); if (err) return json_({ ok: false, error: err });
  const id = String(body.attemptId || ""); if (!/^[A-Za-z0-9_-]{4,40}$/.test(id)) return json_({ ok: false, error: "bad id" });
  const sh = reviews_(), last = sh.getLastRow();
  const ids = last > 1 ? sh.getRange(2, 1, last - 1, 1).getValues().map(r => r[0]) : [];
  const k = ids.indexOf(id), row = k >= 0 ? k + 2 : last + 1;
  const cur = k >= 0 ? sh.getRange(row, 1, 1, 3).getValues()[0] : [id, false, "{}"];
  let marks = {}; try { marks = JSON.parse(cur[2] || "{}"); } catch (e) { }
  if (body.marks && typeof body.marks === "object") Object.keys(body.marks).forEach(i => { const v = body.marks[i]; if (v === null) delete marks[i]; else marks[i] = typeof v === "number" ? Math.max(0, Math.min(10, Math.round(v))) : !!v; });
  const done = body.done === undefined ? (cur[1] === true || cur[1] === "TRUE") : !!body.done;
  sh.getRange(row, 1, 1, 4).setValues([[id, done, JSON.stringify(marks), new Date()]]);
  return json_({ ok: true, done, marks });
}
/* 刪除一筆作答紀錄（連同批改紀錄、錄音） */
function deleteAttempt_(body) {
  const err = teacherErr_(body.teacherCode); if (err) return json_({ ok: false, error: err });
  const id = String(body.attemptId || ""); if (!/^[A-Za-z0-9_-]{4,40}$/.test(id)) return json_({ ok: false, error: "bad id" });
  const del = (sh, col) => { const last = sh.getLastRow(); if (last < 2) return 0; const v = sh.getRange(2, col, last - 1, 1).getValues(); let n = 0; for (let r = v.length - 1; r >= 0; r--) if (String(v[r][0]) === id) { sh.deleteRow(r + 2); n++; } return n; };
  const n = del(sheet_(), 2); del(reviews_(), 1);
  try { const it = recFolder_().searchFiles('title contains "rec_' + id + '_"'); while (it.hasNext()) it.next().setTrashed(true); } catch (e) { }
  return json_({ ok: true, deleted: n });
}

/* 學生取回自己被老師批改的結果（名字＋個人代碼） */
function myReviews_(body) {
  const name = name_(body.name), err = check_(name, code_(body.code));
  if (err) return json_({ ok: false, error: err });
  const sh = sheet_(), ids = {};
  if (sh.getLastRow() > 1) sh.getRange(2, 2, sh.getLastRow() - 1, 2).getValues().forEach(r => { if (name_(r[1]) === name) ids[r[0]] = 1; });
  const all = reviewMap_(), out = {};
  Object.keys(all).forEach(id => { if (ids[id]) out[id] = all[id]; });
  return json_({ ok: true, reviews: out });
}
/* 刪除一位學生：作答紀錄、批改紀錄、錄音、個人代碼全部刪掉 */
function deleteStudent_(body) {
  const err = teacherErr_(body.teacherCode); if (err) return json_({ ok: false, error: err });
  const name = name_(body.name);
  const sh = sheet_(); let ids = [];
  if (sh.getLastRow() > 1) { const v = sh.getRange(2, 2, sh.getLastRow() - 1, 2).getValues(); for (let r = v.length - 1; r >= 0; r--) if (name_(v[r][1]) === name) { ids.push(String(v[r][0])); sh.deleteRow(r + 2); } }
  const rvs = reviews_(); if (rvs.getLastRow() > 1) { const v = rvs.getRange(2, 1, rvs.getLastRow() - 1, 1).getValues(); for (let r = v.length - 1; r >= 0; r--) if (ids.indexOf(String(v[r][0])) >= 0) rvs.deleteRow(r + 2); }
  try { const f = recFolder_(); ids.forEach(id => { const it = f.searchFiles('title contains "rec_' + id + '_"'); while (it.hasNext()) it.next().setTrashed(true); }); } catch (e) { }
  const st = students_(); let removed = 0;
  if (st.getLastRow() > 1) { const v = st.getRange(2, 1, st.getLastRow() - 1, 1).getValues(); for (let r = v.length - 1; r >= 0; r--) if (name_(v[r][0]) === name) { st.deleteRow(r + 2); removed++; } }
  return json_({ ok: true, attempts: ids.length, students: removed });
}

/* 全站流量限制：同一種動作每 10 分鐘最多 max 次（擋掉灌爆試算表的行為） */
function rateLimited_(key, max) {
  const c = CacheService.getScriptCache(), k = "rl:" + key, n = Number(c.get(k) || 0);
  if (n >= max) return true;
  c.put(k, String(n + 1), 600); return false;
}

/* 在編輯器裡手動執行一次，用來授權並建立工作表 */
function setup() { sheet_(); students_(); reviews_(); recFolder_(); Logger.log("ok: sheet ready"); }
