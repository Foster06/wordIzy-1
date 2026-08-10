// src/lib/utils/language-processors.ts
// Pure helpers for converting romaji <-> kana, normalising pinyin, and
// building the sorted anagram keys used by the JA/ZH dictionary indexes.

import { toHiragana, isRomaji, isKana } from "wanakana";

/** Convert romaji input to hiragana. Already-kana input is normalised to hiragana. */
export function romajiToKana(input: string): string {
  if (!input) return "";
  const trimmed = input.trim().toLowerCase();
  if (isKana(trimmed)) return katakanaToHiragana(trimmed);
  if (isRomaji(trimmed)) {
    try {
      return toHiragana(trimmed);
    } catch {
      return trimmed;
    }
  }
  return trimmed;
}

/** Convert katakana code points to their hiragana equivalents. */
export function katakanaToHiragana(input: string): string {
  return input.replace(/[\u30A1-\u30F6]/g, (ch) =>
    String.fromCharCode(ch.charCodeAt(0) - 0x0060)
  );
}

/** Build the sorted anagram key for a kana string (one code point per kana). */
export function sortedKanaKey(kana: string): string {
  if (!kana) return "";
  return [...kana].sort().join("");
}

/** Strip tones, diacritics, and whitespace from pinyin to leave [a-z] only. */
export function cleanPinyin(input: string): string {
  if (!input) return "";
  return input
    .trim()
    .toLowerCase()
    .replace(/[1-5]/g, "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[\s\-'.]/g, "")
    .replace(/[^a-z]/g, "");
}

/** Build the sorted anagram key for a cleaned pinyin string. */
export function sortedPinyinKey(pinyinClean: string): string {
  if (!pinyinClean) return "";
  return [...pinyinClean].sort().join("");
}

/** True when every character of `needle` is available in `haystack` (multiset subset). */
export function canForm(needle: string, haystack: string): boolean {
  if (!needle || !haystack) return false;
  const pool = new Map<string, number>();
  for (const ch of haystack) pool.set(ch, (pool.get(ch) ?? 0) + 1);
  for (const ch of needle) {
    const have = pool.get(ch) ?? 0;
    if (have <= 0) return false;
    pool.set(ch, have - 1);
  }
  return true;
}
