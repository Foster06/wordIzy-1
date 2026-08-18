// src/lib/seo.ts
// Per-route SEO metadata helpers.

import type { Metadata } from "next";

interface RouteMeta {
  title: string;
  description: string;
}

const ROUTE_META: Record<string, RouteMeta> = {
  "/": {
    title: "WordIzy — Word Unscrambler & Anagram Solver | Free, 9 Languages",
    description: "Free word unscrambler. Enter your letters, use wildcards (? *), add filters, and find every playable Scrabble word. 9 languages, no sign-up.",
  },
  "/scramble": {
    title: "Word Scramble Solver — Descramble Jumbled Letters | WordIzy",
    description: "Solve jumble and word-scramble puzzles instantly. Enter scrambled letters and find all valid words. Create your own scrambles too.",
  },
  "/anagram": {
    title: "Anagram Solver — Find All Anagrams | WordIzy",
    description: "Find every anagram of your letters. Words that use exactly all the letters you provide. Supports wildcards and 9 languages.",
  },
  "/wordle": {
    title: "Wordle Solver — Narrow Down Today's Wordle | WordIzy",
    description: "Solve Wordle faster. Enter green, yellow, and gray letters to get all valid candidate words. Works for 4-8 letter Wordle variants.",
  },
  "/quordle": {
    title: "Quordle Solver — Solve 4 Wordle Puzzles at Once | WordIzy",
    description: "Solve up to 4 Wordle puzzles simultaneously. Enter constraints for each board and get candidate words for all four.",
  },
  "/random": {
    title: "Random Word Generator — Filter by Length & Letters | WordIzy",
    description: "Generate random real Scrabble words with filters for length, prefix, suffix, and contains. Perfect for games, writing, and passwords.",
  },
  "/wordfeud": {
    title: "Wordfeud Helper — Find Best Words from Your Rack | WordIzy",
    description: "Find the best Wordfeud words from your rack. Enter your 7 letters plus board letters. Supports 9 languages and blank tiles.",
  },
  "/dictionary": {
    title: "Check Dictionary — Verify Scrabble Words | WordIzy",
    description: "Check if a word is valid in the official Scrabble dictionary. See Scrabble score, definition, and synonyms. 9 languages supported.",
  },
  "/scrabble": {
    title: "Scrabble Duplicate Solver — Find Highest-Scoring Plays | WordIzy",
    description: "Duplicate Scrabble solver. Enter your 7-letter rack and board letters to find the highest-scoring words. Supports wildcards.",
  },
  "/wordstarts": {
    title: "Words Starts With — Words Beginning with Each Letter | WordIzy",
    description: "Browse all Scrabble words that start with a specific letter, grouped by length 2-7. Perfect for studying openings and hooks.",
  },
  "/wordends": {
    title: "Words Ends With — Words Ending with Each Letter | WordIzy",
    description: "Browse all Scrabble words that end with a specific letter, grouped by length 2-7. Find hooks and suffix words easily.",
  },
  "/about": {
    title: "About WordIzy — Free Word Tools | WordIzy",
    description: "WordIzy is a free, privacy-friendly suite of word tools: unscrambler, anagram solver, Wordle & Quordle solvers, and more. No sign-up.",
  },
  "/contact": {
    title: "Contact WordIzy | WordIzy",
    description: "Get in touch with the WordIzy team. Send us feedback, suggestions, or bug reports.",
  },
  "/privacy": {
    title: "Privacy Policy | WordIzy",
    description: "WordIzy does not require an account and does not collect personal data. All solving happens server-side with no permanent storage.",
  },
  "/sitemap": {
    title: "Sitemap | WordIzy",
    description: "All pages on WordIzy — word unscrambler, anagram solver, Wordle solver, Quordle solver, word lists, and more.",
  },
};

export function getRouteMetadata(hash: string): Metadata {
  const meta = ROUTE_META[hash] ?? ROUTE_META["/"];
  return {
    title: meta.title,
    description: meta.description,
    openGraph: {
      title: meta.title,
      description: meta.description,
      siteName: "WordIzy",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
    },
  };
}
