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
- **托福（2026 新制）**：練習題在 `banktoefl.js`（題庫設定＋閱讀）、`banktoefl2.js`（聽力、寫作、口說），共約 236 題；正式模擬卷在 `banktoeflmock.js`、`banktoeflmock2.js`（各 128 題）。
  - 2026-10 依「多次元托福 10/25 全科預測」的難度全部重寫（B2～C1）：學術文章約 230～290 字、5 題（推論、字義、EXCEPT、作者目的、句子插入）；Choose a Response 以間接回應為主。
    預測題本放在 `多次元托福*/`（已 gitignore），只能當難度與格式參考，內容不可照搬到網站。
  - 出題工具（helpers.js）：
    - `CTW(id, tag, title, 原文, alts)` Complete the Words：自動挖空（第一句完整，之後每隔一字挖掉後半，共 10 格；遇到大寫、單一字母、連字號就順延）。
      `alts` 是同樣長度、前後文也通的其他答案，例如 `{ their: ["these"] }`。改原文會改變挖空位置，改完用 node 印出來檢查。
    - `DL` Read in Daily Life（第一行粗體，可放 From/To/Subject 或表單欄位）；`AP(id, tag, title, 段落, uline, qs)` 學術文章（`uline` 是字義題要畫底線的字）。
    - `INS(id, 插入句, ans)` 句子插入題：文章裡放四個 ■（畫面自動編號 1～4），答案 0～3 不會被自動平衡，要自己分散；答完會把句子放進文章。
    - `BS(id, tag, 對方的話, frame, tiles, extra, 解析, alt)` Build a Sentence：frame 裡的 `_` 是空格，固定的字可以放在任何位置（例如 `"Do you know _ _ _ _?"`）。
    - `EM(id, tag, 情境, bullets, 收件人, 主旨, 範文, 解析)`、`AD` Academic Discussion、`LG` 聽力題組、`L(...,"cr",...)` 聽一句選回應、`SR`／`SI` 口說。
  - 聽力 script 的說話者：W/M 美國腔、WB/MB 英國腔、WA/MA 澳洲腔、WC/MC 加拿大腔、N 旁白（聲音設定在 config.js 的 `TTS.accents`）。
  - Reading、Listening 是兩階段適應性：題目加 `stage`（router／lower／upper），模擬卷的 `adaptive` 設定切分點（第一階段答對率 ≥ 60% 進 upper）。執行邏輯在 `toefl.js`。
    題數照 ETS 官方：Reading 50（router 32＝補字母 2 段＋生活閱讀 2 題＋學術文章 2 篇；lower／upper 各 18＝補字母 1 段＋生活閱讀 3 題＋學術文章 1 篇）、
    Listening 47（router 30、lower／upper 各 17）、Writing 12、Speaking 11，完整一回 120 題。畫面上的總題數一開始就包含第二階段。
    模擬卷執行時依 tag 順序排題（`byTagOrder`），所以新增題目一律加在檔案最後；不再使用的題目用 `RE()`（stage retired）留著，不要刪，舊紀錄和選項平衡才不會亂。
  - 補字母一段 10 格照官方各算 1 題，但畫面上整段是一頁（`ctSpan`）：題號顯示 Q1–10，「下一題」直接跳過整段。
  - 隨機組卷有指定題數時用 `balancedPick`：題數平均分給選到的部分（聽說讀寫），每部分裡輪流抽各題型，題組放不下就換下一個（整份最多多 2～3 題）。
  - 正式模擬卷「考哪一部分」可以按「複選」同時考好幾個部分（`sel.gMulti`／`sel.gParts`）。
  - 語音只做聽力和口說（build_tts_jobs.mjs 會跳過托福的閱讀、寫作和 dict7.js、dict8.js 的單字），托福頁面也不顯示「念題目／朗讀全文」。
  - 托福題目用到的字收在 `dict7.js`、`dict8.js`（點字時用瀏覽器內建語音）；題目裡不要用 é、ā 這類字母（點字查詢會拆錯），寫成 cafe、resume、Maori。
  - 寫作、口說是自評＋範文；口說錄音在學生自評後上傳給老師（見下方「口說錄音」）。結果頁會顯示依答對率估算的 1～6 級分。
  - Allen 提供的「新托福模擬小題本」只當格式參考，內容含 ETS 官方題，不可照搬到網站。
- **AI 批改（目前只有托福 Write an Email）**：前端 `docs/js/aigrade.js`，後端 `apps-script/Ai.gs`（評分指令＝`新制托福 Write an Email 評分與回饋系統.md` 的標準）。
  - 後端用部署者（Allen）帳號的授權（`ScriptApp.getOAuthToken`＋`cloud-platform` scope）呼叫 Vertex AI，費用記在 `Secrets.gs` 的 `VERTEX_PROJECT`（Google Cloud 試用額度）。
    模型 `gemini-3.1-pro-preview`，被限流就改用 `gemini-2.5-pro`；一篇約 30～90 秒。服務帳戶金鑰被 Google 預設安全政策擋住，所以不用金鑰。
  - 防濫用：學生要名字＋個人代碼（老師可用老師代碼），每人 6 小時 40 篇、全站 300 篇。aigrade 不進 doPost 的鎖。
  - 畫面：估分卡（四面向＋封頂規則）、一句診斷、任務檢核、原文標註＋錯誤清單、語域檢查、替換字、錯誤日誌與分數趨勢、5 分鐘限時重寫、C1／C2 範文。
    隨機組卷只計時；正式模擬卷（`S.mock`）每題限時 7 分鐘、時間到自動送出。AI 分數就是這題的分數，老師在待批改改分會覆蓋。
  - Email 題 `EM(..., 收件人, 主旨, C1範文, C2範文, 解析)`。隨機組卷的題數可以選「1 題」（適合專練寫作、口說）。
- **開場動畫、角色名片、每日任務、Dashboard（2026-10-22 加入）**：加入名片前的版本保留在 git tag `v-before-namecard`／分支 `backup-before-namecard`，要退回就把 docs 換回那一版。
  - 開場動畫 `docs/js/intro.js`（index.html 的 `#intro` 後面同步載入）：景深字雨（遠、中、近三層字母落過畫面，不在底部堆積）＋Apex English 逐字落定（這段 Allen 喜歡，不要改），約 2.2 秒，點一下跳過；
    等 app.js 的 `apex-ready` 事件才收起；CSS 有 3.6 秒保險自動消失；減少動態效果時只淡入品牌字。網址加 `?nointro` 不播。`docs/intro-lab.html` 是當初 A／B／C 三種版本的比較頁（Allen 選 C）。
  - 角色名片 `docs/js/card.js`：6 位角色（CHARS：Kai、Jaylen、Mateo 男；Yuna、Priya、Freya 女）× 4 套造型（OUTFITS：court 球場、street 街頭、campus 學院、neon 夜城），8 個場景（SCENES）。
    圖：`docs/img/avatar/<角色>-<造型>.webp`（透明背景 604×900）、`-s` 縮圖、`<角色>-face.webp` 頭像；`docs/img/scene/<場景>.webp`（1600×900）、`-s` 縮圖。
    畫風是《Call of the Sea》／迪士尼式手繪動畫風（Allen 指定，不要寫實、不要 AI 感），用 Higgsfield `gpt_image_2_5`（透明背景，0.5 點／張）：先畫各角色一張，
    其他造型用「image_references＝那張的 job_id」只換衣服，臉和身材才會一致；場景用 `z_image`（0.15 點／張）。一次送超過 5 個工作會被限流（429）。
    名片＝場景＋角色（約名片高度 70%，女生 67%，腳下陰影、依場景的 tint／rim 調色和側光、待機呼吸）＋右下玻璃資訊面板；容器窄於 470px 時改 4:3、隱藏數據列。
    輸入新名字（Enter 或離開輸入框）或第一次點名字會彈出（先放大到接近全螢幕再退回 70%）＋選角色、造型、場景的面板；首頁還沒有名片時作答人下面有「選一位角色」入口。
    設定存在 `store.cards[名字]＝{char, outfit, scene}`（舊版只有 bg／stickers 的不算，會請學生重選），交卷時跟著成績上傳（attempt.card），老師總覽顯示學生名片。
  - 連續練習解鎖場景：court、station、rooftop、sakura 一開始就能用；neon 3 天、alley 7 天、lookout 14 天、camp 30 天（看「最長連續天數」，解鎖後不會再鎖）。
    **目前 Allen 要測試，card.js 的 `UNLOCK_ALL = true` 讓場景全部開放；他說可以時改回 false。**
  - 每日任務（`QUESTS`）：每人每天 3 個（1 個簡單＋2 個進階，依名字＋日期固定抽），每個 +30 XP，全部完成再 +50 XP；首頁作答人下面顯示。
    經驗值＝每份作答 20 XP＋每得 1 分 10 XP＋每日任務；等級門檻 50·L·(L+1)。
  - 剛交卷的結果頁（app.js 的 `justFinished`）最上面有結算：獲得 XP、升級、完成的任務、新解鎖的場景（可直接「換上」）。
  - 紀錄頁選了某位學生時，上方是個人 Dashboard（名片、等級環、練習次數、答對率、Combo、時間、連續天數與場景解鎖進度、近 14 天、近 12 次成績）。
  - app.js 的第一次 render 改成等 DOMContentLoaded（所有模組都載入後），新模組的函式才用得到。
  - 3D 角色（Meshy image_to_3d）評估過：每個模型 30～38 點、24 套造型約 900 點，檔案也大，所以維持 2D。
- **聽說讀寫進度條**（app.js 的 `skillBarsHTML`）：有正式模擬卷的題庫（托福、英檢）＋它的模擬卷算一組，依 tag 名稱開頭（Reading／閱讀、Listening／聽力…）分成聽說讀寫。
  長條＝這個學生做過的題目佔該部分總題數（同一題只算一次），顏色＝最近一次的得分率，最弱的部分標「建議加強」。
  出現在首頁（選了托福或英檢、有輸入名字時，可按「練這部分」直接選好題型）、紀錄頁（選了某位學生時）、老師總覽的個人詳細。
- **網站名稱與分享預覽**：名稱 Apex English；分享預覽圖是 `docs/og-v2.png`（換圖時改新檔名，避免 LINE/FB 快取舊圖）（1200×630，用 Chrome headless 從 HTML 截圖產生），index.html 有 og:／twitter: 標籤。
  新題目裡沒收錄的字要加到 `dict*.js`（格式 `word|詞性|中文`）。
- **改完之後**：`node tools/build_tts_jobs.mjs && .venv/bin/python tools/gen_audio.py`，再 `git add -A && git commit && git push`
- 單選題的選項順序會在載入時自動平衡，新增題目請加在每份題庫的最後面，已存在的題目不要改 id 或移動位置（舊紀錄靠 id 對應）。
- 語音檔名由 `tts-text.js` 的 `ttsName(voice, text)` 決定，瀏覽器和 `build_tts_jobs.mjs` 共用同一份程式，改這支要兩邊一起測。
- repo 是公開的：不要把 Secrets.gs、代碼或學生資料提交進去。
- 出題會優先出「這個名字還沒做過」的題（app.js 的 seenRefs：從作答紀錄＋暫存即時計算，刪紀錄就算沒做過）。
- 評分（scoring.js）：依官方配分。英檢單句寫作（改寫、合併、重組）每題 0～2、段落寫作 0～5 級分（寫作成績＝(單句/30＋段落/5)×50）；
  托福 Email、討論、Listen and Repeat、Interview 每題 0～5；其他客觀題 1 分；國中翻譯比照 0～2。自評與老師評分都用同一套 RUBRICS。
- 學生自評（作文、口說）只有三個選項：還需加強／中等／達到要求；改寫、翻譯系統判錯時學生可按「我覺得我寫的也對」先給分（claim）。
  系統判錯的改寫、翻譯一律進待批改；老師評分後，學生裝置會用 myreviews 取回並更新成績（紀錄顯示「老師已批改」）。
- 老師批改：寫作、句子改寫、翻譯、口說（teacher.js 的 GRADE_TYPES）會出現在總覽最上方「待批改」（學生 → 第幾回 → 批改頁），依官方分數評分、標記批改完成；存在試算表 reviews 工作表。
  老師可刪除紀錄（連同批改紀錄、錄音）；載入成績時以雲端為準，刪掉的紀錄會從總覽消失。
- 口說錄音：學生自評後上傳到 Allen 雲端硬碟「Apex English 錄音」資料夾（檔名 rec_<attemptId>_<題號>.m4a），老師在解析裡用老師代碼播放。
- 首頁考試範圍：翰林版國一～國三收在可折疊的群組（依 `range` 含「翰林」判斷）；預設單選，按「複選」才能一次選多冊。
- 學生身分：沒有帳號，靠「名字＋個人代碼」。第一次作答時自動產生 6 碼代碼（`sync.js` 的 ensureCode），
  後端存在試算表的 `students` 工作表；學生可在「紀錄」頁修改、換裝置時用代碼找回紀錄；老師總覽可查全部代碼。
  改 `docs/js` 或 css 後，把 `index.html` 裡的 `?v=N` 加一，手機才會載入新版。
