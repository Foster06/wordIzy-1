// src/lib/word-list-urls.ts
// Utilities for programmatic word-list pages: slug parsing, URL building,
// title building, and sibling (prev/next) navigation.

export type WordListType = "length" | "starts" | "ends";
export type DictType = "scrabble" | "wordle";
export interface WordListConfig { type: WordListType; value: number | string; dict?: DictType; }
export const WORD_LIST_LENGTHS = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
export const ALPHABET_LOWER = "abcdefghijklmnopqrstuvwxyz".split("");
export const ALPHABET_UPPER = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

/** Parse a single-segment slug into a WordListConfig. Returns null if unrecognized. */
export function parseWordListSlug(slug: string): WordListConfig | null {
  if (!slug || typeof slug !== "string") return null;

  // Scrabble length: /unscramble-5-letter-words
  let m = slug.match(/^unscramble-(\d+)-letter-words$/);
  if (m) { const n = parseInt(m[1], 10); if (n >= 2 && n <= 15) return { type: "length", value: n, dict: "scrabble" }; return null; }
  // Legacy: /5-letter-words
  m = slug.match(/^(\d+)-letter-words$/);
  if (m) { const n = parseInt(m[1], 10); if (n >= 2 && n <= 15) return { type: "length", value: n, dict: "scrabble" }; return null; }

  // Scrabble starts: /words-starts-with-c (preferred), /words-starts-by-c (legacy redirect)
  m = slug.match(/^words-starts-with-([a-z])$/);
  if (m) return { type: "starts", value: m[1], dict: "scrabble" };
  m = slug.match(/^words-starts-by-([a-z])$/);
  if (m) return { type: "starts", value: m[1], dict: "scrabble" };
  m = slug.match(/^words-starting-with-([a-z])$/);
  if (m) return { type: "starts", value: m[1], dict: "scrabble" };

  // Scrabble ends: /words-ends-with-c (preferred), /words-ends-by-c (legacy redirect)
  m = slug.match(/^words-ends-with-([a-z])$/);
  if (m) return { type: "ends", value: m[1], dict: "scrabble" };
  m = slug.match(/^words-ends-by-([a-z])$/);
  if (m) return { type: "ends", value: m[1], dict: "scrabble" };
  m = slug.match(/^words-ending-with-([a-z])$/);
  if (m) return { type: "ends", value: m[1], dict: "scrabble" };

  // Wordle starts: /wordle-words-starts-with-c
  m = slug.match(/^wordle-words-starts-with-([a-z])$/);
  if (m) return { type: "starts", value: m[1], dict: "wordle" };

  // Wordle ends: /wordle-words-ends-with-c
  m = slug.match(/^wordle-words-ends-with-([a-z])$/);
  if (m) return { type: "ends", value: m[1], dict: "wordle" };

  return null;
}

export function isWordListPage(segment: string): boolean {
  return parseWordListSlug(segment) !== null;
}

/** Build the canonical URL path for a config. Always uses the preferred pattern. */
export function buildCanonicalWordListUrl(config: WordListConfig): string {
  const dict = config.dict ?? "scrabble";
  if (dict === "wordle") {
    if (config.type === "starts") return `/wordle-words-starts-with-${config.value}`;
    return `/wordle-words-ends-with-${config.value}`;
  }
  // Scrabble
  if (config.type === "length") return `/unscramble-${config.value}-letter-words`;
  if (config.type === "starts") return `/words-starts-with-${config.value}`;
  return `/words-ends-with-${config.value}`;
}

/** Build a human-readable title for a config. */
export function buildWordListTitle(config: WordListConfig): string {
  const dict = config.dict ?? "scrabble";
  const prefix = dict === "wordle" ? "Wordle " : "";
  if (config.type === "length") return `${config.value}-Letter Words`;
  const letter = String(config.value).toUpperCase();
  if (config.type === "starts") return `${prefix}Words Starting With "${letter}"`;
  return `${prefix}Words Ending With "${letter}"`;
}

export interface WordListSiblings {
  prev: { href: string; label: string } | null;
  next: { href: string; label: string } | null;
  familyLabel: string;
  indexHref: string;
}

/** Build prev/next sibling links within the same family. */
export function buildWordListSiblingLinks(config: WordListConfig): WordListSiblings {
  const dict = config.dict ?? "scrabble";

  if (config.type === "length") {
    const n = config.value as number;
    const idx = WORD_LIST_LENGTHS.indexOf(n);
    const prev = idx > 0 ? { href: `/unscramble-${WORD_LIST_LENGTHS[idx - 1]}-letter-words`, label: `${WORD_LIST_LENGTHS[idx - 1]}-Letter Words` } : null;
    const next = idx >= 0 && idx < WORD_LIST_LENGTHS.length - 1 ? { href: `/unscramble-${WORD_LIST_LENGTHS[idx + 1]}-letter-words`, label: `${WORD_LIST_LENGTHS[idx + 1]}-Letter Words` } : null;
    return { prev, next, familyLabel: "Unscramble by Length", indexHref: "/wordlists" };
  }

  const letter = String(config.value).toLowerCase();
  const idx = ALPHABET_LOWER.indexOf(letter);

  if (dict === "wordle") {
    const famLabel = config.type === "starts" ? "Wordle Words Starting With A-Z" : "Wordle Words Ending With A-Z";
    const indexHref = config.type === "starts" ? "/wordle-starts" : "/wordle-ends";
    const prefix = config.type === "starts" ? "/wordle-words-starts-with-" : "/wordle-words-ends-with-";
    const prev = idx > 0 ? { href: `${prefix}${ALPHABET_LOWER[idx - 1]}`, label: ALPHABET_UPPER[idx - 1] } : null;
    const next = idx >= 0 && idx < ALPHABET_LOWER.length - 1 ? { href: `${prefix}${ALPHABET_LOWER[idx + 1]}`, label: ALPHABET_UPPER[idx + 1] } : null;
    return { prev, next, familyLabel: famLabel, indexHref };
  }

  // Scrabble
  const famLabel = config.type === "starts" ? "Words Starts With A-Z" : "Words Ends With A-Z";
  const indexHref = config.type === "starts" ? "/wordstarts" : "/wordends";
  const prefix = config.type === "starts" ? "/words-starts-with-" : "/words-ends-with-";
  const prev = idx > 0 ? { href: `${prefix}${ALPHABET_LOWER[idx - 1]}`, label: ALPHABET_UPPER[idx - 1] } : null;
  const next = idx >= 0 && idx < ALPHABET_LOWER.length - 1 ? { href: `${prefix}${ALPHABET_LOWER[idx + 1]}`, label: ALPHABET_UPPER[idx + 1] } : null;
  return { prev, next, familyLabel: famLabel, indexHref };
}
