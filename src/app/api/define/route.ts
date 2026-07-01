import { NextRequest, NextResponse } from "next/server";
import type { LanguageCode } from "@/lib/languages";

export const runtime = "nodejs";

const NATIVE: Record<LanguageCode, string> = {
  en: "English", fr: "French", es: "Spanish", it: "Italian", pt: "Portuguese",
  de: "German", nl: "Dutch", ja: "Japanese (romaji)", zh: "Mandarin (pinyin)",
};

/** Generate a short dictionary definition for a word using the LLM SDK. */
export async function GET(req: NextRequest) {
  const lang = (req.nextUrl.searchParams.get("lang") || "en") as LanguageCode;
  const word = req.nextUrl.searchParams.get("word") || "";
  if (!word) return NextResponse.json({ definition: "" });

  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const ZAI = require("z-ai-web-dev-sdk").default;
    const zai = await ZAI.create();
    const prompt = `Give a concise dictionary definition (max ~25 words) for the word "${word}" in ${NATIVE[lang]}. Reply with only the definition, no quotes, no extra commentary. If it is not a real word, reply with exactly: N/A`;
    const response = await zai.chat.completions.create({
      messages: [
        { role: "system", content: "You are a concise multilingual dictionary assistant." },
        { role: "user", content: prompt },
      ],
      thinking: { type: "disabled" },
    });
    const definition = (response.choices?.[0]?.message?.content || "").trim();
    return NextResponse.json({ definition });
  } catch (e) {
    return NextResponse.json({ definition: "" });
  }
}
