export interface ToolMeta {
  title: string;
  description: string;
  keywords: string[];
  /** Extra robots directives emitted as `<meta name="googlebot">` content.
   *  Used to unlock larger SERP real estate (bigger image previews, full
   *  snippets) for pages that opt in. */
  googleBot?: {
    "max-image-preview"?: "none" | "standard" | "large";
    "max-snippet"?: number;
    "max-video-preview"?: number;
  };
  /** Twitter card copy. When present, generateMetadata emits a full twitter
   *  card (card type, title, description, image) for the page. */
  twitter?: {
    title: string;
    description: string;
  };
}

export const TOOL_METADATA_REGISTRY: Record<string, ToolMeta> = {
  "unscrambler": {
    title: "Word Unscrambler — Unscramble Letters Into Words Fast",
    description: "Free word unscrambler & letter unscrambler. Unscramble letters into valid words for Scrabble, Words with Friends, Wordle, and crossword puzzles. Wildcards supported, 9 languages, instant results.",
    keywords: ["word unscrambler","unscramble letters","word finder","unscramble words","scramble solver","letter unscrambler","word unscrambler free","words with friends cheat","jumble solver","word cheat","scrabble word finder","anagram finder","letter rearranger","word maker","unscramble letters into words","word solver","unscramble cheat","word generator from letters","word descrambler"]
  },
  "scramble": {
    title: "Word Scramble Solver — Descramble Jumbled Letters",
    description: "Solve jumble & word scramble puzzles instantly. Descramble letters into valid words for Scrabble, Words with Friends, and crossword puzzles. Free jumble solver with wildcard support.",
    keywords: ["word scramble solver","jumble solver","descramble letters","word scramble","scramble cheat","jumble word solver","unscramble jumbled words","scrambled word finder","word descrambler","jumble puzzle solver","scramble letters solver","word jumble cheat","descramble words","scramble word maker","jumble answer solver","word scramble cheat","unscramble scramble letters","daily jumble solver","word scramble helper"]
  },
  "anagram": {
    title: "Anagram Solver — Find All Possible Hidden Anagrams",
    description: "Free anagram solver & maker. Input any word or letters to find all valid anagrams and sub-anagrams instantly. Perfect for Scrabble, crossword puzzles, and word games. 9 languages.",
    keywords: ["anagram solver","anagram maker","anagram finder","solve anagrams","anagram generator","word anagram solver","letter rearranger","anagram cheat","anagram creator","find anagrams","anagram word finder","multiple word anagram solver","anagram unscrambler","anagram puzzle solver","best anagram solver","free anagram solver","anagram solver online","anagram letters","sub anagram finder"]
  },
  "wordle": {
    title: "Wordle Solver — Daily Cheat & Word Pattern Helper",
    description: "Wordle solver & helper. Filter word choices by green, yellow, and gray letter positions. Find today's Wordle answer fast. Free Wordle cheat with 4-8 letter support.",
    keywords: ["wordle solver","wordle cheat","wordle helper","wordle answer finder","wordle hint","daily wordle solver","wordle today","wordle word finder","wordle answer","wordle clue","wordle guesser","wordle solver tool","wordle pattern solver","wordle cheat sheet","wordle helper tool","wordle answer today","wordle letter solver","wordle word helper","wordle green yellow gray solver"]
  },
  "quordle": {
    title: "Quordle Solver — Advanced 4-in-1 Word Game Helper",
    description: "Solve all four Quordle puzzles simultaneously. Enter green, yellow, and gray constraints per board. Free Quordle solver, cheat, and answer finder for daily puzzles.",
    keywords: ["quordle solver","quordle helper","quordle cheat","quordle answer","quordle word finder","quordle today","4 word puzzle solver","quordle answer today","quordle solver tool","quordle hint","quordle clue","daily quordle solver","quordle cheat sheet","quordle pattern solver","quordle helper tool","quordle answer finder","quordle multi board solver","quordle game solver","quordle daily answer"]
  },
  "scrabble": {
    title: "Scrabble Word Finder — Find Highest-Scoring Plays",
    description: "Scrabble word finder & solver. Enter your rack + board letters to find the highest-scoring Scrabble words. Supports wildcards, 9 languages, official Scrabble dictionary. Free cheat.",
    keywords: ["scrabble solver","scrabble helper","scrabble word finder","scrabble cheat","scrabble word maker","scrabble anagram solver","scrabble score calculator","words with friends solver","scrabble word generator","scrabble dictionary finder","scrabble rack solver","scrabble word checker","scrabble best word finder","scrabble cheat sheet","scrabble letter unscrambler","scrabble word builder","scrabble high score words","scrabble tile solver","scrabble board solver"]
  },
  "random": {
    title: "Random Word Generator — Filter by Length & Letters",
    description: "Free random word generator. Generate random real Scrabble words with filters for length, prefix, suffix, and contains. Perfect for games, writing prompts, passwords, and Pictionary.",
    keywords: ["random word generator","word generator","random words","word list generator","word picker","random word picker","random word","generate random word","random english word generator","word randomizer","random word tool","random vocabulary word generator","random noun generator","random word maker","random word list","random word selector","generate words","random scrabble word generator","random word generator for games"]
  },
  "wordfeud": {
    title: "Wordfeud Helper — Find Best Words from Your Rack",
    description: "Wordfeud helper & solver. Find the best Wordfeud words from your rack. Enter 7 letters + board letters. Supports 9 languages, blank tiles. Free Wordfeud cheat & word finder.",
    keywords: ["wordfeud helper","wordfeud solver","wordfeud finder","wordfeud cheat","wordfeud word finder","wordfeud best words","wordfeud word generator","wordfeud tile solver","wordfeud rack solver","wordfeud cheat tool","wordfeud helper tool","wordfeud anagram solver","wordfeud word maker","wordfeud score calculator","wordfeud word builder","wordfeud dictionary finder","wordfeud word checker","wordfeud high score words","wordfeud letter solver"]
  },
  "dictionary": {
    title: "Scrabble Dictionary Checker — Verify Words & Scores",
    description: "Check if a word is valid in the official Scrabble dictionary. See Scrabble score, definition, and synonyms. 9 languages supported. Free word checker & dictionary lookup.",
    keywords: ["scrabble dictionary","check scrabble word","word lookup","scrabble word checker","is it a word","scrabble valid word","word validator","dictionary check","scrabble dictionary online","official scrabble dictionary","scrabble word list","scrabble word search","scrabble accepted words","scrabble word verification","scrabble word score checker","scrabble twl dictionary","scrabble csw dictionary","word definition scrabble","scrabble word database"]
  },
  "wordlists": {
    title: "Unscramble by Length — 2 to 15 Letter Word Lists",
    description: "Browse every valid Scrabble word by length, from 2-letter to 15-letter words. Official Scrabble dictionary, sorted by score. Free word lists for Scrabble, Wordle & anagram study.",
    keywords: ["2 letter words","3 letter words","4 letter words","5 letter words","6 letter words","7 letter words","scrabble word lists","words by length","word lists by length","scrabble word lengths","short scrabble words","long scrabble words","bingo words","unscramble by length","2 letter scrabble words","3 letter scrabble words","5 letter scrabble words","7 letter scrabble words","scrabble word list by length"]
  },
  "wordstarts": {
    title: "Words Starts With A-Z — Browse Scrabble Words by Letter",
    description: "Browse all valid Scrabble words that start with each letter A-Z. Filter by word length 2-15. Perfect for studying openings, hooks, and high-scoring Scrabble plays. Free word lists.",
    keywords: ["words starts with","words beginning with","words that start with","scrabble words by letter","starting letter word list","words starting with a","words starting with q","words starting with x","scrabble opening words","word list by starting letter","words beginning with a","words that begin with","words that start with letter","scrabble words starting with","words starting with b","words starting with c","words starting with s","words that start with a to z"]
  },
  "wordends": {
    title: "Words Ends With A-Z — Browse Scrabble Words by Ending",
    description: "Browse all valid Scrabble words that end with each letter A-Z. Filter by word length 2-15. Find hooks, suffixes, and high-scoring endings for Scrabble. Free word lists.",
    keywords: ["words ends with","words ending in","words that end with","scrabble words by ending","ending letter word list","words ending with e","words ending with s","words ending with z","words ending with d","scrabble suffix words","word list by ending letter","words ending in a","words that end in","words that end with letter","scrabble words ending with","words ending with ing","words ending with ed","words ending with er","words that end with a to z"]
  },
  "wordle-starts": {
    title: "Wordle Words Starting With A-Z — Best Starting Words",
    description: "Browse all valid Wordle words that start with each letter A-Z. Find the best Wordle starting words, filter by length, and narrow down your daily puzzle. Free Wordle word lists.",
    keywords: ["wordle words starting with","wordle starting words","best wordle starts","wordle words by letter","wordle words that start with","wordle starting word list","best wordle starting words","wordle words beginning with","wordle word list by letter","wordle words starting with a","wordle words starting with s","wordle words starting with t","wordle opening words","wordle first word","wordle words a to z","wordle starter words","wordle words by starting letter","wordle starting letters","best wordle first words"]
  },
  "wordle-ends": {
    title: "Wordle Words Ending With A-Z — Hooks & Suffixes",
    description: "Browse all valid Wordle words that end with each letter A-Z. Find hooks, suffixes, and ending patterns to narrow down your daily Wordle puzzle. Free Wordle word lists.",
    keywords: ["wordle words ending with","wordle ending words","wordle words by ending","wordle hooks","wordle words that end with","wordle ending word list","wordle words ending in","wordle word list by ending letter","wordle words ending with e","wordle words ending with s","wordle words ending with y","wordle suffix words","wordle words ending in a","wordle ending letters","wordle words a to z ending","wordle last letter words","wordle words by ending","wordle ending patterns","wordle words ending with d"]
  },
  "about": {
    title: "About Us — Our Mission & Word Game Tools",
    description: "Learn more about wordIzy, our mission to build fast, intuitive dictionary tools, and how we help players master Scrabble, Wordle, and crossword puzzles.",
    keywords: ["about wordizy","free word unscrambler","word tools","scrabble helper online","word game tools","anagram solver online","wordle helper free","scrabble word finder online","unscramble letters free","word unscrambler tool","free scrabble solver","word puzzle solver","letter unscrambler tool","word finder tool","word game helper","multi language word solver","free word tools online","no sign up word unscrambler","wordizy about"]
  },
  "contact": {
    title: "Contact wordIzy",
    description: "Get in touch with the wordIzy team. Send feedback, suggestions, or bug reports about our word unscrambler, anagram solver, Scrabble helper, Wordle solver, and word tools.",
    keywords: ["contact wordizy","word tools support","scrabble solver feedback","word unscrambler contact","anagram solver support","wordle helper contact","word game tools feedback","scrabble word finder support","word unscrambler help","word solver contact form","wordizy contact","word tools bug report","scrabble helper feedback","word game solver support","word finder tool contact","letter unscrambler support","word puzzle tools contact","free word tools support","wordizy feedback"]
  },
  "privacy": {
    title: "Privacy Policy",
    description: "Read the wordIzy privacy policy. Learn how we handle cookies, browser local storage, and our partnership with Google AdSense to serve advertisements.",
    keywords: ["privacy policy","wordizy privacy","cookies advertising","google adsense privacy","browser local storage","privacy policy word tools","wordizy cookie policy","third party advertising policy","dart cookie opt out","save vault privacy","local storage word tools","gdpr word tools","ccpa word unscrambler","scrabble helper privacy","word unscrambler privacy","children online privacy","browser storage privacy","online privacy policy","adsense cookies policy"]
  },
  "sitemap": {
    title: "Sitemap — Browse All wordIzy Word Tools & Word Lists",
    description: "All pages on wordIzy: word unscrambler, anagram solver, Wordle solver, Quordle solver, Scrabble word finder, word lists by letter and length, Wordle word lists, and more.",
    keywords: ["sitemap","wordizy sitemap","word unscrambler pages","scrabble solver index","word tools directory","word game tools list","scrabble word finder pages","wordle solver pages","anagram solver pages","word list pages","word unscrambler sitemap","scrabble helper pages","word finder directory","word solver tool list","word game solver index","all word tools","word unscrambler tools list","scrabble tools directory","wordle tools sitemap"]
  },
  "blitz": {
    title: "Anagram Blitz — Free Online Word Unscramble Game (Play 60-Second Challenge)",
    description: "Play Anagram Blitz free — the fast, fun word unscramble game! Race the clock to unscramble words in 60-second rounds. Daily word challenges, endless practice mode, brain-training vocabulary puzzles from official Scrabble dictionaries. No download, no sign-up — play instantly in your browser and beat your high score!",
    // ~80 high-traffic search terms across the game / word-game / unscramble
    // / anagram / jumble / brain-game query space. Grouped by intent so the
    // list stays maintainable.
    keywords: [
      // — Core game & brand —
      "anagram blitz",
      "anagram blitz game",
      "anagram game",
      "anagram games",
      "anagram game online",
      "free anagram game",
      "play anagram online",
      "play anagram game",
      "anagram practice",
      "anagram puzzle",
      "anagram puzzle game",
      "anagrams",
      "anagram maker",
      // — Word games (highest-traffic head terms) —
      "word games",
      "word games online",
      "word games free",
      "free word games",
      "word games online free",
      "free online word games",
      "play word games",
      "word games no download",
      "word games for adults",
      "word games for kids",
      "fun word games",
      "word game online",
      "free word game online",
      "play word game free",
      "browser word game",
      "word game no signup",
      "word game no login",
      "mobile word game",
      "word games in english",
      // — Unscramble query space —
      "word unscramble game",
      "word unscrambler game",
      "unscramble words game",
      "unscramble words",
      "word unscrambler",
      "unscramble letters",
      "unscramble letters game",
      "letter unscramble game",
      "word unscrambling practice",
      "unscramble challenge",
      "word unscramble challenge",
      // — Scramble & jumble query space —
      "word scramble",
      "word scramble game",
      "word scramble games",
      "scramble word game",
      "scrambled words",
      "jumble game",
      "word jumble",
      "jumble word game",
      "daily jumble game",
      // — Speed / timed rounds —
      "60 second word game",
      "word game 60 seconds",
      "1 minute word game",
      "timed word game",
      "word game with timer",
      "word racing game",
      "word speed game",
      "speed word game",
      "fast word game",
      "quick word game",
      "word sprint",
      // — Daily-challenge traffic (Wordle-adjacent) —
      "daily word challenge",
      "daily word game",
      "daily anagram",
      "daily anagram challenge",
      "word of the day game",
      "daily puzzle game",
      "games like wordle",
      // — Brain / vocabulary / education —
      "brain games",
      "word brain games",
      "vocabulary game",
      "spelling game",
      "typing word game",
      "educational word games",
      "word puzzle game",
      "word puzzle games online",
      "word puzzle challenge",
      "letter game online",
      "word builder game",
      "word maker game",
      "scrabble practice",
      "scrabble word game",
      "word challenge game",
      "word challenge online",
    ],
    // Unlock big image previews + full snippets in Google search results for
    // the game page — improves CTR on high-traffic queries.
    googleBot: {
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
    twitter: {
      title: "Play Anagram Blitz — Free 60-Second Word Unscramble Game",
      description:
        "Race the clock to unscramble words! Free online anagram game with daily challenges and infinite practice mode. No download, no sign-up — play instantly.",
    },
  },
};
