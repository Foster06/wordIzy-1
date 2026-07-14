export interface ToolMeta {
  title: string;
  description: string;
  keywords: string[];
}

export const TOOL_METADATA_REGISTRY: Record<string, ToolMeta> = {
  "unscrambler": {
    title: "Word Unscrambler — Unscramble Letters Into Words",
    description: "The fastest official word unscrambler tool. Turn scrambled letters into valid words for Scrabble, Words with Friends, and crossword puzzles instantly.",
    keywords: ["word unscrambler", "unscramble letters", "scramble solver", "word finder"]
  },
  "anagram": {
    title: "Anagram Solver — Find All Possible Hidden Anagrams",
    description: "An advanced online anagram solver tool. Input any word or letter combination to instantly generate valid direct anagrams and sub-anagram combinations.",
    keywords: ["anagram solver", "anagram maker", "solve anagrams", "hidden words finder"]
  },
  "wordle": {
    title: "Wordle Solver — Daily Cheat & Word Pattern Helper",
    description: "Stuck on your daily puzzle? Use our Wordle solver to filter word choices by green, yellow, and gray letter positions to save your winning streak.",
    keywords: ["wordle solver", "wordle cheat", "wordle helper", "wordle answer finder"]
  },
  "quordle": {
    title: "Quordle Solver — Advanced 4-in-1 Word Game Helper",
    description: "Solve all four grid puzzles simultaneously. Our interactive Quordle solver tracks complex character rules to isolate valid game choices instantly.",
    keywords: ["quordle solver", "quordle helper", "quordle cheat", "quordle answer"]
  }
};
