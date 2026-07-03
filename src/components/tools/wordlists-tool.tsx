"use client";

import { useState } from "react";
import { List } from "lucide-react";
import { GlassCard } from "@/components/site/glass-card";
import { AdSlot } from "@/components/site/ad-slot";
import { PageHeader } from "@/components/site/page-header";
import { WordBucket, ALPHABET, LENGTHS } from "@/components/site/word-bucket";
import { useLanguage } from "@/components/i18n/language-provider";
import type { LanguageCode } from "@/lib/languages";
import { LANGUAGES } from "@/lib/languages";
import { cn } from "@/lib/utils";
import { TipsSection } from "@/components/site/tips-section";
import { FAQ_TITLE, wordlistsFaq } from "@/components/site/faq-content";

const LENGTHS_ASC = LENGTHS;

export function WordlistsTool() {
  const { t, lang } = useLanguage();
  const def = LANGUAGES[lang as LanguageCode];
  const [length, setLength] = useState<number | "all">("all");
  const [letter, setLetter] = useState<string | "all">("all");

  const visibleLengths = length === "all" ? LENGTHS_ASC : [length];
  const visibleLetters = letter === "all" ? ALPHABET : [letter];

  return (
    <>
      <PageHeader badge={t.nav.wordlists} title={t.wordlists.title} subtitle={t.wordlists.subtitle} icon={<List className="h-6 w-6" />} />
      <div className="mt-6 space-y-6">
        <GlassCard strong className="p-5">
          <div className="space-y-5">
            {/* Length sort row (2-7) — TOP */}
            <div>
              <p className="section-label !text-[14px] mb-2.5 text-muted-foreground">{t.wordlists.selectLength}</p>
              <div className="flex flex-wrap gap-2">
                <button onClick={() => setLength("all")} className={cn("h-10 px-4 rounded-md transition-colors", length === "all" ? "bg-brand text-background" : "glass-soft text-foreground/80 hover:text-brand")}>
                  <span className="nav-item !text-[14px]">{t.common.allWords}</span>
                </button>
                {LENGTHS.map((l) => (
                  <button key={l} onClick={() => setLength(l)} className={cn("h-10 w-10 rounded-md flex items-center justify-center transition-colors", length === l ? "bg-brand text-background" : "glass-soft text-foreground/80 hover:text-brand")}>
                    <span className="num-button">{l}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* A-Z letter sort row — BELOW length */}
            <div>
              <p className="section-label !text-[14px] mb-2.5 text-muted-foreground">{t.wordlists.letter}</p>
              <div className="flex flex-wrap gap-2">
                <button onClick={() => setLetter("all")} className={cn("h-11 px-4 rounded-md transition-colors", letter === "all" ? "bg-brand text-background" : "glass-soft text-foreground/80 hover:text-brand")}>
                  <span className="nav-item !text-[14px]">{t.common.allWords}</span>
                </button>
                {ALPHABET.map((l) => (
                  <button key={l} onClick={() => setLetter(l)} className={cn("h-11 w-11 rounded-md flex items-center justify-center transition-colors", letter === l ? "bg-brand text-background" : "glass-soft text-foreground/80 hover:text-brand")}>
                    <span className="alpha-button">{l}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </GlassCard>

        <AdSlot format="horizontal" />

        {/* Each length category stacked 2 → 7 */}
        <div className="space-y-8">
          {visibleLengths.map((l) => (
            <section key={l} className="space-y-4">
              <div className="flex items-baseline gap-3 sticky top-16 z-20 bg-background/60 backdrop-blur-md py-2 -mx-2 px-2 rounded-md">
                <h2 className="yellow-heading text-brand flex items-baseline gap-1.5">
                  {l}
                  <span className="section-label !text-[12px] text-muted-foreground">-{t.common.length}</span>
                </h2>
                <span className="count-text !text-[16px] text-muted-foreground">
                  {t.wordlists.allWords} — {letter === "all" ? "A–Z" : letter}
                </span>
              </div>
              <div className={cn("grid gap-4", letter === "all" ? "md:grid-cols-2 lg:grid-cols-3" : "lg:grid-cols-1")}>
                {visibleLetters.map((lt) => (
                  <WordBucket key={lt} lang={lang as LanguageCode} mode="ends" length={l} letter={lt} title={`…${lt}`} breeStyle />
                ))}
              </div>
            </section>
          ))}
        </div>

        <TipsSection title={FAQ_TITLE} items={wordlistsFaq} />
        <AdSlot format="horizontal" />
        <p className="text-center text-xs text-muted-foreground">
          {def.flag} {def.nativeName} — official Scrabble dictionary filter applied
        </p>
      </div>
    </>
  );
}
