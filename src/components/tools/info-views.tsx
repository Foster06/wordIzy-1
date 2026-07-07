"use client";

import { useState } from "react";
import { Info, Mail, Shield, Map, Send, Check, Loader2, AlertCircle, Shuffle, RotateCw, Grid3x3, LayoutGrid, Repeat, Dices, Gamepad2, BookOpen, Trophy, List, ArrowDownToLine, ArrowUpFromLine } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { GlassCard } from "@/components/site/glass-card";
import { AdSlot } from "@/components/site/ad-slot";
import { PageHeader } from "@/components/site/page-header";
import { useHashRoute } from "@/components/site/use-hash-route";
import { useLanguage } from "@/components/i18n/language-provider";
import { ROUTES } from "@/components/site/routes";
import { toast } from "sonner";

export function AboutView() {
  const { t } = useLanguage();
  return (
    <>
      <PageHeader badge={t.nav.about} title={t.about.title} icon={<Info className="h-6 w-6" />} />
      <div className="mt-6 space-y-6">
        <GlassCard className="p-6 sm:p-8">
          {/* Intro — larger, prominent lead paragraph */}
          <p className="text-base sm:text-lg text-foreground/90 leading-relaxed mb-6 max-w-3xl mx-auto">
            {t.about.intro}
          </p>
          {/* Sections with headings */}
          <div className="space-y-6 max-w-3xl mx-auto">
            {t.about.sections.map((section, i) => (
              <div key={i}>
                <h2 className="text-base sm:text-lg font-semibold text-brand mb-2 flex items-center gap-2">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-brand shrink-0" />
                  {section.heading}
                </h2>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed whitespace-pre-line">
                  {section.body}
                </p>
              </div>
            ))}
          </div>
        </GlassCard>
        <AdSlot format="horizontal" />
      </div>
    </>
  );
}

export function ContactView() {
  const { t, lang } = useLanguage();
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "sending") return;

    const form = e.currentTarget;
    const name = (form.elements.namedItem("name") as HTMLInputElement)?.value?.trim() ?? "";
    const email = (form.elements.namedItem("email") as HTMLInputElement)?.value?.trim() ?? "";
    const message = (form.elements.namedItem("message") as HTMLTextAreaElement)?.value?.trim() ?? "";

    if (!name || !email || !message) {
      toast.error(t.contact.error);
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message, locale: lang }),
      });

      if (!res.ok) {
        let errMsg = t.contact.error;
        try {
          const data = await res.json();
          if (data?.error && typeof data.error === "string") errMsg = data.error;
        } catch {
          /* ignore parse error, fall back to generic */
        }
        throw new Error(errMsg);
      }

      setStatus("sent");
      toast.success(t.contact.success);
      form.reset();
    } catch (err) {
      console.error("[contact] submit failed:", err);
      setStatus("error");
      toast.error(err instanceof Error ? err.message : t.contact.error);
    }
  };

  return (
    <>
      <PageHeader badge={t.nav.contact} title={t.contact.title} subtitle={t.contact.body} icon={<Mail className="h-6 w-6" />} />
      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_0.8fr]">
        <GlassCard strong className="p-6">
          {status === "sent" ? (
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/15 border border-emerald-500/40 mb-4">
                <Check className="h-7 w-7 text-emerald-300" />
              </div>
              <h3 className="text-base font-semibold text-foreground mb-1.5">{t.contact.success}</h3>
              <p className="text-sm text-muted-foreground max-w-sm">{t.contact.successDesc}</p>
              <Button onClick={() => setStatus("idle")} variant="ghost" className="mt-4 glass-soft rounded-lg">
                {t.contact.another}
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="name" className="text-xs text-muted-foreground">{t.contact.name}</Label>
                  <Input id="name" name="name" required maxLength={120} disabled={status === "sending"} className="glass-soft border-white/10 search-amber" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="email" className="text-xs text-muted-foreground">{t.contact.email}</Label>
                  <Input id="email" name="email" type="email" required maxLength={200} disabled={status === "sending"} className="glass-soft border-white/10 search-amber" />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="message" className="text-xs text-muted-foreground">{t.contact.message}</Label>
                <Textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  maxLength={5000}
                  disabled={status === "sending"}
                  className="glass-soft border-white/10 search-amber resize-none"
                />
              </div>
              <div className="text-xs text-muted-foreground">{t.contact.note}</div>
              {status === "error" && (
                <div className="flex items-center gap-2 rounded-lg border border-rose-500/40 bg-rose-500/10 px-3 py-2 text-xs text-rose-300">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  <span>{t.contact.error}</span>
                </div>
              )}
              <Button
                type="submit"
                disabled={status === "sending"}
                className="gap-2 bg-gradient-to-r from-brand to-brand-soft text-background font-semibold rounded-lg disabled:opacity-60"
              >
                {status === "sending" ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    {t.contact.sending}
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    {t.contact.send}
                  </>
                )}
              </Button>
            </form>
          )}
        </GlassCard>
        <GlassCard className="p-6 h-fit">
          <h3 className="text-sm font-semibold mb-2 text-brand">{t.nav.contact}</h3>
          <p className="text-sm text-muted-foreground leading-relaxed mb-3">{t.contact.body}</p>
          <a href="mailto:info.wordizy@proton.me" className="text-sm text-brand hover:underline font-medium">
            info.wordizy@proton.me
          </a>
        </GlassCard>
      </div>
    </>
  );
}

export function PrivacyView() {
  const { t } = useLanguage();
  return (
    <>
      <PageHeader badge={t.nav.privacy} title={t.privacy.title} icon={<Shield className="h-6 w-6" />} />
      <div className="mt-6 space-y-6">
        <GlassCard className="p-6 sm:p-8">
          {/* Intro — larger, prominent lead paragraph */}
          <p className="text-base sm:text-lg text-foreground/90 leading-relaxed mb-4 max-w-3xl mx-auto">
            {t.privacy.intro}
          </p>
          {/* Last updated badge */}
          <p className="text-xs text-muted-foreground/70 mb-6 max-w-3xl mx-auto">{t.privacy.lastUpdated}</p>
          {/* Sections with headings */}
          <div className="space-y-6 max-w-3xl mx-auto">
            {t.privacy.sections.map((section, i) => (
              <div key={i}>
                <h2 className="text-base sm:text-lg font-semibold text-brand mb-2 flex items-center gap-2">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-brand shrink-0" />
                  {section.heading}
                </h2>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed whitespace-pre-line">
                  {section.body}
                </p>
              </div>
            ))}

            {/* Third-party services — clickable service names (no visible URLs) */}
            {t.privacy.thirdPartyServices && t.privacy.thirdPartyServices.length > 0 && (
              <div>
                <h2 className="text-base sm:text-lg font-semibold text-brand mb-2 flex items-center gap-2">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-brand shrink-0" />
                  Third-Party Services
                </h2>
                <div className="space-y-3">
                  {t.privacy.thirdPartyServices.map((service, i) => (
                    <div key={i} className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                      <a
                        href={service.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-brand hover:underline font-medium"
                      >
                        {service.name}
                      </a>
                      {" — "}
                      {service.description}
                    </div>
                  ))}
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                    We do not sell, rent, or share your data with any other third parties.
                  </p>
                </div>
              </div>
            )}
          </div>
        </GlassCard>
        <AdSlot format="horizontal" />
      </div>
    </>
  );
}

export function SitemapView() {
  const { t } = useLanguage();
  const { navigate } = useHashRoute();
  return (
    <>
      <PageHeader badge={t.nav.sitemap} title={t.sitemap.title} subtitle={t.sitemap.body} icon={<Map className="h-6 w-6" />} />
      <div className="mt-6">
        <GlassCard className="p-6">
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {ROUTES.filter((r) => !r.hidden).map((r) => (
              <button
                key={r.id}
                onClick={() => navigate(r.hash)}
                className="text-left rounded-lg px-3 py-2.5 text-sm text-muted-foreground hover:text-brand hover:bg-white/5 transition-colors"
              >
                {t.nav[r.labelKey]}
              </button>
            ))}
          </div>
        </GlassCard>
      </div>
    </>
  );
}
