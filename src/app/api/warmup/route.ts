import { NextResponse } from "next/server";
import { getDict } from "@/lib/dictionary";
import type { LanguageCode } from "@/lib/languages";

export const runtime = "nodejs";

/**
 * Pre-warm dictionary cache for English only (the most common language).
 * Other languages load lazily on first request for that language.
 * English is ~280k words and takes ~3-5s to parse on first load.
 */
export async function GET() {
  const enSize = getDict("en").entries.length;
  return NextResponse.json({ warmed: true, en: enSize });
}
