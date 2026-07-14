import type { MetadataRoute } from "next";

// 1. Declare your core static tools registry arrays mapping
const CORE_TOOLS = [
  "", // Homepage / Unscrambler
  "scramble",
  "wordle",
  "quordle",
  "anagram",
  "random",
  "wordfeud",
  "dictionary",
  "scrabble",
  "wordlists",
  "wordstarts",
  "wordends",
  "about",
  "contact",
  "privacy",
  "sitemap"
];

// 2. Programmatic Alphabetical Parameter Targets (a through z)
const ALPHABET = "abcdefghijklmnopqrstuvwxyz".split("");

// 3. 🎯 FIXED: Fully populated array boundary items explicitly matching programmatic routes
const WORD_LENGTHS = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15"];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://wordizy.com";
  const sitemapEntries: MetadataRoute.Sitemap = [];
  const currentDate = new Date();

  // 🎯 GENERATION MAP A: Build sitemap records for all core standalone tools
  CORE_TOOLS.forEach((toolPath) => {
    sitemapEntries.push({
      url: `${baseUrl}${toolPath ? `/${toolPath}` : ""}`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: toolPath === "" ? 1.0 : 0.8, // Places your home tool as top crawl priority
    });
  });

  // 🎯 GENERATION MAP B: Auto-generate index URLs for word lengths (e.g., /unscramble/5-letter-words)
  WORD_LENGTHS.forEach((len) => {
    sitemapEntries.push({
      url: `${baseUrl}/unscramble/${len}-letter-words`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.6,
    });
  });

  // 🎯 GENERATION MAP C: Auto-generate index links for character starts/ends alignments
  ALPHABET.forEach((letter) => {
    // Adds words-starting-with-a, etc.
    sitemapEntries.push({
      url: `${baseUrl}/unscramble/words-starting-with-${letter}`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.5,
    });

    // Adds words-ending-with-z, etc.
    sitemapEntries.push({
      url: `${baseUrl}/unscramble/words-ending-with-${letter}`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.5,
    });
  });

  return sitemapEntries;
}
