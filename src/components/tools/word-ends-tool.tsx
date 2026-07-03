"use client";

import { useState } from "react";
import { ArrowUpFromLine } from "lucide-react";
import { GlassCard } from "@/components/site/glass-card";
import { AdSlot } from "@/components/site/ad-slot";
import { PageHeader } from "@/components/site/page-header";
import { WordBucket, ALPHABET, LENGTHS } from "@/components/site/word-bucket";
import { TipsSection } from "@/components/site/tips-section";
import { useLanguage } from "@/components/i18n/language-provider";
import { LANGUAGES, type LanguageCode } from "@/lib/languages";
import { cn } from "@/lib/utils";
import { useLetterAvailability } from "@/components/site/use-letter-availability";

export function WordEndsTool() {
  const { t, lang } = useLanguage();
  const def = LANGUAGES[lang as LanguageCode];
  const [letter, setLetter] = useState("A");
  const [length, setLength] = useState<number | "all">("all");

  const numLength = length === "all" ? undefined : length;
  const availableLetters = useLetterAvailability(lang as LanguageCode, "ends", numLength);

  const visibleLengths = length === "all" ? LENGTHS : [length];

  return (
    <>
      <PageHeader badge={t.nav.wordends} title={t.wordlists.endsBy} subtitle={t.wordlists.subtitle} icon={<ArrowUpFromLine className="h-6 w-6" />} />
      <div className="mt-6 space-y-6">
        <GlassCard strong className="p-5">
          {/* Length sort row (2-7) — ABOVE the A-Z letters */}
          <div className="mb-5">
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
            {t.wordlists.endsBy} “{letter}” — {length === "all" ? `${LENGTHS[0]}–${LENGTHS[LENGTHS.length - 1]}` : `${length}`} {t.common.length}
          </h2>
          <div className={cn("grid gap-4", length === "all" ? "lg:grid-cols-2" : "lg:grid-cols-1")}>
            {visibleLengths.map((l) => (
              <WordBucket key={l} lang={lang as LanguageCode} mode="ends" length={l} letter={letter} title={`…${letter} · ${l} ${t.common.length}`} />
            ))}
          </div>
        </div>

        <TipsSection title={t.faq.title} items={t.faq.wordends} />
        <AdSlot format="horizontal" />
        <p className="text-center text-xs text-muted-foreground">{def.flag} {def.nativeName} — official Scrabble dictionary filter applied</p>
      </div>
    </>
  );
}
