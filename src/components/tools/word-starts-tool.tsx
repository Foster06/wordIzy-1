"use client";

import { useState } from "react";
import { ArrowDownToLine } from "lucide-react";
import { GlassCard } from "@/components/site/glass-card";
import { AdSlot } from "@/components/site/ad-slot";
import { PageHeader } from "@/components/site/page-header";
import { WordBucket, ALPHABET, LENGTHS } from "@/components/site/word-bucket";
import { TipsSection } from "@/components/site/tips-section";
import { useLanguage } from "@/components/i18n/language-provider";
import { LANGUAGES, type LanguageCode } from "@/lib/languages";
import { cn } from "@/lib/utils";
import { useLetterAvailability } from "@/components/site/use-letter-availability";
import { useLengthCounts } from "@/components/site/use-length-counts";

export function WordStartsTool() {
  const { t, lang } = useLanguage();
  const def = LANGUAGES[lang as LanguageCode];
  const [letter, setLetter] = useState("A");
  const [length, setLength] = useState<number | "all">("all");

  const numLength = length === "all" ? undefined : length;
  const { available: availableLetters } = useLetterAvailability(lang as LanguageCode, "starts", numLength);
  const lengthCounts = useLengthCounts(lang as LanguageCode, "starts", letter);

  const visibleLengths = length === "all" ? LENGTHS : [length];

  return (
    <>
      <PageHeader badge={t.nav.wordstarts} title={t.wordlists.startsBy} subtitle={t.wordlists.subtitle} icon={<ArrowDownToLine className="h-6 w-6" />} />
      <div className="mt-6 space-y-6">
        <GlassCard strong className="p-5">
          {/* Length sort row (2-7) with counts — ABOVE the A-Z letters */}
          <div className="mb-5">
            <p className="section-label !text-[14px] mb-2.5 text-muted-foreground">{t.wordlists.selectLength}</p>
            <div className="flex flex-wrap gap-2">
              <button onClick={() => setLength("all")} className={cn("h-14 px-4 rounded-md flex flex-col items-center justify-center gap-0.5 transition-colors", length === "all" ? "bg-brand text-background" : "glass-soft text-foreground/80 hover:text-brand")}>
                <span className="nav-item !text-[14px]">{t.common.allWords}</span>
              </button>
              {LENGTHS.map((l) => {
                const count = lengthCounts[l] ?? 0;
                return (
                  <button key={l} onClick={() => setLength(l)} className={cn("h-14 w-14 rounded-md flex flex-col items-center justify-center gap-0.5 transition-colors", length === l ? "bg-brand text-background" : "glass-soft text-foreground/80 hover:text-brand")}>
                    <span className="num-button">{l}</span>
                    {count > 0 && <span className="text-[9px] font-bold tabular-nums opacity-70">{count}</span>}
                  </button>
                );
              })}
            </div>
          </div>
          {/* A-Z letter row */}
          <div>
            <p className="section-label !text-[14px] mb-2.5 text-muted-foreground">{t.wordlists.letter}</p>
            <div className="flex flex-wrap gap-2">
              {ALPHABET.map((l) => {
                const isAvailable = availableLetters.has(l);
                return (
                  <button
                    key={l}
                    onClick={() => isAvailable && setLetter(l)}
                    disabled={!isAvailable}
                    className={cn(
                      "h-11 w-11 rounded-md flex items-center justify-center transition-colors",
                      !isAvailable && "opacity-25 cursor-not-allowed",
                      letter === l && isAvailable ? "bg-brand text-background" : isAvailable ? "glass-soft text-foreground/80 hover:text-brand" : "glass-soft text-muted-foreground"
                    )}
                  >
                    <span className="alpha-button">{l}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </GlassCard>

        <AdSlot format="horizontal" />

        <div className="space-y-4">
          <h2 className="yellow-heading text-brand">
            {t.wordlists.startsBy} "{letter}" — {length === "all" ? `${LENGTHS[0]}–${LENGTHS[LENGTHS.length - 1]}` : `${length}`} {t.common.length}
          </h2>
          <div className={cn("grid gap-4", length === "all" ? "lg:grid-cols-2" : "lg:grid-cols-1")}>
            {visibleLengths.map((l) => (
              <WordBucket key={l} lang={lang as LanguageCode} mode="starts" length={l} letter={letter} title={`${letter}… · ${l} ${t.common.length}`} />
            ))}
          </div>
        </div>

        <TipsSection title={t.faq.title} items={t.faq.wordstarts} />
        <AdSlot format="horizontal" />
        <p className="text-center text-xs text-muted-foreground">{def.flag} {def.nativeName} — official Scrabble dictionary filter applied</p>
      </div>
    </>
  );
}
