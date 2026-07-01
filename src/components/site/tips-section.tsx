"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { GlassCard } from "./glass-card";
import type { Translation } from "@/components/i18n/translations";

interface FaqItem {
  q: string;
  a: string;
}

/** Tips / FAQ accordion used on tool pages. */
export function TipsSection({ title, items }: { title: string; items: FaqItem[] }) {
  return (
    <GlassCard className="p-5 sm:p-6">
      <h2 className="text-lg font-semibold mb-1 text-foreground">{title}</h2>
      <Accordion type="single" collapsible className="w-full">
        {items.map((item, i) => (
          <AccordionItem key={i} value={`item-${i}`} className="border-white/10">
            <AccordionTrigger className="text-sm font-medium text-left hover:text-brand transition-colors">
              {item.q}
            </AccordionTrigger>
            <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
              {item.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </GlassCard>
  );
}

/** Standard FAQ block for the home/unscrambler page. */
export function HomeFaq({ t }: { t: Translation }) {
  return (
    <TipsSection
      title={t.home.faqTitle}
      items={[
        { q: t.home.q1, a: t.home.a1 },
        { q: t.home.q2, a: t.home.a2 },
        { q: t.home.q3, a: t.home.a3 },
        { q: t.home.q4, a: t.home.a4 },
      ]}
    />
  );
}
