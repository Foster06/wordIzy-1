// src/app/api/word-game-dict/route.ts
// Browseable JA/ZH word-game dictionary. Returns paginated, filterable
// slices of the curated romaji/pinyin word lists served by `getDict()`.
//
//   GET /api/word-game-dict?lang=ja&mode=starts&letter=a&limit=50
//   GET /api/word-game-dict?lang=zh&mode=length&length=5&offset=0&limit=50
//   GET /api/word-game-dict?lang=ja&mode=all&q=shi&offset=200&limit=50
//
// Response:
//   { title, words: [{word, score, len}], total, offset, limit, lengthCounts }

import { NextRequest, NextResponse } from "next/server";
import { getDict } from "@/lib/dictionary";
import { scoreWord } from "@/lib/languages";
import { solverLimiter, getClientIp } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const revalidate = 3600; // CDN cache for one hour

const CACHE_HEADERS = {
  "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
};

type Mode = "all" | "starts" | "ends" | "length";

interface CachedList {
  title: string;
  words: { word: string; score: number; len: number }[];
  lengthCounts: Record<number, number>;
}

// Per-(lang, mode, letter, length) cache. The filtered list is deterministic,
// so we compute it ONCE and reuse across paginated requests.
const listCache = new Map<string, CachedList>();

function buildList(
  lang: "ja" | "zh",
  mode: Mode,
  letter: string,
  length: number | undefined
): CachedList | null {
  const cacheKey = `${lang}:${mode}:${letter}:${length ?? 0}`;
  const cached = listCache.get(cacheKey);
  if (cached) return cached;

  const dict = getDict(lang);
  const matched: { word: string; score: number; len: number }[] = [];
  const lengthCounts: Record<number, number> = {};
  for (let n = 2; n <= 20; n++) lengthCounts[n] = 0;

  let title = "";
  const langLabel = lang === "ja" ? "Japanese (Romaji)" : "Mandarin (Pinyin)";

  if (mode === "length") {
    if (!length || length < 2 || length > 20) return null;
    title = `${length}-Letter ${langLabel} Words`;
    const bucket = dict.byLength.get(length) ?? [];
    lengthCounts[length] = bucket.length;
    for (const entry of bucket) {
      matched.push({
        word: entry.word,
        score: scoreWord(entry.word, lang),
        len: entry.len,
      });
    }
    matched.sort((a, b) => b.score - a.score || a.word.localeCompare(b.word));
  } else if (mode === "starts" || mode === "ends") {
    if (!letter) return null;
    const l = letter.toLowerCase();
    title =
      mode === "starts"
        ? `${langLabel} Words Starting With "${l.toUpperCase()}"`
        : `${langLabel} Words Ending With "${l.toUpperCase()}"`;
    const check =
      mode === "starts"
        ? (norm: string) => norm.startsWith(l)
        : (norm: string) => norm.endsWith(l);
    for (let n = 2; n <= 20; n++) {
      const bucket = dict.byLength.get(n) ?? [];
      for (const entry of bucket) {
        if (check(entry.norm)) {
          lengthCounts[n]++;
          matched.push({
            word: entry.word,
            score: scoreWord(entry.word, lang),
            len: entry.len,
          });
        }
      }
    }
    matched.sort((a, b) => a.word.toLowerCase().localeCompare(b.word.toLowerCase()));
  } else {
    // mode === "all"
    title = `${langLabel} Word List`;
    for (const entry of dict.entries) {
      if (entry.len < 2 || entry.len > 20) continue;
      lengthCounts[entry.len] = (lengthCounts[entry.len] ?? 0) + 1;
      matched.push({
        word: entry.word,
        score: scoreWord(entry.word, lang),
        len: entry.len,
      });
    }
    matched.sort((a, b) => a.word.toLowerCase().localeCompare(b.word.toLowerCase()));
  }

  const result: CachedList = { title, words: matched, lengthCounts };
  listCache.set(cacheKey, result);
  return result;
}

export async function GET(req: NextRequest) {
  if (solverLimiter.hit(getClientIp(req))) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  const langParam = (req.nextUrl.searchParams.get("lang") || "").toLowerCase();
  if (langParam !== "ja" && langParam !== "zh") {
    return NextResponse.json(
      { error: "lang must be 'ja' or 'zh'" },
      { status: 400, headers: CACHE_HEADERS }
    );
  }
  const lang = langParam as "ja" | "zh";

  const modeParam = (req.nextUrl.searchParams.get("mode") || "all").toLowerCase();
  const mode: Mode =
    modeParam === "starts" || modeParam === "ends" || modeParam === "length"
      ? modeParam
      : "all";

  const letter = (req.nextUrl.searchParams.get("letter") || "").trim().toLowerCase().slice(0, 4);
  const lengthParam = req.nextUrl.searchParams.get("length");
  const length =
    lengthParam && /^\d+$/.test(lengthParam) ? Number(lengthParam) : undefined;
  const q = (req.nextUrl.searchParams.get("q") || "").trim().toLowerCase();
  const offset = Math.max(0, Number(req.nextUrl.searchParams.get("offset")) || 0);
  const limit = Math.min(
    500,
    Math.max(1, Number(req.nextUrl.searchParams.get("limit")) || 50)
  );

  // Validate mode-specific params.
  if ((mode === "starts" || mode === "ends") && !letter) {
    return NextResponse.json(
      { error: "letter is required for starts/ends mode" },
      { status: 400, headers: CACHE_HEADERS }
    );
  }
  if (mode === "length" && (!length || length < 2 || length > 20)) {
    return NextResponse.json(
      { error: "length must be between 2 and 20" },
      { status: 400, headers: CACHE_HEADERS }
    );
  }

  try {
    const cached = buildList(lang, mode, letter, length);
    if (!cached) {
      return NextResponse.json(
        { error: "Could not build list" },
        { status: 400, headers: CACHE_HEADERS }
      );
    }

    // Optional secondary filters (for "all" + length, or any mode + q).
    let filtered = cached.words;
    if (mode !== "length" && length && length >= 2 && length <= 20) {
      filtered = filtered.filter((w) => w.len === length);
    }
    if (q) {
      filtered = filtered.filter((w) => w.word.toLowerCase().includes(q));
    }

    const total = filtered.length;
    const slice = filtered
      .slice(offset, offset + limit)
      .map(({ word, score }) => ({ word, score }));

    return NextResponse.json(
      {
        title: cached.title,
        words: slice,
        total,
        offset,
        limit,
        lengthCounts: cached.lengthCounts,
      },
      { headers: CACHE_HEADERS }
    );
  } catch (err) {
    console.error("[/api/word-game-dict] failed:", err);
    return NextResponse.json(
      { error: "Failed to load words" },
      { status: 500 }
    );
  }
}
