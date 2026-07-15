import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";

interface GuideProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const contentDirectory = path.join(process.cwd(), "src/content/guides");
  if (!fs.existsSync(contentDirectory)) return [];
  const files = fs.readdirSync(contentDirectory);
  return files.map((filename) => ({ slug: filename.replace(".md", "") }));
}

export default async function GuidePage({ params }: GuideProps) {
  const resolvedParams = await params;
  const filePath = path.join(process.cwd(), "src/content/guides", `${resolvedParams.slug}.md`);
  
  if (!fs.existsSync(filePath)) return <div className="p-8 text-center text-xs">Article guide data structure missing.</div>;
  
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1 mx-auto w-full max-w-3xl px-4 py-12">
        <article className="prose prose-sm dark:prose-invert max-w-none">
          <h1 className="text-3xl font-extrabold mb-2">{data.title}</h1>
          <p className="text-muted-foreground text-xs mb-8">Published: {data.date}</p>
          <div className="whitespace-pre-line leading-relaxed text-sm">{content}</div>
        </article>
      </main>
      <SiteFooter />
    </div>
  );
}
