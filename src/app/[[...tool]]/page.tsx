import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MainToolView } from "@/components/site/main-tool-view";
import { TOOL_METADATA_REGISTRY } from "@/lib/meta-config";
import {
  isWordListPage,
  parseWordListSlug,
  buildCanonicalWordListUrl,
  WORD_LIST_LENGTHS,
  type WordListConfig,
} from "@/lib/word-list-urls";
import { getInitialWordListPage, getTopScoringWords, type InitialWordListPage } from "@/lib/word-list-data";
import { translations } from "@/components/i18n/translations";

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

// Build a FAQPage JSON-LD for tool pages that have FAQ sections.
// The FAQ content is sourced from the English translations (translations.en.faq[toolSlug])
// — English is the canonical SSR language, and the FAQ arrays are defined in translations.ts.
// FAQPage schema gets rich snippets in Bing/Google search results (expandable Q&A
// accordion under the page listing) → significantly higher CTR → more organic traffic.
//
// Not all tool routes have FAQs — only unscrambler, scramble, wordle, quordle,
// anagram, random, wordfeud, dictionary, scrabble, wordlists, wordstarts, wordends.
// Returns null if no FAQ exists for the given tool slug.
function buildFaqJsonLd(toolSlug: string): {
  "@context": string;
  "@type": "FAQPage";
  mainEntity: {
    "@type": "Question";
    name: string;
    acceptedAnswer: { "@type": "Answer"; text: string };
  }[];
} | null {
  // Map route slugs to FAQ keys in translations.en.faq.
  // Most slugs match directly (e.g. "scramble" → faq.scramble).
  // The homepage route is "" but its FAQ is under "unscrambler".
  const faqKey = toolSlug === "" || toolSlug === "unscrambler" ? "unscrambler" : toolSlug;

  const faqItems = (translations.en.faq as unknown as Record<string, { q: string; a: string }[]>)[faqKey];
  if (!faqItems || faqItems.length === 0) return null;

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };
}

// ---------------------------------------------------------------------------
// Programmatic word-list SEO builders (GSC-driven rewrite, 2026-11).
//
// Search Console data (Oct 13 – Nov 9, 2026) showed the word-list pages rank
// positions 6-9 for their long-tail queries with ~0% CTR (~3,000 impressions,
// 4 clicks). The old titles ("Words Starting With T") neither matched the
// dominant query phrasing ("words that start with t") nor gave a searcher a
// reason to click. These builders produce exact-match, count-enriched
// titles/descriptions instead, e.g. "1,173 5-Letter Words Starting With T —
// Wordle" / "Words That Start With T — 1,912 Valid Words". Counts come from
// the module-cached dictionary store, so there is no extra build cost.
// ---------------------------------------------------------------------------

/** Build the SEO title + description for a programmatic word-list config. */
function buildWordListSeo(config: WordListConfig): { title: string; description: string } {
  const dict = config.dict ?? "scrabble";
  const letter = String(config.value).toUpperCase();

  // Resolve real word counts from the (module-cached) dictionary store.
  const slug = buildCanonicalWordListUrl(config).replace(/^\//, "");
  const data = getInitialWordListPage(slug, "en", 1);
  const fmt = (n: number) => n.toLocaleString("en-US");
  const total = data?.total ?? 0;
  const count5 = data?.lengthCounts?.[5] ?? 0;

  if (config.type === "length") {
    const n = config.value as number;
    return {
      title: total > 0
        ? `${n}-Letter Words — ${fmt(total)} Valid Words`
        : `${n}-Letter Words — Complete Scrabble & Wordle List`,
      description: `Complete list of ${total > 0 ? `${fmt(total)} ` : ""}${n}-letter words from the official Scrabble dictionary, sorted by score. Browse ${n}-letter words for Scrabble, Wordle, Words with Friends, and anagram puzzles.`,
    };
  }

  const starts = config.type === "starts";

  if (dict === "wordle") {
    return {
      title: count5 > 0
        ? `${fmt(count5)} 5-Letter Words ${starts ? "Starting" : "Ending"} With "${letter}" — Wordle`
        : `Wordle Words That ${starts ? "Start" : "End"} With "${letter}"`,
      description: starts
        ? `${count5 > 0 ? `${fmt(count5)} five-letter ` : "All "}Wordle words that start with "${letter}", plus 6-7 letter Wordle word lists. Filter by length, sorted by score — find the best Wordle guesses starting with ${letter} fast.`
        : `${count5 > 0 ? `${fmt(count5)} five-letter ` : "All "}Wordle words that end with "${letter}", plus 6-7 letter Wordle word lists. Find Wordle hooks, suffixes, and ending patterns to solve today's puzzle fast.`,
    };
  }

  return {
    title: total > 0
      ? `Words That ${starts ? "Start" : "End"} With "${letter}" — ${fmt(total)} Valid Words`
      : `Words That ${starts ? "Start" : "End"} With "${letter}" — Scrabble Word List`,
    description: starts
      ? `${total > 0 ? `${fmt(total)} valid ` : "All "}words that start with "${letter}" in the official Scrabble dictionary. Filter by length 2-15, sorted by score — for Scrabble, Words with Friends, and crossword puzzles.`
      : `${total > 0 ? `${fmt(total)} valid ` : "All "}words that end with "${letter}" in the official Scrabble dictionary. Filter by length 2-15, find hooks and suffixes — for Scrabble, Words with Friends, and word game strategy.`,
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
    const { title, description } = buildWordListSeo(config);
    const canonical = buildCanonicalWordListUrl(config);
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
    // Reuse the same per-config SEO builders as the single-segment branch —
    // avoids duplicate-content flags across ~1.8k programmatic pages.
    const { title, description } = buildWordListSeo(config);
    const canonical = buildCanonicalWordListUrl(config);
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

  // 3. Hidden owner-only views — keep out of the search index.
  if (activeToolSlug === "inbox" || activeToolSlug === "dashboard") {
    return { robots: { index: false, follow: false } };
  }

  // 4. Core game/tool pages
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

// Hidden owner-only views served by the catch-all (not in the metadata
// registry) — kept reachable via the static params below.
const EXTRA_CATCHALL_SLUGS = ["inbox", "dashboard"] as const;

export async function generateStaticParams() {
  // Enumerate EVERY valid single-segment slug so the whole site is
  // statically prerendered. Combined with `dynamicParams = false` below,
  // any URL NOT in this list (junk like /nonexistent-page-xyz, /Wordle,
  // /wordle/foo) gets Next.js's built-in REAL 404 — previously the
  // catch-all rendered the homepage for any unknown slug with HTTP 200 +
  // "index, follow", a soft-404 duplicate-content problem that let Google
  // index unlimited homepage copies under arbitrary URLs.
  //
  // Legacy word-list variants (/words-starts-by-*, /words-starting-with-*,
  // /unscramble/<slug>, /N-letter-words) are deliberately NOT enumerated:
  // they are 308-redirected to their canonical URLs in next.config.ts, so
  // they never reach this route.
  const params: { tool: string[] }[] = [];

  // Homepage
  params.push({ tool: [] });

  // Every core tool / info page from the metadata registry (unscrambler,
  // scramble, wordle, quordle, scrabble, random, wordfeud, dictionary,
  // wordlists, wordstarts, wordends, wordle-starts, wordle-ends, about,
  // contact, privacy, terms, sitemap, blitz)
  for (const slug of Object.keys(TOOL_METADATA_REGISTRY)) {
    params.push({ tool: [slug] });
  }

  // Hidden owner-only views
  for (const slug of EXTRA_CATCHALL_SLUGS) {
    params.push({ tool: [slug] });
  }

  // Programmatic word-list pages:
  // - Scrabble starts/ends A-Z (52)
  // - Wordle starts/ends A-Z (52)
  // - Unscramble by length 2-15 (14)
  for (const letter of ALPHABET) {
    params.push({ tool: [`words-starts-with-${letter}`] });
    params.push({ tool: [`words-ends-with-${letter}`] });
    params.push({ tool: [`wordle-words-starts-with-${letter}`] });
    params.push({ tool: [`wordle-words-ends-with-${letter}`] });
  }
  for (const len of WORD_LIST_LENGTHS) {
    params.push({ tool: [`unscramble-${len}-letter-words`] });
  }

  return params;
}

// Every valid slug is prerendered above, so on-demand rendering is disabled:
// unknown slugs get a real 404 status + the styled not-found page. This is
// the hard guarantee behind the soft-404 fix.
export const dynamicParams = false;

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

// ---------------------------------------------------------------------------
// DEFENSIVE 404 GUARD (2026-11-11).
// The primary guarantee is `dynamicParams = false` above (unknown slugs never
// reach this component). These guards are defense-in-depth in case dynamic
// rendering is ever re-enabled: they keep the old behavior — rendering the
// homepage for ANY unrecognized slug with HTTP 200 "index, follow", a classic
// soft-404 duplicate-content problem — from ever coming back.
// ---------------------------------------------------------------------------

function isKnownCatchallSlug(slug: string): boolean {
  return (
    slug === "" ||
    (EXTRA_CATCHALL_SLUGS as readonly string[]).includes(slug) ||
    isWordListPage(slug) ||
    Boolean(TOOL_METADATA_REGISTRY[slug])
  );
}

export default async function Page({ params }: PageProps) {
  const resolvedParams = await params;
  const toolSegments = resolvedParams.tool || [];
  const activeToolSlug = toolSegments[0] || "";
  const subRoute = toolSegments[1] || "";

  // Unknown primary slug → 404 (previously rendered the homepage with 200).
  // "/game" used to alias the blitz page through dead switch-case code; it
  // now redirects to /blitz in next.config.ts. "/unscramble" (homepage
  // alias without a canonical) also redirects to "/" there.
  if (!isKnownCatchallSlug(activeToolSlug)) notFound();

  // Sub-routes: only the legacy /unscramble/<word-list-slug> pattern is a
  // valid two-segment path (and those are 301-redirected upstream anyway —
  // this is a defensive fallback). Everything else (/wordle/foo, /a/b/c) 404s.
  if (toolSegments.length > 1) {
    const isLegacyWordList =
      activeToolSlug === "unscramble" &&
      toolSegments.length === 2 &&
      isWordListPage(subRoute);
    if (!isLegacyWordList) notFound();
  }

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

  // FAQPage JSON-LD — for tool pages that have FAQ sections (unscrambler, scramble,
  // wordle, quordle, anagram, random, wordfeud, dictionary, scrabble, wordlists,
  // wordstarts, wordends). Gets rich snippets in Bing/Google search results.
  // Not rendered for blitz, info pages, or word-list programmatic pages.
  const faqJsonLd = isCoreToolPage || activeToolSlug === "" || activeToolSlug === "unscrambler"
    ? buildFaqJsonLd(activeToolSlug)
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
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
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
