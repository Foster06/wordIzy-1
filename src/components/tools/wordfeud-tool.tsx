"use client";

import { LettersSolver } from "./letters-solver";
import { PageHeader } from "@/components/site/page-header";
import { Gamepad2 } from "lucide-react";
import { useLanguage } from "@/components/i18n/language-provider";

export function WordfeudTool() {
  const { t } = useLanguage();
  return (
    <>
      <PageHeader
        badge={t.nav.wordfeud}
        title={t.wordfeud.title}
        subtitle={t.wordfeud.subtitle}
        icon={<Gamepad2 className="h-6 w-6" />}
      />
      <div className="mt-6">
        <LettersSolver
          endpoint="/api/unscramble"
          buttonLabel={t.wordfeud.btn}
          hint={t.wordfeud.hint}
          tipsTitle={t.faq.title}
          tips={t.faq.wordfeud}
        />
      </div>
    </>
  );
}
