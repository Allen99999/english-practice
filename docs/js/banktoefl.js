/* ===== TOEFL iBT（2026 新制）練習題庫：原創題，題型、難度照 ETS 2026 規格（Reading／Listening／Writing／Speaking）
   這個檔案：題庫設定＋閱讀；聽力、寫作、口說在 banktoefl2.js；兩份正式模擬卷在 banktoeflmock*.js ===== */
BANKS.push({
  id: "toefl", grade: 20, tagIsType: true,
  title: "TOEFL iBT（2026 新制）",
  range: "Reading・Listening・Writing・Speaking",
  added: "2026-10-17",
  note: "依 ETS 2026 年 1 月新制規格自編：閱讀＝Complete the Words、Read in Daily Life、Academic Passage；聽力＝Choose a Response、Conversation、Announcement、Academic Talk；寫作＝Build a Sentence、Email、Academic Discussion；口說＝Listen and Repeat、Interview。寫作口說是自評＋範文。",
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
CT("tc01","r1","Coral Reefs","Coral reefs are among the most diverse ecosystems on Earth. Although they cov{er} less th{an} one per{cent} of the oce{an} floor, th{ey} support about a quar{ter} of all mar{ine} species. Reefs are bu{ilt} by tiny ani{mals} called polyps, which pro{duce} hard skeletons of calcium carbonate over many years."),
CT("tc02","r1","The Printing Press","The invention of the printing press in the fifteenth century changed the way information spread. Bef{ore} printing, bo{oks} were cop{ied} by hand, wh{ich} made th{em} rare and expen{sive}. Once pri{nted} books bec{ame} cheaper, lite{racy} rates gra{dually} increased across Europe, and new ideas could reach a much wider audience."),
CT("tc03","r1","Sleep and Memory","Scientists have long known that sleep plays an important role in learning. Dur{ing} deep sle{ep}, the br{ain} replays inform{ation} gathered dur{ing} the day. Th{is} process hel{ps} move new memo{ries} from short-term sto{rage} into lo{ng}-term storage, which explains why students who sleep well often remember more."),
CT("tc04","r1","Urban Heat Islands","Cities are often several degrees warmer than the surrounding countryside. Th{is} effect, kno{wn} as the urb{an} heat island, occ{urs} because conc{rete} and asphalt abs{orb} heat dur{ing} the day a{nd} release it slo{wly} at night. Plant{ing} trees and building green roofs can help reduce the problem."),
CT("tc05","r1","Honeybee Communication","Honeybees have a remarkable way of sharing information about food. Wh{en} a forager fin{ds} a good sou{rce} of nectar, it retu{rns} to the hi{ve} and performs a spe{cial} movement cal{led} the waggle dance. T{he} direction of t{he} dance shows other bees which way to fly, wh{ile} its length indicates the distance."),
CT("tc06","r1","How Volcanoes Form","Volcanoes form where molten rock from deep inside the Earth reaches the surface. Ma{ny} of them a{re} found along t{he} edges of tecto{nic} plates, whe{re} the crust is wea{ker}. When pres{sure} builds up und{erground}, magma can esc{ape} through cracks, some{times} producing violent eruptions that change the landscape."),

/* ---------- Reading・Read in Daily Life ---------- */
G("td01","r2","notice","Notice: Library Study Rooms",[
  "Hartwell Library — Group Study Rooms",
  "Rooms on the third floor can now be reserved online for up to three hours per day.",
  "Reservations open seven days in advance. Groups must have at least two students.",
  "If your group does not arrive within 15 minutes of the start time, the room will be released to other students.",
  "Please do not move furniture between rooms."
],[["reserve","預約"],["in advance","事先"],["release","釋出"]],[
  Q("td01a","What is the main purpose of the notice?",["To explain how to use the study rooms","To announce new library hours","To ask students to return furniture","To introduce a new online course"],0,"看標題和第一句。","通知說明小組自習室的預約方式和規則。"),
  Q("td01b","What will happen if a group arrives 20 minutes late?",["They may lose their reservation.","They will have to pay a fee.","They can stay one extra hour.","They must move to the first floor."],0,"找 15 minutes 那一句。","超過 15 分鐘沒到，房間會釋出給其他學生。")
]),
G("td02","r2","notice","Text Message",[
  "From: Maya (4:12 PM)",
  "Hi Sam! The professor just emailed — tomorrow's biology lab is moved from Room 204 to the greenhouse behind the science building. Also, we don't need to bring goggles this time, but wear closed-toe shoes. See you at 9!"
],[["greenhouse","溫室"],["goggles","護目鏡"],["closed-toe shoes","包頭鞋"]],[
  Q("td02a","Why did Maya send the message?",["To share a change in the lab location","To cancel tomorrow's lab","To ask Sam to buy goggles","To invite Sam to the greenhouse for lunch"],0,"訊息的重點是什麼改變了。","實驗課地點從 204 教室改到溫室。"),
  Q("td02b","What should Sam do for the lab?",["Wear shoes that cover his toes","Bring his own goggles","Arrive at 4:12 PM","Go to Room 204 first"],0,"注意 but 後面。","不用帶護目鏡，但要穿包頭鞋。"),
  Q("td02c","When does the lab begin?",["At 9 o'clock","At 4:12","In the afternoon","The message does not say"],0,"最後一句。","See you at 9!")
]),
G("td03","r2","notice","Email: Course Registration",[
  "To: all first-year students",
  "From: Office of the Registrar",
  "Subject: Spring registration reminder",
  "Registration for spring courses opens on November 4 at 8:00 a.m. Before registering, you must meet with your academic advisor to have your course plan approved. Students who have unpaid library fines will not be able to register until the fines are cleared. Popular courses fill quickly, so we recommend preparing a list of backup choices."
],[["registrar","註冊組"],["approve","核准"],["fine","罰款"],["backup","備用的"]],[
  Q("td03a","What must students do before registering?",["Meet with their advisor","Pay their tuition","Visit the library","Choose only popular courses"],0,"Before registering ...","要先和指導老師見面，讓課表被核准。"),
  Q("td03b","What can be inferred about students with library fines?",["They need to pay before they can register.","They will be given extra backup choices.","They can register one day early.","They must take a library course."],0,"推論題。","有未繳罰款的學生要先繳清才能選課。"),
  Q("td03c","Why does the email suggest a list of backup choices?",["Some courses may become full quickly.","Advisors require two lists.","Registration closes at 8:00 a.m.","Backup courses are cheaper."],0,"注意 so 前面的原因。","熱門課很快額滿。")
]),
G("td04","r2","notice","Menu Board: Campus Café",[
  "Campus Café — Weekday Specials",
  "Monday: Tomato soup + grilled cheese ($6.50)",
  "Wednesday: Chicken wrap + salad ($7.25)",
  "Friday: Veggie pasta ($6.75)",
  "Bring your own cup and get 50 cents off any hot drink. Specials available 11 a.m.–2 p.m. only."
],[["special","特餐"],["wrap","捲餅"]],[
  Q("td04a","Lena wants the chicken wrap special. On which day should she go?",["Wednesday","Monday","Friday","Any weekday"],0,"找 chicken wrap。","雞肉捲餅特餐在星期三。"),
  Q("td04b","How can customers save money on a hot drink?",["By bringing their own cup","By ordering before 11 a.m.","By buying a special","By paying with a student card"],0,"Bring your own cup ...","自備杯子可以折 50 分。")
]),
G("td05","r2","notice","Email from a Professor",[
  "Dear students,",
  "I will be attending a conference next Tuesday, so our regular class is canceled. Instead, please watch the recorded lecture posted on the course website and complete the short quiz that follows it by Thursday at noon. The quiz will count toward your participation grade. My office hours on Wednesday will be held online instead of in my office.",
  "Best, Professor Alvarez"
],[["conference","研討會"],["count toward","計入"],["participation","參與"]],[
  Q("td05a","Why is Tuesday's class canceled?",["The professor will be at a conference.","The classroom is being repaired.","There is a holiday.","Students have an exam."],0,"第一句。","教授要去研討會。"),
  Q("td05b","What are students asked to do?",["Watch a recording and take a quiz","Attend a conference","Visit the professor's office on Tuesday","Write a report about the conference"],0,"Instead, please ...","看錄好的講課並完成小測驗。"),
  Q("td05c","What is true about Wednesday's office hours?",["They will take place online.","They are canceled.","They will be on Thursday.","They are only for the quiz."],0,"最後一句。","改成線上進行。")
]),
G("td06","r2","notice","Housing Announcement",[
  "Residence Hall Notice",
  "Water will be shut off in Baker Hall on Saturday from 9 a.m. to 1 p.m. for pipe repairs. During this time, residents may use the showers in the gym, which will open two hours earlier than usual. We apologize for the inconvenience."
],[["shut off","關閉（供應）"],["resident","住宿生"],["inconvenience","不便"]],[
  Q("td06a","What will happen on Saturday morning?",["The water will be turned off in Baker Hall.","The gym will be closed.","Residents must leave Baker Hall.","New showers will be installed."],0,"第一句。","貝克宿舍週六上午停水修管。"),
  Q("td06b","What will be different about the gym on Saturday?",["It will open earlier than usual.","It will be closed for repairs.","It will have no water.","It will be used only by staff."],0,"注意 two hours earlier。","體育館會比平常提早兩小時開放，讓住宿生使用淋浴間。")
]),
G("td07","r2","notice","Online Post: Lost and Found",[
  "Posted by: J. Kim — Campus Lost & Found Board",
  "Found: a black umbrella with a wooden handle, left in Lecture Hall B after the 3 p.m. economics class on Monday. I gave it to the security desk in the Student Center. If it's yours, you'll need to describe the umbrella and show your student ID to pick it up."
],[["security desk","警衛櫃台"],["describe","描述"]],[
  Q("td07a","Where is the umbrella now?",["At the security desk","In Lecture Hall B","With J. Kim","At the economics office"],0,"I gave it to ...","交給學生中心的警衛櫃台。"),
  Q("td07b","What must the owner do to get the umbrella back?",["Describe it and show an ID","Pay a small fee","Contact the economics professor","Attend the Monday class"],0,"最後一句。","要描述雨傘並出示學生證。")
]),
G("td08","r2","notice","Flyer: Volunteer Opportunity",[
  "Help Clean Up Riverside Park!",
  "Join the Environmental Club this Sunday from 8 to 11 a.m. Gloves, bags, and water will be provided. Volunteers who stay for all three hours will receive a certificate of service. No experience is needed, but please wear clothes that can get dirty. Meet at the north entrance."
],[["provide","提供"],["certificate","證書"],["entrance","入口"]],[
  Q("td08a","What will volunteers receive if they stay the whole time?",["A certificate","Free gloves to keep","A club T-shirt","Lunch"],0,"stay for all three hours ...","全程參加可以拿到服務證書。"),
  Q("td08b","What should volunteers bring or wear?",["Clothes that can get dirty","Their own gloves","Bags for trash","A water bottle"],0,"手套、袋子、水都有提供。","要穿可以弄髒的衣服。"),
  Q("td08c","The word \"provided\" in the flyer is closest in meaning to",["supplied","requested","collected","checked"],0,"詞彙題。","provided = supplied（提供）。")
]),
G("td09","r2","notice","Schedule Change",[
  "Shuttle Bus Update — Effective Monday",
  "The Route 2 shuttle will no longer stop at the Medical Center. Passengers going to the Medical Center should take Route 5, which now runs every 15 minutes instead of every 30 minutes. All other Route 2 stops remain the same."
],[["shuttle","接駁車"],["effective","生效"],["route","路線"]],[
  Q("td09a","What change is being announced?",["Route 2 will skip the Medical Center.","Route 5 is being canceled.","All routes will run less often.","The Medical Center is moving."],0,"第一句。","2 號線不再停醫學中心。"),
  Q("td09b","What is true about Route 5 after the change?",["It runs more frequently.","It runs every 30 minutes.","It no longer stops at the Medical Center.","It only runs on Mondays."],0,"instead of ...","改成每 15 分鐘一班，班次變多。")
]),
G("td10","r2","notice","Email: Internship Interview",[
  "Dear Ms. Patel,",
  "Thank you for applying for our summer marketing internship. We would like to invite you to a video interview on March 12 at 2:00 p.m. The interview will last about 30 minutes and will include a short presentation. Please prepare five slides about a product you admire and explain how you would promote it to university students. Kindly confirm your availability by replying to this email by March 8.",
  "Regards, David Chen, Human Resources"
],[["internship","實習"],["admire","欣賞"],["promote","推廣"],["availability","可出席的時間"]],[
  Q("td10a","What is Ms. Patel asked to prepare?",["A short presentation about a product","A list of university students","Her résumé in five pages","A marketing budget"],0,"Please prepare ...","準備五張投影片介紹一個她欣賞的產品。"),
  Q("td10b","What should Ms. Patel do by March 8?",["Reply to confirm she can attend","Send her slides","Complete the interview","Call Human Resources"],0,"最後一句。","3 月 8 日前回信確認時間。"),
  Q("td10c","What can be inferred about the internship?",["It involves promoting products.","It is a full-time job.","It takes place in March.","It is only for engineering students."],0,"marketing internship。","行銷實習 → 工作內容和推廣產品有關。")
]),

/* ---------- Reading・Read an Academic Passage（約 200 字，每篇 5 題） ---------- */
G("ta01","r3","article","The Domestication of the Dog",[
  "Dogs were the first animals to be domesticated, long before sheep, cattle, or horses. Genetic studies suggest that the process began at least 15,000 years ago, when some wolves started living near human camps. These wolves were probably less fearful of people, and they could feed on the food waste that humans left behind.",
  "Over many generations, the wolves that stayed close to humans became increasingly different from their wild relatives. Their bodies grew smaller, their teeth became less powerful, and their behavior became more cooperative. Humans, in turn, benefited from the relationship. Early dogs helped with hunting, warned people of approaching danger, and, in colder regions, may even have provided warmth at night.",
  "Researchers still debate whether domestication happened once or several times in different parts of the world. Some evidence from ancient bones points to Europe, while other studies point to East Asia. It is possible that dogs were domesticated independently in more than one region and that these populations later mixed."
],[["domesticate","馴化"],["generation","世代"],["cooperative","合作的"],["independently","各自獨立地"]],[
  Q("ta01a","According to paragraph 1, why did some wolves begin living near humans?",["They could find food that humans threw away.","Humans captured them for hunting.","Their own habitats had disappeared.","They needed warmth during winter."],0,"第一段最後一句。","這些狼可以吃人類留下的廚餘。"),
  Q("ta01b","The word \"cooperative\" in paragraph 2 is closest in meaning to",["willing to work with others","easily frightened","physically strong","difficult to control"],0,"詞彙題。","cooperative = 願意合作的。"),
  Q("ta01c","All of the following are mentioned as benefits of early dogs EXCEPT",["guarding food supplies from other animals","helping people hunt","warning of danger","keeping people warm"],0,"EXCEPT：找沒提到的。","文中提到打獵、警告危險、保暖，沒有提到看守食物。"),
  Q("ta01d","What is the main purpose of paragraph 3?",["To show that the origin of dogs is still uncertain","To prove that dogs came from Europe","To compare European and Asian dogs","To explain why wolves remain wild"],0,"段落目的。","第三段說明學者對起源仍有爭論。"),
  Q("ta01e","Which of the following can be inferred about domesticated wolves?",["They changed physically over time.","They were larger than wild wolves.","They avoided human camps.","They were domesticated after horses."],0,"推論題。","身體變小、牙齒變弱 → 外形隨時間改變。")
]),
G("ta02","r3","article","Why Leaves Change Color",[
  "In many temperate forests, leaves turn brilliant shades of yellow, orange, and red each autumn. Throughout the growing season, leaves are green because they contain large amounts of chlorophyll, the pigment that captures sunlight for photosynthesis. Chlorophyll is constantly broken down and replaced while days are long and warm.",
  "As autumn approaches, shorter days and cooler nights signal trees to stop producing chlorophyll. As the green pigment fades, other pigments that were present all along become visible. Carotenoids, for example, produce the yellow and orange colors seen in birch and maple trees.",
  "Red colors have a different origin. They come from anthocyanins, pigments that many trees actively produce in autumn, especially when days are sunny and nights are cool. Scientists are not completely sure why trees spend energy making new pigments just before losing their leaves. One theory suggests that anthocyanins protect leaves from sun damage, giving trees more time to recover valuable nutrients before the leaves fall."
],[["temperate","溫帶的"],["pigment","色素"],["photosynthesis","光合作用"],["nutrient","養分"]],[
  Q("ta02a","According to paragraph 1, why are leaves green during the growing season?",["They contain a lot of chlorophyll.","They produce anthocyanins.","They receive little sunlight.","They store carotenoids."],0,"第一段。","含有大量葉綠素。"),
  Q("ta02b","According to paragraph 2, yellow and orange colors appear because",["pigments that were already in the leaf become visible","trees create new yellow pigments in autumn","cold nights damage the chlorophyll","sunlight changes the color of carotenoids"],0,"present all along。","類胡蘿蔔素一直都在，綠色褪去後才顯現。"),
  Q("ta02c","How do red colors differ from yellow colors?",["Red pigments are newly produced in autumn.","Red pigments appear only in birch trees.","Red pigments are a type of chlorophyll.","Red colors appear only on cloudy days."],0,"第三段第一、二句。","紅色的花青素是秋天才主動製造的。"),
  Q("ta02d","The word \"valuable\" in paragraph 3 is closest in meaning to",["useful","colorful","heavy","rare"],0,"詞彙題。","valuable = 有價值、有用的。"),
  Q("ta02e","What does the author suggest about the purpose of anthocyanins?",["It is not yet fully understood.","It has been proven to attract insects.","It helps trees grow new leaves.","It makes leaves fall earlier."],0,"Scientists are not completely sure ...","作者說科學家還不完全確定，只提出一種理論。")
]),
G("ta03","r3","article","The Silk Road",[
  "The Silk Road was not a single road but a vast network of trade routes connecting China with Central Asia, the Middle East, and the Mediterranean. Although it is named after silk, one of China's most valuable exports, merchants also carried spices, glass, metals, and horses in both directions.",
  "Few traders traveled the entire distance. Instead, goods were usually passed from one merchant to another, changing hands many times at busy oasis towns. Each exchange raised the price, which is why silk was extremely expensive by the time it reached Rome.",
  "Perhaps the most lasting effect of the Silk Road was the exchange of ideas rather than goods. Buddhism spread from India into China along these routes, and technologies such as papermaking gradually moved westward. Diseases traveled as well; historians believe the plague that devastated Europe in the fourteenth century may have followed the same paths. In this sense, the Silk Road linked distant societies in ways that were both beneficial and harmful."
],[["network","網絡"],["merchant","商人"],["oasis","綠洲"],["devastate","重創"]],[
  Q("ta03a","According to paragraph 1, which statement about the Silk Road is true?",["It included many different routes.","It was used only to transport silk.","It connected China with the Americas.","It was a single paved road."],0,"not a single road but ...","是由許多貿易路線構成的網絡。"),
  Q("ta03b","Why was silk so expensive when it reached Rome?",["It had been traded and resold many times.","Roman taxes on silk were very high.","Silk was damaged during long journeys.","Only one merchant was allowed to sell it."],0,"Each exchange raised the price ...","一路經過多次轉手，每次都加價。"),
  Q("ta03c","The phrase \"changing hands\" in paragraph 2 means",["being passed to a new owner","being repaired","being counted","being hidden"],0,"片語題。","change hands = 易主、轉手。"),
  Q("ta03d","Why does the author mention the plague in paragraph 3?",["To show that the Silk Road also spread harmful things","To explain why trade on the Silk Road ended","To compare Rome with China","To describe a popular trade good"],0,"作者目的題。","說明絲路除了好處，也帶來疾病等壞處。"),
  Q("ta03e","Which sentence best expresses the main idea of the passage?",["The Silk Road connected distant societies through trade and the exchange of ideas.","Silk was China's only important export.","Most merchants traveled from China to Rome.","Buddhism began in China and spread to India."],0,"主旨題。","絲路透過貿易與思想交流連結遙遠的社會（D 方向寫反了）。")
]),
G("ta04","r3","article","Desert Plants and Water",[
  "Plants that live in deserts face a constant challenge: obtaining and keeping enough water. Over time, they have developed a variety of strategies to survive in places where rain may fall only a few times a year.",
  "Some plants, such as cacti, store water in thick stems. Their leaves have been reduced to spines, which lose very little water and also protect the plant from thirsty animals. In addition, many cacti open the small pores on their surfaces only at night, when temperatures are lower and less water evaporates.",
  "Other desert plants avoid dry periods altogether. These annual plants survive the hottest months as seeds buried in the soil. When enough rain finally falls, the seeds sprout, grow, flower, and produce new seeds within just a few weeks. Still other plants, like the mesquite tree, send roots more than 20 meters underground to reach water that lies far below the surface. Each strategy, though different, solves the same basic problem."
],[["obtain","取得"],["spine","刺"],["pore","氣孔"],["evaporate","蒸發"],["sprout","發芽"]],[
  Q("ta04a","According to paragraph 2, how do the spines of cacti help them survive?",["They reduce water loss and protect the plant.","They collect rainwater from the air.","They help the plant grow faster.","They attract animals that spread seeds."],0,"第二段第二句。","刺可以減少水分散失，也能防止動物來吃。"),
  Q("ta04b","Why do many cacti open their pores at night?",["Less water is lost when it is cooler.","They need moonlight for growth.","Animals are less active at night.","Their roots work only at night."],0,"when temperatures are lower ...","晚上溫度低，水分比較不會蒸發。"),
  Q("ta04c","The word \"sprout\" in paragraph 3 is closest in meaning to",["begin to grow","dry out","fall from the plant","stay buried"],0,"詞彙題。","sprout = 發芽、開始生長。"),
  Q("ta04d","What is true about annual desert plants?",["They complete their life cycle quickly after rain.","They store water in their stems.","They have roots 20 meters long.","They grow only during the hottest months."],0,"第三段。","下雨後幾週內就發芽、開花、結籽。"),
  Q("ta04e","How is the passage organized?",["It describes several solutions to one problem.","It compares deserts with forests.","It tells the history of one plant.","It argues that cacti are the best-adapted plants."],0,"看最後一句。","介紹沙漠植物解決缺水問題的幾種不同策略。")
])
  ]
});
