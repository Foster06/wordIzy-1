// src/lib/types/dictionary.ts
// Type definitions for the Japanese & Chinese word-game dictionary
// architecture. These power the /api/unscramble and /api/word-game-dict
// endpoints for romaji (Japanese) and pinyin (Mandarin) solving.

export interface JapaneseDictionaryEntry {
  kanji: string;
  kana: string;
  sortedKana: string;
  definition: string;
  length: number;
  firstKana: string;
  lastKana: string;
}

export interface ChineseDictionaryEntry {
  simplified: string;
  traditional: string;
  pinyin: string;
  pinyinClean: string;
  sortedPinyin: string;
  definition: string;
  charLength: number;
  firstPinyinChar: string;
  lastPinyinChar: string;
}

export type WordGameEntry = JapaneseDictionaryEntry | ChineseDictionaryEntry;

export interface UnscrambleResponse {
  lang: "ja" | "zh";
  mode: "exact" | "subword";
  input: string;
  count: number;
  results: WordGameEntry[];
  ms: number;
}
