"use client";

import { Sparkles } from "lucide-react";
import { ROUTES } from "./routes";
import { useHashRoute } from "./use-hash-route";
import { useLanguage } from "@/components/i18n/language-provider";
import { AdSlot } from "./ad-slot";

export function SiteFooter() {
  const { navigate } = useHashRoute();
  const { t } = useLanguage();
  const toolRoutes = ROUTES.filter((r) => r.group === "tools");
  const infoRoutes = ROUTES.filter((r) => r.group === "info" || r.group === "lists");

  return (
    <footer className="mt-auto border-t border-white/5 bg-background/60 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10">
        <div className="grid grid-cols-3 gap-4 sm:gap-6">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-brand to-brand-soft text-background">
                <Sparkles className="h-4 w-4" />
              </span>
              <span className="text-lg font-bold">Word<span className="text-gradient-brand">Izy</span></span>
            </div>
            <p className="text-sm text-muted-foreground max-w-md leading-relaxed">{t.footer.desc}</p>
            <p className="mt-3 text-xs text-muted-foreground/70">{t.brand.tagline} — {t.footer.madeWith}</p>
          </div>

          {/* Tools */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-brand mb-3">{t.nav.tools}</h3>
            <ul class="space-y-1.5 sm:space-y-2">
              {toolRoutes.slice(0, 8).map((r) => (
                <li key={r.id}>
                  <button
                    onClick={() => navigate(r.hash)}
                    className="text-sm text-muted-foreground hover:text-brand transition-colors text-left"
                  >
                    {t.nav[r.labelKey]}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* More */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-brand mb-3">{t.footer.links}</h3>
            <ul class="space-y-1.5 sm:space-y-2">
              {infoRoutes.map((r) => (
                <li key={r.id}>
                  <button
                    onClick={() => navigate(r.hash)}
                    className="text-sm text-muted-foreground hover:text-brand transition-colors text-left"
                  >
                    {t.nav[r.labelKey]}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 mb-6">
          <AdSlot format="horizontal" />
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-6 border-t border-white/5">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} WordIzy. {t.footer.rights}
          </p>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <button onClick={() => navigate("/privacy")} className="hover:text-brand transition-colors">{t.nav.privacy}</button>
            <button onClick={() => navigate("/contact")} className="hover:text-brand transition-colors">{t.nav.contact}</button>
            <button onClick={() => navigate("/sitemap")} className="hover:text-brand transition-colors">{t.nav.sitemap}</button>
          </div>
        </div>
      </div>
    </footer>
  );
}
