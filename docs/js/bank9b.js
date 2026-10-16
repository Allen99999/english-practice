/* ===== 九下（國三下）全冊 ===== */
BANKS.push({
  id: "hl9b-all", grade: 9.2,
  title: "九下 全冊",
  range: "翰林版 Unit 1 ~ Unit 4（國三下）",
  added: "2026-10-17",
  note: "So do I / Neither do I、neither…nor / either…or / both…and、動名詞與 It is…to V、片語動詞與總複習；主題：生涯、專注力、AI、公民參與",
  exams: [
    { name: "第一次段考", tags: ["c1", "c2"] },
    { name: "第二次段考", tags: ["c3", "c4"] }
  ],
  tags: {
    c1: "U1 So do I / Neither do I・生涯",
    c2: "U2 neither…nor / either…or / both…and",
    c3: "U3 動名詞主詞・It is…to V・AI",
    c4: "U4 片語動詞・被動與子句複習・公民"
  },
  items: [
  /* U1 */
  M("ca1","c1","Ann is nervous about the exam, and so ___ I.",["am","do","is","was"],0,"前面用 be 動詞 is。","So + be 動詞 + 主詞：and so am I。"),
  M("ca2","c1","Leo: I don't like math.\nMia: Neither ___ my brother.",["does","is","do","doesn't"],0,"前句一般動詞否定；主詞 my brother 單數。","Neither does my brother（他也不喜歡）。"),
  M("ca3","c1","Ken can play the guitar, and so ___ his sister.",["can","does","is","can't"],0,"前面用助動詞 can。","so + can + 主詞。"),
  M("ca4","c1","Amy: I feel so lost about my future.\nBen: So ___ I. I don't know what to do.",["do","am","did","does"],0,"feel 是一般動詞現在式。","So do I.（我也是）"),
  M("ca5","c1","Tom didn't go to the party. Neither ___ Jerry.",["did","didn't","was","does"],0,"過去式否定。","Neither did Jerry.（neither 已經是否定，不再加 not）"),
  M("ca6","c1","Joy: I haven't decided my high school yet.\nRay: I haven't, ___.",["either","too","so","neither"],0,"否定句的「也」。","否定句「也不」用 either 放句尾。"),
  M("ca7","c1","Mina has been to Japan, and so ___ her parents.",["have","has","are","do"],0,"現在完成式；her parents 複數。","so have her parents。"),
  M("ca8","c1","What do you want to do in the ___? Have you made a plan?",["future","past","history","yesterday"],0,"做計畫是為了…","in the future（未來）。"),
  SP("cs1","c1","I'm not sure about my ___. Should I be a nurse or a designer?","career","職業生涯","career（職業、生涯）。"),
  SP("cs2","c1","Let's talk to the school ___. She can give us advice.","counselor","輔導老師","counselor（輔導老師）。"),
  SP("cs3","c1","I feel ___. I don't know what to choose.","lost","迷惘的","feel lost（感到迷惘）。"),
  T("ct1","c1","我不會游泳，我妹妹也不會。",["I {can't|cannot} swim, and neither can my {|little |younger }sister.","I {can't|cannot} swim{,|.} {and |}{n|N}either can my {|little |younger }sister.","I {can't|cannot} swim, and my {|little |younger }sister {can't|cannot}{,|} either."],"Neither can + 主詞。","I can't swim, and neither can my sister." ),
  R("cr1","c1","我喜歡畫畫，我哥哥也是。",["I like drawing,","and","so","does","my brother."],"so + does + 主詞。","I like drawing, and so does my brother." ),
  E("ce1","c1","I am tired, and so do my friends.","do","are","前面用的是 be 動詞。","前句是 am → so are my friends。"),
  /* U2 */
  M("cb1","c2","I can focus neither in the morning ___ at night.",["nor","or","and","but"],0,"neither 的搭配。","neither A nor B（既不 A 也不 B）。"),
  M("cb2","c2","You can either study now ___ study after dinner.",["or","nor","and","but"],0,"either 的搭配。","either A or B（不是 A 就是 B）。"),
  M("cb3","c2","Both Amy ___ her brother are good at math.",["and","or","nor","but"],0,"both 的搭配。","both A and B（A 和 B 都）。"),
  M("cb4","c2","Not only Tom but also his friends ___ going to the concert.",["are","is","am","be"],0,"動詞跟最靠近的主詞 his friends。","not only A but also B：動詞跟 B → his friends are。"),
  M("cb5","c2","Neither my parents nor my sister ___ at home now.",["is","are","am","be"],0,"動詞跟 nor 後面的主詞。","neither A nor B：動詞跟 B（my sister）→ is。"),
  M("cb6","c2","Either you or Ken ___ to clean the classroom today.",["has","have","are","having"],0,"動詞跟 or 後面的 Ken。","either A or B：動詞跟 B → has。"),
  M("cb7","c2","To focus better, you should put your phone away ___ you study.",["while","because of","although","unless"],0,"讀書「的時候」。","while（當…的時候）。"),
  M("cb8","c2","Taking short breaks can help you ___ on your work.",["focus","focusing","to focusing","focused"],0,"help + 人 + 原形（或 to V）。","help you focus。"),
  SP("cs4","c2","Turn off your phone so you can ___ on your homework.","focus","專注","focus on（專注於）。"),
  SP("cs5","c2","I get ___ easily when my phone rings.","distracted","分心的","distracted（分心的）。"),
  SP("cs6","c2","Take a short ___ every forty minutes.","break","休息","take a break（休息一下）。"),
  T("ct2","c2","我早上和晚上都無法專心。",["I can focus neither in the morning nor at night.","I {can't|cannot} focus {either |}in the morning or at night."],"neither ... nor ...","I can focus neither in the morning nor at night." ),
  R("cr2","c2","他不但會說英文，也會說日文。",["He","speaks","not only English","but also","Japanese."],"not only A but also B。","He speaks not only English but also Japanese." ),
  E("ce2","c2","Neither Ben or Ann likes pizza.","or","nor","neither 要搭配什麼？","neither A nor B。"),
  G("cg1","c1","dialogue","Talking to the Counselor",[
    "Ms. Lin: Hi, Ethan. You look worried. What's wrong?",
    "Ethan: I don't know which high school to choose. I feel so lost, and so do my friends.",
    "Ms. Lin: That's normal. Let's start with an easy question. What do you like doing?",
    "Ethan: I like fixing things. Last month, I fixed my grandpa's old radio. But I'm good at neither math nor physics.",
    "Ms. Lin: Being good at fixing things is a skill, too. Have you heard of vocational high schools? You can learn about machines there.",
    "Ethan: Not really. My parents want me to go to a regular high school.",
    "Ms. Lin: Then talk with them. You can either visit some schools together or join an open house this spring.",
    "Ethan: That sounds like a good idea. Thanks, Ms. Lin!"
  ],[["counselor","輔導老師"],["fix","修理"],["physics","物理"],["skill","技能"],["vocational high school","高職"],["machine","機器"],["open house","校園開放參觀日"]],[
    Q("cg1a","What is Ethan worried about?",["Choosing a high school.","His grandpa's health.","Fixing a radio.","His math homework."],0,"他一開始說的話。","I don't know which high school to choose." ),
    Q("cg1b","Which of the following is TRUE about Ethan?",["He is good at physics.","He fixed an old radio.","His friends know what to do.","His parents want him to go to a vocational school."],1,"逐一對照。","Last month, I fixed my grandpa's old radio. → (B)。他數學物理都不好（A 錯）；朋友也很迷惘（C 錯）；父母希望讀普通高中（D 錯）。"),
    Q("cg1c","What does Ms. Lin suggest?",["Ethan should stop fixing things.","Ethan should talk with his parents and visit schools.","Ethan should study physics every night.","Ethan should choose a school today."],1,"Ms. Lin 最後說的話。","Then talk with them. You can either visit some schools together or join an open house." )
  ]),
  /* U3 */
  M("cc1","c3","___ AI to do your homework is not a good idea.",["Using","Use","Used","Uses"],0,"動詞當主詞要變形。","動名詞 Using... 當主詞。"),
  M("cc2","c3","It is important ___ students to think for themselves.",["for","of","to","with"],0,"It is + adj. + ___ + 人 + to V。","It is important for sb to V。"),
  M("cc3","c3","It's easy ___ questions to a chatbot.",["to ask","asking","ask","asked"],0,"It is + adj. + to V。","It's easy to ask...（虛主詞 it）。"),
  M("cc4","c3","Learning English with AI ___ fun.",["is","are","be","were"],0,"動名詞主詞視為單數。","Learning... is fun。"),
  M("cc5","c3","AI ___ by many students to check their writing these days.",["is used","uses","is using","used"],0,"AI 是「被使用」。","被動：is used by...。"),
  M("cc6","c3","You should check the answer ___ AI gives you. It may be wrong.",["that","who","what","whom"],0,"先行詞 the answer 是物。","the answer that AI gives you。"),
  M("cc7","c3","AI has changed the way we ___.",["learn","learns","learning","learned to"],0,"the way (that) we + 動詞。","主詞 we → learn。"),
  M("cc8","c3","Don't copy the answers. You should ___ the problem yourself.",["solve","solves","solving","solved"],0,"should + 原形。","should solve。"),
  SP("cs7","c3","___ intelligence is changing our lives.","Artificial","人工的","Artificial Intelligence（人工智慧，AI）。"),
  SP("cs8","c3","Always check the ___ before you believe what AI says.","facts","事實（複數）","facts（事實）。"),
  SP("cs9","c3","AI can help you, but you need to ___ for yourself.","think","思考","think for yourself（自己思考）。"),
  T("ct3","c3","對學生來說，自己思考很重要。",["It is important for students to think for themselves.","Thinking for themselves is important for students."],"It is + adj. + for + 人 + to V。","It is important for students to think for themselves." ),
  R("cr3","c3","用 AI 學英文很有趣。",["Using AI","to learn English","is","very","interesting."],"動名詞片語當主詞。","Using AI to learn English is very interesting." ),
  E("ce3","c3","Read books every day is a good habit.","Read","Reading","動詞當主詞要怎麼變？","動名詞當主詞 → Reading。"),
  /* U4 */
  M("cd1","c4","Please fill ___ this form before you vote.",["out","on","off","up"],0,"填寫表格。","fill out（填寫）。"),
  M("cd2","c4","The meeting was put ___ because of the typhoon.",["off","on","up","out"],0,"因為颱風而延後。","put off（延期）。"),
  M("cd3","c4","Don't give ___. Keep trying!",["up","in","out","off"],0,"不要放棄。","give up（放棄）。"),
  M("cd4","c4","In Taiwan, people who are 20 or older can vote ___ the president.",["for","to","with","on"],0,"投票「給」某人。","vote for（投票給）。"),
  M("cd5","c4","We should look ___ information about each candidate before we vote.",["up","after","like","at"],0,"查詢資料。","look up（查詢）。"),
  M("cd6","c4","The class leader ___ by all the students last week.",["was chosen","chose","is choosing","choose"],0,"班長是「被選出」。","過去被動：was chosen。"),
  M("cd7","c4","Do you know ___ the vote will be held?",["when","when will","will when","when does"],0,"間接問句。","Do you know when the vote will be held?（直述句順序）"),
  M("cd8","c4","Ann: Who did you vote for?\nBen: Sorry, I'd rather not say. Voting is ___.",["secret","public","loud","noisy"],0,"不想說 → 投票是…","secret（祕密的）。秘密投票是民主選舉的原則。"),
  SP("cs10","c4","Every student can ___ for the class leader.","vote","投票","vote（投票）。"),
  SP("cs11","c4","The ___ talked about her plans for our school.","candidate","候選人","candidate（候選人）。"),
  SP("cs12","c4","We should ___ other people's choices, even if we don't agree.","respect","尊重","respect（尊重）。"),
  T("ct4","c4","請在投票前把這張表格填好。",["Please fill {out|in} this form before you vote.","Before you vote, please fill {out|in} this form."],"fill out + 表格。","Please fill out this form before you vote." ),
  R("cr4","c4","會議因為颱風延期了。",["The meeting","was","put off","because of","the typhoon."],"被動 + 片語動詞。","The meeting was put off because of the typhoon." ),
  E("ce4","c4","We should look after information before we vote.","after","up","查詢資料用哪個片語？","look up 查詢；look after 是照顧。"),
  G("cg2","c3","article","Is AI Good for Learning?",[
    "These days, many students use AI chatbots. Some use them to explain hard words, and others use them to check their writing. But is AI good for learning?",
    "On the good side, AI is fast and always ready to help. If you don't understand a math problem at midnight, you can ask a chatbot and get an answer right away.",
    "On the bad side, AI is not always right. It sometimes gives wrong facts that look true. Also, if you let AI do your homework for you, you won't learn anything yourself.",
    "So how should we use AI? First, try to solve the problem by yourself. Then ask AI for hints, not answers. After that, check what it says with your textbook or teacher. Finally, write the answer in your own words."
  ],[["chatbot","聊天機器人"],["explain","解釋"],["midnight","半夜"],["fact","事實"],["hint","提示"],["textbook","課本"]],[
    Q("cg2a","What is one good thing about AI in the reading?",["It is always right.","It can help at any time.","It does homework for you.","It writes your name."],1,"On the good side ...","always ready to help → 隨時都能幫忙。"),
    O("cg2b","Put the steps in the order they appear.",["Check what AI says with your textbook.","Ask AI for hints.","Write the answer in your own words.","Try to solve the problem by yourself."],[3,1,0,2],"First, Then, After that, Finally。","先自己解（d）→ 問 AI 提示（b）→ 對照課本（a）→ 用自己的話寫（c）。"),
    Q("cg2c","What does the writer think?",["Students should never use AI.","AI can help, but students should still think for themselves.","AI is always better than teachers.","Students should let AI do their homework."],1,"整篇的結論。","作者認為 AI 有好處也有壞處，要用對方法、自己思考。")
  ]),
  X("cx1","c2","把句子的前半配對到正確的後半。",["Both Ann","Either you","Neither he","Not only Tom"],["and Ben like music.","or I will go.","nor she is here.","but also Joe is tall."],"看連接詞的搭配。","both...and、either...or、neither...nor、not only...but also。"),
  X("cx2","c4","把片語動詞配對到中文意思。",["give up","fill out","put off","look up","take care of","turn down"],["放棄","填寫","延期","查詢","照顧","拒絕；調小聲"],"想想每個片語的例句。","give up 放棄、fill out 填寫、put off 延期、look up 查詢、take care of 照顧、turn down 拒絕／調小聲。"),
  D("cq1","c1","Ray","major",["In college, my cousin's major is computer science.","She wants to make games in the future."],["Very important.","The main subject you study in college.","An officer in the army.","Bigger than others."],1,"在大學裡讀的是…","major = 主修科目。major 也可當形容詞「主要的、重大的」(A)。"),
  D("cq2","c3","Mia","smart",["Smart phones can help us learn,","but they can also take away our time."],["Clever and quick to learn.","Connected to the Internet and able to do many things.","Wearing nice clothes.","Feeling pain."],1,"smart phones 指的是哪一種手機？","smart phone = 智慧型手機；smart 也有「聰明的」(A) 的意思。")
  ]
});
