// src/app/actions/dictionary-seo.ts
// Server action that fetches words for programmatic SEO pages.
// Uses the in-memory dictionary (getDict) instead of Prisma — works without
// seeding the database and is much faster (no DB round-trip).

"use server";

import { getDict } from "@/lib/dictionary";
import { scoreWord } from "@/lib/languages";
import type { LanguageCode } from "@/lib/languages";

export interface ProgrammaticWordsResult {
  title: string;
  words: { word: string; score: number }[];
  total: number;
}

export async function getProgrammaticWordList(
  type: "length" | "starts" | "ends",
  value: string,
  lang: LanguageCode = "en"
): Promise<ProgrammaticWordsResult | null> {
  try {
    const dict = getDict(lang);
    const out: { word: string; score: number }[] = [];
    let dynamicTitle = "";

    if (type === "length") {
      const targetLength = parseInt(value, 10);
      if (!Number.isFinite(targetLength) || targetLength < 2 || targetLength > 15) return null;
      dynamicTitle = `${targetLength}-Letter Words`;
      const bucket = dict.byLength.get(targetLength) ?? [];
      for (const entry of bucket) {
        out.push({ word: entry.word, score: scoreWord(entry.word, lang) });
      }
      // Sort by score desc, then alphabetically
      out.sort((a, b) => b.score - a.score || a.word.localeCompare(b.word));
    } else if (type === "starts") {
      const letter = value.toLowerCase();
      dynamicTitle = `Words Starting With "${letter.toUpperCase()}"`;
      // Walk all length buckets, collect words starting with the letter
      for (let l = 2; l <= 15; l++) {
        const bucket = dict.byLength.get(l) ?? [];
        for (const entry of bucket) {
          if (entry.norm.startsWith(letter)) {
            out.push({ word: entry.word, score: scoreWord(entry.word, lang) });
          }
        }
      }
      // Sort alphabetically
      out.sort((a, b) => a.word.toLowerCase().localeCompare(b.word.toLowerCase()));
    } else if (type === "ends") {
      const letter = value.toLowerCase();
      dynamicTitle = `Words Ending With "${letter.toUpperCase()}"`;
      for (let l = 2; l <= 15; l++) {
        const bucket = dict.byLength.get(l) ?? [];
        for (const entry of bucket) {
          if (entry.norm.endsWith(letter)) {
            out.push({ word: entry.word, score: scoreWord(entry.word, lang) });
          }
        }
      }
      out.sort((a, b) => a.word.toLowerCase().localeCompare(b.word.toLowerCase()));
    } else {
      return null;
    }

    return { title: dynamicTitle, words: out, total: out.length };
  } catch (err) {
    console.error("Programmatic SEO word fetch failed:", err);
    return null;
  }
}
