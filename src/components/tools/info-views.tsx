"use client";

import { useState } from "react";
import { Info, Mail, Shield, Map, Send, Check } from "lucide-react";
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
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{t.about.body}</p>
        </GlassCard>
        <AdSlot format="horizontal" />
      </div>
    </>
  );
}

export function ContactView() {
  const { t } = useLanguage();
  const [sent, setSent] = useState(false);
  return (
    <>
      <PageHeader badge={t.nav.contact} title={t.contact.title} subtitle={t.contact.body} icon={<Mail className="h-6 w-6" />} />
      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_0.8fr]">
        <GlassCard strong className="p-6">
          {sent ? (
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/15 border border-emerald-500/40 mb-4">
                <Check className="h-7 w-7 text-emerald-300" />
              </div>
              <p className="text-sm text-muted-foreground">Thanks! Your message has been noted (no data is stored).</p>
              <Button onClick={() => setSent(false)} variant="ghost" className="mt-4 glass-soft rounded-lg">Send another</Button>
            </div>
          ) : (
            <form
              onSubmit={(e) => { e.preventDefault(); setSent(true); toast.success("Message sent"); }}
              className="space-y-4"
            >
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="name" className="text-xs text-muted-foreground">{t.contact.name}</Label>
                  <Input id="name" required className="glass-soft border-white/10 search-amber" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="email" className="text-xs text-muted-foreground">{t.contact.email}</Label>
                  <Input id="email" type="email" required className="glass-soft border-white/10 search-amber" />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="message" className="text-xs text-muted-foreground">{t.contact.message}</Label>
                <Textarea id="message" required rows={5} className="glass-soft border-white/10 search-amber resize-none" />
              </div>
              <Button type="submit" className="gap-2 bg-gradient-to-r from-brand to-brand-soft text-background font-semibold rounded-lg">
                <Send className="h-4 w-4" />
                {t.contact.send}
              </Button>
            </form>
          )}
        </GlassCard>
        <GlassCard className="p-6 h-fit">
          <h3 className="text-sm font-semibold mb-2 text-brand">{t.nav.contact}</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">{t.contact.body}</p>
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
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{t.privacy.body}</p>
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
            {ROUTES.map((r) => (
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
