/**
 * 英文練習網站：成績同步後端（綁定在 Google 試算表上的 Apps Script）
 * - 學生交卷：POST {action:"submit", classCode, attempt}（CLASS_CODE 留空就不檢查班級代碼）
 * - 老師讀取：GET ?action=list&teacherCode=...
 * 代碼放在 Secrets.gs（不會上傳到 GitHub）
 */
const SHEET_NAME = "attempts";
const HEADERS = ["receivedAt", "attemptId", "who", "title", "score", "total", "percent", "durationSec", "date", "json"];

function sheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sh = ss.getSheetByName(SHEET_NAME);
  if (!sh) { sh = ss.insertSheet(SHEET_NAME); sh.appendRow(HEADERS); sh.setFrozenRows(1); }
  return sh;
}
function json_(obj) { return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON); }

function doPost(e) {
  try {
    const body = JSON.parse(e.postData.contents);
    if (body.action !== "submit") return json_({ ok: false, error: "unknown action" });
    if (CLASS_CODE && String(body.classCode || "").trim() !== CLASS_CODE) return json_({ ok: false, error: "wrong class code" });
    const a = body.attempt || {};
    if (!a.id) return json_({ ok: false, error: "missing attempt" });
    const lock = LockService.getScriptLock(); lock.waitLock(10000);
    try {
      const sh = sheet_();
      const ids = sh.getLastRow() > 1 ? sh.getRange(2, 2, sh.getLastRow() - 1, 1).getValues().map(r => r[0]) : [];
      if (ids.indexOf(a.id) === -1) {
        sh.appendRow([new Date(), a.id, a.who || "未署名", a.title || "", a.score, a.total,
          a.total ? Math.round(a.score / a.total * 100) : "", a.duration || 0, a.date ? new Date(a.date) : "", JSON.stringify(a)]);
      }
    } finally { lock.releaseLock(); }
    return json_({ ok: true });
  } catch (err) { return json_({ ok: false, error: String(err) }); }
}

function doGet(e) {
  const p = (e && e.parameter) || {};
  if (p.action === "ping") return json_({ ok: true });
  if (p.action !== "list") return json_({ ok: false, error: "unknown action" });
  if (String(p.teacherCode || "") !== TEACHER_CODE) return json_({ ok: false, error: "wrong teacher code" });
  const sh = sheet_();
  if (sh.getLastRow() < 2) return json_({ ok: true, attempts: [] });
  const rows = sh.getRange(2, 1, sh.getLastRow() - 1, HEADERS.length).getValues();
  const attempts = rows.map(r => { try { return JSON.parse(r[9]); } catch (x) { return null; } }).filter(Boolean);
  return json_({ ok: true, attempts: attempts });
}

/* 在編輯器裡手動執行一次，用來授權並建立工作表 */
function setup() { sheet_(); Logger.log("ok: sheet ready"); }
