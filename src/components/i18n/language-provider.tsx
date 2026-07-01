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

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<LanguageCode>("en");

  // hydrate from localStorage after mount (intentional setState-in-effect for SSR-safe localStorage read)
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
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
    try {
      window.localStorage.setItem(STORAGE_KEY, l);
    } catch {
      /* ignore */
    }
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
