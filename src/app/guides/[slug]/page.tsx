import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";
import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { ReturnButton } from "@/components/site/back-button";

interface GuideProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const contentDirectory = path.join(process.cwd(), "src/content/guides");
  if (!fs.existsSync(contentDirectory)) return [];
  const files = fs.readdirSync(contentDirectory);
  return files.map((filename) => ({ slug: filename.replace(".md", "") }));
}

/** Render plain-text markdown-lite content with heading + paragraph support.
 *  The guide .md files use ALL-CAPS lines as section headings (no # syntax). */
function renderContent(content: string) {
  const paragraphs = content.trim().split(/\n\n+/);
  return paragraphs.map((para, i) => {
    const trimmed = para.trim();
    // ALL-CAPS lines (at least 10 chars, no lowercase) become h2 headings
    if (trimmed.length > 10 && trimmed === trimmed.toUpperCase() && !/[a-z]/.test(trimmed)) {
      return (
        <h2 key={i} className="text-xl font-bold text-foreground mt-8 mb-3 tracking-tight">
          {trimmed}
        </h2>
      );
    }
    // Lines starting with a number + period (like "1. ...") are list items but
    // we render them as paragraphs for readability
    return (
      <p key={i} className="text-sm text-muted-foreground leading-relaxed mb-4">
        {trimmed}
      </p>
    );
  });
}

export default async function GuidePage({ params }: GuideProps) {
  const resolvedParams = await params;
  const filePath = path.join(process.cwd(), "src/content/guides", `${resolvedParams.slug}.md`);

  if (!fs.existsSync(filePath)) {
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
