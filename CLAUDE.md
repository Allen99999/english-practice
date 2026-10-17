# Apex English 網站：部署與維護說明（給 Claude Code）

這是 Allen 的英文練習網站「Apex English」（國中七上～九下翰林版＋全民英檢初級＋TOEFL iBT 2026 新制）。純靜態網站放在 `docs/`，用 GitHub Pages 上線；
學生成績透過 Google Apps Script 寫進 Google 試算表；朗讀用 edge-tts 預先產生的 MP3。

使用者是 Allen，請用繁體中文和他溝通。他希望盡量自動化：能用指令完成的就直接做，
只有「登入帳號／按允許」這類必須本人操作的步驟才請他動手，並清楚告訴他要按哪裡。

## 專案結構
- `docs/` 網站本體（GitHub Pages 從 main 分支的 /docs 發布）
  - `index.html`：依序載入 js（順序重要，不要隨意調整）
  - `js/config.js`：**SYNC_URL**（Apps Script 網址）與語音設定
  - `js/data.js`、`js/bank*.js`：題庫；`js/dict*.js`：點字查詢的字典；`js/phrases.js`：片語
  - `js/app.js`、`js/teacher.js`：主程式與老師總覽；`js/tts.js`：播放 MP3；`js/sync.js`：成績同步
  - `audio/`：預先產生的 MP3 與 `manifest.json`
- `apps-script/`：成績同步後端（Code.gs、appsscript.json；Secrets.gs 由你產生，不進 git）
- `tools/`：語音產生腳本

## 第一次部署（依序執行，每步做完要驗證）

### 1. 檢查並安裝工具
- 需要：git、node（≥18）、python3、GitHub CLI `gh`、`@google/clasp`、`edge-tts`
- macOS：`brew install gh`（沒有 Homebrew 就先請 Allen 確認後安裝）；`npm i -g @google/clasp`
- 語音套件用虛擬環境：`python3 -m venv .venv && .venv/bin/pip install edge-tts`

### 2. 請 Allen 登入（只有這裡需要他本人操作）
1. `gh auth login --web -h github.com -p https`（瀏覽器按授權）。完成後 `gh api user -q .login` 取得 GitHub 帳號名。
2. 打開 https://script.google.com/home/usersettings （`open` 指令），請他把「Google Apps Script API」切成開啟。
3. `clasp login`（瀏覽器選他的 Google 帳號並允許）。

### 3. 產生代碼
- 班級代碼：Allen 決定不用（`CLASS_CODE = ""`，學生只要輸入名字）；老師代碼：Allen 指定的代碼（只給 Allen）
- 依 `apps-script/Secrets.example.gs` 寫出 `apps-script/Secrets.gs`
- 把兩個代碼寫進專案根目錄 `secrets.local.md`（已在 .gitignore），也直接告訴 Allen

### 4. 建立 Google 試算表與同步後端
```
cd apps-script
clasp create --type sheets --title "English Practice 成績" --rootDir .
clasp push -f
```
- 需要授權一次：用 `clasp open-script`（舊版是 `clasp open`）打開編輯器，請 Allen 在上方選 `setup` 按「執行」，
  出現權限視窗時選他的帳號 →「進階」→「前往（不安全）」→「允許」。（這是他自己的腳本，可以放心允許）
- 部署成網頁應用程式：`clasp deploy --description "v1"`，記下 deploymentId。
  網址是 `https://script.google.com/macros/s/<deploymentId>/exec`
- 驗證（都要通過）：
  - `curl -sL "<URL>?action=ping"` → `{"ok":true}`
  - `curl -sL "<URL>?action=list&teacherCode=<老師代碼>"` → `{"ok":true,"attempts":[...]}`
  - `curl -sL -H "Content-Type: text/plain" -d '{"action":"submit","attempt":{}}' "<URL>"` → `missing attempt`（不寫入試算表；若有設 CLASS_CODE，帶錯代碼應回 `wrong class code`）
  - 如果回傳的是 HTML 登入頁，代表部署權限不是「任何人」，檢查 appsscript.json 的 webapp 設定後重新部署
- 把網址填進 `docs/js/config.js` 的 `SYNC_URL`
- 之後改了 Code.gs：`clasp push -f && clasp deploy -i <deploymentId> --description "vN"`（網址不變）

### 5. 產生朗讀語音
**先做試聽**：`.venv/bin/python tools/voice_samples.py`，會在 `samples/` 產生文章、題目、單字，以及四組「一女一男」的對話試聽檔並打開資料夾。
請 Allen 聽完選一組對話聲音，再把選定的女聲、男聲寫進 `docs/js/config.js` 的 `TTS.female` / `TTS.male`（第一個是主要聲音；narrator、word 也可依他的喜好調整）。**Allen 確認前不要跑完整的 gen_audio.py。**

```
.venv/bin/python tools/check_voices.py      # 確認語音名稱都存在；有缺就改 config.js 的 TTS 設定
node tools/build_tts_jobs.mjs               # 約 2,400 段
.venv/bin/python tools/gen_audio.py         # 約 5～15 分鐘；可重複執行，只補缺的
```
- 結束時「失敗」應為 0；有失敗就再執行一次（gen_audio.py 也會自動刪掉清單裡已經沒有的舊語音檔）
- 抽幾個 mp3 確認能播放（`afplay docs/audio/<檔名>.mp3`）

### 5b. 用 Higgsfield 畫英檢段落寫作的插圖
Allen 的 Claude Code 已連接 Higgsfield MCP，帳號有點數。規則：
- **省點數**：不要用最新、最貴的模型（例如 gpt_image 系列）。先 `models_explore`（type: image）列出模型，對候選模型用 `get_cost: true` 試算，
  選一張圖 **0.3 點以下**、適合插畫的模型；把試算結果和選擇理由告訴 Allen 再開始。
- **風格**：簡單的黑白（或淡色）漫畫線稿、三格橫排、乾淨背景、**圖中不要有任何文字**，像全民英檢初級看圖寫作的題目圖。
- **要畫的圖**：`docs/js/bankgept.js` 最後的 `GEPT_IMAGES` 列出的題目（目前 e01、e03），依該題的三格 `scenes` 寫英文提示詞；比例 16:9 或 3:1。
- 先畫 e01 一張給 Allen 看，他說可以再畫其他的。每張最多重畫一次。
- 用 `jobs_wait` 拿到結果網址後，`curl -L -o docs/img/gept-e01.png <網址>`（檔名要和 `GEPT_IMAGES` 一致）。網站找不到圖片時會自動隱藏，不會壞掉。
- 之後新增看圖寫作題時，在 `GEPT_IMAGES` 加一行再畫圖。

### 6. 上傳到 GitHub 並開啟 Pages
```
git init -b main && git add -A && git commit -m "English Practice 網站"
gh repo create english-practice --public --source . --push
gh api -X POST "repos/<帳號>/english-practice/pages" -f "source[branch]=main" -f "source[path]=/docs"
```
- 等 1～3 分鐘，`gh api repos/<帳號>/english-practice/pages -q .status` 變成 `built`
- 網址：`https://<帳號>.github.io/english-practice/`
- 驗證：首頁 200、`audio/manifest.json` 有內容、隨便一個 mp3 回 200

### 7. 完整測試（可用 Playwright 或請 Allen 用手機開）
- 開網站 → 輸入名字 → 做一份短的練習並交卷
- 到試算表確認多了一列（`clasp open-container` 可開啟試算表）
- 網站「總覽」分頁輸入老師代碼 → 看得到剛剛那筆
- 題組按「朗讀全文」應播放 MP3（不是機器音）
- 測試用的那一列可以請 Allen 在試算表裡刪掉

### 8. 最後回報給 Allen
網站網址、老師代碼、試算表連結、學生怎麼把網站加到 iPad 主畫面（Safari 分享 → 加入主畫面）。

## 日常維護
- **改題目／加題庫**：編輯 `docs/js/bank*.js`（出題工具在 `helpers.js`：M 單選、SP 拼字、T 翻譯、R 重組、E 挑錯、X 配對、G 題組、D 字典題；英檢另有 RW 改寫、ES 段落寫作、L 聽力）。
- **英檢初級**：練習題在 `bankgept.js`＋`bankgept2.js`（題庫 gept-e）；正式考模擬卷在 `bankgeptmock.js`（gept-m1～m3，`hidden` 不列在首頁，而是在「全民英檢 初級」選「模擬段考」時挑卷 1～3；整卷固定順序，初試聽讀不顯示對錯、聽力只播一遍）。
  - 聽力 `L(id, tag, part, script, opts, ans, hint, exp, pic)`：part 1 看圖辨義（選項用念的）、2 問答、3 簡短對話、4 短文聽解（三圖選一）；script 每行一句，`W: ` 女聲、`M: ` 男聲、沒標記是旁白。
    part 1、4 的答案順序固定（不會自動平衡），新增時自己把 A/B/C 分散。
  - part 1、4 的圖：`docs/img/listen/<題庫>-<題號>.png`，依 `pic` 欄位的英文描述用 Higgsfield 畫（Seedream 5.0 Flash，0.5 點／張，黑白線稿、圖中不能有字；
    part 4 是三格橫排，網站會自動標 A/B/C）。避免畫小孩游泳、泳衣（會被判成不當內容）。畫好後壓縮（寬 1200、48 色 PNG）。
  - 正式考模擬卷的題目不可以抄官方或出版社的真題（網站是公開的）；官方真題請學生到 GEPT i學網。
- **有正式模擬卷的題庫（英檢、托福）**：題庫設 `mockPapers`；首頁選這個題庫時，「正式模擬卷 N」＝模擬段考、「隨機組卷」＝自訂練習（不顯示「模式」切換）。
  模擬卷題庫設 `hidden`、`fixed`、`exams`（可考的部分）、`partNotes`、`timeLimits`、`blind`（不顯示對錯的部分）。
- **托福（2026 新制）**：練習題在 `banktoefl.js`（閱讀）、`banktoefl2.js`（聽力、寫作、口說）；正式模擬卷在 `banktoeflmock.js`、`banktoeflmock2.js`。
  - 出題工具（helpers.js）：CT 補字母（`manu{scripts}`）、LG 聽力題組、L(...,"cr",...) 聽一句選回應、BS Build a Sentence、EM Email、AD Academic Discussion、SR／SI 口說。
  - 聽力 script 的說話者：W/M 美國腔、WB/MB 英國腔、WA/MA 澳洲腔、WC/MC 加拿大腔、N 旁白（聲音設定在 config.js 的 `TTS.accents`）。
  - Reading、Listening 是兩階段適應性：題目加 `stage`（router／lower／upper），模擬卷的 `adaptive` 設定切分點（第一階段答對率 ≥ 60% 進 upper）。執行邏輯在 `toefl.js`。
  - 語音只做聽力和口說（build_tts_jobs.mjs 會跳過托福的閱讀、寫作和 dict7.js 的單字），托福頁面也不顯示「念題目／朗讀全文」。
  - 寫作、口說是自評＋範文；口說可錄音（只存在學生裝置，不上傳）。結果頁會顯示依答對率估算的 1～6 級分。
  - Allen 提供的「新托福模擬小題本」只當格式參考，內容含 ETS 官方題，不可照搬到網站。
- **網站名稱與分享預覽**：名稱 Apex English；分享預覽圖是 `docs/og-v2.png`（換圖時改新檔名，避免 LINE/FB 快取舊圖）（1200×630，用 Chrome headless 從 HTML 截圖產生），index.html 有 og:／twitter: 標籤。
  新題目裡沒收錄的字要加到 `dict*.js`（格式 `word|詞性|中文`）。
- **改完之後**：`node tools/build_tts_jobs.mjs && .venv/bin/python tools/gen_audio.py`，再 `git add -A && git commit && git push`
- 單選題的選項順序會在載入時自動平衡，新增題目請加在每份題庫的最後面，已存在的題目不要改 id 或移動位置（舊紀錄靠 id 對應）。
- 語音檔名由 `tts-text.js` 的 `ttsName(voice, text)` 決定，瀏覽器和 `build_tts_jobs.mjs` 共用同一份程式，改這支要兩邊一起測。
- repo 是公開的：不要把 Secrets.gs、代碼或學生資料提交進去。
- 出題會優先出「這個名字還沒做過」的題（app.js 的 seenRefs：從作答紀錄＋暫存即時計算，刪紀錄就算沒做過）。
- 老師批改：寫作、句子改寫、翻譯、口說（teacher.js 的 GRADE_TYPES）會出現在總覽最上方「待批改」，可逐題改判、標記批改完成；存在試算表 reviews 工作表。
  老師可刪除紀錄（連同批改紀錄、錄音）；載入成績時以雲端為準，刪掉的紀錄會從總覽消失。
- 口說錄音：學生自評後上傳到 Allen 雲端硬碟「Apex English 錄音」資料夾（檔名 rec_<attemptId>_<題號>.m4a），老師在解析裡用老師代碼播放。
- 首頁考試範圍：翰林版國一～國三收在可折疊的群組（依 `range` 含「翰林」判斷）；預設單選，按「複選」才能一次選多冊。
- 學生身分：沒有帳號，靠「名字＋個人代碼」。第一次作答時自動產生 6 碼代碼（`sync.js` 的 ensureCode），
  後端存在試算表的 `students` 工作表；學生可在「紀錄」頁修改、換裝置時用代碼找回紀錄；老師總覽可查全部代碼。
  改 `docs/js` 或 css 後，把 `index.html` 裡的 `?v=N` 加一，手機才會載入新版。
