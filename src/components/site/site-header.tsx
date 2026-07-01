"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Shuffle, RotateCw, Grid3x3, LayoutGrid, Repeat, Dices, Gamepad2,
  BookOpen, Trophy, List, Info, Mail, Shield, Map, Menu, ChevronDown, Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuTrigger, DropdownMenuLabel, DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ROUTES, type RouteDef } from "./routes";
import { useHashRoute } from "./use-hash-route";
import { useLanguage } from "@/components/i18n/language-provider";
import { LanguageSelector } from "./language-selector";
import { cn } from "@/lib/utils";

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  Shuffle, RotateCw, Grid3x3, LayoutGrid, Repeat, Dices, Gamepad2,
  BookOpen, Trophy, List, Info, Mail, Shield, Map,
};

function NavIcon({ name, className }: { name: string; className?: string }) {
  const Cmp = ICONS[name] ?? Shuffle;
  return <Cmp className={className} />;
}

export function SiteHeader() {
  const { route, navigate } = useHashRoute();
  const { t } = useLanguage();
  const [mobileOpen, setMobileOpen] = useState(false);

  const toolsRoutes = ROUTES.filter((r) => r.group === "tools" || r.id === "wordlists");
  const infoRoutes = ROUTES.filter((r) => r.group === "info");

  const go = (hash: string) => {
    navigate(hash);
    setMobileOpen(false);
  };

  const isActive = (r: RouteDef) => route.id === r.id;

  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-background/70 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between gap-3">
          {/* Logo */}
          <button
            onClick={() => go("/")}
            className="flex items-center gap-2 group shrink-0"
            aria-label="WordIzy home"
          >
            <span className="relative flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-brand to-brand-soft text-background font-bold shadow-lg shadow-brand/30">
              <Sparkles className="h-5 w-5" />
            </span>
            <span className="text-xl font-bold tracking-tight">
              Word<span className="text-gradient-brand">Izy</span>
            </span>
          </button>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-1 text-foreground/80 hover:text-brand">
                  {t.nav.tools}
                  <ChevronDown className="h-3.5 w-3.5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-60 glass-strong border-white/10">
                <DropdownMenuLabel className="text-xs text-muted-foreground uppercase tracking-wider">
                  {t.nav.tools}
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-white/10" />
                {toolsRoutes.map((r) => (
                  <DropdownMenuItem
                    key={r.id}
                    onClick={() => go(r.hash)}
                    className="gap-3 cursor-pointer focus:bg-white/10"
                  >
                    <NavIcon name={r.icon} className="h-4 w-4 text-brand" />
                    <span className="text-sm">{t.nav[r.labelKey]}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Link
              href="#/wordlists"
              onClick={(e) => { e.preventDefault(); go("/wordlists"); }}
              className={cn(
                "px-3 py-1.5 text-sm rounded-md transition-colors",
                isActive(ROUTES.find((r) => r.id === "wordlists")!) ? "text-brand" : "text-foreground/80 hover:text-brand"
              )}
            >
              {t.nav.wordlists}
            </Link>
            <Link
              href="#/about"
              onClick={(e) => { e.preventDefault(); go("/about"); }}
              className={cn(
                "px-3 py-1.5 text-sm rounded-md transition-colors",
                isActive(ROUTES.find((r) => r.id === "about")!) ? "text-brand" : "text-foreground/80 hover:text-brand"
              )}
            >
              {t.nav.about}
            </Link>
            <Link
              href="#/contact"
              onClick={(e) => { e.preventDefault(); go("/contact"); }}
              className={cn(
                "px-3 py-1.5 text-sm rounded-md transition-colors",
                isActive(ROUTES.find((r) => r.id === "contact")!) ? "text-brand" : "text-foreground/80 hover:text-brand"
              )}
            >
              {t.nav.contact}
            </Link>
          </nav>

          {/* Right: language + mobile */}
          <div className="flex items-center gap-2">
            <LanguageSelector />
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden rounded-full glass-soft" aria-label="Menu">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] glass-strong border-white/10 p-0">
                <SheetHeader className="px-5 pt-5">
                  <SheetTitle className="flex items-center gap-2">
                    <span className="text-lg font-bold">Word<span className="text-gradient-brand">Izy</span></span>
                  </SheetTitle>
                </SheetHeader>
                <div className="px-3 py-4 space-y-1 overflow-y-auto nice-scroll h-[calc(100vh-5rem)]">
                  <p className="px-3 pt-2 pb-1 text-[11px] uppercase tracking-wider text-muted-foreground">{t.nav.tools}</p>
                  {toolsRoutes.map((r) => (
                    <MobileItem key={r.id} r={r} active={isActive(r)} onClick={() => go(r.hash)} t={t} />
                  ))}
                  <p className="px-3 pt-4 pb-1 text-[11px] uppercase tracking-wider text-muted-foreground">{t.nav.more}</p>
                  {infoRoutes.map((r) => (
                    <MobileItem key={r.id} r={r} active={isActive(r)} onClick={() => go(r.hash)} t={t} />
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}

function MobileItem({ r, active, onClick, t }: { r: RouteDef; active: boolean; onClick: () => void; t: ReturnType<typeof useLanguage>["t"] }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors",
        active ? "bg-brand/10 text-brand" : "text-foreground/85 hover:bg-white/5"
      )}
    >
      <NavIcon name={r.icon} className="h-4 w-4 opacity-80" />
      {t.nav[r.labelKey]}
    </button>
  );
}
