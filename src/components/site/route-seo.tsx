"use client";

import { useEffect } from "react";
import type { RouteDef } from "./routes";

type RouteSeoEntry = {
  title: string;
  description: string;
};

/**
 * Per-route SEO titles and descriptions. These mirror src/lib/seo.ts but
 * live client-side so the hash-based router can update document.title and the
 * meta description tag on every navigation.
 */
const SEO: Record<RouteDef["id"], RouteSeoEntry> = {
  home: {
    title: "WordIzy — Word Unscrambler & Anagram Solver | Free, 9 Languages",
    description:
      "Free word unscrambler. Enter your letters, use wildcards (? *), add filters, and find every playable Scrabble word. 9 languages, no sign-up.",
  },
  scramble: {
    title: "Word Scramble Solver — Descramble Jumbled Letters | WordIzy",
    description:
      "Solve jumble and word-scramble puzzles instantly. Enter scrambled letters and find all valid words. Create your own scrambles too.",
  },
  anagram: {
    title: "Anagram Solver — Find All Anagrams | WordIzy",
    description:
      "Find every anagram of your letters. Words that use exactly all the letters you provide. Supports wildcards and 9 languages.",
  },
  wordle: {
    title: "Wordle Solver — Narrow Down Today's Wordle | WordIzy",
    description:
      "Solve Wordle faster. Enter green, yellow, and gray letters to get all valid candidate words. Works for 4-8 letter Wordle variants.",
  },
  quordle: {
    title: "Quordle Solver — Solve 4 Wordle Puzzles at Once | WordIzy",
    description:
      "Solve up to 4 Wordle puzzles simultaneously. Enter constraints for each board and get candidate words for all four.",
  },
  scrabble: {
    title: "Scrabble Duplicate Solver — Find Highest-Scoring Plays | WordIzy",
    description:
      "Duplicate Scrabble solver. Enter your 7-letter rack and board letters to find the highest-scoring words. Supports wildcards.",
  },
  dictionary: {
    title: "Check Dictionary — Verify Scrabble Words | WordIzy",
    description:
      "Check if a word is valid in the official Scrabble dictionary. See Scrabble score, definition, and synonyms. 9 languages supported.",
  },
  random: {
    title: "Random Word Generator — Filter by Length & Letters | WordIzy",
    description:
      "Generate random real Scrabble words with filters for length, prefix, suffix, and contains. Perfect for games, writing, and passwords.",
  },
  wordfeud: {
    title: "Wordfeud Helper — Find Best Words from Your Rack | WordIzy",
    description:
      "Find the best Wordfeud words from your rack. Enter your 7 letters plus board letters. Supports 9 languages and blank tiles.",
  },
  wordlists: {
    title: "Word Lists — Browse 2-7 Letter Scrabble Words A-Z | WordIzy",
    description:
      "Browse every valid Scrabble word from 2 to 7 letters. Filter by length and starting letter. All words sorted alphabetically.",
  },
  wordstarts: {
    title: "Word Starts By — Words Beginning with Each Letter | WordIzy",
    description:
      "Browse all Scrabble words that start with a specific letter, grouped by length 2-7. Perfect for studying openings and hooks.",
  },
  wordends: {
    title: "Word Ends By — Words Ending with Each Letter | WordIzy",
    description:
      "Browse all Scrabble words that end with a specific letter, grouped by length 2-7. Find hooks and suffix words easily.",
  },
  about: {
    title: "About WordIzy — Free Word Tools | WordIzy",
    description:
      "WordIzy is a free, privacy-friendly suite of word tools: unscrambler, anagram solver, Wordle & Quordle solvers, and more. No sign-up.",
  },
  contact: {
    title: "Contact WordIzy | WordIzy",
    description:
      "Get in touch with the WordIzy team. Send us feedback, suggestions, or bug reports.",
  },
  privacy: {
    title: "Privacy Policy | WordIzy",
    description:
      "WordIzy does not require an account and does not collect personal data. All solving happens server-side with no permanent storage.",
  },
  sitemap: {
    title: "Sitemap | WordIzy",
    description:
      "All pages on WordIzy — word unscrambler, anagram solver, Wordle solver, Quordle solver, word lists, and more.",
  },
  inbox: {
    title: "Owner Inbox | WordIzy",
    description: "Owner-only inbox for contact form submissions.",
  },
  dashboard: {
    title: "Analytics Dashboard | WordIzy",
    description: "Owner-only analytics dashboard for search queries and usage.",
  },
};

interface RouteSeoProps {
  route: RouteDef;
}

/**
 * Updates document.title and the meta description tag whenever the route
 * changes. Returns null — this component renders nothing visible.
 */
export function RouteSeo({ route }: RouteSeoProps) {
  useEffect(() => {
    const entry = SEO[route.id] ?? SEO.home;
    if (typeof document !== "undefined") {
      document.title = entry.title;
      const tag =
        document.querySelector('meta[name="description"]') ??
        document.createElement("meta");
      tag.setAttribute("name", "description");
      tag.setAttribute("content", entry.description);
      if (!tag.parentElement) {
        document.head.appendChild(tag);
      }
    }
  }, [route.id]);

  return null;
}
