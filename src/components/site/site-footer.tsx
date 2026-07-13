"use client";

import Link from "next/link"; // 🎯 ADDED: Standard Next.js Link element
import { ROUTES, GROUP_ORDER, GROUP_LABELS, type RouteGroup } from "./routes";
import { useLanguage } from "@/components/i18n/language-provider";
import { AdSlot } from "./ad-slot";
import { Logo } from "./logo";

/** Footer with SOLVERS / TOOLS / SITE — 3-column grid, always visible.
 *  Brand name + description on top, copyright bottom left.
 *  All text uses Bree Serif 15px. */
export function SiteFooter() {
  const { t } = useLanguage();

  return (
    <footer className="mt-auto border-t border-white/5 bg-background/60 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-8">
        {/* Brand + description */}
        <div className="mb-6">
          <div className="flex items-center gap-2.5 mb-2">
            <Logo size="sm" />
            <span className="text-lg font-roboto-slab" style={{ fontWeight: 700 }}>word<span className="text-gradient-brand">Izy</span></span>
          </div>
          <p className="font-bree !text-[15px] text-muted-foreground max-w-2xl">
            Unscramble, Solve &amp; Discover Word
          </p>
        </div>

        {/* SOLVERS / TOOLS / SITE — 3-column grid */}
        <div className="grid grid-cols-3 gap-4 sm:gap-6 mb-6">
          {GROUP_ORDER.map((group: RouteGroup) => {
            const groupRoutes = ROUTES.filter((r) => r.group === group && !r.hidden);
            const labelKey = GROUP_LABELS[group];
            return (
              <div key={group}>
                <h3 className="font-bree !text-[15px] !font-semibold uppercase tracking-wider mb-2 sm:mb-3 text-brand">
                  {t.nav[labelKey]}
                </h3>
                <ul className="space-y-1.5 sm:space-y-2">
                  {groupRoutes.map((r) => (
                    <li key={r.id}>
                      {/* 🎯 FIXED: Replaced legacy button/navigate with pure Next.js Link elements */}
                      <Link
                        href={r.hash}
                        className="font-bree !text-[15px] text-muted-foreground hover:text-brand transition-colors text-left break-words block cursor-pointer"
                      >
                        {t.nav[r.labelKey]}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        <div className="mb-6">
          <AdSlot format="horizontal" />
        </div>

        {/* Bottom row: copyright (left) + disclaimer (right) */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-6 border-t border-white/5">
          <p className="text-xs text-muted-foreground">
            © 2026 wordIzy. {t.footer.rights}
          </p>
          <p className="text-xs text-muted-foreground/60">
            {t.footer.disclaimer}
          </p>
        </div>
      </div>
    </footer>
  );
}
