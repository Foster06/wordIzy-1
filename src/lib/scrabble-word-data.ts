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
