/* ===== 八上 Unit 3 ~ Unit 6（補完全冊） ===== */
(() => {
const b = bank("hl8a-m1");
b.title = "八上 全冊";
b.range = "翰林版 Unit 1 ~ Unit 6（國二上）";
b.note = "第一次段考依原考卷題型改編；Unit 3~6：過去進行式、職業與未來、交通與問路、購物與 will";
Object.assign(b.tags, {
  e3: "U3 過去進行式・when / while",
  e4: "U4 職業・want to / be going to",
  e5: "U5 交通・問路・How long does it take",
  e6: "U6 購物・will・spend / cost / pay"
});
b.exams = [
  { name: "第一次段考", tags: ["weather", "give", "poss", "phone", "clause", "past", "vocab", "reading"] },
  { name: "第二次段考", tags: ["e3", "e4"] },
  { name: "第三次段考", tags: ["e5", "e6"] }
];
b.items.push(
  /* U3 */
  M("ea1","e3","Mom ___ the dishes at half past twelve last night.",["is doing","was doing","did","does"],1,"某個過去時間點「正在」做。","過去某時刻正在進行 → 過去進行式 was doing。"),
  M("ea2","e3","Ann: What ___ you doing at 9:00 last night?\nBen: I was taking a shower.",["are","was","were","did"],2,"主詞 you。","What were you doing...? you 搭配 were。"),
  M("ea3","e3","When the phone rang, I ___ dinner.",["cooked","was cooking","am cooking","cook"],1,"電話響時，我「正在」煮飯。","短動作 when + 過去式，長動作用過去進行式 was cooking。"),
  M("ea4","e3","My sister was sleeping ___ I was doing the laundry.",["while","when the","because","so"],0,"兩件事同時在進行。","while 連接兩個同時進行的動作。"),
  M("ea5","e3","Ken was watching TV ___ his mom came home.",["while","when","during","so"],1,"後面是短暫動作 came home。","when + 短暫動作（過去式）；while 多接進行中的動作。"),
  M("ea6","e3","Joy: Were you sweeping the floor at that time?\nAmy: No, I ___. I was taking out the trash.",["wasn't","weren't","didn't","am not"],0,"Were you ...? 回答用 I。","No, I wasn't." ),
  M("ea7","e3","It ___ hard when we left the house.",["rained","was raining","is raining","rains"],1,"出門那時正在下大雨。","過去某時正在下雨 → was raining。"),
  M("ea8","e3","I had a bad dream last night. A big dog ___ me!",["was chasing","is chasing","chases","chase"],0,"夢裡的那時候正在追。","過去進行式 was chasing。"),
  SP("es1","e3","I always help my mom do the ___ on weekends.","housework","家事","housework（家事），不可數。"),
  SP("es2","e3","I had a ___ last night. I was so scared.","nightmare","惡夢","nightmare（惡夢）。"),
  SP("es3","e3","Please ___ the floor. It's dirty.","sweep","掃（地）","sweep the floor（掃地）。"),
  T("et1","e3","昨晚十點我正在寫功課。",["I was doing my homework at {ten|10|10:00|ten o'clock} last night.","At {ten|10|10:00|ten o'clock} last night{,|} I was doing my homework."],"過去進行式 was + V-ing。","I was doing my homework at ten last night." ),
  R("er1","e3","當我到家時，我爸正在煮晚餐。",["When","I got home,","my dad","was cooking","dinner."],"When + 過去式, 主詞 + was + V-ing。","When I got home, my dad was cooking dinner.",["My dad was cooking dinner when I got home"]),
  E("ee1","e3","They was playing basketball at 4:00 yesterday.","was","were","They 的 be 動詞過去式。","They 搭配 were。"),
  /* U4 */
  M("eb1","e4","Sam wants ___ a doctor in the future.",["be","to be","being","is"],1,"want + to V。","want to be（想成為）。"),
  M("eb2","e4","Mia: What ___ you going to do this weekend?\nLeo: I'm going to visit my grandparents.",["do","are","will","did"],1,"be going to 的問句。","What are you going to do...?"),
  M("eb3","e4","My sister is going to ___ a trip next month.",["take","takes","took","taking"],0,"be going to + 原形。","going to + 原形動詞 → take。"),
  M("eb4","e4","A ___ helps sick animals.",["vet","pilot","farmer","firefighter"],0,"動物醫生。","vet（獸醫）。"),
  M("eb5","e4","Kevin loves cooking. He wants to be a ___.",["chef","nurse","police officer","reporter"],0,"喜歡做菜。","chef（主廚）。"),
  M("eb6","e4","Ann: What do you want to be in the future?\nIvy: ___",["I want to be a singer.","I'm a student.","I want some cake.","I'm going to school."],0,"問將來想成為什麼。","I want to be a singer." ),
  M("eb7","e4","Look at the dark clouds. It ___ rain.",["is going to","are going to","going to","goes to"],0,"有跡象顯示快要發生。","根據眼前跡象預測 → It is going to rain." ),
  M("eb8","e4","Jack isn't going to ___ TV tonight. He has a test tomorrow.",["watch","watches","watching","watched"],0,"be going to + 原形。","isn't going to watch。"),
  SP("es4","e4","A ___ puts out fires and saves people.","firefighter","消防員","firefighter（消防員）。"),
  SP("es5","e4","My aunt is a ___. She flies planes.","pilot","飛行員","pilot（飛行員）。"),
  SP("es6","e4","I want to be a ___ and write news stories.","reporter","記者","reporter（記者）。"),
  T("et2","e4","你將來想做什麼？",["What do you want to {be|do} in the future?"],"What do you want to be ...?","What do you want to be in the future?"),
  R("er2","e4","我明年要去美國讀書。",["I","am going to","study","in the USA","next year."],"be going to + 原形。","I am going to study in the USA next year." ),
  E("ee2","e4","She is going to visits her aunt tomorrow.","visits","visit","going to 後面接原形。","be going to + 原形動詞 → visit。"),
  G("eg1","e3","article","A Strange Night",[
    "Last Saturday night, I had a strange dream. In the dream, I was walking home from school. It was dark, and it was raining. When I got to my house, all the lights were off. My mom wasn't cooking in the kitchen, and my dad wasn't reading in the living room. I was very scared.",
    "Suddenly, I heard a sound. Someone was washing the dishes! I walked into the kitchen slowly. It was my little brother. He was wearing my dad's big apron and singing a song. \"Surprise!\" he said. \"Mom and Dad are at the store. I'm doing the housework today!\"",
    "Then I woke up. It was 6:30 in the morning, and my mom was making breakfast. Was it a nightmare or a funny dream? I still don't know."
  ],[["strange","奇怪的"],["dream","夢"],["suddenly","突然"],["sound","聲音"],["slowly","慢慢地"],["apron","圍裙"],["surprise","驚喜"]],[
    Q("eg1a","What was the weather like in the dream?",["Sunny and hot.","Dark and rainy.","Snowy.","Windy but dry."],1,"第一段。","It was dark, and it was raining." ),
    Q("eg1b","Who was washing the dishes in the dream?",["The writer's mom.","The writer's dad.","The writer's little brother.","The writer."],2,"It was my ...","It was my little brother." ),
    Q("eg1c","What was the writer's mom doing when the writer woke up?",["Washing the dishes.","Making breakfast.","Reading a book.","Shopping at the store."],1,"最後一段。","my mom was making breakfast。")
  ]),
  /* U5 */
  M("ec1","e5","Lily goes to school ___ bus every day.",["by","on","in","take"],0,"搭乘交通工具（不加冠詞）。","by + 交通工具 → by bus。"),
  M("ec2","e5","Ray: How ___ does it take to get to the airport?\nIvy: About forty minutes.",["long","far","often","much"],0,"回答是一段時間。","How long does it take...? 問花多久時間。"),
  M("ec3","e5","It ___ me twenty minutes to walk to school.",["takes","spends","costs","pays"],0,"It ___ 人 + 時間 + to V。","It takes + 人 + 時間 + to V。"),
  M("ec4","e5","Excuse me. How do I ___ to the train station?",["get","go to","arrive","reach to"],0,"get to = 到達。","How do I get to...? 問路。"),
  M("ec5","e5","Go straight and turn left ___ the second corner.",["at","in","on","for"],0,"在轉角處。","at the corner（在轉角）。"),
  M("ec6","e5","Ben: How do you go to work?\nMr. Lee: I ___ the MRT.",["take","by","ride on","go by"],0,"主詞後面要接動詞。","take the MRT（搭捷運）；by the MRT 前面還要有動詞。"),
  M("ec7","e5","The hotel is ___ the bank and the bookstore.",["between","next","across","behind of"],0,"A and B 之間。","between A and B。"),
  M("ec8","e5","How ___ is it from here to the museum?\n— It's about two kilometers.",["far","long","many","often"],0,"回答是距離。","How far 問距離。"),
  SP("es7","e5","Turn ___ at the corner, and you'll see the hotel.","right","右","turn right（右轉）。"),
  SP("es8","e5","The post office is ___ from the park, on the other side of the street.","across","在對面","across from（在…對面）。"),
  SP("es9","e5","Can you tell me the ___ to the station?","way","路","the way to...（去…的路）。"),
  T("et3","e5","請問到火車站要怎麼走？",["{Excuse me, |}how {can|do} I get to the train station?","{Excuse me, |}{could|can} you tell me the way to the train station?"],"How do I get to ...?","Excuse me, how do I get to the train station?"),
  R("er3","e5","我搭公車上學要花三十分鐘。",["It","takes","me","thirty minutes","to go to school","by bus."],"It takes + 人 + 時間 + to V。","It takes me thirty minutes to go to school by bus." ),
  E("ee3","e5","My dad goes to work by his car.","by","in","有 his 的時候不能用 by。","by car（不加所有格）；有 his 時要說 in his car。"),
  /* U6 */
  M("ed1","e6","She ___ wear a sweater to the party tomorrow.",["will","is","does","was"],0,"tomorrow 表未來。","will + 原形動詞。"),
  M("ed2","e6","This jacket ___ 1,200 dollars.",["costs","spends","pays","takes"],0,"主詞是「物」。","物 + cost + 金額。"),
  M("ed3","e6","I ___ 500 dollars on this pair of shoes.",["spent","cost","paid","took"],0,"人 + ___ + 錢 + on + 物。","人 + spend + 錢 + on + 物。"),
  M("ed4","e6","Ann ___ 300 dollars for the T-shirt.",["paid","spent","cost","took"],0,"人 + ___ + 錢 + for + 物。","人 + pay + 錢 + for + 物。"),
  M("ed5","e6","Clerk: Can I help you?\nKen: ___",["Yes, I'm looking for a cap.","No, you can't.","Here you are.","You're welcome."],0,"店員問需要幫忙嗎。","Yes, I'm looking for...（我在找…）。"),
  M("ed6","e6","Joy: Will you go shopping with me tomorrow?\nMia: Yes, I ___.",["will","do","am","go"],0,"Will you ...? 的簡答。","Yes, I will." ),
  M("ed7","e6","These shoes are too small. Do you have them in a bigger ___?",["size","price","color","money"],0,"太小 → 換大一點的…","size（尺寸）。"),
  M("ed8","e6","It's too expensive. Do you have a ___ one?",["cheaper","more expensive","bigger price","expensiver"],0,"太貴了，要找…","cheaper（比較便宜的）。"),
  SP("es10","e6","This watch is too ___. I can't buy it.","expensive","昂貴的","expensive（昂貴的）。"),
  SP("es11","e6","Can I ___ on this dress? Where is the fitting room?","try","試（穿）","try on（試穿）。"),
  SP("es12","e6","This shirt is on ___. It's half price!","sale","特價","on sale（特價中）。"),
  T("et4","e6","這件毛衣多少錢？",["How much is this sweater?","How much does this sweater cost?"],"How much is ...?","How much is this sweater?"),
  R("er4","e6","我明天會穿外套去派對。",["I","will","wear","a jacket","to the party","tomorrow."],"will + 原形。","I will wear a jacket to the party tomorrow." ),
  E("ee4","e6","This bag spends 900 dollars.","spends","costs","主詞是物。","物 + cost + 金額。"),
  G("eg2","e5","dialogue","Asking for Directions",[
    "Tourist: Excuse me. How do I get to Sunny Hotel?",
    "Ming: Go straight on Park Road and turn right at the second corner. That's Ocean Street.",
    "Tourist: Turn right at the second corner... OK.",
    "Ming: Then walk for about three minutes. You'll see a bookstore. The hotel is next to it, across from the bank.",
    "Tourist: Is it far from here? Should I take a taxi?",
    "Ming: No, it's not far. It takes about ten minutes on foot.",
    "Tourist: Great. Thank you very much!",
    "Ming: You're welcome. Have a nice trip!"
  ],[["tourist","觀光客"],["corner","轉角"],["bookstore","書店"],["across from","在…對面"],["on foot","步行"]],[
    Q("eg2a","Where is Sunny Hotel?",["Next to the bank.","Next to the bookstore.","On Park Road.","Across from the bookstore."],1,"The hotel is next to it ...","next to it（the bookstore），across from the bank。"),
    O("eg2b","Put the directions in order.",["Walk for about three minutes.","Turn right at the second corner.","Go straight on Park Road.","Find the bookstore."],[2,1,0,3],"照 Ming 說的順序。","直走 Park Road（c）→ 第二個轉角右轉（b）→ 走三分鐘（a）→ 看到書店（d）。"),
    Q("eg2c","How will the tourist probably go to the hotel?",["By taxi.","On foot.","By bus.","By MRT."],1,"Ming 說不遠。","It takes about ten minutes on foot → 走路去。")
  ]),
  X("ex1","e5","把動作配對到「交通方式」的說法。",["walk","ride a bike","take the bus","take a plane","take a ship","take the MRT"],["on foot","by bike","by bus","by plane","by ship","by MRT"],"by + 交通工具；走路是例外。","走路 on foot；其他都用 by + 交通工具（不加冠詞）。"),
  D("eq1","e6","Ella","fit",["These jeans don't fit me.","They're too tight."],["Healthy and strong.","The right size and shape for someone.","To put something into a place.","A sudden feeling."],1,"牛仔褲太緊。","don't fit = 不合身。fit 也有「健康的」(A) 的意思。")
);
})();
