// src/lib/word-list-urls.ts
// Utilities for programmatic word-list pages: slug parsing, URL building,
// title building, and sibling (prev/next) navigation.

export type WordListType = "length" | "starts" | "ends";
export interface WordListConfig { type: WordListType; value: number | string; }
export const WORD_LIST_LENGTHS = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
export const ALPHABET_LOWER = "abcdefghijklmnopqrstuvwxyz".split("");
export const ALPHABET_UPPER = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

/** Parse a single-segment slug into a WordListConfig. Returns null if unrecognized. */
export function parseWordListSlug(slug: string): WordListConfig | null {
  if (!slug || typeof slug !== "string") return null;
  // /unscramble-5-letter-words
  let m = slug.match(/^unscramble-(\d+)-letter-words$/);
  if (m) { const n = parseInt(m[1], 10); if (n >= 2 && n <= 15) return { type: "length", value: n }; return null; }
  // /5-letter-words (legacy)
  m = slug.match(/^(\d+)-letter-words$/);
  if (m) { const n = parseInt(m[1], 10); if (n >= 2 && n <= 15) return { type: "length", value: n }; return null; }
  // /words-starts-by-c  (user's preferred pattern)
  m = slug.match(/^words-starts-by-([a-z])$/);
  if (m) return { type: "starts", value: m[1] };
  // /words-starts-with-c  (also accept)
  m = slug.match(/^words-starts-with-([a-z])$/);
  if (m) return { type: "starts", value: m[1] };
  // /words-ends-by-c
  m = slug.match(/^words-ends-by-([a-z])$/);
  if (m) return { type: "ends", value: m[1] };
  // /words-ends-with-c
  m = slug.match(/^words-ends-with-([a-z])$/);
  if (m) return { type: "ends", value: m[1] };
  // Legacy: words-starting-with-c / words-ending-with-c
  m = slug.match(/^words-starting-with-([a-z])$/);
  if (m) return { type: "starts", value: m[1] };
  m = slug.match(/^words-ending-with-([a-z])$/);
  if (m) return { type: "ends", value: m[1] };
  return null;
}

export function isWordListPage(segment: string): boolean {
  return parseWordListSlug(segment) !== null;
}

/** Build the canonical URL path for a config. Always uses the preferred pattern. */
export function buildCanonicalWordListUrl(config: WordListConfig): string {
  if (config.type === "length") return `/unscramble-${config.value}-letter-words`;
  if (config.type === "starts") return `/words-starts-by-${config.value}`;
  return `/words-ends-by-${config.value}`;
}

/** Build a human-readable title for a config. */
export function buildWordListTitle(config: WordListConfig): string {
  if (config.type === "length") return `${config.value}-Letter Words`;
  const letter = String(config.value).toUpperCase();
  if (config.type === "starts") return `Words Starting With "${letter}"`;
  return `Words Ending With "${letter}"`;
}

export interface WordListSiblings {
  prev: { href: string; label: string } | null;
  next: { href: string; label: string } | null;
  familyLabel: string;
  indexHref: string;
}

/** Build prev/next sibling links within the same family (length 2→3→...→15, or A→B→...→Z). */
export function buildWordListSiblingLinks(config: WordListConfig): WordListSiblings {
  if (config.type === "length") {
    const n = config.value as number;
    const idx = WORD_LIST_LENGTHS.indexOf(n);
    const prev = idx > 0 ? { href: `/unscramble-${WORD_LIST_LENGTHS[idx - 1]}-letter-words`, label: `${WORD_LIST_LENGTHS[idx - 1]}-Letter Words` } : null;
    const next = idx >= 0 && idx < WORD_LIST_LENGTHS.length - 1 ? { href: `/unscramble-${WORD_LIST_LENGTHS[idx + 1]}-letter-words`, label: `${WORD_LIST_LENGTHS[idx + 1]}-Letter Words` } : null;
    return { prev, next, familyLabel: "Unscramble by Length", indexHref: "/wordlists" };
  }
  const letter = String(config.value).toLowerCase();
  const idx = ALPHABET_LOWER.indexOf(letter);
  const famLabel = config.type === "starts" ? "Words Starts With A-Z" : "Words Ends With A-Z";
  const indexHref = config.type === "starts" ? "/wordstarts" : "/wordends";
  const prefix = config.type === "starts" ? "/words-starts-by-" : "/words-ends-by-";
  const prev = idx > 0 ? { href: `${prefix}${ALPHABET_LOWER[idx - 1]}`, label: ALPHABET_UPPER[idx - 1] } : null;
  const next = idx >= 0 && idx < ALPHABET_LOWER.length - 1 ? { href: `${prefix}${ALPHABET_LOWER[idx + 1]}`, label: ALPHABET_UPPER[idx + 1] } : null;
  return { prev, next, familyLabel: famLabel, indexHref };
}
