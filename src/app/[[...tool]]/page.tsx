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
      description = `Browse all ${config.value}-letter words for Scrabble, Wordle, and anagram puzzles. Filtered by official Scrabble dictionaries, sorted by score.`;
    } else if (config.type === "starts") {
      description = `Explore verified Scrabble words that start with the letter "${String(config.value).toUpperCase()}". Filter by length and score.`;
    } else {
      description = `Discover verified Scrabble words that end with the letter "${String(config.value).toUpperCase()}". Filter by length and find hooks.`;
    }
    return {
      title,
      description,
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
