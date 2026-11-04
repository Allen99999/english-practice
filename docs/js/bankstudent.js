/* ===== 學生專區：Allen 為個別學生準備的考卷 =====
   STUDENT_ZONE 的名字＝作答人名字（不分大小寫）；輸入這些名字時首頁會多一列「學生專區」。
   每份考卷是一個 hidden＋fixed 的題庫（student 標記是誰的），整回照順序作答、做完才公布分數與對錯（blind）。
   選項順序照紙本考卷（fixedOrder），不自動平衡。新考卷：寫一個 studentPaper(...)，再把 id 加到該學生的清單 */
const STUDENT_ZONE = { Ayden: [], Yuri: ["yuri-m1", "yuri-m2", "yuri-m3"], Jovi: ["jovi-a1"], Wei: [] };
const zoneName = who => Object.keys(STUDENT_ZONE).find(n => n.toLowerCase() === String(who || "").trim().toLowerCase()) || null;
/* full：拼字題不給頭尾提示字母，要寫出完整的字 */
const SPF = (id, tag, stem, ans, exp) => ({ id, type: "spell", full: true, label: "填寫單字", tag, stem, ans, hint: "", exp });
const TF = (id, tag, sent, ok, exp) => M(id, tag, sent, ["T（對）", "F（錯）"], ok ? 0 : 1, "", exp);
/* 單字表（老師給的生字表，只有生字本身、不含例句）：用 | 分隔，同一個字的其他寫法用 = 連起來。
   考卷設 vocab: "A"＝這份考的單字表：考試中點到這些字不顯示中文（其他字照常顯示）；單字練習的干擾選項也從這裡挑 */
const WORDLISTS = {
  A: "a|afternoon|A.M. = a.m. = AM|again|ability|against|able|age|about|ago|above|agree|abroad|agreement|absence|ahead|absent|aid|accept|AIDS|accident|aim|according|air|achieve|aircraft|across|airline|act|airplane = plane|action|airport|active|alarm|activity|album|actor|alike|actress|alive|actually|all|add|allow|addition|almond|address|almost|admire|alone|admit|along|adopt|aloud|adult|alphabet|advance|already|advantage|also|advice|although|advise|altogether|affair|always|affect|am|afraid|ambulance|after|America|American|aren't|among|argue|amount|argument|an|arm|ancient|armchair|and|army|angel|around|anger|arrange|angry|arrangement|animal|arrest|ankle|arrive|another|arrow|answer|art|ant|article|any|artist|anybody|as|anyhow|Asia|anyone|Asian|anyplace|ask|anything|asleep|anytime|assistant|anyway|assume|anywhere|at|apartment|attack|ape|attend|apologize|attention|appear|audience|appearance|August = Aug.|appetite|aunt = auntie = aunty|apple|Australia|apply|Australian|appreciate|autumn|April|available|apron|avoid|are|aware|area|away"   // A 範圍（a – away）144 字，課本 p.12–24
};
const wordListOf = name => (WORDLISTS[name] || "").split("|").flatMap(x => x.split(" = ")).map(w => w.trim()).filter(Boolean);
/* 聽力題（學生專區用，不需要圖）：script 是要念的句子，opts 是文字選項。plabel = 畫面上的作答說明 */
const SL = (id, tag, script, plabel, opts, ans, exp) => ({ id, type: "listen", part: 2, tag, plabel, opts, ans, hint: "", exp,
  script: [].concat(script), fixedOrder: true, v2: [...id].reduce((t, c) => t + c.charCodeAt(0), 0) % 2 === 1 });
function studentPaper(b) {
  b.items.forEach(it => (it.type === "group" ? it.qs : [it]).forEach(q => { q.fixedOrder = true; }));
  const bank = Object.assign({ grade: 99, fixed: true, hidden: true, blind: Object.keys(b.tags), exams: [{ name: "整回", tags: Object.keys(b.tags) }], timeLimits: [[Object.keys(b.tags), b.minutes]] }, b);
  BANKS.push(bank);
  return bank;
}

/* ---- Jovi：A 範圍（a – away）單字考・基礎（共 44 題、20 分鐘） ---- */
studentPaper({
  id: "jovi-a1", student: "Jovi", minutes: 20, vocab: "A",
  title: "A 範圍單字考・基礎",
  range: "Vocabulary Quiz A 範圍（a – away）・基礎 ★☆",
  added: "2026-10-29",
  note: "",
  tags: {
    s1: "一、中翻英選擇", s2: "二、英翻中選擇", s3: "三、配對", s4: "四、拼字", s5: "五、字母重組",
    s6: "六、情境選擇", s7: "七、詞形變化", s8: "八、是非題", s9: "九、句子填空", s10: "十、短文克漏字"
  },
  items: [
  M("q1","s1","救護車",["ambulance","airport","apartment","alphabet"],0,"","ambulance 救護車；airport 機場、apartment 公寓、alphabet 字母表。"),
  M("q2","s1","機場",["armchair","airline","aircraft","airport"],3,"","airport 機場；armchair 扶手椅、airline 航空公司、aircraft 飛機（航空器）。"),
  M("q3","s1","道歉",["apologize","apply","appear","appreciate"],0,"","apologize 道歉；apply 申請、appear 出現、appreciate 感激。"),
  M("q4","s1","生氣的（形容詞）",["ancient","angel","anger","angry"],3,"","angry 生氣的（形容詞）；anger 是名詞「怒氣」。ancient 古老的、angel 天使。"),
  M("q5","s1","觀眾；聽眾",["audience","address","attention","assistant"],0,"","audience 觀眾；address 地址、attention 注意、assistant 助理。"),
  M("q6","s1","秋天",["April","afternoon","August","autumn"],3,"","autumn 秋天（美式也說 fall）；April 四月、afternoon 下午、August 八月。"),
  M("q7","s2","ankle",["手臂","螞蟻","足踝","天使"],2,"","ankle 足踝；手臂 arm、螞蟻 ant、天使 angel。"),
  M("q8","s2","absent",["活著的","害怕的","缺席的","睡著的"],2,"","absent 缺席的；活著的 alive、害怕的 afraid、睡著的 asleep。"),
  M("q9","s2","already",["也；還","幾乎","總是","已經"],3,"","already 已經；也 also、幾乎 almost、總是 always。"),
  M("q10","s2","arrive",["爭執","抵達","逮捕","安排"],1,"","arrive 抵達；爭執 argue、逮捕 arrest、安排 arrange。"),
  M("q11","s3","apple",["箭","蘋果","阿姨","圍裙","猿；大猩猩"],1,"","apple 蘋果。"),
  M("q12","s3","apron",["箭","蘋果","阿姨","圍裙","猿；大猩猩"],3,"","apron 圍裙。"),
  M("q13","s3","ape",["箭","蘋果","阿姨","圍裙","猿；大猩猩"],4,"","ape 猿；大猩猩。"),
  M("q14","s3","arrow",["箭","蘋果","阿姨","圍裙","猿；大猩猩"],0,"","arrow 箭。"),
  M("q15","s3","aunt",["箭","蘋果","阿姨","圍裙","猿；大猩猩"],2,"","aunt 阿姨；姑姑。"),
  SPF("q16","s4","地址（n.）　a d _ r e _ s　→ ___","address","address 地址：中間是兩個 d、結尾兩個 s。"),
  SPF("q17","s4","女演員（n.）　a _ t r e s _　→ ___","actress","actress 女演員（actor 演員＋-ress）。"),
  SPF("q18","s4","答案（n.）　a n s _ _ r　→ ___","answer","answer 答案：w 不發音，要記得寫。"),
  SPF("q19","s4","鬧鐘；警報（n.）　a l _ _ m　→ ___","alarm","alarm 鬧鐘；警報（alarm clock 鬧鐘）。"),
  SPF("q20","s4","動物（n.）　a n _ m _ l　→ ___","animal","animal 動物。"),
  SPF("q21","s5","相簿；唱片　l / b / m / a / u　→ ___","album","album 相簿；唱片專輯。"),
  SPF("q22","s5","藝術家　t / i / s / a / r / t　→ ___","artist","artist 藝術家（art 藝術＋-ist）。"),
  SPF("q23","s5","獨自地；單獨的　n / o / l / e / a　→ ___","alone","alone 獨自地；單獨的。"),
  M("q24","s6","I am ___ of big dogs.",["asleep","afraid","alive","angry"],1,"","be afraid of 害怕…：I am afraid of big dogs.（我怕大狗。）"),
  M("q25","s6","I will ___ the meeting at 3 p.m.",["accept","arrive","attend","attack"],2,"","attend the meeting 參加會議。arrive 要接 at／in，accept 接受、attack 攻擊。"),
  M("q26","s6","___ to the weather report, it will rain tomorrow.",["According","Already","Actually","Although"],0,"","according to… 根據…：根據氣象報告，明天會下雨。"),
  M("q27","s6","Please read the story ___ so everyone can hear.",["aloud","along","also","alone"],0,"","read aloud 大聲唸出來，大家才聽得到。along 沿著、also 也、alone 單獨。"),
  M("q28","s6","I always ___ some sugar to my coffee.",["act","ask","add","aim"],2,"","add A to B 把 A 加到 B 裡：我總是在咖啡裡加糖。"),
  M("q29","s6","My little brother fell ___ in the car.",["alike","asleep","aware","alive"],1,"","fall asleep 睡著：我弟弟在車上睡著了。"),
  SPF("q30","s7","I ___ (arrive) at school late yesterday.","arrived","yesterday 是過去式：arrive → arrived（字尾有 e，直接加 d）。"),
  SPF("q31","s7","There are many fun ___ (activity) at the park.","activities","many 後面接複數：activity → activities（子音＋y，去 y 加 ies）。"),
  SPF("q32","s7","He ___ (apologize) to me last night.","apologized","last night 是過去式：apologize → apologized。"),
  SPF("q33","s7","My aunt is a famous ___ (act). She is in many movies.","actress","演電影的人；主詞是 aunt、She（女生）→ actress 女演員。"),
  TF("q34","s8","An ambulance takes sick people to the hospital.",true,"對：救護車把病人送到醫院。"),
  TF("q35","s8","Ants are very big animals.",false,"錯：螞蟻是很小的動物。"),
  TF("q36","s8","You can see many airplanes at an airport.",true,"對：在機場可以看到很多飛機。"),
  TF("q37","s8","Autumn comes after winter.",false,"錯：秋天在冬天之前；冬天之後是春天。"),
  { id: "q38", type: "scramble", label: "句子填空", tag: "s9", zh: "我總是在早上吃一顆蘋果。", frame: "I _ eat _ _ in the morning.", tiles: ["always", "an", "apple"], extra: [], ans: "always an apple", hint: "", exp: "頻率副詞 always 放在一般動詞前；apple 母音開頭用 an：I always eat an apple in the morning." },
  { id: "q39", type: "scramble", label: "句子填空", tag: "s9", zh: "你最好離那隻狗遠一點。", frame: "You'd better _ _ from that dog.", tiles: ["stay", "away"], extra: [], ans: "stay away", hint: "", exp: "had better（'d better）＋原形動詞；stay away from… 遠離…。" },
  G("q40g","s10","cloze","My Aunt",[
    "My aunt lives in an [[40]] near the airport. Last [[41]], I went to visit her. We took a walk [[42]] the river and talked about many things. She gave me some good [[43]] about school. I really [[44]] her help."
  ],null,[
    B("q40",40,["ambulance","armchair","apartment","alphabet"],2,"","live in an apartment 住在公寓。"),
    B("q41",41,["ankle","August","art","Asia"],1,"","Last August 去年八月（表示時間）。"),
    B("q42",42,["along","also","aloud","alone"],0,"","walk along the river 沿著河邊散步。"),
    B("q43",43,["address","advice","accident","advise"],1,"","some good advice 一些好建議：advice 是名詞（不可數）；advise 是動詞「建議」。"),
    B("q44",44,["apologize","appear","apply","appreciate"],3,"","appreciate her help 感激她的幫忙。")
  ])
  ]
});

/* ===== Yuri（國小低年級）：期中複習模擬卷 1～3，由易到難 =====
   範圍：Unit 1（字母 Aa–Jj、數字 1–5、What's your name? / My name is… / I'm…）
        Unit 2（字母 Kk–Oo、數字 6–10、How old are you? / I'm … years old.）
        Review 1 All About Me（Hi!/Hello!、I'm a boy/girl.）、課堂用語（Thank you. / You're welcome. / How are you? / Listen!）
        Story Time 萬聖節單字（bat, ghost, pumpkin, spider, witch, vampire）
   題型照她的期中複習考：聽力辨音、看句選答、文法選擇、字母順序、字母大小寫配對。
   卷 1、2 的聽力可以重聽（relisten），卷 3 照正式考每題只播一遍。 */

/* ---- 卷 1：最簡單（和複習考同難度，30 題、20 分鐘） ---- */
studentPaper({
  id: "yuri-m1", student: "Yuri", minutes: 20, relisten: true,
  title: "期中複習模擬卷 1・基礎",
  range: "Unit 1 ~ Review 1・字母 Aa–Oo、數字 1–10、自我介紹",
  added: "2026-11-04",
  note: "",
  tags: { y1: "一、聽發音選字母", y2: "二、聽單字選中文", y3: "三、字母大小寫", y4: "四、字母順序", y5: "五、數字", y6: "六、看句子選答案", y7: "七、文法選擇" },
  items: [
  SL("a01","y1","bag","聽一個單字，選出它開頭的字母",["Bb","Dd"],0,"bag（袋子）開頭的發音是 /b/，所以是 Bb。"),
  SL("a02","y1","fish","聽一個單字，選出它開頭的字母",["Ii","Ff"],1,"fish（魚）開頭的發音是 /f/，所以是 Ff。"),
  SL("a03","y1","hat","聽一個單字，選出它開頭的字母",["Hh","Jj"],0,"hat（帽子）開頭的發音是 /h/，所以是 Hh。"),
  SL("a04","y1","goat","聽一個單字，選出它開頭的字母",["Gg","Ff"],0,"goat（山羊）開頭的發音是 /g/，所以是 Gg。"),
  SL("a05","y1","key","聽一個單字，選出它開頭的字母",["Kk","Gg"],0,"key（鑰匙）開頭的發音是 /k/，所以是 Kk。"),
  SL("a06","y1","milk","聽一個單字，選出它開頭的字母",["Mm","Nn"],0,"milk（牛奶）開頭的發音是 /m/，所以是 Mm。"),
  SL("a07","y1","ox","聽一個單字，選出它開頭的字母",["Ll","Oo"],1,"ox（公牛）開頭的發音是 /ɑ/，所以是 Oo。"),
  SL("a08","y1","apple","聽一個單字，選出它開頭的字母",["Aa","Ee"],0,"apple（蘋果）開頭的發音是 /æ/，所以是 Aa。"),
  SL("a09","y2","cat","聽一個單字，選出它的中文意思",["貓","杯子"],0,"cat 貓、cup 杯子，開頭都是 c，要聽完整個字。"),
  SL("a10","y2","duck","聽一個單字，選出它的中文意思",["狗","鴨子"],1,"dog 狗、duck 鴨子，開頭都是 d。"),
  SL("a11","y2","egg","聽一個單字，選出它的中文意思",["蛋","大象"],0,"egg 蛋、elephant 大象，開頭都是 e。"),
  SL("a12","y2","leg","聽一個單字，選出它的中文意思",["獅子","腿"],1,"lion 獅子、leg 腿，開頭都是 l。"),
  X("a13","y3","把大寫和小寫配成一對。",["A","B","C","D"],["a","b","c","d"],"","A-a、B-b、C-c、D-d。"),
  X("a14","y3","把大寫和小寫配成一對。",["F","G","H","J"],["f","g","h","j"],"","F-f、G-g、H-h、J-j。"),
  X("a15","y3","把大寫和小寫配成一對。",["K","L","M","N"],["k","l","m","n"],"","K-k、L-l、M-m、N-n。"),
  SPF("a16","y4","照字母順序，填出空格的小寫字母：a b ___ d","c","a b c d。"),
  SPF("a17","y4","照字母順序，填出空格的小寫字母：d e ___ g","f","d e f g。"),
  SPF("a18","y4","照字母順序，填出空格的小寫字母：h i ___ k","j","h i j k。"),
  SPF("a19","y4","照字母順序，填出空格的小寫字母：l m ___ o","n","l m n o。"),
  M("a20","y5","3 的英文是哪一個？",["three","two","four"],0,"","3 = three。"),
  M("a21","y5","5 的英文是哪一個？",["six","five","nine"],1,"","5 = five。"),
  M("a22","y5","8 的英文是哪一個？",["eight","seven","ten"],0,"","8 = eight。"),
  M("a23","y5","ten 是數字幾？",["10","2","9"],0,"","ten = 10。"),
  M("a24","y6","What's your name?",["My name is Abu.","I'm nine years old.","Thank you."],0,"","問名字，要回答名字：My name is Abu."),
  M("a25","y6","How old are you?",["I'm Mia.","I'm seven years old.","You're welcome."],1,"","問年紀，要回答歲數：I'm seven years old."),
  M("a26","y6","Thank you.",["You're welcome.","My name is Teddy.","I'm a boy."],0,"","別人說謝謝，回答 You're welcome.（不客氣）"),
  M("a27","y6","How are you?",["I'm ten.","Good.","Hello, Amber."],1,"","問候近況，回答 Good.（很好）"),
  M("a28","y7","Hello! ___ name is Edison.",["My","I'm","You"],0,"","My name is…（我的名字是…）"),
  M("a29","y7","___ eight years old.",["I'm","My","You're"],0,"","I'm eight years old.（I'm = I am）"),
  M("a30","y7","My name ___ Amber.",["is","am","are"],0,"","My name is Amber."),
  ]
});

/* ---- 卷 2：中等（33 題、25 分鐘） ---- */
studentPaper({
  id: "yuri-m2", student: "Yuri", minutes: 25, relisten: true,
  title: "期中複習模擬卷 2・進階",
  range: "Unit 1 ~ Review 1 ＋ 萬聖節單字・加入拼字與句子重組",
  added: "2026-11-04",
  note: "",
  tags: { y1: "一、聽力", y2: "二、字母與發音", y3: "三、看中文選英文", y4: "四、拼出單字", y5: "五、看句子選答案", y6: "六、文法選擇", y7: "七、句子重組" },
  items: [
  SL("b01","y1","jam","聽一個單字，選出它開頭的字母",["Gg","Jj","Kk"],1,"jam（果醬）開頭的發音是 /dʒ/，所以是 Jj。"),
  SL("b02","y1","neck","聽一個單字，選出它開頭的字母",["Mm","Nn","Ll"],1,"neck（脖子）開頭的發音是 /n/，所以是 Nn。"),
  SL("b03","y1","insect","聽一個單字，選出它開頭的字母",["Ii","Ee","Aa"],0,"insect（昆蟲）開頭的發音是 /ɪ/，所以是 Ii。"),
  SL("b04","y1","otter","聽一個單字，選出它開頭的字母",["Aa","Oo","Ii"],1,"otter（水獺）開頭的發音是 /ɑ/，所以是 Oo。"),
  SL("b05","y1","goat","聽一個單字，選出它的中文意思",["山羊","女孩","手"],0,"goat 是山羊。"),
  SL("b06","y1","seven","聽一個數字，選出正確的阿拉伯數字",["6","7","9"],1,"seven = 7。"),
  SL("b07","y1","What's your name?","聽一個問題，選出最適合的回答",["I'm ten years old.","My name is Rocky.","You're welcome."],1,"問名字 → My name is Rocky."),
  SL("b08","y1","How old are you?","聽一個問題，選出最適合的回答",["I'm nine years old.","I'm a girl.","Good."],0,"問年紀 → I'm nine years old."),
  M("b09","y2","哪一個單字的開頭字母是 e？",["egg","ant","duck"],0,"","egg（蛋）開頭是 e。"),
  M("b10","y2","哪一個單字的開頭字母是 k？",["cup","kite","girl"],1,"","kite（風箏）開頭是 k。"),
  M("b11","y2","哪一個單字的開頭字母是 n？",["milk","nose","leg"],1,"","nose（鼻子）開頭是 n。"),
  M("b12","y2","lion 的開頭字母是哪一個？",["Ll","Ii","Nn"],0,"","lion（獅子）開頭是 l。"),
  M("b13","y3","「大象」的英文是哪一個？",["elephant","egg","insect"],0,"","elephant 大象。"),
  M("b14","y3","「猴子」的英文是哪一個？",["milk","monkey","money"],1,"","monkey 猴子。"),
  M("b15","y3","「南瓜」的英文是哪一個？",["pumpkin","spider","ghost"],0,"","pumpkin 南瓜。"),
  M("b16","y3","「女巫」的英文是哪一個？",["vampire","witch","bat"],1,"","witch 女巫。"),
  M("b17","y3","spider 的中文是什麼？",["蝙蝠","蜘蛛","鬼"],1,"","spider 蜘蛛。"),
  SPF("b18","y4","蘋果（開頭是 a，共 5 個字母）：___","apple","apple 蘋果。"),
  SPF("b19","y4","男孩（開頭是 b，共 3 個字母）：___","boy","boy 男孩。"),
  SPF("b20","y4","手（開頭是 h，共 4 個字母）：___","hand","hand 手。"),
  SPF("b21","y4","鑰匙（開頭是 k，共 3 個字母）：___","key","key 鑰匙。"),
  SPF("b22","y4","鼻子（開頭是 n，共 4 個字母）：___","nose","nose 鼻子。"),
  SPF("b23","y4","照字母順序，填出空格的小寫字母：i j ___ l","k","i j k l。"),
  SPF("b24","y4","照字母順序，填出空格的小寫字母：k l m ___","n","k l m n。"),
  M("b25","y5","A: Hi! What's your name?　B: ___",["I'm seven.","My name is Mia.","Thank you."],1,"","問名字要回答名字。"),
  M("b26","y5","A: Thank you.　B: ___",["You're welcome.","How are you?","I'm a boy."],0,"","Thank you. → You're welcome."),
  M("b27","y5","A: How are you?　B: ___",["Good. Thank you.","My name is Ken.","I'm ten years old."],0,"","問好 → Good. Thank you."),
  M("b28","y6","___ your name?",["What's","How","I'm"],0,"","What's your name?（What's = What is）"),
  M("b29","y6","___ old are you?",["What","How","My"],1,"","How old are you?"),
  M("b30","y6","I ___ a girl.",["am","is","are"],0,"","I am a girl.（I 配 am）"),
  M("b31","y6","I'm ten ___ old.",["year","years","old"],1,"","I'm ten years old.（兩歲以上用 years）"),
  R("b32","y7","我的名字是 Teddy。",["My","name","is","Teddy."],"","My name is Teddy."),
  R("b33","y7","我九歲。",["I'm","nine","years","old."],"","I'm nine years old."),
  ]
});

/* ---- 卷 3：最難，照正式考（35 題、30 分鐘，聽力只播一遍） ---- */
studentPaper({
  id: "yuri-m3", student: "Yuri", minutes: 30,
  title: "期中複習模擬卷 3・挑戰",
  range: "Unit 1 ~ Review 1 ＋ 萬聖節單字・聽力只播一遍，照正式考",
  added: "2026-11-04",
  note: "",
  tags: { y1: "一、聽力", y2: "二、字母與發音", y3: "三、單字", y4: "四、拼出單字", y5: "五、看對話選答案", y6: "六、文法選擇", y7: "七、句子重組" },
  items: [
  SL("c01","y1","hand","聽一個單字，選出它開頭的字母",["Nn","Hh","Jj"],1,"hand（手）開頭的發音是 /h/，所以是 Hh。"),
  SL("c02","y1","girl","聽一個單字，選出它開頭的字母",["Jj","Gg","Kk"],1,"girl（女孩）開頭的發音是 /g/；jet 才是 Jj。"),
  SL("c03","y1","lion","聽一個單字，選出它開頭的字母",["Ll","Ii","Oo"],0,"lion（獅子）開頭的發音是 /l/，所以是 Ll。"),
  SL("c04","y1","elephant","聽一個單字，選出它開頭的字母",["Ii","Aa","Ee"],2,"elephant（大象）開頭的發音是 /ɛ/，所以是 Ee。"),
  SL("c05","y1","jam","聽一個單字，選出它的中文意思",["果醬","噴射機","罐子"],0,"jam 是果醬；jet 才是噴射機。"),
  SL("c06","y1","neck","聽一個單字，選出它的中文意思",["鼻子","脖子","牛奶"],1,"neck 是脖子，nose 是鼻子。"),
  SL("c07","y1","I'm nine years old.","聽一句話，選出正確的數字",["7","9","10"],1,"nine = 9。"),
  SL("c08","y1","My name is Edison.","聽一句話，選出說話的人是誰",["Amber","Edison","Rocky"],1,"My name is Edison."),
  SL("c09","y1","How old are you?","聽一個問題，選出最適合的回答",["My name is Abu.","I'm a boy.","I'm eight years old."],2,"問年紀 → I'm eight years old."),
  SL("c10","y1","Thank you.","聽一句話，選出最適合的回答",["You're welcome.","How old are you?","Good."],0,"Thank you. → You're welcome."),
  M("c11","y2","哪一組的開頭字母和其他兩個不一樣？",["milk","monkey","nose"],2,"","milk、monkey 開頭是 m，nose 開頭是 n。"),
  M("c12","y2","哪一個單字的開頭字母是 o？",["ox","ink","jet"],0,"","ox（公牛）開頭是 o。"),
  M("c13","y2","insect 和哪一個單字的開頭字母一樣？",["egg","ink","ant"],1,"","insect 和 ink 開頭都是 i。"),
  M("c14","y2","字母 j 的前面是哪一個字母？",["h","i","k"],1,"","…h i j k…，j 前面是 i。"),
  M("c15","y2","字母 m 的後面是哪一個字母？",["l","n","o"],1,"","…l m n o…，m 後面是 n。"),
  M("c16","y3","「水獺」的英文是哪一個？",["ox","otter","owl"],1,"","otter 水獺。"),
  M("c17","y3","「吸血鬼」的英文是哪一個？",["vampire","witch","ghost"],0,"","vampire 吸血鬼。"),
  M("c18","y3","bat 的中文是什麼？",["蝙蝠","蜘蛛","南瓜"],0,"","bat 蝙蝠。"),
  M("c19","y3","Look! I'm a ___.（圖：穿南瓜裝）",["ghost","pumpkin","spider"],1,"","I'm a pumpkin.（我是南瓜）"),
  SPF("c20","y4","昆蟲（開頭是 i，共 6 個字母）：___","insect","insect 昆蟲。"),
  SPF("c21","y4","大象（開頭是 e，共 8 個字母）：___","elephant","elephant 大象。"),
  SPF("c22","y4","猴子（開頭是 m，共 6 個字母）：___","monkey","monkey 猴子。"),
  SPF("c23","y4","鬼（開頭是 g，共 5 個字母）：___","ghost","ghost 鬼。"),
  SPF("c24","y4","照字母順序，填出空格的小寫字母：___ f g h","e","e f g h。"),
  SPF("c25","y4","照字母順序，填出空格的小寫字母：m ___ o","n","m n o。"),
  M("c26","y5","A: Hello! My name is Mia. What's your name?　B: ___",["I'm ten years old.","Hi! My name is Ken.","You're welcome."],1,"","對方先說名字再問你，要回答自己的名字。"),
  M("c27","y5","A: How old are you?　B: I'm seven.　A 想知道的是什麼？",["名字","年紀","心情"],1,"","How old are you? 是問年紀。"),
  M("c28","y5","老師說 Listen! 的意思是什麼？",["請聽","請坐","謝謝"],0,"","Listen! 聽！"),
  M("c29","y5","A: ___　B: Good. Thank you.",["What's your name?","How are you?","How old are you?"],1,"","回答 Good. 對應的問題是 How are you?"),
  M("c30","y6","___ name is Abu.",["My","I'm","I"],0,"","My name is Abu.（I'm name is 是錯的）"),
  M("c31","y6","A: Thank you.　B: ___ welcome.",["My","You're","Your"],1,"","You're welcome.（You're = You are）"),
  M("c32","y6","___ nine years old.",["I","You","I'm"],2,"","I'm nine years old. 句子要有動詞 am。"),
  M("c33","y6","I'm a ___. My name is Edison.",["boy","girl","name"],0,"","Edison 是男生 → I'm a boy."),
  R("c34","y7","你好！我的名字是 Amber。",["Hello!","My","name","is","Amber."],"","Hello! My name is Amber."),
  R("c35","y7","我是女生，我十歲。",["I'm","a","girl.","I'm","ten","years","old."],"","I'm a girl. I'm ten years old."),
  ]
});
