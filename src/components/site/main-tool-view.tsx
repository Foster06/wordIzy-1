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
import { BookOpen, ChevronRight, Zap } from "lucide-react";

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
const TermsView = dynamic(
  () => import("@/components/tools/info-views").then((m) => m.TermsView),
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
  /** SSR-seeded top-scoring words for the SEO article (English, computed by page.tsx). */
  topWordData?: { word: string; score: number }[] | null;
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

export function MainToolView({ params, initialWordListData, topWordData }: MainToolViewProps) {
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
          <ProgrammaticSEOView
            slug={primaryRoute}
            initialData={initialWordListData}
            topWords={topWordData ?? []}
          />
        </ErrorBoundary>
      );
    }

    // Legacy two-segment path: /unscramble/<slug>
    if (primaryRoute === "unscramble" && subRoute && isWordListPage(subRoute)) {
      return (
        <ErrorBoundary label="Word List">
          <ProgrammaticSEOView
            slug={subRoute}
            initialData={initialWordListData}
            topWords={topWordData ?? []}
          />
        </ErrorBoundary>
      );
    }

    switch (route.id) {
      case "home":
        return (
          <>
            <HomeHero />
            {/* Featured Game — prominent call-to-action for Anagram Blitz */}
            <div className="mb-6 rounded-xl border border-brand/20 bg-brand/[0.05] p-5 sm:p-6 relative overflow-hidden">
              <div className="absolute -top-16 -right-16 h-48 w-48 rounded-full bg-brand/10 blur-3xl pointer-events-none" />
              <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="shrink-0 h-12 w-12 rounded-xl bg-brand/15 border border-brand/20 flex items-center justify-center">
                    <Zap className="h-6 w-6 text-brand" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
                      Play Anagram Blitz
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 uppercase tracking-wider">Free Game</span>
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Race against the clock — unscramble as many words as you can in 60 seconds. Daily challenges + infinite practice. No sign-up needed.
                    </p>
                  </div>
                </div>
                <Link
                  href="/blitz"
                  className="btn-amber-flow shrink-0 inline-flex items-center gap-2 px-6 py-3 text-white rounded-lg text-sm font-bold hover:brightness-110 transition-transform hover:scale-105 active:scale-95 shadow-lg shadow-brand/30"
                >
                  <Zap className="h-4 w-4" />
                  Play Now — It's Free
                </Link>
              </div>
            </div>
            <ErrorBoundary label="Unscrambler">
              <UnscramblerTool />
            </ErrorBoundary>
            {/* Featured guides — visible on homepage so users can discover content */}
            <div className="mt-8 rounded-xl border border-white/10 bg-white/[0.04] p-5 sm:p-6">
              <div className="flex items-center gap-2 mb-4">
                <BookOpen className="h-5 w-5 text-brand" />
                <h3 className="text-sm font-semibold uppercase tracking-wider text-brand">{t.ui.featuredGuide}</h3>
              </div>
              <ul className="space-y-3">
                <li>
                  <Link href="/guides/best-wordle-starter-words" className="group flex items-start justify-between gap-3">
                    <div>
                      <h4 className="text-base font-bold text-foreground group-hover:text-brand transition-colors">Best Wordle Starter Words</h4>
                      <p className="text-xs text-muted-foreground mt-1">Discover the mathematically optimal opening words, 3 winning strategies, and a proven second-guess framework for every scenario.</p>
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground/40 group-hover:text-brand group-hover:translate-x-1 transition-colors transition-transform shrink-0 mt-1" />
                  </Link>
                </li>
                <li className="border-t border-white/5 pt-3">
                  <Link href="/guides/5-crossword-solving-tips-for-beginners" className="group flex items-start justify-between gap-3">
                    <div>
                      <h4 className="text-base font-bold text-foreground group-hover:text-brand transition-colors">5 Crossword Solving Tips Every Beginner Needs to Know</h4>
                      <p className="text-xs text-muted-foreground mt-1">Master the highest-leverage techniques experienced solvers use daily — long answers, plural endings, crossing letters, common patterns, and abbreviation shorthand.</p>
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground/40 group-hover:text-brand group-hover:translate-x-1 transition-colors transition-transform shrink-0 mt-1" />
                  </Link>
                </li>
                <li className="border-t border-white/5 pt-3">
                  <Link href="/guides/score-400-in-anagram-blitz" className="group flex items-start justify-between gap-3">
                    <div>
                      <h4 className="text-base font-bold text-foreground group-hover:text-brand transition-colors">How to Consistently Score 400+ in Anagram Blitz</h4>
                      <p className="text-xs text-muted-foreground mt-1">Seven specific techniques top players use to hit 400+ points in 60 seconds — suffix recognition, vowel-first scanning, type-without-hesitation, and the pattern-recall library.</p>
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground/40 group-hover:text-brand group-hover:translate-x-1 transition-colors transition-transform shrink-0 mt-1" />
                  </Link>
                </li>
                <li className="border-t border-white/5 pt-3">
                  <Link href="/guides/memorize-2-letter-scrabble-words" className="group flex items-start justify-between gap-3">
                    <div>
                      <h4 className="text-base font-bold text-foreground group-hover:text-brand transition-colors">The Ultimate Guide to Memorizing 2-Letter Scrabble Words</h4>
                      <p className="text-xs text-muted-foreground mt-1">The complete NWL2023 2-letter word list grouped by memorization strategy, plus a spaced-repetition workflow using the Save Vault to drill them into long-term memory.</p>
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground/40 group-hover:text-brand group-hover:translate-x-1 transition-colors transition-transform shrink-0 mt-1" />
                  </Link>
                </li>
              </ul>
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
              {/* SEO content — visible to crawlers and users below the game card.
                  Rich descriptive text helps Google understand the page is a
                  real word game, not a thin "Loading..." shell.
                  Content is translated per language via t.blitz.* keys. */}
              <section className="mt-10 max-w-2xl mx-auto space-y-4 text-sm text-muted-foreground leading-relaxed">
                <h1 className="text-2xl font-bold text-foreground">{t.blitz.pageHeading}</h1>
                <h2 className="text-lg font-bold text-foreground">{t.blitz.howToPlayTitle}</h2>
                <p>{t.blitz.howToPlayDesc}</p>
                <h3 className="text-base font-semibold text-foreground pt-2">{t.blitz.gameModesTitle}</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li><strong className="text-foreground">{t.blitz.dailyModeName}</strong> — {t.blitz.dailyModeDesc}</li>
                  <li><strong className="text-foreground">{t.blitz.infiniteModeName}</strong> — {t.blitz.infiniteModeDesc}</li>
                </ul>
                <h3 className="text-base font-semibold text-foreground pt-2">{t.blitz.tipsTitle}</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>{t.blitz.tip1}</li>
                  <li>{t.blitz.tip2}</li>
                  <li>{t.blitz.tip3}</li>
                  <li>{t.blitz.tip4}</li>
                </ul>
                <p className="text-xs pt-2">{t.blitz.blitzFooter}</p>
              </section>
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
      case "terms":
        return <ErrorBoundary label="Terms of Service"><TermsView /></ErrorBoundary>;
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
              <div className="flex items-center gap-2 mb-4">
                <BookOpen className="h-5 w-5 text-brand" />
                <h3 className="text-sm font-semibold uppercase tracking-wider text-brand">{t.ui.featuredGuide}</h3>
              </div>
              <ul className="space-y-3">
                <li>
                  <Link href="/guides/best-wordle-starter-words" className="group flex items-start justify-between gap-3">
                    <div>
                      <h4 className="text-base font-bold text-foreground group-hover:text-brand transition-colors">Best Wordle Starter Words</h4>
                      <p className="text-xs text-muted-foreground mt-1">Discover the mathematically optimal opening words, 3 winning strategies, and a proven second-guess framework for every scenario.</p>
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground/40 group-hover:text-brand group-hover:translate-x-1 transition-colors transition-transform shrink-0 mt-1" />
                  </Link>
                </li>
                <li className="border-t border-white/5 pt-3">
                  <Link href="/guides/5-crossword-solving-tips-for-beginners" className="group flex items-start justify-between gap-3">
                    <div>
                      <h4 className="text-base font-bold text-foreground group-hover:text-brand transition-colors">5 Crossword Solving Tips Every Beginner Needs to Know</h4>
                      <p className="text-xs text-muted-foreground mt-1">Master the highest-leverage techniques experienced solvers use daily — long answers, plural endings, crossing letters, common patterns, and abbreviation shorthand.</p>
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground/40 group-hover:text-brand group-hover:translate-x-1 transition-colors transition-transform shrink-0 mt-1" />
                  </Link>
                </li>
                <li className="border-t border-white/5 pt-3">
                  <Link href="/guides/score-400-in-anagram-blitz" className="group flex items-start justify-between gap-3">
                    <div>
                      <h4 className="text-base font-bold text-foreground group-hover:text-brand transition-colors">How to Consistently Score 400+ in Anagram Blitz</h4>
                      <p className="text-xs text-muted-foreground mt-1">Seven specific techniques top players use to hit 400+ points in 60 seconds — suffix recognition, vowel-first scanning, type-without-hesitation, and the pattern-recall library.</p>
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground/40 group-hover:text-brand group-hover:translate-x-1 transition-colors transition-transform shrink-0 mt-1" />
                  </Link>
                </li>
                <li className="border-t border-white/5 pt-3">
                  <Link href="/guides/memorize-2-letter-scrabble-words" className="group flex items-start justify-between gap-3">
                    <div>
                      <h4 className="text-base font-bold text-foreground group-hover:text-brand transition-colors">The Ultimate Guide to Memorizing 2-Letter Scrabble Words</h4>
                      <p className="text-xs text-muted-foreground mt-1">The complete NWL2023 2-letter word list grouped by memorization strategy, plus a spaced-repetition workflow using the Save Vault to drill them into long-term memory.</p>
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground/40 group-hover:text-brand group-hover:translate-x-1 transition-colors transition-transform shrink-0 mt-1" />
                  </Link>
                </li>
              </ul>
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
