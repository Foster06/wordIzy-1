import { NextRequest, NextResponse } from "next/server";
import { getDict } from "@/lib/dictionary";
import { scoreWord } from "@/lib/languages";
import type { LanguageCode } from "@/lib/languages";
import { parseWordListSlug } from "@/lib/word-list-urls";

export const runtime = "nodejs";
// Cache responses for 1 hour on CDN, serve stale while revalidating for 24h.
// Word lists are deterministic (same slug+lang always returns same words), so
// caching is safe and dramatically speeds up page loads.
export const revalidate = 3600;

/**
 * GET /api/word-list?slug=words-starts-by-c&lang=en
 * GET /api/word-list?slug=unscramble-5-letter-words&lang=en
 *
 * Returns words for a programmatic word-list page. Replaces the server action
 * (getProgrammaticWordList) which failed in proxy/preview environments due to
 * Next.js Server Actions origin-mismatch security check.
 */
export async function GET(req: NextRequest) {
  const slug = req.nextUrl.searchParams.get("slug") || "";
  const lang = (req.nextUrl.searchParams.get("lang") || "en") as LanguageCode;

  if (!slug) {
    return NextResponse.json({ error: "slug is required" }, { status: 400 });
  }

  const config = parseWordListSlug(slug);
  if (!config) {
    return NextResponse.json({ error: "Invalid slug" }, { status: 400 });
  }

  try {
    const dict = getDict(lang);
    const out: { word: string; score: number }[] = [];
    let title = "";

    if (config.type === "length") {
      const targetLength = config.value as number;
      title = `${targetLength}-Letter Words`;
      const bucket = dict.byLength.get(targetLength) ?? [];
      for (const entry of bucket) {
        out.push({ word: entry.word, score: scoreWord(entry.word, lang) });
      }
      out.sort((a, b) => b.score - a.score || a.word.localeCompare(b.word));
    } else if (config.type === "starts") {
      const letter = String(config.value).toLowerCase();
      title = `Words Starting With "${letter.toUpperCase()}"`;
      for (let l = 2; l <= 15; l++) {
        const bucket = dict.byLength.get(l) ?? [];
        for (const entry of bucket) {
          if (entry.norm.startsWith(letter)) {
            out.push({ word: entry.word, score: scoreWord(entry.word, lang) });
          }
        }
      }
      out.sort((a, b) => a.word.toLowerCase().localeCompare(b.word.toLowerCase()));
    } else if (config.type === "ends") {
      const letter = String(config.value).toLowerCase();
      title = `Words Ending With "${letter.toUpperCase()}"`;
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
      return NextResponse.json({ error: "Unknown type" }, { status: 400 });
    }

    return NextResponse.json(
      {
        title,
        words: out,
        total: out.length,
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
