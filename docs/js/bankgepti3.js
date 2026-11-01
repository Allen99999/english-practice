/* ===== 全民英檢 中級：寫作（原創，照 LTTC 官方題型）
   第一部分 中譯英（40%）：把一段中文翻成通順、達意且前後連貫的英文
   第二部分 英文作文（60%）：依中文提示寫約 120 字（8～12 句），可一段或分段
   兩部分都是 0～5 級分（scoring.js 的 RUBRICS.it／ic）；寫作成績＝中譯英級分×20×40%＋作文級分×20×60%，80 分通過。
   這次沒有 AI 批改：學生看參考譯文／範文自評，老師在待批改依官方級分評分 ===== */
const IT_CHECK = ["每一句中文的意思都翻到了，沒有漏句", "時態一致（過去的經驗用過去式）", "用了連接詞讓句子前後連貫（However／In addition／As a result…）", "主詞和動詞一致、單複數正確", "拼字、標點、大小寫都檢查過"];
const IC_CHECK = ["提示裡的每一個問題都有回答到", "開頭有主題句，結尾有總結", "約 120 字、8～12 句", "用具體的例子或經驗支持想法", "句型有變化（because、when、if、關係代名詞…），文法拼字標點都檢查過"];
const WT = (id, tag, zh, model, exp) => ({ id, type: "essay", tag, gi: true, part: "trans", label: "中譯英", minWords: 40, check: IT_CHECK,
  prompt: "請將下面的中文翻譯成通順、達意且前後連貫的英文。", scenario: zh, model, exp, keywords: null });
const WC = (id, tag, zh, model, exp) => ({ id, type: "essay", tag, gi: true, part: "comp", label: "英文作文", minWords: 120, check: IC_CHECK,
  prompt: "請依下面的提示寫一篇英文作文，長度約 120 字（8 至 12 個句子）。作文可以是一個完整的段落，也可以分段。", scenario: zh, model, exp, keywords: null });

(() => {
const b = bank("gept-i");
b.range = "GEPT Intermediate 聽力＋閱讀＋寫作";
b.note = "依 2021 年起的新題型自編練習題（CEFR B1）：聽力＝看圖辨義、問答、簡短對話、簡短談話；閱讀＝詞彙、段落填空、閱讀理解（含多文本）；寫作＝中譯英、英文作文（自評＋老師依官方級分批改）。選「模擬段考」可以考照正式考試題數和時間出的完整考卷。";
Object.assign(b.tags, { w1: "寫作一・中譯英", w2: "寫作二・英文作文" });
b.exams.push({ name: "寫作測驗", tags: ["w1", "w2"] });
b.timeLimits.push([["w1", "w2"], 40]);
b.mock.push(["w1", 1], ["w2", 1]);
b.items.push(

/* ---------- 寫作一・中譯英 ---------- */
WT("t01","w1","上個週末我和家人去台東旅行。我們騎腳踏車沿著海邊騎了兩個小時，風景非常美。晚上我們住在一間小民宿，老闆還請我們吃他自己種的水果。這是我今年最難忘的一次旅行。",
  "Last weekend, my family and I took a trip to Taitung. We rode our bikes along the coast for two hours, and the scenery was very beautiful. At night, we stayed at a small B&B, and the owner even treated us to some fruit he had grown himself. It was the most unforgettable trip I have had this year.",
  "重點：take a trip to、ride along the coast、scenery（不可數）、treat sb. to sth.（請吃）、he had grown himself（過去完成式，種在請吃之前）、最高級 the most unforgettable。「民宿」可寫 B&B 或 guesthouse。"),
WT("t02","w1","很多學生每天花好幾個小時玩手機。他們常常因為熬夜而在課堂上打瞌睡。專家建議，睡前一小時最好把手機放在別的房間。這樣不但能睡得比較好，也能更專心讀書。",
  "Many students spend several hours on their phones every day. They often doze off in class because they stay up late. Experts suggest that it is best to put your phone in another room an hour before bed. This way, you can not only sleep better but also concentrate more on your studies.",
  "重點：spend + 時間 + on sth.、doze off（打瞌睡）、stay up late、suggest that...、not only... but also...（前後要對稱：sleep／concentrate）。"),
WT("t03","w1","我的祖母今年八十歲了，但她仍然非常健康。她每天早上都會到公園和朋友一起打太極拳。她常說，保持快樂的心情是長壽的秘訣。我希望我老的時候也能像她一樣。",
  "My grandmother is eighty years old this year, but she is still very healthy. Every morning, she goes to the park and practices tai chi with her friends. She often says that staying happy is the secret to a long life. I hope I can be like her when I get old.",
  "重點：still、practice tai chi、the secret to（to 是介系詞）、動名詞當主詞 Staying happy、when I get old（時間副詞子句用現在式表未來）。"),
WT("t04","w1","上個月我們班到一間老人院當志工。一開始我不知道要跟爺爺奶奶聊什麼，覺得很緊張。後來一位奶奶教我們摺紙，大家都玩得很開心。離開的時候，她拉著我的手，要我們下次一定要再來。",
  "Last month, my class volunteered at a nursing home. At first, I didn't know what to talk about with the elderly people, so I felt very nervous. Later, an old woman taught us how to fold paper, and we all had a great time. When we were leaving, she held my hand and asked us to come again next time.",
  "重點：volunteer 當動詞、nursing home（老人院）、didn't know what to + V、so 連接因果、how to fold paper、when 子句用過去進行式 were leaving、ask sb. to + V。"),
WT("t05","w1","台灣的夜市吸引了許多外國觀光客。在夜市裡，你可以吃到各種便宜又好吃的小吃，例如珍珠奶茶和蚵仔煎。除了美食之外，夜市裡還有很多有趣的遊戲。難怪夜市成為了台灣最受歡迎的景點之一。",
  "Night markets in Taiwan attract many foreign tourists. At night markets, you can taste all kinds of cheap and delicious snacks, such as bubble tea and oyster omelets. Besides food, there are also many interesting games. No wonder night markets have become one of the most popular attractions in Taiwan.",
  "重點：attract、all kinds of、such as、Besides（除了…之外還有）、No wonder...（難怪）、one of the + 最高級 + 複數名詞。"),
WT("t06","w1","我的弟弟非常喜歡動物。上個月，他在路邊發現一隻受傷的小狗，就把牠帶回家照顧。在他細心照顧下，小狗很快就恢復了健康。現在牠已經成為我們家的一份子了。",
  "My younger brother loves animals very much. Last month, he found an injured puppy on the side of the road and brought it home to take care of it. With his careful care, the puppy soon got well again. Now it has become a member of our family.",
  "重點：injured（受傷的）、take care of、With his careful care 也可寫 Thanks to his care、get well／recover、現在完成式 has become。"),
WT("t07","w1","很多人認為學英文最好的方法是到國外留學。然而，留學的費用非常高，不是每個人都負擔得起。其實，只要每天聽英文歌、看英文影片，在家也能把英文學好。最重要的是要持之以恆。",
  "Many people think that the best way to learn English is to study abroad. However, studying abroad is very expensive, and not everyone can afford it. In fact, as long as you listen to English songs and watch English videos every day, you can learn English well at home. The most important thing is to keep practicing.",
  "重點：the best way to V、However 後加逗號、afford（負擔得起）、as long as（只要）、持之以恆 = keep practicing／be persistent。"),
WT("t08","w1","昨天放學回家的路上突然下起大雨。我沒有帶傘，全身都濕透了。幸好一位好心的阿姨借我一把傘。我打算明天把傘還給她，並好好地向她道謝。",
  "On my way home from school yesterday, it suddenly started to rain heavily. I didn't bring an umbrella, so I got completely wet. Luckily, a kind woman lent me her umbrella. I plan to return it to her tomorrow and thank her properly.",
  "重點：on my way home、rain heavily、get wet／be soaked、lend（借出）的過去式 lent、return sth. to sb.。"),
WT("t09","w1","我們學校每年都會舉辦園遊會。每個班級都要準備一個攤位，賣食物或玩遊戲。今年我們班賣的是自己做的三明治，結果不到一個小時就全部賣完了。我們把賺到的錢捐給了一家孤兒院。",
  "Our school holds a school fair every year. Each class has to prepare a booth to sell food or run a game. This year, our class sold sandwiches that we made ourselves, and they were all sold out in less than an hour. We donated the money we earned to an orphanage.",
  "重點：hold a fair、Each class has（單數）、關係子句 sandwiches that we made ourselves、be sold out、in less than an hour、donate A to B。"),
WT("t10","w1","現在越來越多人選擇騎腳踏車上班。騎腳踏車不但可以運動，也不會造成空氣污染。不過，在車多的路上騎車可能很危險。政府應該建造更多的自行車道，讓大家可以安全地騎車。",
  "Nowadays, more and more people choose to ride bikes to work. Riding a bike is not only good exercise but also does not cause air pollution. However, it can be dangerous to ride on busy roads. The government should build more bike lanes so that people can ride safely.",
  "重點：more and more、動名詞主詞 Riding a bike is...、It can be dangerous to V、so that（讓…可以）、bike lane（自行車道）。"),
WT("t11","w1","我小時候很怕狗，因為曾經被一隻狗咬過。後來，我的鄰居養了一隻很溫和的狗。牠每次看到我都會搖尾巴。慢慢地，我不再害怕狗了，現在我甚至想自己養一隻。",
  "When I was little, I was afraid of dogs because I had been bitten by one. Later, my neighbor got a very gentle dog. Every time it saw me, it would wag its tail. Gradually, I stopped being afraid of dogs, and now I even want to have one of my own.",
  "重點：過去完成式被動 had been bitten、Every time + 子句、would（過去習慣）、wag its tail、stop being afraid、one of my own。"),
WT("t12","w1","上星期我們班去參觀了一間科學博物館。館裡有許多可以親自動手操作的展覽，讓學習變得很有趣。我最喜歡的是太空區，在那裡可以體驗在月球上走路的感覺。我希望以後還有機會再去。",
  "Last week, our class visited a science museum. There were many hands-on exhibits that made learning a lot of fun. My favorite part was the space area, where we could experience what it feels like to walk on the moon. I hope I'll have a chance to go there again.",
  "重點：hands-on exhibits（可動手操作的展覽）、make learning fun、關係副詞 where、what it feels like to V、have a chance to V。"),
WT("t13","w1","為了減少垃圾，很多人開始自備購物袋和環保杯。一開始大家都覺得很麻煩，但現在已經變成一種習慣。如果每個人都願意改變一點點，我們的地球就會變得更乾淨。",
  "To reduce waste, many people have started to bring their own shopping bags and reusable cups. At first, everyone thought it was troublesome, but now it has become a habit. If everyone is willing to change a little, our planet will become cleaner.",
  "重點：To reduce...（為了）、reusable cup（環保杯）、At first、troublesome／a hassle、if 子句用現在式、will become。"),
WT("t14","w1","我的好朋友下個月就要搬到美國了。我們從小學就認識，幾乎每天都在一起。雖然我很難過，但我知道我們可以透過網路保持聯絡。我打算送她一本相簿，裡面放滿我們的合照。",
  "My best friend is moving to the United States next month. We have known each other since elementary school and have spent almost every day together. Although I feel sad, I know we can keep in touch on the internet. I plan to give her a photo album full of pictures of us.",
  "重點：is moving（已安排的未來）、have known each other since...（現在完成式）、keep in touch、a photo album full of...。"),
WT("t15","w1","許多上班族因為工作太忙而沒有時間吃早餐。然而，醫生說早餐是一天中最重要的一餐。不吃早餐的人比較容易感到疲倦，也比較不容易專心。所以，再忙也要記得吃早餐。",
  "Many office workers don't have time to eat breakfast because they are too busy with work. However, doctors say that breakfast is the most important meal of the day. People who skip breakfast tend to feel tired more easily and find it harder to concentrate. Therefore, no matter how busy you are, remember to eat breakfast.",
  "重點：office workers（上班族）、be busy with、skip breakfast、tend to、find it harder to V、no matter how busy you are（再忙也…）。"),
WT("t16","w1","上個月我參加了一場英語演講比賽。上台前我非常緊張，手一直在發抖。不過，當我開始演講後，就慢慢地放鬆了。最後我得到第二名，老師說我的發音進步了很多。",
  "Last month, I took part in an English speech contest. Before I went on stage, I was so nervous that my hands kept shaking. However, after I started my speech, I gradually relaxed. In the end, I won second place, and my teacher said my pronunciation had improved a lot.",
  "重點：take part in、so... that...、keep + V-ing、gradually、win second place、間接引述時態後移 had improved。"),
WT("t17","w1","現在很多人喜歡在網路上買東西，因為既方便又便宜。但是網路購物也有缺點，例如看不到商品的實際樣子。有時候收到的東西和照片差很多。因此，買東西之前最好先看看別人的評價。",
  "Nowadays, many people like to shop online because it is convenient and cheap. However, online shopping also has disadvantages. For example, you can't see what the products really look like. Sometimes the things you receive are very different from the pictures. Therefore, it's better to read other people's reviews before you buy anything.",
  "重點：shop online、disadvantage、what the products look like（間接問句）、be different from、it's better to V、review（評價）。"),
WT("t18","w1","我的夢想是成為一名獸醫。我從小就喜歡照顧小動物，看到牠們生病時總是很難過。為了實現夢想，我每天都很努力地讀書，特別是生物和化學。我相信只要努力，夢想一定會成真。",
  "My dream is to become a vet. I have loved taking care of small animals since I was a child, and I always feel sad when I see them sick. To make my dream come true, I study hard every day, especially biology and chemistry. I believe that as long as I work hard, my dream will come true.",
  "重點：vet／veterinarian（獸醫）、have loved... since...、see them sick、To make my dream come true、especially、as long as。"),
WT("t19","w1","颱風過後，我們社區有很多倒下的樹和垃圾。星期六早上，許多居民主動出來幫忙打掃。大家分工合作，不到中午街道就恢復乾淨了。這次經驗讓我感受到鄰居之間的溫暖。",
  "After the typhoon, there were many fallen trees and a lot of trash in our neighborhood. On Saturday morning, many residents came out to help clean up on their own. Everyone worked together, and the streets were clean again before noon. This experience made me feel the warmth between neighbors.",
  "重點：fallen trees、trash（不可數，a lot of trash）、residents、on their own（主動）、work together、make me feel。"),
WT("t20","w1","學校規定學生上課時不能使用手機。有些學生認為這個規定太嚴格，因為手機可以用來查資料。但是老師擔心學生會用手機玩遊戲而不專心上課。我認為應該在需要時才讓學生使用手機。",
  "Our school has a rule that students cannot use their phones in class. Some students think the rule is too strict because phones can be used to look up information. However, teachers worry that students will play games on their phones instead of paying attention in class. I think students should be allowed to use their phones only when necessary.",
  "重點：a rule that...（同位語子句）、be used to V（被用來）、look up information、instead of + V-ing、be allowed to、only when necessary。"),

/* ---------- 寫作二・英文作文（約 120 字） ---------- */
WC("c01","w2","你最近一次幫助別人（或被別人幫助）是什麼時候？請寫一篇短文：(1) 說明當時發生了什麼事；(2) 這件事給你什麼感受或啟發。",
  "Last month, I helped an old man at the MRT station. He was carrying two heavy bags and looked very tired, so I offered to carry one of them for him. While we were walking to the exit, he told me that he was going to visit his grandson, who had just been born. He kept thanking me and even gave me a piece of candy before we said goodbye.\n\nThis small event taught me an important lesson. Helping others does not have to be something big. A few minutes of my time made a stranger's day easier, and it also made me feel happy for the whole afternoon. From now on, I will pay more attention to people around me who might need a hand.",
  "結構：第一段寫事情經過（時間、地點、人物、做了什麼），第二段寫感受與啟發。範文用了 offer to V、While...、關係代名詞 who、does not have to be、From now on 等句型；全文約 130 字。"),
WC("c02","w2","有人認為國中生、高中生應該打工賺錢，也有人認為學生應該專心讀書。你的看法是什麼？請提出至少兩個理由支持你的意見。",
  "In my opinion, high school students should not have part-time jobs during the school year. There are two main reasons.\n\nFirst, studying is already a full-time job for students. We have classes from morning to late afternoon, and we still need time for homework and tests. If students work several hours after school, they will feel tired and their grades may drop.\n\nSecond, students need time to develop other interests. Joining a club, playing sports, or reading for fun can help us find out what we are good at. These experiences are just as valuable as money.\n\nHowever, I think working during summer vacation is a good idea, because it can teach us responsibility without hurting our studies.",
  "議論文：開頭表明立場 → First／Second 兩個理由各有細節 → 最後用 However 補充讓步，顯示思考周全。約 130 字。"),
WC("c03","w2","請寫一封 email 給你的外國筆友 Jamie，介紹一個你最喜歡的台灣節日：(1) 這個節日在什麼時候、大家會做什麼；(2) 你自己最喜歡這個節日的哪一部分，為什麼。",
  "Dear Jamie,\n\nThanks for telling me about Thanksgiving in your country. Now let me tell you about my favorite Taiwanese holiday, the Lunar New Year. It usually comes in January or February. Before the holiday, every family cleans the house to sweep away bad luck. On New Year's Eve, family members get together for a big dinner, and children receive red envelopes with money inside.\n\nMy favorite part is the dinner on New Year's Eve. My grandmother cooks more than ten dishes, and my cousins and I play card games until midnight. It is the only time of the year when everyone in my big family is in the same place.\n\nI hope you can visit Taiwan during the Lunar New Year someday!\n\nBest wishes,\nAmy",
  "書信格式：稱呼（Dear Jamie,）→ 開頭回應對方 → 兩個提示各一段 → 結尾祝福與署名。用了 to sweep away、關係副詞 when、the only time 等。"),
WC("c04","w2","很多人每天都離不開手機。請寫一篇短文：(1) 說明手機為你的生活帶來哪些方便；(2) 說明使用手機可能造成的問題，以及你會怎麼做。",
  "Smartphones have made my life much more convenient. With my phone, I can check the bus schedule, look up new words, and talk to my friends anytime. When I travel, I use maps on my phone so that I never get lost. I can even pay for snacks at the convenience store without carrying cash.\n\nHowever, using phones too much can cause problems. Last year, I often played games until midnight, so I felt sleepy in class the next day. My eyes also became tired easily. To solve these problems, I now turn off my phone at ten every night and put it outside my bedroom. I also take a short break every thirty minutes. Phones are useful tools, but we should be their masters, not their slaves.",
  "兩段對應兩個提示；第二段先說問題、再說自己的做法（To solve these problems, I...）。結尾用一句有力的總結。約 140 字。"),
WC("c05","w2","請描述一位對你影響很大的人（家人、老師或朋友都可以）：(1) 他／她是個什麼樣的人；(2) 他／她如何影響了你。",
  "The person who has influenced me most is my homeroom teacher in junior high school, Ms. Lin. She was strict about rules, but she was also very caring. She remembered every student's birthday and always noticed when someone looked unhappy.\n\nWhen I was in eighth grade, my grades dropped because my parents were having problems at home. Instead of scolding me, Ms. Lin talked with me after class and helped me make a study plan. She also told me that difficult times would not last forever. Thanks to her, I slowly got back on track and passed the high school entrance exam.\n\nBecause of Ms. Lin, I want to become a teacher in the future, so that I can help students the way she helped me.",
  "人物描寫：先寫個性（用具體行為證明，不只寫形容詞）→ 一件影響你的事 → 結果與未來。約 135 字。"),
WC("c06","w2","你的學校打算把一部分的操場改建成停車場。請寫一封信給校長，表達你的看法：(1) 你贊成或反對，為什麼；(2) 提出一個建議。",
  "Dear Principal,\n\nI am writing to express my concern about the plan to turn part of our sports field into a parking lot. I am against this plan for two reasons.\n\nFirst, the sports field is the only place where students can exercise and relax between classes. If it becomes smaller, many students will have no space to play basketball or run during breaks. Second, more cars on campus will bring more noise and make the school less safe for students.\n\nInstead of building a parking lot, I suggest that the school work with the nearby shopping center, which has many empty parking spaces on weekdays. Teachers could park there and walk to school in five minutes.\n\nThank you for considering my opinion.\n\nSincerely,\nKevin Chang, Class 2-3",
  "正式書信：I am writing to...開頭說明目的 → 立場＋兩個理由 → 具體可行的建議（I suggest that the school work...，suggest 後的子句用原形動詞）→ 有禮貌的結尾。"),
WC("c07","w2","請寫一篇短文，描述一次讓你印象深刻的失敗經驗：(1) 當時發生了什麼事；(2) 你從中學到了什麼。",
  "I still remember the day I lost the school swimming race in seventh grade. I had practiced for months, and everyone thought I would win. However, I was so nervous that I jumped into the water before the whistle. Because of the false start, I was not allowed to finish the race. I cried in the locker room for a long time.\n\nLater, my coach told me that losing was part of every athlete's life. What mattered was what I did next. After that, I practiced not only swimming but also staying calm before races, such as taking deep breaths. A year later, I won the same race. That failure taught me that mistakes can make us stronger if we learn from them.",
  "記敘＋反思：經過要有細節（so... that...、Because of...），反思段用 What mattered was...、not only... but also...、if 子句。約 140 字。"),
WC("c08","w2","如果你有一整天完全自由的時間，而且不用花錢，你會怎麼安排這一天？請說明你的計畫與理由。",
  "If I had a whole free day without spending any money, I would spend it outdoors with my family.\n\nIn the morning, I would wake up early and ride my bike to the riverside park with my younger sister. The air is fresh in the morning, and we could watch the sunrise together. Around noon, we would have a picnic with sandwiches we made at home. In the afternoon, I would borrow some books from the library and read under a big tree.\n\nIn the evening, I would cook dinner for my parents, because they work hard every day and rarely have time to rest. This kind of day costs nothing, but it would make everyone in my family relaxed and happy. To me, time with family is more valuable than anything money can buy.",
  "假設語氣：If I had..., I would...，全文的 would 要一致。依時間（morning／noon／afternoon／evening）安排，每個活動附理由。約 145 字。"),
WC("c09","w2","網路上的資訊很多，但有些是假的。請寫一篇短文：(1) 舉例說明假消息可能造成什麼問題；(2) 我們可以怎麼分辨資訊的真假。",
  "There is a huge amount of information on the internet, but not all of it is true. Fake news can cause serious problems. For example, last year a message said that a typhoon would hit our city and all stores would close for a week. Many people believed it and rushed to the supermarket, so there was no rice or water left for others. In the end, the typhoon never came.\n\nTo avoid being fooled, we can do a few simple things. First, we should check who wrote the information and whether it comes from a reliable source, such as a government website or a major newspaper. Second, we can search for the same news on other websites. Most importantly, we should think twice before sharing anything online.",
  "說明文：先用具體例子說明危害，再用 First／Second／Most importantly 提出方法。whether 引導名詞子句、to avoid being fooled（被動動名詞）。約 140 字。"),
WC("c10","w2","請介紹你家附近一個你很喜歡的地方（例如公園、小吃店、書店）：(1) 它在哪裡、是什麼樣子；(2) 你為什麼喜歡去那裡。",
  "My favorite place in my neighborhood is a small bookstore called Moon Books. It is on a quiet street just five minutes' walk from my home. The store is not big, but it has wooden shelves full of books, a few comfortable chairs, and a cat named Lucky who often sleeps by the window.\n\nI love going there for several reasons. First, the owner lets customers read books for free, so I can spend a whole afternoon there without spending much money. Second, the owner always recommends interesting books to me, and many of them have become my favorites. Most of all, the bookstore is so peaceful that I can forget about tests and stress. To me, Moon Books is like a second home.",
  "描寫地點：位置 → 外觀（具體物件）→ 喜歡的理由（First／Second／Most of all）→ 一句總結。約 130 字。"),
WC("c11","w2","網路上有很多人拍短影片分享讀書方法或生活小技巧。請寫一篇短文說明：(1) 你常看這類影片嗎？它們對你有什麼幫助或壞處？(2) 如果你要拍一支短影片分享給同學，你會分享什麼內容？為什麼？",
  "Many people share short videos about study tips and daily life online, and I watch them almost every day.\n\nThese videos are helpful because they are short and easy to understand. For example, I learned a useful way to remember English words from a two-minute video, and my test scores improved. However, they can also waste a lot of time. Once I start watching, I often keep scrolling for an hour without noticing.\n\nIf I made a video for my classmates, I would share how I plan my week with a simple notebook. Many of my friends say they never have enough time, but planning helps me finish my homework early and still have time to relax. I believe this small habit could help them, too.",
  "兩個問題各一段：先說幫助（舉自己的例子）再說壞處（However 轉折），第二段用 If I made…, I would…（與現在事實相反的假設）。約 140 字。"),
WC("c12","w2","你的班上要選一個地方去畢業旅行。請寫一篇短文推薦一個地點：(1) 說明你推薦哪裡；(2) 說明至少兩個理由，說服同學選擇這個地方。",
  "I would like to suggest Hualien as the place for our graduation trip.\n\nFirst, Hualien has some of the most beautiful scenery in Taiwan. We can hike in Taroko Gorge, where there are high cliffs and clear rivers. We can also ride bikes along the coast and watch the waves of the Pacific Ocean. These are experiences we can't have in the city.\n\nSecond, the trip would not be too expensive. It takes only about two hours to get there by train, and there are many cheap guesthouses that welcome student groups. Besides, the night market in Hualien has lots of tasty local food at low prices.\n\nI believe a trip to Hualien would be relaxing, fun, and unforgettable for everyone. Let's go there together!",
  "說服文：開頭直接提出建議 → 兩個理由（景點特色、費用交通）各有具體細節 → 結尾呼籲。用了 關係副詞 where、It takes... to V、Besides。約 140 字。")
);
})();
