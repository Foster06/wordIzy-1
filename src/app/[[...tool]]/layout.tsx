import type { Metadata } from "next";
import { TOOL_METADATA_REGISTRY } from "@/lib/meta-config";

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{ tool?: string[] }>;
}

// 🎯 SERVER-SIDE METADATA ENGINE: Injects unique title tags and descriptions for Google bots seamlessly
export async function generateMetadata({ params }: { params: Promise<{ tool?: string[] }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const toolSegments = resolvedParams.tool || [];
  const activeToolSlug = toolSegments[0] || "unscrambler";
  const subRoute = toolSegments[1] || "";

  // 1. Programmatic SEO Page Handler Matcher
  if (toolSegments[0] === "unscramble" && subRoute) {
    let cleanTitle = "Word Directory List Matrix";
    if (subRoute.endsWith("-letter-words")) {
      cleanTitle = `${subRoute.replace("-letter-words", "")}-Letter Words List`;
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

  // 2. Standalone Core Tools Matcher
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

  return {
    title: "wordIzy — Multi-Language Word Unscrambler & Anagram Solver",
    description: "Free word unscrambler, anagram solver, Wordle & Quordle helper with multi-language official Scrabble dictionaries."
  };
}

export default function ToolLayout({ children }: LayoutProps) {
  return <>{children}</>;
}
