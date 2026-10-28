// src/lib/wordle-articles-zh.ts — Wordle articles in Simplified Chinese.
// Written FOR Chinese speakers playing ENGLISH Wordle. Not a literal
// translation: each entry contrasts English Wordle patterns with Chinese
// pinyin/hanzi expectations (what transfers and what doesn't).
//
// Facts stay English — Wordle answers, frequencies, and Scrabble tile values
// are identical to wordle-articles.ts (S is the top starter, E the top letter
// and ending, Y the #2 ending, plurals excluded so almost nothing ends in S,
// Q almost always pairs with U, PIZZA 24 / FUZZY 29 / DIZZY 27 crossovers...).
// Only the framing is Chinese: pinyin-vs-English-spelling contrasts, the
// tone-blind spelling point (ZHONG = 中/钟/重), the no-plural trap, and the
// English ending set (E/Y/T/R/N) vs Chinese syllable codas (vowels, n/ng).
// Placeholder tokens are identical to the EN file:
// {letter} {Letter} {angle} {score} {count} {total} {plural} {tileWord} {double} {triple}
import type { WordleArticleContent } from "./wordle-articles";

export const ZH_WORDLE_ARTICLES: WordleArticleContent = {
  titleTemplate: "如何用{angle}赢下Wordle",
  startsLead:
    "Wordle奖励了解每个字母偏爱位置的玩家。以 {letter} 开头的单词在答案库中扮演特定角色：共有 {total} 个有效Wordle答案以这个字母开头，掌握其主导模式，就能把盲猜变成武器。请记住：Wordle是英文游戏，答案全部是英文单词——汉字与拼音的直觉不会自动迁移，而本指南会逐页说清哪些直觉能用、哪些必须重建。以下涵盖 {letter} 开头答案的Wordle战术、该字母的Scrabble牌面分值（WordIzy的跨界知识点），以及藏在上方实时词表里的高分词。",
  endsLead:
    "词尾是Wordle连胜的生死线——对中文母语玩家尤其如此：中文音节几乎只以元音或 n、ng 收尾，而英文答案的词尾由 E、Y、T、R、N 主导，这套频率感必须从头建立。以 {letter} 结尾的单词在答案库中自成一个家族——共有 {total} 个有效Wordle答案以这个字母收尾——其模式的研究回报远高于随机猜测。本指南拆解 {letter} 词尾战术、WordIzy标注在每个答案旁的Scrabble分值，以及值得背诵的高分跨界词。",
  tileTemplate:
    "Scrabble跨界知识：字母 {Letter} 在英文Scrabble中值 {score} 分（英文记法 {score} point{plural}），每套牌里只有 {count} 张（英文称 {tileWord}）。WordIzy会在每个Wordle答案旁标注它的Scrabble得分——当某个答案同时是高分Scrabble词（{Letter} 落在双倍字母格得 {double} 分，三倍字母格得 {triple} 分），你在上方实时词表中一眼就能认出，记进词库，留给下一副牌架用。",
  topWordsHeading: "含 {Letter} 字母的高分Wordle词",
  topWordsLead:
    "以下由我们的单词数据库实时给出：在包含 {letter} 的有效Wordle答案里，这些是Scrabble得分最高的一批。它们一箭双雕——既是每日谜题的强力候选，也是Scrabble牌桌上的高分管用词：",
  closing:
    "休闲玩家与连胜玩家的差距很少在于运气——而在于知道哪些 {letter} 词是有效Wordle答案、这个字母在统计上偏爱哪个位置、以及如何把每次猜测花在信息量最大的地方。收藏本页，把上方高分词刷熟，{letter} 就不再是可怕的未知格，而是你主动利用的线索。对中文玩家来说，这套英文频率直觉要靠刻意练习来建立——而本页就是你的练习起点。",
  letters: {
    a: {
      title: "A词——开局的先锋",
      starts:
        "A是Wordle第二常见的开头字母——约每十二个答案就有一个以A开头，仅次于S。拼音里 a 是最高频的韵母之一，中文玩家容易高估A开头的密度，但这个排名依然值得优先排查。主流形态是 AD-、AL-、AN-、AR-、AT-（ADAPT、ALERT、ANGEL、ARGUE、ATLAS），还有 ABACK 这类双A词专抓没防备的人。ADIEU 和 AUDIO 一发测四个元音，是判断今日答案是否含 E、I、O、U 的最快路径。第一格A变绿时，下一步跑 ANGEL-ARGUE-ATLAS 这个三角组合；变黄则多半指向第二格。",
      ends:
        "以A结尾的Wordle答案不到百分之三，比多数玩家预想的少得多——对中文玩家尤其反直觉：汉语音节以 a 收尾稀松平常（大、妈、家），英文答案库却不买账。A词尾家族基本是外来词俱乐部：AURA、COMA、DRAMA、EXTRA、KOALA、MAGMA、OMEGA、PANDA、PLAZA、SOFA、VILLA、YOGA、ZEBRA、ARENA、ULTRA、AROMA。策略随之改变：黄色A几乎总是指向第二或第三格而非第五格，先测词中位置，别把猜测烧在词尾。Scrabble角度：A只值1分（一套牌9张），A词尾普遍分不高——但 EXTRA（12分）和 ZEBRA（16分）是暗中高分的双面手。",
    },
    b: {
      title: "B词——大胆的第二猜",
      starts:
        "B是Wordle第三常见的开头字母——约每十四个答案有一个以B开头（BLACK、BREAD、BRING、BONUS、BEACH）。有趣的是，拼音里 b 也是高频声母，但两种语言的结构完全不同：中文靠“声母+韵母”组字，英文B词的主力是 BL- 和 BR- 连缀（BLADE、BRICK、BROTH），再加 BE- 家族（BEAST、BEGIN、BENCH）。B很少出现在词中其他位置，一发灰色B能同时排除 BA- 到 BU- 五个家族，单次猜测的信息量属第一梯队。ADIEU 这类元音开局不含B，第一格B变绿后，先回头补一遍元音图。",
      ends:
        "没有任何常见五字母Wordle答案以B结尾——这个家族在答案库里实际上是空的，因为英文原生B收尾词几乎都更长（absorb、describe）或属于截短形式。这里中文玩家有个小小便利：普通话音节从不以 b 收尾，直觉上就不会往词尾猜B——但要知道英文里B收尾词真实存在（如 Scrabble 里的 CRUMB），只是进不了Wordle答案库。黄色B强烈指向第二或第三格（RABID、ROBOT、HABIT、CABLE）。Scrabble角度：B值3分（仅2张），CABLE（9分）、GAMBLE（10分）这类B在词中的词才是得分点。",
    },
    c: {
      title: "C词——双音覆盖术",
      starts:
        "C是Wordle第二常见的开头字母——近十分之一的答案以C开头，主力是 CA-、CO-、CR- 三大族（CANDY、CATCH、COUCH、CRANE、CROSS）。拼音的 c 读作近似 ts（ci、cao），与英文C的两种读音都对不上，中文玩家要专门记英文的软音规则：C在E、I、Y前常读 /s/（CIDER、CYCLE、CIVIC），其余场合读硬音 /k/（CATCH、CRANE）——一次C猜测同时试探两个音系家族，覆盖面天然占优。CH- 连缀（CHAIR、CHESS、CHICK）自成一个高频部落。开局词 CRANE 名声在外有道理：一发打包 C、R、A、N、E 五个高频字母。",
      ends:
        "几乎没有Wordle答案以C结尾——五字母C收尾词在答案库里是空白，因为像 MUSIC、LOGIC 这样的词把C放在第四格而非第五格。把模式当证据用：盘面出现 MUSI- 或 LOGI- 时，C 填第四格，永远别猜第五格。黄色C通常标记第一或第四格（CHAIR、MUSIC、LOGIC、MAGIC）。顺带一提，普通话音节同样不以 c 收尾，“C不收尾”是中文玩家少数凭直觉就能掌握的规则之一。Scrabble角度：C值3分（仅2张），MUSIC（9分）、MAGIC（9分）、LOGIC（6分）都是双游戏通吃的稳健答案。",
    },
    d: {
      title: "D词与-ED词尾推理",
      starts:
        "D是中等频率的开局字母——约每二十个Wordle答案有一个以D开头（DANCE、DAILY、DIARY、DOUBT、DREAM、DRINK）。D开头家族分两组：元音在前的 DA-、DE-（DANCE、DEBUT、DELTA）和 DR- 辅音连缀（DREAM、DRIFT、DRIVE、DROWN），再加 DI- 形态（DIARY、DIGIT、DINER）值得中盘一探。实战里先看第二格：元音已确认就沿 DA-/DE- 走，未确认就用 DR- 一发双测。关键在于D同时名列四大常见词尾字母：第五格的灰色D和第一格的绿色D一样值钱，尽早确认D的位置可以立刻改变你的收官规划。",
      ends:
        "D是第七常见的词尾字母——约百分之四的答案，几乎全靠 -ED 过去式/形容词形态（FIXED、BROAD、BLOOD、THIRD）和光杆 -D 名词（WORLD、BLOND、HOUND、FIELD、BEARD）。中文动词没有过去式变形，这条推理链要刻意记：E 和 D 一旦同时确认，答案大概率是过去式，信息全集中在开头几个字母。D词尾还构成漂亮的押韵家族——WOULD、COULD、SOUND、FOUND，猜中一个就解锁一片。Scrabble角度：D值2分（4张），WORLD 和 WOUND 各9分、BROAD 8分，是清牌架的稳健选择。",
    },
    e: {
      title: "E词——元音之王",
      starts:
        "E是整个Wordle答案库最常见的字母——约占全部字母的百分之十一——却极少开头：以E起始的答案不到百分之二（EAGLE、EARLY、EARTH、EIGHT、ELITE、EMPTY、ENEMY、ENTER、EQUAL、ERUPT、EXACT、EXTRA）。这个反差本身就是策略：第一格E变绿，候选范围立刻缩到上方这份短名单。主力家族是 EA-（EAGLE、EARLY、EARTH）、EM-/EN-（EMPTY、ENEMY、ENTER）和 EX- 高分对（EXACT、EXTRA）。拼音里 e 同样是核心韵母，但“高频却从不带头”的位置感必须靠这份名单重建——E通常躲在词中或词尾。",
      ends:
        "E是词尾之王：约五分之一的Wordle答案以E收尾，断层领先所有词尾字母。高产家族有 -KE、-LE、-ME、-NE、-SE、-TE、-VE（SNAKE、APPLE、BLAME、STONE、HOUSE、WRITE、GIVE），-ER 比较级家族（AFTER、WATER、SUPER）再添约四个百分点。特别提醒中文玩家：英文词尾的E经常不发音（HOUSE、STONE 的E），拼音里没有哑音字母，这种“看得见听不见”的E只能靠拼写记忆。只剩最后一格而元音一片灰时，第五格押E是统计上最正确的赌注。Scrabble角度：E只值1分（一套牌多达12张），HOUSE（8分）、STONE（5分）稳健，-ER/-LE 家族是全站最值得成组刷的押韵词组。",
    },
    f: {
      title: "F词——快速排除的利器",
      starts:
        "F是中等频率的开局字母——约每二十个Wordle答案有一个以F开头（FAIRY、FANCY、FIELD、FIRST、FLOAT、FRONT、FROST、FRUIT）。F词是排除利器：这个字母很少出现在词中其他位置，一发灰色F能同时灭掉 FA-、FE-、FI-、FO-、FU- 五个家族，单猜信息量属第一梯队。主力形态是 FR- 连缀（FRESH、FRIED、FRONT、FROST）和元音在前的 FA-/FE-（FANCY、FEAST、FEVER、FIBER）。F也是少数“开局常见、词尾绝迹”位置感极清晰的字母。SLATE、CRANE 这类热门开局都不含F，当你怀疑答案有个前置辅音丛时，FRONT、FLOAT、FROST 值得中盘专门一测。",
      ends:
        "实际上没有任何Wordle答案以F结尾——答案库里找不到五字母F词尾，因为英文原生的F收尾几乎都出现在更长的词里（itself、behalf）。普通话音节同样不以 f 收尾，这条排除规则中文玩家凭直觉就能掌握，属于少数“白送”的结构知识：最后一格悬而未决时，F永远不是答案。黄色F于是强烈指向词中位置（KNIFE、WOLF、CHEF）。Scrabble角度：F值4分（仅2张），KNIFE（12分）、WOLF（10分）、CHEF（12分）这类F藏在词中的答案正是本页要挖的双面高分词——收进你的 Save Vault。",
    },
    g: {
      title: "G词与-ING词尾",
      starts:
        "G是低频开局——以G开头的Wordle答案不足百分之三（GHOST、GIANT、GIVEN、GLASS、GLOBE、GRACE、GRAND、GRASP、GROUP、GUESS）。拼音里 g 是高频声母（gao、guo），但英文G词几乎全走 GR- 连缀（GRAND、GRAPE、GRASP、GRAVE、GREED、GRILL、GROSS、GROUP、GROVE、GROWL），GL-（GLASS、GLOBE、GLORY）和 GO-（GOOSE、GORGE）是辅助家族。第一格G变绿且R确认后，GRA-/GRE- 三角是下一步；GUESS 则提醒你 G 后面也未必总跟辅音，元音直连的 GUE- 形态同样存在。统计上，G在场的答案把它放在词尾（-ING 形态）的次数远多于放在词首——在开头测它是一次刻意的反向操作。",
      ends:
        "约百分之二的Wordle答案以G结尾，分两族：-ING 动名词家族（BRING、GOING、DYING、USING）和 -NG 单音节词（AMONG、STRONG、WRONG、YOUNG）。这里是中文玩家的直觉顺风区：拼音音节以 ng 收尾是标配（ang、eng、ing、ong），所以“第五格G变绿→前面必有N”几乎可以条件反射。推理链条很强：绿色G加元音线索立即指向 -ING 或 -ONG，前两三个字母成为小范围检索集。顺带说明：拼音里 ZHONG 可以是中、钟、重（zhōng、zhòng），靠声调和汉字区分，而Wordle没有声调——只认字母拼写。Scrabble角度：G值2分（3张），BRING（8分）、YOUNG（9分）分数平平，-ING 后缀引擎才是G在另一游戏里的价值所在。",
    },
    h: {
      title: "H词——辅音连缀解码器",
      starts:
        "H很少单独开局——以H开头的Wordle答案不足百分之三，它更常见的身份是躲在 TH-、CH-、SH-、WH- 四大连缀里。拼音里 h 是独立的高频声母（hao、hua、he），中文玩家需要重新认识它的英文性格：单打独斗的开局词是 HABIT、HAPPY、HEART、HEAVY、HORSE、HOTEL、HUMAN、HUMOR、HURRY 这批主力，集中在 HA-/HE-/HU- 三个元音前置形态。H的战术价值是连缀确认器：T 变黄且你怀疑 TH 时，一发 THEME 或 THUMB 同时解决两个字母的位置。SLATE 不含H，怀疑连缀时中盘专门补一发。",
      ends:
        "约百分之三的Wordle答案以H结尾，全部走“短元音+辅音连缀”路线：-ACH（BEACH、TEACH）、-ITCH（PITCH、SWITCH）、-USH（BRUSH、FRESH）和 -UGH 形态（TOUGH、ROUGH、LAUGH、MOUTH）。第五格H变绿等于宣告：答案几乎必然是短元音加辅音丛的单音节词，候选名单立刻坍缩。这正是中文玩家要专门练的形态——普通话音节从不以 h 或任何辅音丛收尾。Scrabble角度：H值4分（仅2张），WORTH 和 YOUTH 各11分，是货真价实的双面高分词，值得收进词库。",
    },
    i: {
      title: "I词——藏在词中的元音",
      starts:
        "以I开头的Wordle答案不足百分之一（IMAGE、INDEX、INPUT、IRONY、ISSUE、IVORY）。拼音里 i 几乎从不打头，这一点上中文玩家的直觉与英文答案库罕见地一致。幸存的I开头词多是外来词和技术词，第一格I变绿是强稀缺信号：答案属于一个小而好记的俱乐部。IN- 前缀家族（INDEX、INPUT）最密，IR-/IS-（IRONY、ISSUE）次之。I在第三、四格的出现频率是第一格的三倍，ADIEU 把I放在第四格正是它的舒适区——测词中才是I的默认战术。",
      ends:
        "几乎没有Wordle答案以I结尾——答案库里I词尾的数量约等于零，因为英文原生五字母词没有I收尾的。这条“零”本身就是策略：最后一格悬而未决时，永远别猜I。对中文玩家这是必须反转的直觉：拼音音节以 i 收尾比比皆是（si、qi、li、yi），英文答案库却一票否决。黄色I压倒性地标记第三或第四格（MUSIC、LOGIC、VIVID、RIVAL、CIVIC、PILOT、TIGER）。-IC 形容词家族（MUSIC、LOGIC、CIVIC、TOPIC、MANIC）是I最高产的形态。Scrabble角度：I只值1分（9张），VIVID（13分）是罕见的双V双面手词。",
    },
    j: {
      title: "J词——最稀有的开头",
      starts:
        "J是Wordle最稀有的字母之一——全部答案里含J的只有约千分之二点五，开局词基本就是 JOINT、JOKER、JUICE、JUDGE、JUICY 加少量外来词。拼音里 j 是高频声母，但永远只接 i 或 ü（ji、jia、ju）；英文J同样必须跟元音，不过任何元音都行——这是半条能迁移的直觉。稀缺即策略：绿色J把候选缩到一个好背的小俱乐部，一发 JOKER 或 JOINT 专测多数开局词永远不碰的字母。中盘遇到顽固的未知辅音时，J是值得一发的长枪。",
      ends:
        "没有任何Wordle答案以J结尾——整个官方答案库里一个都没有，英文五字母J收尾词不存在。普通话音节同样不以 j 收尾，这条排除规则中文玩家不用额外背，属于直觉顺风区：黄色J只可能落在第一到第四格，实际是前三格。词中的J才是主场：MAJOR 和 BANJO 把J放在第三、四格，JOINT、JOKER 留在第一格；多数玩家最先遇到的是 ENJOY，J 在第四格。Scrabble角度：J值8分（一套牌仅1张，稀有度第一梯队），BANJO（14分）、MAJOR（13分）正是本页要挖的高分双面词。",
    },
    k: {
      title: "K词与CK双辅音",
      starts:
        "以K开头的Wordle答案只占约百分之一（KNIFE、KNOCK、KNOWN、KAYAK、KIOSK、KNEEL）。K的招牌是 KN- 哑音家族：一半的K开局词以一个不发音的N打头——这是中文玩家要特别小心的英文特有陷阱，因为拼音里每个声母都发音，不存在哑音字母。猜K因此一石二鸟：既测K，又确认哑音N模式是否在场。元音密集的 KA-/KO- 外来词（KAYAK、KIOSK）值得认脸。第一格K变绿加N变灰，一发就灭掉整个 KN- 家族——单次猜测的信息量极高。",
      ends:
        "约百分之三的Wordle答案以K结尾，几乎全走短元音加 ACK/OCK/ICK/UCK 家族的路线：BLACK、BLOCK、BRICK、CLOCK、KNOCK、QUICK、STICK、STUCK、THINK、THICK、TRACK、TRUCK、SHACK。推理链条：第五格K变绿加已确认的短元音，中间辅音几乎必然是 L、R、S、T 或 TH——五个候选，一发定音。CK 双写是中文没有的拼写现象，普通话音节也不以 k 收尾，这批词只能成组刷——背熟四个韵尾家族后，第五格K变绿时你几乎总能当场报出候选。Scrabble角度：K值5分（仅1张），QUICK（18分）、THINK（12分）、BLACK（11分）是高价值双面答案。",
    },
    l: {
      title: "L词——三大词尾家族",
      starts:
        "L是中上频率的开局字母——约百分之四的Wordle答案以L开头（LABEL、LARGE、LAUGH、LEARN、LEMON、LIGHT、LIMIT、LOCAL、LOYAL、LUNCH、LUCKY）。拼音里 l 同样是全能声母（le、li、la），位置感可以部分迁移：英文L也是“哪都能去”的字母，是英文最常见的词中辅音，所以第一格测L统计上合理；但黄色L更多指向第二、三、四格（PLACE、BLEND、FLOOD、SMILE）。LL- 双写（LLAMA）和 FL-、CL-、PL-、BL- 连缀藏在成千上万个答案里——L的知识会在全站每个字母页上复利。",
      ends:
        "L是第六常见的词尾字母——约百分之五的答案以L收尾，分三个家族：-AL（EQUAL、LOCAL、LEGAL、FOCAL、MEDAL、PEDAL、TOTAL）、-LE（APPLE、TABLE、CABLE、NOBLE、MAPLE）和 -EL（LABEL、MODEL、HOTEL、VOWEL、JEWEL）。三族拆分就是学习计划：L前是A想 -AL，是E想 -LE 或 -EL。普通话音节不以 l 收尾，这批词尾是纯增量知识，只能成组刷。注意 -LE 的E不发音——又是哑音字母。Scrabble角度：L只值1分（4张），MEDAL（8分）、MAPLE（9分）中规中矩，而 G、L 同时在场时 LEGAL（6分）是杀手级猜测。",
    },
    m: {
      title: "M词——收尾的稀客",
      starts:
        "M是中频开局字母——约百分之三的Wordle答案以M开头（MAGIC、MAJOR、MANGO、MARCH、MATCH、MEDIUM、MINOR、MONEY、MONTH、MORAL、MOTOR、MOUSE、MOVIE、MUSIC）。拼音里 m 同样是常见声母（ma、mo、me），直觉基本同向。MA- 家族最密（MAGIC、MAJOR、MANGO、MARCH、MATCH），MO- 紧随（MONTH、MORAL、MOTOR、MOUSE、MOVIE）。元音密集开局之后，M词是优秀的第二猜：M几乎只在开头跟 A 或 O，第二格元音确认后，MA- 与 MO- 的选择基本自动决定。双写 MM（COMMA、MUMMY、GAMMA）少见但辨识度极高——两个格子同时黄M往往是它的信号，一发确认。",
      ends:
        "以M结尾的Wordle答案不足百分之二：MAXIM、MEDIUM、RHYTHM、VENOM、FORUM、VICTIM、WISDOM、GLOOM、BLOOM、CHASM、SCREAM、ALBUM、PSALM。普通话音节绝不以 m 收尾（粤语倒是可以），所以M词尾对多数中文玩家是纯空白区，只能整表背。注意这批词的形状：多是学术、技术词，配 OO、A-、I- 的特定元音结构——第五格M变绿加双O或I的线索，GLOOM、BLOOM、VICTIM 立刻浮出。Scrabble角度：M值3分（仅2张），MAXIM（16分）、VICTIM（12分）是双面高分词，RHYTHM（21分，Y在双倍字母格时）是M家族里藏着的怪兽。",
    },
    n: {
      title: "N词——鼻音锚点",
      starts:
        "N是中频开局字母——约百分之二的Wordle答案以N开头（NAIL、NAIVE、NASTY、NAVY、NECK、NERVE、NEVER、NIGHT、NOBLE、NOISE、NORTH、NOTCH、NURSE）。拼音里 n 身份特殊：既是常见声母，又是普通话仅有的两种韵尾（n、ng）之一——英文N同样是“无处不在”型字母，整体频率高居第四，这个大方向直觉可以迁移。NA- 挑大梁，NO-（NORTH、NOISE、NOBLE）和 NE-（NECK、NERVE、NEVER）分掉其余。N开局朴实但信息密集：尽早确认N的位置——尤其第四格的 -ION/-ON 模式——能直接解锁五字母答案的主流词尾。NIGHT 和 NOTCH 是值得记住的连缀探针。",
      ends:
        "N是第五常见的词尾字母——约百分之六的Wordle答案以N收尾，走两大家族：-EN（GIVEN、OFTEN、OCEAN、OVEN、WOMEN、SIREN、RAVEN、SEVEN、WOVEN、MELON）和 -AN（BEGAN、HUMAN、ORGAN、PECAN、TITAN、VEGAN）。这里是中文玩家的顺风区：拼音的 an、en、in 本身就是“元音+n”结构，与英文 -AN/-EN 词尾形状惊人一致——直觉直接迁移。第五格N变绿后，整词骨架只剩“辅音+元音+N”，检索范围极小；加E线索直指 -EN，加A线索直指 -AN。Scrabble角度：N只值1分（6张），ORGAN（6分）、RAVEN（8分）、WOMEN（10分）是稳健的双面词。",
    },
    o: {
      title: "O词——第二元音",
      starts:
        "O是罕见开局——以O开头的Wordle答案只占约百分之一（OCEAN、OFTEN、OLIVE、ONION、OPERA、OTHER、OUGHT、OUNCE）。拼音里 o 是核心韵母（o、ou、ong），但英文的O几乎从不带队：它是整体频率第四的字母，主力位置在第二、三格，所以O开局当首发价值很低。O开头的家族由 OU- 双元音形态（OUGHT、OUNCE）和 O+辅音对（OCEAN、OFTEN、OLIVE、ONION、OPERA、OTHER）构成。OO- 双元音家族（BLOOD、FLOOR、GLOOM）虽然由别的字母开头，却同样吃O的知识——OU- 开局形态是O独有的贡献，值得专门一发。",
      ends:
        "以O结尾的Wordle答案只有约百分之二，基本是个外来词俱乐部：MANGO、TORSO、HALO、PIANO、ECHO 加几个借词。这份名单短到可以整表背下——于是罕见词尾变成免费推理：最后一格悬而未决、元音线索又指向O时，先测这份短名单再谈别的。中文玩家注意：拼音音节以 o 收尾很常见（wo、bo、po），但英文答案以O收尾的极少，这条直觉必须反转。黄色O更多标记第二或第三格（MONEY、PHONE、GHOST、SCOOP、BROOM）。Scrabble角度：O只值1分（8张），MANGO（8分）、TORSO（5分）分数平平——本页真正的价值是帮你省下浪费的猜测。",
    },
    p: {
      title: "P词——精准的一击",
      starts:
        "P是中频开局字母——约百分之三的Wordle答案以P开头，家族从 PAINT、PANDA、PAPER、PARTY、PASTA 到 PLANT、PRESS、PRIZE 十分庞大。拼音里 p 同样是高频声母（pi、pu、ping），大方向直觉可以迁移。主力是 PL- 和 PR- 连缀（PLAIN、PLANT、PRESS、PRIDE、PRICE），元音在前的 PA-（PAPER、PASTA、PANDA）做辅助。P是精准仪器：它很少出现在词中其他位置，一发灰色P同时灭掉三个家族。PR- 家族里 PRICE、PRIDE、PRIME 高度押韵，一发测三词。双写PP的 PIZZA 是答案库最著名的外来词——黄色P加Z线索，基本就是 PIZZA 在招手。",
      ends:
        "以P结尾的Wordle答案不足百分之一——-AP、-IP、-OP 这类单音节词在答案库里几乎不存在。普通话音节同样不以 p 收尾，直觉对齐：黄色P高置信度地标记前三格（PAINT、PAPER、PUPIL），最后一格的猜测应该花在 E、Y、T 这些高频词尾上。Scrabble角度才是P页的真正看点：P值3分（仅2张），PIZZA（24分）是全答案库得分最高的常见词之一，看到就立刻收进 Save Vault；PROVE（10分）和 PRIZE（16分）是连缀家族的另外两员双面冠军。",
    },
    q: {
      title: "不带U的Q词",
      starts:
        "Q是Wordle最稀有的字母——含Q的答案不足百分之一，开局是一个小俱乐部：QUAKE、QUART、QUEEN、QUERY、QUEUE、QUICK、QUILT、QUIET、QUITE、QUOTA、QUOTE。对中文玩家这是必须专项训练的字母：拼音的 q 永远只接 i 或 ü（qi、qing、quan），从不跟 u；英文恰好相反——Q后几乎必然是U，这是英文的铁律。绿色Q之后的下一个动作就是测U；U变灰，说明你在找“不带U的Q词”——这是从Scrabble锦标赛知识整批进口的领域，QI（11分）、QAT、QOPH、FAQIR 都能让Q在无U时存活。上方实时词表列出每个Q开头答案及其Scrabble得分。",
      ends:
        "没有任何Wordle答案以Q结尾——官方答案库里一个都没有，英文五字母Q收尾词只存在于 SUQ、TRANQ 这类奇异物里。这个“零”是防御性礼物：最后一格悬而未决时，把猜测花在 E、Y、T、R 这些高频词尾上，而不是猎杀一个不可能的Q。普通话音节同样绝不以 q 收尾，这条规则中文玩家凭直觉就能守住。黄色Q只可能意味着第一或第二格，实际就是第一格（QUERY、QUAKE、QUOTE）。Scrabble角度：Q值10分（仅1张，并列最稀有），QUOTA（14分）、QUERY（16分）是顶级双面答案——“不带U的Q词”正是本页标题的由来。",
    },
    r: {
      title: "R词——劳模型辅音",
      starts:
        "R是中频开局——约百分之二的Wordle答案以R开头（RADIO、RAISE、RANCH、RAPID、REACT、READY、REALM、REFER、RELAX、ROBOT、ROUND、ROYAL、RURAL）。拼音里 r 只能做声母（ren、ri、ru），不能收尾；英文的R却是全方位选手——整体频率第三，词首、词中、词尾全都能去。RA-/RE- 元音前置家族挑大梁，RO-（ROBOT、ROUND、ROYAL）做辅助。开局词 CRANE 把R放在第二格，正因如此它才能一次排除半个候选池。黄色R更多意味着词中位置（BREAD、FIRST、OTHER），那里R的出现频率是词首的两倍。",
      ends:
        "R是第四常见的词尾字母——约百分之七的Wordle答案以R收尾，主力是 -ER 代理家族：AFTER、FEVER、LATER、LASER、NEVER、OTHER、OWNER、PAPER、RIVER、SUPER、TIMER、TOWER、UNDER、WATER，再加 -AR 和 -OR 形态（SUGAR、VAPOR、FLOOR）。拼音里 r 收尾只出现在儿化音（如 huár“花儿”），而英文 -ER 是庞大词尾家族——这个频率感中文玩家必须从零建立。第五格R变绿加E线索，直指 -ER，前三个字母就是检索核心。Scrabble角度：R只值1分（6张），RIVER（8分）、WATER（7分）稳健，REFER（8分）是答案库罕见的双R首尾词——值得专门一发。",
    },
    s: {
      title: "S词——开头的王者",
      starts:
        "S是Wordle最常见的开头字母——超过百分之十的答案以S开头，断层第一。SH-、SK-、SM-、SN-、SP-、ST- 六大连缀把S开头变成数十家族的巨型版图：从 SALAD、SAUCE、SCALE 到 SHARK、SHIFT、SHINE，再到 SKILL、SLEEP、SMALL、SNACK、SOUND、SPACE、SPARE、SPLIT、STAGE、STAND、START、STEAK、STILL、STONE、STORM、SUPER。中文玩家请记牢：拼音音节（如 shi、song）是汉字的记音拼写，不是英文单词——Wordle的答案必须是英文拼写，SHE、SHIP、SHINE 才算合法候选。SLATE 和 SAUCE 成为首发热门，正因为一发就把S放在第一格去测。",
      ends:
        "这是Wordle最著名的陷阱：S是全库最高频的字母，但以S结尾的答案不足百分之一——因为答案库排除了复数形式。中文玩家请特别注意：汉语名词没有复数后缀（数量靠数词与量词表达），所以“英文复数被排除→词尾S几乎绝迹”这条规则没有任何直觉可依，必须专门记忆。每天仍有无数玩家把猜测浪费在 -S 词尾上。真正的S词尾词基本是不规则复数和借词：CHAOS、CIRCUS、FOCUS、GUESS、GLASS、CROSS、BONUS。策略：黄色S压倒性地指向第一格——去测S开头的词，别去复数化。Scrabble角度：S只值1分（4张），却是延词加分的万能牌，CHAOS 和 FOCUS 各10分。",
    },
    t: {
      title: "T词——词尾巨兽",
      starts:
        "T是中频开局字母——约百分之三的Wordle答案以T开头，家族从 TABLE、TASTE、TEACH、THANK、THING、THINK 一路排到 TRACK、TRAIN、TRUST、TWIST。拼音里 t 是常见声母（ta、tian、tou），方向直觉一致；但英文的 TH- 咬舌连缀是中文完全没有的音——它同时是发音难点和拼写重点，THANK、THEIR、THERE、THICK、THING 这一族要专门刷。TR-（TRACK、TRAIN、TRUST）紧随其后。T整体频率高居第五，猜测覆盖面大——在开头测T更多是为覆盖，收官阶段它才是真正的主角。",
      ends:
        "T是第三常见的词尾字母——约百分之八的Wordle答案以T收尾，走四大双辅音家族：-HT（BRIGHT、FIGHT、LIGHT、NIGHT、RIGHT、SIGHT、TIGHT）、-NT（FRONT、PLANT、PRINT、SAINT、WANT）、-ST（FEAST、GHOST、TOAST、TRUST、WORST）、-RT（SMART、SPORT、START）。普通话音节绝不以双辅音丛收尾——这是中文玩家要专门克服的形态，四个家族只能成组背。-IGHT 是全英文最好的五字母押韵集：一发绿 GHT 同时解锁五个候选。第五格T变绿加一份元音短名单，候选立刻坍缩。Scrabble角度：T只值1分（6张），FIGHT（11分）、LIGHT（9分）值得入库。",
    },
    u: {
      title: "U词——隐身的元音",
      starts:
        "U是最少打头的元音——以U开头的Wordle答案不足百分之一（UNCLE、UNION、UNTIL、UPPER、URBAN、UPSET、USHER、UTTER）。拼音里 u 是核心韵母（bu、wu、gu），但英文的U几乎从不带队，它是“隐身元音”，主力藏在第二、三格（BUILD、GUILT、HOUSE、MOUTH、POINT、SOUND、WOULD）。QU- 组合是U最固定的住所：每个Q词都把U锁在身后——绿色Q等于U自动确认一半，这条与Q页的知识互为表里。ADIEU 把U放在第四格的自然居所，AUDIO 也覆盖它——两个热门开局都替你测了U，所以U几乎从不需要专门首发。",
      ends:
        "以U结尾的Wordle答案不足百分之一——实际约等于零，因为英文原生五字母词里根本没有U收尾的（借词除外）。中文玩家注意：拼音音节以 u 收尾再平常不过（fu、mu、lu、su），这条直觉必须反转——最后一格悬而未决时，把U从候选里划掉。黄色U标记第二到第四格，最常见是第三格（BUILD、GUILT、HOUSE、MOUTH）。-UE 形态（VALUE、VENUE）通常把E推到第五格，U仍留在词中。Scrabble角度：U只值1分（4张），但QU词骑在Q的10分上——QUERY（16分）、QUOTA（14分）是Q页讲过的双面冠军，U的知识是解锁它们的入场券。",
    },
    v: {
      title: "V词——词中的专才",
      starts:
        "V是Wordle最稀有的字母之一——以V开头的答案不足千分之五（VAGUE、VALID、VALUE、VENOM、VIDEO、VINYL、VIPER、VIRAL、VIRUS、VISIT、VITAL、VIVID、VODKA）。拼音里根本没有 v 这个声母（外来语通常用 w 或其他音代替），所以V对中文玩家是个“半外来”字母——频率感只能从零建立。主力是 VA-/VI- 家族（VALID、VALUE、VIDEO、VIRAL、VISIT）。V开局是低概率高回报的冒险：第一格变绿就把候选缩进上面这个小俱乐部。双写V的 VIVID 是答案库的展示品——英文里唯一常见的双V词，而 VALID、VALUE、VODKA 这类元音密集形态同时也是优秀的Scrabble词。",
      ends:
        "没有任何Wordle答案以V结尾——一个都没有。英文原生五字母V收尾词不存在（lav、rev 都是截短形式，连Scrabble的V收尾词都是外语借入）。把它当硬性结构知识用：黄色V只可能落在第一到第四格，实际是前三格（VIDEO、GIVEN、RIVAL、COVER、HOVER、OLIVE）。-IVE 家族（ALIVE、DRIVE、OLIVE、GIVE）是V最高产的形态，把V固定在第四格。普通话音节也不以 v 收尾——这条排除规则中文玩家直觉上占便宜。Scrabble角度：V值4分（仅2张），VIVID（13分）和 VODKA（13分）是顶级双面答案——正是本页要挖的跨界宝石。",
    },
    w: {
      title: "W词与WH连缀",
      starts:
        "W是中等开局——约百分之三的Wordle答案以W开头（WAGON、WASTE、WATCH、WATER、WHEAT、WHOLE、WORLD、WORTH、WOULD、WRITE、WRONG）。拼音里 w 是高频半元音声母（wu、wo、wang），方向直觉一致，但英文W有两个中文没有的特殊形态：WH- 签名家族（WHEAT、WHEEL、WHERE、WHICH、WHILE、WHITE、WHOSE）和哑音W的 WR- 家族（WRIST、WRITE、WRONG、WROTE）——继 KN- 之后第二个哑音字母陷阱。W开局一发测两个模式：灰色W同时灭掉 WH- 和 WR- 两个家族，这种单猜双杀多数玩家从未利用过——把两个家族分开刷，W开局的信息量立刻翻倍。",
      ends:
        "约百分之二的Wordle答案以W结尾，几乎全走 -OW 双元音家族：BELOW、ELBOW、THROW、ALLOW、ARROW 外加几个单音节 -OW 词。这里有个对中文玩家友好的巧合：-OW 的发音和拼音的 ao（“好”的韵母）几乎一样——音感可以直接迁移，只是英文用 o、w 两个字母来拼。第五格W变绿加O线索，立即锁定 -OW，前两三个字母变成检索核心。普通话音节本身绝不以 w 收尾，所以词尾W只可能属于这个家族。Scrabble角度：W值4分（仅2张），THROW（11分）、ELBOW（10分）是强力双面词，ARROW（8分）的三元音结构专抓没防备的牌架。",
    },
    x: {
      title: "X词——排除法之钥",
      starts:
        "X从不开头——整个Wordle答案库里以X开头的答案是零个，XYLEM、XEBEC 这类转写词永远不会出现。对中文玩家这是最彻底的一次直觉反转：拼音的 x 是常见声母，且永远只接 i 或 ü（xi、xing、xu），中文玩家看见X第一反应是“开头”，但英文答案库一票否决。X是纯词中字母：黄色X标记第三到第五格（TOXIC、BOXER、HELIX、INDEX、MAXIM、RELAX）。测X是排除动作：一发灰X同时灭掉 -AX、-EX、-IX、-OX 四个家族——中盘候选收窄时，这是顶级的晚期信息。",
      ends:
        "以X结尾的Wordle答案只有一小撮——不足千分之五，走 -AX 和 -EX 家族（RELAX 加几个稀有词）。战略价值在于：X词尾太稀缺，中盘一发灰X就能终结整个 -AX/-EX 猎捕，等于一次免费排除。第五格X变绿加前置元音线索时，RELAX 是压倒性热门。普通话音节同样绝不以 x 收尾，这条结构直觉对中文玩家是白送的。Scrabble角度：X值8分（仅1张，与J并列最稀有），RELAX（12分）、TOXIC（14分）是高级双面答案，而 HELIX（17分）是X词里出现在Wordle的王冠宝石——立刻入库。",
    },
    y: {
      title: "Y词——词尾奇兵",
      starts:
        "Y几乎从不开头——以Y开头的Wordle答案不足千分之二点五（YACHT、YEAST、YIELD、YOUNG、YOUTH）。对中文玩家这是最鲜明的一次反转：拼音里 y 是超高频声母（yi、ya、yu、yao），“Y打头”的直觉根深蒂固，但英文答案库里这是个五词微型俱乐部——第一格Y变绿等于直接给你这五个候选。Y的真正地盘有两块：当辅音守在词尾（HAPPY、FUNNY、HEAVY），或当元音藏在词中（MYTH、RHYME、LYMPH、CRYPT、LYNX）。黄色Y到底是词尾辅音还是词中元音——分清这个是中盘功夫，也是连胜玩家和断连玩家的分水岭。",
      ends:
        "Y是第二常见的词尾字母——约百分之九的Wordle答案以Y收尾，仅次于E。主力走 -LY、-NY、-RY、-TY 家族：ANGRY、DAILY、DIRTY、DIZZY、EARLY、FUNNY、FUZZY、HAPPY、HEAVY、LUCKY、PARTY、SILLY、SIXTY、SORRY、TASTY。注意词性：这批词绝大多数是形容词——英文形容词爱用 -Y/-LY 收尾，而汉语形容词没有任何形态后缀，这种“看词尾猜词性”的直觉是中文玩家的新装备。-Y 集合庞大，按辅音配对刷（P-Y、T-Y、R-Y、L-Y）：确认词尾Y加一个辅音，词常常直接拼完。Scrabble角度：Y值4分（2张），FUZZY（29分！）和 DIZZY（27分）是全答案库最凶的双面怪兽。",
    },
    z: {
      title: "Z词——最后的排除",
      starts:
        "Z与J、Q并列是Wordle最稀有的字母——全部答案里含Z的只有一小撮，开局词基本就是 ZEBRA、ZESTY 加几个外来词奇珍。拼音里 z 是常见声母（zai、zuo、zi，还常与 h 组成 zh），中文玩家对“z高频”的直觉在这里被彻底反转。第一格Z变绿几乎是半道送分题：ZEBRA 是压倒性热门。双写Z是Z的招牌（PIZZA、FUZZY、DIZZY）——黄色Z加元音线索，大概率直指 ZZ 家族。所有热门开局词都不测Z，确认它要花一次中盘的专门猜测，回报是候选名单坍缩到个位数——全游戏解字最快的稀有字母。",
      ends:
        "几乎没有Wordle答案以Z结尾——数量约等于零，因为英文原生五字母Z收尾词根本不存在，连 BLITZ 这样的借词也在答案库之外。普通话音节同样绝不以 z 收尾，这条排除直觉白送。黄色Z于是指向词中，最常见的是第三、四格的双写ZZ（PIZZA、FUZZY、DIZZY）——辅音双写又是中文没有的拼写现象，这批词只能整族背。ZZ 家族就是本页的学习清单：PIZZA（24分）、FUZZY（29分）、DIZZY（27分）是全答案库得分最高的三个常见词，货真价实的Scrabble怪兽。一发灰Z同时灭掉 ZZ 俱乐部和 -ZE 词尾——晚期排除价值顶级。",
    },
  },
};
