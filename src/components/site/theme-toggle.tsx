"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun, Monitor } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLanguage } from "@/components/i18n/language-provider";
import { cn } from "@/lib/utils";

export function ThemeToggle({ compact = false, className }: { compact?: boolean; className?: string }) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const { t } = useLanguage();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  const isDark = (mounted ? resolvedTheme : "dark") === "dark";
  const currentTheme = mounted ? theme : "dark";

  const icon = currentTheme === "system"
    ? <Monitor className="h-4 w-4 text-brand" />
    : isDark
      ? <Sun className="h-4 w-4 text-brand" />
      : <Moon className="h-4 w-4 text-brand" />;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "rounded-full glass-soft hover:bg-white/10 text-foreground transition-colors",
            compact && "h-8 w-8",
            className
          )}
          aria-label="Theme"
        >
          {icon}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40 glass-strong border-white/10">
        <DropdownMenuItem onClick={() => setTheme("light")} className="gap-2 cursor-pointer focus:bg-white/10">
          <Sun className="h-4 w-4" />
          <span className="text-sm">Light</span>
          {currentTheme === "light" && <span className="ml-auto text-brand">✓</span>}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")} className="gap-2 cursor-pointer focus:bg-white/10">
          <Moon className="h-4 w-4" />
          <span className="text-sm">Dark</span>
          {currentTheme === "dark" && <span className="ml-auto text-brand">✓</span>}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")} className="gap-2 cursor-pointer focus:bg-white/10">
          <Monitor className="h-4 w-4" />
          <span className="text-sm">System</span>
          {currentTheme === "system" && <span className="ml-auto text-brand">✓</span>}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
