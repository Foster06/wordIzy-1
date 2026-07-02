"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/components/i18n/language-provider";
import { cn } from "@/lib/utils";

export function ThemeToggle({ compact = false }: { compact?: boolean }) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const { t } = useLanguage();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  const isDark = (mounted ? resolvedTheme : "dark") === "dark";

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={cn(
        "rounded-full glass-soft hover:bg-white/10 text-foreground transition-colors",
        compact && "h-8 w-8"
      )}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      title={isDark ? t.common.languageLabel : t.common.languageLabel}
    >
      {mounted ? (
        isDark ? <Sun className="h-4 w-4 text-brand" /> : <Moon className="h-4 w-4 text-brand" />
      ) : (
        <Sun className="h-4 w-4 text-brand" />
      )}
    </Button>
  );
}
