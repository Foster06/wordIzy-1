import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";
import type { ReactNode } from "react";
import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { ReturnButton } from "@/components/site/back-button";
import { LanguageReload } from "@/components/site/language-reload";
import { ShareButtons } from "@/components/site/share-buttons";

interface GuideProps {
  params: Promise<{ slug: string }>;
}

interface FaqItem {
  q: string;
  a: string;
}

// All supported languages for the guide.
const GUIDE_LANGS = ["en", "fr", "es", "de", "it", "pt", "nl", "ja", "zh"];

// Unknown guide slugs should 404 rather than soft-404 the homepage.
// Only the 4 base English slugs (stripped of language suffixes) are valid.
export const dynamicParams = false;

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
  let faq: FaqItem[] | undefined;

  if (filePath && fs.existsSync(filePath)) {
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const { data } = matter(fileContent);
    if (data.title) title = String(data.title);
    if (data.description) description = String(data.description);
    if (Array.isArray(data.faq)) faq = data.faq as FaqItem[];
  }

  // Build FAQPage JSON-LD if the guide declares a FAQ block in front-matter.
  // This unlocks expandable Q&A rich snippets in Google/Bing SERPs → higher CTR.
  const faqJsonLd =
    faq && faq.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faq.map((item) => ({
            "@type": "Question",
            name: item.q,
            acceptedAnswer: { "@type": "Answer", text: item.a },
          })),
        }
      : null;

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
    other: faqJsonLd ? { "ld:faq": JSON.stringify(faqJsonLd) } : undefined,
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

/** Slugify a heading into an HTML id — lowercase, hyphen-separated, ASCII-only.
 *  Enables deep-link anchors (#section-name) from SERPs and internal TOCs. */
function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 60);
}

/** Render inline markdown: bold (**text**), italic (*text* or _text_), and links ([text](url)).
 *  Returns an array of React nodes (strings + <strong> + <em> + <a>). */
function renderInline(text: string, keyPrefix: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  // Regex matches **bold**, *italic* or _italic_, and [text](url) in order
  const tokenRegex = /(\*\*([^*]+)\*\*|\*([^*]+)\*|_([^_]+)_|\[([^\]]+)\]\(([^)]+)\))/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let i = 0;
  while ((match = tokenRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index));
    }
    const key = `${keyPrefix}-${i++}`;
    if (match[2]) {
      // **bold**
      nodes.push(<strong key={key} className="font-semibold text-foreground">{match[2]}</strong>);
    } else if (match[3]) {
      // *italic*
      nodes.push(<em key={key}>{match[3]}</em>);
    } else if (match[4]) {
      // _italic_
      nodes.push(<em key={key}>{match[4]}</em>);
    } else if (match[5] && match[6]) {
      // [text](url)
      const isExternal = /^https?:\/\//.test(match[6]);
      nodes.push(
        <a
          key={key}
          href={match[6]}
          className="text-brand underline underline-offset-2 hover:opacity-80"
          {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
          {match[5]}
        </a>
      );
    }
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }
  return nodes;
}

/** Parse a GFM-style pipe table from a block of lines.
 *  Format:
 *    | Header 1 | Header 2 |
 *    | --- | --- |
 *    | cell | cell |
 *  Returns null if the lines don't form a valid table. */
function parseTable(lines: string[], startIdx: number): { rows: string[][]; nextIdx: number } | null {
  // A table needs at least: header row, separator row, 1 data row = 3 lines
  if (startIdx + 2 >= lines.length) return null;
  const headerLine = lines[startIdx].trim();
  const sepLine = lines[startIdx + 1].trim();

  // Both lines must start and end with |
  if (!headerLine.startsWith("|") || !headerLine.endsWith("|")) return null;
  if (!sepLine.startsWith("|") || !sepLine.endsWith("|")) return null;

  // Separator row must be all dashes/colons (e.g. | --- | :---: | ---: |)
  const sepCells = sepLine.slice(1, -1).split("|").map((c) => c.trim());
  if (!sepCells.every((c) => /^:?-+:?$/.test(c))) return null;

  const parseRow = (line: string) =>
    line.trim().slice(1, -1).split("|").map((c) => c.trim());

  const header = parseRow(headerLine);
  const rows: string[][] = [header];

  let i = startIdx + 2;
  while (i < lines.length) {
    const line = lines[i].trim();
    if (!line.startsWith("|") || !line.endsWith("|")) break;
    rows.push(parseRow(line));
    i++;
  }

  if (rows.length < 2) return null; // header + at least 1 data row
  return { rows, nextIdx: i };
}

/** Render a parsed table as a styled HTML table. */
function renderTable(rows: string[][], keyPrefix: string): ReactNode {
  const [header, ...body] = rows;
  return (
    <div key={`tbl-${keyPrefix}`} className="my-6 overflow-x-auto rounded-lg border border-white/10">
      <table className="w-full text-sm">
        <thead className="bg-brand/10">
          <tr>
            {header.map((cell, idx) => (
              <th
                key={`th-${keyPrefix}-${idx}`}
                className="px-3 py-2 text-left font-semibold text-foreground border-b border-white/10 whitespace-nowrap"
              >
                {renderInline(cell, `th-${keyPrefix}-${idx}`)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {body.map((row, rowIdx) => (
            <tr key={`tr-${keyPrefix}-${rowIdx}`} className={rowIdx % 2 === 0 ? "bg-white/[0.02]" : ""}>
              {row.map((cell, colIdx) => (
                <td
                  key={`td-${keyPrefix}-${rowIdx}-${colIdx}`}
                  className="px-3 py-2 text-muted-foreground border-b border-white/5 align-top"
                >
                  {renderInline(cell, `td-${keyPrefix}-${rowIdx}-${colIdx}`)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/** Render markdown-lite content with:
 *  - ## and ### headings (markdown-style) — with slugified id anchors
 *  - GFM pipe tables (| col | col | with | --- | separator row)
 *  - ALL-CAPS standalone lines as h2 (legacy support, no id)
 *  - Unordered lists (- item or * item)
 *  - Ordered lists (1. item, 2. item, ...)
 *  - Inline bold **text**, italic *text* / _text_, and links [text](url)
 *  - Plain paragraphs otherwise
 *  Consecutive list items are grouped into a single <ul>/<ol>. */
function renderContent(content: string): ReactNode[] {
  const lines = content.replace(/\r\n/g, "\n").split("\n");
  const blocks: ReactNode[] = [];
  let i = 0;
  let keyCounter = 0;

  while (i < lines.length) {
    const raw = lines[i];
    const line = raw.trim();
    if (!line) {
      i++;
      continue;
    }

    // GFM pipe table — detect a line starting with | followed by a separator row
    if (line.startsWith("|") && line.endsWith("|")) {
      const table = parseTable(lines, i);
      if (table) {
        blocks.push(renderTable(table.rows, `t${keyCounter++}`));
        i = table.nextIdx;
        continue;
      }
    }

    // ## Heading 2 (with slugified anchor id)
    if (/^##\s+/.test(line)) {
      const text = line.replace(/^##\s+/, "");
      const id = slugifyHeading(text);
      blocks.push(
        <h2 key={`b${keyCounter++}`} id={id} className="scroll-mt-24 text-xl font-bold text-foreground mt-8 mb-3 tracking-tight">
          {text}
        </h2>
      );
      i++;
      continue;
    }

    // ### Heading 3 (with slugified anchor id)
    if (/^###\s+/.test(line)) {
      const text = line.replace(/^###\s+/, "");
      const id = slugifyHeading(text);
      blocks.push(
        <h3 key={`b${keyCounter++}`} id={id} className="scroll-mt-24 text-base font-semibold text-foreground mt-6 mb-2 tracking-tight">
          {text}
        </h3>
      );
      i++;
      continue;
    }

    // # Heading 1 (rendered as h2-styled, with anchor)
    if (/^#\s+/.test(line)) {
      const text = line.replace(/^#\s+/, "");
      const id = slugifyHeading(text);
      blocks.push(
        <h2 key={`b${keyCounter++}`} id={id} className="scroll-mt-24 text-2xl font-extrabold text-foreground mt-10 mb-3 tracking-tight">
          {text}
        </h2>
      );
      i++;
      continue;
    }

    // Unordered list: collect consecutive - or * items
    if (/^[-*]\s+/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\s*[-*]\s+/.test(lines[i])) {
        items.push(lines[i].replace(/^\s*[-*]\s+/, "").trim());
        i++;
      }
      blocks.push(
        <ul key={`b${keyCounter++}`} className="list-disc pl-6 my-3 space-y-1.5 text-sm text-muted-foreground leading-relaxed">
          {items.map((item, idx) => (
            <li key={`li-${keyCounter}-${idx}`}>{renderInline(item, `ul-${keyCounter}-${idx}`)}</li>
          ))}
        </ul>
      );
      continue;
    }

    // Ordered list: collect consecutive "1. " "2. " items
    if (/^\d+\.\s+/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\s*\d+\.\s+/.test(lines[i])) {
        items.push(lines[i].replace(/^\s*\d+\.\s+/, "").trim());
        i++;
      }
      blocks.push(
        <ol key={`b${keyCounter++}`} className="list-decimal pl-6 my-3 space-y-1.5 text-sm text-muted-foreground leading-relaxed">
          {items.map((item, idx) => (
            <li key={`ol-${keyCounter}-${idx}`}>{renderInline(item, `ol-${keyCounter}-${idx}`)}</li>
          ))}
        </ol>
      );
      continue;
    }

    // ALL-CAPS legacy heading (back-compat with existing guides — no id, these
    // pre-date the ## syntax and don't need anchors)
    if (
      line.length > 5 &&
      line === line.toUpperCase() &&
      !/[a-z]/.test(line) &&
      line.length < 120 &&
      !/[.!?;:,]/.test(line.slice(-1))
    ) {
      blocks.push(
        <h2 key={`b${keyCounter++}`} className="text-xl font-bold text-foreground mt-8 mb-3 tracking-tight">
          {line}
        </h2>
      );
      i++;
      continue;
    }

    // Plain paragraph: collect consecutive non-empty, non-special lines
    const paraLines: string[] = [line];
    i++;
    while (
      i < lines.length &&
      lines[i].trim() &&
      !/^#{1,3}\s+/.test(lines[i].trim()) &&
      !/^[-*]\s+/.test(lines[i].trim()) &&
      !/^\d+\.\s+/.test(lines[i].trim()) &&
      !(lines[i].trim().startsWith("|") && lines[i].trim().endsWith("|"))
    ) {
      paraLines.push(lines[i].trim());
      i++;
    }
    const paraText = paraLines.join(" ");
    blocks.push(
      <p key={`b${keyCounter++}`} className="text-sm text-muted-foreground leading-relaxed mb-4">
        {renderInline(paraText, `p-${keyCounter}`)}
      </p>
    );
  }

  return blocks;
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
  const faq: FaqItem[] = Array.isArray(data.faq) ? (data.faq as FaqItem[]) : [];

  // Build the FAQPage JSON-LD for rich snippets. Mirrors the pattern used on
  // the 12 tool pages in [[...tool]]/page.tsx via buildFaqJsonLd().
  const faqJsonLd =
    faq.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faq.map((item) => ({
            "@type": "Question",
            name: item.q,
            acceptedAnswer: { "@type": "Answer", text: item.a },
          })),
        }
      : null;

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

          {/* Visible FAQ section — mirrors the JSON-LD Q&As so the rich
              snippet content is also on-page (Google requires both). */}
          {faq.length > 0 && (
            <section className="mt-10 pt-6 border-t border-white/10">
              <h2 id="frequently-asked-questions" className="scroll-mt-24 text-xl font-bold text-foreground mb-4 tracking-tight">
                Frequently Asked Questions
              </h2>
              <div className="space-y-4">
                {faq.map((item, idx) => (
                  <div key={`faq-${idx}`} className="space-y-1.5">
                    <h3 className="text-sm font-semibold text-foreground">{item.q}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.a}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* JSON-LD: FAQPage schema for rich snippets in Google/Bing. */}
          {faqJsonLd && (
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
            />
          )}

          {/* Social sharing buttons — encourages organic sharing on Twitter,
              Facebook, Reddit → can lead to natural backlinks from forums,
              blogs, and social media profiles. */}
          <ShareButtons
            url={`https://wordizy.com/guides/${slug}`}
            title={data.title}
          />

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
              <Link href="/unscramble-2-letter-words" className="px-3 py-1.5 rounded-md glass-soft text-xs text-foreground/80 hover:text-brand transition-colors">
                2-Letter Words
              </Link>
              <Link href="/blitz" className="px-3 py-1.5 rounded-md glass-soft text-xs text-foreground/80 hover:text-brand transition-colors">
                Anagram Blitz
              </Link>
            </div>
          </div>

          {/* More strategy guides — internal cross-linking for SEO */}
          <div className="mt-8 pt-6 border-t border-white/10">
            <h3 className="text-sm font-semibold text-foreground mb-3">More Strategy Guides</h3>
            <ul className="space-y-2 text-sm">
              {slug !== "best-wordle-starter-words" && (
                <li>
                  <Link href="/guides/best-wordle-starter-words" className="text-brand hover:opacity-80 underline-offset-2">
                    Best Wordle Starter Words: Top Strategy Combinations to Win Daily
                  </Link>
                </li>
              )}
              {slug !== "5-crossword-solving-tips-for-beginners" && (
                <li>
                  <Link href="/guides/5-crossword-solving-tips-for-beginners" className="text-brand hover:opacity-80 underline-offset-2">
                    5 Crossword Solving Tips Every Beginner Needs to Know
                  </Link>
                </li>
              )}
              {slug !== "score-400-in-anagram-blitz" && (
                <li>
                  <Link href="/guides/score-400-in-anagram-blitz" className="text-brand hover:opacity-80 underline-offset-2">
                    How to Consistently Score 400+ in Anagram Blitz
                  </Link>
                </li>
              )}
              {slug !== "memorize-2-letter-scrabble-words" && (
                <li>
                  <Link href="/guides/memorize-2-letter-scrabble-words" className="text-brand hover:opacity-80 underline-offset-2">
                    The Ultimate Guide to Memorizing 2-Letter Scrabble Words
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </article>
      </main>
      <SiteFooter />
    </div>
  );
}
