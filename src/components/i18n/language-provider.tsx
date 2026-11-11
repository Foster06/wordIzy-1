"use client";

import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { LanguageCode } from "@/lib/languages";
import { translations, type Translation } from "./translations";

interface LanguageContextValue {
  lang: LanguageCode;
  setLang: (l: LanguageCode) => void;
  t: Translation;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

const STORAGE_KEY = "wordizy-lang";

function detectInitial(): LanguageCode {
  if (typeof window === "undefined") return "en";
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY) as LanguageCode | null;
    if (saved && translations[saved]) return saved;
  } catch {
    /* ignore */
  }
  return "en";
}

/** Persist a language choice in BOTH localStorage (client state on English
 *  URLs) and the wordizy-lang cookie (server-side: guides SSR + the edge
 *  middleware language-preference redirect read it). Functional storage only
 *  — no consent needed, disclosed in the privacy policy. */
function persistChoice(l: LanguageCode) {
  try {
    window.localStorage.setItem(STORAGE_KEY, l);
    document.cookie = `${STORAGE_KEY}=${l};path=/;max-age=31536000`;
  } catch {
    /* ignore */
  }
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<LanguageCode>("en");

  // hydrate from localStorage after mount (intentional setState-in-effect for SSR-safe localStorage read)
  useEffect(() => {
    setLangState(detectInitial());
  }, []);

  // keep <html lang> in sync
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = lang;
    }
  }, [lang]);

  const setLang = useCallback((l: LanguageCode) => {
    setLangState(l);
    persistChoice(l);
  }, []);

  const value = useMemo<LanguageContextValue>(
    () => ({ lang, setLang, t: translations[lang] ?? translations.en }),
    [lang, setLang]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

/** URL-authoritative language scope for the localized subpaths (/de/wordle, …).
 *
 *  Rendered by src/app/i18n/[lang]/[[...tool]]/page.tsx AROUND MainToolView.
 *  Unlike the root LanguageProvider (which hydrates from localStorage), the
 *  scope initializes from the URL path segment — so the SSR HTML and the first
 *  client render are already in the page's language (no flash, no hydration
 *  mismatch, native-language content for crawlers). A user's explicit switch
 *  inside the scope still persists via localStorage + cookie, and the header
 *  LanguageSelector additionally navigates to the matching localized URL.
 */
export function LanguageScope({
  initial,
  children,
}: {
  initial: LanguageCode;
  children: React.ReactNode;
}) {
  const [lang, setLangState] = useState<LanguageCode>(initial);

  // keep <html lang> in sync
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = lang;
    }
  }, [lang]);

  const setLang = useCallback((l: LanguageCode) => {
    setLangState(l);
    persistChoice(l);
  }, []);

  const value = useMemo<LanguageContextValue>(
    () => ({ lang, setLang, t: translations[lang] ?? translations.en }),
    [lang, setLang]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    // Safe fallback so client components never crash if rendered outside provider.
    return { lang: "en", setLang: () => {}, t: translations.en };
  }
  return ctx;
}
