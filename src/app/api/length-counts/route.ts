import { NextRequest, NextResponse } from "next/server";
import type { LanguageCode } from "@/lib/languages";
import { getDict } from "@/lib/dictionary";

export const runtime = "nodejs";

const CACHE_HEADERS = {
  "Cache-Control": "public, s-maxage=86400",
};

/** Returns word counts per length (2-7) for a given language and optional letter/mode. */
export async function GET(req: NextRequest) {
  const lang = (req.nextUrl.searchParams.get("lang") || "en") as LanguageCode;
  const mode = (req.nextUrl.searchParams.get("mode") || "starts") as "starts" | "ends";
  const letter = (req.nextUrl.searchParams.get("letter") || "").toLowerCase();

  const dict = getDict(lang);
  const counts: Record<string, number> = {};
  const useLetter = letter && /[a-zñç]/.test(letter);

  for (let l = 2; l <= 7; l++) {
    const bucket = dict.byLength.get(l);
    if (!bucket) {
      counts[l] = 0;
      continue;
    }
    if (useLetter) {
      // Manual count loop — avoids allocating an intermediate filtered array.
      let n = 0;
      if (mode === "starts") {
        for (let i = 0; i < bucket.length; i++) {
          if (bucket[i].norm.startsWith(letter)) n++;
        }
      } else {
        for (let i = 0; i < bucket.length; i++) {
          if (bucket[i].norm.endsWith(letter)) n++;
        }
      }
      counts[l] = n;
    } else {
      counts[l] = bucket.length;
    }
  }

  return NextResponse.json({ counts }, { headers: CACHE_HEADERS });
}
