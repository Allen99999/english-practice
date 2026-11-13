/* ===== 學生專區：Allen 為個別學生準備的考卷 =====
   STUDENT_ZONE 的名字＝作答人名字（不分大小寫）；輸入這些名字時首頁會多一列「學生專區」。
   每份考卷是一個 hidden＋fixed 的題庫（student 標記是誰的），整回照順序作答、做完才公布分數與對錯（blind）。
   選項順序照紙本考卷（fixedOrder），不自動平衡。新考卷：寫一個 studentPaper(...)，再把 id 加到該學生的清單 */
/* Ayden 用綜合卷 c1～c3（文法為主、發音為輔）；純文法卷 g1～g3 和純發音卷 m1～m3 的程式保留但不列在清單上 */
const STUDENT_ZONE = { Ayden: ["ayden-c1", "ayden-c2", "ayden-c3", "ayden-s1"], Yuri: ["yuri-m1", "yuri-m2", "yuri-m3", "yuri-m4", "yuri-m5"], Jovi: ["jovi-m1", "jovi-m2", "jovi-a1", "jovi-b1"], Wei: [] };
const zoneName = who => Object.keys(STUDENT_ZONE).find(n => n.toLowerCase() === String(who || "").trim().toLowerCase()) || null;
/* full：拼字題不給頭尾提示字母，要寫出完整的字 */
const SPF = (id, tag, stem, ans, exp) => ({ id, type: "spell", full: true, label: "填寫單字", tag, stem, ans, hint: "", exp });
/* 是非題：T 一定排在 F 前面，所以就算整份有 balance 也不讓它打亂（tfFixed） */
const TF = (id, tag, sent, ok, exp) => Object.assign(M(id, tag, sent, ["T（對）", "F（錯）"], ok ? 0 : 1, "", exp), { tfFixed: true });
/* 單字表（老師給的生字表，只有生字本身、不含例句）：用 | 分隔，同一個字的其他寫法用 = 連起來。
   考卷設 vocab: "A"＝這份考的單字表：考試中點到這些字不顯示中文（其他字照常顯示）；單字練習的干擾選項也從這裡挑 */
const WORDLISTS = {
  A: "a|afternoon|A.M. = a.m. = AM|again|ability|against|able|age|about|ago|above|agree|abroad|agreement|absence|ahead|absent|aid|accept|AIDS|accident|aim|according|air|achieve|aircraft|across|airline|act|airplane = plane|action|airport|active|alarm|activity|album|actor|alike|actress|alive|actually|all|add|allow|addition|almond|address|almost|admire|alone|admit|along|adopt|aloud|adult|alphabet|advance|already|advantage|also|advice|although|advise|altogether|affair|always|affect|am|afraid|ambulance|after|America|American|aren't|among|argue|amount|argument|an|arm|ancient|armchair|and|army|angel|around|anger|arrange|angry|arrangement|animal|arrest|ankle|arrive|another|arrow|answer|art|ant|article|any|artist|anybody|as|anyhow|Asia|anyone|Asian|anyplace|ask|anything|asleep|anytime|assistant|anyway|assume|anywhere|at|apartment|attack|ape|attend|apologize|attention|appear|audience|appearance|August = Aug.|appetite|aunt = auntie = aunty|apple|Australia|apply|Australian|appreciate|autumn|April|available|apron|avoid|are|aware|area|away",   // A 範圍（a – away）144 字，課本 p.12–24
  B: "baby|babysitter|back|backward|backwards|bad|badminton|bag|bake|bakery|balcony|ball|balloon|bamboo|banana|band|bank|banker|bar|barbecue = Bar-B-Q|barber|bark|base|baseball|basement|basic|basis|basket|basketball|bat|bath|bathe|bathroom|battle|be|beach|bead|bean|bear|beard|beat|beautiful|beauty|because|become|bed|bedroom|bee|beef|beep|beer|beetle|before|beg|begin|beginner|beginning|behave|behind|belief|believable|believe|bell|belong|below|belt|bench|bend|beside|besides|best|bet|better|between|beyond|bicycle = bike|big|bill|bind|biology|bird|birth|birthday|bit|bite|bitter|black|blackboard|blame|blank|blanket|blind|block|blood|bloody|blouse|blow|blue|board|boat|body|boil|bomb|bone|bony|book|bookcase|boring|born|borrow|boss|both|bother|bottle|bottom|bow|bowl|bowling|box|boy|brain|branch|brand|brave|bread|break|breakfast|brick|bridge|brief|bright|bring|Britain|British|broad|broadcast|brother|brown|brunch|brush|bucket = pail|buffet|bug|build|building|bun|bundle|burger|burn|burst|bus|business|businessman|busy|but|butter|butterfly|button|buy|by"   // B 範圍（baby – by）160 字，課本 p.25–40
};
const wordListOf = name => (WORDLISTS[name] || "").split("|").flatMap(x => x.split(" = ")).map(w => w.trim()).filter(Boolean);
/* 聽力題（學生專區用，不需要圖）：script 是要念的句子，opts 是文字選項。plabel = 畫面上的作答說明 */
const SL = (id, tag, script, plabel, opts, ans, exp) => ({ id, type: "listen", part: 2, tag, plabel, opts, ans, hint: "", exp,
  script: [].concat(script), fixedOrder: true, v2: [...id].reduce((t, c) => t + c.charCodeAt(0), 0) % 2 === 1 });
/* 字母排序：把字卡照 ABC 順序排好（tiles 寫正確順序，畫面會自動打亂） */
const AO = (id, tag, letters, exp) => Object.assign(R(id, tag, "把字母照 ABC 順序排好", letters, "", exp), { label: "字母排序", scrLabel: "把字卡照 ABC 順序排好" });
/* 排序題（最多 4 項，畫面不會打亂）：items 照「畫面上要顯示的順序」寫，ans 是正確順序的項目編號 */
const ORD = (id, tag, stem, items, ans, exp) => Object.assign(O(id, stem, items, ans, "", exp), { tag, label: "排順序" });
/* 句子重組＋干擾字卡：extra 的字卡用不到 */
const RX = (id, tag, zh, tiles, extra, exp) => Object.assign(R(id, tag, zh, tiles, "", exp), { extra, scrLabel: `把字卡排成正確的句子（有 ${extra.length} 張字卡用不到）` });
/* 聽寫拼字：播「單字 → 例句 → 單字」，學生把單字拼出來（一律可以重聽） */
const DW = (id, tag, word, sentence, exp, plabel) => ({ id, type: "spell", full: true, dictation: true, dictSent: sentence, plabel, label: "聽寫", tag, stem: "___", ans: word, hint: "", exp });
/* 聽音補字母：和 DW 一樣有播放鍵（dictation），但首尾字母會給，學生只要補中間 2～3 個字母（不設 full）。
   挖幾格由單字長度決定（長度 − 2），所以只適合 4～5 個字母的字 */
const DH = (id, tag, word, zhPrompt, exp) => ({ id, type: "spell", dictation: true, plabel: "聽單字，把中間的字母補起來（可以重聽）", label: "聽音補字母", tag, stem: "___", zhPrompt, ans: word, hint: "", exp });
/* balance: true ＝ 這份不是照紙本抄的，讓 app.js 的選項平衡把正解平均分到 A/B/C（不要手動排，很容易全部集中在 A）
   hints: true ＝ 正式考模式也保留「提示」鍵（這份把句子的中文翻譯放在 hint 裡，按了才看得到） */
function studentPaper(b) {
  b.items.forEach(it => (it.type === "group" ? it.qs : [it]).forEach(q => { if (b.balance && !q.tfFixed) delete q.fixedOrder; else q.fixedOrder = true; }));
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

/* ---- Jovi：B 範圍（baby – by）單字考・基礎（共 40 題、20 分鐘） ----
   課本 p.25–40（Track 0145–0304）共 160 字。不是照紙本抄的，所以加 balance 讓正解平均分到 A～D。 */
studentPaper({
  id: "jovi-b1", student: "Jovi", minutes: 20, vocab: "B", balance: true,
  title: "B 範圍單字考・基礎",
  range: "Vocabulary Quiz B 範圍（baby – by）・基礎 ★☆",
  added: "2026-11-12",
  note: "",
  tags: {
    s1: "一、中翻英選擇", s2: "二、英翻中選擇", s3: "三、配對", s4: "四、拼字", s5: "五、字母重組",
    s6: "六、情境選擇", s7: "七、詞形變化", s8: "八、是非題", s9: "九、句子填空", s10: "十、短文克漏字"
  },
  items: [
  M("q1","s1","地下室",["basement","bathroom","bedroom","bookcase"],0,"","basement 地下室；bathroom 浴室、bedroom 臥室、bookcase 書架。"),
  M("q2","s1","羽毛球",["basketball","badminton","baseball","bowling"],1,"","badminton 羽毛球；basketball 籃球、baseball 棒球、bowling 保齡球。"),
  M("q3","s1","蝴蝶",["beetle","bee","butterfly","bug"],2,"","butterfly 蝴蝶；beetle 甲蟲、bee 蜜蜂、bug 蟲子。"),
  M("q4","s1","早午餐",["breakfast","brunch","buffet","burger"],1,"","brunch 早午餐（breakfast ＋ lunch）；breakfast 早餐、buffet 自助餐、burger 漢堡。"),
  M("q5","s1","理髮師",["banker","barber","businessman","beginner"],1,"","barber 理髮師；banker 銀行家、businessman 生意人、beginner 初學者。"),
  M("q6","s2","borrow",["買","借（入）","帶來","燃燒"],1,"","borrow 借（入）；買 buy、帶來 bring、燃燒 burn。"),
  M("q7","s2","bitter",["苦的","瞎的","勇敢的","無聊的"],0,"","bitter 苦的；瞎的 blind、勇敢的 brave、無聊的 boring。"),
  M("q8","s2","bend",["綁","使彎曲","吹","爆炸"],1,"","bend 使彎曲；綁 bind、吹 blow、爆炸 burst。"),
  M("q9","s2","besides",["在……之間","除……之外；此外","在……後面","在……旁邊"],1,"","besides 除……之外；此外。beside（沒有 s）才是「在……旁邊」。"),
  M("q10","s3","brick",["磚塊","毛毯","水桶","鈕扣","刷子"],0,"","brick 磚塊。"),
  M("q11","s3","blanket",["磚塊","毛毯","水桶","鈕扣","刷子"],1,"","blanket 毛毯。"),
  M("q12","s3","bucket",["磚塊","毛毯","水桶","鈕扣","刷子"],2,"","bucket 水桶（也可以說 pail）。"),
  M("q13","s3","button",["磚塊","毛毯","水桶","鈕扣","刷子"],3,"","button 鈕扣；按鈕。"),
  M("q14","s3","brush",["磚塊","毛毯","水桶","鈕扣","刷子"],4,"","brush 刷子；刷。"),
  SPF("q15","s4","生物學（n.）　b i _ l o _ y　→ ___","biology","biology 生物學（bio- 生命＋-logy 學問）。"),
  SPF("q16","s4","氣球（n.）　b a _ l o _ n　→ ___","balloon","balloon 氣球：兩個 l、兩個 o。"),
  SPF("q17","s4","自助餐（n.）　b u _ f _ t　→ ___","buffet","buffet 自助餐：兩個 f，唸作 [buˋfe]。"),
  SPF("q18","s4","黑板（n.）　b l a _ k b o _ r d　→ ___","blackboard","blackboard 黑板（black 黑＋board 板子）。"),
  SPF("q19","s5","橋　g / d / i / b / r / e　→ ___","bridge","bridge 橋。"),
  SPF("q20","s5","瓶子　t / o / l / e / b / t　→ ___","bottle","bottle 瓶子：中間兩個 t。"),
  SPF("q21","s5","竹子　m / o / a / b / b / o　→ ___","bamboo","bamboo 竹子：結尾兩個 o。"),
  M("q22","s6","The dog keeps ___ at the mailman.",["barking","beating","bending","blowing"],0,"","bark（狗）吠叫：那隻狗一直對郵差叫。"),
  M("q23","s6","I ___ a new bike last week.",["bought","brought","built","burned"],0,"","buy 的過去式是 bought：我上週買了一輛新腳踏車。"),
  M("q24","s6","Please ___ your homework to school tomorrow.",["build","bring","burn","bite"],1,"","bring 帶來：明天記得把作業帶來學校。"),
  M("q25","s6","My father ___ me for being late again.",["believed","blamed","behaved","belonged"],1,"","blame sb. for… 因為…責怪某人：我爸爸因為我又遲到而責怪我。"),
  M("q26","s6","___ you don't have a ticket, you can't go in.",["Before","Because","Besides","Between"],1,"","because 因為（後面接句子）：因為你沒有票，所以不能進去。"),
  M("q27","s6","This smartphone ___ to my sister.",["becomes","behaves","belongs","begins"],2,"","belong to… 屬於…：這支手機是我姊姊的。"),
  SPF("q28","s7","She ___ (become) a teacher two years ago.","became","two years ago 是過去式：become → became（不規則變化）。"),
  SPF("q29","s7","My brother is a ___ (begin). He just started learning the piano.","beginner","剛開始學的人＝初學者：begin ＋ -ner → beginner。"),
  SPF("q30","s7","Peter is my ___ (good) friend.","best","good 的最高級是 best（good – better – best）。"),
  SPF("q31","s7","She sings ___ (beautiful).","beautifully","修飾動詞 sings 要用副詞：beautiful → beautifully（字尾 -ful 加 -ly）。"),
  TF("q32","s8","A barber cuts people's hair.",true,"對：barber 理髮師，工作就是幫人剪頭髮。"),
  TF("q33","s8","Breakfast is the meal we eat at night.",false,"錯：breakfast 是早餐，早上吃的；晚上吃的是 dinner。"),
  TF("q34","s8","A bakery is a place where you can buy bread.",true,"對：bakery 麵包店，可以買到 bread 麵包。"),
  TF("q35","s8","If something is boring, it is very exciting.",false,"錯：boring 是無聊的，和 exciting 刺激的意思相反。"),
  { id: "q36", type: "scramble", label: "句子填空", tag: "s9", zh: "我每天騎腳踏車上學。", frame: "I go to school _ _ every day.", tiles: ["by", "bicycle"], extra: [], ans: "by bicycle", hint: "", exp: "by ＋ 交通工具（中間不加 a／the）：I go to school by bicycle every day." },
  { id: "q37", type: "scramble", label: "句子填空", tag: "s9", zh: "早餐是一天中最重要的一餐。", frame: "_ is the most important _ of the day.", tiles: ["Breakfast", "meal"], extra: [], ans: "Breakfast meal", hint: "", exp: "Breakfast is the most important meal of the day. 句首字母要大寫。" },
  G("q38g","s10","cloze","My Sister's Party",[
    "Last Saturday was my sister's [[38]]. My mom baked a big cake, and we had a party in the yard. After dinner, we watched the stars and saw some [[39]] flying around the light. We didn't go to [[40]] until midnight."
  ],null,[
    B("q38",38,["birthday","birth","bird","bit"],0,"","my sister's birthday 我姊姊的生日；birth 是「出生」。"),
    B("q39",39,["buns","bugs","buttons","bowls"],1,"","bugs 蟲子（會飛，繞著燈）；buns 小圓麵包、buttons 鈕扣、bowls 碗。"),
    B("q40",40,["bench","bank","bed","bath"],2,"","go to bed 上床睡覺：我們到半夜才去睡。")
  ])
  ]
});


/* ===== Jovi：國一上 第一次段考 檢討複習卷（Book 1 Lesson 1 ~ Review 1） =====
   原卷：恆毅中學 115 學年度第一學期 國一英文 第一次段考（照片在 Allen 那邊，不進 repo）。題目全部重寫，只對齊題型與難度。
   原卷錯的重點加重：All my、Their / they're、too / also、Is…? she's、書寫格式（大寫、標點）、These 改寫、Who / Whose 問句、
   文意字彙（animal、same、different、lifespans、sheep、rabbits、rooster、elephant、beautiful）。
   不考常識（例如生肖哪個是哪個），只考語法和字彙。原卷有圖的閱讀題用 Higgsfield 畫（docs/img/student/jovi-*.png，人名是程式加的）。
   難度：jovi-m1 基礎（30 題，句子和文章較短）、jovi-m2 中等（40 題，＝原卷難度）、jovi-m3 挑戰（之後做）。 */

/* ---- 中等（40 題、40 分鐘） ---- */
studentPaper({
  id: "jovi-m2", student: "Jovi", minutes: 40, balance: true,
  title: "第一次段考 檢討複習卷・中等",
  range: "Book 1 Lesson 1 ~ Review 1・中等 ★★（和段考同難度）",
  added: "2026-11-05",
  note: "",
  tags: {
    j1: "一、語法選擇", j2: "二、挑錯改正", j3: "三、克漏字", j4: "四、閱讀測驗",
    j5: "五、文意字彙", j6: "六、翻譯填空", j7: "七、依提示作答"
  },
  items: [
  /* ---------- 一、語法選擇 ---------- */
  M("q2","j1","Look at the boy. He is ___ son. They are his parents.",["Ken and Lisa's","Ken's and Lisa's","Ken and Lisa","Ken's and Lisa"],0,"","兩個人「共同」的兒子：只在最後一個名字加 's → Ken and Lisa's son。各自擁有才是 Ken's and Lisa's。"),
  M("q3","j1","___ friends ___ very nice to me.",["All my; are","My all; are","All my; is","My all; is"],0,"","all 要放在所有格前面：all my friends（不能說 my all）；friends 是複數，be 動詞用 are。"),
  M("q4","j1","A: Who is the boy in the photo?\nB: Oh, that's ___. I was only five then.",["me","I","my","mine"],0,"","That's me.（那是我。）be 動詞後面習慣用受格 me；my 後面要接名詞、mine＝我的東西。"),
  M("q6","j1","I have two cats. ___ names are Coco and Momo, and ___ very cute.",["Their; they're","They're; their","Its; it's","Their; their"],0,"","第一格後面接名詞 names → 所有格 Their（他們的）；第二格要「主詞＋be 動詞」→ they're（＝they are）。兩隻貓是複數，不能用 its / it's。"),
  M("q8","j1","A: ___ that girl?\nB: She's my sister. ___ name is Emma.",["Who's; Her","Whose; Her","Who's; She's","Whose; She's"],0,"","問「那個女生是誰」→ Who's（＝Who is）；第二格後面接名詞 name → 所有格 Her。Whose＝誰的。"),
  M("q9","j1","Mr. Lin is ___ English teacher, and his wife is ___ cook.",["an; a","a; an","an; an","a; a"],0,"","看「後面那個字的第一個音」：English 是母音開頭 → an；cook 是子音開頭 → a。"),
  M("q10","j1","Ben is a student. Amy is ___ a student. They are good friends, ___.",["also; too","too; also","also; also","too; too"],0,"","also 放在 be 動詞後面、句子中間；too 放在句尾，前面通常加逗號。"),
  M("q12","j1","Teacher: What is ___ and ___?\nStudent: It is fifty.",["thirty; twenty","twenty; thirteen","thirteen; twelve","fifteen; thirty"],0,"","30＋20＝50。注意 thirteen（13）和 thirty（30）、fifteen（15）和 fifty（50）不一樣。"),
  M("q14","j1","A: ___ your brothers tall?\nB: No, ___ short.",["Are; they're","Is; he's","Are; he's","Is; they're"],0,"","brothers 是複數 → Are your brothers…? 回答也用複數 they're（＝they are）。"),
  M("q17","j1","My sister is ___, and she is a very smart ___.",["six years old; six-year-old girl","six-year-old; six years old girl","six years old; six-years-old girl","six-year-old girl; six-year-old girl"],0,"","單獨說年齡：six years old（years 用複數）；放在名詞前面當形容詞要用連字號、year 不加 s：a six-year-old girl。"),
  M("q19","j1","請選出書寫格式正確的句子。",["Nice to meet you, Mr. Wang.","how are you, Tina?","My uncle is from japan.","Is she your cousin."],0,"","how 在句首要大寫 How；Japan 是國名要大寫；Is she…? 是問句，要用問號。"),

  /* ---------- 二、挑錯改正 ---------- */
  E("q20","j2","Her father name is Sean.","father","father's","","「她爸爸的名字」要用所有格：father's name。"),
  E("q22","j2","Kevin and Amy is good friends.","is","are","","Kevin and Amy 是兩個人（複數），be 動詞用 are。"),
  E("q24","j2","This is Amy's dog. It's name is Max.","It's","Its","","後面接名詞 name 要用所有格 Its（它的）；It's＝It is。"),

  /* ---------- 三、克漏字 ---------- */
  G("q25g","j3","cloze","Who Is That Boy?",[
    "Mia: Hey, Jay. Who is that boy?",
    "Jay: [[15]] my cousin, Leo. He is from Japan.",
    "Mia: Cool! [[16]] he a student?",
    "Jay: Yes, he is. He is a junior high school student, [[17]].",
    "Mia: Is Leo's sister a junior high school student, too?",
    "Jay: [[18]] She is only six."
  ],null,[
    B("q26",15,["He's","She's","I'm","They're"],0,"","that boy 是一個男生 → He's（＝He is）my cousin。"),
    B("q27",16,["Is","Are","Am","Be"],0,"","主詞 he → Is he a student?"),
    B("q28",17,["too","also","and","really"],0,"","放在句尾、前面有逗號 → too（也）。also 要放句子中間。"),
    B("q29",18,["No, she isn't.","Yes, she is.","No, he isn't.","Yes, he is."],0,"","她才 6 歲，不是國中生 → No, she isn't.（問的是 Leo's sister，用 she）"),
  ]),
  G("q30g","j3","cloze","Tom and Jerry",[
    "Tom and Jerry are twins, but they are very different. Tom is tall, but Jerry is [[19]]. Tom is thin, but Jerry is [[20]]. Tom is quiet, but Jerry [[21]]. He is very active."
  ],null,[
    B("q30",19,["short","tall","old","kind"],0,"","but 前後意思相反：tall（高）↔ short（矮）。"),
    B("q31",20,["heavy","thin","young","cute"],0,"","thin（瘦）↔ heavy（重、胖）。"),
    B("q33",21,["isn't","is","aren't","be"],0,"","Jerry isn't（quiet）：他不安靜，他很活潑。主詞 Jerry 是單數，用 isn't。"),
  ]),

  /* ---------- 四、閱讀測驗 ---------- */
  Object.assign(G("q34g","j4","article","Andy's Family Tree",[
    "Look at Andy's family tree and answer the questions. (The numbers are their ages.)"
  ],null,[
    Q("q34","How many people are there in Andy's family?",["Nine.","Eight.","Seven.","Ten."],0,"","Paul、Rose、Judy、David、Linda、Frank、Kate、Andy、Amy，共 9 個人。"),
    Q("q35","Who is Andy's uncle?",["Frank.","David.","Paul.","Judy."],0,"","Frank 是爸爸 David 的兄弟 → Andy 的叔叔（uncle）。David 是爸爸、Paul 是爺爺、Judy 是姑姑（aunt）。"),
    Q("q36","Which is TRUE?",["Kate is Andy's aunt.","Paul is Linda's father.","Amy is Andy's big sister.","Judy is Frank's wife."],0,"","Kate 是叔叔 Frank 的太太，也叫 aunt。Paul 是 David 的爸爸（Linda 是嫁進來的）；Amy 8 歲，是妹妹；Judy 是 Frank 的姊姊，不是太太。"),
  ]), { img: "img/student/jovi-m2-family.png" }),
  Object.assign(G("q35g","j4","article","Our Pets and Toys",[
    "Bolt is a robot dog. It is small and smart. Its owner is Ted, a ten-year-old boy.",
    "Honey is a teddy bear. It is big and cute. Its owner is Mia, a five-year-old girl. Honey is Mia's good friend.",
    "Kiwi is a parrot. It is green and very smart. Its owner is Mr. Lee, a seventy-year-old man.",
    "Snow is a rabbit. It is small and white. Its owners are the people in the Wang family."
  ],[["owner","主人"],["parrot","鸚鵡"],["teddy bear","泰迪熊"]],[
    Q("p1","Which toy is big?",["Honey.","Bolt.","Kiwi.","Snow."],0,"","Honey is a teddy bear. It is big and cute. Bolt 是小的；Kiwi 和 Snow 是動物，不是玩具。"),
    Q("p2","Who is Kiwi's owner?",["Mr. Lee.","Ted.","Mia.","The Wang family."],0,"","Kiwi 的主人是 Mr. Lee，一位 70 歲的先生。"),
    Q("p3","Which is NOT true?",["Honey is a small toy.","Bolt's owner is a ten-year-old boy.","Snow is a white rabbit.","Kiwi is a green parrot."],0,"","這題要選「錯的」：Honey 是大的（big），不是小的。其他三句文章裡都有。"),
  ]), { img: "img/student/jovi-m2-pets.png" }),
  Object.assign(G("q37g","j4","dialogue","The New Student",[
    "Amy: Who is the new student in our class?",
    "Ben: His name is Hiro. He is from Japan. His English is very good.",
    "Amy: What about his family?",
    "Ben: His mother is an English teacher, and his father is a cook. Hiro and his sister, Yumi, are twins. They are twelve.",
    "Amy: Is Yumi tall like Hiro?",
    "Ben: No, she isn't. She is short, but she is very strong. She is good at sports."
  ],null,[
    Q("q37","Who is Yumi?",["She is Hiro's twin sister.","She is Hiro's mother.","She is Ben's sister.","She is Hiro's teacher."],0,"","Hiro and his sister, Yumi, are twins → Yumi 是 Hiro 的雙胞胎姊妹。"),
    Q("q40","Which is NOT true?",["Yumi is tall.","Hiro's English is very good.","Hiro's father is a cook.","Yumi is good at sports."],0,"","這題要選「錯的」：Yumi 不高（She is short），所以「Yumi is tall」不是真的。其他三句文章裡都有。"),
  ]), { img: "img/student/jovi-m2-twins.png" }),

  /* ---------- 五、文意字彙（看頭尾字母，填出完整的字） ---------- */
  SP("q41","j5","A dog is an ___.","animal","","animal 動物。注意 an 後面接母音開頭的字。"),
  SP("q42","j5","Amy and May are twins. They have the ___ birthday.","same","","the same 相同的：雙胞胎生日一樣。"),
  SP("q43","j5","My cat and my dog are ___. The cat is small, and the dog is big.","different","","different 不同的（形容詞）：一隻小、一隻大。"),
  SP("q44","j5","Some turtles have very long ___. They can live for 100 years.","lifespans","","lifespan 壽命；主詞 Some turtles 是複數，所以用 lifespans。"),
  SP("q46","j5","Look at the ___ on the farm. They are white, and they are eating grass.","sheep","","sheep 綿羊：單複數同形（one sheep, two sheep），所以 They are 也是 sheep。"),

  /* ---------- 六、翻譯填空（寫出完整的字） ---------- */
  SPF("q51","j6","我是一個國中生。　I am a ___ high school student.","junior","junior high school 國中（senior high school 高中）。"),
  SPF("q52","j6","我們是一個溫暖的家庭。　We are a ___ family.","warm","warm 溫暖的：a warm family。"),
  SPF("q55","j6","我的阿姨是一位美麗的護理師。　My aunt is a ___ nurse.","beautiful","beautiful 美麗的：b-e-a-u-t-i-f-u-l，中間是 eau。"),

  /* ---------- 七、依提示作答 ---------- */
  RW("q58","j7","This is my brother's robot.","用 These 開頭改寫句子（robot 改成複數）","These",["These are my brother's robots."],"","This → These，is → are，robot → robots：These are my brother's robots."),
  RW("q59","j7","Mr. Chen is the boy's father.","針對「Mr. Chen」造原本的問句","",["Who is the boy's father?"],"","Mr. Chen 是「人」→ 用 Who 問：Who is the boy's father?（boy's 的 's 不能漏）"),
  RW("q60","j7","That is Kevin's cellphone.","針對「Kevin's」造原本的問句","",["Whose cellphone is that?"],"","Kevin's 是「誰的」→ 用 Whose＋名詞：Whose cellphone is that?"),
  ]
});

/* ---- 基礎（30 題、30 分鐘）：題型和中等卷一樣，句子、文章比較短 ---- */
studentPaper({
  id: "jovi-m1", student: "Jovi", minutes: 30, balance: true,
  title: "第一次段考 檢討複習卷・基礎",
  range: "Book 1 Lesson 1 ~ Review 1・基礎 ★☆（句子和文章比較短）",
  added: "2026-11-05",
  note: "",
  tags: {
    k1: "一、語法選擇", k2: "二、挑錯改正", k3: "三、克漏字", k4: "四、閱讀測驗",
    k5: "五、文意字彙", k6: "六、翻譯填空", k7: "七、依提示作答"
  },
  items: [
  /* ---------- 一、語法選擇 ---------- */
  M("b1","k1","I ___ a student.",["am","is","are","be"],0,"","主詞 I → am：I am a student."),
  M("b2","k1","Amy ___ my sister.",["is","am","are","be"],0,"","主詞 Amy 是一個人（第三人稱單數）→ is。"),
  M("b3","k1","___ name is Ken. He is my brother.",["His","He","Her","He's"],0,"","後面接名詞 name → 所有格 His（他的）。He's＝He is。"),
  M("b4","k1","Ben and Tom are my friends. ___ are very nice.",["They","Their","Them","They're"],0,"","後面已經有 are，這格要當主詞的 They。Their＝他們的；They're＝They are（會多一個 are）。"),
  M("b5","k1","This is ___ apple.",["an","a","two","X"],0,"","apple 是母音開頭 → an apple。two 後面要接複數 apples。"),
  M("b6","k1","A: Is she your aunt?\nB: Yes, ___.",["she is","he is","it is","I am"],0,"","問句用 she → Yes, she is.（簡答的 Yes 句尾不能縮寫成 she's）"),
  M("b7","k1","My father's brother is my ___.",["uncle","aunt","cousin","sister"],0,"","爸爸的兄弟＝叔叔／伯伯 uncle。"),
  M("b8","k1","I am twelve. Ben is twelve, ___.",["too","also","and","but"],0,"","放在句尾、前面有逗號 → too（也）。also 要放在 is 後面：Ben is also twelve."),
  M("b9","k1","A: ___ is that girl?\nB: She is my cousin.",["Who","What","Whose","Where"],0,"","回答是「人」（my cousin）→ 用 Who 問：Who is that girl?"),
  M("b10","k1","My cat is small, ___ my dog is big.",["but","or","too","also"],0,"","small 和 big 意思相反 → 用 but（但是）連接。"),

  /* ---------- 二、挑錯改正 ---------- */
  E("b11","k2","my mother is a nurse.","my","My","","句子開頭的第一個字母要大寫：My。"),
  E("b12","k2","They is my cousins.","is","are","","主詞 They 是複數 → are。"),

  /* ---------- 三、克漏字 ---------- */
  G("b13g","k3","cloze","Ken's Family",[
    "Ann: Hi, I'm Ann. [[13]]",
    "Ken: Nice to meet you, too. I'm Ken.",
    "Ann: Ken, who is that man?",
    "Ken: [[14]] my father. He is a cook.",
    "Ann: Is that woman your mother?",
    "Ken: [[15]] She is my aunt. [[16]] name is Joy."
  ],null,[
    B("b13",13,["Nice to meet you.","Good night.","Thank you.","Goodbye."],0,"","Ken 回答 Nice to meet you, too. → Ann 先說 Nice to meet you.（很高興認識你）"),
    B("b14",14,["He's","She's","I'm","It's"],0,"","that man 是男生 → He's（＝He is）my father。"),
    B("b15",15,["No, she isn't.","Yes, she is.","No, he isn't.","Yes, he is."],0,"","後面說 She is my aunt（她是阿姨），所以不是媽媽 → No, she isn't."),
    B("b16",16,["Her","She","His","He"],0,"","後面接名詞 name → 所有格 Her（她的）。"),
  ]),

  /* ---------- 四、閱讀測驗 ---------- */
  Object.assign(G("b17g","k4","article","Leo's Family Tree",[
    "Look at Leo's family tree and answer the questions. (The numbers are their ages.)"
  ],null,[
    Q("b17","How many people are there in Leo's family?",["Seven.","Six.","Eight.","Five."],0,"","Tom、Mary、Jack、Lisa、Ben、Leo、Sue，共 7 個人。"),
    Q("b18","Who is Leo's uncle?",["Ben.","Jack.","Tom.","Sue."],0,"","Ben 是爸爸 Jack 的兄弟 → Leo 的叔叔（uncle）。Jack 是爸爸、Tom 是爺爺、Sue 是妹妹。"),
    Q("b19","Who is Sue's grandmother?",["Mary.","Lisa.","Ben.","Leo."],0,"","Mary 是爸爸 Jack 的媽媽 → Sue 的奶奶（grandmother）。Lisa 是 Sue 的媽媽。"),
  ]), { img: "img/student/jovi-m1-family.png" }),
  G("b20g","k4","article","Hi, I'm Mia",[
    "Hi, I'm Mia. I'm thirteen. I am a junior high school student. My father is a farmer, and my mother is a nurse. I have a pet dog. Its name is Lucky. It is big and active."
  ],null,[
    Q("b20","Who is a nurse?",["Mia's mother.","Mia's father.","Mia.","Lucky."],0,"","my mother is a nurse → 護理師是 Mia 的媽媽；爸爸是農夫。"),
    Q("b21","Which is TRUE?",["Lucky is Mia's dog.","Mia is twelve.","Mia's father is a nurse.","Lucky is small."],0,"","Mia 有一隻寵物狗叫 Lucky。Mia 13 歲；爸爸是農夫；Lucky 是大的（big）。"),
  ]),

  /* ---------- 五、文意字彙（看頭尾字母，填出完整的字） ---------- */
  SP("b22","k5","The ___ likes bananas.","monkey","","monkey 猴子，愛吃香蕉。"),
  SP("b23","k5","I have two ___. They have long ears.","rabbits","","rabbit 兔子：two 後面用複數 rabbits。"),
  SP("b24","k5","The ___ is very big. It has a long nose.","elephant","","elephant 大象：很大、鼻子很長。"),
  SP("b25","k5","The ___ is a bird on the farm. It sings in the morning.","rooster","","rooster 公雞：農場裡的鳥，早上會啼叫。"),

  /* ---------- 六、翻譯填空（看頭尾字母） ---------- */
  SP("b26","k6","我的爺爺是一名農夫。　My grandpa is a ___.","farmer","","farmer 農夫（farm 農場＋-er）。"),
  SP("b27","k6","我的奶奶是一名廚師。　My grandma is a ___.","cook","","cook 當名詞是「廚師」，當動詞是「煮」。"),
  SP("b28","k6","我的爸爸很英俊。　My father is ___.","handsome","","handsome 英俊的（形容男生）。"),

  /* ---------- 七、依提示作答 ---------- */
  RW("b29","k7","This is my apple.","用 These 開頭改寫句子（apple 改成複數）","These",["These are my apples."],"","This → These，is → are，apple → apples：These are my apples."),
  RW("b30","k7","Ben is my brother.","針對「Ben」造原本的問句（my 要換成 your）","",["Who is your brother?"],"","Ben 是「人」→ 用 Who 問；問對方要說 your：Who is your brother?"),
  ]
});


/* ===== Yuri（國小低年級）：期中複習模擬卷 1～4，由易到難 =====
   範圍：Unit 1（字母 Aa–Jj、數字 1–5、What's your name?）、Unit 2（字母 Kk–Oo、數字 6–10、How old are you?）、
        Review 1 All About Me、課堂用語（Thank you. / You're welcome. / How are you? / Listen!）、Story Time 萬聖節單字。
   出題原則：字母與發音一律用聽的（單字寫出來再問開頭字母＝看得到答案，不出）；
            挑戰卷用挑錯、配對、字母排序、句子重組、短文閱讀，完整單字填空每卷最多 2 題。
   卷 1、2 的聽力可以重聽（relisten），卷 3A、3B 照正式考每題只播一遍。 */

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

/* ---- 卷 2：中等（32 題、25 分鐘） ---- */
studentPaper({
  id: "yuri-m2", student: "Yuri", minutes: 25, relisten: true,
  title: "期中複習模擬卷 2・進階",
  range: "Unit 1 ~ Review 1 ＋ 萬聖節單字・加入字母排序與句子重組",
  added: "2026-11-04",
  note: "",
  tags: { y1: "一、聽力", y2: "二、字母順序", y3: "三、單字", y4: "四、拼出單字", y5: "五、看句子選答案", y6: "六、文法選擇", y7: "七、句子重組" },
  items: [
  SL("b01","y1","jam","聽一個單字，選出它開頭的字母",["Gg","Jj","Kk"],1,"jam（果醬）開頭的發音是 /dʒ/，所以是 Jj。"),
  SL("b02","y1","neck","聽一個單字，選出它開頭的字母",["Mm","Nn","Ll"],1,"neck（脖子）開頭的發音是 /n/，所以是 Nn。"),
  SL("b03","y1","insect","聽一個單字，選出它開頭的字母",["Ii","Ee","Aa"],0,"insect（昆蟲）開頭的發音是 /ɪ/，所以是 Ii。"),
  SL("b04","y1","otter","聽一個單字，選出它開頭的字母",["Aa","Oo","Ii"],1,"otter（水獺）開頭的發音是 /ɑ/，所以是 Oo。"),
  SL("b05","y1","goat","聽一個單字，選出它的中文意思",["山羊","女孩","手"],0,"goat 山羊、girl 女孩，開頭都是 g。"),
  SL("b06","y1","seven","聽一個數字，選出正確的阿拉伯數字",["6","7","9"],1,"seven = 7。"),
  SL("b07","y1","What's your name?","聽一個問題，選出最適合的回答",["I'm ten years old.","My name is Rocky.","You're welcome."],1,"問名字 → My name is Rocky."),
  SL("b08","y1","How old are you?","聽一個問題，選出最適合的回答",["I'm nine years old.","I'm a girl.","Good."],0,"問年紀 → I'm nine years old."),
  AO("b09","y2",["d","e","f","g"],"照 ABC 順序是 d e f g。"),
  AO("b10","y2",["k","l","m","n"],"照 ABC 順序是 k l m n。"),
  M("b11","y2","照 ABC 順序，字母 h 和 j 中間是哪一個字母？",["i","g","k"],0,"","…g h i j k…，h 和 j 中間是 i。"),
  M("b12","y2","照 ABC 順序，字母 l 的後面是哪一個字母？",["k","m","n"],1,"","…k l m n…，l 後面是 m。"),
  M("b13","y3","「大象」的英文是哪一個？",["elephant","egg","insect"],0,"","elephant 大象、egg 蛋，開頭都是 e。"),
  M("b14","y3","「猴子」的英文是哪一個？",["milk","monkey","nose"],1,"","monkey 猴子、milk 牛奶，開頭都是 m。"),
  M("b15","y3","「南瓜」的英文是哪一個？",["pumpkin","spider","ghost"],0,"","pumpkin 南瓜。"),
  M("b16","y3","「女巫」的英文是哪一個？",["vampire","witch","bat"],1,"","witch 女巫、vampire 吸血鬼。"),
  M("b17","y3","It's Halloween night. I can see a ___ in the sky.",["spider","bat","ox"],1,"","bat 蝙蝠會在夜空中飛；spider 蜘蛛、ox 公牛不會。"),
  SPF("b18","y4","蘋果（開頭是 a，共 5 個字母）：___","apple","apple 蘋果。"),
  SPF("b19","y4","鑰匙（開頭是 k，共 3 個字母）：___","key","key 鑰匙。"),
  SPF("b20","y4","鼻子（開頭是 n，共 4 個字母）：___","nose","nose 鼻子。"),
  SPF("b21","y4","照字母順序，填出空格的小寫字母：i j ___ l","k","i j k l。"),
  SPF("b22","y4","照字母順序，填出空格的小寫字母：k l m ___","n","k l m n。"),
  M("b23","y5","A: Hi! What's your name?　B: ___",["I'm seven.","My name is Mia.","Thank you."],1,"","問名字要回答名字。"),
  M("b24","y5","A: Thank you.　B: ___",["You're welcome.","How are you?","I'm a boy."],0,"","Thank you. → You're welcome."),
  M("b25","y5","A: How are you?　B: ___",["Good. Thank you.","My name is Ken.","I'm ten years old."],0,"","問好 → Good. Thank you."),
  X("b26","y5","把問句和答句配成一對。",["What's your name?","How old are you?","Thank you."],["My name is Teddy.","I'm six years old.","You're welcome."],"","問名字答名字、問年紀答歲數、說謝謝回不客氣。"),
  M("b27","y6","___ your name?",["What's","How","I'm"],0,"","What's your name?（What's = What is）"),
  M("b28","y6","___ old are you?",["What","How","My"],1,"","How old are you?"),
  M("b29","y6","I ___ a girl.",["am","is","are"],0,"","I am a girl.（I 配 am）"),
  M("b30","y6","I'm ten ___ old.",["year","years","old"],1,"","I'm ten years old.（兩歲以上用 years）"),
  R("b31","y7","我的名字是 Teddy。",["My","name","is","Teddy."],"","My name is Teddy."),
  R("b32","y7","我九歲。",["I'm","nine","years","old."],"","I'm nine years old."),
  ]
});

/* ---- 卷 3A：挑戰（35 題、30 分鐘，聽力只播一遍） ---- */
studentPaper({
  id: "yuri-m3", student: "Yuri", minutes: 30,
  title: "期中複習模擬卷 3A・挑戰",
  range: "全範圍・聽力只播一遍，含挑錯、配對、字母排序、短文閱讀",
  added: "2026-11-05",
  note: "",
  tags: { y1: "一、聽力", y2: "二、字母", y3: "三、單字", y4: "四、找出錯誤", y5: "五、對話", y6: "六、句子重組", y7: "七、閱讀" },
  items: [
  SL("c01","y1","hand","聽一個單字，選出它開頭的字母",["Nn","Hh","Jj"],1,"hand（手）開頭的發音是 /h/。"),
  SL("c02","y1","girl","聽一個單字，選出它開頭的字母",["Jj","Gg","Kk"],1,"girl（女孩）開頭的發音是 /g/；jet 才是 Jj。"),
  SL("c03","y1","lion","聽一個單字，選出它開頭的字母",["Ll","Ii","Oo"],0,"lion（獅子）開頭的發音是 /l/。"),
  SL("c04","y1","elephant","聽一個單字，選出它開頭的字母",["Ii","Aa","Ee"],2,"elephant（大象）開頭的發音是 /ɛ/。"),
  SL("c05","y1","jam","聽一個單字，選出它的中文意思",["果醬","噴射機","罐子"],0,"jam 果醬、jet 噴射機，開頭都是 j。"),
  SL("c06","y1","neck","聽一個單字，選出它的中文意思",["鼻子","脖子","牛奶"],1,"neck 脖子、nose 鼻子，開頭都是 n。"),
  SL("c07","y1","ox","聽一個單字，選出它的中文意思",["公牛","水獺","猴子"],0,"ox 公牛、otter 水獺，開頭都是 o。"),
  SL("c08","y1","I'm nine years old.","聽一句話，選出正確的數字",["7","9","10"],1,"nine = 9。"),
  SL("c09","y1","Hello! My name is Edison. I'm eight.","聽一段自我介紹，選出正確的一組",["Edison・8 歲","Edison・9 歲","Amber・8 歲"],0,"名字是 Edison，eight = 8 歲。"),
  SL("c10","y1","How old are you?","聽一個問題，選出最適合的回答",["My name is Abu.","I'm a boy.","I'm eight years old."],2,"問年紀 → I'm eight years old."),
  AO("c11","y2",["g","h","i","j"],"照 ABC 順序是 g h i j。"),
  AO("c12","y2",["l","m","n","o"],"照 ABC 順序是 l m n o。"),
  M("c13","y2","照 ABC 順序，字母 e 和 g 中間是哪一個字母？",["f","d","h"],0,"","…d e f g h…，e 和 g 中間是 f。"),
  X("c14","y2","把大寫和小寫配成一對。",["J","K","L","M","N"],["j","k","l","m","n"],"","J-j、K-k、L-l、M-m、N-n。"),
  SPF("c15","y2","照字母順序，填出空格的小寫字母：h ___ j k","i","h i j k。"),
  M("c16","y3","ox 的中文是什麼？",["公牛","水獺","盒子"],0,"","ox 公牛、otter 水獺。"),
  M("c17","y3","vampire 的中文是什麼？",["女巫","吸血鬼","鬼"],1,"","vampire 吸血鬼、witch 女巫、ghost 鬼。"),
  M("c18","y3","Trick or treat! Look at my hat. I'm a ___.",["witch","pumpkin","bat"],0,"","戴尖帽子的是 witch 女巫。"),
  M("c19","y3","It's night. The ___ is flying over the haunted house.",["ox","goat","bat"],2,"","會在夜裡飛的是 bat 蝙蝠。"),
  SPF("c20","y3","鬼（開頭是 g，共 5 個字母）：___","ghost","ghost 鬼。"),
  SPF("c21","y3","猴子（開頭是 m，共 6 個字母）：___","monkey","monkey 猴子。"),
  E("c22","y4","My name are Abu.","are","is","","主詞是 My name（一個東西），要用 is。"),
  E("c23","y4","I'm ten year old.","year","years","","兩歲以上要用複數 years：I'm ten years old."),
  E("c24","y4","my name is Mia.","my","My","","句子開頭的第一個字母要大寫。"),
  X("c25","y5","把問句和答句配成一對。",["What's your name?","How old are you?","Thank you.","How are you?"],["My name is Ken.","I'm ten years old.","You're welcome.","Good."],"","四組常用問答。"),
  M("c26","y5","A: Hello! My name is Mia. What's your name?　B: ___",["I'm ten years old.","Hi! My name is Ken.","You're welcome."],1,"","對方先說名字再問你，要回答自己的名字。"),
  M("c27","y5","上課時老師說 Listen! 的意思是什麼？",["請聽","請坐","謝謝"],0,"","Listen! 聽！"),
  M("c28","y5","A: ___　B: Good. Thank you.",["What's your name?","How are you?","How old are you?"],1,"","回答 Good. 對應的問題是 How are you?"),
  R("c29","y6","你好！我的名字是 Amber。",["Hello!","My","name","is","Amber."],"","Hello! My name is Amber."),
  R("c30","y6","我是女生。",["I'm","a","girl."],"","I'm a girl."),
  R("c31","y6","我十歲。",["I'm","ten","years","old."],"","I'm ten years old."),
  G("c32g","y7","dialogue","At the Party",[
    "Amber: Hi! I'm Amber. What's your name?",
    "Teddy: Hello! My name is Teddy.",
    "Amber: How old are you?",
    "Teddy: I'm eight years old. How about you?",
    "Amber: I'm ten.",
    "Teddy: Nice to meet you, Amber!"
  ],[["party","派對"],["How about you?","你呢？"],["Nice to meet you.","很高興認識你"]],[
    Q("c32","Teddy 幾歲？",["8 歲","9 歲","10 歲"],0,"","Teddy 說 I'm eight years old."),
    Q("c33","誰是十歲？",["Amber","Teddy","兩個人都是"],0,"","Amber 說 I'm ten."),
    Q("c34","Amber 第一句話先問 Teddy 什麼？",["名字","年紀","心情"],0,"","Amber 先問 What's your name?"),
    Q("c35","How about you? 的意思是什麼？",["你呢？","你好嗎？","謝謝你"],0,"","問完自己的事，再反問對方「你呢？」")
  ]),
  ]
});

/* ---- 卷 3B：挑戰（35 題、30 分鐘，聽力只播一遍） ---- */
studentPaper({
  id: "yuri-m4", student: "Yuri", minutes: 30,
  title: "期中複習模擬卷 3B・挑戰",
  range: "全範圍・聽力只播一遍，含挑錯、配對、字母排序、短文閱讀",
  added: "2026-11-05",
  note: "",
  tags: { y1: "一、聽力", y2: "二、字母", y3: "三、單字", y4: "四、找出錯誤", y5: "五、對話", y6: "六、句子重組", y7: "七、閱讀" },
  items: [
  SL("d01","y1","duck","聽一個單字，選出它開頭的字母",["Dd","Bb","Gg"],0,"duck（鴨子）開頭的發音是 /d/。"),
  SL("d02","y1","key","聽一個單字，選出它開頭的字母",["Cc","Kk","Gg"],1,"key 的開頭發音雖然和 cat 一樣是 /k/，但它是用字母 k 拼的。"),
  SL("d03","y1","insect","聽一個單字，選出它開頭的字母",["Ee","Ii","Aa"],1,"insect（昆蟲）開頭的發音是 /ɪ/。"),
  SL("d04","y1","nose","聽一個單字，選出它開頭的字母",["Mm","Nn","Ll"],1,"nose（鼻子）開頭的發音是 /n/。"),
  SL("d05","y1","cup","聽一個單字，選出它的中文意思",["貓","杯子","鑰匙"],1,"cup 杯子、cat 貓，開頭都是 c。"),
  SL("d06","y1","goat","聽一個單字，選出它的中文意思",["女孩","山羊","鬼"],1,"goat 山羊、girl 女孩，開頭都是 g。"),
  SL("d07","y1","egg","聽一個單字，選出它的中文意思",["蛋","大象","手"],0,"egg 蛋、elephant 大象，開頭都是 e。"),
  SL("d08","y1","Hi! I'm a boy. I'm seven years old.","聽一段自我介紹，選出正確的一組",["男生・7 歲","女生・7 歲","男生・8 歲"],0,"a boy 男生、seven = 7 歲。"),
  SL("d09","y1","What's your name?","聽一個問題，選出最適合的回答",["Good, thank you.","I'm Rocky.","I'm nine."],1,"問名字 → I'm Rocky."),
  SL("d10","y1","You're welcome.","聽一句話，想一想對方剛剛說了什麼",["Thank you.","How are you?","What's your name?"],0,"先有人說 Thank you.，才會回 You're welcome."),
  AO("d11","y2",["i","j","k","l"],"照 ABC 順序是 i j k l。"),
  AO("d12","y2",["c","d","e","f"],"照 ABC 順序是 c d e f。"),
  M("d13","y2","照 ABC 順序，字母 k 的後面兩個字母是哪一組？",["l m","j k","m n"],0,"","…j k l m n…，k 後面是 l m。"),
  X("d14","y2","把大寫和小寫配成一對。",["B","D","F","H","J"],["b","d","f","h","j"],"","B-b、D-d、F-f、H-h、J-j。"),
  SPF("d15","y2","照字母順序，填出空格的小寫字母：c ___ e f","d","c d e f。"),
  M("d16","y3","spider 的中文是什麼？",["蜘蛛","蝙蝠","女巫"],0,"","spider 蜘蛛、bat 蝙蝠。"),
  M("d17","y3","「噴射機」的英文是哪一個？",["jet","jam","key"],0,"","jet 噴射機、jam 果醬，開頭都是 j。"),
  M("d18","y3","Boo! I'm white. I can fly. I'm a ___.",["goat","ghost","girl"],1,"","白色、會飛、說 Boo! 的是 ghost 鬼。"),
  M("d19","y3","Look! It's big and orange. It's a ___.",["pumpkin","milk","nose"],0,"","又大又橘的是 pumpkin 南瓜。"),
  SPF("d20","y3","昆蟲（開頭是 i，共 6 個字母）：___","insect","insect 昆蟲。"),
  SPF("d21","y3","大象（開頭是 e，共 8 個字母）：___","elephant","elephant 大象。"),
  E("d22","y4","How old is you?","is","are","","主詞是 you，要用 are：How old are you?"),
  E("d23","y4","I am a girl. I am seven year old.","year","years","","兩歲以上要用複數 years。"),
  E("d24","y4","hello! My name is Ken.","hello","Hello","","句子開頭的第一個字母要大寫。"),
  X("d25","y5","把問句和答句配成一對。",["What's your name?","How old are you?","How are you?","Thank you."],["I'm Abu.","I'm six years old.","Good, thank you.","You're welcome."],"","四組常用問答。"),
  M("d26","y5","A: How are you?　B: ___",["I'm ten years old.","Good, thank you.","My name is Mia."],1,"","問好 → Good, thank you."),
  M("d27","y5","A: What's your name?　B: ___",["I'm fine.","I'm Rocky.","I'm nine."],1,"","問名字要回答名字，不是年紀。"),
  M("d28","y5","I'm a boy. 的意思是什麼？",["我是男生。","我很好。","我八歲。"],0,"","boy 男生、girl 女孩。"),
  R("d29","y6","你好嗎？",["How","are","you?"],"","How are you?"),
  R("d30","y6","我的名字是 Rocky。",["My","name","is","Rocky."],"","My name is Rocky."),
  R("d31","y6","我是男生，我八歲。",["I'm","a","boy.","I'm","eight","years","old."],"","I'm a boy. I'm eight years old."),
  G("d32g","y7","article","All About Mia",[
    "Hello! My name is Mia.",
    "I'm a girl. I'm ten years old.",
    "This is my cat. Its name is Milk.",
    "Milk is two years old. I like my cat."
  ],[["This is…","這是…"],["Its name is…","牠的名字是…"],["like","喜歡"]],[
    Q("d32","Mia 幾歲？",["10 歲","2 歲","8 歲"],0,"","I'm ten years old."),
    Q("d33","Mia 是男生還是女生？",["女生","男生","文章沒有說"],0,"","I'm a girl."),
    Q("d34","Milk 是什麼？",["一隻貓","牛奶","Mia 的朋友"],0,"","This is my cat. Its name is Milk."),
    Q("d35","Milk 幾歲？",["2 歲","10 歲","文章沒有說"],0,"","Milk is two years old.")
  ]),
  ]
});

/* ---- 卷 4：挑戰 Plus（36 題、35 分鐘，聽力只播一遍；加入聽對話、對話排序、克漏字、干擾字卡） ---- */
studentPaper({
  id: "yuri-m5", student: "Yuri", minutes: 35,
  title: "期中複習模擬卷 4・挑戰 Plus",
  range: "全範圍・最難一份：聽對話、對話排序、克漏字、干擾字卡、短文比較",
  added: "2026-11-05",
  note: "",
  tags: { y1: "一、聽對話與單字", y2: "二、字母", y3: "三、單字", y4: "四、找出錯誤", y5: "五、把對話排順序", y6: "六、克漏字", y7: "七、句子重組", y8: "八、閱讀" },
  items: [
  SL("e01","y1",["W: Hi! What's your name?","M: My name is Teddy. I'm eight."],"聽一段對話，選出正確的一組",["Teddy・8 歲","Teddy・9 歲","Amber・8 歲"],0,"男生說 My name is Teddy. I'm eight."),
  SL("e02","y1",["M: Hello! How old are you?","W: I'm ten years old."],"聽一段對話，選出女生的年紀",["10 歲","9 歲","對話中沒有說"],0,"女生回答 I'm ten years old."),
  SL("e03","y1",["W: Thank you!","M: You're welcome."],"聽一段對話，選出他們在做什麼",["道謝和回應","問名字","問年紀"],0,"Thank you. 是道謝，You're welcome. 是回應。"),
  SL("e04","y1",["M: Hello! I'm Rocky. I'm a boy.","W: Hi, Rocky! I'm Mia. I'm a girl."],"聽一段對話，選出誰是女生",["Mia","Rocky","兩個都是"],0,"Mia 說 I'm a girl."),
  SL("e05","y1","jet","聽一個單字，選出它的中文意思",["噴射機","果醬","鑰匙"],0,"jet 噴射機、jam 果醬，開頭都是 j。"),
  SL("e06","y1","otter","聽一個單字，選出它的中文意思",["公牛","水獺","獅子"],1,"otter 水獺、ox 公牛，開頭都是 o。"),
  SL("e07","y1","hat","聽一個單字，選出它的中文意思",["手","帽子","脖子"],1,"hat 帽子、hand 手，開頭都是 h。"),
  SL("e08","y1","monkey","聽一個單字，選出它開頭的字母",["Nn","Mm","Ll"],1,"monkey（猴子）開頭的發音是 /m/。"),
  SL("e09","y1","Hi! I'm Amber. I'm a girl. I'm six years old.","聽一段自我介紹，選出正確的一組",["女生・6 歲","女生・7 歲","男生・6 歲"],0,"a girl 女生、six = 6 歲。"),
  SL("e10","y1",["M: Hi! I'm Teddy. I'm eight years old.","W: Hello! I'm Mia. I'm ten years old."],"聽一段對話，選出年紀比較大的人",["Mia","Teddy","兩個人一樣大"],0,"Teddy 八歲、Mia 十歲，所以 Mia 比較大。"),
  AO("e11","y2",["f","g","h","i","j"],"照 ABC 順序是 f g h i j。"),
  AO("e12","y2",["j","k","l","m","n"],"照 ABC 順序是 j k l m n。"),
  M("e13","y2","從 a 開始數，第 7 個字母是哪一個？",["g","f","h"],0,"","a b c d e f g，第 7 個是 g。"),
  X("e14","y2","把大寫和小寫配成一對。",["I","J","L","M","N"],["i","j","l","m","n"],"","I-i、J-j、L-l、M-m、N-n，小寫很像要看清楚。"),
  M("e15","y3","I'm black. I have eight legs. I'm a ___.",["spider","bat","ox"],0,"","有八隻腳的是 spider 蜘蛛。"),
  M("e16","y3","I'm big and orange. You can see me at Halloween. I'm a ___.",["ghost","pumpkin","witch"],1,"","又大又橘、萬聖節會看到的是 pumpkin 南瓜。"),
  M("e17","y3","This animal is big. It says \"Moo.\" It's an ___.",["ox","otter","ape"],0,"","會叫 Moo 的大動物是 ox 公牛；ox 是母音開頭，要用 an。"),
  SPF("e18","y3","水獺（開頭是 o，共 5 個字母）：___","otter","otter 水獺。"),
  SPF("e19","y3","吸血鬼（開頭是 v，共 7 個字母）：___","vampire","vampire 吸血鬼。"),
  E("e20","y4","What's you name?","you","your","","問「你的」名字要用 your：What's your name?"),
  E("e21","y4","Hello! my name is Abu.","my","My","","句子開頭的第一個字母要大寫。"),
  E("e22","y4","I'm a girl. I'm six year old.","year","years","","兩歲以上要用複數 years。"),
  E("e23","y4","Thank you. You welcome.","You","You're","","不客氣是 You're welcome.（You're = You are）"),
  ORD("e24","y5","把下面四句排成一段通順的對話。",
    ["I'm eight years old.","Hi! What's your name?","How old are you?","My name is Teddy."],[1,3,2,0],
    "先問名字、再回答名字，接著問年紀、再回答年紀。"),
  ORD("e25","y5","把下面四句排成一段通順的對話。",
    ["You're welcome.","Hello! How are you?","Good, thank you.","Thank you!"],[1,2,3,0],
    "先問好、回答 Good，再道謝、最後回不客氣。"),
  G("e26g","y6","cloze","Nice to Meet You",[
    "Amber: Hi! [[1]] your name?",
    "Rocky: [[2]] name is Rocky.",
    "Amber: [[3]] old are you?",
    "Rocky: I'm seven [[4]] old."
  ],[["Nice to meet you.","很高興認識你"]],[
    B("e26",1,["What's","How","My"],0,"","問名字用 What's your name?"),
    B("e27",2,["My","I'm","You"],0,"","My name is Rocky."),
    B("e28",3,["How","What","Who"],0,"","問年紀用 How old are you?"),
    B("e29",4,["year","years","old"],1,"","兩歲以上用 years：seven years old.")
  ]),
  RX("e30","y7","我是男生。",["I'm","a","boy."],["am"],"I'm a boy.（I'm 已經有 am 了，不用再放一個）"),
  RX("e31","y7","你幾歲？",["How","old","are","you?"],["is"],"How old are you?（主詞是 you，用 are 不用 is）"),
  R("e32","y7","你好！我的名字是 Mia，我七歲。",["Hello!","My","name","is","Mia.","I'm","seven."],"","Hello! My name is Mia. I'm seven."),
  G("e33g","y8","article","My Friends",[
    "Hello! My name is Amber. I'm a girl. I'm nine years old.",
    "This is Teddy. He is a boy. He is eight.",
    "This is Mia. She is seven. She has a cat.",
    "We are good friends."
  ],[["He","他"],["She","她"],["has","有"],["friend","朋友"],["We","我們"]],[
    Q("e33","他們三個人裡面，誰最大？",["Amber","Teddy","Mia"],0,"","Amber 九歲、Teddy 八歲、Mia 七歲。"),
    Q("e34","Teddy 幾歲？",["8 歲","7 歲","9 歲"],0,"","He is eight."),
    Q("e35","誰有一隻貓？",["Mia","Amber","Teddy"],0,"","She has a cat. 這個 She 指的是 Mia。"),
    Q("e36","這篇短文總共介紹了幾個人？",["3 個","2 個","4 個"],0,"","Amber、Teddy、Mia 共三個人。")
  ]),
  ]
});

/* ===== Ayden（雙語／全美班・自然發音）：期中複習模擬卷 1～3 =====
   範圍（原稿照片在專案根目錄 `Ayden期中考/`，已 gitignore）：
     Consonants（字首／字中／字尾子音）、Silent Consonants（不發音子音）、
     L Blends（bl cl fl gl pl sl）、R Blends（br cr dr fr gr pr tr）、S Blends（sc sk sl sm sn sp st sw）、
     Spelling Words（shop shift ship shock brush flash fish crash cash wish）
   題目用英文（和他的課本一致），解析用中文。聽寫題一律可以重聽。 */

/* ---- 卷 1：Basic（32 題、25 分鐘，比練習本簡單一點） ---- */
studentPaper({
  id: "ayden-m1", student: "Ayden", minutes: 25, relisten: true,
  title: "Midterm Review 1・Basic",
  range: "Consonants・Silent Consonants・L/R/S Blends・Spelling Words",
  added: "2026-11-04",
  note: "",
  tags: { a1: "1. Listen and Choose", a2: "2. Spelling Dictation", a3: "3. L Blends", a4: "4. R Blends", a5: "5. S Blends", a6: "6. Silent Consonants", a7: "7. Consonant Position" },
  items: [
  SL("f01","a1","blanket","Listen to the word. Which blend do you hear at the beginning?",["bl","cl","gl"],0,"blanket 開頭是 bl。"),
  SL("f02","a1","clown","Listen to the word. Which blend do you hear at the beginning?",["cl","pl","sl"],0,"clown 開頭是 cl。"),
  SL("f03","a1","grandma","Listen to the word. Which blend do you hear at the beginning?",["dr","gr","tr"],1,"grandma 開頭是 gr。"),
  SL("f04","a1","skate","Listen to the word. Which blend do you hear at the beginning?",["sk","sp","sw"],0,"skate 開頭是 sk。"),
  SL("f05","a1","snow","Listen to the word. Which blend do you hear at the beginning?",["sn","sm","sl"],0,"snow 開頭是 sn。"),
  SL("f06","a1","trumpet","Listen to the word. Which blend do you hear at the beginning?",["tr","dr","pr"],0,"trumpet 開頭是 tr。"),
  DW("f07","a2","shop","I go to the shop with my mom.","shop 商店。sh 是一個音，不是 s＋h。"),
  DW("f08","a2","fish","The fish swims in the lake.","fish 魚。"),
  DW("f09","a2","wish","I wish you a happy birthday.","wish 希望、願望。"),
  DW("f10","a2","flash","I saw a flash of light.","flash 閃光。fl 是 L blend。"),
  M("f11","a3","Dylan hides under his ___anket when there is a thunderstorm.",["bl","cl","sl"],0,"","blanket 毯子。"),
  M("f12","a3","___amingoes are beautiful pink birds.",["Fl","Bl","Gl"],0,"","flamingo 紅鶴。"),
  M("f13","a3","Earth is the only ___anet in our solar system that has life.",["pl","bl","cl"],0,"","planet 行星。"),
  M("f14","a3","Which word is an L-blend word?",["glow","grow","snow"],0,"","glow 是 gl（L blend）；grow 是 R blend、snow 是 S blend。"),
  M("f15","a4","The ___acelet that my mother made for me broke.",["br","cr","tr"],0,"","bracelet 手鍊。"),
  M("f16","a4","There is ___easure on the island.",["tr","dr","pr"],0,"","treasure 寶藏。"),
  M("f17","a4","My little brother has cute ___ooked teeth.",["cr","gr","br"],0,"","crooked 彎曲的。"),
  M("f18","a4","Which word is an R-blend word?",["dream","steam","smooth"],0,"","dream 是 dr（R blend）；steam 和 smooth 是 S blends。"),
  M("f19","a5","The ___arecrow wore a scarlet scarf.",["sc","sk","sw"],0,"","scarecrow 稻草人。"),
  M("f20","a5","My dad ___ored as he slept on the couch.",["sn","sm","sl"],0,"","snored 打呼。"),
  M("f21","a5","The ___amp looks really spooky at night.",["sw","sp","st"],0,"","swamp 沼澤。"),
  M("f22","a5","Which word has an S blend?",["smooth","blue","great"],0,"","smooth 是 sm（S blend）。"),
  M("f23","a6","Which letter is silent in \"knife\"?",["k","n","f"],0,"","knife 的 k 不發音。"),
  M("f24","a6","Which letter is silent in \"lamb\"?",["b","l","m"],0,"","lamb 的 b 不發音。"),
  M("f25","a6","Which letter is silent in \"sign\"?",["g","s","n"],0,"","sign 的 g 不發音。"),
  M("f26","a6","Which letter is silent in \"listen\"?",["t","l","n"],0,"","listen 的 t 不發音。"),
  X("f27","a6","Match the word with its silent letter.",["knob","comb","ghost","half"],["k","b","h","l"],"","knob 不發 k、comb 不發 b、ghost 不發 h、half 不發 l。"),
  M("f28","a7","In the word \"summer\", where is the consonant \"m\"?",["in the middle","at the beginning","at the end"],0,"","summer 的 m 在中間。"),
  M("f29","a7","In the word \"basket\", where is the consonant \"t\"?",["at the end","at the beginning","in the middle"],0,"","basket 的 t 在字尾。"),
  M("f30","a7","Which word begins with the consonant \"g\"?",["guest","rocket","teeth"],0,"","guest 以 g 開頭。"),
  SPF("f31","a7","A person who helps sick people. It starts with d and has 6 letters: ___","doctor","doctor 醫生，字尾子音是 r。"),
  SPF("f32","a7","We eat this with eggs for breakfast. It starts with b and has 5 letters: ___","bacon","bacon 培根，字首子音是 b。"),
  ]
});

/* ---- 卷 2：Intermediate（35 題、30 分鐘） ---- */
studentPaper({
  id: "ayden-m2", student: "Ayden", minutes: 30, relisten: true,
  title: "Midterm Review 2・Intermediate",
  range: "全範圍・加入謎語、找錯字、句子重組與短文",
  added: "2026-11-04",
  note: "",
  tags: { b1: "1. Listen and Choose", b2: "2. Spelling Dictation", b3: "3. Blends in Sentences", b4: "4. Sort the Blends", b5: "5. Consonant Riddles", b6: "6. Find the Mistake", b7: "7. Build a Sentence", b8: "8. Reading" },
  items: [
  SL("g01","b1","glacier","Listen to the word. Which blend do you hear at the beginning?",["gl","cl","bl"],0,"glacier 冰河，開頭是 gl。"),
  SL("g02","b1","princess","Listen to the word. Which blend do you hear at the beginning?",["pr","br","tr"],0,"princess 公主，開頭是 pr。"),
  SL("g03","b1","sponge","Listen to the word. Which blend do you hear at the beginning?",["sp","st","sw"],0,"sponge 海綿，開頭是 sp。"),
  SL("g04","b1","upstairs","Listen to the word. Where is the S blend?",["in the middle","at the beginning","at the end"],0,"upstairs 的 st 在字中間（up-stairs）。"),
  SL("g05","b1","knee","Listen to the word. Which letter is silent?",["k","n","e"],0,"knee 的 k 不發音。"),
  SL("g06","b1","crash","Listen to the word. Which blend do you hear at the beginning?",["cr","gr","tr"],0,"crash 撞擊，開頭是 cr。"),
  DW("g07","b2","shift","Please shift the box to the left.","shift 移動、換班。"),
  DW("g08","b2","brush","I brush my teeth every morning.","brush 刷子、刷。br 是 R blend。"),
  DW("g09","b2","shock","The loud noise gave me a shock.","shock 驚嚇。"),
  DW("g10","b2","crash","The two cars had a crash.","crash 撞擊。cr 是 R blend。"),
  DW("g11","b2","skate","I can skate on the ice.","skate 溜冰。sk 是 S blend。"),
  M("g12","b3","With her new skates, Rita ___ides smoothly on the ice.",["sl","gl","bl"],0,"","slides 滑行。"),
  M("g13","b3","My little sister likes to add ___itter to her nails.",["gl","cl","fl"],0,"","glitter 亮粉。"),
  M("g14","b3","My ___assmates ___apped after my presentation.",["cl … cl","bl … cl","cl … pl"],0,"","classmates 同學、clapped 鼓掌，兩個都是 cl。"),
  M("g15","b3","Luca has joined the course and will fly to ___azil this summer.",["Br","Gr","Pr"],0,"","Brazil 巴西。"),
  M("g16","b3","The ___ainer made the lion ___owl.",["tr … gr","dr … gr","tr … cr"],0,"","trainer 訓練師、growl 低吼。"),
  M("g17","b3","The new ___adium is swanky and ___acious.",["st … sp","sp … st","sk … sp"],0,"","stadium 體育場、spacious 寬敞的。"),
  M("g18","b4","Which word does NOT belong with the others?",["snacks","sneakers","blanket"],2,"","snacks 和 sneakers 都是 sn（S blend）；blanket 是 bl（L blend）。"),
  M("g19","b4","Which two words have the same blend?",["brunch / bracelet","brunch / crooked","bracelet / grimace"],0,"","brunch 和 bracelet 都是 br。"),
  M("g20","b4","\"Groundhogs hibernate during the winter.\" Which blend is in the first word?",["gr","dr","gl"],0,"","Groundhogs 開頭是 gr。"),
  M("g21","b4","Which word has a blend in the MIDDLE, not at the beginning?",["coleslaw","slingshot","sleepwalk"],0,"","coleslaw 的 sl 在中間（cole-slaw）。"),
  M("g22","b5","Riddle: I'm a consonant that has a buzz when I fly. Which letter am I?",["b","z","f"],0,"","bee 蜜蜂會嗡嗡飛，字母 b 的唸法和 bee 一樣。"),
  M("g23","b5","Riddle: I can do this with my eyes open. Which letter am I?",["c","i","o"],0,"","see 看見，字母 c 的唸法和 see 一樣。"),
  M("g24","b5","Riddle: I drink this in the morning instead of coffee. Which letter am I?",["t","j","q"],0,"","tea 茶，字母 t 的唸法和 tea 一樣。"),
  M("g25","b5","Riddle: I'm the plural of the verb \"is\". Which letter am I?",["r","s","v"],0,"","are 是 is 的複數，字母 r 的唸法和 are 一樣。"),
  M("g26","b5","Riddle: Sometimes I mark the spot. Which letter am I?",["x","m","k"],0,"","X marks the spot（X 標記地點）。"),
  E("g27","b6","My little sister likes to add gliter to her nails.","gliter","glitter","","glitter 有兩個 t。"),
  E("g28","b6","The scarcrow wore a scarlet scarf.","scarcrow","scarecrow","","scarecrow 中間有 e。"),
  E("g29","b6","I can skat on the ice in winter.","skat","skate","","skate 字尾有 e。"),
  E("g30","b6","The sloth slep on the stiff tree branch.","slep","slept","","slept 是 sleep 的過去式，字尾是 pt。"),
  R("g31","b7","我的同學在我報告後鼓掌。",["My","classmates","clapped","after","my","presentation."],"","My classmates clapped after my presentation."),
  R("g32","b7","那隻樹懶睡在樹枝上。",["The","sloth","slept","on","the","branch."],"","The sloth slept on the branch."),
  G("g33g","b8","article","Plonky the Platypus",[
    "Plonky the Pleasant Platypus eats blackberries all day.",
    "His friend Ollie the Octopus sprays black ink every which way.",
    "One day they planned a picnic. They laughed and clapped in glee.",
    "But they found a flaw in their plan really quickly.",
    "\"Oh,\" said Ollie, \"I can't leave the sea!\""
  ],[["pleasant","愉快的"],["platypus","鴨嘴獸"],["spray","噴"],["glee","歡樂"],["flaw","缺點、問題"]],[
    Q("g33","What does Plonky eat all day?",["blackberries","black ink","a picnic"],0,"","第一句：eats blackberries all day."),
    Q("g34","Why can't Ollie go to the picnic?",["He can't leave the sea.","He is not hungry.","He lost his ink."],0,"","最後一句 Ollie 說 I can't leave the sea!"),
    Q("g35","\"glee\" 在文章裡是什麼意思？",["很開心","很生氣","很累"],0,"","They laughed and clapped in glee：又笑又拍手，表示很開心。")
  ]),
  ]
});

/* ---- 卷 3：Challenge（36 題、35 分鐘，一般聽力只播一遍、聽寫仍可重聽） ---- */
studentPaper({
  id: "ayden-m3", student: "Ayden", minutes: 35,
  title: "Midterm Review 3・Challenge",
  range: "全範圍・最難：聽力只播一遍，含克漏字、排順序、干擾字卡",
  added: "2026-11-04",
  note: "",
  tags: { c1: "1. Listen and Choose", c2: "2. Spelling Dictation", c3: "3. Blends", c4: "4. Silent Consonants", c5: "5. Find the Mistake", c6: "6. Cloze", c7: "7. Put It in Order", c8: "8. Build a Sentence", c9: "9. Reading" },
  items: [
  SL("h01","c1","scent","Listen to the word. Which letter is silent?",["c","s","t"],0,"scent 香味，c 不發音，唸起來和 sent 一樣。"),
  SL("h02","c1","receipt","Listen to the word. Which letter is silent?",["p","r","t"],0,"receipt 收據，p 不發音。"),
  SL("h03","c1","hymn","Listen to the word. Which letter is silent?",["n","h","m"],0,"hymn 聖歌，字尾的 n 不發音。"),
  SL("h04","c1","smitten","Listen to the word. Which blend do you hear?",["sm","sn","st"],0,"smitten 著迷的，開頭是 sm。"),
  SL("h05","c1","grimace","Listen to the word. Which blend do you hear at the beginning?",["gr","cr","dr"],0,"grimace 扭曲的表情，開頭是 gr。"),
  SL("h06","c1","increase","Listen to the word. Where is the R blend?",["in the middle","at the beginning","at the end"],0,"increase 的 cr 在中間（in-crease）。"),
  SL("h07","c1","snorkel","Listen to the word. Which blend do you hear at the beginning?",["sn","sm","sk"],0,"snorkel 浮潛呼吸管，開頭是 sn。"),
  DW("h08","c2","crash","The two cars had a crash on the road.","crash 撞擊。"),
  DW("h09","c2","shock","The cold water gave me a shock.","shock 驚嚇。"),
  DW("h10","c2","scarlet","The scarecrow wore a scarlet scarf.","scarlet 猩紅色。"),
  DW("h11","c2","treasure","There is treasure on the island.","treasure 寶藏。"),
  DW("h12","c2","glitter","My sister likes to add glitter to her nails.","glitter 亮粉，有兩個 t。"),
  M("h13","c3","Which word contains TWO S blends?",["snowstorm","swimsuit","stomach"],0,"","snowstorm 有 sn 和 st 兩個 S blends。"),
  M("h14","c3","\"The trailer spoiled the twist in the movie.\" How many R-blend words are there?",["1","2","3"],0,"","只有 trailer 一個（spoiled 和 twist 不是 R blend）。"),
  M("h15","c3","Which word has a blend that is NOT at the beginning?",["bracelet","upstairs","crooked"],1,"","upstairs 的 st 在中間；另外兩個都在字首。"),
  M("h16","c3","\"Patricia's cousins greeted her for her birthday.\" Which word has an R blend?",["greeted","cousins","birthday"],0,"","greeted 開頭是 gr。"),
  M("h17","c3","Which blend do \"plumber\" and \"plural\" share?",["pl","bl","pr"],0,"","兩個字開頭都是 pl。"),
  M("h18","c4","Which word does NOT have a silent consonant?",["bridge","ballet","basket"],2,"","bridge 的 d 不發音、ballet 的 t 不發音；basket 每個子音都發音。"),
  M("h19","c4","In \"science\", which letter is silent?",["c","s","n"],0,"","science 的第一個 c 不發音，唸起來像 si-ence。"),
  M("h20","c4","Which pair BOTH have a silent letter?",["knob / comb","knob / snack","comb / skate"],0,"","knob 不發 k、comb 不發 b。"),
  X("h21","c4","Match the word with its silent letter.",["whole","reign","edge","half","listen"],["w","g","d","l","t"],"","whole 不發 w、reign 不發 g、edge 不發 d、half 不發 l、listen 不發 t。"),
  E("h22","c5","The chef cooked steak and spareribs in the brand new skilet.","skilet","skillet","","skillet 有兩個 l。"),
  E("h23","c5","Miranda has traveled to many countries including Grece and France.","Grece","Greece","","Greece 希臘有兩個 e。"),
  E("h24","c5","The princess's tiara was covered in cristals.","cristals","crystals","","crystal 是 cry 開頭，用 y 不是 i。"),
  E("h25","c5","Groundhogs hibernate during the winter monthes.","monthes","months","","month 的複數直接加 s，不加 e。"),
  G("h26g","c6","cloze","A Day at the Lake",[
    "Brian and Liam like to catch [[1]]ickets by the lake.",
    "They always [[2]]ing snacks and [[3]]eaters in their backpacks.",
    "Last week a [[4]]ocodile swam past them!",
    "They ran home and told their [[5]]andma all about it."
  ],[["cricket","蟋蟀"],["backpack","後背包"],["swim past","游過去"]],[
    B("h26",1,["cr","br","tr"],0,"","crickets 蟋蟀。"),
    B("h27",2,["br","gr","dr"],0,"","bring 帶來。"),
    B("h28",3,["sw","sm","sn"],0,"","sweaters 毛衣。"),
    B("h29",4,["cr","gr","pr"],0,"","crocodile 鱷魚。"),
    B("h30",5,["gr","br","dr"],0,"","grandma 奶奶。")
  ]),
  ORD("h31","c7","Put the four sentences in order to make a story.",
    ["Then the sled slid down the smooth snow.","First, it started to snow outside.","Finally, they went inside for hot soup.","Next, Sam pulled his sled up the hill."],[1,3,0,2],
    "照 First → Next → Then → Finally 的順序。"),
  RX("h32","c8","那個稻草人戴著一條猩紅色的圍巾。",["The","scarecrow","wore","a","scarlet","scarf."],["sweater"],"The scarecrow wore a scarlet scarf.（sweater 用不到）"),
  RX("h33","c8","我妹妹喜歡在指甲上加亮粉。",["My","sister","likes","to","add","glitter","to","her","nails."],["glue"],"My sister likes to add glitter to her nails.（glue 用不到）"),
  G("h34g","c9","article","Mrs. Williams, Our Neighbour",[
    "Mrs. Williams is our neighbour. She has two pet dogs and walks them every evening.",
    "Mrs. Williams teaches her dogs some tricks. They are really clever.",
    "She works at a farmers' market and drives to work every day.",
    "She sells fresh fruits and vegetables like apples, carrots, watermelons, and cucumbers."
  ],[["neighbour","鄰居"],["trick","把戲"],["clever","聰明的"],["market","市場"],["cucumber","小黃瓜"]],[
    Q("h34","Where does Mrs. Williams work?",["at a farmers' market","at a pet shop","at a school"],0,"","She works at a farmers' market."),
    Q("h35","Which word from the story has an R blend?",["tricks","dogs","apples"],0,"","tricks 裡面有 tr。"),
    Q("h36","How does Mrs. Williams get to work?",["She drives.","She walks.","She takes the bus."],0,"","She drives to work every day.")
  ]),
  ]
});

/* ===== Ayden：Grade 3 Midterm 文法卷 1～3（和上面的自然發音卷分開） =====
   範圍（原稿 PDF：Grade 3 Midterm Study Package、Grammar Workbook pages 9-10）：
     Nouns：普通／專有名詞、人地物、不規則複數、集合名詞＋動詞單複數
     Pronouns：主格（I you he she it we they）／受格（me you him her it us them）
     Possessives：所有格名詞（'s / s'）、所有格形容詞（my your his her its our their）、所有格代名詞（mine yours his hers ours theirs）
   題目英文、解析中文。注意：girl's 和 girls' 唸起來一樣，不可以出聽力辨義。 */

/* ---- 文法卷 1：Basic（32 題、25 分鐘） ---- */
studentPaper({
  id: "ayden-g1", student: "Ayden", minutes: 25, relisten: true,
  title: "Grammar Review 1・Basic",
  range: "Nouns・Pronouns・Possessives（Grade 3 Midterm Study Package）",
  added: "2026-11-04",
  note: "",
  tags: { p1: "1. Listen and Choose", p2: "2. Plural Dictation", p3: "3. Common or Proper", p4: "4. Irregular Plurals", p5: "5. Subject & Object Pronouns", p6: "6. Possessive Nouns", p7: "7. Possessive Adjectives" },
  items: [
  SL("k01","p1","She bought some new clothes.","Listen to the sentence. Which pronoun did you hear?",["She","Her","Hers"],0,"句子是 She bought…，主詞用主格 She。"),
  SL("k02","p1","Dad took us to Niagara Falls.","Listen to the sentence. Which pronoun did you hear?",["us","we","our"],0,"took 後面是受詞，用受格 us。"),
  SL("k03","p1","The geese are flying south.","Listen to the sentence. Is the noun singular or plural?",["plural","singular","both"],0,"geese 是 goose 的複數，動詞用 are。"),
  SL("k04","p1","That is the children's room.","Listen to the sentence. Whose room is it?",["the children's","the child's","the teacher's"],0,"children's room：孩子們的房間。"),
  SL("k05","p1","They are mine now.","Listen to the sentence. Which possessive word did you hear?",["mine","my","me"],0,"mine 是所有格代名詞，後面不接名詞。"),
  SL("k06","p1","My grandmother tells me stories.","Listen to the sentence. Which object pronoun did you hear?",["me","my","I"],0,"tells 後面接受格 me。"),
  DW("k07","p2","geese","One goose, two geese.","goose 的複數是 geese（拼法改變）。"),
  DW("k08","p2","knives","We need two knives to cut the cake.","knife 的複數：f/fe 改成 ves。"),
  DW("k09","p2","shelves","There are five shelves in my room.","shelf 的複數：f 改成 ves。"),
  DW("k10","p2","teeth","The baby has four teeth now.","tooth 的複數是 teeth（拼法改變）。"),
  M("k11","p3","Which word should begin with a CAPITAL letter?",["jupiter","brother","hotel"],0,"","Jupiter 木星是專有名詞，要大寫。"),
  M("k12","p3","Which one is a COMMON noun? (None of them are capitalized yet.)",["school","nova scotia","dr. smith"],0,"","school 是普通名詞；nova scotia 是地名、dr. smith 是人名，都要大寫。"),
  M("k13","p3","Which one is a PROPER noun? (None of them are capitalized yet.)",["cn tower","manager","farm"],0,"","cn tower 是特定的建築物 → CN Tower，要大寫。"),
  M("k14","p3","In \"I live in Canada,\" the word Canada is a noun for a ___.",["place","person","thing"],0,"","Canada 是地方。"),
  M("k15","p3","In \"My favourite player is Kyle Lowry,\" Kyle Lowry is a noun for a ___.",["person","place","thing"],0,"","Kyle Lowry 是人。"),
  M("k16","p4","What is the plural of \"church\"?",["churches","churchs","churchies"],0,"","ch 結尾加 es。"),
  M("k17","p4","What is the plural of \"baby\"?",["babies","babys","babyes"],0,"","子音＋y 結尾，y 改成 ies。"),
  M("k18","p4","What is the plural of \"bison\"?",["bison","bisons","bisones"],0,"","bison 單複數同形。"),
  M("k19","p4","What is the plural of \"potato\"?",["potatoes","potatos","potatoies"],0,"","o 結尾的 potato 加 es。"),
  M("k20","p4","What is the plural of \"half\"?",["halves","halfs","halfes"],0,"","f 改成 ves。"),
  M("k21","p5","___ bought some new clothes yesterday.",["She","Her","Hers"],0,"","句子的主詞要用主格 She。"),
  M("k22","p5","Mom made sandwiches for ___.",["us","we","our"],0,"","for 後面接受格 us。"),
  M("k23","p5","Larry and Michael went to the game. ___ had a great time.",["They","Them","Their"],0,"","主詞用主格 They。"),
  M("k24","p5","Which pronoun can replace \"the door\"?",["it","him","them"],0,"","the door 是一個東西，用 it。"),
  M("k25","p5","Which pronoun can replace \"my brother and me\"?",["us","we","them"],0,"","「我和哥哥」當受詞時用 us。"),
  M("k26","p6","Here is ___ jacket. (Aaron)",["Aaron's","Aarons","Aarons'"],0,"","單數名詞加 's。"),
  M("k27","p6","They played in the ___ playground. (children)",["children's","childrens","childrens'"],0,"","children 是不以 s 結尾的複數，加 's。"),
  M("k28","p6","These are the ___ spaceships. (aliens)",["aliens'","alien's","aliens"],0,"","aliens 是以 s 結尾的複數，只加一撇。"),
  M("k29","p6","There is a ___ washroom on the second floor. (ladies)",["ladies'","ladie's","ladies"],0,"","ladies 以 s 結尾，只加一撇。"),
  M("k30","p7","Michael puts ___ toys in the box.",["his","him","he"],0,"","Michael 是男生，用所有格形容詞 his。"),
  M("k31","p7","My cat likes licking ___ tail.",["its","it's","it"],0,"","動物用 its；it's 是 it is 的縮寫。"),
  M("k32","p7","The ducklings follow ___ mother to cross the yard.",["their","theirs","them"],0,"","後面有名詞 mother，要用所有格形容詞 their。"),
  ]
});

/* ---- 文法卷 2：Intermediate（35 題、30 分鐘） ---- */
studentPaper({
  id: "ayden-g2", student: "Ayden", minutes: 30, relisten: true,
  title: "Grammar Review 2・Intermediate",
  range: "全範圍・加入集合名詞、找錯字、改寫與短文",
  added: "2026-11-04",
  note: "",
  tags: { q1: "1. Listen and Choose", q2: "2. Plural Dictation", q3: "3. Plural Rules", q4: "4. Collective Nouns", q5: "5. Pronouns", q6: "6. Possessives", q7: "7. Find the Mistake", q8: "8. Build a Sentence", q9: "9. Reading" },
  items: [
  SL("l01","q1","Georgina has invited him to her birthday party.","Listen. Which two words did you hear in the sentence?",["him and her","he and she","them and their"],0,"invited him 是受格，her birthday 是所有格形容詞。"),
  SL("l02","q1","The other team threw the ball to us.","Listen. Which object pronoun did you hear?",["us","them","him"],0,"to us：丟給我們。"),
  SL("l03","q1","The jury announces its decision today.","Listen. Is the collective noun seen as singular or plural?",["singular","plural","neither"],0,"動詞是 announces、用 its，所以當單數看。"),
  SL("l04","q1","The crew are lining up at the gate.","Listen. Is the collective noun seen as singular or plural?",["plural","singular","neither"],0,"動詞是 are，把船員看成一個一個的人。"),
  SL("l05","q1","Those are theirs.","Listen. Which possessive pronoun did you hear?",["theirs","their","them"],0,"theirs 後面不接名詞。"),
  SL("l06","q1","The fungi grow in the dark forest.","Listen. What is the singular form of the noun you heard?",["fungus","fungi","funguses"],0,"fungi 的單數是 fungus。"),
  DW("l07","q2","churches","There are three churches in my town.","church 的複數：ch 結尾加 es。"),
  DW("l08","q2","potatoes","Mom bought five potatoes.","potato 的複數：o 結尾加 es。"),
  DW("l09","q2","halves","Cut the apple into two halves.","half 的複數：f 改成 ves。"),
  DW("l10","q2","elves","The elves helped the shoemaker.","elf 的複數：f 改成 ves。"),
  DW("l11","q2","babies","The babies are sleeping.","baby 的複數：子音＋y，y 改成 ies。"),
  M("l12","q3","Which rule does \"bosses\" follow?",["s, z, ch, sh, x → add es","y → ies","f/fe → ves"],0,"","boss 以 s 結尾，加 es。"),
  M("l13","q3","Which rule does \"knives\" follow?",["f/fe → ves","y → ies","o → add s/es"],0,"","knife 的 fe 改成 ves。"),
  M("l14","q3","Which word does NOT change in the plural?",["fish","echo","shelf"],0,"","fish 單複數同形；echo→echoes、shelf→shelves。"),
  M("l15","q3","Which plural is spelled correctly?",["echoes","echos","echies"],0,"","echo 的複數是 echoes。"),
  M("l16","q4","The class ___ excited for the field trip today.",["is","are","be"],0,"","把全班看成一個整體，用 is。"),
  M("l17","q4","The public ___ for their favourite candidate.",["vote","votes","voting"],0,"","後面用 their，把大眾看成一個個的人，動詞用 vote。"),
  M("l18","q4","The ship's crew ___ how to calm passengers during an emergency.",["know","knows","knowing"],0,"","船員一個一個都知道，動詞用 know。"),
  M("l19","q4","Which one is a collective noun?",["army","soldier","uniform"],0,"","army 軍隊是一群人的名稱。"),
  M("l20","q5","\"___ are going to walk me home,\" Susan said to Fareed.",["You","Your","Yours"],0,"","Susan 對 Fareed 說話，主詞是 You。"),
  M("l21","q5","Jonas has been feeling unwell, so ___ should go to the doctor soon.",["he","him","his"],0,"","主詞用主格 he。"),
  M("l22","q5","Paul tossed the ball to ___ after I asked for it.",["me","I","my"],0,"","to 後面接受格 me。"),
  M("l23","q5","When Randy started crying, Rita bought ___ some candy.",["him","he","his"],0,"","bought 後面的人用受格 him。"),
  M("l24","q5","When my mom and I go to the movies, ___ love eating popcorn.",["we","us","our"],0,"","主詞是「媽媽和我」，用主格 we。"),
  M("l25","q6","That is Uncle Tim's guitar. → That is ___.",["his","him","he's"],0,"","所有格代名詞 his，後面不接名詞。"),
  M("l26","q6","These are Mary's shoes. → These are ___.",["hers","her","her's"],0,"","hers 沒有撇號。"),
  M("l27","q6","Those are Jerry and Daisy's pictures. → Those are ___.",["theirs","their","them"],0,"","兩個人的東西用 theirs。"),
  M("l28","q6","The coach was happy with the ___ performance. (team)",["team's","teams'","teams"],0,"","team 是單數，加 's。"),
  E("l29","q7","Us went for a hike in the forest.","Us","We","","句子的主詞要用主格 We。"),
  E("l30","q7","Her is going to watch a movie.","Her","She","","主詞要用主格 She。"),
  E("l31","q7","We all like its teacher very much.","its","our","","說話的是 We，所以是「我們的」老師 our。"),
  E("l32","q7","I have two brothers. His names are Rob and Ron.","His","Their","","兩個哥哥是複數，用 Their。"),
  R("l33","q8","那些是傑瑞和黛西的照片。",["Those","are","Jerry","and","Daisy's","pictures."],"","Those are Jerry and Daisy's pictures."),
  R("l34","q8","我媽媽忘記帶她的鑰匙了。",["My","mom","forgot","to","bring","her","keys."],"","My mom forgot to bring her keys."),
  G("l35g","q9","notice","A Letter to a Pen Pal",[
    "Dear Kelly,",
    "How are you? My name is Benjamin. I'm eight years old.",
    "I saw your advertisement on Yahoo and would like to be your pen pal.",
    "I live in Canada, which is in North America. It is very cold here in winter.",
    "I like playing basketball. I usually play with my dad and little brother.",
    "Best wishes, Benjamin"
  ],[["advertisement","廣告"],["pen pal","筆友"]],[
    Q("l35","Three of these are proper nouns. Which one names a PLACE?",["Canada","Yahoo","Benjamin"],0,"","Canada 是地方；Yahoo 是東西（網站）、Benjamin 是人。"),
    Q("l36","\"brother\" is a common noun for a ___.",["person","place","thing"],0,"","brother 是人。"),
    Q("l37","In \"I saw your advertisement,\" the word \"your\" is a ___.",["possessive adjective","possessive pronoun","object pronoun"],0,"","your 後面接名詞 advertisement，是所有格形容詞。")
  ]),
  ]
});

/* ---- 文法卷 3：Challenge（36 題、35 分鐘，聽力只播一遍、聽寫仍可重聽） ---- */
studentPaper({
  id: "ayden-g3", student: "Ayden", minutes: 35,
  title: "Grammar Review 3・Challenge",
  range: "全範圍・最難：聽力只播一遍，含克漏字、排順序、干擾字卡",
  added: "2026-11-04",
  note: "",
  tags: { r1: "1. Listen and Choose", r2: "2. Plural Dictation", r3: "3. Nouns", r4: "4. Pronouns", r5: "5. Possessives", r6: "6. Find the Mistake", r7: "7. Cloze", r8: "8. Put It in Order", r9: "9. Build a Sentence", r10: "10. Reading" },
  items: [
  SL("m01","r1","Grandpa kept asking us to take pictures of him.","Listen. Which TWO object pronouns did you hear?",["us and him","we and he","them and his"],0,"asking us、pictures of him，兩個都是受格。"),
  SL("m02","r1","The family want to do every excursion on the trip.","Listen. Is the collective noun seen as singular or plural?",["plural","singular","neither"],0,"動詞是 want，把家人看成一個一個的人。"),
  SL("m03","r1","The bison graze on the open plain.","Listen. Is the noun singular or plural?",["plural","singular","you cannot tell"],0,"動詞是 graze，所以 bison 在這裡是複數（單複數同形）。"),
  SL("m04","r1","This is ours, not yours.","Listen. Which TWO possessive pronouns did you hear?",["ours and yours","our and your","us and you"],0,"ours 和 yours 後面都沒有接名詞。"),
  SL("m05","r1","Her brother gave her a book.","Listen. The first \"her\" is a ___.",["possessive adjective","object pronoun","subject pronoun"],0,"第一個 her 後面接 brother，是所有格形容詞；第二個 her 才是受格。"),
  SL("m06","r1","I cannot lend my book to you because I lost it.","Listen. Which object pronouns did you hear?",["you and it","my and I","me and its"],0,"to you、lost it 都是受格。"),
  DW("m07","r2","fungi","The fungi grow under the old tree.","fungus 的複數是 fungi。"),
  DW("m08","r2","echoes","We heard the echoes in the cave.","echo 的複數：加 es。"),
  DW("m09","r2","bosses","The two bosses had a meeting.","boss 的複數：s 結尾加 es。"),
  DW("m10","r2","cellos","The orchestra has four cellos.","cello 的複數只加 s，不是 es。"),
  M("m11","r3","Which noun follows a DIFFERENT plural rule from the others?",["cello","potato","echo","hero"],0,"","cello 的複數只加 s；potato、echo、hero 都加 es。"),
  M("m12","r3","\"Mt. Albert\" and \"Algonquin Provincial Park\" are both ___.",["proper nouns for places","common nouns for places","proper nouns for things"],0,"","兩個都是特定的地名。"),
  M("m13","r3","Which sentence uses capital letters CORRECTLY?",["Mrs. Jonas visited Muskoka.","mrs. Jonas visited muskoka.","Mrs. jonas visited Muskoka."],0,"","人名和地名的每個字都要大寫。"),
  M("m14","r3","\"The crew are lining up at the gate.\" Why is \"are\" used?",["The crew are seen as individuals.","The crew is one unit.","\"Crew\" is always plural."],0,"","集合名詞當成一個一個的人時，動詞用複數。"),
  M("m15","r4","\"Will ___ send me the photos, my grandson?\" Grandpa asked.",["you","I","he"],0,"","爺爺在問孫子，主詞是 you。"),
  M("m16","r4","\"Of course,\" ___ said.",["I","me","my"],0,"","說話的人當主詞，用 I。"),
  M("m17","r4","Mom and Dad got up early. I woke up early to help ___ too.",["them","her","him"],0,"","要幫的是爸爸和媽媽兩個人，用 them。"),
  M("m18","r4","Which sentence is CORRECT?",["She invited him and me.","She invited he and I.","Her invited him and I."],0,"","invited 後面兩個都要用受格 him and me。"),
  M("m19","r4","In \"Anita teaches it to speak,\" the word \"it\" is a ___.",["object pronoun","subject pronoun","possessive adjective"],0,"","it 在 teaches 後面，是受詞。"),
  M("m20","r5","One ___ scream could be heard above all the rest. (girl)",["girl's","girls'","girls"],0,"","One 表示只有一個女孩，用單數 girl's。"),
  M("m21","r5","The ___ cheers were heard throughout the gym. (girls)",["girls'","girl's","girls"],0,"","很多女孩一起歡呼，用複數 girls'。"),
  M("m22","r5","___ team won the tournament. (James)",["James's","Jame's","James'es"],0,"","單數名字就算以 s 結尾，照課本規則一樣加 's。"),
  M("m23","r5","This is my parents' house. → This is ___ house.",["their","theirs","them"],0,"","後面還有名詞 house，要用所有格形容詞 their。"),
  M("m24","r5","Which sentence is CORRECT?",["This book is mine.","This book is my.","This is mine book."],0,"","mine 後面不接名詞。"),
  E("m25","r6","Him kept asking us to take pictures.","Him","He","","主詞要用主格 He。"),
  E("m26","r6","Her brought some fruits too.","Her","She","","主詞要用主格 She。"),
  E("m27","r6","The two childrens bikes are in the garage.","childrens","children's","","children 是不以 s 結尾的複數，所有格加 's。"),
  E("m28","r6","I have a hamster. Is that you hamster?","you","your","","後面接名詞，要用所有格形容詞 your。"),
  G("m29g","r7","cloze","A Trip to Niagara Falls",[
    "Dad took [[1]] to Niagara Falls last Saturday.",
    "Mom and Dad got up early because [[2]] had to prepare for the trip.",
    "[[3]] arrived there around ten o'clock.",
    "Grandpa was very excited. [[4]] kept asking us to take pictures of him.",
    "Mom made sandwiches for lunch. [[5]] brought some fruits too."
  ],[["prepare","準備"],["excited","興奮的"]],[
    B("m29",1,["us","we","our"],0,"","took 後面接受格 us。"),
    B("m30",2,["they","them","their"],0,"","子句的主詞，用主格 they。"),
    B("m31",3,["We","Us","Our"],0,"","句子開頭的主詞，用主格 We。"),
    B("m32",4,["He","Him","His"],0,"","主詞用主格 He。"),
    B("m33",5,["She","Her","Hers"],0,"","主詞用主格 She。")
  ]),
  ORD("m34","r8","Put the four sentences in order to make a short paragraph.",
    ["Then they played in the children's playground.","First, the twins' mother drove them to the park.","Finally, she took them home for dinner.","Next, she bought them two ice creams."],[1,3,0,2],
    "照 First → Next → Then → Finally 的順序。"),
  RX("m35","r9","這些是女孩們的鞋子。",["These","are","the","girls'","shoes."],["girl's"],"These are the girls' shoes.（girl's 是單數，用不到）"),
  G("m36g","r10","article","Benjamin's Favourite Team",[
    "Benjamin is eight years old. He lives in Canada with his family.",
    "His favourite team is the Raptors, and his favourite player is Kyle Lowry.",
    "Benjamin and his brother play basketball every weekend.",
    "Their father watches them and cheers for them.",
    "\"The ball is yours now,\" Benjamin told his brother."
  ],[["cheer","加油"],["weekend","週末"]],[
    Q("m36","How many proper nouns are there in the FIRST sentence?",["2","1","3"],0,"","Benjamin 和 Canada 是專有名詞；family、years 是普通名詞。"),
    Q("m37","In \"Their father watches them,\" the word \"them\" refers to ___.",["Benjamin and his brother","the Raptors","Benjamin's parents"],0,"","上一句主詞是 Benjamin 和他弟弟。"),
    Q("m38","\"The ball is yours now.\" The word \"yours\" is a ___.",["possessive pronoun","possessive adjective","object pronoun"],0,"","yours 後面沒有接名詞，是所有格代名詞。")
  ]),
  ]
});

/* ===== Ayden：綜合卷（文法為主、發音為輔） =====
   Allen 2026-11-04 的要求：
   - 文法佔比高（約 70%），發音是輔助（約 30%）
   - **發音只考「分辨聲音」**：聽單字選 blend、聽單字選不發音的字母、聽寫單字。
     學校沒有要求背那些發音單字，所以「看句子把單字開頭填出來」整類刪掉，也不考那些字的中文意思。
   - 題目的問法用中文（英文句子和單字保留英文），不然學生看不懂題目要幹嘛
   - 「哪一個有 L blend」這種題，其他選項也要含同一個字母但不構成 blend（例如 flag / fall / lamp）
   - `balance: true` 讓正解平均分到 A/B/C */

/* ---- 綜合卷 1：基礎（36 題、30 分鐘） ---- */
studentPaper({
  id: "ayden-c1", student: "Ayden", minutes: 30, relisten: true, balance: true,
  title: "綜合複習卷 1・基礎",
  range: "文法（名詞・代名詞・所有格）為主＋發音辨音為輔",
  added: "2026-11-04",
  note: "",
  tags: { n1: "一、聽音辨別", n2: "二、聽寫單字", n3: "三、找出 blend", n4: "四、普通名詞與專有名詞", n5: "五、不規則複數", n6: "六、主格與受格代名詞", n7: "七、所有格名詞", n8: "八、所有格形容詞與代名詞", n9: "九、閱讀" },
  items: [
  SL("n01","n1","blanket","聽一個單字，選出它開頭的 blend",["bl","cl","gl"],0,"blanket 開頭的音是 /bl/。"),
  SL("n02","n1","grandma","聽一個單字，選出它開頭的 blend",["gr","dr","tr"],0,"grandma 開頭的音是 /gr/。"),
  SL("n03","n1","snow","聽一個單字，選出它開頭的 blend",["sn","sm","sl"],0,"snow 開頭的音是 /sn/。"),
  SL("n04","n1","knife","聽一個單字，選出哪一個字母不發音",["k","n","f"],0,"knife 唸起來是 /naɪf/，k 不發音。"),
  SL("n05","n1","lamb","聽一個單字，選出哪一個字母不發音",["b","l","m"],0,"lamb 唸起來是 /læm/，字尾的 b 不發音。"),
  DW("n06","n2","shop","I go to the shop with my mom.","shop 商店。sh 是一個音。"),
  DW("n07","n2","fish","The fish swims in the lake.","fish 魚。"),
  DW("n08","n2","flash","I saw a flash of light.","flash 閃光。"),
  M("n09","n3","哪一個單字有 L blend（兩個子音黏在一起唸）？",["flag","fall","lamp"],0,"","flag 的 fl 兩個子音連在一起；fall 的 f 和 ll 中間隔著母音，lamp 只有一個 l。"),
  M("n10","n3","哪一個單字有 R blend？",["grass","rain","car"],0,"","grass 的 gr 連在一起；rain 只有一個 r，car 的 r 在字尾。"),
  M("n11","n3","哪一個單字有 S blend？",["stop","sun","bus"],0,"","stop 的 st 連在一起；sun 只有一個 s，bus 的 s 在字尾。"),
  M("n12","n4","哪一個是專有名詞（開頭要大寫）？",["canada","winter","brother"],0,"","canada 是特定的國家 → Canada；winter、brother 是普通名詞。"),
  M("n13","n4","哪一個是普通名詞？",["school","nova scotia","dr. smith"],0,"","school 是一般的說法；另外兩個是特定的地名和人名。"),
  M("n14","n4","在 I live in Canada. 這句話裡，Canada 是指什麼？",["地方","人","東西"],0,"","Canada 是國家，屬於地方。"),
  M("n15","n4","哪一句的大寫用對了？",["Mrs. Jonas visited Muskoka.","mrs. Jonas visited muskoka.","Mrs. jonas visited Muskoka."],0,"","人名和地名的每個字都要大寫。"),
  M("n16","n5","church 的複數要怎麼寫？",["churches","churchs","churchies"],0,"","ch 結尾加 es。"),
  M("n17","n5","baby 的複數要怎麼寫？",["babies","babys","babyes"],0,"","子音＋y 結尾，y 改成 ies。"),
  M("n18","n5","knife 的複數要怎麼寫？",["knives","knifes","knifies"],0,"","f／fe 結尾改成 ves。"),
  M("n19","n5","goose 的複數要怎麼寫？",["geese","gooses","geeses"],0,"","goose 的複數整個字拼法改變，是 geese。"),
  M("n20","n5","哪一個字的單數和複數長得一樣？",["fish","shelf","echo"],0,"","fish 單複數同形；shelf→shelves、echo→echoes。"),
  M("n21","n6","選出正確的代名詞：___ bought some new clothes.",["She","Her","Hers"],0,"","句子的主詞要用主格 She。"),
  M("n22","n6","選出正確的代名詞：Mom made sandwiches for ___.",["us","we","our"],0,"","for 後面接受格 us。"),
  M("n23","n6","選出正確的代名詞：Larry and Michael went to the game. ___ had a great time.",["They","Them","Their"],0,"","句子的主詞要用主格 They。"),
  M("n24","n6","the door 可以用哪一個代名詞代替？",["it","him","them"],0,"","the door 是單數的東西，用 it。"),
  X("n25","n6","把左邊的詞和可以代替它的代名詞配成一對。",["Mom","Joe and Calvin","the door","my brother and me"],["She","They","it","us"],"","Mom→She、Joe and Calvin→They、the door→it、my brother and me→us。"),
  M("n26","n7","括號裡的字要怎麼寫？Here is ___ jacket. (Aaron)",["Aaron's","Aarons","Aarons'"],0,"","單數名詞加 's。"),
  M("n27","n7","括號裡的字要怎麼寫？They played in the ___ playground. (children)",["children's","childrens","childrens'"],0,"","children 是不以 s 結尾的複數，加 's。"),
  M("n28","n7","括號裡的字要怎麼寫？These are the ___ spaceships. (aliens)",["aliens'","alien's","aliens"],0,"","aliens 以 s 結尾，只加一撇。"),
  M("n29","n7","括號裡的字要怎麼寫？The coach was happy with the ___ performance. (team)",["team's","teams'","teams"],0,"","team 是單數，加 's。"),
  M("n30","n8","選出正確的字：Michael puts ___ toys in the box.",["his","him","he"],0,"","後面接名詞 toys，要用所有格形容詞 his。"),
  M("n31","n8","選出正確的字：My cat likes licking ___ tail.",["its","it's","it"],0,"","動物的「牠的」是 its；it's 是 it is 的縮寫。"),
  M("n32","n8","改寫：These are Mary's shoes. → These are ___.",["hers","her","her's"],0,"","hers 後面不接名詞，而且沒有撇號。"),
  M("n33","n8","改寫：That is Uncle Tim's guitar. → That is ___.",["his","him","he's"],0,"","男生的東西用 his。"),
  G("n34g","n9","article","A Day with Grandpa",[
    "Dad took us to Niagara Falls last Saturday.",
    "Grandpa came to visit us from Vancouver. He was very excited.",
    "Mom made sandwiches for lunch. She brought some fruits too.",
    "\"These sandwiches are yours,\" Mom said to me."
  ],[["Niagara Falls","尼加拉瀑布"],["excited","興奮的"],["sandwich","三明治"]],[
    Q("n34","第一句的 us 是指誰？",["說話的人和他的家人","只有爺爺","只有媽媽"],0,"","Dad took us：爸爸帶「我們」去。"),
    Q("n35","第二句的 He 是指誰？",["Grandpa","Dad","Mom"],0,"","上一句剛提到 Grandpa 來拜訪。"),
    Q("n36","最後一句的 yours 是什麼？",["所有格代名詞","所有格形容詞","受格代名詞"],0,"","yours 後面沒有接名詞，是所有格代名詞。")
  ]),
  ]
});

/* ---- 綜合卷 2：進階（39 題、35 分鐘） ---- */
studentPaper({
  id: "ayden-c2", student: "Ayden", minutes: 35, relisten: true, balance: true,
  title: "綜合複習卷 2・進階",
  range: "文法（複數規則・集合名詞・代名詞・所有格）為主＋發音辨音為輔",
  added: "2026-11-05",
  note: "",
  tags: { n1: "一、聽音辨別", n2: "二、聽寫單字", n3: "三、找出 blend", n4: "四、複數規則", n5: "五、集合名詞", n6: "六、代名詞", n7: "七、所有格", n8: "八、找出錯誤", n9: "九、句子重組", n10: "十、閱讀" },
  items: [
  SL("o01","n1","glacier","聽一個單字，選出它開頭的 blend",["gl","cl","bl"],0,"glacier 開頭的音是 /gl/。"),
  SL("o02","n1","princess","聽一個單字，選出它開頭的 blend",["pr","br","tr"],0,"princess 開頭的音是 /pr/。"),
  SL("o03","n1","sponge","聽一個單字，選出它開頭的 blend",["sp","st","sw"],0,"sponge 開頭的音是 /sp/。"),
  SL("o04","n1","sign","聽一個單字，選出哪一個字母不發音",["g","s","n"],0,"sign 唸起來是 /saɪn/，g 不發音。"),
  SL("o05","n1","listen","聽一個單字，選出哪一個字母不發音",["t","l","n"],0,"listen 唸起來是 /ˈlɪsən/，t 不發音。"),
  SL("o06","n1","knee","聽一個單字，選出哪一個字母不發音",["k","n","e"],0,"knee 唸起來是 /niː/，k 不發音。"),
  DW("o07","n2","shift","Please shift the box to the left.","shift 移動。"),
  DW("o08","n2","brush","I brush my teeth every morning.","brush 刷牙、刷子。"),
  DW("o09","n2","crash","The two cars had a crash.","crash 相撞。"),
  DW("o10","n2","wish","I wish you a happy birthday.","wish 希望。"),
  M("o11","n3","哪一個單字有 L blend（兩個子音黏在一起唸）？",["blue","bell","tall"],0,"","blue 的 bl 連在一起；bell 的 ll 在中間、tall 的 ll 在字尾，都不是 blend。"),
  M("o12","n3","哪一個單字有 R blend？",["brush","birth","arm"],0,"","brush 的 br 連在一起；birth 的 r 前面隔著 i、arm 的 r 在字尾。"),
  M("o13","n3","哪一個單字有 S blend？",["swim","sit","miss"],0,"","swim 的 sw 連在一起；sit 只有一個 s、miss 的 ss 在字尾。"),
  M("o14","n4","bosses 是照哪一條規則變的？",["s、z、ch、sh、x 結尾加 es","y 改成 ies","f／fe 改成 ves"],0,"","boss 以 s 結尾，加 es。"),
  M("o15","n4","knives 是照哪一條規則變的？",["f／fe 改成 ves","y 改成 ies","o 結尾加 s 或 es"],0,"","knife 的 fe 改成 ves。"),
  M("o16","n4","哪一個字的複數拼對了？",["echoes","echos","echies"],0,"","echo 的複數是 echoes。"),
  M("o17","n4","shelf 的複數要怎麼寫？",["shelves","shelfs","shelfes"],0,"","f 改成 ves。"),
  M("o18","n5","選出正確的動詞：The class ___ excited for the field trip today.",["is","are","be"],0,"","把全班看成一個整體，動詞用單數 is。"),
  M("o19","n5","選出正確的動詞：The public ___ for their favourite candidate.",["vote","votes","voting"],0,"","後面用 their，把大眾看成一個一個的人，動詞用複數 vote。"),
  M("o20","n5","選出正確的動詞：The jury ___ its decision on the case.",["announces","announce","announcing"],0,"","用 its，把陪審團看成一個整體，動詞用單數。"),
  M("o21","n5","哪一個是集合名詞（一群人或東西的名稱）？",["army","soldier","uniform"],0,"","army 軍隊是一群人；soldier 是一個軍人、uniform 是制服。"),
  M("o22","n6","選出正確的代名詞：\"___ are going to walk me home,\" Susan said to Fareed.",["You","Your","Yours"],0,"","Susan 對 Fareed 說話，主詞是 You。"),
  M("o23","n6","選出正確的代名詞：Jonas has been feeling unwell, so ___ should go to the doctor.",["he","him","his"],0,"","子句的主詞用主格 he。"),
  M("o24","n6","選出正確的代名詞：Paul tossed the ball to ___ after I asked for it.",["me","I","my"],0,"","to 後面接受格 me。"),
  M("o25","n6","選出正確的代名詞：When my mom and I go to the movies, ___ love eating popcorn.",["we","us","our"],0,"","主詞是「媽媽和我」，用主格 we。"),
  M("o26","n6","選出正確的代名詞：When Randy started crying, Rita bought ___ some candy.",["him","he","his"],0,"","bought 後面的人用受格 him。"),
  M("o27","n7","括號裡的字要怎麼寫？There is a ___ washroom on the second floor. (ladies)",["ladies'","ladie's","ladies"],0,"","ladies 以 s 結尾的複數，只加一撇。"),
  M("o28","n7","括號裡的字要怎麼寫？One ___ scream could be heard above all the rest. (girl)",["girl's","girls'","girls"],0,"","One 表示只有一個女生，用單數 girl's。"),
  M("o29","n7","改寫：Those are Jerry and Daisy's pictures. → Those are ___.",["theirs","their","them"],0,"","兩個人的東西用 theirs，後面不接名詞。"),
  M("o30","n7","選出正確的字：The ducklings follow ___ mother to cross the yard.",["their","theirs","them"],0,"","後面有名詞 mother，要用所有格形容詞 their。"),
  M("o31","n7","選出正確的字：I will call you tonight. Can you give me ___ telephone number?",["your","yours","you"],0,"","後面有名詞 number，用所有格形容詞 your。"),
  E("o32","n8","My mom and me went to the park.","me","I","","當主詞要用主格 I：My mom and I went to the park."),
  E("o33","n8","Him is my best friend.","Him","He","","句子的主詞要用主格 He。"),
  E("o34","n8","Those shoes are her.","her","hers","","後面沒有名詞，要用所有格代名詞 hers。"),
  E("o35","n8","We all like its teacher very much.","its","our","","說話的是 We，所以是「我們的」老師 our。"),
  R("o36","n9","那些是傑瑞和黛西的照片。",["Those","are","Jerry","and","Daisy's","pictures."],"","Those are Jerry and Daisy's pictures."),
  R("o37","n9","我媽媽忘記帶她的鑰匙了。",["My","mom","forgot","to","bring","her","keys."],"","My mom forgot to bring her keys."),
  G("o38g","n10","notice","A Letter to a Pen Pal",[
    "Dear Kelly,",
    "How are you? My name is Benjamin. I'm eight years old.",
    "I saw your advertisement on Yahoo and would like to be your pen pal.",
    "I live in Canada, which is in North America. It is very cold here in winter.",
    "I like playing basketball. I usually play with my dad and little brother.",
    "Best wishes, Benjamin"
  ],[["advertisement","廣告"],["pen pal","筆友"]],[
    Q("o38","這三個都是專有名詞。哪一個是「地方」？",["Canada","Yahoo","Benjamin"],0,"","Canada 是國家；Yahoo 是網站（東西）、Benjamin 是人。"),
    Q("o39","I saw your advertisement 裡的 your 是什麼詞？",["所有格形容詞","所有格代名詞","受格代名詞"],0,"","your 後面接名詞 advertisement，是所有格形容詞。")
  ]),
  ]
});

/* ---- 綜合卷 3：挑戰（40 題、40 分鐘，聽力只播一遍、聽寫仍可重聽） ---- */
studentPaper({
  id: "ayden-c3", student: "Ayden", minutes: 40, balance: true,
  title: "綜合複習卷 3・挑戰",
  range: "全範圍・最難：聽力只播一遍，含克漏字、排順序、干擾字卡",
  added: "2026-11-05",
  note: "",
  tags: { n1: "一、聽音辨別", n2: "二、聽寫單字", n3: "三、blend 進階", n4: "四、名詞與複數", n5: "五、代名詞", n6: "六、所有格", n7: "七、找出錯誤", n8: "八、克漏字", n9: "九、排順序與重組", n10: "十、閱讀" },
  items: [
  SL("p01","n1","smitten","聽一個單字，選出它開頭的 blend",["sm","sn","st"],0,"smitten 開頭的音是 /sm/。"),
  SL("p02","n1","grimace","聽一個單字，選出它開頭的 blend",["gr","cr","dr"],0,"grimace 開頭的音是 /gr/。"),
  SL("p03","n1","snorkel","聽一個單字，選出它開頭的 blend",["sn","sm","sk"],0,"snorkel 開頭的音是 /sn/。"),
  SL("p04","n1","scent","聽一個單字，選出哪一個字母不發音",["c","s","t"],0,"scent 唸起來和 sent 一樣，c 不發音。"),
  SL("p05","n1","hymn","聽一個單字，選出哪一個字母不發音",["n","h","m"],0,"hymn 唸起來是 /hɪm/，字尾的 n 不發音。"),
  SL("p06","n1","comb","聽一個單字，選出哪一個字母不發音",["b","c","m"],0,"comb 唸起來是 /koʊm/，字尾的 b 不發音。"),
  DW("p07","n2","ship","The ship sails across the sea.","ship 船。"),
  DW("p08","n2","shock","The loud noise gave me a shock.","shock 驚嚇。"),
  DW("p09","n2","cash","I paid for the book with cash.","cash 現金。"),
  DW("p10","n2","skate","I can skate on the ice.","skate 溜冰。"),
  M("p11","n3","哪一個單字的 blend 不在字首？",["upstairs","stop","snack"],0,"","upstairs 的 st 在中間（up-stairs）；另外兩個都在開頭。"),
  M("p12","n3","哪一個單字裡有兩個 S blend？",["snowstorm","swimsuit","stomach"],0,"","snowstorm 有 sn 和 st；swimsuit 只有 sw、stomach 只有 st。"),
  M("p13","n3","哪一個單字沒有不發音的子音？",["basket","bridge","ballet"],0,"","basket 每個子音都發音；bridge 的 d、ballet 的 t 不發音。"),
  M("p14","n4","哪一個字的複數規則和其他三個不一樣？",["cello","potato","echo","hero"],0,"","cello 的複數只加 s；另外三個都加 es。"),
  M("p15","n4","fungus 的複數要怎麼寫？",["fungi","funguses","fungis"],0,"","fungus 的複數是 fungi。"),
  M("p16","n4","哪一句的大寫用對了？",["Mrs. Jonas visited Muskoka.","mrs. Jonas visited muskoka.","Mrs. jonas visited Muskoka."],0,"","人名和地名的每個字都要大寫。"),
  M("p17","n4","The crew are lining up at the gate. 為什麼用 are？",["把船員看成一個一個的人","把船員看成一個整體","crew 永遠是複數"],0,"","集合名詞當成個別的人時，動詞用複數。"),
  M("p18","n5","選出正確的代名詞：\"Will ___ send me the photos, my grandson?\" Grandpa asked.",["you","I","he"],0,"","爺爺在問孫子，主詞是 you。"),
  M("p19","n5","選出正確的代名詞：Mom and Dad got up early. I woke up early to help ___ too.",["them","her","him"],0,"","要幫的是爸爸和媽媽兩個人，用 them。"),
  M("p20","n5","哪一句是對的？",["She invited him and me.","She invited he and I.","Her invited him and I."],0,"","invited 後面兩個都要用受格 him and me。"),
  M("p21","n5","Anita teaches it to speak. 這句裡的 it 是什麼？",["受格代名詞","主格代名詞","所有格形容詞"],0,"","it 在動詞 teaches 後面，當受詞。"),
  M("p22","n6","括號裡的字要怎麼寫？The ___ cheers were heard throughout the gym. (girls)",["girls'","girl's","girls"],0,"","很多女生一起歡呼，用複數 girls'。"),
  M("p23","n6","括號裡的字要怎麼寫？___ team won the tournament. (James)",["James's","Jame's","James'es"],0,"","單數名字就算以 s 結尾，照課本規則一樣加 's。"),
  M("p24","n6","改寫：This is my parents' house. → This is ___ house.",["their","theirs","them"],0,"","後面還有名詞 house，要用所有格形容詞 their。"),
  M("p25","n6","哪一句是對的？",["This book is mine.","This book is my.","This is mine book."],0,"","mine 後面不接名詞。"),
  E("p26","n7","Us arrived there around ten o'clock.","Us","We","","句子的主詞要用主格 We。"),
  E("p27","n7","Her brought some fruits too.","Her","She","","句子的主詞要用主格 She。"),
  E("p28","n7","You have a hamster. Is that you hamster?","you","your","","第二個 you 後面接名詞，要用所有格形容詞 your。"),
  E("p29","n7","I have two brothers. His names are Rob and Ron.","His","Their","","兩個哥哥是複數，用 Their。"),
  G("p30g","n8","cloze","A Trip to Niagara Falls",[
    "Dad took [[1]] to Niagara Falls last Saturday.",
    "Mom and Dad got up early because [[2]] had to prepare for the trip.",
    "[[3]] arrived there around ten o'clock.",
    "Grandpa was very excited. [[4]] kept asking us to take pictures of him.",
    "Mom made sandwiches for lunch. [[5]] brought some fruits too."
  ],[["prepare","準備"],["excited","興奮的"]],[
    B("p30",1,["us","we","our"],0,"","took 後面接受格 us。"),
    B("p31",2,["they","them","their"],0,"","子句的主詞用主格 they。"),
    B("p32",3,["We","Us","Our"],0,"","句子開頭的主詞用主格 We。"),
    B("p33",4,["He","Him","His"],0,"","主詞用主格 He。"),
    B("p34",5,["She","Her","Hers"],0,"","主詞用主格 She。")
  ]),
  ORD("p35","n9","把下面四句排成一段通順的短文。",
    ["Then they played in the children's playground.","First, the twins' mother drove them to the park.","Finally, she took them home for dinner.","Next, she bought them two ice creams."],[1,3,0,2],
    "照 First → Next → Then → Finally 的順序。"),
  RX("p36","n9","這些是女孩們的鞋子。",["These","are","the","girls'","shoes."],["girl's"],"These are the girls' shoes.（girl's 是單數，用不到）"),
  G("p37g","n10","article","Benjamin's Favourite Team",[
    "Benjamin is eight years old. He lives in Canada with his family.",
    "His favourite team is the Raptors, and his favourite player is Kyle Lowry.",
    "Benjamin and his brother play basketball every weekend.",
    "Their father watches them and cheers for them.",
    "\"The ball is yours now,\" Benjamin told his brother."
  ],[["cheer","加油"],["weekend","週末"]],[
    Q("p37","第一句裡有幾個專有名詞？",["2","1","3"],0,"","Benjamin 和 Canada 是專有名詞；family、years 是普通名詞。"),
    Q("p38","Their father watches them 裡的 them 是指誰？",["Benjamin 和他弟弟","暴龍隊","Benjamin 的爸媽"],0,"","上一句的主詞是 Benjamin and his brother。"),
    Q("p39","The ball is yours now. 裡的 yours 是什麼詞？",["所有格代名詞","所有格形容詞","受格代名詞"],0,"","yours 後面沒有接名詞。"),
    Q("p40","Benjamin and his brother play basketball. 裡的 play 為什麼不加 s？",["主詞是兩個人，是複數","basketball 是複數","play 永遠不加 s"],0,"","主詞 Benjamin and his brother 是複數，動詞用原形。")
  ]),
  ]
});


/* ===== Ayden：WEEKLY SPELLING TEST 複習卷（水與地形的長音 u 單字 34 字） =====
   原卷：G3 Green 兩次 weekly spelling test（照片在 Allen 那邊，不進 repo）。Ayden 沒辦法空手拼出整個單字，
   所以全部用引導式題型：聽單字選拼法、看中文選英文、聽音補字母（首尾給、中間挖 2～3 格）、字母重組（字母全給但打亂）、句子選字（中文翻譯放在提示裡）。
   34 個單字每一個都至少當過一次答案。 */
studentPaper({
  id: "ayden-s1", student: "Ayden", minutes: 35, relisten: true, balance: true, hints: true,
  title: "水的單字 拼字複習・基礎",
  range: "Weekly Spelling Test 複習（水與地形）・基礎 ★☆",
  added: "2026-11-13",
  note: "",
  tags: {
    p1: "一、聽單字選拼法", p2: "二、看中文選英文", p3: "三、聽音補字母", p4: "四、字母重組", p5: "五、句子選字"
  },
  items: [
  /* ---------- 一、聽單字選拼法（聽一個單字，選出正確的拼法） ---------- */
  SL("q1","p1","tube","聽一次單字，選出正確的拼法。",["tube","tubb","toob"],0,"tube 管子：子音＋u＋子音＋不發音的 e，u 要唸長音 /ju/。"),
  SL("q2","p1","rule","聽一次單字，選出正確的拼法。",["rule","rool","ruel"],0,"rule 規則：u + l + e，不是 oo。"),
  SL("q3","p1","tune","聽一次單字，選出正確的拼法。",["tune","toon","tewn"],0,"tune 旋律：t-u-n-e，結尾的 e 不發音但不能少。"),
  SL("q4","p1","rude","聽一次單字，選出正確的拼法。",["rude","rood","rued"],0,"rude 沒禮貌的：r-u-d-e。"),
  SL("q5","p1","wave","聽一次單字，選出正確的拼法。",["wave","wav","waiv"],0,"wave 波浪：a-v-e，結尾的 e 讓 a 唸長音 /e/。"),
  SL("q6","p1","mute","聽一次單字，選出正確的拼法。",["mute","moot","muet"],0,"mute 靜音的：m-u-t-e。"),
  SL("q7","p1","fume","聽一次單字，選出正確的拼法。",["fume","fewm","foom"],0,"fume 煙霧；廢氣：f-u-m-e。"),
  SL("q8","p1","dune","聽一次單字，選出正確的拼法。",["dune","doon","dewn"],0,"dune 沙丘：d-u-n-e，不是 doon。"),
  SL("q9","p1","crude","聽一次單字，選出正確的拼法。",["crude","crood","crued"],0,"crude 原油的；粗糙的：c-r-u-d-e。"),
  SL("q10","p1","fluke","聽一次單字，選出正確的拼法。",["fluke","flook","fluck"],0,"fluke 僥倖；意外的好運：f-l-u-k-e，結尾的 e 不能少。"),
  SL("q11","p1","volume","聽一次單字，選出正確的拼法。",["volume","volumn","valume"],0,"volume 音量；體積：vol-ume，中間是 o 不是 a。"),
  SL("q12","p1","stream","聽一次單字，選出正確的拼法。",["stream","streem","strem"],0,"stream 河流：ea 一起唸長音 /i/。"),
  /* ---------- 二、看中文選英文 ---------- */
  M("q13","p2","小溪",["creek","dune","fume","mute"],0,"","creek 小溪；dune 沙丘、fume 煙霧、mute 靜音的。"),
  M("q14","p2","逃走；逃脫",["escape","research","surface","intact"],0,"","escape 逃走；research 研究、surface 表面、intact 完整無缺的。"),
  M("q15","p2","研究",["research","escape","surface","cascade"],0,"","research 研究（re-search 再找一次）。"),
  M("q16","p2","表面",["surface","altitude","volume","incline"],0,"","surface 表面（sur- 在上面＋face 面）。"),
  M("q17","p2","海拔；高度",["altitude","shoreline","pipeline","cascade"],0,"","altitude 海拔、高度。"),
  M("q18","p2","海岸線",["shoreline","pipeline","uphill","strait"],0,"","shoreline 海岸線（shore 岸＋line 線）。"),
  M("q19","p2","輸送管線",["pipeline","shoreline","incline","sluice"],0,"","pipeline 輸送管線（pipe 管子＋line 線）。"),
  M("q20","p2","像瀑布一樣落下",["cascade","condense","evaporate","dilate"],0,"","cascade 像瀑布般落下；小瀑布。"),
  M("q21","p2","大洪水",["deluge","dune","sluice","plume"],0,"","deluge 大洪水。"),
  M("q22","p2","海峽",["strait","stream","creek","sluice"],0,"","strait 海峽（兩塊陸地中間的窄水道）。"),
  /* ---------- 三、聽音補字母（有播放鍵，首尾字母已給，中間挖 2～3 格） ---------- */
  DH("q23","p3","plume","煙柱；羽毛","plume 煙柱；羽毛：是 p 開頭，不要跟 flume 搞混。"),
  DH("q24","p3","flume","水道；渠道","flume 水道；渠道：是 f 開頭。"),
  DH("q25","p3","chute","滑梯；斜道","chute 滑梯、斜道：ch 開頭卻唸 /ʃ/（像 sh 的聲音）。"),
  DH("q26","p3","suite","套房","suite 套房：ui 一起唸 /wi/，聽起來像 sweet。"),
  DH("q27","p3","crude","原油的；粗糙的","crude：c-r-u-d-e。"),
  DH("q28","p3","creek","小溪","creek 小溪：中間兩個 e。"),
  DH("q29","p3","tube","管子","tube：t-u-b-e。"),
  DH("q30","p3","tune","旋律；曲調","tune：t-u-n-e。"),
  DH("q31","p3","dune","沙丘","dune：d-u-n-e。"),
  DH("q32","p3","mute","靜音的","mute：m-u-t-e。"),
  /* ---------- 四、字母重組（字母全部給，但順序是打亂的） ---------- */
  SPF("q33","p4","水閘；水道　c / l / i / s / u / e　→ ___","sluice","sluice 水閘、水道：s-l-u-i-c-e，ui 一起唸長音 /u/。"),
  SPF("q34","p4","污染　u / l / p / t / o / l / e　→ ___","pollute","pollute 污染：po-llute，中間兩個 l。"),
  SPF("q35","p4","斜坡；傾斜　l / n / i / e / c / n / i　→ ___","incline","incline 斜坡、傾斜：in-cline，兩個 i、兩個 n。"),
  SPF("q36","p4","使擴張；放大　t / a / d / e / l / i　→ ___","dilate","dilate 使擴張：di-late。"),
  SPF("q37","p4","上坡的　h / l / u / i / p / l　→ ___","uphill","uphill 上坡的：up 上＋hill 山，所以有兩個 l。"),
  SPF("q38","p4","完整無缺的　c / t / i / a / n / t　→ ___","intact","intact 完整無缺的：in-tact，結尾是 ct。"),
  /* ---------- 五、句子選字（按「提示」可以看中文翻譯） ---------- */
  M("q39","p5","Hot water will ___ into steam.",["evaporate","condense","escape","dilate"],0,"熱水會蒸發變成水蒸氣。","evaporate 蒸發：水變成水蒸氣。"),
  M("q40","p5","Water vapor will ___ into drops on the cold glass.",["condense","evaporate","pollute","dilate"],0,"水蒸氣會在冰冷的玻璃上凝結成小水滴。","condense 凝結：水蒸氣變回水，和 evaporate 相反。"),
  M("q41","p5","Please don't be ___ to your friends.",["rude","rule","mute","wave"],0,"請不要對你的朋友沒禮貌。","rude 沒禮貌的；rule 是「規則」，只差一個字母。"),
  M("q42","p5","The toothpaste comes out of the ___.",["tube","dune","creek","chute"],0,"牙膏從軟管裡擠出來。","tube 管子（牙膏那種軟管）。"),
  M("q43","p5","We walked ___ to the top of the hill.",["uphill","escape","intact","surface"],0,"我們走上坡路到山頂。","walk uphill 走上坡。"),
  M("q44","p5","The box was still ___ after it fell.",["intact","uphill","mute","rude"],0,"盒子掉下來之後還是完好無缺。","intact 完整無缺的。"),
  M("q45","p5","Factories must not ___ the river.",["pollute","dilate","research","escape"],0,"工廠不可以污染河流。","pollute 污染。"),
  M("q46","p5","The ___ of the lake was very calm.",["surface","altitude","incline","strait"],0,"湖面非常平靜。","surface 表面；湖的表面＝湖面。")
  ]
});