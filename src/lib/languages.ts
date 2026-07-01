// src/lib/languages.ts
// Language metadata + Scrabble letter values & tile counts for each supported language.

export type LanguageCode =
  | "en"
  | "es"
  | "fr"
  | "it"
  | "pt"
  | "de"
  | "nl"
  | "ja"
  | "zh";

export interface LanguageDef {
  code: LanguageCode;
  /** Native name shown in language selector */
  nativeName: string;
  englishName: string;
  flag: string;
  /** letter -> points. Multi-letter tiles use multi-char keys (e.g. "CH"). */
  letterValues: Record<string, number>;
  /** letter -> tile count in the full set */
  tileCounts: Record<string, number>;
  blanks: number;
  /** true when the underlying dictionary is curated (romaji/pinyin) */
  curated?: boolean;
}

const EN_VALUES: Record<string, number> = {
  A: 1, E: 1, I: 1, O: 1, U: 1, L: 1, N: 1, R: 1, S: 1, T: 1,
  D: 2, G: 2,
  B: 3, C: 3, M: 3, P: 3,
  F: 4, H: 4, V: 4, W: 4, Y: 4,
  K: 5,
  J: 8, X: 8,
  Q: 10, Z: 10,
};
const EN_COUNTS: Record<string, number> = {
  A: 9, B: 2, C: 2, D: 4, E: 12, F: 2, G: 3, H: 2, I: 9, J: 1,
  K: 1, L: 4, M: 2, N: 6, O: 8, P: 2, Q: 1, R: 6, S: 4, T: 6,
  U: 4, V: 2, W: 2, X: 1, Y: 2, Z: 1,
};

const FR_VALUES: Record<string, number> = {
  E: 1, A: 1, I: 1, N: 1, O: 1, R: 1, S: 1, T: 1, U: 1, L: 1,
  D: 2, M: 2, G: 2,
  B: 3, C: 3, P: 3,
  F: 4, H: 4, V: 4,
  J: 8, Q: 8,
  K: 10, W: 10, X: 10, Y: 10, Z: 10,
};
const FR_COUNTS: Record<string, number> = {
  E: 15, A: 9, I: 8, N: 6, O: 6, R: 6, S: 6, T: 6, U: 6, L: 5,
  D: 3, M: 3, G: 2,
  B: 2, C: 2, P: 2,
  F: 2, H: 2, V: 2,
  J: 1, Q: 1,
  K: 1, W: 1, X: 1, Y: 1, Z: 1,
};

const ES_VALUES: Record<string, number> = {
  A: 1, E: 1, I: 1, O: 1, U: 1, L: 1, N: 1, R: 1, S: 1, T: 1,
  C: 2, D: 2, G: 2,
  B: 3, M: 3, P: 3,
  H: 4, F: 4, V: 4, Y: 4,
  Q: 5, CH: 5,
  J: 8, LL: 8, Ñ: 8, RR: 8, X: 8,
  Z: 10,
};
const ES_COUNTS: Record<string, number> = {
  A: 12, E: 12, I: 6, O: 9, U: 5, L: 4, N: 5, R: 5, S: 6, T: 4,
  C: 4, D: 5, G: 2,
  B: 2, M: 2, P: 2,
  H: 2, F: 1, V: 1, Y: 1,
  Q: 1, CH: 1,
  J: 1, LL: 1, Ñ: 1, RR: 1, X: 1,
  Z: 1,
};

const IT_VALUES: Record<string, number> = {
  A: 1, E: 1, I: 1, O: 1, U: 1, L: 1, N: 1, R: 1, S: 1, T: 1,
  B: 2, C: 2, D: 2, M: 2, P: 2,
  H: 3, V: 3, Z: 3, G: 3,
  F: 5, Q: 5,
};
const IT_COUNTS: Record<string, number> = {
  A: 14, E: 11, I: 12, O: 15, U: 5, L: 5, N: 5, R: 6, S: 6, T: 7,
  B: 3, C: 6, D: 3, M: 5, P: 3,
  H: 2, V: 3, Z: 2, G: 3,
  F: 2, Q: 1,
};

const PT_VALUES: Record<string, number> = {
  A: 1, E: 1, I: 1, O: 1, U: 1, S: 1, M: 1, R: 1, T: 1,
  D: 2, G: 2, L: 2, P: 2, C: 2,
  B: 3, N: 3, Ç: 3,
  F: 4, H: 4, V: 4,
  J: 5,
  Q: 6,
  X: 8, Z: 8,
};
const PT_COUNTS: Record<string, number> = {
  A: 14, E: 11, I: 10, O: 13, U: 7, S: 8, M: 6, R: 6, T: 5,
  D: 5, G: 3, L: 5, P: 4, C: 4,
  B: 3, N: 4, Ç: 2,
  F: 2, H: 2, V: 2,
  J: 2,
  Q: 1,
  X: 1, Z: 1,
};

const DE_VALUES: Record<string, number> = {
  E: 1, N: 1, S: 1, I: 1, R: 1, A: 1, T: 1, U: 1, D: 1,
  H: 2, G: 2, L: 2, O: 2,
  M: 3, B: 3, W: 3, Z: 3,
  C: 4, K: 4, F: 4,
  P: 6,
  J: 8, V: 8,
  Q: 10, X: 10, Y: 10,
};
const DE_COUNTS: Record<string, number> = {
  E: 15, N: 9, S: 7, I: 6, R: 6, A: 6, T: 6, U: 6, D: 8,
  H: 4, G: 4, L: 4, O: 4,
  M: 4, B: 4, W: 4, Z: 4,
  C: 4, K: 4, F: 4,
  P: 2,
  J: 2, V: 2,
  Q: 1, X: 1, Y: 1,
};

const NL_VALUES: Record<string, number> = {
  A: 1, E: 1, I: 1, O: 1, L: 1, N: 1, R: 1, S: 1, T: 1, U: 1,
  D: 2, G: 2, K: 2, M: 2, B: 2, P: 2,
  F: 3, H: 3, J: 3, V: 3, Z: 3, C: 3,
  W: 4,
  X: 5, Y: 5,
  Q: 10,
};
const NL_COUNTS: Record<string, number> = {
  A: 6, E: 18, I: 4, O: 6, L: 4, N: 10, R: 6, S: 5, T: 5, U: 3,
  D: 3, G: 3, K: 3, M: 3, B: 2, P: 2,
  F: 2, H: 2, J: 2, V: 2, Z: 2, C: 2,
  W: 2,
  X: 1, Y: 1,
  Q: 1,
};

// Romaji (Japanese) & Pinyin (Mandarin) reuse English-style values.
export const LANGUAGES: Record<LanguageCode, LanguageDef> = {
  en: {
    code: "en", nativeName: "English", englishName: "English", flag: "🇬🇧",
    letterValues: EN_VALUES, tileCounts: EN_COUNTS, blanks: 2,
  },
  fr: {
    code: "fr", nativeName: "Français", englishName: "French", flag: "🇫🇷",
    letterValues: FR_VALUES, tileCounts: FR_COUNTS, blanks: 2,
  },
  es: {
    code: "es", nativeName: "Español", englishName: "Spanish", flag: "🇪🇸",
    letterValues: ES_VALUES, tileCounts: ES_COUNTS, blanks: 2,
  },
  it: {
    code: "it", nativeName: "Italiano", englishName: "Italian", flag: "🇮🇹",
    letterValues: IT_VALUES, tileCounts: IT_COUNTS, blanks: 2,
  },
  pt: {
    code: "pt", nativeName: "Português", englishName: "Portuguese", flag: "🇵🇹",
    letterValues: PT_VALUES, tileCounts: PT_COUNTS, blanks: 2,
  },
  de: {
    code: "de", nativeName: "Deutsch", englishName: "German", flag: "🇩🇪",
    letterValues: DE_VALUES, tileCounts: DE_COUNTS, blanks: 2,
  },
  nl: {
    code: "nl", nativeName: "Nederlands", englishName: "Dutch", flag: "🇳🇱",
    letterValues: NL_VALUES, tileCounts: NL_COUNTS, blanks: 2,
  },
  ja: {
    code: "ja", nativeName: "日本語 (Romaji)", englishName: "Japanese", flag: "🇯🇵",
    letterValues: EN_VALUES, tileCounts: EN_COUNTS, blanks: 2, curated: true,
  },
  zh: {
    code: "zh", nativeName: "中文 (Pinyin)", englishName: "Mandarin", flag: "🇨🇳",
    letterValues: EN_VALUES, tileCounts: EN_COUNTS, blanks: 2, curated: true,
  },
};

export const LANGUAGE_LIST = Object.values(LANGUAGES);

/** Score a single word using a language's letter values (multi-letter tiles ignored for scoring simplicity). */
export function scoreWord(word: string, lang: LanguageCode): number {
  const values = LANGUAGES[lang].letterValues;
  let total = 0;
  for (const ch of word.toUpperCase()) {
    total += values[ch] ?? 0;
  }
  return total;
}

/** Group a language's tiles by point value, for the "Scrabble tile values" panel. */
export function tilesByValue(lang: LanguageCode): { value: number; tiles: { letter: string; count: number }[] }[] {
  const def = LANGUAGES[lang];
  const map = new Map<number, { letter: string; count: number }[]>();
  for (const [letter, value] of Object.entries(def.letterValues)) {
    if (!map.has(value)) map.set(value, []);
    map.get(value)!.push({ letter, count: def.tileCounts[letter] ?? 0 });
  }
  return Array.from(map.entries())
    .sort((a, b) => a[0] - b[0])
    .map(([value, tiles]) => ({
      value,
      tiles: tiles.sort((a, b) =>
        a.letter.length === b.letter.length
          ? a.letter.localeCompare(b.letter)
          : b.letter.length - a.letter.length
      ),
    }));
}

/** Normalize a word: lowercase, strip diacritics, keep only letters (so ASCII input matches accented words). */
export function normalizeWord(word: string): string {
  return word
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-zñç]/g, "");
}
