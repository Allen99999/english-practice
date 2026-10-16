/* ===== 全民英檢 初級：練習題擴充（聽力＋閱讀＋寫作，原創模擬題）
   接在 bankgept.js 的「gept-e」題庫後面；新題目一律加在最後，已存在的題目不要改 id 或移動位置 ===== */
(() => {
const b = bank("gept-e");
b.range = "GEPT Elementary 聽力＋閱讀＋寫作（不含口說）";
b.note = "依 2021 年起的新題型自編練習題：聽力＝看圖辨義、問答、簡短對話、短文聽解；閱讀＝詞彙、段落填空、閱讀理解；寫作＝句子改寫、句子合併、重組、段落寫作。選「模擬段考」可以考三份照正式考試題數和時間出的完整考卷。";
b.tags = Object.assign({ l1: "聽力一・看圖辨義", l2: "聽力二・問答", l3: "聽力三・簡短對話", l4: "聽力四・短文聽解" }, b.tags);
b.exams.unshift({ name: "聽力測驗", tags: ["l1", "l2", "l3", "l4"] });
b.timeLimits.unshift([["l1", "l2", "l3", "l4"], 20]);
b.mock.unshift(["l1", 5], ["l2", 10], ["l3", 10], ["l4", 5]);
b.items.push(

/* ---------- 聽力一・看圖辨義（看圖，聽題目和三個選項） ---------- */
L("l101","l1",1,["What is the girl doing?"],["She is watering the flowers.","She is washing the dishes.","She is walking her dog."],0,"注意聽動詞。","圖中女孩拿著澆水壺在花園澆花 → watering the flowers。","A girl is watering flowers in a small garden with a watering can."),
L("l102","l1",1,["Where is the cat?"],["It's under the table.","It's on the sofa.","It's in the box."],1,"注意聽介系詞 on / under / in。","貓躺在沙發上睡覺 → on the sofa。","A cat is sleeping on a sofa in a living room. There is a table and an empty box on the floor nearby."),
L("l103","l1",1,["What are the children doing?"],["They are playing soccer.","They are swimming.","They are playing basketball."],2,"看他們手上拿什麼球。","兩個小孩在公園投籃 → playing basketball。","Two children are playing basketball on an outdoor court in a park on a sunny day."),
L("l104","l1",1,["Where is the woman?"],["She is at the supermarket.","She is at the hospital.","She is at the library."],0,"看背景的地點。","女士推著購物車、拿著蘋果 → at the supermarket。","A woman with a shopping cart is picking apples from a fruit shelf in a supermarket."),
L("l105","l1",1,["What's wrong with the boy?"],["He is hungry.","He is sick.","He is late."],1,"看男孩的樣子。","男孩躺在床上、嘴裡含體溫計，媽媽摸他額頭 → sick。","A boy is lying in bed with a thermometer in his mouth. His mother is touching his forehead. A box of tissues is on the bedside table."),
L("l106","l1",1,["What is the man doing?"],["He is reading a newspaper.","He is sleeping.","He is cooking."],2,"看他在廚房做什麼。","男子在爐子前煎蛋 → cooking。","A man is frying eggs in a pan at a kitchen stove."),
L("l107","l1",1,["What is under the desk?"],["A backpack.","Three books.","A pencil box."],0,"注意聽 under。","書和鉛筆盒在桌上，書包在桌子下面。","A student desk with three books and a pencil box on top of it, and a backpack on the floor under the desk."),
L("l108","l1",1,["How is the weather?"],["It's hot and sunny.","It's snowy.","It's rainy."],1,"看天氣。","小朋友在雪地裡堆雪人 → snowy。","Two children are building a snowman in the snow. Snow is falling."),
L("l109","l1",1,["Which is true about the picture?"],["The boy is taller than the girl.","They are the same height.","The girl is taller than the boy."],2,"比較兩個人的身高。","圖中女孩比男孩高。","A tall girl and a short boy are standing side by side. The girl is clearly much taller than the boy."),
L("l110","l1",1,["Where is the woman?"],["At a train station.","At an airport.","At a beach."],0,"看背景有什麼交通工具。","月台和火車 → at a train station。","A woman with a suitcase is waiting on a train platform. A train is arriving."),
L("l111","l1",1,["What is the boy doing?"],["He is taking a shower.","He is brushing his teeth.","He is combing his hair."],1,"看他手上拿的東西。","男孩拿著牙刷在洗手台前 → brushing his teeth。","A boy is brushing his teeth in front of a bathroom mirror and sink."),
L("l112","l1",1,["What is the dog doing?"],["It's eating its food.","It's sleeping under a tree.","It's jumping over the fence."],2,"注意聽動作。","狗正在跳過籬笆。","A dog is jumping over a low wooden fence in a backyard."),

/* ---------- 聽力二・問答（聽一句話，選出最適合的回應） ---------- */
L("l201","l2",2,["W: How often do you go swimming?"],["Twice a week.","For two hours.","At the pool."],0,"How often 問頻率。","How often → 次數：Twice a week.（一週兩次）"),
L("l202","l2",2,["M: Whose jacket is this?"],["It's Amy's.","It's very warm.","It's on the chair."],0,"Whose 問「誰的」。","Whose → 回答所有格：It's Amy's."),
L("l203","l2",2,["W: Would you like some more rice?"],["No, thanks. I'm full.","Yes, I like rice.","It's in the kitchen."],0,"有人請你再吃一點。","Would you like ...? 邀請 → No, thanks. I'm full.（我飽了）"),
L("l204","l2",2,["M: What's the matter? You look tired."],["I stayed up late last night.","I'm fine, thank you.","It's ten o'clock."],0,"對方問你怎麼了。","說明累的原因：昨晚熬夜。"),
L("l205","l2",2,["W: How much is this T-shirt?"],["It's two hundred dollars.","It's too small.","It's blue."],0,"How much 問價錢。","How much → 回答價錢。"),
L("l206","l2",2,["M: Can I borrow your eraser?"],["Sure. Here you are.","Yes, I can.","It's my eraser."],0,"借東西時怎麼回答。","答應借別人東西：Sure. Here you are."),
L("l207","l2",2,["W: Where did you go last weekend?"],["I went to the beach with my family.","I'm going to the beach.","I go to the beach every week."],0,"last weekend 用過去式。","問過去的事 → 用過去式 went。"),
L("l208","l2",2,["M: Happy birthday! This is for you."],["Thank you. How nice!","You're welcome.","Happy birthday to you, too."],0,"收到禮物怎麼回應。","收到生日禮物 → 道謝。"),
L("l209","l2",2,["W: Excuse me. Is there a post office near here?"],["Yes. It's next to the bank.","No, I don't like it.","It opens at nine."],0,"問地點。","問附近有沒有郵局 → 說明位置。"),
L("l210","l2",2,["M: What time does the movie start?"],["At seven thirty.","For two hours.","It's a funny movie."],0,"What time 問時間點。","What time → At seven thirty."),
L("l211","l2",2,["W: I'm sorry I'm late."],["That's OK. Come in.","You're welcome.","Yes, you are."],0,"對方道歉時怎麼回答。","接受道歉：That's OK."),
L("l212","l2",2,["M: How was your trip to Japan?"],["It was great. I had a lot of fun.","I went there by plane.","I'll go next month."],0,"How was ...? 問感覺。","How was your trip? → 說旅行好不好玩。"),
L("l213","l2",2,["W: Do you want to go hiking this Sunday?"],["Sounds good. What time?","I went hiking last Sunday.","No, I don't have a bike."],0,"對方邀約。","接受邀約並問時間最自然。"),
L("l214","l2",2,["M: Which one do you want, the red one or the green one?"],["The green one, please.","Yes, I want one.","I want two."],0,"Which 二選一。","Which ... A or B? → 選其中一個。"),
L("l215","l2",2,["W: Could you turn down the music? The baby is sleeping."],["Oh, sorry. I'll do it now.","Yes, the music is loud.","The baby is cute."],0,"對方請你把音樂關小聲。","道歉並照做。"),
L("l216","l2",2,["M: Who is the girl with long hair?"],["She's my cousin, Nina.","She's twelve years old.","She's very tall."],0,"Who 問身分。","Who → 說明她是誰。"),
L("l217","l2",2,["W: How do you usually get to school?"],["I take the MRT.","At seven o'clock.","With my sister."],0,"How 問方式。","How do you get to ...? → 交通方式。"),
L("l218","l2",2,["M: Hello, may I speak to Kevin?"],["Sorry, he's not home right now.","Yes, I'm speaking English.","This is Kevin's book."],0,"電話用語。","找人時，對方不在 → Sorry, he's not home."),
L("l219","l2",2,["W: Have you finished your homework?"],["Not yet. I'm still doing it.","Yes, I'll finish it.","I like homework."],0,"Have you ...? 問完成了沒。","還沒寫完 → Not yet."),
L("l220","l2",2,["M: Why were you absent yesterday?"],["Because I had a fever.","I was at school.","Yes, I was."],0,"Why 問原因。","Why → Because ...。"),
L("l221","l2",2,["W: What would you like to drink?"],["Some orange juice, please.","I'd like a hamburger.","I'm not hungry."],0,"問要喝什麼。","問飲料 → 回答飲料。漢堡不是飲料。"),
L("l222","l2",2,["M: Let's take a break. I'm tired."],["OK. Let's sit down over there.","No, I'm not tired.","Yes, it's broken."],0,"對方提議休息。","同意休息最自然。break 是休息，不是壞掉。"),
L("l223","l2",2,["W: How long have you lived in Taichung?"],["For about five years.","Five years ago.","It's very long."],0,"How long have you ...? 問多久。","現在完成式問持續多久 → For five years."),
L("l224","l2",2,["M: Don't forget to bring your umbrella."],["Thanks. I won't.","No, I don't.","It's not my umbrella."],0,"對方提醒你帶傘。","被提醒 → Thanks. I won't (forget)."),
L("l225","l2",2,["W: Is this seat taken?"],["No, please sit down.","Yes, I'm taking it home.","It's a nice seat."],0,"問這個位子有沒有人坐。","沒人坐 → No, please sit down."),
L("l226","l2",2,["M: What does your father do?"],["He's a bus driver.","He's watching TV.","He does his homework."],0,"問職業。","What does your father do? = 他的職業是什麼。"),
L("l227","l2",2,["W: Congratulations! You won first prize."],["Thank you. I'm so happy.","I'm sorry to hear that.","It's my pleasure."],0,"被恭喜時怎麼回答。","被恭喜 → 道謝、表達開心。"),
L("l228","l2",2,["M: May I take your order?"],["Yes, I'd like a chicken sandwich.","No, I don't have any money.","The menu is on the table."],0,"在餐廳點餐。","服務生問要點什麼 → 說出想點的餐點。"),

/* ---------- 聽力三・簡短對話（聽對話和問題） ---------- */
L("l301","l3",3,["W: Let's eat at the noodle shop tonight.","M: I had noodles for lunch. How about pizza?","W: OK. Pizza is fine with me.","What will they eat tonight?"],["Pizza.","Noodles.","Rice."],0,"最後決定吃什麼。","男生中午吃過麵，提議披薩，女生同意。"),
L("l302","l3",3,["M: Excuse me. How do I get to the museum?","W: Go straight and turn left at the second corner. It's across from the park.","Where is the museum?"],["Across from the park.","Next to the park.","At the first corner."],0,"注意聽位置。","It's across from the park.（在公園對面）"),
L("l303","l3",3,["W: Hi, Tom. Are you free on Saturday?","M: I have a piano lesson in the morning, but I'm free in the afternoon.","W: Great. Let's go to the movies then.","When will they go to the movies?"],["On Saturday afternoon.","On Saturday morning.","On Sunday afternoon."],0,"Tom 什麼時候有空。","早上有鋼琴課，下午有空 → 星期六下午。"),
L("l304","l3",3,["M: Mom, I can't find my soccer shoes.","W: Did you look under your bed?","M: Yes, but they're not there.","W: Oh, I put them in the car yesterday.","Where are the soccer shoes?"],["In the car.","Under the bed.","In the closet."],0,"最後一句是答案。","媽媽說昨天把鞋子放在車上。"),
L("l305","l3",3,["W: How much are these apples?","M: Thirty dollars each, or one hundred dollars for four.","W: I'll take four, please.","How much will the woman pay?"],["One hundred dollars.","One hundred and twenty dollars.","Thirty dollars."],0,"她買幾顆、怎麼算。","四顆特價一百元。"),
L("l306","l3",3,["M: You look happy today, Lucy.","W: I am! I got a hundred on my math test.","M: Wow, good for you!","Why is Lucy happy?"],["She did well on a test.","She got a new dog.","Today is her birthday."],0,"注意聽原因。","數學考了一百分。"),
L("l307","l3",3,["W: Is it going to rain tomorrow?","M: The radio says it will be sunny in the morning and rainy at night.","W: Then let's go hiking in the morning.","What will the weather be like tomorrow morning?"],["Sunny.","Rainy.","Windy."],0,"分清楚早上和晚上。","早上晴天，晚上才下雨。"),
L("l308","l3",3,["M: Can I help you?","W: Yes. I'd like to send this box to Tainan.","M: Please put it on the scale.","Where are they?"],["At a post office.","At a restaurant.","At a bookstore."],0,"寄包裹的地方。","寄箱子、放秤上 → 郵局。"),
L("l309","l3",3,["W: What time is it?","M: It's ten to eight.","W: Oh no! The bus leaves at eight. I have to go now.","What time does the bus leave?"],["At eight o'clock.","At seven fifty.","At ten past eight."],0,"注意問題問的是公車。","ten to eight 是現在時間（7:50），公車八點開。"),
L("l310","l3",3,["M: Do you have this shirt in a larger size?","W: Sorry, we only have small and medium.","M: That's too bad. Medium is too small for me.","What is the man's problem?"],["The shirt is too small for him.","The shirt is too expensive.","He doesn't like the color."],0,"他為什麼不買。","店裡沒有更大的尺寸，中號太小。"),
L("l311","l3",3,["W: Where's Dad?","M: He went to the bank. He'll be back in thirty minutes.","Where is Dad now?"],["At the bank.","At home.","At the supermarket."],0,"注意聽地點。","He went to the bank."),
L("l312","l3",3,["M: I'm going to the night market. Do you want to come?","W: I'd love to, but I have to finish my report first.","What will the woman do?"],["Finish her report.","Go to the night market.","Go to bed."],0,"注意 but 後面。","I'd love to, but ... → 婉拒，要先寫報告。"),
L("l313","l3",3,["W: Did you buy the milk?","M: Oh, sorry. I forgot. I'll go buy some now.","What will the man do next?"],["Go buy some milk.","Drink some milk.","Cook dinner."],0,"他忘了做什麼。","忘了買牛奶，現在要去買。"),
L("l314","l3",3,["M: How was the concert last night?","W: The music was great, but there were too many people.","What did the woman think about the concert?"],["The music was good.","The music was too loud.","It was boring."],0,"她說了優點和缺點。","音樂很棒，但人太多。"),
L("l315","l3",3,["W: Doctor, I have a bad headache.","M: Take this medicine three times a day, and get some rest.","How often should the woman take the medicine?"],["Three times a day.","Once a day.","Every three hours."],0,"How often 問次數。","three times a day = 一天三次。"),
L("l316","l3",3,["M: Which bus goes to the zoo?","W: Bus 236. It stops right in front of the zoo.","M: Thanks. And how long does it take?","W: About twenty minutes.","How will the man go to the zoo?"],["By bus.","By MRT.","On foot."],0,"注意交通工具。","搭 236 號公車。"),
L("l317","l3",3,["W: Let's buy a gift for Ms. Chen. She's leaving our school next week.","M: Good idea. How about some flowers?","W: She likes reading. Let's buy her a book.","What will they buy for Ms. Chen?"],["A book.","Some flowers.","A card."],0,"最後決定的禮物。","陳老師喜歡閱讀 → 買書。"),
L("l318","l3",3,["M: Hello, this is Ben. Is Amy there?","W: Sorry, she's taking a shower. Can I take a message?","M: Please ask her to call me back.","What is Amy doing?"],["Taking a shower.","Talking on the phone.","Doing her homework."],0,"注意 she's ...ing。","she's taking a shower（正在洗澡）。"),
L("l319","l3",3,["W: You're late again, Peter.","M: Sorry, Ms. Wang. My alarm clock didn't ring.","Why was Peter late?"],["His alarm clock didn't work.","He missed the bus.","He was sick."],0,"注意原因。","鬧鐘沒響。"),
L("l320","l3",3,["M: What do you want to be in the future?","W: I want to be a nurse. I like helping sick people.","What does the woman want to be?"],["A nurse.","A doctor.","A teacher."],0,"注意職業。","I want to be a nurse."),
L("l321","l3",3,["W: Are you ready for the trip to Kenting?","M: Almost. I packed my clothes, but I can't find my swimsuit.","What can't the man find?"],["His swimsuit.","His clothes.","His bag."],0,"注意 can't find。","找不到泳衣。"),
L("l322","l3",3,["M: Shall we play basketball after school?","W: Sorry, I can't. I hurt my leg last week.","Why can't the woman play basketball?"],["Her leg hurts.","She has to study.","It's raining."],0,"注意原因。","上週腳受傷了。"),
L("l323","l3",3,["W: This restaurant is always full.","M: Yes, the food is delicious and not expensive.","What does the man say about the restaurant?"],["The food is good and cheap.","The food is too expensive.","It's always empty."],0,"他稱讚了什麼。","delicious and not expensive = 好吃又便宜。"),
L("l324","l3",3,["M: When is your English test?","W: It's next Monday. Today is Thursday, so I have four days to study.","When is the woman's English test?"],["Next Monday.","This Thursday.","In two days."],0,"注意星期。","It's next Monday."),
L("l325","l3",3,["W: Can you help me carry these boxes?","M: Sure. Where do you want them?","W: Put them in the living room, please.","Where will the man put the boxes?"],["In the living room.","In the kitchen.","In the car."],0,"注意最後的地點。","Put them in the living room."),
L("l326","l3",3,["M: I want to learn to swim this summer.","W: My uncle teaches swimming. His classes are on Tuesday and Thursday evenings.","When are the swimming classes?"],["On Tuesday and Thursday evenings.","Every morning.","On weekends."],0,"注意星期和時段。","Tuesday and Thursday evenings."),
L("l327","l3",3,["W: Have you seen my glasses?","M: Aren't they on your head?","W: Oh, you're right. Thanks!","Where were the woman's glasses?"],["On her head.","On the table.","In her bag."],0,"男生說在哪裡。","眼鏡就在她頭上。"),
L("l328","l3",3,["M: How many people are coming to the party?","W: Twelve. But two of them may be late.","How many people are coming to the party?"],["Twelve.","Ten.","Two."],0,"問的是總人數。","十二個人會來，其中兩個可能遲到。"),

/* ---------- 聽力四・短文聽解（聽短文和問題，選出符合的圖） ---------- */
L("l401","l4",4,["Hi, I'm Kevin. Every Saturday morning, I go to the park with my dad. We don't play basketball there. We ride our bikes around the lake.","What does Kevin do on Saturday mornings?"],["男孩和爸爸打籃球","男孩和爸爸在湖邊騎腳踏車","男孩在放風箏"],1,"注意 don't 後面是不做的事。","他們不打籃球，而是繞著湖騎腳踏車 → (B)。","Panel A: a boy and his father playing basketball. Panel B: a boy and his father riding bicycles beside a lake. Panel C: a boy flying a kite in a grassy field."),
L("l402","l4",4,["Good morning. Here is today's weather. It will be cloudy in the morning. In the afternoon, it will rain, so don't forget your umbrella.","What will the weather be like this afternoon?"],["晴天","陰天","下雨"],2,"分清楚早上和下午。","下午會下雨 → (C)。","Panel A: a bright sun in a clear sky over a house. Panel B: dark clouds covering the sky over a house, no rain. Panel C: rain falling and a person holding an umbrella."),
L("l403","l4",4,["Lisa wanted to buy a present for her mother. She thought about a scarf, but her mother already has many scarves. In the end, she bought a pair of gloves.","What did Lisa buy?"],["一雙手套","一條圍巾","一頂帽子"],0,"In the end 後面是答案。","最後買了一雙手套 → (A)。","Panel A: a pair of winter gloves. Panel B: a long knitted scarf. Panel C: a knitted winter hat."),
L("l404","l4",4,["Attention, please. The library will close in ten minutes. If you want to borrow books, please bring them to the front desk now. Thank you.","Where can you hear this?"],["餐廳","運動中心","圖書館"],2,"聽關鍵字 borrow books。","圖書館要關門了 → (C)。","Panel A: people eating at tables in a restaurant. Panel B: people playing table tennis in a sports center. Panel C: a library with bookshelves and a front desk."),
L("l405","l4",4,["My room is small, but I love it. My bed is next to the window, and my desk is next to the door. I always keep my guitar on my bed.","Where does the speaker keep the guitar?"],["吉他放在床上","吉他放在書桌上","吉他放在門邊的地上"],0,"注意最後一句。","吉他放在床上 → (A)。","Panel A: a guitar lying on a bed. Panel B: a guitar lying on a desk. Panel C: a guitar standing on the floor next to a door."),
L("l406","l4",4,["Mr. Lin is a busy man. He gets up at six every day. He doesn't drive to work. He takes the bus, and he reads the newspaper on the bus.","How does Mr. Lin go to work?"],["開車","搭公車","走路"],1,"注意 doesn't drive。","他不開車，搭公車 → (B)。","Panel A: a man driving a car. Panel B: a man sitting on a bus reading a newspaper. Panel C: a man walking on a sidewalk with a briefcase."),
L("l407","l4",4,["Thank you for calling Happy Pizza. This week, if you buy one large pizza, you can get a bottle of cola for free.","What can you get for free?"],["冰淇淋","漢堡","一瓶可樂"],2,"注意 for free。","買大披薩送一瓶可樂 → (C)。","Panel A: an ice cream cone. Panel B: a hamburger. Panel C: a large bottle of cola."),
L("l408","l4",4,["Amy's family has a new pet. It's small and white, and it has long ears. It likes to eat carrots.","What is Amy's new pet?"],["白色的兔子","貓","小鳥"],0,"長耳朵、愛吃紅蘿蔔。","小、白色、長耳朵、吃紅蘿蔔 → 兔子 (A)。","Panel A: a small white rabbit with long ears eating a carrot. Panel B: a cat sitting on a cushion. Panel C: a small bird in a cage."),
L("l409","l4",4,["Last night, Tom stayed up late to watch a baseball game on TV. This morning, he got up late and missed the bus, so he ran all the way to school.","What did Tom do this morning?"],["搭公車上學","跑步去學校","在家看電視"],1,"注意 This morning。","今天早上錯過公車，一路跑去學校 → (B)。看電視是昨晚的事。","Panel A: a boy getting on a school bus. Panel B: a boy with a backpack running along a street toward a school. Panel C: a boy sitting on a sofa watching TV."),
L("l410","l4",4,["Welcome to Green Hill Zoo. You can take pictures of the animals, but please don't give them any food. Have a nice day!","What can't visitors do at the zoo?"],["拍動物的照片","餵猴子吃東西","坐在長椅上吃午餐"],1,"注意 don't 後面。","不可以餵動物 → (B)。","Panel A: a girl taking a photo of an elephant with a camera. Panel B: a boy giving food to a monkey through a fence. Panel C: a family eating lunch on a park bench."),
L("l411","l4",4,["Next Friday is Grandma's birthday. My mom will make a big cake, and my sister and I will make a card for her. My dad will buy some flowers.","What will the speaker do for Grandma's birthday?"],["做蛋糕","買花","做卡片"],2,"注意 my sister and I。","我和妹妹要做卡片 → (C)。蛋糕是媽媽、花是爸爸。","Panel A: a woman baking a big cake in a kitchen. Panel B: a man buying flowers at a flower shop. Panel C: two children drawing and making a greeting card at a table."),
L("l412","l4",4,["I usually walk my dog after dinner. But it's raining hard tonight, so we're staying at home. My dog is sleeping next to me while I read a book.","What is the speaker doing tonight?"],["在家看書，狗睡在旁邊","在雨中遛狗","在公園跑步"],0,"注意 tonight 和 But。","今晚下大雨待在家，看書、狗在旁邊睡覺 → (A)。","Panel A: a person reading a book on a sofa with a dog sleeping next to them. Panel B: a person walking a dog in the rain with an umbrella. Panel C: a person jogging in a park."),

/* ---------- 閱讀一・詞彙 ---------- */
M("v31","g1","It's very cold outside. Put on your ___ before you go out.",["coat","shorts","sandals","glasses"],0,"天氣冷要穿什麼？","coat = 外套。"),
M("v32","g1","Mr. Wu is a ___. He works at a hospital and takes care of sick people.",["doctor","farmer","cook","pilot"],0,"在醫院照顧病人。","doctor = 醫生。"),
M("v33","g1","I can't ___ the box. It's too heavy.",["carry","drop","open","sell"],0,"箱子太重，沒辦法…","carry = 搬、提。"),
M("v34","g1","Please speak more ___. The baby is sleeping.",["quietly","loudly","quickly","badly"],0,"寶寶在睡覺。","quietly = 安靜地。"),
M("v35","g1","Kevin ___ his keys, so he couldn't open the door.",["lost","won","found","kept"],0,"打不開門的原因。","lose（遺失）的過去式 lost。"),
M("v36","g1","The ___ in this restaurant is great. Everything tastes delicious.",["food","floor","farm","fire"],0,"東西都好吃。","food = 食物。"),
M("v37","g1","We have ___ milk left. Can you buy some on your way home?",["little","many","a few","few"],0,"milk 不可數，剩很少。","little + 不可數名詞 = 幾乎沒有；many / few 接可數名詞。"),
M("v38","g1","Ken is ___ in music. He goes to concerts every month.",["interested","interesting","bored","tired"],0,"be ___ in = 對…有興趣。","be interested in（人對事物感興趣）；interesting 形容事物。"),
M("v39","g1","My grandmother lives in the ___. There are many trees and farms there.",["countryside","city","office","station"],0,"有很多樹和農田。","countryside = 鄉下。"),
M("v40","g1","Don't ___ the street when the light is red.",["cross","close","climb","count"],0,"紅燈時不要…馬路。","cross the street = 過馬路。"),
M("v41","g1","Amy: Thank you for your help.\nBen: ___",["You're welcome.","Yes, please.","Excuse me.","I'm sorry."],0,"被道謝時怎麼回答。","You're welcome. = 不客氣。"),
M("v42","g1","This is the ___ movie I've ever seen. I want to see it again.",["best","good","better","well"],0,"I've ever seen → 最高級。","the best ... I've ever seen = 我看過最好的。"),
M("v43","g1","The store is ___ on Sundays, so we can't go shopping there today.",["closed","opened","cheap","busy"],0,"沒辦法去購物。","closed = 沒營業的。"),
M("v44","g1","Jenny always ___ her teeth after meals.",["brushes","washes","cuts","combs"],0,"刷牙。","brush one's teeth = 刷牙。"),
M("v45","g1","How ___ does it take to walk to the MRT station?",["long","much","many","far"],0,"How ___ does it take? 問花多少時間。","How long does it take ...? 問需要多久。"),
M("v46","g1","I'm ___ for my glasses. Have you seen them?",["looking","finding","watching","seeing"],0,"正在找。","look for = 尋找（過程）；find 是找到（結果）。"),
M("v47","g1","There is a big ___ between Taipei and Kaohsiung in the weather this week. It's cold in the north and hot in the south.",["difference","distance","dream","danger"],0,"北冷南熱。","difference = 差別。"),
M("v48","g1","Sam ___ goes to bed late. He sleeps at ten every night.",["never","always","often","usually"],0,"每晚十點就睡。","never = 從不。每天十點睡，所以從不晚睡。"),
M("v49","g1","Please ___ your name on the paper before you start the test.",["write","read","draw","speak"],0,"考試前要先寫名字。","write your name = 寫上你的名字。"),
M("v50","g1","My brother is good at ___. He wants to be a chef.",["cooking","singing","swimming","driving"],0,"chef 是廚師。","想當廚師 → 擅長烹飪。"),
M("v51","g1","The weather is nice. ___ go for a walk.",["Let's","Let","Shall","Why"],0,"___ + 原形動詞（提議）。","Let's + 原形動詞 = 我們…吧。"),
M("v52","g1","I usually ___ the MRT to school, but today I walked.",["take","ride","drive","get"],0,"搭捷運。","take the MRT / bus = 搭乘。"),
M("v53","g1","The hamburger is ___ big for me. I can't finish it.",["too","very","so","enough"],0,"吃不完。","too + 形容詞 = 太…（負面）。"),
M("v54","g1","Ms. Lee is ___. She doesn't get angry easily.",["patient","lazy","rude","noisy"],0,"不容易生氣。","patient = 有耐心的。"),
M("v55","g1","We ___ in Tainan since 2020.",["have lived","live","lived","are living"],0,"since 2020 → 現在完成式。","since + 過去時間點 → have + p.p.。"),
M("v56","g1","Mia: ___ is your birthday?\nKen: It's on June 5th.",["When","Where","Who","How"],0,"回答是日期。","When 問時間。"),
M("v57","g1","Turn ___ the TV. I want to watch the news.",["on","off","down","around"],0,"想看新聞要先…電視。","turn on = 打開（電器）。"),
M("v58","g1","Peter and I are in the same class. We are ___.",["classmates","cousins","neighbors","teachers"],0,"同班。","classmates = 同班同學。"),
M("v59","g1","You can't play here. It's ___ dangerous.",["very","many","much","a lot of"],0,"修飾形容詞 dangerous。","very + 形容詞；many / a lot of 後面接名詞，much 不能直接修飾原級形容詞。"),
M("v60","g1","I didn't have breakfast this morning, so I'm very ___ now.",["hungry","full","thirsty","sleepy"],0,"沒吃早餐。","hungry = 餓的。"),

/* ---------- 閱讀二・段落填空 ---------- */
G("c07","g2","cloze","My New Neighbor",[
  "A new family moved in next door last week. They have a son, Leo. He is [[1]] age as me, so we go to the same school. Leo comes from Canada, and he can speak English and French. He doesn't speak Chinese [[2]], but he is learning fast. Yesterday, I [[3]] him around our neighborhood. [[4]]"
],[["move in","搬進來"],["next door","隔壁"],["French","法語"],["neighborhood","社區、鄰近地區"]],[
  B("c07a",1,["the same","different","older","many"],0,"the same ___ as 跟…一樣。","the same age as me = 跟我同年紀。"),
  B("c07b",2,["well","good","much better","nice"],0,"修飾動詞 speak。","speak Chinese well（副詞）= 中文說得好。"),
  B("c07c",3,["showed","told","said","looked"],0,"show someone around = 帶某人參觀。","show him around = 帶他到處看看。"),
  B("c07d",4,["He said our neighborhood was nice and quiet.","He went back to Canada yesterday.","I don't know who he is.","Our school is in Canada."],0,"帶他逛完之後…","帶他逛社區 → 他說社區又好又安靜，最連貫。")
]),
G("c08","g2","cloze","A Message from the Class Leader",[
  "Hi, everyone. Our class trip is on Friday. Please [[1]] at the school gate at 7:30 a.m. The bus will leave at 7:45, so don't be late. Bring your lunch and some water [[2]] we won't stop at a restaurant. If it [[3]], we will go to the science museum instead of the farm. [[4]]",
  "— Grace"
],[["class leader","班長"],["gate","大門"],["instead of","而不是"]],[
  B("c08a",1,["meet","meets","meeting","to meet"],0,"Please + 原形動詞。","祈使句 Please meet ...。"),
  B("c08b",2,["because","but","or","so that we can"],0,"帶午餐的原因。","because = 因為（不會停餐廳）。"),
  B("c08c",3,["rains","will rain","rained","is raining yesterday"],0,"If 子句用現在式表示未來。","If it rains（條件句用現在簡單式）。"),
  B("c08d",4,["See you on Friday!","I went to the farm last year.","The museum is very old.","Lunch is not important."],0,"訊息結尾。","See you on Friday! 是自然的結尾。")
]),
G("c09","g2","cloze","Grandpa's Garden",[
  "My grandpa has a small garden behind his house. He grows tomatoes, carrots, and some flowers. Every morning, he gets up early [[1]] water the plants. Last summer, it [[2]] for a long time, and many plants died. Grandpa was very sad. [[3]], this year he put a big bucket under the roof to collect rainwater. Now his garden is [[4]] than before."
],[["grow","種植"],["bucket","水桶"],["collect","收集"],["rainwater","雨水"]],[
  B("c09a",1,["to","for","and then","so"],0,"表示目的：為了…","get up early to water = 早起去澆水（不定詞表目的）。"),
  B("c09b",2,["didn't rain","rained hard","snowed","was rainy"],0,"很多植物死了。","很久沒下雨 → 植物枯死。"),
  B("c09c",3,["So","But","Or","Because"],0,"前面是原因，後面是做法。","因為去年缺水，所以今年收集雨水 → So。"),
  B("c09d",4,["greener","green","the greenest","more green"],0,"than → 比較級。","green 的比較級 greener。")
]),
G("c10","g2","cloze","The Lost Wallet",[
  "On my way home yesterday, I found a wallet on the sidewalk. There was some money and a student card [[1]] it. The card belonged to a girl from my school. I [[2]] keep the money, so I took the wallet to the school office this morning. [[3]] The girl came to my classroom at lunch and gave me a box of cookies. She said, \"Thank you for [[4]] my wallet!\""
],[["wallet","錢包"],["sidewalk","人行道"],["belong to","屬於"]],[
  B("c10a",1,["in","on","at","under"],0,"錢包「裡面」。","in it = 在錢包裡面。"),
  B("c10b",2,["didn't want to","wanted to","had to","was going to"],0,"後面說把錢包交到辦公室。","不想留著那些錢 → didn't want to。"),
  B("c10c",3,["The teacher called the girl to the office.","I spent the money on snacks.","The wallet was mine.","I lost my student card."],0,"交到辦公室之後…","老師請女孩到辦公室，接著女孩來道謝，最連貫。"),
  B("c10d",4,["returning","return","returned","to return"],0,"介系詞 for + V-ing。","Thank you for + V-ing。")
]),

/* ---------- 閱讀三・閱讀理解 ---------- */
G("r09","g3","notice","Lost Dog",[
  "LOST DOG — Have you seen Coco?",
  "Coco is a small brown dog with a white tail. She is three years old and is wearing a red collar.",
  "She ran away from Sunshine Park on Sunday afternoon, October 12.",
  "If you see her, please call Mrs. Huang at 0912-345-678.",
  "We will give $2,000 to the person who finds her."
],[["tail","尾巴"],["collar","項圈"],["run away","跑走"]],[
  Q("r09a","What does Coco look like?",["She is brown with a white tail.","She is white with a brown tail.","She is big and black.","She is wearing a blue collar."],0,"找外表描述。","a small brown dog with a white tail。"),
  Q("r09b","Where did Coco run away?",["From a park.","From a school.","From a pet shop.","From Mrs. Huang's car."],0,"ran away from ...","ran away from Sunshine Park。"),
  Q("r09c","What will the person who finds Coco get?",["Some money.","A new dog.","A red collar.","A phone."],0,"最後一句。","找到的人可以得到 2,000 元。")
]),
G("r10","g3","article","A Day without Phones",[
  "Last month, Ms. Chang's class tried something new: \"No Phone Day.\" For one whole day, the students didn't use their phones at all, not even after school.",
  "At first, many students felt worried. Jack said, \"I always check my phone in the morning. I didn't know what to do!\" But soon, they found other things to do. Some students played basketball, and some read books in the library. Nina talked with her grandmother for an hour. \"We never talked that long before,\" she said.",
  "At the end of the day, most students said it was hard but interesting. Now the class has \"No Phone Day\" once a month."
],[["at all","完全（不）"],["check","查看"],["once a month","一個月一次"]],[
  Q("r10a","What did the students do on \"No Phone Day\"?",["They didn't use their phones.","They bought new phones.","They used phones only after school.","They called their grandparents."],0,"第一段。","整天完全不用手機，放學後也不用。"),
  Q("r10b","How did many students feel at first?",["Worried.","Excited.","Angry.","Sleepy."],0,"At first ...","At first, many students felt worried."),
  Q("r10c","Which is TRUE?",["The class now has \"No Phone Day\" every month.","Nina talked with her grandmother on the phone.","Jack never checks his phone in the morning.","Most students said the day was easy."],0,"逐項比對。","Now the class has \"No Phone Day\" once a month.（B 錯：那天不用手機；C 錯：他每天早上都看；D 錯：大家說很難。）")
]),
G("r11","g3","notice","City Library — Summer Classes for Kids",[
  "Story Time (ages 4–6): Every Tuesday, 10:00–11:00 a.m. Free",
  "Comic Drawing (ages 9–12): Every Thursday, 2:00–4:00 p.m. $300 for 4 weeks",
  "Science Fun (ages 7–10): Every Saturday, 9:00–11:00 a.m. $500 for 4 weeks",
  "• Sign up at the front desk or on our website before July 1.",
  "• Each class has only 15 seats."
],[["sign up","報名"],["seat","座位、名額"]],[
  Q("r11a","Tim is 11 years old and loves drawing. Which class is good for him?",["Comic Drawing.","Story Time.","Science Fun.","None of them."],0,"注意年齡和興趣。","9–12 歲、畫畫 → Comic Drawing。"),
  Q("r11b","Which class does NOT cost any money?",["Story Time.","Comic Drawing.","Science Fun.","All of them."],0,"找 Free。","Story Time 免費。"),
  Q("r11c","What is TRUE about the classes?",["You can sign up on the website.","Science Fun is on Thursdays.","Each class has 30 seats.","You can sign up in August."],0,"逐項比對。","可以在櫃台或網站報名。")
]),
G("r12","g3","article","Two Messages",[
  "【Message 1】 From: Mom — To: Eric — 4:10 p.m.",
  "Eric, I have to work late tonight. Dad will pick you up after basketball practice at six. There's some fried rice in the fridge. Heat it up for dinner. Love, Mom",
  "【Message 2】 From: Eric — To: Dad — 5:50 p.m.",
  "Dad, practice ended early today because the coach was sick. I'm going to Andy's house now. It's near the school. Can you pick me up there at seven? Thanks!"
],[["pick up","接（人）"],["practice","練習"],["coach","教練"],["heat up","加熱"]],[
  Q("r12a","Why did Mom write to Eric?",["She will come home late.","She wants Eric to cook fried rice.","She is sick.","She will pick Eric up."],0,"第一則訊息。","I have to work late tonight."),
  Q("r12b","Why did basketball practice end early?",["The coach was sick.","It was raining.","Eric was tired.","Andy had a party."],0,"第二則訊息。","because the coach was sick。"),
  Q("r12c","Where will Dad pick Eric up?",["At Andy's house.","At school.","At home.","At the basketball court."],0,"Eric 的新要求。","Can you pick me up there（Andy 家）at seven?")
]),
G("r13","g3","notice","Movie Times — Star Cinema",[
  "Happy Panda (cartoon, 90 min): 1:00 p.m. / 3:30 p.m.",
  "Space Heroes (action, 2 hr 10 min): 4:00 p.m. / 7:30 p.m.",
  "Lost in Paris (love story, 1 hr 45 min): 6:00 p.m. / 9:00 p.m.",
  "Tickets: $280. Wednesdays: All tickets $200.",
  "Students: $30 off with a student card (not on Wednesdays)."
],[["cartoon","卡通"],["action","動作片"],["min = minutes","分鐘"]],[
  Q("r13a","Amy wants to see Space Heroes at 7:30. When will the movie end?",["At 9:40.","At 9:30.","At 9:10.","At 10:00."],0,"7:30 + 2 小時 10 分。","7:30 + 2:10 = 9:40。"),
  Q("r13b","A student goes to the movies on Monday with a student card. How much is the ticket?",["$250.","$280.","$200.","$170."],0,"280 − 30。","星期一學生票 280 − 30 = 250。"),
  Q("r13c","Which movie is the shortest?",["Happy Panda.","Space Heroes.","Lost in Paris.","They are all the same."],0,"比較片長。","Happy Panda 90 分鐘最短。")
]),
G("r14","g3","article","My Favorite Place",[
  "When I was a child, my favorite place was my uncle's fruit farm in Taitung. Every summer vacation, my parents took me there for two weeks.",
  "On the farm, I helped my uncle pick mangoes and feed the chickens. In the evening, we sat outside and looked at the stars. In the city, I could never see so many stars.",
  "Now I'm in junior high school, and I'm too busy to go there every summer. But I still remember the sweet mangoes and the bright stars. I hope I can go back next year."
],[["farm","農場"],["pick","採摘"],["mango","芒果"],["bright","明亮的"]],[
  Q("r14a","What is this article mainly about?",["A place the writer loved as a child.","How to grow mangoes.","The writer's school life.","Why the city is better than the countryside."],0,"主旨。","作者小時候最喜歡的地方——叔叔的農場。"),
  Q("r14b","What did the writer NOT do on the farm?",["Swim in the river.","Pick mangoes.","Feed the chickens.","Look at the stars."],0,"文中沒提到的事。","文中沒有提到游泳。"),
  Q("r14c","Why doesn't the writer go to the farm every summer now?",["The writer is too busy.","The farm is closed.","The uncle moved to the city.","The writer doesn't like mangoes."],0,"第三段。","I'm too busy to go there every summer."),
]),
G("r15","g3","dialogue","At the Train Station",[
  "Man: Excuse me. When is the next train to Hsinchu?",
  "Clerk: The next one leaves at 10:20, but it's a local train. It takes about two hours.",
  "Man: Is there a faster one?",
  "Clerk: Yes. The express train leaves at 10:45. It only takes one hour.",
  "Man: Great. I'll take the express. One ticket, please.",
  "Clerk: That's $180. The train leaves from Platform 3."
],[["local train","區間車"],["express train","自強號（快車）"],["platform","月台"]],[
  Q("r15a","Which train will the man take?",["The 10:45 train.","The 10:20 train.","The 11:20 train.","The 12:20 train."],0,"他選了哪一班。","I'll take the express.（10:45）"),
  Q("r15b","When will the man get to Hsinchu?",["At about 11:45.","At about 12:20.","At about 10:45.","At about 12:45."],0,"10:45 + 1 小時。","快車 10:45 出發，一小時 → 約 11:45。"),
  Q("r15c","Where should the man go to take the train?",["Platform 3.","Platform 1.","The ticket office.","Platform 10."],0,"最後一句。","The train leaves from Platform 3.")
]),
G("r16","g3","article","Two Ads",[
  "【Ad 1】 Happy Bikes — Rent a bike! $50 for one hour, $200 for one day. Open 8 a.m.–6 p.m. Helmets are free.",
  "【Ad 2】 Riverside Bikes — Rent a bike! $40 for one hour, $250 for one day. Open 7 a.m.–8 p.m. Helmets: $20 each.",
  "Kelly and her brother want to ride bikes along the river for two hours this Saturday evening, from 6 to 8 p.m. They need helmets."
],[["rent","租"],["helmet","安全帽"],["along","沿著"]],[
  Q("r16a","Which shop should Kelly and her brother go to?",["Riverside Bikes, because it's open later.","Happy Bikes, because it's cheaper.","Happy Bikes, because the helmets are free.","Either one."],0,"注意他們騎車的時間。","晚上 6～8 點，只有 Riverside 開到 8 點。"),
  Q("r16b","How much will they pay in all for two bikes and two helmets?",["$200.","$160.","$240.","$180."],0,"40 × 2 小時 × 2 人 + 20 × 2。","兩台車各兩小時 40×2×2 = 160，加上兩頂安全帽 40 → 200。"),
  Q("r16c","Which is TRUE about Happy Bikes?",["It closes at 6 p.m.","It costs $250 for one day.","Helmets cost $20.","It opens at 7 a.m."],0,"看第一則廣告。","Happy Bikes 營業到下午六點。")
]),
G("r17","g3","article","An Email from Japan",[
  "Hi, Wendy,",
  "I've been in Osaka for a week now. My host family is very kind. The father is a cook, and every night he makes delicious food for us. My favorite is okonomiyaki, a kind of Japanese pancake.",
  "My Japanese is not very good, so sometimes I use my hands to talk. Yesterday, I wanted to buy a train ticket, but I didn't know how to use the machine. A high school girl helped me. People here are so friendly!",
  "I'll come back to Taiwan next Sunday. I bought you a small gift. See you soon!",
  "Ruby"
],[["host family","寄宿家庭"],["pancake","煎餅"],["machine","機器"],["friendly","友善的"]],[
  Q("r17a","Who is Ruby writing to?",["Her friend in Taiwan.","Her host family.","A high school girl.","A cook in Osaka."],0,"信的開頭和結尾。","寫給 Wendy，並說回台灣後要給她禮物 → 在台灣的朋友。"),
  Q("r17b","What is okonomiyaki?",["A kind of Japanese food.","A train ticket.","A Japanese city.","A small gift."],0,"文中有解釋。","a kind of Japanese pancake。"),
  Q("r17c","What problem did Ruby have yesterday?",["She didn't know how to buy a ticket.","She lost her way.","She got sick.","She missed the train."],0,"Yesterday ...","不會用售票機。")
]),
G("r18","g3","notice","School Notice: Clean-up Day",[
  "Dear Students,",
  "Next Wednesday, May 14, is our school's Clean-up Day. There will be no classes in the afternoon.",
  "1:00–2:30 p.m.: Clean your classroom and the hallway.",
  "2:30–3:30 p.m.: Grade 7 students clean the school garden. Grade 8 and 9 students clean the sports field.",
  "Please bring a rag and wear old clothes. Students who finish early can go home at 3:30."
],[["hallway","走廊"],["rag","抹布"],["sports field","運動場"]],[
  Q("r18a","What will students NOT do next Wednesday afternoon?",["Have classes.","Clean the classroom.","Clean the hallway.","Wear old clothes."],0,"There will be no ...","下午沒有上課。"),
  Q("r18b","Ken is in Grade 8. Where will he be at 3:00 p.m.?",["On the sports field.","In the school garden.","At home.","In his classroom."],0,"2:30–3:30 八年級去哪裡。","八、九年級 2:30–3:30 打掃運動場。"),
  Q("r18c","What should students bring?",["A rag.","A sports shirt.","A garden tool.","Their textbooks."],0,"Please bring ...","Please bring a rag.")
]),
G("r19","g3","article","The Kind Bus Driver",[
  "Every morning, Mr. Tsai drives the No. 18 bus. Many students take his bus to school. Mr. Tsai always says \"Good morning!\" to everyone with a big smile.",
  "One rainy morning, an old man got on the bus with wet clothes. He was shaking. Mr. Tsai gave the old man his own jacket. Later, a student took a photo of this and put it on the Internet. Thousands of people saw it.",
  "Now many people know Mr. Tsai. But he says, \"I only did a small thing. Anyone could do it.\""
],[["shake","發抖"],["the Internet","網路"],["thousands of","數以千計的"]],[
  Q("r19a","What did Mr. Tsai do on the rainy morning?",["He gave his jacket to an old man.","He took a photo of an old man.","He didn't drive the bus.","He bought an umbrella for a student."],0,"第二段。","把自己的外套給老先生。"),
  Q("r19b","How did many people learn about Mr. Tsai?",["From a photo on the Internet.","From the newspaper.","From the old man.","From his family."],0,"a student took a photo ...","學生拍照放上網路，數千人看到。"),
  Q("r19c","What kind of person is Mr. Tsai?",["Kind and humble.","Rich and famous.","Angry and rude.","Lazy and quiet."],0,"從他的行為和說的話判斷。","幫助別人又說「只是小事」→ 善良又謙虛（humble）。")
]),

/* ---------- 寫作一・句子改寫 ---------- */
RW("w16","g4","Jenny can swim very well.","改成疑問句","Can Jenny",["Can Jenny swim very well?"],"助動詞移到句首。","Can + 主詞 + 原形動詞？"),
RW("w17","g4","They are playing volleyball in the gym.","改成否定句","They",["They {are not|aren't} playing volleyball in the gym."],"be 動詞後加 not。","They are not (aren't) playing volleyball in the gym."),
RW("w18","g4","Kevin washes his father's car every Sunday.","把 every Sunday 改成 last Sunday","Kevin",["Kevin washed his father's car last Sunday."],"last Sunday → 過去式。","washes → washed。"),
RW("w19","g4","I will visit my grandparents this weekend.","用 be going to 改寫","I",["I am going to visit my grandparents this weekend.","I'm going to visit my grandparents this weekend."],"will = be going to。","I am going to visit ...。"),
RW("w20","g4","My mother bought a new bike.","針對劃線部分（a new bike）改成疑問句","What",["What did your mother buy?"],"What + did + 主詞 + 原形動詞？","問「買了什麼」→ What did your mother buy?（my 改成 your）"),
RW("w21","g4","The story is very interesting.","改成感嘆句","What",["What an interesting story {it is|}!"],"What + a/an + 形容詞 + 名詞 + 主詞 + 動詞！","What an interesting story (it is)!"),
RW("w22","g4","Tom is 160 cm tall. Ben is 160 cm tall, too.","用 as ... as 改寫成一句","Tom",["Tom is as tall as Ben."],"as + 原級 + as。","兩人一樣高 → Tom is as tall as Ben."),
RW("w23","g4","Somebody stole my bike.","改成被動語態","My bike",["My bike was stolen{ by somebody|}."],"be + p.p.（steal-stole-stolen）","My bike was stolen (by somebody)."),
RW("w24","g4","Please close the window.","改成否定的祈使句","Please",["Please {don't|do not} close the window."],"Don't + 原形動詞。","Please don't close the window."),
RW("w25","g4","Lisa has two brothers.","改成疑問句","Does Lisa",["Does Lisa have two brothers?"],"has 變回原形 have。","Does Lisa have two brothers?"),
RW("w26","g4","He finished his homework.","加上 already 改成現在完成式","He",["He has already finished his homework.","He's already finished his homework."],"has + already + p.p.","He has already finished his homework."),
RW("w27","g4","It is cold today.","改成附加問句","It is cold today,",["It is cold today, isn't it?"],"肯定句 → 否定的附加問句。","It is cold today, isn't it?"),

/* ---------- 寫作一・句子合併 ---------- */
RW("m13","g5",["I was tired.","I went to bed early."],"用 because 合併","I went to bed early",["I went to bed early because I was tired."],"結果 + because + 原因。","I went to bed early because I was tired."),
RW("m14","g5",["Sam likes math.","Sam doesn't like English."],"用 but 合併","Sam likes math",["Sam likes math{,|} but {he|Sam} {doesn't|does not} like English."],"相反的事用 but。","Sam likes math, but he doesn't like English."),
RW("m15","g5",["The girl is my sister.","The girl is singing on the stage."],"用 who 合併","The girl",["The girl {who|that} is singing on the stage is my sister."],"關係代名詞 who 修飾 the girl。","The girl who is singing on the stage is my sister."),
RW("m16","g5",["I got home.","My dog ran to me."],"用 When 合併","When",["When I got home, my dog ran to me."],"When + 子句, 主要子句。","When I got home, my dog ran to me."),
RW("m17","g5",["You can drink tea.","You can drink coffee."],"用 or 合併","You can drink",["You can drink tea or coffee."],"二選一用 or。","You can drink tea or coffee."),
RW("m18","g5",["This is the book.","I bought the book yesterday."],"用 that 合併","This is the book",["This is the book {that|which} I bought yesterday.","This is the book I bought yesterday."],"that 代替 the book。","This is the book that I bought yesterday."),
RW("m19","g5",["Mary didn't go to the party.","Joe didn't go to the party."],"用 Neither ... nor ... 合併","Neither",["Neither Mary nor Joe went to the party."],"Neither A nor B + 肯定動詞。","Neither Mary nor Joe went to the party.（went 是肯定形）"),
RW("m20","g5",["The box is very heavy.","I can't carry it."],"用 too ... to ... 合併","The box is",["The box is too heavy for me to carry.","The box is too heavy to carry."],"too + 形容詞 + to + 動詞。","The box is too heavy (for me) to carry."),
RW("m21","g5",["Do you know?","Where does Andy live?"],"合併成一句（間接問句）","Do you know",["Do you know where Andy lives?"],"疑問詞 + 主詞 + 動詞。","間接問句：Do you know where Andy lives?（does 去掉，live 加 s）"),
RW("m22","g5",["Finish your homework.","Then you can watch TV."],"用 after 合併","You can watch TV",["You can watch TV after you finish your homework.","You can watch TV after finishing your homework."],"after + 子句。","You can watch TV after you finish your homework."),
RW("m23","g5",["It is fun.","We play cards with friends."],"用 It is ... to ... 合併","It is fun",["It is fun to play cards with friends."],"It is + 形容詞 + to + 原形動詞。","It is fun to play cards with friends."),
RW("m24","g5",["Linda studied hard.","Linda passed the test."],"用 so 合併","Linda studied hard",["Linda studied hard{,|} so she passed the test.","Linda studied hard{,|} so Linda passed the test."],"原因 + so + 結果。","Linda studied hard, so she passed the test."),

/* ---------- 寫作一・重組 ---------- */
R("o13","g6","",["I","have never","been","to","Japan."],"have never been to = 從沒去過。","I have never been to Japan."),
R("o14","g6","",["Would you","like","something","to drink?"],"something + to V。","Would you like something to drink?"),
R("o15","g6","",["It","is","dangerous","to swim","in the river."],"It is + 形容詞 + to V。","It is dangerous to swim in the river."),
R("o16","g6","",["What","were you","doing","at nine","last night?"],"過去進行式疑問句。","What were you doing at nine last night?"),
R("o17","g6","",["My father","is","the tallest","person","in my family."],"the + 最高級 + in ...","My father is the tallest person in my family."),
R("o18","g6","",["Do you","know","when","the train","leaves?"],"間接問句：when + 主詞 + 動詞。","Do you know when the train leaves?"),
R("o19","g6","",["She","spends","two hours","practicing","the piano every day."],"spend + 時間 + V-ing。","She spends two hours practicing the piano every day."),
R("o20","g6","",["The man","who","lives","next door","is a police officer."],"關係代名詞子句放在 the man 後面。","The man who lives next door is a police officer."),
R("o21","g6","",["Remember","to bring","your","umbrella","tomorrow."],"Remember to V = 記得去做。","Remember to bring your umbrella tomorrow."),
R("o22","g6","",["How many","students","are there","in","your class?"],"How many + 複數名詞 + are there ...?","How many students are there in your class?"),
R("o23","g6","",["We","were","watching TV","when","the phone rang."],"過去進行式 + when + 過去式。","We were watching TV when the phone rang."),
R("o24","g6","",["This","is","the most","beautiful","beach I have ever seen."],"the most + 形容詞 + 名詞 + I have ever seen。","This is the most beautiful beach I have ever seen."),

/* ---------- 寫作二・段落寫作 ---------- */
ES("e05","g7","請根據下面三格提示，寫一篇約 50 字的短文，描述 Kevin 發生了什麼事。",
  ["Kevin plays soccer in the park and kicks the ball too hard.","The ball breaks a window of a house.","Kevin says sorry to the owner and helps clean up."],
  ["kick","break","window","say sorry"],
  "Last Saturday, Kevin played soccer with his friends in the park. He kicked the ball too hard, and it flew into a house. It broke a window! Kevin was very scared, but he knocked on the door and said sorry to the owner. Then he helped clean up the broken glass. The owner was happy that Kevin was honest.",
  "照 1→2→3 的順序寫，用過去式。","重點：過去式（kicked, broke, said, helped）、用 and / but / then 連接；結尾可以寫心情或結果。"),
ES("e06","g7","寫一篇約 50 字的短文，介紹你最好的朋友。請回答：他／她叫什麼名字？長什麼樣子？你們常一起做什麼？你為什麼喜歡他／她？",
  null,["best friend","looks like","together","because"],
  "My best friend is Amy. She is tall and has long black hair. We are in the same class, so we see each other every day. After school, we often go to the library together and do our homework. On weekends, we sometimes ride bikes in the park. I like her because she is funny and always helps me.",
  "四個問題都要回答到，一般的事用現在簡單式。","重點：現在簡單式（is, has, go, ride）、頻率副詞（often, sometimes）、最後用 because 說原因。"),
ES("e07","g7","請根據下面三格提示，寫一篇約 50 字的短文，描述 Mia 的一天。",
  ["Mia sees a poster about a singing contest at school.","Mia practices singing at home every night.","Mia wins first prize at the contest and holds a trophy."],
  ["poster","contest","practice","win"],
  "One day, Mia saw a poster about a singing contest at school. She loves singing, so she decided to join it. Every night after dinner, she practiced singing at home for an hour. Her family listened and gave her advice. On the day of the contest, Mia sang very well. In the end, she won first prize. She was so happy!",
  "照圖的順序寫，故事用過去式。","重點：過去式（saw, practiced, sang, won）、用 so / In the end 把故事串起來。"),
ES("e08","g7","寫一篇約 50 字的短文，描述你理想中的假日。請回答：你會去哪裡？和誰一起？做什麼？為什麼？",
  null,["would like to","with","because","fun"],
  "On my ideal holiday, I would like to go to Hualien with my family. In the morning, we would ride bikes along the beach and look at the blue sea. In the afternoon, we would visit Taroko Gorge and take a lot of pictures. At night, we would eat seafood together. I want to go there because it is beautiful and relaxing.",
  "想像中的事可以用 would + 原形動詞。","重點：would + 原形動詞描述想像、按照時間順序（In the morning / afternoon / At night）寫。"),

);
listenImages(b);
/* 新的看圖寫作題插圖 */
Object.assign(GEPT_IMAGES, { e05: "img/gept-e05.png", e07: "img/gept-e07.png" });
b.items.forEach(it => { if (GEPT_IMAGES[it.id]) it.img = GEPT_IMAGES[it.id]; });
})();
