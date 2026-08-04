import { NextRequest, NextResponse } from "next/server";
import type { LanguageCode } from "@/lib/languages";
import { getDict } from "@/lib/dictionary";

export const runtime = "nodejs";

const CACHE_HEADERS = {
  "Cache-Control": "public, s-maxage=86400",
};

/** Returns total word count per requested language (or all). */
export async function GET(req: NextRequest) {
  const langParam = req.nextUrl.searchParams.get("lang");
  if (langParam) {
    const lang = langParam as LanguageCode;
    return NextResponse.json({ lang, size: getDict(lang).entries.length }, { headers: CACHE_HEADERS });
  }
  const langs: LanguageCode[] = ["en", "fr", "es", "it", "pt", "de", "nl", "ja", "zh"];
  const sizes: Record<string, number> = {};
  for (const l of langs) sizes[l] = getDict(l).entries.length;
  return NextResponse.json({ sizes }, { headers: CACHE_HEADERS });
}
