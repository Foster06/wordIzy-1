"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { GlassCard } from "./glass-card";
import { useMounted } from "@/components/site/use-mounted";
import type { Translation } from "@/components/i18n/translations";

export type FaqItem = { q: string; a: string };

/** Tips / FAQ accordion used on tool pages. */
export function TipsSection({ title, items }: { title: string; items: FaqItem[] }) {
  const mounted = useMounted();

  return (
    <GlassCard className="p-5 sm:p-6 result-card">
      <h2 className="text-xl font-bold mb-3 text-foreground font-roboto-slab">{title}</h2>
      {mounted ? (
        <Accordion type="single" collapsible className="w-full">
          {items.map((item, i) => (
            <AccordionItem key={i} value={`item-${i}`} className="border-white/10">
              <AccordionTrigger className="text-sm sm:text-base font-semibold text-left hover:text-brand transition-colors">
                {item.q}
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground leading-relaxed pb-4">
                {item.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      ) : (
        // Static placeholder before mount — avoids Radix useId hydration mismatch.
        <div className="w-full">
          {items.map((item, i) => (
            <div key={i} className="border-b border-white/10 py-3">
              <p className="text-sm sm:text-base font-semibold text-left">{item.q}</p>
            </div>
          ))}
        </div>
      )}
    </GlassCard>
  );
}

/** Standard FAQ block for the home/unscrambler page. Includes the vault FAQ. */
export function HomeFaq({ t }: { t: Translation }) {
  return (
    <>
      <TipsSection title={t.faq.title} items={t.faq.unscrambler} />
      <TipsSection title={t.ui.saveVaultFaqTitle} items={t.faq.vault} />
    </>
  );
}
