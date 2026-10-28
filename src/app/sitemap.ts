import type { MetadataRoute } from "next";

// 1. Declare your core static tools registry arrays mapping
const CORE_TOOLS = [
  "", // Homepage / Unscrambler
  "blitz",
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
  "wordle-starts",
  "wordle-ends",
  "about",
  "contact",
  "privacy",
  "terms",
  "sitemap"
];

// 2. Programmatic Alphabetical Parameter Targets (a through z)
const ALPHABET = "abcdefghijklmnopqrstuvwxyz".split("");

// 3. 🎯 FIXED: Fully populated array boundary items explicitly matching programmatic routes
const WORD_LENGTHS = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15"];

// 4. Editorial guides — long-tail SEO landing pages (4 guides × 9 languages = 36 markdown files
//    under src/content/guides/*.md; only the English slug is the canonical URL)
const GUIDES = [
  "best-wordle-starter-words",
  "5-crossword-solving-tips-for-beginners",
  "score-400-in-anagram-blitz",
  "memorize-2-letter-scrabble-words",
];

// 5. Fixed last-modified timestamp so crawlers can diff changes between deploys.
//    Bumped to 2026-10-29 to reflect the Privacy Policy rewrite, new Terms of
//    Service page, and Contact page refactor shipped in this deploy.
const LAST_MODIFIED = new Date("2026-10-29T00:00:00Z");

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://wordizy.com";
  const sitemapEntries: MetadataRoute.Sitemap = [];

  // 🎯 GENERATION MAP A: Build sitemap records for all core standalone tools
  CORE_TOOLS.forEach((toolPath) => {
    sitemapEntries.push({
      url: `${baseUrl}${toolPath ? `/${toolPath}` : ""}`,
      lastModified: LAST_MODIFIED,
      changeFrequency: "weekly",
      priority: toolPath === "" ? 1.0 : 0.8, // Places your home tool as top crawl priority
    });
  });

  // GENERATION MAP B: Programmatic word-length pages (/unscramble-N-letter-words)
  WORD_LENGTHS.forEach((len) => {
    sitemapEntries.push({
      url: `${baseUrl}/unscramble-${len}-letter-words`,
      lastModified: LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 0.6,
    });
  });

  // GENERATION MAP C: Programmatic Scrabble starts/ends pages
  ALPHABET.forEach((letter) => {
    sitemapEntries.push({
      url: `${baseUrl}/words-starts-with-${letter}`,
      lastModified: LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 0.5,
    });
    sitemapEntries.push({
      url: `${baseUrl}/words-ends-with-${letter}`,
      lastModified: LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 0.5,
    });
  });

  // GENERATION MAP C2: Programmatic Wordle starts/ends pages
  ALPHABET.forEach((letter) => {
    sitemapEntries.push({
      url: `${baseUrl}/wordle-words-starts-with-${letter}`,
      lastModified: LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 0.5,
    });
    sitemapEntries.push({
      url: `${baseUrl}/wordle-words-ends-with-${letter}`,
      lastModified: LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 0.5,
    });
  });

  // GENERATION MAP D: Editorial guide pages (canonical English slugs only — localized
  // variants share the same URL and are routed client-side via the ?lang= cookie)
  GUIDES.forEach((guideSlug) => {
    sitemapEntries.push({
      url: `${baseUrl}/guides/${guideSlug}`,
      lastModified: LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 0.7,
    });
  });

  return sitemapEntries;
}
