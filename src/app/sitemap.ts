import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://wordizy.com";
  const currentDate = new Date().toISOString();

  // 1. All core game solvers and helper tools (High priority, changes weekly)
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
    priority: 1.0, // 🎯 High priority tell Google these are core tools
  }));

  // 2. Core informational marketing and compliance pages (Lower priority)
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

  // 4. Programmatic target paths for alphabet landing filters (A to Z)
  const alphabetPages = "abcdefghijklmnopqrstuvwxyz".split("").map((letter) => ({
    url: `${baseUrl}/unscramble/words-starting-with-${letter}`,
    lastModified: currentDate,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // Note: /inbox and /dashboard are purposely EXCLUDED because they are private admin views that search engines should never index!

  return [...coreTools, ...sitePages, ...lengthPages, ...alphabetPages];
}
