/* ===== 題庫 =====
   新增範圍：在 BANKS 陣列加一個物件即可（id 不可重複，added 為加入日期）。 */
const BANKS = [
{
  id: "hl8a-m1",
  grade: 8.1,
  title: "八上 第一次段考",
  range: "翰林版 Unit 1 ~ Review 1",
  added: "2026-10-16",
  note: "依段考考卷題型改編：單選、字典題、題組、文意字彙、翻譯，另加重組、配對、挑錯",
  tags: {
    weather: "天氣與季節",
    give: "授與動詞 to / for",
    poss: "所有格代名詞・Whose",
    phone: "電話用語",
    clause: "before / after / when 子句",
    past: "過去式",
    vocab: "字彙・多義字",
    reading: "閱讀題組"
  },
  items: [
  /* ---------- 單選 ---------- */
  { id:"m1", type:"mc", tag:"weather",
    stem:["Ken: How ___ the weather in Tokyo last weekend?","Amy: It ___ cold and windy."],
    opts:["is; is","was; was","was; is","did; was"], ans:1,
    hint:"看時間：last weekend 是過去。",
    exp:"last weekend（上週末）是過去時間，兩格都用 be 動詞過去式 was。How was the weather...? 問「過去的天氣如何」。" },
  { id:"m2", type:"mc", tag:"weather",
    stem:["Leo: Does it ___ a lot in Hualien in summer?","Ivy: Yes. It's often ___ in July."],
    opts:["rain; rainy","rainy; rain","rains; rainy","rain; rain"], ans:0,
    hint:"Does it 後面接原形動詞；It's 後面接形容詞。",
    exp:"Does it + 原形動詞 → rain。It's（It is）後面要接形容詞 → rainy。名詞/動詞 rain 加 y 變形容詞 rainy。" },
  { id:"m3", type:"mc", tag:"weather",
    stem:["Mia: Is there ___ snow on Hehuan Mountain now?","Ben: Yes. It's very ___ up there."],
    opts:["many; snow","much; snowy","a lot; snowy","lots; snow"], ans:1,
    hint:"snow 當名詞是可數還是不可數？",
    exp:"snow（雪）是不可數名詞，用 much 修飾（a lot 後面要有 of 才行）。It's very 後面接形容詞 snowy。" },
  { id:"m4", type:"mc", tag:"weather",
    stem:"It was ___ yesterday, so we couldn't see the mountains clearly.",
    opts:["foggy","sunny","clear","fog"], ans:0,
    hint:"什麼天氣會讓人看不清楚遠方？",
    exp:"看不清楚山 → 起霧 foggy（形容詞）。fog 是名詞，It was 後面要接形容詞。sunny、clear 都是晴朗，與句意相反。" },
  { id:"m5", type:"mc", tag:"give",
    stem:"Grandma ___ a sweater ___ me last winter. It's very warm.",
    opts:["made; to","made; for","gave; for","sent; for"], ans:1,
    hint:"make 東西「給」某人，要用 to 還是 for？",
    exp:"make / buy / cook + 物 + for + 人；give / send / show / lend + 物 + to + 人。所以 made...for 正確；gave、sent 要搭配 to。" },
  { id:"m6", type:"mc", tag:"give",
    stem:["Dad: Who did you ___ the postcard to?","Joy: My pen pal in Canada."],
    opts:["send","buy","make","sent"], ans:0,
    hint:"句子已經有 did 了，動詞要用什麼形？句尾的 to 也是線索。",
    exp:"did 後面接原形動詞，所以不能用 sent。句尾 to 搭配 send（send sth to sb）；buy、make 要用 for。" },
  { id:"m7", type:"mc", tag:"give",
    stem:["Eric: Can you ___ your notes to me? I was sick yesterday.","Fay: Sure. Here you are."],
    opts:["show","buy","make","cook"], ans:0,
    hint:"哪個動詞搭配 to？",
    exp:"show sth to sb（把東西給某人看）。buy、make、cook 都是搭配 for。" },
  { id:"m8", type:"mc", tag:"give",
    stem:"My brother bought ___ on Mother's Day.",
    opts:["some flowers to Mom","Mom some flowers","for Mom some flowers","some flowers Mom"], ans:1,
    hint:"buy 的兩種句型：buy + 人 + 物，或 buy + 物 + for + 人。",
    exp:"buy 的句型：buy + 人 + 物（bought Mom some flowers）或 buy + 物 + for + 人（bought some flowers for Mom）。(A) 介系詞錯，(C)(D) 順序錯。" },
  { id:"m9", type:"mc", tag:"poss",
    stem:["Amy: Is this blue umbrella ___?","Tim: No, it's not mine. ___ is green."],
    opts:["your; My","yours; Mine","yours; My","you; Mine"], ans:1,
    hint:"空格後面都沒有名詞了。",
    exp:"後面沒有接名詞時要用所有格代名詞：yours（你的東西）、Mine（= My umbrella）。your / my 後面一定要接名詞。" },
  { id:"m10", type:"mc", tag:"poss",
    stem:["Ann: ___ cap is this?","Ray: It's ___. He left it in the classroom."],
    opts:["Whose; Jack's","Who; Jack","Whose; Jack","Who's; Jack's"], ans:0,
    hint:"問「誰的」用哪個字？回答要表示「Jack 的」。",
    exp:"Whose + 名詞 問「誰的…」。回答「Jack 的」要加 's → Jack's。Who's = Who is，不是「誰的」。" },
  { id:"m11", type:"mc", tag:"poss",
    stem:"These are not our tickets. ___ are in my bag.",
    opts:["Our","Ours","We","Us"], ans:1,
    hint:"空格當主詞，而且代替 our tickets。",
    exp:"Ours = our tickets，所有格代名詞可以直接當主詞。Our 後面要接名詞；We、Us 意思不對。" },
  { id:"m12", type:"mc", tag:"poss",
    stem:["Sam: Are those your cousins' bikes?","Lin: Yes, they're ___. They ride them to school every day."],
    opts:["their","theirs","them","they"], ans:1,
    hint:"「他們的（腳踏車）」，後面沒有名詞。",
    exp:"theirs = their bikes。their 後面要接名詞；them 是受格；they 是主格。" },
  { id:"m13", type:"mc", tag:"phone",
    stem:["Jack: Hello. May I speak to Nina, please?","Nina: ___"],
    opts:["Hold on.","Speaking.","This is Jack.","She's not here."], ans:1,
    hint:"接電話的人就是 Nina 本人。",
    exp:"電話中對方要找的人就是自己時，回答 Speaking.（我就是）。Hold on 是請對方稍等；This is Jack 是打電話的人說的；She's not here 不合理，因為她就是 Nina。" },
  { id:"m14", type:"mc", tag:"phone",
    stem:["Ray: Hi, is Mr. Lin there?","Ms. Wu: Sorry, he's out. Can I ___ a message?","Ray: Yes, please ask him to call me back."],
    opts:["leave","take","send","tell"], ans:1,
    hint:"接電話的人幫忙「記下」留言。",
    exp:"take a message：接電話的人幫忙記留言。leave a message 是打電話的人「留下」訊息。這裡是 Ms. Wu（接電話的人）在說話，所以用 take。" },
  { id:"m15", type:"mc", tag:"phone",
    stem:["Mia: Hello, is this 2234-5678?","Man: No, it isn't. You ___.","Mia: Oh, I'm sorry."],
    opts:["are speaking","hold on","have the wrong number","call back later"], ans:2,
    hint:"Mia 為什麼要道歉？",
    exp:"號碼不對 → You have the wrong number.（你打錯了）。所以 Mia 才會說 I'm sorry。" },
  { id:"m16", type:"mc", tag:"phone",
    stem:["Tom: Can I talk to your brother?","Sue: ___ I'll go get him."],
    opts:["Hold on, please.","Speaking.","Wrong number.","Goodbye."], ans:0,
    hint:"Sue 要去叫哥哥，對方需要做什麼？",
    exp:"Hold on, please.（請稍等）之後去叫人來聽。Speaking 表示就是本人，但 Sue 不是她哥哥。" },
  { id:"m17", type:"mc", tag:"clause",
    stem:"Lucy always brushes her teeth before she ___ to bed.",
    opts:["go","goes","went","going"], ans:1,
    hint:"always 表示習慣，主詞 she 是第三人稱單數。",
    exp:"always 表示習慣 → 現在簡單式。before 子句主詞 she 是第三人稱單數，動詞加 es → goes。" },
  { id:"m18", type:"mc", tag:"clause",
    stem:"After Ben ___ his homework last night, he watched a movie.",
    opts:["finishes","finish","finished","is finishing"], ans:2,
    hint:"last night、watched 都是過去。",
    exp:"last night 是過去時間，主要子句 watched 也是過去式，after 子句也要用過去式 finished。" },
  { id:"m19", type:"mc", tag:"clause",
    stem:"I'll call you when I ___ home tomorrow.",
    opts:["will get","get","got","getting"], ans:1,
    hint:"when 表示「時間」的子句，用現在式代替未來式。",
    exp:"時間副詞子句（when / before / after）用現在式表示未來，所以用 get，不用 will get。" },
  { id:"m20", type:"mc", tag:"clause",
    stem:"Remember to turn off the lights ___ you leave the classroom.",
    opts:["before","after","because","but"], ans:0,
    hint:"什麼時候關燈才合理？",
    exp:"離開教室「之前」要關燈 → before。after（之後）不合理；because、but 意思不通。" },
  { id:"m21", type:"mc", tag:"clause",
    stem:"Jenny always drinks a glass of milk before ___.",
    opts:["she went to school","going to school","to go to school","goes to school"], ans:1,
    hint:"before 當介系詞時，後面接名詞或 V-ing。",
    exp:"before 後面可以接子句（before she goes to school）或 V-ing（before going to school）。(A) 時態錯，(C) 不能接 to V，(D) 缺主詞。" },
  { id:"m22", type:"mc", tag:"past",
    stem:"We ___ a great time at the beach last Sunday.",
    opts:["have","had","has","having"], ans:1,
    hint:"last Sunday 是過去。",
    exp:"have a great time（玩得很開心），last Sunday 是過去 → had。" },
  { id:"m23", type:"mc", tag:"past",
    stem:["Kevin: Which club did you ___ this year?","Joe: The comic club. I love ___ pictures."],
    opts:["join; drawing","joined; draw","join; draws","joins; drawing"], ans:0,
    hint:"did 後面接原形；love 後面可以接 V-ing。",
    exp:"did + 原形動詞 → join。love + V-ing / to V → drawing。" },
  { id:"m24", type:"mc", tag:"clause",
    stem:"You can learn a lot about robots after you ___ the science club.",
    opts:["join","joined","will join","joining"], ans:0,
    hint:"after 子句表示未來的事，用什麼時態？",
    exp:"after 子句講未來的事時用現在式 → join（主詞 you，不加 s）。" },
  { id:"m25", type:"mc", tag:"vocab",
    stem:["Ivy: Why didn't you go hiking?","Max: Because it was raining ___. We stayed home."],
    opts:["heavy","heavily","hardly","heavier"], ans:1,
    hint:"修飾動詞 raining 要用副詞。",
    exp:"修飾動詞 rain 用副詞 heavily（大量地）。heavy 是形容詞（the rain was heavy）；hardly 是「幾乎不」，意思相反。" },
  { id:"m26", type:"mc", tag:"give",
    stem:"Thanks ___ the gift. I'll make a card ___ you, too.",
    opts:["to; to","for; for","for; to","of; for"], ans:1,
    hint:"「謝謝某物」是 thanks ___；make 東西給人用 ___。",
    exp:"Thanks for + 事物（謝謝…）。make + 物 + for + 人。" },

  /* ---------- 字典題 ---------- */
  { id:"d1", type:"dict", tag:"vocab",
    stem:"Mark didn't understand what \"kind\" meant in the sentences below.",
    box:["There are many kinds of birds in the park.","Some are big, and some are small.","Some sing in the morning, and some sing at night."],
    uline:"kinds",
    post:"He looked it up in the dictionary and found more than one meaning. What does \"kind\" mean here?",
    opts:["Nice and friendly to other people.","A group of things that are the same in some way.","To help someone do something.","Very cold and windy."], ans:1,
    hint:"many kinds of birds：很多「什麼」的鳥？",
    exp:"many kinds of birds = 很多「種類」的鳥。kind 當名詞是「種類」；當形容詞是「親切的」(A)。" },
  { id:"d2", type:"dict", tag:"vocab",
    stem:"Lily didn't understand what \"change\" meant in the dialogue below.",
    box:["Clerk: That's 80 dollars.","Lily: Here's 100 dollars.","Clerk: Thank you. Here's your change."],
    uline:"change",
    post:"She looked it up in the dictionary. What does \"change\" mean here?",
    opts:["To become different.","To put on different clothes.","The money you get back when you pay more than the price.","A new and different thing."], ans:2,
    hint:"付了 100 元，買 80 元的東西，店員還你什麼？",
    exp:"付 100 元買 80 元的東西，店員找回 20 元 → change 在這裡是「找的零錢」。" },
  { id:"d3", type:"dict", tag:"vocab",
    stem:"Ted didn't understand what \"right\" meant in the sentence below.",
    box:["Go straight and turn right at the bank.","Then you'll see the post office."],
    uline:"right",
    post:"He looked it up in the dictionary. What does \"right\" mean here?",
    opts:["Correct or true.","On or toward the side of your body that is to the east when you face north.","Good or fair.","Exactly; at once."], ans:1,
    hint:"turn ___ at the bank 是在報路。",
    exp:"turn right 是「右轉」，right 在這裡指「右邊」。(A)「正確的」、(D)「立刻」（right now）都是 right 的其他意思。" },

  /* ---------- 題組 ---------- */
  { id:"g1", type:"group", tag:"reading", kind:"dialogue", title:"A Call from Sapporo",
    passage:[
      "Jenny: Hello?",
      "Ray: Hi, Jenny. It's Ray. I'm calling from Sapporo!",
      "Jenny: Wow! How's the weather there? Is it snowy?",
      "Ray: Yes, it snowed all night. The streets are white, and my hands are freezing. I left my gloves on the train this morning.",
      "Jenny: Oh no! Can you buy a new pair?",
      "Ray: My aunt lent me hers. They're a little small, but they're warm.",
      "Jenny: Lucky you! Here in Taipei, it's warm and sunny. We even went swimming last weekend.",
      "Ray: Swimming in December? That's crazy!",
      "Jenny: Ha-ha. By the way, did you see the snow festival?",
      "Ray: Not yet. We're going to see the ice statues after we have dinner tonight. I'll send some pictures to you.",
      "Jenny: Great! Have fun, and don't lose your aunt's gloves!"
    ],
    uline:["hers"],
    gloss:[["Sapporo","札幌（日本城市）"],["freezing","極冷的"],["gloves","手套"],["lent (lend)","借出"],["festival","節慶"],["statue","雕像"],["by the way","順帶一提"]],
    qs:[
      { id:"g1a", type:"mc", stem:"What is Ray going to do after dinner tonight?",
        opts:["Buy a new pair of gloves.","Go swimming with Jenny.","See the ice statues.","Call his aunt."], ans:2,
        hint:"找 after we have dinner tonight 那一句。",
        exp:"Ray 說 We're going to see the ice statues after we have dinner tonight. → 晚餐後去看冰雕。" },
      { id:"g1b", type:"mc", stem:"In the dialogue, the word \"hers\" means ___.",
        opts:["Jenny's gloves","Ray's gloves","Ray's aunt's gloves","the gloves on the train"], ans:2,
        hint:"My aunt lent me hers. 是誰的東西借給 Ray？",
        exp:"My aunt lent me hers. → hers = her gloves，也就是 Ray 阿姨的手套。最後一句 don't lose your aunt's gloves 也是線索。" },
      { id:"g1c", type:"mc", stem:"Which of the following is TRUE?",
        opts:["It is cold and snowy in Taipei now.","Ray lost his gloves on the train.","Jenny saw the snow festival last weekend.","Ray's aunt's gloves are too big for him."], ans:1,
        hint:"一個一個對照原文：台北天氣？手套去哪了？",
        exp:"I left my gloves on the train → Ray 把手套忘在火車上（B 正確）。台北 warm and sunny（A 錯）；看雪祭的是 Ray 而且還沒去（C 錯）；手套 a little small（D 錯）。" }
    ] },
  { id:"g2", type:"group", tag:"reading", kind:"article", title:"Typhoon Days in Taiwan",
    passage:[
      "Every summer and fall, typhoons come to Taiwan. They bring strong winds and heavy rain. When a typhoon is coming, the government sometimes gives people a \"typhoon day.\" On that day, students and workers can stay home.",
      "Long ago, people stayed home and did nothing special on typhoon days. Families just listened to the radio and waited for the storm to pass. Then, in the 1990s, many people started to buy instant noodles and vegetables before a typhoon came. Some even went to the movies or sang karaoke when the rain stopped for a while.",
      "Today, things are different again. Before a typhoon comes, people check the weather news on their phones. Many order food online, so they don't need to go out in the wind and rain. Some people think a typhoon day is a \"free holiday,\" but it isn't. Typhoons can be very dangerous. The best plan is to stay inside and stay safe."
    ],
    gloss:[["typhoon","颱風"],["government","政府"],["storm","暴風雨"],["pass","經過"],["instant noodles","泡麵"],["karaoke","卡拉 OK"],["for a while","一陣子"],["order","訂購"],["online","在網路上"],["dangerous","危險的"]],
    qs:[
      { id:"g2a", type:"mc", stem:"Why can people stay home on a typhoon day?",
        opts:["Because they want a free holiday.","Because the government gives them a day off when a typhoon is coming.","Because they need to buy instant noodles.","Because it is too hot outside."], ans:1,
        hint:"看第一段最後兩句。",
        exp:"第一段：When a typhoon is coming, the government sometimes gives people a \"typhoon day.\" → 政府放颱風假。文章最後也說颱風假不是 free holiday。" },
      { id:"g2b", type:"order", stem:"Below are the ideas from the reading. Put them in the order they appear.",
        items:["People order food online.","Families listened to the radio.","Typhoons bring strong winds and heavy rain.","People bought instant noodles before a typhoon."],
        ans:[2,1,3,0],
        hint:"第一段介紹颱風 → 第二段以前 → 1990 年代 → 第三段現在。",
        exp:"順序：c. 颱風帶來強風豪雨（第一段）→ b. 以前全家聽收音機（第二段前半）→ d. 1990 年代買泡麵（第二段後半）→ a. 現在網路訂餐（第三段）。" },
      { id:"g2c", type:"mc", stem:"What does the writer want to tell us at the end?",
        opts:["Typhoon days are free holidays.","We should go out and sing karaoke.","Typhoons are dangerous, so we should stay inside.","We should listen to the radio all day."], ans:2,
        hint:"最後兩句。",
        exp:"Typhoons can be very dangerous. The best plan is to stay inside and stay safe. → 颱風很危險，待在室內最安全。" }
    ] },
  { id:"g3", type:"group", tag:"reading", kind:"cloze", title:"Hou Yi and the Ten Suns",
    passage:[
      "Long ago, there were ten suns in the sky. They took turns to work, and only one sun came out every day. [[1]]",
      "One day, the ten suns got bored and came out together. The earth became very hot. Rivers dried up, and plants died. People were thirsty and hungry. [[2]]",
      "A great hunter named Hou Yi wanted to help. He took his bow and shot at the suns one by one. [[3]] He left one sun in the sky because people still needed its light and heat.",
      "After that, only one sun came out every day. [[4]]"
    ],
    gloss:[["take turns","輪流"],["bored","無聊的"],["dry up","乾涸"],["thirsty","口渴的"],["hunter","獵人"],["bow","弓"],["shoot (shot)","射"],["one by one","一個接一個"],["heat","熱"]],
    qs:[
      { id:"g3a", type:"mc", blank:1, stem:"第 1 格",
        opts:["So the weather was never too hot.","So people were always cold.","But it rained every day.","Everyone wanted more suns."], ans:0,
        hint:"一天只有一個太陽出來，天氣會怎樣？",
        exp:"一天只出來一個太陽 → 所以天氣從不會太熱。這也和下一段「十個太陽一起出來就變很熱」形成對比。" },
      { id:"g3b", type:"mc", blank:2, stem:"第 2 格",
        opts:["They had a big party.","Everyone was afraid and didn't know what to do.","The suns were very happy for them.","They went swimming in the rivers."], ans:1,
        hint:"河都乾了、人又渴又餓，人們的心情？",
        exp:"天氣太熱、河乾、植物死、人又渴又餓 → 大家很害怕又不知道怎麼辦。(D) 河都乾了不可能游泳。" },
      { id:"g3c", type:"mc", blank:3, stem:"第 3 格",
        opts:["Nine suns fell from the sky.","Then it started to snow.","He was hungry after that.","But the suns didn't move."], ans:0,
        hint:"後一句說他留下一個太陽。",
        exp:"后羿一個一個射太陽 → 九個太陽掉下來，下一句「他留下一個太陽」才接得上。" },
      { id:"g3d", type:"mc", blank:4, stem:"第 4 格",
        opts:["This is how the seasons began!","And that's why we see only one sun today!","That's why the moon is round.","It's still very hot every day."], ans:1,
        hint:"這個故事在解釋什麼現象？",
        exp:"故事解釋「為什麼現在天上只有一個太陽」→ (B)。(A) 四季、(C) 月亮都和故事無關。" }
    ] },
  { id:"g4", type:"group", tag:"reading", kind:"notice", title:"Club Fair at Ming-de Junior High",
    passage:[
      "Join a club and find your new hobby!",
      "• Science Club: Make robots and do fun experiments. Every Monday after school.",
      "• Comic Club: Learn to draw comics and design your own characters. Every Wednesday, 3:30 to 5:00.",
      "• Dance Club: Practice hip-hop and perform at the school Christmas party. Every Friday after school.",
      "• Cooking Club: Cook easy dishes and share them with your friends. Bring an apron! Every Thursday.",
      "Sign up at the student office before September 20. Each student can join only ONE club."
    ],
    gloss:[["fair","博覽會"],["hobby","嗜好"],["experiment","實驗"],["comic","漫畫"],["character","角色"],["perform","表演"],["dish","菜餚"],["apron","圍裙"],["sign up","報名"]],
    qs:[
      { id:"g4a", type:"mc", stem:"Amy loves drawing and wants to create her own characters. Which club should she join?",
        opts:["Science Club","Comic Club","Dance Club","Cooking Club"], ans:1,
        hint:"找 characters 這個字。",
        exp:"Comic Club：Learn to draw comics and design your own characters. 符合 Amy 喜歡畫畫、想設計角色。" },
      { id:"g4b", type:"mc", stem:"Which is TRUE about the club fair?",
        opts:["Students can join two clubs.","Students need to bring an apron to the Dance Club.","Students must sign up before September 20.","The Science Club meets on Friday."], ans:2,
        hint:"看最後一段。",
        exp:"Sign up ... before September 20 → (C) 正確。只能參加一個社團（A 錯）；圍裙是烹飪社（B 錯）；科學社在星期一（D 錯）。" },
      { id:"g4c", type:"mc", stem:"Ben is busy on Mondays and Fridays. Which clubs can he NOT join?",
        opts:["Comic Club and Cooking Club","Science Club and Dance Club","Dance Club and Cooking Club","Science Club and Comic Club"], ans:1,
        hint:"哪兩個社團在星期一、星期五？",
        exp:"科學社在 Monday、熱舞社在 Friday，Ben 這兩天都忙 → 不能參加 Science Club 和 Dance Club。" }
    ] },

  /* ---------- 文意字彙 ---------- */
  { id:"s1", type:"spell", tag:"weather", stem:"It's so ___ this morning that I can't see the cars on the road clearly.", ans:"foggy",
    hint:"看不清楚 → 起霧的", exp:"foggy（起霧的）。fog（霧）+ g + y。" },
  { id:"s2", type:"spell", tag:"vocab", stem:"I want to ___ the dance club because I love hip-hop.", ans:"join",
    hint:"參加（社團）", exp:"join a club = 參加社團。" },
  { id:"s3", type:"spell", tag:"vocab", stem:"My cousin is a game ___. He makes fun games for kids.", ans:"designer",
    hint:"設計師", exp:"designer（設計師）= design（設計）+ er。" },
  { id:"s4", type:"spell", tag:"past", stem:"Mom ___ a new raincoat for me last weekend.", ans:"bought",
    hint:"buy 的過去式", exp:"last weekend 是過去 → buy 的過去式 bought。buy + 物 + for + 人。" },
  { id:"s5", type:"spell", tag:"weather", stem:"It was really ___ yesterday. My hat flew away!", ans:"windy",
    hint:"帽子被吹走 → 風大的", exp:"windy（風大的）= wind + y。" },
  { id:"s6", type:"spell", tag:"phone", stem:"Hello. May I ___ to Tina, please?", ans:"speak",
    hint:"電話用語：我可以跟…說話嗎？", exp:"May I speak to...? 是電話中找人的固定說法。" },
  { id:"s7", type:"spell", tag:"vocab", stem:"Kevin is a ___ of the basketball team. He practices every day.", ans:"member",
    hint:"成員", exp:"member（成員）。a member of the team = 隊上的一員。" },
  { id:"s8", type:"spell", tag:"give", stem:"Can you ___ me your pen? I'll give it back after class.", ans:"lend",
    hint:"借出（東西給別人）", exp:"lend（借出）：lend + 人 + 物。borrow 是「借入」，用法是 borrow sth from sb。" },
  { id:"s9", type:"spell", tag:"weather", stem:"The ___ is 35°C today. It's too hot to go outside!", ans:"temperature",
    hint:"氣溫", exp:"temperature（溫度、氣溫）。35°C 是攝氏 35 度。" },
  { id:"s10", type:"spell", tag:"vocab", stem:"We had a ___ time at the beach. Everyone was so happy.", ans:"wonderful",
    hint:"很棒的", exp:"wonderful（極好的）= wonder + ful。have a wonderful time = 玩得很開心。" },
  { id:"s11", type:"spell", tag:"past", stem:"Andy ___ his umbrella at home, so he got wet in the rain.", ans:"forgot",
    hint:"forget 的過去式", exp:"forget（忘記）的過去式是 forgot。" },
  { id:"s12", type:"spell", tag:"weather", stem:"Spring is my favorite ___ because the flowers are beautiful.", ans:"season",
    hint:"季節", exp:"season（季節）。四季：spring、summer、fall / autumn、winter。" },

  /* ---------- 翻譯 ---------- */
  { id:"t1", type:"trans", tag:"weather", zh:"你在日本的假期如何？",
    ans:["How was your {vacation|holiday|trip} in Japan?","How was your trip to Japan?"],
    hint:"過去的經驗「如何」→ How was ...?", exp:"How was + 名詞 ...? 問過去的事情如何。假期 vacation / holiday。" },
  { id:"t2", type:"trans", tag:"give", zh:"我姊姊上星期寄了一張明信片給我。",
    ans:["My {|older |big |elder }sister sent me a postcard last week.","My {|older |big |elder }sister sent a postcard to me last week.","Last week{,|} my {|older |big |elder }sister sent me a postcard.","Last week{,|} my {|older |big |elder }sister sent a postcard to me."],
    hint:"send 的過去式；send + 人 + 物 或 send + 物 + to + 人。", exp:"send 的過去式 sent。兩種句型：sent me a postcard / sent a postcard to me。" },
  { id:"t3", type:"trans", tag:"poss", zh:"那頂帽子是誰的？是我的。",
    ans:["Whose hat is that? {It's|It is} mine.","Whose is that hat? {It's|It is} mine.","Whose cap is that? {It's|It is} mine."],
    hint:"Whose + 名詞 + is that?；「我的」後面沒有名詞。", exp:"Whose hat is that? 問「誰的」；回答用所有格代名詞 mine（= my hat）。" },
  { id:"t4", type:"trans", tag:"clause", zh:"吃完晚餐後，他就去寫功課了。",
    ans:["After he {ate|had|finished} dinner, he {did|went to do|started to do} his homework.","He {did|went to do|started to do} his homework after he {ate|had|finished} dinner.","After {dinner|eating dinner|having dinner|he finished eating dinner}, he {did|went to do|started to do} his homework.","He {did|went to do} his homework after {dinner|eating dinner|having dinner}."],
    hint:"After + 子句（過去式），主要子句也用過去式。", exp:"After he ate dinner, he did his homework. 兩個子句都是過去式；after 子句放前面時要加逗號。" },
  { id:"t5", type:"trans", tag:"weather", zh:"這裡冬天常下雪嗎？",
    ans:["Does it {often snow|snow often|snow a lot} here in winter?","Does it {often snow|snow often|snow a lot} in winter here?","Is it often snowy here in winter?","Do you often have snow here in winter?","Do you have a lot of snow here in winter?"],
    hint:"Does it + 原形動詞 snow ...?", exp:"天氣用 it 當主詞：Does it often snow here in winter?（頻率副詞放一般動詞前）。" },
  { id:"t6", type:"trans", tag:"give", zh:"你可以借我你的雨傘嗎？我的在家裡。",
    ans:["{Can|Could} you lend me your umbrella? Mine is at home.","{Can|Could} you lend your umbrella to me? Mine is at home.","{Can|Could|May} I borrow your umbrella? Mine is at home."],
    hint:"lend + 人 + 物；「我的」= Mine。", exp:"Can you lend me your umbrella?（lend 借出）或 Can I borrow your umbrella?（borrow 借入）。Mine = my umbrella。" },

  /* ---------- 句子重組 ---------- */
  { id:"r1", type:"scramble", tag:"weather", zh:"上週末台北的天氣如何？",
    tiles:["How","was","the weather","in Taipei","last weekend?"], ans:"How was the weather in Taipei last weekend?",
    hint:"How was ... 開頭。", exp:"How was the weather + 地點 + 時間？" },
  { id:"r2", type:"scramble", tag:"give", zh:"她做了一個蛋糕給她的朋友。",
    tiles:["She","made","a cake","for","her friend."], ans:"She made a cake for her friend.",
    hint:"make + 物 + for + 人。", exp:"make 搭配 for：She made a cake for her friend." },
  { id:"r3", type:"scramble", tag:"poss", zh:"這些是誰的鞋子？",
    tiles:["Whose","shoes","are","these?"], ans:"Whose shoes are these?",
    hint:"Whose + 名詞 + be 動詞 + 主詞？", exp:"Whose shoes are these? 複數 shoes / these 搭配 are。" },
  { id:"r4", type:"scramble", tag:"phone", zh:"請稍等，我去叫我媽媽。",
    tiles:["Hold on,","please.","I'll","get","my mom."], ans:"Hold on, please. I'll get my mom.",
    hint:"Hold on 開頭。", exp:"Hold on, please.（請稍等）I'll get my mom.（我去叫我媽）" },
  { id:"r5", type:"scramble", tag:"clause", zh:"他睡覺前總是會看書。",
    tiles:["He","always","reads","before","he","goes","to bed."], ans:"He always reads before he goes to bed.",
    hint:"主要子句在前，before 子句在後。", exp:"頻率副詞 always 放一般動詞前；before 子句主詞 he 動詞 goes。" },
  { id:"r6", type:"scramble", tag:"clause", zh:"加入社團後，你可以交到新朋友。",
    tiles:["You","can","make","new friends","after","you","join","a club."], ans:"You can make new friends after you join a club.",
    alt:["After you join a club you can make new friends"],
    hint:"after you join a club 是一個子句。", exp:"You can make new friends after you join a club. after 子句講未來的事用現在式 join。" },

  /* ---------- 配對 ---------- */
  { id:"p1", type:"match", tag:"weather", stem:"把名詞配對到正確的天氣形容詞。",
    left:["snow","wind","rain","sun","fog","cloud"], right:["snowy","windy","rainy","sunny","foggy","cloudy"],
    hint:"大多數直接加 y；sun、fog 要重複字尾再加 y。",
    exp:"snow→snowy、wind→windy、rain→rainy、cloud→cloudy 直接加 y；sun→sunny、fog→foggy 短母音要重複字尾子音再加 y。" },
  { id:"p2", type:"match", tag:"phone", stem:"電話中，左邊這句話的最好回應是哪一句？",
    left:["May I speak to Ken? (Ken answers)","Can I take a message?","Is this 2233-4455?","Can you hold on a minute?","Who's calling, please?"],
    right:["Speaking.","Yes. Please tell him to call me back.","No. You have the wrong number.","Sure. I'll wait.","This is Amy."],
    hint:"想想每句話是誰在說。",
    exp:"本人接聽 → Speaking.；幫忙留言 → 請他回電；號碼不對 → 打錯了；請稍等 → 好，我等；請問哪位 → This is Amy.（電話中自我介紹用 This is，不說 I am）。" },
  { id:"p3", type:"match", tag:"poss", stem:"把人稱代名詞配對到所有格代名詞。",
    left:["I","you","he","she","we","they"], right:["mine","yours","his","hers","ours","theirs"],
    hint:"所有格代名詞 = 所有格 + 名詞。", exp:"I→mine、you→yours、he→his、she→hers、we→ours、they→theirs。" },

  /* ---------- 挑錯改正 ---------- */
  { id:"e1", type:"error", tag:"weather", sent:"It was very snow in Japan last week.", wrong:3, fix:["snowy"],
    hint:"was very 後面要接什麼詞性？", exp:"be 動詞 + very + 形容詞 → snow 要改成 snowy。" },
  { id:"e2", type:"error", tag:"give", sent:"My uncle bought a new bike to me.", wrong:6, fix:["for"],
    hint:"buy 搭配哪個介系詞？", exp:"buy + 物 + for + 人 → to 改 for。" },
  { id:"e3", type:"error", tag:"poss", sent:"Is this pencil case your?", wrong:4, fix:["yours"],
    hint:"句尾沒有名詞了。", exp:"後面沒有名詞 → 用所有格代名詞 yours。" },
  { id:"e4", type:"error", tag:"clause", sent:"After she finish her homework, she watched TV.", wrong:2, fix:["finished"],
    hint:"watched 是什麼時態？", exp:"主要子句 watched 是過去式，after 子句也用過去式 finished。" },
  { id:"e5", type:"error", tag:"weather", sent:"Does it rains a lot in spring?", wrong:2, fix:["rain"],
    hint:"Does 後面接什麼形？", exp:"Does + 主詞 + 原形動詞 → rains 改 rain。" },
  { id:"e6", type:"error", tag:"clause", sent:"Sam always takes a shower before he go to bed.", wrong:7, fix:["goes"],
    hint:"he 是第三人稱單數。", exp:"before 子句主詞 he，現在簡單式動詞要加 es → goes。" }
  ]
}
];

/* ===== 單字字典：word|詞性|中文 ===== */
const DICT_RAW = `
how|adv.|如何、怎樣
weather|n.|天氣
last|adj.|上一個的、最後的
weekend|n.|週末
cold|adj.|冷的
windy|adj.|風大的
wind|n.|風
rain|v./n.|下雨；雨
rainy|adj.|下雨的
lot|n.|許多（a lot 很多）
summer|n.|夏天
often|adv.|常常
snow|n./v.|雪；下雪
snowy|adj.|下雪的、多雪的
mountain|n.|山
now|adv.|現在
very|adv.|非常
up|adv.|在上面
there|adv.|那裡
yesterday|adv.|昨天
see|v.|看見
clearly|adv.|清楚地
clear|adj.|晴朗的；清楚的
sunny|adj.|晴朗的、陽光充足的
sun|n.|太陽
fog|n.|霧
foggy|adj.|起霧的
cloud|n.|雲
cloudy|adj.|多雲的
grandma|n.|奶奶、外婆
sweater|n.|毛衣
winter|n.|冬天
warm|adj.|溫暖的
make|v.|做、製作
give|v.|給
send|v.|寄、送
dad|n.|爸爸
who|pron.|誰
postcard|n.|明信片
pen|n.|筆
pal|n.|朋友（pen pal 筆友）
buy|v.|買
can|aux.|可以、能
note|n.|筆記
sick|adj.|生病的
sure|adv.|當然
here|adv.|這裡
show|v.|給…看、展示
cook|v.|煮
brother|n.|兄弟
bought|v.|買（buy 的過去式）
flower|n.|花
mom|n.|媽媽
mother|n.|母親
day|n.|天、日子
blue|adj.|藍色的
umbrella|n.|雨傘
mine|pron.|我的（東西）
yours|pron.|你的（東西）
green|adj.|綠色的
whose|pron.|誰的
cap|n.|鴨舌帽
left|v.|留下、遺留（leave 的過去式）
leave|v.|離開；留下
classroom|n.|教室
ticket|n.|票
bag|n.|袋子、包包
ours|pron.|我們的（東西）
cousin|n.|表／堂兄弟姊妹
bike|n.|腳踏車
ride|v.|騎
school|n.|學校
every|adj.|每一個
theirs|pron.|他們的（東西）
hello|interj.|哈囉；（電話）喂
may|aux.|可以（客氣地問）
speak|v.|說話
please|adv.|請
hold|v.|握住（hold on 稍等）
speaking|v.|（電話）我就是
out|adv.|外出、不在
message|n.|訊息、留言
take|v.|拿；帶；記下
tell|v.|告訴
ask|v.|要求；問
call|v.|打電話
back|adv.|回來
wrong|adj.|錯誤的
number|n.|號碼
sorry|adj.|抱歉的
talk|v.|說話、談話
get|v.|得到；去叫（人）；到達
go|v.|去
goodbye|interj.|再見
always|adv.|總是
brush|v.|刷
tooth|n.|牙齒（複數 teeth）
before|conj./prep.|在…之前
bed|n.|床（go to bed 上床睡覺）
after|conj./prep.|在…之後
homework|n.|功課
night|n.|晚上
watch|v.|觀看
movie|n.|電影
when|conj.|當…的時候
home|n./adv.|家；在家
tomorrow|adv.|明天
remember|v.|記得
turn|v.|轉；翻（turn off 關掉）
off|adv.|關掉
light|n.|燈；光
because|conj.|因為
drink|v.|喝
glass|n.|玻璃杯（a glass of 一杯）
milk|n.|牛奶
great|adj.|很棒的
time|n.|時間；（一段）經歷
beach|n.|海灘
sunday|n.|星期日
which|adj./pron.|哪一個
club|n.|社團
join|v.|參加、加入
year|n.|年
comic|n./adj.|漫畫；漫畫的
love|v.|喜愛
draw|v.|畫
picture|n.|圖畫；照片
learn|v.|學習
robot|n.|機器人
science|n.|科學
hike|v.|健行
heavy|adj.|重的；（雨）大的
heavily|adv.|大量地、猛烈地
hardly|adv.|幾乎不
heavier|adj.|比較重的（heavy 比較級）
stay|v.|停留、待
thanks|n.|謝謝
gift|n.|禮物
card|n.|卡片
too|adv.|也；太
understand|v.|了解、懂
kind|n./adj.|種類；親切的
mean|v.|意思是
sentence|n.|句子
below|adv.|在下面
many|adj.|許多的
bird|n.|鳥
park|n.|公園
big|adj.|大的
small|adj.|小的
sing|v.|唱歌
morning|n.|早上
look|v.|看（look up 查詢）
dictionary|n.|字典
find|v.|找到、發現
more|adj.|更多的
than|conj.|比
one|n.|一
meaning|n.|意思
nice|adj.|好的、友善的
friendly|adj.|友善的
other|adj.|其他的
people|n.|人們
group|n.|群、組
thing|n.|東西、事情
same|adj.|相同的
way|n.|方式；方面
help|v.|幫助
someone|pron.|某人
change|n./v.|零錢；改變
dialogue|n.|對話
clerk|n.|店員
dollar|n.|元
thank|v.|謝謝
become|v.|變成
put|v.|放（put on 穿上）
different|adj.|不同的
clothes|n.|衣服
money|n.|錢
pay|v.|付錢
price|n.|價格
new|adj.|新的
right|adj./adv.|右邊的；正確的
straight|adv.|直直地
bank|n.|銀行
then|adv.|然後
post|n.|郵件（post office 郵局）
office|n.|辦公室
correct|adj.|正確的
true|adj.|真的、對的
side|n.|邊
body|n.|身體
east|n.|東方
face|v.|面向
north|n.|北方
toward|prep.|朝向
good|adj.|好的
fair|adj./n.|公平的；博覽會
exactly|adv.|正好、確切地
once|adv.|一次（at once 立刻）
calling|v.|打電話
wow|interj.|哇
street|n.|街道
white|adj.|白色的
hand|n.|手
freezing|adj.|極冷的
glove|n.|手套
train|n.|火車
pair|n.|一雙、一對
aunt|n.|阿姨、姑姑
lent|v.|借出（lend 的過去式）
lend|v.|借出
little|adj./adv.|小的；有點
lucky|adj.|幸運的
even|adv.|甚至
swim|v.|游泳
december|n.|十二月
crazy|adj.|瘋狂的
festival|n.|節慶
yet|adv.|還（沒）
ice|n.|冰
statue|n.|雕像
dinner|n.|晚餐
tonight|adv.|今晚
fun|n./adj.|樂趣；好玩的
lose|v.|遺失
follow|v.|跟隨；以下的
lost|v.|遺失（lose 的過去式）
taipei|n.|台北
typhoon|n.|颱風
fall|n.|秋天
taiwan|n.|台灣
bring|v.|帶來
strong|adj.|強的
come|v.|來
government|n.|政府
sometimes|adv.|有時候
student|n.|學生
worker|n.|工作者、上班族
long|adj./adv.|長的；長久地（long ago 很久以前）
ago|adv.|以前
special|adj.|特別的
family|n.|家庭、家人
just|adv.|只是；剛剛
listen|v.|聽
radio|n.|收音機
wait|v.|等待
storm|n.|暴風雨
pass|v.|經過
start|v.|開始
instant|adj.|立即的（instant noodles 泡麵）
noodle|n.|麵條
vegetable|n.|蔬菜
karaoke|n.|卡拉 OK
stop|v.|停止
while|n.|一段時間
today|adv.|今天；現今
check|v.|查看
news|n.|新聞
phone|n.|電話、手機
order|v.|訂購
food|n.|食物
online|adv.|在網路上
need|v.|需要
out|adv.|出去
think|v.|認為、想
free|adj.|免費的；空閒的
holiday|n.|假日
dangerous|adj.|危險的
best|adj.|最好的
plan|n.|計畫
inside|adv.|在裡面、在室內
safe|adj.|安全的
reason|n.|原因
idea|n.|想法、概念
appear|v.|出現
reading|n.|閱讀；閱讀文章
writer|n.|作者
end|n.|結尾
off|adv.|休息（a day off 休假一天）
hot|adj.|熱的
outside|adv.|在外面
sky|n.|天空
work|v.|工作
every|adj.|每一
bored|adj.|無聊的
together|adv.|一起
earth|n.|地球；大地
river|n.|河流
dry|v.|變乾（dry up 乾涸）
plant|n.|植物
die|v.|死亡
thirsty|adj.|口渴的
hungry|adj.|飢餓的
hunter|n.|獵人
name|v./n.|命名；名字
named|adj.|名叫…的
want|v.|想要
bow|n.|弓
shoot|v.|射擊
shot|v.|射擊（shoot 的過去式）
still|adv.|仍然
heat|n.|熱
never|adv.|從不
afraid|adj.|害怕的
know|v.|知道
party|n.|派對
happy|adj.|快樂的
fell|v.|掉落（fall 的過去式）
move|v.|移動
season|n.|季節
begin|v.|開始（過去式 began）
began|v.|開始（begin 的過去式）
moon|n.|月亮
round|adj.|圓的
hobby|n.|嗜好
experiment|n.|實驗
monday|n.|星期一
wednesday|n.|星期三
thursday|n.|星期四
friday|n.|星期五
design|v./n.|設計
own|adj.|自己的
character|n.|角色
dance|n./v.|舞蹈；跳舞
practice|v.|練習
perform|v.|表演
christmas|n.|聖誕節
easy|adj.|簡單的
dish|n.|菜餚；盤子
share|v.|分享
friend|n.|朋友
apron|n.|圍裙
sign|v.|簽名（sign up 報名）
september|n.|九月
each|adj.|每一個
only|adv.|只有
create|v.|創造
busy|adj.|忙碌的
meet|v.|聚會；見面
hip-hop|n.|嘻哈
road|n.|道路
car|n.|汽車
cousin|n.|表／堂兄弟姊妹
game|n.|遊戲
designer|n.|設計師
kid|n.|小孩
raincoat|n.|雨衣
really|adv.|真的
hat|n.|帽子
fly|v.|飛（過去式 flew）
flew|v.|飛（fly 的過去式）
away|adv.|離開、遠離
member|n.|成員
basketball|n.|籃球
team|n.|隊伍
temperature|n.|溫度、氣溫
wonderful|adj.|極好的
everyone|pron.|每個人
forgot|v.|忘記（forget 的過去式）
forget|v.|忘記
wet|adj.|濕的
spring|n.|春天
favorite|adj.|最喜愛的
beautiful|adj.|美麗的
uncle|n.|叔叔、舅舅
pencil|n.|鉛筆
case|n.|盒子（pencil case 鉛筆盒）
watched|v.|觀看（watch 的過去式）
tv|n.|電視
shower|n.|淋浴
sam|n.|山姆（人名）
miss|v.|錯過；想念
noun|n.|名詞
adjective|n.|形容詞
minute|n.|分鐘
answer|v.|接（電話）；回答
again|adv.|再一次
became|v.|變成（become 的過去式）
cake|n.|蛋糕
canada|n.|加拿大
class|n.|課；班級
couldn't|aux.|不能（could not，can 的過去式否定）
finish|v.|完成
ha-ha|interj.|哈哈
hehuan|n.|合歡（Hehuan Mountain 合歡山）
hers|pron.|她的（東西）
hi|interj.|嗨
hou|n.|后（Hou Yi 后羿）
yi|n.|羿（Hou Yi 后羿）
hualien|n.|花蓮
japan|n.|日本
july|n.|七月
later|adv.|稍後
man|n.|男人
meant|v.|意思是（mean 的過去式）
much|adj.|許多的（修飾不可數名詞）
must|aux.|必須
nine|n.|九
ten|n.|十
two|n.|二
nothing|pron.|沒有東西
oh|interj.|喔
read|v.|閱讀
shoe|n.|鞋子
something|pron.|某事、某物
week|n.|星期
word|n.|字、單字
sapporo|n.|札幌（日本城市）
tokyo|n.|東京
amy|n.|人名
ivy|n.|人名
andy|n.|人名
ann|n.|人名
ben|n.|人名
eric|n.|人名
fay|n.|人名
jack|n.|人名
jenny|n.|人名
joe|n.|人名
joy|n.|人名
ken|n.|人名
kevin|n.|人名
leo|n.|人名
lily|n.|人名
lin|n.|人名
lucy|n.|人名
mark|n.|人名
max|n.|人名
mia|n.|人名
mr|n.|先生（Mr.）
ms|n.|女士（Ms.）
nina|n.|人名
ray|n.|人名
sue|n.|人名
ted|n.|人名
tim|n.|人名
tina|n.|人名
tom|n.|人名
wu|n.|人名
`;

/* 不需要標成生字的基本字 */
const STOP = new Set(("a an the and or but is am are was were be been i you he she it we they me him her us them my your his its our their " +
 "to of in on at for with from by this that these those do does did not no yes so am isn't aren't don't doesn't didn't wasn't weren't " +
 "i'm you're he's she's it's we're they're i'll you'll he'll she'll we'll they'll can't won't let's what where why if as all some any about " +
 "will would could should has have had having into i've you've we've they've hasn't haven't isn't rd th st nd am pm").split(/\s+/));

/* 不規則變化 → 原形 */
const IRREG = { was:"be", were:"be", went:"go", did:"do", had:"have", made:"make", gave:"give", sent:"send", got:"get", took:"take",
 came:"come", saw:"see", sang:"sing", ate:"eat", drew:"draw", rode:"ride", told:"tell", knew:"know", thought:"think", found:"find",
 left:"leave", lent:"lend", lost:"lose", shot:"shoot", fell:"fall", flew:"fly", began:"begin", bought:"buy", forgot:"forget",
 teeth:"tooth", children:"child", men:"man", women:"woman", people:"people", better:"good", got:"get", ran:"run", met:"meet", taught:"teach", broke:"break", slept:"sleep", woke:"wake", said:"say", heard:"hear", felt:"feel", kept:"keep", wrote:"write", are:"be", is:"be", am:"be", has:"have", been:"be", swam:"swim", sold:"sell", gone:"go", eaten:"eat", seen:"see", taken:"take", written:"write", ridden:"ride", known:"know", grown:"grow", gotten:"get", blew:"blow", chose:"choose", chosen:"choose", drove:"drive", drawn:"draw", given:"give", held:"hold", paid:"pay", rang:"ring", shook:"shake", spent:"spend", spoke:"speak", spoken:"speak", stolen:"steal", built:"build", broken:"break", bitten:"bite", feet:"foot", knives:"knife", wore:"wear", fed:"feed" };
