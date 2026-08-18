// src/lib/dictionary.ts
// Server-side dictionary service. Loads the OFFICIAL Scrabble word lists
// (NWL2023 + CSW21 for English, ODS9 for French, FISE for Spanish,
// Zingarelli for Italian, OpenTaal for Dutch) as the authoritative source,
// falling back to npm word packages for German/Portuguese (filtered) and
// curated romaji/pinyin lists for Japanese/Mandarin.
// MUST only be imported from server code (API routes / server components).

import type { LanguageCode } from "./languages";
import { normalizeWord } from "./languages";
import { isScrabbleValid } from "./scrabble-filter";
import * as fs from "fs";
import * as path from "path";

export interface WordEntry {
  word: string; // original (with accents/case preserved)
  norm: string; // normalized lowercase diacritic-stripped
  len: number; // normalized length
}

// Curated Japanese romaji word list (Latin letters, no official Scrabble set).
const JA_ROMAJI = [
  "ai","aishite","akai","akarui","akatsuki","aki","akita","amai","ame","anata","ane","ani","aoi","arigatou","asaruto","asatte","ashi","ashita","asoko","atsui","atsui","baka","bakari","barabara","basho","benkyou","boku","bokura","boru","botan","chichi","chikai","chikaku","chikara","chiisai","chiisana","chizu","cho","chotto","daijoubu","daishita","dakedo","dakara","dakeredo","dame","damaru","dare","dareka","darui","dasu","datta","de","dekakeru","dekiru","demo","denwa","desu","dewa","do","doko","dokoka","dore","dorekurai","doushite","doyo","eiga","eigo","enpitsu","erasou","erabu","ereru","etsuran","fu","fuan","fuda","fue","fuji","fujin","fukai","fuku","fukurou","furui","furusato","fushigi","futari","futon","fuyu","gakkou","gakusei","ganbatte","gari","geemu","genki","gohan","gozen","gurai","guru","guruupu","ha","hadaka","haha","hai","hairu","hajime","hajimeru","hajimete","haka","hakai","hakaru","hane","hanashi","hanasu","hanbun","hango","hantai","hanashi","hanatsu","haru","harau","hasami","hashi","hashira","hayai","hazu","he","heiwa","hentai","hidoi","hieru","hikari","hikaru","hiku","himitsu","himo","hinekure","hiragana","hirou","hiroba","hiroshi","hitori","hitotsu","hitsuyou","hoho","hoikuen","hoka","hokani","hon","honki","honno","hora","hoshii","hoshizora","hotaru","hoteru","ichiban","ichi","ichido","ie","ii","iie","iin","ikaga","ikan","ikanimo","ikiru","iku","ima","imada","imamade","inochi","inori","inu","ippai","irasshaimase","iro","iroiro","isogashii","isogu","issho","isshoni","ita","itadaki","itai","itaru","itazu","ite","ito","itsumo","itsu","itta","itte","iu","iva","iwaku","izuko","jaken","jama","jibun","jidai","jikan","jikou","jimari","jimen","jiyuu","jou","jubaku","judan","juu","juubako","juuni","kaban","kabocha","kachi","kado","kaeru","kagami","kagi","kagiru","kai","kaigi","kaimono","kaisetsu","kaita","kaiten","kaji","kako","kakugo","kakusu","kakutei","kakutou","kamawanai","kami","kamome","kan","kanai","kanban","kane","kanji","kanjiru","kanno","kanojo","kansha","kantan","kao","kaori","karai","karasu","kare","karera","karui","kasaneru","kashi","kasu","kata","katana","kataru","katei","kazoku","keba","kega","kekkon","ken","kensaku","keredo","kesu","ketto","ki","kibun","kiegari","kien","kieta","kiiroi","kiko","kikoenai","kikori","kimochi","kimono","kindan","kingen","kinou","kirai","kiru","kishibe","kissaten","kitto","ko","koe","koei","kohan","kohi","koibito","koishite","koitsu","koji","kojin","koko","kokoro","kokuban","kokugo","komatsu","kome","konda","kondo","kongetsu","konohito","kono","konshuu","konte","koro","korosu","koredemo","kore","koritsu","korosu","koto","kotoba","kowai","kubi","kuchibiru","kudaranai","kue","kumo","kurai","kurashi","kurasu","kure","kureru","kuro","kuroi","kuru","kuruma","kuruoshii","kuruu","kuso","kutabare","kutsu","kutsushita","kuyashii","mado","mae","magaru","mago","maiban","mainichi","majo","make","makeru","makura","mama","manabu","manatsu","mane","manji","maru","marude","marui","masaka","mashite","masshiro","mata","matataki","matsu","mattaku","mayonaka","mazui","megane","meisai","meron","meshi","migi","mikan","mikata","miko","minami","minna","mirai","miru","misuzu","mizu","mizu","mo","mochiron","moka","moku","mom","mon","mono","mori","morasu","morau","moratta","mori","motto","mou","muda","mudai","mugiwara","muri","murabito","mush","mushi","musuko","musume","muzan","muzukashii","nabe","nagusame","nai","naide","naita","naku","namae","namida","nani","nanika","nante","nantonaku","naru","naraba","naru","naruhodo","nasa","nashi","natsu","natsukashi","naze","ne","nee","neko","nemui","nerai","neru","netsu","nezu","ni","nichiyoubi","nigeru","nihon","nijiiro","niji","nikui","niku","nimotsu","nippon","niru","nisen","noboru","node","nodo","nomimasu","nomu","nora","noroi","noroma","nori","noru","nose","notameno","noto","nottote","nozomi","nuigurumi","nuru","nurui","nyoro","obake","obasan","obou","ocha","odoroki","odoroku","odoru","ofuro","okaasan","okami","okiru","oko","okoru","oku","okura","okuru","omae","omake","omatsuri","omni","omocha","omoidasu","omoide","omoidete","omoi","omoida","omoino","omou","omowazu","onna","onsen","osake","osana","osewa","oshi","oshieru","oshiete","oshimai","oshiri","osoi","osokute","osoreru","osore","osou","ossan","otoko","otomodachi","oton","otona","otousan","otto","ou","ouji","ousama","owari","owatta","oyasumi","oyogu","ozone","papa","piza","pon","ponkotsu","pudding","ra","rakuda","rakuen","ramen","rashiku","re","rei","reiko","renda","rie","rinko","rokku","romaji","ronin","rugu","ryou","ryouri","saa","saigo","saikin","saisho","saishuu","saita","saku","sakubun","sakura","sam","samishii","samui","san","sana","sanji","sanji","sanzoku","sanzou","sasayaki","sashimi","sasu","sata","satou","sayonara","se","seikai","seikatsu","seishi","seita","semai","semai","semi","semai","sen","senaka","senden","sensei","sensou","sentaku","sepet","setsu","setsunai","settou","shabon","shain","sha","shakai","shatsu","shi","shichi","shigoto","shiika","shiken","shiken","shikata","shiki","shikamo","shikashi","shikato","shikkari","shikou","shima","shimaru","shimeru","shimetta","shimobe","shinbun","shin","shinbun","shine","shineba","shinigami","shinjite","shinjiru","shinjitsu","shinka","shinkansen","shinnen","shinpai","shinpi","shinshi","shinzo","shio","shippai","shiri","shiriai","shirimasen","shirizu","shiro","shiroi","shirushi","shiru","shirushi","shita","shitagi","shitsumon","shitsurei","shizuka","shizumeru","shobou","shokugyou","shouji","shounen","shouri","shu","shukudai","shumatsu","so","soba","sobyo","sochi","sode","sofu","soko","sokoni","sokoku","sokudo","sonna","sonnani","sono","sono","sonouchi","sore","soredemo","sorekara","sorenara","soreni","sorosoro","soshite","soto","sotsugyou","souda","souji","soujuu","soumubu","sounan","sourou","sousa","soushi","souzou","suteki","suteru","suto","suu","suubun","suuchi","suufu","sugo","sugoi","sugosu","suhada","sui","suihei","suijaku","suimin","suita","suki","sukina","sukoshi","sukos","sukuna","sumi","sumimasen","sumu","sun","sunae","sunenki","suppon","sur","sura","suri","suru","surudoi","sushi","susumu","sute","suteta","sute","suteru","suto","tabako","taberu","tabi","tachi","tachimachi","tada","tadai","tadashi","tadaima","taga","taichi","taido","taigai","taihen","taikai","tai","taishita","taiyou","taka","takai","takara","takasa","take","tameru","tami","tan","tana","tanin","tanjo","tanoshii","tanoshimi","taore","taoreru","tasu","tasukaru","tasukete","tasukeru","tatoeba","tatsuni","tatta","tatte","tatsu","tatta","tazunete","tazuneru","te","te","te","tei","tegami","teido","teire","ten","tena","tenki","ten","tenshi","teokure","tesuri","tetsu","to","tobidasu","tochi","tochu","todoke","todokete","todomatsu","tohoho","toire","toji","tokai","toki","tokidoki","tokoro","tokubai","toku","tokui","tsumetai","tsurai","tsurai","tsutaeru","uchi","ude","ueda","ue","ueni","ueshitan","ugoku","un","unagi","uni","ura","ureshii","uriba","uru","usagi","ushiro","uso","uta","utau","utsukushii","utsusu","uwagi","v","wa","wakai","wakaranai","wakare","wakaru","wakata","wakatteru","wara","warai","warau","wareware","wasure","wasurete","wasurezu","washi","washi","watashi","watakushi","watari","yabai","yado","yakai","yakete","yaku","yakunitachi","yakusoku","yama","yamai","yarou","yasashii","yaseta","yasui","yasumu","yasune","yatsu","yatsume","yatsuo","yakuni","yobu","yogore","yojou","yokai","yoko","yokude","yokumo","yoku","yoma","yomareru","yomi","yomu","yotei","you","you","youki","yousei","yowai","yowari","yo","yubi","yubisaki","yude","yudeta","yudan","yue","yueni","yuetsu","yuki","yume","yuri","yurusu","yusha","yuu","yuube","yuujou","yuujin","yuukai","yuukan","yuuki","yuumi","yuurei","yuurou","yuutai","yuuyuu","zannen","zasshi","zatsuron","zawatsuku","zei","zehi","zelo","zettai","zoka","zoku","zoni","zoo","zuru","zuru","zuru","zurui","zvous"
];

// Curated Mandarin pinyin word list (tone-less, Latin letters).
const ZH_PINYIN = [
  "ai","aiqing","an","ba","baba","bai","baise","ban","bangzhu","bao","baocun","baohu","baoma","baoshi","beijing","ben","beng","bi","bici","biefu","bieren","bikan","bilv","bing","binggan","bingren","bo","bobao","bodu","bufa","bu","buguo","buneng","buping","bushi","butong","buyao","buyong","ca","cai","caidan","caihong","caijiao","caiyong","caizi","canjia","ceshi","cha","chai","chan","chao","chaofan","chaolian","che","chen","cheng","chengshi","chi","chifan","chongwu","chongwu","chou","chu","chuan","chuang","chubu","chufa","chujiao","chulaoshi","chumen","chushi","chuxian","chuzu","ci","cike","cishu","cizi","cong","conger","cu","cuo","da","daban","dabao","dadang","dadian","dafa","daft","dage","dahang","dahuo","dajia","dajia","dalai","dalai","dali","dalishi","damai","dangao","dangran","dangshi","dangxiao","danhua","danren","danshi","danzi","dao","daochu","daode","daogao","daojia","daojiao","daoju","daomei","daonian","dapao","dapi","daping","daqi","dashang","dashuai","daxue","daxiao","daxue","deng","dengdai","dengji","denglu","dengren","di","dianhua","dian","dianr","dian","dianchang","dianying","diao","didi","difang","dili","ding","ding","ding","dipin","dishu","diyici","diyi","dong","donghua","dongwu","dongxi","du","duan","duanlian","duanzi","duche","duhou","dui","duibi","duihu","duiqi","duiwu","duiwu","duo","duomei","duoshao","duos","duoxiao","duoyu","duzi","e","er","erzi","fa","fada","fadian","fagong","fahui","fajia","fan","faner","fang","fangfa","fangjian","fangshi","fangwu","fangzi","fanren","fanshi","fanying","fanzhuan","fei","feichang","feiji","feiji","feiyong","fen","fendou","fenshu","feng","fengbi","fengge","fengjing","fengshan","fengshou","fengxian","fenzhong","fu","fudu","fuhe","fujia","fujiu","fuli","fumao","funu","furen","furong","fushan","fushi","fushou","futou","fuxian","fuyin","fuyong","fuzhi","fu","gai","gan","ganbu","gan","ganga","ganjue","ganma","ganne","gao","gaobian","gaoceng","gaogan","gaogen","gaoji","gaokao","gaomi","gaoqiao","gaoxing","gaozhong","gaozi","ge","ge","gebai","gediao","gei","gen","geng","gengjia","genggeng","gengneng","gengshi","gengxin","gengzhi","gengzhu","gong","gongchang","gongcheng","gongfu","gonggong","gonggong","gonggong","gongjiao","gongju","gongkai","gongli","gonglu","gongming","gongneng","gongping","gongren","gongshi","gongsi","gongtong","gongyong","gongyuan","gongzai","gongzuo","gou","gouwu","gouzao","gu","guang","guangdong","guangming","guangxi","gui","guige","guilai","guo","guo","guofang","guoji","guojia","guomin","guoqu","guoshi","guowang","guoyu","guozi","guo","guo","guo","guo","guo","guo","haizi","hao","haobuhao","haole","haoma","haoping","haor","haoren","haoshi","haoting","haowan","haowei","he","he","he","he","he","he","he","hecha","hedao","hedong","hefeng","heji","heli","heli","hen","hendong","hennan","hens","henshao","hentai","henxiang","henu","heren","heshang","heshui","hetao","hexiang","hezi","hongbaoli","hongse","hongse","hou","houdu","houhou","houjiao","houlai","houmian","houniao","houzi","hu","hua","huaban","huache","huadong","huaduo","huafeng","huagong","huahen","huai","huai","huaidan","huaidao","huaijiu","huai","huaju","huali","hualu","huaman","huanyuan","huazhong","huazhuang","huazi","hua","huan","huanbao","huancheng","huanjing","huanle","huanrao","huan","huanying","huanyuan","huanyun","huapi","huapo","huar","huaru","huashe","huasheng","huashu","huati","huatu","huawei","huawu","huaxue","huaxian","huaxiang","huaxin","huaxue","huayan","huayuan","huayu","huazhi","huaxia","huaxiang","huaxue","huo","huobao","huochai","huoche","huode","huodong","huofang","huoju","huoli","huoming","huore","huoshi","huoyan","huoyao","huoyuan","huozhe","huozui","ji","jia","jiaban","jiabing","jiachu","jiade","jiadong","jiadu","jiafa","jiafang","jiafu","jiage","jiagong","jiahe","jiahuo","jiaju","jiali","jia liu","jiaming","jian","jiand","jianfei","jiang","jiang","jiang","jiangguo","jiangjiu","jiangli","jiangshi","jiangshu","jiangsu","jiangta","jianghua","jiangzhe","jianjie","jianshe","jianshen","jianshen","jianshe","jianshe","jianshi","jianshu","jianyi","jianzhi","jiao","jiaodian","jiaohuan","jiaohui","jiaojie","jiaoliu","jiaon","jiaoqian","jiaoshi","jiaoshou","jiaoshu","jiaotong","jiaoxue","jiaoyan","jiaoyu","jiaozi","jiap","jiapei","jiapin","jiaping","jiar","jiari","jiaru","jiaru","jiashang","jiashi","jiashu","jiashu","jiasu","jiating","jiatong","jiawu","jiayong","jiayou","jiayong","jiazhao","jiazheng","jiazhong","jiazi","jie","jie","jiedai","jiedan","jiedao","jiefang","jieguo","jiehe","jiejing","jiekaijieliu","jielun","jiemu","jie","jieshao","jieshen","jieshou","jieshu","jiexi","jiexian","jiexiao","jie","jiexin","jieyi","jieyue","jie","jiezhi","jiezhu","jiguang","jihe","jihua","jihui","jihui","jijiang","jijin","jijiu","jiju","jikan","jikao","jiken","jikong","jikou","jilv","jimi","jin","jinci","jindian","jindu","jine","jing","jingbi","jingchang","jingdong","jingdian","jingguan","jingji","jingjia","jingji","jingjia","jingli","jingmei","jingming","jingnei","jingpian","jingqi","jingsai","jingshang","jingshen","jingshi","jingshu","jingshen","jingshi","jingshu","jingsi","jingshou","jingshu","jingshui","jingtai","jingtong","jingwai","jingwei","jingwen","jingxi","jingxuan","jingyan","jingying","jingyong","jingzhi","jingzhun","jingzi","jining","jinji","jinjin","jinjing","jinkou","jinlai","jinling","jinliu","jinlu","jinmai","jinman","jinmin","jinnian","jinqian","jinqiu","jinqu","jinren","jinrong","jinru","jinse","jinshen","jinsheng","jinshi","jinshu","jinsi","jinsi","jinsu","jintian","jintong","jintou","jinwei","jinwen","jinxian","jinxing","jinxing","jinxing","jinyi","jinyong","jinyu","jinyu","jinyong","jinzhi","jinzhi","jinzhu","jinzun","jiong","jiqi","jiqu","jishu","ji","jisuan","jisuan","jisi","jisun","jiwei","jiwen","jiwu","jixian","jixiao","jixie","jiyi","jiyou","jiyong","jiu","jiu","jiuban","jiubei","jiuchan","jiude","jiudian","jiudian","jiugong","jiugui","jiujia","jiukan","jiuli","jiulian","jiu","jiu","jiusi","jiusi","jiutian","jiuxiang","jiuyang","jiuyue","jiuzhu","jiuzhou","jiuzhuan","jiwa","ji","wa","juzi","ka","kaibu","kaichang","kaichu","kaiche","kaifa","kaiguan","kaihua","kaihua","kaijia","kaijie","kaimen","kaiqi","kaishi","kaiwang","kaixin","kaiye","kaiyi","kaiyuan","kan","kanbu","kandao","kanjian","kanj","kanju","kanlai","kanq","kans","kanshou","kantu","kanwan","kanya","kao","kaobei","kaochang","kaocha","kaochang","kaohe","kaolv","kaoshi","kaoyan","ke","keai","keben","kebi","kebu","keda","kedi","kefu","keguan","kejian","kejin","kejiao","kejin","kejiu","kelian","keneng","kepian","kexi","kexi","kexue","keyi","ke","keng","kong","kongbu","kongjian","kongkong","kongli","kongqi","kongqiang","kongqiu","kongshang","kongxian","kongzhi","kongzhong","kou","kou","kouling","koushou","kouwei","kouzi","ku","ku","kuai","kuaidi","kuan","kuaizi","kuilei","kunjing","kuo","kuoda","kuozhan","la","la","la","la","la","la","labake","laba","labo","la","la","labu","lachang","lao","lao","lao","lao","lao","laoban","laodong","laohu","laojia","laoke","laoren","laoshi","laotian","laowai","laozi","le","le","le","le","lei","leixing","leng","leng","lengque","lengshui","li","lia","liaocheng","liaotian","libo","libu","lichen","lidian","lifa","lifang","lifu","lilun","liming","limu","lin","lindao","line","lingdao","linggong","lingdai","lingdang","lingdang","lingdi","lingfei","lingfu","linggan","linghun","lingji","lingjian","lingjiao","lingli","lingling","linglu","lingman","lingmu","lingnong","lingqian","lingren","lingshi","lingshou","lingtang","lingting","lingwa","lingxiao","lingxing","lingxun","lingyang","lingyong","lingyong","lingzhe","lingzhi","lingzhu","linian","linji","lianjie","lianjie","lianjiao","lianjie","lianjia","lian","liana","liana","lianai","lianbi","lianbiao","liancao","liance","liandong","lian","liandu","lianhe","lianhe","lianhuan","lianhua","lianhuan","lianji","lianluo","liannian","lianlian","lianlian","lianlian","lianlian","lianma","liannei","liannei","lianpan","lianpan","lianpian","lianqian","lianqiang","lianqiu","lianren","liansai","lianshang","lianshu","lianshu","lianshu","lianshu","lianshu","lianshu","lianshuo","lianta","liantong","liantong","liantong","lianxi","lianxi","lianxian","lianxiang","lianxin","lianxing","lianyong","lianyu","lianyuan","liaoyi","liaozheng","liaowan","liaowu","liaowu","liaowu"
];

type DictStore = {
  entries: WordEntry[];
  byLength: Map<number, WordEntry[]>;
  // O(1) lookup set of all normalized words — used by checkWord()
  // Previously checkWord() did a linear scan of the length bucket
  // (up to ~12k iterations for common lengths). Now it's Set.has().
  normSet: Set<string>;
};

const cache = new Map<LanguageCode, DictStore>();

/** Official Scrabble dictionary files shipped in /data/scrabble. */
function loadOfficialFile(filename: string, extractFirst: boolean): Set<string> {
  const filepath = path.join(process.cwd(), "data", "scrabble", filename);
  if (!fs.existsSync(filepath)) return new Set();
  const content = fs.readFileSync(filepath, "utf8");
  const result = new Set<string>();
  for (const line of content.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const token = extractFirst ? trimmed.split(/\s/)[0] : trimmed;
    const norm = normalizeWord(token);
    if (!norm || norm.length < 2 || norm.length > 15) continue;
    if (!/^[a-zñç]+$/.test(norm)) continue;
    result.add(norm);
  }
  return result;
}

/** Official Scrabble word sets (loaded lazily per-language, cached). */
const officialCache: Partial<Record<LanguageCode, Set<string>>> = {};
function getOfficial(lang: LanguageCode): Set<string> | null {
  if (officialCache[lang]) return officialCache[lang]!;
  switch (lang) {
    case "en":
      officialCache.en = new Set([
        ...loadOfficialFile("NWL2023.txt", true),
        ...loadOfficialFile("CSW21.txt", true),
      ]);
      break;
    case "fr":
      officialCache.fr = loadOfficialFile("ODS9.txt", false);
      break;
    case "es":
      officialCache.es = loadOfficialFile("FISE.txt", false);
      break;
    case "it":
      officialCache.it = loadOfficialFile("ZINGA.txt", false);
      break;
    case "nl":
      officialCache.nl = loadOfficialFile("OpenTaal.txt", false);
      break;
    default:
      return null;
  }
  return officialCache[lang] ?? null;
}

function loadRaw(lang: LanguageCode): string[] {
  switch (lang) {
    case "en":
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      return require("an-array-of-english-words") as string[];
    case "fr":
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      return require("an-array-of-french-words") as string[];
    case "es":
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      return require("an-array-of-spanish-words") as string[];
    case "it":
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      return require("an-array-of-italian-words") as string[];
    case "pt":
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      return require("an-array-of-portuguese-words") as string[];
    case "de":
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      return require("an-array-of-german-words") as string[];
    case "nl":
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      return require("an-array-of-dutch-words") as string[];
    case "ja":
      return JA_ROMAJI;
    case "zh":
      return ZH_PINYIN;
  }
}

export function getDict(lang: LanguageCode): DictStore {
  const cached = cache.get(lang);
  if (cached) return cached;

  const official = getOfficial(lang);
  const raw = loadRaw(lang);
  const entries: WordEntry[] = [];
  const byLength = new Map<number, WordEntry[]>();
  const seen = new Set<string>();

  // Build a normalized lookup of the raw npm list to recover original (accented) form
  const rawByNorm = new Map<string, string>();
  for (const w of raw) {
    const norm = normalizeWord(w);
    if (norm && norm.length >= 2 && norm.length <= 15 && /^[a-zñç]+$/.test(norm)) {
      if (!rawByNorm.has(norm)) rawByNorm.set(norm, w);
    }
  }

  if (official) {
    // AUTHORITATIVE: use the official Scrabble list. Every word in it is valid.
    for (const norm of official) {
      if (seen.has(norm)) continue;
      seen.add(norm);
      const display = rawByNorm.get(norm) ?? norm;
      const entry: WordEntry = { word: display, norm, len: norm.length };
      entries.push(entry);
      const bucket = byLength.get(entry.len);
      if (bucket) bucket.push(entry);
      else byLength.set(entry.len, [entry]);
    }
  } else {
    // No official list (de/pt/ja/zh): use npm/curated + Scrabble-validity filter.
    for (const w of raw) {
      const norm = normalizeWord(w);
      if (!norm || norm.length < 2) continue;
      if (!/^[a-zñç]+$/.test(norm)) continue;
      if (seen.has(norm)) continue;
      seen.add(norm);
      if (norm.length > 20) continue;
      if (!isScrabbleValid(w, lang)) continue;
      const entry: WordEntry = { word: w, norm, len: norm.length };
      entries.push(entry);
      const bucket = byLength.get(entry.len);
      if (bucket) bucket.push(entry);
      else byLength.set(entry.len, [entry]);
    }
  }

  const store: DictStore = { entries, byLength, normSet: seen };
  cache.set(lang, store);
  return store;
}

export function dictSize(lang: LanguageCode): number {
  return getDict(lang).entries.length;
}

// ──────────────────────────────────────────────────────────────
// WORDLE-SPECIFIC DICTIONARY
// Separate from the Scrabble dictionary. For English, uses a curated
// Wordle word list (5-7 letter words from NWL2023 + CSW21). For other
// languages, falls back to the Scrabble dictionary (since official
// Wordle word lists don't exist for other languages).
// ──────────────────────────────────────────────────────────────

const wordleCache = new Map<LanguageCode, DictStore>();

export function getWordleDict(lang: LanguageCode): DictStore {
  const cached = wordleCache.get(lang);
  if (cached) return cached;

  // For English: load the dedicated Wordle word list
  if (lang === "en") {
    const wordleWords = loadOfficialFile("EN_WORDLE.txt", false);
    if (wordleWords.size > 0) {
      // Also get the display words from the raw npm list
      const rawByNorm = new Map<string, string>();
      const raw = loadRaw("en");
      for (const w of raw) {
        const norm = normalizeWord(w);
        if (norm && norm.length >= 2 && norm.length <= 15 && /^[a-zñç]+$/.test(norm)) {
          if (!rawByNorm.has(norm)) rawByNorm.set(norm, w);
        }
      }

      const entries: WordEntry[] = [];
      const byLength = new Map<number, WordEntry[]>();
      const seen = new Set<string>();

      for (const norm of wordleWords) {
        if (seen.has(norm)) continue;
        seen.add(norm);
        const display = rawByNorm.get(norm) ?? norm;
        const entry: WordEntry = { word: display, norm, len: norm.length };
        entries.push(entry);
        const bucket = byLength.get(entry.len);
        if (bucket) bucket.push(entry);
        else byLength.set(entry.len, [entry]);
      }

      const store: DictStore = { entries, byLength, normSet: seen };
      wordleCache.set(lang, store);
      return store;
    }
  }

  // For other languages: use the Scrabble dictionary (no official Wordle lists exist)
  const scrabbleDict = getDict(lang);
  wordleCache.set(lang, scrabbleDict);
  return scrabbleDict;
}
