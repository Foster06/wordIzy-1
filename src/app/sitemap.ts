import type { MetadataRoute } from "next";
import {
  getAllValidScrabbleWords,
  DICT_LANGS,
  getLangPrerenderWords,
  getSampleLangWords,
} from "@/lib/scrabble-word-data";

// Localized tool pages: 8 languages × [home + 19 tools] = 160 URLs
// (/de, /de/wordle, /fr/wordfeud, …). Must mirror src/lib/i18n-seo.ts.
const I18N_LANGS = ["de", "fr", "es", "it", "pt", "nl", "ja", "zh"];
const LOCALIZED_SLUGS = [
  "", // localized homepage /{lang}
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
  "sitemap",
  "blitz",
];

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
  "scrabble-words", // Index page for /scrabble-words/[word] programmatic pages
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
//    Bumped to 2026-11-11 to reflect the GSC-driven metadata rewrite (count-
//    enriched word-list titles, tool title/description upgrades) and the 301
//    consolidation of legacy word-list URLs onto their canonical forms.
const LAST_MODIFIED = new Date("2026-11-11T00:00:00Z");

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

  // GENERATION MAP E: Programmatic Scrabble per-word validity pages
  // (/scrabble-words/[word]). All prerendered 2-3 letter valid words (~1,500)
  // get priority 0.6; a sample of 4-5 letter words (~200) gets priority 0.4
  // for discovery of the ISR-rendered long tail. Total adds ~1,700 URLs —
  // the sitemap stays well under Google's 50k-URL cap.
  const shortScrabbleWords = getAllValidScrabbleWords(2, 3);
  for (const word of shortScrabbleWords) {
    sitemapEntries.push({
      url: `${baseUrl}/scrabble-words/${word}`,
      lastModified: LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 0.6,
    });
  }
  const midScrabbleWords = getAllValidScrabbleWords(4, 5);
  const sampleStep = Math.max(1, Math.floor(midScrabbleWords.length / 200));
  for (let i = 0; i < midScrabbleWords.length; i += sampleStep) {
    sitemapEntries.push({
      url: `${baseUrl}/scrabble-words/${midScrabbleWords[i]}`,
      lastModified: LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 0.4,
    });
  }

  // GENERATION MAP F: Localized tool pages (/de, /fr/wordle, …) — the
  // internationalization play for the NL/DE/FR/ES/IT/PT/JA/ZH markets.
  // 8 languages × 20 pages = 160 URLs with hreflang pairing (the clusters
  // are emitted per-page via alternates.languages in generateMetadata).
  I18N_LANGS.forEach((lang) => {
    LOCALIZED_SLUGS.forEach((slug) => {
      sitemapEntries.push({
        url: `${baseUrl}/${lang}${slug ? `/${slug}` : ""}`,
        lastModified: LAST_MODIFIED,
        changeFrequency: "weekly",
        priority: slug === "" ? 0.9 : 0.7,
      });
    });
  });

  // GENERATION MAP G: Localized scrabble-words section
  // (/{lang}/scrabble-words + /{lang}/scrabble-words/[word] for the 6
  // dictionary languages). Per language: the index (0.7), the prerendered
  // native 2-letter word pages (0.5), and a ~100-word sample of the
  // native 3-letter pages for ISR discovery (0.3). The native-first
  // curation (words in the language's dict that are NOT also valid
  // English Scrabble words) keeps the sitemap focused on clearly
  // localized queries — /fr/scrabble-words/ce rather than /fr/scrabble-words/bye.
  // Adds ~1.2k URLs — still well under the 50k cap.
  for (const lang of DICT_LANGS) {
    sitemapEntries.push({
      url: `${baseUrl}/${lang}/scrabble-words`,
      lastModified: LAST_MODIFIED,
      changeFrequency: "weekly",
      priority: 0.7,
    });
    for (const word of getLangPrerenderWords(lang)) {
      sitemapEntries.push({
        url: `${baseUrl}/${lang}/scrabble-words/${word}`,
        lastModified: LAST_MODIFIED,
        changeFrequency: "monthly",
        priority: 0.5,
      });
    }
    // Native-first 3-letter sample for ISR discovery — same curated
    // sampler the localized index page uses, so sitemap and index agree.
    for (const word of getSampleLangWords(lang, 3, 100)) {
      sitemapEntries.push({
        url: `${baseUrl}/${lang}/scrabble-words/${word}`,
        lastModified: LAST_MODIFIED,
        changeFrequency: "monthly",
        priority: 0.3,
      });
    }
  }

  return sitemapEntries;
}
