"use client";

import {
  Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { LANGUAGE_LIST } from "@/lib/languages";
import { useLanguage } from "@/components/i18n/language-provider";

/** Dictionary selector bound to the global language state. */
export function DictionarySelect({ className }: { className?: string }) {
  const { lang, setLang, t } = useLanguage();
  return (
    <Select value={lang} onValueChange={(v) => setLang(v as typeof lang)}>
      <SelectTrigger className={className} aria-label={t.common.dictionaryLabel}>
        <SelectValue />
      </SelectTrigger>
      <SelectContent className="glass-strong border-white/10">
        <SelectGroup>
          <SelectLabel className="text-xs text-muted-foreground">{t.common.dictionaryLabel}</SelectLabel>
          {LANGUAGE_LIST.map((l) => (
            <SelectItem key={l.code} value={l.code} className="gap-2 focus:bg-white/10">
              <span className="mr-1">{l.flag}</span>
              {l.nativeName}
              {l.curated && <span className="ml-1 text-[10px] text-muted-foreground">★</span>}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
