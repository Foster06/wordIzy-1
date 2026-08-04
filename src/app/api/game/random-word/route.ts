import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// Module-level cache: load the dictionary file ONCE per language, not on every request.
// This was the main source of lag — each /api/game/random-word call was re-reading
// a 1-5MB file from disk and parsing ~280k lines.
const dictCache = new Map<string, string[]>();

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

/** Load and cache the dictionary for a given language. Returns 5-8 letter words. */
function getDictionary(lang: string): string[] {
  const cached = dictCache.get(lang);
  if (cached) return cached;

  const LEXICON_MAPPING: Record<string, string[]> = {
    en: ["CSW21.txt", "NWL2023.txt"],
    de: ["DE_FILTERED.txt"],
    es: ["FISE.txt"],
    fr: ["ODS9.txt"],
    nl: ["OpenTaal.txt"],
    pt: ["PT_FILTERED.txt"],
    it: ["ZINGA.txt"],
  };

  const targetedFiles = LEXICON_MAPPING[lang] || ["CSW21.txt"];
  const rootDir = process.cwd();
  let dictPath = "";

  for (const fileName of targetedFiles) {
    const checkPath = path.resolve(rootDir, "data", "scrabble", fileName);
    if (fs.existsSync(checkPath)) {
      dictPath = checkPath;
      break;
    }
  }

  const fallbackDictionary = [
    "AWESOME", "MYSTERY", "SHUFFLE", "DYNAMIC", "SOLVER", "BLITZ",
    "PUZZLE", "VICTORY", "WORDSMITH", "ALPHABET", "CREATIVE", "MATRIX",
  ];

  let words: string[] = [];

  if (dictPath) {
    try {
      let fileContent = fs.readFileSync(dictPath, "utf-8");
      if (fileContent.charCodeAt(0) === 0xfeff) {
        fileContent = fileContent.substr(1);
      }
      const lines = fileContent.split(/\r?\n/);
      for (const rawLine of lines) {
        const line = rawLine.trim();
        if (!line) continue;
        const tokens = line.split(/[\s\t]+/);
        if (!tokens || tokens.length === 0) continue;
        const cleanWord = tokens[0].replace(/[^a-zA-Z]/g, "").trim().toUpperCase();
        if (cleanWord.length >= 5 && cleanWord.length <= 8) {
          words.push(cleanWord);
        }
      }
    } catch (fileError) {
      console.error("File error:", fileError);
    }
  }

  if (!words || words.length === 0) {
    words = fallbackDictionary;
  }

  dictCache.set(lang, words);
  return words;
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

    const words = getDictionary(lang);

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
