"use client";

import Link from "next/link";
import { Info, Mail, Shield, Map, Send, Shuffle, RotateCw, Grid3x3, LayoutGrid, Repeat, Dices, Gamepad2, BookOpen, Trophy, List, ArrowDownToLine, ArrowUpFromLine, ChevronRight, FileText } from "lucide-react";
import { GlassCard } from "@/components/site/glass-card";
import { AdSlot } from "@/components/site/ad-slot";
import { PageHeader } from "@/components/site/page-header";
import { useLanguage } from "@/components/i18n/language-provider";
import { ROUTES, GROUP_ORDER, GROUP_LABELS, type RouteGroup } from "@/components/site/routes";
import { WORD_LIST_LENGTHS, ALPHABET_LOWER, ALPHABET_UPPER } from "@/lib/word-list-urls";

const SITEMAP_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  Shuffle, RotateCw, Grid3x3, LayoutGrid, Repeat, Dices, Gamepad2,
  BookOpen, Trophy, List, Info, Mail, Shield, Map, ArrowDownToLine, ArrowUpFromLine,
  FileText,
};

// Email-detection regex — used to wrap any email address found inside a body
// paragraph (e.g. support@wordizy.com in the Contact page) in a clickable
// mailto: link so it opens the visitor's default mail app.
const EMAIL_REGEX = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;

/** Render a body string, wrapping any embedded email addresses in mailto links. */
function renderBodyWithMailto(body: string): React.ReactNode[] {
  // Split with capture group so emails land in their own array slots.
  const parts = body.split(/([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/);
  return parts.map((part, i) => {
    if (EMAIL_REGEX.test(part)) {
      return (
        <a
          key={`mail-${i}`}
          href={`mailto:${part}`}
          className="text-brand hover:underline font-medium"
        >
          {part}
        </a>
      );
    }
    return <span key={`txt-${i}`}>{part}</span>;
  });
}

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
  const { t } = useLanguage();
  return (
    <>
      <PageHeader badge={t.nav.contact} title={t.contact.title} icon={<Mail className="h-6 w-6" />} />
      <div className="mt-6 space-y-6">
        <GlassCard className="p-6 sm:p-8">
          {/* Intro — larger, prominent lead paragraph */}
          <p className="text-base sm:text-lg text-foreground/90 leading-relaxed mb-6 max-w-3xl mx-auto">
            {t.contact.intro}
          </p>
          {/* Sections with headings */}
          <div className="space-y-6 max-w-3xl mx-auto">
            {t.contact.sections.map((section, i) => (
              <div key={i}>
                <h2 className="text-base sm:text-lg font-semibold text-brand mb-2 flex items-center gap-2">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-brand shrink-0" />
                  {section.heading}
                </h2>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed whitespace-pre-line">
                  {renderBodyWithMailto(section.body)}
                </p>
              </div>
            ))}
            {/* Closing line — slightly emphasized */}
            <p className="text-sm sm:text-base font-semibold text-brand leading-relaxed pt-2">
              {t.contact.closing}
            </p>
          </div>
        </GlassCard>
        <AdSlot format="horizontal" />
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

export function TermsView() {
  const { t } = useLanguage();
  return (
    <>
      <PageHeader badge={t.nav.terms} title={t.terms.title} icon={<FileText className="h-6 w-6" />} />
      <div className="mt-6 space-y-6">
        <GlassCard className="p-6 sm:p-8">
          {/* Intro — larger, prominent lead paragraph */}
          <p className="text-base sm:text-lg text-foreground/90 leading-relaxed mb-4 max-w-3xl mx-auto">
            {t.terms.intro}
          </p>
          {/* Last updated badge */}
          <p className="text-xs text-muted-foreground/70 mb-6 max-w-3xl mx-auto">{t.terms.lastUpdated}</p>
          {/* Sections with headings */}
          <div className="space-y-6 max-w-3xl mx-auto">
            {t.terms.sections.map((section, i) => (
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
                      className="group flex items-center gap-3 rounded-xl px-4 py-3 bg-white/[0.04] border border-white/[0.08] hover:bg-brand/10 hover:border-brand/30 transition-colors transition-transform text-left shadow-sm hover:shadow-md"
                    >
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand/10 border border-brand/20 group-hover:bg-brand/20 transition-colors">
                        <Icon className="h-4 w-4 text-brand" />
                      </div>
                      <span className="flex-1 text-sm font-medium text-foreground/80 group-hover:text-brand transition-colors truncate">
                        {t.nav[r.labelKey]}
                      </span>
                      <ChevronRight className="h-4 w-4 text-muted-foreground/40 group-hover:text-brand group-hover:translate-x-0.5 transition-colors transition-transform shrink-0" />
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

        {/* Programmatic: Words Starts With A-Z (preferred form, matches sitemap.xml) */}
        <GlassCard className="p-5 sm:p-6 result-card">
          <h2 className="section-label !text-[14px] mb-4 text-brand flex items-center gap-2">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-brand" />
            Words Starts With A-Z
          </h2>
          <div className="grid grid-cols-6 sm:grid-cols-9 md:grid-cols-13 gap-2">
            {ALPHABET_LOWER.map((letter, i) => (
              <Link
                key={letter}
                href={`/words-starts-with-${letter}`}
                className="h-11 w-full flex items-center justify-center rounded-md glass-soft text-foreground/80 hover:bg-brand hover:text-background transition-colors text-sm font-semibold"
              >
                {ALPHABET_UPPER[i]}
              </Link>
            ))}
          </div>
        </GlassCard>

        {/* Programmatic: Words Ends With A-Z (preferred form, matches sitemap.xml) */}
        <GlassCard className="p-5 sm:p-6 result-card">
          <h2 className="section-label !text-[14px] mb-4 text-brand flex items-center gap-2">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-brand" />
            Words Ends With A-Z
          </h2>
          <div className="grid grid-cols-6 sm:grid-cols-9 md:grid-cols-13 gap-2">
            {ALPHABET_LOWER.map((letter, i) => (
              <Link
                key={letter}
                href={`/words-ends-with-${letter}`}
                className="h-11 w-full flex items-center justify-center rounded-md glass-soft text-foreground/80 hover:bg-brand hover:text-background transition-colors text-sm font-semibold"
              >
                {ALPHABET_UPPER[i]}
              </Link>
            ))}
          </div>
        </GlassCard>

        {/* Programmatic: Wordle Words Starts With A-Z */}
        <GlassCard className="p-5 sm:p-6 result-card">
          <h2 className="section-label !text-[14px] mb-4 text-brand flex items-center gap-2">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-brand" />
            Wordle Words Starts With A-Z
          </h2>
          <div className="grid grid-cols-6 sm:grid-cols-9 md:grid-cols-13 gap-2">
            {ALPHABET_LOWER.map((letter, i) => (
              <Link
                key={letter}
                href={`/wordle-words-starts-with-${letter}`}
                className="h-11 w-full flex items-center justify-center rounded-md glass-soft text-foreground/80 hover:bg-brand hover:text-background transition-colors text-sm font-semibold"
              >
                {ALPHABET_UPPER[i]}
              </Link>
            ))}
          </div>
        </GlassCard>

        {/* Programmatic: Wordle Words Ends With A-Z */}
        <GlassCard className="p-5 sm:p-6 result-card">
          <h2 className="section-label !text-[14px] mb-4 text-brand flex items-center gap-2">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-brand" />
            Wordle Words Ends With A-Z
          </h2>
          <div className="grid grid-cols-6 sm:grid-cols-9 md:grid-cols-13 gap-2">
            {ALPHABET_LOWER.map((letter, i) => (
              <Link
                key={letter}
                href={`/wordle-words-ends-with-${letter}`}
                className="h-11 w-full flex items-center justify-center rounded-md glass-soft text-foreground/80 hover:bg-brand hover:text-background transition-colors text-sm font-semibold"
              >
                {ALPHABET_UPPER[i]}
              </Link>
            ))}
          </div>
        </GlassCard>

        {/* Guides section — all 4 editorial strategy guides */}
        <GlassCard className="p-5 sm:p-6 result-card">
          <h2 className="section-label !text-[14px] mb-4 text-brand flex items-center gap-2">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-brand" />
            Guides
          </h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <Link
              href="/guides/best-wordle-starter-words"
              className="group flex items-center gap-3 rounded-xl px-4 py-3 bg-white/[0.04] border border-white/[0.08] hover:bg-brand/10 hover:border-brand/30 transition-colors transition-transform text-left shadow-sm hover:shadow-md"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand/10 border border-brand/20 group-hover:bg-brand/20 transition-colors">
                <BookOpen className="h-4 w-4 text-brand" />
              </div>
              <span className="flex-1 text-sm font-medium text-foreground/80 group-hover:text-brand transition-colors truncate">
                Best Wordle Starter Words
              </span>
              <ChevronRight className="h-4 w-4 text-muted-foreground/40 group-hover:text-brand group-hover:translate-x-0.5 transition-colors transition-transform shrink-0" />
            </Link>
            <Link
              href="/guides/5-crossword-solving-tips-for-beginners"
              className="group flex items-center gap-3 rounded-xl px-4 py-3 bg-white/[0.04] border border-white/[0.08] hover:bg-brand/10 hover:border-brand/30 transition-colors transition-transform text-left shadow-sm hover:shadow-md"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand/10 border border-brand/20 group-hover:bg-brand/20 transition-colors">
                <BookOpen className="h-4 w-4 text-brand" />
              </div>
              <span className="flex-1 text-sm font-medium text-foreground/80 group-hover:text-brand transition-colors truncate">
                5 Crossword Solving Tips for Beginners
              </span>
              <ChevronRight className="h-4 w-4 text-muted-foreground/40 group-hover:text-brand group-hover:translate-x-0.5 transition-colors transition-transform shrink-0" />
            </Link>
            <Link
              href="/guides/score-400-in-anagram-blitz"
              className="group flex items-center gap-3 rounded-xl px-4 py-3 bg-white/[0.04] border border-white/[0.08] hover:bg-brand/10 hover:border-brand/30 transition-colors transition-transform text-left shadow-sm hover:shadow-md"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand/10 border border-brand/20 group-hover:bg-brand/20 transition-colors">
                <BookOpen className="h-4 w-4 text-brand" />
              </div>
              <span className="flex-1 text-sm font-medium text-foreground/80 group-hover:text-brand transition-colors truncate">
                How to Score 400+ in Anagram Blitz
              </span>
              <ChevronRight className="h-4 w-4 text-muted-foreground/40 group-hover:text-brand group-hover:translate-x-0.5 transition-colors transition-transform shrink-0" />
            </Link>
            <Link
              href="/guides/memorize-2-letter-scrabble-words"
              className="group flex items-center gap-3 rounded-xl px-4 py-3 bg-white/[0.04] border border-white/[0.08] hover:bg-brand/10 hover:border-brand/30 transition-colors transition-transform text-left shadow-sm hover:shadow-md"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand/10 border border-brand/20 group-hover:bg-brand/20 transition-colors">
                <BookOpen className="h-4 w-4 text-brand" />
              </div>
              <span className="flex-1 text-sm font-medium text-foreground/80 group-hover:text-brand transition-colors truncate">
                Memorize 2-Letter Scrabble Words
              </span>
              <ChevronRight className="h-4 w-4 text-muted-foreground/40 group-hover:text-brand group-hover:translate-x-0.5 transition-colors transition-transform shrink-0" />
            </Link>
          </div>
        </GlassCard>
      </div>
    </>
  );
}
