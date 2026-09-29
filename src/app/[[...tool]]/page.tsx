import type { Metadata } from "next";
import { MainToolView } from "@/components/site/main-tool-view";
import { TOOL_METADATA_REGISTRY } from "@/lib/meta-config";
import {
  isWordListPage,
  parseWordListSlug,
  buildWordListTitle,
  buildCanonicalWordListUrl,
} from "@/lib/word-list-urls";
import { getInitialWordListPage, type InitialWordListPage } from "@/lib/word-list-data";

interface PageProps {
  params: Promise<{ tool?: string[] }>;
}

// SERVER-SIDE METADATA ENGINE: unique titles/descriptions for Google bots.
// NOTE: We do NOT return partial `openGraph` objects here — Next.js shallow-
// merges OG and would drop `og:image`, `og:site_name`, `og:type`, `og:locale`
// from the root layout. Instead we set only `title` + `description` + `alternates`
// and let the root layout's `openGraph` inherit (with image).
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
    return {
      title,
      description,
      keywords,
      alternates: { canonical },
      openGraph: {
        title,
        description,
        images: [{ url: "/og-image.png", width: 1200, height: 630, alt: title }],
      },
    };
  }

  // 2. Legacy two-segment path: /unscramble/<slug>
  if (activeToolSlug === "unscramble" && subRoute && isWordListPage(subRoute)) {
    const config = parseWordListSlug(subRoute)!;
    const title = buildWordListTitle(config);
    const canonical = buildCanonicalWordListUrl(config);
    return {
      title,
      description: `Browse valid, dictionary-verified words matching ${title.toLowerCase()}.`,
      alternates: { canonical },
      openGraph: {
        title,
        description: `Browse valid, dictionary-verified words matching ${title.toLowerCase()}.`,
        images: [{ url: "/og-image.png", width: 1200, height: 630, alt: title }],
      },
    };
  }

  // 3. Core game/tool pages
  const metaConfig = TOOL_METADATA_REGISTRY[activeToolSlug];
  if (metaConfig) {
    return {
      title: metaConfig.title,
      description: metaConfig.description,
      keywords: metaConfig.keywords,
      alternates: { canonical: activeToolSlug === "unscrambler" ? "/" : `/${activeToolSlug}` },
      openGraph: {
        title: metaConfig.title,
        description: metaConfig.description,
        images: [{ url: "/og-image.png", width: 1200, height: 630, alt: metaConfig.title }],
      },
    };
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

export default async function Page({ params }: PageProps) {
  const resolvedParams = await params;
  const toolSegments = resolvedParams.tool || [];
  const activeToolSlug = toolSegments[0] || "";
  const subRoute = toolSegments[1] || "";

  let initialWordListData: InitialWordListPage | null = null;

  // Try single-segment programmatic slug
  if (isWordListPage(activeToolSlug)) {
    initialWordListData = getInitialWordListPage(activeToolSlug, "en", 50);
  }
  // Try legacy two-segment path: /unscramble/<slug>
  else if (activeToolSlug === "unscramble" && subRoute && isWordListPage(subRoute)) {
    initialWordListData = getInitialWordListPage(subRoute, "en", 50);
  }

  return (
    <MainToolView
      params={params}
      initialWordListData={initialWordListData}
    />
  );
}
