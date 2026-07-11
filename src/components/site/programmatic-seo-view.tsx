import { notFound } from "next/navigation";
import { WordList } from "@/components/site/word-list";

interface ProgrammaticSEOViewProps {
  slug: string;
}

function parseSlug(slug: string) {
  const lengthMatch = slug.match(/^(\d+)-letter-words$/);
  if (lengthMatch) return { type: "length", value: parseInt(lengthMatch[1]) };

  const startMatch = slug.match(/^words-starting-with-([a-z])$/);
  if (startMatch) return { type: "starts", value: startMatch[1] };

  return null;
}

export function ProgrammaticSEOView({ slug }: ProgrammaticSEOViewProps) {
  const config = parseSlug(slug);
  if (!config) notFound();

  let titleText = "";
  let descriptionText = "";

  if (config.type === "length") {
    titleText = `${config.value}-Letter Words`;
    descriptionText = `Complete directory list of valid ${config.value}-letter words for Wordle, Scrabble, and Anagram games.`;
  } else {
    titleText = `Words Starting With "${config.value.toUpperCase()}"`;
    descriptionText = `Explore verified word game terms that begin with the letter ${config.value.toUpperCase()} to win your next match.`;
  }

  // Fallback translations structure to pass down safely to your WordList layout
  const mockTranslations: any = {
    common: { wordsCount: "words found", points: "pts", copy: "Copy", showLess: "Prev", showMore: "Next", noResults: "No words found." }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <header className="border-b border-white/5 pb-4 space-y-1">
        <h1 className="text-3xl font-extrabold tracking-tight text-brand">{titleText}</h1>
        <p className="text-muted-foreground text-sm">{descriptionText}</p>
      </header>

      {/* Renders the list items matching the parameters */}
      <WordList 
        words={[{ word: "sample", score: 6 }]} // Hook up your dictionary arrays here!
        lang={{ code: "en", name: "English", flag: "🇺🇸", mainDict: "collins" } as any}
        t={mockTranslations}
        maxVisible={120}
      />

      <section className="text-xs text-muted-foreground leading-relaxed pt-4">
        <h2 className="text-sm font-semibold text-foreground mb-2">How to upgrade your game strategy</h2>
        <p>
          Studying targeted word lists is one of the easiest ways to improve your performance in competitive word games. 
          By understanding specific character length boundaries or starting anchors, you can make high-scoring plays on the board instantly.
        </p>
      </section>
    </div>
  );
}
