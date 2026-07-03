"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun, Monitor } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/components/i18n/language-provider";
import { cn } from "@/lib/utils";

const THEMES = ["light", "dark", "system"] as const;
const ICONS = { light: Sun, dark: Moon, system: Monitor };

export function ThemeToggle({ compact = false, className }: { compact?: boolean; className?: string }) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const { t } = useLanguage();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  const currentTheme = mounted ? (theme as string) : "dark";

  const cycle = () => {
    const idx = THEMES.indexOf(currentTheme as typeof THEMES[number]);
    const next = THEMES[(idx + 1) % THEMES.length];
    setTheme(next);
  };

  const Icon = ICONS[currentTheme as keyof typeof ICONS] ?? Sun;

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={cycle}
      className={cn(
        "rounded-full glass-soft hover:bg-white/10 text-foreground transition-colors",
        compact && "h-8 w-8",
        className
      )}
      aria-label={`Theme: ${currentTheme}`}
      title={`Theme: ${currentTheme} (click to cycle)`}
    >
      {mounted ? <Icon className="h-4 w-4 text-brand" /> : <Sun className="h-4 w-4 text-brand" />}
    </Button>
  );
}
