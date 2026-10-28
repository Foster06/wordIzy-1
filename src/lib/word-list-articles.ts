// src/lib/word-list-articles.ts
//
// Per-language educational article content for programmatic word-list pages
// (/words-starts-with-{letter}, /words-ends-with-{letter},
// /wordle-words-starts/ends-with-{letter}, /unscramble-N-letter-words).
//
// PURPOSE: Google's AdSense "quality content" criterion rewards pages with
// 300-400 words of original, expert educational text over "thin tool" pages.
// Each letter below carries GENUINELY UNIQUE strategic prose — not a template
// with the letter swapped — covering strategy, tile economics, and the
// high-scoring plays that letter enables in real games.
//
// ARCHITECTURE: This module is pure data (no server imports) so the client
// component can import it directly. The <WordListArticle /> component
// composes a full article from:
//   1. the per-language framing templates below (lead/tile/closing),
//   2. the per-letter unique prose (letters[X].starts / .ends),
//   3. LIVE facts interpolated at render time — the letter's actual tile
//      value + tile count from LANGUAGES[lang], the page's real word total,
//      and the top-scoring words fetched from the live dictionary.
// Placeholders: {letter} {Letter} {score} {count} {total}
//
// i18n NOTE: Non-English content is NOT a literal translation of the English
// text. Each language's prose reflects that language's own Scrabble ecosystem —
// different tile values (French Q = 8, Spanish Q = 5, Italian Q = 5...),
// different spelling conventions (French QU- requirement, Spanish QU-),
// and different high-value word families.

import type { LanguageCode } from "@/lib/languages";

export interface LetterProse {
  /** Unique strategic angle used in the article title, e.g. "Q Words Without U". */
  title: string;
  /** Unique prose for the /words-starts-with-{letter} page (~80-110 words). */
  starts: string;
  /** Unique prose for the /words-ends-with-{letter} page (~80-110 words). */
  ends: string;
}

export interface LangArticleContent {
  /** Article title template. {angle} is replaced by the letter's unique title. */
  titleTemplate: string;
  /** Lead paragraph for starts pages. Placeholders: {letter} {total}. */
  startsLead: string;
  /** Lead paragraph for ends pages. Placeholders: {letter} {total}. */
  endsLead: string;
  /** Tile-economics paragraph. Placeholders: {Letter} {letter} {score} {count}. */
  tileTemplate: string;
  /** Heading of the live top-words section. */
  topWordsHeading: string;
  /** Lead-in sentence before the live word list. */
  topWordsLead: string;
  /** Closing paragraph. Placeholder: {letter}. */
  closing: string;
  /** Wordle overlay paragraph (rendered only on dict === "wordle" pages). */
  wordleNote: string;
  /** Length-page article template. Placeholders: {n} {total} {laneNote}. */
  lengthsLead: string;
  /** Per-length prose for /unscramble-N-letter-words pages, keyed "2".."15". */
  lengths: Record<string, string>;
  /** Per-letter unique prose, keyed "a" through "z". */
  letters: Record<string, LetterProse>;
}

// ─────────────────────────────────────────────────────────────────────────────
// ENGLISH — the flagship content (primary AdSense market)
// ─────────────────────────────────────────────────────────────────────────────
const EN: LangArticleContent = {
  titleTemplate: "How to Win Scrabble Games Using {angle}",
  startsLead:
    "Scrabble is won by players who treat every letter as a strategic asset, not just a point value. This expert guide to words starting with {letter} covers when to hold the tile, when to burn it, and which {letter}-openers turn a dead rack into a 50-point bingo. The official tournament dictionary holds {total} valid words beginning with {letter} — here is how to exploit them.",
  endsLead:
    "Word endings decide where your rack can settle on the board — and words ending in {letter} have specific hooking and lane-blocking properties every competitive player should know. This guide covers the {total} valid dictionary words ending in {letter}, the suffix families that generate them, and the defensive plays that make {letter}-final words so hard for opponents to extend.",
  tileTemplate:
    "Tile economics: the {Letter} tile is worth {score} point{plural} in English Scrabble, and only {count} {tileWord} in the bag — a scarcity that directly shapes when you should play it. Landing {Letter} on a double-letter square multiplies that to {double} points per placement; a triple-letter square pays {triple}. A single well-positioned {Letter} play can swing a close game by 30 points or more, which is why expert players count tiles and plan {Letter} deployment two or three turns ahead.",
  topWordsHeading: "Highest-Scoring {Letter} Words",
  topWordsLead:
    "These are the top point-scorers from the official dictionary, live from our word database — study them because they win games:",
  closing:
    "The difference between a casual player and a tournament regular is rarely vocabulary size — it is knowing which {letter} words exist, what they score, and when the tile is worth more on your rack than on the board. Bookmark this page, drill the top words above, and the {letter} tile becomes a weapon instead of a liability.",
  wordleNote:
    "Playing Wordle instead of Scrabble? The strategy shifts from tile values to letter frequency and position. In Wordle, opening with vowel-rich guesses and using {letter}-words early helps you eliminate candidates fast — the live list above is filtered to valid Wordle answers, so every word is a playable guess.",
  lengthsLead:
    "Word length changes the entire geometry of a Scrabble board: {n}-letter words fit {laneNote}, and knowing the full {n}-letter arsenal — {total} valid words in the official dictionary — lets you find the one play that threads between blocked lanes. This guide covers the highest-scoring {n}-letter words, the bingo bonus (playing all 7 tiles at once scores +50), and when a shorter word scores more than a longer one.",
  letters: {
    a: {
      title: "A Words to Anchor Your Rack",
      starts:
        "A is the most common word-initial letter in English and your cheapest vowel — nine A tiles circulate in every game, which is why A-openers appear in virtually every rack you will hold. A-words are the backbone of bingo construction: the -ATION, -ABLE, and -AGE families all begin with A and convert cluttered racks into 50-point bonuses. Burn duplicate A tiles early through the two-letter escapes AA, AB, AD, AG, AH, AI, AN, AR, AS, and AT — each keeps your vowel ratio balanced while stealing position on premium squares. ADAPTIVE, ADVANTAGE, and AXIOMATIC are the A-bingos that win endgames.",
      ends:
        "Words ending in A are vowel-locked, which gives them a hidden defensive value: opponents struggle to back-hook them because few English words accept a trailing A. Loan endings like -A (AGENDA, ARENA, SONATA), -IA (INERTIA, MANIA), and -OLA (VIOLA, PIANOLA) settle onto triple lanes where they quietly block extensions. Park -A-final words near premium squares and watch opponents waste turns hunting for hooks that rarely exist. The -TA family (CANTATA, SONATA) and musical -A endings round out a genuinely international ending set, one that tournament players exploit for unhookeable endgame blocks.",
    },
    b: {
      title: "B Words for Bingo Fuel",
      starts:
        "B is a modest 3-point tile that punches far above its weight in bingo construction — the BE- family (BEWARE, BEDECK, BEDAZZLE) extends words already on the board for easy 20-point swings, and B-words anchor the high-value -ABLE suffix builds. With only two B tiles in circulation, timing matters: hold B for a double-letter-square landing where 3 points double to 6 across a long word, or burn it early to keep your rack flexible. BINGO itself starts with B — fitting, since B-words fill the racks that earn the 50-point all-tiles bonus.",
      ends:
        "The silent-B endings hide in plain sight: CRUMB, CLIMB, COMB, THUMB, and DISTURB all end in an unvoiced B, which means opponents systematically forget they exist when hunting for hooks. The -UMB family settles beautifully after a U draw, and the reliable ending families are -UMB, -MB after vowels, and -B after M. Front hooks are the play: extend CRUMB with a front-hook, bank the score, and the unhookeable trailing B locks the lane behind you for the rest of the game.",
    },
    c: {
      title: "C Words and the CH- Power Family",
      starts:
        "C is a 3-point chameleon that produces two totally different sound families: the hard /k/ in CA- words (CACTUS, CAMERA, CALCULATE) and the soft /s/ in CI- words before E, I, or Y (CINDER, CIRCUS, CYCLE). The real money is in the CH- blends — CHAMP, CHISEL, and CHINTZ (25 base points) place C and H together across premium squares. Two C tiles only, so burn them on double-letter squares where the blend doubles: CH- across a pink square scores the C at 6 and the H at 8 simultaneously.",
      ends:
        "Words ending in C are rare, and their unhookeable shape gives them surprising lane-blocking value: MIMIC, ARCTIC, MUSIC, and FANTASTIC cannot be extended after the C in most cases, so opponents have to play around them. The -IC suffix is the real engine — it converts almost any noun into a high-scoring adjective (HERO→HEROIC, POET→POETIC, ATOM→ATOMIC) for a cheap 2-letter extension. Study the -IC family and every noun on the board becomes a potential extension target.",
    },
    d: {
      title: "D Words and the -ED Suffix Engine",
      starts:
        "D is a 2-point tile that powers the most reliable scoring engine in Scrabble: the -ED suffix converts almost any verb on the board into a D-extended play worth 1 extra letter of points plus board-position value. D-words starting with DE- and DI- (DEVOTE, DIVERT, DIALOGUE) are bingo-rich because those prefixes accept nearly any root. Four D tiles circulate, so you will see them often — the expert habit is to hold one D for the inevitable -ED opportunity rather than dumping it early.",
      ends:
        "Words ending in D are the past-tense engine of the game: -ED adds to almost any verb (JUMP→JUMPED, SCORE→SCORED, BLOCK→BLOCKED) for instant extensions. The -RD, -LD, and -ND families (HERD, WORLD, LAND) settle into triple-word lanes where their unhookeable shape locks the board. A word ending in D is almost always a completed verb — which means opponents cannot re-extend it without a front hook, making D-final words ideal defensive blocks when you are ahead on points.",
    },
    e: {
      title: "E Words — the Workhorse Vowel",
      starts:
        "E is the most common letter in the English language — twelve tiles in the bag, 1 point each — and the single most important tile for bingo construction. EX-, EN-, and EM- openings (EXAMPLE, ENERGY, EMPATHY) build naturally from almost any rack, and the silent-E endings (covered on the ends page) make E the most-hooked letter on the board. E-openers also feed the EX- prefix family, where X's 8 points ride along for free: EXAM, EXACT, EXALT all place the X on premium squares without spending a turn positioning it.",
      ends:
        "Silent-E endings (TABLE, HOUSE, TIME) are the most common word shape in English, which makes words ending in E the single largest hooking surface in the game: add R to make -ER comparatives, D to make -ED past tenses, or R+ to build -ERS agents. The -CE family (VOICE, JUSTICE), -GE (LARGE, CHANGE), and -TE (STATE, COMPLETE) all end in unhookeable E-combos that lock lanes defensively. If you are ahead and want to close the board, E-final words are your best friend — opponents have to burn turns hunting extensions you already know do not exist.",
    },
    f: {
      title: "F Words for Parallel-Play Value",
      starts:
        "F is a 4-point tile with exceptional parallel-play geometry: FA- and FO- openings (FABLE, FOCUS, FRAME) place F directly on double-letter squares for an 8-point swing per placement, and the FL-, FR- blends extend into high-probability word families. Only two F tiles circulate, so deployment timing matters — an F burned early on a cheap play is an F missing when the parallel opportunity appears three turns later. FOR, FAR, and FUN are the workhorse 3-letter anchors that steal position while keeping F-potential alive.",
      ends:
        "-F endings are scarce — BEEF, LEAF, REEF, SCARF, and TURF are the core families — which makes them defensively excellent: opponents rarely hold the right front hook to extend them, and the F cannot be back-hooked without a vowel-ending word. The -IFF family (MOTIF, BAILIFF, CALIF) hides in longer words where the F rides a double square. When you play an F-final word near a triple-word lane, you are not just scoring points — you are planting an anchor opponents have to build around.",
    },
    g: {
      title: "G Words and the -ING Engine",
      starts:
        "G is the tile that powers the -ING engine — the single most productive suffix in Scrabble. Every verb on the board becomes a G-extension: PLAY→PLAYING, SCORE→SCORING, WIN→WINNING, each worth the base word's points plus the new tiles' positions. G-words like GEM, GRIP, and GLIDE are efficient rack-clearers, and the GE- family (GEOMETRY, GENERATE) feeds bingos. Three G tiles circulate, so a G held for the right -ING moment is worth far more than a G dumped early for 2 points.",
      ends:
        "-NG endings (RING, SONG, STRONG) are the most stable lane-blockers in the game — they cannot be back-hooked, only front-hooked, which makes G-final words perfect defensive plays when you are protecting a lead. The -LOGICAL family (BIOLOGICAL, ZOOLOGICAL) and -GENOUS (INDIGENOUS) hide 8+ point G placements inside longer bingo shapes. Study the -ING drop: sometimes playing the base verb without -G keeps your rack flexible for a bigger play next turn.",
    },
    h: {
      title: "H Words and the 4-Point Blend Power",
      starts:
        "H is a 4-point tile whose real value lives in blends: CH-, SH-, TH-, and WH- families place H on premium squares as part of natural words (CHAMPION, SHADOW, THUNDER, WHISPER) instead of forced plays. HA- and HE- openings (HABIT, HELPER, HEIGHT) are efficient H-dumps that keep your rack balanced. Two H tiles only — the expert pattern is to hold H until a blend opportunity appears on the board, because 4 points riding a double-letter square is 8 points per placement.",
      ends:
        "Words ending in H (MATCH, GRAPH, FLASH, ESTABLISH) are lane-lockers: the H is almost impossible to back-hook, so opponents must front-hook or play around them entirely. The -PH family (SERAPH, the PH inside PHOTOGRAPH) hides high-value blends that score 4+4 on adjacent squares. When you close a lane with an H-final word on a triple-word square, you are scoring points AND removing real estate from the opponent's next three turns.",
    },
    i: {
      title: "I Words — the Bingo Trifecta Feed",
      starts:
        "I is the second-most-common vowel — nine tiles, 1 point each — and the feed stock for the bingo trifecta: -ION, -ING, and -IC are the three most productive suffixes in English, and all three require an I. IN- openings (INDEX, INPUT, INSIDE) are natural rack-clearers, and the IM- family (IMAGE, IMPACT, IMPORT) converts cluttered racks into 20-point plays. Vowel balance is the first law of Scrabble strategy, and I is the vowel you will juggle most: hold two for bingo attempts, dump the third through an IN- or IS- escape.",
      ends:
        "Words ending in I are loan-word territory (ALIBI, HINDI, SUSHI, TAXI, KIWI) — their foreign origin means English rarely extends them, making I-final words some of the strongest defensive blocks in the game. Few opponents carry the -I back-hook vocabulary, so an I-final word near a premium square tends to stay put. The list is short but concentrated: every word on the ends-with-I page is a legitimate dictionary play that catches unprepared opponents off guard.",
    },
    j: {
      title: "J Words — the 8-Point Jackpot Tile",
      starts:
        "J is the jackpot tile — 8 points, one tile in the bag, and a disproportionate share of game-winning plays. JAZZ alone is worth 29 base points (J=8, A=1, Z=10, Z=10), JINX scores 17, and JACKPOT converts the J into a triple-lane threat. The two-letter escapes JO, JA, and JEE rescue a stranded J when the U-word possibilities dry up. The single-tile scarcity means every J played is 8 points the opponent can never match — land J on a triple-letter square and that single tile pays 24.",
      ends:
        "Words ending in J are essentially nonexistent in the English tournament dictionary — the only valid entries are the RAJ family (British India's rule), HADJ/HAJJ (the Islamic pilgrimage), and their variants. This makes the ends-with-J page the shortest list on the site, but the scarcity is the strategy: if you can dump a final J legally while an opponent still holds theirs, you have stolen 8 points of potential from their rack. Challenge opponents who invent J-final words — the dictionary is on your side.",
    },
    k: {
      title: "K Words — the 5-Point Scarcity Play",
      starts:
        "K is a 5-point tile with deceptive parallel power — KERNEL, KIOSK, and KNOCKOUT all place K on double-letter squares for 10-point swings, and the two-letter escapes KA and KO rescue stranded tiles. Only one K circulates in the entire game, so its deployment is a genuine strategic decision: a K burned on a cheap front-hook play is gone forever, and the opponent's K-parallel opportunities (BOOK, THINK, WALK setups) will be yours to block or exploit. KADDISH and KAYAK hide double-K placements worth 10+10 on adjacent squares.",
      ends:
        "Words ending in K are monosyllabic workhorses — BOOK, THINK, WALK, TASK, and NETWORK — and their short, unhookeable shape makes them ideal parallel plays: lay WALK alongside an existing A-word and the K doubles your score through the lane. The -OOK, -ACK, and -ICK families (BOOK, BACK, QUICK) are the highest-frequency K-endings, and each hides the 5-point K on a square opponents routinely undervalue. A well-timed K-final parallel is often worth more than a longer word on a blocked board.",
    },
    l: {
      title: "L Words — the Glue Tile",
      starts:
        "L is the glue tile — 1 point, four in the bag, and the connective tissue of the highest-value suffixes in Scrabble: -ABLE (PORTABLE), -AL (LEGAL), and -LY (QUICKLY) all require L to function. LA-, LE-, LI-, LO-, and LU- openings (LABEL, LEMON, LIMIT, LOTUS, LUCID) are the most flexible rack-clearing family in the game because they accept almost any second consonant. L is never exciting, but the player who respects L's role in bingo construction finds 50-point plays where others see a cluttered rack.",
      ends:
        "-AL endings are the adjective engine (LEGAL, FORMAL, GLOBAL, NATURAL): almost any noun converts to an -AL word for a 2-letter extension, making the ends-with-L page one of the best hooking surfaces in the game. The -EL (LABEL, NOVEL), -IL (CIVIL), -OL (IDOL), and -UL (CONSUL) families round out the vowel-L endings. L-final words also extend beautifully: -AL converts to -ALLY (FINALLY, ORIGINALLY) and -ITY (LEGALITY) for quick 2-letter follow-ups that score again on the same premium squares.",
    },
    m: {
      title: "M Words — the 3-Point Blend Builder",
      starts:
        "M is a 3-point blend builder whose real value comes from the MM and MB families — COMMUTE, HAMMER, and COMBINE all place M on adjacent squares where double-letter bonuses stack. ME-, MA-, and MI- openings (MEANWHILE, MAGIC, MINUTE) are the classic M-dumps that keep a rack bingo-ready. Two M tiles circulate, so a well-timed M-parallel play (laying MIRTH alongside an existing I-word) can double the tile's effective value. The -ISM suffix also starts with M-potential: every adjective in your rack is one M away from becoming REALISM or OPTIMISM.",
      ends:
        "Words ending in M are scarce — ITEM, MAXIM, MADAM, VENOM, and WISDOM are the core families — and their unhookeable shape makes them excellent defensive blocks: opponents rarely carry the -M front-hook vocabulary to extend them. The -ISM suffix (REALISM, OPTIMISM, MATERIALISM) converts adjectives into nouns for cheap extensions that also score the M on premium squares. When the board is closing and you need to protect a lead, M-final words are among the safest plays in the dictionary.",
    },
    n: {
      title: "N Words — the -TION Anchor",
      starts:
        "N is the anchor tile for the -TION family — the single most productive suffix in English Scrabble — and every N in your rack is a potential NATION, ACTION, or EXTENSION waiting for the right board state. NA- and NE- openings (NATIVE, NERVE, NEUTRAL) are efficient N-dumps, and the negative prefixes NON- and NE- extend existing words for cheap front-hook points. Six N tiles circulate, so N-management is less about scarcity and more about timing: hold one N for the -TION moment, dump the rest early.",
      ends:
        "Words ending in N come from the -TION/-SION families and the -AN, -EN, -IN, -ON endings that dominate English word-final consonants. EATEN, GIVEN, and COMMON are the workhorse examples, and their back-hookeable shape makes ends-with-N one of the most extensible pages on the site — add S for plurals (NATIONS), or front-hook with RE- for instant extensions. The defensive play is -TION words: their front-hook-only shape means opponents have limited options once you plant one on a premium square.",
    },
    o: {
      title: "O Words — the Vowel Parallel Anchor",
      starts:
        "O is the second-most-common vowel — eight tiles, 1 point each — and the parallel-play anchor for consonant-heavy boards. OBJECT, OCEAN, and OPINION feed vowel-balanced bingos, and OX (9 points — O=1, X=8!) is the single most profitable 2-letter play in the game when X lands on a premium square. OH and OP are the other O-escapes. The OO openings (OOCYTE, OOLITE) also pay double on adjacent squares when both O tiles ride premium positions.",
      ends:
        "-O endings are loan-word signatures — PIANO, SOLO, TACO, KILO, PHOTO, and HALO all arrived from other languages, and their foreign origin means English rarely extends them: perfect defensive blocks. The -IO family (RADIO, PATIO, FOLIO) and the doubled-O words (ZOO — a rare 2-letter -O ending) round out a list that is short enough to memorize and strange enough to catch opponents off guard. When you need a lane-locker that opponents cannot front-hook, an O-final word is often the answer.",
    },
    p: {
      title: "P Words and the PH- Family",
      starts:
        "P is a 3-point tile that shines in the PH- family — PHOTOGRAPH, PHILOSOPHY, and PHARMACY place the P (3 points) adjacent to an H (4 points) for 7-point blends on double squares. PI-, PE-, and PO- openings (PIANO, PERSON, POTENTIAL) are flexible rack-clearers. Two P tiles circulate, so timing matters: hold P for a PH- blend opportunity or a double-letter square landing, and burn the duplicate through PL-, PR-, or PU- family words that steal board position cheaply.",
      ends:
        "-P endings (CAMP, HELP, SHARP, SHOP, STOP) are monosyllabic workhorses — short, unhookeable, and perfect for parallel plays where the 3-point P rides a double square. The -SHIP suffix (FRIENDSHIP, LEADERSHIP) converts nouns into extensions that also score P on premium positions, and the -OPE and -APE families (HOPE, TAPE) settle into vowel-rich lanes. P-final words are the quiet workhorses of defensive Scrabble — they score modestly but lock lanes with surgical precision.",
    },
    q: {
      title: "Q Words Without U",
      starts:
        "Q is THE strategic tile — 10 points, one tile in the bag, and the source of the most feared rack situation in Scrabble: holding Q with no U. The solution is the Q-without-U vocabulary, and it is worth real points: QI (the Chinese life-force concept) scores 11 on a double-letter square and 22 on a triple, all without a single U. QAT (a Middle Eastern shrub), QOPH (a Hebrew letter), QANAT (an irrigation channel), QINDAR (Albanian currency), and QANAT-style variants let you deploy Q when the U-count is exhausted. Master this list and the tile your opponents dread becomes your most profitable weapon — QAT alone appears in tournament games constantly because 10 points ride a single tile.",
      ends:
        "Words ending in Q are the rarest plays in English Scrabble — TRANQ (the abbreviated form of tranquilizer), SUQ (a Middle Eastern marketplace), UMIAQ (an Inuit open boat), and FAQ are the core list. Each is a scarcity escape: if you hold Q late-game with no U in sight, these are your legal exits, and their unhookeable shape means the 10-point Q rides the final square of the word for maximum positional value. The ends-with-Q page is short but strategically dense — every entry is a tournament-legal play that turns a stranded Q into points.",
    },
    r: {
      title: "R Words — the Most Hookable Consonant",
      starts:
        "R is the most hookable consonant in English — RE- is the most common prefix in the language (REMAKE, REDO, RETURN), which means every word on the board is a potential R-extension. R-words like RIVER, ROYAL, and RHYTHM are natural rack-clearers, and six R tiles circulate, so R-opportunities appear in virtually every rack you will hold. The -ER/-OR agent-noun endings also extend base words for cheap 1-letter additions: TEACHER, ACTOR, and the -RY family (MEMORY, CENTURY) are always available hook targets.",
      ends:
        "Words ending in R are the comparative and agent-noun engines: BIGGER, FASTER, and TEACHER all come from adding R to base words, making ends-with-R one of the most extensible hooking surfaces in the game. The -ER/-OR suffixes convert almost any verb or adjective for a 1-2 letter extension, and comparative forms (BIGGER, SMALLER) score double on R-heavy boards. When the board is open and you need a reliable hook target, R-final words are the most productive surface in the dictionary.",
    },
    s: {
      title: "S Words — the Hook Master Tile",
      starts:
        "S is THE hook tile of Scrabble — add S to almost any word on the board for a one-letter extension that scores the full word's points plus the S's position. SUPER-, SUB-, and SE- families also begin with S, and with four S tiles circulating, the S-parity game (tracking who holds more S tiles) decides close matches. S-words themselves — SCORE, SOLVE, SCRAMBLE — are workhorse openers, but the real strategic value is holding S for the hook opportunity rather than playing it early as a normal word.",
      ends:
        "Words ending in S are the plural engine of English — every noun becomes an -S extension, making ends-with-S the longest page on this site by a wide margin. The -OUS (FAMOUS, DANGEROUS), -IOUS (CURIOUS, PREVIOUS), and -LESS (HOPELESS, USELESS) suffixes all end in S, and each family converts base adjectives into extensions. The defensive play is watching S-count: if you know the opponent holds S and you play a plural-able noun near a premium square, you are handing them a 20-point hook.",
    },
    t: {
      title: "T Words — the Suffix Anchor",
      starts:
        "T is the anchor tile for the -TION and -TURE families — NATION, FUTURE, and every -MENT word (JUDGMENT, MOMENT, PAYMENT) depend on T's position. TA- and TE- openings (TABLE, TELEVISION, TOMORROW) are natural rack-clearers, and six T tiles circulate so T-management is about timing, not scarcity. T-words also hide the TH- blend (THUNDER, THINK) where 1-point T rides adjacent to 4-point H for combined premium-square value.",
      ends:
        "-T endings come from the superlative family (-EST: BIGGEST, SMALLEST, FASTEST), past-tense forms (-PT: SLEPT, KEPT), and the -ANT/-ENT suffixes (IMPORTANT, DIFFERENT). Words ending in T are among the most hookable in the game — T back-hooks to S for plurals and past tenses, and the -EST superlatives front-hook beautifully — making ends-with-T one of the best extension surfaces on the board. When you need a word opponents can extend (to bait their tiles out), a T-final play is the classic trap.",
    },
    u: {
      title: "U Words — Q's Mandatory Partner",
      starts:
        "U is the tile that unlocks Q — QUIT, QUEEN, QUICK, and every QU- word requires the pairing, which makes U a strategic hold tile when you know Q is still circulating. U-words like UMBRELLA, UNIFORM, and UNITE also feed the UN- negative prefix family for cheap extensions. Four U tiles circulate (the scarcest vowel after I's nine), so U-management matters: hold one for Q-support, dump the rest through UP, US, and UT escapes.",
      ends:
        "Words ending in U are rare — YOU, TUTU, GURU, MENU, and THOU are the core list — which is exactly the strategic point. Their unhookeable shape makes U-final words excellent defensive blocks, and opponents who do not know the list will hesitate to challenge or extend them. When you are protecting a lead and need a word opponents cannot build on, a U-final play on a premium square locks the lane for the rest of the game.",
    },
    v: {
      title: "V Words — the 4-Point Scarcity Value",
      starts:
        "V is a 4-point tile with real parallel-play potential — VACATION, VICTORY, and VIVID place V on double-letter squares for 8-point swings, and the -IVE suffix family (ACTIVE, CREATIVE) extends base words for cheap points. Two V tiles circulate, so V-timing matters: hold V for a premium-square landing rather than dumping it early. VETERAN, VIOLET, and VOYAGE are the classic V-openers that clear racks while preserving the tile's positional value.",
      ends:
        "Words ending in V are essentially nonexistent in the official tournament dictionary — there are no valid -V final words in English Scrabble. This makes the ends-with-V page a study curiosity rather than a practical arsenal: its value is in challenging opponents who invent V-final plays and in understanding why V is a pure front-hook tile. If an opponent plays a word ending in V, challenge it — the dictionary is unambiguously on your side.",
    },
    w: {
      title: "W Words — the -WARD and -WISE Families",
      starts:
        "W is a 4-point tile that anchors the -WARD (FORWARD, BACKWARD, UPWARD) and -WISE (OTHERWISE, CLOCKWISE) suffix families — each converts base words into extensions that also score W on premium squares. WA- and WE- openings (WATER, WESTERN, WINDOW) are natural rack-clearers, and two W tiles circulate so deployment timing matters. W-words also hide WH- blends (WHISPER, WHOLE) where W rides adjacent to 4-point H for combined premium value.",
      ends:
        "Words ending in W are monosyllabic lane-lockers — FLOW, GLOW, CREW, BOW, and HOW all end in an unhookeable W that opponents cannot extend without a front-hook. The -OW family (WINDOW, SHADOW, YELLOW, MEADOW) is the largest W-ending group, and the W-final shape is reliably defensive because English almost never extends after a word-final W. When you need to close a lane and protect a lead, W-final words are among the strongest blocks in the game.",
    },
    x: {
      title: "X Words — the Two-Letter Goldmine",
      starts:
        "X is the two-letter goldmine of Scrabble: AX, EX, OX, XI, and XU are all valid plays worth 9+ points each (X=8, plus the adjacent vowel), and they let you deploy the 8-point X with surgical efficiency even on crowded boards. X-words like XYLOPHONE and XENON also exist, but the real tournament value is the two-letter family: land X on a triple-letter square through OX or EX and that single tile pays 24 points. One X circulates — the player who deploys it best wins the tile-advantage battle that decides close games.",
      ends:
        "Words ending in X are 8-point parallel gold — BOX, FIX, SIX, and MIX all place the X on the final square of the word, which is exactly where double- and triple-letter bonuses cluster on crowded boards. The -IX and -OX families (ONYX, HELIX, PHOENIX, MATRIX) hide bingo potential where the X rides a premium square inside a longer word. An X-final parallel play alongside an existing word often scores 30+ points from a single tile — study this page and the X becomes your best trading asset.",
    },
    y: {
      title: "Y Words — the Flexible Semi-Vowel",
      starts:
        "Y is the flexible semi-vowel — 4 points when played as a consonant at word-start (YELLOW, YOGA, YOUNG), and simultaneously the vowel that rescues A/E/I/O/U-poor racks inside words like MYTH and RHYTHM (both famously vowel-free). Y-words bridge the gap between vowel management and consonant scoring, and the -LY adverb family (QUICKLY, SLOWLY) makes Y the most-deployed suffix tile in endgame positions. Two Y tiles circulate, so Y-timing matters: hold one for the -LY moment, burn the other through an early YA- or YE- opener.",
      ends:
        "-Y endings dominate English word-final shapes: -LY (QUICKLY), -NY (TINY), -TY (CITY, SAFETY), and -SY (DAISY) all funnel into the ends-with-Y page, making it one of the longest and most extensible lists in the dictionary. Adverbs, adjectives, and nouns all end in Y, which means the back-hook surface is enormous — add S for plurals (CITIES), R for comparatives (TINIER), and D for past tenses. Y-final words are the most flexible extension surface in the game.",
    },
    z: {
      title: "Z Words for Maximum Points",
      starts:
        "Z is the 10-point jackpot tile — tied with Q as the highest-scoring single letter in English Scrabble, and far easier to deploy because the Z-vocabulary does not require a partner vowel the way Q needs U. ZA (pizza slang), ZEE (the letter Z itself), ZO (a Himalayan ox), and ZAX (a roofing slater's hammer) are all two-letter Z-plays worth 19+ points, and ZEPHYR, ZIGZAG, and ZEPPELIN place the full 10-point value on premium squares. One Z circulates — the player who lands it on a triple-letter square through ZA or ZO scores 30 points from a single tile.",
      ends:
        "Words ending in Z are 10-point parallel gold — BUZZ, JAZZ, WHIZ, RITZ, and FIZZ all place the Z on the word's final square, which is exactly where premium bonuses cluster. The -ZZ family (BUZZ, JAZZ, FIZZ) is particularly valuable because the doubled Zs can straddle two bonus squares in one play. A Z-final word alongside an existing word — BUZZ next to a U-row — routinely scores 25+ points from one tile. This is the page that turns the Z from a scary tile into your favorite one.",
    },
  },
  lengths: {
    "2": "Two-letter words are the judo of Scrabble — tiny plays that unlock enormous positional value on crowded boards.",
    "3": "Three-letter words are the workhorses of board-clearing: they fit into lanes longer words cannot reach.",
    "4": "Four-letter words balance scoring power with placement flexibility.",
    "5": "Five-letter words are the Wordle sweet spot and the shortest true bingo-threat length.",
    "6": "Six-letter words thread between blocked lanes while carrying real scoring weight.",
    "7": "Seven-letter words are the bingo length — play all seven tiles for the +50 bonus.",
    "8": "Eight-letter words extend across two board lanes and dominate open boards.",
    "9": "Nine-letter words require board space but repay it with triple-word positioning.",
    "10": "Ten-letter words are tournament plays that clear racks entirely.",
    "11": "Eleven-letter words are rare, memorable, and devastating when they land.",
    "12": "Twelve-letter words are the longest practical tournament arsenal.",
    "13": "Thirteen-letter words are dictionary deep-cuts that win challenge disputes.",
    "14": "Fourteen-letter words are nearly theoretical — but they exist and they are legal.",
    "15": "Fifteen-letter words span the full board width — the rarest, most spectacular plays in Scrabble.",
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// FRENCH — Scrabble francophone (ODS9). Tile economy is VERY different from
// English: five imported letters (K, W, X, Y, Z) are worth 10 points each,
// Q drops to 8, and E circulates 15 times. The prose below reflects these
// facts — it is not a translation of the English text.
// ─────────────────────────────────────────────────────────────────────────────
const FR: LangArticleContent = {
  titleTemplate: "Comment gagner au Scrabble avec les mots en {angle}",
  startsLead:
    "Le Scrabble francophone se joue avec le dictionnaire officiel ODS, et chaque lettre a son économie propre. Ce guide des mots commençant par {letter} explique quand garder la tuile, quand la poser, et quels mots en {letter} transforment un chevet encombré en scrabble de 50 points bonus. Le dictionnaire officiel contient {total} mots valides commençant par {letter} — voici comment les exploiter.",
  endsLead:
    "Les terminaisons décident de tout au Scrabble : où votre mot peut se poser, et ce que l'adversaire pourra construire derrière. Ce guide couvre les {total} mots valides du dictionnaire se terminant par {letter}, les familles de suffixes qui les génèrent, et les jeux défensifs qui rendent les mots finissant par {letter} difficiles à prolonger pour vos adversaires.",
  tileTemplate:
    "Économie des tuiles : la lettre {Letter} vaut {score} point{s} au Scrabble francophone, et il n'y en a que {count} {motTuile} dans le sac — une rareté qui dicte quand la jouer. Posée sur une case Lettre compte double, elle rapporte {double} points ; sur une case Lettre compte triple, {triple}. Un seul placement bien choisi peut faire basculer une partie serrée de 30 points — c'est pourquoi les champions comptent les tuiles et préparent leur {Letter} deux ou trois coups à l'avance.",
  topWordsHeading: "Les mots en {Letter} qui rapportent le plus",
  topWordsLead:
    "Voici les meilleurs scores du dictionnaire officiel, en direct de notre base de mots — mémorisez-les, ce sont eux qui gagnent des parties :",
  closing:
    "La différence entre un joueur du dimanche et un champion, ce n'est pas la taille du vocabulaire — c'est de savoir quels mots en {letter} existent, combien ils valent, et quand la tuile rapporte plus sur le chevet que sur le plateau. Gardez cette page en favori, travaillez la liste ci-dessus, et la lettre {letter} devient une arme.",
  wordleNote:
    "Vous jouez plutôt au Wordle ? La stratégie change : il ne s'agit plus de points de tuile mais de fréquence et de position des lettres. Utiliser des mots en {letter} tôt dans la partie aide à éliminer des candidats rapidement.",
  lengthsLead:
    "La longueur des mots change toute la géométrie du plateau : les mots de {n} lettres {laneNote}, et connaître l'arsenal complet — {total} mots valides au dictionnaire — permet de trouver la seule ligne qui passe entre les zones bloquées. Ce guide couvre les meilleurs mots de {n} lettres, le bonus scrabble (+50 en posant les 7 tuiles), et le moment où un mot court rapporte plus qu'un mot long.",
  letters: {
    a: {
      title: "A pour ancrer votre chevet",
      starts:
        "Le A est la voyelle la plus fréquente après le E en français — neuf tuiles circulent, et presque chaque chevet contient au moins un A. Les mots en A- (AMI, ARBRE, AVENIR) sont le carburant des scrabbles : les familles -ATION, -AGE et -ABLE permettent de vider un chevet encombré d'un seul coup. Utilisez les échappatoires AN, AS, AT pour équilibrer vos voyelles tout en volant les cases bonus.",
      ends:
        "Les mots terminés par A sont rares en français — AGENDA, DELTA, CAMÉLIA sont les familles principales — et leur rareté en fait des bloeurs de ligne : l'adversaire n'a presque jamais le prolongement. Concentrez-vous sur les emprunts italiens (SONATA, CANTATA) et les finales -TA (DELTA, AGENDA) qui se posent sur les cases triples sans pouvoir être prolongés derrière.",
    },
    b: {
      title: "B pour les bingos",
      starts:
        "Le B vaut 3 points au Scrabble francophone et nourrit les scrabbles : la famille BE- (BESOIN, BÉNÉFICE, BEAUCOUP) prolonge les mots déjà posés, et les ouvertures BA-, BI-, BO- (BALADE, BIEN, BONHEUR) vident les chevets. Deux B seulement dans le sac : gardez-en un pour une case double où les 3 points deviennent 6.",
      ends:
        "Les terminaisons -B sont rarissimes en français : les vraies familles ODS se comptent sur une main, et le B final sonne sourd dans la plupart des emprunts. La vraie valeur de cette page : connaître l'exception pour piéger l'adversaire qui invente un mot en -B au Scrabble francophone. Les finales liées au B, comme -BLE (TABLE, CABLE) et -BRE (ARBRE, CÈBRE), sont la vraie surface d'accroche de la lettre.",
    },
    c: {
      title: "C et la puissance CH-",
      starts:
        "Le C français a deux visages : le /k/ dur dans CA-, CO-, CU- (CARRÉ, COMMUNE, CULTURE) et le /s/ doux devant E, I, Y (CERISE, CIRQUE, CYCLE). Les 3 points du C s'additionnent au H (4 points) dans les débuts CH- (CHAMP, CHÂTEAU, CHIFFRE) : posés sur une case double, le duo rapporte 7 points par position. Deux C dans le sac — utilisez-les tôt sur les cases lettres.",
      ends:
        "Les mots finissant par C sont des emprunts : PUBLIC et CHIC sont les grandes finales -C de l'ODS. Les familles -IQUE (MAGIQUE, PHYSIQUE) convertissent les noms en adjectifs et prolongent presque tout mot français pour 2 lettres de plus. La terminaison -C est une arme défensive : impossible à prolonger derrière dans la plupart des cas.",
    },
    d: {
      title: "D et le moteur -É / -DE",
      starts:
        "Le D vaut 2 points et alimente les participes : chaque verbe au passé et la famille DE- (DEVOIR, DEMAIN, DÉJÀ) prolonge les mots existants. Quatre tuiles D circulent — gardez-en une pour le -É final inévitable. Les débuts DA-, DI- (DANGER, DIFFÉRENCE) préparent les scrabbles.",
      ends:
        "La terminaison -D est presque inexistante en français — l'ODS ne compte que quelques emprunts. Les mots finissant par D sont si rares que cette page sert surtout à réfuter les inventions adverses : si un mot -D non-dictionnaire apparaît, challengez — l'ODS est de votre côté. La vraie finale du français, c'est -É (participes) et -DE (MODE, VIDE).",
    },
    e: {
      title: "E, la reine du français",
      starts:
        "Quinze tuiles E dans le sac francophone — de loin la lettre la plus fréquente, et la clé des scrabbles. Les ouvertures EN-, EM-, ES- (ENTRÉE, EMPLOI, ESPRIT) vident les chevets, et le E muet final fait de chaque mot français un candidat au prolongement. Le E ne rapporte qu'1 point : sa valeur est dans la souplesse du chevet, pas dans le score.",
      ends:
        "Le E final est LA terminaison française par excellence : participes -É, infinitifs -ER, pluriels -ES, et le fameux E muet (CHAISE, TABLE) qui accepte presque tous les prolongements. Les mots finissant par E sont la plus grande surface d'accrochage du jeu : -E→-ES (CHAISES), -E→-ER, et -E→-EMENT sont les mécaniques gagnantes qui convertissent chaque mot français en extension facile.",
    },
    f: {
      title: "F pour les poses parallèles",
      starts:
        "Le F vaut 4 points et excelle en pose parallèle : les ouvertures FA-, FO-, FR- (FABLE, FOCUS, FROMAGE) posent le F sur les cases lettres pour un gain de 8 par position. Deux tuiles seulement : ne les brûlez pas tôt.",
      ends:
        "Les finales -F sont des emprunts rares : BŒUF, NEF et CLEF sont les grandes exceptions de l'ODS. Leur rareté en fait des verrous : personne ne prolonge derrière un mot en -F. Les familles -IF (MOTIF, SPORTIF) cachent des 4 points sur les cases bonus.",
    },
    g: {
      title: "G pour gagner",
      starts:
        "Le G vaut 2 points et débloque les suffixes -AGE, -OGE, et les débuts GA-, GR- (GARE, GRAND, GÉNÉRAL). Les verbes français finissent en -GER (MANGER, BOUGER) : le G prolonge tout infinitif en -ER pour 2 lettres.",
      ends:
        "Les finales -G sont très rares en ODS. Les mots finissant par G sont quasi inexistants en français : cette page est une liste de référence pour les challenges. La vraie finale liée au G, c'est -GE (FROMAGE, VOYAGE, GARAGE) qui se prolonge en -GER et -GEANT.",
    },
    h: {
      title: "H muet ou aspiré",
      starts:
        "Le H vaut 4 points au Scrabble francophone et se cache presque toujours derrière une autre lettre : CH- (CHIEN), PH- (PHOTO), TH- (THÉÂTRE). Les débuts HA-, HE- (HABIT, HÉROS) sont rares car le H français est muet ou aspiré — les poses en H- déroutent l'adversaire qui oublie leur validité.",
      ends:
        "Les finales -H sont des emphatiques rares : les vraies familles ODS sont les interjections (OH, AH — toutes deux valides). H final = verrou total : aucun mot français ne se prolonge derrière un -H. Poser OH ou AH sur une case triple lettre rapporte 8 points avec 2 tuiles.",
    },
    i: {
      title: "I, le carburant des suffixes",
      starts:
        "Huit tuiles I, 1 point : le I alimente -ION, -IE, -ISSEMENT — les suffixes les plus productifs du français. Les débuts IM-, IN- (IMPORTANCE, INDICE) vident les chevets et préparent les scrabbles.",
      ends:
        "Les finales -I sont des emprunts (TAXI, SUSHI, KIWI). Leur origine étrangère les rend improlongeables : parfaits verrous défensifs. Peu d'adversaires connaissent les -I valides — challengez-les s'ils inventent.",
    },
    j: {
      title: "J, huit points par tuile",
      starts:
        "Le J vaut 8 points au Scrabble francophone — le seul 8 points de la langue. Les débuts J- sont fréquents (JOUR, JUSTE, JEUNE, JAUNE) contrairement à l'anglais, donc le J se pose plus tôt : un J sur case double rapporte 16, sur triple 24. Une seule tuile : ne la gaspillez pas sur un mot de 3 lettres sans bonus.",
      ends:
        "Les finales -J n'existent pas en français — l'ODS n'enregistre aucun mot valide. Cette page est une curiosité de référence : sa valeur est de réfuter les inventions adverses. Si un mot finissant par J apparaît, le challenge gagnant est garanti.",
    },
    k: {
      title: "K, dix points d'emprunt",
      starts:
        "Au Scrabble francophone, le K vaut 10 points — la tuile la plus précieuse avec W, X, Y, Z, car elle ne survit que dans les emprunts : KIOSQUE, KILO, KOALA, KAKATOÈS. Une seule tuile : posez-la sur une case double (20 points) ou triple (30 points). Les mots en K sont rares mais mémorisables — cette page est votre liste de révision.",
      ends:
        "Aucun mot français légitime ne finit par K : les rares -K de l'ODS sont des emprunts intégraux. La page sert surtout au challenge : un adversaire qui joue une finale -K inventée perd son tour. La vraie finale K, c'est -QUE (BANQUE, BANQUET) — les familles -K ODS sont minuscules, étudiez-les pour les duels.",
    },
    l: {
      title: "L, la glue des suffixes",
      starts:
        "Le L vaut 1 point et colle tout : -EL, -AL, -ELLE (NATUREL, LÉGAL). Les débuts LA-, LE-, LI- (LAMPE, LIVRE, LIGNE) sont les plus flexibles du français. Cinq tuiles : gérer le L, c'est gérer l'équilibre voyelle-consonne du chevet.",
      ends:
        "Les finales -L sont des verrous discrets : le -EL double (MATÉRIEL, NATUREL) et le -AL (LÉGAL, MENTAL, GLOBAL) se prolongent en -EMENT (NATURELLEMENT) et -ITÉ (LÉGALITÉ). Les mots en -L finaux verrouillent les lignes : peu de joueurs ont le prolongement prêt.",
    },
    m: {
      title: "M pour les milieux",
      starts:
        "Le M vaut 2 points et brille dans les compositions : -MENT (seul suffixe français aussi productif que le -ING anglais), les débuts MA-, ME-, MO- (MAISON, MÉTRO, MOMENT) vident les chevets. Trois tuiles : le M est aussi la porte des débuts IM- (IMPOSSIBLE).",
      ends:
        "Les finales -M sont rares : ITEM est la grande exception de l'ODS. La vraie finale M est le -MENT adverbial (NATURELLEMENT, LENTEMENT) qui prolonge presque chaque adjectif français pour un scrabble facile.",
    },
    n: {
      title: "N pour les nasales",
      starts:
        "Le N vaut 1 point, circule 6 fois, et ancre les nasales françaises : les débuts NA-, NE- (NATION, NERF, NATURE) et la particule -N- interne (BONBON, ANNEAU) structurent le français. Le N est aussi la porte du -NT des pluriels verbaux (ILS MANGENT — 6 lettres, 6 points).",
      ends:
        "Les finales -N sont des verrous français classiques : les pluriels -ENT (ILS AIMENT), -ANT (MANGEANT), -ONT (ILS SONT) finissent tous en N muet. Ces mots sont improlongeables derrière (aucun mot français ne commence par une prolongation de N muet) : parfaits pour fermer une ligne et protéger un avance de points.",
    },
    o: {
      title: "O, la voyelle des scrabbles",
      starts:
        "Six tuiles O, 1 point : le O français alimente les débuts OR-, OU- (ORANGE, OUVRE, OUTIL) et les poses parallèles sur plateau consonantique. Le O est aussi la porte des préfixes CO-, CON- (COOPÉRER, COMPORTER) qui prolongent à peu près tout.",
      ends:
        "Les finales -O sont des emprunts (PIANO, RADIO, KILO, PHOTO) — leur origine étrangère les rend improlongeables : verrous parfaits. Les familles -OT françaises (CHARIOT, PIVOT) cachent des positions premium : retenez les emprunts et les finales -OT pour vos fins de partie.",
    },
    p: {
      title: "P pour poser gros",
      starts:
        "Le P vaut 3 points et débute PA-, PE-, PO- (PAPIER, PERSONNE, POSITION) — parmi les familles les plus denses du français. Deux tuiles : gardez-en une pour une case lettre double où les 3 points deviennent 6. Le P est aussi la porte du préfixe PRÉ- (PRÉFIXE, PRÉNOM) qui prolonge tout.",
      ends:
        "Les finales -P sont rarissimes : SIROP et GALOP sont les grandes exceptions de l'ODS. Leur rareté en fait des verrous : SIROP et GALOP sur une case triple verrouillent la ligne pour le reste de la partie.",
    },
    q: {
      title: "Q français — 8 points, presque toujours avec U",
      starts:
        "Au Scrabble francophone, le Q vaut 8 points (et non 10 comme en anglais) et se fait presque TOUJOURS suivre d'un U : QUOI, QUEUE, QUARANTE. La liste des mots français où Q n'est pas suivi de U est minuscule — COQ et CINQ sont les deux grands Q-sans-U français, et COQ seul vaut 12 points (C=3, O=1, Q=8). Une seule tuile : posez le Q sur une case double (16 points) ou attendez le U.",
      ends:
        "Les mots finissant par Q sont des perles rares : COQ et CINQ sont les deux finales -Q légitimes du Scrabble francophone (plus UMIAQ et les emprunts inuits). Leur improlongeabilité en fait des armes défensives : un COQ posé sur une case triple verrouille la ligne. Si vous tenez le Q sans U en fin de partie, ces mots sont vos sorties légales.",
    },
    r: {
      title: "R, la lettre à prolongements",
      starts:
        "Le R vaut 1 point et circule 6 fois : c'est LA lettre d'accroche du français. Les débuts RE- (REPRENDRE, REGARD, RETOUR) sont les plus fréquents de la langue — chaque mot sur le plateau est un candidat au prolongement RE-. Les finales -ER des infinitifs offrent des prolongements faciles en -ERAI et -ERAIENT.",
      ends:
        "Les finales -R sont les infinitifs et noms d'agent : -ER (MANGER, DANSER), -OIR (MIROIR, DEVOIR), -EUR (JOUEUR, TRAVAILLEUR). Le -R final se prolonge en -S (JOUEURS) et -EZ (MANGEZ) : la page des -R est la plus grande surface d'accroche du français.",
    },
    s: {
      title: "S pour les pluriels",
      starts:
        "Le S vaut 1 point et règne sur les pluriels : six tuiles circulent, la plus grande réserve de prolongements du français. SUR-, SOUS-, ES- (SURPRENDRE, ESSAYER) prolongent presque tout. Gardez un S pour l'accroche fatal : ajouter S à un nom posé près d'une case triple, c'est voler 20 points.",
      ends:
        "Les finales -S sont les pluriels : chaque nom français finissant par -S est un candidat au décompte, et les familles -ES (pluriel), -IS (FINIS), -OUS (rare) alimentent la page. La page des -S est la plus longue du site — c'est le moteur du jeu français.",
    },
    t: {
      title: "T et les finales -NT",
      starts:
        "Le T vaut 1 point, circule 6 fois, et structure les débuts TR-, TA-, TE- (TRAVAIL, TABLE, TEMPS). Le T est la porte du -TION (NATION) et du -TURE (AVENTURE) qui prolongent n'importe quel radical. Les finales verbales -ENT (ILS MANGENT) sont le T-levier des fins de partie.",
      ends:
        "Les finales -T sont les plus sourdes du français : le T est muet dans -ENT (ILS SONT) et -ET (CHALET), ce qui les rend improlongeables — le verrou défensif parfait. Les vraies familles sonores : -IT (PETIT), -AT (CHAT, PLAT), -OT (CHARIOT). Un mot en T muet posé sur une case triple verrouille la ligne sans risque de prolongement.",
    },
    u: {
      title: "U, le partenaire du Q",
      starts:
        "Le U vaut 1 point et circule 6 fois au Scrabble francophone — plus qu'en anglais (4). C'est LE partenaire du Q (QUOI, QUEUE, QUART) : gardez un U si le Q est encore dehors. Les débuts UN-, UR- (UNION, URGENCE) vident les chevets et préparent les scrabbles.",
      ends:
        "Les finales -U sont des verrous rares : les vraies familles ODS sont les participes passés en -U (VENDU, PERDU, ENTENDU) et les emprunts (GURU, TUTU). Un mot en -U sur une case triple verrouille la ligne : personne ne prolonge derrière un U final. Les participes -U se prolongent en -ES (VENDUES) — la page cache des pièges.",
    },
    v: {
      title: "V, quatre points discrets",
      starts:
        "Le V vaut 4 points au Scrabble francophone (comme en anglais) et commence des mots fréquents : VIE, VRAI, VENIR, VOITURE. Deux tuiles : le V français se pose plus tôt qu'en anglais car le vocabulaire -V- est riche (AVOIR, DEVOIR, POUVOIR — les auxiliaires français sont truffés de V). Posez le V sur une case double pour 8 points.",
      ends:
        "Les finales -V n'existent pas au Scrabble francophone — aucun mot ODS ne finit par V. La page sert au challenge : un adversaire qui invente une finale -V perd son tour. La vraie finale V, c'est -VE (VIVE, BRAVE, SAUVE) qui se prolonge en -VENT et -VEMENT.",
    },
    w: {
      title: "W, dix points d'emprunt",
      starts:
        "Au Scrabble francophone, le W vaut 10 points — un luxe absolu car il ne survit que dans les emprunts : WAGON, WESTERN, WATT, WHISKY. Une seule tuile : posez-la sur une case double (20 points) ou triple (30 points) et la partie bascule. Les mots en W sont une liste courte à mémoriser — cette page est votre arsenal.",
      ends:
        "Aucun mot français légitime ne finit par W : les rares -W de l'ODS sont des emprunts intégraux. La page sert au challenge : toute finale -W inventée est réfutable. La vraie valeur du W est en position initiale (WAGON, WATT) sur les cases lettres.",
    },
    x: {
      title: "X, dix points par tuile",
      starts:
        "Au Scrabble francophone, le X vaut 10 points et est LA tuile stratégique du duel français : les pluriels en -X (CHEVEUX, GÉNÉRAUX) transforment chaque nom irrégulier en prolongement doré. Une seule tuile : CHEVAUX sur une case triple rapporte le bonus ET le X à 10. Les débuts X- français sont quasi inexistants — la valeur du X est dans les pluriels et les positions internes.",
      ends:
        "Les finales -X sont les pluriels irréguliers : CHEVAUX, GÉNÉRAUX, TRAVAUX, COURAGEUX, HEUREUX. Chaque -X final rapporte 10 points ET verrouille la ligne — improlongeable, il bloque les cases pour l'adversaire. Les pluriels en -X sont la mécanique française la plus rentable du Scrabble : cette page est votre liste de tir.",
    },
    y: {
      title: "Y, dix points discrets",
      starts:
        "Au Scrabble francophone, le Y vaut 10 points — étonnamment pour une lettre qui apparaît dans CRAYON, YEUX, and BICYCLETTE. La rareté des débuts Y- (YEUX, YOGA) rend la tuile précieuse : une seule circule, et la poser sur une case double rapporte 20 points. Le Y interne (STYLE, SYSTÈME) est plus fréquent que le Y initial — attendez la bonne position.",
      ends:
        "Les finales -Y sont des verrous rares : les vraies familles ODS se comptent sur une main. Un mot en -Y posé sur une case triple verrouille la ligne, et les adjectifs en -Y sont si rares que cette page concentre l'essentiel : étudiez-la pour les duels.",
    },
    z: {
      title: "Z, dix points par tuile",
      starts:
        "Au Scrabble francophone, le Z vaut 10 points — la dernière des cinq tuiles dorées (K, W, X, Y, Z). Les débuts Z- sont les plus fréquents des importées : ZÉBRE, ZONE, ZOO, ZEN. Une seule tuile : posez-la sur une case double (20 points) ou triple (30 points) pour un swing décisif.",
      ends:
        "Les finales -Z n'existent pas au Scrabble francophone — aucun mot ODS ne finit par Z. La page sert au challenge : toute finale -Z inventée est réfutable. La vraie finale liée au Z, c'est -ZE comme dans GAZE — les finales -Z sont quasi inexistantes, étudiez la page pour réfuter les inventions adverses.",
    },
  },
  lengths: {
    "2": "Les mots de 2 lettres sont les briques du Scrabble francophone — chaque case compte.",
    "3": "Les mots de 3 lettres glissent dans les couloirs bloqués du plateau.",
    "4": "Les mots de 4 lettres équilibrent score et souplesse de pose.",
    "5": "Les mots de 5 lettres sont la longueur reine du Wordle francophone.",
    "6": "Les mots de 6 lettres traversent les zones bloquées avec un vrai poids.",
    "7": "Les mots de 7 lettres sont la longueur scrabble : posez tout le chevet pour +50.",
    "8": "Les mots de 8 lettres traversent deux couloirs et dominent les plateaux ouverts.",
    "9": "Les mots de 9 lettres exigent de l'espace mais rapportent les cases triples.",
    "10": "Les mots de 10 lettres vident les chevets d'un seul coup.",
    "11": "Les mots de 11 lettres sont rares et dévastateurs quand ils tombent.",
    "12": "Les mots de 12 lettres sont l'arsenal pratique des tournois.",
    "13": "Les mots de 13 lettres gagnent les challenges.",
    "14": "Les mots de 14 lettres sont presque théoriques — mais légaux.",
    "15": "Les mots de 15 lettres traversent tout le plateau — les plus beaux coups.",
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// SPANISH — Scrabble hispanohablante (FISE). Tile economy: Z=10 is the only
// ten-pointer; J, LL, Ñ, RR, X are 8; Q drops to 5 (and almost always needs
// U); CH is its own 5-point tile. Spelling: QU- is near-mandatory.
// ─────────────────────────────────────────────────────────────────────────────
const ES: LangArticleContent = {
  titleTemplate: "Cómo ganar al Scrabble con palabras que {angle}",
  startsLead:
    "El Scrabble en español se juega con el diccionario oficial FISE, y cada letra tiene su propia economía. Esta guía de palabras que empiezan por {letter} explica cuándo guardar la ficha, cuándo colocarla, y qué palabras en {letter} convierten un atril atestado en un scrabble de 50 puntos extra. El diccionario contiene {total} palabras válidas que empiezan por {letter} — así se explotan.",
  endsLead:
    "Las terminaciones deciden dónde puede colocarse tu palabra y qué podrá construir el rival detrás. Esta guía cubre las {total} palabras válidas del diccionario que terminan en {letter}, las familias de sufijos que las generan, y las jugadas defensivas que hacen que las palabras acabadas en {letter} sean difíciles de extender.",
  tileTemplate:
    "Economía de fichas: la {Letter} vale {score} punto{s} en el Scrabble en español, y solo hay {count} {palabraFicha} en el saco — una escasez que dicta cuándo jugarla. Sobre una casilla de letra doble, reporta {double} puntos; en una triple, {triple}. Una sola colocación bien elegida puede voltear una partida ajustada en 30 puntos — por eso los campeones cuentan fichas y preparan su {Letter} con dos o tres turnos de antelación.",
  topWordsHeading: "Las palabras con {Letter} que más puntúan",
  topWordsLead:
    "Estos son los mejores puntajes del diccionario oficial, en vivo desde nuestra base de datos — apréndetelos, son los que ganan partidas:",
  closing:
    "La diferencia entre un jugador casual y un campeón no es el tamaño del vocabulario — es saber qué palabras en {letter} existen, cuánto valen, y cuándo la ficha rinde más en el atril que en el tablero. Guarda esta página, practica la lista de arriba, y la letra {letter} se convierte en un arma.",
  wordleNote:
    "¿Juegas a Wordle? La estrategia cambia: no se trata de puntos de fichas sino de frecuencia y posición de letras. Usar palabras con {letter} temprano en la partida ayuda a eliminar candidaturas rápido.",
  lengthsLead:
    "La longitud cambia toda la geometría del tablero: las palabras de {n} letras {laneNote}, y conocer el arsenal completo — {total} palabras válidas en el diccionario — permite encontrar la única línea que pasa entre las zonas bloqueadas. Esta guía cubre las mejores palabras de {n} letras, el bono scrabble (+50 por colocar las 7 fichas), y el momento en que una palabra corta puntúa más que una larga.",
  letters: {
    a: {
      title: "empiezan por A — el ancla vocálica",
      starts:
        "La A es la vocal más frecuente del español — doce fichas circulan, la mayor reserva del juego. Las palabras en A- (AMIGO, ÁRBOL, AVISO) son el combustible de los scrabbles: las familias -ACIÓN, -ABLE y -AMENTO vacían un atril atestado de una sola vez. Usa las salidas cortas (ALA, AVE, ASA) para equilibrar vocales mientras robas posiciones premium.",
      ends:
        "Las palabras terminadas en A son el mayor bloque del español: cada sustantivo femenino (CASA, MESA, VIDA) y cada plural -AS acaban aquí. Los rivales pueden enganchar una S detrás con facilidad, así que una palabra en -A junto a una casilla triple regalada es un regalo de 20 puntos al oponente: ciérrala con una ficha defensiva antes.",
    },
    b: {
      title: "empiezan por B — bingo y dobles",
      starts:
        "La B vale 3 puntos y abre las familias BA-, BU- (BANCO, BUENO, BONITO) que vacían atriles. Solo dos fichas: guarda una para una casilla doble donde los 3 puntos se vuelven 6. Las palabras en B- también alimentan el sufijo -BLE (AMABLE, POSIBLE), el gran generador de extensiones del español.",
      ends:
        "Las terminaciones -B son casi inexistentes en español: la página sirve sobre todo para refutar inventos rivales. La verdadera final de la B es -BLE (AMABLE, IMPOSIBLE, VISIBLE), que convierte casi cualquier verbo en adjetivo para extensiones de tres letras.",
    },
    c: {
      title: "empiezan por C — la CH vale 5",
      starts:
        "En el Scrabble en español, la C vale 2 puntos, pero CH es una ficha propia de 5 puntos — la gran rareza de este idioma. Las aperturas CA-, CO-, CU- (CASA, COSA, CULTURA) vacían atriles barato; CH- (CHICO, CHISTE, CHALECO) coloca el valor combinado en casillas dobles. Cuatro fichas C circulan en el saco español.",
      ends:
        "Las palabras terminadas en C son contadas: se trata de una lista corta que conviene memorizar para los retos. La mayoría son préstamos con la terminación -IC (el patrón internacional que sí funciona en español). Un -C final es un cerrojo: casi ningún rival lo prolonga detrás.",
    },
    d: {
      title: "empiezan por D — el motor -ADO",
      starts:
        "La D vale 2 puntos y alimenta el sufijo -ADO (CANSADO, PRIVADO) — el participio más productivo del español. Las aperturas DE-, DI- (DECIR, DÍA, DULCE) preparan scrabbles. Cinco fichas circulan: la D es tan común como la T en español, así que su valor está en el timing, no en la escasez.",
      ends:
        "Las finales -D son los participios y adverbios: -ADO (CANSADO) e -IDO (COMIDO) dominan la página. Las palabras en -D son fácilmente extensibles con S (CANSADOS): la página es una de las mejores superficies de enganche del español.",
    },
    e: {
      title: "empiezan por E — la reina del español",
      starts:
        "Doce fichas E circulan en el Scrabble hispano — la vocal más frecuente del idioma. Las aperturas EN-, EM-, ES- (ENTRAR, EMPLEO, ESTAR) vacían atriles, y las finales -E hacen de cada palabra española una candidata a extensión. Vale 1 punto: su valor es la flexibilidad del atril.",
      ends:
        "La -E final es LA terminación del español: los plurales -ES (MESES, CANCIONES) dominan, y cada palabra acabada en -E acepta una S detrás. La página -E es la mayor superficie de enganche del idioma: úsala para planificar extensiones de dos turnos.",
    },
    f: {
      title: "empiezan por F — paralelas de 4 puntos",
      starts:
        "La F vale 4 puntos y brilla en jugadas paralelas: las aperturas FA-, FO-, FU- (FÁCIL, FORMA, FUEGO) colocan la F en casillas dobles para 8 puntos por posición. Solo una ficha F en el saco español — despliégala con timing, no la quemes temprano.",
      ends:
        "Las finales -F son rarísimas en español: su valor es de reto — cualquier invento en -F es refutable. Las familias -IVA (ACTIVA, DEPORTIVA) y -IFICA (CALIFICA, ESPECIFICA) esconden la F en casillas bonus de posición interna.",
    },
    g: {
      title: "empiezan por G — GA-, GO-, GU-",
      starts:
        "La G vale 2 puntos y abre GA-, GO-, GU- (GATO, GUSTO, GUERRA): las familias más densas del español. La G también alimenta el infinitivo -GAR (LLEGAR, JUGAR) y la terminación -GO (LAGO, LUEGO), estructuras que vacían atriles de un tirón.",
      ends:
        "Las finales -G son prácticamente inexistentes en español: la página sirve de referencia para los retos. La verdadera final de la G es -GO (LAGO, LUEGO, CIEGO), que se extiende en -S (LAGOS) para puntos rápidos.",
    },
    h: {
      title: "empiezan por H — la muda de 4 puntos",
      starts:
        "La H vale 4 puntos en el Scrabble hispano y es MUDA — la gran particularidad del idioma. Las aperturas HA-, HE-, HI-, HO-, HU- (HABER, HECHO, HIERRO, HORA, HUESO) descolocan al rival que olvida su validez. Solo dos fichas: la H muda sobre una casilla triple vale 12 puntos de un golpe.",
      ends:
        "Las finales -H no existen en el diccionario español: ninguna palabra válida acaba en H. La página es una curiosidad de referencia: su valor está en el reto — cualquier final -H inventado pierde el turno.",
    },
    i: {
      title: "empiezan por I — el combustible de sufijos",
      starts:
        "Seis fichas I, 1 punto: la I alimenta -IÓN, -ÍSIMO, -IENTO — los sufijos más productivos del español. Las aperturas IM-, IN- (IMPOSIBLE, INCAPAZ) vacían atriles y preparan scrabbles. El español es la lengua con más palabras en -IÓN del mundo: la I es el combustible.",
      ends:
        "Las finales -I son casi exclusivas de préstamos (TAXI, SUSHI, KIWI) — su origen extranjero las hace inextendibles: cerraderías perfectas. Pocos rivales conocen la lista de -I válidos: úsala para los retos.",
    },
    j: {
      title: "empiezan por J — ocho puntos por ficha",
      starts:
        "La J vale 8 puntos en el Scrabble hispano — uno de los valores más altos del idioma, y aparece en palabras de uso diario (JUGAR, JUEGO, JAMÓN), mucho más frecuente que en inglés. Una sola ficha: colócala en una casilla doble (16 puntos) o triple (24 puntos). JUGAR sobre una triple de palabra puede valer 60+ puntos.",
      ends:
        "Las finales -J no existen en el diccionario español: ninguna palabra válida acaba en J. La página sirve de referencia: si un rival inventa una final -J, el reto está garantizado.",
    },
    k: {
      title: "empiezan por K — la importada",
      starts:
        "La K casi no existe en el español nativo: las únicas palabras válidas son préstamos (KILO, KIOSCO, KARATE, KOALA). Es la ficha más rara del Scrabble hispano: despliégala en préstamos y cuenta con el reto si el rival duda de KILO. La lista es corta y fácil de memorizar.",
      ends:
        "Ninguna palabra española legítima acaba en K: los préstamos válidos se cuentan con los dedos y son refutables. La página es una curiosidad: apréndete la lista para los duelos.",
    },
    l: {
      title: "empiezan por L — y la LL de 8 puntos",
      starts:
        "La L vale 1 punto, pero LL es una ficha PROPIA de 8 puntos en el Scrabble hispano — la gran joya del idioma. Las aperturas LA-, LE-, LO- (LATA, LECHE, LOTE) vacían atriles barato; LL- (LLAVE, LLUVIA) coloca 8 puntos en casillas dobles. Cuatro fichas L más una ficha LL: gestiona ambas.",
      ends:
        "Las finales -L son cerraderías discretas: -AL (LEGAL, MENTAL, GLOBAL) se extiende en -MENTE (LEGALMENTE) e -IDAD (LEGALIDAD). Las palabras en -L final bloquean líneas: pocos rivales tienen el enganche listo.",
    },
    m: {
      title: "empiezan por M — el -MENTE español",
      starts:
        "La M vale 3 puntos y abre MA-, ME-, MO- (MESA, MUNDO, MODA). Su gran valor: el sufijo adverbial -MENTE (FÁCILMENTE, RÁPIDAMENTE) convierte casi cualquier adjetivo en un scrabble de 8 o más letras. Dos fichas: la M es también la puerta de IM- (IMPOSIBLE).",
      ends:
        "Las finales -M son raras en español: la página es una curiosidad de referencia. La verdadera final de la M es -MENTE adverbial, que convierte cada adjetivo en extensión fácil.",
    },
    n: {
      title: "empiezan por N — y la Ñ de 8 puntos",
      starts:
        "La N vale 1 punto y circula 5 veces; la Ñ es una ficha PROPIA de 8 puntos — exclusiva del Scrabble hispano. Las aperturas NA-, NE- (NACIÓN, NERVO) vacían atriles, y la Ñ (ÑOÑO, PIÑA, ENGAÑO) es el sello del idioma: úsala en casilla doble para 16 puntos.",
      ends:
        "Las finales -N son cerraderías clásicas del español: el plural verbal -AN (HABLAN), -EN (COMEN), -ÓN (CORAZÓN) acaba en N que nadie extiende detrás. Perfectas para cerrar una línea y proteger una ventaja de puntos.",
    },
    o: {
      title: "empiezan por O — la vocal de paralelas",
      starts:
        "Nueve fichas O, 1 punto: la O alimenta las aperturas ORO, OSO, OJO (la gran palabra: O más J de 8 puntos más O = 10 puntos con 3 fichas). Las posiciones paralelas con O son el pan de cada día en tableros consonánticos del español.",
      ends:
        "Las finales -O son la firma del español: los sustantivos masculinos (GATO, MURO) y los pronombres (YO, ESO) acaban aquí. Los rivales enganchan S detrás con facilidad (GATOS): una palabra en -O cerca de una triple regalada es un regalo de 15 puntos.",
    },
    p: {
      title: "empiezan por P — PA-, PO-, PU-",
      starts:
        "La P vale 3 puntos y abre PA-, PE-, PO-, PU- (PAPEL, PESO, POZO, PUÑO): de las familias más densas del español. Dos fichas: guarda una para casillas dobles donde los 3 se vuelven 6. La P también alimenta el prefijo PRE- (PREMIO, PRENDA).",
      ends:
        "Las finales -P son rarísimas en español: la lista se cuenta con los dedos y sirve sobre todo para retos. Concéntrate en las posiciones internas para el valor real de la ficha.",
    },
    q: {
      title: "empiezan por Q — solo 5 puntos, casi siempre con U",
      starts:
        "En el Scrabble hispano, la Q vale solo 5 puntos (la mitad que en inglés) y se acompaña casi SIEMPRE de U: QUE, QUIETO, QUISO. La ortografía española no permite QA- ni QO-: la lista de Q-sin-U es prácticamente inexistente en este idioma, lo que hace la Q más predecible que en inglés. Una ficha: colócala en casilla doble (10 puntos) o espera la U inevitable.",
      ends:
        "Las palabras terminadas en Q no existen en el diccionario español: la ortografía del idioma no permite ninguna final -Q. La página es una curiosidad de referencia: su valor está en el reto — cualquier invento en -Q es refutable de inmediato.",
    },
    r: {
      title: "empiezan por R — y la RR de 8 puntos",
      starts:
        "La R vale 1 punto, pero RR es una ficha PROPIA de 8 puntos — exclusiva del Scrabble hispano. Las aperturas RA-, RE- (RATÓN, REVÉS) vacían atriles, y la RR en posición interna (PERRO, CARRO) vale 8 puntos por colocación. Cinco fichas R más una RR: gestiona ambas.",
      ends:
        "Las finales -R son los infinitivos (-AR, -ER, -IR) y los comparativos (MAYOR, MENOR): la mayor superficie de enganche del español. Los infinitivos aceptan la tercera persona -N (HABLARON), y los comparativos aceptan -ES (MAYORES): la página -R es la más extensible del idioma.",
    },
    s: {
      title: "empiezan por S — la ficha maestra",
      starts:
        "La S vale 1 punto y es LA ficha de enganche del español: añade S a casi cualquier palabra del tablero para una extensión de una letra que puntúa todo el valor de la palabra original. SOBRE-, SUB-, SE- (SOBRESALIR, SUBIR, SED) prolongan casi todo. Seis fichas circulan: la paridad de S decide partidas ajustadas.",
      ends:
        "Las finales -S son el plural del español: cada sustantivo (CASAS, LIBROS) y cada verbo (HABLAS) acaba aquí, haciendo de la página -S la más larga del sitio. La jugada defensiva: si sabes que el rival guarda una S y colocas un sustantivo junto a una triple, le estás regalando 20 puntos de enganche.",
    },
    t: {
      title: "empiezan por T — el ancla de sufijos",
      starts:
        "La T vale 1 punto, circula 4 veces, y ancla -CIÓN (NACIÓN) y los participios -TA/-TE. Las aperturas TA-, TE-, TO- (TASA, TEMA, TOMA) vacían atriles barato. La T también es la puerta del prefijo TRANS- (TRANSPORTE), el más largo del español.",
      ends:
        "Las finales -T son raras en español: la lista se cuenta con los dedos. La página es una curiosidad de referencia: apréndete las pocas válidas para los retos.",
    },
    u: {
      title: "empiezan por U — la compañera de Q",
      starts:
        "La U vale 1 punto y circula 5 veces: es LA compañera de la Q (QUE, QUIETO). Las aperturas UN-, UR- (UNIÓN, URGENTE) vacían atriles, y el prefijo ULTRA- prolonga casi todo. Si la Q sigue en el saco, guarda una U: es la ficha que la desbloquea.",
      ends:
        "Las finales -U son raras en español: la lista se cuenta con los dedos. Su inextendibilidad las hace cerraderías perfectas: una palabra en -U sobre una triple bloquea la línea el resto de la partida.",
    },
    v: {
      title: "empiezan por V — 4 puntos frecuentes",
      starts:
        "La V vale 4 puntos en español (igual que en inglés) y abre palabras de uso diario (VIDA, VER, VAMOS): se despliega más temprano que en inglés porque el léxico -V es riquísimo. Una sola ficha en el Scrabble hispano: colócala en casilla doble para 8 puntos.",
      ends:
        "Las finales -V no existen en el diccionario español: ninguna palabra válida acaba en V. La página es una curiosidad de referencia: su valor está en el reto — cualquier invento en -V es refutable.",
    },
    w: {
      title: "empiezan por W — la importada rara",
      starts:
        "La W es la ficha más rara del Scrabble hispano: solo existe en préstamos (WHISKY, WATERPOLO, WAGÓN). Su valor es mínimo en español: despliégala en préstamos y cuenta con el reto del rival.",
      ends:
        "Ninguna palabra española legítima acaba en W: los préstamos se cuentan con los dedos. La página es una curiosidad: úsala para los duelos.",
    },
    x: {
      title: "empiezan por X — ocho puntos",
      starts:
        "La X vale 8 puntos en el Scrabble hispano — una de las fichas más valiosas del idioma. Las palabras X- iniciales son raras en español (XENO, XILOFONO): la ficha brilla en posición interna (ÉXITO, TAXI, MÁXIMO). Una ficha: colócala en casilla doble (16 puntos) o triple (24).",
      ends:
        "Las finales -X no existen en el español nativo: solo los préstamos son válidos. La página es una curiosidad de referencia: apréndete la lista para los retos.",
    },
    y: {
      title: "empiezan por Y — la conjunción de 4 puntos",
      starts:
        "La Y vale 4 puntos en español y es LA conjunción de coordinación — la palabra más usada del idioma. Las aperturas Y- (YA, YO, YESO) son cortas y frecuentes. Una ficha: colócala en casilla doble para 8 puntos.",
      ends:
        "Las finales -Y no existen en el español nativo: solo los préstamos son válidos. La página es una curiosidad: su valor está en el reto.",
    },
    z: {
      title: "empiezan por Z — diez puntos",
      starts:
        "La Z vale 10 puntos en el Scrabble hispano — la ficha más valiosa del idioma, y es la ÚNICA de 10 puntos del español. Las aperturas Z- (ZAPATO, ZONA, ZOO) son frecuentes en el uso diario. Una ficha: colócala en casilla doble (20 puntos) o triple (30) y la partida vira.",
      ends:
        "Las finales -Z no existen en el español nativo: solo los préstamos son válidos. La página es una curiosidad de referencia: apréndete la lista para los duelos y retos.",
    },
  },
  lengths: {
    "2": "Las palabras de 2 letras son los ladrillos del Scrabble hispano — cada casilla cuenta.",
    "3": "Las palabras de 3 letras se deslizan en los carriles bloqueados del tablero.",
    "4": "Las palabras de 4 letras equilibran puntuación y flexibilidad de colocación.",
    "5": "Las palabras de 5 letras son la longitud reina del Wordle en español.",
    "6": "Las palabras de 6 letras cruzan zonas bloqueadas con peso real.",
    "7": "Las palabras de 7 letras son la longitud scrabble: coloca las 7 fichas para +50.",
    "8": "Las palabras de 8 letras cruzan dos carriles y dominan tableros abiertos.",
    "9": "Las palabras de 9 letras exigen espacio pero pagan casillas triples.",
    "10": "Las palabras de 10 letras vacían atroles de un solo golpe.",
    "11": "Las palabras de 11 letras son raras y devastadoras cuando caen.",
    "12": "Las palabras de 12 letras son el arsenal práctico de torneos.",
    "13": "Las palabras de 13 letras ganan retos.",
    "14": "Las palabras de 14 letras son casi teóricas — pero legales.",
    "15": "Las palabras de 15 letras cruzan todo el tablero — las jugadas más espectaculares.",
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// GERMAN — Scrabble auf Deutsch. Tile economy is unique: Q, X, Y = 10 points;
// J and V = 8; P is a surprising 6. Umlauts (Ä Ö Ü) are written as AE/OE/UE.
// Long compound words make length pages unusually strategic.
// ─────────────────────────────────────────────────────────────────────────────
const DE: LangArticleContent = {
  titleTemplate: "So gewinnen Sie Scrabble mit {angle}",
  startsLead:
    "Scrabble auf Deutsch hat seine eigene Ökonomie: Q, X und Y sind je 10 Punkte wert, J und V je 8, und P überraschende 6. Dieser Guide zu Wörtern mit {letter} erklärt, wann Sie den Stein behalten, wann Sie ihn legen, und welche {letter}-Wörter ein vollgemischtes Gestell in ein Scrabble mit 50 Bonuspunkten verwandeln. Das offizielle Wörterbuch enthält {total} gültige Wörter mit {letter} — so nutzen Sie sie.",
  endsLead:
    "Endungen bestimmen, wohin Ihr Wort passt und was der Gegner dahinter bauen kann. Dieser Guide behandelt die {total} gültigen Wörter, die auf {letter} enden, die Suffixfamilien, die sie erzeugen, und die Defensivzüge, die {letter}-finale Wörter für Gegner schwer erweiterbar machen.",
  tileTemplate:
    "Stein-Ökonomie: Der Buchstabe {Letter} ist {score} Punkt{s} wert im deutschen Scrabble, und es gibt nur {count} {steinWort} im Beutel — eine Knappheit, die bestimmt, wann Sie ihn spielen. Auf einem Doppel-Feld bringt er {double} Punkte, auf einem Dreifach-Feld {triple}. Ein gut platzierter {Letter}-Stein kann ein knappe Partie um 30 Punkte drehen — deshalb zählen Profis Steine und planen den {Letter} zwei bis drei Züge voraus.",
  topWordsHeading: "Die punktstärksten Wörter mit {Letter}",
  topWordsLead:
    "Das sind die Top-Punktzahlen aus dem offiziellen Wörterbuch, live aus unserer Datenbank — lernen Sie sie, denn sie gewinnen Partien:",
  closing:
    "Der Unterschied zwischen Gelegenheits- und Turnierspielern ist nicht die Wortschatzgröße — es ist zu wissen, welche {letter}-Wörter existieren, was sie wert sind, und wann der Stein im Gestell mehr wert ist als auf dem Brett. Lesezeichen setzen, die Liste oben üben, und der Buchstabe {letter} wird zur Waffe.",
  wordleNote:
    "Spielen Sie lieber Wordle? Dann zählt nicht der Steinwert, sondern Buchstabenhäufigkeit und Position. {letter}-Wörter früh im Spiel helfen, Kandidaten schnell auszuscheiden.",
  lengthsLead:
    "Wortlänge verändert die ganze Geometrie des Bretts: {n}-buchstabige Wörter {laneNote}, und das vollständige Arsenal zu kennen — {total} gültige Wörter — findet die eine Linie, die zwischen blockierten Zonen durchpasst. Dieser Guide behandelt die punktstärksten {n}-Buchstaben-Wörter, den Scrabble-Bonus (+50 für alle 7 Steine) und den Moment, in dem ein kürzeres Wort mehr punktet als ein längeres.",
  letters: {
    a: {
      title: "A-Wörtern — der Vokal-Anker",
      starts:
        "Sechs A-Steine im deutschen Beutel, 1 Punkt: das A ist Ihr günstigster Vokal und der Anker fast jeden Scrabbles. A-Öffnungen (ABEND, ARBEIT, ANFANG) leeren Gestelle, und die Familien -ATION und -BAR verwandeln volle Gestelle in 50-Punkte-Bonus. Deutsche Komposita machen das A zum klebenden Bindeglied.",
      ends:
        "Wörter auf -A sind im Deutschen selten und meist Fremdwörter: genau das macht sie wertvoll. Gegner haben selten den Hook parat — ein -A-Wort auf einer Dreifach-Zeile blockiert den Lauf für den Rest der Partie.",
    },
    b: {
      title: "B-Wörtern — Bingo-Treibstoff",
      starts:
        "Das B ist 3 Punkte wert und öffnet BE- (BEGINN, BESUCH) — eine der produktivsten Familien des Deutschen. Vier B-Steine: das B ist der häufigste Anfangsbuchstabe (BILD, BUCH, BLUME) und der Treibstoff für Scrabbles.",
      ends:
        "Endungen auf -B sind im Deutschen extrem selten: die Liste passt auf eine Hand. Die Seite ist eine Referenz fürs Reklamieren — jeder erfundene -B-Ausgang verliert den Zug.",
    },
    c: {
      title: "C-Wörtern — der 4-Punkte-Chamäleon",
      starts:
        "Das C ist im deutschen Scrabble 4 Punkte wert (anders als 3 im Englischen) und fast immer Teil von CH- (CHAOS, CHARME) oder CK- (GLÜCK). Vier C-Steine: das C öffnet Fremdwörter (CAMPUS, CLEVER) und glänzt auf Doppel-Feldern.",
      ends:
        "Wörter auf -C sind im Deutsche Fremdwörter-Endungen, und die Liste ist kurz. Lernen Sie sie für Turnierduelle: jeder erfundene -C-Ausgang verliert den Zug.",
    },
    d: {
      title: "D-Wörtern — der Partizip-Motor",
      starts:
        "Das D ist 1 Punkt wert (im Englischen 2), zirkuliert 8-mal und treibt die Partizipien: jedes Verb wird zu -T/-ET (GESPIELT, GEMACHT). D-Öffnungen (DING, DANK, DIENST) leeren Gestelle. Das D ist auch die Tür zu DURCH- (DURCHLAUFEN), dem produktivsten deutschen Präfix.",
      ends:
        "Endungen auf -D existieren im Deutschen praktisch nicht: die Seite dient als Reklamations-Referenz. Die echten D-Endungen sind Partizipien wie -END (LAUFEND).",
    },
    e: {
      title: "E-Wörtern — der häufigste Buchstabe",
      starts:
        "Fünfzehn E-Steine im deutschen Beutel — mit Abstand der häufigste Buchstabe. E-Öffnungen (EINS, EBEN, ERFOLG) leeren Gestelle, und die Endungen -E, -EN, -ER machen jedes deutsche Wort zur Erweiterungsfläche. 1 Punkt: der Wert liegt in der Gestell-Flexibilität.",
      ends:
        "Die Endung -E ist DIE deutsche Endung: jedes Substantiv wird im Plural zu -EN/-E (TISCHE, STÜHLE), jedes Adjektiv zu -E (GUTE, SCHÖNE). Die Seite -E ist die größte Angriffsfläche des Spiels — N dahinter (TISCHEN) macht jede Endung zur Erweiterung.",
    },
    f: {
      title: "F-Wörtern — Parallelen für 4 Punkte",
      starts:
        "Das F ist 4 Punkte wert und glänzt in Parallelzügen: FA-, FU- (FARBE, FUSS) legen das F auf Doppel-Feldern für 8 Punkte pro Position. Vier F-Steine — das Deutsche liebt F (FINDEN, FRÜH, FRAU).",
      ends:
        "Endungen auf -F sind im Deutschen extrem selten (die Liste passt auf eine Hand): Reklamations-Referenz. Konzentrieren Sie sich auf Mittelpositionen für den wahren Wert der Fiche.",
    },
    g: {
      title: "G-Wörtern — der -UNG-Schlüssel",
      starts:
        "Das G ist 2 Punkte wert, zirkuliert 4-mal, und ist der Schlüssel zu -UNG — das produktivste deutsche Suffix. Jedes Verb wird zu -UNG (WOHNUNG, MEINUNG): das G in Mittelposition öffnet Scrabbles. G-Öffnungen (GUT, GELD, GANZ) leeren Gestelle.",
      ends:
        "Endungen auf -G sind im Deutschen sehr selten: die Seite ist eine Reklamations-Referenz. Die echte G-Endung ist -IG (MUTIG, EIFRIG), die sich zu -IGKEIT (MUTIGKEIT) erweitern lässt.",
    },
    h: {
      title: "H-Wörtern — die CH-Familie",
      starts:
        "Das H ist 2 Punkte wert im deutschen Scrabble (4 im Englischen) und bildet CH- (CHAOS, CHARME, CHINESISCH) und SCH- (SCHULE). Vier H-Steine: das H koppelt mit fast jedem Konsonanten — die vielseitigste Verbindung des Deutschen.",
      ends:
        "Endungen auf -H existieren im Deutschen nicht: die Seite ist eine Referenz fürs Reklamieren. Die echten H-Positionen sind in CH und SCH verborgen.",
    },
    i: {
      title: "I-Wörtern — der Bindevokal",
      starts:
        "Sechs I-Steine, 1 Punkt: das I ist ein Bindevokal des Deutschen und steckt in Komposita (SCHIFFFAHRT, EISENBAHN). I-Öffnungen (IMMER, IRGEND) leeren Gestelle, und die Familien -IE und -ION (NATION, REGION) öffnen Scrabbles.",
      ends:
        "Endungen auf -I sind Fremdwörter (TAXI, SUSHI, KIWI): unerweiterbar und damit defensive Riegel. Wenige Gegner kennen die gültige -I-Liste — nutzen Sie das fürs Reklamieren.",
    },
    j: {
      title: "J-Wörtern — acht Punkte pro Stein",
      starts:
        "Das J ist im deutschen Scrabble 8 Punkte wert — gleichauf mit V. Zwei J-Steine zirkulieren (im Englischen nur einer). J-Öffnungen (JEDER, JETZT, JAHR, JUNGE) sind im Alltag allgegenwärtig: das J legt sich früher als im Englischen. Auf einem Doppel-Feld: 16 Punkte.",
      ends:
        "Endungen auf -J existieren im Deutschen nicht: die Seite ist eine Referenz fürs Reklamieren. Jeder erfundene -J-Ausgang verliert den Zug.",
    },
    k: {
      title: "K-Wörtern — der deutsche Arbeitstier",
      starts:
        "Das K ist im deutschen Scrabble 4 Punkte wert (5 im Englischen), aber der dichteste Konsonant des Deutschen (KIND, KALT, KOMMEN, KOPF). Vier K-Steine zirkulieren — das K ist der Arbeitstier-Buchstabe des Sprachspiels.",
      ends:
        "Endungen auf -K sind im Deutschen extrem selten (die Liste passt auf eine Hand): Reklamations-Referenz. Konzentrieren Sie sich auf die häufigen Mittelpositionen.",
    },
    l: {
      title: "L-Wörtern — der Klebstoff",
      starts:
        "Das L ist 2 Punkte wert, zirkuliert 4-mal, und klebt alles zusammen: die deutschen Komposita (VOLL+ZEIT wird VOLLZEIT) brauchen L als Bindeglied. L-Öffnungen (LEBEN, LIEBE, LAND) leeren Gestelle — das L ist der häufigste Flüssiglaut des Deutschen.",
      ends:
        "Endungen auf -L sind im Deutschen selten: die Liste ist kurz und dient der Reklamation. Die echten L-Endungen sind -EL (GABEL, IGEL), die sich mit -N erweitern lassen.",
    },
    m: {
      title: "M-Wörtern — der Komposita-Motor",
      starts:
        "Das M ist 3 Punkte wert und der Motor der deutschen Komposita: MIT-, MORGEN- (MITTAG, MONTAG) öffnen die längsten Wörter des Spiels. Vier M-Steine zirkulieren. Das M ist auch die Tür zu MISS- (MISSVERSTÄNDNIS).",
      ends:
        "Endungen auf -M sind im Deutschen sehr selten (die Liste passt auf eine Hand). Die Seite dient der Reklamation — jeder erfundene -M-Ausgang verliert den Zug.",
    },
    n: {
      title: "N-Wörtern — der Plural-Anker",
      starts:
        "Das N ist 1 Punkt wert und zirkuliert 9-mal — der häufigste Endkonsonant des Deutschen. N-Öffnungen (NACHT, NUR, NUN) sind kurz, und die Endungen -EN (SINGEN) und -N machen das N zum Anker jedes Plurals.",
      ends:
        "Endungen auf -N sind der Plural-Motor des Deutschen: -EN (FRAUEN, STRASSEN) ist die häufigste Substantiv-Endung. Die Seite -N ist eine der längsten des Spiels — und leicht erweiterbar.",
    },
    o: {
      title: "O-Wörtern — der knappe Vokal",
      starts:
        "Das O ist 2 Punkte wert (im Englischen nur 1) und zirkuliert nur 4-mal — der knappste deutsche Vokal. O-Öffnungen (OBEN, OHNE, OHR) sind kurz, und die -ON-Endungen (NATION, STATION) öffnen Scrabbles. In der deutschen Scrabble-Ökonomie ist das O knapper als das E.",
      ends:
        "Endungen auf -O sind Fremdwörter (PIANO, RADIO, KILO): unerweiterbare defensive Riegel. Wenige Gegner kennen die gültige -O-Liste — perfekt fürs Reklamieren.",
    },
    p: {
      title: "P-Wörtern — die Überraschungs-6",
      starts:
        "Das P ist im deutschen Scrabble 6 PUNKTE wert — doppelt so viel wie im Englischen. Nur zwei P-Steine zirkulieren. P-Öffnungen (POST, PAPIER, PLAN) legen das überraschend wertvolle P auf Doppel-Feldern für 12 Punkte pro Position.",
      ends:
        "Endungen auf -P sind im Deutschen extrem selten (die Liste passt auf eine Hand). Die Seite ist eine Reklamations-Referenz: jeder erfundene -P-Ausgang verliert den Zug.",
    },
    q: {
      title: "Q-Wörtern — zehn Punkte, fast immer mit U",
      starts:
        "Das Q ist im deutschen Scrabble 10 Punkte wert und braucht fast IMMER ein U: QUATSCH, QUARTAL, QUALITAET. Nur ein Q-Stein: die deutsche Q-ohne-U-Liste ist noch kürzer als die englische — warten Sie auf das U und legen Sie dann beide zusammen auf ein Bonusfeld.",
      ends:
        "Wörter auf -Q existieren im deutschen Wörterbuch nicht: die Seite ist eine reine Reklamations-Referenz. Jeder erfundene -Q-Ausgang verliert den Zug.",
    },
    r: {
      title: "R-Wörtern — der Erweiterungs-Riese",
      starts:
        "Das R ist 1 Punkt wert und zirkuliert 6-mal — der vielseitigste deutsche Konsonant. Die Komparativ-Endungen (BESSER, KLEINER) machen das R zur Tür für Adjektiv-Erweiterungen. Die Präfixe VER- und ER- (VERKAUF, ERGEBNIS) verlängern fast alles.",
      ends:
        "Endungen auf -R sind der Komparativ-Motor des Deutschen: BESSER, SCHNELLER, GROESSER. Die -ER-Endungen konvertieren jedes Adjektiv und sind eine der größten Erweiterungsflächen des Spiels.",
    },
    s: {
      title: "S-Wörtern — der Haken-Meister",
      starts:
        "Das S ist 1 Punkt wert, zirkuliert 7-mal, und ist DER Haken-Buchstabe des Deutschen: hängen Sie S an fast jedes Wort für eine Ein-Buchstaben-Erweiterung. Die Präfixe SONDER- und SCHNELL- verlängern alles. Sieben S-Steine: die S-Parität entscheidet knappe Partien.",
      ends:
        "Endungen auf -S sind der Genitiv-Motor des Deutschen (DES KINDES, EIN HAUSES) und machen die -S-Seite zur längsten des Spiels. Jedes Substantiv akzeptiert Genitiv-S: die ultimative Erweiterungsfläche.",
    },
    t: {
      title: "T-Wörtern — der Partizip-Schlüssel",
      starts:
        "Das T ist 1 Punkt wert und zirkuliert 6-mal — der Partizip-Schlüssel des Deutschen: jedes starke Verb wird zu -T/-EN (GEMACHT, GELAUFEN). T-Öffnungen (TAG, TUN, TOD) sind kurz und häufig.",
      ends:
        "Endungen auf -T sind die Partizipien des Deutschen: GEMACHT, GELAUFEN, und die Verben der 3. Person (ER MACHT, SIE LIEBT). Die Seite -T ist eine der erweiterbarsten: -EN dahinter öffnet jede Zeile.",
    },
    u: {
      title: "U-Wörtern — der Umlaut-Wirt",
      starts:
        "Das U ist 1 Punkt wert und zirkuliert 6-mal — der Wirt der deutschen Umlaute (UE wird im Scrabble als U geschrieben: GUTE). U-Öffnungen (UNTER, UEBER, UM) sind die Präfix-Familie des Deutschen. Halten Sie ein U wenn das Q noch draußen ist: es ist der Türöffner.",
      ends:
        "Endungen auf -U sind im Deutschen extrem selten (die Liste passt auf eine Hand): die Seite dient der Reklamation. Jeder erfundene -U-Ausgang verliert den Zug.",
    },
    v: {
      title: "V-Wörtern — acht Punkte pro Stein",
      starts:
        "Das V ist im deutschen Scrabble 8 PUNKTE wert — doppelt so viel wie im Englischen. Zwei V-Steine zirkulieren. V-Öffnungen (VATER, VOLK, VIEL) sind alltäglich: das V legt sich früher als im Englischen. Auf einem Doppel-Feld: 16 Punkte.",
      ends:
        "Endungen auf -V existieren im deutschen Wörterbuch nicht: die Seite ist eine reine Reklamations-Referenz. Jeder erfundene -V-Ausgang verliert den Zug.",
    },
    w: {
      title: "W-Wörtern — der Frage-Anker",
      starts:
        "Das W ist 3 Punkte wert im deutschen Scrabble (4 im Englischen) und öffnet die W-Frage-Wörter (WER, WAS, WANN, WO, WIE) — die häufigsten Wörter des Deutschen. Vier W-Steine zirkulieren: das W ist der häufigste Anlaut der Fragepronomen.",
      ends:
        "Endungen auf -W existieren im deutschen Wörterbuch nicht: die Seite ist eine Reklamations-Referenz. Lernen Sie die kurze Liste fürs Reklamieren.",
    },
    x: {
      title: "X-Wörtern — zehn Punkte",
      starts:
        "Das X ist im deutschen Scrabble 10 PUNKTE wert (8 im Englischen) — einer der teuersten Steine. Nur ein X zirkuliert. Deutsche X-Wörter sind Fremdwörter (XYLOPHON, XENON): die X-Liste ist kurz, aber jedes Doppel-Feld zahlt 20 Punkte.",
      ends:
        "Endungen auf -X existieren im deutschen Wörterbuch nicht: die Seite ist eine reine Reklamations-Referenz. Jeder erfundene -X-Ausgang verliert den Zug.",
    },
    y: {
      title: "Y-Wörtern — zehn Punkte Diskretion",
      starts:
        "Das Y ist im deutschen Scrabble 10 PUNKTE wert (4 im Englischen) — einer der wertvollsten Steine, aber nur in Fremdwörtern platzierbar (SYSTEM, TYPO, YOGA). Nur ein Y zirkuliert: warten Sie auf die Mittelposition (SYSTEM, PHYSIK) und kassieren Sie das Doppel-Feld.",
      ends:
        "Endungen auf -Y existieren im deutschen Wörterbuch nicht: die Seite ist eine Reklamations-Referenz. Jeder erfundene -Y-Ausgang verliert den Zug.",
    },
    z: {
      title: "Z-Wörtern — der deutsche Alltagstier",
      starts:
        "Das Z ist im deutschen Scrabble nur 3 Punkte wert (10 im Englischen), aber der ALLTAGSBuchstabe des Deutschen (ZEIT, ZU, ZWEI, ZEHN). Vier Z-Steine zirkulieren — das Z ist der Arbeitstier-Buchstabe des Sprachspiels: es eröffnet jede dritte deutsche Wortfamilie.",
      ends:
        "Endungen auf -Z existieren im deutschen Wörterbuch nicht: die Seite ist eine Reklamations-Referenz. Konzentrieren Sie sich auf Mittelpositionen für den wahren Wert.",
    },
  },
  lengths: {
    "2": "Zwei-Buchstaben-Wörter sind das Judo des deutschen Scrabble — kleine Züge, große Wirkung.",
    "3": "Drei-Buchstaben-Wörter gleiten durch blockierte Bahnen.",
    "4": "Vier-Buchstaben-Wörter balancieren Punkte und Flexibilität.",
    "5": "Fünf-Buchstaben-Wörter sind die Wordle-Königslänge.",
    "6": "Sechs-Buchstaben-Wörter kreuzen blockierte Zonen mit Gewicht.",
    "7": "Sieben-Buchstaben-Wörter sind die Scrabble-Länge: alle 7 Steine legen für +50.",
    "8": "Acht-Buchstaben-Wörter kreuzen zwei Bahnen und dominieren offene Bretter.",
    "9": "Neun-Buchstaben-Wörter brauchen Platz, zahlen aber Dreifach-Zeilen.",
    "10": "Zehn-Buchstaben-Wörter leeren das Gestell in einem Zug.",
    "11": "Elf-Buchstaben-Wörter sind selten und verheerend.",
    "12": "Zwölf-Buchstaben-Wörter sind das Turnier-Arsenal.",
    "13": "Dreizehn-Buchstaben-Wörter gewinnen Reklamationen.",
    "14": "Vierzehn-Buchstaben-Wörter sind fast theoretisch — aber legal.",
    "15": "Fünfzehn-Buchstaben-Wörter spannen das ganze Brett — die spektakulärsten Züge.",
  },
};

export const WORD_LIST_ARTICLES: Partial<Record<LanguageCode, LangArticleContent>> = {
  en: EN,
  fr: FR,
  es: ES,
  de: DE,
};
