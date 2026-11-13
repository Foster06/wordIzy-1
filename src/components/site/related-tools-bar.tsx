"use client";

import Link from "next/link";
import { useLanguage } from "@/components/i18n/language-provider";
import { useLocalizedPath } from "@/components/site/use-localized-path";

// The three tools that form the cross-linking cluster per the SEO blueprint.
// Each tool page renders this bar with `exclude` set to its own slug so the
// bar always links to the OTHER two tools in the same language.
const RELATED_TOOLS = [
  { slug: "scrabble", navKey: "scrabble" },
  { slug: "anagram", navKey: "anagram" },
  { slug: "scramble", navKey: "scramble" },
];

/** A "Related Tools" bar that cross-links Duplicate Scrabble, Anagram Solver
 *  and Word Scramble in the user's current language. Placed at the bottom of
 *  each of the three tool pages so link authority flows evenly across the
 *  cluster and users can pivot between the related solvers without dropping
 *  their language scope. */
export function RelatedToolsBar({ exclude }: { exclude: string }) {
  const { t } = useLanguage();
  const localize = useLocalizedPath();
  const nav = t.nav as unknown as Record<string, string>;
  const links = RELATED_TOOLS.filter((r) => r.slug !== exclude);

  return (
    <section className="mt-8 max-w-5xl mx-auto">
      <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-3">
        {t.ui.relatedTools}
      </h2>
      <div className="flex flex-wrap gap-3">
        {links.map((r) => (
          <Link
            key={r.slug}
            href={localize(`/${r.slug}`)}
            className="px-4 py-2 rounded-lg glass-soft hover:bg-white/10 text-sm font-medium transition-colors"
          >
            {nav[r.navKey] ?? r.slug}
          </Link>
        ))}
      </div>
    </section>
  );
}
