// src/lib/word-list-seo-i18n.ts
// Localized SEO title + description builder for programmatic word-list pages.
// Mirrors the English buildWordListSeo() in (main)/[[...tool]]/page.tsx but
// uses the per-language wordListPage translation templates + real word counts
// from the per-language dictionary (getInitialWordListPage(slug, lang)).
//
// Used by the localized i18n route (src/app/i18n/[lang]/[[...tool]]/page.tsx)
// to emit native-language titles/descriptions for /{lang}/unscramble-N-letter-words,
// /{lang}/words-starts-with-X, etc.

import { getInitialWordListPage } from "@/lib/word-list-data";
import { parseWordListSlug } from "@/lib/word-list-urls";
import { translations } from "@/components/i18n/translations";
import type { LanguageCode } from "@/lib/languages";

const LOCALE_MAP: Record<string, string> = {
  en: "en-US", fr: "fr-FR", de: "de-DE", es: "es-ES", it: "it-IT",
  pt: "pt-PT", nl: "nl-NL", ja: "ja-JP", zh: "zh-CN",
};

/** Build a localized SEO title + description for a word-list slug + language.
 *  Falls back to English translations if the language is missing from the
 *  translations registry (defensive — should never happen for the 9 supported
 *  languages, but prevents a crash if a new lang is added to I18N_LANGS before
 *  translations are complete). */
export function buildWordListSeoLocalized(
  slug: string,
  lang: string,
): { title: string; description: string } {
  const config = parseWordListSlug(slug);
  if (!config) return { title: "", description: "" };

  const t = (translations as Record<string, typeof translations.en>)[lang] ?? translations.en;
  const wlp = t.wordListPage;
  const data = getInitialWordListPage(slug, lang as LanguageCode, 1);
  const locale = LOCALE_MAP[lang] ?? "en-US";
  const fmt = (n: number) => n.toLocaleString(locale);
  const total = data?.total ?? 0;
  const count5 = data?.lengthCounts?.[5] ?? 0;
  const letter = String(config.value).toUpperCase();
  const wordsLabel = wlp.wordsCount; // "words" / "mots" / "Wörter" / "palabras" …

  if (config.type === "length") {
    const n = config.value as number;
    const h1 = wlp.titleLength.replace("{n}", String(n));
    return {
      title: total > 0 ? `${h1} — ${fmt(total)} ${wordsLabel}` : h1,
      description: wlp.descLength.replace("{n}", String(n)),
    };
  }

  const starts = config.type === "starts";
  const isWordle = (config.dict ?? "scrabble") === "wordle";
  const titleTemplate = isWordle
    ? (starts ? wlp.titleWordleStarts : wlp.titleWordleEnds)
    : (starts ? wlp.titleStarts : wlp.titleEnds);
  const descTemplate = starts ? wlp.descStarts : wlp.descEnds;
  const h1 = titleTemplate.replace("{letter}", letter);

  // Wordle pages lead with the 5-letter count (the Wordle-relevant bucket);
  // Scrabble pages lead with the total across all lengths.
  const leadCount = isWordle ? count5 : total;
  return {
    title: leadCount > 0 ? `${h1} — ${fmt(leadCount)} ${wordsLabel}` : h1,
    description: descTemplate.replace("{letter}", letter),
  };
}
