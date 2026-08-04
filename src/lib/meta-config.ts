export interface ToolMeta {
  title: string;
  description: string;
  keywords: string[];
}

export const TOOL_METADATA_REGISTRY: Record<string, ToolMeta> = {
  "unscrambler": {
    title: "Word Unscrambler — Unscramble Letters Into Words",
    description: "The fastest official word unscrambler tool. Turn scrambled letters into valid words for Scrabble, Words with Friends, and crossword puzzles instantly.",
    keywords: ["word unscrambler", "unscramble letters", "scramble solver", "word finder", "words with friends cheat", "jumble solver"]
  },
  "scramble": {
    title: "Word Scramble Solver — Descramble Jumbled Letters",
    description: "Solve jumble and word-scramble puzzles instantly. Enter scrambled letters and find all valid words for Scrabble, Words with Friends, and crossword puzzles.",
    keywords: ["word scramble solver", "jumble solver", "descramble letters", "word scramble", "scramble cheat"]
  },
  "anagram": {
    title: "Anagram Solver — Find All Possible Hidden Anagrams",
    description: "An advanced online anagram solver tool. Input any word or letter combination to instantly generate valid direct anagrams and sub-anagram combinations.",
    keywords: ["anagram solver", "anagram maker", "solve anagrams", "hidden words finder", "letter rearranger"]
  },
  "wordle": {
    title: "Wordle Solver — Daily Cheat & Word Pattern Helper",
    description: "Stuck on your daily puzzle? Use our Wordle solver to filter word choices by green, yellow, and gray letter positions to save your winning streak.",
    keywords: ["wordle solver", "wordle cheat", "wordle helper", "wordle answer finder", "wordle hint"]
  },
  "quordle": {
    title: "Quordle Solver — Advanced 4-in-1 Word Game Helper",
    description: "Solve all four grid puzzles simultaneously. Our interactive Quordle solver tracks complex character rules to isolate valid game choices instantly.",
    keywords: ["quordle solver", "quordle helper", "quordle cheat", "quordle answer", "4 word puzzle solver"]
  },
  "scrabble": {
    title: "Scrabble Word Finder — Find Highest-Scoring Plays",
    description: "Scrabble solver and word finder. Enter your 7-letter rack and board letters to find the highest-scoring Scrabble words. Supports wildcards and 9 languages.",
    keywords: ["scrabble solver", "scrabble helper", "scrabble word finder", "scrabble cheat", "scrabble word maker"]
  },
  "random": {
    title: "Random Word Generator — Filter by Length & Letters",
    description: "Generate random real Scrabble words with filters for length, prefix, suffix, and contains. Perfect for games, writing prompts, and passwords.",
    keywords: ["random word generator", "word generator", "random words", "word list generator", "word picker"]
  },
  "wordfeud": {
    title: "Wordfeud Helper — Find Best Words from Your Rack",
    description: "Find the best Wordfeud words from your rack. Enter your 7 letters plus board letters. Supports 9 languages and blank tiles. Free Wordfeud cheat.",
    keywords: ["wordfeud helper", "wordfeud solver", "wordfeud finder", "wordfeud cheat", "wordfeud word finder"]
  },
  "dictionary": {
    title: "Scrabble Dictionary Checker — Verify Words & Scores",
    description: "Check if a word is valid in the official Scrabble dictionary. See Scrabble score, definition, and synonyms. 9 languages supported. Free word checker.",
    keywords: ["scrabble dictionary", "check scrabble word", "word lookup", "scrabble word checker", "is it a word"]
  },
  "wordlists": {
    title: "Unscramble by Length — 2 to 15 Letter Word Lists",
    description: "Browse every valid Scrabble word by length, from 2-letter to 15-letter words. Each list is filtered by the official Scrabble dictionary and sorted by score.",
    keywords: ["2 letter words", "3 letter words", "5 letter words", "scrabble word lists", "words by length"]
  },
  "wordstarts": {
    title: "Words Starts With A-Z — Browse Scrabble Words by Letter",
    description: "Browse all valid Scrabble words that start with each letter A-Z. Filter by word length 2-15. Perfect for studying openings, hooks, and high-scoring plays.",
    keywords: ["words starts with", "words beginning with", "words that start with", "scrabble words by letter"]
  },
  "wordends": {
    title: "Words Ends With A-Z — Browse Scrabble Words by Ending",
    description: "Browse all valid Scrabble words that end with each letter A-Z. Filter by word length 2-15. Find hooks, suffixes, and high-scoring endings for Scrabble.",
    keywords: ["words ends with", "words ending in", "words that end with", "scrabble words by ending"]
  },
  "wordlestarts": {
    title: "Wordle Words Starting With A-Z — Best Starting Words",
    description: "Browse all valid Wordle words that start with each letter A-Z. Find the best Wordle starting words, filter by length, and narrow down your daily puzzle.",
    keywords: ["wordle words starting with", "wordle starting words", "best wordle starts", "wordle words by letter"]
  },
  "wordleends": {
    title: "Wordle Words Ending With A-Z — Hooks & Suffixes",
    description: "Browse all valid Wordle words that end with each letter A-Z. Find hooks, suffixes, and ending patterns to narrow down your daily Wordle puzzle.",
    keywords: ["wordle words ending with", "wordle ending words", "wordle words by ending", "wordle hooks"]
  },
  "about": {
    title: "About wordIzy — Free Word Tools & Unscrambler",
    description: "wordIzy is a free, privacy-friendly suite of word tools: unscrambler, anagram solver, Wordle & Quordle solvers, Scrabble helper, and more. No sign-up required.",
    keywords: ["about wordizy", "free word unscrambler", "word tools", "scrabble helper online"]
  },
  "contact": {
    title: "Contact wordIzy",
    description: "Get in touch with the wordIzy team. Send us feedback, suggestions, or bug reports about our word unscrambler, anagram solver, and Scrabble tools.",
    keywords: ["contact wordizy", "word tools support", "scrabble solver feedback"]
  },
  "privacy": {
    title: "Privacy Policy — wordIzy",
    description: "wordIzy does not require an account and does not collect personal data. All solving happens server-side with no permanent storage. 100% anonymous.",
    keywords: ["privacy policy", "wordizy privacy", "anonymous word tools", "no tracking word solver"]
  },
  "sitemap": {
    title: "Sitemap — Browse All wordIzy Word Tools & Word Lists",
    description: "All pages on wordIzy — word unscrambler, anagram solver, Wordle solver, Quordle solver, Scrabble word finder, word lists by letter and length, and more.",
    keywords: ["sitemap", "wordizy sitemap", "word unscrambler pages", "scrabble solver index"]
  },
  "blitz": {
    title: "Anagram Blitz — 60-Second Word Unscramble Game",
    description: "Test your word puzzle skills with Anagram Blitz! Unscramble as many word combinations as you can in 60 seconds and beat your high score.",
    keywords: ["word game", "anagram blitz", "unscramble game", "free word puzzle", "word racing game"]
  },
};
