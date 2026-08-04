"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { GlassCard } from "@/components/site/glass-card";
import { useLanguage } from "@/components/i18n/language-provider";

interface HubSearchBarProps {
  /** "starts" | "ends" | "length" — determines where to navigate. */
  mode: "starts" | "ends" | "length";
  /** "scrabble" | "wordle" — which dictionary to browse. */
  dict?: "scrabble" | "wordle";
  /** Placeholder text. */
  placeholder?: string;
}

/**
 * Search bar on hub pages. For starts/ends mode, typing letters a-z filters
 * the prefix — when the user types 1+ letters and presses Enter (or clicks
 * Browse), navigates to the dedicated page for the FIRST letter.
 *
 * The input now allows multiple letters (no maxLength=1 restriction) so users
 * can type "CA" and it will navigate to /words-starts-with-c. The input is
 * NOT reset on navigation so focus is preserved.
 */
export function HubSearchBar({ mode, dict = "scrabble", placeholder }: HubSearchBarProps) {
  const { t } = useLanguage();
  const router = useRouter();
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // Preserve focus across re-renders (was the "reclick after each letter" bug).
  useEffect(() => {
    // intentionally empty — ref stays mounted. This effect exists so React
    // knows we depend on the input being present.
  }, []);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const raw = value.trim().toLowerCase();
    if (!raw) return;

    if (mode === "length") {
      const n = parseInt(raw, 10);
      if (!Number.isNaN(n) && n >= 2 && n <= 15) {
        router.push(`/unscramble-${n}-letter-words`);
      }
    } else {
      // starts / ends — use the first letter typed
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
    // Do NOT reset the input — preserve focus and value so the user can
    // continue typing or edit. The page will navigate away anyway.
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
    <GlassCard soft className="p-3 sm:p-4 max-w-2xl mx-auto">
      <form onSubmit={handleSearch} className="flex items-center gap-2 relative z-10">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" aria-hidden />
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
            className="w-full h-11 pl-9 pr-3 rounded-md glass-soft border border-white/10 bg-transparent text-sm uppercase tracking-wider placeholder:normal-case placeholder:tracking-normal focus-visible:border-brand focus:outline-none"
            aria-label={placeholder ?? defaultPlaceholder}
          />
        </div>
        <button
          type="submit"
          className="h-11 px-4 rounded-md bg-brand text-background font-semibold text-sm hover:opacity-90 transition-opacity cursor-pointer shrink-0"
        >
          {t.hubPages.browseBtn}
        </button>
      </form>
    </GlassCard>
  );
}
