"use client";

import {
  Shuffle, RotateCw, Grid3x3, LayoutGrid, Repeat, Dices, Gamepad2,
  BookOpen, Trophy, List, Info, Mail, Shield, Map,
  ArrowDownToLine, ArrowUpFromLine,
} from "lucide-react";
import { ROUTES, GROUP_ORDER, GROUP_LABELS, type RouteDef } from "./routes";
import { useHashRoute } from "./use-hash-route";
import { useLanguage } from "@/components/i18n/language-provider";
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

/** Shared categorized navigation — used in the desktop sidebar and mobile drawer.
 *  Sections: SOLVERS / TOOLS / SITE. Nav items use Inter 18px/600. */
export function SidebarNav({ onNavigate, hideLogo }: { onNavigate?: () => void; hideLogo?: boolean }) {
  const { route, navigate } = useHashRoute();
  const { t } = useLanguage();
  const isActive = (r: RouteDef) => route.id === r.id;

  const go = (hash: string) => {
    navigate(hash);
    onNavigate?.();
  };

  return (
    <nav className="flex flex-col h-full">
      {/* Logo header (hidden when drawer provides its own) */}
      {!hideLogo && (
        <button
          onClick={() => go("/")}
          className="flex items-center gap-2.5 px-4 py-4 shrink-0"
          aria-label="wordIzy home"
        >
          <Logo size="md" />
          <span className="text-xl tracking-tight font-roboto-slab" style={{ fontWeight: 700 }}>
            word<span className="text-gradient-brand">Izy</span>
          </span>
        </button>
      )}

      {/* Scrollable nav sections */}
      <div className="flex-1 overflow-y-auto nice-scroll px-3 pb-4">
        {GROUP_ORDER.map((group) => {
          const groupRoutes = ROUTES.filter((r) => r.group === group && !r.hidden);
          const labelKey = GROUP_LABELS[group];
          return (
            <div key={group} className="mb-5">
              <h3 className="section-label !text-[12px] px-3 mb-1.5 text-brand/80">
                {t.nav[labelKey]}
              </h3>
              <ul className="space-y-0.5">
                {groupRoutes.map((r) => (
                  <li key={r.id}>
                    <button
                      onClick={() => go(r.hash)}
                      aria-current={isActive(r) ? "page" : undefined}
                      className={cn(
                        "w-full flex items-center gap-2.5 rounded-lg px-3 py-2 transition-colors text-left",
                        isActive(r)
                          ? "bg-brand/15 text-brand"
                          : "text-foreground/75 hover:bg-white/5 hover:text-foreground"
                      )}
                    >
                      <NavIcon name={r.icon} className="h-[18px] w-[18px] shrink-0 opacity-80" />
                      <span className="nav-item !text-[15px] truncate">{t.nav[r.labelKey]}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </nav>
  );
}

export { ICONS, NavIcon };
