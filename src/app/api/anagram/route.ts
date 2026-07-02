import { NextRequest, NextResponse } from "next/server";
import type { LanguageCode } from "@/lib/languages";
import { anagrams } from "@/lib/unscramble";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  const lang = (req.nextUrl.searchParams.get("lang") || "en") as LanguageCode;
  const letters = (req.nextUrl.searchParams.get("letters") || "").toLowerCase();
  if (!letters) return NextResponse.json({ groups: [], total: 0 });
  const result = anagrams(letters, lang, {});
  return NextResponse.json(result);
}
