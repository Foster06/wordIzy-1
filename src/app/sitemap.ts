import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://wordizy.com";

  // 1. Core static marketing and game pages
  const staticRoutes = [
    "",
    "/anagram-solver",
    "/wordle-solver",
    "/quordle-solver",
    "/contact",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "weekly" as const,
    priority: 1.0,
  }));

  // 2. Programmatic target paths for word-length filters (2-letter to 15-letter words)
  const lengthPages = Array.from({ length: 14 }, (_, i) => i + 2).map((len) => ({
    url: `${baseUrl}/unscramble/${len}-letter-words`,
    lastModified: new Date().toISOString(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  // 3. Programmatic target paths for alphabet configurations (A to Z)
  const alphabetPages = "abcdefghijklmnopqrstuvwxyz".split("").map((letter) => ({
    url: `${baseUrl}/unscramble/words-starting-with-${letter}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // Combine everything into a single master index map
  return [...staticRoutes, ...lengthPages, ...alphabetPages];
}
