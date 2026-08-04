import { NextRequest, NextResponse } from "next/server";
import type { LanguageCode } from "@/lib/languages";
import { wordleSolve, type WordleConstraint } from "@/lib/unscramble";
import { solverLimiter, getClientIp } from "@/lib/rate-limit";

export const runtime = "nodejs";

const CACHE_HEADERS = {
  "Cache-Control": "public, s-maxage=600, stale-while-revalidate=3600",
};

/** Quordle solver: accepts an array of constraint sets, returns candidates per board. */
export async function POST(req: NextRequest) {
  if (solverLimiter.hit(getClientIp(req))) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }
  let body: { lang?: LanguageCode; boards?: WordleConstraint[] };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid json" }, { status: 400 });
  }
  const lang = (body.lang || "en") as LanguageCode;
  const rawBoards = Array.isArray(body.boards) ? body.boards : [];
  const boards = rawBoards.slice(0, 4);
  const results = boards.map((b) => ({
    words: wordleSolve(b, lang),
    total: 0,
  }));
  for (const r of results) r.total = r.words.length;
  return NextResponse.json({ results });
}

export async function GET(req: NextRequest) {
  if (solverLimiter.hit(getClientIp(req))) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }
  const lang = (req.nextUrl.searchParams.get("lang") || "en") as LanguageCode;
  const length = Number(req.nextUrl.searchParams.get("length")) || 5;
  const pattern = (req.nextUrl.searchParams.get("pattern") || "").slice(0, 8);
  const validLetters = (req.nextUrl.searchParams.get("valid") || "").slice(0, 26);
  const excludedLetters = (req.nextUrl.searchParams.get("excluded") || "").slice(0, 26);
  const words = wordleSolve({ length, pattern, validLetters, excludedLetters }, lang);
  return NextResponse.json({ words, total: words.length }, { headers: CACHE_HEADERS });
}
