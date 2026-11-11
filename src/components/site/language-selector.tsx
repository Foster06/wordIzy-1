"use client";

import { Check, Globe } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LANGUAGE_LIST, type LanguageCode } from "@/lib/languages";
import { useLanguage } from "@/components/i18n/language-provider";
import { cn } from "@/lib/utils";

const LANG_CODES: Record<string, string> = {
  en: "EN", fr: "FR", es: "ES", it: "IT", pt: "PT",
  de: "DE", nl: "NL", ja: "JA", zh: "ZH",
};

/** Languages with localized subpaths + the tool slugs that exist there.
 *  Must mirror src/lib/i18n-seo.ts and src/middleware.ts. */
const I18N_LANGS = ["de", "fr", "es", "it", "pt", "nl", "ja", "zh"];
const LOCALIZED_SLUGS = new Set([
  "scramble", "anagram", "wordle", "quordle", "scrabble", "random", "wordfeud",
  "dictionary", "wordlists", "wordstarts", "wordends", "wordle-starts",
  "wordle-ends", "about", "contact", "privacy", "terms", "sitemap", "blitz",
]);

export function LanguageSelector({ compact = false, className }: { compact?: boolean; className?: string }) {
  const { lang, setLang, t } = useLanguage();
  const pathname = usePathname();
  const router = useRouter();
  const current = LANGUAGE_LIST.find((l) => l.code === lang) ?? LANGUAGE_LIST[0];
  const code = LANG_CODES[current.code] ?? current.code.toUpperCase();

  const handleSelect = (e: Event, code: LanguageCode) => {
    e.preventDefault();
    // Update state + persist (localStorage + wordizy-lang cookie) first so
    // pages without a localized URL (guides, word lists) switch instantly and
    // SSR follows the choice.
    setLang(code);

    // URL-aware navigation: when the current page has a localized variant,
    // move to it so the URL, metadata and hreflang stay consistent.
    const segs = pathname.split("/").filter(Boolean);
    const isLocalizedUrl = segs.length > 0 && I18N_LANGS.includes(segs[0]);
    const bare = isLocalizedUrl ? segs.slice(1) : segs;
    const slug = bare[0] ?? "";
    const hasLocalizedVariant = slug === "" || LOCALIZED_SLUGS.has(slug);
    const hash = typeof window !== "undefined" ? window.location.hash : "";

    if (code === "en") {
      // /de/wordle → /wordle, /de → /
      if (isLocalizedUrl) {
        router.push(`/${bare.join("/")}` || "/" + hash);
        return;
      }
    } else if (hasLocalizedVariant) {
      // /wordle → /de/wordle, /de/wordle → /fr/wordle, / → /de
      router.push(`/${code}${bare.length ? `/${bare.join("/")}` : ""}${hash}`);
      return;
    }
    // Otherwise (guides, word-list or scrabble-word pages): stay on the URL —
    // the UI already switched via setLang, and the cookie carries the choice
    // to the next server-rendered request.
  };

  const triggerContent = (
    <>
      <Globe className="h-4 w-4 text-brand" />
      <span className="text-base leading-none">{current.flag}</span>
      <span className="text-xs font-bold uppercase tracking-wider text-brand">{code}</span>
    </>
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className={cn(
            "gap-1.5 rounded-full glass-soft hover:bg-white/10 text-foreground",
            compact && "px-2",
            className
          )}
          aria-label={t.common.languageLabel}
        >
          {triggerContent}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 glass-strong border-white/10">
        <DropdownMenuLabel className="text-xs text-muted-foreground uppercase tracking-wider">
          {t.common.languageLabel}
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-white/10" />
        {LANGUAGE_LIST.map((l) => (
          <DropdownMenuItem
            key={l.code}
            onSelect={(e) => handleSelect(e, l.code)}
            className="gap-3 cursor-pointer focus:bg-white/10"
          >
            <span className="text-lg leading-none">{l.flag}</span>
            <span className="flex-1 text-sm">{l.nativeName}</span>
            <span className="text-[10px] font-bold uppercase tracking-wider text-brand">{LANG_CODES[l.code] ?? l.code.toUpperCase()}</span>
            {l.code === lang && <Check className="h-4 w-4 text-brand" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
