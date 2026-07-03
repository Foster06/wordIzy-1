import { NextRequest, NextResponse } from "next/server";
import type { LanguageCode } from "@/lib/languages";
import { getDict } from "@/lib/dictionary";

export const runtime = "nodejs";

/** Returns word counts per letter for a given mode and length. */
export async function GET(req: NextRequest) {
  const lang = (req.nextUrl.searchParams.get("lang") || "en") as LanguageCode;
  const mode = (req.nextUrl.searchParams.get("mode") || "starts") as "starts" | "ends";
  const length = Number(req.nextUrl.searchParams.get("length")) || 0;
  const lengths = length > 0 ? [length] : [2, 3, 4, 5, 6, 7];
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  const dict = getDict(lang);
  const counts: Record<string, number> = {};

  for (const letter of letters) {
    let total = 0;
    for (const l of lengths) {
      const bucket = dict.byLength.get(l) ?? [];
      for (const entry of bucket) {
        if (mode === "starts" && entry.norm.startsWith(letter.toLowerCase())) total++;
        else if (mode === "ends" && entry.norm.endsWith(letter.toLowerCase())) total++;
      }
    }
    counts[letter] = total;
  }

  return NextResponse.json({ counts });
}
