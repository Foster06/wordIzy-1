import { NextRequest, NextResponse } from "next/server";
import type { LanguageCode } from "@/lib/languages";
import { getDict } from "@/lib/dictionary";

export const runtime = "nodejs";

/** Returns word counts per letter for a given mode and length.
 *  Optimized: single pass through the dictionary. */
export async function GET(req: NextRequest) {
  const lang = (req.nextUrl.searchParams.get("lang") || "en") as LanguageCode;
  const mode = (req.nextUrl.searchParams.get("mode") || "starts") as "starts" | "ends";
  const length = Number(req.nextUrl.searchParams.get("length")) || 0;
  const lengths = length > 0 ? [length] : [2, 3, 4, 5, 6, 7];

  const dict = getDict(lang);
  const counts: Record<string, number> = {};
  // Initialize all letters to 0
  for (let c = 65; c <= 90; c++) {
    counts[String.fromCharCode(c)] = 0;
  }

  // Single pass: iterate each length bucket once, count by first/last letter
  for (const l of lengths) {
    const bucket = dict.byLength.get(l);
    if (!bucket) continue;
    for (const entry of bucket) {
      const ch = mode === "starts" ? entry.norm[0] : entry.norm[entry.norm.length - 1];
      if (ch) {
        const upper = ch.toUpperCase();
        if (counts[upper] !== undefined) {
          counts[upper]++;
        }
      }
    }
  }

  return NextResponse.json({ counts });
}
