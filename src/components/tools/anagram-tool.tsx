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
          tipsTitle={t.common.tipsTitle}
          tips={[
            { q: t.home.q1, a: t.home.a1 },
            { q: t.home.q2, a: t.home.a2 },
            { q: t.home.q3, a: t.home.a3 },
          ]}
        />
      </div>
    </>
  );
}
