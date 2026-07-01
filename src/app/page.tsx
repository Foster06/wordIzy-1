"use client";

import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { useHashRoute } from "@/components/site/use-hash-route";
import { useLanguage } from "@/components/i18n/language-provider";
import { PageHeader } from "@/components/site/page-header";
import { GlassCard } from "@/components/site/glass-card";
import { AdSlot } from "@/components/site/ad-slot";
import { HomeFaq } from "@/components/site/tips-section";
import { Sparkles } from "lucide-react";
import { UnscramblerTool } from "@/components/tools/unscrambler-tool";
import { ScrambleTool } from "@/components/tools/scramble-tool";
import { WordleTool } from "@/components/tools/wordle-tool";
import { QuordleTool } from "@/components/tools/quordle-tool";
import { AnagramTool } from "@/components/tools/anagram-tool";
import { RandomTool } from "@/components/tools/random-tool";
import { WordfeudTool } from "@/components/tools/wordfeud-tool";
import { DictionaryTool } from "@/components/tools/dictionary-tool";
import { ScrabbleTool } from "@/components/tools/scrabble-tool";
import { WordlistsTool } from "@/components/tools/wordlists-tool";
import { AboutView, ContactView, PrivacyView, SitemapView } from "@/components/tools/info-views";

function HomeHero() {
  const { t } = useLanguage();
  return (
    <GlassCard strong className="relative overflow-hidden p-6 sm:p-8 mb-6">
      <div className="absolute -top-20 -right-10 h-56 w-56 rounded-full bg-brand/15 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-10 h-56 w-56 rounded-full bg-brand-soft/10 blur-3xl pointer-events-none" />
      <div className="relative">
        <div className="flex items-center gap-2 mb-3">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-brand/10 border border-brand/30 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-brand">
            <Sparkles className="h-3 w-3" /> {t.home.heroBadge}
          </span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight leading-tight">
          {t.home.title.split(" ")[0]} <span className="text-gradient-brand">{t.home.title.split(" ").slice(1).join(" ")}</span>
        </h1>
        <p className="mt-3 text-sm sm:text-base text-muted-foreground leading-relaxed max-w-3xl">{t.home.subtitle}</p>
      </div>
    </GlassCard>
  );
}

export default function Home() {
  const { route } = useHashRoute();

  const renderView = () => {
    switch (route.id) {
      case "home":
        return (
          <>
            <HomeHero />
            <UnscramblerTool />
          </>
        );
      case "scramble": return <ScrambleTool />;
      case "wordle": return <WordleTool />;
      case "quordle": return <QuordleTool />;
      case "anagram": return <AnagramTool />;
      case "random": return <RandomTool />;
      case "wordfeud": return <WordfeudTool />;
      case "dictionary": return <DictionaryTool />;
      case "scrabble": return <ScrabbleTool />;
      case "wordlists": return <WordlistsTool />;
      case "about": return <AboutView />;
      case "contact": return <ContactView />;
      case "privacy": return <PrivacyView />;
      case "sitemap": return <SitemapView />;
      default:
        return (
          <>
            <HomeHero />
            <UnscramblerTool />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1 mx-auto w-full max-w-7xl px-4 sm:px-6 py-6 sm:py-8">
        {renderView()}
      </main>
      <SiteFooter />
    </div>
  );
}
