import { NextRequest, NextResponse } from "next/server";
import { getCachedList } from "@/lib/word-list-data";
import type { LanguageCode } from "@/lib/languages";
import { parseWordListSlug } from "@/lib/word-list-urls";
import { solverLimiter, getClientIp } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const revalidate = 3600;

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
  const startsWith = (req.nextUrl.searchParams.get("startsWith") || "").toLowerCase().trim();
  const sort = req.nextUrl.searchParams.get("sort") || "alpha";
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

    // Apply optional startsWith filter (alphabet jump bar on length pages).
    if (startsWith) {
      filtered = filtered.filter((w) => w.word.toLowerCase().startsWith(startsWith));
    }

    // Apply sort: alpha (A->Z) or score (highest first).
    if (sort === "score") {
      filtered = [...filtered].sort((a, b) => b.score - a.score || a.word.localeCompare(b.word));
    } else {
      filtered = [...filtered].sort((a, b) => a.word.toLowerCase().localeCompare(b.word.toLowerCase()));
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
