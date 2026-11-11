// src/lib/scrabble-word-data.ts
// Server-side data layer for /scrabble-words/[word] pages.
// Parses NWL2023.txt (North American Scrabble tournament list, with definitions)
// and CSW21.txt (Collins international list) to answer "Is X a valid Scrabble word?"
// for any query — including non-words like "zave" or "izy" that searchers ask about.
//
// MUST only be imported from server code (uses fs, path, require).

import * as fs from "fs";
import * as path from "path";
import { normalizeWord, LANGUAGES, type LanguageCode } from "./languages";

export interface ScrabbleWordData {
  /** The query word, normalized (lowercase, no diacritics). */
  word: string;
  /** Display form (uppercase for Scrabble convention). */
  display: string;
  /** Length in letters. */
  length: number;
  /** True if the word is in the NWL2023 (Tournament Word List) dict. */
  inNWL: boolean;
  /** True if the word is in the CSW21 (Collins Scrabble Words) dict. */
  inCSW: boolean;
  /** True if valid in at least one of the two dictionaries. */
  valid: boolean;
  /** Scrabble point value (sum of letter values, no multipliers). */
  points: number;
  /** Per-letter breakdown: { letter, value, count } aggregated across the word. */
  letterBreakdown: { letter: string; value: number; count: number }[];
  /** Definition from NWL2023 (null if not in NWL or no definition available). */
  definition: string | null;
  /** Part of speech from NWL2023 (e.g. "n", "v", "adj", "interj"). null if N/A. */
  partOfSpeech: string | null;
  /** Plural / inflected forms from NWL2023 (e.g. "ABS" for AB). null if N/A. */
  inflections: string | null;
  /** Validity in other languages' Scrabble dictionaries (French, Spanish,
   *  Italian, Dutch official lists + German/Portuguese word lists). */
  otherLanguages: OtherLanguageResult[];
  /** Subset of otherLanguages where valid === true (empty if none). */
  validInOtherLanguages: OtherLanguageResult[];
}

interface NWLEntry {
  word: string;
  definition: string;
  partOfSpeech: string;
  inflections: string;
}

// ── Other-language Scrabble dictionaries ──────────────────────────────
// International Scrabble is played with language-specific official
// dictionaries, which the site already ships in data/scrabble/ (they also
// power the localized games): ODS9 (French), FISE (Spanish), Zingarelli
// (Italian) and OpenTaal (Dutch) are the official Scrabble dictionaries for
// their languages; German and Portuguese use wordIzy's filtered word lists
// (no freely-licensed official Scrabble dictionary exists for them — the
// same lists the German/Portuguese games use). Every /scrabble-words/[word]
// page reports the word's validity in all of them, so a visitor checking a
// word from their own language learns it is playable there even when it is
// not a valid English Scrabble word.
export interface OtherLanguageResult {
  lang: LanguageCode;
  /** English language name, e.g. "French". */
  languageName: string;
  /** Dictionary name, e.g. "ODS9" or "wordIzy word list". */
  dictName: string;
  /** True for an official Scrabble dictionary (vs. a general word list). */
  official: boolean;
  valid: boolean;
}

interface OtherDictDef {
  lang: LanguageCode;
  file: string;
  languageName: string;
  dictName: string;
  official: boolean;
}

const OTHER_DICTS: OtherDictDef[] = [
  { lang: "fr", file: "ODS9.txt", languageName: "French", dictName: "ODS9", official: true },
  { lang: "es", file: "FISE.txt", languageName: "Spanish", dictName: "FISE", official: true },
  { lang: "it", file: "ZINGA.txt", languageName: "Italian", dictName: "Zingarelli", official: true },
  { lang: "nl", file: "OpenTaal.txt", languageName: "Dutch", dictName: "OpenTaal", official: true },
  { lang: "de", file: "DE_FILTERED.txt", languageName: "German", dictName: "wordIzy word list", official: false },
  { lang: "pt", file: "PT_FILTERED.txt", languageName: "Portuguese", dictName: "wordIzy word list", official: false },
];

const otherDictSets = new Map<string, Set<string>>();

/** Lazily load (and cache) one of the other-language dictionary files.
 *  Entries are normalized with the site-wide convention (lowercase,
 *  diacritics stripped) and restricted to pure ASCII letters 2-15 — the
 *  /scrabble-words/[word] URL space only accepts [a-z]{2,15}, so non-ASCII
 *  forms can never be queried and are skipped to keep the Sets lean. */
function getOtherDictSet(file: string): Set<string> {
  const cached = otherDictSets.get(file);
  if (cached) return cached;
  const set = new Set<string>();
  const filepath = path.join(DATA_DIR, file);
  if (fs.existsSync(filepath)) {
    const content = fs.readFileSync(filepath, "utf8");
    for (const line of content.split("\n")) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const norm = normalizeWord(trimmed.split(/\s/)[0]);
      if (!norm || norm.length < 2 || norm.length > 15) continue;
      if (!/^[a-z]+$/.test(norm)) continue;
      set.add(norm);
    }
  }
  otherDictSets.set(file, set);
  return set;
}

// ── Module-level caches ────────────────────────────────────────────────
// Built lazily on first access, then reused for every word lookup.
let nwlMap: Map<string, NWLEntry> | null = null;
let nwlSet: Set<string> | null = null;
let cswSet: Set<string> | null = null;
let allValidByLength: Map<number, string[]> | null = null;

const DATA_DIR = path.join(process.cwd(), "data", "scrabble");

/** Parse a single NWL2023.txt line into { word, definition, partOfSpeech, inflections }.
 *  Line format: "WORD definition text [PARTOFSPEECH INFLECTIONS]"
 *  Examples:
 *    "AB a muscle in the abdomen [n ABS]"
 *    "AE one [adj]"
 *    "AH to {aah=v} [v AHED, AHING, AHS]"
 *  Returns null if the line doesn't match the expected shape. */
function parseNWLLine(line: string): NWLEntry | null {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith("#")) return null;

  // Match: WORD space (definition) space [bracketed POS+inflections] at end
  // The definition may itself contain {word=pos} cross-refs and nested text.
  const bracketMatch = trimmed.match(/^(.+?)\s*\[([^\]]+)\]$/);
  if (!bracketMatch) {
    // No bracket — malformed or a header line; skip.
    return null;
  }
  const [, head, bracket] = bracketMatch;
  // head = "WORD definition text" — split on first whitespace to get WORD
  const headMatch = head.match(/^(\S+)\s+(.*)$/);
  if (!headMatch) return null;
  const [, word, definitionRaw] = headMatch;
  if (!word || !/^[a-zA-Z]+$/.test(word)) return null;

  // Bracket = "n ABS" or "adj" or "v AHED, AHING, AHS"
  const bracketParts = bracket.trim().split(/\s+/);
  const partOfSpeech = bracketParts[0] || "";
  const inflections = bracketParts.slice(1).join(" ").trim() || "";

  // Clean the definition: {word=pos} cross-refs → keep the word (e.g.
  // "{clever=adj}" → "clever"), strip bare {word} refs keeping the word,
  // strip ALL [bracketed] POS/inflection sections (NWL entries can have
  // multiple sense divisions), strip trailing ": WORD" cross-reference
  // fragments, and collapse whitespace.
  const definition = definitionRaw
    .replace(/\{([^}=]+)=[^}]*\}/g, "$1")
    .replace(/\{([^}]+)\}/g, "$1")
    .replace(/\[[^\]]*\]/g, "")
    // Strip ": DERIVED, WORDS" lists — NWL lists derived forms after a colon
    // in UPPERCASE (e.g. ": FITLY , FITNESS"). Definitions are lowercase, so
    // only UPPERCASE runs are affected.
    .replace(/\s*:\s*[A-Z]+(?:\s*,\s*[A-Z]+)*/g, "")
    .replace(/\s{2,}/g, " ")
    .replace(/^\s*\/\s*/, "")
    .replace(/\s*\/\s*$/, "")
    .replace(/\s*[,:]\s*$/, "")
    .trim();

  return {
    word,
    definition: definition || "(no definition available)",
    partOfSpeech: partOfSpeech || "",
    inflections,
  };
}

/** Lazily build (and cache) the NWL2023 map: normalizedWord → NWLEntry. */
function getNWLMap(): Map<string, NWLEntry> {
  if (nwlMap) return nwlMap;
  const filepath = path.join(DATA_DIR, "NWL2023.txt");
  if (!fs.existsSync(filepath)) {
    nwlMap = new Map();
    nwlSet = new Set();
    return nwlMap;
  }
  const content = fs.readFileSync(filepath, "utf8");
  const map = new Map<string, NWLEntry>();
  const set = new Set<string>();
  for (const line of content.split("\n")) {
    const entry = parseNWLLine(line);
    if (!entry) continue;
    const norm = normalizeWord(entry.word);
    if (!norm || norm.length < 2 || norm.length > 15) continue;
    if (!/^[a-zñç]+$/.test(norm)) continue;
    // First definition wins (NWL is roughly alphabetical, so the base form
    // usually appears before inflected variants).
    if (!map.has(norm)) map.set(norm, entry);
    set.add(norm);
  }
  nwlMap = map;
  nwlSet = set;
  return nwlMap;
}

/** Lazily build (and cache) the NWL2023 word set. */
function getNWLSet(): Set<string> {
  if (nwlSet) return nwlSet;
  getNWLMap();
  return nwlSet!;
}

/** Lazily build (and cache) the CSW21 word set (no definitions — CSW21 format
 *  is too messy to parse cleanly, so we only use it for validity checks). */
function getCSWSet(): Set<string> {
  if (cswSet) return cswSet;
  const filepath = path.join(DATA_DIR, "CSW21.txt");
  if (!fs.existsSync(filepath)) {
    cswSet = new Set();
    return cswSet;
  }
  const content = fs.readFileSync(filepath, "utf8");
  const set = new Set<string>();
  for (const line of content.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const token = trimmed.split(/\s/)[0];
    const norm = normalizeWord(token);
    if (!norm || norm.length < 2 || norm.length > 15) continue;
    if (!/^[a-zñç]+$/.test(norm)) continue;
    set.add(norm);
  }
  cswSet = set;
  return cswSet;
}

/** Compute the per-letter breakdown and total Scrabble point value for a word.
 *  Uses the English letter-values table from languages.ts (A=1, Q=10, Z=10, etc.). */
function computeLetterBreakdown(word: string): {
  points: number;
  letterBreakdown: { letter: string; value: number; count: number }[];
} {
  const def = LANGUAGES.en;
  const counts = new Map<string, number>();
  let points = 0;
  for (const ch of word.toUpperCase()) {
    const value = def.letterValues[ch] ?? 0;
    points += value;
    counts.set(ch, (counts.get(ch) ?? 0) + 1);
  }
  const letterBreakdown = Array.from(counts.entries())
    .map(([letter, count]) => ({
      letter,
      value: def.letterValues[letter] ?? 0,
      count,
    }))
    .sort((a, b) => b.count - a.count || b.value - a.value || a.letter.localeCompare(b.letter));
  return { points, letterBreakdown };
}

/** Main lookup: get full ScrabbleWordData for any query word (valid or not).
 *  This is the function called by /scrabble-words/[word]/page.tsx. */
export function getScrabbleWordData(rawWord: string): ScrabbleWordData {
  const word = normalizeWord(rawWord);
  const display = word.toUpperCase();
  const length = word.length;

  const nwl = getNWLSet();
  const csw = getCSWSet();
  const inNWL = nwl.has(word);
  const inCSW = csw.has(word);
  const valid = inNWL || inCSW;

  const { points, letterBreakdown } = computeLetterBreakdown(word);

  let definition: string | null = null;
  let partOfSpeech: string | null = null;
  let inflections: string | null = null;
  if (inNWL) {
    const entry = getNWLMap().get(word);
    if (entry) {
      definition = entry.definition;
      partOfSpeech = entry.partOfSpeech || null;
      inflections = entry.inflections || null;
    }
  }

  const otherLanguages: OtherLanguageResult[] = OTHER_DICTS.map((d) => ({
    lang: d.lang,
    languageName: d.languageName,
    dictName: d.dictName,
    official: d.official,
    valid: getOtherDictSet(d.file).has(word),
  }));

  return {
    word,
    display,
    length,
    inNWL,
    inCSW,
    valid,
    points,
    letterBreakdown,
    definition,
    partOfSpeech,
    inflections,
    otherLanguages,
    validInOtherLanguages: otherLanguages.filter((r) => r.valid),
  };
}

/** Quick validity check — used by the index page and internal links. */
export function isValidScrabbleWord(rawWord: string): boolean {
  const word = normalizeWord(rawWord);
  return getNWLSet().has(word) || getCSWSet().has(word);
}

/** Get all valid Scrabble words in a length range, sorted alphabetically.
 *  Used by generateStaticParams and the sitemap. */
export function getAllValidScrabbleWords(minLen: number, maxLen: number): string[] {
  if (!allValidByLength) {
    // Build per-length buckets from the union of NWL + CSW.
    const buckets = new Map<number, string[]>();
    const seen = new Set<string>();
    for (const norm of getNWLSet()) {
      if (!seen.has(norm)) {
        seen.add(norm);
        const len = norm.length;
        if (!buckets.has(len)) buckets.set(len, []);
        buckets.get(len)!.push(norm);
      }
    }
    for (const norm of getCSWSet()) {
      if (!seen.has(norm)) {
        seen.add(norm);
        const len = norm.length;
        if (!buckets.has(len)) buckets.set(len, []);
        buckets.get(len)!.push(norm);
      }
    }
    for (const bucket of buckets.values()) bucket.sort();
    allValidByLength = buckets;
  }
  const result: string[] = [];
  for (let len = minLen; len <= maxLen; len++) {
    const bucket = allValidByLength.get(len);
    if (bucket) result.push(...bucket);
  }
  return result;
}

/** Get a sample of valid words for a length (for the index page's "popular words"
 *  section). Returns a spread across the alphabet for diversity. */
export function getSampleValidWords(len: number, count: number): string[] {
  const all = getAllValidScrabbleWords(len, len);
  if (all.length <= count) return all;
  const step = Math.floor(all.length / count);
  const sample: string[] = [];
  for (let i = 0; i < all.length && sample.length < count; i += step) {
    sample.push(all[i]);
  }
  return sample;
}

// ─────────────────────────────────────────────────────────────────────────────
// LOCALIZED scrabble-words pages (/{lang}/scrabble-words/…)
//
// The six languages that have a Scrabble dictionary on this site (the same
// sources the localized games use — see src/lib/dictionary.ts) get their own
// localized section: /fr/scrabble-words, /es/scrabble-words, … The localized
// word page checks the visitor's language dictionary FIRST (e.g. ODS9 on the
// French page), shows points with that language's official tile values, and
// reports cross-dictionary validity second.
// ─────────────────────────────────────────────────────────────────────────────

/** Languages with a localized /{lang}/scrabble-words section. MUST mirror
 *  DICT_LANGS in src/middleware.ts and SCRABBLE_WORDS_COPY in
 *  src/lib/scrabble-words-i18n.ts. Japanese/Mandarin have no Scrabble
 *  dictionary (romaji/pinyin game lists only) — no localized section. */
export const DICT_LANGS = ["fr", "es", "it", "nl", "de", "pt"] as const;
export type ScrabbleDictLang = (typeof DICT_LANGS)[number];

/** Data for a word on a LOCALIZED /{lang}/scrabble-words/[word] page. */
export interface LocalizedScrabbleWordData {
  /** The query word, normalized (lowercase, diacritics stripped). */
  word: string;
  /** Display form (uppercase, Scrabble convention — accents stripped). */
  display: string;
  length: number;
  /** True if the word is in THIS language's dictionary (the primary check). */
  valid: boolean;
  /** Points using THIS language's official tile values. */
  points: number;
  /** Per-letter breakdown with THIS language's tile values. */
  letterBreakdown: { letter: string; value: number; count: number }[];
  /** Cross-checks: English (NWL2023 / CSW21) + the five other languages. */
  inNWL: boolean;
  inCSW: boolean;
  /** Validity in the other five dictionary languages (self excluded). */
  otherLanguages: OtherLanguageResult[];
  validInOtherLanguages: OtherLanguageResult[];
  /** True when the word is valid in at least one NON-self dictionary. */
  validAnywhereElse: boolean;
}

/** The OTHER_DICTS entry for a dictionary language (file + labels). */
function dictLangDef(lang: ScrabbleDictLang): OtherDictDef {
  const def = OTHER_DICTS.find((d) => d.lang === lang);
  if (!def) throw new Error(`No dictionary registered for lang "${lang}"`);
  return def;
}

/** Public info about a language's Scrabble dictionary (for table rows / prose). */
export function getDictInfo(lang: ScrabbleDictLang): { dictName: string; official: boolean } {
  const def = dictLangDef(lang);
  return { dictName: def.dictName, official: def.official };
}

/** Per-language sorted word lists (built lazily from the same normalized
 *  Sets the English cross-dictionary table uses — identical validity data). */
const langWordsByLength = new Map<string, Map<number, string[]>>();

function getLangWordsByLength(lang: ScrabbleDictLang): Map<number, string[]> {
  const cacheKey = lang;
  const cached = langWordsByLength.get(cacheKey);
  if (cached) return cached;
  const buckets = new Map<number, string[]>();
  for (const word of getOtherDictSet(dictLangDef(lang).file)) {
    const len = word.length;
    const bucket = buckets.get(len);
    if (bucket) bucket.push(word);
    else buckets.set(len, [word]);
  }
  for (const bucket of buckets.values()) bucket.sort();
  langWordsByLength.set(cacheKey, buckets);
  return buckets;
}

/** Objective display-quality filter for SHORT words shown on the localized
 *  index pages and prerendered/sitemapped: a 2- or 3-letter entry must
 *  contain at least one vowel (a, e, i, o, u). The raw lists — especially
 *  OpenTaal and the German/Portuguese word lists — include consonant-only
 *  abbreviation entries (bb, cd, tv, dvd, rsi, lpg …) that are not real
 *  words; they would otherwise be showcased front and center. This affects
 *  display/prerender only — validity checks stay raw and consistent with
 *  the games and the English cross-dictionary table. */
function isShowcaseWord(word: string): boolean {
  if (word.length < 2 || word.length > 3) return true;
  return /[aeiou]/.test(word);
}

// ── Curated native-language short-word filter ───────────────────────────
// The localized /{lang}/scrabble-words pages previously showcased the
// alphabet-spread sample of ALL showcase-quality words in each language's
// dictionary — but every official Scrabble dictionary adopts English
// loanwords (BYE, POP, SLUM, INTERNET, HACKAS …) and shares short-word
// homographs with English (PORT, SON, VOL, VIDE …). A French visitor
// seeing "BYE" and "POP" front and center on /fr/scrabble-words reasonably
// concluded the page was still showing English words.
//
// "Curate official short-word lists per language to fix this at the
// source": the curation rule we apply is — for the showcase samples,
// prerender list and sitemap discovery ONLY — prefer the language's
// NATIVE short words, defined as (in the language's own dictionary) AND
// (NOT in the English NWL2023 ∪ CSW21 short-word set) AND (passes the
// existing isShowcaseWord vowel filter). The validity check itself stays
// raw: BYE/POP/SLUM remain valid French Scrabble words and are still
// reported as valid when a visitor looks them up; they simply no longer
// dominate the index-page showcase or the prerendered/sitemapped URL set.
// When too few native words exist for a length bucket (only the case for
// a few 4-letter+ buckets in practice), the sampler transparently falls
// back to the all-showcase pool so the section stays populated.

/** Lazily-built union of NWL2023 + CSW21 short words (2-3 letters only —
 *  the only lengths where the showcase overlap with English matters).
 *  Used to deprioritize English-shared homographs in the localized
 *  showcase sampler. */
let englishShortSet: Set<string> | null = null;
function getEnglishShortSet(): Set<string> {
  if (englishShortSet) return englishShortSet;
  const s = new Set<string>();
  for (const w of getNWLSet()) {
    if (w.length >= 2 && w.length <= 3) s.add(w);
  }
  for (const w of getCSWSet()) {
    if (w.length >= 2 && w.length <= 3) s.add(w);
  }
  englishShortSet = s;
  return s;
}

/** True if `word` is a "native showcase" word: passes the vowel filter AND
 *  is NOT a valid English Scrabble word. Used to build per-language
 *  curated short-word lists for the localized showcase, prerender and
 *  sitemap samples. */
function isLangNativeShowcaseWord(word: string): boolean {
  if (!isShowcaseWord(word)) return false;
  return !getEnglishShortSet().has(word);
}

/** All valid words of a length in a language's dictionary (sorted). */
export function getLangDictWords(lang: ScrabbleDictLang, len: number): string[] {
  return getLangWordsByLength(lang).get(len) ?? [];
}

/** Alphabet-spread sample of a language's valid words for the localized
 *  index page. Applies the curated native-language showcase filter — i.e.
 *  prefers words that are NOT valid English Scrabble words — so a French
 *  visitor lands on /fr/scrabble-words and sees CE, JE, EU, IL… rather
 *  than BYE, POP, SON. When a length bucket has fewer native words than
 *  `count` (rare for 2-3 letters; can happen for longer lengths where
 *  the English-shared overlap naturally drops), the sampler transparently
 *  falls back to the all-showcase pool so the section is still populated.
 *  Validity checks are unaffected — every word in the language's dict
 *  remains valid when looked up directly. */
export function getSampleLangWords(lang: ScrabbleDictLang, len: number, count: number): string[] {
  const all = getLangDictWords(lang, len);
  const native = all.filter(isLangNativeShowcaseWord);
  // Prefer native-only words; fall back to all showcase words if too few.
  const pool = native.length >= count ? native : all.filter(isShowcaseWord);
  if (pool.length <= count) return pool;
  const step = Math.floor(pool.length / count);
  const sample: string[] = [];
  for (let i = 0; i < pool.length && sample.length < count; i += step) {
    sample.push(pool[i]);
  }
  return sample;
}

/** Words to prerender per language for /{lang}/scrabble-words/[word]: the
 *  curated NATIVE 2-letter words — official Scrabble dictionary words that
 *  are NOT also valid English Scrabble words (so /fr/scrabble-words/ce,
 *  /fr/scrabble-words/je, /fr/scrabble-words/eu … rather than
 *  /fr/scrabble-words/bye or /fr/scrabble-words/son). Highest-intent
 *  localized queries; English-shared homographs and the raw lists'
 *  consonant-only abbreviation junk stay ISR-only. */
export function getLangPrerenderWords(lang: ScrabbleDictLang): string[] {
  return getLangDictWords(lang, 2).filter(isLangNativeShowcaseWord);
}

/** Letter breakdown + points using a language's OFFICIAL tile values. */
function computeLocalizedBreakdown(word: string, lang: ScrabbleDictLang): {
  points: number;
  letterBreakdown: { letter: string; value: number; count: number }[];
} {
  const def = LANGUAGES[lang];
  const counts = new Map<string, number>();
  let points = 0;
  for (const ch of word.toUpperCase()) {
    const value = def.letterValues[ch] ?? 0;
    points += value;
    counts.set(ch, (counts.get(ch) ?? 0) + 1);
  }
  const letterBreakdown = Array.from(counts.entries())
    .map(([letter, count]) => ({
      letter,
      value: def.letterValues[letter] ?? 0,
      count,
    }))
    .sort((a, b) => b.count - a.count || b.value - a.value || a.letter.localeCompare(b.letter));
  return { points, letterBreakdown };
}

/** Main localized lookup: full LocalizedScrabbleWordData for any query word. */
export function getLocalizedScrabbleWordData(
  lang: ScrabbleDictLang,
  rawWord: string
): LocalizedScrabbleWordData {
  const word = normalizeWord(rawWord);
  const display = word.toUpperCase();
  const selfDef = dictLangDef(lang);

  const valid = getOtherDictSet(selfDef.file).has(word);
  const { points, letterBreakdown } = computeLocalizedBreakdown(word, lang);

  const inNWL = getNWLSet().has(word);
  const inCSW = getCSWSet().has(word);

  // The five other dictionary languages (self excluded) — same labels the
  // English cross-dictionary table uses.
  const otherLanguages = OTHER_DICTS.filter((d) => d.lang !== lang).map((d) => ({
    lang: d.lang,
    languageName: d.languageName,
    dictName: d.dictName,
    official: d.official,
    valid: getOtherDictSet(d.file).has(word),
  }));

  return {
    word,
    display,
    length: word.length,
    valid,
    points,
    letterBreakdown,
    inNWL,
    inCSW,
    otherLanguages,
    validInOtherLanguages: otherLanguages.filter((r) => r.valid),
    validAnywhereElse: inNWL || inCSW || otherLanguages.some((r) => r.valid),
  };
}
