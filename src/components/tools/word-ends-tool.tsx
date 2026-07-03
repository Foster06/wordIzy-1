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
import { FAQ_TITLE, wordendsFaq } from "@/components/site/faq-content";

export function WordEndsTool() {
  const { t, lang } = useLanguage();
  const def = LANGUAGES[lang as LanguageCode];
  const [letter, setLetter] = useState("A");

  return (
    <>
      <PageHeader
        badge={t.nav.wordends}
        title={t.wordlists.endsBy}
        subtitle={t.wordlists.subtitle}
        icon={<ArrowUpFromLine className="h-6 w-6" />}
      />
      <div className="mt-6 space-y-6">
        <GlassCard strong className="p-5">
          <div className="mb-4">
            <p className="text-xs text-muted-foreground mb-2">{t.wordlists.letter}</p>
            <div className="flex flex-wrap gap-1.5">
              {ALPHABET.map((l) => (
                <button
                  key={l}
                  onClick={() => setLetter(l)}
                  className={cn(
                    "h-9 w-9 rounded-md text-sm font-bold transition-colors",
                    letter === l ? "bg-brand text-background" : "glass-soft text-foreground/80 hover:text-brand"
                  )}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>
        </GlassCard>

        <AdSlot format="horizontal" />

        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            {t.wordlists.endsBy} “{letter}” — {LENGTHS[0]}–{LENGTHS[LENGTHS.length - 1]} {t.common.length}
          </p>
          <div className="grid gap-4 lg:grid-cols-2">
            {LENGTHS.map((l) => (
              <WordBucket
                key={l}
                lang={lang as LanguageCode}
                mode="ends"
                length={l}
                letter={letter}
                title={`…${letter} · ${l} ${t.common.length}`}
              />
            ))}
          </div>
        </div>

        <TipsSection title={FAQ_TITLE} items={wordendsFaq} />
        <AdSlot format="horizontal" />
        <p className="text-center text-xs text-muted-foreground">
          {def.flag} {def.nativeName} — official Scrabble dictionary filter applied
        </p>
      </div>
    </>
  );
}
