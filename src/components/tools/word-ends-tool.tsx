"use client";

import { ArrowUpFromLine } from "lucide-react";
import Link from "next/link";
import { GlassCard } from "@/components/site/glass-card";
import { AdSlot } from "@/components/site/ad-slot";
import { PageHeader } from "@/components/site/page-header";
import { TipsSection } from "@/components/site/tips-section";
import { ReturnButton } from "@/components/site/back-button";
import { HubSearchBar } from "@/components/site/hub-search-bar";
import { useLanguage } from "@/components/i18n/language-provider";
import { ALPHABET_LOWER, ALPHABET_UPPER } from "@/lib/word-list-urls";

export function WordEndsTool() {
  const { t } = useLanguage();

  return (
    <>
      <ReturnButton />
      <PageHeader badge={t.nav.wordends} title={t.wordlists.endsBy} subtitle={t.hubPages.endsSubtitle} icon={<ArrowUpFromLine className="h-6 w-6" />} />
      <div className="mt-6 space-y-6">
        <HubSearchBar mode="ends" />
        <AdSlot format="horizontal" />

        <GlassCard strong className="p-5 sm:p-6">
          <h3 className="section-label !text-[14px] mb-4 text-brand flex items-center gap-2">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-brand" />
            {t.hubPages.endsHeading}
          </h3>
          <p className="text-xs text-muted-foreground mb-4">{t.hubPages.clickLetterEnds}</p>
          <div className="grid grid-cols-6 sm:grid-cols-9 md:grid-cols-13 gap-2">
            {ALPHABET_LOWER.map((letter, i) => (
              <Link
                key={letter}
                href={`/words-ends-with-${letter}`}
                className="alpha-button h-11 w-full flex items-center justify-center rounded-md glass-soft text-foreground/80 hover:bg-brand hover:text-background transition-colors cursor-pointer"
                aria-label={`Browse words ending with ${ALPHABET_UPPER[i]}`}
              >
                {ALPHABET_UPPER[i]}
              </Link>
            ))}
          </div>
        </GlassCard>

        <TipsSection title={t.faq.title} items={t.faq.wordends} />
        <TipsSection title="Save Vault — How to use it" items={t.faq.vault} />
        <AdSlot format="horizontal" />

        <div className="flex justify-center pt-2">
          <ReturnButton variant="button" label={t.hubPages.returnHome} />
        </div>
      </div>
    </>
  );
}
