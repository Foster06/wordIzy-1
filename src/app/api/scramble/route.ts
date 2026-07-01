import { NextRequest, NextResponse } from "next/server";
import { scrambleWord } from "@/lib/unscramble";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  const word = req.nextUrl.searchParams.get("word") || "";
  const variants = Number(req.nextUrl.searchParams.get("variants")) || 4;
  if (!word) return NextResponse.json({ variants: [] });
  return NextResponse.json({ variants: scrambleWord(word, variants) });
}
