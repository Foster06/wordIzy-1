import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MainToolView } from "@/components/site/main-tool-view";
import { LanguageScope } from "@/components/i18n/language-provider";
import { translations } from "@/components/i18n/translations";
import type { LanguageCode } from "@/lib/languages";
import {
  I18N_SEO,
  I18N_LANGS,
  LOCALIZED_TOOL_SLUGS,
  buildAlternates,
  OG_LOCALES,
  type I18nLang,
} from "@/lib/i18n-seo";

// ─────────────────────────────────────────────────────────────────────────────
// Localized tool pages: /de, /fr/wordle, /nl/wordfeud, …
//
// PUBLIC URLs are /{lang}[/tool]; src/middleware.ts rewrites them here to
// /i18n/{lang}[/tool] (and 308-redirects direct /i18n/* access back to the
// public form, so this internal path is never indexed).
//
// 160 statically prerendered pages (8 languages × [home + 19 tools]), each
// with: localized title/description (25-160 chars, see lib/i18n-seo.ts),
// self-canonical, a full reciprocal hreflang cluster (en + 8 langs +
// x-default → English), localized FAQPage JSON-LD (from translations.ts) and
// a localized BreadcrumbList.
// ─────────────────────────────────────────────────────────────────────────────

interface PageProps {
  params: Promise<{ lang: string; tool?: string[] }>;
}

const SITE_ORIGIN = "https://wordizy.com";

/** nav key in translations.ts for each localized slug (for breadcrumbs). */
const NAV_KEYS: Record<string, string> = {
  scramble: "scramble",
  anagram: "anagram",
  wordle: "wordle",
  quordle: "quordle",
  scrabble: "scrabble",
  random: "random",
  wordfeud: "wordfeud",
  dictionary: "dictionary",
  wordlists: "wordlists",
  wordstarts: "wordstarts",
  wordends: "wordends",
  "wordle-starts": "wordlestarts",
  "wordle-ends": "wordleends",
  about: "about",
  contact: "contact",
  privacy: "privacy",
  terms: "terms",
  sitemap: "sitemap",
  blitz: "blitz",
};

// Every (lang × tool) combination is enumerated; unknown ones 404 (middleware
// never routes them here — defense in depth).
export const dynamicParams = false;

export async function generateStaticParams() {
  const params: { lang: string; tool: string[] }[] = [];
  for (const lang of I18N_LANGS) {
    params.push({ lang, tool: [] });
    for (const slug of LOCALIZED_TOOL_SLUGS) {
      params.push({ lang, tool: [slug] });
    }
  }
  return params;
}

/** Resolve URL params → { lang, slug } where slug is "home" or a tool slug. */
function resolve(params: { lang: string; tool?: string[] }): { lang: I18nLang; slug: string } | null {
  const { lang, tool } = params;
  if (!(I18N_LANGS as readonly string[]).includes(lang)) return null;
  const segments = tool || [];
  if (segments.length === 0) return { lang: lang as I18nLang, slug: "home" };
  if (
    segments.length === 1 &&
    (LOCALIZED_TOOL_SLUGS as readonly string[]).includes(segments[0])
  ) {
    return { lang: lang as I18nLang, slug: segments[0] };
  }
  return null;
}

/** Localized FAQPage JSON-LD — same shape as the English buildFaqJsonLd(),
 *  sourced from translations[lang].faq. Returns null when the tool has no FAQ. */
function buildLocalizedFaqJsonLd(lang: I18nLang, slug: string) {
  const faqKey = slug === "home" ? "unscrambler" : slug;
  const faqRecord = translations[lang].faq as unknown as Record<
    string,
    { q: string; a: string }[] | undefined
  >;
  const faqItems = faqRecord[faqKey];
  if (!faqItems || faqItems.length === 0) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: lang,
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const resolved = resolve(resolvedParams);
  if (!resolved) {
    // Unknown combo — never linked, never routed here by middleware.
    return { robots: { index: false, follow: false } };
  }

  const { lang, slug } = resolved;
  const meta = I18N_SEO[lang][slug] ?? I18N_SEO[lang].home;
  const publicPath = slug === "home" ? "" : `/${slug}`;
  const canonical = `/${lang}${publicPath}`;

  return {
    title: meta.title, // root layout template appends " | wordIzy"
    description: meta.description,
    // Full reciprocal hreflang cluster — identical from every variant
    // (en + 8 localized + x-default → English canonical).
    alternates: { canonical, languages: buildAlternates(publicPath) },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: `${SITE_ORIGIN}${canonical}`,
      siteName: "wordIzy",
      type: "website",
      locale: OG_LOCALES[lang],
      images: [{ url: "/og-image.png", width: 1200, height: 630, alt: meta.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
      images: ["/og-image.png"],
    },
    robots: { index: true, follow: true },
  };
}

export default async function LocalizedToolPage({ params }: PageProps) {
  const resolvedParams = await params;
  const resolved = resolve(resolvedParams);
  if (!resolved) notFound();

  const { lang, slug } = resolved;
  const publicPath = slug === "home" ? "" : `/${slug}`;

  const faqJsonLd = buildLocalizedFaqJsonLd(lang, slug);

  // Localized breadcrumb (homepage excluded, same as the English pages).
  const navKey = NAV_KEYS[slug];
  const navRecord = translations[lang].nav as unknown as Record<string, string>;
  const toolName = navKey ? navRecord[navKey] ?? slug : null;
  const breadcrumbJsonLd =
    slug !== "home" && toolName
      ? {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "wordIzy — Word Tools", item: SITE_ORIGIN },
            {
              "@type": "ListItem",
              position: 2,
              name: toolName,
              item: `${SITE_ORIGIN}/${lang}${publicPath}`,
            },
          ],
        }
      : null;

  return (
    <>
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}
      {breadcrumbJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        />
      )}
      <LanguageScope initial={lang as LanguageCode}>
        <MainToolView params={params} />
      </LanguageScope>
    </>
  );
}
