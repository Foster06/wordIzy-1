"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link"; 
import {
  Shuffle, RotateCw, Grid3x3, LayoutGrid, Repeat, Dices, Gamepad2,
  BookOpen, Trophy, List, Info, Mail, Shield, Map, Menu, ChevronDown,
  ArrowDownToLine, ArrowUpFromLine, Star
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ROUTES, DESKTOP_DROPDOWNS, GROUP_ORDER, GROUP_LABELS, type RouteDef } from "./routes";
import { useHashRoute } from "./use-hash-route";
import { useLanguage } from "@/components/i18n/language-provider";
import { LanguageSelector } from "./language-selector";
import { ThemeToggle } from "./theme-toggle";
import { Logo } from "./logo";
import { cn } from "@/lib/utils";
import { FavoritesDrawer } from "./favorites-drawer";
import { useWordVault } from "@/hooks/use-word-vault";

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  Shuffle, RotateCw, Grid3x3, LayoutGrid, Repeat, Dices, Gamepad2,
  BookOpen, Trophy, List, Info, Mail, Shield, Map, ArrowDownToLine, ArrowUpFromLine,
};

function NavIcon({ name, className }: { name: string; className?: string }) {
  const Cmp = ICONS[name] ?? Shuffle;
  return <Cmp className={className} />;
}

export function SiteHeader() {
  const router = useRouter();
  const { route } = useHashRoute();
  const { t } = useLanguage();
  
  // 🎯 UNCONDITIONAL TOGGLE COUPLING: Direct, self-contained layout tracking
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  
  const { favorites } = useWordVault();
  const [mobileOpen, setMobileOpen] = useState(false);
  const isActive = (r: RouteDef) => route.id === r.id;

  const go = (hash: string) => { 
    setMobileOpen(false); 
    let cleanPath = hash.replace("/#", "").replace("#", "");
    
    if (cleanPath === "" || cleanPath === "home" || cleanPath === "/") {
      router.push("/");
      return;
    }
    
    if (!cleanPath.startsWith("/")) {
      cleanPath = `/${cleanPath}`;
    }
    
    router.push(cleanPath);
  };

  const inlineRoutes = ROUTES.filter((r) => r.desktop === "inline" && !r.hidden);
  const mobileGroups = GROUP_ORDER.map((g) => ({
    group: g,
    routes: ROUTES.filter((r) => r.group === g && !r.hidden),
  }));

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  // Safe fallback to prevent counting crash states if vault fails to sync
  const favoriteCount = favorites && Array.isArray(favorites) ? favorites.length : 0;

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-white/10 bg-background/80 backdrop-blur-xl shadow-sm">
        <div className="mx-auto max-w-7xl px-3 sm:px-6">
          <div className="flex h-16 items-center justify-between gap-3">
            {/* Left: hamburger (mobile) + logo */}
            <div className="flex items-center gap-2.5">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMobileOpen((v) => !v)}
                className="lg:hidden rounded-lg glass-soft"
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileOpen}
              >
                <Menu className="h-5 w-5" />
              </Button>
              <button onClick={() => go("/")} className="flex items-center gap-2 shrink-0" aria-label="wordIzy home">
                <Logo size="md" />
                <span className="text-base sm:text-xl tracking-tight font-roboto-slab" style={{ fontWeight: 700 }}>
                  word<span className="text-gradient-brand">Izy</span>
                </span>
              </button>
            </div>

            {/* Desktop inline nav */}
            <nav className="hidden lg:flex items-center gap-0 flex-1 min-w-0 overflow-visible">
              {inlineRoutes.map((r) => (
                <Link
                  key={r.id}
                  href={r.hash}
                  aria-current={isActive(r) ? "page" : undefined}
                  className={cn(
                    "nav-item !text-[14px] px-2 py-2 rounded-md transition-colors whitespace-nowrap cursor-pointer",
                    isActive(r) ? "text-brand" : "text-foreground/80 hover:text-brand"
                  )}
                >
                  {t.nav[r.labelKey]}
                </Link>
              ))}
              {DESKTOP_DROPDOWNS.map((dd) => {
                const ddRoutes = ROUTES.filter((r) => r.desktop === dd.slot && !r.hidden);
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

            {/* Right Side Control Banks */}
            <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
              
              {/* 🎯 FORCE TOGGLE ACTION ANCHOR */}
              <button
                onClick={() => {
                  console.log("Vault Button Tapped Status:", !isDrawerOpen);
                  setIsDrawerOpen(true);
                }}
                type="button"
                className="relative p-2 rounded-lg bg-white/[0.02] border border-white/5 text-muted-foreground hover:text-amber-500 hover:bg-white/[0.06] transition-all cursor-pointer flex items-center justify-center h-9 w-9"
                style={{ cursor: "pointer" }}
                aria-label="Open Saved Word Vault"
              >
                <Star className={`h-4 w-4 ${favoriteCount > 0 ? "text-amber-500 fill-amber-500" : ""}`} />
                
                {favoriteCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-amber-500 px-1 text-[9px] font-bold text-black tabular-nums">
                    {favoriteCount}
                  </span>
                )}
              </button>

              <LanguageSelector compact />
              <ThemeToggle />
            </div>
          </div>
        </div>

        {/* 🎯 MOUNTED VIA LOCAL COMPONENT BASE LAYERS BLOCK */}
        <FavoritesDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
      </header>

      {/* Mobile left drawer */}
      {mobileOpen && (
        <>
          <div
            className="lg:hidden fixed left-0 right-0 bottom-0 top-16 z-40 bg-black/40"
            style={{ backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)" }}
            onClick={() => setMobileOpen(false)}
            aria-hidden
          />
          <div
            className="lg:hidden fixed left-0 top-16 bottom-0 w-[320px] z-50 bg-background border-r border-white/10 flex flex-col"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
          >
            <div className="flex-1 overflow-y-auto nice-scroll px-3 py-4">
              {mobileGroups.map(({ group, routes: grpRoutes }) => (
                <div key={group}>
                  <p className="px-3 pt-4 pb-1 text-[11px] uppercase tracking-wider text-muted-foreground">{t.nav[GROUP_LABELS[group]]}</p>
                  {grpRoutes.map((r) => (
                    <button
                      key={r.id}
                      onClick={() => go(r.hash)}
                      aria-current={isActive(r) ? "page" : undefined}
                      className={cn(
                        "w-full flex items-center gap-3 rounded-lg px-3 py-2.5 transition-all duration-200 font-bree",
                        isActive(r)
                          ? "bg-brand/15 text-brand"
                          : "text-foreground/85 hover:bg-brand/10 hover:text-brand hover:translate-x-1"
                      )}
                    >
                      <NavIcon name={r.icon} className="h-4 w-4 opacity-80" />
                      <span className="!text-[16px]">{t.nav[r.labelKey]}</span>
                    </button>
                    ))}
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
}

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
          "nav-item !text-[14px] px-2 py-2 rounded-md transition-colors flex items-center gap-1 whitespace-nowrap",
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
                aria-current={isActive(r) ? "page" : undefined}
                className={cn(
                  "w-full flex items-center gap-2.5 rounded-lg px-3 py-2 text-left transition-colors font-bree text-[14px]",
                  isActive(r)
                    ? "bg-brand/10 text-brand font-medium"
                    : "text-foreground/90 hover:bg-white/[0.06] hover:text-brand"
                )}
              >
                <NavIcon name={r.icon} className="h-3.5 w-3.5 opacity-70" />
                <span>{t.nav[r.labelKey]}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
