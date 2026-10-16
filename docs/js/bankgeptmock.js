/* ===== 全民英檢 初級：正式考模擬卷（原創，題型、題數、順序照正式考試）
   初試＝聽力 30 題（約 20 分鐘）＋閱讀 30 題（35 分鐘）；複試寫作＝單句寫作 15 題＋段落寫作 1 題（40 分鐘）
   每份是固定的一整卷（fixed），聽讀部分用正式考模式（blind：不顯示對錯、聽力只播一遍） ===== */
const GEPT_MOCK_TAGS = {
  l1: "聽力一・看圖辨義", l2: "聽力二・問答", l3: "聽力三・簡短對話", l4: "聽力四・短文聽解",
  r1: "閱讀一・詞彙", r2: "閱讀二・段落填空", r3: "閱讀三・閱讀理解",
  w1: "寫作一・句子改寫", w2: "寫作一・句子合併", w3: "寫作一・重組", w4: "寫作二・段落寫作"
};
function geptMock(n, items) {
  const LR = ["l1", "l2", "l3", "l4", "r1", "r2", "r3"], W = ["w1", "w2", "w3", "w4"];
  const b = {
    id: "gept-m" + n, grade: 11, fixed: true, blind: LR, hidden: true,   // 不單獨列在首頁：在「全民英檢 初級」的模擬段考裡選
    title: "全民英檢初級・模擬卷 " + n,
    range: "初試 聽力 30＋閱讀 30・複試 寫作 16",
    added: "2026-10-17",
    note: "",
    exams: [{ name: "初試：聽力＋閱讀（55 分鐘）", tags: LR }, { name: "複試：寫作（40 分鐘）", tags: W }],
    timeLimits: [[["l1", "l2", "l3", "l4"], 20], [["r1", "r2", "r3"], 35], [W, 40]],
    tags: GEPT_MOCK_TAGS,
    items
  };
  BANKS.push(b);
  listenImages(b);
  b.items.forEach(it => { if (it.type === "essay" && it.scenes) it.img = `img/${b.id}-${it.id}.png`; });
}

/* 「全民英檢 初級」選模擬段考時，可以選這三份正式考卷 */
bank("gept-e").mockPapers = ["gept-m1", "gept-m2", "gept-m3"];
bank("gept-e").officialLinks = [["GEPT i學網（官方題庫，免費註冊）", "https://www.lttc.ntu.edu.tw/tw/gept_iprep"], ["官網初級練習題", "https://www.gept.org.tw/2022/geptpracticee.htm"]];

/* ================================ 模擬卷 1 ================================ */
geptMock(1, [
/* 聽力一・看圖辨義 */
L("l01","l1",1,["What is the woman doing?"],["She is painting a picture.","She is taking a photo.","She is writing a letter."],0,"","女士站在畫架前畫畫。","A woman is painting a picture on an easel in a park."),
L("l02","l1",1,["Where are the books?"],["They are on the chair.","They are on the shelf.","They are in the bag."],1,"","書排在書架上。","Several books standing on a bookshelf. An empty chair and a closed bag are next to the shelf."),
L("l03","l1",1,["What is the boy wearing?"],["A T-shirt and shorts.","A sweater and jeans.","A raincoat and boots."],2,"","男孩穿雨衣和雨靴。","A boy wearing a raincoat and rain boots is standing in the rain."),
L("l04","l1",1,["What are the people doing?"],["They are having dinner.","They are watching a movie.","They are singing songs."],0,"","一家人圍著餐桌吃晚餐。","A family of four is having dinner together at a dining table."),
L("l05","l1",1,["How does the girl go to school?"],["She walks.","She rides a bike.","She takes a taxi."],1,"","女孩騎腳踏車上學。","A girl with a backpack is riding a bicycle toward a school building."),
/* 聽力二・問答 */
L("l06","l2",2,["M: What's your favorite subject?"],["I like science best.","I'm in the eighth grade.","My teacher is Mr. Lin."],0,"","問最喜歡的科目。"),
L("l07","l2",2,["W: Can you come to my party on Friday?"],["I'd love to. What time?","It was a great party.","Yes, I came on Friday."],0,"","接受邀請並問時間。"),
L("l08","l2",2,["M: Whose turn is it to clean the classroom?"],["It's Leo's turn today.","The classroom is clean.","I turned left."],0,"","問輪到誰。"),
L("l09","l2",2,["W: How was the weather in Hualien?"],["It was sunny and warm.","I went there by train.","It's in eastern Taiwan."],0,"","問天氣。"),
L("l10","l2",2,["M: Excuse me, you dropped your wallet."],["Oh, thank you so much!","No, it's not expensive.","You're welcome."],0,"","別人提醒你掉了東西 → 道謝。"),
L("l11","l2",2,["W: How many people are there in your family?"],["There are five.","They are very kind.","We live in Taoyuan."],0,"","How many 問數量。"),
L("l12","l2",2,["M: Shall we take a taxi or the bus?"],["Let's take the bus. It's cheaper.","Yes, we shall.","The taxi is yellow."],0,"","二選一的問題。"),
L("l13","l2",2,["W: I can't find my pencil case."],["Here, you can use my pen.","It's a nice pencil case.","Yes, I can find it."],0,"","找不到鉛筆盒 → 借她筆。"),
L("l14","l2",2,["M: What did you have for breakfast?"],["A sandwich and some milk.","At seven o'clock.","I'm not hungry now."],0,"","問早餐吃什麼。"),
L("l15","l2",2,["W: The test was so hard."],["I agree. I didn't finish it.","Yes, it's very easy.","I'll take the test."],0,"","附和對方。"),
/* 聽力三・簡短對話 */
L("l16","l3",3,["W: Are you going to the bookstore after school?","M: No, I'm going to the dentist. I have a toothache.","Where is the man going after school?"],["To the dentist.","To the bookstore.","To school."],0,"","He's going to the dentist."),
L("l17","l3",3,["M: These shoes are nice. How much are they?","W: They're nine hundred dollars, but today everything is twenty percent off.","M: Great. I'll take them.","Why will the man buy the shoes today?"],["They are cheaper today.","They are his favorite color.","His old shoes are broken."],0,"","今天打八折。"),
L("l18","l3",3,["W: Did you watch the baseball game last night?","M: No, I had to study for my English test. Who won?","W: Taiwan won, five to three.","What did the man do last night?"],["He studied.","He watched a game.","He played baseball."],0,"","他昨晚要讀英文。"),
L("l19","l3",3,["M: What would you like, ma'am?","W: A cup of hot coffee and a piece of chocolate cake, please.","M: Anything else?","W: No, that's all.","What does the woman order?"],["Coffee and cake.","Tea and cake.","Coffee and cookies."],0,"","hot coffee and chocolate cake。"),
L("l20","l3",3,["W: Hurry up, Tim! The movie starts at two.","M: It's only one fifteen. We have forty-five minutes.","What time is it now?"],["One fifteen.","Two o'clock.","One forty-five."],0,"","It's only one fifteen."),
L("l21","l3",3,["M: My little brother broke my model airplane.","W: Oh no. Can you fix it?","M: I'll try, but I think I need a new one.","What happened to the man's model airplane?"],["His brother broke it.","He lost it.","He gave it away."],0,"","弟弟弄壞了。"),
L("l22","l3",3,["W: Excuse me. Where can I find the restroom?","M: Go up to the second floor. It's next to the elevator.","Where is the restroom?"],["On the second floor.","On the first floor.","Next to the stairs."],0,"","二樓電梯旁。"),
L("l23","l3",3,["M: You look different today, Amy.","W: I had my hair cut yesterday. Do you like it?","M: Yes, it looks great.","What did Amy do yesterday?"],["She got a haircut.","She bought new glasses.","She went shopping."],0,"","I had my hair cut.（剪頭髮）"),
L("l24","l3",3,["W: How often do you visit your grandparents?","M: Once a month. They live in Pingtung, so it takes a long time to get there.","How often does the man visit his grandparents?"],["Once a month.","Once a week.","Every day."],0,"","Once a month."),
L("l25","l3",3,["M: I'm calling to ask about the bike I left at your shop.","W: It's ready. You can come and get it after three o'clock.","What will the man probably do this afternoon?"],["Pick up his bike.","Buy a new bike.","Ride to school."],0,"","腳踏車修好了，三點後去拿。"),
/* 聽力四・短文聽解 */
L("l26","l4",4,["Jason loves animals. He has a dog and two cats at home. Next year, he wants to get a turtle, too.","What pet does Jason want to get next year?"],["一隻烏龜","一隻狗","一隻貓"],0,"","明年想養烏龜 → (A)。","Panel A: a turtle. Panel B: a dog. Panel C: a cat."),
L("l27","l4",4,["Good afternoon, shoppers. Today only, all fruit is half price. Come to the fruit area near the door and get some fresh apples and bananas!","Where can you hear this?"],["學校教室","超市","醫院"],1,"","shoppers、水果半價 → 超市 (B)。","Panel A: a school classroom with desks and a blackboard. Panel B: a supermarket with fruit shelves and shopping carts. Panel C: a hospital room with a bed and a nurse."),
L("l28","l4",4,["Every Sunday, my family cleans the house together. My father washes the windows, my mother cleans the kitchen, and I take out the trash.","What does the speaker do on Sundays?"],["擦窗戶","打掃廚房","倒垃圾"],2,"","我負責倒垃圾 → (C)。","Panel A: a man washing windows. Panel B: a woman cleaning a kitchen counter. Panel C: a child carrying a trash bag out of the house."),
L("l29","l4",4,["This morning it was sunny, so I wore shorts and a T-shirt. But in the afternoon it suddenly got cold and windy. I wished I had a jacket.","What did the speaker wish to have?"],["外套","短褲","帽子"],0,"","I wished I had a jacket → (A)。","Panel A: a jacket. Panel B: a pair of shorts. Panel C: a cap."),
L("l30","l4",4,["Hello, everyone. Our school band will play in the school hall this Friday evening at seven. Come and enjoy the music with your family!","What will happen this Friday evening?"],["籃球比賽","樂團表演","電影欣賞"],1,"","學校樂團演奏 → (B)。","Panel A: students playing a basketball game in a gym. Panel B: a school band playing instruments on a stage. Panel C: an audience watching a movie on a big screen."),
/* 閱讀一・詞彙 */
M("r01","r1","My mom asked me to ___ the dishes after dinner.",["wash","cook","eat","buy"],0,"","wash the dishes = 洗碗。"),
M("r02","r1","It's raining. Take an ___ with you.",["umbrella","eraser","orange","example"],0,"","下雨帶雨傘。"),
M("r03","r1","Tina is very ___. She always helps her classmates.",["kind","lazy","shy","angry"],0,"","總是幫助同學 → kind。"),
M("r04","r1","We need to ___ quickly, or we'll miss the train.",["hurry","wait","rest","sleep"],0,"","hurry = 趕快。"),
M("r05","r1","Excuse me. Is there a bank ___ here?",["near","far","between","under"],0,"","near here = 這附近。"),
M("r06","r1","I ___ my homework already. Can I watch TV now?",["have finished","finish","will finish","am finishing"],0,"","already → 現在完成式。"),
M("r07","r1","The store opens ___ 9 a.m. every day.",["at","on","in","for"],0,"","時刻用 at。"),
M("r08","r1","This bag is ___ than that one. I'll buy this one.",["cheaper","cheap","cheapest","the cheaper"],0,"","than → 比較級。"),
M("r09","r1","Ben: Do you mind if I open the window?\nAmy: ___",["No, go ahead.","Yes, please open it.","Sure, I mind.","Thank you very much."],0,"","Do you mind ...? 表示不介意要回答 No。"),
M("r10","r1","Mr. Lin ___ to work by car every day, but today he took the MRT.",["drives","drove","is driving","will drive"],0,"","every day → 現在簡單式。"),
/* 閱讀二・段落填空 */
G("r11","r2","cloze","A Rainy Saturday",[
  "Last Saturday, I planned to go hiking with my friends. But when I woke up, it was raining [[1]]. We had to change our plan. We went to Andy's house [[2]]. We played board games and made pizza together. [[3]] Andy's mom said our pizza looked funny, but it tasted great. It was a rainy day, but we [[4]] a lot of fun."
],[["board game","桌遊"]],[
  B("r11a",1,["hard","hardly","high","heavy"],0,"","rain hard = 雨下得很大（副詞）。"),
  B("r11b",2,["instead","too","either","again"],0,"","改去 Andy 家 → instead（反而、改為）。"),
  B("r11c",3,["None of us had made pizza before.","Andy's house is far from mine.","The weather was sunny and hot.","We didn't eat anything."],0,"","接著說披薩看起來很好笑 → 我們都沒做過披薩，最連貫。"),
  B("r11d",4,["had","made","took","got to"],0,"","have fun = 玩得開心。")
]),
G("r12","r2","cloze","Our Class Pet",[
  "Our class has a pet fish. His name is Bubbles. Every day, one student [[1]] care of him. We feed him twice a day and clean his tank [[2]] Friday. Last week, Bubbles didn't eat anything for two days, and we were very [[3]]. Our teacher took him to an animal doctor. [[4]] Now he is healthy and happy again."
],[["tank","魚缸"],["feed","餵"]],[
  B("r12a",1,["takes","take","took","taking"],0,"","one student 第三人稱單數 → takes。"),
  B("r12b",2,["every","each other","all","both"],0,"","every Friday = 每週五。"),
  B("r12c",3,["worried","excited","bored","proud"],0,"","魚兩天不吃東西 → 擔心。"),
  B("r12d",4,["The doctor gave him some medicine.","The doctor didn't like fish.","Bubbles swam away.","We bought a new pet dog."],0,"","看醫生 → 醫生給藥，後面才會恢復健康。")
]),
/* 閱讀三・閱讀理解 */
G("r13","r3","notice","Sunny Day Water Park",[
  "Open: June 1 – September 30, 9:00 a.m. – 6:00 p.m.",
  "Tickets: Adults $500 / Children (3–12) $300 / Under 3: Free",
  "Family ticket (2 adults + 2 children): $1,400",
  "• No food from outside.",
  "• Everyone must wear a swimsuit in the water."
],[["swimsuit","泳衣"]],[
  Q("r13a","Mr. and Mrs. Wang want to go with their two kids, ages 6 and 9. How much will they save with a family ticket?",["$200.","$100.","$300.","$0."],0,"","分開買：500×2 + 300×2 = 1,600；家庭票 1,400 → 省 200。"),
  Q("r13b","When can people NOT go to the water park?",["In December.","In July.","On a Sunday in August.","At 10 a.m. in June."],0,"","只在 6 月 1 日到 9 月 30 日開放。"),
  Q("r13c","Which is NOT allowed at the water park?",["Bringing your own lunch.","Wearing a swimsuit.","Bringing a two-year-old child.","Swimming in the afternoon."],0,"","No food from outside → 不能帶自己的午餐。")
]),
G("r14","r3","article","Helping at the Animal Shelter",[
  "Every Saturday morning, fourteen-year-old Ella goes to an animal shelter near her home. The shelter takes care of dogs and cats that don't have homes.",
  "Ella feeds the animals, cleans their cages, and takes the dogs for walks. \"The work is tiring, but I love it,\" she says. Her favorite dog is Lucky, a big black dog with only three legs. Lucky was hit by a car two years ago.",
  "Last month, a family came and took Lucky home. Ella cried a little, but she was happy for him. \"Every animal should have a family,\" she says."
],[["shelter","收容所"],["cage","籠子"],["tiring","累人的"]],[
  Q("r14a","What is an animal shelter?",["A place for animals without homes.","A shop that sells pets.","A hospital for people.","A zoo for wild animals."],0,"","takes care of dogs and cats that don't have homes。"),
  Q("r14b","What do we know about Lucky?",["He has three legs.","He is a small white dog.","He belongs to Ella.","He was born at the shelter."],0,"","a big black dog with only three legs。"),
  Q("r14c","How did Ella feel when Lucky left?",["Both sad and happy.","Only angry.","Very bored.","Not interested."],0,"","哭了一下，但替他開心。")
]),
G("r15","r3","article","Two Notes on the Fridge",[
  "【Note 1】 Kids, I went to the hospital to visit Aunt Mei. I'll be back at 8. Dinner is in the fridge. Please feed the cat. — Mom",
  "【Note 2】 Mom, we ate dinner and fed the cat. Jim is at his piano lesson until 9. I'm at the library to return some books. I'll be home by 8:30. — Kate"
],[["return","歸還"]],[
  Q("r15a","Why did Mom go out?",["To see Aunt Mei in the hospital.","To buy dinner.","To take Jim to his piano lesson.","To go to the library."],0,"","visit Aunt Mei at the hospital。"),
  Q("r15b","Who wrote Note 2?",["Kate.","Mom.","Jim.","Aunt Mei."],0,"","署名 Kate。"),
  Q("r15c","When Mom gets home at 8, who will be at home?",["Nobody.","Kate.","Jim.","Kate and Jim."],0,"","Jim 的鋼琴課上到 9 點，Kate 8:30 才回家 → 8 點時沒有人在家。")
]),
G("r16","r3","dialogue","Planning a Trip",[
  "Joy: Let's go to Tainan during the holiday!",
  "Max: Good idea. Should we take the high-speed train?",
  "Joy: It's fast, but it's expensive. The bus takes four hours, but it's only $400.",
  "Max: Four hours is too long. How about the regular train? It takes about three hours and costs $600.",
  "Joy: OK. Let's take the regular train, then."
],[["high-speed train","高鐵"],["regular train","台鐵火車"]],[
  Q("r16a","How will Joy and Max go to Tainan?",["By regular train.","By high-speed train.","By bus.","By car."],0,"","最後決定搭台鐵。"),
  Q("r16b","Why didn't Max want to take the bus?",["It takes too long.","It's too expensive.","He gets carsick.","There are no buses."],0,"","Four hours is too long."),
  Q("r16c","How much will one regular train ticket cost?",["$600.","$400.","$1,000.","$300."],0,"","costs $600。")
]),
/* 寫作一・句子改寫 */
RW("w01","w1","Nancy is cooking dinner in the kitchen.","改成疑問句","Is Nancy",["Is Nancy cooking dinner in the kitchen?"],"","be 動詞移到句首。"),
RW("w02","w1","My brother plays the guitar.","改成否定句","My brother",["My brother {doesn't|does not} play the guitar."],"","doesn't + 原形動詞。"),
RW("w03","w1","We go to the beach every summer.","把 every summer 改成 last summer","We",["We went to the beach last summer."],"","go → went。"),
RW("w04","w1","The children planted the trees.","改成被動語態","The trees",["The trees were planted by the children."],"","be + p.p. + by ...。"),
RW("w05","w1","Paul has lived here for ten years.","針對 for ten years 改成疑問句","How long",["How long has Paul lived here?"],"","問「多久」→ How long has Paul lived here?"),
/* 寫作一・句子合併 */
RW("w06","w2",["I called you.","You were taking a shower."],"用 when 合併","I called you",["I called you when you were taking a shower."],"","When + 過去進行式。"),
RW("w07","w2",["Jane is smart.","Jane is beautiful."],"用 not only ... but also ... 合併","Jane is",["Jane is not only smart but also beautiful."],"","not only A but also B。"),
RW("w08","w2",["The pen is mine.","The pen is on the desk."],"用 that 合併","The pen",["The pen {that|which} is on the desk is mine."],"","that 子句修飾 the pen。"),
RW("w09","w2",["Do you know?","When will the concert start?"],"合併成一句（間接問句）","Do you know",["Do you know when the concert will start?"],"","疑問詞 + 主詞 + 動詞。"),
RW("w10","w2",["It was very late.","We still didn't go to bed."],"用 Although 合併","Although",["Although it was very late, we still didn't go to bed.","Although it was very late, we still did not go to bed."],"","Although 不和 but 一起用。"),
/* 寫作一・重組 */
R("w11","w3","",["Could you","show me","how","to use","this machine?"],"","how to + 原形動詞。","Could you show me how to use this machine?"),
R("w12","w3","",["There","are","many","people","in the park today."],"","There are + 複數名詞。","There are many people in the park today."),
R("w13","w3","",["He","is","good at","playing","basketball."],"","be good at + V-ing。","He is good at playing basketball."),
R("w14","w3","",["I","didn't","know","what","to say."],"","what to say。","I didn't know what to say."),
R("w15","w3","",["My sister","has","been","sick","since last Friday."],"","現在完成式 + since。","My sister has been sick since last Friday."),
/* 寫作二・段落寫作 */
ES("w16","w4","請根據下面三格提示，寫一篇約 50 字的短文，描述 Andy 上週末發生了什麼事。",
  ["Andy and his dad go fishing at a lake.","Andy catches a very big fish.","Andy and his family eat the fish for dinner."],
  ["go fishing","catch","big fish","dinner"],
  "Last weekend, Andy and his dad went fishing at a lake. They waited for a long time, but nothing happened. Suddenly, Andy felt something pulling his line. He pulled hard and caught a very big fish! His dad was surprised. In the evening, Andy's mom cooked the fish, and the whole family ate it for dinner. It was delicious.",
  "照 1→2→3 的順序寫，用過去式。","重點：過去式（went, caught, ate）、用 Suddenly / In the evening 讓故事更生動。")
]);

/* ================================ 模擬卷 2 ================================ */
geptMock(2, [
/* 聽力一・看圖辨義 */
L("l01","l1",1,["What is the man doing?"],["He is fixing a car.","He is washing a car.","He is driving a car."],2,"","男子坐在駕駛座開車。","A man is driving a car on a road, seen through the side window."),
L("l02","l1",1,["Where is the boy?"],["He is in the library.","He is in the kitchen.","He is at the zoo."],0,"","男孩坐在圖書館書架旁看書。","A boy is reading a book at a table in a library with tall bookshelves."),
L("l03","l1",1,["What is on the table?"],["Some cups.","A cake.","A cat."],1,"","桌上放著一個蛋糕。","A round birthday cake with candles sitting on a table. Nothing else is on the table."),
L("l04","l1",1,["What are the girls doing?"],["They are dancing.","They are running.","They are reading."],2,"","兩個女孩坐在長椅上看書。","Two girls are sitting on a park bench reading books."),
L("l05","l1",1,["What's the weather like?"],["It's windy.","It's sunny.","It's snowy."],0,"","風很大，樹被吹彎、帽子被吹走。","A windy day: trees are bending in the wind and a man's hat is flying off his head."),
/* 聽力二・問答 */
L("l06","l2",2,["W: What time do you usually get up?"],["At six thirty.","For eight hours.","In my bedroom."],0,"","What time 問時間點。"),
L("l07","l2",2,["M: Do you need any help with those bags?"],["Yes, please. They're heavy.","No, they're my bags.","I bought them yesterday."],0,"","對方主動幫忙。"),
L("l08","l2",2,["W: Where's the nearest MRT station?"],["Go straight two blocks. You'll see it.","It's very fast.","I take it every day."],0,"","問路。"),
L("l09","l2",2,["M: I passed the math test!"],["That's great! Congratulations!","Don't worry. You'll do better.","It's a hard test."],0,"","對方有好消息。"),
L("l10","l2",2,["W: Can I try on this dress?"],["Sure. The fitting room is over there.","It costs five hundred dollars.","It's a red dress."],0,"","在服飾店試穿。"),
L("l11","l2",2,["M: How about going to the night market tonight?"],["Good idea. I want to eat stinky tofu.","I went there by bus.","It opens at five."],0,"","對方提議。"),
L("l12","l2",2,["W: Have you ever been to Japan?"],["Yes, I went there last year.","Yes, I'm going next week.","No, it's far."],0,"","Have you ever ...? 問經驗。"),
L("l13","l2",2,["M: What's wrong with your leg?"],["I fell off my bike.","I like my bike.","It's my left leg."],0,"","問受傷原因。"),
L("l14","l2",2,["W: Would you like to leave a message?"],["Yes. Please tell him to call me.","No, I'm not here.","I'll leave tomorrow."],0,"","電話留言。"),
L("l15","l2",2,["M: Thanks for lending me your notebook."],["No problem.","Yes, it's my notebook.","Here you are."],0,"","被道謝。"),
/* 聽力三・簡短對話 */
L("l16","l3",3,["M: Jenny, are you ready? We're leaving.","W: Wait a minute. I can't find my phone.","M: Did you check your backpack?","W: Oh, here it is.","Where was Jenny's phone?"],["In her backpack.","In her pocket.","On the sofa."],0,"","手機在背包裡。"),
L("l17","l3",3,["W: I'd like two tickets for the 5:30 show.","M: Sorry, it's sold out. There are still seats for the 7:00 show.","W: OK, two for 7:00, then.","Which show will the woman see?"],["The 7:00 show.","The 5:30 show.","The 7:30 show."],0,"","5:30 賣完了，改看 7:00。"),
L("l18","l3",3,["M: What are you going to do this summer?","W: I'm going to take an English class. And you?","M: I'll work at my uncle's restaurant.","What will the man do this summer?"],["Work at a restaurant.","Take an English class.","Travel abroad."],0,"","在叔叔的餐廳工作。"),
L("l19","l3",3,["W: You've been coughing all day.","M: Yes. I think I caught a cold.","W: You should see a doctor and drink more water.","What is the man's problem?"],["He has a cold.","He hurt his leg.","He is hungry."],0,"","caught a cold = 感冒了。"),
L("l20","l3",3,["M: How much is a large milk tea?","W: It's sixty dollars. A small one is forty-five.","M: I'll have a small one, please.","How much will the man pay?"],["Forty-five dollars.","Sixty dollars.","A hundred and five dollars."],0,"","點小杯 45 元。"),
L("l21","l3",3,["W: Why didn't you come to the meeting yesterday?","M: I'm sorry. I didn't know about it. Nobody told me.","Why did the man miss the meeting?"],["He didn't know about it.","He was sick.","He was busy."],0,"","沒人告訴他。"),
L("l22","l3",3,["M: Let's meet in front of the museum at ten.","W: The museum is big. How about at the main gate?","M: OK. See you at the main gate.","Where will they meet?"],["At the main gate of the museum.","Inside the museum.","At the bus stop."],0,"","最後決定在正門。"),
L("l23","l3",3,["W: Dad, can I go to Lily's house?","M: Did you clean your room?","W: Not yet.","M: Clean it first. Then you can go.","What must the girl do first?"],["Clean her room.","Call Lily.","Do her homework."],0,"","爸爸說要先打掃房間才能去。"),
L("l24","l3",3,["M: Is this the bus to the train station?","W: No. You need to take Bus 5. This is Bus 15.","Which bus goes to the train station?"],["Bus 5.","Bus 15.","Bus 50."],0,"","Bus 5 才到火車站。"),
L("l25","l3",3,["W: Your English is very good. Did you live abroad?","M: No, but I watch a lot of American TV shows.","How did the man learn English well?"],["By watching TV shows.","By living abroad.","By going to a cram school."],0,"","看很多美國影集。"),
/* 聽力四・短文聽解 */
L("l26","l4",4,["My sister loves sports. She plays volleyball at school, and on weekends she goes jogging. But her favorite sport is tennis.","What is the sister's favorite sport?"],["排球","網球","慢跑"],1,"","But 後面：最喜歡網球 → (B)。","Panel A: a girl hitting a volleyball. Panel B: a girl playing tennis with a racket. Panel C: a girl jogging in a park."),
L("l27","l4",4,["Attention, passengers. The train to Kaohsiung will arrive ten minutes late. Please wait on Platform 2. We are sorry for the delay.","Where are the listeners?"],["機場","公車站","火車站月台"],2,"","passengers、Platform 2、train → 火車站 (C)。","Panel A: an airport with airplanes and a waiting area. Panel B: people waiting at a bus stop with a bus. Panel C: people waiting on a train platform with a train."),
L("l28","l4",4,["Last night I had a strange dream. I was flying over my school like a bird. Then I landed on the roof of the gym and woke up.","What did the speaker dream about?"],["像鳥一樣在學校上空飛","在體育館打球","在學校屋頂吃東西"],0,"","夢見像鳥一樣飛過學校 → (A)。","Panel A: a boy flying in the sky above a school building like a bird. Panel B: a boy playing basketball in a gym. Panel C: a boy eating lunch on a school roof."),
L("l29","l4",4,["I usually have toast for breakfast, but this morning there was no bread. So I had a bowl of rice and an egg instead.","What did the speaker have for breakfast this morning?"],["吐司","一碗飯和一顆蛋","一杯牛奶"],1,"","今天早上沒有麵包，改吃飯和蛋 → (B)。","Panel A: two slices of toast on a plate. Panel B: a bowl of rice and a fried egg. Panel C: a glass of milk."),
L("l30","l4",4,["Welcome to our English class. Please turn off your phones, and don't eat in the classroom. You can drink water, but no other drinks, please.","What can students do in the class?"],["講電話","吃東西","喝水"],2,"","可以喝水 → (C)。","Panel A: a student talking on a phone in a classroom. Panel B: a student eating a sandwich at a desk. Panel C: a student drinking a bottle of water at a desk."),
/* 閱讀一・詞彙 */
M("r01","r1","I'm so ___. Can I have some water?",["thirsty","hungry","sleepy","angry"],0,"","想喝水 → thirsty。"),
M("r02","r1","My father ___ the newspaper every morning.",["reads","listens","watches","speaks"],0,"","read the newspaper = 看報紙。"),
M("r03","r1","Please be ___ when you cross the street.",["careful","careless","famous","free"],0,"","過馬路要小心。"),
M("r04","r1","The museum is ___ from here. You can walk there in five minutes.",["not far","very far","far away","too far"],0,"","走五分鐘就到 → 不遠。"),
M("r05","r1","Ken: Who ___ this picture?\nMia: My little brother did.",["drew","draws","is drawing","will draw"],0,"","回答用 did → 過去式。"),
M("r06","r1","Don't ___ your time. Start your homework now.",["waste","spend","take","save"],0,"","waste time = 浪費時間。"),
M("r07","r1","There are twelve months in a ___.",["year","week","day","season"],0,"","一年有十二個月。"),
M("r08","r1","I have two pens. One is black, and ___ is red.",["the other","another","other","others"],0,"","兩個中的另一個 → the other。"),
M("r09","r1","If it ___ tomorrow, we'll stay home.",["rains","will rain","rained","raining"],0,"","If 子句用現在式代替未來。"),
M("r10","r1","Peter is the ___ student in our class. He is 185 cm tall.",["tallest","taller","tall","most tall"],0,"","the + 最高級。"),
/* 閱讀二・段落填空 */
G("r11","r2","cloze","Learning to Ride",[
  "When I was seven, my father taught me to ride a bike. At first, I was afraid [[1]] falling. My father held the back of the bike and ran with me. After a few days, I could ride [[2]] myself. One day, I rode too fast and fell down. My knee hurt a lot, [[3]] I didn't give up. [[4]] Now I ride my bike to school every day."
],[["hold","扶著"],["knee","膝蓋"],["give up","放棄"]],[
  B("r11a",1,["of","to","for","with"],0,"","be afraid of = 害怕…。"),
  B("r11b",2,["by","with","for","in"],0,"","by myself = 靠自己。"),
  B("r11c",3,["but","so","because","or"],0,"","受傷了「但」沒放棄 → but。"),
  B("r11d",4,["I got back on the bike and tried again.","I never rode a bike again.","My father sold my bike.","I was seven years old."],0,"","沒放棄 → 再騎上去試，最連貫。")
]),
G("r12","r2","cloze","A Note from the Library",[
  "Dear Students, The school library will be closed next Monday [[1]] we are getting new bookshelves. Please return your books [[2]] Friday. If you need to study, you [[3]] use Room 205 on Monday. [[4]] Thank you for your help. — Ms. Liao, Librarian"
],[["librarian","圖書館員"]],[
  B("r12a",1,["because","so","but","if"],0,"","閉館原因 → because。"),
  B("r12b",2,["by","until","since","in"],0,"","by Friday = 星期五以前（期限）。"),
  B("r12c",3,["can","must not","didn't","won't"],0,"","可以使用 205 教室。"),
  B("r12d",4,["The library will open again on Tuesday.","The library has no books.","Room 205 is closed, too.","Please bring your lunch to the library."],0,"","閉館一天，說明何時重新開放最合理。")
]),
/* 閱讀三・閱讀理解 */
G("r13","r3","notice","Green Mountain Hiking Club",[
  "Join our hike on Sunday, November 9!",
  "Meet at: Green Mountain MRT Station, Exit 2, at 8:00 a.m.",
  "Hike: About 3 hours. We will have lunch at the top of the mountain.",
  "Bring: water, lunch, a hat, and a raincoat.",
  "Cost: Members free / Non-members $100",
  "Sign up by calling Mr. Hsu before November 6."
],[["hike","健行"],["member","會員"],["exit","出口"]],[
  Q("r13a","Where will the hikers meet?",["At an MRT station.","At the top of the mountain.","At Mr. Hsu's house.","At a restaurant."],0,"","Green Mountain MRT Station, Exit 2。"),
  Q("r13b","Lisa isn't a club member. How much does she need to pay?",["$100.","Nothing.","$300.","$50."],0,"","Non-members $100。"),
  Q("r13c","Which is TRUE about the hike?",["Hikers should bring their own lunch.","It takes about six hours.","People can sign up on November 8.","It's on a Saturday."],0,"","Bring: water, lunch ...。")
]),
G("r14","r3","article","The Smallest Restaurant",[
  "In a small town in Taiwan, there is a very special restaurant. It has only one table and four chairs. The owner, Mrs. Kao, cooks everything by herself.",
  "There is no menu. Mrs. Kao cooks what she buys at the market that morning. You must call her a week before you go. Because the restaurant is so small, people often have to wait for two or three months.",
  "Why do people wait so long? \"Her food tastes like my grandmother's cooking,\" one visitor said. \"It makes me feel at home.\""
],[["owner","老闆"],["menu","菜單"],["feel at home","覺得像在家一樣自在"]],[
  Q("r14a","What is special about the restaurant?",["It is very small.","It is very expensive.","It has a long menu.","It is open all night."],0,"","只有一張桌子、四張椅子。"),
  Q("r14b","How does Mrs. Kao decide what to cook?",["She cooks what she buys that day.","Visitors choose from a menu.","She cooks the same food every day.","Her grandmother tells her."],0,"","cooks what she buys at the market that morning。"),
  Q("r14c","Why do people like the restaurant?",["The food reminds them of home.","It is near the MRT station.","It has many tables.","The food is free."],0,"","像祖母做的菜，讓人覺得像在家。")
]),
G("r15","r3","article","An Ad and an Email",[
  "【Ad】 Room for Rent — One bedroom, near Taichung Station. $8,000 a month. No pets. Call Mr. Chen: 0933-111-222.",
  "【Email】 Hi Mom, I found a room near the station. It's only $8,000 a month, and it's a five-minute walk to my new office. But I can't bring Mimi there. Can she stay with you for a while? Love, Annie"
],[["rent","出租；租金"],["office","辦公室"],["for a while","一陣子"]],[
  Q("r15a","Why is Annie looking for a room?",["She has a new job in Taichung.","She wants to study in Taipei.","Her old room is too expensive.","She wants to live with her mom."],0,"","離新辦公室很近 → 在台中有新工作。"),
  Q("r15b","Who is Mimi most likely?",["Annie's pet.","Annie's mother.","Mr. Chen's daughter.","Annie's roommate."],0,"","房子 No pets，Mimi 不能帶去 → 寵物。"),
  Q("r15c","What does Annie ask her mom to do?",["Take care of Mimi.","Pay the rent.","Call Mr. Chen.","Find her a new room."],0,"","Can she stay with you for a while?")
]),
G("r16","r3","dialogue","After the Test",[
  "Leo: How did you do on the history test?",
  "Ivy: Not very well. I got a 65. I studied the wrong chapters!",
  "Leo: Oh no. I got an 80. Ms. Lin said we can take the test again next Tuesday if we get under 70.",
  "Ivy: Really? Then I'll study hard this weekend. Can you help me?",
  "Leo: Sure. Let's study at the library on Saturday."
],[["chapter","章節"],["under","低於"]],[
  Q("r16a","Why didn't Ivy do well on the test?",["She studied the wrong chapters.","She was sick.","She didn't study at all.","She was late for the test."],0,"","I studied the wrong chapters!"),
  Q("r16b","Who can take the test again?",["Ivy.","Leo.","Both of them.","Neither of them."],0,"","低於 70 分才能重考：Ivy 65 可以，Leo 80 不行。"),
  Q("r16c","What will they do on Saturday?",["Study together at the library.","Take the test again.","Visit Ms. Lin.","Go to a history museum."],0,"","Let's study at the library on Saturday.")
]),
/* 寫作一・句子改寫 */
RW("w01","w1","Your sister likes ice cream.","改成疑問句","Does your sister",["Does your sister like ice cream?"],"","Does + 主詞 + 原形動詞？"),
RW("w02","w1","I was at home last night.","改成否定句","I",["I {wasn't|was not} at home last night."],"","was + not。"),
RW("w03","w1","Mark is going to buy a new computer.","針對 a new computer 改成疑問句","What",["What is Mark going to buy?"],"","What + is + 主詞 + going to + 原形動詞？"),
RW("w04","w1","People speak English in Canada.","改成被動語態","English",["English is spoken in Canada{ by people|}."],"","be + p.p.：speak-spoke-spoken。"),
RW("w05","w1","This question is easier than that question.","用 not as ... as 改寫，意思不變","That question is not",["That question is not as easy as this {question|one}."],"","這題比那題簡單 = 那題沒有這題簡單。"),
/* 寫作一・句子合併 */
RW("w06","w2",["Ann wants to buy a gift.","Ann doesn't have enough money."],"用 but 合併","Ann wants to buy a gift",["Ann wants to buy a gift{,|} but {she|Ann} {doesn't|does not} have enough money."],"","相反的事用 but。"),
RW("w07","w2",["I know the boy.","The boy won the race."],"用 who 合併","I know the boy",["I know the boy {who|that} won the race."],"","who 代替 the boy。"),
RW("w08","w2",["Can you tell me?","How much is this watch?"],"合併成一句（間接問句）","Can you tell me",["Can you tell me how much this watch is?"],"","疑問詞 + 主詞 + 動詞。"),
RW("w09","w2",["Mr. Wang is old.","Mr. Wang can't climb the mountain."],"用 too ... to ... 合併","Mr. Wang is",["Mr. Wang is too old to climb the mountain."],"","too + 形容詞 + to V。"),
RW("w10","w2",["You can come to my house.","You can call me."],"用 either ... or ... 合併","You can either",["You can either come to my house or call me."],"","either A or B。"),
/* 寫作一・重組 */
R("w11","w3","",["It","took","me","an hour","to finish the report."],"","It takes + 人 + 時間 + to V。","It took me an hour to finish the report."),
R("w12","w3","",["What","a","beautiful","day","it is!"],"","What + a + 形容詞 + 名詞 + 主詞 + 動詞！","What a beautiful day it is!"),
R("w13","w3","",["She","asked","me","to","close the door."],"","ask + 人 + to V。","She asked me to close the door."),
R("w14","w3","",["Which","season","do you","like","best?"],"","Which + 名詞 + do you like best?","Which season do you like best?"),
R("w15","w3","",["The book","is","more interesting","than","the movie."],"","more + 形容詞 + than。","The book is more interesting than the movie."),
/* 寫作二・段落寫作 */
ES("w16","w4","請根據下面三格提示，寫一篇約 50 字的短文，描述 Lily 發生了什麼事。",
  ["Lily sees an old man drop his bag on the bus.","Lily picks up the bag and runs after the old man.","The old man thanks Lily with a big smile."],
  ["drop","pick up","run after","thank"],
  "Yesterday, Lily was taking the bus home. She saw an old man get off the bus, but he dropped his bag on the seat. Lily quickly picked up the bag and ran after him. \"Excuse me! This is your bag!\" she shouted. The old man was very surprised. He thanked Lily with a big smile. Lily felt very happy.",
  "照 1→2→3 的順序寫，用過去式。","重點：過去式（saw, picked, ran, thanked）、加入一句對話或心情會更生動。")
]);

/* ================================ 模擬卷 3 ================================ */
geptMock(3, [
/* 聽力一・看圖辨義 */
L("l01","l1",1,["What is the girl doing?"],["She is cooking noodles.","She is playing the piano.","She is drawing a picture."],1,"","女孩在彈鋼琴。","A girl is playing the piano in a living room."),
L("l02","l1",1,["Where is the dog?"],["It's in front of the house.","It's behind the house.","It's next to the car."],2,"","狗坐在車子旁邊。","A dog is sitting next to a parked car. A house is in the background."),
L("l03","l1",1,["What is the boy holding?"],["An umbrella.","A basketball.","A book."],0,"","男孩手上拿著雨傘。","A boy is holding a closed umbrella in his hand, standing on a sidewalk."),
L("l04","l1",1,["What are the people doing?"],["They are waiting for the bus.","They are getting off the train.","They are buying tickets."],0,"","大家在公車站排隊等公車。","Several people are standing in a line at a bus stop, waiting for a bus."),
L("l05","l1",1,["How does the man feel?"],["He feels happy.","He feels angry.","He feels sleepy."],2,"","男子打哈欠、揉眼睛，很睏。","A man is yawning and rubbing his eyes at his desk, looking very sleepy."),
/* 聽力二・問答 */
L("l06","l2",2,["M: When is your birthday?"],["It's on March tenth.","I'm thirteen years old.","I had a party."],0,"","When 問日期。"),
L("l07","l2",2,["W: Is it OK if I sit here?"],["Of course. Go ahead.","Yes, I'm sitting.","It's a big chair."],0,"","詢問是否可以坐。"),
L("l08","l2",2,["M: How far is it from here to the park?"],["About five hundred meters.","It's a beautiful park.","At four o'clock."],0,"","How far 問距離。"),
L("l09","l2",2,["W: What do you usually do on weekends?"],["I often go hiking with my family.","I went to a movie last weekend.","I'll stay home this weekend."],0,"","usually → 現在簡單式。"),
L("l10","l2",2,["M: I'm sorry. I broke your cup."],["That's all right. It was an old one.","You're welcome.","Yes, it's my cup."],0,"","對方道歉。"),
L("l11","l2",2,["W: Which bus should I take to the zoo?"],["Take Bus 66.","It takes thirty minutes.","The zoo opens at nine."],0,"","Which bus 問哪一班。"),
L("l12","l2",2,["M: Would you mind closing the door?"],["Not at all.","Yes, the door is closed.","I closed it yesterday."],0,"","Would you mind ...? 表示願意 → Not at all。"),
L("l13","l2",2,["W: How long will you stay in Tokyo?"],["For about a week.","I'll go there by plane.","Next month."],0,"","How long 問多久。"),
L("l14","l2",2,["M: Do you want some cookies?"],["Yes, please. They look delicious.","I baked them.","No, they're cookies."],0,"","有人請你吃東西。"),
L("l15","l2",2,["W: What happened to your bike?"],["Someone took the bell.","I ride it to school.","It's a new bike."],0,"","What happened 問發生什麼事。"),
/* 聽力三・簡短對話 */
L("l16","l3",3,["W: Where are you going, Dad?","M: To the post office. I need to send a package to your uncle.","W: Can you buy some stamps for me?","M: Sure.","What will the man do at the post office?"],["Send a package and buy stamps.","Buy a gift for the uncle.","Pick up a letter."],0,"","寄包裹，順便幫女兒買郵票。"),
L("l17","l3",3,["M: Mom, can I have a dog?","W: A dog needs a lot of care. Who will walk it every day?","M: I will. I promise.","W: Let me talk to your dad first.","What will the woman do first?"],["Talk to the boy's father.","Buy a dog.","Walk the dog."],0,"","先和爸爸商量。"),
L("l18","l3",3,["W: How was your science project?","M: My partner was sick, so I did everything myself. But the teacher liked it.","How did the man do the project?"],["He did it alone.","He did it with his partner.","He didn't finish it."],0,"","夥伴生病，全部自己做。"),
L("l19","l3",3,["M: Do you want to go to the beach on Saturday?","W: The weather report says there will be a typhoon this weekend.","M: Then let's go next week.","Why won't they go to the beach on Saturday?"],["A typhoon is coming.","The beach is closed.","The woman is busy."],0,"","颱風要來。"),
L("l20","l3",3,["W: Excuse me. How much is it to send this letter to the U.S.?","M: By airmail, it's thirty-five dollars. It will take about seven days.","How long will it take for the letter to arrive?"],["About seven days.","About three days.","About thirty-five days."],0,"","about seven days。"),
L("l21","l3",3,["M: I'm going to the supermarket. Do we need anything?","W: We need eggs and some bananas. Oh, and don't forget the milk.","What does the woman NOT ask for?"],["Bread.","Eggs.","Milk."],0,"","她要蛋、香蕉、牛奶，沒有提到麵包。"),
L("l22","l3",3,["W: Hi, Ray. You're wearing a cast on your arm!","M: Yes, I broke it playing basketball last week.","What happened to Ray?"],["He broke his arm.","He lost a basketball game.","He bought a new watch."],0,"","打籃球時手臂骨折。"),
L("l23","l3",3,["M: Can I help you find something?","W: Yes. I'm looking for a book about cooking for my mom.","M: Cookbooks are on the third floor.","Where is the woman?"],["In a bookstore.","In a kitchen.","In a restaurant."],0,"","找食譜、在三樓 → 書店。"),
L("l24","l3",3,["W: Let's take a photo together.","M: OK, but my phone has no battery.","W: No problem. We can use mine.","Whose phone will they use?"],["The woman's.","The man's.","A stranger's."],0,"","男生手機沒電，用女生的。"),
L("l25","l3",3,["M: What time does the English class start?","W: It usually starts at nine, but today it starts at ten because the teacher has a meeting.","When does the English class start today?"],["At ten.","At nine.","At eleven."],0,"","今天十點開始。"),
/* 聽力四・短文聽解 */
L("l26","l4",4,["My grandmother is seventy years old, but she is very healthy. Every morning, she does tai chi in the park with her friends.","What does the grandmother do every morning?"],["慢跑","騎腳踏車","在公園打太極拳"],2,"","在公園打太極拳 → (C)。","Panel A: an old woman jogging. Panel B: an old woman riding a bicycle. Panel C: a group of old people doing tai chi in a park."),
L("l27","l4",4,["Hi, Kelly. This is Amy. I left my math book at your house yesterday. Can you bring it to school tomorrow? Thanks.","What did Amy leave at Kelly's house?"],["一本書","一支手機","一件外套"],0,"","把數學課本留在 Kelly 家 → (A)。","Panel A: a textbook. Panel B: a mobile phone. Panel C: a jacket."),
L("l28","l4",4,["I'm Mr. Jones, your new P.E. teacher. In my class, you must wear sports shoes. Today, we will play badminton in the gym.","What will the students do today?"],["跑步","打羽毛球","踢足球"],1,"","今天在體育館打羽毛球 → (B)。","Panel A: students running on a running track. Panel B: students playing badminton in a gym. Panel C: students playing soccer on a field."),
L("l29","l4",4,["Our town has a new park. It has a big playground for kids, and there is a small lake with ducks. But there aren't any trees yet.","Which picture shows the new park?"],["有遊樂場和有鴨子的小湖，沒有樹","有很多大樹的公園","有游泳池的公園"],0,"","有遊樂場和鴨子湖，但還沒有樹 → (A)。","Panel A: a park with a playground and a small pond with ducks, and no trees at all. Panel B: a park with many tall trees and a bench. Panel C: a park with a swimming pool."),
L("l30","l4",4,["Hello, this is Happy Taxi. Your taxi will arrive in ten minutes. It's a white car, and the number is 5678.","What will the speaker's taxi look like?"],["車頂有計程車燈的車","白色的轎車（車頂沒有燈）","黑色公車"],1,"","白色的車 → (B)。","Panel A: a taxi with a taxi sign light on its roof and a checkered stripe along its side. Panel B: a plain white car with nothing on the roof. Panel C: a dark black bus."),
/* 閱讀一・詞彙 */
M("r01","r1","Let's ___ a taxi. It's too far to walk.",["take","make","have","give"],0,"","take a taxi = 搭計程車。"),
M("r02","r1","My sister is a ___. She sings in a band.",["singer","dancer","writer","driver"],0,"","在樂團唱歌 → singer。"),
M("r03","r1","We should ___ water. Don't leave it running.",["save","waste","drink","spill"],0,"","save water = 節約用水。"),
M("r04","r1","My dad ___ smokes. He stopped ten years ago.",["never","always","often","sometimes"],0,"","十年前戒菸 → 現在從不抽。"),
M("r05","r1","The movie was so ___ that I fell asleep.",["boring","exciting","funny","scary"],0,"","看到睡著 → 無聊。"),
M("r06","r1","I'm looking forward to ___ you again.",["seeing","see","saw","seen"],0,"","look forward to + V-ing。"),
M("r07","r1","Mr. Wu ___ to Canada three times.",["has been","has gone","goes","was"],0,"","去過三次 → has been to。"),
M("r08","r1","Ann: Can I borrow your bike?\nBen: Sure. ___",["Here's the key.","No, you can't.","It's mine.","I'm sorry."],0,"","答應借車 → 給鑰匙。"),
M("r09","r1","The children are playing ___ in the yard.",["happily","happy","happiness","happier"],0,"","修飾動詞 → 副詞 happily。"),
M("r10","r1","We had a party to ___ my grandpa's 80th birthday.",["celebrate","invite","forget","finish"],0,"","celebrate = 慶祝。"),
/* 閱讀二・段落填空 */
G("r11","r2","cloze","My First Job",[
  "Last summer, I worked at a bubble tea shop for two months. It was my first job. Every day, I [[1]] drinks and cleaned the tables. At first, I often made mistakes. I [[2]] sugar in a drink for a customer who wanted no sugar. My boss was patient and taught me [[3]] to do things right. [[4]] I learned a lot, and I also saved some money for my new phone."
],[["customer","顧客"],["mistake","錯誤"],["boss","老闆"]],[
  B("r11a",1,["made","make","making","makes"],0,"","與 cleaned 對稱，過去式 made。"),
  B("r11b",2,["once put","never put","always puts","will put"],0,"","舉一個犯錯的例子 → once put（有一次放了糖）。"),
  B("r11c",3,["how","what","who","where"],0,"","how to do things right = 怎麼把事情做好。"),
  B("r11d",4,["After a few weeks, I didn't make mistakes anymore.","I quit the job on the second day.","My boss was angry every day.","Bubble tea is not popular."],0,"","老闆耐心教 → 幾週後不再犯錯，與後句學到很多相連。")
]),
G("r12","r2","cloze","Saving Water",[
  "Taiwan gets a lot of rain, but sometimes we still don't have [[1]] water. That's why we should save water. There are many easy ways to do it. For example, turn off the tap [[2]] you brush your teeth. Take shorter showers. You can also use the water from washing vegetables [[3]] water the plants. [[4]]"
],[["tap","水龍頭"],["shower","淋浴"]],[
  B("r12a",1,["enough","many","a few","none"],0,"","enough water = 足夠的水。"),
  B("r12b",2,["while","until","because","before then"],0,"","刷牙的「同時」關水 → while。"),
  B("r12c",3,["to","for","and","of"],0,"","表示目的：to water。"),
  B("r12d",4,["If everyone does a little, we can save a lot.","Water is not important.","Plants don't need water.","It never rains in Taiwan."],0,"","總結 → 每個人做一點就能省很多。")
]),
/* 閱讀三・閱讀理解 */
G("r13","r3","notice","Bright Star English Speech Contest",[
  "Who: Junior high school students in Taichung",
  "When: Saturday, December 6, 1:00–5:00 p.m.",
  "Where: City Hall, Room 301",
  "Topic: \"My Hero\" (3–4 minutes)",
  "Prizes: 1st $3,000 / 2nd $2,000 / 3rd $1,000",
  "Sign up online by November 20."
],[["speech contest","演講比賽"],["topic","題目"],["prize","獎金、獎品"]],[
  Q("r13a","Who can join the contest?",["Junior high students in Taichung.","All students in Taiwan.","High school students only.","Teachers in Taichung."],0,"","Who: Junior high school students in Taichung。"),
  Q("r13b","What will students talk about?",["A person they look up to.","Their favorite book.","Their hometown.","Their best friend's family."],0,"","My Hero = 心中的英雄（崇拜的人）。"),
  Q("r13c","Which is TRUE about the contest?",["The speech should be about three to four minutes.","It is on a Sunday.","The first prize is $1,000.","Students must sign up by December 6."],0,"","Topic: ... (3–4 minutes)。")
]),
G("r14","r3","article","A Special Birthday",[
  "Most people get presents on their birthdays, but Owen gives presents. Every year on his birthday, he and his parents buy books and take them to a children's hospital.",
  "Owen started doing this when he was eight. That year, he was sick and stayed in the hospital for a month. He felt bored and lonely. A nurse gave him some books to read, and they made him feel better.",
  "\"Now I'm healthy, and I want to help other kids,\" says Owen, who is now fourteen. This year, his classmates also gave him books to take to the hospital."
],[["present","禮物"],["lonely","寂寞的"]],[
  Q("r14a","What does Owen do on his birthday?",["He gives books to sick children.","He has a big party.","He visits his grandparents.","He buys toys for himself."],0,"","買書送到兒童醫院。"),
  Q("r14b","Why did Owen start doing this?",["Books helped him when he was in the hospital.","His teacher asked him to.","He works at a hospital.","He doesn't like presents."],0,"","住院時護士給的書讓他好過一些。"),
  Q("r14c","How old was Owen when he stayed in the hospital?",["Eight.","Fourteen.","Six.","Ten."],0,"","he was eight。")
]),
G("r15","r3","article","Two Messages",[
  "【Message 1】 To all members: The badminton club will practice on Wednesday this week, not Thursday, because the gym will be used for a school meeting on Thursday. — Coach Lee",
  "【Message 2】 Coach Lee, I'm sorry, but I have a dentist appointment on Wednesday afternoon. Can I come to practice on Friday instead? — Wendy"
],[["appointment","預約"],["practice","練習"]],[
  Q("r15a","Why did the practice day change?",["The gym is needed for a meeting.","The coach is sick.","There's a typhoon.","Wendy can't come."],0,"","星期四體育館要開會。"),
  Q("r15b","When will the club practice this week?",["On Wednesday.","On Thursday.","On Friday.","On Saturday."],0,"","改到星期三。"),
  Q("r15c","Why can't Wendy go to practice?",["She will see a dentist.","She has a test.","She doesn't like badminton.","She will go to a meeting."],0,"","dentist appointment。")
]),
G("r16","r3","dialogue","At the Restaurant",[
  "Waiter: Are you ready to order?",
  "Mia: Yes. I'd like the beef noodle soup, please. Is it spicy?",
  "Waiter: A little. I can ask the cook to make it not spicy.",
  "Mia: Yes, please. And a glass of iced lemon tea.",
  "Waiter: Sorry, we don't have lemon tea today. How about green tea?",
  "Mia: OK, green tea is fine."
],[["spicy","辣的"],["iced","冰的"]],[
  Q("r16a","What will Mia drink?",["Green tea.","Lemon tea.","Milk tea.","Water."],0,"","今天沒有檸檬紅茶，改綠茶。"),
  Q("r16b","What does Mia ask about the soup?",["If it is spicy.","How much it is.","If it is hot.","How big it is."],0,"","Is it spicy?"),
  Q("r16c","Which is TRUE?",["The cook will make the soup not spicy.","Mia orders chicken soup.","The restaurant has no green tea.","Mia doesn't order any drinks."],0,"","服務生說可以請廚師做不辣的。")
]),
/* 寫作一・句子改寫 */
RW("w01","w1","They have finished the project.","改成疑問句","Have they",["Have they finished the project?"],"","Have 移到句首。"),
RW("w02","w1","Linda can ride a horse.","改成否定句","Linda",["Linda {can't|cannot|can not} ride a horse."],"","can + not。"),
RW("w03","w1","I am watching a movie now.","把 now 改成 at eight last night","I",["I was watching a movie at eight last night."],"","過去某時間點正在做 → 過去進行式。"),
RW("w04","w1","Jack's mother made the cake.","改成被動語態","The cake",["The cake was made by Jack's mother."],"","be + p.p. + by ...。"),
RW("w05","w1","Kevin goes to the gym three times a week.","針對 three times a week 改成疑問句","How often",["How often does Kevin go to the gym?"],"","問頻率 → How often。"),
/* 寫作一・句子合併 */
RW("w06","w2",["My dog is sick.","I'm taking it to the vet."],"用 so 合併","My dog is sick",["My dog is sick{,|} so I'm taking it to the vet.","My dog is sick{,|} so I am taking it to the vet."],"","原因 + so + 結果。"),
RW("w07","w2",["This is the house.","My grandparents live in the house."],"用 where 合併","This is the house",["This is the house where my grandparents live."],"","where 代替 in the house。"),
RW("w08","w2",["Do you know?","Who is that man?"],"合併成一句（間接問句）","Do you know",["Do you know who that man is?"],"","疑問詞 + 主詞 + 動詞。"),
RW("w09","w2",["Eric didn't study.","Eric didn't pass the test."],"用 because 合併","Eric didn't pass the test",["Eric {didn't|did not} pass the test because he {didn't|did not} study.","Eric {didn't|did not} pass the test because Eric {didn't|did not} study."],"","結果 + because + 原因。"),
RW("w10","w2",["You eat dinner.","Wash your hands first."],"用 Before 合併","Before",["Before you eat dinner, wash your hands.","Before eating dinner, wash your hands."],"","Before + 子句, 祈使句。"),
/* 寫作一・重組 */
R("w11","w3","",["I","am","not","sure","if he will come."],"","be sure if ...。","I am not sure if he will come."),
R("w12","w3","",["Thank you","for","inviting","me","to your party."],"","Thank you for + V-ing。","Thank you for inviting me to your party."),
R("w13","w3","",["She","has","never","eaten","stinky tofu."],"","has never + p.p.。","She has never eaten stinky tofu."),
R("w14","w3","",["Where","did","you","buy","those shoes?"],"","Where + did + 主詞 + 原形動詞？","Where did you buy those shoes?"),
R("w15","w3","",["It","is","important","to eat","breakfast every day."],"","It is + 形容詞 + to V。","It is important to eat breakfast every day."),
/* 寫作二・段落寫作 */
ES("w16","w4","請根據下面三格提示，寫一篇約 50 字的短文，描述 Ben 和 Amy 發生了什麼事。",
  ["Ben and Amy have a picnic in the park on a sunny day.","Suddenly it starts to rain heavily.","They run to a small shelter, laughing, and eat their sandwiches there."],
  ["picnic","suddenly","rain","shelter"],
  "Last Sunday, Ben and Amy had a picnic in the park. The weather was sunny, and they brought sandwiches and juice. Suddenly, dark clouds came and it started to rain heavily. They picked up their food and ran to a small shelter. They were wet, but they laughed and ate their sandwiches there. It was a funny day.",
  "照 1→2→3 的順序寫，用過去式。","重點：過去式（had, started, ran, ate）、用 Suddenly / but 表現轉折。")
]);
