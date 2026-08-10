import type { Metadata } from "next";
import { MainToolView } from "@/components/site/main-tool-view";
import { TOOL_METADATA_REGISTRY } from "@/lib/meta-config";
import {
  isWordListPage,
  parseWordListSlug,
  buildWordListTitle,
  buildCanonicalWordListUrl,
} from "@/lib/word-list-urls";

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
export default function Page({ params }: PageProps) {
  return <MainToolView params={params} />;
}
