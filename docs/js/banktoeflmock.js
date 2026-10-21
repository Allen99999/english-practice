/* ===== TOEFL iBT 正式模擬卷（原創，照 ETS 2026 規格，難度對照近期考情）
   Reading、Listening 是兩階段適應性：第一階段（router）答對率 ≥ 60% 進入較難的 upper，否則進入 lower。
   lower 約 B1～B2、router 約 B2、upper 約 C1。Writing、Speaking 是固定題目。
   每份卷的題目照：Reading → Listening → Writing → Speaking 排列。 ===== */
const TOEFL_TAGS = bank("toefl").tags;
const RT = it => Object.assign(it, { stage: "router" }), LO = it => Object.assign(it, { stage: "lower" }), UP = it => Object.assign(it, { stage: "upper" });
function toeflMock(n, items) {
  const R = ["r1", "r2", "r3"], Li = ["l1", "l2", "l3", "l4"], W = ["w1", "w2", "w3"], Sp = ["s1", "s2"];
  const b = {
    id: "toefl-m" + n, grade: 21, fixed: true, hidden: true, blind: R.concat(Li),
    title: "TOEFL iBT・正式模擬卷 " + n, range: "Reading・Listening・Writing・Speaking", added: "2026-10-22", note: "",
    exams: [
      { name: "Reading（約 30 分鐘）", tags: R }, { name: "Listening（約 29 分鐘）", tags: Li },
      { name: "Writing（23 分鐘）", tags: W }, { name: "Speaking（8 分鐘）", tags: Sp },
      { name: "完整一回（約 90 分鐘）", tags: R.concat(Li, W, Sp) }
    ],
    partNotes: [
      "Complete the Words、Read in Daily Life、Academic Passage。兩階段適應性：第一階段表現決定第二階段的難度。",
      "Choose a Response、Conversation、Announcement、Academic Talk。兩階段適應性，錄音只播一遍。",
      "Build a Sentence 10 題＋Write an Email（建議 7 分鐘）＋Academic Discussion（建議 10 分鐘）。自評＋範文。",
      "Listen and Repeat 7 句＋Take an Interview 4 題。可以錄音重聽，看參考答案自評。",
      "照正式考試順序：Reading → Listening → Writing → Speaking。Reading、Listening 作答時不顯示對錯。"
    ],
    timeLimits: [[R, 30], [Li, 29], [W, 23], [Sp, 8]],
    adaptive: [{ name: "Reading", tags: R, cut: 0.6 }, { name: "Listening", tags: Li, cut: 0.6 }],
    tags: TOEFL_TAGS,
    items
  };
  BANKS.push(b);
}

/* ================================ 正式模擬卷 1 ================================ */
toeflMock(1, [
/* ===== Reading：第一階段（router） ===== */
RT(CTW("m1c1","r1","Bioluminescence","Many deep-sea animals are able to produce their own light, a phenomenon known as bioluminescence. In the dark ocean, this ability serves several purposes, including attracting prey, finding mates, and confusing predators. The light is created by a chemical reaction inside special cells, and it is usually blue or green because those colors travel farthest through seawater. Some fish even use light on their bellies to match the faint glow from above, making them nearly invisible to hunters below.")),
RT(DL("m1d1","r2","Read a notice.",[
  "Campus Transportation Update",
  "Starting Monday, September 9, the Green Line shuttle will no longer stop at the Arts Center. Construction on Elm Street has made the stop unsafe for buses. Passengers traveling to the Arts Center should get off at the Library stop, which is a five-minute walk away.",
  "During evening performances (after 6 p.m.), a smaller van will run directly between the Library stop and the Arts Center entrance every 15 minutes. The van has limited space, so passengers with mobility needs will be given priority."
],[
  Q("m1d1a","Why is the Arts Center stop being removed?",["Road work has made the stop dangerous.","Few passengers used the stop.","The Arts Center is closed for renovation.","The Green Line is being replaced by a van."],0,"","Construction on Elm Street has made the stop unsafe。"),
  Q("m1d1b","What can be inferred about the van service?",["It does not run during the day.","It is only for passengers with mobility needs.","It runs between the Arts Center and Elm Street.","It replaces the Green Line on weekends."],0,"","只在晚上演出（6 點後）行駛；行動不便者只是「優先」。")
])),
RT(DL("m1d2","r2","Read an email.",[
  "From: Prof. Dana Whitfield",
  "To: HIST 245 students",
  "Subject: Thursday's class and the response paper",
  "Dear all,",
  "On Thursday, instead of our regular class, we will attend a guest lecture by Dr. Samuel Osei, whose book on West African trade networks we have been reading. The lecture will be held in Hartley Auditorium rather than our usual room, and it starts fifteen minutes earlier, at 10:45, so please plan accordingly.",
  "Your second response paper, originally due Thursday, is now due the following Monday. You may write about Dr. Osei's lecture instead of the assigned reading if you prefer, but you must still cite at least two chapters from his book. Students who cannot attend should contact me before Thursday to receive an alternative prompt.",
  "Best, Prof. Whitfield"
],[
  Q("m1d2a","What is the main purpose of the email?",["To inform students about changes related to a special event","To announce that a lecture has been canceled","To remind students to buy Dr. Osei's book","To explain how response papers will be graded"],0,"","因為客座演講，上課地點、時間、作業期限都有變動。"),
  Q("m1d2b","According to the email, what is true about Thursday's lecture?",["It begins earlier than the class usually does.","It will take place in the usual classroom.","It is optional for students in the course.","It replaces the second response paper."],0,"","starts fifteen minutes earlier, at 10:45。"),
  Q("m1d2c","What can be inferred about students who choose to write about the lecture?",["They still need to refer to Dr. Osei's book.","They may submit their papers after Monday.","They do not need to cite any sources.","They must contact the professor before Thursday."],0,"","寫演講也 must still cite at least two chapters from his book。要先聯絡教授的是「不能出席」的人。")
])),
RT(AP("m1a1","r3","Urban Birdsong",[
  "Cities are noisy places, and the constant low-frequency rumble of traffic poses a particular challenge for birds, which rely on song to defend territories and attract mates. Over the past two decades, researchers have documented a striking pattern: in many species, birds living in cities sing at higher pitches than members of the same species living in quieter rural areas. The great tit, a small European songbird, was among the first species in which this difference was recorded.",
  "The most widely accepted explanation is that higher-pitched songs are less likely to be masked by traffic noise, which is concentrated at low frequencies. ■ By shifting their songs upward, urban birds make themselves heard over the noise. ■ Some birds also adjust the timing of their singing, starting earlier in the morning before rush-hour traffic begins. ■ These adjustments may come at a cost, however, because in several species females prefer lower-pitched songs, which are often associated with larger, healthier males. ■",
  "Scientists continue to debate whether these changes are learned or inherited. Because young songbirds learn their songs by copying adults, a city-born bird may simply imitate the higher-pitched songs it hears around it. However, some studies suggest that long-established urban populations are also diverging genetically from rural ones. If so, city noise may be shaping not only what birds sing but also the evolution of the species themselves."
],["masked"],[
  Q("m1a1a","According to paragraph 1, what have researchers observed about urban birds?",["They sing at higher pitches than rural birds of the same species.","They sing less often than rural birds.","They no longer defend their territories.","Most of them belong to a single species."],0,"","城市鳥類的歌聲音調比鄉下同種鳥高。"),
  INS("m1a1b","Similar behavior has been observed near airports, where birds sing more before the first flights of the day.",2,"這句是「提早唱歌避開噪音」的另一個例子，要接在 starting earlier in the morning 那句後面＝第 3 個方塊。"),
  Q("m1a1c","The word \"masked\" in the passage is closest in meaning to",["hidden","repeated","imitated","lengthened"],0,"","masked by traffic noise＝被車聲蓋過、聽不見。"),
  Q("m1a1d","Why does the author mention that females prefer lower-pitched songs?",["To point out a possible disadvantage of singing at a higher pitch","To explain why males sing earlier in the morning","To show that urban birds are healthier than rural birds","To argue that pitch has no effect on mating"],0,"","These adjustments may come at a cost → 唱高音可能比較不吸引雌鳥。"),
  Q("m1a1e","What can be inferred from paragraph 3?",["The higher songs of city birds might eventually reflect genetic change.","Young birds are unable to learn songs in cities.","Rural birds copy the songs of city birds.","Scientists agree that the changes are entirely learned."],0,"","城市族群在基因上可能已經和鄉下族群分化 → 可能影響演化。")
])),
/* ===== Reading：第二階段・較基礎（lower） ===== */
LO(CTW("m1c2","r1","Coffeehouses in London","In the seventeenth century, coffeehouses became popular meeting places in London. For the price of a single cup, customers could sit for hours, read newspapers, and discuss politics and business with strangers. Because of this, some people called them penny universities. Several famous institutions, including an insurance company and the stock exchange, began as informal gatherings in coffeehouses.")),
LO(DL("m1d3","r2","Read a schedule.",[
  "Riverside Community Pool — Summer Hours (June 15 – August 31)",
  "Lap Swim (adults only): Monday–Friday, 6:00–9:00 a.m. and 7:00–9:00 p.m.",
  "Family Swim: Monday–Friday, 1:00–6:00 p.m.; Saturday–Sunday, 10:00 a.m.–6:00 p.m.",
  "Swim Lessons (ages 5–12): Tuesday and Thursday, 9:30–11:30 a.m. Registration required.",
  "The pool will close at 3:00 p.m. on July 4. Children under 10 must be accompanied by an adult in the water at all times."
],[
  Q("m1d3a","When can an adult swim laps on a Saturday?",["Lap swim is not offered on Saturdays.","From 6:00 to 9:00 a.m.","From 7:00 to 9:00 p.m.","From 10:00 a.m. to 6:00 p.m."],0,"","Lap Swim 只有週一到週五。"),
  Q("m1d3b","What is required for swim lessons?",["Signing up in advance","Being at least 10 years old","Swimming with an adult","Paying at the pool entrance"],0,"","Registration required。"),
  Q("m1d3c","What can be inferred about July 4?",["Family swim will end earlier than usual.","Lap swim hours will be extended.","Swim lessons will move to the afternoon.","Children may swim without an adult."],0,"","家庭時段平常到 6 點，7 月 4 日 3 點就關門。")
])),
LO(AP("m1a2","r3","Roman Concrete",[
  "Many structures built by the ancient Romans, such as harbor walls and the dome of the Pantheon, are still standing after two thousand years. Modern concrete, by contrast, often begins to crack and crumble within a few decades. For a long time, engineers assumed that the Romans had simply used better materials or more careful methods, but the exact reason for their concrete's durability remained unclear.",
  "Recent research has offered new explanations. Roman builders mixed lime with volcanic ash from the area around the Bay of Naples. When this mixture came into contact with seawater, it caused chemical reactions that formed rare minerals. These minerals grew into the tiny spaces within the concrete, making it stronger over time instead of weaker. ■ Scientists have also found small white lumps of lime scattered through Roman concrete. ■ These lumps were once thought to be signs of poor mixing. ■ However, studies now suggest they allowed the concrete to repair itself: when cracks formed and water entered, the lime dissolved and filled the cracks with new minerals. ■",
  "Engineers are now studying these ancient techniques to design building materials that last longer and are better for the environment. Producing modern cement releases large amounts of carbon dioxide, so concrete that lasts longer could reduce both repair costs and emissions."
],["durability"],[
  Q("m1a2a","According to paragraph 1, what was unclear for a long time?",["Why Roman concrete lasted so long","Where the Romans built their harbors","How the Pantheon's dome was designed","Why modern concrete is cheaper"],0,"","the exact reason for their concrete's durability remained unclear。"),
  Q("m1a2b","According to paragraph 2, what happened when Roman concrete came into contact with seawater?",["Reactions produced minerals that made it stronger.","The lime dissolved completely.","The volcanic ash washed away.","Cracks formed on its surface."],0,"","海水引起化學反應，形成礦物，讓混凝土越來越堅固。"),
  INS("m1a2c","This process has been described as a kind of self-healing.",3,"This process 指的是「石灰溶解後把裂縫填起來」，所以放在段落最後＝第 4 個方塊。"),
  Q("m1a2d","The word \"durability\" in the passage is closest in meaning to",["ability to last","weight","appearance","cost"],0,"","durability＝耐久性。"),
  Q("m1a2e","Why does the author mention carbon dioxide in paragraph 3?",["To explain an environmental benefit of longer-lasting concrete","To describe how Roman concrete was made","To show that ancient builders polluted the air","To compare volcanic ash with modern cement"],0,"","做水泥會排放大量二氧化碳 → 更耐用的混凝土能減少排放。")
])),
/* ===== Reading：第二階段・較難（upper） ===== */
UP(CTW("m1c3","r1","Desalination","Desalination, the process of removing salt from seawater, has become an increasingly important source of drinking water in arid regions. The most common method, reverse osmosis, forces water through membranes whose pores are small enough to block dissolved salts while allowing water molecules to pass. Although the technology has become considerably more efficient, it still demands substantial energy and produces concentrated brine that must be disposed of carefully. Researchers are therefore exploring ways to power plants with renewable energy and to reduce the environmental impact of brine.")),
UP(DL("m1d4","r2","Read an article.",[
  "Hillsdale Approves Four-Day Week for City Offices — With Conditions",
  "After a six-month trial, the Hillsdale City Council voted 5–2 on Tuesday to keep a four-day, ten-hour schedule for most municipal offices. During the trial, the city reported a 12 percent drop in employee sick days and a noticeable improvement in hiring: positions that had remained unfilled for months attracted dozens of applicants once the new schedule was advertised.",
  "The vote was not without controversy. Councilmember Rita Gomez, who opposed the measure, pointed out that residents could no longer visit the permit office on Fridays. \"A policy that is convenient for staff should not be inconvenient for the public,\" she said. In response, the council added a requirement that the permit and tax offices remain open five days a week by rotating staff. The arrangement will be reviewed again next spring."
],[
  Q("m1d4a","What is the article mainly about?",["A local government's decision to continue a schedule change","A debate about raising city employees' salaries","A new office that processes permits on Fridays","A trial program that the council decided to end"],0,"","試行六個月後，市議會投票決定繼續四天工作制（附條件）。"),
  Q("m1d4b","What can be inferred about the city before the trial?",["It had difficulty filling some positions.","Its employees rarely took sick days.","Its permit office was closed on Mondays.","It had already used a four-day week for years."],0,"","有些職缺好幾個月都補不到人，新班表一公告就有幾十人應徵。"),
  Q("m1d4c","Why did the council add a requirement about the permit and tax offices?",["To respond to concerns that residents would lose access to services","To reduce the number of sick days even further","To reward employees who supported the schedule","To end the controversy permanently"],0,"","回應 Gomez「不能讓民眾不方便」的批評；明年春天還會再檢討，所以不是永久解決。")
])),
UP(AP("m1a3","r3","Language and Thought",[
  "The idea that the language we speak shapes the way we think is often associated with the linguist Benjamin Lee Whorf, who argued in the 1930s that speakers of different languages perceive reality in fundamentally different ways. In its strongest form, this hypothesis, known as linguistic determinism, claims that language sets the boundaries of thought, so that concepts lacking a word in one's language are effectively unthinkable. Few researchers today accept this version, in part because people routinely grasp ideas for which their language has no single term.",
  "A weaker claim, linguistic relativity, has received more empirical support. ■ Rather than limiting thought, language is thought to influence habitual patterns of attention and memory. ■ Speakers of Guugu Yimithirr, an Aboriginal language of Australia, describe spatial relationships almost exclusively with cardinal directions, saying, for instance, that a cup is north of a plate rather than to the left of it. ■ Experiments indicate that these speakers maintain a remarkably accurate sense of orientation, even in unfamiliar surroundings. ■",
  "Critics caution, however, that such correlations do not establish causation. Communities that rely on cardinal directions often live in environments where orientation has practical importance, so both the linguistic habit and the cognitive skill might stem from a common cultural cause. Moreover, studies have shown that speakers can be trained to adopt alternative spatial strategies relatively quickly, which suggests that whatever influence language exerts on cognition is flexible rather than fixed."
],["habitual"],[
  Q("m1a3a","According to paragraph 1, why do few researchers accept linguistic determinism?",["People can understand ideas that their language has no word for.","Whorf's research was carried out only in the 1930s.","Most languages contain words for every concept.","Speakers of different languages perceive reality identically."],0,"","people routinely grasp ideas for which their language has no single term。"),
  INS("m1a3b","One frequently cited example involves the way people talk about space.",1,"這句引出「空間」的例子，要放在 Guugu Yimithirr 那句之前＝第 2 個方塊。"),
  Q("m1a3c","The word \"habitual\" in the passage is closest in meaning to",["customary","deliberate","temporary","inherited"],0,"","habitual patterns＝習慣性的模式。"),
  Q("m1a3d","What does the author imply about the experiments with Guugu Yimithirr speakers?",["Their results might be explained by factors other than language.","They were conducted only in unfamiliar surroundings.","They proved that language determines thought.","They failed to measure orientation accurately."],0,"","相關不等於因果：語言習慣和方向感可能都來自共同的文化／環境因素。"),
  Q("m1a3e","Which of the following best describes the organization of the passage?",["A strong claim is rejected, a weaker version is supported with evidence, and the limits of that evidence are discussed.","Two competing theories are described, and the older one is shown to be correct.","A researcher's life is described in chronological order.","A problem is identified, and several solutions are compared."],0,"","第一段否定強版本、第二段弱版本＋證據、第三段批評證據的限制。")
])),

/* ===== Listening：第一階段（router） ===== */
RT(L("m1r01","l1","cr",["W: Are you coming to the department picnic on Saturday?"],["I wouldn't miss it.","The picnic tables are near the lake.","I came here on Saturday.","The department store opens at ten."],0,"","I wouldn't miss it＝一定會去。")),
RT(L("m1r02","l1","cr",["MB: I can't find the syllabus for our history course anywhere."],["Did you check the files section of the course website?","History was my favorite subject in high school.","The course meets in Brown Hall.","I found it really interesting."],0,"","建議去課程網站找。")),
RT(L("m1r03","l1","cr",["W: Professor Lee said we could use our notes during the quiz, right?"],["Only the ones we wrote by hand.","She wrote the quiz herself.","The notes were due yesterday.","Right, then turn left at the corner."],0,"","回答加上條件：只能用手寫的筆記。")),
RT(L("m1r04","l1","cr",["M: Sorry I'm late. The traffic on the bridge was terrible."],["Don't worry, we haven't started yet.","The bridge was built in 1950.","I'm late for class too often.","The traffic lights are red."],0,"","對道歉的自然回應：沒關係，還沒開始。")),
RT(L("m1r05","l1","cr",["WC: How much longer do you think the renovation of the student center will take?"],["They're saying it should be done by spring break.","It's much longer than the old one.","The student center has a food court.","I think it took about two hours."],0,"","問還要多久 → 預計春假前完成。")),
RT(L("m1r06","l1","cr",["M: Shouldn't we tell the professor about the error in the answer key?"],["I already emailed her this morning.","The answer is on page forty.","We should be there by noon.","The professor teaches chemistry."],0,"","間接回答：我已經寄信告訴她了。")),
RT(L("m1r07","l1","cr",["W: This copier only prints in black and white."],["There's a color one on the third floor.","I prefer my coffee black.","Black-and-white films are classics.","The copy looks very clear."],0,"","提供解決方法：三樓有彩色的。")),
RT(L("m1r08","l1","cr",["MA: I'm not sure whether to take the train or drive to the conference."],["Parking downtown is really expensive, you know.","The conference was very informative.","The train station has a cafe.","The conference room holds fifty people."],0,"","間接建議：市區停車很貴 → 搭火車比較好。")),
RT(LG("m1v1","l2","Listen to a conversation between a student and a financial aid officer.",[
  "W: Hi, I'm here about my work-study job at the campus museum. My paycheck this month was much lower than I expected.",
  "M: Let me take a look. Can I have your student ID number?",
  "W: Sure, it's 20417.",
  "M: OK. It looks like your supervisor only submitted twenty hours for the month. How many did you work?",
  "W: Closer to thirty-five. I covered extra shifts when another student was sick.",
  "M: That explains it. Extra shifts have to be entered separately in the online timesheet, and it looks like those weren't. It's a pretty common mistake.",
  "W: So do I just lose that money?",
  "M: Not at all. Ask your supervisor to submit a correction form. As long as it reaches us by the twentieth, you'll get the difference in your next paycheck. After that, it gets pushed to the following month.",
  "W: The twentieth. That's Friday. I'll go to the museum right after this."
],[
  Q("m1v1a","Why did the student receive less pay than expected?",["Some of her hours were not recorded properly.","Her hourly wage was reduced.","She missed several shifts because she was sick.","Her supervisor rejected her timesheet."],0,"","代班的時數沒有另外登錄。生病的是另一位學生。"),
  Q("m1v1b","Why is the student going to the museum right away?",["She wants the correction submitted before a deadline.","She has another shift to cover today.","She needs to pick up her paycheck there.","She plans to quit her job."],0,"","20 號（星期五）前送到，下次薪水才會補發。")
])),
RT(LG("m1v2","l2","Listen to a conversation between a student and his professor.",[
  "M: Professor Hall, thanks for meeting with me. I'm applying for a summer research program at the marine biology institute, and I was hoping you could write me a recommendation letter.",
  "WB: I'd be happy to, Marcus. When is it due?",
  "M: Next Friday. I know that's not much notice. I'm sorry. I only found out about the program last week.",
  "WB: It's tight, but manageable. To write a strong letter, though, I need more than your grade in my class. Could you send me your resume and the program description? And remind me, what was your final project about?",
  "M: I studied how water temperature affects coral bleaching, using data from the institute's own monitoring stations, actually.",
  "WB: Oh, that's a nice connection. Make sure you mention that in your application essay, too. It shows you already know their work.",
  "M: That's a great idea. I'll send you everything tonight."
],[
  Q("m1v2a","Why does the student apologize?",["He is asking for a letter on short notice.","He missed several of the professor's classes.","He forgot to submit his final project.","He applied to the wrong program."],0,"","下週五就要交，I know that's not much notice。"),
  Q("m1v2b","Why does the professor think the student's project is relevant?",["It used data from the institute he is applying to.","It received the highest grade in the class.","It was related to the professor's own research.","It was published in a journal."],0,"","期末專題用的就是那個研究所監測站的資料。")
])),
RT(LG("m1n1","l3","Listen to an announcement in a psychology class.",[
  "MB: Before you leave, a few notes about next week's midterm. First, it will be held in the large lecture hall in the Morrison Building, not here, because we need space for everyone to sit with an empty seat between them.",
  "MB: Second, the format is changing slightly. Last year, the exam was entirely multiple choice. This year, there will be thirty multiple-choice questions and two short essay questions, so practice explaining concepts in your own words, not just recognizing them.",
  "MB: Finally, the review session that was scheduled for Monday evening is moving to Tuesday at five, because the room was double-booked. I'll post the slides from the review session afterward, but I strongly encourage you to attend, since I'll be working through sample essay answers that won't be in the slides."
],[
  Q("m1n1a","Why is the midterm being held in a different location?",["Students need to sit farther apart.","The usual room is being renovated.","More students have joined the course.","The review session will use the usual room."],0,"","need space for everyone to sit with an empty seat between them。"),
  Q("m1n1b","What change has been made to the exam?",["It will include questions that require written explanations.","It will be entirely multiple choice.","It will be shorter than last year's exam.","It will be taken online."],0,"","新增兩題簡答申論。"),
  Q("m1n1c","Why does the professor encourage students to attend the review session?",["Some useful material will not be included in the posted slides.","Attendance will count toward their grade.","The slides will not be posted online.","The new exam location will be announced there."],0,"","範例申論答案只在現場講解，投影片裡沒有。")
])),
RT(LG("m1l1","l4","Listen to part of a talk in an anthropology class.",[
  "W: When we think of domestication, we usually imagine humans deliberately capturing wild animals and breeding them for useful traits. That's roughly what happened with cattle and horses. But cats seem to be a different story. Many researchers now believe cats largely domesticated themselves.",
  "W: Here's the idea. About ten thousand years ago, people in the Near East began farming and storing grain. Stored grain attracted mice, and mice attracted wild cats. Cats that were less afraid of people could take advantage of this new food supply, so they thrived around villages, while more fearful cats stayed away. Over many generations, this created populations of cats that tolerated humans. Farmers, for their part, had a good reason not to chase them off: the cats protected the harvest.",
  "W: Genetic studies support this picture. When researchers compared the DNA of modern house cats with that of wild cats, they found surprisingly few differences. Compared with dogs, cats show very few genetic changes linked to domestication. That fits the idea that humans didn't actively breed cats for specific traits until quite recently, when people started developing breeds like the Persian.",
  "W: One clue in the DNA is related to coat patterns. The narrow stripes of wild cats were the only tabby pattern for thousands of years. A pattern of large swirls, sometimes called blotched tabby, appeared much later, in the Middle Ages, which suggests that human preferences began to shape what cats look like relatively late."
],[
  Q("m1l1a","What is the main idea of the talk?",["Cats may have become domesticated largely without deliberate human breeding.","Cats were domesticated earlier than dogs.","Farmers captured wild cats to protect their grain.","Modern cat breeds are very different from wild cats."],0,"","cats largely domesticated themselves。"),
  Q("m1l1b","According to the professor, why did less fearful cats thrive near villages?",["They could take advantage of the mice attracted by stored grain.","Farmers fed them leftover food.","They were protected from larger predators.","They were bred for their coat patterns."],0,"","穀倉吸引老鼠，不怕人的貓就能利用這個食物來源。"),
  Q("m1l1c","What did genetic studies reveal about house cats?",["They differ only slightly from wild cats.","They are closely related to dogs.","They have many genes linked to domestication.","They all descend from Persian cats."],0,"","surprisingly few differences。"),
  Q("m1l1d","Why does the professor mention the pattern of large swirls?",["To suggest that human preferences shaped cats' appearance only recently","To explain how cats hid from mice","To describe the coats of the first wild cats","To show that striped cats are rare today"],0,"","大漩渦斑紋到中世紀才出現 → 人類偏好很晚才影響貓的外觀。")
])),
/* ===== Listening：第二階段・較基礎（lower） ===== */
LO(L("m1r09","l1","cr",["W: Where can I pick up my student ID card?"],["At the main office, next to the bookstore.","I picked it up yesterday.","Your card is very colorful.","Students need it for the library."],0,"","問地點，回答地點。")),
LO(L("m1r10","l1","cr",["M: When is the essay due?"],["By the end of next week.","It's about environmental policy.","I wrote it in the library.","The essay was very long."],0,"","問時間，回答時間。")),
LO(L("m1r11","l1","cr",["W: Would you like to join us for dinner after the lecture?"],["Thanks, I'd love to.","The lecture was about dinosaurs.","I had dinner at six.","She lectured for two hours."],0,"","接受邀請。")),
LO(L("m1r12","l1","cr",["MB: Is this seat taken?"],["No, go ahead.","I'll take the bus.","Yes, I took it yesterday.","The seats are blue."],0,"","沒人坐，請坐。")),
LO(L("m1r13","l1","cr",["W: Why was the lab closed this morning?"],["They were fixing the air vents.","It opens at nine.","I closed the door behind me.","The lab has twenty computers."],0,"","問原因，回答原因。")),
LO(L("m1r14","l1","cr",["M: How did you do on the chemistry test?"],["Better than I expected.","I studied chemistry in high school.","The test was on Monday.","I'll do it later."],0,"","問考得如何。")),
LO(LG("m1v3","l2","Listen to a conversation between a student and a dining services manager.",[
  "W: Hi, I'd like to change my meal plan. I'm on the unlimited plan, but I'm not using it much.",
  "M: Sure. Can I ask why?",
  "W: I have an internship off campus three days a week, so I usually eat there.",
  "M: Then the 100-meal plan might be better for you. It's about three hundred dollars cheaper for the semester.",
  "W: That sounds good. Can I switch now?",
  "M: Changes can only be made during the first two weeks of the semester, and this is week three. But you can switch for next semester. The form is on our website.",
  "W: Oh, too bad. OK, I'll do that for the spring."
],[
  Q("m1v3a","Why does the woman want to change her meal plan?",["She often eats somewhere else.","The food is too expensive.","She doesn't like the cafeteria food.","She is moving off campus."],0,"","一週三天在校外實習，在那裡吃。"),
  Q("m1v3b","Why can't she change her plan now?",["The period for making changes has passed.","The 100-meal plan is full.","She must pay a fee first.","She needs her advisor's approval."],0,"","只能在開學前兩週改，現在是第三週。")
])),
LO(LG("m1n2","l3","Listen to an announcement from campus dining services.",[
  "W: Hello, students! Starting next Monday, you can order food from the Main Street Cafe using the campus app. Just choose your meal, pay with your meal card, and pick it up at the counter. No more waiting in line!",
  "W: During the first week, every mobile order comes with a free drink. Please note that mobile orders are available only from 7 a.m. to 2 p.m. If you have any problems with the app, ask a staff member at the cafe for help."
],[
  Q("m1n2a","What is the announcement mainly about?",["A new way to order food","A new cafe opening on Main Street","Changes to meal card prices","A new menu at the cafe"],0,"","可以用 App 點餐。"),
  Q("m1n2b","What will students get during the first week?",["A free drink with each mobile order","A discount on meal cards","A free meal","A new phone"],0,"","every mobile order comes with a free drink。"),
  Q("m1n2c","When can students NOT use mobile ordering?",["In the evening","In the morning","At lunchtime","On Mondays"],0,"","只到下午 2 點。")
])),
LO(LG("m1l2","l4","Listen to part of a talk in a botany class.",[
  "MA: Today let's talk about why leaves change color in the fall. During spring and summer, leaves are green because they contain a lot of chlorophyll. Chlorophyll is the substance that helps plants use sunlight to make food. But leaves also contain other colors, like yellow and orange. We just can't see them in summer, because the green of the chlorophyll covers them up.",
  "MA: In the fall, the days get shorter and the temperatures drop. Trees respond by slowly stopping food production in their leaves. The chlorophyll breaks down, and as the green fades, the yellow and orange colors that were there all along become visible.",
  "MA: Red and purple are different. Those colors aren't in the leaf all summer. Some trees, like many maples, actually make new red pigments in the fall. Scientists think these red pigments may protect the leaf from too much sunlight while the tree pulls useful nutrients back into its branches before the leaf drops.",
  "MA: Weather affects how bright the colors are. Sunny days and cool, but not freezing, nights usually produce the most brilliant reds. That's why the colors can be spectacular one year and dull the next."
],[
  Q("m1l2a","Why are leaves green in summer?",["They contain a large amount of chlorophyll.","They absorb green light from the sun.","They produce red pigments.","They contain no other colors."],0,"","葉綠素多，蓋過其他顏色。"),
  Q("m1l2b","According to the professor, why do yellow and orange appear in the fall?",["The green color fades and reveals them.","Trees produce them when the days get shorter.","Cold nights create them.","Insects carry them to the leaves."],0,"","黃色、橘色本來就在，綠色褪去才看得到。"),
  Q("m1l2c","What is true about red pigments?",["Some trees produce them in the fall.","They are present in leaves all summer.","They help leaves make food.","They appear only after leaves fall."],0,"","紅色是秋天新產生的。"),
  Q("m1l2d","What weather produces the brightest red colors?",["Sunny days and cool nights","Rainy days and warm nights","Cloudy days and freezing nights","Hot days and hot nights"],0,"","Sunny days and cool, but not freezing, nights。")
])),
/* ===== Listening：第二階段・較難（upper） ===== */
UP(L("m1r15","l1","cr",["WB: You'd think the library would have more than one copy of a required textbook."],["Maybe they assume everyone buys their own.","The library has three floors.","I'd think about it if I were you.","The textbook has twelve chapters."],0,"","對方在抱怨，回應猜測原因。")),
UP(L("m1r16","l1","cr",["M: I was going to ask Dr. Torres for an extension, but I hear she's pretty strict."],["It can't hurt to ask, though.","She extended her office last year.","I was going to the store anyway.","Strict rules are posted on the door."],0,"","鼓勵他還是去問問看。")),
UP(L("m1r17","l1","cr",["W: Don't tell me the meeting got moved again."],["Afraid so. It's on Thursday now.","I won't tell anyone, I promise.","The meeting went very well.","We moved to a new apartment."],0,"","Don't tell me…＝不會吧？表示不敢相信。Afraid so＝恐怕是的。照字面回答「我不會說」是陷阱。")),
UP(L("m1r18","l1","cr",["MC: I had no idea the exhibit was this popular."],["Neither did I. We should've bought tickets online.","The exhibit closes at six.","I had an idea for my project.","The idea was very popular."],0,"","表示同感，並說出後悔的事。")),
UP(L("m1r19","l1","cr",["W: If I'd known the bus was going to be this crowded, I'd have walked."],["It's not usually this bad. There must be a game tonight.","I've known him for years.","I walked my dog this morning.","The bus driver was very friendly."],0,"","與過去事實相反的假設句（抱怨）。回應解釋為什麼這麼擠。")),
UP(L("m1r20","l1","cr",["MB: So much for finishing the project this weekend."],["What happened? Did the data not come in?","The project was finished last weekend.","Thanks so much for your help.","This weekend is a holiday."],0,"","So much for…＝某個期望落空了。回應追問原因。")),
UP(LG("m1v4","l2","Listen to a conversation between a student and her professor.",[
  "W: Dr. Novak, I'm a bit confused about my survey results. I expected students who exercise more to report less stress, but the correlation is almost zero.",
  "MC: Interesting. How did you measure exercise?",
  "W: I asked how many days a week they exercise.",
  "MC: And stress?",
  "W: A scale from one to ten, on the same survey, which I sent out the week before finals.",
  "MC: Ah. That timing might be a problem. During finals, nearly everyone is stressed, so there isn't much variation left to explain. It's like trying to measure height differences among people who are all standing on chairs.",
  "W: So the lack of a relationship might come from when I collected the data, not from the actual relationship?",
  "MC: Possibly. You can't rerun the survey before your paper's due, but you can discuss this as a limitation. In fact, explaining why a result might be misleading is often more impressive than a neat result.",
  "W: That's reassuring. I'll add a section about timing."
],[
  Q("m1v4a","What does the professor suggest caused the unexpected result?",["The survey was conducted when most students felt stressed.","Students exaggerated how often they exercised.","The stress scale had too many options.","Too few students answered the survey."],0,"","期末考前大家都壓力大，數據沒什麼差異可以比較。"),
  Q("m1v4b","Why does the professor mention people standing on chairs?",["To illustrate how a shared condition can hide real differences","To suggest that the student measure height instead","To explain why exercise reduces stress","To show that the survey questions were confusing"],0,"","大家都站在椅子上，就看不出身高差異 → 共同條件掩蓋了差異。")
])),
UP(LG("m1n3","l3","Listen to an announcement at a research lab meeting.",[
  "WA: Good morning, everyone. I want to update you on a change to the lab's data policy, which takes effect at the start of next month. Until now, each of you has stored raw data on your own laptop and uploaded summaries to the shared drive. Going forward, raw data must be uploaded to the department server within forty-eight hours of collection, and the laptop copy should be treated as a backup, not the main record.",
  "WA: I know this adds a step, but last semester we had two cases where a laptop failed and months of measurements were lost, and in one case a journal asked to see the original data and we couldn't provide it. The server is backed up every night, and it automatically records when each file was created, which reviewers increasingly expect.",
  "WA: If uploading large files from the field is difficult, talk to me. We can arrange a portable drive that you check in when you return."
],[
  Q("m1n3a","What is the main purpose of the announcement?",["To explain a new requirement for storing research data","To introduce a new journal for lab members","To announce the purchase of new laptops","To report that research data was stolen"],0,"","原始資料要在 48 小時內上傳到系上伺服器。"),
  Q("m1n3b","Why does the speaker mention the request from a journal?",["To show that the old system could not provide original records when needed","To encourage lab members to publish more often","To complain about the journal's review process","To explain why laptops sometimes fail"],0,"","期刊要求看原始資料卻拿不出來 → 舊做法的問題。"),
  Q("m1n3c","What can be inferred about researchers working in the field?",["They may find it hard to upload data within the time limit.","They will no longer be allowed to collect data.","They must buy their own portable drives.","They do not have to follow the new policy."],0,"","在野外上傳大檔案有困難，可以改用隨身硬碟回來再交。")
])),
UP(LG("m1l3","l4","Listen to part of a talk in an economics class.",[
  "M: In 1968, the ecologist Garrett Hardin published an essay called The Tragedy of the Commons. He asked readers to imagine a pasture open to all herders. Each herder gains the full benefit of adding another cow, but the cost, overgrazing, is shared by everyone. So each herder, acting rationally, keeps adding cows, and eventually the pasture is destroyed. Hardin concluded that shared resources must either be privatized or controlled by the government.",
  "M: For decades, this argument shaped environmental policy. But the political economist Elinor Ostrom wasn't convinced. She spent years studying real communities that managed shared resources, Swiss mountain pastures, Japanese forests, irrigation systems in Spain and Nepal, some of them for centuries, without either privatization or top-down control. These communities hadn't destroyed their resources. So what were they doing right?",
  "M: Ostrom identified several common features. The boundaries of the resource and the group of users were clearly defined. The people who used the resource helped make the rules. There was monitoring, often by the users themselves, and penalties that started small and increased for repeated violations. And there were inexpensive ways to settle disputes.",
  "M: Ostrom's point was not that Hardin was wrong about everything. Without such institutions, overuse really can happen. Her point was that the choice isn't limited to markets or governments. Communities can develop their own effective rules. In 2009, she became the first woman to receive the Nobel Prize in economics, largely for this work."
],[
  Q("m1l3a","What was Hardin's main conclusion?",["Shared resources need either private ownership or government control.","Herders should cooperate to share their costs.","Pastures recover naturally if they are left alone.","Communities are best at managing resources."],0,"","must either be privatized or controlled by the government。"),
  Q("m1l3b","Why does the professor mention Swiss pastures and irrigation systems in Spain and Nepal?",["To give examples of communities that managed shared resources successfully","To show where Hardin did his research","To illustrate the destruction of common resources","To compare government policies in different countries"],0,"","Ostrom 研究的成功案例：沒有私有化也沒有政府管控。"),
  Q("m1l3c","According to the professor, which is one of the features Ostrom identified?",["Penalties that become stricter for repeated violations","Rules made entirely by outside experts","Unlimited access for anyone who wants to use the resource","Large fines for any first violation"],0,"","penalties that started small and increased for repeated violations。"),
  Q("m1l3d","What is the professor's view of the relationship between Ostrom's and Hardin's ideas?",["Ostrom showed that Hardin overlooked an alternative, though overuse is a real risk.","Ostrom proved that Hardin's argument was completely wrong.","Ostrom agreed that only governments can protect resources.","Hardin later disproved Ostrom's findings."],0,"","not that Hardin was wrong about everything；重點是還有第三種選擇。")
])),

/* ===== Writing ===== */
BS("m1b01","w1","I heard the career fair was moved to the gym.","Do you know _ _ _ _ _ ten?",["whether","it","still","starts","at"],["does"],"間接問句 whether＋主詞＋動詞；does 用不到。"),
BS("m1b02","w1","Why didn't you sign up for the trip to the coast?","I _ _ _ _ _ _ cost.",["wasn't","sure","how","much","it","would"],["did"],"wasn't sure how much it would cost：間接問句不倒裝。"),
BS("m1b03","w1","What did the advisor say about your schedule?","She suggested _ _ _ _ _ _ until next year.",["that","I","postpone","the","advanced","seminar"],["to"],"suggest that＋主詞＋原形動詞（假設語氣）；suggest 後面不能接 to。"),
BS("m1b04","w1","Is the professor's new book available in the library?","Not yet. _ _ _ _ _ _ _ next month.",["It","won't","be","on","the","shelves","until"],["by"],"not…until＝直到…才。"),
BS("m1b05","w1","How was the guest lecture yesterday?","The speaker _ _ _ _ _ _ _ expected.",["was","much","more","engaging","than","I","had"],["very"],"much＋比較級；than I had expected（過去完成式）。"),
BS("m1b06","w1","Did anyone find the keys to the lab?","_ _ _ _ _ where they were.",["Nobody","seems","to","know","exactly"],["seem"],"Nobody 是單數，用 seems。"),
BS("m1b07","w1","Can you recommend a good place to study on campus?","The reading room _ _ _ _ _ is very quiet.",["that","most","graduate","students","use"],["uses"],"關係子句 that most graduate students use；主詞 students 是複數，用 use。"),
BS("m1b08","w1","Why are you leaving the party so early?","I _ _ _ _ _ _ by nine.",["promised","my","roommate","I'd","be","home"],["promise"],"promised (that) I'd be home：過去式＋would。"),
BS("m1b09","w1","Have you finished the survey for the psychology study?","I haven't, _ _ _ _ _ how long it would take.",["because","no","one","told","me"],["said"],"tell＋人＋間接問句；say 後面不能直接接人。"),
BS("m1b10","w1","Which design did the committee choose for the new logo?","_ _ _ _ _ was the one with the blue circle.",["The","design","they","finally","selected"],["which"],"The design (that) they finally selected 省略關係代名詞當主詞。"),
EM("m1e1","w2","You recently attended a weekend workshop on public speaking organized by your university's career center. Write an email to the organizer, Ms. Grant. In your email, do the following:",
  ["Thank her and mention one part of the workshop you found useful.","Describe one problem you experienced during the workshop.","Suggest an improvement for future workshops."],
  "Ms. Grant","Feedback on the public speaking workshop",
  "Dear Ms. Grant,\nThank you for organizing last weekend's public speaking workshop. I found it extremely helpful, especially the session where each of us gave a two-minute talk and received feedback from the group. I had never seen a recording of myself speaking before, and I immediately noticed that I speak too quickly when I am nervous.\nHowever, I did experience one problem. On Saturday afternoon, the projector in Room 108 stopped working, and we spent nearly forty minutes waiting for a technician. As a result, the final activity was cut short, and several participants did not get a chance to practice.\nFor future workshops, I would suggest testing the equipment the evening before, or having a backup room available. It might also help to give participants the schedule in advance so we can prepare our short talks at home.\nThank you again for a valuable experience. I hope to attend the advanced workshop next semester.\nBest regards,\nKevin Chang",
  "感謝＋具體提到有用的活動；問題要說清楚時間、影響；建議要可行，最後再次致謝。"),
AD("m1x1","w3","sociology",
  ["Dr. Morgan","Social media allows young people to stay in touch with more friends than ever before. Some researchers believe this has made it easier to build meaningful friendships, while others argue that online interaction has made friendships more superficial. In your opinion, has social media improved or weakened the quality of young people's friendships? Why?"],
  [["Hannah","I think it has improved friendships. Through online groups, I've met people who share my unusual interests, like old video games, and some of them have become close friends that I would never have met at school."],
   ["Tyler","I'd say it has weakened them. People now click like on a friend's post instead of actually calling them. It feels like staying in touch, but there's no real conversation."]],
  "I think social media has improved young people's ability to find friends but weakened their ability to deepen those friendships. Hannah's experience shows the first point well: for teenagers with uncommon interests, online communities can be a lifeline, especially in small towns. However, Tyler identifies a real problem. Close friendships are built through effort, such as listening to someone during a difficult time or making plans to meet in person, and social media makes it easy to replace that effort with quick reactions. In my own experience, I have several hundred online contacts, but the friends I would call in an emergency are the ones I regularly spend time with offline. So the key factor is not the platform itself but how it is used. If young people treat social media as a starting point for real interaction rather than a substitute for it, it can strengthen friendships instead of making them shallow.",
  "提出「兩者兼具」的細緻立場：找朋友變容易、深化變困難；分別回應兩位同學，用個人經驗支持，最後點出關鍵在使用方式。"),

/* ===== Speaking ===== */
SR("m1s1","s1","You are starting a part-time job at the campus fitness center. Listen to the manager and repeat what he says.","MC: Members scan their cards at the entrance."),
SR("m1s2","s1","You are starting a part-time job at the campus fitness center. Listen to the manager and repeat what he says.","MC: Please wipe down the machines after each use."),
SR("m1s3","s1","You are starting a part-time job at the campus fitness center. Listen to the manager and repeat what he says.","MC: Clean towels are kept in the cabinet by the door."),
SR("m1s4","s1","You are starting a part-time job at the campus fitness center. Listen to the manager and repeat what he says.","MC: The basketball court can be reserved for one hour at a time."),
SR("m1s5","s1","You are starting a part-time job at the campus fitness center. Listen to the manager and repeat what he says.","MC: If a machine is broken, put an out-of-order sign on it right away."),
SR("m1s6","s1","You are starting a part-time job at the campus fitness center. Listen to the manager and repeat what he says.","MC: Personal trainers must check in at the front desk before meeting their clients."),
SR("m1s7","s1","You are starting a part-time job at the campus fitness center. Listen to the manager and repeat what he says.","MC: At the end of your shift, make sure all the weights have been returned to the racks."),
SI("m1i1","s2","You are taking part in a research study about travel and cultural experiences. A researcher will ask you some questions.","W: First, tell me about a place you've traveled to that left a strong impression on you. What made it so memorable?",
  "One place that left a strong impression on me was Kyoto, which I visited with my family two years ago. What made it memorable was the contrast between old and new. In the morning, we walked through quiet temples that are hundreds of years old, and in the evening, we were in a busy shopping district full of modern technology. I also remember how polite and organized everything was. For example, people lined up very neatly for the buses, even when it was crowded. That trip made me more interested in Japanese history, and I've been reading about it ever since.",
  "說出地點、時間，再具體說明「為什麼難忘」（對比、細節例子），最後補上這趟旅行對自己的影響。"),
SI("m1i2","s2","You are taking part in a research study about travel and cultural experiences. A researcher will ask you some questions.","W: Some people prefer organized tours, while others like to plan everything themselves. Which do you prefer when you travel, and why?",
  "I definitely prefer to plan my trips myself. Organized tours are convenient, but they usually follow a fixed schedule, so you can't stay longer at a place you really enjoy. When I plan my own trip, I can be flexible. For example, last summer I found a small local market that wasn't in any guidebook, and I spent the whole afternoon there talking to the sellers. That would have been impossible on a tour. Of course, planning takes more time, and sometimes things go wrong, but I think solving those problems is actually part of the adventure.",
  "選邊後說明理由（彈性），用自己的經驗舉例，再承認缺點並轉回自己的立場。"),
SI("m1i3","s2","You are taking part in a research study about travel and cultural experiences. A researcher will ask you some questions.","W: Many popular destinations now limit the number of tourists or charge visitors extra fees. Do you think this is a reasonable policy? Why or why not?",
  "I think it's reasonable, especially for places that are fragile or very crowded. Too many visitors can damage historical sites and natural areas, and they can make life difficult for local residents, for example by raising rents or causing traffic. A limit or a fee can reduce those problems, and the money can be used to maintain the site. However, I think the fees should be designed carefully, so that students and people with lower incomes are not completely excluded. Maybe there could be discounted days or a reservation system instead of just a high price.",
  "先表態並說明原因（保護古蹟、居民生活），再提出公平性的顧慮與改善方式，讓回答更有深度。"),
SI("m1i4","s2","You are taking part in a research study about travel and cultural experiences. A researcher will ask you some questions.","W: Finally, some people say that virtual reality could one day replace certain kinds of travel. Do you think that's likely? Please explain.",
  "I think virtual reality could replace some kinds of travel, but not most of them. For example, it might be a great way to visit a museum on the other side of the world, or to see places that are dangerous or impossible to reach, like the deep ocean. It's also much cheaper and better for the environment than flying. But I don't think it can replace the experience of actually being somewhere: tasting the local food, hearing different languages around you, or meeting people by chance. Those unexpected moments are what make travel valuable, and they're very hard to recreate in a virtual world.",
  "預測題：說明「哪些可以取代、哪些不行」，各舉例子，最後說明真正旅行的獨特價值。")
]);
