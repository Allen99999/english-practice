/* ===== 片語：點到其中一個字就整組選取 =====
   語法：用原形；"a/b" 擇一；"*" 任一個字；"~N" 中間可夾 0~N 個字 */
const PHRASES_RAW = [
["brush ~3 tooth","brush one's teeth","刷牙"],["post office","post office","郵局"],["at once","at once","立刻"],
["hold on","hold on","（電話中）稍等"],["take a message","take a message","記下留言"],["leave a message","leave a message","留言"],
["call ~1 back","call back","回電"],["wrong number","wrong number","打錯的電話號碼"],["go to bed","go to bed","上床睡覺"],
["turn off","turn off","關掉"],["a lot of","a lot of","許多的"],["a lot","a lot","很多"],["a glass of","a glass of","一杯"],
["have ~1 great/good/wonderful time","have a great time","玩得很開心"],["look ~1 up","look up","查詢（字典等）"],
["more than","more than","超過"],["pen pal","pen pal","筆友"],["by the way","by the way","順帶一提"],["take turn","take turns","輪流"],
["dry up","dry up","乾涸"],["one by one","one by one","一個接一個"],["for a while","for a while","一陣子"],
["instant noodle","instant noodles","泡麵"],["sign up","sign up","報名"],["take care of","take care of","照顧"],
["make up * mind","make up one's mind","下定決心"],["here you be","here you are","給你、拿去吧"],["of course","of course","當然"],
["go straight","go straight","直走"],["turn right/left","turn right / left","右轉／左轉"],["right away","right away","立刻"],
["right now","right now","現在；立刻"],["long ago","long ago","很久以前"],["stay up late","stay up late","熬夜"],["give up","give up","放棄"],
["turn out","turn out","結果是"],["fall asleep","fall asleep","睡著"],["afraid of","be afraid of","害怕"],["worry about","worry about","擔心"],
["look like","look like","看起來像"],["sound like","sound like","聽起來像"],["in writing","in writing","以書面方式"],["up to","up to","最多到"],
["a pair of","a pair of","一雙、一副"],["put on","put on","穿上"],["pay for","pay for","付錢買"],["against the law","against the law","違法"],
["mock exam","mock exam","模擬考"],["at first","at first","起初"],["wait for","wait for","等待"],["stinky tofu","stinky tofu","臭豆腐"],
["day off","day off","休假"],["come out","come out","出來；上市"],["can't wait to","can't wait to","迫不及待"],["fake news","fake news","假新聞"],
["social media","social media","社群媒體"],["get married","get married","結婚"],["on time","on time","準時"],["ice statue","ice statue","冰雕"],
["snow festival","snow festival","雪祭"],["get wet","get wet","弄濕"],["fly away","fly away","飛走"],["give ~1 back","give back","歸還"],
["at night","at night","在晚上"],["go out","go out","出門"],["go hike","go hiking","去健行"],["a little","a little","有點；一點"],
["take a picture/photo","take a picture","拍照"],["lose weight","lose weight","減重"],["wake up","wake up","醒來"],["write back","write back","回信"],
["get sick","get sick","生病"],["turn on","turn on","打開"],["listen to","listen to","聽"],["think about","think about","思考、考慮"],
["at the end of","at the end of","在…的最後"],["in the future","in the future","在未來"],["such as","such as","例如"],
["no one","no one","沒有人"],["each other","each other","彼此"],["stay home","stay home","待在家"],["be back","be back","回來"]
];
const PHRASES = PHRASES_RAW.map(([pat, disp, zh]) => ({ parts: pat.split(" "), k: disp, zh, pos: "phr." }))
  .sort((a, b) => b.parts.filter(p => p !== "*" && !p.startsWith("~")).length - a.parts.filter(p => p !== "*" && !p.startsWith("~")).length);
const PHR = {}; PHRASES.forEach(p => PHR[p.k] = p);
PHRASES.push(...[
["fill out/in","fill out","填寫（表格）"],["put off","put off","延期"],["look after","look after","照顧"],["vote for","vote for","投票給"],
["take a break","take a break","休息一下"],["focus on","focus on","專注於"],["not only ~4 but also","not only … but also","不但…而且"],
["neither ~6 nor","neither … nor","既不…也不"],["either ~6 or","either … or","不是…就是"],["as ~2 as","as … as","和…一樣"],
["laugh at","laugh at","嘲笑"],["step on","step on","踩到"],["take out","take out","拿出去（倒垃圾）"],["do the dish","do the dishes","洗碗"],
["do the laundry","do the laundry","洗衣服"],["shake hand","shake hands","握手"],["put away","put away","收起來"],["by mistake","by mistake","不小心"],
["stay away from","stay away from","遠離"],["at that time","at that time","在那時候"],["across from","across from","在…對面"],["on foot","on foot","步行"],
["try on","try on","試穿"],["on sale","on sale","特價中"],["look for","look for","尋找"],["pick up","pick up","撿起；接人"],["be good at","be good at","擅長"],
["help yourself","help yourself","自己拿來吃"],["think for","think for oneself","自己思考"],["take a shower","take a shower","洗澡"],["turn down","turn down","拒絕；調小聲"],
["get up","get up","起床"],["eat out","eat out","外食"],["junk food","junk food","垃圾食物"],["fire drill","fire drill","消防演習"],["go bad","go bad","（食物）壞掉"],
["get to","get to","到達"],["how far","how far","多遠"],["how long","how long","多久"],["how often","how often","多久一次"],["how much","how much","多少（錢／量）"],["how many","how many","多少（個）"],
["poison gas","poison gas","毒氣"],["hand sign","hand sign","手勢"],["thumbs-up","thumbs-up","比讚"],["open house","open house","校園開放參觀日"],["vocational high school","vocational high school","高職"],
["half past","half past","…點半"],["a quarter past","a quarter past","…點十五分"],["day off","day off","休假"]
].map(([pat, disp, zh]) => ({ parts: pat.split(" "), k: disp, zh, pos: "phr." })));
PHRASES.sort((a, b) => b.parts.filter(p => p !== "*" && !p.startsWith("~")).length - a.parts.filter(p => p !== "*" && !p.startsWith("~")).length);
PHRASES.forEach(p => PHR[p.k] = p);
