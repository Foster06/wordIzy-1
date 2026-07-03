"use client";

import { ROUTES, GROUP_ORDER, GROUP_LABELS, type RouteGroup } from "./routes";
import { useHashRoute } from "./use-hash-route";
import { useLanguage } from "@/components/i18n/language-provider";
import { AdSlot } from "./ad-slot";
import { Logo } from "./logo";

/** Footer with SOLVERS / TOOLS / SITE — 3-column grid, always visible (no hamburger).
 *  All categories use the same Inter font. */
export function SiteFooter() {
  const { navigate } = useHashRoute();
  const { t } = useLanguage();

  return (
    <footer className="mt-auto border-t border-white/5 bg-background/60 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-8">
        {/* Brand row */}
        <div className="flex items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-2.5">
            <Logo size="sm" />
            <span className="text-lg font-roboto-slab">Word<span className="text-gradient-brand">Izy</span></span>
          </div>
          <p className="text-xs text-muted-foreground text-right">
            © {new Date().getFullYear()} WordIzy. {t.footer.rights}
          </p>
        </div>

        {/* Description */}
        <p className="page-subtitle !text-[15px] text-muted-foreground max-w-2xl mb-6 text-center">
          Unscramble, Solve &amp; Discover Word
        </p>

        {/* SOLVERS / TOOLS / SITE — 3-column grid, always visible, same Inter font */}
        <div className="grid grid-cols-3 gap-4 sm:gap-6 mb-6">
          {GROUP_ORDER.map((group: RouteGroup) => {
            const groupRoutes = ROUTES.filter((r) => r.group === group);
            const labelKey = GROUP_LABELS[group];
            return (
              <div key={group}>
                <h3 className="nav-item !text-[11px] sm:!text-[13px] !font-semibold uppercase tracking-wider mb-2 sm:mb-3 text-brand">
                  {t.nav[labelKey]}
                </h3>
                <ul className="space-y-1.5 sm:space-y-2">
                  {groupRoutes.map((r) => (
                    <li key={r.id}>
                      <button
                        onClick={() => navigate(r.hash)}
                        className="nav-item !text-[12px] sm:!text-[15px] text-muted-foreground hover:text-brand transition-colors text-left break-words"
                      >
                        {t.nav[r.labelKey]}
                      </button>
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

        {/* Bottom links */}
        <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
          <button onClick={() => navigate("/privacy")} className="hover:text-brand transition-colors">{t.nav.privacy}</button>
          <button onClick={() => navigate("/contact")} className="hover:text-brand transition-colors">{t.nav.contact}</button>
          <button onClick={() => navigate("/sitemap")} className="hover:text-brand transition-colors">{t.nav.sitemap}</button>
        </div>
      </div>
    </footer>
  );
}
