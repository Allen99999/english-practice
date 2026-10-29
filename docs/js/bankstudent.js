/* ===== 學生專區：Allen 為個別學生準備的考卷 =====
   STUDENT_ZONE 的名字＝作答人名字（不分大小寫）；輸入這些名字時首頁會多一列「學生專區」。
   每份考卷是一個 hidden＋fixed 的題庫（student 標記是誰的），整回照順序作答、做完才公布分數與對錯（blind）。
   選項順序照紙本考卷（fixedOrder），不自動平衡。新考卷：寫一個 studentPaper(...)，再把 id 加到該學生的清單 */
const STUDENT_ZONE = { Ayden: [], Yuri: [], Jovi: ["jovi-a1"], Wei: [] };
const zoneName = who => Object.keys(STUDENT_ZONE).find(n => n.toLowerCase() === String(who || "").trim().toLowerCase()) || null;
/* full：拼字題不給頭尾提示字母，要寫出完整的字 */
const SPF = (id, tag, stem, ans, exp) => ({ id, type: "spell", full: true, label: "填寫單字", tag, stem, ans, hint: "", exp });
const TF = (id, tag, sent, ok, exp) => M(id, tag, sent, ["T（對）", "F（錯）"], ok ? 0 : 1, "", exp);
function studentPaper(b) {
  b.items.forEach(it => (it.type === "group" ? it.qs : [it]).forEach(q => { q.fixedOrder = true; }));
  BANKS.push(Object.assign({ grade: 99, fixed: true, hidden: true, blind: Object.keys(b.tags), exams: [{ name: "整回", tags: Object.keys(b.tags) }], timeLimits: [[Object.keys(b.tags), b.minutes]] }, b));
}

/* ---- Jovi：A 範圍（a – away）單字考・基礎（共 44 題、20 分鐘） ---- */
studentPaper({
  id: "jovi-a1", student: "Jovi", minutes: 20,
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
