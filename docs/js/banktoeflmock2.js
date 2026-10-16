/* ================================ TOEFL 正式模擬卷 2 ================================ */
toeflMock(2, [
/* ===== Reading：第一階段 ===== */
RT(CT("rc1","r1","Rainforest Layers","Tropical rainforests are often described as having several distinct layers. T{he} tallest tr{ees} form t{he} emergent la{yer}, rising ab{ove} the den{se} canopy be{low}. The can{opy} itself bl{ocks} most sunlight, so pla{nts} on the forest floor must survive with very little light.")),
RT(G("rd1","r2","notice","Notice: Printing Credits",[
  "IT Services Update",
  "Starting this semester, every student receives 300 free printing credits. Black-and-white pages use one credit, and color pages use five. Unused credits do not carry over to the next semester. Additional credits can be purchased at any library help desk."
],[["credit","點數"],["carry over","延續到下次"]],[
  Q("rd1a","How many credits does a ten-page color document require?",["50","10","5","300"],0,"","彩色一頁 5 點 × 10 頁 = 50。"),
  Q("rd1b","What happens to credits that are not used by the end of the semester?",["They expire.","They are refunded.","They are added to next semester.","They can be given to friends."],0,"","不會延續到下學期 → 作廢。")
])),
RT(G("rd2","r2","notice","Email: Club Meeting",[
  "Hi everyone,",
  "Our Film Club meeting this Thursday will be held in the Media Room instead of Room 210, which is being painted. We'll be watching a short documentary and voting on next month's theme. If you have suggestions for the theme, please send them to me by Wednesday night so I can add them to the ballot.",
  "— Daniel (Club President)"
],[["ballot","選票"],["theme","主題"]],[
  Q("rd2a","Why is the meeting location changing?",["Room 210 is being painted.","The Media Room is larger.","The documentary requires special equipment.","More members joined the club."],0,"",""),
  Q("rd2b","What will members do at the meeting?",["Watch a film and vote on a theme","Paint Room 210","Elect a new president","Make a documentary"],0,"",""),
  Q("rd2c","What should members do if they have theme ideas?",["Send them to Daniel by Wednesday night","Bring them on Thursday","Post them in the Media Room","Write them on the ballot"],0,"","")
])),
RT(G("ra1","r3","article","The Invention of Paper",[
  "Paper was invented in China, and historical records traditionally credit its development to Cai Lun, an official of the Han court, around the year 105. Cai Lun is said to have made paper from tree bark, old rags, and fishing nets, which were soaked, beaten into pulp, and spread thin to dry. Archaeological discoveries, however, suggest that simpler forms of paper existed somewhat earlier, so Cai Lun may have improved the process rather than invented it.",
  "Before paper became common, Chinese writers used bamboo strips or silk. Bamboo was cheap but heavy, while silk was light but expensive. Paper combined the advantages of both, and it gradually became the standard writing material in China.",
  "The technique spread slowly. Papermaking reached Korea and Japan by the seventh century and the Islamic world by the eighth century, where cities such as Baghdad became major centers of production. From there it eventually reached Europe, where it would later make the printing revolution possible."
],[["credit ... to","歸功於"],["pulp","紙漿"],["archaeological","考古的"]],[
  Q("ra1a","According to paragraph 1, what materials did Cai Lun reportedly use?",["Bark, rags, and fishing nets","Bamboo and silk","Wood and stone","Cotton and wool"],0,"",""),
  Q("ra1b","What do archaeological discoveries suggest about Cai Lun?",["He may have improved paper rather than invented it.","He never existed.","He invented printing as well.","He worked in Baghdad."],0,"",""),
  Q("ra1c","According to paragraph 2, why did paper become the standard writing material?",["It was both light and inexpensive.","It was more beautiful than silk.","Bamboo became difficult to find.","The government banned silk."],0,"","結合竹簡的便宜與絲的輕便。"),
  Q("ra1d","The word \"gradually\" in paragraph 2 is closest in meaning to",["slowly","suddenly","officially","rarely"],0,"",""),
  Q("ra1e","Why does the author mention Europe in paragraph 3?",["To show that paper later supported the development of printing","To argue that Europe invented paper","To compare Baghdad with European cities","To explain why papermaking stopped in China"],0,"","")
])),
/* ===== Reading：第二階段（較基礎） ===== */
LO(CT("rc2","r1","City Bicycles","Many cities now offer bicycles that people can rent for short trips. Us{ers} pick u{p} a bi{ke} at o{ne} station a{nd} return i{t} at ano{ther}. Th{is} system i{s} cheap a{nd} good for the environment, and it helps reduce traffic in busy downtown areas.")),
LO(G("rd3","r2","notice","Poster: Book Sale",[
  "Used Book Sale — Student Center Lobby",
  "Friday and Saturday, 10 a.m. – 4 p.m.",
  "All books $2 each, or 3 for $5. Money raised will buy new books for the children's hospital. We accept cash only."
],[["raise money","募款"]],[
  Q("rd3a","Where is the book sale?",["In the Student Center lobby","At the children's hospital","In the library","Online"],0,"",""),
  Q("rd3b","How much do three books cost?",["$5","$6","$2","$3"],0,"",""),
  Q("rd3c","What will the money be used for?",["Buying books for a hospital","Repairing the Student Center","Paying the volunteers","Buying new library computers"],0,"","")
])),
LO(G("ra2","r3","article","Why We Yawn",[
  "Almost everyone yawns, but scientists are still not completely sure why. For a long time, people believed that yawning brought more oxygen into the body when we were tired. However, experiments have shown that breathing extra oxygen does not make people yawn less, so this explanation is probably wrong.",
  "A newer idea is that yawning helps cool the brain. When we yawn, we take in a large breath of air, and the movement of the jaw increases blood flow to the head. Some studies found that people yawn more often when their brains are warm and less often in cold weather.",
  "Yawning is also contagious. When we see or even read about someone yawning, we often yawn ourselves. Interestingly, people are more likely to \"catch\" a yawn from family members and close friends than from strangers. Some researchers think this shows that contagious yawning is connected to empathy, the ability to understand how others feel."
],[["contagious","會傳染的"],["empathy","同理心"]],[
  Q("ra2a","According to paragraph 1, why is the oxygen explanation probably wrong?",["Breathing more oxygen does not reduce yawning.","People yawn only when they are hungry.","Yawning reduces oxygen in the body.","Scientists have never tested it."],0,"",""),
  Q("ra2b","According to paragraph 2, when do people yawn less often?",["In cold weather","When they are tired","After exercise","In the morning"],0,"",""),
  Q("ra2c","The word \"contagious\" in paragraph 3 is closest in meaning to",["spreading from one person to another","dangerous to health","difficult to stop","very loud"],0,"",""),
  Q("ra2d","From whom are people most likely to catch a yawn?",["Family members and close friends","Strangers","Animals","Teachers"],0,"",""),
  Q("ra2e","What is the passage mainly about?",["Possible explanations for yawning","The dangers of being tired","How the brain controls breathing","Why animals yawn"],0,"","")
])),
/* ===== Reading：第二階段（較難） ===== */
UP(CT("rc3","r1","Language Extinction","Linguists estimate that roughly half of the world's approximately seven thousand languages may disappear by the end of this century. Wh{en} a lang{uage} loses i{ts} last fl{uent} speakers, communi{ties} lose mo{re} than vocab{ulary}; they a{lso} lose knowl{edge} about lo{cal} plants, history, and ways of seeing the world.")),
UP(G("rd4","r2","notice","Email: Study Abroad Program",[
  "Dear students,",
  "Applications for next year's exchange program with the University of Edinburgh are now open. Applicants must have completed at least three semesters of full-time study and maintained a cumulative GPA of 3.0 or higher. Please note that, unlike previous years, the program will no longer cover housing costs; however, participants remain eligible for the Global Travel Grant, which can be applied toward either airfare or accommodation. Applications are due March 1.",
  "International Programs Office"
],[["cumulative","累計的"],["eligible","有資格的"],["accommodation","住宿"]],[
  Q("rd4a","Who is eligible to apply?",["Students with three semesters of study and a GPA of at least 3.0","All first-year students","Students who have visited Edinburgh","Students with a GPA below 3.0"],0,"",""),
  Q("rd4b","What change from previous years is mentioned?",["Housing costs are no longer covered.","The program is now in Edinburgh.","The grant has been canceled.","Applications are due earlier."],0,"",""),
  Q("rd4c","What can be inferred about the Global Travel Grant?",["It could help students pay for housing.","It covers only airfare.","It is available only to first-year students.","It replaces the exchange program."],0,"","可以用在機票或住宿 → 能幫忙付住宿。")
])),
UP(G("ra3","r3","article","Urban Wildlife",[
  "Cities are often regarded as hostile to wildlife, yet a growing number of species not only survive in urban environments but thrive there. Raccoons, coyotes, peregrine falcons, and certain songbirds have established populations in some of the world's largest cities. Researchers increasingly view these environments not as ecological dead zones but as novel habitats that exert their own distinctive selective pressures.",
  "One striking example concerns urban birds. Studies of great tits in European cities have found that these birds sing at a higher pitch than their rural counterparts, apparently so their songs are not masked by low-frequency traffic noise. Similarly, some urban populations of lizards in Puerto Rico have developed longer limbs and stickier toe pads, traits that help them grip smooth surfaces such as walls and windows.",
  "Such findings have led some scientists to argue that cities are accelerating evolution. Critics caution, however, that many observed differences may reflect individual flexibility rather than genetic change. A bird might simply adjust its song in a noisy environment, much as a person raises his or her voice in a crowded room. Distinguishing between these possibilities requires long-term genetic studies, which remain relatively rare."
],[["hostile","不友善的"],["thrive","興盛"],["novel","新穎的"],["pitch","音高"],["mask","掩蓋"]],[
  Q("ra3a","According to paragraph 1, how do researchers increasingly view cities?",["As new kinds of habitats with their own pressures","As places where no animals can survive","As less important than rural areas","As dangerous only to birds"],0,"",""),
  Q("ra3b","Why do great tits in cities sing at a higher pitch?",["So that traffic noise does not cover their songs","To attract birds from the countryside","Because city air is warmer","To warn other birds of predators"],0,"",""),
  Q("ra3c","Why does the author mention lizards in Puerto Rico?",["To give another example of animals adapting to cities","To show that lizards avoid buildings","To compare lizards with birds' songs","To explain how lizards became extinct"],0,"",""),
  Q("ra3d","The word \"caution\" in paragraph 3 is closest in meaning to",["warn","agree","prove","celebrate"],0,"",""),
  Q("ra3e","What is the critics' main point in paragraph 3?",["Some differences may not be caused by genetic change.","Cities do not affect animals at all.","Long-term genetic studies are unnecessary.","Birds cannot change their songs."],0,"","")
])),

/* ===== Listening：第一階段 ===== */
RT(L("lr01","l1","cr",["MA: Do you know when the next train to the city leaves?"],["In about ten minutes, from platform three.","I took the train last week.","The city is very crowded.","It's a fast train."],0,"","")),
RT(L("lr02","l1","cr",["W: I left my notes at home. Could I look at yours?"],["Sure, let's share them.","I wrote them yesterday.","My home is near campus.","Notes are important."],0,"","")),
RT(L("lr03","l1","cr",["M: Have you heard back from the internship you applied for?"],["Not yet, but they said within two weeks.","I applied online.","The internship is in marketing.","I heard it on the radio."],0,"","")),
RT(L("lr04","l1","cr",["WB: Isn't the seminar supposed to start at two?"],["It was moved to three because of a meeting.","I'm supposed to go home.","The seminar is about art.","Two of my friends are coming."],0,"","")),
RT(L("lr05","l1","cr",["M: Which of these two jackets do you think looks better?"],["The gray one suits you more.","They're both on sale.","I bought a jacket last winter.","It looks like rain."],0,"","")),
RT(L("lr06","l1","cr",["W: The heater in our classroom isn't working again."],["Let's ask the department to send someone.","It's getting warmer outside.","I don't have a heater at home.","The classroom is on the first floor."],0,"","")),
RT(L("lr07","l1","cr",["MC: How many people signed up for the trip?"],["Around thirty so far.","On Saturday morning.","It's a three-day trip.","I signed it yesterday."],0,"","")),
RT(L("lr08","l1","cr",["W: Would you mind proofreading my cover letter?"],["Not at all. Send it over.","I wrote a letter to my aunt.","It's covered in dust.","I don't mind the cold."],0,"","")),
RT(LG("lv1","l2","Listen to a conversation between two students.",[
  "M: Did you get a ticket for the music festival this weekend?",
  "W: I tried, but they sold out in an hour.",
  "M: Oh no. You know, the student union sometimes releases extra tickets on the day before. You should check their website on Friday morning.",
  "W: Thanks. I'll set a reminder."
],[
  Q("lv1a","What is the woman's problem?",["The festival tickets are sold out.","She lost her ticket.","She doesn't like music festivals.","The festival was canceled."],0,"",""),
  Q("lv1b","What does the man suggest?",["Checking the student union website on Friday","Buying tickets from a stranger","Going to a different festival","Asking the man for his ticket"],0,"","")
])),
RT(LG("lv2","l2","Listen to a conversation at the campus health center.",[
  "W: Hi, I'd like to get a flu shot. Do I need an appointment?",
  "MB: Not this week. We're running a walk-in clinic until Friday. You just need to show your student ID and fill out a short form.",
  "W: Is there a charge?",
  "MB: It's free for students who have the university health plan."
],[
  Q("lv2a","Why does the student visit the health center?",["To get a flu shot","To renew her health plan","To see a doctor about a cold","To pick up medicine"],0,"",""),
  Q("lv2b","What is true about the walk-in clinic?",["No appointment is needed.","It costs money for everyone.","It is open only on Friday.","Students need a doctor's note."],0,"","")
])),
RT(LG("ln1","l3","Listen to an announcement in a sociology class.",[
  "W: Quick update on the midterm. It will be held next Tuesday during our regular class time, but not in this room. We'll be in Hall C, which has more space. The exam covers chapters one through six. You may bring one page of handwritten notes, but no textbooks or electronic devices."
],[
  Q("ln1a","Where will the midterm take place?",["In Hall C","In the regular classroom","Online","In the library"],0,"",""),
  Q("ln1b","What are students allowed to bring?",["One page of handwritten notes","Their textbooks","A laptop","Printed slides"],0,"",""),
  Q("ln1c","What does the exam cover?",["Chapters one through six","Only chapter six","All chapters in the book","The professor's lectures only"],0,"","")
])),
RT(LG("lk1","l4","Listen to a talk in an astronomy class.",[
  "MB: Today we'll talk about why the Moon always shows us the same face. You might think the Moon doesn't rotate at all, but it does. It turns once on its axis in exactly the same amount of time it takes to orbit the Earth, about twenty-seven days. Astronomers call this tidal locking. Long ago, the Moon probably rotated faster, but the Earth's gravity pulled slightly on the Moon's shape, creating a small bulge. Over millions of years, that pull gradually slowed the Moon's rotation until it matched its orbit. Interestingly, many moons in our solar system are tidally locked to their planets."
],[
  Q("lk1a","What is the talk mainly about?",["Why we always see the same side of the Moon","How the Moon was formed","Why the Moon has craters","How tides affect the oceans"],0,"",""),
  Q("lk1b","What misunderstanding does the professor correct?",["That the Moon does not rotate","That the Moon orbits the Sun","That the Moon is a planet","That the Moon has no gravity"],0,"",""),
  Q("lk1c","According to the professor, what slowed the Moon's rotation?",["The pull of the Earth's gravity","Collisions with asteroids","The Sun's heat","The Moon's own gravity"],0,"",""),
  Q("lk1d","What does the professor say about other moons?",["Many of them are also tidally locked.","None of them rotate.","They all orbit faster than our Moon.","They do not have bulges."],0,"","")
])),
/* ===== Listening：第二階段（較基礎） ===== */
LO(L("ll01","l1","cr",["W: Where is the nearest bus stop?"],["Right across the street.","I take the bus every day.","The bus is late.","It's a big bus."],0,"","")),
LO(L("ll02","l1","cr",["M: Can you help me carry these chairs?"],["Of course.","They're wooden chairs.","I carried them yesterday.","Please sit down."],0,"","")),
LO(L("ll03","l1","cr",["W: What did you think of the movie?"],["It was really funny.","I saw it on Friday.","It's at the new theater.","About two hours."],0,"","")),
LO(L("ll04","l1","cr",["MA: How much is a coffee here?"],["About three dollars.","I drink it every morning.","It's very hot.","At the counter."],0,"","")),
LO(L("ll05","l1","cr",["W: Are you coming to the party tonight?"],["Yes, I'll be there around eight.","It was a great party.","My friend is having a party.","Tonight is cold."],0,"","")),
LO(L("ll06","l1","cr",["M: Did you finish the homework?"],["Almost. Just one question left.","The homework is on page ten.","I'll finish my dinner first.","Homework is boring."],0,"","")),
LO(LG("lv3","l2","Listen to a conversation between two classmates.",[
  "M: Hi, Anna. Do you want to study for the math test together?",
  "W: Sure. When are you free?",
  "M: How about tomorrow afternoon in the library?",
  "W: I have a piano lesson tomorrow afternoon. Can we meet in the evening instead?",
  "M: Okay, seven o'clock works for me."
],[
  Q("lv3a","Why can't the woman meet in the afternoon?",["She has a piano lesson.","She has to work.","The library is closed.","She is going to a party."],0,"",""),
  Q("lv3b","When will they study together?",["Tomorrow at seven","Tomorrow afternoon","Today at seven","Next week"],0,"","")
])),
LO(LG("ln2","l3","Listen to an announcement in a cafeteria.",[
  "M: Good afternoon, everyone. Today's special is chicken curry with rice. Because the coffee machine is broken, hot drinks are free today. Please remember to return your trays to the counter near the exit. Thank you, and enjoy your lunch."
],[
  Q("ln2a","What is today's special?",["Chicken curry with rice","Fish and chips","Beef noodles","Vegetable soup"],0,"",""),
  Q("ln2b","Why are hot drinks free today?",["The coffee machine is broken.","It is a holiday.","The cafeteria is closing.","It is a special event."],0,"",""),
  Q("ln2c","What should people do with their trays?",["Return them near the exit","Leave them on the tables","Wash them","Take them home"],0,"","")
])),
LO(LG("lk2","l4","Listen to a talk in a health class.",[
  "W: Today I want to talk about why drinking enough water is important. About sixty percent of the human body is water. We lose water every day when we breathe, sweat, and go to the bathroom. If we don't replace it, we can become dehydrated. Even mild dehydration can make you feel tired and make it harder to concentrate. A simple way to check is to look at the color of your urine. If it's pale yellow, you're probably drinking enough. Remember that we also get water from foods like fruit and soup."
],[
  Q("lk2a","What is the talk mainly about?",["The importance of drinking enough water","How to make healthy soup","Why people sweat","The best fruits to eat"],0,"",""),
  Q("lk2b","According to the speaker, what can mild dehydration cause?",["Tiredness and poor concentration","Fever","Weight gain","Better sleep"],0,"",""),
  Q("lk2c","What simple way to check is mentioned?",["Looking at the color of urine","Measuring body weight","Counting heartbeats","Checking the skin"],0,"",""),
  Q("lk2d","Besides drinks, where else can we get water?",["From foods like fruit and soup","Only from tea","From the air we breathe","From vitamins"],0,"","")
])),
/* ===== Listening：第二階段（較難） ===== */
UP(L("lu01","l1","cr",["W: I'm surprised you're not taking the advanced seminar this term."],["It conflicts with my lab hours, unfortunately.","I was surprised by the results too.","The seminar is very advanced.","I'm taking the bus this term."],0,"","")),
UP(L("lu02","l1","cr",["MC: Do you think we should include the pilot study in our final report?"],["Only if we explain why its sample was so small.","The pilot flew to Chicago.","Our report is final.","I studied for it last night."],0,"","")),
UP(L("lu03","l1","cr",["W: Professor Hale's comments on my draft were pretty harsh."],["He's like that with everyone, but his advice is usually useful.","I drafted it last week.","Professor Hale teaches history.","Comments are due tomorrow."],0,"","")),
UP(L("lu04","l1","cr",["MB: I don't suppose you've seen the updated schedule?"],["It was posted on the department board this morning.","I suppose so.","The schedule was very busy.","I've seen that movie."],0,"","")),
UP(L("lu05","l1","cr",["W: Wouldn't it make more sense to survey graduate students as well?"],["That would make our sample more representative.","Graduate students study hard.","It makes no sense to me.","I graduated last year."],0,"","")),
UP(L("lu06","l1","cr",["M: The grant committee wants a revised budget by Friday."],["Then we'd better cut the travel costs first.","The committee meets every month.","I revised for my exam.","Friday is my day off."],0,"","")),
UP(LG("lv4","l2","Listen to a conversation between a student and a professor.",[
  "W: Professor Okafor, I'd like to write my thesis on social media and political participation, but I'm worried the topic is too broad.",
  "M: It is broad. What if you focused on one platform and one age group? For example, how university students use short-video apps to follow elections.",
  "W: That sounds much more manageable. Would I need to collect my own data?",
  "M: Ideally, yes. A small survey would strengthen your argument considerably, and our department has funding for that kind of project."
],[
  Q("lv4a","What is the student concerned about?",["Her thesis topic is too broad.","She has no interest in politics.","She missed the deadline.","She cannot find a supervisor."],0,"",""),
  Q("lv4b","What does the professor imply about collecting data?",["Funding may be available to support it.","It is not allowed for theses.","It would weaken her argument.","She should use only published data."],0,"","")
])),
UP(LG("ln3","l3","Listen to an announcement in an engineering class.",[
  "M: About the design competition: the judging criteria have been revised. Originally, cost accounted for half the score. Now cost, environmental impact, and originality will each count for one third. Teams that have already submitted proposals may revise them until the twentieth, but any revision must be accompanied by a short note explaining what was changed and why."
],[
  Q("ln3a","What has changed about the competition?",["How the designs will be scored","The deadline for proposals","The size of the teams","The prize money"],0,"",""),
  Q("ln3b","How much of the score is now based on cost?",["One third","One half","All of it","None of it"],0,"",""),
  Q("ln3c","What must teams include if they revise their proposals?",["A note explaining the changes","A new budget","A list of team members","A cost estimate"],0,"","")
])),
UP(LG("lk3","l4","Listen to a talk in a linguistics class.",[
  "WB: Let's consider how children acquire language. One influential view, associated with Noam Chomsky, holds that humans are born with an innate capacity for grammar. Supporters point out that children produce sentences they have never heard and that they acquire complex rules remarkably quickly, despite hearing incomplete or imperfect input. More recently, however, usage-based researchers have argued that children learn grammar gradually by detecting statistical patterns in the speech around them. Experiments show that even infants can track how often certain sounds follow one another. Many linguists now believe the truth lies somewhere in between: children may have certain learning biases, but they rely heavily on the language they actually hear."
],[
  Q("lk3a","What is the main topic of the talk?",["Different explanations of how children learn grammar","The life of Noam Chomsky","Why some children speak late","How adults learn second languages"],0,"",""),
  Q("lk3b","What evidence supports the idea of an innate capacity for grammar?",["Children produce sentences they have never heard.","Infants prefer their mother's voice.","Adults speak more slowly to children.","Children forget words quickly."],0,"",""),
  Q("lk3c","According to usage-based researchers, how do children learn grammar?",["By detecting patterns in the speech they hear","By memorizing rules from parents","Through formal instruction","Only after learning to read"],0,"",""),
  Q("lk3d","What view do many linguists hold now?",["Both inborn tendencies and language input matter.","Grammar is entirely innate.","Input plays no role in learning.","Children cannot learn complex rules."],0,"","")
])),

/* ===== Writing ===== */
BS("w01","w1","I'm going camping this weekend.","",["Have","you","checked","the","weather"],"forecast?",["check"],""),
BS("w02","w1","I started learning Spanish last month.","",["Why","did","you","decide","to learn"],"it?",["deciding"],""),
BS("w03","w1","My brother just got his driver's license.","",["Is","he","going","to","buy","a car"],"?",["does"],""),
BS("w04","w1","I'm organizing a picnic for our class.","",["Do","you","need","any","help","with"],"it?",["helping"],""),
BS("w05","w1","I watched a great documentary last night.","",["What","was","it","about"],"?",["did"],""),
BS("w06","w1","My phone battery dies very quickly.","",["How","old","is","your","phone"],"?",["does"],""),
BS("w07","w1","The professor recommended a new textbook.","",["Do","you","know","where","we","can","buy"],"it?",["can we"],""),
BS("w08","w1","I've been feeling tired all week.","",["Have","you","been","getting","enough"],"sleep?",["got"],""),
BS("w09","w1","My cousin is visiting from Canada.","",["How","long","is","she","staying"],"?",["does"],""),
BS("w10","w1","I joined the university orchestra.","",["Which","instrument","do","you","play"],"?",["are"],""),
EM("w11","w2","You are a member of a study group that meets every Monday evening. Starting next month, you will have a part-time job on Monday evenings. Write an email to the other members of the group.",
  ["Explain your situation","Suggest a different time to meet","Offer a way to stay involved if the time cannot change"],
  "Hi everyone,\nI wanted to let you know that I've just accepted a part-time job at the campus bookstore, and starting next month I'll be working on Monday evenings. I've really enjoyed our study sessions, so I hope we can find a way to keep meeting together. Would it be possible to move our meetings to Tuesday or Wednesday evening instead? I'm free on both days after six. If those times don't work for most of you, I completely understand. In that case, I could share my notes with the group before each meeting and join the discussion online for the first half hour on my break. Please let me know what you think.\nBest,\nSam",
  "說明情況、提出新時間、再提供備案；語氣友善、有彈性。"),
AD("w12","w3","business",
  ["Dr. Morales","Many companies now allow employees to work from home several days a week. Some managers believe this improves productivity, while others think it harms teamwork. In your opinion, is working from home good for companies? Why?"],
  [["Leo","Working from home is great for productivity. Employees save time on commuting and can focus without office distractions."],
   ["Sara","I think it hurts teamwork. It's much harder to solve problems quickly or build trust when people rarely see each other."]],
  "I believe that allowing employees to work from home part of the week is good for companies, as long as it is balanced with time in the office. Leo is right that remote work saves commuting time, which can make employees less stressed and more productive. However, Sara also makes an important point about teamwork. That's why I think a hybrid system works best. For example, my aunt's company asks everyone to come in on Tuesdays and Thursdays for meetings and group projects, while the other days are for focused individual work at home. Since this change, her team has met more deadlines, and people still feel connected. A balanced approach gives companies the benefits of both.",
  "可以提出折衷（hybrid）立場，同時回應兩位同學，用具體例子支持。"),

/* ===== Speaking ===== */
SR("s01","s1","You are volunteering at a university open day. Listen to the coordinator and repeat what he says.","MC: Thank you for volunteering today."),
SR("s02","s1","You are volunteering at a university open day. Listen to the coordinator and repeat what he says.","MC: Visitors should sign in at the welcome tent."),
SR("s03","s1","You are volunteering at a university open day. Listen to the coordinator and repeat what he says.","MC: Campus tours leave every thirty minutes."),
SR("s04","s1","You are volunteering at a university open day. Listen to the coordinator and repeat what he says.","MC: Maps are available at the information booth."),
SR("s05","s1","You are volunteering at a university open day. Listen to the coordinator and repeat what he says.","MC: Please wear your name badge where people can see it."),
SR("s06","s1","You are volunteering at a university open day. Listen to the coordinator and repeat what he says.","MC: Lunch for volunteers will be served in the student lounge at noon."),
SR("s07","s1","You are volunteering at a university open day. Listen to the coordinator and repeat what he says.","MC: If a visitor asks a question you can't answer, please send them to a staff member."),
SI("s08","s2","A researcher is interviewing you about technology and daily life.","W: Which piece of technology do you use most every day, and why?",
  "The piece of technology I use most is my smartphone. I use it to check my schedule, read the news, and message my classmates about assignments. It's also my main way of listening to music on the bus. Because it does so many things, I would find it very hard to get through a day without it.",""),
SI("s09","s2","A researcher is interviewing you about technology and daily life.","W: Some people say technology makes us less patient. Do you agree? Why or why not?",
  "I partly agree. Because we can get information and entertainment instantly, many people now feel frustrated when they have to wait, even for a few seconds. For example, I notice that I get annoyed if a video takes too long to load. However, technology can also teach patience, for example when people use apps to practice a skill every day for months. So it depends on how we use it.",""),
SI("s10","s2","A researcher is interviewing you about technology and daily life.","W: Should children under twelve be allowed to have their own smartphones? Explain.",
  "I don't think children under twelve should have their own smartphones. At that age, it's hard to control how much time they spend on games and social media, and they may see content that isn't suitable for them. If parents need to contact their children, a simple phone that can only make calls and send messages would be a better choice.",""),
SI("s11","s2","A researcher is interviewing you about technology and daily life.","W: How do you think artificial intelligence will change the way students learn in the future?",
  "I think artificial intelligence will make learning much more personalized. For example, an AI tutor could notice which grammar points a student keeps getting wrong and give extra practice on exactly those points. This would help students learn faster. However, students will still need teachers to guide discussions and to teach skills like critical thinking, which AI can't fully replace.","")
]);
