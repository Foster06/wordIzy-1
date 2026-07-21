import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

function getDailySeedIndex(arrayLength: number): number {
  const today = new Date();
  const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
  const hash = (seed * 16807) % 2147483647;
  return Math.abs(hash) % arrayLength;
}

function scrambleString(str: string): string {
  const arr = str.toUpperCase().split("");
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  const result = arr.join("");
  return result === str.toUpperCase() ? scrambleString(str) : result;
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const rawLang = searchParams.get("lang");
    const mode = searchParams.get("mode") || "infinite";
    const lang = rawLang && rawLang.trim() ? rawLang.toLowerCase() : "en";

    const LEXICON_MAPPING: Record<string, string[]> = {
      en: ["CSW21.txt", "NWL2023.txt"],
      de: ["DE_FILTERED.txt"],
      es: ["FISE.txt"],
      fr: ["ODS9.txt"],
      nl: ["OpenTaal.txt"],
      pt: ["PT_FILTERED.txt"],
      it: ["ZINGA.txt"],
    };

    const targetedFiles = LEXICON_MAPPING[lang] || ["CSW21.txt"];
    let dictPath = "";
    const rootDir = process.cwd();
    
    for (const fileName of targetedFiles) {
      const checkPath = path.resolve(rootDir, "data", "scrabble", fileName);
      if (fs.existsSync(checkPath)) {
        dictPath = checkPath;
        break;
      }
    }

    const fallbackDictionary = [
      "AWESOME", "MYSTERY", "SHUFFLE", "DYNAMIC", "SOLVER", "BLITZ", 
      "PUZZLE", "VICTORY", "WORDSMITH", "ALPHABET", "CREATIVE", "MATRIX"
    ];

    let words: string[] = [];

    if (dictPath) {
      try {
        let fileContent = fs.readFileSync(dictPath, "utf-8");
        if (fileContent.charCodeAt(0) === 0xFEFF) {
          fileContent = fileContent.substr(1);
        }

        const lines = fileContent.split(/\r?\n/);
        for (const rawLine of lines) {
          const line = rawLine.trim();
          if (!line) continue;

          const tokens = line.split(/[\s\t]+/);
          if (!tokens || tokens.length === 0) continue;

          const cleanWord = tokens[0].replace(/[^a-zA-Z]/g, "").trim().toUpperCase();
          if (cleanWord.length >= 5 && cleanWord.length <= 8) {
            words.push(cleanWord);
          }
        }
      } catch (fileError) {
        console.error("File error:", fileError);
      }
    }

    if (!words || words.length === 0) {
      words = fallbackDictionary;
    }

    const targetIndex = mode === "daily" ? getDailySeedIndex(words.length) : Math.floor(Math.random() * words.length);
    const targetWord = words[targetIndex].trim().toUpperCase();
    
    // 🎯 THE CRITICAL FIX: Scramble the word right here on the server
    const scrambledWord = scrambleString(targetWord);

    // Send BOTH parts together in one unified data package
    return NextResponse.json({
      scrambled: scrambledWord,
      answer: targetWord,
      hint: `${targetWord.length}-letter word from the tournament dictionary.`
    });
  } catch (error) {
    return NextResponse.json({ scrambled: "PUZZLE", answer: "PUZZLE", hint: "6-letter fallback." });
  }
}
