import { NextRequest, NextResponse } from "next/server";
import type { LanguageCode } from "@/lib/languages";
import { getSynonyms } from "@/lib/external-words";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  const lang = (req.nextUrl.searchParams.get("lang") || "en") as LanguageCode;
  const word = req.nextUrl.searchParams.get("word") || "";
  if (!word) return NextResponse.json({ synonyms: [], source: "" });
  const result = await getSynonyms(word, lang);
  return NextResponse.json(result);
}
