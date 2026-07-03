"use client";

import { LettersSolver } from "./letters-solver";
import { PageHeader } from "@/components/site/page-header";
import { Repeat } from "lucide-react";
import { useLanguage } from "@/components/i18n/language-provider";

export function AnagramTool() {
  const { t } = useLanguage();
  return (
    <>
      <PageHeader
        badge={t.nav.anagram}
        title={t.anagram.title}
        subtitle={t.anagram.subtitle}
        icon={<Repeat className="h-6 w-6" />}
      />
      <div className="mt-6">
        <LettersSolver
          endpoint="/api/anagram"
          buttonLabel={t.anagram.btn}
          hint={t.anagram.hint}
          tipsTitle={t.faq.title}
          tips={t.faq.anagram}
          tipsCard={{
            title: "Tips",
            items: [
              "An anagram uses ALL the letters you provide — no more, no less.",
              "Wildcards (? or *) fill remaining slots but score 0 points.",
              "In Scrabble, a 7-letter anagram (bingo) earns a 50-point bonus.",
            ],
          }}
        />
      </div>
    </>
  );
}
