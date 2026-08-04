import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";
import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { ReturnButton } from "@/components/site/back-button";
import { LanguageReload } from "@/components/site/language-reload";

interface GuideProps {
  params: Promise<{ slug: string }>;
}

// All supported languages for the guide.
const GUIDE_LANGS = ["en", "fr", "es", "de", "it", "pt", "nl", "ja", "zh"];

export async function generateStaticParams() {
  const contentDirectory = path.join(process.cwd(), "src/content/guides");
  if (!fs.existsSync(contentDirectory)) return [];
  const files = fs.readdirSync(contentDirectory);
  // Generate params for the base slug (English) — the page detects language client-side
  // and fetches the translated version. We only need the base slug in static params.
  const baseSlugs = new Set<string>();
  for (const filename of files) {
    // Strip language suffix: best-wordle-starter-words-fr.md -> best-wordle-starter-words
    const base = filename.replace(/\.md$/, "").replace(/-(fr|es|de|it|pt|nl|ja|zh)$/, "");
    baseSlugs.add(base);
  }
  return Array.from(baseSlugs).map((slug) => ({ slug }));
}

/** Generate per-language metadata for the guide. */
export async function generateMetadata({ params }: GuideProps) {
  const { slug } = await params;

  // Determine which language file to use for the title
  let lang = "en";
  try {
    const { headers } = await import("next/headers");
    const headerList = await headers();
    const cookieHeader = headerList.get("cookie") || "";
    const langMatch = cookieHeader.match(/wordizy-lang=([a-z]{2})/);
    if (langMatch && GUIDE_LANGS.includes(langMatch[1]!)) {
      lang = langMatch[1]!;
    }
  } catch {
    /* default to en */
  }

  const filePath = findGuideFile(slug, lang);
  let title = "Best Wordle Starter Words: Top Strategy Combinations to Win Daily";
  let description = "Discover the mathematically optimal Wordle starter words, 3 winning strategies, and a proven second-guess framework.";

  if (filePath && fs.existsSync(filePath)) {
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const { data } = matter(fileContent);
    if (data.title) title = String(data.title);
  }

  return {
    title,
    description,
    alternates: {
      canonical: `/guides/${slug}`,
    },
    openGraph: {
      title,
      description,
      images: [{ url: "/og-image.png", width: 1200, height: 630, alt: title }],
    },
  };
}

/** Find the guide file for a given slug + language. Falls back to English. */
function findGuideFile(slug: string, lang: string): string | null {
  const guidesDir = path.join(process.cwd(), "src/content/guides");

  // Try the requested language first (e.g. best-wordle-starter-words-fr.md)
  if (lang !== "en" && GUIDE_LANGS.includes(lang)) {
    const localizedPath = path.join(guidesDir, `${slug}-${lang}.md`);
    if (fs.existsSync(localizedPath)) return localizedPath;
  }

  // Fall back to English (base slug, no suffix)
  const enPath = path.join(guidesDir, `${slug}.md`);
  if (fs.existsSync(enPath)) return enPath;

  return null;
}

/** Render plain-text markdown-lite content with heading + paragraph support.
 *  ALL-CAPS lines (or standalone short lines in CJK) become h2 headings. */
function renderContent(content: string) {
  const paragraphs = content.trim().split(/\n\n+/);
  return paragraphs.map((para, i) => {
    const trimmed = para.trim();
    // ALL-CAPS lines (at least 10 chars, no lowercase) become h2 headings
    if (trimmed.length > 5 && trimmed === trimmed.toUpperCase() && !/[a-z]/.test(trimmed) && trimmed.length < 120) {
      return (
        <h2 key={i} className="text-xl font-bold text-foreground mt-8 mb-3 tracking-tight">
          {trimmed}
        </h2>
      );
    }
    return (
      <p key={i} className="text-sm text-muted-foreground leading-relaxed mb-4">
        {trimmed}
      </p>
    );
  });
}

export default async function GuidePage({ params }: GuideProps) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;

  // Detect language from the URL query param, cookie, or Accept-Language header.
  // On the client, the LanguageProvider sets document.documentElement.lang.
  // For SSR, we check the request headers via the Next.js headers() API.
  let lang = "en";
  try {
    const { headers } = await import("next/headers");
    const headerList = await headers();
    const cookieHeader = headerList.get("cookie") || "";
    // Check for wordizy-lang cookie
    const langMatch = cookieHeader.match(/wordizy-lang=([a-z]{2})/);
    if (langMatch) {
      lang = langMatch[1]!;
    } else {
      // Check Accept-Language header
      const acceptLang = headerList.get("accept-language") || "";
      for (const code of GUIDE_LANGS) {
        if (acceptLang.startsWith(code) || acceptLang.includes(`${code},`) || acceptLang.includes(`;q=`) && acceptLang.includes(code)) {
          lang = code;
          break;
        }
      }
    }
  } catch {
    // headers() not available — default to English
  }

  const filePath = findGuideFile(slug, lang);

  if (!filePath) {
    return (
      <div className="min-h-screen flex flex-col">
        <SiteHeader />
        <main className="flex-1 mx-auto w-full max-w-3xl px-4 py-12">
          <p className="text-center text-sm text-muted-foreground">Guide not found.</p>
        </main>
        <SiteFooter />
      </div>
    );
  }

  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);

  return (
    <div className="min-h-screen flex flex-col">
      <LanguageReload />
      <SiteHeader />
      <main className="flex-1 mx-auto w-full max-w-3xl px-4 py-8 sm:py-12">
        <ReturnButton href="/" label="Back to Home" />
        <article className="mt-6">
          <h1 className="text-3xl sm:text-4xl font-extrabold mb-2 tracking-tight text-gradient-brand">{data.title}</h1>
          <p className="text-muted-foreground text-xs mb-8">Published: {data.date}</p>
          <div className="space-y-0">
            {renderContent(content)}
          </div>

          {/* Internal links for SEO + UX */}
          <div className="mt-10 pt-6 border-t border-white/10">
            <h3 className="text-sm font-semibold text-foreground mb-3">Related Tools</h3>
            <div className="flex flex-wrap gap-2">
              <Link href="/wordle" className="px-3 py-1.5 rounded-md glass-soft text-xs text-foreground/80 hover:text-brand transition-colors">
                Wordle Solver
              </Link>
              <Link href="/wordle-starts" className="px-3 py-1.5 rounded-md glass-soft text-xs text-foreground/80 hover:text-brand transition-colors">
                Wordle Words Starting With A-Z
              </Link>
              <Link href="/wordle-ends" className="px-3 py-1.5 rounded-md glass-soft text-xs text-foreground/80 hover:text-brand transition-colors">
                Wordle Words Ending With A-Z
              </Link>
              <Link href="/unscramble-5-letter-words" className="px-3 py-1.5 rounded-md glass-soft text-xs text-foreground/80 hover:text-brand transition-colors">
                5-Letter Words
              </Link>
            </div>
          </div>
        </article>
      </main>
      <SiteFooter />
    </div>
  );
}
