"use client";

import { List } from "lucide-react";
import { useRouter } from "next/navigation";
import { GlassCard } from "@/components/site/glass-card";
import { AdSlot } from "@/components/site/ad-slot";
import { PageHeader } from "@/components/site/page-header";
import { TipsSection } from "@/components/site/tips-section";
import { ReturnButton } from "@/components/site/back-button";
import { useLanguage } from "@/components/i18n/language-provider";
import { WORD_LIST_LENGTHS } from "@/lib/word-list-urls";
import { cn } from "@/lib/utils";

export function WordlistsTool() {
  const { t } = useLanguage();
  const router = useRouter();

  const go = (n: number) => {
    router.push(`/unscramble-${n}-letter-words`);
  };

  return (
    <>
      <ReturnButton />
      <PageHeader badge={t.nav.wordlists} title={t.wordlists.title} subtitle="Browse every valid Scrabble word by length, from 2 to 15 letters. Each length has its own dedicated page." icon={<List className="h-6 w-6" />} />
      <div className="mt-6 space-y-6">
        <AdSlot format="horizontal" />

        <GlassCard strong className="p-5 sm:p-6">
          <h3 className="section-label !text-[14px] mb-4 text-brand flex items-center gap-2">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-brand" />
            Unscramble by Word Length (2–15 letters)
          </h3>
          <p className="text-xs text-muted-foreground mb-4">Click a number to browse all words of that length on a dedicated page.</p>
          <div className="flex flex-wrap gap-2">
            {WORD_LIST_LENGTHS.map((n) => (
              <button
                key={n}
                onClick={() => go(n)}
                className={cn(
                  "num-button h-14 w-14 rounded-md flex items-center justify-center transition-colors cursor-pointer",
                  "glass-soft text-foreground/80 hover:bg-brand hover:text-background"
                )}
                aria-label={`Browse ${n}-letter words`}
              >
                {n}
              </button>
            ))}
          </div>
        </GlassCard>

        <TipsSection title={t.faq.title} items={t.faq.wordlists} />
        <AdSlot format="horizontal" />
        <p className="text-center text-xs text-muted-foreground">All words filtered through official Scrabble dictionaries.</p>

        <div className="flex justify-center pt-2">
          <ReturnButton variant="button" label="Return to previous page" />
        </div>
      </div>
    </>
  );
}
