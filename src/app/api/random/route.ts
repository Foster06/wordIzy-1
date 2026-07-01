import { NextRequest, NextResponse } from "next/server";
import type { LanguageCode } from "@/lib/languages";
import { randomWords } from "@/lib/unscramble";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  const lang = (req.nextUrl.searchParams.get("lang") || "en") as LanguageCode;
  const length = Number(req.nextUrl.searchParams.get("length")) || undefined;
  const startsWith = req.nextUrl.searchParams.get("startsWith") || undefined;
  const endsWith = req.nextUrl.searchParams.get("endsWith") || undefined;
  const contains = req.nextUrl.searchParams.get("contains") || undefined;
  const count = Number(req.nextUrl.searchParams.get("count")) || 12;

  const words = randomWords({ lang, length, startsWith, endsWith, contains, count });
  return NextResponse.json({ words, total: words.length });
}
