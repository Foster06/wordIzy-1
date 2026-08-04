import { NextRequest, NextResponse } from "next/server";
import type { LanguageCode } from "@/lib/languages";
import { getDefinition } from "@/lib/external-words";
import { heavyLimiter, getClientIp } from "@/lib/rate-limit";

export const runtime = "nodejs";

const CACHE_HEADERS = {
  "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
};

export async function GET(req: NextRequest) {
  if (heavyLimiter.hit(getClientIp(req))) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }
  const lang = (req.nextUrl.searchParams.get("lang") || "en") as LanguageCode;
  const word = (req.nextUrl.searchParams.get("word") || "").slice(0, 30);
  if (!word) return NextResponse.json({ definition: "", source: "" }, { headers: CACHE_HEADERS });
  const result = await getDefinition(word, lang);
  return NextResponse.json(result, { headers: CACHE_HEADERS });
}
