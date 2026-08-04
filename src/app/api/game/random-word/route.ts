import { NextResponse } from "next/server";
import { getDict } from "@/lib/dictionary";
import type { LanguageCode } from "@/lib/languages";

function getDailySeedIndex(arrayLength: number): number {
  const today = new Date();
  const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
  const hash = (seed * 16807) % 2147483647;
  return Math.abs(hash) % arrayLength;
}

function scrambleString(str: string): string {
  const arr = str.toUpperCase().split("");
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  const result = arr.join("");
  return result === str.toUpperCase() ? scrambleString(str) : result;
}

/** Generate a real definition-style hint from the word itself (no external API call). */
function buildHint(word: string): string {
  const w = word.toLowerCase();
  const len = word.length;

  // Definition-style hints based on word structure — gives a real clue without
  // revealing the word. Uses the word's first letter + length + a category hint.
  const firstLetter = w[0]!;
  const lastLetter = w[len - 1]!;

  // Pattern-based hints: common suffixes/prefixes give structural clues
  const hints: string[] = [];

  if (w.endsWith("ing")) {
    hints.push(`A ${len}-letter present participle (verb ending in -ing), starting with "${firstLetter.toUpperCase()}"`);
  } else if (w.endsWith("ed") && len > 4) {
    hints.push(`A ${len}-letter past-tense verb (ends in -ed), starting with "${firstLetter.toUpperCase()}"`);
  } else if (w.endsWith("ly") && len > 4) {
    hints.push(`A ${len}-letter adverb (ends in -ly), starting with "${firstLetter.toUpperCase()}"`);
  } else if (w.endsWith("er") && len > 4) {
    hints.push(`A ${len}-letter comparative or agent noun (ends in -er), starting with "${firstLetter.toUpperCase()}"`);
  } else if (w.endsWith("est") && len > 5) {
    hints.push(`A ${len}-letter superlative (ends in -est), starting with "${firstLetter.toUpperCase()}"`);
  } else if (w.endsWith("s") && len > 4) {
    hints.push(`A ${len}-letter plural noun (ends in -s), starting with "${firstLetter.toUpperCase()}"`);
  } else if (w.endsWith("tion") && len > 5) {
    hints.push(`A ${len}-letter noun of action (ends in -tion), starting with "${firstLetter.toUpperCase()}"`);
  } else if (w.endsWith("ment") && len > 6) {
    hints.push(`A ${len}-letter noun (ends in -ment), starting with "${firstLetter.toUpperCase()}"`);
  } else if (w.endsWith("ness") && len > 6) {
    hints.push(`A ${len}-letter abstract noun (ends in -ness), starting with "${firstLetter.toUpperCase()}"`);
  } else if (w.endsWith("able") && len > 6) {
    hints.push(`A ${len}-letter adjective (ends in -able), starting with "${firstLetter.toUpperCase()}"`);
  } else if (w.endsWith("ous") && len > 5) {
    hints.push(`A ${len}-letter adjective (ends in -ous), starting with "${firstLetter.toUpperCase()}"`);
  } else if (w.endsWith("al") && len > 5) {
    hints.push(`A ${len}-letter adjective or noun (ends in -al), starting with "${firstLetter.toUpperCase()}"`);
  } else if (w.startsWith("un") && len > 5) {
    hints.push(`A ${len}-letter word with the negative prefix "un-", ending in "${lastLetter.toUpperCase()}"`);
  } else if (w.startsWith("re") && len > 5) {
    hints.push(`A ${len}-letter word with the prefix "re-" (again/back), ending in "${lastLetter.toUpperCase()}"`);
  } else if (w.startsWith("pre") && len > 6) {
    hints.push(`A ${len}-letter word with the prefix "pre-" (before), ending in "${lastLetter.toUpperCase()}"`);
  } else {
    // Generic definition-style hint: first letter, length, last letter
    hints.push(`A ${len}-letter English word starting with "${firstLetter.toUpperCase()}" and ending with "${lastLetter.toUpperCase()}"`);
  }

  return hints[0]!;
}

export const runtime = "nodejs";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const rawLang = searchParams.get("lang");
    const mode = searchParams.get("mode") || "infinite";
    const lang = rawLang && rawLang.trim() ? rawLang.toLowerCase() : "en";

    // Pull 5-8 letter words from the shared, lazily-cached dictionary store.
    // Replaces the per-route dictCache Map + getDictionary() that re-read the
    // Scrabble files on every request — the shared getDict() loads each
    // language once and exposes entries bucketed by normalized length.
    const dict = getDict(lang as LanguageCode);
    const words: string[] = [];
    for (let l = 5; l <= 8; l++) {
      const bucket = dict.byLength.get(l) ?? [];
      for (const entry of bucket) {
        words.push(entry.word.toUpperCase());
      }
    }

    const fallbackDictionary = [
      "AWESOME", "MYSTERY", "SHUFFLE", "DYNAMIC", "SOLVER", "BLITZ",
      "PUZZLE", "VICTORY", "WORDSMITH", "ALPHABET", "CREATIVE", "MATRIX",
    ];

    if (words.length === 0) {
      words.push(...fallbackDictionary);
    }

    const targetIndex = mode === "daily" ? getDailySeedIndex(words.length) : Math.floor(Math.random() * words.length);
    const targetWord = words[targetIndex]!.trim().toUpperCase();

    const scrambledWord = scrambleString(targetWord);
    const hint = buildHint(targetWord);

    return NextResponse.json(
      {
        scrambled: scrambledWord,
        answer: targetWord,
        hint,
      },
      {
        headers: {
          // Cache for 1 hour on CDN, serve stale while revalidating.
          // For daily mode, the same word is returned all day so caching is safe.
          // For infinite mode, the random pick happens server-side per request,
          // but the CDN can still cache the dictionary-loaded module.
          "Cache-Control": mode === "daily" ? "public, s-maxage=3600, stale-while-revalidate=86400" : "no-store",
        },
      }
    );
  } catch (error) {
    console.error("[/api/game/random-word] error:", error);
    return NextResponse.json({ scrambled: "PUZZLE", answer: "PUZZLE", hint: "A 6-letter fallback word." });
  }
}
