import { NextRequest, NextResponse } from "next/server";
import type { LanguageCode } from "@/lib/languages";
import { unscramble } from "@/lib/unscramble";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  const lang = (req.nextUrl.searchParams.get("lang") || "en") as LanguageCode;
  const letters = (req.nextUrl.searchParams.get("letters") || "").toLowerCase();
  const startsWith = req.nextUrl.searchParams.get("startsWith") || undefined;
  const endsWith = req.nextUrl.searchParams.get("endsWith") || undefined;
  const mustInclude = req.nextUrl.searchParams.get("mustInclude") || undefined;
  const minLength = Number(req.nextUrl.searchParams.get("minLength")) || undefined;
  const maxLength = Number(req.nextUrl.searchParams.get("maxLength")) || undefined;

  if (!letters) return NextResponse.json({ groups: [], total: 0 });

  const result = unscramble(letters, lang, { startsWith, endsWith, mustInclude, minLength, maxLength });
  return NextResponse.json(result);
}
