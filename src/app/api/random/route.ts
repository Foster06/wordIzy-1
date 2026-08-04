import { NextRequest, NextResponse } from "next/server";
import type { LanguageCode } from "@/lib/languages";
import { randomWords } from "@/lib/unscramble";
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
  const length = Number(req.nextUrl.searchParams.get("length")) || undefined;
  const startsWith = req.nextUrl.searchParams.get("startsWith") || undefined;
  const endsWith = req.nextUrl.searchParams.get("endsWith") || undefined;
  const contains = req.nextUrl.searchParams.get("contains") || undefined;
  const countRaw = Number(req.nextUrl.searchParams.get("count")) || 12;
  const count = Math.min(50, Math.max(1, countRaw));

  const words = randomWords({ lang, length, startsWith, endsWith, contains, count });
  return NextResponse.json({ words, total: words.length }, { headers: CACHE_HEADERS });
}
