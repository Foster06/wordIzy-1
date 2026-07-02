import { NextRequest, NextResponse } from "next/server";
import type { LanguageCode } from "@/lib/languages";
import { wordleSolve } from "@/lib/unscramble";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  const lang = (req.nextUrl.searchParams.get("lang") || "en") as LanguageCode;
  const length = Number(req.nextUrl.searchParams.get("length")) || 5;
  const pattern = req.nextUrl.searchParams.get("pattern") || "";
  const validLetters = req.nextUrl.searchParams.get("valid") || "";
  const excludedLetters = req.nextUrl.searchParams.get("excluded") || "";

  const words = wordleSolve({ length, pattern, validLetters, excludedLetters }, lang);
  return NextResponse.json({ words, total: words.length });
}
