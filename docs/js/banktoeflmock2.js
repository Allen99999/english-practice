/* ================================ TOEFL 正式模擬卷 2 ================================ */
toeflMock(2, [
/* ===== Reading：第一階段（router） ===== */
RT(CTW("m2c1","r1","Echolocation in Bats","Most bats hunt at night, when their eyes are of little use. Instead, they emit high-pitched calls and listen for the echoes that bounce back from objects around them. By analyzing these echoes, bats can determine the size, shape, and distance of insects with remarkable precision. Some species can even detect a single strand of human hair in complete darkness.")),
RT(DL("m2d1","r2","Read a social media post.",[
  "Campus Film Society · posted 2 hours ago",
  "Change of plans! Because of the storm warning, tonight's outdoor screening of The Long Road Home on the main lawn is moving indoors to Lecture Hall B. Seating is limited to 120, so arrive early. The director's video Q&A will still happen after the film.",
  "If you reserved free snacks online, you can pick them up at the door. Just show your confirmation email. We'll reschedule the opening night of our outdoor series for next Friday, weather permitting!"
],[
  Q("m2d1a","Why was the location of the screening changed?",["Bad weather was expected.","The lawn was being repaired.","Too many people had reserved seats.","The director asked for a larger room."],0,"","Because of the storm warning。"),
  Q("m2d1b","What can be inferred about tonight's event?",["Some people who want to attend may not get a seat.","The Q&A session has been canceled.","Snacks will be sold at the door.","The outdoor series will open tonight."],0,"","座位只有 120 個，要早點到 → 可能有人沒位子。Q&A 照常；點心是免費預約的。")
])),
RE(DL("m2d2","r2","Read an email.",[
  "From: Lena Fischer, Human Resources, Northwind Analytics",
  "To: Jordan Reyes",
  "Subject: Summer internship offer",
  "Dear Jordan,",
  "We are pleased to offer you a position as a Data Analysis Intern for the summer, from June 2 to August 22. The position pays $22 per hour for 30 hours per week. Interns typically work in our downtown office on Mondays and Wednesdays and remotely on the other days; however, during the first two weeks, all interns are required to be in the office every day for training.",
  "Please note that this offer depends on our receiving an official copy of your transcript by May 1. To accept, sign the attached agreement and return it within ten days. If you have questions about housing, our intern coordinator, Mark Ellis, can share a list of short-term rentals near the office.",
  "Best regards, Lena Fischer"
],[
  Q("m2d2a","What is the main purpose of the email?",["To offer a position and explain its conditions","To invite Jordan to an interview","To ask Jordan for a recommendation","To describe housing options downtown"],0,"","錄取通知＋工作條件。"),
  Q("m2d2b","What is true about the first two weeks of the internship?",["Interns must work in the office every day.","Interns work only from home.","Interns are not paid during training.","Interns work 40 hours per week."],0,"","前兩週訓練期間每天都要進辦公室。"),
  Q("m2d2c","What can be inferred about the offer?",["It could be withdrawn if a document does not arrive in time.","Jordan has already accepted it.","It includes free housing near the office.","It was sent by Jordan's future supervisor."],0,"","offer depends on our receiving an official copy of your transcript by May 1。住宿只是提供名單。")
])),
RT(AP("m2a1","r3","The Dust Bowl",[
  "During the 1930s, a series of severe dust storms swept across the southern Great Plains of the United States, a disaster that became known as the Dust Bowl. Winds lifted millions of tons of topsoil into the air, creating clouds so dark that streetlights had to be turned on at midday. Some storms carried dust all the way to the East Coast, more than two thousand kilometers away.",
  "Although a prolonged drought triggered the storms, historians emphasize that human decisions had made the region vulnerable. ■ In the preceding decades, high wheat prices and new tractors encouraged farmers to plow up vast areas of native grassland. ■ The deep roots of prairie grasses had held the soil in place for thousands of years, even during dry periods. ■ When the drought arrived and crops failed, nothing remained to anchor the exposed earth. ■",
  "The federal government responded by creating the Soil Conservation Service in 1935. The agency paid farmers to adopt techniques such as contour plowing, in which furrows follow the natural curves of the land, and planting rows of trees as windbreaks. These practices reduced erosion considerably, and by the early 1940s, when rains returned, the worst of the storms had ended. The Dust Bowl remains a frequently cited example of how environmental damage can result from the interaction of natural conditions and economic incentives."
],["anchor"],[
  Q("m2a1a","According to paragraph 1, what is true about the dust storms?",["Some of them reached places far from the Great Plains.","They occurred mainly at night.","They lasted only a few days in total.","They were caused by volcanic activity."],0,"","有些沙塵一路吹到兩千多公里外的東岸。"),
  INS("m2a1b","By 1930, millions of acres that had once been grassland were planted with wheat.",1,"接在「農夫大量開墾原生草原」之後，說明開墾的規模＝第 2 個方塊。"),
  Q("m2a1c","The word \"anchor\" in the passage is closest in meaning to",["hold in place","dry out","cover up","carry away"],0,"","anchor the exposed earth＝把土壤固定住。"),
  Q("m2a1d","According to paragraph 2, why do historians say human decisions made the region vulnerable?",["Farmers removed grasses whose roots had protected the soil.","Farmers used too much water during the drought.","New tractors damaged the roots of wheat plants.","Falling wheat prices caused farmers to abandon their land."],0,"","草的深根原本固定土壤，被犁掉後就沒有東西保護。小麥價格是「高」，不是下跌。"),
  Q("m2a1e","Why does the author describe contour plowing and windbreaks?",["To give examples of practices that helped reduce erosion","To explain what caused the drought to end","To show how farmers increased wheat production","To contrast farming in the East and the West"],0,"","水土保持局推廣的做法，大幅減少侵蝕。")
])),
/* ===== Reading：第二階段・較基礎（lower） ===== */
LO(CTW("m2c2","r1","Recycling Paper","Paper is one of the easiest materials to recycle. Used paper is first mixed with water to make a soft pulp, and then the ink is removed. After that, the clean pulp is pressed and dried into new sheets. However, paper fibers become shorter each time they are recycled, so most paper can only be recycled five to seven times.",{ that: ["this"] })),
LO(DL("m2d3","r2","Read a notice.",[
  "Notice to All Residents: Laundry Room Changes",
  "From October 1, the laundry room on the ground floor will accept card payments only. Coins will no longer be accepted. Laundry cards can be bought at the front office for $10 and refilled using the machine next to the laundry room door.",
  "The laundry room will also be open from 7 a.m. to 10 p.m. instead of 24 hours a day. Please remove your clothes as soon as the machine stops so that others can use it."
],[
  Q("m2d3a","What change will happen on October 1?",["Residents will have to pay with a card.","The laundry room will move to another floor.","Washing clothes will become free.","The laundry room will be open all night."],0,"","只收卡片，不收硬幣。"),
  Q("m2d3b","Where can residents buy a laundry card?",["At the front office","In the laundry room","Online","At a bank"],0,"","can be bought at the front office。"),
  Q("m2d3c","What are residents asked to do?",["Take out their clothes as soon as the machine stops","Bring their own detergent","Use the machines only on weekends","Report broken machines by email"],0,"","remove your clothes as soon as the machine stops。")
])),
LO(AP("m2a2","r3","Lichens: Life on Bare Rock",[
  "Lichens are unusual living things. Although they often look like a single plant, each lichen is actually a partnership between two very different organisms: a fungus and a tiny alga or bacterium that can make food from sunlight. The fungus provides shelter and collects water and minerals, while its partner produces sugars that feed both of them. This cooperation allows lichens to survive in places where neither partner could live alone.",
  "Lichens can grow on bare rock, tree bark, and even old gravestones. They are especially important in harsh environments such as deserts, mountaintops, and the Arctic. ■ Because they can survive with very little water and no soil, lichens are often the first living things to appear on newly exposed rock, for example after a glacier melts or a volcano erupts. ■ Over time, they release acids that slowly break down the rock surface. ■ When lichens die, their remains mix with these tiny rock particles to form a thin layer of soil, which allows mosses and small plants to grow. ■",
  "Lichens are also useful to scientists. Many species are very sensitive to air pollution, especially a gas called sulfur dioxide. When the air in a city becomes cleaner, sensitive lichens often return to trees and walls. As a result, researchers sometimes count lichens to measure changes in air quality."
],["sensitive"],[
  Q("m2a2a","According to paragraph 1, what does the fungus provide in a lichen?",["Shelter, water, and minerals","Sugars made from sunlight","Seeds for reproduction","Protection from air pollution"],0,"","The fungus provides shelter and collects water and minerals。糖是另一個夥伴做的。"),
  INS("m2a2b","Few other living things can survive such extreme conditions.",0,"接在「沙漠、山頂、北極這類嚴苛環境」之後＝第 1 個方塊。"),
  Q("m2a2c","According to paragraph 2, how do lichens help other plants grow?",["They help create soil on bare rock.","They provide shade for young plants.","They kill insects that eat plants.","They carry seeds to new places."],0,"","分解岩石、死後和岩屑形成薄薄一層土壤。"),
  Q("m2a2d","The word \"sensitive\" in the passage is closest in meaning to",["easily affected","very strong","brightly colored","slow-growing"],0,"","sensitive to air pollution＝容易受污染影響。"),
  Q("m2a2e","Why do researchers sometimes count lichens in cities?",["To learn whether air quality is changing","To discover new kinds of fungi","To decide where to plant trees","To study the effects of melting glaciers"],0,"","空氣變乾淨，敏感的地衣就會回來 → 用來衡量空氣品質。")
])),
/* ===== Reading：第二階段・較難（upper） ===== */
UP(CTW("m2c3","r1","Antibiotic Resistance","Antibiotics have saved countless lives since their widespread introduction in the 1940s. Their effectiveness, however, is steadily declining because bacteria can evolve resistance through mutation and by exchanging genetic material with one another. Whenever antibiotics are overused or taken incorrectly, susceptible bacteria are eliminated while resistant strains survive and multiply. Public health experts therefore urge physicians to prescribe these drugs only when they are genuinely necessary.")),
UP(DL("m2d4","r2","Read an editorial from a student newspaper.",[
  "Editorial: Before We Ban Laptops, Let's Look at the Evidence",
  "Last week, the faculty senate proposed banning laptops in all first-year lectures, citing studies showing that students who type their notes remember less than those who write by hand. The concern is understandable. Anyone who has sat behind a classmate scrolling through social media knows how distracting screens can be.",
  "But a blanket ban ignores students who rely on laptops for legitimate reasons, including those with disabilities that make handwriting difficult. The proposal does allow exceptions, but only for students who formally register with the disability office, a process that can take weeks and that many students prefer to avoid. Moreover, the research the senate cites compared note-taking methods, not policies. A more targeted approach, such as designated laptop sections at the back of lecture halls, would reduce distraction without forcing anyone to reveal personal information."
],[
  Q("m2d4a","What is the main purpose of the editorial?",["To argue for an alternative to a proposed rule","To support a ban on all electronic devices","To report the results of a new study","To explain how to register with the disability office"],0,"","反對全面禁止，提出「筆電專區」的替代方案。"),
  Q("m2d4b","What does the writer imply about the exception for students with disabilities?",["It may not be practical for the students who need it.","It will be removed from the final proposal.","It applies to all first-year students.","It was suggested by the student newspaper."],0,"","要正式登記、可能要好幾週，很多學生也不想公開 → 不實用。"),
  Q("m2d4c","Why does the writer point out that the research \"compared note-taking methods, not policies\"?",["To suggest that the studies do not directly support a ban","To show that handwriting is less effective than typing","To criticize the researchers for using small samples","To explain why students prefer laptops"],0,"","研究比較的是做筆記方式，不代表「禁止」這個政策有效。")
])),
UP(AP("m2a3","r3","The Anchoring Effect",[
  "In a famous experiment, the psychologists Amos Tversky and Daniel Kahneman spun a wheel of fortune that had been secretly rigged to stop at either 10 or 65. Participants were then asked whether the percentage of African nations in the United Nations was higher or lower than the number on the wheel and, afterward, to estimate the actual percentage. Remarkably, those who had seen 65 gave estimates substantially higher than those who had seen 10, even though the wheel's number was obviously irrelevant to the question.",
  "This tendency for an initial value to bias later judgments is known as anchoring, and its effects extend well beyond the laboratory. ■ In negotiations, the first offer frequently shapes the final agreement, which is why experienced negotiators often try to make the opening proposal themselves. ■ Similarly, retailers may display a high original price beside a discounted one, making the sale price appear more attractive than it would on its own. ■ Even experts are not immune: in one study, experienced real estate agents who were shown different listing prices for the same house produced appraisals that differed markedly, yet most denied that the listing price had influenced them. ■",
  "Researchers have proposed two mechanisms to explain anchoring. According to the adjustment account, people start from the anchor and adjust away from it but typically stop too soon. According to the selective accessibility account, the anchor prompts people to recall information consistent with it, which then colors their final estimate. The two accounts are not mutually exclusive, and evidence suggests that each may operate under different conditions. Efforts to reduce the bias, such as simply warning people about it, have produced only modest results, although deliberately considering reasons why the anchor might be inappropriate appears somewhat more effective."
],["immune"],[
  Q("m2a3a","Why does the author mention that the wheel had been \"secretly rigged\"?",["To show that the researchers controlled which number participants saw","To suggest that the experiment was unfair to participants","To explain why participants distrusted the wheel","To indicate that the results could not be repeated"],0,"","研究者控制輪盤只停在 10 或 65，才能比較兩組。"),
  INS("m2a3b","This finding suggests that anchoring can operate without people's awareness.",3,"接在「房仲否認受到影響」之後，說明錨定可能在不自覺中發生＝第 4 個方塊。"),
  Q("m2a3c","The word \"immune\" in the passage is closest in meaning to",["unaffected","experienced","skeptical","unaware"],0,"","not immune＝也會受影響。"),
  Q("m2a3d","According to paragraph 3, how do the two accounts of anchoring differ?",["One focuses on insufficient adjustment, while the other focuses on what information comes to mind.","One applies to experts, while the other applies to students.","One has been disproven, while the other has been confirmed.","One explains negotiations, while the other explains retail prices."],0,"","adjustment：調整不夠；selective accessibility：錨點讓人想起一致的資訊。兩者不互斥。"),
  Q("m2a3e","What can be inferred about efforts to reduce anchoring?",["Simply knowing about the bias is not enough to prevent it.","Warnings eliminate the bias in most people.","Experts are better at avoiding it than other people.","Considering reasons against the anchor makes the bias stronger."],0,"","警告的效果有限 → 光知道偏誤並不夠。")
])),

/* ===== Listening：第一階段（router） ===== */
RT(L("m2r01","l1","cr",["M: Did you get a chance to look over my draft?"],["I've only gotten through the first page.","The draft was due on Monday.","I looked over the fence.","My chances are pretty good."],0,"","間接回答：只看了第一頁 → 還沒看完。")),
RT(L("m2r02","l1","cr",["WB: The heating in the lecture hall still isn't working."],["Maybe we should bring jackets tomorrow.","The lecture was about global warming.","I'm still working on it.","The hall is in the east building."],0,"","回應問題並提出因應方式。")),
RT(L("m2r03","l1","cr",["M: Do you know if the pharmacy on campus is open on weekends?"],["Only on Saturday mornings.","I bought some medicine there.","The weekend went by quickly.","The campus is very large."],0,"","加上條件的回答。")),
RT(L("m2r04","l1","cr",["W: You look exhausted."],["I was up all night finishing my lab report.","Thanks, I bought it yesterday.","I'll look for it later.","The car's exhaust is terrible."],0,"","解釋為什麼累。")),
RT(L("m2r05","l1","cr",["MA: I can't decide whether to major in biology or chemistry."],["Why not talk to students in both departments?","Biology is the study of living things.","I decided to have pizza.","Both buildings are on Main Street."],0,"","給建議。")),
RT(L("m2r06","l1","cr",["W: Weren't you supposed to give your presentation today?"],["Professor Kim had to postpone it.","Yes, I was given a present.","The presentation was about energy.","Today is Tuesday."],0,"","否定問句，回答原本該做但沒做的原因。")),
RT(L("m2r07","l1","cr",["MC: Could you save me a seat if you get there first?"],["Sure, I'll put my bag on the one next to me.","I saved some money last month.","The seats are very comfortable.","I got there first yesterday."],0,"","答應並說明怎麼做。")),
RT(L("m2r08","l1","cr",["W: I thought the reading for this week was supposed to be short."],["So did I, until I saw it was sixty pages.","I read it last week.","The reading room is quiet.","Short stories are my favorite."],0,"","So did I＝我也以為。")),
RT(LG("m2v1","l2","Listen to a conversation between a student and a technology help desk worker.",[
  "M: Hi, my laptop won't turn on, and I have a paper due tomorrow morning.",
  "W: Oh no. When did it stop working?",
  "M: This morning. I spilled a little coffee on the keyboard last night, but it seemed fine after I dried it off.",
  "W: Liquid damage sometimes takes a few hours to show up. We can send it to the repair center, but that usually takes about a week. Was your paper saved anywhere else?",
  "M: I think the university account backs up my documents folder automatically?",
  "W: It does, if you turned the sync feature on. Let's check from this computer. Yes, here's your paper, saved at eleven last night.",
  "M: That's a relief! But I still need something to work on.",
  "W: We have loaner laptops. You can borrow one for up to two weeks. You'll just need to sign this form and show your student ID."
],[
  Q("m2v1a","What happened to the man's laptop?",["It stopped working after liquid was spilled on it.","It was stolen from the library.","It was damaged in a fall.","It ran out of storage space."],0,"","前一晚灑了咖啡，今天早上開不了機。"),
  Q("m2v1b","Why is the man relieved?",["A recent copy of his paper had been saved online.","His laptop can be repaired the same day.","The deadline for his paper has been extended.","He does not need to sign any forms."],0,"","學校帳號自動備份了他昨晚 11 點的報告。")
])),
RT(LG("m2v2","l2","Listen to a conversation between two students.",[
  "W: Have you registered for next semester yet?",
  "M: Almost. I'm stuck between two seminars, Urban Ecology and Media Law. They meet at the same time.",
  "W: I took Urban Ecology last year. It's a lot of fieldwork. You're outside every Thursday, collecting samples around the city.",
  "M: That actually sounds fun. What's the downside?",
  "W: The final project. You have to present it to the city planning department, and they ask really tough questions. But honestly, it's the class I learned the most from.",
  "M: Hmm. Media Law would be more useful for my journalism major, though.",
  "W: True. But you could take Media Law next fall. It's offered every year. Urban Ecology only runs in the spring, and Professor Grant is retiring after this year.",
  "M: Oh, I didn't know that. That kind of settles it, then."
],[
  Q("m2v2a","What is the man's problem?",["Two courses he wants are scheduled at the same time.","He missed the registration deadline.","He does not meet the requirements for a seminar.","He cannot decide on a major."],0,"","They meet at the same time。"),
  Q("m2v2b","What will the man most likely do?",["Take Urban Ecology this spring","Take Media Law this spring","Take both seminars next fall","Change his major to ecology"],0,"","Media Law 每年都有；Urban Ecology 只在春天開而且教授要退休 → That kind of settles it。")
])),
RT(LG("m2n1","l3","Listen to an announcement from the university writing center.",[
  "W: Hi, everyone. The writing center wants to let you know about a series of research skills workshops this month. Each workshop lasts one hour and takes place on Wednesdays at four in the library's media room.",
  "W: The first session, on finding scholarly articles, is designed mainly for first-year students, but anyone is welcome. The second focuses on citation software, which can save you hours of formatting at the end of a project. So if you're starting a thesis, I'd especially recommend it.",
  "W: Seats are limited to twenty-five per session, and last semester several sessions filled up within a day, so register on the writing center's website as soon as possible. The sessions won't be recorded, because they're hands-on, so please bring your own laptop."
],[
  Q("m2n1a","What is the main purpose of the announcement?",["To inform students about upcoming workshops","To announce new library hours","To explain changes to citation rules","To recruit tutors for the writing center"],0,"","介紹這個月的研究技巧工作坊。"),
  Q("m2n1b","Who does the speaker especially recommend attend the second workshop?",["Students who are beginning a thesis","First-year students","Students without laptops","Students who missed last semester's sessions"],0,"","if you're starting a thesis, I'd especially recommend it。"),
  Q("m2n1c","Why does the speaker suggest registering soon?",["The sessions may fill up quickly.","Registration closes this afternoon.","Early registrants receive free software.","Only registered students can watch the recordings."],0,"","名額 25 人，上學期一天內就額滿。")
])),
RT(LG("m2l1","l4","Listen to part of a talk in an astronomy class.",[
  "MB: How do astronomers find planets around other stars? In most cases, these planets are far too dim to see directly, because the light from their star overwhelms them. So astronomers rely on indirect methods. The most productive one is called the transit method.",
  "MB: Here's how it works. If a planet's orbit happens to be lined up with our view, then once every orbit, the planet passes in front of its star and blocks a tiny fraction of the star's light. A planet the size of Jupiter might dim a Sun-like star by about one percent; an Earth-sized planet, by less than one hundredth of a percent. Space telescopes like Kepler monitored the brightness of more than a hundred thousand stars continuously, looking for these small, regular dips.",
  "MB: The transit method tells us quite a lot. The depth of the dip reveals the planet's size relative to the star, and the time between dips gives us the length of its year. But it has limitations. Most planetary systems aren't lined up with us, so we miss them entirely. And a single dip could be caused by something else, like a dark spot on the star's surface. That's why astronomers usually want to see at least three transits, evenly spaced, before they're confident a planet is there.",
  "MB: To learn the planet's mass, astronomers combine transits with another technique that measures how the star wobbles as the planet's gravity pulls on it. Size plus mass gives us density, which tells us whether a planet is rocky like Earth or mostly gas like Jupiter."
],[
  Q("m2l1a","What is the talk mainly about?",["A method for detecting planets through changes in starlight","How to photograph planets directly","Why some stars have dark spots","The history of the Kepler telescope"],0,"","transit method：行星經過恆星前方時亮度變暗。"),
  Q("m2l1b","According to the professor, what does the depth of a dip indicate?",["The planet's size compared with its star","The planet's distance from Earth","The planet's temperature","The planet's mass"],0,"","The depth of the dip reveals the planet's size relative to the star。"),
  Q("m2l1c","Why do astronomers want to observe several evenly spaced transits?",["To rule out other possible causes of a dip","To measure the star's temperature","To find out whether the planet has moons","To calculate the planet's mass"],0,"","單一次變暗可能是恆星黑子造成的。"),
  Q("m2l1d","Why does the professor mention density?",["To explain how scientists learn what a planet is made of","To show why Earth-sized planets are hard to detect","To compare stars of different sizes","To explain why most systems are not lined up with us"],0,"","密度能判斷是岩石行星還是氣體行星。")
])),
/* ===== Listening：第二階段・較基礎（lower） ===== */
LO(L("m2r09","l1","cr",["M: What time does the library close tonight?"],["At eleven, I think.","It's next to the cafeteria.","I closed the window.","Tonight is very cold."],0,"","問時間，回答時間。")),
LO(L("m2r10","l1","cr",["W: Have you met our new roommate yet?"],["Yes, she seems really nice.","I'll meet you at noon.","Our room is on the fifth floor.","The room is very new."],0,"","回答見過了沒，並補充感想。")),
LO(L("m2r11","l1","cr",["MB: How long does it take to walk to the stadium?"],["About fifteen minutes.","It's a very long game.","I walked there with my brother.","The stadium holds fifty thousand people."],0,"","How long＝多久。")),
LO(L("m2r12","l1","cr",["W: Could you help me carry these chairs?"],["Of course. Where do they go?","The chairs are made of wood.","I carried my bag.","I helped him last week."],0,"","答應並詢問細節。")),
LO(L("m2r13","l1","cr",["M: Is it going to rain tomorrow?"],["The forecast says it'll be sunny.","It rained yesterday.","I'm going tomorrow.","Rain is good for plants."],0,"","用天氣預報回答。")),
LO(L("m2r14","l1","cr",["W: Where did you buy that jacket?"],["At a small shop downtown.","It was on sale.","I bought it last winter.","The jacket is blue."],0,"","問地點；on sale、last winter 都沒回答「哪裡」。")),
LO(LG("m2v3","l2","Listen to a conversation between a student and a mail room employee.",[
  "M: Hi, I got an email saying I have a package, but I don't have the tracking number with me.",
  "W: That's fine. Can I see your student ID?",
  "M: Here you go.",
  "W: Thanks. Hmm, it looks like your package is too large for our shelves, so it's in the storage room downstairs. It'll take a few minutes to bring it up.",
  "M: No problem. Actually, could my roommate pick up packages for me in the future? I have class when you're open.",
  "W: Yes, but you need to fill out a permission form online first. After that, your roommate just needs to show their own ID.",
  "M: Great. I'll do that tonight."
],[
  Q("m2v3a","Why does the man have to wait?",["His package is being brought from another room.","He forgot his student ID.","His package has not arrived yet.","He needs a tracking number."],0,"","包裹太大，放在樓下儲藏室。"),
  Q("m2v3b","What does the man need to do so that his roommate can pick up his packages?",["Complete a form online","Give his ID card to his roommate","Call the mail room","Pay a small fee"],0,"","fill out a permission form online first。")
])),
LO(LG("m2n2","l3","Listen to an announcement about a campus event.",[
  "M: Hi, everyone! This Saturday, the international student club is holding a food festival on the main lawn from noon to five. Students from more than twenty countries will be cooking traditional dishes. Tickets are five dollars, and each ticket gets you three small plates. All the money will go to a local children's hospital.",
  "M: If it rains, the festival will move to the gym. We still need a few volunteers to help set up tables in the morning, so if you're interested, please email the club."
],[
  Q("m2n2a","What is the announcement about?",["A food festival","A cooking class","A sports competition","A new restaurant"],0,"","國際學生社團的美食節。"),
  Q("m2n2b","What will happen to the money from ticket sales?",["It will be given to a hospital.","It will pay the cooks.","It will be used for a club trip.","It will buy new tables."],0,"","All the money will go to a local children's hospital。"),
  Q("m2n2c","What will happen if it rains?",["The event will be held indoors.","The event will be canceled.","The event will start later.","Tickets will be cheaper."],0,"","下雨就移到體育館。")
])),
LO(LG("m2l2","l4","Listen to part of a talk in a music class.",[
  "W: Has a song ever gotten stuck in your head for hours? Scientists call this an earworm. Almost everyone experiences earworms, and they usually involve just a short part of a song, often the chorus, repeating over and over.",
  "W: Researchers have found that certain kinds of songs are more likely to become earworms. These songs are usually fast, with a simple melody that's easy to sing. They often have a surprising part, such as an unusual jump between notes, that makes the tune stand out.",
  "W: When do earworms happen? Often when our minds are not very busy, like when we're walking or doing chores. Hearing a song many times, or being reminded of it by a word or a place, can also start one.",
  "W: So how can you get rid of an earworm? Some studies suggest that chewing gum helps, because it uses some of the same muscles we use for singing. Another trick is to listen to the whole song from beginning to end. It seems the brain likes to finish things, so hearing the song's ending can help it let go."
],[
  Q("m2l2a","What is an earworm?",["A part of a song that keeps repeating in someone's mind","A song that is difficult to remember","A type of musical instrument","A song that people dislike"],0,"","歌的一小段在腦中不停重複。"),
  Q("m2l2b","What kind of song is likely to become an earworm?",["A fast song with a simple melody","A slow song with many instruments","A long song with no chorus","A song with complicated lyrics"],0,"","fast, with a simple melody。"),
  Q("m2l2c","When do earworms often happen?",["When people are doing simple activities","When people are concentrating hard","Only at night","While people are sleeping"],0,"","腦袋不忙的時候，例如走路、做家事。"),
  Q("m2l2d","According to the professor, why might listening to the whole song help?",["The brain may let go of a song once it hears the ending.","It makes the song less interesting.","It uses the same muscles as singing.","It helps people learn the lyrics."],0,"","大腦喜歡把事情完成，聽到結尾就放下了。用到唱歌肌肉的是嚼口香糖。")
])),
/* ===== Listening：第二階段・較難（upper） ===== */
UP(L("m2r15","l1","cr",["W: I can't believe they're making us read the whole novel over the break."],["At least it's one of the shorter ones on the list.","I believe the break starts on Friday.","They made the novel into a film.","Reading is my favorite hobby."],0,"","對方抱怨，回應找出好的一面。")),
UP(L("m2r16","l1","cr",["MB: You wouldn't happen to have a charger I could borrow, would you?"],["Only one for a different kind of phone, unfortunately.","I happen to live nearby.","Charges are added every month.","Yes, I borrowed it from you."],0,"","間接拒絕：有，但不合他的手機。")),
UP(L("m2r17","l1","cr",["W: The committee's decision isn't final until the dean signs off on it."],["So there's still a chance it could change.","The dean's office is upstairs.","I signed my name on the form.","The committee meets on Fridays."],0,"","理解言外之意：還沒定案 → 還可能改變。")),
UP(L("m2r18","l1","cr",["M: I'd go to the concert if it weren't on a weeknight."],["They're repeating it on Saturday, actually.","I went to a concert last night.","Weeknights are usually quiet.","The concert hall is very modern."],0,"","與現在事實相反的假設：因為是平日晚上所以不去 → 回應提供週末場次。")),
UP(L("m2r19","l1","cr",["WA: Didn't Professor Lin say the final would be cumulative?"],["Only the essay section covers the whole term.","The final is in the gym.","Professor Lin teaches two classes.","I didn't say anything."],0,"","cumulative＝涵蓋整學期。回應修正細節：只有申論部分是。")),
UP(L("m2r20","l1","cr",["M: Tell me you didn't forget to reserve the van for the field trip."],["It's parked right outside.","The field trip is next Tuesday.","I told you about the van.","I forgot my umbrella."],0,"","Tell me you didn't…＝你該不會忘了吧？用「車已經停在外面」間接表示沒忘。")),
UP(LG("m2v4","l2","Listen to a conversation between a student and her professor.",[
  "W: Professor Abbott, I wanted to ask about your comments on my thesis proposal. You wrote that my argument relies too heavily on a single voice.",
  "MB: Right. You're arguing that factory workers in the 1840s generally supported the new labor laws, and your main evidence is the diary of Thomas Reed.",
  "W: It's a really detailed diary, though. He writes about the laws almost every week.",
  "MB: It's a wonderful source. I'm not suggesting you drop it. But Reed was a foreman, not an ordinary worker. He had reasons to see the laws differently from the people he supervised. If you want to make a claim about workers in general, you need evidence from people in different positions.",
  "W: The problem is that most ordinary workers didn't leave diaries.",
  "MB: True, but they left other traces: petitions, letters to newspapers, union records. Those are less personal, but together they can show whether Reed's views were typical or unusual.",
  "W: And if they turn out to be unusual?",
  "MB: Then you have a different, and maybe more interesting, thesis."
],[
  Q("m2v4a","What is the professor's main concern about the student's proposal?",["Her conclusion about a large group is based on one person's account.","Her main source is not detailed enough.","Her topic has already been studied too much.","She has misread parts of Reed's diary."],0,"","用一個工頭的日記推論「工人普遍支持」。"),
  Q("m2v4b","What does the professor imply when he says, \"Then you have a different, and maybe more interesting, thesis\"?",["Evidence that contradicts her expectation could still lead to a valuable project.","She should give up the project if Reed's views were unusual.","She should write only about foremen.","Her current thesis is not interesting at all."],0,"","如果 Reed 的觀點不具代表性，這本身就可以是更有趣的論文主題。")
])),
UP(LG("m2n3","l3","Listen to an announcement in a history class.",[
  "MA: Before we get started, I want to explain the department's updated policy on AI writing tools, since it affects your term papers. You may use these tools for limited purposes: brainstorming topics, checking grammar, or finding sources to read. However, any text that appears in your paper must be written by you, and every source you cite must be one you have actually read.",
  "MA: If you use an AI tool at any stage, you'll need to include a short statement at the end of your paper describing how you used it. That statement won't lower your grade. In fact, we're asking for it precisely so that honest use isn't confused with misconduct.",
  "MA: What will be treated as a violation is submitting generated text as your own, or citing sources that don't exist, which, unfortunately, we saw several times last year. If you're unsure whether something is allowed, ask me before you submit, not after."
],[
  Q("m2n3a","What is the main purpose of the announcement?",["To clarify how students may use AI tools in their papers","To ban AI tools from all coursework","To introduce a new grammar-checking program","To announce penalties given last year"],0,"","說明系上對 AI 寫作工具的新規定。"),
  Q("m2n3b","Why does the speaker say that the statement will not lower students' grades?",["To encourage students to be open about how they used the tools","To explain that the statement is optional","To show that AI tools improve writing quality","To reassure students that grammar errors are acceptable"],0,"","讓誠實使用不被誤認為違規 → 鼓勵坦白說明。"),
  Q("m2n3c","What can be inferred from the speaker's mention of last year?",["Some students cited sources that did not exist.","The policy was stricter last year.","Students were not allowed to brainstorm with AI.","Most students wrote statements about AI use."],0,"","citing sources that don't exist, which… we saw several times last year。")
])),
UP(LG("m2l3","l4","Listen to part of a talk in a linguistics class.",[
  "WC: Linguists estimate that roughly seven thousand languages are spoken today, and that around forty percent of them are endangered. A language is generally considered endangered when children are no longer learning it at home. Once that happens, the number of speakers can decline quickly, because each generation has fewer people to pass the language on to.",
  "WC: Why do families stop passing on their language? Often it isn't a simple choice. When a dominant language is associated with jobs, education, and social status, parents may decide, understandably, that their children will be better off speaking it. Historically, governments sometimes made the situation worse by punishing children for speaking minority languages at school.",
  "WC: But language loss isn't always permanent. The most famous case of revival is Hebrew, which for centuries was used mainly in religious and written contexts and had no native speakers. In the late nineteenth and early twentieth centuries, families and schools began using it in everyday life, and today it has millions of native speakers. That case is unusual, though, because it had strong ideological support and a huge written tradition to draw on.",
  "WC: More typical are efforts like the Maori language nests in New Zealand, which started in the 1980s. These are preschools where young children are immersed entirely in Maori, often with elders who are fluent speakers. The key insight is that revival depends less on documenting a language in dictionaries than on creating situations where people actually need to use it. A language that's recorded but not spoken is preserved, perhaps, but not alive."
],[
  Q("m2l3a","According to the professor, when is a language generally considered endangered?",["When children are no longer learning it at home","When fewer than a thousand people speak it","When it has no written form","When the government stops using it"],0,"","when children are no longer learning it at home。"),
  Q("m2l3b","What does the professor imply about parents who stop passing on their language?",["Their decision is often based on concern for their children's future.","They usually do not speak the language well.","They are required to do so by law.","They prefer languages with long written traditions."],0,"","主流語言連結工作、教育和地位 → 父母為孩子著想（understandably）。"),
  Q("m2l3c","Why does the professor say that the Hebrew case is unusual?",["It had advantages that most endangered languages lack.","It was revived without the help of schools.","It had never been written down.","It was revived by a government agency in the 1980s."],0,"","有強大的理念支持和大量文字傳統，一般瀕危語言沒有。"),
  Q("m2l3d","What is the professor's main point about the language nests?",["Revival requires creating real situations in which the language is used.","Elders should write dictionaries for young people.","Preschools are less effective than universities.","Documenting a language is the most important step."],0,"","revival depends less on documenting… than on creating situations where people actually need to use it。")
])),

/* ===== Writing ===== */
BS("m2b01","w1","The bookstore said my order would arrive on Tuesday.","Did they say _ _ _ _ _ _ _?",["whether","you","could","pick","it","up","early"],["did"],"間接問句 whether＋主詞＋could＋原形；pick it up（代名詞放中間）。"),
BS("m2b02","w1","Why didn't Professor Moore hold office hours today?","She _ _ _ _ _ _ a conference.",["had","to","leave","early","to","attend"],["attending"],"had to leave early to attend…：不定詞表目的。"),
BS("m2b03","w1","Did you like the documentary we watched in class?","Honestly, _ _ _ _ _ _ I expected.",["it","wasn't","nearly","as","interesting","as"],["more"],"not nearly as＋形容詞＋as＝遠不如。"),
BS("m2b04","w1","What did the landlord want to know?","He asked _ _ _ _ _ _ the lease.",["whether","we","were","planning","to","renew"],["are"],"轉述問句時態後退：whether we were planning to renew。"),
BS("m2b05","w1","Is the new science building finished?","_ _ _ _ _ _ until the fall.",["It","won't","be","open","to","students"],["didn't"],"won't…until＝要到…才。"),
BS("m2b06","w1","How did your team prepare for the debate?","We _ _ _ _ _ _ arguments the other team might use.",["spent","hours","thinking","about","the","strongest"],["think"],"spend＋時間＋V-ing。"),
BS("m2b07","w1","Do you need any help with your move this weekend?","That's kind of you, but _ _ _ _ _ _ _ already.",["my","brother","has","offered","to","help","me"],["offering"],"has offered to＋原形動詞。"),
BS("m2b08","w1","Where should I put these lab samples?","Put them in _ _ _ _ _ _ the window.",["the","refrigerator","that","is","next","to"],["where"],"關係子句 that is next to the window 修飾 refrigerator。"),
BS("m2b09","w1","Have the results of the student election been announced?","Not yet. _ _ _ _ _ _ will be announced.",["Nobody","knows","exactly","when","the","winner"],["know"],"Nobody＋單數動詞；間接問句 when the winner will be announced。",["Nobody exactly knows when the winner"]),
BS("m2b10","w1","Why did you choose this university?","_ _ _ _ _ _ was its marine biology program.",["What","attracted","me","most","to","it"],["Which"],"名詞子句 What attracted me most to it 當主詞。",["What attracted me to it most"]),
EM("m2e1","w2","You are a member of a university book club. The club's meetings are currently held on Friday evenings, but attendance has been dropping. Write an email to the club organizer, Olivia. In your email, do the following:",
  ["Explain why you think attendance has dropped.","Suggest a different meeting time or format.","Explain how your suggestion would help."],
  "Olivia","Ideas for increasing book club attendance",
  "Hi Olivia,\nI've noticed that fewer people have been coming to our book club meetings lately, and I wanted to share a few thoughts. I think the main reason is the timing. Friday evening is when many students go home for the weekend, work part-time jobs, or simply want to relax after a long week. Several members have told me they would like to come but always have other plans on Fridays.\nI'd like to suggest moving our meetings to Wednesday at lunchtime, from 12:00 to 1:00, in the student union. We could also try a hybrid format, so members who are off campus can join online.\nI think this would help in two ways. First, most students are already on campus in the middle of the week, so it would be much easier for them to attend. Second, a shorter lunchtime meeting feels like less of a commitment, which might attract new members who are curious but busy.\nLet me know what you think. I'd be happy to create a quick survey to see which time works best for everyone.\nBest,\nNoah",
  "分析原因要具體（週五回家、打工）；建議要有時間、地點、形式；說明好處用 First / Second，最後主動提出協助。"),
AD("m2x1","w3","public health",
  ["Dr. Patel","Some schools now require students to lock their phones away for the entire school day. Supporters say this improves concentration and encourages face-to-face interaction, while critics argue that students need to learn to manage their phone use on their own. Do you think schools should ban phones for the whole school day? Why or why not?"],
  [["Grace","I support the ban. Even when phones are just on the desk, students keep checking them. Without phones, students pay more attention in class and actually talk to each other at lunch."],
   ["Daniel","I don't think a full-day ban is a good idea. Students will have phones for the rest of their lives, so school should teach them self-control. Also, parents want to be able to reach their kids in an emergency."]],
  "I think a full-day ban is reasonable for younger students but less appropriate for older teenagers. Grace makes an important point: phones are designed to capture our attention, and expecting a twelve-year-old to resist constant notifications during class is unrealistic. Removing phones entirely gives younger students a break from that pressure and protects their focus during the years when study habits are formed. However, Daniel is right that self-control has to be learned eventually, and high school is a better place to learn it than college, where no one will check. For older students, a gradual approach would work better, such as banning phones during lessons but allowing them during lunch. As for emergencies, schools already have office phones, so parents can still reach their children. In short, the policy should match students' age, moving from strict limits toward greater responsibility.",
  "提出「依年齡調整」的折衷立場；分別吸收兩位同學的論點，並反駁緊急聯絡的疑慮，最後總結。"),

/* ===== Speaking ===== */
SR("m2s1","s1","You are volunteering at a city marathon. Listen to the event organizer and repeat what she says.","WB: Water stations are every three kilometers."),
SR("m2s2","s1","You are volunteering at a city marathon. Listen to the event organizer and repeat what she says.","WB: Please wear your orange vest at all times."),
SR("m2s3","s1","You are volunteering at a city marathon. Listen to the event organizer and repeat what she says.","WB: Runners must show their number to enter the starting area."),
SR("m2s4","s1","You are volunteering at a city marathon. Listen to the event organizer and repeat what she says.","WB: The medical tent is located next to the finish line."),
SR("m2s5","s1","You are volunteering at a city marathon. Listen to the event organizer and repeat what she says.","WB: If a runner looks unwell, contact the nearest medical volunteer immediately."),
SR("m2s6","s1","You are volunteering at a city marathon. Listen to the event organizer and repeat what she says.","WB: Remind spectators to stay behind the barriers while the race is in progress."),
SR("m2s7","s1","You are volunteering at a city marathon. Listen to the event organizer and repeat what she says.","WB: After the last runner passes your station, help collect the empty cups and take them to the recycling truck."),
SI("m2i1","s2","A researcher is studying how university students balance work and study. He will ask you some questions.","M: To start, have you ever had a part-time job? What did you do, and what did you learn from it?",
  "Yes, last year I worked at a small bakery near my apartment on weekends. I mostly served customers and helped close the shop in the evening. I learned a lot about dealing with people, especially when the store was busy and customers were impatient. I had to stay calm and polite even when I was stressed. I also learned how to manage money, because I had to count the cash register at the end of each shift. Those skills have actually helped me in group projects at school, because I'm better at staying patient when things get difficult.",
  "說出工作內容，再具體說明學到的兩件事，最後連結到現在的生活。"),
SI("m2i2","s2","A researcher is studying how university students balance work and study. He will ask you some questions.","M: Some students work many hours while studying. In your opinion, what is a reasonable number of hours for a full-time student to work each week? Why?",
  "I think around ten to fifteen hours a week is reasonable for most full-time students. A full course load already takes about forty hours if you include classes, reading, and assignments, so working more than fifteen hours would leave very little time for sleep and rest. When I worked about twenty hours one semester, my grades dropped, and I was tired all the time. On the other hand, a few hours of work each week can actually help students manage their time better, because they know they can't waste their free hours. So I'd say a moderate amount is best.",
  "給出明確數字，用時間計算與自身經驗支持，再補充適量工作的好處。"),
SI("m2i3","s2","A researcher is studying how university students balance work and study. He will ask you some questions.","M: Some people think unpaid internships are a valuable way to gain experience, while others think they're unfair. What's your view?",
  "I think unpaid internships can be valuable, but overall they're unfair. They do give students real experience and connections, which can be very helpful when applying for jobs later. The problem is that only students whose families can support them can afford to work for free. Students who need to earn money for rent or tuition have to turn these opportunities down, even if they're very talented. As a result, unpaid internships can make it harder for students from lower-income families to enter certain careers. I think companies should pay at least a basic wage, or universities should offer grants to support interns.",
  "先承認優點，再說明不公平的原因與影響，最後提出解決方法。"),
SI("m2i4","s2","A researcher is studying how university students balance work and study. He will ask you some questions.","M: Finally, do you think universities should do more to help students find jobs related to their majors? What could they do?",
  "Yes, I think universities should do more, because many students graduate without knowing how to connect their studies to a career. One thing universities could do is invite alumni to talk about their jobs and offer mentoring, so students can see realistic career paths. Another idea is to build internships directly into degree programs, so students gain experience before they graduate. For example, my friend's engineering program requires a six-month placement at a company, and most of her classmates received job offers from those companies. Programs like that make the transition from school to work much smoother.",
  "表態後提出兩個具體做法，再用朋友的例子證明有效。"),

/* ===== 2026-10 追加：補到官方題數（Reading 50、Listening 47）。執行時會依題型自動排回正確位置 ===== */
RT(CTW("m2c4","r1","The Spread of Tea","Tea was first consumed in China thousands of years ago, originally as a medicine. Over time, it became a daily drink, and merchants began carrying it along trade routes to other parts of Asia. By the seventeenth century, European traders had developed a strong demand for tea, which they shipped home in large quantities. Today, tea is the most widely consumed beverage in the world after water.")),
RT(AP("m2a4","r3","Citizen Science",[
  "Citizen science refers to scientific research in which members of the public, usually without formal training, help collect or analyze data. The practice is older than it may seem. Since 1900, volunteers in North America have taken part in an annual bird count held around the winter holidays, and the records they have produced now form one of the longest-running sources of information on bird populations.",
  "The internet has greatly expanded what citizen scientists can do. ■ In 2007, astronomers launched an online project called Galaxy Zoo, which asked volunteers to sort images of galaxies by shape. ■ The researchers had expected the task to take years; instead, volunteers classified hundreds of thousands of galaxies within months. ■ Volunteers have also made discoveries that professionals missed, such as an unusual glowing gas cloud first noticed by a schoolteacher. ■",
  "Some scientists remain cautious, however. Because volunteers vary in skill and attention, their data may contain more errors than measurements made by trained researchers. Project designers address this problem in several ways. Many tasks are given to multiple volunteers, and the most common answer is accepted; volunteer results are also regularly compared with those of experts. When these safeguards are in place, studies have found that the combined judgments of volunteers can be nearly as accurate as those of professionals."
],["safeguards"],[
  Q("m2a4a","What can be inferred from paragraph 1 about the annual bird count?",["It provides information about long-term changes in bird populations.","It began after the internet was invented.","It is carried out only by professional scientists.","It takes place during the summer."],0,"","從 1900 年持續到現在，是最長期的鳥類族群資料之一。"),
  INS("m2a4b","This enthusiasm surprised even the project's organizers.",2,"This enthusiasm 指「幾個月就分類了幾十萬個星系」，接在那一句之後＝第 3 個方塊。"),
  Q("m2a4c","The word \"safeguards\" in the passage is closest in meaning to",["protective measures","volunteers","discoveries","rewards"],0,"","safeguards＝保護措施（多人分類、和專家比對）。"),
  Q("m2a4d","According to paragraph 3, how do project designers deal with volunteers' errors?",["By giving the same task to several volunteers","By training volunteers for several months","By paying volunteers who make no mistakes","By letting only experts analyze the images"],0,"","Many tasks are given to multiple volunteers, and the most common answer is accepted。"),
  Q("m2a4e","Why does the author mention a schoolteacher in paragraph 2?",["To show that volunteers can make original findings","To argue that teachers make better scientists","To explain how Galaxy Zoo was created","To criticize professional astronomers"],0,"","志工也能發現專家漏掉的東西。")
])),
RT(L("m2r21","l1","cr",["M: Have you seen my blue umbrella anywhere?"],["Didn't you leave it in the car yesterday?","It's supposed to rain later.","Blue is my favorite color.","I've seen that movie twice."],0,"","用反問提供線索。")),
RT(L("m2r22","l1","cr",["WB: The professor's office hours have been changed to Thursday mornings."],["That's going to be a problem with my work schedule.","Her office is on the third floor.","I changed my clothes after class.","Thursday was a holiday last year."],0,"","對改變的反應：和工作時間衝突。")),
RT(L("m2r23","l1","cr",["W: Why don't we split the cost of the textbook and share it?"],["That works, as long as we agree on who keeps it when.","Because the textbook is expensive.","I split my time between two jobs.","The cost of living keeps rising."],0,"","Why don't we…? 是提議，回應「可以，但要講好」。用 Because 回答是陷阱。")),
RT(L("m2r24","l1","cr",["MC: I can't believe the semester's already half over."],["I know. It feels like classes just started.","I can believe anything you say.","The semester ends in May.","Half of the class was absent."],0,"","表示同感。")),
LO(L("m2r25","l1","cr",["W: Which floor is the computer lab on?"],["The second floor, near the stairs.","It has thirty computers.","I sat on the floor.","It opens at eight."],0,"","問樓層，回答樓層。")),
LO(L("m2r26","l1","cr",["M: Do you want to study together tonight?"],["Sure. What time works for you?","I studied history last year.","It's cold tonight.","We're all together now."],0,"","答應並約時間。")),
UP(L("m2r27","l1","cr",["WA: You'd better hurry if you want to catch the last bus."],["I'm getting a ride with Marta, actually.","The bus was crowded last time.","I caught a cold last week.","Hurry is my middle name."],0,"","間接表示不需要趕：有人載。")),
UP(L("m2r28","l1","cr",["M: I'm not sure Professor Grant will accept a paper this long."],["The guidelines only mention a minimum length.","She's been teaching for years.","The paper is in my bag.","I accept your apology."],0,"","用規定反駁對方的擔心：只有規定最少字數。")),
RT(LG("m2n4","l3","Listen to an announcement in a psychology class.",[
  "W: Before we begin today, I have an announcement from the psychology department. Researchers are looking for students to take part in a study on sleep and memory. Participants will wear a small device on their wrist for one week and complete short online memory tests every morning. Each test takes about ten minutes.",
  "W: Students who complete the study will receive twenty dollars and, for those of you in this course, two points of extra credit. You can't take part if you work night shifts, since that would affect the results. If you're interested, sign up through the link I posted on the course website by Friday."
],[
  Q("m2n4a","What is the main purpose of the announcement?",["To invite students to take part in a study","To explain the results of a sleep study","To announce a change in course requirements","To recruit research assistants for the department"],0,"","徵求參加睡眠與記憶研究的學生。"),
  Q("m2n4b","What will participants be asked to do?",["Wear a device and take daily memory tests","Sleep in a laboratory for a week","Write a report on their sleep habits","Attend a short meeting every evening"],0,"","戴手環一週＋每天早上線上記憶測驗。"),
  Q("m2n4c","Why can't students who work night shifts take part?",["Their sleep patterns would distort the findings.","They cannot take tests in the morning.","They are not eligible for extra credit.","The device does not work at night."],0,"","that would affect the results。")
])),
RT(LG("m2l4","l4","Listen to part of a talk in a history class.",[
  "W: Today it seems obvious that everyone in a region uses the same clock time. But for most of history, that wasn't the case. Towns set their clocks by the sun: noon was when the sun was highest in the sky. Since the sun reaches that point at slightly different times as you move east or west, every town had its own local time. A city a few dozen kilometers to the west might be several minutes behind.",
  "W: For people who traveled by horse, those differences hardly mattered. Railways changed that. Trains connected distant towns quickly, and railroad companies had to publish schedules. With dozens of local times, schedules became confusing, and errors could even cause collisions on lines with a single track. In Britain, railway companies began using London time across their networks in the 1840s, and it became known as railway time.",
  "W: In the United States, the problem was even worse because of the country's size. So on November 18, 1883, American and Canadian railroads adopted a system of standard time zones. Many towns changed their clocks that day, and some newspapers called it the day of two noons, because in places that set their clocks back, the clock struck noon twice.",
  "W: Interestingly, this system was created by private companies, not by the government. It wasn't until 1918 that the U.S. Congress officially made time zones law. In other words, the way we measure time was shaped largely by the practical needs of a new technology."
],[
  Q("m2l4a","What is the talk mainly about?",["How railways led to the creation of standard time zones","How sundials were invented","Why Britain built railways before the United States","How Congress regulated train speeds"],0,"","鐵路的需要催生了標準時區。"),
  Q("m2l4b","Why does the professor mention travel by horse?",["To explain why differences in local time once caused few problems","To compare the speed of horses and trains","To show that riders carried clocks between towns","To describe how towns set their clocks"],0,"","騎馬很慢，各地時間差幾分鐘沒關係。"),
  Q("m2l4c","Why was November 18, 1883, called the day of two noons?",["Some towns set their clocks back, so noon happened twice.","Trains ran twice as often that day.","Two different calendars were in use.","The sun appeared to rise twice."],0,"","把時鐘往回調的地方，中午 12 點出現兩次。"),
  Q("m2l4d","What can be inferred about the U.S. government's role?",["It made official a system that was already in use.","It opposed the railroads' time zones.","It created time zones before the railroads did.","It required towns to keep using local time."],0,"","鐵路公司 1883 年先用，國會 1918 年才立法。")
]))

]);
