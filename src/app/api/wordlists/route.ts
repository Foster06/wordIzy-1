import { NextRequest, NextResponse } from "next/server";
import type { LanguageCode } from "@/lib/languages";
import { getDict } from "@/lib/dictionary";
import { scoreWord } from "@/lib/languages";

export const runtime = "nodejs";

/** Browse words by length and (optionally) starting/ending letter. */
export async function GET(req: NextRequest) {
  const lang = (req.nextUrl.searchParams.get("lang") || "en") as LanguageCode;
  const length = Number(req.nextUrl.searchParams.get("length")) || 0;
  const mode = (req.nextUrl.searchParams.get("mode") || "all") as "all" | "starts" | "ends";
  const letter = (req.nextUrl.searchParams.get("letter") || "").toLowerCase();
  const offset = Math.max(0, Number(req.nextUrl.searchParams.get("offset")) || 0);
  const limit = Math.min(500, Math.max(1, Number(req.nextUrl.searchParams.get("limit")) || 200));

  if (length < 2) return NextResponse.json({ words: [], total: 0 });

  const dict = getDict(lang);
  const bucket = dict.byLength.get(length) ?? [];

  let filtered = bucket;
  if (letter && /[a-zñç]/.test(letter)) {
    if (mode === "starts") filtered = bucket.filter((e) => e.norm.startsWith(letter));
    else if (mode === "ends") filtered = bucket.filter((e) => e.norm.endsWith(letter));
  }
  // sort alphabetically by original word (case-insensitive)
  filtered = [...filtered].sort((a, b) => a.word.toLowerCase().localeCompare(b.word.toLowerCase()));

  const total = filtered.length;
  const slice = filtered.slice(offset, offset + limit).map((e) => ({
    word: e.word,
    score: scoreWord(e.word, lang),
    length: e.len,
  }));

  return NextResponse.json({ words: slice, total, length, letter, mode });
}
