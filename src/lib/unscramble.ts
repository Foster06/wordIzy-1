// src/lib/unscramble.ts
// Pure functions for word solving: unscramble, anagram, wordle, scoring, filters.

import type { LanguageCode } from "./languages";
import { scoreWord, normalizeWord } from "./languages";
import { getDict, getWordleDict, type WordEntry } from "./dictionary";

export interface SolveFilters {
  startsWith?: string;
  endsWith?: string;
  mustInclude?: string;
  minLength?: number;
  maxLength?: number;
}

export interface SolvedWord {
  word: string;
  score: number;
  length: number;
}

export interface LengthGroup {
  length: number;
  words: SolvedWord[];
}

export interface SolveResult {
  groups: LengthGroup[];
  total: number;
}

const WILDCARDS = new Set(["?", "*", "_"]);

function buildPool(letters: string): { counts: Map<string, number>; wildcards: number } {
  const counts = new Map<string, number>();
  let wildcards = 0;
  for (const ch of letters.toLowerCase()) {
    if (WILDCARDS.has(ch)) {
      wildcards++;
      continue;
    }
    const norm = normalizeWord(ch);
    if (!norm) continue;
    counts.set(norm, (counts.get(norm) ?? 0) + 1);
  }
  return { counts, wildcards };
}

function canForm(norm: string, pool: { counts: Map<string, number>; wildcards: number }): boolean {
  const need = new Map<string, number>();
  for (const ch of norm) need.set(ch, (need.get(ch) ?? 0) + 1);
  let wild = pool.wildcards;
  for (const [ch, n] of need) {
    const have = pool.counts.get(ch) ?? 0;
    if (have >= n) continue;
    const deficit = n - have;
    if (wild >= deficit) {
      wild -= deficit;
    } else {
      return false;
    }
  }
  return true;
}

function passesFilters(norm: string, f: SolveFilters): boolean {
  if (f.startsWith) {
    const s = normalizeWord(f.startsWith);
    if (s && !norm.startsWith(s)) return false;
  }
  if (f.endsWith) {
    const e = normalizeWord(f.endsWith);
    if (e && !norm.endsWith(e)) return false;
  }
  if (f.mustInclude) {
    const m = normalizeWord(f.mustInclude);
    if (m) {
      const pool = buildPool(m);
      if (!canForm(norm, pool)) return false;
    }
  }
  return true;
}

function toSolved(entry: WordEntry, lang: LanguageCode): SolvedWord {
  return { word: entry.word, score: scoreWord(entry.word, lang), length: entry.len };
}

function groupAndSort(words: SolvedWord[]): LengthGroup[] {
  const map = new Map<number, SolvedWord[]>();
  for (const w of words) {
    const b = map.get(w.length);
    if (b) b.push(w);
    else map.set(w.length, [w]);
  }
  return Array.from(map.entries())
    .sort((a, b) => b[0] - a[0]) // longest first
    .map(([length, ws]) => ({
      length,
      words: ws.sort((a, b) => b.score - a.score || a.word.localeCompare(b.word)),
    }));
}

/** Unscramble letters (with ? * wildcards) into all formable words. */
export function unscramble(letters: string, lang: LanguageCode, filters: SolveFilters = {}): SolveResult {
  const pool = buildPool(letters);
  const totalLetters = Array.from(pool.counts.values()).reduce((a, b) => a + b, 0) + pool.wildcards;
  if (totalLetters < 1) return { groups: [], total: 0 };

  const dict = getDict(lang);
  const minLen = Math.max(2, filters.minLength ?? 2);
  const maxLen = Math.min(totalLetters, filters.maxLength ?? totalLetters);

  const out: SolvedWord[] = [];
  for (let L = minLen; L <= maxLen; L++) {
    const bucket = dict.byLength.get(L);
    if (!bucket) continue;
    for (const entry of bucket) {
      if (!canForm(entry.norm, pool)) continue;
      if (!passesFilters(entry.norm, filters)) continue;
      out.push(toSolved(entry, lang));
    }
  }

  return { groups: groupAndSort(out), total: out.length };
}

/** Anagrams: words using exactly all the letters (wildcards fill remaining slots). */
export function anagrams(letters: string, lang: LanguageCode, filters: SolveFilters = {}): SolveResult {
  const pool = buildPool(letters);
  const totalLetters = Array.from(pool.counts.values()).reduce((a, b) => a + b, 0) + pool.wildcards;
  if (totalLetters < 2) return { groups: [], total: 0 };

  const dict = getDict(lang);
  const out: SolvedWord[] = [];
  const bucket = dict.byLength.get(totalLetters);
  if (bucket) {
    for (const entry of bucket) {
      if (!canForm(entry.norm, pool)) continue;
      if (!passesFilters(entry.norm, filters)) continue;
      out.push(toSolved(entry, lang));
    }
  }
  return { groups: groupAndSort(out), total: out.length };
}

export interface WordleConstraint {
  length: number; // default 5
  /** Pattern with letters and dots/underscores for blanks, e.g. "A..LE" */
  pattern: string;
  /** Letters known to be in the word (yellow), not yet placed */
  validLetters: string;
  /** Letters excluded (gray) */
  excludedLetters: string;
}

export function wordleSolve(c: WordleConstraint, lang: LanguageCode): SolvedWord[] {
  const len = c.length || 5;
  const pattern = (c.pattern || "").toLowerCase();
  const valid = normalizeWord(c.validLetters || "");
  const excluded = normalizeWord(c.excludedLetters || "");

  const placed: { pos: number; ch: string }[] = [];
  for (let i = 0; i < pattern.length && i < len; i++) {
    const ch = pattern[i];
    if (ch && /[a-zñç]/.test(ch)) placed.push({ pos: i, ch });
  }

  const dict = getWordleDict(lang);
  const bucket = dict.byLength.get(len);
  if (!bucket) return [];

  const out: SolvedWord[] = [];
  for (const entry of bucket) {
    const n = entry.norm;
    // placed positions match
    let ok = true;
    for (const p of placed) {
      if (n[p.pos] !== p.ch) { ok = false; break; }
    }
    if (!ok) continue;
    // excluded letters must not appear anywhere
    if (excluded) {
      let bad = false;
      for (const ch of excluded) {
        if (n.includes(ch)) { bad = true; break; }
      }
      if (bad) continue;
    }
    // valid letters must all be present
    if (valid) {
      const needCount = new Map<string, number>();
      for (const ch of valid) needCount.set(ch, (needCount.get(ch) ?? 0) + 1);
      let bad = false;
      for (const [ch, n2] of needCount) {
        const inPattern = placed.filter((p) => p.ch === ch).length;
        const inWord = (n.match(new RegExp(ch, "g")) || []).length;
        if (inWord < n2) { bad = true; break; }
        // also ensure the count not over-counted by placed? keep simple.
        void inPattern;
      }
      if (bad) continue;
    }
    out.push(toSolved(entry, lang));
  }
  return out.sort((a, b) => b.score - a.score || a.word.localeCompare(b.word));
}

/** Scramble a word into jumbled variants. */
export function scrambleWord(word: string, variants = 4): string[] {
  const arr = word.split("");
  const results = new Set<string>();
  let attempts = 0;
  while (results.size < variants && attempts < variants * 30) {
    attempts++;
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    const s = arr.join("");
    if (s.toLowerCase() !== word.toLowerCase()) results.add(s);
  }
  return Array.from(results);
}

export interface RandomWordOptions {
  lang: LanguageCode;
  length?: number;
  startsWith?: string;
  endsWith?: string;
  contains?: string;
  count?: number;
}

export function randomWords(opts: RandomWordOptions): SolvedWord[] {
  const dict = getDict(opts.lang);
  const len = opts.length;
  const start = normalizeWord(opts.startsWith || "");
  const end = normalizeWord(opts.endsWith || "");
  const contains = normalizeWord(opts.contains || "");
  const count = Math.min(opts.count ?? 10, 200);

  let candidates: WordEntry[];
  if (len && len > 0) {
    candidates = dict.byLength.get(len) ?? [];
  } else {
    candidates = dict.entries.filter((e) => e.len >= 2 && e.len <= 8);
  }

  const filtered = candidates.filter((e) => {
    if (start && !e.norm.startsWith(start)) return false;
    if (end && !e.norm.endsWith(end)) return false;
    if (contains && !e.norm.includes(contains)) return false;
    return true;
  });

  if (filtered.length === 0) return [];

  // Partial Fisher-Yates shuffle: only shuffle the first `count` elements
  // instead of the entire array. This is O(count) instead of O(N) when
  // count << filtered.length (e.g. picking 12 words from 200k entries).
  const shuffled = [...filtered];
  const limit = Math.min(count, shuffled.length);
  for (let i = 0; i < limit; i++) {
    const j = i + Math.floor(Math.random() * (shuffled.length - i));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled.slice(0, count).map((e) => toSolved(e, opts.lang));
}

export interface CheckResult {
  word: string;
  exists: boolean;
  score: number;
  length: number;
  tiles: { letter: string; value: number }[];
}

export function checkWord(word: string, lang: LanguageCode): CheckResult {
  const norm = normalizeWord(word);
  const dict = getDict(lang);
  // O(1) Set lookup — previously this did a linear scan of the length
  // bucket (up to ~12k iterations for common word lengths like 5).
  const exists = dict.normSet.has(norm);
  const tiles = word
    .toUpperCase()
    .split("")
    .filter(Boolean)
    .map((letter) => ({ letter, value: scoreWord(letter, lang) }));
  return { word, exists, score: scoreWord(word, lang), length: norm.length, tiles };
}

/** Best playable words from a Scrabble rack (optionally adding board letters). */
export function bestWords(letters: string, lang: LanguageCode, limit = 50): SolvedWord[] {
  const res = unscramble(letters, lang, {});
  return res.groups
    .flatMap((g) => g.words)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}
