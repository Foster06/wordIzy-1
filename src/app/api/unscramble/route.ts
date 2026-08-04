import { NextRequest, NextResponse } from "next/server";
import type { LanguageCode } from "@/lib/languages";
import { unscramble } from "@/lib/unscramble";
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
  const letters = (req.nextUrl.searchParams.get("letters") || "").toLowerCase().slice(0, 30);
  const startsWith = req.nextUrl.searchParams.get("startsWith") || undefined;
  const endsWith = req.nextUrl.searchParams.get("endsWith") || undefined;
  const mustInclude = req.nextUrl.searchParams.get("mustInclude") || undefined;
  const minLength = Number(req.nextUrl.searchParams.get("minLength")) || undefined;
  const maxLength = Number(req.nextUrl.searchParams.get("maxLength")) || undefined;

  if (!letters) return NextResponse.json({ groups: [], total: 0 }, { headers: CACHE_HEADERS });

  const result = unscramble(letters, lang, { startsWith, endsWith, mustInclude, minLength, maxLength });
  return NextResponse.json(result, { headers: CACHE_HEADERS });
}
