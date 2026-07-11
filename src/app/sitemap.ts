import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://wordizy.com";
  const currentDate = new Date().toISOString();

  // 1. Core game solvers and helper tools (High priority, changes weekly)
  const coreTools = [
    "", // Homepage / Unscrambler
    "/scramble",
    "/anagram",
    "/scrabble",
    "/wordle",
    "/dictionary",
    "/random",
    "/wordfeud",
    "/quordle",
    "/wordlists",
    "/wordstarts",
    "/wordends",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: currentDate,
    changeFrequency: "weekly" as const,
    priority: 1.0,
  }));

  // 2. Core informational pages
  const sitePages = [
    "/about",
    "/contact",
    "/privacy",
    "/sitemap",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: currentDate,
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  // 3. Programmatic target paths for word-length landing filters (2-letter to 15-letter words)
  const lengthPages = Array.from({ length: 14 }, (_, i) => i + 2).map((len) => ({
    url: `${baseUrl}/unscramble/${len}-letter-words`,
    lastModified: currentDate,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  // 4. Programmatic target paths for alphabet starting configurations (A to Z)
  const alphabetStartingPages = "abcdefghijklmnopqrstuvwxyz".split("").map((letter) => ({
    url: `${baseUrl}/unscramble/words-starting-with-${letter}`,
    lastModified: currentDate,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // 🎯 5. ADDED: Programmatic target paths for alphabet ending configurations (A to Z)
  const alphabetEndingPages = "abcdefghijklmnopqrstuvwxyz".split("").map((letter) => ({
    url: `${baseUrl}/unscramble/words-ending-with-${letter}`, // Matches your wordends tool path structure
    lastModified: currentDate,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // Combine all route collections together into a master sitemap matrix block
  return [
    ...coreTools, 
    ...sitePages, 
    ...lengthPages, 
    ...alphabetStartingPages, 
    ...alphabetEndingPages // 👈 Google will now cleanly crawl these 26 pages too!
  ];
}
