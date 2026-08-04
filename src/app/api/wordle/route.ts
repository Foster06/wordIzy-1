import { NextRequest, NextResponse } from "next/server";
import type { LanguageCode } from "@/lib/languages";
import { wordleSolve } from "@/lib/unscramble";
import { solverLimiter, getClientIp } from "@/lib/rate-limit";

export const runtime = "nodejs";

const CACHE_HEADERS = {
  "Cache-Control": "public, s-maxage=600, stale-while-revalidate=3600",
};

export async function GET(req: NextRequest) {
  if (solverLimiter.hit(getClientIp(req))) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }
  const lang = (req.nextUrl.searchParams.get("lang") || "en") as LanguageCode;
  const lengthRaw = Number(req.nextUrl.searchParams.get("length")) || 5;
  const length = Math.min(8, Math.max(3, lengthRaw));
  const pattern = (req.nextUrl.searchParams.get("pattern") || "").slice(0, 8);
  const validLetters = (req.nextUrl.searchParams.get("valid") || "").slice(0, 26);
  const excludedLetters = (req.nextUrl.searchParams.get("excluded") || "").slice(0, 26);

  const words = wordleSolve({ length, pattern, validLetters, excludedLetters }, lang);
  return NextResponse.json({ words, total: words.length }, { headers: CACHE_HEADERS });
}
