// src/lib/word-list-data.ts
// SERVER-ONLY module: shared word-list data layer used by both the
// /api/word-list API route and the SSR page renderer.
//
// Exposes:
//   - getCachedList(slug, lang)         -> full filtered+sorted list (cached)
//   - getInitialWordListPage(slug, lang) -> first page + metadata for SSR
//
// MUST only be imported from server code (API routes / server components).

import { getDict, getWordleDict } from "@/lib/dictionary";
import { scoreWord } from "@/lib/languages";
import type { LanguageCode } from "@/lib/languages";
import { parseWordListSlug } from "@/lib/word-list-urls";

export interface WordListEntry {
  word: string;
  score: number;
  len: number;
}

export interface CachedWordList {
  title: string;
  words: WordListEntry[];
  lengthCounts: Record<number, number>;
}

// Module-level cache: the filtered+sorted word list for a (slug, lang) pair is
// deterministic, so we compute it ONCE and reuse. Without this, every paginated
// request re-scanned all 14 length buckets (25k+ entries for popular letters).
const listCache = new Map<string, CachedWordList>();

/** Build (or fetch from cache) the full filtered+sorted list for a slug+lang. */
export function getCachedList(slug: string, lang: LanguageCode): CachedWordList | null {
  const cacheKey = `${slug}:${lang}`;
  const cached = listCache.get(cacheKey);
  if (cached) return cached;

  const config = parseWordListSlug(slug);
  if (!config) return null;

  // Use Wordle dictionary for Wordle slugs, Scrabble dictionary otherwise.
  const dict = config.dict === "wordle" ? getWordleDict(lang) : getDict(lang);
  const matched: WordListEntry[] = [];
  const lengthCounts: Record<number, number> = {};
  for (let n = 2; n <= 15; n++) lengthCounts[n] = 0;
  let title = "";
  const dictPrefix = config.dict === "wordle" ? "Wordle " : "";

  if (config.type === "length") {
    const targetLength = config.value as number;
    title = `${targetLength}-Letter Words`;
    const bucket = dict.byLength.get(targetLength) ?? [];
    lengthCounts[targetLength] = bucket.length;
    for (const entry of bucket) {
      matched.push({ word: entry.word, score: scoreWord(entry.word, lang), len: entry.len });
    }
    matched.sort((a, b) => b.score - a.score || a.word.localeCompare(b.word));
  } else if (config.type === "starts" || config.type === "ends") {
    const letter = String(config.value).toLowerCase();
    title = config.type === "starts"
      ? `${dictPrefix}Words Starting With "${letter.toUpperCase()}"`
      : `${dictPrefix}Words Ending With "${letter.toUpperCase()}"`;
    const check = config.type === "starts"
      ? (norm: string) => norm.startsWith(letter)
      : (norm: string) => norm.endsWith(letter);
    for (let l = 2; l <= 15; l++) {
      const bucket = dict.byLength.get(l) ?? [];
      for (const entry of bucket) {
        if (check(entry.norm)) {
          lengthCounts[l]++;
          matched.push({ word: entry.word, score: scoreWord(entry.word, lang), len: entry.len });
        }
      }
    }
    matched.sort((a, b) => a.word.toLowerCase().localeCompare(b.word.toLowerCase()));
  } else {
    return null;
  }

  const result: CachedWordList = { title, words: matched, lengthCounts };
  listCache.set(cacheKey, result);
  return result;
}

export interface InitialWordListPage {
  title: string;
  words: { word: string; score: number }[];
  total: number;
  offset: number;
  limit: number;
  lengthCounts: Record<number, number>;
}

/**
 * Returns the first page of words (sorted alphabetically) for SSR.
 * The client takes over from this offset for subsequent "Load more" / filters.
 *
 * Default: 50 words, alphabetical sort, no length/query filter — matches the
 * initial client-side state in ProgrammaticSEOView.
 */
export function getInitialWordListPage(
  slug: string,
  lang: LanguageCode = "en",
  limit: number = 50,
): InitialWordListPage | null {
  const cached = getCachedList(slug, lang);
  if (!cached) return null;

  // Initial sort is alphabetical (A→Z), matching ProgrammaticSEOView's
  // default sortMode state.
  const sorted = [...cached.words].sort((a, b) =>
    a.word.toLowerCase().localeCompare(b.word.toLowerCase()),
  );

  const slice = sorted.slice(0, limit).map(({ word, score }) => ({ word, score }));

  return {
    title: cached.title,
    words: slice,
    total: sorted.length,
    offset: 0,
    limit,
    lengthCounts: cached.lengthCounts,
  };
}

/** Exposed for tests / warmup. */
export function clearWordListCache(): void {
  listCache.clear();
}
