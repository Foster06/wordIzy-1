import { NextResponse } from "next/server";
import { getDict } from "@/lib/dictionary";
import type { LanguageCode } from "@/lib/languages";

export const runtime = "nodejs";

/** Pre-warm dictionary cache for all languages on first call. */
export async function GET() {
  const langs: LanguageCode[] = ["en", "fr", "es", "it", "nl", "de", "pt"];
  const sizes: Record<string, number> = {};
  for (const lang of langs) {
    sizes[lang] = getDict(lang).entries.length;
  }
  return NextResponse.json({ warmed: true, sizes });
}
