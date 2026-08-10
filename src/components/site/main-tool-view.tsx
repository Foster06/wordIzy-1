"use client";

import dynamic from "next/dynamic";
import { use } from "react";
import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { useHashRoute } from "@/components/site/use-hash-route";
import { useLanguage } from "@/components/i18n/language-provider";
import { GlassCard } from "@/components/site/glass-card";
import { ErrorBoundary } from "@/components/site/error-boundary";
import { RouteSeo } from "@/components/site/route-seo";
import { isWordListPage } from "@/lib/word-list-urls";
// Lazy-load UnscramblerTool — it's only needed on the home route, but eager
// import would force every visitor (including word-list pages) to download
// and parse it. Dynamic import means it only loads when the home route renders.
const UnscramblerTool = dynamic(
  () => import("@/components/tools/unscrambler-tool").then((m) => m.UnscramblerTool),
);
import Link from "next/link";
import { BookOpen, ChevronRight } from "lucide-react";

const ScrambleTool = dynamic(
  () => import("@/components/tools/scramble-tool").then((m) => m.ScrambleTool),
);
const WordleTool = dynamic(
  () => import("@/components/tools/wordle-tool").then((m) => m.WordleTool),
);
const QuordleTool = dynamic(
  () => import("@/components/tools/quordle-tool").then((m) => m.QuordleTool),
);
const AnagramTool = dynamic(
  () => import("@/components/tools/anagram-tool").then((m) => m.AnagramTool),
);
const RandomTool = dynamic(
  () => import("@/components/tools/random-tool").then((m) => m.RandomTool),
);
const WordfeudTool = dynamic(
  () => import("@/components/tools/wordfeud-tool").then((m) => m.WordfeudTool),
);
const DictionaryTool = dynamic(
  () => import("@/components/tools/dictionary-tool").then((m) => m.DictionaryTool),
);
const ScrabbleTool = dynamic(
  () => import("@/components/tools/scrabble-tool").then((m) => m.ScrabbleTool),
);
const WordlistsTool = dynamic(
  () => import("@/components/tools/wordlists-tool").then((m) => m.WordlistsTool),
);
const WordStartsTool = dynamic(
  () => import("@/components/tools/word-starts-tool").then((m) => m.WordStartsTool),
);
const WordEndsTool = dynamic(
  () => import("@/components/tools/word-ends-tool").then((m) => m.WordEndsTool),
);
const WordleStartsTool = dynamic(
  () => import("@/components/tools/wordle-starts-tool").then((m) => m.WordleStartsTool),
);
const WordleEndsTool = dynamic(
  () => import("@/components/tools/wordle-ends-tool").then((m) => m.WordleEndsTool),
);
const AboutView = dynamic(
  () => import("@/components/tools/info-views").then((m) => m.AboutView),
);
const ContactView = dynamic(
  () => import("@/components/tools/info-views").then((m) => m.ContactView),
);
const PrivacyView = dynamic(
  () => import("@/components/tools/info-views").then((m) => m.PrivacyView),
);
const SitemapView = dynamic(
  () => import("@/components/tools/info-views").then((m) => m.SitemapView),
);
const InboxView = dynamic(
  () => import("@/components/tools/inbox-view").then((m) => m.InboxView),
);
const DashboardView = dynamic(
  () => import("@/components/tools/dashboard-view").then((m) => m.DashboardView),
);
import { ProgrammaticSEOView } from "@/components/site/programmatic-seo-view";
const AnagramBlitz = dynamic(
  () => import("@/components/tools/anagram-blitz").then((m) => m.AnagramBlitz),
);

// Server-fetched initial word-list data (for SSR — first 50 words are
// pre-rendered so users see them immediately on page load, no spinner).
import type { InitialWordListPage } from "@/lib/word-list-data";

interface MainToolViewProps {
  params: Promise<{ tool?: string[] }>;
  initialWordListData?: InitialWordListPage | null;
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

export function MainToolView({ params, initialWordListData }: MainToolViewProps) {
  const resolvedParams = use(params);
  const toolSegments = resolvedParams.tool || [];
  const { route } = useHashRoute();
  const { t } = useLanguage();

  const renderView = () => {
    const primaryRoute = toolSegments[0] || "home";
    const subRoute = toolSegments[1] || "";

    // Single-segment programmatic page: /words-starts-by-c, /unscramble-5-letter-words, etc.
    if (isWordListPage(primaryRoute)) {
      return (
        <ErrorBoundary label="Word List">
          <ProgrammaticSEOView slug={primaryRoute} initialData={initialWordListData} />
        </ErrorBoundary>
      );
    }

    // Legacy two-segment path: /unscramble/<slug>
    if (primaryRoute === "unscramble" && subRoute && isWordListPage(subRoute)) {
      return (
        <ErrorBoundary label="Word List">
          <ProgrammaticSEOView slug={subRoute} initialData={initialWordListData} />
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
            {/* Featured guide — visible on homepage so users can discover content */}
            <div className="mt-8 rounded-xl border border-white/10 bg-white/[0.04] p-5 sm:p-6">
              <div className="flex items-center gap-2 mb-3">
                <BookOpen className="h-5 w-5 text-brand" />
                <h3 className="text-sm font-semibold uppercase tracking-wider text-brand">{t.ui.featuredGuide}</h3>
              </div>
              <Link href="/guides/best-wordle-starter-words" className="group flex items-center justify-between gap-3">
                <div>
                  <h4 className="text-lg font-bold text-foreground group-hover:text-brand transition-colors">Best Wordle Starter Words: Top Strategy Combinations to Win Daily</h4>
                  <p className="text-xs text-muted-foreground mt-1">Discover the mathematically optimal opening words, 3 winning strategies, and a proven second-guess framework for every scenario.</p>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground/40 group-hover:text-brand group-hover:translate-x-1 transition-all shrink-0" />
              </Link>
            </div>
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
        return <ErrorBoundary label="Words Starts With"><WordStartsTool /></ErrorBoundary>;
      case "wordends":
        return <ErrorBoundary label="Words Ends With"><WordEndsTool /></ErrorBoundary>;
      case "wordle-starts":
        return <ErrorBoundary label="Wordle Starts"><WordleStartsTool /></ErrorBoundary>;
      case "wordle-ends":
        return <ErrorBoundary label="Wordle Ends"><WordleEndsTool /></ErrorBoundary>;
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
            <div className="mt-8 rounded-xl border border-white/10 bg-white/[0.04] p-5 sm:p-6">
              <div className="flex items-center gap-2 mb-3">
                <BookOpen className="h-5 w-5 text-brand" />
                <h3 className="text-sm font-semibold uppercase tracking-wider text-brand">{t.ui.featuredGuide}</h3>
              </div>
              <Link href="/guides/best-wordle-starter-words" className="group flex items-center justify-between gap-3">
                <div>
                  <h4 className="text-lg font-bold text-foreground group-hover:text-brand transition-colors">Best Wordle Starter Words: Top Strategy Combinations to Win Daily</h4>
                  <p className="text-xs text-muted-foreground mt-1">Discover the mathematically optimal opening words, 3 winning strategies, and a proven second-guess framework for every scenario.</p>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground/40 group-hover:text-brand group-hover:translate-x-1 transition-all shrink-0" />
              </Link>
            </div>
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
