/* ===== 九上 Unit 3 ~ Unit 6（補完全冊） ===== */
(() => {
const b = bank("hl9a-m1");
b.title = "九上 全冊";
b.range = "翰林版 Unit 1 ~ Unit 6（國三上）";
b.note = "第一次段考：現在完成式、分詞形容詞等；Unit 3~6：被動語態、間接問句、關係代名詞 who / which / that";
Object.assign(b.tags, {
  n3: "U3 被動語態",
  n4: "U4 間接問句",
  n5: "U5 關係代名詞 who / that（人）",
  n6: "U6 關係代名詞 which / that（物）"
});
b.exams = [
  { name: "第一次段考", tags: ["perfect", "sincefor", "been", "sense", "feel", "toothat", "vocab", "reading"] },
  { name: "第二次段考", tags: ["n3", "n4"] },
  { name: "第三次段考", tags: ["n5", "n6"] }
];
b.items.push(
  /* U3 */
  M("na1","n3","The soldier ___ by a dog in the war.",["saved","was saved","is saving","saves"],1,"士兵是「被」救。","被動語態：be + p.p. → was saved。"),
  M("na2","n3","English ___ in many countries.",["speaks","is spoken","is speaking","spoke"],1,"英文是「被說」。","English is spoken...（被動，現在式）。"),
  M("na3","n3","This bridge ___ in 1990.",["built","was built","is built","was building"],1,"1990 年被建造。","過去被動：was + p.p. → was built。"),
  M("na4","n3","The window was broken ___ the strong wind.",["by","with","for","of"],0,"被動語態中表示「被誰」。","by + 動作者。"),
  M("na5","n3","Many animals ___ by people every year.",["are hurt","hurt","are hurting","is hurt"],0,"動物是「被」傷害；主詞複數。","複數 + 現在被動 → are hurt。"),
  M("na6","n3","These photos ___ by my father last summer.",["took","were taken","was taken","are taking"],1,"照片被拍；複數；過去。","were + taken。"),
  M("na7","n3","The book ___ into twenty languages.",["has translated","has been translated","translated","is translating"],1,"書是被翻譯，到現在已經…","現在完成式被動：has been + p.p.。"),
  M("na8","n3","Joe: Who wrote this letter?\nAmy: It ___ by my grandfather.",["wrote","was written","is writing","was wrote"],1,"信是被寫的。","was written（write-wrote-written）。"),
  SP("ns1","n3","The dog was trained to help the ___ in the war.","soldiers","士兵（複數）","soldiers（士兵們）。"),
  SP("ns2","n3","The cat was ___ from the tree by a firefighter.","rescued","被救出","rescue（救援）的過去分詞 rescued。"),
  SP("ns3","n3","Many dogs were sent to the ___ to help the soldiers.","war","戰爭","war（戰爭）。"),
  T("nt1","n3","這隻狗被一個小男孩救了。",["{This|The} dog was {saved|rescued} by a {little |young |small |}boy."],"was + p.p. + by ...","This dog was saved by a little boy." ),
  R("nr1","n3","這首歌是由一位台灣歌手寫的。",["This song","was","written","by","a Taiwanese singer."],"被動：was + p.p. + by。","This song was written by a Taiwanese singer." ),
  E("ne1","n3","The cake was make by my mom.","make","made","被動要用過去分詞。","be + p.p. → was made。"),
  /* U4 */
  M("nb1","n4","Do you know where the file ___?",["is","is it","does","it is be"],0,"間接問句用直述句的順序。","間接問句：疑問詞 + 主詞 + 動詞 → where the file is。"),
  M("nb2","n4","Can you tell me what time the movie ___?",["starts","does start","does it start","start"],0,"間接問句不再用 does。","what time the movie starts（直述句順序）。"),
  M("nb3","n4","I don't know ___ he is from.",["where","where does","what","when does"],0,"他來自「哪裡」。","where he is from。"),
  M("nb4","n4","Do you know ___?",["who is she","who she is","who does she","she is who"],1,"疑問詞 + 主詞 + 動詞。","who she is（直述句順序）。"),
  M("nb5","n4","Please tell me how much ___.",["is this bag","does this bag cost","this bag costs","costs this bag"],2,"間接問句。","how much this bag costs。"),
  M("nb6","n4","I wonder ___ Tom will come to the party.",["if","that","what","which"],0,"沒有疑問詞的問句，用「是否」。","Yes/No 問句變間接問句用 if / whether。"),
  M("nb7","n4","Ann: Do you know when the bus will come?\nBen: ___",["Yes, it will come in five minutes.","Yes, I do it.","No, it doesn't.","It's a bus."],0,"回答要提供資訊。","Do you know...? 可以直接給資訊：Yes, it will come in five minutes." ),
  M("nb8","n4","The app can tell you ___ in the photo.",["what is","what it is","what is it","it is what"],1,"疑問詞 + 主詞 + 動詞。","what it is（它是什麼）。"),
  SP("ns4","n4","I can't find the ___ on my computer. Where did I save it?","file","檔案","file（檔案）。"),
  SP("ns5","n4","The app can ___ the photo and tell you what's in it.","analyze","分析","analyze（分析）。"),
  SP("ns6","n4","Do you know ___ the store is open on Sunday?","whether","是否","whether（是否）= if。"),
  T("nt2","n4","你知道他住在哪裡嗎？",["Do you know where he lives?"],"Do you know + 疑問詞 + 主詞 + 動詞？","Do you know where he lives?"),
  R("nr2","n4","你可以告訴我圖書館在哪裡嗎？",["Can you","tell me","where","the library","is?"],"間接問句：where + 主詞 + is。","Can you tell me where the library is?"),
  E("ne2","n4","Do you know where she live?","live","lives","she 是第三人稱單數。","間接問句中的動詞也要配合主詞 → lives。"),
  G("ng1","n3","article","Sergeant Stubby, a Dog Hero",[
    "In 1917, a little dog was found near a university in the U.S. by a young soldier named Robert Conroy. The soldier called him Stubby because his tail was very short. Soon Stubby was loved by all the soldiers.",
    "Later, Stubby was taken to France, where a big war was going on. He was trained to help the soldiers. Because a dog's nose is very sensitive, Stubby could smell poison gas before people could. When he smelled it, he barked and ran around to warn the soldiers. Many soldiers were saved this way. He also found soldiers who were hurt on the battlefield.",
    "After the war, Stubby was given medals and became famous. Today, his story is still told, and he can be seen in a museum in Washington, D.C."
  ],[["sergeant","中士"],["university","大學"],["sensitive","敏感的"],["poison gas","毒氣"],["bark","吠叫"],["warn","警告"],["battlefield","戰場"],["medal","獎章"]],[
    Q("ng1a","Why was the dog called Stubby?",["He was very small.","His tail was very short.","He loved the soldiers.","He was found in France."],1,"because ...","because his tail was very short." ),
    Q("ng1b","How did Stubby help the soldiers?",["He carried food for them.","He warned them about poison gas.","He drove them to the hospital.","He taught them to fight."],1,"第二段。","聞到毒氣就吠叫、跑來跑去警告士兵。"),
    Q("ng1c","Which of the following is TRUE?",["Stubby was born in France.","Stubby was found by Robert Conroy in 1917.","Nobody remembers Stubby today.","Stubby was given a new tail after the war."],1,"逐一對照。","1917 年被 Robert Conroy 發現 → (B)。他是在美國被找到（A 錯）；故事至今仍被傳述（C 錯）。")
  ]),
  /* U5 */
  M("nc1","n5","The man ___ shook hands with me is my favorite star.",["who","which","whom he","what"],0,"先行詞是「人」，當主詞。","人 + who + 動詞。"),
  M("nc2","n5","I have a friend ___ can speak four languages.",["who","which","whose","what"],0,"a friend 是人。","人當主詞用 who / that。"),
  M("nc3","n5","The girl who ___ next to me is Mina.",["sit","sits","sitting","are sitting"],1,"who 指 the girl（單數）。","關代後的動詞配合先行詞 the girl → sits。"),
  M("nc4","n5","Do you know the boy ___ is talking to Ms. Lin?",["that","which","whom","what"],0,"先行詞是人。","人可以用 who 或 that。"),
  M("nc5","n5","The artist who ___ this comic is from Japan.",["draw","drew","drawing","drawn"],1,"關係子句需要一個動詞。","who drew this comic（畫了這本漫畫）。"),
  M("nc6","n5","Students ___ want to join the contest should sign up today.",["who","which","whom","whose"],0,"Students 是人，當主詞。","Students who want to...。"),
  M("nc7","n5","A ___ is a person who writes books.",["writer","reader","player","driver"],0,"寫書的人。","writer（作家）。"),
  M("nc8","n5","The people who ___ at the comic show were very excited.",["was","were","is","be"],1,"先行詞 people 複數；過去。","people 複數 → were。"),
  SP("ns7","n5","We went to a comic ___ last weekend and saw many famous artists.","exhibition","展覽","exhibition（展覽）。"),
  SP("ns8","n5","The ___ signed his name on my book. I was so happy!","star","明星","star（明星）。"),
  SP("ns9","n5","A ___ is a person who loves a singer or a team very much.","fan","粉絲","fan（粉絲）。"),
  T("nt3","n5","那個戴眼鏡的女生是我姊姊。",["The girl {who|that} {wears|is wearing|has} glasses is my {sister|older sister|big sister|elder sister}.","The girl with glasses is my {sister|older sister|big sister|elder sister}."],"The girl who ... is ...","The girl who wears glasses is my sister." ),
  R("nr3","n5","我認識一個很會畫漫畫的男生。",["I know","a boy","who","draws comics","very well."],"人 + who + 動詞。","I know a boy who draws comics very well." ),
  E("ne3","n5","The woman which lives next door is a nurse.","which",["who","that"],"先行詞是人。","人要用 who 或 that。"),
  /* U6 */
  M("nd1","n6","The sign ___ you used is not OK in some countries.",["which","who","whom","what"],0,"先行詞 the sign 是「物」。","物 + which / that。"),
  M("nd2","n6","This is the cake ___ my mom made for me.",["that","who","whose","what"],0,"先行詞是物。","物用 that / which。"),
  M("nd3","n6","The restaurant ___ we visited last night was very good.",["which","who","where it","what"],0,"we visited 少了受詞。","the restaurant which we visited。"),
  M("nd4","n6","I like the dress ___ has flowers on it.",["that","who","what","whom"],0,"先行詞 dress 是物。","物 + that + 動詞。"),
  M("nd5","n6","The dish which ___ made with rice is from Spain.",["is","are","was being","be"],0,"which 指 the dish（單數）。","被動 is made，配合單數 dish。"),
  M("nd6","n6","In Japan, people say \"Itadakimasu\" before they eat. It is a custom ___ shows thanks for the food.",["that","who","what","whose"],0,"先行詞 custom 是物。","a custom that shows thanks。"),
  M("nd7","n6","The book I borrowed from you ___ very interesting.",["is","are","were","be"],0,"真正的主詞是 The book。","The book (that) I borrowed... is interesting。關代當受詞可以省略。"),
  M("nd8","n6","In some countries, the OK sign is ___. You should not use it there.",["rude","polite","popular","kind"],0,"不該使用 → 不禮貌。","rude（無禮的）。"),
  SP("ns10","n6","Using chopsticks is a ___ in many Asian countries.","custom","習俗","custom（習俗）。"),
  SP("ns11","n6","It's ___ to point at people with your finger in some places.","rude","無禮的","rude（無禮的）。"),
  SP("ns12","n6","Different countries have different food ___.","cultures","文化（複數）","cultures（文化）。"),
  T("nt4","n6","這是我昨天買的書。",["This is the book {|that |which }I bought yesterday."],"the book (that) I bought ...","This is the book that I bought yesterday." ),
  R("nr4","n6","我喜歡你做的那道菜。",["I like","the dish","that","you","made."],"物 + that + 主詞 + 動詞。","I like the dish that you made." ),
  E("ne4","n6","The phone who I bought last week is broken.","who",["which","that"],"先行詞是物。","物用 which / that。"),
  G("ng2","n6","cloze","Hand Signs Around the World",[
    "Hand signs can be very useful when we travel. But a sign which is friendly in one country may be rude in another. [[1]]",
    "For example, the \"thumbs-up\" sign means \"good job\" in Taiwan and the U.S. [[2]] So if you are in those places, you should be careful when you use it.",
    "The \"OK\" sign is another one. [[3]] But in Brazil, it is not polite at all.",
    "People who travel a lot often learn about local customs first. [[4]]"
  ],[["hand sign","手勢"],["thumbs-up","比讚"],["polite","有禮貌的"],["local","當地的"],["by mistake","不小心"]],[
    B("ng2a",1,["So we should learn what a sign means before we use it.","So we should never use our hands.","Hand signs are the same everywhere.","Nobody uses hand signs today."],0,"前一句說同一個手勢在不同國家意思不同。","所以使用前要先了解意思 → (A)。(C) 和前一句矛盾。"),
    B("ng2b",2,["But in some parts of the Middle East and West Africa, it can be rude.","It is also used by all animals.","It was made by a famous singer.","Everyone in the world loves it."],0,"下一句說在「那些地方」要小心。","後面說 in those places 要小心 → 前面要先提到它在某些地方不禮貌。"),
    B("ng2c",3,["In many countries, it means \"all right.\"","It is never used in the U.S.","It means \"goodbye\" in every country.","It was invented last year."],0,"後一句用 But 轉折。","很多地方表示「沒問題」，But 在巴西不禮貌 → 前後形成對比。"),
    B("ng2d",4,["That way, they won't make others angry by mistake.","That way, they can go home earlier.","So they never meet local people.","Then they stop traveling."],0,"先了解當地習俗的好處。","先學當地習俗，就不會不小心冒犯別人。")
  ]),
  X("nx1","n3","把原形動詞配對到過去分詞（被動語態常用）。",["build","write","speak","break","steal","give"],["built","written","spoken","broken","stolen","given"],"被動語態 = be + 過去分詞。","build-built、write-written、speak-spoken、break-broken、steal-stolen、give-given。"),
  D("nq1","n4","Jay","save",["Don't forget to save the file","before you turn off the computer."],["To help someone get out of danger.","To keep data on a computer.","To keep money for later.","To stop someone from scoring a goal."],1,"關電腦之前要對檔案做什麼？","save the file = 存檔。save 也有「拯救」(A)、「存錢」(C) 的意思。")
);
})();
