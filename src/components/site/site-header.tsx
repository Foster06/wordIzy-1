"use client";

import { useState, useEffect, useRef } from "react";
import {
  Shuffle, RotateCw, Grid3x3, LayoutGrid, Repeat, Dices, Gamepad2,
  BookOpen, Trophy, List, Info, Mail, Shield, Map, ChevronDown,
  ArrowDownToLine, ArrowUpFromLine,
} from "lucide-react";
import { ROUTES, DESKTOP_DROPDOWNS, type RouteDef } from "./routes";
import { useHashRoute } from "./use-hash-route";
import { useLanguage } from "@/components/i18n/language-provider";
import { LanguageSelector } from "./language-selector";
import { ThemeToggle } from "./theme-toggle";
import { Logo } from "./logo";
import { cn } from "@/lib/utils";

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  Shuffle, RotateCw, Grid3x3, LayoutGrid, Repeat, Dices, Gamepad2,
  BookOpen, Trophy, List, Info, Mail, Shield, Map, ArrowDownToLine, ArrowUpFromLine,
};

function NavIcon({ name, className }: { name: string; className?: string }) {
  const Cmp = ICONS[name] ?? Shuffle;
  return <Cmp className={className} />;
}

export function SiteHeader() {
  const { route, navigate } = useHashRoute();
  const { t } = useLanguage();
  const isActive = (r: RouteDef) => route.id === r.id;
  const go = (hash: string) => { navigate(hash); };

  const inlineRoutes = ROUTES.filter((r) => r.desktop === "inline");

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-white/5 bg-background/70 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-3 sm:px-6">
          <div className="flex h-16 items-center justify-between gap-3">
            {/* Logo */}
            <button onClick={() => go("/")} className="flex items-center gap-2.5 shrink-0" aria-label="WordIzy home">
              <Logo size="md" />
              <span className="text-lg sm:text-xl font-bold tracking-tight font-roboto-slab">
                Word<span className="text-gradient-brand">Izy</span>
              </span>
            </button>

            {/* Inline nav — scrollable on all viewports */}
            <nav className="flex items-center gap-0.5 flex-1 overflow-x-auto nice-scroll no-scrollbar min-w-0">
              {inlineRoutes.map((r) => (
                <button
                  key={r.id}
                  onClick={() => go(r.hash)}
                  className={cn(
                    "nav-item !text-[13px] sm:!text-[14px] px-2.5 sm:px-3 py-2 rounded-md transition-colors whitespace-nowrap shrink-0",
                    isActive(r) ? "text-brand" : "text-foreground/80 hover:text-brand"
                  )}
                >
                  {t.nav[r.labelKey]}
                </button>
              ))}
              {DESKTOP_DROPDOWNS.map((dd) => {
                const ddRoutes = ROUTES.filter((r) => r.desktop === dd.slot);
                const activeInDd = ddRoutes.some((r) => isActive(r));
                return (
                  <HoverDropdown
                    key={dd.slot}
                    label={t.nav[dd.labelKey]}
                    active={activeInDd}
                    routes={ddRoutes}
                    isActive={isActive}
                    t={t}
                    onGo={go}
                  />
                );
              })}
            </nav>

            {/* Right: language + theme */}
            <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
              <LanguageSelector compact />
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

/** Hover/click dropdown — pops up on hover, stays until click-outside or item select. */
function HoverDropdown({
  label, active, routes, isActive, t, onGo,
}: {
  label: string;
  active: boolean;
  routes: RouteDef[];
  isActive: (r: RouteDef) => boolean;
  t: ReturnType<typeof useLanguage>["t"];
  onGo: (hash: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const enter = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(true);
  };
  const leave = () => {
    closeTimer.current = setTimeout(() => setOpen(false), 120);
  };

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open]);

  return (
    <div ref={containerRef} className="relative shrink-0" onMouseEnter={enter} onMouseLeave={leave}>
      <button
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "nav-item !text-[14px] px-3 py-2 rounded-md transition-colors flex items-center gap-1 whitespace-nowrap",
          active || open ? "text-brand" : "text-foreground/80 hover:text-brand"
        )}
      >
        {label}
        <ChevronDown className={cn("h-3.5 w-3.5 transition-transform", open && "rotate-180")} />
      </button>
      {open && (
        <div className="absolute left-0 top-full pt-1 z-50">
          <div className="glass-blur-xl rounded-xl border border-white/10 py-2 min-w-[200px] shadow-2xl">
            {routes.map((r) => (
              <button
                key={r.id}
                onClick={() => { onGo(r.hash); setOpen(false); }}
                className={cn(
                  "nav-item !text-[14px] w-full flex items-center gap-2.5 px-4 py-2 text-left transition-colors",
                  isActive(r) ? "text-brand" : "text-foreground/80 hover:text-brand hover:bg-white/5"
                )}
              >
                <NavIcon name={r.icon} className="h-4 w-4 shrink-0 opacity-80" />
                <span>{t.nav[r.labelKey]}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
