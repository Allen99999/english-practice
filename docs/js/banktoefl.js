/* ===== TOEFL iBT（2026 新制）練習題庫：原創題，題型與難度對照 ETS 2026 規格與近期考情（B2～C1）
   這個檔案：題庫設定＋閱讀；聽力、寫作、口說在 banktoefl2.js；兩份正式模擬卷在 banktoeflmock*.js
   Complete the Words 用 CTW 自動挖空（第一句完整，之後每隔一字挖掉後半，共 10 格）。
   閱讀題的正解都寫在第一個選項，載入時會自動平衡到 A～D；句子插入題（INS）的答案位置固定，要自己分散。 ===== */
BANKS.push({
  id: "toefl", grade: 20, tagIsType: true,
  title: "TOEFL iBT（2026 新制）",
  range: "Reading・Listening・Writing・Speaking",
  added: "2026-10-22",
  note: "依 ETS 2026 新制規格自編，難度對照近期考情（B2～C1）：閱讀＝Complete the Words、Read in Daily Life、Academic Passage（含推論、字義、EXCEPT、句子插入）；聽力＝Choose a Response（間接回應）、Conversation、Announcement、Academic Talk；寫作＝Build a Sentence、Email、Academic Discussion；口說＝Listen and Repeat、Interview。寫作口說是自評＋範文，也可以給老師批改。",
  exams: [
    { name: "Reading", tags: ["r1", "r2", "r3"] },
    { name: "Listening", tags: ["l1", "l2", "l3", "l4"] },
    { name: "Writing", tags: ["w1", "w2", "w3"] },
    { name: "Speaking", tags: ["s1", "s2"] }
  ],
  tags: {
    r1: "Reading・Complete the Words", r2: "Reading・Read in Daily Life", r3: "Reading・Academic Passage",
    l1: "Listening・Choose a Response", l2: "Listening・Conversation", l3: "Listening・Announcement", l4: "Listening・Academic Talk",
    w1: "Writing・Build a Sentence", w2: "Writing・Write an Email", w3: "Writing・Academic Discussion",
    s1: "Speaking・Listen and Repeat", s2: "Speaking・Take an Interview"
  },
  mockPapers: ["toefl-m1", "toefl-m2"],
  officialLinks: [["ETS 官方備考（TOEFL TestReady 免費模擬考）", "https://www.ets.org/toefl/test-takers/ibt/prepare.html"]],
  items: [

/* ---------- Reading・Complete the Words（每段 10 格） ---------- */
CTW("nc01","r1","Monarch Migration","Every autumn, millions of monarch butterflies leave Canada and the northern United States and fly south to the mountains of central Mexico. Remarkably, none of the butterflies that complete the journey have ever been there before, because the trip spans several generations. Scientists believe the insects navigate by combining the position of the sun with an internal clock located in their antennae. Recent studies suggest that they may also sense the Earth's magnetic field when clouds hide the sun."),
CTW("nc02","r1","Glaciers as Water Towers","Mountain glaciers are often described as the water towers of the world. During cold months, they store precipitation as ice, and during warm months, they gradually release meltwater into rivers that supply farms and cities downstream. In regions such as Central Asia and the Andes, this seasonal flow is essential for agriculture. As temperatures rise, however, many glaciers are shrinking rapidly, and scientists warn that the water supply they provide may eventually decline.",{ cold: ["cool"] }),
CTW("nc03","r1","The Placebo Effect","A placebo is a treatment that contains no active ingredient, such as a sugar pill. Surprisingly, patients who receive placebos often report real improvements in symptoms like pain and fatigue, especially when they expect the treatment to work. Researchers think this happens partly because expectation triggers the release of natural chemicals in the brain. For this reason, new medicines must perform better than a placebo before they can be approved."),
CTW("nc04","r1","Trade on the Silk Road","The Silk Road was not a single road but a vast network of trade routes linking China with Central Asia, the Middle East, and Europe. Merchants rarely traveled its entire length; instead, goods passed through many hands, and their prices rose at each stage of the journey. Along with silk and spices, the routes carried religions, technologies, and diseases. In this way, the network shaped cultures far beyond the places where goods were produced.",{ their: ["these", "those"] }),
CTW("nc05","r1","The Human Microbiome","The human body is home to trillions of microorganisms, most of which live in the digestive system. Far from being harmful, many of these bacteria help us digest fiber, produce certain vitamins, and train the immune system to distinguish threats from harmless substances. Because diet strongly influences which species thrive, eating a variety of plant foods is often recommended. Scientists are now investigating whether changes in gut bacteria may also affect mood and behavior."),

/* ---------- Reading・Read in Daily Life ---------- */
DL("nd01","r2","Read an email.",[
  "From: Brightwater Apartments Management",
  "To: All residents of Building C",
  "Subject: Water service interruption — Thursday, March 12",
  "To replace a corroded pipe in the basement, the city will shut off water to Building C on Thursday from 9:00 a.m. until approximately 4:00 p.m. Because the repair crew cannot predict exactly what they will find once the old pipe is exposed, the work may run later than scheduled.",
  "When service is restored, tap water may look cloudy for a short time; this is caused by trapped air and is not harmful. We recommend running the cold tap for two to three minutes before drinking. Residents who work from home and need restrooms during the shutoff may use the facilities in the leasing office in Building A."
],[
  Q("nd01a","Why does the management mention the leasing office in Building A?",["To offer an alternative for residents affected by the shutoff","To tell residents where to report cloudy water","To announce that Building A will also lose water","To explain where the repair crew will be based"],0,"","在家工作、停水期間需要用廁所的住戶可以去 A 棟的租賃辦公室 → 提供替代方案。"),
  Q("nd01b","What can be inferred about the time the repair will end?",["It is only an estimate and could change.","It was chosen by the residents of Building C.","It depends on how long the water stays cloudy.","It will be announced by email on Thursday morning."],0,"","approximately 4:00 p.m.，而且 the work may run later than scheduled → 只是預估。"),
  Q("nd01c","According to the email, what should residents do if their water looks cloudy?",["Let the cold water run briefly before drinking it","Contact the city water department","Boil the water before using it","Avoid using tap water until the next day"],0,"","running the cold tap for two to three minutes before drinking。")
]),
DL("nd02","r2","Read an advertisement.",[
  "CycleShare — Ride the City Your Way",
  "Pay As You Go: $1 to unlock + $0.25 per minute. No commitment.",
  "Monthly Pass ($18): Unlimited rides of up to 45 minutes. Each minute beyond 45 costs $0.15.",
  "Student Annual Pass ($60): Same benefits as the Monthly Pass. A valid university email address is required at sign-up.",
  "All plans include free helmet rental at any staffed station. E-bikes are available on every plan for an additional $0.10 per minute."
],[
  Q("nd02a","Who would benefit most from the Monthly Pass?",["A commuter who rides about 30 minutes to work every weekday","A tourist who plans to ride once during a weekend visit","A university student who rides every day all year","A person who takes one two-hour ride each month"],0,"","每天短程通勤最划算。全年騎的大學生買 $60 的學生年票更便宜；只騎一次的觀光客用 Pay As You Go 就好。"),
  Q("nd02b","What is true about e-bikes?",["They cost extra no matter which plan a rider has.","They are available only to Student Annual Pass holders.","They can be rented only at staffed stations.","They are free for rides shorter than 45 minutes."],0,"","available on every plan for an additional $0.10 per minute。staffed station 說的是安全帽。")
]),
DL("nd03","r2","Read a form.",[
  "Westfield Transit — Lost Property Claim Form",
  "Name: Daniel Okafor    Phone: (555) 014-2297",
  "Date and time of loss: October 3, around 6:15 p.m.",
  "Route / vehicle: Bus 42, heading toward Harbor Station",
  "Item description: Navy-blue backpack with a broken zipper on the front pocket. Contains a library book and a black laptop charger.",
  "Preferred pickup location: [ ] Central Office   [X] Harbor Station Desk",
  "Note to staff: I will be out of town from October 6 to 10. If the item is found, please hold it until I return."
],[
  Q("nd03a","What is the purpose of this form?",["To help a passenger recover an item left on public transportation","To report damage done to a bag by a bus driver","To request a refund for a missed bus trip","To return a library book found on a bus"],0,"","Lost Property Claim Form：失物招領申請。"),
  Q("nd03b","What can be inferred about Daniel Okafor?",["He will not be able to pick up the item for several days.","He also lost his laptop on the bus.","He usually picks up lost items at the Central Office.","He found the backpack on Bus 42."],0,"","10 月 6～10 日不在，請工作人員先保管 → 好幾天不能來拿。背包裡只有充電器，沒有筆電。")
]),
DL("nd04","r2","Read an article.",[
  "Local Cafe Turns \"Ugly\" Produce into a Business Model",
  "When Priya Natarajan opened Second Harvest Cafe two years ago, many of her suppliers were puzzled by her requests. Instead of asking for the best-looking tomatoes and peppers, she asked for the ones grocery stores had rejected for being oddly shaped or slightly bruised. Farmers, who usually throw such produce away or sell it cheaply as animal feed, were happy to sell it to her at a discount.",
  "The approach has allowed the cafe to keep menu prices about 20 percent below those of nearby restaurants. \"Customers can't tell the difference once a pepper is roasted,\" Natarajan says. The cafe has also become a training site for a local culinary program, whose students prepare the daily soup. Natarajan admits that planning a menu is harder when she doesn't know what will arrive each morning, but she says the uncertainty keeps her cooking creative."
],[
  Q("nd04a","What is the article mainly about?",["A business that succeeds by using food that would otherwise be wasted","A farmer who began growing unusual vegetables","A cooking school that opened its own restaurant","A grocery store that lowered its standards for produce"],0,"","整篇在講咖啡店用超市不要的「醜蔬果」經營。"),
  Q("nd04b","Why were suppliers puzzled at first?",["Natarajan wanted produce that stores usually refuse to buy.","Natarajan offered to pay more than grocery stores did.","Natarajan asked for vegetables that farmers rarely grow.","Natarajan planned to use the vegetables as animal feed."],0,"","她要的是超市因形狀怪、碰傷而退貨的蔬果。"),
  Q("nd04c","What does Natarajan suggest about not knowing what will arrive each morning?",["It makes her work harder but also has a benefit.","It is the main reason her prices are low.","It has caused the cafe to lose customers.","It will stop once the culinary program grows."],0,"","menu 比較難規劃（缺點），但讓她的料理更有創意（好處）。")
]),
DL("nd05","r2","Read a text message chain.",[
  "Group chat — ECON 210 Project",
  "Jordan (9:02 a.m.): Quick update — Prof. Lin moved our presentation up to Monday instead of Wednesday.",
  "Aisha (9:05 a.m.): Seriously? I still haven't gotten the survey results back from the student center.",
  "Jordan (9:06 a.m.): Can we present what we have and describe the survey as \"in progress\"?",
  "Aisha (9:10 a.m.): Maybe. But our whole conclusion depends on it, so the last two slides would be pretty empty.",
  "Marco (9:14 a.m.): I'll stop by the student center at noon and ask them to send it today. If that doesn't work, I'll email Prof. Lin about using last year's data instead."
],[
  Q("nd05a","Why is Aisha worried?",["Information they need for their conclusion may not arrive in time.","She will not be able to attend the presentation on Monday.","Prof. Lin rejected the questions in their survey.","Jordan changed the topic of the presentation."],0,"","報告提前到星期一，問卷結果還沒拿到，而結論靠它。"),
  Q("nd05b","What will Marco most likely do first?",["Visit the student center to ask for the results","Email Prof. Lin to ask for more time","Rewrite the last two slides of the presentation","Find last year's survey data in the library"],0,"","先中午去學生中心；不行才寫信給教授。")
]),
DL("nd06","r2","Read a notice.",[
  "Harlow Museum of Natural History — Visitor Notice",
  "From May 1 to June 15, the Ocean Life Hall will be closed while we install a new 20-meter whale skeleton. During this period, general admission will be reduced from $16 to $12. The Dinosaur Gallery, the Mineral Collection, and the special exhibition Hidden Forests will remain open as usual.",
  "Members: Your free guest passes, which are normally valid only on weekdays, may be used on any day of the week during the closure. Please note that the museum cafe will close at 3:00 p.m. instead of 5:00 p.m. because of reduced staffing."
],[
  Q("nd06a","Why is admission cheaper from May 1 to June 15?",["Part of the museum will not be open to visitors.","The museum is celebrating a new membership program.","The cafe will be closed for the entire period.","The special exhibition will have ended."],0,"","海洋生物廳關閉安裝鯨魚骨架，所以門票降價。"),
  Q("nd06b","What can be inferred about the guest passes?",["Members normally cannot use them on weekends.","They will no longer be accepted after June 15.","They allow guests to enter the Ocean Life Hall early.","They include a free meal at the cafe."],0,"","normally valid only on weekdays → 平常週末不能用。")
]),
DL("nd07","r2","Read a product review.",[
  "★★★☆☆  \"Great sound, but read this before you buy\" — reviewed by Tomas R.",
  "I bought the Arden Q5 headphones mainly for studying in noisy cafes, and the noise cancellation is honestly excellent — I can barely hear the espresso machine. The sound is rich, and the battery easily lasts a full week of my use.",
  "So why only three stars? Comfort. After about an hour, the ear cushions start to press uncomfortably, and because I wear glasses, it's even worse. The company's support team told me that larger cushions are \"in development,\" but there's no release date. If you have long listening sessions or wear glasses, I'd try them in a store first. If you mostly listen in short bursts, they're a bargain at this price."
],[
  Q("nd07a","What is the main reason the reviewer gave only three stars?",["The headphones become uncomfortable during long use.","The battery runs out faster than advertised.","The noise cancellation does not work well in cafes.","The customer support team was unhelpful."],0,"","So why only three stars? Comfort.——戴久了不舒服。"),
  Q("nd07b","Who would the reviewer most likely recommend the headphones to?",["Someone who listens for about 20 minutes at a time","A student who studies for hours in a library","A person who needs replaceable ear cushions now","A glasses wearer who takes long flights"],0,"","If you mostly listen in short bursts, they're a bargain → 短時間使用的人。"),
  Q("nd07c","What does the reviewer imply about the larger cushions?",["It is unclear when they will become available.","They will be given free to future buyers.","They will make the noise cancellation stronger.","They are already sold in some stores."],0,"","in development, but there's no release date → 不知道何時推出。")
]),
DL("nd08","r2","Read a notice.",[
  "Maplewood Public Library — E-book Lending: What's Changing",
  "Starting July 1, each cardholder may borrow up to 6 e-books at a time (previously 10). The loan period remains 21 days. Because publishers charge libraries for each digital copy, and many of those licenses expire after 26 loans or two years, we must spread our budget across more titles.",
  "Holds will now expire if a book is not borrowed within 3 days of becoming available, so that waiting lists move faster."
],[
  Q("nd08a","Why is the library reducing the number of e-books a person can borrow?",["Digital copies are costly and do not last indefinitely.","Readers were keeping e-books for more than 21 days.","Publishers have stopped selling e-books to libraries.","Fewer people are using the e-book service."],0,"","每份數位授權都要付費，而且借 26 次或兩年就失效 → 預算要分給更多書。"),
  Q("nd08b","What will most likely happen if a reader does not borrow a held e-book within three days?",["The book will go to the next person on the waiting list.","The reader will have to pay a small fee.","The reader's loan period will be shortened.","The reader's borrowing limit will drop to 6."],0,"","預約過期是為了 waiting lists move faster → 輪給下一位。")
]),
DL("nd09","r2","Read a job posting.",[
  "Research Assistant (Part-Time) — Coastal Ecology Lab",
  "The Coastal Ecology Lab is looking for an undergraduate assistant for the spring semester (8–10 hours per week). Duties include sorting and labeling sediment samples, entering data into spreadsheets, and occasionally joining weekend field trips to local salt marshes.",
  "No prior research experience is required, but applicants must have completed BIO 110 and be comfortable working outdoors in cold, wet conditions. Students who receive work-study funding are especially encouraged to apply.",
  "To apply, send a short statement of interest and your class schedule to Dr. Helen Moss by January 20. Interviews will take place during the first week of classes."
],[
  Q("nd09a","Which applicant would most likely be rejected?",["A student who has not taken BIO 110","A student with no laboratory experience","A student who prefers to work on weekdays","A student who receives work-study funding"],0,"","must have completed BIO 110 是必要條件；沒經驗沒關係。"),
  Q("nd09b","Why does the posting most likely ask for applicants' class schedules?",["To find out when they are available to work","To check whether they have completed BIO 110","To decide who will lead the field trips","To confirm that they are undergraduates"],0,"","每週要排 8～10 小時，課表用來安排工作時間。課表看不出「已修完」的課。"),
  Q("nd09c","What can be inferred about the field trips?",["They may involve unpleasant weather.","They take place every weekend.","All lab members are required to attend them.","They are paid at a higher rate than lab work."],0,"","要能在 cold, wet conditions 的戶外工作 → 天氣可能很差。occasionally ≠ every weekend。")
]),

/* ---------- Reading・Academic Passage（約 250 字，5 題） ---------- */
AP("na01","r3","The Paradox of Choice",[
  "For decades, economists assumed that more options always benefit consumers: if a store offers twenty kinds of jam instead of six, shoppers are more likely to find one that matches their preferences. In a well-known field experiment, however, psychologists set up a tasting booth in a supermarket that displayed either six or twenty-four varieties of jam. The larger display attracted more visitors, but shoppers who saw only six varieties were roughly ten times more likely to make a purchase.",
  "Researchers have proposed several explanations for this effect, often called choice overload. ■ When options multiply, comparing them requires more mental effort, and people may postpone a decision rather than invest that effort. ■ Larger sets also raise expectations; with so many alternatives available, a chooser feels that the perfect option must exist somewhere. ■ As a result, even a good choice can feel disappointing, because the chooser imagines the attractive features of the options that were not selected. ■",
  "Later studies have shown that choice overload is far from universal. It appears mainly when options are difficult to compare, when people lack clear preferences, or when they must decide quickly. Experts who know exactly what they want, by contrast, often welcome large assortments. These findings have encouraged some retailers and online platforms to organize products into smaller categories or to offer recommendations, reducing the burden on shoppers without eliminating variety."
],["postpone"],[
  Q("na01a","The word \"postpone\" in the passage is closest in meaning to",["delay","reconsider","simplify","announce"],0,"","postpone a decision＝把決定往後延。"),
  Q("na01b","According to paragraph 1, what was surprising about the jam experiment?",["The display that drew fewer visitors led to more purchases.","Shoppers bought only jams they had tasted before.","The larger display attracted fewer visitors than the smaller one.","Most shoppers bought more than one variety of jam."],0,"","24 種吸引較多人，但 6 種的購買率高約十倍。第三個選項把吸引人數說反了。"),
  INS("na01c","This sense of regret is especially strong when each rejected option had something unique to offer.",3,"This sense of regret 指的是前一句「想像沒選的選項的優點而失望」，所以放在段落最後（第 4 個方塊）。"),
  Q("na01d","Based on paragraph 3, in which situation would choice overload be LEAST likely?",["An experienced cyclist picks a replacement tire from a large catalog.","A first-time buyer must choose a laptop from dozens of similar models.","A traveler has five minutes to choose among many unfamiliar dishes.","A shopper with no strong preference compares many shampoos."],0,"","第三段：專家知道自己要什麼時，反而喜歡選項多。其他三個分別是「難比較」「時間急」「沒有偏好」，都容易選擇過載。"),
  Q("na01e","Why does the author mention retailers and online platforms in paragraph 3?",["To show a practical response to research on choice overload","To argue that stores should offer less variety","To give an example of experts who prefer large assortments","To explain why the jam experiment took place in a supermarket"],0,"","商家把商品分小類、提供推薦 → 研究結果的實際應用；而且是 without eliminating variety。")
]),
AP("na02","r3","Mangrove Forests and Blue Carbon",[
  "Mangroves are salt-tolerant trees that grow along tropical and subtropical coastlines, where their tangled roots stabilize sediment and shelter young fish. In recent decades, scientists have also recognized mangroves as exceptionally efficient carbon sinks. Although mangrove forests cover less than one percent of the world's tropical forest area, a hectare of mangroves can store several times more carbon than a hectare of upland rainforest.",
  "The secret lies mostly below the surface. Because mangrove soils are regularly flooded by tides, they contain very little oxygen. In such conditions, the microbes that normally break down dead leaves and roots work extremely slowly, so organic material accumulates layer upon layer over centuries. Researchers who drilled cores from mangrove sediments in Southeast Asia found that up to three-quarters of the carbon in these ecosystems was locked in the soil rather than in the trees themselves.",
  "This hidden reservoir makes mangrove destruction particularly damaging. When forests are cleared for shrimp farms or coastal development, the exposed soil dries out and oxygen penetrates it, allowing microbes to decompose material that had been stable for hundreds of years. The stored carbon is then released into the atmosphere as carbon dioxide. Consequently, conservationists argue that protecting existing mangroves is far more effective than planting new ones, which may need decades to rebuild comparable soil deposits."
],["accumulates"],[
  Q("na02a","The word \"accumulates\" in the passage is closest in meaning to",["builds up","breaks apart","spreads out","dries up"],0,"","accumulate layer upon layer＝一層層累積。"),
  Q("na02b","What data were most likely collected in the study mentioned in paragraph 2?",["Measurements of how carbon is divided between soil and trees","Counts of the fish living among mangrove roots","Records of how often tides flood different coastlines","Figures on shrimp production on former mangrove land"],0,"","研究結論是「四分之三的碳在土壤而不是樹」→ 測的是碳在土壤與樹之間的比例。"),
  Q("na02c","According to paragraph 2, why does organic material build up in mangrove soils?",["Low oxygen levels slow down decomposition.","Tides carry in leaves from distant forests.","Mangrove roots release chemicals that kill microbes.","Mangroves drop more leaves than rainforest trees."],0,"","潮水淹沒 → 缺氧 → 分解的微生物作用很慢。"),
  Q("na02d","All of the following are mentioned as results of clearing mangroves EXCEPT",["tides flood the land more often","the soil dries out","oxygen enters the soil","stored carbon is released as carbon dioxide"],0,"","第三段提到土壤變乾、氧氣進入、碳釋放；沒有說潮水更常淹。"),
  Q("na02e","What can be inferred about planting new mangroves?",["It cannot quickly replace the carbon storage of an old forest.","It is the most effective way to reduce carbon dioxide.","It is impossible on land once used for shrimp farms.","It raises the oxygen content of coastal soils."],0,"","新種的要數十年才能累積相當的土壤碳 → 不能很快取代老森林。")
]),
AP("na03","r3","The Hanseatic League",[
  "From the thirteenth to the fifteenth centuries, trade in northern Europe was dominated by the Hanseatic League, an association of merchant communities and towns stretching from London to Novgorod in present-day Russia. Unlike a modern state, the League had no permanent army, no shared treasury, and no single government. Its member towns met only occasionally in assemblies, and decisions made there were not always obeyed.",
  "How, then, did such a loose organization exert so much power? One answer lies in its control of key trading posts, called kontors, in foreign cities. ■ Within these walled compounds, Hanseatic merchants lived under their own laws and enjoyed special tax privileges negotiated with local rulers. ■ Another source of strength was collective economic pressure. ■ When a ruler violated the League's privileges, member towns could agree to stop trading with that ruler's territory altogether. ■ Such boycotts were often more effective than military force, since many regions depended on Hanseatic ships for grain, salt, and fish.",
  "The League's decline in the sixteenth century resulted from several developments. Territorial states such as England and Sweden grew stronger and began to favor their own merchants. Dutch traders, with larger and cheaper ships, captured much of the Baltic trade. Moreover, the shift of European commerce toward the Atlantic after voyages to the Americas reduced the importance of the northern routes the League had controlled."
],["exert"],[
  Q("na03a","According to paragraph 1, which of the following is true of the Hanseatic League?",["Its members did not always follow assembly decisions.","It was governed from a capital in London.","It relied on a permanent army to protect trade.","Its towns met every year to set prices."],0,"","decisions made there were not always obeyed。它沒有軍隊、沒有單一政府。"),
  INS("na03b","These privileges often included freedom from customs duties that local merchants still had to pay.",1,"These privileges 指前一句的 special tax privileges，所以放在第 2 個方塊。"),
  Q("na03c","The word \"exert\" in the passage is closest in meaning to",["use","lose","share","measure"],0,"","exert power＝施展、運用權力。"),
  Q("na03d","Why does the author mention grain, salt, and fish in paragraph 2?",["To explain why boycotts by the League were effective","To list the goods taxed inside the kontors","To show what Dutch traders sold more cheaply","To describe the products made in member towns"],0,"","許多地區靠漢薩的船運糧、鹽、魚 → 所以抵制（停止貿易）很有效。"),
  Q("na03e","All of the following contributed to the League's decline EXCEPT",["member towns built a permanent navy","stronger states supported their own merchants","Dutch traders used larger, cheaper ships","European trade shifted toward the Atlantic"],0,"","第三段列了三個原因；文中說它沒有常備軍，也沒提到建海軍。")
]),
AP("na04","r3","Desirable Difficulties",[
  "Most students assume that if studying feels easy, they are learning well. Rereading a chapter until it seems familiar, for example, creates a comfortable sense of mastery. Yet research by the psychologist Robert Bjork and his colleagues suggests that this feeling can be misleading. Conditions that make learning feel slower and more effortful in the moment often produce stronger long-term memory, a phenomenon Bjork called \"desirable difficulties.\"",
  "One well-studied example is retrieval practice. Instead of rereading notes, learners close the book and try to recall the material, perhaps by answering practice questions. Struggling to retrieve information strengthens the pathways that lead to it, making later recall more likely. Another example is spacing: distributing study sessions over several days rather than cramming them into one. Spacing allows some forgetting to occur between sessions, and the effort of relearning partially forgotten material appears to consolidate it more firmly.",
  "Not every difficulty is desirable, however. Material that is far beyond a learner's current knowledge may simply cause confusion, and difficulties unrelated to the content, such as a noisy room, offer no benefit. The key is that the effort must engage the same mental processes the learner will need later. This explains why students who rely on familiarity are often surprised by poor exam results: recognizing information on a page is a much easier task than producing it without cues."
],["consolidate"],[
  Q("na04a","What is the main purpose of the passage?",["To explain why some challenging study methods improve long-term learning","To argue that students should avoid difficult course material","To compare the careers of different learning researchers","To describe how exams measure familiarity with texts"],0,"","整篇解釋「費力但有效」的學習方法（提取練習、間隔學習）以及條件。"),
  Q("na04b","The word \"consolidate\" in the passage is closest in meaning to",["strengthen","replace","divide","reveal"],0,"","consolidate it more firmly＝鞏固、加強記憶。"),
  Q("na04c","According to paragraph 2, how does spacing help learners?",["The effort of relearning partly forgotten material strengthens memory.","It prevents any forgetting between study sessions.","It lets learners reread their notes more often.","It reduces the total time needed to cover a topic."],0,"","間隔讓人忘掉一點，重新學回來的努力讓記憶更牢。它不是「防止遺忘」。"),
  Q("na04d","Which of the following would the author most likely consider a desirable difficulty?",["Explaining a concept from memory before checking the textbook","Studying in a crowded cafeteria with loud music","Reading an advanced research paper with no background knowledge","Highlighting key sentences while rereading a chapter"],0,"","從記憶中說出來＝提取練習。吵雜環境與內容無關；太難的內容只會混亂；重讀＝熟悉感。"),
  Q("na04e","What can be inferred about students who rely on familiarity?",["They may overestimate how well they know the material.","They usually study for fewer hours than other students.","They perform best on exams that require recall.","They prefer to study in groups rather than alone."],0,"","他們常對考差感到意外 → 高估了自己的掌握程度。")
]),
AP("na05","r3","Tidal Locking and Habitable Worlds",[
  "Many of the rocky planets discovered outside our solar system orbit red dwarfs, small stars that are much cooler and dimmer than the Sun. To receive enough warmth for liquid water, a planet must orbit a red dwarf very closely, often completing a \"year\" in just a few days. At such short distances, the star's gravity stretches the planet slightly, and over time this stretching slows the planet's rotation until one side permanently faces the star. Astronomers call this condition tidal locking.",
  "At first, tidal locking seemed to rule out life on these worlds. ■ One hemisphere would experience endless daylight and intense heat, while the other would remain in permanent darkness. ■ Early models predicted that the atmosphere on the night side would become so cold that it would freeze and collapse onto the surface, leaving the planet without a protective layer of air. ■ More sophisticated climate simulations, however, have challenged this conclusion. ■ They show that a reasonably thick atmosphere can carry heat from the day side to the night side through powerful winds, preventing it from freezing.",
  "Some researchers now focus on the \"terminator zone,\" the ring-shaped boundary between day and night, where temperatures might remain moderate. Still, red dwarfs pose another threat: they frequently release violent flares of radiation, which could strip away a planet's atmosphere altogether. Whether tidally locked planets can remain habitable may therefore depend less on their rotation than on the behavior of their stars."
],["collapse"],[
  Q("na05a","According to paragraph 1, why must a planet orbit close to a red dwarf to have liquid water?",["Red dwarfs give off relatively little heat.","Red dwarfs have stronger gravity than the Sun.","Planets far from red dwarfs spin too quickly.","Water can exist only on planets with short years."],0,"","紅矮星 cooler and dimmer → 要靠很近才夠暖。"),
  INS("na05b","Without an atmosphere, the surface would also be exposed to harmful radiation from the star.",2,"Without an atmosphere 接在「失去保護的空氣層」之後，也就是第 3 個方塊；後面再接 however 轉折。"),
  Q("na05c","The word \"collapse\" in the passage is closest in meaning to",["fall down","spread out","heat up","break away"],0,"","大氣凍結後 collapse onto the surface＝塌落到地表。"),
  Q("na05d","According to paragraph 2, what did more sophisticated simulations show?",["Winds could move enough heat to keep the night-side atmosphere from freezing.","The day side of a locked planet would be cooler than expected.","Tidally locked planets slowly begin to rotate again.","A thick atmosphere traps all of its heat on the day side."],0,"","較厚的大氣能靠強風把熱帶到夜面，避免結凍。"),
  Q("na05e","What does the author suggest in paragraph 3?",["Stellar flares may be a bigger obstacle to habitability than tidal locking.","The terminator zone is protected from stellar flares.","Red dwarfs rarely affect their planets' atmospheres.","Tidal locking has been proven to make planets uninhabitable."],0,"","may depend less on their rotation than on the behavior of their stars → 恆星閃焰可能才是關鍵。")
]),
AP("na06","r3","Paper Money in Song China",[
  "The world's first government-issued paper money appeared in China during the Song dynasty (960–1279). Its origins, however, lay in private commerce. In the early eleventh century, merchants in Sichuan, a region that used heavy iron coins, began depositing their coins with trusted shops in exchange for paper receipts. These receipts, which could be exchanged for coins on demand, were far easier to carry over long distances and soon circulated as a means of payment in their own right.",
  "Problems arose when some issuers printed more receipts than they had coins to back them. After several shops failed and customers lost their savings, the Song government took control of the system in 1024. It established an official agency to print notes, set limits on how many could circulate, and required that a reserve of coins be kept to support their value. For a time, these measures maintained public confidence in the notes.",
  "Over the following centuries, however, the government faced mounting military expenses, particularly in wars against northern rivals. Rather than raise taxes, officials repeatedly printed additional notes, often without increasing the coin reserve. The predictable result was inflation: as the quantity of paper money grew, each note bought less, and merchants increasingly refused to accept notes at their face value. The Song experience offers an early illustration of a principle economists still emphasize: the value of paper currency depends on trust in the authority that issues it."
],["mounting"],[
  Q("na06a","According to paragraph 1, why did merchants in Sichuan begin using paper receipts?",["Metal coins were inconvenient to transport.","The government required them to deposit their coins.","The shops paid interest on paper receipts.","Iron coins were in short supply."],0,"","heavy iron coins，紙收據 far easier to carry over long distances。"),
  Q("na06b","The word \"mounting\" in the passage is closest in meaning to",["increasing","unexpected","temporary","shared"],0,"","mounting expenses＝不斷增加的開支。"),
  Q("na06c","All of the following were measures taken by the Song government after 1024 EXCEPT",["repaying customers who had lost their savings","creating an agency to print notes","limiting the number of notes in circulation","keeping a reserve of coins"],0,"","政府設機構、限制數量、保留準備金；文中沒說賠償存戶。"),
  Q("na06d","What can be inferred about why officials printed more notes?",["It was a way to pay for wars without raising taxes.","Merchants demanded more notes for long-distance trade.","The coin reserve had grown too large to manage.","Northern rivals had started using Song paper money."],0,"","軍費增加，Rather than raise taxes → 印更多鈔票。"),
  Q("na06e","Why does the author mention a principle that economists still emphasize?",["To connect a historical case to a general economic idea","To criticize modern governments for printing money","To show that Song officials understood inflation","To explain why Sichuan used iron coins"],0,"","把宋朝的例子連到「紙幣價值取決於信任」的普遍原則。")
])
  ]
});
