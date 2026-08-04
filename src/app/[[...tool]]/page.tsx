import type { Metadata } from "next";
import { MainToolView } from "@/components/site/main-tool-view";
import { TOOL_METADATA_REGISTRY } from "@/lib/meta-config";


interface PageProps {
  params: Promise<{ tool?: string[] }>;
}

// 🎯 SERVER-SIDE METADATA ENGINE: Delivers unique descriptions to Google bots automatically
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const toolSegments = resolvedParams.tool || [];
  const activeToolSlug = toolSegments[0] || "unscrambler";
  const subRoute = toolSegments[1] || "";

  // 1. Check if it's a programmatic landing page
  if (activeToolSlug === "unscramble" && subRoute) {
    let cleanTitle = "Word List Matrix";
    if (subRoute.endsWith("-letter-words")) {
      cleanTitle = `${subRoute.replace("-letter-words", "")}-Letter Words`;
    } else if (subRoute.startsWith("words-starting-with-")) {
      cleanTitle = `Words Starting With "${subRoute.replace("words-starting-with-", "").toUpperCase()}"`;
    } else if (subRoute.startsWith("words-ending-with-")) {
      cleanTitle = `Words Ending In "${subRoute.replace("words-ending-with-", "").toUpperCase()}"`;
    }

    return {
      title: cleanTitle,
      description: `Browse valid, dictionary-verified solutions matching ${cleanTitle.toLowerCase()} constraints. Optimized scoring data layouts built for competitive word plays.`,
    };
  }

  // 2. Check if it's a core game tool
  const metaConfig = TOOL_METADATA_REGISTRY[activeToolSlug];
  if (metaConfig) {
    return {
      title: metaConfig.title,
      description: metaConfig.description,
      keywords: metaConfig.keywords,
      openGraph: {
        title: metaConfig.title,
        description: metaConfig.description,
        url: `https://wordizy.com${resolvedParams.tool ? `/${activeToolSlug}` : ""}`,
      }
    };
  }

  // Fallback defaults
  return {
    title: "wordIzy — Multi-Language Word Unscrambler & Anagram Solver",
    description: "Free word unscrambler, anagram solver, Wordle & Quordle helper with multi-language official Scrabble dictionaries."
  };
}

// 🎯 THE ROUTER JUNCTION: Keeps your folder structure identical and passes control to the client layout
export default function Page({ params }: PageProps) {
  return <MainToolView params={params} />;
}
