"use client";

import { usePathname } from "next/navigation";
import { I18N_LANGS, LOCALIZED_TOOL_SLUGS } from "@/lib/i18n-seo";
import { isWordListPage } from "@/lib/word-list-urls";

/** Languages with a localized /{lang}/scrabble-words section. Mirrors
 *  DICT_LANGS in src/lib/scrabble-word-data.ts — hardcoded here so client
 *  bundles don't pull the dictionary data module. */
const DICT_LANGS = ["fr", "es", "it", "nl", "de", "pt"];

const TOOL_SLUGS = new Set<string>(LOCALIZED_TOOL_SLUGS);

/** Extract the browsing language from a pathname. Handles both the public
 *  form (/{lang}/…) and the internal prerender form (/i18n/{lang}/… — the
 *  App Router serves the localized route there, so that is what
 *  usePathname() returns during SSR). */
export function langFromPathname(pathname: string): string | null {
  const segs = pathname.split("/").filter(Boolean);
  if (segs[0] === "i18n") segs.shift();
  const first = segs[0];
  return first && (I18N_LANGS as readonly string[]).includes(first) ? first : null;
}

/** Map an internal path to its localized variant when one exists:
 *  "/dictionary" → "/fr/dictionary" while browsing French, "/" → "/fr",
 *  "/unscramble-5-letter-words" → "/fr/unscramble-5-letter-words".
 *  Paths without a localized variant (guides, hidden admin routes,
 *  /{ja,zh}/scrabble-words) are returned unchanged. Word-list programmatic
 *  pages now have localized variants in all 8 non-English languages. */
export function localizePath(path: string, lang: string | null): string {
  if (!lang) return path;
  const clean = path.split("?")[0].split("#")[0];
  const segs = clean.split("/").filter(Boolean);
  const slug = segs[0] ?? "";
  const hasVariant =
    slug === "" ||
    TOOL_SLUGS.has(slug) ||
    isWordListPage(slug) ||
    (slug === "scrabble-words" && DICT_LANGS.includes(lang));
  if (!hasVariant) return path;
  return `/${lang}${segs.length ? `/${segs.join("/")}` : ""}`;
}

/** Client hook: prefix internal links with the current language on localized
 *  pages, so every nav/footer/CTA link keeps the /{lang} scope. English pages
 *  and targets without a localized variant are returned unchanged. */
export function useLocalizedPath() {
  const pathname = usePathname();
  const lang = langFromPathname(pathname);
  return (path: string) => localizePath(path, lang);
}
