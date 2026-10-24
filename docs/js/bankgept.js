/* ===== 全民英檢 初級（閱讀＋寫作，原創模擬題） ===== */
const RW = (id, tag, src, instr, start, ans, hint, exp) => ({ id, type: "rewrite", tag, src, instr, start, ans: [].concat(ans), hint, exp });
const ES = (id, tag, prompt, scenes, keywords, model, hint, exp) => ({ id, type: "essay", tag, prompt, scenes, keywords, model, hint, exp, gept: true });   // gept：段落寫作用 AI 批改（aigrade.js）
BANKS.push({
  id: "gept-e", grade: 10, tagIsType: true,
  title: "全民英檢 初級",
  range: "GEPT Elementary 閱讀＋寫作（不含聽力、口說）",
  added: "2026-10-17",
  note: "依 2021 年起的新題型自編模擬題：閱讀＝詞彙、段落填空、閱讀理解；寫作＝句子改寫、句子合併、重組、段落寫作（約 50 字）",
  exams: [
    { name: "閱讀測驗", tags: ["g1", "g2", "g3"] },
    { name: "寫作測驗", tags: ["g4", "g5", "g6", "g7"] }
  ],
  timeLimits: [[["g1", "g2", "g3"], 35], [["g4", "g5", "g6", "g7"], 40]],
  mock: [["g1", 10], ["g2", 2], ["g3", 4], ["g4", 5], ["g5", 5], ["g6", 5], ["g7", 1]],
  tags: {
    g1: "閱讀一・詞彙",
    g2: "閱讀二・段落填空",
    g3: "閱讀三・閱讀理解",
    g4: "寫作一・句子改寫",
    g5: "寫作一・句子合併",
    g6: "寫作一・重組",
    g7: "寫作二・段落寫作"
  },
  items: [
  /* ---------- 詞彙 ---------- */
  M("v01","g1","My little sister is afraid of the ___. She always sleeps with the light on.",["dark","dirt","desk","door"],0,"開著燈睡覺 → 怕什麼？","be afraid of the dark = 怕黑。"),
  M("v02","g1","Please ___ your shoes before you come into the house.",["take off","put on","turn on","look at"],0,"進屋前要把鞋子…","take off = 脫掉；put on 是穿上。"),
  M("v03","g1","The bus was late, so I ___ the first class.",["missed","lost","forgot","left"],0,"公車遲到，所以第一堂課…","miss = 錯過。"),
  M("v04","g1","Ken: Would you like some more cake?\nAmy: No, thanks. I'm ___.",["full","hungry","empty","busy"],0,"拒絕再吃。","full = 吃飽的。"),
  M("v05","g1","It's too noisy here. Let's find a ___ place to study.",["quiet","loud","crowded","busy"],0,"這裡太吵了。","quiet = 安靜的，和 noisy 相反。"),
  M("v06","g1","Mr. Chen is very ___. He never gets angry with his students.",["patient","careless","lazy","rude"],0,"從不對學生生氣。","patient = 有耐心的。"),
  M("v07","g1","I'd like to ___ this book. When do I have to bring it back?",["borrow","lend","return","sell"],0,"之後要還回去 → 我要「借入」。","borrow = 借入；lend = 借出。"),
  M("v08","g1","The store is closed today. It will ___ again tomorrow morning.",["open","opens","opening","opened"],0,"will 後面接原形。","will + 原形動詞 → open。"),
  M("v09","g1","Lisa ___ to music when her mother came into the room.",["was listening","listens","is listening","has listened"],0,"媽媽進來的那時候「正在」…","過去某一刻正在進行 → 過去進行式。"),
  M("v10","g1","You look tired. You ___ go to bed early tonight.",["should","must not","don't","aren't"],0,"給建議。","should = 應該（建議）。"),
  M("v11","g1","There are ___ students in the library on Sunday mornings. It's very quiet.",["few","little","a little","much"],0,"students 可數；很安靜 → 人很少。","few + 可數複數 = 很少；little 修飾不可數。"),
  M("v12","g1","This is the ___ movie I have ever seen.",["funniest","funnier","funny","more funny"],0,"the + 最高級 + I have ever seen。","the funniest（最好笑的）。"),
  M("v13","g1","Mom: Where is your father?\nKevin: He's in the garage. He is ___ the car.",["washing","washes","washed","wash"],0,"He is + V-ing。","現在進行式 is washing。"),
  M("v14","g1","We ___ in Taichung since 2018.",["have lived","lived","are living","live"],0,"since 2018 → 一直到現在。","since + 時間點 → 現在完成式。"),
  M("v15","g1","I can't find my keys ___. Did you see them?",["anywhere","somewhere","everywhere","nowhere"],0,"否定句的「任何地方」。","not ... anywhere = 哪裡都（找不到）。"),
  M("v16","g1","Remember to bring an umbrella. It ___ rain this afternoon.",["may","must","should not","can't"],0,"不確定，但有可能。","may = 可能。"),
  M("v17","g1","The soup is too hot. Wait a minute ___ you eat it.",["before","after","because","so"],0,"等一下「再」吃。","wait ... before you eat it = 吃之前先等一下。"),
  M("v18","g1","Jenny is good at ___ pictures. She wants to be an artist.",["drawing","draw","draws","to drawing"],0,"be good at + V-ing。","介系詞 at 後面接 V-ing。"),
  M("v19","g1","Our English teacher ___ us to speak English in class.",["asks","says","tells about","talks"],0,"___ + 人 + to V。","ask + 人 + to V = 要求某人做…。"),
  M("v20","g1","Tom: How ___ is it from your home to school?\nIvy: About one kilometer.",["far","long","much","often"],0,"回答是距離。","How far 問距離。"),
  M("v21","g1","My brother broke his leg, so he has to stay in the ___ for a week.",["hospital","library","station","museum"],0,"腿斷了要待在哪裡？","hospital = 醫院。"),
  M("v22","g1","Everyone was ___ when they heard the good news.",["excited","exciting","excite","excitement"],0,"人的感受。","人感到興奮 → excited。"),
  M("v23","g1","I ___ my homework yet. Can I watch TV later?",["haven't finished","didn't finish","don't finish","am not finish"],0,"句尾有 yet。","yet 搭配現在完成式否定。"),
  M("v24","g1","The ___ says that it will be sunny and warm tomorrow.",["weather report","menu","address","receipt"],0,"誰會說明天的天氣？","weather report = 氣象報告。"),
  M("v25","g1","Please turn ___ the TV. The baby is sleeping.",["off","on","up","in"],0,"寶寶在睡覺。","turn off = 關掉。"),
  M("v26","g1","Sam usually ___ his bike to school, but today he took the bus.",["rides","drives","flies","walks"],0,"腳踏車用哪個動詞？","ride a bike = 騎腳踏車。"),
  M("v27","g1","This box is ___ heavy for me to carry.",["too","so","very","enough"],0,"too ... to ...","too + adj. + for 人 + to V = 太…而無法…。"),
  M("v28","g1","Mia, please ___ your little brother while I go to the store, OK?",["take care of","look for","give up","get up"],0,"媽媽出門時要妳做的事。","take care of = 照顧。"),
  M("v29","g1","The shirt is on sale. It's only 200 dollars. It's really ___.",["cheap","expensive","careful","dangerous"],0,"特價、只要 200 元。","cheap = 便宜的。"),
  M("v30","g1","Joe: Thank you for helping me.\nAnn: ___",["You're welcome.","Here you are.","Me, too.","That's too bad."],0,"回應別人的感謝。","You're welcome. = 不客氣。"),

  /* ---------- 段落填空 ---------- */
  G("c01","g2","cloze","A Note to Mom",[
    "Mom,",
    "I'm going to the library with Amy this afternoon. We [[1]] for the math test on Friday. I already [[2]] my room, and I fed the cat. I'll be home [[3]] six o'clock. [[4]]",
    "Love, Lily"
  ],[["note","便條"],["fed (feed)","餵"]],[
    B("c01a",1,["are going to study","studied","have studied","study"],0,"Lily 下午要去做的事（未來）。","今天下午才要去 → are going to study。"),
    B("c01b",2,["cleaned","clean","will clean","cleaning"],0,"already + 過去的動作；後面 fed 也是過去式。","與後面的 fed 對稱 → cleaned。"),
    B("c01c",3,["before","during","since","between"],0,"六點「以前」到家。","before six o'clock = 六點以前。"),
    B("c01d",4,["Please don't worry about me.","I'm cooking dinner now.","Where are you going?","The cat is very hungry."],0,"便條的結尾。","要媽媽別擔心，最適合當結尾。貓已經餵過了，(D) 不合理。")
  ]),
  G("c02","g2","cloze","Sports Day",[
    "Our school's Sports Day was last Friday. The weather was [[1]], so all the races were held outside. My class joined the relay race. I was the last runner, and I was very [[2]]. When I got the stick, we were in third place. I ran as fast as I [[3]]. In the end, we came in first! [[4]]"
  ],[["relay race","大隊接力"],["runner","跑者"],["stick","接力棒"],["come in first","得第一"]],[
    B("c02a",1,["sunny and cool","rainy and windy","cold and snowy","too hot to go out"],0,"所有比賽都在戶外舉行。","能在戶外比賽 → 天氣晴朗涼爽。"),
    B("c02b",2,["nervous","bored","sleepy","angry"],0,"最後一棒的心情。","最後一棒壓力大 → nervous（緊張的）。"),
    B("c02c",3,["could","can","will","should"],0,"as fast as + 主詞 + ___（過去）。","as fast as I could = 盡我所能地快（過去式）。"),
    B("c02d",4,["Everyone in my class jumped and shouted happily.","Nobody came to Sports Day.","We were the slowest team.","I went home early because I was sick."],0,"得了第一之後…","得第一 → 全班開心跳起來大叫。")
  ]),
  G("c03","g2","cloze","LOST DOG",[
    "Our dog, Coco, [[1]] since Sunday evening. She is small and brown, and she has a red collar. She is very friendly, but she is afraid [[2]] loud noises. She was last seen near Green Park. [[3]], please call us at 0912-345-678. We will give a [[4]] to the person who finds her. Thank you!"
  ],[["collar","項圈"],["friendly","友善的"],["noise","噪音"]],[
    B("c03a",1,["has been missing","is missing","was missing","misses"],0,"since Sunday evening → 到現在。","since → 現在完成式 has been missing。"),
    B("c03b",2,["of","at","with","about"],0,"be afraid ___。","be afraid of = 害怕。"),
    B("c03c",3,["If you see her","Because you like dogs","Before she runs away","When you lost her"],0,"請打電話給我們的條件。","如果你看到她，請打電話 → If you see her。"),
    B("c03d",4,["reward","report","reason","record"],0,"給找到狗的人什麼？","reward = 獎賞、酬金。")
  ]),
  G("c04","g2","cloze","A Thank-You Letter",[
    "Dear Grandma,",
    "Thank you for the sweater you sent me. It's my favorite color, and it [[1]] me well. I wore it to school yesterday, and my friends all said it looked great. [[2]] It's getting colder here, so the sweater came at the right time.",
    "I [[3]] you very much. Mom says we will visit you [[4]] the winter vacation. See you soon!",
    "Love,",
    "Kevin"
  ],[["at the right time","來得正是時候"]],[
    B("c04a",1,["fits","makes","takes","gives"],0,"衣服「合身」。","fit = 合身。"),
    B("c04b",2,["Did you make it yourself?","Why did you buy it?","I don't like sweaters.","It was too small for me."],0,"稱讚之後的自然提問。","大家都說好看 → 好奇是不是奶奶自己織的。(D) 和 fits me well 矛盾。"),
    B("c04c",3,["miss","missed","am missing","will miss"],0,"現在很想念。","I miss you = 我想念你（現在簡單式）。"),
    B("c04d",4,["during","for","since","until"],0,"在寒假「期間」。","during the winter vacation = 寒假期間。")
  ]),
  G("c05","g2","cloze","Bubble Tea",[
    "Bubble tea is a popular drink [[1]] Taiwan. It was first made in the 1980s. Now you can [[2]] it in many countries around the world. Bubble tea is sweet and delicious, but it has a lot of sugar. [[3]], drinking too much of it is not good for your health. Doctors say you should drink it only [[4]]."
  ],[["bubble tea","珍珠奶茶"],["popular","受歡迎的"],["health","健康"]],[
    B("c05a",1,["from","of","at","by"],0,"來自台灣。","a drink from Taiwan = 來自台灣的飲料。"),
    B("c05b",2,["find","found","finding","to find"],0,"can + 原形。","can find。"),
    B("c05c",3,["So","However","For example","Because"],0,"糖很多 → 所以…","前句是原因，後句是結果 → So。"),
    B("c05d",4,["once in a while","every day","all the time","for breakfast"],0,"醫生建議少喝。","once in a while = 偶爾。")
  ]),
  G("c06","g2","cloze","The Class Trip",[
    "Next Wednesday, our class is going on a trip to the science museum. We will meet at the school gate at 8:00 a.m. [[1]] The bus will leave at 8:15, so please don't be late.",
    "At the museum, you can see robots and learn [[2]] the stars. Lunch is not included, so please [[3]] your own lunch and water. We will come back to school at about 3:30 p.m. If you have any questions, [[4]] Ms. Wu."
  ],[["gate","大門"],["included","包含在內"]],[
    B("c06a",1,["Please wear your school uniform.","The museum is closed on Wednesday.","We went there last year.","The bus is very old."],0,"集合時間之後的提醒。","出發前的注意事項 → 穿制服。(B) 和整篇矛盾。"),
    B("c06b",2,["about","for","of","to"],0,"learn ___ + 主題。","learn about = 了解、學習關於…。"),
    B("c06c",3,["bring","borrow","sell","forget"],0,"不含午餐，所以要自己…","bring your own lunch = 自備午餐。"),
    B("c06d",4,["please ask","please asks","asking","to ask"],0,"祈使句。","please + 原形動詞 → please ask。")
  ]),

  /* ---------- 閱讀理解 ---------- */
  G("r01","g3","notice","Sunshine Swimming Pool",[
    "Open: Tuesday to Sunday, 6:00 a.m. to 9:00 p.m. (Closed on Mondays)",
    "Tickets: Adults $100 / Students $70 (Please show your student card.) / Children under 6: Free",
    "• Wear a swimming cap in the pool.",
    "• No food or drinks near the pool.",
    "• Children under 10 must swim with an adult."
  ],[["adult","成人"],["swimming cap","泳帽"]],[
    Q("r01a","A father and his 12-year-old son, a student, go swimming. How much do they pay?",["$170","$200","$140","$100"],0,"成人 + 學生。","$100 + $70 = $170。"),
    Q("r01b","Which of the following is TRUE?",["The pool is open on Mondays.","A five-year-old girl doesn't need to pay.","You can eat snacks near the pool.","Students don't need a student card."],1,"逐條對照。","Children under 6: Free → 五歲免費。"),
    Q("r01c","Amy is eight years old. What does she need when she swims?",["An adult to swim with her.","A student card only.","A $100 ticket.","Nothing."],0,"Children under 10 ...","十歲以下要有大人陪同。")
  ]),
  G("r02","g3","notice","Lucky Breakfast Shop",[
    "Sandwiches: Ham $35 / Egg $30 / Chicken $45",
    "Burgers: Beef $55 / Fish $50",
    "Drinks: Black tea $20 (S), $25 (L) / Milk tea $25 (S), $30 (L) / Soy milk $20",
    "★ Set A: Any sandwich + a small black tea — $10 off",
    "★ Open 6:00 to 11:00 a.m. every day"
  ],[["set","套餐"],["$10 off","折 10 元"],["soy milk","豆漿"]],[
    Q("r02a","Ben orders Set A with a chicken sandwich. How much does he pay?",["$55","$65","$75","$45"],0,"雞肉三明治 + 小紅茶 − 10。","45 + 20 − 10 = 55。"),
    Q("r02b","Which of these drinks is the cheapest?",["Soy milk.","A small milk tea.","A large black tea.","A large milk tea."],0,"比較價格。","豆漿 $20 最便宜。"),
    Q("r02c","When can you NOT buy breakfast here?",["At 11:30 a.m.","At 6:30 a.m.","At 10:45 a.m.","At 7:00 a.m. on Sunday."],0,"營業時間。","只營業到 11:00，11:30 已經關門。")
  ]),
  G("r03","g3","notice","Green Hill Summer Camp (July 8–12)",[
    "Mon: Hiking / Tue: Swimming / Wed: Cooking class / Thu: Art and crafts / Fri: Talent show",
    "Time: 9:00 a.m. to 4:00 p.m.",
    "Price: $3,000 (lunch included). Sign up before June 30 and get $500 off."
  ],[["camp","營隊"],["crafts","手工藝"],["talent show","才藝表演"]],[
    Q("r03a","What will campers do on Wednesday?",["Learn to cook.","Go hiking.","Go swimming.","Make art."],0,"Wed 那一欄。","Wed: Cooking class。"),
    Q("r03b","Mia signed up on June 25. How much did she pay?",["$2,500","$3,000","$3,500","$500"],0,"6/30 前報名折 500。","3,000 − 500 = 2,500。"),
    Q("r03c","Which of the following is TRUE?",["The camp is five days long.","Campers need to bring lunch.","The talent show is on Monday.","The camp starts at 4:00 p.m."],0,"7/8 到 7/12。","週一到週五共五天；午餐已包含（B 錯）。")
  ]),
  G("r04","g3","article","An Email from Ivy",[
    "Hi Nina,",
    "How are you? I'm writing to tell you some good news. My family is moving to Taipei next month! My dad got a new job there. Our new apartment is near Daan Park, so it will only take ten minutes to walk to your house.",
    "I'm a little sad because I have to leave my friends here in Tainan. But I'm also excited because we can see each other every weekend. Can you show me around when I get there? I want to visit the zoo and the night markets with you.",
    "Write back soon!",
    "Ivy"
  ],[["move","搬家"],["apartment","公寓"],["show ... around","帶…四處看看"]],[
    Q("r04a","Why is Ivy's family moving?",["Her father got a new job.","Ivy wants to go to a new school.","They want to live near the zoo.","Nina asked them to."],0,"第一段。","My dad got a new job there." ),
    Q("r04b","How does Ivy feel about moving?",["Sad and excited.","Only sad.","Angry.","Bored."],0,"第二段兩種心情。","a little sad ... but also excited。"),
    Q("r04c","Where does Nina probably live?",["In Taipei, near Daan Park.","In Tainan.","Near the zoo in Tainan.","In another country."],0,"走路十分鐘就到 Nina 家。","新家在大安公園附近，走十分鐘到 Nina 家 → Nina 住台北。")
  ]),
  G("r05","g3","article","Taiwan's Black Bears",[
    "The Formosan black bear is the biggest land animal in Taiwan. It has black fur and a white \"V\" on its chest. It lives in the mountains and eats fruit, nuts, and small animals.",
    "Today, there are not many black bears left in Taiwan. People have cut down forests, and some bears are hurt by traps. To protect them, the government made laws, and people who hunt them must pay a lot of money.",
    "If you go hiking in the mountains and see a black bear, don't run. Stay calm, move away slowly, and make some noise so the bear knows you are there."
  ],[["Formosan","台灣的"],["fur","毛皮"],["chest","胸口"],["forest","森林"],["trap","陷阱"],["hunt","打獵"],["calm","冷靜的"]],[
    Q("r05a","What is the reading mainly about?",["Taiwan's black bears and how to protect them.","A famous zoo in Taiwan.","How to go hiking safely.","Animals that eat fruit."],0,"整篇的重點。","介紹台灣黑熊、牠們的困境和保護方式。"),
    Q("r05b","What does a Formosan black bear look like?",["It is black with a white V on its chest.","It is white with a black V.","It is brown and small.","It has a long tail."],0,"第一段。","black fur and a white V on its chest。"),
    Q("r05c","What should you do if you see a black bear?",["Move away slowly.","Run away fast.","Give it some food.","Take a photo near it."],0,"最後一段。","don't run ... move away slowly。")
  ]),
  G("r06","g3","notice","Class 801: Favorite After-School Activities (30 students)",[
    "Playing sports — 12 students",
    "Playing video games — 8 students",
    "Watching TV — 6 students",
    "Reading — 4 students"
  ],[["activity","活動"]],[
    Q("r06a","Which activity is the most popular?",["Playing sports.","Reading.","Watching TV.","Playing video games."],0,"人數最多的。","Playing sports 12 人最多。"),
    Q("r06b","How many students like watching TV?",["6","4","8","12"],0,"找 Watching TV。","Watching TV — 6 students。"),
    Q("r06c","Which of the following is TRUE?",["Video games are less popular than sports.","More students like reading than watching TV.","Half of the class likes reading.","Nobody likes watching TV."],0,"比較人數。","電玩 8 人 < 運動 12 人。")
  ]),
  G("r07","g3","notice","GARAGE SALE",[
    "Saturday, Oct. 21 | 9 a.m. to 2 p.m.",
    "12 Maple Street (next to the post office)",
    "Books $10 each | Toys $20 to $50 | Clothes $30 each | Old bike $500",
    "Everything must go! Cash only. If it rains, the sale will be on Sunday."
  ],[["garage sale","車庫拍賣（舊物拍賣）"],["cash","現金"]],[
    Q("r07a","What can you buy for $10?",["A book.","A toy.","A shirt.","A bike."],0,"價目那一行。","Books $10 each。"),
    Q("r07b","It rains on Saturday. When can people go to the sale?",["On Sunday.","On Saturday afternoon.","Next Saturday.","Never."],0,"最後一行。","If it rains, the sale will be on Sunday." ),
    Q("r07c","Which of the following is NOT true?",["You can pay by credit card.","The sale is near the post office.","The bike costs $500.","The sale ends at 2 p.m."],0,"Cash only。","只收現金，不能刷卡。")
  ]),
  G("r08","g3","article","My First Time Cooking",[
    "Last Sunday was Mother's Day. My sister and I wanted to give Mom a surprise, so we decided to cook dinner for her. We looked up a recipe for tomato and egg soup and fried rice online.",
    "At first, everything went well. But when I was cutting the tomatoes, my sister forgot about the rice in the pan. The kitchen was full of smoke, and the rice turned black! We had to start again.",
    "When Mom came home, dinner wasn't perfect, but she smiled and said it was the best present ever. Next year, I think we will practice before Mother's Day."
  ],[["surprise","驚喜"],["recipe","食譜"],["smoke","煙"],["perfect","完美的"]],[
    Q("r08a","Why did the writer cook dinner?",["To surprise Mom on Mother's Day.","Mom was sick.","It was a school project.","They were very hungry."],0,"第一段。","想在母親節給媽媽驚喜。"),
    Q("r08b","What went wrong?",["The rice got burned.","The tomatoes were bad.","Mom came home early.","They had no eggs."],0,"第二段。","the rice turned black → 飯燒焦了。"),
    Q("r08c","What will the writer probably do next year?",["Practice cooking first.","Buy dinner from a restaurant.","Never cook again.","Ask Mom to cook."],0,"最後一句。","we will practice before Mother's Day。")
  ]),

  /* ---------- 句子改寫 ---------- */
  RW("w01","g4","Tom plays basketball after school.","改成疑問句","Does Tom",["Does Tom play basketball after school?"],"Does + 主詞 + 原形動詞？","第三人稱單數疑問句：Does Tom play...? 動詞 plays 變回原形。"),
  RW("w02","g4","My sister is reading a comic book.","改成否定句","My sister",["My sister is not reading a comic book."],"在 be 動詞後面加 not。","My sister is not (isn't) reading a comic book." ),
  RW("w03","g4","Ann went to the zoo last Sunday.","改成疑問句","Did Ann",["Did Ann go to the zoo last Sunday?"],"Did + 主詞 + 原形動詞？","過去式疑問句用 Did，went 變回原形 go。"),
  RW("w04","g4","The boy broke the window.","改成被動語態","The window",["The window was broken by the boy."],"be + p.p. + by ...","break-broke-broken → The window was broken by the boy." ),
  RW("w05","g4","I have a lot of homework today.","把 today 改成 yesterday","I",["I had {a lot of|lots of} homework yesterday."],"yesterday → 過去式。","have 的過去式是 had。"),
  RW("w06","g4","Mia is taller than Lisa.","用 shorter 改寫，意思不變","Lisa",["Lisa is shorter than Mia."],"主詞換成 Lisa。","Mia 比 Lisa 高 = Lisa 比 Mia 矮。"),
  RW("w07","g4","They will visit their grandparents this weekend.","用 be going to 改寫","They",["They are going to visit their grandparents this weekend."],"be going to + 原形。","will visit = are going to visit。"),
  RW("w08","g4","Kevin can swim very fast.","針對 very fast 提問","How",["How fast can Kevin swim?"],"How + 形容詞／副詞 + 助動詞 + 主詞 + 動詞？","問速度：How fast can Kevin swim?"),
  RW("w09","g4","There are three apples in the box.","針對 three 提問","How many",["How many apples are there in the box?"],"How many + 複數名詞 + are there ...?","How many apples are there in the box?"),
  RW("w10","g4","Please close the door.","改成否定祈使句","Please",["Please don't close the door.","Please do not close the door."],"Please + don't + 原形。","否定祈使句：Please don't close the door." ),
  RW("w11","g4","We have lived here for five years.","針對 for five years 提問","How long",["How long have you lived here?"],"How long + have + 主詞 + p.p.？","問多久 → How long have you lived here?（We 問句中變 you）"),
  RW("w12","g4","Jenny bought a new dress yesterday.","針對 a new dress 提問","What",["What did Jenny buy yesterday?"],"What + did + 主詞 + 原形？","What did Jenny buy yesterday?（bought 變回 buy）"),
  RW("w13","g4","It is fun to learn English.","改成以 Learning 開頭","Learning",["Learning English is fun."],"動名詞當主詞。","Learning English is fun." ),
  RW("w14","g4","My father washes the car every Sunday.","把 every Sunday 改成 last Sunday","My father",["My father washed the car last Sunday."],"last Sunday → 過去式。","washes → washed。"),
  RW("w15","g4","The movie was very interesting.","改成以 What 開頭的感嘆句","What",["What an interesting movie it was!"],"What + a/an + 形容詞 + 名詞 + 主詞 + 動詞！","What an interesting movie it was!（interesting 母音開頭用 an）"),

  /* ---------- 句子合併 ---------- */
  RW("m01","g5",["Ben is hungry.","Ben wants to eat some noodles."],"用 and 合併成一句","Ben",["Ben is hungry and wants to eat some noodles.","Ben is hungry{,|} and he wants to eat some noodles."],"同一個主詞可以省略。","Ben is hungry and wants to eat some noodles." ),
  RW("m02","g5",["It was raining.","We stayed at home."],"用 so 合併成一句","It was raining",["It was raining{,|} so we stayed {at home|home}."],"原因 + so + 結果。","It was raining, so we stayed at home." ),
  RW("m03","g5",["I like cats.","My brother likes cats, too."],"用 Both ... and ... 合併","Both",["Both my brother and I like cats.","Both I and my brother like cats."],"Both A and B + 複數動詞。","Both my brother and I like cats.（動詞用 like）"),
  RW("m04","g5",["I have a friend.","She can speak Japanese."],"用 who 合併","I have a friend",["I have a friend {who|that} can speak Japanese."],"人 + who + 動詞。","I have a friend who can speak Japanese." ),
  RW("m05","g5",["Tom was tired.","Tom finished his homework."],"用 Although 合併","Although",["Although Tom was tired, he finished his homework.","Although he was tired, Tom finished his homework.","Although Tom was tired{,|} Tom finished his homework."],"Although + 子句, 主要子句（不要再加 but）。","Although Tom was tired, he finished his homework." ),
  RW("m06","g5",["I got home.","My mom was cooking dinner."],"用 When 合併","When",["When I got home, my {mom|mother} was cooking dinner."],"When + 過去式, 過去進行式。","When I got home, my mom was cooking dinner." ),
  RW("m07","g5",["Do you know?","Where does Amy live?"],"合併成一句（間接問句）","Do you know",["Do you know where Amy lives?"],"疑問詞 + 主詞 + 動詞。","Do you know where Amy lives?（does 拿掉，live 加 s）"),
  RW("m08","g5",["This is the bike.","My father bought it for me."],"用 that 合併","This is the bike",["This is the bike {that |which |}my father bought for me."],"that 代替 it。","This is the bike that my father bought for me.（it 要刪掉）"),
  RW("m09","g5",["Ken is 160 cm tall.","Joe is 160 cm tall, too."],"用 as ... as 合併","Ken",["Ken is as tall as Joe."],"一樣高 → as + 原級 + as。","Ken is as tall as Joe." ),
  RW("m10","g5",["You should wear a jacket.","It is cold outside."],"用 because 合併","You should wear a jacket",["You should wear a jacket because it is cold outside."],"結果 + because + 原因。","You should wear a jacket because it is cold outside." ),
  RW("m11","g5",["Brush your teeth.","Then go to bed."],"用 before 合併","Brush your teeth",["Brush your teeth before you go to bed.","Brush your teeth before going to bed."],"before + 子句 或 V-ing。","Brush your teeth before you go to bed." ),
  RW("m12","g5",["The box is very heavy.","I can't carry it."],"用 so ... that ... 合併","The box is so heavy",["The box is so heavy that I {cannot|can not} carry it."],"so + adj. + that + 子句。","The box is so heavy that I can't carry it." ),

  /* ---------- 重組 ---------- */
  R("o01","g6","",["Peter","goes to school","by bus","every day."],"主詞 + 動詞 + 方式 + 時間。","Peter goes to school by bus every day." ),
  R("o02","g6","",["How long","does it take","to get","to the airport?"],"How long does it take to ...?","How long does it take to get to the airport?"),
  R("o03","g6","",["Could you","tell me","where","the bookstore","is?"],"間接問句：where + 主詞 + 動詞。","Could you tell me where the bookstore is?"),
  R("o04","g6","",["My mother","made","a cake","for","my birthday."],"make + 物 + for ...","My mother made a cake for my birthday." ),
  R("o05","g6","",["I","have never","been","to","Japan."],"have never been to ...","I have never been to Japan." ),
  R("o06","g6","",["The girl","who","is singing","is","my sister."],"人 + who + 子句 + 主要動詞。","The girl who is singing is my sister." ),
  R("o07","g6","",["It","is","too cold","to go","swimming today."],"too + adj. + to V。","It is too cold to go swimming today." ),
  R("o08","g6","",["What","were you doing","when","the phone rang?"],"What + 過去進行式 + when ...?","What were you doing when the phone rang?"),
  R("o09","g6","",["She","is","the tallest","girl","in her class."],"the + 最高級 + 名詞 + in ...","She is the tallest girl in her class." ),
  R("o10","g6","",["Don't forget","to turn off","the lights","before you leave."],"Don't forget + to V。","Don't forget to turn off the lights before you leave." ),
  R("o11","g6","",["My brother","enjoys","playing","video games."],"enjoy + V-ing。","My brother enjoys playing video games." ),
  R("o12","g6","",["This book","was written","by","a famous writer."],"被動語態。","This book was written by a famous writer." ),

  /* ---------- 段落寫作 ---------- */
  ES("e01","g7","請根據下面三格提示，寫一篇約 50 字的短文，描述 Ben 發生了什麼事。",
    ["7:30 a.m. — Ben wakes up late. His alarm clock didn't ring.","He runs to the bus stop without eating breakfast.","He gets to school, but the gate is closed. Today is Saturday!"],
    ["woke up","alarm clock","in a hurry","bus stop","Saturday"],
    "Last Saturday morning, Ben woke up at 7:30. His alarm clock didn't ring, so he was very worried. He got dressed quickly and ran to the bus stop without eating breakfast. When he got to school, the gate was closed and nobody was there. Then he remembered that it was Saturday! He laughed and went home.",
    "照 1→2→3 的順序寫，故事發生在過去，用過去式。","重點：用過去式（woke, ran, got）、照圖的順序寫、用 so / when / then 把句子連起來。"),
  ES("e02","g7","請根據下面三格提示，寫一篇約 50 字的短文，描述 Amy 一家人怎麼過農曆新年。",
    ["The day before Lunar New Year, Amy and her family clean the house.","On New Year's Eve, they eat a big dinner together at Grandma's house.","After dinner, Grandma gives Amy a red envelope, and they watch fireworks."],
    ["clean the house","New Year's Eve","red envelope","fireworks"],
    "The day before Lunar New Year, Amy and her family cleaned the house together. On New Year's Eve, they went to Grandma's house and ate a big dinner. After dinner, Grandma gave Amy a red envelope, and Amy said, \"Thank you!\" Then they went outside and watched beautiful fireworks. Amy had a wonderful New Year.",
    "照 1→2→3 的順序寫；已經發生的事用過去式。","重點：用過去式（cleaned, ate, gave, watched）、照圖的順序寫，用 On New Year's Eve / After dinner / Then 交代時間。"),
  ES("e03","g7","請根據下面三格提示，寫一篇約 50 字的短文。",
    ["Amy sees an old woman carrying two heavy bags on the street.","Amy helps her carry the bags across the street.","The woman gives Amy an apple and says thank you."],
    ["heavy","help","across the street","thank"],
    "Yesterday afternoon, Amy was walking home from school. She saw an old woman carrying two heavy bags on the street. The woman looked very tired, so Amy went to help her. She carried the bags and walked across the street with her. The woman was very happy. She gave Amy an apple and said, \"Thank you, kind girl!\"",
    "寫出誰、在哪裡、發生什麼事、結果如何。","重點：過去式敘述、用 so 說明 Amy 為什麼幫忙、結尾可以用引號寫出對話。"),
  ES("e04","g7","請根據下面三格提示，寫一篇約 50 字的短文，描述 Tom 上個週末做了哪些事。",
    ["Saturday morning: Tom helps his dad wash the car.","Saturday afternoon: Tom and his friend read books at the library.","Sunday evening: Tom cooks noodles for his family."],
    ["wash the car","library","cook","noodles"],
    "Last weekend, Tom was very busy. On Saturday morning, he helped his dad wash the car. In the afternoon, he went to the library with his friend, and they read some comic books there. On Sunday evening, Tom cooked noodles for his family. Everyone said the noodles were delicious, so Tom was very happy.",
    "三格圖各寫一到兩句，用過去式。","重點：上個週末＝過去式（helped, went, cooked）；用 On Saturday morning / In the afternoon / On Sunday evening 交代時間順序。")
  ]
});

/* 看圖寫作的插圖（docs/img/ 裡的檔案；找不到圖片時網站會自動隱藏） */
const GEPT_IMAGES = { e01: "img/gept-e01.png", e02: "img/gept-e02.png", e03: "img/gept-e03.png", e04: "img/gept-e04.png" };
bank("gept-e").items.forEach(it => { if (GEPT_IMAGES[it.id]) it.img = GEPT_IMAGES[it.id]; });
