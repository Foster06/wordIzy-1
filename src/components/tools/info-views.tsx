"use client";

import { useState } from "react";
import Link from "next/link";
import { Info, Mail, Shield, Map, Send, Check, Loader2, AlertCircle, Shuffle, RotateCw, Grid3x3, LayoutGrid, Repeat, Dices, Gamepad2, BookOpen, Trophy, List, ArrowDownToLine, ArrowUpFromLine, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { GlassCard } from "@/components/site/glass-card";
import { AdSlot } from "@/components/site/ad-slot";
import { PageHeader } from "@/components/site/page-header";
import { useLanguage } from "@/components/i18n/language-provider";
import { ROUTES, GROUP_ORDER, GROUP_LABELS, type RouteGroup } from "@/components/site/routes";
import { WORD_LIST_LENGTHS, ALPHABET_LOWER, ALPHABET_UPPER } from "@/lib/word-list-urls";
import { toast } from "sonner";

const SITEMAP_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  Shuffle, RotateCw, Grid3x3, LayoutGrid, Repeat, Dices, Gamepad2,
  BookOpen, Trophy, List, Info, Mail, Shield, Map, ArrowDownToLine, ArrowUpFromLine,
};

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
          <a href="mailto:support@wordizy.com" className="text-sm text-brand hover:underline font-medium">
            support@wordizy.com
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
                  <p className="mt-4 text-sm sm:text-base font-bold text-brand leading-relaxed">
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
  return (
    <>
      <PageHeader badge={t.nav.sitemap} title={t.sitemap.title} subtitle={t.sitemap.body} icon={<Map className="h-6 w-6" />} />
      <div className="mt-6 space-y-6">
        {/* Core tools */}
        {GROUP_ORDER.map((group: RouteGroup) => {
          const groupRoutes = ROUTES.filter((r) => r.group === group && !r.hidden);
          const labelKey = GROUP_LABELS[group];
          return (
            <GlassCard key={group} className="p-5 sm:p-6 result-card">
              <h2 className="section-label !text-[14px] mb-4 text-brand flex items-center gap-2">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-brand" />
                {t.nav[labelKey]}
              </h2>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {groupRoutes.map((r) => {
                  const Icon = SITEMAP_ICONS[r.icon] ?? Shuffle;
                  return (
                    <Link
                      key={r.id}
                      href={r.hash}
                      className="group flex items-center gap-3 rounded-xl px-4 py-3 bg-white/[0.04] border border-white/[0.08] hover:bg-brand/10 hover:border-brand/30 transition-all text-left shadow-sm hover:shadow-md"
                    >
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand/10 border border-brand/20 group-hover:bg-brand/20 transition-colors">
                        <Icon className="h-4 w-4 text-brand" />
                      </div>
                      <span className="flex-1 text-sm font-medium text-foreground/80 group-hover:text-brand transition-colors truncate">
                        {t.nav[r.labelKey]}
                      </span>
                      <ChevronRight className="h-4 w-4 text-muted-foreground/40 group-hover:text-brand group-hover:translate-x-0.5 transition-all shrink-0" />
                    </Link>
                  );
                })}
              </div>
            </GlassCard>
          );
        })}

        {/* Programmatic: Unscramble by Length (2-15) */}
        <GlassCard className="p-5 sm:p-6 result-card">
          <h2 className="section-label !text-[14px] mb-4 text-brand flex items-center gap-2">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-brand" />
            Unscramble by Length
          </h2>
          <div className="flex flex-wrap gap-2">
            {WORD_LIST_LENGTHS.map((n) => (
              <Link
                key={n}
                href={`/unscramble-${n}-letter-words`}
                className="h-11 w-14 flex items-center justify-center rounded-md glass-soft text-foreground/80 hover:bg-brand hover:text-background transition-colors text-sm font-semibold tabular-nums"
              >
                {n}
              </Link>
            ))}
          </div>
        </GlassCard>

        {/* Programmatic: Words Starts By A-Z */}
        <GlassCard className="p-5 sm:p-6 result-card">
          <h2 className="section-label !text-[14px] mb-4 text-brand flex items-center gap-2">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-brand" />
            Words Starts With A-Z
          </h2>
          <div className="grid grid-cols-6 sm:grid-cols-9 md:grid-cols-13 gap-2">
            {ALPHABET_LOWER.map((letter, i) => (
              <Link
                key={letter}
                href={`/words-starts-by-${letter}`}
                className="h-11 w-full flex items-center justify-center rounded-md glass-soft text-foreground/80 hover:bg-brand hover:text-background transition-colors text-sm font-semibold"
              >
                {ALPHABET_UPPER[i]}
              </Link>
            ))}
          </div>
        </GlassCard>

        {/* Programmatic: Words Ends By A-Z */}
        <GlassCard className="p-5 sm:p-6 result-card">
          <h2 className="section-label !text-[14px] mb-4 text-brand flex items-center gap-2">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-brand" />
            Words Ends With A-Z
          </h2>
          <div className="grid grid-cols-6 sm:grid-cols-9 md:grid-cols-13 gap-2">
            {ALPHABET_LOWER.map((letter, i) => (
              <Link
                key={letter}
                href={`/words-ends-by-${letter}`}
                className="h-11 w-full flex items-center justify-center rounded-md glass-soft text-foreground/80 hover:bg-brand hover:text-background transition-colors text-sm font-semibold"
              >
                {ALPHABET_UPPER[i]}
              </Link>
            ))}
          </div>
        </GlassCard>

        {/* Guides section */}
        <GlassCard className="p-5 sm:p-6 result-card">
          <h2 className="section-label !text-[14px] mb-4 text-brand flex items-center gap-2">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-brand" />
            Guides
          </h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <Link
              href="/guides/best-wordle-starter-words"
              className="group flex items-center gap-3 rounded-xl px-4 py-3 bg-white/[0.04] border border-white/[0.08] hover:bg-brand/10 hover:border-brand/30 transition-all text-left shadow-sm hover:shadow-md"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand/10 border border-brand/20 group-hover:bg-brand/20 transition-colors">
                <BookOpen className="h-4 w-4 text-brand" />
              </div>
              <span className="flex-1 text-sm font-medium text-foreground/80 group-hover:text-brand transition-colors truncate">
                Best Wordle Starter Words
              </span>
              <ChevronRight className="h-4 w-4 text-muted-foreground/40 group-hover:text-brand group-hover:translate-x-0.5 transition-all shrink-0" />
            </Link>
          </div>
        </GlassCard>
      </div>
    </>
  );
}
