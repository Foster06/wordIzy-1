"use client";

import { Input } from "@/components/ui/input";
import { TileRack } from "./tile";
import { useLanguage } from "@/components/i18n/language-provider";
import { LANGUAGES } from "@/lib/languages";

interface LetterInputProps {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  maxLength?: number;
  id?: string;
  autoFocus?: boolean;
  onKeyDown?: (e: React.KeyboardEvent) => void;
}

/** Letter input with a live Scrabble tile-rack preview beneath it. */
export function LetterInput({
  value, onChange, placeholder, maxLength = 20, id, autoFocus, onKeyDown,
}: LetterInputProps) {
  const { lang, t } = useLanguage();
  const def = LANGUAGES[lang];

  return (
    <div className="space-y-2.5">
      <Input
        id={id}
        value={value}
        autoFocus={autoFocus}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={onKeyDown}
        placeholder={placeholder ?? t.common.yourLetters}
        maxLength={maxLength}
        className="h-12 text-lg font-semibold tracking-[0.2em] uppercase glass-soft border-white/10 focus-visible:border-brand focus-visible:ring-brand/30 placeholder:text-muted-foreground/50 placeholder:tracking-normal placeholder:font-normal placeholder:normal-case"
        autoComplete="off"
        spellCheck={false}
      />
      <TileRack letters={value} values={def.letterValues} size="md" />
    </div>
  );
}
