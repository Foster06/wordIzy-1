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

/** Build the canonical URL path for a config. Always uses the preferred pattern.
 *  When `lang` is provided (and not "en"), prefixes with /{lang}/ so localized
 *  editions get their own crawlable URL (e.g. /fr/unscramble-5-letter-words). */
export function buildCanonicalWordListUrl(config: WordListConfig, lang?: string): string {
  const dict = config.dict ?? "scrabble";
  let path: string;
  if (dict === "wordle") {
    if (config.type === "starts") path = `/wordle-words-starts-with-${config.value}`;
    else path = `/wordle-words-ends-with-${config.value}`;
  } else if (config.type === "length") {
    path = `/unscramble-${config.value}-letter-words`;
  } else if (config.type === "starts") {
    path = `/words-starts-with-${config.value}`;
  } else {
    path = `/words-ends-with-${config.value}`;
  }
  return lang && lang !== "en" ? `/${lang}${path}` : path;
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

/** Prefix a path with /{lang}/ when a localized variant exists. */
function prefixLang(path: string, lang?: string): string {
  return lang && lang !== "en" ? `/${lang}${path}` : path;
}

/** Build prev/next sibling links within the same family. When `lang` is
 *  provided, sibling + index links are prefixed with /{lang}/ so navigation
 *  stays within the localized edition. */
export function buildWordListSiblingLinks(config: WordListConfig, lang?: string): WordListSiblings {
  const dict = config.dict ?? "scrabble";

  if (config.type === "length") {
    const n = config.value as number;
    const idx = WORD_LIST_LENGTHS.indexOf(n);
    const prev = idx > 0 ? { href: prefixLang(`/unscramble-${WORD_LIST_LENGTHS[idx - 1]}-letter-words`, lang), label: `${WORD_LIST_LENGTHS[idx - 1]}-Letter Words` } : null;
    const next = idx >= 0 && idx < WORD_LIST_LENGTHS.length - 1 ? { href: prefixLang(`/unscramble-${WORD_LIST_LENGTHS[idx + 1]}-letter-words`, lang), label: `${WORD_LIST_LENGTHS[idx + 1]}-Letter Words` } : null;
    return { prev, next, familyLabel: "Unscramble by Length", indexHref: prefixLang("/wordlists", lang) };
  }

  const letter = String(config.value).toLowerCase();
  const idx = ALPHABET_LOWER.indexOf(letter);

  if (dict === "wordle") {
    const famLabel = config.type === "starts" ? "Wordle Words Starting With A-Z" : "Wordle Words Ending With A-Z";
    const indexHref = prefixLang(config.type === "starts" ? "/wordle-starts" : "/wordle-ends", lang);
    const p = config.type === "starts" ? "/wordle-words-starts-with-" : "/wordle-words-ends-with-";
    const prev = idx > 0 ? { href: prefixLang(`${p}${ALPHABET_LOWER[idx - 1]}`, lang), label: ALPHABET_UPPER[idx - 1] } : null;
    const next = idx >= 0 && idx < ALPHABET_LOWER.length - 1 ? { href: prefixLang(`${p}${ALPHABET_LOWER[idx + 1]}`, lang), label: ALPHABET_UPPER[idx + 1] } : null;
    return { prev, next, familyLabel: famLabel, indexHref };
  }

  // Scrabble
  const famLabel = config.type === "starts" ? "Words Starts With A-Z" : "Words Ends With A-Z";
  const indexHref = prefixLang(config.type === "starts" ? "/wordstarts" : "/wordends", lang);
  const p = config.type === "starts" ? "/words-starts-with-" : "/words-ends-with-";
  const prev = idx > 0 ? { href: prefixLang(`${p}${ALPHABET_LOWER[idx - 1]}`, lang), label: ALPHABET_UPPER[idx - 1] } : null;
  const next = idx >= 0 && idx < ALPHABET_LOWER.length - 1 ? { href: prefixLang(`${p}${ALPHABET_LOWER[idx + 1]}`, lang), label: ALPHABET_UPPER[idx + 1] } : null;
  return { prev, next, familyLabel: famLabel, indexHref };
}

/** Enumerate ALL canonical word-list slugs (the 118 programmatic pages that
 *  appear in the English sitemap: 14 length + 26 starts + 26 ends + 26 wordle
 *  starts + 26 wordle ends). Used by generateStaticParams + sitemap to
 *  enumerate localized variants (118 × 8 langs = 944 localized URLs). */
export function getAllWordListSlugs(): string[] {
  const slugs: string[] = [];
  for (const n of WORD_LIST_LENGTHS) slugs.push(`unscramble-${n}-letter-words`);
  for (const l of ALPHABET_LOWER) slugs.push(`words-starts-with-${l}`);
  for (const l of ALPHABET_LOWER) slugs.push(`words-ends-with-${l}`);
  for (const l of ALPHABET_LOWER) slugs.push(`wordle-words-starts-with-${l}`);
  for (const l of ALPHABET_LOWER) slugs.push(`wordle-words-ends-with-${l}`);
  return slugs;
}
