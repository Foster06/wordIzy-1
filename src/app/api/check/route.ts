import { NextRequest, NextResponse } from "next/server";
import type { LanguageCode } from "@/lib/languages";
import { checkWord } from "@/lib/unscramble";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  const lang = (req.nextUrl.searchParams.get("lang") || "en") as LanguageCode;
  const word = req.nextUrl.searchParams.get("word") || "";
  if (!word) return NextResponse.json({ error: "word required" }, { status: 400 });
  const result = checkWord(word, lang);
  return NextResponse.json(result);
}
