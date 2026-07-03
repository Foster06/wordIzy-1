import { NextRequest, NextResponse } from "next/server";
import type { LanguageCode } from "@/lib/languages";
import { getDict } from "@/lib/dictionary";

export const runtime = "nodejs";

/** Returns word counts per length (2-7) for a given language and optional letter/mode. */
export async function GET(req: NextRequest) {
  const lang = (req.nextUrl.searchParams.get("lang") || "en") as LanguageCode;
  const mode = (req.nextUrl.searchParams.get("mode") || "starts") as "starts" | "ends";
  const letter = (req.nextUrl.searchParams.get("letter") || "").toLowerCase();

  const dict = getDict(lang);
  const counts: Record<string, number> = {};

  for (let l = 2; l <= 7; l++) {
    const bucket = dict.byLength.get(l) ?? [];
    if (letter && /[a-zñç]/.test(letter)) {
      if (mode === "starts") counts[l] = bucket.filter((e) => e.norm.startsWith(letter)).length;
      else counts[l] = bucket.filter((e) => e.norm.endsWith(letter)).length;
    } else {
      counts[l] = bucket.length;
    }
  }

  return NextResponse.json({ counts });
}
