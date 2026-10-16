/* ===== TOEFL iBT 正式模擬卷（原創，照 ETS 2026 規格）
   Reading、Listening 是兩階段適應性：第一階段（router）答對率 ≥ 60% 進入較難的 upper，否則進入 lower。
   Writing、Speaking 是固定題目。每份卷的題目照：Reading → Listening → Writing → Speaking 排列。 ===== */
const TOEFL_TAGS = bank("toefl").tags;
const RT = it => Object.assign(it, { stage: "router" }), LO = it => Object.assign(it, { stage: "lower" }), UP = it => Object.assign(it, { stage: "upper" });
function toeflMock(n, items) {
  const R = ["r1", "r2", "r3"], Li = ["l1", "l2", "l3", "l4"], W = ["w1", "w2", "w3"], Sp = ["s1", "s2"];
  const b = {
    id: "toefl-m" + n, grade: 21, fixed: true, hidden: true, blind: R.concat(Li),
    title: "TOEFL iBT・正式模擬卷 " + n, range: "Reading・Listening・Writing・Speaking", added: "2026-10-17", note: "",
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
/* ===== Reading：第一階段 ===== */
RT(CT("rc1","r1","Ancient Writing","We know from ancient documents that early civilizations developed complex writing systems. The fir{st} systems we{re} used ma{inly} to rec{ord} trade, suc{h} as the num{ber} of animals or bags of gr{ain} exchanged. Ov{er} time, wri{ting} expanded to include laws, stories, and religious texts, allowing knowledge to pass betw{een} generations.")),
RT(G("rd1","r2","notice","Email: Dining Hall Hours",[
  "To: all residents — From: Riverside Dining Services",
  "Subject: Extended hours during finals week",
  "Beginning Monday, December 16, the main dining hall will stay open until 2:00 a.m. instead of the usual 10:00 p.m. Free coffee and tea will be served from 9:00 p.m. to 1:00 a.m., and light snacks such as sandwiches and fruit will be available during the extended hours. Please note that the salad bar will close at the normal time."
],[["extended","延長的"],["resident","住宿生"]],[
  Q("rd1a","What is the main purpose of the email?",["To announce longer dining hall hours during finals","To introduce a new salad bar","To ask students for feedback","To explain new meal prices"],0,"",""),
  Q("rd1b","What will NOT be available after 10:00 p.m.?",["The salad bar","Free coffee","Sandwiches","Fruit"],0,"","沙拉吧照平常時間關閉。")
])),
RT(G("rd2","r2","notice","Notice: Bike Registration",[
  "Campus Security Notice",
  "All bicycles parked on campus must be registered by October 31. Registration is free and takes about five minutes at the Security Office. Registered bikes receive a sticker that helps us return stolen bicycles to their owners. Unregistered bikes left on campus after November 15 may be removed."
],[["register","登記"],["sticker","貼紙"],["remove","移走"]],[
  Q("rd2a","What are bike owners asked to do?",["Register their bikes by October 31","Buy a new lock","Park only near the Security Office","Pay a registration fee"],0,"",""),
  Q("rd2b","What is one benefit of registering a bike?",["It is easier to return if it is stolen.","It can be parked anywhere.","It will be repaired for free.","It will never be removed."],0,"",""),
  Q("rd2c","What may happen after November 15?",["Unregistered bikes may be taken away.","Registration will cost money.","The Security Office will close.","New stickers will be issued."],0,"","")
])),
RT(G("ra1","r3","article","The Spread of Coffee",[
  "Coffee is one of the most widely consumed drinks in the world, yet its history as a popular beverage is relatively short. According to most historians, coffee was first brewed in Yemen in the fifteenth century, where it was used by religious communities to stay awake during long nights of prayer.",
  "From Yemen, coffee spread quickly through the Middle East. By the sixteenth century, coffeehouses had appeared in cities such as Cairo and Istanbul. These establishments became important social centers where people gathered to talk, listen to music, play games, and exchange news. Some rulers viewed them with suspicion, fearing that they encouraged political discussion, and a few even attempted to close them.",
  "In the seventeenth century, coffee reached Europe, where coffeehouses similarly became places for conversation and business. In London, some coffeehouses were so closely associated with particular activities that they developed into important institutions. One, for example, became a center for shipping information and eventually grew into a major insurance company."
],[["beverage","飲料"],["establishment","場所"],["suspicion","懷疑"],["institution","機構"]],[
  Q("ra1a","According to paragraph 1, why was coffee first used in Yemen?",["To help people stay awake","As a medicine for illness","As a valuable export","To improve the taste of food"],0,"",""),
  Q("ra1b","The word \"establishments\" in paragraph 2 refers to",["coffeehouses","cities","rulers","games"],0,"",""),
  Q("ra1c","Why did some rulers try to close coffeehouses?",["They worried about political discussion there.","They wanted to sell coffee themselves.","Coffeehouses were too noisy.","Coffee was considered unhealthy."],0,"",""),
  Q("ra1d","Why does the author mention a London coffeehouse in paragraph 3?",["To show how coffeehouses could develop into important institutions","To prove that coffee was invented in England","To compare London with Istanbul","To explain how coffee is shipped"],0,"",""),
  Q("ra1e","Which of the following best summarizes the passage?",["Coffee spread from Yemen to the world, and coffeehouses became important social places.","Coffee has been popular for thousands of years.","Rulers in Europe banned coffee.","Coffee was first grown in London."],0,"","")
])),
/* ===== Reading：第二階段（較基礎） ===== */
LO(CT("rc2","r1","School Gardens","Many schools now have small gardens where students grow vegetables. Th{ese} gardens he{lp} children le{arn} where fo{od} comes fr{om}. Stud{ents} plant see{ds}, water th{em}, and wat{ch} them gr{ow}. Teachers say that children are more willing to try new vegetables when they have grown them themselves.")),
LO(G("rd3","r2","notice","Text Message",[
  "From: Professor Wong's assistant",
  "Hi everyone — tomorrow's tutorial is moved from 10 a.m. to 1 p.m. because of a fire drill in the morning. We will still meet in Room 118. Please bring your graded essays so we can discuss the comments."
],[["tutorial","小組課"],["fire drill","消防演習"]],[
  Q("rd3a","Why was the tutorial moved?",["There is a fire drill in the morning.","The professor is sick.","Room 118 is closed.","The essays are not graded yet."],0,"",""),
  Q("rd3b","Where will the tutorial take place?",["Room 118","The professor's office","Online","The library"],0,"",""),
  Q("rd3c","What should students bring?",["Their graded essays","A new essay","Their textbooks","A fire drill form"],0,"","")
])),
LO(G("ra2","r3","article","The Benefits of Walking",[
  "Walking is one of the simplest forms of exercise, but it has many benefits. Doctors say that walking for just thirty minutes a day can strengthen the heart and lower the risk of several diseases. Unlike many other sports, walking requires no special equipment and can be done almost anywhere.",
  "Walking is also good for the mind. Studies have found that people who take regular walks often feel less stressed and sleep better. Some researchers believe that walking outdoors, especially in parks or near trees, has an even stronger effect on mood than walking indoors.",
  "In addition, walking can help people think more creatively. In one experiment, people came up with more ideas while walking than while sitting at a desk. For this reason, some companies now hold \"walking meetings,\" in which employees discuss ideas while taking a short walk together."
],[["equipment","設備"],["mood","心情"],["creatively","有創意地"]],[
  Q("ra2a","According to paragraph 1, what is one advantage of walking?",["It does not require special equipment.","It burns more energy than running.","It can only be done outdoors.","It must be done for one hour a day."],0,"",""),
  Q("ra2b","According to paragraph 2, walking may help people",["feel less stressed","eat less","work longer hours","need less sleep"],0,"",""),
  Q("ra2c","What do some researchers believe about walking outdoors?",["It may improve mood more than walking indoors.","It is dangerous in cities.","It is less healthy than walking indoors.","It should be avoided in parks."],0,"",""),
  Q("ra2d","Why do some companies hold \"walking meetings\"?",["Walking may help people produce more ideas.","Their offices are too small.","Employees want to lose weight.","Meetings are shorter outside."],0,"",""),
  Q("ra2e","What is the passage mainly about?",["The physical and mental benefits of walking","The history of walking meetings","How to choose walking shoes","Why people prefer to sit"],0,"","")
])),
/* ===== Reading：第二階段（較難） ===== */
UP(CT("rc3","r1","Antibiotic Resistance","Antibiotics have saved millions of lives since they were introduced in the 1940s. Howe{ver}, bac{teria} can gra{dually} evolve resis{tance} to th{ese} drugs, part{icularly} when antibiotics a{re} overused or ta{ken} incorrectly. Resis{tant} strains th{en} spread between patients, making some common infections increasingly difficult to treat.")),
UP(G("rd4","r2","notice","Email: Research Assistant Position",[
  "Dear applicants,",
  "Thank you for your interest in the research assistant position in the Department of Linguistics. Due to the high number of applications, interviews will be conducted in two rounds. Applicants selected for the second round will be asked to transcribe a ten-minute audio recording before their interview. Please note that the position requires availability on Tuesday and Thursday afternoons throughout the spring semester; candidates with schedule conflicts will unfortunately not be considered.",
  "Dr. H. Novak"
],[["transcribe","聽寫成文字"],["availability","可以工作的時間"],["conflict","衝突"]],[
  Q("rd4a","Why will interviews be held in two rounds?",["Many people applied for the position.","The professor will be away.","Two positions are available.","The first round is for students only."],0,"",""),
  Q("rd4b","What will second-round applicants need to do?",["Transcribe a recording","Give a presentation","Submit a writing sample","Interview a professor"],0,"",""),
  Q("rd4c","What can be inferred about an applicant who has a class every Tuesday afternoon?",["The applicant will probably not be considered.","The applicant can work only on weekends.","The applicant must reschedule the interview.","The applicant will skip the first round."],0,"","職位要求週二、週四下午都能工作，有衝突就不列入考慮。")
])),
UP(G("ra3","r3","article","Sleep in the Animal Kingdom",[
  "Although sleep appears to be nearly universal among animals, the forms it takes vary remarkably. Many birds and marine mammals, for instance, are capable of unihemispheric sleep, a state in which one half of the brain rests while the other remains alert. Dolphins appear to rely on this ability to continue surfacing for air, and some birds use it to watch for predators while roosting at the edge of a flock.",
  "The total amount of sleep animals require also differs considerably. Large grazing animals such as giraffes and elephants may sleep only two to four hours a day, often in short episodes. Some researchers attribute this to their diet: plants provide relatively little energy, so these animals must spend much of the day feeding. Predators like lions, by contrast, can sleep for more than twelve hours after a successful hunt.",
  "Such differences have complicated efforts to explain why sleep evolved in the first place. If sleep served only one function, one might expect its patterns to be more consistent across species. Instead, many scientists now suspect that sleep fulfills several purposes at once, including conserving energy, repairing tissue, and consolidating memories."
],[["unihemispheric","單側腦半球的"],["roost","棲息"],["attribute","歸因於"],["consolidate","鞏固"]],[
  Q("ra3a","According to paragraph 1, what is unihemispheric sleep?",["Sleep in which half the brain stays alert","Sleep that occurs only underwater","Very short periods of deep sleep","Sleep shared by an entire flock"],0,"",""),
  Q("ra3b","Why does the author mention birds at the edge of a flock?",["To give an example of how unihemispheric sleep can protect animals","To explain why birds sleep less than dolphins","To show that birds sleep in groups","To argue that birds do not need sleep"],0,"",""),
  Q("ra3c","According to paragraph 2, why might giraffes and elephants sleep so little?",["They need a lot of time to eat low-energy food.","They are frequently hunted at night.","Their brains are unusually large.","They sleep only after hunting."],0,"",""),
  Q("ra3d","The word \"consolidating\" in paragraph 3 is closest in meaning to",["strengthening","forgetting","dividing","measuring"],0,"",""),
  Q("ra3e","What can be inferred from paragraph 3?",["The differences in sleep patterns suggest that sleep has more than one function.","Scientists agree that sleep evolved only to save energy.","Most animals sleep the same amount.","Sleep is not necessary for predators."],0,"","")
])),

/* ===== Listening：第一階段 ===== */
RT(L("lr01","l1","cr",["W: Do you know where the chemistry lab is?"],["It's in the basement of the science building.","I finished the lab yesterday.","Chemistry is my favorite subject.","Yes, I know her well."],0,"","")),
RT(L("lr02","l1","cr",["MB: Have you finished reading the article for tomorrow?"],["Almost. I have a few pages left.","It was published in a journal.","Tomorrow is Wednesday.","I'll read the news later."],0,"","")),
RT(L("lr03","l1","cr",["W: Why don't you join us for dinner after the lecture?"],["Thanks, I'd love to.","Because I'm hungry.","The lecture was about nutrition.","Dinner is at the cafeteria."],0,"","")),
RT(L("lr04","l1","cr",["M: The lab report is due on Monday, isn't it?"],["Actually, the professor extended it to Wednesday.","I reported it to the lab.","I reported the problem on Monday.","It's a ten-page report."],0,"","")),
RT(L("lr05","l1","cr",["WA: Would you rather meet in the library or the café?"],["The café is fine, as long as it's not too noisy.","I'd rather not.","The library opens at eight.","I met her in the café."],0,"","")),
RT(L("lr06","l1","cr",["M: I can't find my calculator anywhere."],["Did you check the classroom you were in this morning?","Calculators are expensive.","I need it for my math class.","It's a scientific calculator."],0,"","")),
RT(L("lr07","l1","cr",["W: How often does the shuttle run on weekends?"],["Every half hour, I think.","It runs to the train station.","It's free for students.","On Saturday morning."],0,"","")),
RT(L("lr08","l1","cr",["MC: Who's giving the keynote speech at the conference?"],["A professor from Toronto, I heard.","The conference is in May.","It was a long speech.","I'll give it to you later."],0,"","")),
RT(LG("lv1","l2","Listen to a conversation between two students.",[
  "W: Are you going to sign up for the photography workshop?",
  "M: I'd like to, but it costs eighty dollars, and I don't have a camera.",
  "W: Actually, the art department lends cameras to students for free. And if you volunteer to help set up the exhibition at the end, they waive the fee.",
  "M: Seriously? Then I'm definitely signing up."
],[
  Q("lv1a","Why was the man hesitant to sign up?",["The workshop is expensive and he has no camera.","He is not interested in photography.","The workshop is at a bad time.","He has already taken the workshop."],0,"",""),
  Q("lv1b","What can students do to avoid paying the fee?",["Help set up the exhibition","Bring their own camera","Sign up early","Join the art department"],0,"","")
])),
RT(LG("lv2","l2","Listen to a conversation in a professor's office.",[
  "M: Professor Haynes, do you have a minute? I'm confused about the feedback on my essay.",
  "WB: Of course. What's unclear?",
  "M: You wrote that my argument needs more evidence, but I included three sources.",
  "WB: You did, but you mostly summarized them. I'd like you to explain how each source supports your main claim. That connection is what's missing."
],[
  Q("lv2a","Why does the student visit the professor?",["To ask about comments on his essay","To request a higher grade","To get a list of sources","To submit a late essay"],0,"",""),
  Q("lv2b","What does the professor want the student to do?",["Explain how his sources support his claim","Find more sources","Shorten his summary","Change his main argument"],0,"","")
])),
RT(LG("ln1","l3","Listen to an announcement in a chemistry class.",[
  "N: Before we start, a reminder about lab safety. Starting next week, anyone who arrives without safety goggles will not be allowed into the lab, and the missed experiment can't be made up. Goggles are available at the campus store for twelve dollars. Also, please remember to tie back long hair before working near the burners."
],[
  Q("ln1a","What is the main purpose of the announcement?",["To remind students about safety rules","To introduce a new experiment","To announce a change in the lab schedule","To advertise the campus store"],0,"",""),
  Q("ln1b","What will happen to students who forget their goggles?",["They will not be allowed in the lab.","They can borrow goggles.","They will lose points.","They must make up the experiment later."],0,"",""),
  Q("ln1c","What does the speaker say about long hair?",["It should be tied back.","It is not allowed in the lab.","It must be covered with a cap.","It is dangerous near goggles."],0,"","")
])),
RT(LG("lk1","l4","Listen to a talk in a geology class.",[
  "M: Today let's talk about glaciers, and how they shape the land. A glacier is a huge mass of ice that moves very slowly, often only a few centimeters a day. As it moves, it picks up rocks and drags them along the ground, a bit like sandpaper. Over thousands of years, this can carve deep U-shaped valleys. You can recognize a valley shaped by a glacier because river valleys, by contrast, are usually V-shaped. When a glacier finally melts, it leaves behind the rocks it was carrying, sometimes far from where they originally came from. Geologists use these out-of-place rocks to figure out how far ancient glaciers once reached."
],[
  Q("lk1a","What is the talk mainly about?",["How glaciers change the shape of the land","Why glaciers are melting today","How rivers form","The speed of different glaciers"],0,"",""),
  Q("lk1b","Why does the professor compare a glacier to sandpaper?",["To explain how it wears down the ground","To show how smooth glaciers are","To describe the color of ice","To explain why glaciers move slowly"],0,"",""),
  Q("lk1c","How can a valley shaped by a glacier be recognized?",["It is U-shaped.","It is V-shaped.","It contains a river.","It has no rocks."],0,"",""),
  Q("lk1d","How do geologists use out-of-place rocks?",["To determine how far ancient glaciers extended","To measure the age of rivers","To find valuable minerals","To predict future earthquakes"],0,"","")
])),
/* ===== Listening：第二階段（較基礎） ===== */
LO(L("ll01","l1","cr",["W: Is this seat taken?"],["No, go ahead.","Yes, I take the bus.","It's a comfortable seat.","I sat there yesterday."],0,"","")),
LO(L("ll02","l1","cr",["M: What time does the library close tonight?"],["At eleven, I think.","It's a big library.","I closed the book.","Tonight is fine."],0,"","")),
LO(L("ll03","l1","cr",["W: Can I borrow your notes from Tuesday?"],["Sure, I'll send you a copy.","I took notes in pencil.","Tuesday was rainy.","I borrowed a book."],0,"","")),
LO(L("ll04","l1","cr",["MB: How was your weekend?"],["Pretty relaxing, thanks.","It's on Saturday.","I'll go next weekend.","For two days."],0,"","")),
LO(L("ll05","l1","cr",["W: Where did you buy that backpack?"],["At the shop near the station.","It's very heavy.","I bought it for school.","Last month."],0,"","")),
LO(L("ll06","l1","cr",["M: Should we take a taxi or walk?"],["Let's walk. It's not far.","The taxi was yellow.","I walked yesterday.","Yes, we should."],0,"","")),
LO(LG("lv3","l2","Listen to a conversation between two friends.",[
  "W: Hi, Tom. Are you going to the soccer game on Saturday?",
  "M: I wanted to, but I have to work at the bookstore until four.",
  "W: The game starts at five, so you can still come.",
  "M: Oh, great. Then I'll meet you at the stadium."
],[
  Q("lv3a","Why did the man think he could not go to the game?",["He has to work on Saturday.","He does not like soccer.","He has no ticket.","He is sick."],0,"",""),
  Q("lv3b","Where will they meet?",["At the stadium","At the bookstore","At the man's house","At the bus stop"],0,"","")
])),
LO(LG("ln2","l3","Listen to an announcement in the library.",[
  "W: Attention, library visitors. The library will close in thirty minutes. If you would like to borrow books, please bring them to the front desk now. The study rooms on the second floor are already closed. The library will open again tomorrow at eight a.m. Thank you."
],[
  Q("ln2a","When will the library close?",["In thirty minutes","At eight a.m.","In two hours","At midnight"],0,"",""),
  Q("ln2b","What should visitors who want to borrow books do?",["Go to the front desk now","Come back tomorrow","Go to the second floor","Use the online system"],0,"",""),
  Q("ln2c","What is true about the study rooms?",["They are already closed.","They are open all night.","They are on the first floor.","They must be reserved."],0,"","")
])),
LO(LG("lk2","l4","Listen to a talk in a biology class.",[
  "WA: Let's talk about why some animals hibernate. In winter, food can be very hard to find. Some animals, like certain bears and bats, solve this problem by going into a deep sleep called hibernation. During hibernation, their heart rate slows down, and their body temperature drops. This helps them use very little energy, so they can survive for months without eating. Before winter, these animals eat a lot and store fat in their bodies. That fat gives them the energy they need until spring."
],[
  Q("lk2a","What is the talk mainly about?",["How hibernation helps animals survive winter","How bears find food","Why bats live in caves","How animals stay warm in summer"],0,"",""),
  Q("lk2b","What happens to an animal's body during hibernation?",["Its heart rate slows down.","Its body temperature rises.","It eats more often.","It grows a thicker coat."],0,"",""),
  Q("lk2c","Why do animals eat a lot before winter?",["To store fat for energy","To grow larger","To attract other animals","To keep their teeth strong"],0,"",""),
  Q("lk2d","Which animals are mentioned as examples?",["Bears and bats","Birds and fish","Snakes and frogs","Deer and rabbits"],0,"","")
])),
/* ===== Listening：第二階段（較難） ===== */
UP(L("lu01","l1","cr",["W: I was hoping to get an extension on the case study."],["You'd have to ask Professor Diaz in person.","The case study is about a hospital.","I extended my stay in Boston.","It's due in the morning, before class."],0,"","")),
UP(L("lu02","l1","cr",["MB: Weren't you supposed to be presenting today?"],["They postponed it because the projector broke.","Yes, it was a present from my sister.","I'm supposed to study tonight.","The presentation has twelve slides."],0,"","")),
UP(L("lu03","l1","cr",["W: I can't decide whether to major in economics or political science."],["Why not take an intro course in each this semester?","Economics is about money.","I decided last year.","Political science has many majors."],0,"","")),
UP(L("lu04","l1","cr",["MA: The results of the survey were pretty surprising, weren't they?"],["Not to me, honestly. I expected most of them.","The survey had twenty questions.","I was surprised by the party.","Yes, I'm surveying the area."],0,"","")),
UP(L("lu05","l1","cr",["W: You might want to double-check the figures before you submit the report."],["Good point. I'll go over them again tonight.","The report has three figures.","I submitted my application.","I checked out a book."],0,"","")),
UP(L("lu06","l1","cr",["M: Do you think the committee will approve our proposal?"],["As long as we keep the budget reasonable.","The committee meets on Mondays.","I approve of your choice of tie.","It was a long proposal."],0,"","")),
UP(LG("lv4","l2","Listen to a conversation between a student and a lab coordinator.",[
  "M: Hi, I'm supposed to start working in the neuroscience lab next week, but I haven't received my access card.",
  "WC: Have you completed the online safety training? Access cards aren't issued until the training is recorded in the system.",
  "M: I finished it on Friday.",
  "WC: Then it may take a couple of business days to update. If it's not active by Wednesday, come back and I'll give you a temporary pass."
],[
  Q("lv4a","Why hasn't the student received his access card?",["His training has not been recorded in the system yet.","He failed the safety training.","The lab is closed next week.","He applied for the wrong lab."],0,"",""),
  Q("lv4b","What does the coordinator offer to do?",["Give him a temporary pass if needed","Cancel his training","Call the neuroscience professor","Mail the card to his home"],0,"","")
])),
UP(LG("ln3","l3","Listen to an announcement at the start of a seminar.",[
  "MB: Before we begin, a change to the reading list. The chapter by Henderson has been replaced with a more recent journal article that covers the same debate but includes data from the last decade. It's posted on the course site. Since this replaces about forty pages with fifteen, I'm also adding a short response paper, due next Thursday, which will count as part of your participation grade."
],[
  Q("ln3a","Why did the professor change the reading?",["A newer source includes more recent data.","The chapter was too difficult.","Students could not find the book.","The debate is no longer important."],0,"",""),
  Q("ln3b","Where can students find the new reading?",["On the course site","In the library","In the textbook","From the professor's office"],0,"",""),
  Q("ln3c","Why does the professor add a response paper?",["Because the new reading is much shorter","Because students did poorly on a test","To replace the final exam","Because the seminar is canceled"],0,"","")
])),
UP(LG("lk3","l4","Listen to a talk in an economics class.",[
  "W: Let's look at something economists call the tragedy of the commons. Imagine a pasture that's open to everyone in a village. Each farmer benefits from adding more cows, because the extra milk belongs to that farmer alone. But the cost, which is the damage to the grass, is shared by everyone. So each individual has an incentive to keep adding animals, even though, collectively, they're destroying the resource they all depend on. The same logic applies today to overfishing and to air pollution. Interestingly, the economist Elinor Ostrom showed that communities often avoid this outcome without government control, by developing their own rules and ways of monitoring one another."
],[
  Q("lk3a","What is the main topic of the talk?",["How shared resources can be overused","How farmers increase milk production","The history of village pastures","Why governments control fishing"],0,"",""),
  Q("lk3b","Why does each farmer keep adding cows?",["The benefits are private, but the costs are shared.","The pasture is very large.","The government pays farmers.","Cows improve the quality of the grass."],0,"",""),
  Q("lk3c","Why does the professor mention overfishing and air pollution?",["To show that the same problem exists today","To describe Ostrom's research methods","To explain how pastures are protected","To argue that farming causes pollution"],0,"",""),
  Q("lk3d","What did Elinor Ostrom show?",["Communities can manage shared resources with their own rules.","Government control is always necessary.","Pastures should be divided among farmers.","The tragedy of the commons cannot be avoided."],0,"","")
])),

/* ===== Writing ===== */
BS("w01","w1","I just got back from a trip to Japan.","",["What","was","your","favorite","part"],"of the trip?",["did"],""),
BS("w02","w1","My laptop stopped working last night.","",["Have","you","tried","restarting"],"it?",["try"],""),
BS("w03","w1","I'm taking a cooking class on Saturdays.","",["What","kinds","of","dishes","are","you","learning"],"to make?",["do"],""),
BS("w04","w1","The new café downtown is really popular.","",["Do","you","know","if","it","takes","reservations"],"?",["does it"],""),
BS("w05","w1","I'm going to the job fair tomorrow.","",["Which","companies","are","you","hoping","to talk"],"to?",[],""),
BS("w06","w1","My roommate is moving out next month.","",["Have","you","found","someone","to","replace"],"her?",["finding"],""),
BS("w07","w1","I volunteered at the animal shelter last weekend.","",["How","long","have","you","been"],"volunteering there?",["did"],""),
BS("w08","w1","The final exam was harder than I expected.","",["Which","part","did","you","find","most"],"difficult?",["found"],""),
BS("w09","w1","I'm thinking about studying abroad next year.","",["Where","would","you","like","to go"],"?",["will"],""),
BS("w10","w1","Our group finished the project early.","",["Could","you","tell","me","how","you","managed"],"that?",["did"],""),
EM("w11","w2","You recently bought a desk lamp from an online store. When it arrived, the lamp did not turn on, and the box was damaged. Write an email to the store's customer service team.",
  ["Describe the problem with the lamp","Explain when and how you received it","Say what you would like the store to do"],
  "Dear Customer Service Team,\nI'm writing about a desk lamp I ordered from your website (order number 48213). It was delivered last Tuesday, but the box was badly crushed, and when I plugged the lamp in, it did not turn on at all. I tried a different outlet and a new bulb, but it still didn't work. I have attached photos of the damaged box and the lamp. I would appreciate it if you could send me a replacement as soon as possible, or, if that's not possible, issue a full refund. Please let me know how I should return the broken lamp.\nThank you for your help,\nTaylor Wu",
  "三個重點都要寫：問題、收到的時間與狀況、希望對方怎麼處理；語氣禮貌但清楚。"),
AD("w12","w3","sociology",
  ["Dr. Bennett","Some people believe that young people today have fewer close friends than previous generations because they spend so much time online. Others think the internet helps young people build and maintain friendships. What is your view?"],
  [["Ethan","I think the internet makes friendships weaker. People have hundreds of online friends but fewer people they can really talk to."],
   ["Grace","I disagree. Online platforms let me stay close to friends who moved away. Without them, I would have lost touch with many people."]],
  "I agree with Grace that the internet can help young people maintain friendships, although Ethan raises a valid concern. It's true that having hundreds of online contacts doesn't mean having close friends. However, the problem isn't the internet itself but how people use it. For example, when my best friend moved to another country two years ago, we kept our friendship strong by video-calling every weekend and playing games online together. Ten years ago, we probably would have drifted apart. The internet also helps shy students find people with similar interests, which can lead to real friendships offline. So I believe the internet, when used thoughtfully, strengthens friendships rather than weakening them.",
  "回應兩位同學、提出自己的立場，用親身例子支持。"),

/* ===== Speaking ===== */
SR("s01","s1","You are a new assistant at a campus bookstore café. Listen to your supervisor and repeat what she says.","W: Welcome to the bookstore café."),
SR("s02","s1","You are a new assistant at a campus bookstore café. Listen to your supervisor and repeat what she says.","W: New releases are displayed near the front windows."),
SR("s03","s1","You are a new assistant at a campus bookstore café. Listen to your supervisor and repeat what she says.","W: Coffee and pastries are sold at the counter."),
SR("s04","s1","You are a new assistant at a campus bookstore café. Listen to your supervisor and repeat what she says.","W: Study tables are located on the second floor."),
SR("s05","s1","You are a new assistant at a campus bookstore café. Listen to your supervisor and repeat what she says.","W: Please keep your voice down in the quiet reading area."),
SR("s06","s1","You are a new assistant at a campus bookstore café. Listen to your supervisor and repeat what she says.","W: The Wi-Fi password is printed on the back of every receipt."),
SR("s07","s1","You are a new assistant at a campus bookstore café. Listen to your supervisor and repeat what she says.","W: If customers can't find a book, please direct them to the information desk."),
SI("s08","s2","A researcher is interviewing you about free time.","M: What do you usually do to relax after a busy week?",
  "After a busy week, I usually relax by going hiking with my friends on Saturday morning. Being outdoors helps me clear my mind, and walking for a few hours makes me feel refreshed. In the evening, I like to cook something simple and watch a movie at home, so I'm ready for the next week.",""),
SI("s09","s2","A researcher is interviewing you about free time.","M: Do you think people today have more free time or less free time than in the past? Why?",
  "I think people today have less real free time than in the past. Even though technology saves time on many tasks, people are expected to answer messages and emails at any hour, so work and school follow us home. For example, my parents often reply to work messages during dinner. As a result, it's harder to fully rest.",""),
SI("s10","s2","A researcher is interviewing you about free time.","M: Some schools require students to join at least one club. Is that a good idea? Explain.",
  "I think it's a good idea in general. Clubs help students develop skills that classes don't teach, like teamwork and leadership, and they help students make friends outside their usual group. When I joined the debate club, I became much more confident speaking in public. However, schools should offer many kinds of clubs, so every student can find something they actually enjoy.",""),
SI("s11","s2","A researcher is interviewing you about free time.","M: In the future, how do you think people will spend their free time differently?",
  "In the future, I think people will spend more of their free time in virtual environments, like playing games or attending concerts in virtual reality. At the same time, I think there will be a growing interest in outdoor activities, because people will want a break from screens. So free time may become a balance between digital experiences and nature.","")
]);
