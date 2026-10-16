/**
 * 英文練習網站：成績同步後端（綁定在 Google 試算表上的 Apps Script）
 * - 學生交卷：POST {action:"submit", attempt, code}（名字已登記時，code 要對）
 * - 登記名字：POST {action:"claim", name, code} → 名字沒人用就登記；已登記回 taken
 * - 找回紀錄：POST {action:"login", name, code} → 回傳這個名字的全部作答紀錄
 * - 修改代碼：POST {action:"setcode", name, code, newCode}
 * - 老師讀取：GET ?action=list&teacherCode=...（含學生代碼，學生忘記時可以查）
 * 個人代碼存在「students」工作表；CLASS_CODE 留空就不檢查班級代碼。
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
    const lock = LockService.getScriptLock(); lock.waitLock(10000);
    try {
      switch (body.action) {
        case "submit": return submit_(body);
        case "claim": return claim_(body);
        case "login": return login_(body);
        case "setcode": return setcode_(body);
      }
      return json_({ ok: false, error: "unknown action" });
    } finally { lock.releaseLock(); }
  } catch (err) { return json_({ ok: false, error: String(err) }); }
}

function submit_(body) {
  const a = body.attempt || {};
  if (!a.id) return json_({ ok: false, error: "missing attempt" });
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

function doGet(e) {
  const p = (e && e.parameter) || {};
  if (p.action === "ping") return json_({ ok: true });
  if (p.action !== "list") return json_({ ok: false, error: "unknown action" });
  if (String(p.teacherCode || "") !== TEACHER_CODE) return json_({ ok: false, error: "wrong teacher code" });
  const sh = sheet_(), st = students_();
  const students = st.getLastRow() < 2 ? [] : st.getRange(2, 1, st.getLastRow() - 1, 2).getValues().map(r => ({ name: name_(r[0]), code: code_(r[1]) }));
  if (sh.getLastRow() < 2) return json_({ ok: true, attempts: [], students: students });
  const rows = sh.getRange(2, 1, sh.getLastRow() - 1, HEADERS.length).getValues();
  const attempts = rows.map(r => { try { return JSON.parse(r[9]); } catch (x) { return null; } }).filter(Boolean);
  return json_({ ok: true, attempts: attempts, students: students });
}

/* 在編輯器裡手動執行一次，用來授權並建立工作表 */
function setup() { sheet_(); students_(); Logger.log("ok: sheet ready"); }
