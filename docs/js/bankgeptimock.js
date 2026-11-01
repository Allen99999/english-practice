/* ===== 全民英檢 中級：正式考模擬卷（原創，題型、題數、時間、順序照 LTTC 官方）
   初試＝聽力 35 題（看圖辨義 5、問答 10、簡短對話 10、簡短談話 10，約 30 分鐘，每題只播一遍）＋閱讀 35 題（詞彙 10、段落填空 2 篇 × 5、閱讀理解 5 組 × 3，45 分鐘）
   複試寫作＝中譯英 1＋英文作文 1（40 分鐘）；複試口說＝朗讀短文 2＋回答問題 10（15 秒 × 5、30 秒 × 5）＋看圖敘述 1，共 13 題約 15 分鐘
   每份是固定的一整卷（fixed），聽讀用正式考模式（blind：不顯示對錯、聽力只播一遍）
   圖：看圖辨義 docs/img/listen/gept-i-m<N>-<圖代號>.png；看圖敘述 docs/img/gept-i-m<N>-<題號>.png ===== */
function geptiMock(n, items) {
  const LR = ["l1", "l2", "l3", "l4", "r1", "r2", "r3"], W = ["w1", "w2"], SP = ["s1", "s2", "s3", "s4"];
  const b = {
    id: "gept-i-m" + n, grade: 11.5, fixed: true, blind: LR, hidden: true,   // 不單獨列在首頁：在「全民英檢 中級」裡選正式模擬卷
    title: "全民英檢中級・模擬卷 " + n,
    range: "初試 聽力 35＋閱讀 35・複試 寫作 2＋口說 13",
    added: "2026-11-01",
    note: "",
    exams: [{ name: "初試：聽力＋閱讀（75 分鐘）", tags: LR }, { name: "複試：寫作（40 分鐘）", tags: W }, { name: "複試：口說（約 15 分鐘）", tags: SP }],
    timeLimits: [[["l1", "l2", "l3", "l4"], 30], [["r1", "r2", "r3"], 45], [W, 40]],
    partNotes: ["聽力 35 題（看圖辨義、問答、簡短對話、簡短談話，四選一）＋閱讀 35 題，照正式考試順序計時 75 分鐘。", "中譯英 1 題（40%）＋英文作文 1 題（60%，約 120 字），計時 40 分鐘。", "朗讀短文 2 篇、回答問題 10 題、看圖敘述 1 題，照正式考試流程一路自動進行（題目播兩次、嗶聲後錄音、不能重聽或重錄），錄音上傳給老師批改。"],
    tags: Object.assign({}, bank("gept-i").tags),
    items
  };
  BANKS.push(b);
  giImages(b);
  b.items.forEach(it => { if (it.mode === "i-pic") it.img = `img/${b.id}-${it.id}.png`; });
}

/* 「全民英檢 中級」選正式模擬卷時，可以選這三份 */
bank("gept-i").mockPapers = ["gept-i-m1", "gept-i-m2", "gept-i-m3"];
bank("gept-i").officialLinks = [["GEPT i學網（官方題庫，免費註冊）", "https://www.lttc.ntu.edu.tw/tw/gept_iprep"], ["官網中級學習指引", "https://www.gept.org.tw/resource/t02_ref_R.asp"]];

/* ================================ 模擬卷 1 ================================ */
geptiMock(1, [
/* 聽力一・看圖辨義（圖 A：2 題、圖 B：2 題、圖 C：1 題） */
LI("l01","l1",1,["Where are these people?"],["They're at a gas station.","They're at a car wash.","They're in a parking lot.","They're at a bus station."],1,"","水管、泡沫、洗車 → at a car wash。",{ pic: "a", draw: "Two teenagers are washing a car with a hose and big sponges at an outdoor car wash. Soap bubbles cover the car. A man in a cap stands next to the car holding a bucket. A dog sits nearby watching." }),
LI("l02","l1",1,["Which is true about the picture?"],["The car is very clean.","The dog is in the car.","Nobody is helping.","A dog is sitting next to the car."],3,"","狗坐在車子旁邊看。",{ pic: "a" }),
LI("l03","l1",1,["What is the woman doing?"],["She is choosing a dress.","She is paying for a hat.","She is trying on shoes.","She is folding clothes."],2,"","女子坐著試穿鞋子。",{ pic: "b", draw: "In a shoe store, a woman is sitting on a bench trying on a pair of high-heeled shoes. A male clerk kneels in front of her holding a shoe box. Shelves full of shoes are behind them. A mirror stands on the floor." }),
LI("l04","l1",1,["What is the man holding?"],["A shoe box.","A shopping bag.","A mirror.","A pair of socks."],0,"","店員拿著鞋盒。",{ pic: "b" }),
LI("l05","l1",1,["Which instructions match the pictures?"],["First water the seeds. Then dig a hole. After that, cover them with soil.","First dig a hole. Then put in the seeds. After that, water them.","First put in the seeds. Then water them. After that, dig a hole.","First cover the seeds with soil. Then dig a hole. After that, water them."],1,"","挖洞 → 放種子 → 澆水。",{ pic: "c", draw: "Three panels in a row showing steps. Panel 1: hands digging a small hole in the soil with a small shovel. Panel 2: a hand dropping seeds into the hole. Panel 3: a watering can pouring water on the soil." }),
/* 聽力二・問答 */
LI("l06","l2",2,["W: Do you know where the nearest post office is?"],["There's one next to the bank on Main Street.","I mailed it yesterday.","It closes at five.","Yes, I know him."],0,"","問地點 → 說位置。"),
LI("l07","l2",2,["M: I'm sorry, but I broke your coffee cup."],["Don't worry about it. It was an old one.","You're welcome.","I'd like some coffee.","It's made in Japan."],0,"","對方道歉 → 接受道歉。"),
LI("l08","l2",2,["W: How long does it take to get to the airport by taxi?"],["About forty minutes, if there's no traffic.","It's about NT$900.","Taxis are yellow.","At the front door."],0,"","How long 問花多久。"),
LI("l09","l2",2,["M: Would you mind turning off the air conditioner? I'm freezing."],["Sure, no problem.","Yes, it's very hot.","I'm not cold, either.","It's on the wall."],0,"","Would you mind...? 答 Sure／No problem 表示願意。"),
LI("l10","l2",2,["W: Have you finished reading the report I sent you?"],["Not yet. I'll do it after lunch.","Yes, I sent it to you.","It's a long report.","I'm reading a novel."],0,"","問完成了沒。"),
LI("l11","l2",2,["M: What do you think of the new manager?"],["She seems friendly and very organized.","She's from Kaohsiung.","I think it's Tuesday.","The office is new."],0,"","問看法。"),
LI("l12","l2",2,["W: I can't decide between the blue shirt and the white one."],["Why not get both? They're on sale.","I'm not sure where it is.","It's a nice day.","White is a color."],0,"","給建議。"),
LI("l13","l2",2,["M: Is there anything I can do to help with the party?"],["Could you bring some drinks?","The party was great.","I'll help you with your homework.","Yes, I did."],0,"","主動幫忙 → 提出請求。"),
LI("l14","l2",2,["W: Why weren't you at the meeting this morning?"],["My train was delayed for an hour.","It's at ten.","I'll be there.","In Room 302."],0,"","Why 問原因。"),
LI("l15","l2",2,["M: How often does the shuttle bus run?"],["Every fifteen minutes.","It takes ten minutes.","From the front gate.","It's free."],0,"","How often 問頻率。"),
/* 聽力三・簡短對話 */
LI("l16","l3",3,["W: Excuse me. I ordered a chicken salad, but this has beef in it.","M: I'm so sorry. I'll bring you the right one right away.","W: Thanks. Could you also bring me some more water?","What is the woman's problem?"],["She got the wrong dish.","Her food is cold.","She has no fork.","Her bill is wrong."],0,"","點雞肉沙拉卻送來牛肉 → 送錯餐。"),
LI("l17","l3",3,["M: Are you going to Kevin's farewell party on Friday?","W: I wish I could, but I have to work late. Can you give him this card for me?","M: Sure. I'll make sure he gets it.","What will the man do?"],["Give a card to Kevin.","Work late on Friday.","Cancel the party.","Buy a gift for the woman."],0,"",""),
LI("l18","l3",3,["W: This printer has been making strange noises all morning.","M: Did you call the repair company?","W: Yes, but they can't come until Thursday.","M: Then let's use the one on the third floor for now.","What does the man suggest?"],["Using another printer.","Buying a new printer.","Calling the company again.","Waiting until Thursday."],0,"",""),
LI("l19","l3",3,["M: Hi, I'd like to open a bank account.","W: Sure. Do you have your ID card and a second form of ID, like a health insurance card?","M: I only brought my ID card.","W: Then you'll need to come back with the other one.","Why can't the man open an account today?"],["He doesn't have enough ID.","The bank is closed.","He forgot his money.","He is too young."],0,"",""),
LI("l20","l3",3,["W: How did your presentation go?","M: Not too bad. I was nervous at first, but the questions at the end were easy.","W: See? I told you you'd be fine.","How did the man feel at the beginning?"],["Nervous.","Bored.","Angry.","Confident."],0,"",""),
LI("l21","l3",3,["M: Did you see that the gym is raising its prices?","W: Yes, by twenty percent. I'm thinking of jogging in the park instead.","M: That's a good idea. It's free, and the air is fresher.","What is the woman thinking of doing?"],["Exercising outdoors.","Joining a new gym.","Paying more money.","Stopping exercise."],0,"",""),
LI("l22","l3",3,["Please look at the price list.","W: I'd like to send this box to Tainan.","M: How fast do you need it to arrive?","W: It's not urgent. The cheapest way is fine.","M: Then it'll take three days.","Look at the price list. How much will the woman pay?"],["NT$90","NT$150","NT$220","NT$300"],0,"","最便宜、三天到。",{ box: ["Delivery Price List","Same day — NT$300","Next day — NT$150","2 days — NT$120","3 days — NT$90"] }),
LI("l23","l3",3,["M: Hello, Front Desk. How can I help you?","W: Hi, this is Room 708. Could you wake me up at six tomorrow? I have an early flight.","M: Of course. Would you like breakfast in your room, too?","W: No, thanks. I'll get something at the airport.","Who is the man most likely talking to?"],["A hotel guest.","A pilot.","A restaurant owner.","A doctor."],0,"",""),
LI("l24","l3",3,["Please look at the schedule.","W: Let's watch a movie tonight. I finish work at six thirty.","M: The theater is twenty minutes from your office. Let's choose the first show after you can get there.","Look at the schedule. Which show will they watch?"],["7:00","6:00","6:40","8:30"],0,"","6:30 下班＋20 分鐘＝6:50，之後第一場是 7:00。",{ box: ["Tonight's Shows","6:00","6:40","7:00","8:30"] }),
LI("l25","l3",3,["M: My laptop is so slow these days.","W: How old is it?","M: About six years.","W: Maybe it's time to get a new one. My brother works at a computer store. He can give you a discount.","What does the woman offer to do?"],["Help the man get a lower price.","Fix the man's laptop.","Lend the man her laptop.","Sell her old computer."],0,"",""),
/* 聽力四・簡短談話 */
LI("l26","l4",4,["W: Good morning, passengers. Due to heavy fog, all flights to Kinmen are delayed until further notice. Passengers may wait in the lounge near Gate 5, where free coffee and tea are provided. We will make another announcement in thirty minutes.","Why are the flights delayed?"],["Because of the fog.","Because of a typhoon.","Because the plane is broken.","Because of a strike."],0,"",""),
LI("l27","l4",4,["M: Hi, Lisa. It's Tom from the bookstore. The cookbook you ordered has arrived. We'll keep it for you until next Monday. If you can't come by then, please call us, and we can mail it to you for a small fee.","What should Lisa do if she can't pick up the book by Monday?"],["Call the bookstore.","Order it again.","Go to another store.","Pay for it online."],0,"",""),
LI("l28","l4",4,["W: Welcome to the Taipei Zoo. Today the pandas will be fed at eleven o'clock. If you want to watch, please go to the Panda House a little early, because it gets very crowded. Please remember not to feed any animals yourself. Thank you.","What are visitors asked NOT to do?"],["Feed the animals.","Visit the Panda House.","Come early.","Take the MRT."],0,"",""),
LI("l29","l4",4,["M: Do you have trouble sleeping? Try Dream Pillow, made with special memory foam that fits the shape of your head and neck. Order now and get a second pillow for half price. Not happy? Return it within thirty days for a full refund.","What do customers get if they order now?"],["A second pillow at a lower price.","A free blanket.","A free sleep test.","Free delivery."],0,"",""),
LI("l30","l4",4,["W: Good afternoon, class. Before we start, I'd like to remind you that your science projects are due next Friday, not this Friday as I said before. Also, our trip to the science museum has been moved to the following Wednesday because the museum is closed for repairs.","Why was the museum trip moved?"],["The museum is being repaired.","The projects are due.","The teacher is sick.","It is going to rain."],0,"",""),
LI("l31","l4",4,["Please look at the store guide.","M: Attention, shoppers. Our winter sale starts today. All jackets and coats are thirty percent off. You can find them on the same floor as our sports shoes. Don't miss this chance!","Look at the store guide. Where are the jackets on sale?"],["3F","1F","2F","4F"],0,"","和運動鞋同一層 → 3F。",{ box: ["Store Guide","4F — Toys & Books","3F — Sports Shoes & Outdoor Wear","2F — Women's Fashion","1F — Food & Drinks"] }),
LI("l32","l4",4,["W: Thank you for joining today's cooking class. Today we're making mango pudding. It only takes fifteen minutes to prepare, but it needs to stay in the fridge for at least four hours. So if you make it in the morning, it'll be perfect for dessert after dinner.","How long must the pudding stay in the fridge?"],["At least four hours.","Fifteen minutes.","One whole day.","Forty minutes."],0,"",""),
LI("l33","l4",4,["M: This is a message for Ms. Chen. I'm calling from Green Leaf Apartments about the apartment you visited last week. The owner has agreed to lower the rent by two thousand dollars a month, as you asked. If you're still interested, please call me back by Wednesday.","What did the owner agree to do?"],["Lower the rent.","Paint the apartment.","Buy new furniture.","Wait until next month."],0,"",""),
LI("l34","l4",4,["Please look at the chart.","W: In our survey, we asked one hundred students about their favorite after-school activity. Surprisingly, playing video games was not the top answer. More students chose sports. Reading was the least popular, chosen by only eight students.","Look at the chart. Which activity got 35 votes?"],["Sports","Video games","Reading","Music"],0,"","最多的是運動，不是電玩 → 35 是 Sports。",{ box: ["Favorite After-School Activity (100 students)","? — 35","? — 30","Music — 27","? — 8"] }),
LI("l35","l4",4,["M: Hello, everyone, and welcome to our company. My name is Sam, and I'll be showing you around today. First, we'll visit the factory where our bicycles are made. Then we'll have lunch in the staff cafeteria. In the afternoon, you'll get a chance to try riding our newest model.","Who is the speaker probably talking to?"],["Visitors to a company.","Students in a classroom.","Passengers on a plane.","Customers in a restaurant."],0,"",""),

/* 閱讀一・詞彙 */
M("v01","r1","Because of the heavy rain, the baseball game was ___ until next Sunday.",["postponed","promoted","presented","protected"],0,"","postpone = 延期。"),
M("v02","r1","Jenny is very ___. She can play the piano, paint, and write poems.",["talented","tolerant","terrified","temporary"],0,"","talented = 有才華的。"),
M("v03","r1","Please ___ the instructions carefully before you use the machine.",["follow","fold","fill","fail"],0,"","follow instructions = 照指示做。"),
M("v04","r1","The road is under ___, so we have to take another way.",["construction","conversation","celebration","competition"],0,"","under construction = 施工中。"),
M("v05","r1","My brother is so ___ that he never shares his snacks with anyone.",["selfish","sensitive","serious","social"],0,"","selfish = 自私的。"),
M("v06","r1","The teacher ___ us of the test on Friday before class ended.",["reminded","remembered","repeated","remained"],0,"","remind sb. of sth. = 提醒某人某事。"),
M("v07","r1","This town is famous for its hot springs, which ___ thousands of visitors every year.",["attract","attack","attend","attach"],0,"","attract = 吸引。"),
M("v08","r1","If you have any questions, don't ___ to ask me.",["hesitate","hurry","hide","hate"],0,"","don't hesitate to V = 儘管…。"),
M("v09","r1","After working for ten hours, Tom was completely ___.",["exhausted","excited","expected","explained"],0,"","exhausted = 精疲力盡的。"),
M("v10","r1","The two countries signed an ___ to protect the ocean.",["agreement","argument","advertisement","appointment"],0,"","agreement = 協議。"),
/* 閱讀二・段落填空 */
G("c01","r2","cloze","Why People Love Escape Rooms",[
  "Escape rooms have become a popular weekend activity in Taiwan. In an escape room, a group of players is locked in a room and must solve puzzles to [[1]] within a time limit, usually sixty minutes. The puzzles may include finding hidden keys, breaking codes, or [[2]] strange messages.",
  "Many players say the game is exciting because it is like being inside a movie. [[3]] Since no one can solve every puzzle alone, players must share ideas and listen to each other. For this reason, some companies even send their workers to escape rooms to [[4]] teamwork. Whether you win or lose, it is a fun way to [[5]] an afternoon with friends."
],[["escape room","密室逃脫"],["puzzle","謎題"],["code","密碼"]],[
  B("c01a",1,["get out","give in","show up","take off"],0,"","get out = 出去、逃出。"),
  B("c01b",2,["understanding","pretending","forgetting","refusing"],0,"","理解奇怪的訊息。"),
  B("c01c",3,["It is also a great way to practice working together.","Most escape rooms are very expensive.","Some players are afraid of the dark.","Movies are better than games."],0,"","下一句講分享想法 → 練習合作。"),
  B("c01d",4,["build","break","borrow","blame"],0,"","build teamwork = 培養團隊合作。"),
  B("c01e",5,["spend","pay","take","cost"],0,"","spend an afternoon = 度過一個下午。")
]),
G("c02","r2","cloze","A Note from the Neighbor",[
  "Dear Neighbor,",
  "My name is Helen, and I live in the apartment [[1]] yours on the fourth floor. I'm writing because I've noticed that your dog barks a lot during the day, especially between 10 a.m. and 3 p.m. I work at night and need to sleep [[2]] the day. [[3]]",
  "I understand that dogs can feel lonely when their owners are out. Maybe you could leave the radio on, or ask someone to walk him at noon. I would be happy to [[4]] some ideas with you. Please feel free to knock on my door [[5]] it is convenient for you.",
  "Thank you, Helen (4F-2)"
],[["bark","吠叫"],["lonely","寂寞的"]],[
  B("c02a",1,["above","inside","through","among"],0,"","住在你家「樓上」的公寓。","above = 在…上方；inside、through、among 都不能表示樓上樓下的位置。"),
  B("c02b",2,["during","since","until","among"],0,"","during the day = 白天。"),
  B("c02c",3,["The noise has made it very hard for me to rest.","I love dogs very much.","My apartment is very large.","I usually go to work by bus."],0,"","說明吵鬧造成的影響。"),
  B("c02d",4,["discuss","decide","deliver","describe"],0,"","discuss ideas with sb.。"),
  B("c02e",5,["whenever","whatever","however","wherever"],0,"","whenever = 任何時候。")
]),
/* 閱讀三・閱讀理解 */
G("r01","r3","notice","Riverside Community Center — Spring Classes",[
  "Pottery for Beginners — Tuesdays 7–9 p.m. — 8 weeks — NT$4,800 (materials included)",
  "Conversational Japanese — Saturdays 10 a.m.–12 p.m. — 10 weeks — NT$5,000",
  "Smartphone Photography — Thursdays 7–8:30 p.m. — 6 weeks — NT$3,000 (bring your own phone)",
  "Registration opens March 1. Residents of Riverside District get 10% off. Classes with fewer than 6 students will be canceled, and fees will be returned in full."
],[["pottery","陶藝"],["material","材料"],["registration","報名"],["resident","居民"]],[
  Q("r01a","Which class is the longest course?",["Conversational Japanese","Pottery for Beginners","Smartphone Photography","They are all the same."],0,"","日文 10 週最長。"),
  Q("r01b","How much will a Riverside resident pay for the photography class?",["NT$2,700","NT$3,000","NT$2,400","NT$4,320"],0,"","3,000 × 0.9 = 2,700。"),
  Q("r01c","What happens if only four people sign up for a class?",["The class will not take place.","The class will be shorter.","The fee will be higher.","The class will move to Saturday."],0,"","少於 6 人就取消。")
]),
G("r02","r3","article","The Rise of Secondhand Shopping",[
  "In the past, many people felt embarrassed to buy used items. Today, however, secondhand shopping is growing fast, especially among young people. Apps that let users sell old clothes, books, and furniture now have millions of members in Taiwan.",
  "There are several reasons for this change. Used items are cheaper, of course. But many young shoppers also say they want to protect the environment. Making new products uses energy and creates waste, so buying used is a way to reduce pollution.",
  "Still, buyers should be careful. Photos online may not show damage clearly, and some sellers do not tell the truth. Experts suggest checking the seller's reviews and asking for more pictures before paying."
],[["embarrassed","尷尬的"],["damage","損壞"],["review","評價"]],[
  Q("r02a","What is the article mainly about?",["Why secondhand shopping is becoming popular and what to watch out for.","How to start a company that sells used items.","Why young people feel embarrassed.","How to take good photos online."],0,"",""),
  Q("r02b","According to the article, why do some young shoppers buy used items?",["To help the environment.","To meet new friends.","Because new items are hard to find.","Because their parents tell them to."],0,"",""),
  Q("r02c","What do experts advise buyers to do?",["Check sellers' reviews before paying.","Only buy furniture.","Never buy used clothes.","Pay before asking questions."],0,"","")
]),
G("r03","r3","article","Email and Reply",[
  "【Email 1】 To: Customer Service, Sky Air | From: Mark Huang | Subject: Lost suitcase — I flew from Bangkok to Taipei on Flight SA 822 on June 3. My green suitcase did not arrive. It has a yellow ribbon on the handle. I need it back as soon as possible because my business suits are inside.",
  "【Email 2】 To: Mark Huang | From: Sky Air Customer Service — Dear Mr. Huang, we are sorry for the trouble. Your suitcase was found in Bangkok. It will arrive in Taipei tomorrow morning on Flight SA 820 and will be delivered to your home by 6 p.m. As an apology, we have added 2,000 miles to your member account."
],[["ribbon","緞帶"],["handle","把手"],["apology","道歉"],["mile","哩程"]],[
  Q("r03a","Why did Mark write the first email?",["His suitcase was lost.","His flight was canceled.","He wanted a refund.","He missed his flight."],0,"",""),
  Q("r03b","Where was the suitcase found?",["In Bangkok","In Taipei","At Mark's home","On Flight SA 822"],0,"",""),
  Q("r03c","What did Sky Air give Mark?",["Extra miles","A new suitcase","A free ticket","Money for new suits"],0,"","")
]),
G("r04","r3","notice","Notice: Water Park Safety Rules",[
  "Wave Bay Water Park — Please read before entering",
  "• Children under 120 cm must be with an adult on all rides.",
  "• The Big Drop slide is not allowed for guests under 140 cm or over 120 kg.",
  "• No food or glass bottles inside the park. A food court is available near the entrance.",
  "• Lockers: NT$50 for 4 hours. Lost keys: NT$300.",
  "• Lifeguards are on duty from 9 a.m. to 6 p.m. Guests must leave the water after 6 p.m."
],[["slide","滑水道"],["lifeguard","救生員"],["on duty","值班"]],[
  Q("r04a","A boy who is 130 cm tall wants to go on the Big Drop. What will happen?",["He cannot go on it.","He can go on it with an adult.","He must pay extra.","He can go after 6 p.m."],0,"","低於 140 cm 不能玩 Big Drop。"),
  Q("r04b","Where can visitors eat?",["At the food court near the entrance.","Anywhere in the park.","On the Big Drop.","Next to the lockers only."],0,"",""),
  Q("r04c","What does a guest pay if they lose a locker key?",["NT$300","NT$50","NT$120","Nothing"],0,"","")
]),
G("r05","r3","article","The Library That Comes to You",[
  "In the mountains of Hualien, many children live far from the nearest library. To solve this problem, a group of volunteers started a \"book bus\" in 2023. Every Saturday, an old bus filled with two thousand books drives to a different village.",
  "When the bus arrives, children rush in to choose books, and volunteers read stories aloud. The children can borrow up to five books, which they return the next time the bus visits. The program has become so popular that adults now ask for books too, especially cookbooks and magazines.",
  "The volunteers hope to buy a second bus next year. They are collecting donations of used children's books in good condition."
],[["volunteer","志工"],["village","村莊"],["donation","捐贈"]],[
  Q("r05a","Why was the book bus started?",["Children in the mountains live far from libraries.","The village library closed.","Children did not like reading.","The bus was too old to use."],0,"",""),
  Q("r05b","What surprising thing has happened since the program started?",["Adults also want to borrow books.","Children stopped borrowing books.","The bus broke down.","The volunteers became teachers."],0,"",""),
  Q("r05c","How can people help the volunteers?",["By giving used children's books.","By driving the bus.","By buying cookbooks.","By visiting Hualien."],0,"","")
]),

/* 寫作 */
WT("t01","w1","上週六，我和同學去參加了淨灘活動。我們撿了很多塑膠瓶和漁網，有些甚至纏住了小螃蟹。看到海灘變乾淨，大家都覺得很有成就感。我希望以後每個人去海邊時，都能把自己的垃圾帶走。",
  "Last Saturday, my classmates and I took part in a beach clean-up. We picked up many plastic bottles and fishing nets, and some of them were even wrapped around small crabs. When we saw the beach become clean, we all felt a great sense of achievement. I hope that from now on, everyone will take their own trash with them when they go to the beach.",
  "重點：take part in、beach clean-up、be wrapped around（纏住）、see + 受詞 + 原形動詞、a sense of achievement、take... with them。"),
WC("c01","w2","你是否曾經學過一項新技能（例如游泳、騎腳踏車、做菜、樂器）？請寫一篇短文：(1) 說明你學了什麼、怎麼學的；(2) 學習過程中遇到什麼困難，你如何克服。",
  "Last summer, I learned how to play the ukulele. My cousin lent me hers, and I watched online videos to learn the basic chords. Every evening, I practiced for thirty minutes in my room.\n\nAt first, it was much harder than I expected. My fingers hurt after only a few minutes, and I couldn't change chords quickly enough to play a whole song. I almost gave up. However, my cousin told me that everyone feels this way at the beginning. She suggested that I practice slowly and choose easy songs first. I followed her advice and kept a practice diary. After two months, I was able to play three songs for my family at my grandmother's birthday party. That experience taught me that patience is the key to learning anything new.",
  "兩段對應兩個提示；第二段困難 → 解決方法 → 結果 → 心得。"),

/* 口說 */
GI1("ra01","s1",[
  "Welcome to Sun Moon Lake. Boat tours leave from the main pier every thirty minutes between 8:30 a.m. and 5:00 p.m. A round-trip ticket costs NT$300 for adults and NT$150 for children. The tour stops at Ita Thao Village, where you can try local food and buy handmade souvenirs. Please wear your life jacket at all times while on the boat.",
  "Many people think they need to exercise for hours to stay healthy. In fact, doctors say that just thirty minutes of walking a day can make a big difference. Walking helps your heart, lowers stress, and improves sleep. You don't need special equipment or a gym. All you need is a pair of comfortable shoes and the habit of getting outside."
]),
GI2("qa01","s2","What are you wearing today?","I'm wearing a white T-shirt, a pair of jeans, and black sneakers. It's comfortable for a test day."),
GI2("qa02","s2","What do you usually do after dinner?","After dinner, I usually help wash the dishes. Then I do my homework or watch some videos."),
GI2("qa03","s2","Where did you go on your last vacation?","On my last vacation, I went to Kenting with my family. We swam in the sea and ate a lot of seafood."),
GI2("qa04","s2","How many hours a day do you spend on your phone?","I spend about three hours a day on my phone, mostly chatting with friends and listening to music."),
GI2("qa05","s2","What kind of food do you like the most?","I like Japanese food the most, especially sushi and ramen, because they taste fresh and delicious."),
GI2("qb01","s3","What would you do if a stranger asked you for money on the street?","I would be careful, because some people lie to get money. I wouldn't give cash directly. If the person looked hungry, I might buy him some food instead. If he seemed lost or in trouble, I would help him find a police officer.","",30),
GI2("qb02","s3","Do you think it is better to live in an apartment or a house? Why?","I think living in an apartment is better for most people in Taiwan. Apartments are usually cheaper and closer to MRT stations and stores. Many buildings also have guards, so they are safer. However, a house has more space and a garden, which is great for families with pets.","",30),
GI2("qb03","s3","Why do you think many people like to keep pets?","I think people keep pets because pets make them feel less lonely. A dog or cat is always happy to see you when you come home. Taking care of a pet also teaches children responsibility. Besides, walking a dog every day is good exercise for the owner.","",30),
GI2("qb04","s3","Tell me about a time you felt very proud of yourself.","I felt very proud when I finished my first ten-kilometer run last year. I had trained for three months, and on the day of the race it was very hot. I wanted to stop many times, but I kept going. When I crossed the finish line, my parents were cheering, and I felt amazing.","",30),
GI2("qb05","s3","What changes would you like to see in your neighborhood?","I would like to see more trees and bike lanes in my neighborhood. Right now, there are too many cars and scooters, so the air is not clean. I also hope there will be a small library or study center where students can read after school.","",30),
GI3("pd01","s4",["Where are these people?","What are they doing?","How do you think the man in the wheelchair feels? Why?","If you still have time, please describe the picture in as much detail as possible."],
  "These people are at a train station. A young man in a wheelchair wants to get on the train, and a station worker is putting a small ramp between the platform and the train door so he can roll in. I think the man feels thankful and relieved, because he is smiling at the worker. Some passengers are waiting patiently behind them. A woman is holding the door open, and a little boy is waving at the man. On the platform, there is a bench and a clock, and the train looks modern and clean.",
  "地點 → 動作 → 感受＋理由 → 細節。注意 ramp、wheelchair、platform 的發音。",
  "A train station platform. A station worker places a small portable ramp between the platform and an open train door so that a smiling young man in a wheelchair can roll onto the train. Passengers wait patiently behind them. A woman holds the train door open. A little boy waves at the man. A bench and a wall clock without numbers on the platform.")
]);
