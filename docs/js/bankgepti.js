/* ===== 全民英檢 中級（原創模擬題；規格見本機「全民英檢中級 題型規格與出題計畫.md」）
   2021 新制：聽力 35 題（看圖辨義 5、問答 10、簡短對話 10、簡短談話 10，約 30 分鐘，四選一、每題只播一遍）；
   閱讀 35 題（詞彙 10、段落填空 10＝2 篇 × 5、閱讀理解 15＝5 組，45 分鐘）；
   寫作 2 題（中譯英 40%、英文作文 60%，40 分鐘）；口說 13 題（朗讀短文 2、回答問題 10、看圖敘述 1，約 15 分鐘）。
   新題目一律加在最後，已存在的題目不要改 id 或移動位置 ===== */
BANKS.push({
  id: "gept-i", grade: 10.5, tagIsType: true,
  title: "全民英檢 中級",
  range: "GEPT Intermediate 聽力＋閱讀",
  added: "2026-11-01",
  note: "依 2021 年起的新題型自編練習題（CEFR B1）：聽力＝看圖辨義、問答、簡短對話、簡短談話；閱讀＝詞彙、段落填空、閱讀理解（含多文本）。選「模擬段考」可以考照正式考試題數和時間出的完整考卷。",
  exams: [
    { name: "聽力測驗", tags: ["l1", "l2", "l3", "l4"] },
    { name: "閱讀測驗", tags: ["r1", "r2", "r3"] }
  ],
  timeLimits: [[["l1", "l2", "l3", "l4"], 30], [["r1", "r2", "r3"], 45]],
  mock: [["l1", 5], ["l2", 10], ["l3", 10], ["l4", 10], ["r1", 10], ["r2", 2], ["r3", 5]],
  tags: {
    l1: "聽力一・看圖辨義",
    l2: "聽力二・問答",
    l3: "聽力三・簡短對話",
    l4: "聽力四・簡短談話",
    r1: "閱讀一・詞彙",
    r2: "閱讀二・段落填空",
    r3: "閱讀三・閱讀理解"
  },
  items: [
  /* ---------- 閱讀一・詞彙 ---------- */
  M("v01","r1","The concert was ___ because of the typhoon, so we got our money back.",["canceled","delivered","repeated","included"],0,"颱風 → 演唱會怎麼了？錢退回來了。","cancel = 取消。deliver 運送、repeat 重複、include 包含。"),
  M("v02","r1","Kevin is very ___. He always tells the truth, even when it gets him into trouble.",["honest","curious","jealous","nervous"],0,"總是說實話。","honest = 誠實的。curious 好奇的、jealous 嫉妒的、nervous 緊張的。"),
  M("v03","r1","Please ___ the form and hand it to the nurse at the front desk.",["fill out","give up","take off","turn down"],0,"表格要怎麼處理？","fill out a form = 填表格。give up 放棄、take off 脫下／起飛、turn down 拒絕／調小聲。"),
  M("v04","r1","The museum has a large ___ of old Chinese paintings.",["collection","direction","condition","position"],0,"博物館「收藏」了很多古畫。","collection = 收藏品。direction 方向、condition 狀況、position 位置。"),
  M("v05","r1","My grandfather is 85, but he is still in good ___. He walks for an hour every morning.",["health","wealth","method","habit"],0,"in good ___ 身體很好。","in good health = 身體健康。wealth 財富、method 方法、habit 習慣。"),
  M("v06","r1","We ran ___ of milk, so I went to the convenience store to buy some.",["out","away","over","off"],0,"牛奶「用完了」。","run out of = 用完。"),
  M("v07","r1","The new train line will ___ the travel time between the two cities from three hours to one.",["reduce","refuse","replace","remind"],0,"三小時變一小時。","reduce = 減少。refuse 拒絕、replace 取代、remind 提醒。"),
  M("v08","r1","Students must show their ID cards to ___ the library after 9 p.m.",["enter","explain","expect","exchange"],0,"晚上九點後要出示證件才能「進入」。","enter = 進入。"),
  M("v09","r1","I didn't recognize Amy at first. Her ___ has changed a lot since she cut her hair.",["appearance","attention","agreement","audience"],0,"剪了頭髮後，什麼改變了？","appearance = 外表。attention 注意力、agreement 同意、audience 觀眾。"),
  M("v10","r1","This medicine may make you feel sleepy, so don't drive after you ___ it.",["take","eat","drink","make"],0,"吃藥用哪個動詞？","take medicine = 吃藥（固定搭配）。"),
  M("v11","r1","The hotel room was clean and ___, with a big window facing the sea.",["comfortable","available","responsible","possible"],0,"形容房間：乾淨又…","comfortable = 舒適的。available 可取得的、responsible 負責的。"),
  M("v12","r1","Mr. Lin was ___ to manager last month because of his excellent work.",["promoted","produced","protected","provided"],0,"表現好 → 被「升職」。","be promoted to + 職位 = 升為…。"),
  M("v13","r1","It's ___ to swim in this river. The water is deep and moves very fast.",["dangerous","delicious","convenient","generous"],0,"水深又急。","dangerous = 危險的。generous 慷慨的。"),
  M("v14","r1","The company will ___ ten new workers to help with the busy season.",["hire","fire","retire","admire"],0,"旺季要多「僱用」人。","hire = 僱用；fire 開除、retire 退休、admire 欽佩。"),
  M("v15","r1","Our teacher asked us to ___ our ideas in groups before writing the report.",["discuss","dislike","discover","disappear"],0,"分組「討論」想法。","discuss = 討論（不加 about）。"),
  M("v16","r1","The price of vegetables usually goes up after a strong typhoon because many farms are ___.",["damaged","decorated","delivered","developed"],0,"颱風後農田「受損」。","damage = 損壞。decorate 裝飾、develop 發展。"),
  M("v17","r1","I'm sorry, but this seat is ___. My friend will be back in a minute.",["taken","broken","spoken","stolen"],0,"這位子有人坐了。","The seat is taken. = 這位子有人。"),
  M("v18","r1","Jenny is ___ about her trip to Japan. She has been talking about it all week.",["excited","tired","bored","worried"],0,"一整週都在講這趟旅行。","be excited about = 對…很興奮。"),
  M("v19","r1","You need a ___ to drive a car in Taiwan.",["license","lesson","lecture","letter"],0,"開車要有什麼？","driver's license = 駕照。lecture 演講。"),
  M("v20","r1","The ___ said that there would be heavy rain in northern Taiwan this weekend.",["weather forecast","price tag","traffic jam","shopping list"],0,"誰會預報下雨？","weather forecast = 氣象預報。"),
  M("v21","r1","Many people ___ their jobs in the city and move to the countryside for a quieter life.",["quit","quote","quiz","quiet"],0,"辭掉工作、搬到鄉下。","quit a job = 辭職。quiet 是形容詞「安靜的」。"),
  M("v22","r1","He ___ his leg while playing basketball and had to stay in the hospital for a week.",["injured","invited","invented","included"],0,"打球時腿怎麼了？","injure = 使受傷。invent 發明。"),
  M("v23","r1","Please keep your ___ until the end of the trip. You will need it to get off the bus.",["ticket","tissue","towel","tool"],0,"下車時需要什麼？","ticket = 票。"),
  M("v24","r1","Because of the heavy traffic, we arrived at the airport just ___ time for our flight.",["in","on","at","by"],0,"「及時」趕上。","in time = 及時（趕得上）；on time = 準時。"),
  M("v25","r1","Sam is a ___ of the school basketball team. He practices every day after class.",["member","master","mayor","major"],0,"籃球隊的「成員」。","member = 成員。"),
  M("v26","r1","The teacher ___ the students not to use their phones during the test.",["warned","wondered","wandered","waved"],0,"___ + 人 + not to V。","warn sb. not to V = 警告某人不要…。wander 閒逛、wave 揮手。"),
  M("v27","r1","My sister and I ___ different hobbies. She likes reading, but I love sports.",["have","make","take","do"],0,"擁有不同的興趣。","have hobbies = 有嗜好。"),
  M("v28","r1","I can't ___ which dress to buy. They are both beautiful.",["decide","describe","deserve","design"],0,"兩件都很漂亮，無法…","decide = 決定。describe 描述、deserve 應得、design 設計。"),
  M("v29","r1","The little boy was ___ of the big dog and hid behind his mother.",["afraid","proud","careful","fond"],0,"躲到媽媽後面。","be afraid of = 害怕。be proud of 以…為傲、be fond of 喜歡。"),
  M("v30","r1","This bag is too heavy. Can you give me a ___?",["hand","head","heart","hint"],0,"請幫個忙。","give sb. a hand = 幫某人一把。"),
  M("v31","r1","The science ___ will be held in the school hall, and parents are welcome to visit.",["fair","fare","fear","fire"],0,"科學「展覽會」。","science fair = 科展。fare 是車資。"),
  M("v32","r1","The movie was so ___ that I fell asleep halfway through it.",["boring","shocking","touching","amazing"],0,"看到一半睡著了。","boring = 無聊的。"),
  M("v33","r1","We should ___ energy by turning off the lights when we leave a room.",["save","spend","waste","send"],0,"離開時關燈 → 節省能源。","save energy = 節省能源；waste 浪費。"),
  M("v34","r1","The store will give you a full ___ if you return the shoes within seven days.",["refund","reward","record","report"],0,"退貨 → 全額「退款」。","refund = 退款。reward 獎賞。"),
  M("v35","r1","It took the workers two years to ___ the new bridge over the river.",["build","bring","break","borrow"],0,"花兩年「蓋」橋。","build a bridge = 建橋。"),
  M("v36","r1","My little brother ___ his homework until the last minute every week.",["puts off","puts on","puts up","puts away"],0,"拖到最後一刻。","put off = 拖延。put on 穿上、put away 收好、put up 張貼／搭起。"),
  M("v37","r1","Lisa ___ her mother. They both have curly hair and big brown eyes.",["takes after","looks after","runs after","goes after"],0,"長得像媽媽。","take after = （外貌、個性）像父母。look after = 照顧。"),
  M("v38","r1","Please speak more ___. The baby is sleeping in the next room.",["quietly","loudly","quickly","clearly"],0,"寶寶在睡覺。","quietly = 安靜地、小聲地。"),
  M("v39","r1","The police are trying to find out the ___ of the fire.",["cause","case","cost","course"],0,"找出火災的「原因」。","cause = 原因。case 案件、cost 花費、course 課程。"),
  M("v40","r1","I don't have enough money to buy a new phone, so I'll buy a ___ one instead.",["used","useful","useless","user"],0,"錢不夠 → 買「二手」的。","used = 用過的、二手的；useful 有用的。"),
  M("v41","r1","The two brothers look so ___ that even their teachers can't tell them apart.",["similar","familiar","popular","regular"],0,"老師都分不出來。","similar = 相似的。familiar 熟悉的、regular 規律的。"),
  M("v42","r1","After the long walk, we were tired and ___, so we drank a lot of water.",["thirsty","hungry","sleepy","lucky"],0,"喝了很多水。","thirsty = 口渴的。"),
  M("v43","r1","The ___ of this apartment is NT$15,000 a month, including water and electricity.",["rent","rest","rule","rate"],0,"公寓每個月的「租金」。","rent = 租金。rate 比率。"),
  M("v44","r1","Our flight was ___ for two hours because of the bad weather.",["delayed","decided","defended","delivered"],0,"天候不佳，班機「延誤」。","delay = 延誤。defend 防守。"),
  M("v45","r1","The restaurant is very popular. You'd better make a ___ before you go.",["reservation","conversation","situation","population"],0,"去之前要先「訂位」。","make a reservation = 訂位。population 人口。"),
  M("v46","r1","Jason is ___ in history. He reads history books in his free time.",["interested","interesting","interest","interestingly"],0,"人對…感興趣。","be interested in = 對…有興趣（人用 -ed）。"),
  M("v47","r1","Tina ___ to call me back, but she forgot.",["promised","practiced","prepared","prevented"],0,"答應要回電，但忘了。","promise to V = 答應要…。prevent 阻止。"),
  M("v48","r1","Smoking is not ___ anywhere in the hospital.",["allowed","allowing","allows","allow"],0,"被動：不被允許。","be allowed = 被允許。"),
  M("v49","r1","My parents ___ me to study abroad. They think it will be a great experience.",["encourage","embarrass","entertain","examine"],0,"___ + 人 + to V；父母覺得是很好的經驗。","encourage sb. to V = 鼓勵某人…。embarrass 使尷尬、examine 檢查。"),
  M("v50","r1","The village is ___ for its hot springs. Thousands of visitors come every winter.",["famous","serious","various","anxious"],0,"be ___ for = 以…出名。","be famous for = 以…聞名。anxious 焦慮的。"),
  M("v51","r1","Could you ___ my plants while I'm on vacation?",["water","fly","hand","mind"],0,"出遠門時幫忙「澆」植物。","water 當動詞 = 澆水。"),
  M("v52","r1","I'm ___ that you passed the exam. All your hard work paid off.",["glad","sorry","afraid","upset"],0,"考試通過了。","be glad that... = 很高興…。"),
  M("v53","r1","Online shopping is ___ because you can buy things at any time without leaving home.",["convenient","confident","comfortable","complete"],0,"不用出門就能買。","convenient = 方便的。confident 有自信的。"),
  M("v54","r1","The bus driver told us to hold on ___ because the road was bumpy.",["tightly","lightly","nearly","hardly"],0,"路很顛簸 → 抓「緊」。","hold on tightly = 抓緊。hardly 幾乎不。"),
  M("v55","r1","The factory has been ___ chemicals into the river, so the fish are dying.",["pouring","pointing","polishing","printing"],0,"把化學物質「倒」進河裡。","pour = 倒、灌。polish 擦亮。"),
  M("v56","r1","Mia is ___ for planning the class party. Please talk to her if you have any ideas.",["responsible","reasonable","remarkable","removable"],0,"負責籌劃派對。","be responsible for = 負責…。reasonable 合理的、remarkable 出色的。"),
  M("v57","r1","Sorry, I didn't ___ to step on your foot.",["mean","need","seem","dream"],0,"「不是故意」踩到你。","didn't mean to V = 不是故意…。"),
  M("v58","r1","The library will be ___ for two weeks while new computers are installed.",["closed","crowded","cleared","covered"],0,"安裝電腦期間「關閉」。","closed = 關閉的。crowded 擁擠的。"),
  M("v59","r1","There is a ___ between the two plans. One costs more, but the other takes more time.",["difference","distance","decision","discount"],0,"兩個計畫的「差異」。","difference = 差別。distance 距離、discount 折扣。"),
  M("v60","r1","Remember to ___ your seat belt before the plane takes off.",["fasten","loosen","lessen","listen"],0,"起飛前「繫好」安全帶。","fasten = 繫緊。loosen 鬆開。"),
  M("v61","r1","The old man lives ___ in a small house in the mountains. His children all work in the city.",["alone","along","aloud","alive"],0,"孩子都在城市工作。","live alone = 獨自生活。along 沿著、aloud 大聲地、alive 活著的。"),
  M("v62","r1","Many students feel a lot of ___ before the big exam.",["pressure","pleasure","treasure","measure"],0,"大考前的「壓力」。","pressure = 壓力。pleasure 樂趣、treasure 寶藏、measure 措施。"),
  M("v63","r1","This T-shirt is made ___ cotton, so it is soft and cool.",["of","by","with","for"],0,"由什麼材質做成（看得出原料）。","be made of + 材料（看得出來）；be made from 看不出原料。"),
  M("v64","r1","We need to ___ the problem before it gets worse.",["deal with","depend on","pick up","show off"],0,"在變糟之前「處理」問題。","deal with = 處理。depend on 依靠、show off 炫耀。"),
  M("v65","r1","Ivy finally ___ to finish the marathon, though her legs hurt badly.",["managed","failed","stopped","refused"],0,"雖然腿很痛，最後還是…","manage to V = 設法做到。fail to V 沒能做到。"),
  M("v66","r1","Please turn off your phone. The movie is about to ___.",["begin","belong","behave","believe"],0,"電影「即將開始」。","be about to V = 即將…。behave 守規矩、belong 屬於。"),
  M("v67","r1","Thanks to the doctor's quick ___, the patient got well soon.",["treatment","equipment","argument","department"],0,"醫生的「治療」。","treatment = 治療。equipment 設備、argument 爭論、department 部門。"),
  M("v68","r1","The store is offering a 30% ___ on all winter clothes this week.",["discount","account","amount","count"],0,"冬衣打七折。","discount = 折扣。account 帳戶、amount 數量。"),
  M("v69","r1","It is ___ that he will come to the party. He has been sick in bed for days.",["unlikely","unable","unhappy","unwilling"],0,"病了好幾天 → 他「不太可能」來。","It is unlikely that... = 不太可能…。"),
  M("v70","r1","Tom ___ a lot of weight after he started jogging every day.",["lost","missed","reduced","left"],0,"每天慢跑後「瘦了」很多。","lose weight = 減重（固定搭配，不說 reduce weight）。"),

  /* ---------- 閱讀二・段落填空（每篇 5 空，至少 1 題選一整句） ---------- */
  G("c01","r2","cloze","Learning to Say No",[
    "Many people find it hard to say no. When a friend asks for help, they agree even if they are already very busy. They are afraid that the friend will be [[1]] with them. However, saying yes all the time can make you tired and stressed. [[2]], you may not have enough time to do your own work well.",
    "Experts say that it is fine to [[3]] a request politely. You can say, \"I'd love to help, but I can't this week.\" It is also a good idea to [[4]] another way to help, such as introducing someone else who has time. [[5]] Real friends will understand that you have your own life, too."
  ],[["stressed","有壓力的"],["expert","專家"],["request","請求"],["politely","有禮貌地"]],[
    B("c01a",1,["angry","pleased","familiar","satisfied"],0,"怕朋友會對他們怎樣？","be angry with sb. = 對某人生氣。"),
    B("c01b",2,["As a result","For example","On the other hand","In the beginning"],0,"太累 → 結果沒時間把自己的事做好。","As a result = 結果（因果）。"),
    B("c01c",3,["turn down","turn on","take up","look up"],0,"有禮貌地「拒絕」請求。","turn down a request = 拒絕請求。"),
    B("c01d",4,["suggest","complain","pretend","forget"],0,"「建議」別的幫忙方式。","suggest + 名詞 = 建議…。"),
    B("c01e",5,["Saying no does not mean you are a bad friend.","Most people never ask their friends for help.","You should always say yes to your boss.","Being busy is the best way to make friends."],0,"段落最後一句：下一句說真正的朋友會懂。","拒絕不代表你是壞朋友 → 接「真正的朋友會理解」。")
  ]),
  G("c02","r2","cloze","The Night Market Tour",[
    "Last weekend, our English club took a group of exchange students from Canada to Raohe Night Market. Most of them had never [[1]] a night market before, so they were surprised by the crowds and the smells. We let them try stinky tofu first. At first they didn't want to eat it, [[2]] after one bite, two of them asked for more!",
    "[[3]] The students took a lot of photos of the colorful lights and the long lines in front of the famous pepper bun stand. One of them said the night market was the most [[4]] part of his trip because it showed him how Taiwanese people really live. Before we said goodbye, they [[5]] us to visit them in Toronto someday."
  ],[["exchange student","交換學生"],["crowd","人群"],["stinky tofu","臭豆腐"],["bite","一口"],["pepper bun","胡椒餅"],["stand","攤子"]],[
    B("c02a",1,["been to","gone","come from","heard"],0,"從沒「去過」夜市。","have been to = 曾經去過。have gone to 是已經去了（人不在這裡）。"),
    B("c02b",2,["but","so","because","or"],0,"一開始不想吃，「但」咬一口之後…","前後語意相反 → but。"),
    B("c02c",3,["The food was not the only thing they enjoyed.","None of them liked the night market at all.","The night market was closed because of the rain.","We decided to go home before eating anything."],0,"下一句講拍照片、燈光。","從食物轉到其他喜歡的東西 → 「他們喜歡的不只有食物」。"),
    B("c02d",4,["memorable","terrible","comfortable","responsible"],0,"旅程中最「難忘」的部分。","memorable = 難忘的。"),
    B("c02e",5,["invited","refused","reminded of","complained"],0,"___ + 人 + to V。","invite sb. to V = 邀請某人…。")
  ]),
  G("c03","r2","cloze","Notice to All Residents",[
    "Dear Residents,",
    "The water in our building will be [[1]] off from 9 a.m. to 3 p.m. next Tuesday, May 14, because workers need to replace some old pipes. Please [[2]] enough water before Tuesday morning for cooking and washing. [[3]] The elevator on the east side will also be out of service during the repairs, so please use the west elevator [[4]].",
    "We are sorry for the trouble this may cause. If you have any questions, please [[5]] the management office at 2345-6789.",
    "Management Office, Green Garden Apartments"
  ],[["resident","住戶"],["replace","更換"],["pipe","水管"],["out of service","停止使用"],["management office","管理室"]],[
    B("c03a",1,["turned","taken","given","put"],0,"停水：turn off the water。","be turned off = 被關掉。"),
    B("c03b",2,["store","spend","waste","order"],0,"事先「儲存」足夠的水。","store water = 儲水。"),
    B("c03c",3,["Remember to keep your taps closed until the work is finished.","You can take a long shower during this time.","The new pipes will be painted red.","Workers will visit each apartment for dinner."],0,"停水期間的提醒事項。","施工期間記得水龍頭關好（避免來水時漏水），最符合公告語氣。"),
    B("c03d",4,["instead","either","already","yet"],0,"東側電梯停用 → 「改」搭西側。","instead = 改用、作為替代。"),
    B("c03e",5,["contact","connect","collect","correct"],0,"有問題請「聯絡」管理室。","contact sb. = 聯絡某人（不加 to）。")
  ]),
  G("c04","r2","cloze","Why Do Cats Purr?",[
    "Most cat owners know the soft sound their cats make when they are being petted. This sound, called purring, usually [[1]] that a cat is happy and relaxed. [[2]], scientists have found that cats also purr when they are hurt, sick, or giving birth.",
    "Some scientists believe that purring may help cats [[3]]. The sound waves of purring are at a level that can help bones and muscles heal faster. [[4]] This may be why cats can recover from falls better than many other animals. So the next time your cat purrs, it may be [[5]] more than just saying \"I love you.\""
  ],[["purr","（貓）呼嚕"],["pet","撫摸"],["give birth","生產"],["sound wave","聲波"],["muscle","肌肉"],["heal","癒合"],["recover","復原"]],[
    B("c04a",1,["means","meant","meaning","to mean"],0,"主詞 This sound 是單數、現在的事實。","現在簡單式第三人稱單數 → means。"),
    B("c04b",2,["However","Therefore","For instance","In other words"],0,"前面說快樂才呼嚕，後面說受傷也會 → 轉折。","However = 然而。"),
    B("c04c",3,["heal themselves","catch more mice","sleep longer","find their owners"],0,"下一句說聲波能幫助骨頭、肌肉癒合。","purring 可能幫貓「自我療癒」。"),
    B("c04d",4,["In fact, doctors use similar sound waves to treat some injuries in people.","Dogs, on the other hand, are much more friendly than cats.","Most cats do not like to be touched by strangers.","Cats usually sleep about fifteen hours a day."],0,"延續「聲波能幫助癒合」的話題。","醫生也用類似的聲波治療人的傷，支持前一句。"),
    B("c04e",5,["doing","making","taking","having"],0,"may be ___ more than... = 可能在做的不只是…","be doing more than just V-ing = 不只是在…。")
  ]),
  G("c05","r2","cloze","A Message to Coach Wang",[
    "Dear Coach Wang,",
    "I'm writing to let you know that I won't be able to [[1]] the practice this Saturday. My grandmother is having an operation, and my family will be at the hospital with her. I know the game against Sunrise High is only two weeks [[2]], and I feel bad about missing practice.",
    "[[3]] I will run every morning and practice shooting at the park near my home. If there are any new plays, could you please [[4]] them to me? I'll study them carefully so that I won't [[5]] behind the others.",
    "Thank you for understanding,",
    "Kevin Chen"
  ],[["coach","教練"],["operation","手術"],["play","（球賽）戰術"]],[
    B("c05a",1,["attend","attack","attach","attract"],0,"「參加」練習。","attend = 出席、參加。"),
    B("c05b",2,["away","ago","off","later"],0,"比賽「再過」兩週。","two weeks away = 還有兩週。ago 用在過去。"),
    B("c05c",3,["But I promise I'll keep training on my own.","So I have decided to quit the team.","Our team lost the last game badly.","My grandmother loves watching basketball."],0,"下一句是每天跑步、練投籃。","承諾自己練習 → 接每天跑步、練投籃。"),
    B("c05d",4,["send","say","speak","talk"],0,"___ them to me = 把戰術「傳給」我。","send sth. to sb. = 寄／傳給某人。"),
    B("c05e",5,["fall","stay","leave","keep"],0,"___ behind the others = 落後其他人。","fall behind = 落後（不及物）。leave sb. behind 要有受詞。")
  ]),
  G("c06","r2","cloze","Plastic in the Ocean",[
    "Every year, millions of tons of plastic end up in the ocean. Much of it comes from things we use only once, [[1]] straws, bags, and bottles. Plastic does not break down easily. It can stay in the sea for hundreds of years, [[2]] into smaller and smaller pieces.",
    "Sea animals often mistake these pieces for food. A sea turtle, for example, may eat a plastic bag because it looks [[3]] a jellyfish. [[4]] Some countries have already banned plastic bags in stores. We can also help by carrying our own cups and shopping bags. Small changes, if made by [[5]] people, can make a big difference."
  ],[["end up","最後落得"],["straw","吸管"],["break down","分解"],["mistake A for B","把 A 誤認為 B"],["sea turtle","海龜"],["jellyfish","水母"],["ban","禁止"]],[
    B("c06a",1,["such as","as well","so that","instead of"],0,"後面是舉例。","such as = 例如。"),
    B("c06b",2,["breaking","broke","broken","to break"],0,"分詞構句：同時一邊碎成更小片。","..., breaking into smaller pieces（主動、同時發生 → V-ing）。"),
    B("c06c",3,["like","as","alike","likely"],0,"look ___ + 名詞 = 看起來像…","look like + 名詞。alike 是形容詞，不接名詞。"),
    B("c06d",4,["This kind of mistake can make the animals sick or even kill them.","Sea turtles can live for more than one hundred years.","Jellyfish are not dangerous to people at all.","Plastic bottles are cheaper than glass ones."],0,"前面講誤食，後面講國家禁塑 → 中間說誤食的後果。","說明誤食的嚴重後果，才接到「因此有國家禁用塑膠袋」。"),
    B("c06e",5,["millions of","a little","few","each"],0,"小改變如果「很多人」做…","millions of people = 數百萬人；呼應文中 millions of tons。")
  ]),
  G("c07","r2","cloze","My First Part-Time Job",[
    "Last summer, I got my first part-time job at a breakfast shop near my school. I had to get up at five every morning, which was really hard for me [[1]]. My job was to take orders and make drinks. On my first day, I made so many [[2]] that I wanted to quit. I gave one customer milk tea [[3]] black tea, and I forgot to give another his change.",
    "Luckily, the owner, Mrs. Lee, was very patient. She showed me how to write down orders clearly. [[4]] By the end of the summer, I could remember the orders of most regular customers. The job taught me that every skill takes time to [[5]], and that making mistakes is part of learning."
  ],[["part-time","兼職的"],["take orders","點餐"],["customer","顧客"],["change","零錢"],["owner","老闆"],["regular customer","常客"]],[
    B("c07a",1,["at first","at last","at once","at least"],0,"一開始很難（後來習慣）。","at first = 起初。at last 最後、at once 立刻。"),
    B("c07b",2,["mistakes","friends","promises","decisions"],0,"第一天犯了很多…，想辭職。","make mistakes = 犯錯。"),
    B("c07c",3,["instead of","because of","in front of","out of"],0,"給了奶茶「而不是」紅茶。","instead of = 而不是。"),
    B("c07d",4,["After a few weeks, I became much faster and more careful.","The next day, I decided never to go back.","Mrs. Lee was angry and asked me to leave.","Most of the customers were students from my school."],0,"後面說暑假結束時能記住常客的點單。","幾週後變快、變細心 → 接著能記住常客點單，循序進步。"),
    B("c07e",5,["develop","destroy","delay","deliver"],0,"每種技能都需要時間來「培養」。","develop a skill = 培養技能。")
  ]),
  G("c08","r2","cloze","Sunny Hill Library: New Rules",[
    "Starting from March 1, Sunny Hill Library will [[1]] some new rules. First, each member can borrow up to eight books at a time, instead of six. Second, books can be returned at any of the city's twelve libraries, [[2]] where you borrowed them.",
    "However, there will be a small change to late fees. Books returned late will cost NT$5 per day, [[3]] NT$2 before. [[4]] Members can now renew books online up to two times, as long as no one else has [[5]] them. For more information, please visit our website or ask at the front desk."
  ],[["member","會員"],["up to","最多到"],["late fee","逾期費"],["renew","續借"],["as long as","只要"]],[
    B("c08a",1,["introduce","interrupt","imagine","improve"],0,"圖書館要「推行」新規定。","introduce rules = 推出、實施規定。"),
    B("c08b",2,["no matter","no longer","not only","none of"],0,"「不論」在哪裡借的。","no matter where = 不論在哪裡。"),
    B("c08c",3,["compared with","thanks to","as well as","in spite of"],0,"每天五元，「相較於」以前兩元。","compared with = 和…相比。"),
    B("c08d",4,["To help members avoid these fees, we are also making renewing easier.","Late fees will be used to buy coffee for the staff.","Members who are late will lose their library cards forever.","The library will close earlier on weekends."],0,"下一句說可以線上續借。","為了幫會員避免逾期費 → 續借更方便，前後連貫。"),
    B("c08e",5,["reserved","returned","repaired","repeated"],0,"只要沒有別人「預約」。","reserve = 預約、預訂。")
  ]),
  G("c09","r2","cloze","The Boy Who Planted Trees",[
    "When Jadav was sixteen, a big flood washed many snakes onto a sandbar near his village in India. The snakes died in the hot sun because there were no trees to [[1]] them. Jadav was so sad that he decided to do something. He started planting small trees on the sandbar by [[2]].",
    "People laughed at him at first. [[3]] He kept planting and watering the trees every day for more than thirty years. Today, the sandbar has become a forest [[4]] than 500 soccer fields. Elephants, tigers, and many kinds of birds now live there. Jadav's story shows that one person's effort can really [[5]] the world."
  ],[["flood","洪水"],["sandbar","沙洲"],["effort","努力"]],[
    B("c09a",1,["protect","produce","punish","publish"],0,"沒有樹「保護」牠們免於烈日。","protect = 保護。publish 出版。"),
    B("c09b",2,["himself","itself","yourself","themselves"],0,"by + 反身代名詞 = 獨自。","by himself = 獨自一人。"),
    B("c09c",3,["But he did not give up.","So he stopped planting trees.","They helped him plant thousands of trees.","The snakes came back the next year."],0,"前面被嘲笑，後面說他持續種了三十年。","被嘲笑 → 但他沒有放棄 → 繼續種。"),
    B("c09d",4,["larger","more large","largest","as large"],0,"後面有 than。","比較級 larger than。"),
    B("c09e",5,["change","charge","chase","check"],0,"一個人的努力能「改變」世界。","change the world = 改變世界。")
  ]),
  G("c10","r2","cloze","Email: Room Booking",[
    "Dear Ms. Wu,",
    "Thank you for choosing Ocean View Hotel. This email is to [[1]] your booking of a double room for two nights, from July 20 to 22. Breakfast is included and will be served from 6:30 to 10:00 a.m. in the restaurant on the second floor.",
    "Check-in time is 3 p.m. [[2]] you arrive earlier, you are welcome to leave your bags at the front desk. [[3]] If you need a ride from the train station, please let us know your arrival time at least one day [[4]]. We look forward to [[5]] you soon.",
    "Best regards,",
    "Allen Huang, Front Desk Manager"
  ],[["booking","預訂"],["double room","雙人房"],["include","包含"],["serve","供應"],["ride","接送"],["arrival","抵達"]],[
    B("c10a",1,["confirm","consider","contain","continue"],0,"這封信是要「確認」你的訂房。","confirm a booking = 確認預訂。"),
    B("c10b",2,["If","Unless","Although","Because"],0,"「如果」你提早到。","If = 如果；unless 是除非。"),
    B("c10c",3,["Our hotel also offers a free shuttle bus service.","The hotel will be closed in July.","Breakfast costs NT$500 per person.","You cannot leave your bags at the front desk."],0,"下一句說需要從火車站接送的話告訴我們。","先說有免費接駁車，再說需要的話請先告知時間。"),
    B("c10d",4,["in advance","in person","in time","in fact"],0,"至少一天「前」告知。","in advance = 事先。"),
    B("c10e",5,["seeing","see","saw","be seen"],0,"look forward to + V-ing。","to 是介系詞 → seeing。")
  ]),

  /* ---------- 閱讀三・閱讀理解（每組 3 題；含多文本） ---------- */
  G("r01","r3","notice","Rainbow Fitness Center",[
    "Summer Special — Join before June 30!",
    "• Monthly plan: NT$1,200 per month (minimum 6 months)",
    "• Yearly plan: NT$11,000 per year — get 2 free personal training lessons",
    "• Students (with a valid student ID): 20% off any plan",
    "Opening hours: Mon.–Fri. 6 a.m.–11 p.m.; Sat.–Sun. 8 a.m.–8 p.m.",
    "Free towels and lockers for all members. Swimming pool closed for repairs until July 15."
  ],[["minimum","最少"],["personal training","私人教練課"],["valid","有效的"],["locker","置物櫃"]],[
    Q("r01a","Joe is a college student. He wants to join for one year. How much will he pay?",["NT$8,800","NT$11,000","NT$9,600","NT$14,400"],0,"年費再打八折。","11,000 × 0.8 = 8,800。"),
    Q("r01b","Which is TRUE about the fitness center?",["Members don't have to bring their own towels.","It opens at 6 a.m. every day.","You can join for just one month.","The pool will reopen in early July."],0,"逐條對照。","Free towels → 不用自己帶毛巾。週末 8 點開、最少 6 個月、泳池 7/15 才開。"),
    Q("r01c","What do people get if they choose the yearly plan?",["Two free lessons with a trainer.","A free swimming pass.","A free locker for one month only.","A 20% discount for their family."],0,"Yearly plan 那一行。","get 2 free personal training lessons。")
  ]),
  G("r02","r3","article","Sleeping with Your Phone",[
    "Many teenagers keep their phones next to their beds at night. Some say it helps them fall asleep, because they can listen to music or watch short videos. However, doctors warn that this habit may be harmful.",
    "First, the blue light from phone screens tells our brains that it is still daytime. As a result, our bodies make less of a sleep chemical, and it takes longer to fall asleep. Second, messages and notifications can wake people up in the middle of the night, even if they don't realize it.",
    "Doctors suggest putting phones in another room at least thirty minutes before bed. If you use your phone as an alarm clock, try buying a cheap traditional one instead. You may be surprised at how much better you feel in the morning."
  ],[["teenager","青少年"],["harmful","有害的"],["screen","螢幕"],["chemical","化學物質"],["notification","通知"],["traditional","傳統的"]],[
    Q("r02a","What is the main idea of the article?",["Keeping phones near the bed can hurt our sleep.","Phones are the best alarm clocks.","Teenagers need more than ten hours of sleep.","Listening to music helps people sleep well."],0,"整篇在講什麼？","醫生提醒手機放床邊會影響睡眠，並提出建議。"),
    Q("r02b","According to the article, what does blue light do?",["It makes our brains think it is still day.","It makes our eyes stronger.","It helps our bodies make sleep chemicals.","It turns off notifications."],0,"第二段。","blue light ... tells our brains that it is still daytime。"),
    Q("r02c","What do doctors suggest people who use their phones as alarms do?",["Use a traditional alarm clock.","Turn the screen brightness up.","Sleep in another room.","Wake up thirty minutes earlier."],0,"最後一段。","try buying a cheap traditional one instead。")
  ]),
  G("r03","r3","article","Two Messages",[
    "【Message 1】 From: Emma | To: Kelly | Sent: Friday 6:10 p.m.",
    "Hi Kelly! Are we still meeting at Star Cinema tomorrow? The 2:30 show of \"Ocean Hero\" is sold out, so I booked the 4:10 one instead. Let's meet at the front door at 3:50. After the movie, do you want to try the new hot pot place next door?",
    "【Message 2】 From: Kelly | To: Emma | Sent: Friday 9:45 p.m.",
    "Sorry, I just saw your message! 4:10 is fine, but I have a piano lesson until 3:30 and it takes 30 minutes to get there by bus. I'll come straight to the theater, so can you get my ticket and wait for me inside? I'll pay you back. Hot pot sounds great, but I'm a vegetarian, so let's check if they have a vegetable soup base."
  ],[["sold out","賣完"],["book","預訂"],["theater","電影院"],["pay back","還錢"],["vegetarian","素食者"],["soup base","湯底"]],[
    Q("r03a","Why did Emma book the 4:10 show?",["The earlier show had no seats left.","Kelly asked her to.","It was cheaper.","She had a piano lesson."],0,"Message 1。","The 2:30 show is sold out。"),
    Q("r03b","What time will Kelly probably arrive at the cinema?",["Around 4:00.","At 2:30.","At 3:50.","At 3:30."],0,"3:30 下課＋坐車 30 分鐘。","3:30 下課，再坐 30 分鐘公車 → 約 4:00。"),
    Q("r03c","What can we learn about Kelly?",["She doesn't eat meat.","She has already bought her ticket.","She doesn't like hot pot.","She will drive to the cinema."],0,"Message 2 最後一句。","I'm a vegetarian → 不吃肉。")
  ]),
  G("r04","r3","notice","City Marathon — Information for Runners",[
    "Date: Sunday, December 8 | Start: City Hall Square",
    "Full Marathon (42 km) — starts 5:30 a.m. — time limit 6 hours",
    "Half Marathon (21 km) — starts 6:00 a.m. — time limit 3 hours",
    "Fun Run (5 km) — starts 7:30 a.m. — no time limit, children under 12 must run with an adult",
    "• Pick up your runner number at City Hall Square on Dec. 6 or 7 (10 a.m.–7 p.m.). Numbers will NOT be given out on race day.",
    "• Roads near City Hall will be closed from 4 a.m. to 1 p.m. Please take the MRT."
  ],[["runner number","號碼布"],["time limit","時間限制"],["race day","比賽當天"]],[
    Q("r04a","When does the half marathon runner have to finish by?",["9:00 a.m.","8:30 a.m.","11:30 a.m.","1:00 p.m."],0,"6 點起跑，限時 3 小時。","6:00 + 3 小時 = 9:00。"),
    Q("r04b","What should runners do on December 6 or 7?",["Get their runner numbers.","Run the fun run.","Pay for the MRT.","Close the roads."],0,"第一個 •。","Pick up your runner number on Dec. 6 or 7。"),
    Q("r04c","Mr. Lin wants to join a race with his 8-year-old daughter. Which is TRUE?",["They can do the 5-km run together.","The girl can run the half marathon alone.","They must finish the fun run in one hour.","They can get their numbers on race day."],0,"Fun Run 那一行。","Fun Run 沒有時間限制，12 歲以下要有大人陪跑。")
  ]),
  G("r05","r3","article","The Man Who Returned the Money",[
    "Last month, a taxi driver in Tainan found a bag in the back seat of his car. Inside were a laptop, a passport, and NT$200,000 in cash. The driver, Mr. Huang, remembered dropping off a foreign woman at the train station an hour earlier.",
    "Instead of keeping the money, Mr. Huang drove straight to the police station. The police found the woman's hotel information in the bag and called her. She was a businesswoman from Germany who was on her way to Taipei for an important meeting. She had not even noticed that the bag was missing.",
    "To thank Mr. Huang, the woman offered him NT$20,000, but he refused to take it. \"It's what anyone should do,\" he said. The woman later wrote a letter to a local newspaper, saying that Mr. Huang had made her love Taiwan even more."
  ],[["laptop","筆電"],["passport","護照"],["cash","現金"],["drop off","讓…下車"],["businesswoman","女企業家"],["refuse","拒絕"]],[
    Q("r05a","What did Mr. Huang do after finding the bag?",["He took it to the police.","He drove to the train station.","He opened the laptop.","He called the woman's company."],0,"第二段第一句。","drove straight to the police station。"),
    Q("r05b","Why didn't the woman call the police herself?",["She didn't know she had lost the bag.","She didn't speak Chinese.","She was in a meeting in Tainan.","Her phone was in the bag."],0,"第二段最後一句。","She had not even noticed that the bag was missing。"),
    Q("r05c","Which word best describes Mr. Huang?",["Honest","Careless","Greedy","Shy"],0,"還錢、也不收謝禮。","拾金不昧 → honest（誠實的）。greedy 貪心的。")
  ]),
  G("r06","r3","notice","Instructions: Coffee Maker CM-200",[
    "1. Fill the water tank to the MAX line. Use cold water only.",
    "2. Put a paper filter into the basket and add coffee — one spoon for each cup.",
    "3. Press the POWER button. The red light will turn on.",
    "4. When the light turns green (about 5 minutes), your coffee is ready.",
    "Important: Do NOT open the top while the red light is on — hot water may come out. Clean the machine with white vinegar once a month. The machine turns off by itself after 40 minutes."
  ],[["tank","水箱"],["filter","濾紙"],["basket","濾杯"],["vinegar","醋"]],[
    Q("r06a","Where can you most likely find these instructions?",["In a box with a new machine.","In a cooking magazine.","On a coffee shop menu.","In a science textbook."],0,"這是什麼樣的文字？","機器的使用說明書，通常放在新機器的盒子裡。"),
    Q("r06b","How do you know the coffee is ready?",["The light turns green.","The red light turns on.","The machine turns off.","The water reaches the MAX line."],0,"第 4 點。","When the light turns green ... ready。"),
    Q("r06c","Why should you NOT open the top when the red light is on?",["You might get hurt by hot water.","The coffee will taste bad.","The machine will turn off.","The filter will fall out."],0,"Important 那一段。","hot water may come out → 會被燙傷。")
  ]),
  G("r07","r3","article","A Letter to the Editor",[
    "【Article】 City to Build New Parking Lot in Riverside Park — The city government plans to turn part of Riverside Park into a 300-space parking lot. Officials say the area around the park has too few parking spaces, and drivers often park illegally on narrow streets. Work will begin in October.",
    "【Letter】 Dear Editor, I was upset to read about the plan for Riverside Park. I walk my dog there every day, and the park is one of the few green spaces left in our neighborhood. More parking will only bring more cars and more air pollution. Instead, the city should run more buses and build bike lanes. — Grace Liu, Riverside resident"
  ],[["parking lot","停車場"],["official","官員"],["illegally","違法地"],["narrow","狹窄的"],["green space","綠地"],["bike lane","自行車道"]],[
    Q("r07a","Why does the city want to build the parking lot?",["There aren't enough parking spaces in the area.","The park is too dirty.","More people are walking dogs there.","Buses are too expensive."],0,"Article。","the area has too few parking spaces。"),
    Q("r07b","How does Grace feel about the plan?",["She is against it.","She thinks it is a great idea.","She doesn't care about it.","She wants it to start sooner."],0,"I was upset ...","她不贊成：會帶來更多車和空汙。"),
    Q("r07c","What does Grace suggest the city do?",["Offer more public transportation.","Build the parking lot somewhere else in the park.","Make the parking lot bigger.","Stop people from walking dogs."],0,"Letter 最後一句。","run more buses and build bike lanes → 更多大眾運輸。")
  ]),
  G("r08","r3","article","The History of Bubble Tea",[
    "Bubble tea is now popular all over the world, but it was first made in Taiwan in the 1980s. There are different stories about who invented it. One tea shop in Taichung says one of its workers poured tapioca balls into her iced milk tea during a meeting, just for fun. Everyone loved it, and the shop soon added it to the menu.",
    "In the 1990s, bubble tea spread to Hong Kong, Japan, and Southeast Asia. Later, Taiwanese people who moved abroad opened shops in the United States and Europe. Today, you can find bubble tea in more than seventy countries.",
    "Although bubble tea is delicious, a large cup can contain as much sugar as two cans of soda. Nutrition experts suggest choosing \"half sugar\" or \"no sugar\" and enjoying it only once in a while."
  ],[["tapioca ball","粉圓"],["invent","發明"],["spread","傳播"],["abroad","在國外"],["contain","含有"],["nutrition","營養"],["once in a while","偶爾"]],[
    Q("r08a","According to the story from the Taichung shop, how was bubble tea invented?",["A worker added tapioca balls to her drink for fun.","A scientist made it in a lab.","A customer asked for it.","It came from Japan."],0,"第一段。","worker poured tapioca balls into her milk tea just for fun。"),
    Q("r08b","What does the second paragraph mainly talk about?",["How bubble tea became popular around the world.","How to make bubble tea at home.","Why bubble tea is unhealthy.","Who owns the most bubble tea shops."],0,"第二段的主題。","講珍奶如何傳到世界各地。"),
    Q("r08c","What do nutrition experts advise?",["Drink bubble tea with less sugar and not too often.","Never drink bubble tea.","Drink soda instead of bubble tea.","Drink a large cup every day."],0,"最後一段。","choose half sugar / no sugar, only once in a while。")
  ]),
  G("r09","r3","notice","Job Opening: Part-Time Tour Guide",[
    "Happy Trails Travel is looking for part-time English-speaking tour guides for weekend city tours.",
    "Requirements: • 20 years old or above • Good English (GEPT Intermediate or above) • Friendly and able to work with groups of up to 25 people • Experience is a plus but not necessary",
    "Pay: NT$1,500 per tour (about 5 hours), plus tips. Free training in August.",
    "To apply, send your résumé and a short self-introduction video (in English, under 2 minutes) to jobs@happytrails.com by July 31."
  ],[["requirement","條件"],["plus","加分"],["tip","小費"],["apply","應徵"],["self-introduction","自我介紹"]],[
    Q("r09a","Which person can apply for this job?",["A 22-year-old who passed GEPT Intermediate but has never been a guide.","A 17-year-old high school student with good English.","A 30-year-old who can only work on weekdays.","A guide who doesn't speak English."],0,"看條件。","20 歲以上、中級以上，經驗不是必要。"),
    Q("r09b","What do applicants need to send?",["A résumé and a video.","A photo and a letter.","Their GEPT certificate only.","NT$1,500."],0,"最後一段。","résumé and a short self-introduction video。"),
    Q("r09c","What can we learn about the job?",["Guides may earn more than NT$1,500 per tour.","The training costs NT$1,500.","Tours last about 25 hours.","Guides work every day."],0,"Pay 那一行。","plus tips → 加上小費可能多於 1,500。")
  ]),
  G("r10","r3","article","An Email to a Pen Pal",[
    "Hi Daniel,",
    "Thanks for your last email and the photos of the snow in Toronto! It never snows where I live, so I was really jealous. Here in Kaohsiung, it's still 28 degrees in November.",
    "You asked me about the Mid-Autumn Festival. It's one of the most important holidays in Taiwan. Families get together, eat mooncakes and pomelos, and look at the full moon. In recent years, having a barbecue has become very popular, too. Almost every street smells of grilled meat that night!",
    "My family is planning a trip to Canada next winter. Could you tell me what clothes I should bring? And are there any places you think we shouldn't miss?",
    "Talk soon,",
    "Wei-ting"
  ],[["jealous","羨慕的"],["mooncake","月餅"],["pomelo","柚子"],["grilled","烤的"]],[
    Q("r10a","Why was Wei-ting jealous?",["Daniel could see snow.","Daniel went to a barbecue.","Daniel visited Kaohsiung.","Daniel got many mooncakes."],0,"第一段。","It never snows where I live → 羨慕看得到雪。"),
    Q("r10b","Which is NOT mentioned as a Mid-Autumn Festival activity?",["Setting off fireworks","Eating pomelos","Having a barbecue","Looking at the moon"],0,"NOT 題：逐一刪去。","文中提到吃月餅、柚子、賞月、烤肉，沒有放煙火。"),
    Q("r10c","What does Wei-ting want Daniel to do?",["Give advice for a trip.","Send more photos of snow.","Visit Taiwan next year.","Explain the Mid-Autumn Festival."],0,"倒數第二段。","問要帶什麼衣服、推薦哪些地方 → 請他給旅遊建議。")
  ]),
  G("r11","r3","notice","Kids' Summer Science Camp",[
    "For ages 9–12 | July 7–18 (Mon.–Fri.) | 9:00 a.m.–4:00 p.m.",
    "Week 1: Robots & Coding | Week 2: Space & Rockets",
    "Fee: NT$6,000 per week / NT$11,000 for both weeks. Lunch and all materials included.",
    "Early bird: Sign up before May 31 and save NT$500 per week.",
    "Brothers and sisters: the second child gets 10% off.",
    "Note: Parents must pick up their children by 4:15 p.m. A late fee of NT$200 will be charged every 15 minutes."
  ],[["coding","寫程式"],["material","材料"],["early bird","早鳥"],["charge","收費"]],[
    Q("r11a","What will campers learn in the second week?",["About space and rockets.","How to cook lunch.","Robots and coding.","How to swim."],0,"Week 2。","Space & Rockets。"),
    Q("r11b","Mrs. Wang signs up her son for only Week 1 on May 20. How much does she pay?",["NT$5,500","NT$6,000","NT$11,000","NT$5,400"],0,"一週 6,000，早鳥每週省 500。","6,000 − 500 = 5,500。"),
    Q("r11c","What happens if a parent arrives at 4:40 p.m.?",["The parent has to pay a late fee.","The child has to stay overnight.","The camp will call the police.","The parent gets a 10% discount."],0,"Note。","超過 4:15 → 要付逾時費。")
  ]),
  G("r12","r3","article","Robots in the Kitchen",[
    "In a small restaurant in Taipei, the noodles are not cooked by a chef but by a robot arm. Customers order on a tablet, and the robot boils the noodles, adds the soup, and puts the bowl on a moving belt. A bowl is ready in about ninety seconds.",
    "The owner, Mr. Chang, says the robot saves him money because it doesn't need breaks and never gets sick. \"It's hard to find young people who want to work in a hot kitchen,\" he explains. However, two human workers are still needed to clean the machine, prepare ingredients, and help older customers who are not used to tablets.",
    "Not everyone is happy about robot cooks. Some customers say the food tastes the same as before, but the restaurant feels less friendly. Mr. Chang plans to keep the robot but add a small counter where customers can chat with a real person."
  ],[["chef","廚師"],["robot arm","機械手臂"],["tablet","平板"],["belt","輸送帶"],["ingredient","食材"],["counter","櫃檯"]],[
    Q("r12a","Why did Mr. Chang start using a robot?",["It is hard to find kitchen workers.","Customers asked for it.","The robot cooks better than people.","He wanted to close the restaurant."],0,"第二段。","It's hard to find young people who want to work in a hot kitchen。"),
    Q("r12b","What do the human workers still do?",["Help customers who have trouble using tablets.","Boil the noodles.","Put bowls on the belt.","Repair the robot every hour."],0,"第二段。","help older customers who are not used to tablets。"),
    Q("r12c","What is the complaint from some customers?",["The restaurant doesn't feel as warm as before.","The noodles taste worse.","The food takes too long.","The prices are too high."],0,"第三段。","the restaurant feels less friendly。")
  ]),
  G("r13","r3","notice","Weekend Weather — Northern Taiwan",[
    "Saturday: Cloudy in the morning, showers in the afternoon. 19°C–24°C. Chance of rain: 70%",
    "Sunday: A cold front arrives. Rain all day, strong winds near the coast. 14°C–18°C. Chance of rain: 90%",
    "Monday: Clear and cool. 13°C–20°C. Chance of rain: 10%",
    "Advice: Mountain roads may be slippery on Sunday. Hikers are advised to change their plans. Wear warm clothes on Monday morning — it will be the coldest morning this autumn so far."
  ],[["shower","陣雨"],["cold front","冷鋒"],["coast","海岸"],["slippery","滑的"]],[
    Q("r13a","Which day is the best for a picnic?",["Monday","Saturday afternoon","Sunday","Saturday and Sunday"],0,"降雨機率最低。","星期一晴朗、降雨機率 10%。"),
    Q("r13b","Why are hikers advised to change their plans?",["The roads will be wet and dangerous on Sunday.","It will be too hot to hike.","The mountains will be closed on Monday.","There will be heavy snow."],0,"Advice。","Mountain roads may be slippery on Sunday。"),
    Q("r13c","What can we infer from the report?",["It has not been colder than 13°C in the mornings this autumn.","It will snow on Monday.","Saturday will be colder than Sunday.","There will be no wind on Sunday."],0,"the coldest morning this autumn so far。","星期一早上 13°C 是今年秋天目前最冷 → 之前的早晨都高於 13°C。")
  ]),
  G("r14","r3","article","Two Reviews of Lakeside Hotel",[
    "【Review 1 — ★★★★★ by Linda】 We stayed for three nights with our two kids. The room was huge and the view of the lake was amazing. The staff gave the children free ice cream every afternoon! The only problem was that the Wi-Fi was slow in our room, but we were on vacation, so we didn't mind.",
    "【Review 2 — ★★☆☆☆ by Mark】 I came here for a business trip and needed to work in my room. The Wi-Fi kept going off, and I missed an online meeting. The front desk said only the lobby has strong Wi-Fi. The breakfast was good, but the price of NT$4,800 a night is too high for a hotel with such a basic problem."
  ],[["review","評論"],["staff","員工"],["business trip","出差"],["lobby","大廳"],["basic","基本的"]],[
    Q("r14a","What did both reviewers say about the hotel?",["The Wi-Fi in the rooms was not good.","The breakfast was bad.","The room was too small.","The staff were rude."],0,"兩篇都提到什麼？","Linda 說 Wi-Fi 慢，Mark 說 Wi-Fi 一直斷。"),
    Q("r14b","Why was Linda not bothered by the problem?",["She was on vacation, not working.","She used the Wi-Fi in the lobby.","The hotel gave her ice cream.","She didn't bring a phone."],0,"Review 1 最後一句。","we were on vacation, so we didn't mind。"),
    Q("r14c","Which kind of traveler would probably be most unhappy at this hotel?",["Someone who needs to work online in the room.","A family with young children.","Someone who loves lake views.","A tourist who wants a big room."],0,"推論題。","房間網路差，最不適合要在房間線上工作的人。")
  ]),
  G("r15","r3","article","Learning a Language with Games",[
    "Ten years ago, few people believed that playing games on a phone could help them learn a new language. Today, language-learning apps are used by more than 500 million people. Most of these apps turn learning into a game: users get points for correct answers, win badges, and keep \"streaks\" by studying every day.",
    "Research shows that these apps are good for building vocabulary and keeping learners motivated. However, they are less useful for speaking. \"You can't learn to have a real conversation by tapping on a screen,\" says Professor Ellen Moore, a language teacher. She suggests that learners use apps for ten to fifteen minutes a day and also find chances to talk with real people, such as joining a language exchange.",
    "Some app makers are now adding AI conversation partners to solve this problem. Whether these will work as well as real people is still unknown."
  ],[["app","應用程式"],["badge","徽章"],["streak","連續紀錄"],["motivated","有動力的"],["tap","點擊"],["language exchange","語言交換"]],[
    Q("r15a","According to research, what are language apps good at?",["Helping people learn new words.","Teaching real conversation.","Replacing teachers.","Improving handwriting."],0,"第二段第一句。","good for building vocabulary。"),
    Q("r15b","What does Professor Moore suggest?",["Using apps a little each day and also talking with people.","Using apps for several hours a day.","Stopping using apps completely.","Only learning with AI partners."],0,"第二段後半。","10～15 分鐘＋找機會和真人說話。"),
    Q("r15c","What is the writer's attitude toward AI conversation partners?",["Unsure whether they will really work.","Sure they are better than people.","Angry about them.","Not interested at all."],0,"最後一句。","is still unknown → 作者持保留、不確定的態度。")
  ]),
  G("r16","r3","notice","Train Timetable & Notice",[
    "Express trains from Taipei to Hualien",
    "Train 402 — leaves 07:10, arrives 09:25 — NT$440",
    "Train 408 — leaves 08:30, arrives 10:35 — NT$440",
    "Train 412 — leaves 10:05, arrives 12:40 — NT$440",
    "Train 416 — leaves 12:20, arrives 14:30 — NT$440",
    "NOTICE: Because of repair work, Train 408 is canceled on Oct. 12 and 13. Passengers with tickets may change to another train on the same day for free."
  ],[["express train","自強號；特快車"],["passenger","乘客"]],[
    Q("r16a","Which train takes the longest?",["Train 412","Train 402","Train 408","Train 416"],0,"算每班的行車時間。","412：10:05 → 12:40 = 2 小時 35 分，最久。"),
    Q("r16b","Amy has a ticket for Train 408 on October 12. What can she do?",["Take Train 412 that day without paying more.","Get on Train 408 as usual.","Take a train the next day for free.","Get her money back only."],0,"NOTICE。","408 停駛，可免費改搭同一天的其他班次。"),
    Q("r16c","Ben must be in Hualien by 11:00 a.m. on Oct. 13. Which train should he take?",["Train 402","Train 408","Train 412","Train 416"],0,"408 那兩天停駛。","13 號 408 停駛，11 點前到只剩 402。")
  ]),
  G("r17","r3","article","Why I Stopped Buying Fast Fashion",[
    "Two years ago, I used to buy new clothes almost every week. They were cheap and stylish, so I didn't think twice. One day, while cleaning my closet, I found more than twenty T-shirts I had worn only once or twice. Some still had price tags on them. I felt terrible.",
    "I started reading about the fashion industry and learned that making one cotton T-shirt can use about 2,700 liters of water. Many cheap clothes are also made by workers who are paid very little. I decided to change my habits.",
    "Now I buy only one or two pieces of clothing every season, and I choose items that are well made and easy to match. I also visit secondhand shops and swap clothes with friends. Not only have I saved money, but I also spend much less time deciding what to wear in the morning."
  ],[["stylish","時髦的"],["closet","衣櫃"],["price tag","價格標籤"],["industry","產業"],["liter","公升"],["secondhand","二手的"],["swap","交換"]],[
    Q("r17a","What made the writer decide to change?",["Finding many clothes she had hardly worn.","Losing her job.","A friend's advice.","Moving to a new house."],0,"第一段。","清衣櫃時發現二十多件只穿過一兩次的 T 恤。"),
    Q("r17b","Which is NOT something the writer does now?",["Buys new clothes every week","Visits secondhand shops","Exchanges clothes with friends","Buys clothes that are easy to match"],0,"NOT 題。","每週買新衣是她「以前」的習慣。"),
    Q("r17c","What is one unexpected benefit the writer mentions?",["She gets dressed more quickly.","She has more friends.","Her clothes last longer than ten years.","She uses less water at home."],0,"最後一句。","spend much less time deciding what to wear → 早上更快決定穿什麼。")
  ]),
  G("r18","r3","notice","Dragon Boat Festival Events at Riverside",[
    "Saturday, June 21",
    "9:00–12:00 Dragon Boat Races (Final race at 11:30)",
    "10:00–16:00 Zongzi-making class — NT$150 per person, sign up at the blue tent",
    "13:00–15:00 Egg-standing challenge — free; anyone who keeps an egg standing for one minute wins a prize",
    "Free shuttle buses run every 20 minutes from Central MRT Station, Exit 3.",
    "Please bring your own water bottle. No plastic bottles will be sold at the event."
  ],[["final","決賽"],["zongzi","粽子"],["tent","帳篷"],["challenge","挑戰"],["shuttle bus","接駁車"]],[
    Q("r18a","How can visitors get to the event easily?",["Take a free bus from the MRT station.","Drive and park by the river.","Take a dragon boat.","Walk from City Hall."],0,"倒數第二行。","free shuttle buses from Central MRT Station。"),
    Q("r18b","What do you need to do to win a prize in the afternoon?",["Make an egg stand for one minute.","Make the best zongzi.","Win the final race.","Bring your own water bottle."],0,"13:00 那一行。","keeps an egg standing for one minute wins a prize。"),
    Q("r18c","Why should visitors bring their own bottles?",["Plastic bottles will not be sold there.","Water is free at the blue tent.","The shuttle buses don't allow drinks.","It is a rule of the races."],0,"最後一行。","No plastic bottles will be sold at the event。")
  ]),
  G("r19","r3","article","The Four-Day Work Week",[
    "In 2025, a software company in Taichung tried a four-day work week for six months. Workers worked Monday to Thursday and got the same pay as before. The company wanted to see if people could finish the same amount of work in less time.",
    "The results were surprising. The amount of work finished did not drop; in fact, it rose by about 5%. Workers took fewer sick days, and fewer people left the company. Many said they used their extra day off to exercise, spend time with family, or take classes.",
    "However, the system did not work for every team. The customer service team still needed someone to answer calls on Fridays, so its members had to take turns. The company has decided to continue the four-day week but will let each team plan its own schedule."
  ],[["software","軟體"],["pay","薪水"],["drop","下降"],["sick day","病假"],["customer service","客服"],["take turns","輪流"],["schedule","時間表"]],[
    Q("r19a","What was the purpose of the experiment?",["To see if workers could do the same work in four days.","To pay workers less money.","To hire more workers.","To close the company on Mondays."],0,"第一段最後一句。","see if people could finish the same amount of work in less time。"),
    Q("r19b","Which result is mentioned in the article?",["Workers were sick less often.","Workers earned more money.","The company lost customers.","Workers finished less work."],0,"第二段。","Workers took fewer sick days。"),
    Q("r19c","Why did the customer service team have a problem?",["Customers still called on Fridays.","They didn't want a day off.","They worked too slowly.","Their manager was against the plan."],0,"第三段。","needed someone to answer calls on Fridays。")
  ]),
  G("r20","r3","notice","Lost & Found — Greenwood Senior High",[
    "Items found this week (please come to the Student Affairs Office, Room 105, 7:30 a.m.–5:00 p.m.):",
    "• A black umbrella with a wooden handle — found in the gym, Monday",
    "• A blue water bottle with the name \"Jay\" — found in the library, Tuesday",
    "• A pair of glasses in a brown case — found in Classroom 302, Wednesday",
    "• A student ID card (Class 2-5) — found on the school bus, Thursday",
    "Items not picked up within 30 days will be given to charity. To claim an item, you must describe it or show proof that it is yours."
  ],[["handle","把手"],["case","盒子"],["charity","慈善機構"],["claim","認領"],["proof","證明"]],[
    Q("r20a","Where should students go to get their lost items?",["Room 105","The gym","The library","The school bus"],0,"第一行。","Student Affairs Office, Room 105。"),
    Q("r20b","Which item was found on Wednesday?",["Glasses","An umbrella","A water bottle","An ID card"],0,"看日期。","Wednesday → a pair of glasses。"),
    Q("r20c","What will happen to items that no one picks up for a month?",["They will be given away to help others.","They will be thrown away.","They will be sold to students.","They will be sent to the police."],0,"倒數第二句。","given to charity → 捐給慈善機構。")
  ]),
  G("r21","r3","article","Message Board: Should Students Wear School Uniforms?",[
    "【Post by Jason, 16】 I think uniforms are a good idea. Everyone looks the same, so no one gets laughed at for wearing cheap clothes. It also saves me time every morning because I don't have to choose what to wear.",
    "【Post by Abby, 15】 I disagree. Uniforms are expensive — my parents paid over NT$5,000 for mine — and they aren't comfortable in summer. Students should be able to show who they are through their clothes, as long as they are neat.",
    "【Post by Ms. Tsai, teacher】 Both of you make good points. At our school, students now wear uniforms only on Mondays and for special events. On other days they can wear the school sports clothes or their own clothes. So far, it seems to be working well."
  ],[["uniform","制服"],["laugh at","嘲笑"],["neat","整齊的"],["special event","特別活動"]],[
    Q("r21a","Why does Jason like school uniforms?",["They stop students from being judged by their clothes.","They are cheap.","They are comfortable in summer.","His parents chose them."],0,"Jason 的貼文。","no one gets laughed at for wearing cheap clothes。"),
    Q("r21b","Which of Abby's reasons is about money?",["Uniforms cost a lot.","Uniforms are hot.","Students want to show their style.","Clothes should be neat."],0,"Abby 的貼文。","my parents paid over NT$5,000 → 很貴。"),
    Q("r21c","What does Ms. Tsai's school do?",["Uses a mix of uniforms and other clothes.","Has stopped using uniforms completely.","Makes students wear uniforms every day.","Lets students design their own uniforms."],0,"Ms. Tsai 的貼文。","只有週一和特別活動穿制服，其他天穿運動服或便服 → 混合制。")
  ]),
  G("r22","r3","article","The Secret Life of Ants",[
    "Ants are small, but they live in some of the most organized societies in nature. A single ant colony can have millions of members, and each ant has a job. The queen lays eggs, while worker ants collect food, take care of the young, and protect the nest.",
    "Ants communicate mainly through smell. When a worker ant finds food, it leaves a special chemical trail on its way back to the nest. Other ants follow the smell to the food and add more chemicals, making the trail stronger. When the food is gone, the ants stop leaving the smell, and the trail slowly disappears.",
    "Scientists have even used ideas from ants to solve human problems. For example, some computer programs that plan the shortest routes for delivery trucks are based on the way ants find food."
  ],[["organized","有組織的"],["colony","群體；蟻群"],["queen","蟻后"],["lay eggs","產卵"],["nest","巢"],["communicate","溝通"],["trail","足跡；路徑"],["route","路線"]],[
    Q("r22a","What is the job of the queen ant?",["Laying eggs","Collecting food","Protecting the nest","Making trails"],0,"第一段。","The queen lays eggs。"),
    Q("r22b","Why does a food trail become stronger?",["More ants add chemicals as they follow it.","The queen makes it stronger.","The food gets bigger.","It rains."],0,"第二段。","Other ants ... add more chemicals, making the trail stronger。"),
    Q("r22c","What does the last paragraph show?",["People have learned from the way ants behave.","Ants can drive trucks.","Computers are smarter than ants.","Ants are a problem for delivery companies."],0,"最後一段的重點。","科學家用螞蟻找食物的方式設計規劃最短路線的程式。")
  ])
  ]
});
