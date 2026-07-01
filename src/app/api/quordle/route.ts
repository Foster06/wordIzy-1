import { NextRequest, NextResponse } from "next/server";
import type { LanguageCode } from "@/lib/languages";
import { wordleSolve, type WordleConstraint } from "@/lib/unscramble";

export const runtime = "nodejs";

/** Quordle solver: accepts an array of constraint sets, returns candidates per board. */
export async function POST(req: NextRequest) {
  let body: { lang?: LanguageCode; boards?: WordleConstraint[] };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid json" }, { status: 400 });
  }
  const lang = (body.lang || "en") as LanguageCode;
  const boards = Array.isArray(body.boards) ? body.boards : [];
  const results = boards.map((b) => ({
    words: wordleSolve(b, lang),
    total: 0,
  }));
  for (const r of results) r.total = r.words.length;
  return NextResponse.json({ results });
}

export async function GET(req: NextRequest) {
  const lang = (req.nextUrl.searchParams.get("lang") || "en") as LanguageCode;
  const length = Number(req.nextUrl.searchParams.get("length")) || 5;
  const pattern = req.nextUrl.searchParams.get("pattern") || "";
  const validLetters = req.nextUrl.searchParams.get("valid") || "";
  const excludedLetters = req.nextUrl.searchParams.get("excluded") || "";
  const words = wordleSolve({ length, pattern, validLetters, excludedLetters }, lang);
  return NextResponse.json({ words, total: words.length });
}
