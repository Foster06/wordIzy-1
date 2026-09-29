import { NextResponse } from "next/server";

// Explicit route handler for /ai-catalog.json
// Ensures the file is served as JSON with the correct Content-Type,
// bypassing the [[...tool]] catch-all route which might serve HTML.
// This fixes the Lighthouse "ai-catalog.json is not valid" error.

export const runtime = "nodejs";
export const dynamic = "force-static";

const CATALOG = {
  $schema: "https://json-schema.org/draft-07/schema#",
  name: "wordIzy",
  description: "Free word unscrambler, anagram solver, Wordle & Quordle solver with multi-language official Scrabble dictionaries. No sign-up required.",
  version: "1.0.0",
  url: "https://wordizy.com",
  type: "WebApplication",
  applicationCategory: "Game",
  applicationSubCategory: "Word Game Helper",
  operatingSystem: "Web",
  offers: { price: "0", priceCurrency: "USD" },
  inLanguage: ["en", "fr", "es", "it", "pt", "de", "nl", "ja", "zh"],
  features: [
    { name: "Word Unscrambler", description: "Enter scrambled letters and find every playable word, grouped by length and sorted by Scrabble score. Supports wildcards.", url: "https://wordizy.com/", endpoint: "https://wordizy.com/api/unscramble" },
    { name: "Anagram Solver", description: "Find exact anagrams using all provided letters.", url: "https://wordizy.com/anagram", endpoint: "https://wordizy.com/api/anagram" },
    { name: "Wordle Solver", description: "Solve Wordle puzzles with pattern matching and letter constraints.", url: "https://wordizy.com/wordle", endpoint: "https://wordizy.com/api/wordle" },
    { name: "Quordle Solver", description: "Solve 4 Wordle puzzles simultaneously.", url: "https://wordizy.com/quordle", endpoint: "https://wordizy.com/api/quordle" },
    { name: "Scrabble Duplicate Solver", description: "Find the best playable word from a Scrabble rack.", url: "https://wordizy.com/scrabble" },
    { name: "Wordfeud Helper", description: "Word finder optimized for Wordfeud tile values.", url: "https://wordizy.com/wordfeud" },
    { name: "Random Word Generator", description: "Generate random valid Scrabble words with filters.", url: "https://wordizy.com/random", endpoint: "https://wordizy.com/api/random" },
    { name: "Dictionary Lookup", description: "Check word validity, get definitions, phonetics, and Scrabble scores.", url: "https://wordizy.com/dictionary", endpoint: "https://wordizy.com/api/check" },
    { name: "Anagram Blitz Game", description: "60-second word unscramble game with daily challenges and infinite practice mode.", url: "https://wordizy.com/blitz", endpoint: "https://wordizy.com/api/game/random-word" },
  ],
  wordLists: [
    { name: "Words Starts With A-Z", description: "Browse all Scrabble words starting with each letter.", url: "https://wordizy.com/wordstarts" },
    { name: "Words Ends With A-Z", description: "Browse all Scrabble words ending with each letter.", url: "https://wordizy.com/wordends" },
    { name: "Unscramble by Length", description: "Browse words by length, 2 to 15 letters.", url: "https://wordizy.com/wordlists" },
    { name: "Wordle Words Starts A-Z", description: "Browse Wordle words starting with each letter.", url: "https://wordizy.com/wordle-starts" },
    { name: "Wordle Words Ends A-Z", description: "Browse Wordle words ending with each letter.", url: "https://wordizy.com/wordle-ends" },
  ],
  guides: [
    { name: "Best Wordle Starter Words", description: "Mathematically optimal opening words, strategies, and a second-guess framework.", url: "https://wordizy.com/guides/best-wordle-starter-words" },
  ],
  documentation: "https://wordizy.com/llms.txt",
  sitemap: "https://wordizy.com/sitemap.xml",
};

export async function GET() {
  return NextResponse.json(CATALOG, {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
