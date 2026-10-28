// src/lib/wordle-articles-ja.ts — Wordle articles in Japanese.
// Written FOR Japanese speakers playing ENGLISH Wordle. Not a literal
// translation: each entry contrasts English Wordle patterns with
// Japanese-language expectations (kana/kanji habits that don't transfer).
//
// Word facts stay English: every example word (QUERY, SLATE, PIZZA, HAPPY,
// FUZZY...) is an actual Wordle answer in Latin letters, and the statistics
// mirror wordle-articles.ts exactly (S most common starter at 10%+, E most
// common overall at ~11% and most common ending at ~18-20%, Y 2nd most
// common ending at ~9%, plurals excluded so almost no S-finals, Q almost
// always followed by U, no J/Q/V finals and virtually none in Z/X/F/B,
// Scrabble tile values Q/Z=10, J/X=8, K=5, F/H/V/W/Y=4...).
//
// Japanese contextual threads woven through the prose:
//   - Katakana drops the final E (APPLE→アップル, HOUSE→ハウス): a habit that
//     hides the most common Wordle ending from Japanese eyes.
//   - Sokuon 「ッ」 restoration: BLACK→ブラック hides CK, HAPPY→ハッピー hides
//     PP — while PIZZA hides its double Z with no ッ at all.
//   - Long vowel 「ー」 restoration: HAPPY→ハッピー, THROW→スロー, WATER→ウォー
//     ター hide the word-final Y/W/(E)R that katakana renders as a macron.
//   - L/R and V/B mergers: LIGHT/RIGHT are both ライト, VIDEO/バナナ share the
//     「バ行」 — distinct Latin letters that Japanese ears collapse.
//   - Romaji habits that never transfer: shi/si and chi/ti drift, word-final
//     U in です(desu)/ます(masu), the ックス cluster that is really one X.
//   - No plural marking in Japanese → the word-final S trap for players
//     trained to "add S" in school English.
//
// Placeholders (consumed by <WordListArticle /> fill()): {letter} {Letter}
// {angle} {score} {count} {total} {plural} {tileWord} {double} {triple}

import type { WordleArticleContent } from "./wordle-articles";

export const JA_WORDLE_ARTICLES: WordleArticleContent = {
  titleTemplate: "{angle}を使ってWordleに勝つ方法",
  startsLead:
    "Wordleは英語のゲームで、答えはすべて英単語です。漢字・かな・カタカナ語の知識は直接には役に立たず、ローマ字の感覚が通用しない場面も多いゲームです。勝つ鍵は、各文字がどの位置に好んで現れるかという英語の統計を知ること。{letter}で始まる英単語は答えプールの中で明確な役割を持ち、有効なWordle答えのうち{total}語がこの文字で始まります。支配的なパターンを押さえれば、当てずっぽうは武器に変わります。このガイドでは、{letter}で始まる単語の戦術、WordIzyが各答えの横に表示するスクラブルのタイル価値、そして上のリストに潜む高得点プレイを解説します。",
  endsLead:
    "語尾は、Wordleの連勝が守られるか砕かれるかの分かれ目です。日本語の単語はほぼ例外なく母音で終わるため、日本語話者は英語の子音語尾の感覚をゼロから作る必要があります。{letter}で終わる英単語は答えプールの中でも独立したファミリーを形成し、有効なWordle答えの{total}語がこの文字で終わります。パターンを研究する見返りは、ランダムな推測とは比べものになりません。このガイドでは、{letter}で終わる単語の戦略、WordIzyが答えの横に表示するスクラブル得点、そして覚える価値のある高得点クロスオーバー・プレイを分解して解説します。",
  tileTemplate:
    "スクラブル・クロスオーバー:英語スクラブルの{Letter}タイルは{score} point{plural}の価値があり、1ゲームに使える{tileWord}は{count}枚だけです。WordIzyはすべての答えの横にスクラブル得点を表示します。Wordleの答えがそのまま高得点スクラブル・プレイを兼ねることも多く、{Letter}をダブル文字マスに置けば{double}点、トリプル文字マスなら{triple}点になります。上のライブリストで見つけたら、次のゲームのために覚えておきましょう。",
  topWordsHeading: "スクラブル得点が高い{Letter}入りWordle英単語",
  topWordsLead:
    "以下は、{letter}を含む有効なWordle答えのうちスクラブル得点が特に高いものを、単語データベースからリアルタイムで表示したリストです。毎日のパズルで強力な推測になると同時に、スクラブルでも高得点が狙える一石二鳥の単語です。",
  closing:
    "気まぐれなプレイヤーと連勝を守るプレイヤーの差は、運ではなく知識です。{letter}を含む英単語のどれが有効なWordle答えか、その文字が統計的にどの位置を好むか、各推測を最大の情報収集に使う方法——この3つを押さえれば、{letter}は恐れるマスではなく活用できる手がかりになります。このページをブックマークして、上のトップ単語を繰り返し練習しましょう。",
  letters: {
    a: {
      title: "A語 — 序盤の切り札",
      starts:
        "AはSに次ぐ頻出の語頭文字で、約12語に1語がAで始まります。ローマ字の「a=あ」とは違い、英語のAは綴りの中で多彩な働きをするため、音ではなく形で覚えるのが正攻法です。主要な形はAD-、AL-、AN-、AR-、AT-(ADAPT、ALERT、ANGEL、ARGUE、ATLAS)で、ABACKのような二重Aも奇襲枠として存在します。ADIEUとAUDIOは1手で4母音を試せる名手で、E・I・O・Uの有無を一気に確認できます。1マス目が緑のAなら次はANGEL、ARGUE、ATLASの3語を軸に絞り込み、黄色のAなら2マス目が最有力です。",
      ends:
        "日本語はほぼすべての単語が母音で終わるため、つい語尾のAを疑いたくなりますが、実際は答えの3%未満です。A語尾はほぼ借用語クラブで、日本語でもおなじみの顔ぶれです:PANDA(パンダ)、YOGA(ヨガ)、SOFA(ソファ)、KOALA、MAGMA、OMEGA、ARENA、EXTRA。黄色のAが出たら5マス目ではなく、2〜3マス目の語中を先に試すのが正解です。スクラブルのAは1点タイル(袋に9枚)と安く、A語尾の多くは低得点ですが、EXTRA(12点)とZEBRA(16点)は隠れた高得点プレイです。",
    },
    b: {
      title: "B語 — 大胆な2手目",
      starts:
        "Bは3番目に多い語頭文字で、約14語に1語がBで始まります(BLACK、BREAD、BRING、BONUS、BEACH)。日本語ではBは常に母音を伴う「ば行」ですが、英語はBL-やBR-のように子音同士が連結します。「ブラック」は4拍に聞こえても、綴りはB-L-A-C-Kの5文字。ここがローマ字感覚と英語綴りの分かれ目です。主力はBL-とBR-(BLACK、BLADE、BRICK、BROTH)で、BE-(BEAST、BEGIN、BENCH)が続きます。Bは語中に再登場しにくいため、灰色のBが出ればBA-、BE-、BI-、BO-、BU-の全ファミリーが消えます。ADIEUのような母音多用の初手にBはないため、緑のBが出たら母音マップの再点検を。",
      ends:
        "「クラブ(CLUB)」「サブ(SUB)」は日本語では「ブ」で終わりますが、WordleにBで終わる5文字の答えは実質ゼロです。英語のB語尾はabsorbやdescribeのように長い単語の領域です。これを消去の事実として使います:終盤に5マス目が未解決なら、あり得ないBを探すより高頻度の語尾(E、Y、T)に推測を費やすべきです。黄色のBは2〜3マス目(RABID、ROBOT、HABIT、CABLE)を強く指します。スクラブルのBは3点タイル(袋に2枚)で、CABLE(9点)、GAMBLE(10点)のような語中配置が得点源。CRUMBのようなB語尾語はスクラブルにはあってもWordleの答えにはなりません。",
    },
    c: {
      title: "C語 — パターン網羅の名手",
      starts:
        "Cは2番目に多い語頭文字で、約10語に1語がCで始まります(CANDY、CATCH、COUCH、CRANE、CROSS)。日本語のローマ字では「し」がshi/si、「ち」がchi/tiと表記が揺れますが、Wordleの答えは英語綴り一択で、発音知識は直接役立ちません。ただし英語のCには/k/の音(CATCH、CRANE)とE・I・Yの前の/s/の音(CIDER、CYCLE、CIVIC)の2つの顔があり、1手で両方の音族を試せるのがC推測の利点です。CH-連結(CHAIR、CHESS、CHICK)も独立の大家族。初手CRANEが名手なのは、高頻度文字C・R・A・N・Eを1手に詰め込んでいるからです。",
      ends:
        "Cで終わるWordle答えは事実上ゼロです。MUSICもLOGICもCは5マス目ではなく4マス目に置きます。これを証拠として使いましょう:グリッドにMUSI-やLOGI-が並んでいるなら、Cは4マス目で確定です。黄色のCは多くの場合1マス目か4マス目(CHAIR、MUSIC、LOGIC、MAGIC)を指します。カタカナ語「ミュージック」の綴りがM-U-S-I-Cの5文字であることを思い出せば、文字位置で考えるWordleの鉄則にそのまま乗れます。スクラブルのCは3点タイル(袋に2枚)。MUSIC(9点)、MAGIC(9点)は両ゲームを兼ねた安定プレイで、Cがダブル文字マスに乗れば得点が跳ね上がります。",
    },
    d: {
      title: "D語と-EDの推理",
      starts:
        "Dは中頻度の語頭文字で、約20語に1語がDで始まります(DANCE、DAILY、DIARY、DOUBT、DREAM、DRINK)。「ドリーム(DREAM)」「ドリンク(DRINK)」でDR-連結に親しんでいる日本語話者は多いはずです。D語頭はDA-/DE-(DANCE、DEBUT、DELTA)とDR-(DREAM、DRIFT、DRIVE、DROWN)の2勢力に分かれ、DI-(DIARY、DIGIT、DINER)が続き、DAILYやDIARYのような「デ」「ダ」行カタカナ語との対応も素直です。Dは語尾でも4本の指に入る頻出文字なので、早期に位置を確定させると終盤の計画が一気に組みやすくなります。5マス目の灰色のDは、1マス目の緑のDと同等の価値を持つ情報です。",
      ends:
        "Dは7番目に多い語尾で、答えの約4%を占めます。日本語話者の既存知識が最も素直に使える場所です:「ワールド(WORLD)」「サウンド(SOUND)」「フィールド(FIELD)」の「ド」の正体がDであり、中学英語の-ED(過去形)の文法もそのまま推論に使えます。主要な形は-ED(FIXED、BROAD、BLOOD、THIRD)と、WORLD、BLOND、HOUND、BEARDのような-D名詞。WOULD、COULD、SOUND、FOUNDは語尾を共有する韻の家族で、1語正解すれば仲間も同時に見えてきます。スクラブルのDは2点タイル(袋に4枚)。WORLDとWOUNDは9点、BROADは8点の堅実プレイです。",
    },
    e: {
      title: "E語 — 母音の王様",
      starts:
        "Eは答えプール全体で最頻出の文字(約11%)ですが、語頭に立つのは2%未満です(EAGLE、EARLY、EARTH、EIGHT、ELITE、EMPTY、ENEMY、ENTER、EQUAL、ERUPT、EXACT、EXTRA)。日本語では母音がほぼ均等に現れるため、この圧倒的な偏りは新たに覚え直す必要があります。E語頭の主な形はEA-(EAGLE、EARLY、EARTH)、EM-/EN-(EMPTY、ENEMY、ENTER)、そしてEX-(EXACT、EXTRA)。Eは本来なら語中や語尾に潜む文字なので、1マス目で試すのは奇襲手ですが、緑になれば上記の少数精鋭リストに一気に絞り込める大技になります。",
      ends:
        "Wordleの答えの約5分の1はEで終わります。ここで日本語話者特有の落とし穴に注意:カタカナ語は英語の語尾のEを切り捨てます(APPLE→アップル、HOUSE→ハウス、GIVE→ギブ)。この「Eが見えない」習慣が、語尾のEの見落としを生みます。主なファミリーは-KE、-LE、-ME、-NE、-SE、-TE、-VE(SNAKE、APPLE、BLAME、STONE、HOUSE、WRITE、GIVE)で、-ER(AFTER、WATER、SUPER)が加勢。最後のマスが未解決なら統計的にEが最有力です。スクラブルのEは1点タイル(袋に12枚)ですが、HOUSE(8点)は信頼できる両用プレイで、-ERと-LEは反復練習に最適な韻の集合です。",
    },
    f: {
      title: "F語 — 高速消去の達人",
      starts:
        "Fは中頻度の語頭文字で、約20語に1語がFで始まります(FAIRY、FANCY、FIELD、FIRST、FLOAT、FRONT、FROST、FRUIT)。日本語の「ファ行」ではfa/fi/fu/fe/foが対等に感じられますが、英語のF語頭はFR-連結(FRONT、FROST、FRESH)が名門です。Fは語中に再登場しにくい文字なので、灰色のFが出ればFA-、FE-、FI-、FO-、FU-の全ファミリーが消え、1手あたりの情報量は極上です。第二勢力はFA-/FE-(FANCY、FEAST、FEVER、FIBER)。SLATEやCRANEにはFが含まれないため、冒頭子音を疑う中盤にはFRONTかFROSTへ1手を注ぐ価値があります。",
      ends:
        "Fで終わる5文字のWordle答えは事実上ゼロです。カタカナ語「ナイフ」を例にすると、KNIFEの最後のEが切り捨てられてFが語尾のように聞こえますが、綴りではFは4マス目で、5マス目にEが隠れています。この構造を消去に転用しましょう:5マス目が未解決ならFは絶対に答えではないため、推測をE・Y・Tに向けます。黄色のFは1〜4マス目、実際にはKNIFEやCHEFが置く語中のマス目を指します。スクラブルのFは4点タイル(袋に2枚)で、KNIFE(12点)はWordle答えとスクラブルを兼ねる両用プレイ、WOLF(10点)やCHEF(12点)もFを含む高得点語として覚えておきたいところです。",
    },
    g: {
      title: "G語と-INGパターン",
      starts:
        "Gは低頻度の語頭文字で、答えの3%未満がGで始まります(GHOST、GIANT、GLASS、GRACE、GRADE、GRAND、GROUP、GUESS)。日本語話者への注意点:カタカナ語「ゴースト(GHOST)」のGH-、「ゲス(GUESS)」のGU-とSSは、発音では1音に潰れますが、綴りには文字がしっかり残ります。音の記憶だけでは綴りを復元できない典型です。G語頭の大半はGR-連結(GRAND、GRAPE、GRAVE、GROSS、GROUP、GROWL)で、GL-(GLASS、GLOBE、GLORY)とGO-(GOOSE)が続きます。緑のGと緑のRが揃えば、次はGRA-/GRE-の絞り込み。Gは-INGとして語尾に現れることの方が多く、語頭で試すのは逆張り手です。",
      ends:
        "語尾のGは答えの約2%で、-ING(BRING、GOING、DYING、USING)と-NG(AMONG、STRONG、WRONG、YOUNG)の2陣営に分かれます。-INGは日本の学校英語で誰もが学んだ進行形の語尾で、日本人にとって最も素直に使える推論です:I・N・Gが緑で揃えば答えは動詞のing形と確定し、探すのは先頭の2〜3文字だけになります。5マス目が緑のGで母音のヒントがあれば、-INGか-ONGが即座に浮かびます。スクラブルのGは2点タイル(袋に3枚)。BRING(8点)、YOUNG(9点)は堅実な両用プレイで、-ING接尾辞はスクラブルでも得点エンジンとして働きます。",
    },
    h: {
      title: "H語 — 連結音の解読者",
      starts:
        "H単独の語頭は3%未満と珍しいものの、TH-、CH-、SH-、WH-の連結として日本語話者にも縁の深い文字です。まず注意したいのは二重子音:「ハッピー(HAPPY)」の「ッ」はPPの跡で、綴りはH-A-P-P-Y。カタカナ語の音だけ覚えていると二重子音が見えません。単独H語頭の主力はHABIT、HAPPY、HEART、HEAVY、HORSE、HUMAN、HURRYで、HA-/HE-/HU-の母音前置形が中心です。Hの戦略価値は連結の確認にあります:Tが黄色でTH-を疑うとき、THEMEかTHUMBを1手使えば2文字の位置を同時に確定できます。SLATEにHはないため、中盤のH専用プローブが価値を持ちます。",
      ends:
        "語尾のHは答えの約3%で、-ACH(BEACH、TEACH)、-ITCH(PITCH、SWITCH)、-USH(BRUSH、FRESH)、-UGH(TOUGH、ROUGH、LAUGH、MOUTH)の短母音ファミリーに集まります。日本語話者にとって-UGHは最大の注意ポイント:「タフ(TOUGH)」「ラフ(ROUGH)」の「フ」はUGHの3文字が1音に潰れたもので、綴りにはGまで隠れています。音からは復元不可能なので、綴りごと覚えるしかありません。5マス目が緑のHなら、短母音+子音連結の単音節語がほぼ確定し、候補が一気に絞れます。スクラブルのHは4点タイル(袋に2枚)で、WORTH(11点)、YOUTH(11点)は両ゲームを兼ねる強力プレイです。",
    },
    i: {
      title: "I語 — 語中の母音",
      starts:
        "日本語には「い」で始まる単語が無数にありますが、英語のWordleでI語頭は1%未満の珍品です(IMAGE、INDEX、INPUT、IRONY、ISSUE、IVORY)。母音の立ち位置の感覚が両言語で逆転する典型で、日本語の頻度感覚をそのまま持ち込むと推測を浪費します。I語頭の中心はIN-(INDEX、INPUT)で、IR-/IS-(IRONY、ISSUE)が続きます。実はIは3マス目・4マス目に3倍以上の頻度で現れる語中の母音であり、ADIEUがIを4マス目に置くのは理にかなった設計です。語頭が緑のIになったら、上記の小さなクラブに即座に絞り込めます。",
      ends:
        "Iで終わるWordleの答えは実質ゼロです。日本語の形容詞(「大きい」「高い」)が「い」で終わるのとは対照的に、英語の5文字語がIで閉じるのは借用語しかありません。この事実を消去に転用しましょう:最後のマスが未解決なら、Iに推測を使ってはいけません。黄色のIは圧倒的に3〜4マス目(MUSIC、LOGIC、VIVID、RIVAL、CIVIC、PILOT、TIGER)を指します。中でも-ICファミリー(MUSIC、LOGIC、CIVIC、TOPIC、MANIC)はIを3マス目、Cを4マス目に置く最も生産的なパターンです。スクラブルのIは1点タイル(袋に9枚)ですが、VIVIDは二重Vという珍しい構造で、両ゲームで高得点を叩き出す代表格です。",
    },
    j: {
      title: "J語 — 最希少の語頭",
      starts:
        "JはWordle最希少級の文字で、答えの約0.25%にしか含まれません。日本語では「じ」のローマ字がji/ziで揺れますが、英語の綴りはJ一択です。「ジュース(JUICE)」「ジャッジ(JUDGE)」「ジョーカー(JOKER)」——いずれもJ+母音の形で、英語のJは後続の母音を要求します。語頭候補はJOINT、JOKER、JUICE、JUDGE、JUICYの小さな記憶クラブで、CRANE系の初手では一切試されません。緑のJが出れば候補は一気に個位数まで沈みます。答えに含まれる可能性自体が低い文字なので、終盤に未知の子音が残ったら、あえて1手賭ける長打狙いが正当化される数少ない文字です。",
      ends:
        "Jで終わるWordle答えは公式リスト全体でゼロです。日本語話者の直感と一致するはずです:カタカナ語を思い浮かべて「Jで終わる単語」がほぼ浮かばないように、英語にも5文字のJ語尾が存在しません。これを確定事実として使いましょう:黄色のJが指すのは1〜4マス目、実際には1〜3マス目だけです。Jの本拠地は語中で、MAJORとBANJOは3マス目、ENJOYは4マス目に置きます。スクラブルのJは8点タイル(袋に1枚のみの最希少級)で、BANJO(14点)、MAJOR(13点)はまさにこのページが探す高得点の両用プレイ。保存庫の1軍入りです。",
    },
    k: {
      title: "K語とCKパターン",
      starts:
        "Kは約1%の珍しい語頭文字です(KNIFE、KNOCK、KNOWN、KAYAK、KIOSK、KNEEL)。日本語話者最大の注意点はKN-ファミリー:カタカナ語「ナイフ」にKの気配はありませんが、綴りKNIFEではKが先頭で沈黙しています。英語ならではの無音文字で、K推測は「Kの有無」と「沈黙Nの形」を同時に試す二重目的の手になります。緑のKに灰色のNが続けばKN-家族が一瞬で消えます。一方、KAYAK(カヤック)、KIOSK(キオスク)は綴りがそのままカタカナ化された借用語で、一目で覚える価値があります。",
      ends:
        "語尾のKは答えの約3%で、-ACK/-OCK/-ICK/-UCKの短母音家族が独占します:BLACK、BLOCK、BRICK、CLOCK、QUICK、STICK、STUCK、THINK、TRACK、TRUCK。日本語話者への嬉しいヒント:カタカナ語の促音「ッ」はCKの跡です。「ブラック」「スティック」「トラック」の「ッ」をCKに戻せば、4マス目のCと5マス目のKが同時に確定します。緑のKに短母音が揃えば、中間の子音はL・R・S・T・THのどれかで5候補に絞れます。スクラブルのKは5点タイル(袋に1枚)。QUICK(18点)、THINK(12点)、BLACK(11点)が高得点の両用プレイです。",
    },
    l: {
      title: "L語 — 語尾の名職人",
      starts:
        "Lは約4%の語頭を占める中堅です(LABEL、LARGE、LAUGH、LEARN、LEMON、LIGHT、LOCAL、LUCKY)。LA-/LE-の母音前置形が主力を担います。ここで日本語話者特有の落とし穴:「ライト」はLIGHTともRIGHTとも綴れます。LとRはカタカナでは同じ「ラ行」に潰れますが、Wordleでは別文字で、LIGHTとRIGHTはまったく別の答えです。発音で覚えた単語は、綴りで必ず確認し直してください。Lは英語で最も多用される語中子音で、黄色のLは2〜4マス目(PLACE、BLEND、SMILE)を指すことが多く、FL-、CL-、PL-、BL-の連結知識は全字母ページに効く共通武器になります。",
      ends:
        "語尾のLは6番目に多く、答えの約5%です。日本語話者は「ル」で終わるカタカナ語を思い浮かべてください:アップル(APPLE)、モデル(MODEL)、ホテル(HOTEL)、テーブル(TABLE)。「ル」の正体は-LEか-ELで、綴りには最後のEが隠れています。語尾ファミリーは-AL(EQUAL、LOCAL、LEGAL、MEDAL)、-LE(APPLE、CABLE、MAPLE)、-EL(LABEL、MODEL、VOWEL)の3分裂。Lの前がAなら-AL、Eなら-LEか-ELと整理すれば推論が一気に速くなります。スクラブルのLは1点タイル(袋に4枚)。MAPLE(9点)、MEDAL(8点)は堅実で、LEGAL(6点)はGとLが同時に試せる推測としても優秀です。",
    },
    m: {
      title: "M語 — 流れを作る文字",
      starts:
        "Mは約3%の語頭を占めます(MAGIC、MAJOR、MANGO、MARCH、MATCH、MONEY、MOTOR、MOUSE、MOVIE、MUSIC)。「マネー(MONEY)」「マウス(MOUSE)」「ムービー(MOVIE)」のようにカタカナ語との対応が素直な語が多く、日本語話者には単語を思い出しやすい文字です。最密集はMA-家族(MAGIC、MAJOR、MARCH、MATCH)で、MO-(MOTOR、MOUSE、MOUTH)が続き、Mは語頭でAかOを要求する傾向があります。そのため母音多用の初手の後の2手目に好適です。二重M(COMMA、MUMMY、GAMMA)は2マス同時に黄色が出たときの合図で、1手で確認できます。",
      ends:
        "語尾のMは2%未満と珍しい部類です:MAXIM、MEDIUM、RHYTHM、VENOM、FORUM、VICTIM、WISDOM、GLOOM、BLOOM、ALBUM。特筆すべきはRHYTHM「リズム」:カタカナ語では子音の塊が1音に潰れるため、R-H-Y-T-H-Mという綴りは発音から復元できず、答え候補として丸暗記するしかありません。5マス目が緑のMで、OOかIの母音ヒントがあればGLOOM、BLOOM、VICTIMが即座に浮かびます。スクラブルのMは3点タイル(袋に2枚)で、MAXIM(16点)、VICTIM(12点)が高得点の両用プレイ。RHYTHMはYがダブルマスに乗れば21点に達する化け物級です。",
    },
    n: {
      title: "N語 — 鼻音の要",
      starts:
        "Nは約2%の語頭を占める中頻度文字です(NAIL、NAIVE、NASTY、NECK、NERVE、NEVER、NIGHT、NOBLE、NOISE、NORTH、NOTCH、NURSE)。NA-家族(NAIVE、NASTY、NAVY)が先頭で、NO-(NORTH、NOISE、NOBLE)とNE-(NECK、NERVE、NEVER)が続き、「ネック(NECK)」「ノイズ(NOISE)」などカタカナ語との対応も素直です。Nは全体で4番目に多い文字で、-IONや-ONの形で4マス目に現れることが多く、語尾ファミリーの鍵を握ります。NIGHTとNOTCHは連結子音を試すプローブとして記憶に残る1組。Nの位置を早期に確定させることが、終盤の展開を大きく左右します。",
      ends:
        "語尾のNは5番目に多く、答えの約6%です。「オーブン(OVEN)」「メロン(MELON)」「セブン(SEVEN)」「ヒューマン(HUMAN)」のように、カタカナ語の「ン」がそのまま英語のN語尾になる数少ない文字で、日本語話者には直感が働きやすい場所です。ファミリーは-EN(GIVEN、OFTEN、OCEAN、WOMEN、RAVEN)と-AN(BEGAN、ORGAN、TITAN、VEGAN)の2つ。5マス目が緑のNでEのヒントなら-EN、Aのヒントなら-ANに即座に展開します。スクラブルのNは1点タイル(袋に6枚)。ORGAN(6点)、RAVEN(8点)、WOMEN(10点)は両ゲームで使える安定プレイです。",
    },
    o: {
      title: "O語 — 第二の母音",
      starts:
        "Oは全体で4番目に多い文字ですが、語頭に立つのは約1%だけです(OCEAN、OFTEN、OLIVE、ONION、OPERA、OTHER、OUGHT、OUNCE)。「オペラ(OPERA)」「オリーブ(OLIVE)」などO語頭の借用語は日本語にもありますが、5文字の答えではO語頭は少数派で、母音の主戦場は2〜3マス目(MONEY、PHONE、GHOST)です。OU-の二重母音形(OUGHT、OUNCE)はO語頭の個性で、1手のプローブに値します。OO-の二重母音家族(BLOOD、FLOOR、GLOOM)は他の文字で始まりますが、Oの知識がそのまま効く同盟軍です。初手のO語頭は統計的に低価値と心得てください。",
      ends:
        "Oで終わる答えは約2%の小さな借用語クラブです:マンゴー(MANGO)、エコー(ECHO)、ピアノ(PIANO)、HALO、TORSO。カタカナ語の長音「ー」の正体がOであるケースは日本語話者に有利に働きますが、母音で終わる語が多い日本語の感覚で安易にO語尾を推測するのは禁物です。リストが短いので丸暗記すれば、母音ヒントがOを指すとき上記の候補を即試せます。黄色のOは多くの場合2〜3マス目(MONEY、PHONE、GHOST)です。スクラブルのOは1点タイル(袋に8枚)。MANGO(8点)は堅実なプレイで、Oの語尾知識そのものが推測を節約するこのページの本体です。",
    },
    p: {
      title: "P語 — 精密射撃の1手",
      starts:
        "Pは約3%の語頭を占めます(PAINT、PANDA、PAPER、PARTY、PASTA、PLACE、POINT、POWER、PRIDE、PRIZE)。PL-とPR-(PLAIN、PLANT、PRESS、PRICE)が主力で、PA-(PAPER、PASTA、PANDA)が支えます。Pは語中に再登場しにくいため、灰色のPは3ファミリーを一挙に消す精密道具です。そしてP語頭の主役はPIZZA「ピザ」:カタカナ語では見えないZの二重子音がP-I-Z-Z-Aに隠れており、黄色のPとZのヒントが揃った瞬間にPIZZAが浮かぶべき答えです。二重子音はカタカナの音からは想像できない——この原則を肌で覚える第一号として、日本語話者にPIZZAを推薦します。",
      ends:
        "Pで終わる答えは1%未満で、-AP/-IP/-OPの単音節形がかろうじて存在する程度です。つまり黄色のPは1〜3マス目(PAINT、PAPER、PUPIL)を高い確度で指し、5マス目への推測はE・Y・Tに投じるべきです。日本語話者への最大の贈り物がPIZZA(24点)です。「ピザ」という音からはZが2つ並ぶことを想像できませんが、綴りP-I-Z-Z-Aは答えリスト全体でも屈指の高得点語で、保存庫の1軍です。PROVE(10点)、PRIZE(16点)もPL-/PR-家族の両用プレイとして押さえておきましょう。",
    },
    q: {
      title: "UなしのQ語",
      starts:
        "QはWordle最希少の文字で、答えに含まれるのは1%未満です。しかも訓令式ローマ字にQが存在しないため、日本語話者にとって最も縁の薄い文字といえます。「クイーン(QUEEN)」「クイズ(QUIZ)」の「クイ」の正体はQUの2文字で、英語のQはほぼ例外なくUを従えます。語頭クラブはQUAKE、QUEEN、QUERY、QUICK、QUIET、QUOTA、QUOTEなどの小さな記憶リスト。緑のQが出たら次の一手は必ずUの確認で、Uが灰色ならUなしQ語狩り(競技スクラブルの知識ではQIが11点)という展開になります。上のライブリストがQ語頭の全候補です。",
      ends:
        "Qで終わるWordle答えは公式リスト全体でゼロです。Qに縁の薄い日本語話者ほど、この構造を利用してください:語頭の「クイ」はQUの2文字セットなので、黄色のQが指すのは実質1〜2マス目、現実には1マス目(QUERY、QUAKE、QUOTE)だけです。5マス目が未解決なら、あり得ないQを追わずE・Y・T・Rなどの高頻度語尾に推測を割ります。スクラブルのQは10点タイル(袋に1枚のみ)で最高値。QUERY(16点)、QUOTA(14点)は両ゲームを兼ねる逸品で、UなしQ語の豆知識(QI、QAT)はこのページの表題の由来でもあります。",
    },
    r: {
      title: "R語 — 主力の働き者",
      starts:
        "Rは約2%の語頭を占めます(RADIO、RAISE、RANCH、READY、REFER、ROBOT、ROUND、ROUTE、ROYAL)。「ラジオ(RADIO)」「ロボット(ROBOT)」「ルート(ROUTE)」など借用語も豊富で、RA-/RE-ファミリーが主力です。ここでもLとRの区別が鍵:日本語の「ら行」は必ず母音を伴いますが、英語のRは子音のまま連結します(BREAD、FIRST、OTHER)。Rは全体で3番目に多い文字なので語頭推測の網羅力は高いものの、黄色のRは語中を指すことが多い。初手CRANEがRを2マス目で試すのは、この消去力が理由です。",
      ends:
        "語尾のRは4番目に多く、答えの約7%です。日本語話者に最大級のヒント:カタカナ語の長音「アー」の正体は多くの場合ERです。「ペーパー(PAPER)」「リバー(RIVER)」「ウォーター(WATER)」「スーパー(SUPER)」「タワー(TOWER)」——末尾の「アー」をERに戻す訓練をすれば、語尾Rが一気に身につきます。-ARと-OR(SUGAR、VAPOR、FLOOR)が残りの担い手です。5マス目が緑のRでEのヒントなら-ERが確定し、探すのは先頭3文字だけ。スクラブルのRは1点タイル(袋に6枚)で、RIVER(8点)、WATER(7点)は安定の両用プレイ、REFER(8点)は二重Rの珍しい変化球です。",
    },
    s: {
      title: "S語 — 冒頭の王様",
      starts:
        "SはWordleの語頭王で、答えの10%以上がSで始まります(SALAD、SAUCE、SHAKE、SHARE、SHEEP、SHIFT、SLEEP、SMILE、SOLID、SOUND、SPACE、SPEAK、SPLIT、STAFF、START、STEAM、STONE、STORE、STORY、STUDY、SUPER)。SH-、SK-、SM-、SN-、SP-、ST-の連結が60を超えるファミリーを形成する巨大市場です。サ行のローマ字対応が素直で日本語話者にも発音の面で馴染みが深いものの、語頭Sの圧倒的な物量感は英語の統計として新たに刻むべき事実です。初手SLATEやSAUCEが定番なのは、この王座を1手で試すためです。",
      ends:
        "Wordle最大の罠がここにあります。Sは答えプールでも指折りの頻出文字なのに、語尾のSは1%未満しかありません。理由は答えリストが複数形を除外しているからです。日本語には単数・複数の形の区別がなく、英語学習で「名詞にはSを付ける」と教わった日本語話者ほど、つい語尾にSを置きたくなります。しかし複数形のSは答えにならず、毎日多くのプレイヤーがここで推測を浪費しています。正規のS語尾はほぼ単数名詞の借用語:CHAOS(カオス)、CIRCUS(サーカス)、FOCUS(フォーカス)、BONUS。黄色のSは圧倒的に1マス目を指します。スクラブルのSは1点タイル(袋に4枚)で、単語を延ばす名脇役です。",
    },
    t: {
      title: "T語 — 語尾の巨人",
      starts:
        "Tは約3%の語頭を占めます(TABLE、TEACH、THANK、THINK、THIRD、TIGER、TITLE、TOPIC、TOTAL、TRACK、TRAIN、TRUST、TWIST)。日本語話者はTH-連結に注意:「サンキュー(THANK YOU)」の「サ」、「シンク(THINK)」の「シ」の正体はTとHの2文字で、カタカナでは1音に潰れます。TH-家族(THERE、THESE、THING)がT語頭の主力で、TR-(TRACK、TRAIN、TRUST)が続きます。Tは全体で5番目に多い文字で網羅力は高いものの、本来の力は語尾にこそ宿ります。語頭のT推測は情報収集、語尾のT知識が勝負の決め手です。",
      ends:
        "Tは3番目に多い語尾で、答えの約8%です。日本語話者への重要事実:カタカナ語「ナイト(NIGHT)」「ライト(LIGHT)」の「〜イト」の正体は発音しないGHTの3文字で、GとHは音から復元できません。-IGHTは丸暗記すべき韻の集合体で、緑のGHTが1本決まれば5つの答え(BRIGHT、FIGHT、LIGHT、NIGHT、RIGHT)が同時に解けます。他の担い手は-NT(FRONT、PLANT、WANT)、-ST(GHOST、TOAST、WORST)、-RT(SMART、SPORT、START)。5マス目が緑のTなら残る母音候補はごくわずかです。スクラブルのTは1点タイル(袋に6枚)で、FIGHT(11点)、LIGHT(9点)は両ゲームで使える得点源です。",
    },
    u: {
      title: "U語 — 隠れた母音",
      starts:
        "Uは最も希少な母音語頭で、答えの1%未満しかUで始まりません(UNCLE、UNION、UNTIL、UPPER、URBAN、UPSET、USHER、UTTER)。Uは2〜3マス目に潜む隠れ母音です(BUILD、GUILT、HOUSE、MOUTH、SOUND、WOULD)。日本語話者はカタカナ語の「ク」に注意:「クイーン(QUEEN)」の「ク」はQ、「クール(COOL)」の「ク」はCで、カタカナでは同じ音に潰れます。英語ではQの後ろにUが必ず従うため、緑のQが出た瞬間にUは半自動的に確定します。ADIEUがUを4マス目に置くのは自然な配置で、Uのために初手を丸ごと使う必要はほぼありません。",
      ends:
        "Uで終わる答えは1%未満、実質ゼロです。ローマ字に親しんだ日本語話者ほど注意が必要です:「です(desu)」「ます(masu)」のように、ローマ字表記の語尾にはUが付きやすいのに、英語の5文字語がUで閉じるのは借用語しかありません。この排除事実を使いましょう:黄色のUが指すのは2〜4マス目、最多は3マス目(BUILD、GUILT、HOUSE、MOUTH)です。-UE形(DUE、VALUE、VENUE)は5マス目にEを置くため、Uはやはり語中に留まります。スクラブルのUは1点タイル(袋に4枚)ですが、QU語はQの10点に乗れます。QUERY(16点)とQUOTA(14点)が両用の主役です。",
    },
    v: {
      title: "V語 — 語中の専門家",
      starts:
        "Vは最希少級の文字で、答えの0.5%未満がVで始まります(VALID、VALUE、VIDEO、VIPER、VIRAL、VIRUS、VISIT、VIVID、VODKA)。日本語話者特有の注意点:日本語ではVとBが同じ「ば行」に潰れ、「ビデオ(VIDEO)」の「ビ」も「バナナ(BANANA)」の「バ」も同音に聞こえます。Wordleは綴りのゲームなので、VとBの混線だけは絶対に避けてください。VA-/VI-ファミリーが主力で、VIVIDは英語で唯一通用する二重V語の逸品。VALID、VALUE、VODKAはスクラブルでも高得点で、一目で覚える価値があります。緑のVは長打:上の小クラブに一気に絞り込めます。",
      ends:
        "Vで終わる答えはゼロです。英語の5文字語にV語尾は存在せず、スクラブルのV語尾語もほぼ外来語です。この構造的事実を消去に使いましょう:黄色のVが指すのは1〜4マス目、実際には1〜3マス目(VIDEO、GIVEN、RIVAL、COVER、OLIVE)だけです。Vの最生産的なパターンは-IVEファミリー(ALIVE、DRIVE、GIVE、OLIVE)で、Vを4マス目に据えます。「ドライブ(DRIVE)」の「ブ」の直前にVとEが並ぶ構造です。スクラブルのVは4点タイル(袋に2枚)で、VIVID(13点)とVODKA(13点)は保存庫入りのおすすめ答えです。",
    },
    w: {
      title: "W語とWHパターン",
      starts:
        "Wは約3%の語頭を占めます(WAGON、WATER、WHOLE、WORLD、WORTH、WRITE、WRONG、WROTE)。日本語話者への注意点は2つ。第一にWH-連結:「ホワイト(WHITE)」「ホイール(WHEEL)」はWが1音に化けますが、綴りはW+Hの2文字です。第二にWR-の沈黙W:「リスト(WRIST)」「ライト(WRITE)」の先頭Wは発音されず、KN-と並ぶ英語の無音文字家族です。W語頭はWH-(WHERE、WHICH、WHILE)とWR-(WRIST、WRONG、WROTE)の2大勢力で、灰色のWは両ファミリーを一挙に消す隠れた優良手。WRONGは1手で3つの子音を試せる重装備の推測です。",
      ends:
        "語尾のWは約2%で、ほぼ-OWの二重母音に独占されます:BELOW、ELBOW、THROW、ALLOW、ARROW。日本語話者への決定的ヒント:カタカナ語の長音「オー」の正体は多くの場合OWです。「スロー(THROW)」「アロー(ARROW)」「エルボー(ELBOW)」の「オー」をOと書きたくなるところですが、綴りの5マス目はWです。候補が短いので丸暗記すれば、5マス目が緑のWでOのヒントがあった瞬間に-OWが確定し、探すのは先頭2〜3文字だけ。スクラブルのWは4点タイル(袋に2枚)で、THROW(11点)、ELBOW(10点)は強力、ARROW(8点)は3母音を含む変化球です。",
    },
    x: {
      title: "X語 — 消去の鍵",
      starts:
        "Xで始まるWordle答えは全体でゼロです。英語のX語頭(XYLEMなど)は音訳語で答えリストに入らず、Xは純粋な語中文字です。日本語話者への嬉しい知識:カタカナ語の「ックス」の正体はたった1文字のXです。「インデックス(INDEX)」「リラックス(RELAX)」——KSとは書かずX一文字で済ませる英語の綴り文化は、復元の最大の味方です。黄色のXが指すのは3〜5マス目(TOXIC、HELIX、INDEX、MAXIM、RELAX)。灰色のXが出れば-AX、-EX、-IX、-OXファミリーが一斉に消えるため、終盤の消去力は最高級。-EXと-AX(INDEX、RELAX、HELIX)がXの本拠地です。",
      ends:
        "Xで終わる答えは0.5%未満のわずかな-AX/-EX家族で、事実上RELAX一択と考えて差し支えありません。「リラックス(RELAX)」の「ックス」が語尾に来るこの形は、5マス目が緑のXで母音のヒントがあればRELAXが圧倒的本命です。逆にXが灰色なら-AX/-EX狩りがその場で終了し、1手で消去を完結できる後半戦の切り札になります。スクラブルのXは8点タイル(袋に1枚、Jと並ぶ最希少級)で、RELAX(12点)、TOXIC(14点)は高得点の両用プレイ。中でもHELIX(17点)はXを含むWordle答えの最高峰で、保存庫の最上段に置くべき1語です。",
    },
    y: {
      title: "Y語 — 語尾の奇兵",
      starts:
        "Yは答えの0.25%未満で語頭に立たない極稀文字です(YACHT、YEAST、YIELD、YOUNG、YOUTH)。「ヨット(YACHT)」は素直でも、「イースト(YEAST)」はYが語頭なのに「イ」に化けており、日本語話者はY語頭の存在を見落としがちです。1マス目が緑のYなら上記5語のミニクラブがほぼ確定。Yの実際の主戦場は2つ:語尾の子音的Y(HAPPY、FUNNY、HEAVY)と語中の母音的Y(MYTH、RHYME、LYMPH、CRYPT、LYNX)。この二面性がYの罠で、黄色のYが語尾子音か語中母音かを見極めるのは、連勝プレイヤーとそうでない人の分水嶺です。",
      ends:
        "Yは2番目に多い語尾で、答えの約9%です。日本語話者はここを得意にできます:カタカナ語の長音「ー」の正体が往々にしてYだからです。「ハッピー(HAPPY)」「パーティー(PARTY)」「ラッキー(LUCKY)」「ファジー(FUZZY)」——末尾の「ピー」「ティー」「キー」を子音+Yに戻す訓練がそのまま実力になります。ファミリーは-LY、-NY、-RY、-TY(ANGRY、DAILY、EARLY、EMPTY、HEAVY、SORRY)。Y語尾+子音1つで単語が完成するため、子音ペア単位の反復が最速の道です。スクラブルのYは4点タイル(袋に2枚)で、FUZZY(29点)、DIZZY(27点)は答えプール全体でも屈指の化け物級です。",
    },
    z: {
      title: "Z語 — 終盤の消去札",
      starts:
        "ZはJやQと並ぶ最希少級の文字で、答えに含まれる語はごく僅かです。語頭はZEBRA、ZESTYなどがほぼ一択で、1マス目が緑のZならZEBRAが圧倒的本命、パズルはほぼ解けたも同然です。日本語話者はZの二重子音に要注意:「ピザ(PIZZA)」の音からはZが2つ並ぶことを想像できませんが、綴りP-I-Z-Z-AにはZZが隠れています。黄色のZに母音のヒントが伴えば、ZZファミリー(PIZZA、FUZZY、DIZZY)の接近警報です。初手でZが試されることはないため、中盤に1手を投じる長打狙いで、候補は一気に個位数まで沈みます。",
      ends:
        "Zで終わる答えはほぼゼロです。英語の5文字Z語尾は存在せず、BLITZ(ブリッツ)のような借用語も答えリストの外です。よって黄色のZが指すのは語中の3〜4マス目、とくにZZ(PIZZA、FUZZY、DIZZY)です。ZZファミリーは丸暗記すべき研究対象で、PIZZA(24点)、FUZZY(29点)、DIZZY(27点)は共通答えの中で最高得点の3枚。スクラブルのZはQと並ぶ10点タイル(袋に1枚)です。「ブリッツ」の「ッ」がTZであるように、促音からの復元力は両ゲームの得点力を上げます。灰色のZが出ればZZクラブと-ZE語尾が全部消える、終盤の最終兵器です。",
    },
  },
};
