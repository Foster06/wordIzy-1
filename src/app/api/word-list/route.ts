import { NextRequest, NextResponse } from "next/server";
import { getDict } from "@/lib/dictionary";
import { scoreWord } from "@/lib/languages";
import type { LanguageCode } from "@/lib/languages";
import { parseWordListSlug } from "@/lib/word-list-urls";
import { solverLimiter, getClientIp } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const revalidate = 3600;

// Module-level cache: the filtered+sorted word list for a (slug, lang) pair is
// deterministic, so we compute it ONCE and reuse. Without this, every paginated
// request re-scanned all 14 length buckets (25k+ entries for popular letters).
const listCache = new Map<string, { title: string; words: { word: string; score: number; len: number }[]; lengthCounts: Record<number, number> }>();

/** Build (or fetch from cache) the full filtered+sorted list for a slug+lang. */
function getCachedList(slug: string, lang: LanguageCode) {
  const cacheKey = `${slug}:${lang}`;
  const cached = listCache.get(cacheKey);
  if (cached) return cached;

  const config = parseWordListSlug(slug);
  if (!config) return null;

  const dict = getDict(lang);
  const matched: { word: string; score: number; len: number }[] = [];
  const lengthCounts: Record<number, number> = {};
  for (let n = 2; n <= 15; n++) lengthCounts[n] = 0;
  let title = "";

  if (config.type === "length") {
    const targetLength = config.value as number;
    title = `${targetLength}-Letter Words`;
    const bucket = dict.byLength.get(targetLength) ?? [];
    lengthCounts[targetLength] = bucket.length;
    for (const entry of bucket) {
      matched.push({ word: entry.word, score: scoreWord(entry.word, lang), len: entry.len });
    }
    matched.sort((a, b) => b.score - a.score || a.word.localeCompare(b.word));
  } else if (config.type === "starts" || config.type === "ends") {
    const letter = String(config.value).toLowerCase();
    title = config.type === "starts"
      ? `Words Starting With "${letter.toUpperCase()}"`
      : `Words Ending With "${letter.toUpperCase()}"`;
    const check = config.type === "starts"
      ? (norm: string) => norm.startsWith(letter)
      : (norm: string) => norm.endsWith(letter);
    for (let l = 2; l <= 15; l++) {
      const bucket = dict.byLength.get(l) ?? [];
      for (const entry of bucket) {
        if (check(entry.norm)) {
          lengthCounts[l]++;
          matched.push({ word: entry.word, score: scoreWord(entry.word, lang), len: entry.len });
        }
      }
    }
    matched.sort((a, b) => a.word.toLowerCase().localeCompare(b.word.toLowerCase()));
  } else {
    return null;
  }

  const result = { title, words: matched, lengthCounts };
  listCache.set(cacheKey, result);
  return result;
}

/**
 * GET /api/word-list?slug=words-starts-by-c&lang=en&length=5&q=cat&offset=0&limit=50
 *
 * Server-side pagination + filtering. Returns at most `limit` words (default 50,
 * max 500) instead of the full 25k+ list. The client fetches the next page on
 * demand via the "Load more" button.
 *
 * Response shape:
 *   { title, words: [{word, score}], total, offset, limit, lengthCounts }
 */
export async function GET(req: NextRequest) {
  if (solverLimiter.hit(getClientIp(req))) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }
  const slug = req.nextUrl.searchParams.get("slug") || "";
  const lang = (req.nextUrl.searchParams.get("lang") || "en") as LanguageCode;
  const lengthFilter = req.nextUrl.searchParams.get("length");
  const q = (req.nextUrl.searchParams.get("q") || "").toLowerCase().trim();
  const offset = Math.max(0, Number(req.nextUrl.searchParams.get("offset")) || 0);
  const limit = Math.min(500, Math.max(1, Number(req.nextUrl.searchParams.get("limit")) || 50));

  if (!slug) {
    return NextResponse.json({ error: "slug is required" }, { status: 400 });
  }

  const config = parseWordListSlug(slug);
  if (!config) {
    return NextResponse.json({ error: "Invalid slug" }, { status: 400 });
  }

  try {
    const cached = getCachedList(slug, lang);
    if (!cached) {
      return NextResponse.json({ error: "Unknown type" }, { status: 400 });
    }

    // Apply optional length filter (only meaningful on starts/ends pages).
    let filtered = cached.words;
    if (lengthFilter && config.type !== "length") {
      const lf = Number(lengthFilter);
      if (Number.isFinite(lf) && lf >= 2 && lf <= 15) {
        filtered = cached.words.filter((w) => w.len === lf);
      }
    }

    // Apply optional search query filter.
    if (q) {
      filtered = filtered.filter((w) => w.word.toLowerCase().includes(q));
    }

    const total = filtered.length;
    const slice = filtered.slice(offset, offset + limit).map(({ word, score }) => ({ word, score }));

    return NextResponse.json(
      {
        title: cached.title,
        words: slice,
        total,
        offset,
        limit,
        lengthCounts: cached.lengthCounts,
      },
      {
        headers: {
          "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
        },
      }
    );
  } catch (err) {
    console.error("[/api/word-list] fetch failed:", err);
    return NextResponse.json({ error: "Failed to load words" }, { status: 500 });
  }
}

