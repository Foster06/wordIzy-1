"use client";

import { useState, useRef, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { useLanguage } from "@/components/i18n/language-provider";

interface HubSearchBarProps {
  mode: "starts" | "ends" | "length";
  dict?: "scrabble" | "wordle";
  placeholder?: string;
}

/**
 * Search bar on hub pages. For starts/ends mode, typing letters a-z and
 * pressing Enter (or clicking Browse) navigates to the dedicated page for
 * the first letter typed. For length mode, typing a number 2-15 navigates
 * to /unscramble-{n}-letter-words.
 *
 * The input allows multiple letters (no maxLength restriction) and preserves
 * focus across re-renders via a controlled state + ref.
 */
export function HubSearchBar({ mode, dict = "scrabble", placeholder }: HubSearchBarProps) {
  const { t } = useLanguage();
  const router = useRouter();
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const raw = value.trim().toLowerCase();
    if (!raw) return;

    if (mode === "length") {
      const n = parseInt(raw, 10);
      if (!Number.isNaN(n) && n >= 2 && n <= 15) {
        router.push(`/unscramble-${n}-letter-words`);
      }
    } else {
      const letter = raw[0];
      if (/^[a-z]$/.test(letter)) {
        let prefix: string;
        if (dict === "wordle") {
          prefix = mode === "starts" ? "/wordle-words-starts-with-" : "/wordle-words-ends-with-";
        } else {
          prefix = mode === "starts" ? "/words-starts-with-" : "/words-ends-with-";
        }
        router.push(`${prefix}${letter}`);
      }
    }
  };

  const defaultPlaceholder =
    mode === "length"
      ? t.hubPages.searchPlaceholderLength
      : dict === "wordle"
        ? mode === "starts"
          ? t.hubPages.searchPlaceholderWordleStarts
          : t.hubPages.searchPlaceholderWordleEnds
        : mode === "starts"
          ? t.hubPages.searchPlaceholderStarts
          : t.hubPages.searchPlaceholderEnds;

  return (
    <div className="max-w-2xl mx-auto rounded-xl border border-white/10 bg-white/[0.04] p-3 sm:p-4">
      <form onSubmit={handleSearch} className="flex items-center gap-2">
        <div className="relative flex-1 min-w-0">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none z-10" aria-hidden />
          <input
            ref={inputRef}
            name="q"
            type="text"
            inputMode={mode === "length" ? "numeric" : "text"}
            autoComplete="off"
            spellCheck={false}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder={placeholder ?? defaultPlaceholder}
            className="w-full h-11 pl-9 pr-3 rounded-md bg-transparent border border-white/10 text-sm uppercase tracking-wider placeholder:normal-case placeholder:tracking-normal focus-visible:border-brand focus:outline-none relative z-20"
            aria-label={placeholder ?? defaultPlaceholder}
          />
        </div>
        <button
          type="submit"
          className="h-11 px-4 rounded-md bg-brand text-background font-semibold text-sm hover:opacity-90 transition-opacity cursor-pointer shrink-0 relative z-30"
        >
          {t.hubPages.browseBtn}
        </button>
      </form>
    </div>
  );
}
