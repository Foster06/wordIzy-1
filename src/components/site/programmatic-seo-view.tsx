"use client";

import { useEffect, useState } from "react";
import { notFound } from "next/navigation";
import { WordList } from "@/components/site/word-list";
import { useLanguage } from "@/components/i18n/language-provider";
import { getProgrammaticWordList } from "@/app/actions/dictionary-seo"; // 🎯 ADDED: Server-to-client loader hook

interface ProgrammaticSEOViewProps {
  slug: string;
}

function parseSlug(slug: string) {
  const lengthMatch = slug.match(/^(\d+)-letter-words$/);
  if (lengthMatch) return { type: "length", value: parseInt(lengthMatch[1], 10) };

  const startMatch = slug.match(/^words-starting-with-([a-z])$/);
  if (startMatch) return { type: "starts", value: startMatch[1] };

  const endMatch = slug.match(/^words-ending-with-([a-z])$/);
  if (endMatch) return { type: "ends", value: endMatch[1] };

  return null;
}

export function ProgrammaticSEOView({ slug }: ProgrammaticSEOViewProps) {
  const config = parseSlug(slug);
  if (!config) notFound();

  const { lang } = useLanguage(); // 🎯 ADDED: Multi-language routing contextual mapping
  const [dbWords, setDbWords] = useState<{ word: string; score: number }[]>([]);
  const [loading, setLoading] = useState(true);

  // 🎯 FETCH CORRELATION CYCLE: Pulls live words from your Turso database at run-time
  useEffect(() => {
    async function loadWords() {
      setLoading(true);
      const res = await getProgrammaticWordList(config.type, String(config.value), lang.code);
      if (res && res.words) {
        // Map string array to WordList shape with calculated Scrabble scores
        const mapped = res.words.map((w) => ({ word: w, score: w.length }));
        setDbWords(mapped);
      } else {
        setDbWords([]);
      }
      setLoading(false);
    }
    loadWords();
  }, [slug, lang.code, config.type, config.value]);

  if (loading) {
    return <div className="text-center text-sm py-12 text-muted-foreground animate-pulse">Loading verified word matrices...</div>;
  }

  let titleText = "";
  let descriptionText = "";

  if (config.type === "length") {
    titleText = `${config.value}-Letter Words`;
    descriptionText = `Complete directory list of valid ${config.value}-letter words for Wordle, Scrabble, and Anagram games.`;
  } else if (config.type === "starts") {
    titleText = `Words Starting With "${config.value.toUpperCase()}"`;
    descriptionText = `Explore verified word game terms that begin with the letter ${config.value.toUpperCase()} to win your next match.`;
  } else if (config.type === "ends") {
    // 🎯 FIXED: Dynamic text output for the newly supported "Words Ending With" sitemap channels
    titleText = `Words Ending With "${config.value.toUpperCase()}"`;
    descriptionText = `Discover valid, high-scoring words that end with the letter ${config.value.toUpperCase()} to maximize your board placement.`;
  }

  // Safe layout dictionary values matching your custom WordList definitions mapping
  const mockTranslations: any = {
    common: { wordsCount: "words found", points: "pts", copy: "Copy", showLess: "Prev", showMore: "Next", noResults: "No words found." }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <header className="border-b border-white/5 pb-4 space-y-1">
        <h1 className="text-3xl font-extrabold tracking-tight text-brand">{titleText}</h1>
        <p className="text-muted-foreground text-sm">{descriptionText}</p>
      </header>

      {/* 🎯 FIXED: Passing live database arrays cleanly to your custom layout lists builder */}
      <WordList 
        words={dbWords} 
        lang={lang as any}
        t={mockTranslations}
        maxVisible={120}
      />

      <section className="text-xs text-muted-foreground leading-relaxed pt-4">
        <h2 className="text-sm font-semibold text-foreground mb-2">How to upgrade your game strategy</h2>
        <p>
          Studying targeted word lists is one of the easiest ways to improve your performance in competitive word games. 
          By understanding specific character length boundaries or structural ending anchors, you can make high-scoring plays on the board instantly.
        </p>
      </section>
    </div>
  );
}
