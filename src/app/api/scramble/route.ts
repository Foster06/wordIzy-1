import { NextRequest, NextResponse } from "next/server";
import { scrambleWord } from "@/lib/unscramble";
import { solverLimiter, getClientIp } from "@/lib/rate-limit";

export const runtime = "nodejs";

const CACHE_HEADERS = {
  "Cache-Control": "public, s-maxage=600, stale-while-revalidate=3600",
};

export async function GET(req: NextRequest) {
  if (solverLimiter.hit(getClientIp(req))) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }
  const word = (req.nextUrl.searchParams.get("word") || "").slice(0, 30);
  const variantsRaw = Number(req.nextUrl.searchParams.get("variants")) || 4;
  const variants = Math.min(12, Math.max(1, variantsRaw));
  if (!word) return NextResponse.json({ variants: [] }, { headers: CACHE_HEADERS });
  return NextResponse.json({ variants: scrambleWord(word, variants) }, { headers: CACHE_HEADERS });
}
