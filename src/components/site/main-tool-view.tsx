"use client";

import { use } from "react";
import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { useHashRoute } from "@/components/site/use-hash-route";
import { useLanguage } from "@/components/i18n/language-provider";
import { GlassCard } from "@/components/site/glass-card";
import { ErrorBoundary } from "@/components/site/error-boundary";
import { RouteSeo } from "@/components/site/route-seo";
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
import { WordStartsTool } from "@/components/tools/word-starts-tool";
import { WordEndsTool } from "@/components/tools/word-ends-tool";
import { AboutView, ContactView, PrivacyView, SitemapView } from "@/components/tools/info-views";
import { InboxView } from "@/components/tools/inbox-view";
import { DashboardView } from "@/components/tools/dashboard-view";
import { ProgrammaticSEOView } from "@/components/site/programmatic-seo-view";
import { AnagramBlitz } from "@/components/tools/anagram-blitz";

interface MainToolViewProps {
  params: Promise<{ tool?: string[] }>;
}

function HomeHero() {
  const { t } = useLanguage();
  return (
    <GlassCard strong className="relative overflow-hidden p-6 sm:p-8 mb-6 text-center">
      <div className="absolute -top-20 -right-10 h-56 w-56 rounded-full bg-brand/15 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-10 h-56 w-56 rounded-full bg-brand-soft/10 blur-3xl pointer-events-none" />
      <div className="relative flex flex-col items-center">
        <h1 className="page-title tracking-tight">
          {t.home.title.split(" ")[0]} <span className="text-gradient-brand">{t.home.title.split(" ").slice(1).join(" ")}</span>
        </h1>
        <p className="page-subtitle mt-3 text-muted-foreground max-w-3xl">{t.home.subtitle}</p>
      </div>
    </GlassCard>
  );
}

export function MainToolView({ params }: MainToolViewProps) {
  const resolvedParams = use(params);
  const toolSegments = resolvedParams.tool || [];
  const { route } = useHashRoute();

  const renderView = () => {
    const primaryRoute = toolSegments[0] || "home";
    const subRoute = toolSegments[1] || "";

    if (primaryRoute === "unscramble" && subRoute) {
      return (
        <ErrorBoundary label="Programmatic Word Lists">
          <ProgrammaticSEOView slug={subRoute} />
        </ErrorBoundary>
      );
    }

    switch (route.id) {
      case "home":
        return (
          <>
            <HomeHero />
            <ErrorBoundary label="Unscrambler">
              <UnscramblerTool />
            </ErrorBoundary>
          </>
        );
         // 🎯 ADD THIS NEW CASE BLOCK FOR YOUR GAME:
      case "blitz":
      case "game":
        return (
          <ErrorBoundary label="Anagram Blitz Game">
            <div className="py-6 sm:py-10">
              <AnagramBlitz />
            </div>
          </ErrorBoundary>
        );
      case "scramble":
        return <ErrorBoundary label="Scramble Solver"><ScrambleTool /></ErrorBoundary>;
      case "wordle":
        return <ErrorBoundary label="Wordle Solver"><WordleTool /></ErrorBoundary>;
      case "quordle":
        return <ErrorBoundary label="Quordle Solver"><QuordleTool /></ErrorBoundary>;
      case "anagram":
        return <ErrorBoundary label="Anagram Solver"><AnagramTool /></ErrorBoundary>;
      case "random":
        return <ErrorBoundary label="Random Word"><RandomTool /></ErrorBoundary>;
      case "wordfeud":
        return <ErrorBoundary label="Wordfeud Helper"><WordfeudTool /></ErrorBoundary>;
      case "dictionary":
        return <ErrorBoundary label="Dictionary"><DictionaryTool /></ErrorBoundary>;
      case "scrabble":
        return <ErrorBoundary label="Scrabble Duplicate"><ScrabbleTool /></ErrorBoundary>;
      case "wordlists":
        return <ErrorBoundary label="Word Lists"><WordlistsTool /></ErrorBoundary>;
      case "wordstarts":
        return <ErrorBoundary label="Word Starts By"><WordStartsTool /></ErrorBoundary>;
      case "wordends":
        return <ErrorBoundary label="Word Ends By"><WordEndsTool /></ErrorBoundary>;
      case "about":
        return <ErrorBoundary label="About"><AboutView /></ErrorBoundary>;
      case "contact":
        return <ErrorBoundary label="Contact"><ContactView /></ErrorBoundary>;
      case "privacy":
        return <ErrorBoundary label="Privacy Policy"><PrivacyView /></ErrorBoundary>;
      case "sitemap":
        return <ErrorBoundary label="Sitemap"><SitemapView /></ErrorBoundary>;
      case "inbox":
        return <ErrorBoundary label="Inbox"><InboxView /></ErrorBoundary>;
      case "dashboard":
        return <ErrorBoundary label="Dashboard"><DashboardView /></ErrorBoundary>;
      default:
        return (
          <>
            <HomeHero />
            <ErrorBoundary label="Unscrambler">
              <UnscramblerTool />
            </ErrorBoundary>
          </>
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <RouteSeo route={route} />
      <ErrorBoundary label="Site Header">
        <SiteHeader />
      </ErrorBoundary>
      <main className="flex-1 mx-auto w-full max-w-7xl px-4 sm:px-6 py-6 sm:py-8 overflow-x-hidden">
        {renderView()}
      </main>
      <ErrorBoundary label="Site Footer">
        <SiteFooter />
      </ErrorBoundary>
    </div>
  );
}
