"use client";

import { Ruler } from "lucide-react";
import { GlassCard } from "@/components/site/glass-card";
import { AdSlot } from "@/components/site/ad-slot";
import { PageHeader } from "@/components/site/page-header";
import { UnscrambleByLengthMatrix } from "@/components/site/internal-linking-matrix";
import { TipsSection } from "@/components/site/tips-section";
import { useLanguage } from "@/components/i18n/language-provider";

export function WordLengthsTool() {
  const { t } = useLanguage();
  const title = (t.wordPages?.lengthsTitle as string) ?? "Unscramble by Length";
  const subtitle = (t.wordPages?.lengthsSubtitle as string) ?? "Browse every valid Scrabble word from 2 to 15 letters.";
  return (
    <>
      <PageHeader badge={t.nav.wordlengths as string} title={title} subtitle={subtitle} icon={<Ruler className="h-6 w-6" />} />
      <div className="mt-6 space-y-6">
        <GlassCard strong className="p-4 sm:p-5">
          <UnscrambleByLengthMatrix />
        </GlassCard>
        <AdSlot format="horizontal" />
        <TipsSection title={t.faq.title} items={t.faq.wordlists} />
        <AdSlot format="horizontal" />
      </div>
    </>
  );
}
