import type { Metadata } from "next";
import { MainToolView } from "@/components/site/main-tool-view";
import { TOOL_METADATA_REGISTRY } from "@/lib/meta-config";
import {
  isWordListPage,
  parseWordListSlug,
  buildWordListTitle,
  buildCanonicalWordListUrl,
} from "@/lib/word-list-urls";
import { getInitialWordListPage, getTopScoringWords, type InitialWordListPage } from "@/lib/word-list-data";

interface PageProps {
  params: Promise<{ tool?: string[] }>;
}

const SITE_ORIGIN = "https://wordizy.com";

// Default googleBot directive — unlocks larger SERP previews + full snippets
// for every page (max-image-preview:large lets Google show big thumbnail images
// in results, max-snippet:-1 removes the snippet-length cap). Per-page opt-in
// (metaConfig.googleBot) merges on top of these defaults.
const DEFAULT_GOOGLE_BOT = {
  "max-image-preview": "large" as const,
  "max-snippet": -1,
  "max-video-preview": -1,
};

// Build the full openGraph block — Next.js replaces (does not deep-merge) the
// root layout's openGraph, so EVERY field must be set here, including
// siteName / type / locale / url which the root layout provides by default.
function buildOpenGraph({
  title,
  description,
  canonical,
}: {
  title: string;
  description: string;
  canonical: string;
}): Metadata["openGraph"] {
  return {
    title,
    description,
    url: canonical,
    siteName: "wordIzy",
    type: "website",
    locale: "en_US",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: title }],
  };
}

// Build the page-specific Twitter card — defaults to summary_large_image with
// the page's own title + description (overrides the root layout's generic
// sitewide card, which would otherwise be emitted).
function buildTwitter({
  title,
  description,
  overrideTitle,
  overrideDescription,
}: {
  title: string;
  description: string;
  overrideTitle?: string;
  overrideDescription?: string;
}): Metadata["twitter"] {
  return {
    card: "summary_large_image",
    title: overrideTitle ?? title,
    description: overrideDescription ?? description,
    images: ["/og-image.png"],
  };
}

// Build a BreadcrumbList JSON-LD for any tool page. The blitz page renders
// its own bespoke breadcrumb with richer copy, so this helper is only used
// for non-blitz tool routes.
function buildBreadcrumbJsonLd(toolSlug: string, title: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "wordIzy — Word Tools", item: SITE_ORIGIN },
      { "@type": "ListItem", position: 2, name: title, item: `${SITE_ORIGIN}/${toolSlug}` },
    ],
  };
}

// SERVER-SIDE METADATA ENGINE: unique titles/descriptions for Google bots.
// Every return path now emits a fully-formed openGraph (incl. url / siteName /
// type / locale) + a page-specific twitter card + robots.googleBot so the
// root layout's defaults never silently shadow page-level metadata.
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const toolSegments = resolvedParams.tool || [];
  const activeToolSlug = toolSegments[0] || "unscrambler";
  const subRoute = toolSegments[1] || "";

  // 1. Single-segment programmatic page: /words-starts-by-c, /unscramble-5-letter-words, etc.
  if (isWordListPage(activeToolSlug)) {
    const config = parseWordListSlug(activeToolSlug)!;
    const title = buildWordListTitle(config);
    const canonical = buildCanonicalWordListUrl(config);
    let description = "";
    if (config.type === "length") {
      description = `Complete list of ${config.value}-letter words for Scrabble, Wordle, Words with Friends, and anagram puzzles. Official Scrabble dictionary, sorted by score. Browse ${config.value}-letter word lists, find high-scoring plays, and study word patterns.`;
    } else if (config.type === "starts") {
      const letter = String(config.value).toUpperCase();
      description = `Browse all valid Scrabble and Wordle words starting with "${letter}". Filter by length 2-15, sorted by score. Find words beginning with ${letter} for Scrabble, Words with Friends, crossword puzzles, and anagram games.`;
    } else {
      const letter = String(config.value).toUpperCase();
      description = `Browse all valid Scrabble and Wordle words ending with "${letter}". Filter by length 2-15, find hooks and suffixes. Words ending in ${letter} for Scrabble, Words with Friends, crossword puzzles, and word game strategy.`;
    }
    const keywords = config.type === "length"
      ? [`${config.value} letter words`, `${config.value}-letter words`, `words with ${config.value} letters`, `scrabble ${config.value} letter words`, `wordle ${config.value} letter words`, `${config.value} letter word list`, `${config.value} letter scrabble words`, `words ${config.value} letters long`, `${config.value} letter words for scrabble`, `${config.value} letter words for wordle`, `${config.value} letter anagram words`, `${config.value} letter words with friends`, `list of ${config.value} letter words`, `${config.value} letter word finder`, `${config.value} letter word generator`]
      : config.type === "starts"
        ? [`words starting with ${String(config.value).toLowerCase()}`, `words beginning with ${String(config.value).toLowerCase()}`, `words that start with ${String(config.value).toLowerCase()}`, `scrabble words starting with ${String(config.value).toLowerCase()}`, `wordle words starting with ${String(config.value).toLowerCase()}`, `words starting with ${String(config.value).toLowerCase()} for scrabble`, `${String(config.value).toLowerCase()} words`, `words starting with ${String(config.value).toLowerCase()} wordle`, `words that begin with ${String(config.value).toLowerCase()}`, `scrabble words beginning with ${String(config.value).toLowerCase()}`, `word list starting with ${String(config.value).toLowerCase()}`, `words starting with letter ${String(config.value).toLowerCase()}`, `${String(config.value).toLowerCase()} starting words`, `words starting with ${String(config.value).toLowerCase()} for words with friends`, `find words starting with ${String(config.value).toLowerCase()}`]
        : [`words ending with ${String(config.value).toLowerCase()}`, `words ending in ${String(config.value).toLowerCase()}`, `words that end with ${String(config.value).toLowerCase()}`, `scrabble words ending with ${String(config.value).toLowerCase()}`, `wordle words ending with ${String(config.value).toLowerCase()}`, `words ending with ${String(config.value).toLowerCase()} for scrabble`, `${String(config.value).toLowerCase()} ending words`, `words that end in ${String(config.value).toLowerCase()}`, `scrabble words ending in ${String(config.value).toLowerCase()}`, `word list ending with ${String(config.value).toLowerCase()}`, `words ending with letter ${String(config.value).toLowerCase()}`, `${String(config.value).toLowerCase()} ending words wordle`, `words ending with ${String(config.value).toLowerCase()} for words with friends`, `find words ending with ${String(config.value).toLowerCase()}`, `words ending in ${String(config.value).toLowerCase()} word list`];
    // Canonical URL is relative (e.g. "/words-starts-with-a"); resolve to absolute
    // for og:url by joining with the site origin.
    const absoluteCanonical = canonical.startsWith("http")
      ? canonical
      : `${SITE_ORIGIN}${canonical}`;
    return {
      title,
      description,
      keywords,
      alternates: { canonical },
      openGraph: buildOpenGraph({ title, description, canonical: absoluteCanonical }),
      twitter: buildTwitter({ title, description }),
      robots: {
        index: true,
        follow: true,
        googleBot: { index: true, follow: true, ...DEFAULT_GOOGLE_BOT },
      },
    };
  }

  // 2. Legacy two-segment path: /unscramble/<slug>
  if (activeToolSlug === "unscramble" && subRoute && isWordListPage(subRoute)) {
    const config = parseWordListSlug(subRoute)!;
    const title = buildWordListTitle(config);
    const canonical = buildCanonicalWordListUrl(config);
    // Reuse the same per-config description builder as the single-segment branch
    // — avoids duplicate-content flag across ~1.8k programmatic pages.
    let description = "";
    if (config.type === "length") {
      description = `Complete list of ${config.value}-letter words for Scrabble, Wordle, Words with Friends, and anagram puzzles. Official Scrabble dictionary, sorted by score. Browse ${config.value}-letter word lists, find high-scoring plays, and study word patterns.`;
    } else if (config.type === "starts") {
      const letter = String(config.value).toUpperCase();
      description = `Browse all valid Scrabble and Wordle words starting with "${letter}". Filter by length 2-15, sorted by score. Find words beginning with ${letter} for Scrabble, Words with Friends, crossword puzzles, and anagram games.`;
    } else {
      const letter = String(config.value).toUpperCase();
      description = `Browse all valid Scrabble and Wordle words ending with "${letter}". Filter by length 2-15, find hooks and suffixes. Words ending in ${letter} for Scrabble, Words with Friends, crossword puzzles, and word game strategy.`;
    }
    const keywords = config.type === "length"
      ? [`${config.value} letter words`, `${config.value}-letter words`, `words with ${config.value} letters`, `scrabble ${config.value} letter words`, `wordle ${config.value} letter words`, `${config.value} letter word list`, `${config.value} letter scrabble words`, `words ${config.value} letters long`, `${config.value} letter words for scrabble`, `${config.value} letter words for wordle`, `${config.value} letter anagram words`, `${config.value} letter words with friends`, `list of ${config.value} letter words`, `${config.value} letter word finder`, `${config.value} letter word generator`]
      : config.type === "starts"
        ? [`words starting with ${String(config.value).toLowerCase()}`, `words beginning with ${String(config.value).toLowerCase()}`, `words that start with ${String(config.value).toLowerCase()}`, `scrabble words starting with ${String(config.value).toLowerCase()}`, `wordle words starting with ${String(config.value).toLowerCase()}`, `words starting with ${String(config.value).toLowerCase()} for scrabble`, `${String(config.value).toLowerCase()} words`, `words starting with ${String(config.value).toLowerCase()} wordle`, `words that begin with ${String(config.value).toLowerCase()}`, `scrabble words beginning with ${String(config.value).toLowerCase()}`, `word list starting with ${String(config.value).toLowerCase()}`, `words starting with letter ${String(config.value).toLowerCase()}`, `${String(config.value).toLowerCase()} starting words`, `words starting with ${String(config.value).toLowerCase()} for words with friends`, `find words starting with ${String(config.value).toLowerCase()}`]
        : [`words ending with ${String(config.value).toLowerCase()}`, `words ending in ${String(config.value).toLowerCase()}`, `words that end with ${String(config.value).toLowerCase()}`, `scrabble words ending with ${String(config.value).toLowerCase()}`, `wordle words ending with ${String(config.value).toLowerCase()}`, `words ending with ${String(config.value).toLowerCase()} for scrabble`, `${String(config.value).toLowerCase()} ending words`, `words that end in ${String(config.value).toLowerCase()}`, `scrabble words ending in ${String(config.value).toLowerCase()}`, `word list ending with ${String(config.value).toLowerCase()}`, `words ending with letter ${String(config.value).toLowerCase()}`, `${String(config.value).toLowerCase()} ending words wordle`, `words ending with ${String(config.value).toLowerCase()} for words with friends`, `find words ending with ${String(config.value).toLowerCase()}`, `words ending in ${String(config.value).toLowerCase()} word list`];
    const absoluteCanonical = canonical.startsWith("http")
      ? canonical
      : `${SITE_ORIGIN}${canonical}`;
    return {
      title,
      description,
      keywords,
      alternates: { canonical },
      openGraph: buildOpenGraph({ title, description, canonical: absoluteCanonical }),
      twitter: buildTwitter({ title, description }),
      robots: {
        index: true,
        follow: true,
        googleBot: { index: true, follow: true, ...DEFAULT_GOOGLE_BOT },
      },
    };
  }

  // 3. Core game/tool pages
  const metaConfig = TOOL_METADATA_REGISTRY[activeToolSlug];
  if (metaConfig) {
    const canonicalPath = activeToolSlug === "unscrambler" ? "/" : `/${activeToolSlug}`;
    const pageMeta: Metadata = {
      title: metaConfig.title,
      description: metaConfig.description,
      keywords: metaConfig.keywords,
      alternates: { canonical: canonicalPath },
      openGraph: buildOpenGraph({
        title: metaConfig.title,
        description: metaConfig.description,
        canonical: `${SITE_ORIGIN}${canonicalPath}`,
      }),
      // Always emit a page-specific Twitter card (override the root layout's
      // generic sitewide card). metaConfig.twitter, when present, overrides
      // the title/description copy (used by /blitz for custom game copy).
      twitter: buildTwitter({
        title: metaConfig.title,
        description: metaConfig.description,
        overrideTitle: metaConfig.twitter?.title,
        overrideDescription: metaConfig.twitter?.description,
      }),
      // Always emit robots + googleBot with max-image-preview:large so every
      // tool page can earn rich SERP previews (not just /blitz). Per-page
      // metaConfig.googleBot, if present, merges on top of the defaults.
      robots: {
        index: true,
        follow: true,
        googleBot: { index: true, follow: true, ...DEFAULT_GOOGLE_BOT, ...metaConfig.googleBot },
      },
    };

    return pageMeta;
  }

  // Fallback — omit title so root layout's default is used
  return {
    description: "Free word unscrambler, anagram solver, Wordle & Quordle helper with multi-language official Scrabble dictionaries.",
  };
}

// ROUTER JUNCTION: detects programmatic word-list slugs and passes them to
// MainToolView for client-side rendering via ProgrammaticSEOView.
//
// SERVER-SIDE DATA FETCH: For word-list slugs we pre-render the first 50 words
// on the server so users see them immediately when the page loads — no spinner,
// no client round-trip on initial page load. The client takes over for
// pagination ("Load more"), filter changes, and sort toggles.
//
// STATIC GENERATION: The most popular word-list pages (A-Z starts/ends, 5-7
// letter words) are pre-rendered at build time via generateStaticParams.
// This allows CDN caching and instant delivery — no server computation on
// each request. Less popular pages (8-15 letter, wordle starts/ends) are
// server-rendered on demand.
const ALPHABET = "abcdefghijklmnopqrstuvwxyz".split("");
const POPULAR_LENGTHS = ["5", "6", "7"]; // Most searched lengths

export async function generateStaticParams() {
  // Pre-generate the most popular word-list pages at build time:
  // - 26 starts-with pages (words-starts-with-a through words-starts-with-z)
  // - 26 ends-with pages (words-ends-with-a through words-ends-with-z)
  // - 3 length pages (5, 6, 7 letter words — most common Wordle lengths)
  // Total: 55 static pages (the rest render on-demand)
  const params: { tool: string[] }[] = [];

  for (const letter of ALPHABET) {
    params.push({ tool: [`words-starts-with-${letter}`] });
    params.push({ tool: [`words-ends-with-${letter}`] });
  }
  for (const len of POPULAR_LENGTHS) {
    params.push({ tool: [`unscramble-${len}-letter-words`] });
  }

  // Also pre-generate the core tool routes so they're cached at the CDN
  const coreTools = ["", "blitz", "scramble", "anagram", "wordle", "dictionary", "wordstarts", "wordends", "wordlists"];
  for (const tool of coreTools) {
    if (tool === "") {
      params.push({ tool: [] }); // homepage
    } else {
      params.push({ tool: [tool] });
    }
  }

  return params;
}

export const dynamicParams = true; // Allow on-demand rendering for non-static pages

// VideoGame structured data for the /blitz page — helps Google understand
// this is a playable game and potentially show it in game-specific results.
const blitzGameJsonLd = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  name: "Anagram Blitz",
  url: "https://wordizy.com/blitz",
  description: "Free online word unscramble game. Race against the clock to unscramble as many words as you can in 60 seconds. Daily challenges and infinite practice mode. No download, no sign-up.",
  genre: ["Word Game", "Puzzle", "Educational"],
  gamePlatform: ["Web Browser", "Mobile", "Desktop"],
  applicationCategory: "Game",
  operatingSystem: "Any",
  playMode: "SinglePlayer",
  numberOfPlayers: { "@type": "QuantitativeValue", minValue: 1, maxValue: 1 },
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD", availability: "https://schema.org/InStock" },
  publisher: { "@type": "Organization", name: "wordIzy", url: "https://wordizy.com" },
  inLanguage: "en",
  image: "https://wordizy.com/og-image.png",
  screenshot: "https://wordizy.com/og-image.png",
  datePublished: "2026-07-15",
  features: [
    "60-second timed rounds",
    "Daily challenge mode",
    "Infinite practice mode",
    "Scoring system with skip penalties",
    "Hint system",
    "Multi-language support (9 languages)",
  ],
  aggregateRating: undefined, // Add when you have real user ratings
};

// Breadcrumb structured data for the /blitz page (uses richer copy than the
// generic breadcrumb generator that fires for other tool pages).
const blitzBreadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "wordIzy — Word Tools", item: "https://wordizy.com" },
    { "@type": "ListItem", position: 2, name: "Anagram Blitz Game", item: "https://wordizy.com/blitz" },
  ],
};

export default async function Page({ params }: PageProps) {
  const resolvedParams = await params;
  const toolSegments = resolvedParams.tool || [];
  const activeToolSlug = toolSegments[0] || "";
  const subRoute = toolSegments[1] || "";

  let initialWordListData: InitialWordListPage | null = null;
  let topWordData: { word: string; score: number }[] | null = null;

  // Try single-segment programmatic slug
  if (isWordListPage(activeToolSlug)) {
    initialWordListData = getInitialWordListPage(activeToolSlug, "en", 50);
    topWordData = getTopScoringWords(activeToolSlug, "en", 10);
  }
  // Try legacy two-segment path: /unscramble/<slug>
  else if (activeToolSlug === "unscramble" && subRoute && isWordListPage(subRoute)) {
    initialWordListData = getInitialWordListPage(subRoute, "en", 50);
    topWordData = getTopScoringWords(subRoute, "en", 10);
  }

  // Only render the game structured data on the /blitz page
  const isBlitzPage = activeToolSlug === "blitz" || activeToolSlug === "game";

  // Generic BreadcrumbList for every non-blitz tool page (blitz has its own).
  const isCoreToolPage = Boolean(
    TOOL_METADATA_REGISTRY[activeToolSlug] &&
    !isBlitzPage &&
    activeToolSlug !== "unscrambler" // homepage has its own sitewide WebApplication breadcrumb
  );
  const toolBreadcrumbJsonLd =
    isCoreToolPage && TOOL_METADATA_REGISTRY[activeToolSlug]
      ? buildBreadcrumbJsonLd(
          activeToolSlug,
          TOOL_METADATA_REGISTRY[activeToolSlug].title,
        )
      : null;

  return (
    <>
      {isBlitzPage && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(blitzGameJsonLd) }}
        />
      )}
      {isBlitzPage && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(blitzBreadcrumbJsonLd) }}
        />
      )}
      {toolBreadcrumbJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(toolBreadcrumbJsonLd) }}
        />
      )}
      <MainToolView
        params={params}
        initialWordListData={initialWordListData}
        topWordData={topWordData}
      />
    </>
  );
}
