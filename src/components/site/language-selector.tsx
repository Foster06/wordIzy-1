"use client";

import { Check, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LANGUAGE_LIST } from "@/lib/languages";
import { useLanguage } from "@/components/i18n/language-provider";
import { cn } from "@/lib/utils";

export function LanguageSelector({ compact = false, className }: { compact?: boolean; className?: string }) {
  const { lang, setLang, t } = useLanguage();
  const current = LANGUAGE_LIST.find((l) => l.code === lang) ?? LANGUAGE_LIST[0];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className={cn(
            "gap-2 rounded-full glass-soft hover:bg-white/10 text-foreground",
            compact && "px-2",
            className
          )}
          aria-label={t.common.languageLabel}
        >
          <Globe className="h-4 w-4 text-brand" />
          <span className="text-lg leading-none">{current.flag}</span>
          {!compact && (
            <span className="hidden sm:inline text-xs font-medium">{current.nativeName}</span>
          )}
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
            onClick={() => setLang(l.code)}
            className="gap-3 cursor-pointer focus:bg-white/10"
          >
            <span className="text-lg leading-none">{l.flag}</span>
            <span className="flex-1 text-sm">{l.nativeName}</span>
            {l.code === lang && <Check className="h-4 w-4 text-brand" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
