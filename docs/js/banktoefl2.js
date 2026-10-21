/* ===== TOEFL iBT 練習題庫（續）：聽力、寫作、口說（原創題）
   聽力 script 標記：W/M＝美國腔女/男、WB/MB＝英國腔、WA/MA＝澳洲腔、WC/MC＝加拿大腔、N＝旁白
   Choose a Response 以「間接回應」為主（正式考的難點）：正解常常不直接回答，干擾選項會重複題目裡的字。 ===== */
bank("toefl").items.push(

/* ---------- Listening・Listen and Choose a Response ---------- */
L("nr01","l1","cr",["W: Do you want to grab lunch before the seminar, or are you heading straight there?"],["I've got about twenty minutes, so let's be quick.","The seminar was really informative.","I usually have a sandwich for lunch.","It's straight down the hall on your left."],0,"二選一的問句，回答可以不直接說 lunch 或 seminar。","有二十分鐘，快點吃 → 選擇先吃午餐。其他選項只是重複 seminar、lunch、straight。"),
L("nr02","l1","cr",["MB: I heard the library's extending its hours during finals week."],["That'll make a big difference for me.","The library has three floors.","Finals week starts on a Monday.","I extended my visa last month."],0,"對方提供消息，回應表達感受。","延長開放對我幫助很大。extend 被拿來當陷阱。"),
L("nr03","l1","cr",["W: Didn't you say you were going to switch to the evening section?"],["There wasn't any room left in it.","Yes, the evening is much quieter.","I'll switch off the lights on my way out.","The section ends at nine."],0,"否定問句＝「你不是說要…嗎？」","間接說明沒換成：晚上的班滿了。"),
L("nr04","l1","cr",["M: The bus is running about fifteen minutes late again."],["Then let's just walk—it's not that far.","The bus stop has a new shelter.","Fifteen people were on the bus.","I'm running in a race this weekend."],0,"對方說出問題，回應提出解決方法。","那就走路吧。running、fifteen 都是重複字陷阱。"),
L("nr05","l1","cr",["WA: Would you mind if I borrowed your notes from Tuesday's lecture?"],["I didn't make it to class that day either.","Not at all—I just bought a new notebook.","The lecture hall was really crowded.","I'll lend you some money tomorrow."],0,"Would you mind…? 是請求。","間接拒絕：我那天也沒去上課（所以沒有筆記）。Not at all 後面接的內容不相關。"),
L("nr06","l1","cr",["MC: I think the cafe on the corner must be closed today."],["Then why are people walking out with coffee?","I prefer tea to coffee.","The corner is very busy at noon.","I usually go there on Fridays."],0,"對方提出猜測，回應可以用證據反駁。","有人拿著咖啡走出來 → 其實有開。"),
L("nr07","l1","cr",["W: The deadline for the scholarship application has been moved up a week."],["Good thing I submitted mine early.","The scholarship covers full tuition.","I moved into a new apartment last week.","Applications are available online."],0,"moved up＝提前。","還好我早就交了。moved 被拿來當陷阱。"),
L("nr08","l1","cr",["MB: Have you decided which topic you're going to write your paper on?"],["I'm still torn between two.","The paper is due on Friday.","I wrote it on my laptop.","Yes, the topic was announced in class."],0,"問「決定了嗎」。","還在兩個之間猶豫 → 還沒決定。最後一個說 Yes 卻沒回答選哪個。"),
L("nr09","l1","cr",["W: I can't believe how crowded the gym is tonight."],["Everyone's making up for the holiday weekend, I guess.","I believe the gym closes at ten.","The crowd cheered loudly at the game.","The gym fee is quite reasonable."],0,"對方表達驚訝，回應給出可能的原因。","大家在補連假沒運動的份。believe、crowd 是陷阱。"),
L("nr10","l1","cr",["M: Do you happen to know whether Professor Adams accepts late assignments?"],["Only if you contact her before the due date.","She assigned three chapters this week.","I happened to see her yesterday.","The assignment was quite long."],0,"whether…＝是否。","有條件地接受：要在截止前聯絡她。"),
L("nr11","l1","cr",["WC: The printer in the computer lab keeps jamming."],["You might have better luck with the one in the library.","I printed my essay last night.","The computer lab is on the second floor.","The lab assistant studies chemistry."],0,"對方抱怨問題。","建議改用圖書館那台。"),
L("nr12","l1","cr",["M: Wasn't the guest speaker supposed to arrive at noon?"],["Her flight was delayed, apparently.","The speaker system works fine.","Noon is the best time for lunch.","She spoke about climate policy."],0,"否定問句表示「怎麼還沒到」。","解釋原因：班機延誤。speaker 一字多義是陷阱。"),
L("nr13","l1","cr",["W: I'm thinking of dropping my statistics class."],["Have you talked to your advisor about it?","I dropped my phone yesterday.","The class meets in Room 210.","Statistics show that more students drive."],0,"對方說打算，回應給建議。","先和指導老師談過了嗎？drop、statistics 是陷阱。"),
L("nr14","l1","cr",["MA: The orientation session for new volunteers starts at eight tomorrow."],["That early? I'd better set two alarms.","The volunteers were very helpful.","I started volunteering last year.","Orientation was held in the gym."],0,"對方告知時間。","那麼早？要設兩個鬧鐘 → 對時間的反應。"),
L("nr15","l1","cr",["W: Do you think we should book the study room now or wait until Friday?"],["It's usually fully booked by Wednesday.","The study room has a whiteboard.","I booked a flight to Denver.","Friday is the last day of class."],0,"二選一，答案常是間接的。","星期三就訂滿了 → 意思是現在就訂。"),
L("nr16","l1","cr",["M: You've been working on that lab report all afternoon."],["I keep finding errors in my data.","The lab closes in the afternoon.","I'll report it to the manager.","It was a sunny afternoon."],0,"陳述句，其實在問「怎麼這麼久」。","解釋原因：一直發現資料有錯。"),
L("nr17","l1","cr",["WB: Weren't you planning to apply for the summer internship?"],["I missed the deadline by two days.","Summer is my favorite season.","The internship is in the marketing department.","I applied sunscreen before going out."],0,"否定問句＝「你不是打算…嗎？」","間接說明沒申請：錯過截止日。"),
L("nr18","l1","cr",["M: The new dining hall menu is a lot healthier than last year's."],["Healthier, maybe, but not nearly as tasty.","The dining hall opens at seven.","I ate there last year too.","Health insurance is required for students."],0,"對方發表看法，回應可以部分同意。","承認健康，但沒那麼好吃。"),
L("nr19","l1","cr",["W: Could you remind me what time the review session starts?"],["Let me check the email Dr. Patel sent.","The session covered chapters five and six.","I remind myself every morning.","It started raining at noon."],0,"問時間，不一定直接報時間。","我查一下老師寄的信 → 合理回應。"),
L("nr20","l1","cr",["MC: I was hoping to get a single room this semester."],["Same here, but they're always the first to go.","My room is on the third floor.","The semester ends in May.","I'm hoping the team wins tonight."],0,"was hoping 暗示沒有成功。","我也是，但單人房總是最先被搶光。"),
L("nr21","l1","cr",["W: Why don't you join our study group on Thursdays?"],["I work the evening shift that day.","Because the group was too large.","Thursday comes after Wednesday.","I joined the gym last month."],0,"Why don't you…? 是邀請，不是問原因。","間接拒絕：那天要上晚班。用 Because 回答是陷阱。"),
L("nr22","l1","cr",["M: Is the shuttle to the airport still running on Sundays?"],["Only until the end of the month.","The airport is about an hour away.","I ran five miles on Sunday.","The shuttle seats twenty passengers."],0,"是非問句，回答可以加條件。","只到月底為止 → 目前還有。"),
L("nr23","l1","cr",["WA: The professor wants our proposals by Monday instead of Friday."],["Well, that buys us the weekend.","The proposal was accepted last year.","The professor teaches two sections.","I'd rather not work on Friday."],0,"截止日從星期五延到星期一。","那我們多了一個週末 → 理解這個改變的意義。"),
L("nr24","l1","cr",["M: I'm surprised the museum isn't charging admission this weekend."],["It's part of the city's anniversary celebration.","The admission office closes at five.","I visited a museum in Paris once.","I wasn't surprised by the ending at all."],0,"對方表示驚訝，回應解釋原因。","免費是因為城市週年慶。"),

/* ---------- Listening・Listen to a Conversation ---------- */
LG("nv01","l2","Listen to a conversation between a student and a housing office employee.",[
  "M: Hi, I submitted a maintenance request about the heater in my room, but nobody's come yet.",
  "W: Let me look it up. What's your room number?",
  "M: It's 314 in Carver Hall. I sent the request online last Tuesday.",
  "W: Hmm, I'm not seeing anything for 314. Our system was updated last week, and a few requests didn't transfer properly. I'm really sorry about that.",
  "M: So it's been a week and nobody even knows about it? My room's been freezing at night. I've been sleeping in my coat.",
  "W: That's not acceptable. I'll enter it as an urgent request right now, which means someone should be there within twenty-four hours. In the meantime, we have a few empty rooms in Ellis Hall. You could stay in one of those until the heater's fixed.",
  "M: Ellis Hall is across campus, though, and all my stuff is here. Could I just borrow a space heater instead?",
  "W: Unfortunately, space heaters aren't allowed in the residence halls. They're a fire risk. But I can get you some extra blankets from our storage room.",
  "M: OK, I'll take the blankets. And if the repair takes longer than a day, I'll think about Ellis."
],[
  Q("nv01a","Why didn't anyone respond to the man's request?",["It was lost when a computer system was changed.","He sent it to the wrong office.","The maintenance staff were on vacation.","He did not mark it as urgent."],0,"","系統更新時有些申請沒轉過去。"),
  Q("nv01b","What will the man most likely do for now?",["Stay in his room with extra blankets","Move into a room in Ellis Hall","Borrow a space heater from a friend","Submit another request online"],0,"","他接受毛毯；修理超過一天才考慮搬去 Ellis。")
]),
LG("nv02","l2","Listen to a conversation between a student and her professor.",[
  "W: Professor Ward, do you have a minute? It's about my research paper.",
  "MB: Of course, Elena. Come in. You're writing about the history of public libraries, right?",
  "W: That was the plan. But most of the sources I've found focus on just a few big cities, like Boston and New York. I wanted to compare them with libraries in rural areas, and there's almost nothing.",
  "MB: That's actually a common problem. Rural institutions often didn't keep detailed records. Have you looked at local newspapers? Small-town papers often reported on library openings, fundraising events, that sort of thing.",
  "W: I hadn't thought of that. Are those available online?",
  "MB: Many are, through the state historical society's digital archive. It's free with your student account. But I'd also suggest narrowing your focus. Instead of comparing urban and rural libraries across the whole country, why not compare two or three towns in this state? It's more manageable, and the archive's coverage here is excellent.",
  "W: That makes sense. I guess I was trying to do too much in twelve pages.",
  "MB: Most students do, at first. Send me a revised outline by Friday, and we'll go from there."
],[
  Q("nv02a","What problem does the student have with her research?",["She cannot find enough information about rural libraries.","Her paper is longer than the professor allows.","Her sources about big cities contradict each other.","She cannot access the online archive."],0,"","鄉村圖書館的資料幾乎找不到。"),
  Q("nv02b","What does the professor imply about the student's original plan?",["It was too broad for a paper of that length.","It focused too narrowly on a few big cities.","It relied too heavily on newspaper sources.","It would suit a different course better."],0,"","建議縮小範圍；學生也承認 trying to do too much in twelve pages。")
]),
LG("nv03","l2","Listen to a conversation between two classmates.",[
  "M: Hey, Priya. Did Jake ever send you his part of the lab report?",
  "W: No, and it's due Thursday. I texted him twice yesterday. He said he'd look at it soon, whatever that means.",
  "M: This is the second time. Last month we basically wrote his section for him.",
  "W: I know. I don't want to do that again, but I also don't want our grade to suffer.",
  "M: What if we finish our own sections first, and then, if we still don't have his by Wednesday night, we mention it to the TA? Dr. Kim's syllabus says group members can report uneven contributions.",
  "W: I'd rather not get him in trouble. But you're right, it's not fair to us. Maybe we should tell Jake that's what we're planning. That might be enough to motivate him.",
  "M: Good idea. I'll write the message, and you can check it before I send it, so it doesn't sound too harsh."
],[
  Q("nv03a","What are the students mainly discussing?",["How to deal with a group member who has not done his work","How to divide a lab report into sections","Whether to ask the TA for an extension","Why their last report received a low grade"],0,"","Jake 又沒交他的部分，要怎麼處理。"),
  Q("nv03b","Why does the woman suggest telling Jake about their plan?",["She hopes it will push him to finish without involving the TA.","She wants him to report the problem himself.","She thinks he misunderstood the deadline.","She wants him to write the message to the TA."],0,"","她不想讓他惹麻煩，希望告知計畫就能讓他動起來。")
]),
LG("nv04","l2","Listen to a conversation between a student and a bookstore employee.",[
  "W: Hi, I bought this chemistry textbook here last week, but I think it's the wrong edition. My professor's using the ninth, and this is the eighth.",
  "MC: Let me see. Yes, this is the eighth edition. Did you buy it new or used?",
  "W: Used. It was on the shelf with the other books for Chemistry 101.",
  "MC: I'm sorry about that. Sometimes older copies get put back in the wrong spot. Normally we accept returns within seven days with a receipt. Do you have yours?",
  "W: I think it's in my email. Yes, here. I bought it eight days ago, though.",
  "MC: Since the mistake was ours, I can still process the return. But I should mention that we're out of used copies of the ninth edition. A new copy is ninety-five dollars.",
  "W: Ouch. Is there a cheaper option?",
  "MC: There's a digital version for fifty-two dollars. It comes with access to the online homework system, which a lot of chemistry professors require anyway. You might check your syllabus.",
  "W: Oh, I think it is required. That might work out better, then."
],[
  Q("nv04a","Why is the employee willing to accept the return?",["The store had put the old edition in the wrong section.","The woman returned the book within seven days.","The woman paid with a credit card.","The professor contacted the store about the mistake."],0,"","她其實已經超過七天，但錯在書店把舊版放錯地方。"),
  Q("nv04b","What will the woman most likely do?",["Buy the digital version of the textbook","Keep the eighth edition and borrow a friend's copy","Wait for used copies of the ninth edition","Ask her professor if the eighth edition is acceptable"],0,"","電子版比較便宜，還附她課程需要的線上作業系統。")
]),
LG("nv05","l2","Listen to a conversation between a student and a career advisor.",[
  "M: Hi, I have an appointment for a resume review. I'm applying for summer internships in marketing.",
  "WB: Great. Let's take a look. Your formatting is clean, and it's good that it fits on one page. But your descriptions are fairly general. Here it says you helped with social media for the campus radio station. What exactly did you do?",
  "M: I ran their Instagram account and planned posts for each week's shows.",
  "WB: And did anything change while you were doing it?",
  "M: Well, our followers went from about eight hundred to over two thousand in one semester.",
  "WB: That's exactly what employers want to see! Numbers make your impact concrete. Grew followers by a hundred and fifty percent in four months is much stronger than helped with social media.",
  "M: I didn't think it was that impressive. It's just a student station.",
  "WB: Recruiters know you're a student. What they're looking for is evidence that you can get results. Go through each line and ask yourself what changed because of your work. Then, if you like, you can sign up for a mock interview. We have openings next week."
],[
  Q("nv05a","What is the main problem with the student's resume?",["It does not show the specific results of his work.","It is longer than one page.","Its formatting is hard to read.","It includes too many unrelated jobs."],0,"","描述太籠統，沒寫出具體成果（數字）。"),
  Q("nv05b","What does the advisor imply when she says, \"Recruiters know you're a student\"?",["He should not worry that his experience seems small.","He should apply only for student positions.","He should remove the radio station from his resume.","Recruiters prefer full-time experience."],0,"","對方知道你是學生，重點是能做出成果 → 不用擔心經驗「只是學生電台」。")
]),
LG("nv06","l2","Listen to a conversation between two roommates.",[
  "W: Did you see the electricity bill? It's almost three hundred dollars this month.",
  "M: What? It's usually around ninety. We haven't even been using the air conditioner.",
  "W: That's what I thought. But look here. It says estimated reading. I guess nobody actually checked the meter.",
  "M: So they just guessed? Can they do that?",
  "W: Apparently, if they can't get to the meter. Remember when the gate to the side yard was locked all month?",
  "M: Oh, right. The landlord put a new lock on it. So the meter reader couldn't get in.",
  "W: Exactly. I think we can take a photo of the meter ourselves and submit it through their website. Then they'll recalculate the bill.",
  "M: OK, but we should also ask the landlord to give the company a key, or this'll happen again next month.",
  "W: Good point. I'll take the photo tonight, and you text the landlord?",
  "M: Deal."
],[
  Q("nv06a","Why is the bill so much higher than usual?",["The company estimated the amount instead of reading the meter.","The roommates used the air conditioner more often.","The landlord added a fee for the new lock.","Electricity rates went up this month."],0,"","estimated reading：抄表員進不去，只好估算。"),
  Q("nv06b","What does the man want to prevent?",["The meter reader being unable to reach the meter again","The landlord raising their rent","The company charging them a late fee","Neighbors using their electricity"],0,"","請房東給電力公司鑰匙，不然下個月又會發生。")
]),
LG("nv07","l2","Listen to a conversation between a student and a librarian.",[
  "M: Excuse me, I'm trying to see a book in the special collections. It's an 1850s travel diary. I found it in the online catalog.",
  "W: Sure. Special collections materials can't be checked out, but you can view them here in the reading room. Did you fill out a request form online?",
  "M: No, I didn't know I needed to.",
  "W: That's OK. It usually takes about a day for staff to bring items up from storage, so I'd recommend submitting the form now for tomorrow.",
  "M: Tomorrow's fine. Is there anything I should know before I come?",
  "W: A few rules. Only pencils are allowed, no pens, and you'll need to leave your bag in a locker. You can take photos without flash, though.",
  "M: Photos are allowed? That's great. I was worried I'd have to copy everything by hand.",
  "W: Most researchers prefer photos now. Just remember that if you plan to publish any images, you'll need permission from the library."
],[
  Q("nv07a","Why can't the man see the diary today?",["Items must be brought from storage in advance.","The diary is being repaired.","He has not shown his student ID.","The reading room is closed until tomorrow."],0,"","要先填申請，館員大約一天才能從書庫調出來。"),
  Q("nv07b","What is the man relieved to learn?",["He will be allowed to photograph the diary.","He can bring his own pens into the room.","He can check out the diary for a week.","He does not need to fill out a form."],0,"","Photos are allowed? That's great.——本來擔心要手抄。")
]),
LG("nv08","l2","Listen to a conversation between a student and her academic advisor.",[
  "W: Hi, Dr. Mensah. I'm thinking about studying in Spain next spring, but I'm worried it'll delay my graduation.",
  "MA: That's a common worry. What's your major again?",
  "W: Environmental engineering. I have four required courses left, and they're all pretty specialized.",
  "MA: Engineering is trickier than some majors because the required courses have to be taken in sequence. Let's see. The program in Valencia offers fluid mechanics, which matches one of your requirements. The others probably wouldn't transfer as major courses.",
  "W: So I'd only cover one requirement in a whole semester?",
  "MA: For your major, yes. But you still need two humanities electives, and those transfer easily. Plus, if you took a summer course here before you leave, you could stay on track.",
  "W: A summer course. I was planning to work this summer, but maybe I could do an online one.",
  "MA: Check with the engineering office first. Some of your courses require lab work, so they may not be offered online."
],[
  Q("nv08a","Why is the student concerned about studying abroad?",["She is afraid it will keep her from graduating on time.","She does not speak enough Spanish.","She cannot afford to live in Valencia.","She will lose her summer job."],0,"","worried it'll delay my graduation。"),
  Q("nv08b","What does the advisor suggest about taking an online summer course?",["It might not be possible for courses that include lab work.","It is the easiest way to earn humanities credits.","It would replace the fluid mechanics course.","It is required before students go abroad."],0,"","有些課要做實驗，可能沒有線上版，要先問工程系辦。")
]),

/* ---------- Listening・Listen to an Announcement ---------- */
LG("nn01","l3","Listen to an announcement in a chemistry class.",[
  "WB: Before we start, a quick but important announcement. This Thursday, the university will be testing the fire alarm system in the science building between ten and noon. That overlaps with the second half of our lab session. Since we can't safely leave chemicals unattended every time the alarm goes off, we're going to move Thursday's lab to Friday at the same time.",
  "WB: I know some of you have other classes on Friday morning. If that's the case for you, email me by tomorrow, and I'll arrange for you to join the Tuesday section next week instead. The pre-lab quiz will still be due Thursday at noon, online, so don't let the schedule change confuse you."
],[
  Q("nn01a","Why is the lab being moved?",["Alarm tests would interrupt work with chemicals.","The science building will be closed for repairs.","The professor will be away on Thursday.","The pre-lab quiz needs more time."],0,"","警報測試時不能把化學藥品放著不管。"),
  Q("nn01b","What should students with Friday morning classes do?",["Contact the professor by the next day","Do the lab on Thursday afternoon instead","Submit the pre-lab quiz on Friday","Join the Tuesday section this week"],0,"","email me by tomorrow；要參加的是「下週」二的班。")
]),
LG("nn02","l3","Listen to an announcement from a professor.",[
  "M: I want to clarify something about the final project, because I've received a lot of questions. Originally, I said you could work alone or in pairs. After reviewing your proposals, I'm changing that: everyone will now work individually. Several proposals were clearly too large for one semester, and I think working in pairs led some of you to plan more than you can realistically finish.",
  "M: The page requirement is being reduced from twenty to twelve to reflect the change. If you already started collecting data with a partner, you can both use the same data set, but each of you must write your own analysis and draw your own conclusions."
],[
  Q("nn02a","What change does the professor announce?",["Students must now complete the project individually.","Students must now find a partner.","The project deadline has been extended.","Students must collect new data."],0,"","everyone will now work individually。"),
  Q("nn02b","What can be inferred about students who began collecting data with a partner?",["They do not have to start their research over.","They will lose points for working together.","They must still write a twenty-page paper.","They need to choose a new topic."],0,"","可以共用同一份資料，只是分析和結論要各自寫。")
]),
LG("nn03","l3","Listen to an announcement in a university library.",[
  "WC: Attention, library users. Beginning Monday, the second floor will become a silent study zone. Phone calls, group discussions, and even quiet conversations will no longer be permitted there. We've made this change in response to student surveys, in which noise was the most common complaint.",
  "WC: Group work is still welcome on the first floor, and the six study rooms on the third floor can be reserved for up to two hours. To make room for more individual desks on the second floor, the computer stations there are being moved to the first floor this weekend. We appreciate your patience during the move."
],[
  Q("nn03a","Why is the library creating a silent zone?",["Many students had complained about noise.","The computer stations were too crowded.","Students asked for more group study rooms.","The first floor is being renovated."],0,"","問卷中最常見的抱怨是噪音。"),
  Q("nn03b","What will happen to the computers on the second floor?",["They will be moved to another floor.","They will be replaced with newer models.","They will be available only by reservation.","They will be removed from the library."],0,"","搬到一樓，二樓空出來放個人書桌。")
]),
LG("nn04","l3","Listen to an announcement from the campus recreation center.",[
  "MA: Hi everyone, a quick update from the recreation center. The indoor pool will be closed for the next three weeks while we replace its filtration system. We know this affects a lot of you, especially members of the swim club, who have a competition coming up.",
  "MA: We've arranged with Lakeview Community Center, about ten minutes from campus, for students to use their pool at no charge. Just show your student ID at the front desk. A free shuttle will leave from the rec center every hour on the hour between six a.m. and eight p.m. Swim club members should check their email for a separate practice schedule."
],[
  Q("nn04a","What is the main purpose of the announcement?",["To explain a pool closure and an alternative arrangement","To advertise an upcoming swim competition","To introduce a new shuttle route downtown","To invite students to join the swim club"],0,"","泳池關閉三週＋改去 Lakeview 的安排。"),
  Q("nn04b","What does the speaker imply about swim club members?",["Their practice times will differ from those of other students.","They must pay to use the Lakeview pool.","They will have to cancel their competition.","They are not allowed on the shuttle."],0,"","泳隊另有練習時間表 → 和一般學生不同。")
]),
LG("nn05","l3","Listen to an announcement from the student government.",[
  "W: Good afternoon. This is Maya Chen from the student government. Next Wednesday at six p.m., we're holding a town hall meeting in the student union about proposed changes to campus parking. As some of you know, the university is considering doubling the price of parking permits to help pay for a new parking garage.",
  "W: Before the administration makes a final decision, they want to hear from students. Anyone can speak for up to two minutes, but please sign up in advance on our website so we can plan the schedule. If you can't attend, you're welcome to submit written comments, which we'll share with the administration."
],[
  Q("nn05a","Why is the meeting being held?",["To gather student opinions before a decision is made","To announce that permit prices have doubled","To elect new student government members","To show students the design of the garage"],0,"","Before the administration makes a final decision, they want to hear from students。漲價還只是 considering。"),
  Q("nn05b","What are students who want to speak asked to do?",["Register online beforehand","Submit written comments first","Arrive early on Wednesday","Buy a parking permit"],0,"","sign up in advance on our website。")
]),
LG("nn06","l3","Listen to an announcement in a geology class.",[
  "MB: All right, about Saturday's field trip to Copper Canyon. The bus leaves from the parking lot behind the geology building at seven a.m. sharp. It can't wait for latecomers, because we need to reach the canyon before the afternoon heat. We'll be hiking about six kilometers on uneven ground, so wear boots with ankle support, not sneakers.",
  "MB: Bring at least two liters of water. There's nowhere to refill once we're on the trail. You'll be collecting rock samples, so bring a notebook and a pencil, but leave your hammers at home. The park doesn't allow them. We'll provide sample bags."
],[
  Q("nn06a","Why will the bus leave exactly on time?",["The group needs to arrive before it gets too hot.","The park closes early on Saturdays.","The driver has another trip that afternoon.","The hike is longer than six kilometers."],0,"","need to reach the canyon before the afternoon heat。"),
  Q("nn06b","What are students told NOT to bring?",["Rock hammers","Notebooks","Water bottles","Hiking boots"],0,"","leave your hammers at home，公園不准用。")
]),

/* ---------- Listening・Listen to an Academic Talk ---------- */
LG("nl01","l4","Listen to part of a talk in a biology class.",[
  "W: Today I want to talk about a puzzle in forest ecology called masting. Masting is when trees of the same species, sometimes across an entire region, produce huge crops of seeds in the same year, and then produce very few seeds for several years afterward. Oaks and beeches are classic examples. Now, why would trees do this? Producing seeds takes a lot of energy, so you might expect a steady output to be the safest strategy.",
  "W: The leading explanation is called predator satiation. Think about the animals that eat acorns: mice, squirrels, deer, insects. In a normal year, they can eat almost every acorn produced. But in a mast year, there are simply more acorns than the predators can possibly consume, so a lot of seeds survive and get a chance to sprout. And here's the clever part: the lean years in between keep predator populations small. Fewer mice survive the winters when food is scarce, so when the next mast year comes, there are even fewer animals to eat the seeds.",
  "W: Of course, this only works if the trees are coordinated. How do they stay in sync? Researchers think weather plays a big role. A warm, dry spring, for example, can trigger many trees to flower at the same time. And trees that flower together also pollinate each other more successfully.",
  "W: One interesting consequence: mast years can even affect human health. A huge acorn crop leads to a boom in mice the following year, and mice carry the ticks that spread Lyme disease."
],[
  Q("nl01a","What is the talk mainly about?",["Why some trees produce seeds in large, irregular bursts","How forest animals store food for winter","Why oaks grow more slowly than beeches","How weather damages forests"],0,"","masting：同種樹在同一年大量結實，之後好幾年很少。"),
  Q("nl01b","According to the professor, how do the lean years benefit the trees?",["They limit the number of seed-eating animals.","They allow the trees to grow taller.","They protect the trees from insect damage.","They give the soil time to recover."],0,"","食物少的年份，老鼠等動物活下來的少。"),
  Q("nl01c","What does the professor say about how trees coordinate masting?",["Weather conditions may cause many trees to flower at once.","Trees release chemicals that warn other trees.","Animals carry seeds from tree to tree.","Older trees control the timing for younger ones."],0,"","溫暖乾燥的春天可能讓很多樹同時開花。"),
  Q("nl01d","Why does the professor mention Lyme disease?",["To show that masting can have effects beyond the forest","To explain why mice avoid oak forests","To describe a disease that kills oak trees","To argue that mast years should be prevented"],0,"","大豐收 → 隔年老鼠變多 → 傳播萊姆病的蜱變多：影響到人類。")
]),
LG("nl02","l4","Listen to part of a talk in an art history class.",[
  "MB: Let's look at fresco painting, which was the dominant technique for wall paintings in Renaissance Italy. The word fresco means fresh in Italian, and that refers to the plaster. In true fresco, the artist paints with pigments mixed only with water onto wet lime plaster. As the plaster dries, a chemical reaction occurs: the lime combines with carbon dioxide in the air and forms a hard crystalline layer that locks the pigment in place. The color literally becomes part of the wall, which is why frescoes can survive for centuries.",
  "MB: But this technique made enormous demands on the artist. Once the plaster was applied, the painter had maybe a day before it dried. So artists divided their work into sections called giornate, Italian for days, and only plastered as much wall as they could paint in one session. On the Sistine Chapel ceiling, conservators have identified the boundaries of hundreds of these daily patches.",
  "MB: Mistakes were also hard to fix. You couldn't just paint over an error; you had to chip away the plaster and start that section again. Some artists avoided this pressure by painting on dry plaster, a method called fresco secco, which let them work more slowly and use a wider range of colors. The problem is that paint applied this way sits on the surface instead of bonding with it, so it tends to flake off over time. In many old murals, the details that have disappeared are the ones that were added secco."
],[
  Q("nl02a","What makes true fresco paintings so long-lasting?",["The pigment becomes chemically bound into the plaster.","Artists covered them with a protective varnish.","The pigments were mixed with oil.","They were painted on stone rather than plaster."],0,"","石灰和二氧化碳反應形成結晶層，把顏料鎖在牆裡。"),
  Q("nl02b","Why does the professor mention the Sistine Chapel ceiling?",["To give evidence of how artists divided their work into daily sections","To give an example of a fresco painted secco","To show that frescoes rarely contain mistakes","To explain why frescoes fade in sunlight"],0,"","修復人員在上面辨認出幾百個「一天一塊」的邊界。"),
  Q("nl02c","According to the professor, why did some artists choose fresco secco?",["It gave them more time and more color choices.","It was more durable than true fresco.","It required less plaster.","It was easier to remove later."],0,"","work more slowly and use a wider range of colors。"),
  Q("nl02d","What can be inferred about details missing from old murals?",["They were probably painted after the plaster had dried.","They were removed by conservators.","They were painted on wet plaster with water-based pigments.","They were never part of the original design."],0,"","消失的細節多半是 secco（乾壁）加上去的，顏料只附著在表面。")
]),
LG("nl03","l4","Listen to part of a talk in a psychology class.",[
  "W: Have you ever spilled coffee on your shirt before an important meeting and felt like everyone was staring at it all day? Psychologists have a name for that feeling: the spotlight effect. It's our tendency to overestimate how much other people notice our appearance and behavior.",
  "W: In one well-known study, researchers asked college students to put on a T-shirt with a large picture of a singer that most students considered embarrassing. Then each student walked into a room where other students were filling out questionnaires. Afterward, the shirt wearers were asked to estimate how many people in the room had noticed the shirt. On average, they guessed about half. In reality, fewer than a quarter could remember it.",
  "W: So why do we fall into this trap? One explanation is anchoring. We're intensely aware of ourselves. Our own experience is the anchor, and we don't adjust enough when we imagine other people's perspective. We forget that they're mostly focused on themselves, worrying about their own coffee stains, so to speak.",
  "W: The spotlight effect isn't limited to appearance. People also overestimate how much others notice their mistakes during a presentation, or how obvious their nervousness is. And this has practical consequences. If you believe everyone will notice every error, you might avoid speaking up in class or volunteering for leadership roles. Simply knowing that others pay less attention than you think can make social situations less stressful."
],[
  Q("nl03a","What is the spotlight effect?",["The belief that others notice us more than they actually do","The tendency to focus on other people's mistakes","The fear of speaking in front of large groups","The habit of copying popular people's behavior"],0,"","overestimate how much other people notice our appearance and behavior。"),
  Q("nl03b","What did the T-shirt study show?",["The wearers overestimated how many people noticed the shirt.","Most observers found the shirt embarrassing.","Students remembered faces better than clothing.","The wearers became more confident over time."],0,"","猜一半的人注意到，實際不到四分之一。"),
  Q("nl03c","According to the professor, why does the spotlight effect occur?",["People rely too much on their own perspective when judging others' attention.","People enjoy being the center of attention.","Other people are naturally critical.","People have poor memories for faces."],0,"","anchoring：以自己的感受為基準，沒有充分調整成別人的角度。"),
  Q("nl03d","Why does the professor mention speaking up in class?",["To illustrate a practical consequence of the effect","To suggest that quiet students are more observant","To compare two kinds of anxiety","To explain how study participants were chosen"],0,"","以為別人會注意每個錯 → 不敢發言：實際影響。")
]),
LG("nl04","l4","Listen to part of a talk in a geology class.",[
  "MC: Today we're looking at karst landscapes, which form in areas where the bedrock is limestone. Limestone has an interesting weakness: it dissolves in weak acid. Rainwater absorbs carbon dioxide from the air and from the soil, which turns it into a weak carbonic acid. As this water seeps through cracks in the limestone, it slowly dissolves the rock, widening the cracks into channels and, over thousands of years, into underground caves.",
  "MC: At the surface, karst regions can look strange. Rivers may suddenly disappear into the ground and reappear miles away. And you get sinkholes, depressions that form when the surface collapses into an empty space below.",
  "MC: There are actually two main kinds of sinkholes. Some form gradually: the surface slowly sags as the rock beneath dissolves, creating a gentle bowl shape. These are rarely dangerous. The ones that make the news are cover-collapse sinkholes. Here, a layer of clay or sand sits on top of the limestone, and a cavity grows underneath it without any sign at the surface. The clay layer acts like a bridge, until it can't support its own weight, and it collapses suddenly, sometimes swallowing cars or even houses.",
  "MC: Human activity can make collapses more likely. When too much groundwater is pumped out, the water that once helped hold up the roof of a cavity is removed. That's why sinkhole reports often increase during droughts, when farms and cities pump heavily."
],[
  Q("nl04a","According to the professor, how does rainwater dissolve limestone?",["It becomes slightly acidic by absorbing carbon dioxide.","It freezes in cracks and breaks the rock apart.","It carries sand that wears the rock away.","It reacts with clay to form a strong acid."],0,"","雨水吸收二氧化碳 → 弱碳酸 → 溶解石灰岩。"),
  Q("nl04b","What is a key difference between the two kinds of sinkholes?",["One forms slowly, while the other can collapse without warning.","One forms in limestone, while the other forms in clay.","One appears only near rivers.","One is caused entirely by human activity."],0,"","一種慢慢下陷成碗狀；覆蓋層塌陷型則突然崩塌。"),
  Q("nl04c","Why does the professor compare the clay layer to a bridge?",["To explain how it can hide a growing cavity until it suddenly fails","To show that clay is stronger than limestone","To describe how rivers cross karst regions","To explain how engineers repair sinkholes"],0,"","黏土層撐在空洞上方，撐不住時突然崩塌。"),
  Q("nl04d","Why do sinkhole reports often increase during droughts?",["Heavy pumping removes water that helps support underground cavities.","Dry clay becomes too heavy for the limestone.","Less rain means less acid in the ground.","Rivers disappear into the ground more often."],0,"","乾旱時大量抽地下水，原本幫忙撐住洞頂的水不見了。")
]),
LG("nl05","l4","Listen to part of a talk in an economics class.",[
  "W: Let's talk about network effects, which help explain why some markets end up dominated by one or two companies. A product has a network effect when it becomes more valuable to each user as more people use it. The classic example is the telephone. If you were the only person with a phone, it would be useless. Every new person who joins makes the network more useful for everyone already on it.",
  "W: Today, network effects are everywhere: messaging apps, social media, online marketplaces. Think about a marketplace that connects buyers and sellers. More sellers attract more buyers, because there's more to choose from, and more buyers attract more sellers, because there are more potential customers. This creates a feedback loop that can make a platform grow very quickly.",
  "W: But network effects have a downside for competition. Once a platform is established, a new competitor faces what's called a cold start problem. Even if its product is better, people won't switch, because their friends or customers aren't there. So a superior product can lose to an inferior one simply because the inferior one got big first.",
  "W: That said, network effects don't guarantee permanent dominance. If switching is easy, say, if people can use several apps at once, users may drift toward a newcomer gradually. Some early social networks that once seemed unstoppable lost most of their users within a few years. So economists pay close attention not just to size, but to how costly it is for users to leave."
],[
  Q("nl05a","What is the main topic of the talk?",["How a product's value can depend on the number of its users","Why the telephone was invented","How companies set prices for online services","Why new products are usually better than old ones"],0,"","network effect：用的人越多，對每個使用者越有價值。"),
  Q("nl05b","Why does the professor describe a marketplace for buyers and sellers?",["To illustrate how growth on each side can reinforce the other","To show that marketplaces have no network effects","To compare online and physical stores","To argue that sellers benefit more than buyers"],0,"","賣家多吸引買家、買家多吸引賣家 → 回饋循環。"),
  Q("nl05c","According to the professor, what is the cold start problem?",["A new platform struggles to attract users because others are not using it yet.","A product works poorly when it is first released.","Users forget their passwords after a long break.","Companies lack money for advertising at first."],0,"","即使產品比較好，朋友或客戶不在上面，大家就不會換。"),
  Q("nl05d","What does the professor imply about some early social networks?",["Their size did not protect them because users could switch easily.","They failed because they had no network effects.","They were inferior to the telephone.","They were bought by larger competitors."],0,"","轉換容易時，大平台也會流失使用者；重點是離開的成本。")
]),

/* ---------- Writing・Build a Sentence（frame 裡的 _ 是空格；固定的字可能在句中） ---------- */
BS("nb01","w1","I'm thinking about signing up for the writing workshop.","Do you know _ _ _ _ _ _ still open?",["if","registration","for","the","workshop","is"],["does"],"間接問句 Do you know if＋主詞＋動詞，不倒裝；does 用不到。"),
BS("nb02","w1","What did Maria ask you after class?","She _ _ _ _ _ _ _ on the exam.",["wanted","to","know","which","chapters","would","be"],["did"],"轉述問句：wanted to know＋which chapters would be（時態後退、不倒裝）。"),
BS("nb03","w1","So, have you decided on an apartment yet?","_ _ _ _ _ _ yesterday is too far from campus.",["The","apartment","that","we","looked","at"],["where"],"關係子句 that we looked at 修飾 apartment；look at 的 at 不能少，所以不能用 where。"),
BS("nb04","w1","Is anyone covering the late shift at the food bank?","None _ _ _ _ _ _ for the late shift yet.",["of","the","volunteers","have","signed","up"],["any"],"None of the＋複數名詞＋have p.p.；sign up for＝報名。"),
BS("nb05","w1","How was the review session last night?","Actually, I _ _ _ _ because _ _.",["wasn't","able","to","attend","of","work"],["for"],"be able to＋原形；because of＋名詞。"),
BS("nb06","w1","I need a quiet place to study over the holiday.","Have you heard _ _ _ _ _ _ _ the break?",["whether","the","library","will","be","open","during"],["is"],"whether＋主詞＋will be，間接問句不倒裝。"),
BS("nb07","w1","Are you joining the study group this semester?","Probably not. _ _ _ _ _ _ for me.",["The","schedule","they","proposed","doesn't","work"],["proposing"],"The schedule (that) they proposed 省略關係代名詞；主詞是 schedule，用 doesn't。"),
BS("nb08","w1","Can I help you find something?","Yes, could you tell me _ _ _ _ _ _?",["where","the","nearest","copy","center","is"],["does"],"間接問句：where＋主詞＋is（is 放最後）。"),
BS("nb09","w1","What did you learn in the research skills session?","The professor emphasized _ _ _ _ _ _ _ _.",["how","important","it","is","to","cite","every","source"],["what"],"emphasized how important it is to…：how＋形容詞＋it is＋不定詞。"),
BS("nb10","w1","How did you hear about this internship?","I _ _ _ _ _ a friend of mine.",["found","out","about","it","through"],["by"],"find out about it through someone＝透過某人得知。"),
BS("nb11","w1","Wow, the room is completely full!","We _ _ _ _ _ _ _ _ up.",["did","not","expect","so","many","people","to","show"],["much"],"expect＋人＋to＋原形；people 可數，用 many。"),
BS("nb12","w1","I'm choosing between the meal plan and cooking for myself.","_ _ _ _ _ do you think _ _ _?",["Which","of","the","two","options","is","more","affordable"],["are"],"插入 do you think 的問句：Which of the two options do you think is…（後面不倒裝）；主詞是 which，用 is。"),
BS("nb13","w1","How can I get to the stadium from here?","_ _ _ _ _ the stadium leaves every twenty minutes.",["The","bus","that","goes","to"],["who"],"關係代名詞修飾物用 that／which，不能用 who。"),
BS("nb14","w1","What did your lab partner want?","She asked _ _ _ _ _ _ _.",["whether","I","had","finished","the","reading","assignment"],["did"],"轉述 yes/no 問句：asked whether＋主詞＋had p.p.。"),
BS("nb15","w1","Did you get tickets for the concert?","Unfortunately, _ _ _ _ _ _ by the time I called.",["the","tickets","had","already","sold","out"],["have"],"by the time＋過去式，主要子句用過去完成式 had sold out。",["the tickets had sold out already"]),
BS("nb16","w1","I can't work this weekend because of a family event.","Have you asked _ _ _ _ _ _?",["whether","anyone","can","cover","your","shift"],["does"],"asked whether＋主詞＋can＋原形；cover a shift＝代班。"),
BS("nb17","w1","There's still a seat in the 8 a.m. biology section.","I'd rather _ _ _ _ _ _ _ eight in the morning.",["not","take","a","class","that","starts","at"],["to"],"would rather not＋原形動詞（不加 to）。"),
BS("nb18","w1","How did the experiment turn out?","The results _ _ _ _ _ _ _ hoped.",["were","not","as","convincing","as","we","had"],["more"],"not as＋形容詞＋as we had hoped＝不如預期。"),
BS("nb19","w1","Is there anything I can do to help you get ready for exams?","_ _ _ _ _ _ is a quiet place to study.",["What","I","need","most","right","now"],["Which"],"名詞子句 What I need most right now 當主詞。",["What I most need right now"]),
BS("nb20","w1","I just finished my final exam.","Do you know _ _ _ _ _ _ online?",["when","the","results","will","be","posted"],["are"],"間接問句＋被動語態：when the results will be posted。"),
BS("nb21","w1","Were you able to sit near the front at the lecture?","No, there _ _ _ _ _ _ in the back of the hall.",["were","only","a","few","seats","left"],["little"],"seats 可數，用 a few；there were only a few seats left。"),
BS("nb22","w1","Why was your landlord calling the construction company?","He _ _ _ _ _ _ _ _ would take.",["wanted","to","find","out","how","long","the","renovation"],["does"],"find out how long the renovation would take：間接問句不倒裝。"),
BS("nb23","w1","Is your group ready to submit the report?","Not quite. _ _ _ _ _ _ with the conclusion.",["Not","everyone","in","our","group","agrees"],["agree"],"everyone 是單數，動詞用 agrees。"),
BS("nb24","w1","I'm sorry, but something came up and I can't meet tomorrow.","No problem. Would it be _ _ _ _ _ _ Thursday?",["possible","to","reschedule","our","meeting","for"],["rescheduling"],"Would it be possible to＋原形動詞？"),
BS("nb25","w1","You can return the textbook as long as you have the receipt.","The problem is that I _ _ _ _ _ the receipt.",["can't","remember","where","I","put"],["did"],"remember where I put…：間接問句不倒裝，不用 did。"),

/* ---------- Writing・Write an Email（7 分鐘） ---------- */
EM("ne01","w2","You are taking an evening course in digital design at a community college. Because your work schedule has changed, you can no longer attend class on Wednesdays, which is when the course meets. Write an email to your instructor, Mr. Hayes. In your email, do the following:",
  ["Explain your situation.","Ask about options for completing the course.","Suggest a way you could keep up with the class."],
  "Mr. Hayes","Schedule conflict with Wednesday classes",
  "Dear Mr. Hayes,\nI hope you are doing well. I am writing because my situation has changed in a way that affects your Wednesday evening digital design course. Last week, my employer moved me to a new shift, and starting next month I will be working until 9 p.m. on Wednesdays. Unfortunately, that means I will not be able to attend class in person for the rest of the term.\nI really enjoy the course and would prefer not to withdraw, so I was wondering what options might be available. For example, is it possible to submit the weekly projects online, or to join another section that meets on a different evening?\nIf it would help, I could watch the recorded lectures each week and send you my questions by Friday. I would also be happy to attend your office hours on Mondays to make sure I am keeping up.\nThank you for considering my request. I look forward to hearing from you.\nBest regards,\nJamie Lin",
  "開頭說明來意、交代具體原因（換班到幾點）；提問用 I was wondering… 比較有禮貌；建議要具體（看錄影、週五前寄問題、週一 office hours）。"),
EM("ne02","w2","You live in an apartment building. For the past two weeks, construction work in a nearby unit has started before 7:00 a.m., which is earlier than the building rules allow. Write an email to the building manager, Ms. Lee. In your email, do the following:",
  ["Describe the problem.","Explain how it is affecting you.","Ask for a specific solution."],
  "Ms. Lee","Early-morning construction noise in Unit 5B",
  "Dear Ms. Lee,\nI am a resident of Unit 5C, and I am writing about the renovation work in the apartment next door, 5B. For the past two weeks, the workers have started drilling and hammering at around 6:30 every morning, including Saturdays. As far as I know, the building rules say that construction may not begin before 8:00 a.m.\nThe noise has been difficult for me because I work late shifts at a hospital and usually do not get home until 2 a.m. Since the work began, I have been getting only about four hours of sleep, and I am finding it hard to concentrate at work.\nI understand that the renovation needs to be finished, but could you please remind the contractor about the permitted hours? If the schedule is tight, perhaps they could do the loudest work in the afternoon instead.\nThank you for your help. Please let me know if you need any more information.\nSincerely,\nAlex Moreno",
  "抱怨信要客觀：說明時間、頻率、規定；說明影響要具體（夜班、只睡四小時）；最後提出明確可行的解決辦法。"),
EM("ne03","w2","Your university's environmental club is planning its annual fundraising event. The club president, Daniel, has asked members to share ideas. Write an email to Daniel. In your email, do the following:",
  ["Suggest an idea for the event.","Explain why you think it would be successful.","Offer to help with one specific task."],
  "Daniel","Idea for this year's fundraiser",
  "Hi Daniel,\nThanks for asking for ideas for this year's fundraiser. I'd like to suggest a campus clothing swap. Students could donate clothes they no longer wear and pay a small entry fee, maybe five dollars, to take home anything they like.\nI think it would work well for a few reasons. First, it fits our club's message, since reusing clothes keeps them out of landfills. Second, it costs almost nothing to organize, so nearly all of the entry fees would go directly to our projects. Also, a lot of students are trying to save money right now, so I think the event would attract people who don't normally come to environmental events.\nIf you like the idea, I'd be happy to handle the publicity. I've designed posters for my residence hall before, and I could also create a short video for the club's Instagram account.\nLet me know what you think!\nBest,\nSara",
  "寫給同學語氣可以輕鬆；理由要有層次（First, Second, Also），提供協助要說明自己的相關經驗。"),
EM("ne04","w2","You recently ordered a desk chair from an online store called ComfortWorks. When it arrived, one part was missing, and the assembly instructions did not match the chair. Write an email to the company's customer support team. In your email, do the following:",
  ["Describe the problem with your order.","Explain what you have already tried.","Say what you would like the company to do."],
  "ComfortWorks Customer Support","Order #48213 – missing part and wrong instructions",
  "Dear Customer Support Team,\nI am writing about my order #48213, an ErgoFlex desk chair that was delivered on March 3. When I opened the box, I found that the gas cylinder, which connects the seat to the base, was missing. In addition, the instructions in the box are for a different model, so several of the diagrams do not match the parts I received.\nBefore contacting you, I checked all of the packaging carefully to make sure the part had not been taped inside. I also searched your website for the correct instructions, but I could not find a manual for this model.\nSince I work from home and need the chair for my job, I would appreciate it if you could send the missing cylinder by express delivery, along with the correct instructions or a link to them online. If that is not possible, I would like to return the chair for a full refund.\nThank you for your prompt attention to this matter.\nSincerely,\nMorgan Patel",
  "客訴信：先給訂單資訊、清楚描述問題；說明自己已經做過的處理；提出明確要求並給替代方案。"),

/* ---------- Writing・Academic Discussion（10 分鐘） ---------- */
AD("nx01","w3","urban studies",
  ["Dr. Alvarez","Several cities around the world have made public buses and trains completely free to use. Supporters say free transit reduces traffic and helps people with low incomes, while critics argue that the money would be better spent improving the service itself. Should cities make public transportation free? Why or why not?"],
  [["Kenji","I think it should be free. If people don't have to pay, more of them will leave their cars at home, which means less traffic and less pollution. It also helps people who struggle to afford daily fares."],
   ["Sofia","I disagree. In my city, the bus fare isn't the problem; the buses only come every forty minutes. If transit became free, the city would lose income and probably cut service even more. Better service would attract more riders than free rides."]],
  "I agree with Sofia that improving service should come before eliminating fares, but I would put the argument slightly differently. The real question is what actually changes people's habits. Most drivers do not choose their cars because bus tickets are expensive; they choose them because driving is faster and more reliable. If a free bus still takes an hour to cross the city, very few commuters will switch. In addition, fares provide a stable source of funding that can be used to add routes and run buses more frequently. That said, Kenji raises a valid concern about low-income residents. Instead of making transit free for everyone, cities could offer reduced or free passes to students, seniors, and people below a certain income level. This approach would protect those who need help most while keeping enough revenue to make the system genuinely convenient for everyone.",
  "先表明立場並回應同學（同意 Sofia、承認 Kenji 的論點），再提出「新的角度」（真正影響習慣的是速度與可靠度），最後給折衷方案。"),
AD("nx02","w3","education",
  ["Dr. Chen","Some educators argue that traditional final exams should be replaced with project-based assessments, such as research reports, presentations, or creative products. Others believe exams remain the fairest way to measure what students have learned. Which form of assessment do you think is more effective for university courses, and why?"],
  [["Liam","Projects are better because they're closer to real life. In a job, nobody asks you to memorize facts for a two-hour test. Projects show whether you can actually use what you learned."],
   ["Priya","I still prefer exams. With group projects, it's hard to tell who did the work, and some students end up carrying the whole team. An exam measures each person individually."]],
  "In my view, the best approach is not to choose one format but to match the assessment to the goal of the course. Liam is right that projects test whether students can apply knowledge, which matters a great deal in fields like engineering or design. However, Priya's concern about fairness is serious, and it applies to more than group work: projects also reward students who have more free time or better resources at home. Exams, by contrast, put everyone under the same conditions. For courses that build basic knowledge, such as introductory statistics, a well-designed exam is probably the most accurate measure. For advanced courses, an individual project, rather than a group one, would combine the realism Liam wants with the accountability Priya values. For example, in my economics seminar, each student analyzes a different real data set, so the work is practical but clearly their own.",
  "高分寫法：不簡單二選一，而是提出條件式立場（依課程目標），並分別吸收兩位同學的論點、指出新的問題（資源不平等），再用自己的例子收尾。"),
AD("nx03","w3","business",
  ["Dr. Okoye","Some career experts advise young professionals to stay with one employer for several years in order to build deep skills and a strong reputation. Others recommend changing jobs every year or two early in one's career to gain a variety of experiences and higher pay. Which approach do you think is better for someone starting their career? Explain your reasoning."],
  [["Emma","Changing jobs is the smarter move. Every new job means a new set of skills and usually a raise. Staying in one place too long can make you look unambitious."],
   ["Jacob","I'd stay longer. It takes time to understand a company well enough to do important work. If you leave after a year, you never get past the training stage."]],
  "I lean toward Jacob's position, although Emma makes a fair point about salary. Changing jobs frequently may increase pay in the short term, but early in a career, the most valuable thing a person can gain is responsibility, and responsibility usually comes with trust that takes time to build. Someone who stays three or four years is more likely to lead a project, manage a client, or train new employees, and these experiences make a resume far more impressive than a list of short positions. Moreover, employers reviewing applicants often worry that a candidate who has left every job after a year will leave them too. Of course, there are exceptions: if a job offers no chance to learn or advance, leaving is reasonable. But as a general strategy, I believe depth matters more than variety at the start of a career, because the skills and relationships built over several years create better opportunities later.",
  "清楚選邊，同時承認對方的優點（薪資）；用「責任需要時間建立的信任」這個新理由；加入雇主的觀點與例外情況，論證更完整。"),
AD("nx04","w3","environmental policy",
  ["Dr. Hansen","Several governments have announced plans to ban the sale of new gasoline-powered cars by 2035 in order to reduce carbon emissions. Some people support this kind of firm deadline, while others think governments should let the market decide when consumers are ready to switch to electric vehicles. What is your opinion? Should governments set a deadline to end the sale of gasoline cars?"],
  [["Marco","Yes, a deadline is necessary. Without one, car companies will keep making gasoline cars as long as they're profitable. A clear date forces the whole industry to invest in cleaner technology."],
   ["Aiyana","I'm not convinced. Electric cars are still expensive, and many rural areas don't have enough charging stations. Forcing people to switch before the infrastructure is ready could hurt families who depend on their cars."]],
  "I support a deadline, but only if it comes with a plan to address the problems Aiyana describes. Marco is correct that companies respond to clear rules: when manufacturers know exactly when gasoline cars can no longer be sold, they can confidently invest in batteries and factories, and those investments are what will eventually make electric cars cheaper. Without a deadline, each company has a reason to wait for its competitors to take the risk first. However, a ban that simply arrives in 2035 without preparation would be unfair to rural drivers. Governments should therefore use the years before the deadline to build charging networks along highways and in small towns, and to offer subsidies for lower-income buyers. It is also important to remember that the ban would apply only to new cars, so people could still drive and buy used gasoline vehicles for many years, which reduces the burden on families during the transition.",
  "立場是「支持，但有條件」；解釋 deadline 為何有效（企業投資的邏輯），回應反方的疑慮並提出配套，最後補上一個同學沒提到的重點（只限新車）。"),

/* ---------- Speaking・Listen and Repeat（每組 7 句，越來越長） ---------- */
SR("ns01","s1","You are a new student worker at a university library. Listen to your supervisor and repeat what she says.","W: Welcome to the circulation desk."),
SR("ns02","s1","You are a new student worker at a university library. Listen to your supervisor and repeat what she says.","W: Returned books go on the cart behind you."),
SR("ns03","s1","You are a new student worker at a university library. Listen to your supervisor and repeat what she says.","W: Please check that every book has a barcode."),
SR("ns04","s1","You are a new student worker at a university library. Listen to your supervisor and repeat what she says.","W: Students need their ID card to borrow a laptop."),
SR("ns05","s1","You are a new student worker at a university library. Listen to your supervisor and repeat what she says.","W: If the printer runs out of toner, call the technology office."),
SR("ns06","s1","You are a new student worker at a university library. Listen to your supervisor and repeat what she says.","W: Reserve materials can only be used inside the library for two hours."),
SR("ns07","s1","You are a new student worker at a university library. Listen to your supervisor and repeat what she says.","W: At closing time, make sure the study rooms are empty before you lock the doors."),
SR("ns08","s1","You are volunteering at a city science museum. Listen to the exhibit coordinator and repeat what he says.","MB: The planetarium show starts every hour."),
SR("ns09","s1","You are volunteering at a city science museum. Listen to the exhibit coordinator and repeat what he says.","MB: Visitors may not touch the fossil display."),
SR("ns10","s1","You are volunteering at a city science museum. Listen to the exhibit coordinator and repeat what he says.","MB: Please direct school groups to the east entrance."),
SR("ns11","s1","You are volunteering at a city science museum. Listen to the exhibit coordinator and repeat what he says.","MB: The interactive weather station is on the second floor."),
SR("ns12","s1","You are volunteering at a city science museum. Listen to the exhibit coordinator and repeat what he says.","MB: Remind parents that strollers aren't allowed in the theater."),
SR("ns13","s1","You are volunteering at a city science museum. Listen to the exhibit coordinator and repeat what he says.","MB: If a child gets separated from their group, bring them to the front desk."),
SR("ns14","s1","You are volunteering at a city science museum. Listen to the exhibit coordinator and repeat what he says.","MB: Before the museum opens, check that all the touch screens are working properly."),
SR("ns15","s1","You are attending an orientation at a community garden. Listen to the garden manager and repeat what she says.","WA: Tools are kept in the green shed."),
SR("ns16","s1","You are attending an orientation at a community garden. Listen to the garden manager and repeat what she says.","WA: Please water your plot early in the morning."),
SR("ns17","s1","You are attending an orientation at a community garden. Listen to the garden manager and repeat what she says.","WA: Compost goes in the bins next to the fence."),
SR("ns18","s1","You are attending an orientation at a community garden. Listen to the garden manager and repeat what she says.","WA: Each member is responsible for weeding their own plot."),
SR("ns19","s1","You are attending an orientation at a community garden. Listen to the garden manager and repeat what she says.","WA: Chemical pesticides aren't allowed anywhere in the garden."),
SR("ns20","s1","You are attending an orientation at a community garden. Listen to the garden manager and repeat what she says.","WA: If you'll be away for more than a week, ask a neighbor to water for you."),
SR("ns21","s1","You are attending an orientation at a community garden. Listen to the garden manager and repeat what she says.","WA: Vegetables that you can't use yourself can be donated to the food bank on Fridays."),

/* ---------- Speaking・Take an Interview（每組 4 題，每題約 45 秒） ---------- */
SI("ni01","s2","A researcher from your university is studying how students manage their time. She will ask you some questions.","W: Thanks for joining. To start, could you describe a typical weekday for you, and tell me which part of the day you're most productive?",
  "Sure. On a typical weekday, I have classes from about nine until two, and then I usually go to the library for a few hours before dinner. In the evening, I do lighter things, like reviewing notes or answering emails. I'm definitely most productive in the late morning, around ten or eleven. By then I'm fully awake, but I'm not tired yet, so if I have something difficult, like a problem set for my statistics class, I try to schedule it before lunch. After about eight at night, my concentration drops a lot, so I avoid starting anything important then.",
  "先描述一天的安排，再明確回答「哪個時段最有效率」並說明原因、舉具體例子。"),
SI("ni02","s2","A researcher from your university is studying how students manage their time. She will ask you some questions.","W: Many students say they procrastinate. When you put off an important task, what is usually the reason, and how do you get yourself started again?",
  "Honestly, when I procrastinate, it's usually because the task feels too big, and I don't know where to begin. For example, last semester I kept delaying a research paper because I imagined the whole twelve pages at once. What helps me is breaking the task into very small steps. Instead of writing the paper, my goal for the day might just be to find three sources or write the introduction. Once I finish a small step, I feel some momentum, and it's much easier to keep going. I also tell a friend what I plan to finish, because I don't want to admit later that I didn't do it.",
  "兩個問題都要回答：原因（任務太大）＋方法（拆成小步驟、找人監督），加上自己的實例。"),
SI("ni03","s2","A researcher from your university is studying how students manage their time. She will ask you some questions.","W: Some universities now require first-year students to take a workshop on time management. Do you think that's a good idea? Why or why not?",
  "I think it's a good idea, as long as the workshop is practical. Many first-year students have never had to organize their own schedules, because in high school, teachers and parents did a lot of that for them. Suddenly they have much more free time and much less supervision, and it's easy to fall behind before they even notice. A short workshop could teach simple tools, like using a weekly planner or estimating how long assignments really take. However, if it's just a long lecture about why time management matters, students will probably ignore it. So I'd support it if it's short and hands-on.",
  "表明立場＋理由（高中到大學的轉變）＋條件（要實用），讓回答有層次。"),
SI("ni04","s2","A researcher from your university is studying how students manage their time. She will ask you some questions.","W: Looking ahead, do you think tools like AI planning apps will make students better or worse at managing their own time? Please explain.",
  "I think they could go either way, but overall I expect them to make students better at it. An AI planner can notice patterns that people miss. For instance, it might see that I always underestimate how long lab reports take and automatically give me more time. That kind of feedback could teach students to plan more realistically. The risk is that some students might depend on the app completely and never learn to set priorities themselves. So I think the best approach is to use these tools as a coach rather than a boss: let them make suggestions, but make the final decisions yourself.",
  "預測題可以先說「兩面都有可能」，再給出自己的傾向、例子和風險，最後提出建議。"),
SI("ni05","s2","You are taking part in a survey about public spaces in your city. An interviewer will ask you some questions.","MC: Let's begin. Is there a park or other public space near your home that you visit often? What do you usually do there?",
  "Yes, there's a riverside park about ten minutes from my apartment, and I go there at least three times a week. Usually I go running along the path by the river in the early morning, when it's cool and not crowded. On weekends, I sometimes bring a book and sit on the benches near the water, or meet friends for a picnic. What I like most is that it feels much quieter than the rest of the city, even though it's very close to downtown. It's kind of my place to relax after a stressful week.",
  "具體說出地點、頻率、活動和感受，比只回答 Yes 更完整。"),
SI("ni06","s2","You are taking part in a survey about public spaces in your city. An interviewer will ask you some questions.","MC: If your city had money to improve one public space, what would you want it to change, and why?",
  "I'd want the city to improve the main bus station downtown. Thousands of people pass through it every day, but it's in pretty bad shape. There aren't enough seats, the lighting is poor at night, and there's almost no shelter when it rains. I'd add covered waiting areas, better lighting, and digital screens showing when each bus will arrive. I think this would be a better investment than, say, a new statue or fountain, because it would make daily life easier for a huge number of people, including elderly people and students who depend on public transportation.",
  "選一個地方、說明現在的問題、提出具體改善，並比較其他選項說明為什麼值得。"),
SI("ni07","s2","You are taking part in a survey about public spaces in your city. An interviewer will ask you some questions.","MC: Some people believe public libraries are less important now that so much information is available online. What's your opinion?",
  "I disagree with that idea. It's true that people can find a lot of information online, but libraries do much more than store books. For many people, a library is the only quiet place where they can study or work for free, and it also provides computers and internet access to people who don't have them at home. In my neighborhood library, there are also free language classes and homework help for kids. Plus, librarians can teach people how to tell reliable information from unreliable sources, which is actually more important now than ever because there's so much misinformation online.",
  "反駁時先承認對方部分有理（網路資訊多），再列出圖書館其他功能，最後用「現在更重要」翻轉論點。"),
SI("ni08","s2","You are taking part in a survey about public spaces in your city. An interviewer will ask you some questions.","MC: Finally, should cities ban cars from some downtown streets to create pedestrian-only areas? What would be the advantages and disadvantages?",
  "I think it's worth doing on a few streets. The biggest advantage is that pedestrian areas are safer and more pleasant, so people tend to stay longer and spend more money at local shops and cafes. They also reduce noise and air pollution in the busiest part of the city. On the other hand, there are real disadvantages. Businesses that depend on deliveries might have trouble, and people with disabilities or elderly people could find it harder to reach the area. So I'd support it if the city allows delivery vehicles at certain hours and makes sure there's good public transportation and parking nearby."
  ,"題目要求優點＋缺點，兩邊都要講到，最後給出有條件的結論。")
);
