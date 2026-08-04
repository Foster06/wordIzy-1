import { NextRequest, NextResponse } from "next/server";
import type { LanguageCode } from "@/lib/languages";
import { getDict } from "@/lib/dictionary";
import { scoreWord } from "@/lib/languages";
import { wordlistsLimiter, getClientIp } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const revalidate = 86400;

const CACHE_HEADERS = {
  "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=43200",
};

/** Browse words by length and (optionally) starting/ending letter. */
export async function GET(req: NextRequest) {
  if (wordlistsLimiter.hit(getClientIp(req))) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }
  const lang = (req.nextUrl.searchParams.get("lang") || "en") as LanguageCode;
  const length = Number(req.nextUrl.searchParams.get("length")) || 0;
  const mode = (req.nextUrl.searchParams.get("mode") || "all") as "all" | "starts" | "ends";
  const letter = (req.nextUrl.searchParams.get("letter") || "").toLowerCase();
  const offset = Math.max(0, Number(req.nextUrl.searchParams.get("offset")) || 0);
  const limit = Math.min(2000, Math.max(1, Number(req.nextUrl.searchParams.get("limit")) || 200));

  if (length < 2) return NextResponse.json({ words: [], total: 0 }, { headers: CACHE_HEADERS });

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

  return NextResponse.json({ words: slice, total, length, letter, mode }, { headers: CACHE_HEADERS });
}
