/* ===== 八下（國二下）全冊 ===== */
BANKS.push({
  id: "hl8b-all", grade: 8.2,
  title: "八下 全冊",
  range: "翰林版 Unit 1 ~ Unit 6（國二下）",
  added: "2026-10-17",
  note: "比較級、最高級、as…as、副詞比較、反身代名詞、感官／使役動詞、must / should / if、all of / most of、附加問句、although",
  exams: [
    { name: "第一次段考", tags: ["b1", "b2"] },
    { name: "第二次段考", tags: ["b3", "b4"] },
    { name: "第三次段考", tags: ["b5", "b6"] }
  ],
  tags: {
    b1: "U1 連綴動詞・比較級",
    b2: "U2 最高級・as…as",
    b3: "U3 副詞比較・反身代名詞",
    b4: "U4 感官／使役動詞・must / should・if",
    b5: "U5 all of / most of / each・健康",
    b6: "U6 附加問句・although / though"
  },
  items: [
  /* U1 */
  M("ba1","b1","The steak looks ___.",["yummy","yummily","to be yum","like yummy"],0,"look + 形容詞。","連綴動詞 look + 形容詞 → yummy。"),
  M("ba2","b1","My brother is ___ than me.",["tall","taller","more tall","tallest"],1,"有 than → 比較級。","單音節形容詞加 er → taller。"),
  M("ba3","b1","This book is ___ than that one.",["interesting","more interesting","interestinger","most interesting"],1,"長的形容詞怎麼比較？","多音節形容詞用 more + 原級。"),
  M("ba4","b1","Lab-grown meat may be ___ for the earth than normal meat.",["better","good","best","more good"],0,"good 的比較級。","good → better → best。"),
  M("ba5","b1","Turkish ice cream feels ___ and soft.",["chewy","chewily","chew","to chew"],0,"feel + 形容詞。","feel + 形容詞 → chewy（有嚼勁的）。"),
  M("ba6","b1","Which is ___, the sun or the moon?",["big","bigger","biggest","more big"],1,"兩者比較。","兩者比較用比較級；big 重複 g 加 er → bigger。"),
  M("ba7","b1","The kebab smells ___. I want to try some.",["great","greatly","well","nicely"],0,"smell + 形容詞。","smell + 形容詞 great。"),
  SP("bs1","b1","The steak tastes ___. Can I have more?","yummy","好吃的","yummy（好吃的）。"),
  SP("bs2","b1","This box is ___ than that one. I can't carry it.","heavier","比較重的","heavy → heavier（y 改 ier）。"),
  SP("bs3","b1","Turkey is a country between Europe and ___.","Asia","亞洲","Asia（亞洲）。"),
  T("bt1","b1","這碗湯聞起來比那碗好。",["This {soup|bowl of soup} smells better than that {one|bowl}."],"smell + 比較級 + than。","This soup smells better than that one." ),
  R("br1","b1","我的手機比你的新。",["My phone","is","newer","than","yours."],"比較級 + than。","My phone is newer than yours." ),
  E("be1","b1","My bag is heavyer than yours.","heavyer","heavier","y 結尾的形容詞比較級。","子音 + y 結尾：y 改 i 加 er → heavier。"),
  /* U2 */
  M("bb1","b2","Red fire ants are the ___ ants in Taiwan.",["most dangerous","more dangerous","dangerousest","dangerous"],0,"the + 最高級。","多音節：the most + 原級。"),
  M("bb2","b2","Mount Jade is the ___ mountain in Taiwan.",["higher","highest","most high","high"],1,"台灣「最高」的山。","the highest（最高的）。"),
  M("bb3","b2","Lily is as ___ as her mother.",["tall","taller","tallest","more tall"],0,"as + 原級 + as。","as...as 中間放原級。"),
  M("bb4","b2","This is the ___ day of my life.",["bad","worse","worst","most bad"],2,"bad 的最高級。","bad → worse → worst。"),
  M("bb5","b2","Ken runs the fastest ___ all the students in his class.",["of","than","in","as"],0,"在「一群人之中」。","最高級 + of + 複數名詞（of all the students）。"),
  M("bb6","b2","My dog isn't as big ___ yours.",["as","than","so","like"],0,"as...as 的否定。","not as + 原級 + as。"),
  M("bb7","b2","Ray: Which is the ___ season in Taiwan?\nIvy: Summer.",["hot","hotter","hottest","most hot"],2,"四季中「最」熱。","hot → hottest（重複 t）。"),
  SP("bs4","b2","If an ant ___ you, wash the place with cold water.","bites","咬（第三人稱單數）","bite → bites。"),
  SP("bs5","b2","Stay away from the bees. They can be ___.","dangerous","危險的","dangerous（危險的）。"),
  SP("bs6","b2","Wear long pants when you go ___ in the mountains.","hiking","健行","go hiking（去健行）。"),
  T("bt2","b2","他是我們班上最高的男生。",["He is the tallest boy in {our|my} class."],"the + 最高級 + in ...","He is the tallest boy in our class." ),
  R("br2","b2","我的書包和你的一樣重。",["My schoolbag","is","as heavy","as","yours."],"as + 原級 + as。","My schoolbag is as heavy as yours." ),
  E("be2","b2","Taipei 101 is the taller building in Taipei.","taller","tallest","前面有 the，又是在一個範圍裡比。","the + 最高級 → tallest。"),
  G("bg1","b2","article","Watch Out for Red Fire Ants",[
    "Red fire ants came to Taiwan around 2003. They are small, but they are among the most dangerous ants in the world. They live in the ground and build big mounds of soil in parks, fields, and schoolyards.",
    "When people step on a mound, the ants come out quickly and bite. Their bites feel hot, like fire, and that's how they got their name. The bites turn into small white bumps. For some people, a bite is more serious than a bee sting, and they need to see a doctor right away.",
    "So what should you do? First, look carefully before you sit on the grass. Second, wear long pants and shoes when you go hiking. Third, if you are bitten, wash the place with cold water and don't scratch it. Finally, if you feel sick, go to the hospital at once."
  ],[["mound","蟻丘、土堆"],["soil","土壤"],["step on","踩到"],["bump","腫包"],["serious","嚴重的"],["sting","螫傷"],["scratch","抓、搔"]],[
    Q("bg1a","Why are these ants called \"fire ants\"?",["They are red like fire.","Their bites feel hot like fire.","They live near fires.","They can start fires."],1,"that's how they got their name。","Their bites feel hot, like fire, and that's how they got their name." ),
    Q("bg1b","What should you do if you are bitten?",["Scratch the place.","Wash the place with cold water.","Step on the mound.","Sit on the grass."],1,"Third, ...","wash the place with cold water and don't scratch it。"),
    O("bg1c","Put the tips in the order they appear.",["Wear long pants and shoes.","Go to the hospital if you feel sick.","Look before you sit on the grass.","Wash the bite with cold water."],[2,0,3,1],"First, Second, Third, Finally。","先看再坐（c）→ 穿長褲和鞋（a）→ 冷水沖洗（d）→ 不舒服就醫（b）。")
  ]),
  /* U3 */
  M("bc1","b3","The farmer works ___ than his neighbors.",["hard","harder","hardest","more hard"],1,"副詞 hard 的比較級。","hard → harder（副詞比較級）。"),
  M("bc2","b3","Please speak more ___. I can't hear you.",["loud","loudly","louder","loudest"],1,"修飾動詞 speak 用副詞。","more + 副詞 → more loudly。"),
  M("bc3","b3","Of all the workers, Mr. Chen works the ___.",["carefully","more carefully","most carefully","careful"],2,"所有工人之中「最」…","the most + 副詞（最高級）。"),
  M("bc4","b3","I hurt ___ when I was carrying the box.",["me","my","myself","mine"],2,"主詞和受詞是同一個人。","主詞受詞相同 → 反身代名詞 myself。"),
  M("bc5","b3","The children made the cards by ___.",["them","their","themselves","theirs"],2,"by + 反身代名詞 = 獨自。","by themselves（他們自己）。"),
  M("bc6","b3","Workers should be paid ___ for their work.",["fair","fairly","fairer","fairest"],1,"修飾動詞 be paid。","副詞 fairly（公平地）。"),
  M("bc7","b3","Take care of ___, Grandma!",["you","your","yourself","yours"],2,"祈使句的主詞是 you。","take care of yourself（照顧好自己）。"),
  SP("bs7","b3","Workers have the ___ to rest.","right","權利","right（權利）。"),
  SP("bs8","b3","Mom works ___ than Dad. She gets home at nine.","later","比較晚","late → later。"),
  SP("bs9","b3","Please help ___ to some cookies.","yourself","你自己","help yourself（自己拿來吃）。"),
  T("bt3","b3","我弟弟跑得比我快。",["My {|little |younger }brother runs faster than {me|I do|I}."],"副詞比較級 + than。","My little brother runs faster than me." ),
  R("br3","b3","她自己做了這件洋裝。",["She","made","this dress","by","herself."],"by + 反身代名詞。","She made this dress by herself." ),
  E("be3","b3","He drives more careful than his brother.","careful","carefully","修飾動詞 drives。","修飾動詞要用副詞 → more carefully。"),
  /* U4 */
  M("bd1","b4","I can hear the wind ___.",["blow","blows","to blow","blew"],0,"感官動詞 + 受詞 + 原形。","hear + 受詞 + 原形動詞（或 V-ing）。"),
  M("bd2","b4","I saw a man ___ across the street.",["run","runs","to run","ran"],0,"see + 受詞 + 原形 / V-ing。","saw a man run（看到他跑過去）。"),
  M("bd3","b4","My mom made me ___ my room.",["clean","to clean","cleaning","cleans"],0,"使役動詞 make + 受詞 + 原形。","make + 人 + 原形動詞。"),
  M("bd4","b4","If an earthquake ___, get under a table.",["happens","will happen","happened","happen"],0,"if 子句用現在式。","if 條件句：if + 現在式（表未來）。"),
  M("bd5","b4","You ___ use the elevator during a fire.",["mustn't","must","should","have to"],0,"火災時搭電梯很危險。","mustn't（絕對不可以）。"),
  M("bd6","b4","Our teacher let us ___ outside after the drill.",["play","to play","playing","played"],0,"let + 受詞 + 原形。","let + 人 + 原形動詞。"),
  M("bd7","b4","You should ___ some water and food at home for a typhoon.",["keep","keeps","to keep","kept"],0,"should + 原形。","助動詞 should + 原形。"),
  SP("bs10","b4","During an ___, stay away from windows.","earthquake","地震","earthquake（地震）。"),
  SP("bs11","b4","We have a fire ___ at school every year to practice what to do.","drill","演習","fire drill（消防演習）。"),
  SP("bs12","b4","If there's a fire, take the ___, not the elevator.","stairs","樓梯","stairs（樓梯）。"),
  T("bt4","b4","如果明天下雨，我們就待在家。",["If it rains tomorrow, we will stay {at home|home}.","We will stay {at home|home} if it rains tomorrow."],"If + 現在式, 主詞 + will + 原形。","If it rains tomorrow, we will stay home." ),
  R("br4","b4","爸爸讓我玩電動一小時。",["Dad","let","me","play video games","for an hour."],"let + 人 + 原形。","Dad let me play video games for an hour." ),
  E("be4","b4","I saw him crossed the street.","crossed",["cross","crossing"],"see + 受詞 + ？","感官動詞 + 受詞 + 原形 / V-ing → cross 或 crossing。"),
  /* U5 */
  M("be5x","b5","All of the food stands ___ great.",["look","looks","looking","to look"],0,"All of + 複數名詞。","All of the stands（複數）→ look。"),
  M("bf1","b5","Most of the students ___ breakfast every day.",["eat","eats","eating","is eat"],0,"Most of + 複數名詞。","複數 → eat。"),
  M("bf2","b5","Each of the students ___ a water bottle.",["has","have","having","are having"],0,"Each 當主詞是單數。","Each of... 視為單數 → has。"),
  M("bf3","b5","Both of my parents ___ doctors.",["are","is","be","was"],0,"Both = 兩個人。","Both 是複數 → are。"),
  M("bf4","b5","Some of the milk ___ gone bad.",["has","have","are","were"],0,"milk 不可數。","Some of + 不可數名詞 → 單數 has。"),
  M("bf5","b5","I have two brothers. One is a cook, and ___ is a teacher.",["the other","another","other","others"],0,"兩個之中的另一個。","兩者：one... the other。"),
  M("bf6","b5","You should eat more vegetables and ___ junk food.",["less","fewer","more","many"],0,"junk food 不可數。","不可數名詞用 less（較少）。"),
  SP("bs13","b5","Eating too much ___ is bad for your teeth.","sugar","糖","sugar（糖）。"),
  SP("bs14","b5","I ___ for thirty minutes every day to stay healthy.","exercise","運動","exercise（運動）。"),
  SP("bs15","b5","Fruit and vegetables are ___ food.","healthy","健康的","healthy（健康的）。"),
  T("bt5","b5","我們班上大部分的學生都喜歡運動。",["Most {of the |}students in {our|my} class like {sports|exercising|to exercise|playing sports}."],"Most of the + 複數名詞。","Most of the students in our class like sports." ),
  R("br5","b5","所有的蛋糕看起來都很好吃。",["All of","the cakes","look","delicious."],"All of + 複數 + look + 形容詞。","All of the cakes look delicious." ),
  E("be6","b5","Every of the students has a computer.","Every","Each","Every 不能接 of。","Each of + 複數名詞；Every 後面直接接單數名詞。"),
  G("bg2","b5","notice","Healthy Food Fair at Sunshine Park",[
    "Saturday, May 10, 10:00 a.m. to 4:00 p.m.",
    "• All of the food stands sell food with less sugar and salt.",
    "• Most of the drinks are under 50 dollars. Water is free.",
    "• Each visitor gets one free fruit cup. (Only 200 cups!)",
    "• Kids' cooking class: 2:00 p.m. Sign up at Stand 5.",
    "• Bring your own bottle and get 10 dollars off any drink."
  ],[["fair","博覽會、市集"],["stand","攤位"],["visitor","參觀者"],["10 dollars off","折 10 元"]],[
    Q("bg2a","What can every visitor get for free?",["A cup of milk tea.","A fruit cup.","A cooking class.","A new bottle."],1,"Each visitor gets ...","Each visitor gets one free fruit cup." ),
    Q("bg2b","How can you save 10 dollars?",["Come before 10:00 a.m.","Bring your own bottle.","Join the cooking class.","Buy two fruit cups."],1,"10 dollars off。","Bring your own bottle and get 10 dollars off。"),
    Q("bg2c","Which of the following is TRUE?",["The fair is on Sunday.","All of the drinks are free.","The cooking class starts at 2:00 p.m.","There are 500 free fruit cups."],2,"逐行對照。","Kids' cooking class: 2:00 p.m. → (C)。只有水免費（B 錯）；只有 200 杯（D 錯）。")
  ]),
  /* U6 */
  M("bh1","b6","You can throw a ball, ___ you?",["can't","can","don't","aren't"],0,"肯定句 → 否定附加問句。","can → can't you?"),
  M("bh2","b6","She is a good soccer player, ___ she?",["isn't","is","doesn't","wasn't"],0,"be 動詞 is。","is → isn't she?"),
  M("bh3","b6","Tom likes cooking, ___ he?",["doesn't","does","isn't","didn't"],0,"一般動詞現在式第三人稱。","likes → doesn't he?"),
  M("bh4","b6","They didn't come to the game, ___ they?",["did","didn't","were","weren't"],0,"否定句 → 肯定附加問句。","didn't → did they?"),
  M("bh5","b6","___ Lisa is small, she is a great basketball player.",["Although","But","So","Because"],0,"雖然…，（還是）…","Although（雖然）表讓步。"),
  M("bh6","b6","Although it was raining, ___ we still played soccer.",["X（不填）","but","so","and"],0,"although 和 but 不能一起用。","Although 句子不可以再加 but。"),
  M("bh7","b6","Boys and girls should have ___ chances to learn.",["equal","equally","equality","equals"],0,"修飾名詞 chances。","形容詞 equal（平等的）。"),
  SP("bs16","b6","Boys and girls are ___. They can both do any job.","equal","平等的","equal（平等的）。"),
  SP("bs17","b6","___ he is a boy, he loves ballet.","Although","雖然","Although（雖然）。"),
  SP("bs18","b6","Don't judge people by their ___.","gender","性別","gender（性別）。"),
  T("bt6","b6","你會游泳，不是嗎？",["You can swim, can't you?"],"肯定句 + 否定附加問句。","You can swim, can't you?"),
  R("br6","b6","雖然他很累，他還是完成了作業。",["Although","he was tired,","he","finished","his homework."],"Although + 子句, 主要子句。","Although he was tired, he finished his homework.",["He finished his homework although he was tired"]),
  E("be7","b6","Mary is a nurse, doesn't she?","doesn't","isn't","前面的動詞是 is。","is → isn't she?"),
  G("bg3","b6","cloze","Leo's Dance Dream",[
    "Leo is fourteen, and he loves ballet. [[1]] Some of his classmates laughed at him. \"Ballet is for girls, isn't it?\" they said.",
    "Although Leo felt sad, he didn't stop dancing. [[2]] His teacher, Ms. Hsu, told him, \"Dancing is for everyone. What matters is how hard you practice.\"",
    "Last month, Leo danced at the school show. [[3]] After the show, the classmates who laughed at him came to say sorry.",
    "Now Leo knows that people should do what they love, [[4]]"
  ],[["ballet","芭蕾"],["laugh at","嘲笑"],["matter","要緊"],["clap","拍手"],["whether","無論是否"]],[
    B("bg3a",1,["He practices for two hours every day.","He never goes to dance class.","He thinks ballet is boring.","He wants to stop dancing."],0,"他很愛芭蕾。","愛芭蕾 → 每天練兩小時。"),
    B("bg3b",2,["Instead, he practiced even harder.","So he sold his dance shoes.","He stopped going to school.","He laughed at his classmates."],0,"雖然難過，他沒有停止跳舞。","沒有放棄 → 反而更努力練習。"),
    B("bg3c",3,["All of the people clapped for him.","None of his family came.","He fell asleep on the stage.","The show was canceled."],0,"演出後，同學來道歉。","表演很成功 → 大家都為他鼓掌。"),
    B("bg3d",4,["whether they are boys or girls.","so boys can't dance.","because ballet is easy.","although nobody cares."],0,"故事的結論。","不論男生女生，都該做自己喜歡的事。")
  ]),
  X("bx1","b1","把形容詞配對到比較級。",["big","good","bad","happy","interesting","far"],["bigger","better","worse","happier","more interesting","farther"],"注意不規則變化。","big→bigger、good→better、bad→worse、happy→happier、interesting→more interesting、far→farther。"),
  X("bx2","b6","把句子配對到正確的附加問句。",["You are tired,","He can cook,","She likes cats,","They went home,","It isn't hot,","We will win,"],["aren't you?","can't he?","doesn't she?","didn't they?","is it?","won't we?"],"前肯定後否定；前否定後肯定。","are→aren't、can→can't、likes→doesn't、went→didn't、isn't→is、will→won't。"),
  D("bq1","b4","Nora","drill",["We had an earthquake drill at school today.","Everyone got under the desk."],["A tool for making holes.","Practice of what to do in an emergency.","A kind of dance.","A strong wind."],1,"大家躲到桌子底下。","earthquake drill = 地震演習。drill 也有「鑽子」的意思 (A)。"),
  D("bq2","b5","Ken","stand",["There are many food stands at the night market.","I want to try them all!"],["To be on your feet.","A small shop or table that sells things.","To accept something bad.","A seat at a ball game."],1,"夜市裡的 food stands。","food stand = 小吃攤。stand 當動詞是「站」(A)、「忍受」(C)。")
  ]
});
