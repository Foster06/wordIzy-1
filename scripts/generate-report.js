/* wordIzy — Organic Search Traffic Analysis report (.docx)
 * Skill-compliant: R1 cover (DM-1 palette), 3-section numbering (cover / TOC roman /
 * body arabic), HeadingLevel headings, percentage-width tables with CLEAR shading,
 * matplotlib chart PNGs embedded with aspect ratio from PNG headers.
 * Run: node scripts/generate-report.js  → download/wordizy-organic-traffic-analysis.docx
 */
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  ImageRun, PageBreak, Header, Footer, PageNumber, NumberFormat,
  AlignmentType, HeadingLevel, WidthType, BorderStyle, ShadingType,
  TableOfContents, SectionType, TableLayoutType,
} = require("docx");
const fs = require("fs");

const ASSETS = "/home/z/my-project/scripts/report-assets";
const OUT = "/home/z/my-project/download/wordizy-organic-traffic-analysis.docx";

// ── DM-1 Deep Cyan palette (body-page variants per design-system dark-cover rule) ──
const PAL = {
  bg: "162235", accent: "37DCF2",
  cover: { titleColor: "FFFFFF", subtitleColor: "B0B8C0", metaColor: "90989F", footerColor: "687078" },
  h1: "162235", h2: "1B6B7A", h3: "1B6B7A",
  body: "1C2A38", secondary: "5A6B75",
  table: { headerBg: "1B6B7A", headerText: "FFFFFF", accentLine: "1B6B7A", innerLine: "C8DDE2", surface: "EDF3F5" },
};
const EN_FONT = { ascii: "Times New Roman", eastAsia: "Times New Roman" };
const H_FONT = { ascii: "Times New Roman", eastAsia: "SimHei" };

// ───────────────────────────── cover helpers (R1, English-aware) ─────────────────
function splitTitleLinesEN(title, charsPerLine) {
  if (title.length <= charsPerLine) return [title];
  const words = title.split(" ");
  const lines = [];
  let cur = "";
  for (const w of words) {
    if (cur && (cur + " " + w).length > charsPerLine) { lines.push(cur); cur = w; }
    else cur = cur ? cur + " " + w : w;
  }
  if (cur) lines.push(cur);
  if (lines.length > 1 && lines[lines.length - 1].length <= 4) {
    const last = lines.pop();
    lines[lines.length - 1] += " " + last;
  }
  return lines;
}
function calcTitleLayoutEN(title, maxWidthTwips, preferredPt = 40, minPt = 24) {
  const charWidth = (pt) => pt * 10.5; // ASCII average (CJK would be pt*20)
  let titlePt = preferredPt, lines;
  while (titlePt >= minPt) {
    const cpl = Math.floor(maxWidthTwips / charWidth(titlePt));
    if (cpl < 4) { titlePt -= 2; continue; }
    lines = splitTitleLinesEN(title, cpl);
    if (lines.length <= 3) break;
    titlePt -= 2;
  }
  if (!lines || lines.length > 3) {
    lines = splitTitleLinesEN(title, Math.floor(maxWidthTwips / charWidth(minPt)));
    titlePt = minPt;
  }
  return { titlePt, titleLines: lines };
}
function calcCoverSpacing(p) {
  const { titleLineCount = 1, titlePt = 36, hasSubtitle = false, hasEnglishLabel = false,
    metaLineCount = 0, fixedHeight = 800, pageHeight = 16838, marginTop = 0, marginBottom = 0 } = p;
  const SAFETY = 1200;
  const usable = pageHeight - marginTop - marginBottom - SAFETY;
  const titleH = titleLineCount * (titlePt * 23 + 200);
  const subH = hasSubtitle ? (12 * 23 + 600) : 0;
  const labelH = hasEnglishLabel ? (9 * 23 + 600) : 0;
  const metaH = metaLineCount * (10 * 23 + 100);
  const implicit = 3 * 300;
  const content = titleH + subH + labelH + metaH + fixedHeight + implicit;
  const remaining = Math.max(usable - content, 400);
  const FOOTER_MIN = 800;
  const rawTop = Math.floor(remaining * 0.45), rawBottom = Math.floor(remaining * 0.45);
  const bottomSpacing = Math.max(rawBottom, FOOTER_MIN);
  const topSpacing = Math.max(rawTop - Math.max(0, FOOTER_MIN - rawBottom), 400);
  const midSpacing = Math.max(remaining - topSpacing - bottomSpacing, 0);
  return { topSpacing, midSpacing, bottomSpacing };
}
const noBorders = {
  top: { style: BorderStyle.NONE }, bottom: { style: BorderStyle.NONE },
  left: { style: BorderStyle.NONE }, right: { style: BorderStyle.NONE },
};
const allNoBorders = {
  top: { style: BorderStyle.NONE }, bottom: { style: BorderStyle.NONE },
  left: { style: BorderStyle.NONE }, right: { style: BorderStyle.NONE },
  insideHorizontal: { style: BorderStyle.NONE }, insideVertical: { style: BorderStyle.NONE },
};
function buildCoverR1(config) {
  const P = config.palette;
  const padL = 1200, padR = 800;
  const availableWidth = 11906 - padL - padR - 300;
  const { titlePt, titleLines } = calcTitleLayoutEN(config.title, availableWidth, 40, 24);
  const titleSize = titlePt * 2;
  const spacing = calcCoverSpacing({
    titleLineCount: titleLines.length, titlePt,
    hasSubtitle: !!config.subtitle, hasEnglishLabel: !!config.englishLabel,
    metaLineCount: (config.metaLines || []).length, fixedHeight: 400,
  });
  const accentLeft = { style: BorderStyle.SINGLE, size: 8, color: P.accent, space: 12 };
  const children = [];
  children.push(new Paragraph({ spacing: { before: spacing.topSpacing } }));
  if (config.englishLabel) {
    children.push(new Paragraph({
      indent: { left: padL, right: padR }, spacing: { after: 500 },
      border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: P.accent, space: 8 } },
      children: [new TextRun({ text: config.englishLabel.split("").join("  "), size: 18, color: P.accent, font: { ascii: "Calibri", eastAsia: "SimHei" }, characterSpacing: 40 })],
    }));
  }
  for (let i = 0; i < titleLines.length; i++) {
    children.push(new Paragraph({
      indent: { left: padL },
      spacing: { after: i < titleLines.length - 1 ? 100 : 300, line: Math.ceil(titlePt * 23), lineRule: "atLeast" },
      children: [new TextRun({ text: titleLines[i], size: titleSize, bold: true, color: P.titleColor, font: H_FONT })],
    }));
  }
  if (config.subtitle) {
    children.push(new Paragraph({
      indent: { left: padL, right: padR }, spacing: { after: 800 },
      children: [new TextRun({ text: config.subtitle, size: 24, color: P.subtitleColor, font: EN_FONT })],
    }));
  }
  for (const line of (config.metaLines || [])) {
    children.push(new Paragraph({
      indent: { left: padL + 200 }, spacing: { after: 80 },
      border: { left: accentLeft },
      children: [new TextRun({ text: line, size: 24, color: P.metaColor, font: EN_FONT })],
    }));
  }
  children.push(new Paragraph({ spacing: { before: spacing.bottomSpacing } }));
  children.push(new Paragraph({
    indent: { left: padL, right: padR },
    border: { top: { style: BorderStyle.SINGLE, size: 2, color: P.accent, space: 8 } },
    spacing: { before: 200 },
    children: [
      new TextRun({ text: config.footerLeft || "", size: 16, color: P.footerColor, font: { ascii: "Arial" } }),
      new TextRun({ text: "                                        " }),
      new TextRun({ text: config.footerRight || "", size: 16, color: P.footerColor, font: { ascii: "Arial" } }),
    ],
  }));
  return [new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    layout: TableLayoutType.FIXED,
    borders: allNoBorders,
    rows: [new TableRow({
      height: { value: 16838, rule: "exact" },
      children: [new TableCell({
        shading: { type: ShadingType.CLEAR, fill: P.bg }, borders: noBorders, children,
      })],
    })],
  })];
}

// ───────────────────────────── body helpers ─────────────────────────────
function h1(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_1,
    spacing: { before: 400, after: 180, line: 312 },
    children: [new TextRun({ text, bold: true, size: 30, color: PAL.h1, font: H_FONT })],
  });
}
function h2(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 280, after: 130, line: 312 },
    children: [new TextRun({ text, bold: true, size: 26, color: PAL.h2, font: H_FONT })],
  });
}
function body(text, opts = {}) {
  return new Paragraph({
    alignment: AlignmentType.JUSTIFIED,
    spacing: { line: 312, after: 140 },
    children: [new TextRun({ text, size: 24, color: PAL.body, font: EN_FONT, bold: !!opts.bold, italics: !!opts.italics })],
  });
}
// paragraph with mixed runs (for inline bold/italic)
function bodyRuns(runs) {
  return new Paragraph({
    alignment: AlignmentType.JUSTIFIED,
    spacing: { line: 312, after: 140 },
    children: runs.map(r => new TextRun({ text: r.t, size: 24, color: PAL.body, font: EN_FONT, bold: !!r.b, italics: !!r.i })),
  });
}
function caption(text) {
  return new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { before: 80, after: 240, line: 280 },
    children: [new TextRun({ text, size: 20, color: PAL.secondary, italics: true, font: EN_FONT })],
  });
}
function tableTitle(text) {
  return new Paragraph({
    keepNext: true,
    spacing: { before: 200, after: 100 },
    children: [new TextRun({ text, bold: true, size: 21, color: PAL.h2, font: EN_FONT })],
  });
}
function pngSize(file) {
  const b = fs.readFileSync(file);
  return { w: b.readUInt32BE(16), h: b.readUInt32BE(20) };
}
function chart(file, capText, width = 580) {
  const { w, h } = pngSize(file);
  const height = Math.round(width * h / w);
  return [
    new Paragraph({
      alignment: AlignmentType.CENTER,
      keepNext: true,
      spacing: { before: 160 },
      children: [new ImageRun({ data: fs.readFileSync(file), transformation: { width, height }, type: "png" })],
    }),
    caption(capText),
  ];
}
function dataTable({ headers, rows, widths, fontSize = 19, zebra = true, alignRight = [] }) {
  const mk = (text, opts) => new Paragraph({
    alignment: opts.right ? AlignmentType.RIGHT : AlignmentType.LEFT,
    spacing: { line: 264 },
    children: [new TextRun({
      text: String(text), size: opts.size, bold: !!opts.bold,
      color: opts.color || PAL.body, font: EN_FONT,
    })],
  });
  const headerRow = new TableRow({
    tableHeader: true, cantSplit: true,
    children: headers.map((htext, i) => new TableCell({
      children: [mk(htext, { size: fontSize, bold: true, color: PAL.table.headerText, right: alignRight.includes(i) })],
      shading: { type: ShadingType.CLEAR, fill: PAL.table.headerBg },
      margins: { top: 70, bottom: 70, left: 110, right: 110 },
      width: { size: widths[i], type: WidthType.PERCENTAGE },
    })),
  });
  const dataRows = rows.map((r, ri) => new TableRow({
    cantSplit: true,
    children: r.map((cell, i) => new TableCell({
      children: [mk(cell, { size: fontSize, right: alignRight.includes(i), bold: i === 0 && r.__boldFirst })],
      shading: zebra && ri % 2 === 1 ? { type: ShadingType.CLEAR, fill: PAL.table.surface } : undefined,
      margins: { top: 60, bottom: 60, left: 110, right: 110 },
      width: { size: widths[i], type: WidthType.PERCENTAGE },
    })),
  }));
  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    borders: {
      top: { style: BorderStyle.SINGLE, size: 6, color: PAL.table.accentLine },
      bottom: { style: BorderStyle.SINGLE, size: 6, color: PAL.table.accentLine },
      left: { style: BorderStyle.NONE }, right: { style: BorderStyle.NONE },
      insideHorizontal: { style: BorderStyle.SINGLE, size: 2, color: PAL.table.innerLine },
      insideVertical: { style: BorderStyle.NONE },
    },
    rows: [headerRow, ...dataRows],
  });
}

// ───────────────────────────── data ─────────────────────────────
const TOP_PAGES = [
  ["/wordle", "20", "9,207", "0.22%", "10.3"],
  ["/ (home — Word Unscrambler)", "17", "6,604", "0.26%", "13.6"],
  ["/anagram", "3", "1,960", "0.15%", "12.3"],
  ["/dictionary", "1", "1,922", "0.05%", "18.0"],
  ["/guides/best-wordle-starter-words", "3", "1,710", "0.18%", "25.3"],
  ["/scramble", "3", "1,454", "0.21%", "20.1"],
  ["/wordfeud", "0", "1,084", "0.00%", "8.3"],
  ["/wordstarts", "8", "743", "1.08%", "34.8"],
  ["/wordends", "1", "724", "0.14%", "26.2"],
  ["/wordle-starts", "0", "361", "0.00%", "11.2"],
];
const STRIKING = [
  ["wordle solver", "4,625", "2", "8.2"],
  ["wordle cheat", "1,306", "5", "11.2"],
  ["unscramble", "1,248", "0", "8.3"],
  ["wordfeud helper", "577", "0", "7.9"],
  ["anagram solver", "535", "1", "11.6"],
  ["anagram", "472", "0", "9.5"],
  ["wordle helper", "250", "0", "9.8"],
  ["capitalize my title wordle", "229", "1", "9.2"],
  ["wordle cheater", "152", "0", "12.0"],
  ["wordle starts with", "152", "0", "6.6"],
  ["wordfeud unscrambler", "148", "0", "6.8"],
  ["unscramble letters", "138", "0", "6.3"],
  ["wordle help", "102", "0", "9.5"],
  ["worlde solver", "100", "2", "12.3"],
  ["wordfeud help", "86", "0", "8.5"],
];
const CLUSTERS = [
  ["wordle-solver (solver / helper / answer)", "155", "5,701", "9", "9.2"],
  ["unscramble / jumble / descramble", "405", "2,902", "5", "18.3"],
  ["wordle-cheat", "30", "1,824", "5", "12.3"],
  ["anagram-solver (incl. misspellings)", "158", "1,584", "1", "12.6"],
  ["starts-with (general word lists)", "305", "1,200", "7", "50.0"],
  ["wordfeud", "17", "886", "0", "8.2"],
  ["ends-with (general word lists)", "236", "788", "1", "41.1"],
  ["best wordle starting words (guide)", "154", "696", "0", "44.7"],
  ["make words from these letters", "278", "650", "0", "39.9"],
  ["competitor-brand (capitalize my title...)", "21", "328", "1", "10.5"],
];
const FAMILIES = [
  ["Core tools + homepage (13 pages)", "22,981", "58", "12.7"],
  ["Wordle starts/ends letter pages (51 pages)", "2,959", "4", "12.5"],
  ["General starts/ends letter pages (59 pages)", "2,339", "12", "40.3"],
  ["Guides (4 pages)", "1,892", "3", "24.2"],
  ["Unscramble-by-length pages (10 pages)", "25", "0", "22.0"],
];
const TITLES_BEFORE_AFTER = [
  ["/wordle", "Wordle Solver — Daily Cheat & Word Pattern Helper", "Wordle Solver — Cheat, Helper & Answer Finder"],
  ["/wordfeud", "Wordfeud Helper — Find Best Words from Your Rack", "Wordfeud Helper & Cheat — Best Words From Your Rack"],
  ["/scramble", "Word Scramble Solver — Descramble Jumbled Letters", "Word Scrambler — Descramble & Unscramble Jumbled Words"],
  ["/anagram", "Anagram Solver — Find All Possible Hidden Anagrams", "Anagram Solver — Find All Anagrams of Your Letters"],
  ["/dictionary", "Scrabble Dictionary Checker — Verify Words & Scores", "Scrabble Dictionary Checker — Is It a Valid Word?"],
  ["/wordstarts", "Words Starts With A-Z — Browse Scrabble Words by Letter", "Words That Start With A to Z — Word Lists by Letter"],
  ["/wordends", "Words Ends With A-Z — Browse Scrabble Words by Ending", "Words That End With A to Z — Word Lists by Letter"],
  ["/wordle-starts", "Wordle Words Starting With A-Z — Best Starting Words", "Wordle Words That Start With A to Z — Best Starters"],
  ["/wordle-ends", "Wordle Words Ending With A-Z — Hooks & Suffixes", "Wordle Words That End With A to Z — Hooks & Suffixes"],
  ["~130 word-list pages", "Words Starting With \"T\" / Wordle Words Starting With \"T\"", "Words That Start With \"T\" — 14,759 Valid Words / 1,173 5-Letter Words Starting With \"T\" — Wordle"],
];
const REDIRECTS = [
  ["/words-starts-by-{letter}", "/words-starts-with-{letter}"],
  ["/words-ends-by-{letter}", "/words-ends-with-{letter}"],
  ["/words-starting-with-{letter}", "/words-starts-with-{letter}"],
  ["/words-ending-with-{letter}", "/words-ends-with-{letter}"],
  ["/{n}-letter-words (e.g. /5-letter-words)", "/unscramble-{n}-letter-words"],
  ["/unscramble/{any legacy word-list slug}", "matching canonical single-segment URL"],
  ["/unscramble (bare)", "/ (homepage)"],
  ["/game", "/blitz"],
];

// ───────────────────────────── body content ─────────────────────────────
const bodyChildren = [];

// 1. Executive Summary
bodyChildren.push(h1("1. Executive Summary"));
bodyChildren.push(body(
  "Between October 13 and November 9, 2026 (28 days), wordizy.com received 30,221 impressions and 77 clicks from Google organic search — a click-through rate (CTR) of 0.26% at an impression-weighted average position of 15.6. The site's fundamental SEO problem in this period was not visibility: 189 distinct queries already rank in positions 4-15 and together account for 12,008 impressions. The problem is that those rankings earn almost no clicks. At benchmark CTRs for the same positions, the current impression base would produce roughly 400 clicks per 28 days; the site captured fewer than one fifth of that."));
bodyChildren.push(body(
  "The analysis identified four root causes. First, head-term SERPs (wordle solver, unscramble, wordfeud helper) are saturated with apps, instant answers and People-Also-Ask blocks, so positions 7-12 frequently render below the fold on mobile; impressions accrue while clicks do not. Second, many title tags did not mirror the query phrasing searchers actually use, weakening both relevance matching and click appeal. Third, roughly 100 legacy URL variants (words-starts-by-*, /unscramble/... paths, /N-letter-words) were serving HTTP 200 duplicates of canonical pages, splitting ranking signals between URL variants. Fourth — and most seriously — a routing defect served the homepage, with HTTP 200 and an index,follow directive, for ANY unknown URL, exposing the site to unlimited soft-404 homepage duplicates."));
bodyChildren.push(body(
  "On November 11, 2026 all controllable defects were fixed and deployed to production: titles and meta descriptions were rewritten across nine core tools and roughly 130 programmatic word-list pages (now count-enriched and phrased to match real queries, e.g. \"1,173 5-Letter Words Starting With T — Wordle\"); 15 legacy URL patterns now 308-redirect to their canonical forms; every valid slug is statically pre-rendered and unknown URLs return a real 404; owner-only pages are noindexed; the sitemap last-modified date was bumped; and IndexNow was re-pinged (after replacing a non-compliant key). Normalizing CTR toward benchmark at current rankings implies an estimated 250-400 additional clicks per 28 days; capturing the striking-distance pool at position ~5 implies up to roughly 380 more. Both figures are directional estimates, and Section 7 defines how to measure the actual effect."));

// 2. Background
bodyChildren.push(h1("2. Background and Objectives"));
bodyChildren.push(body(
  "wordIzy (wordizy.com) is a word-game toolkit launched in mid-2026: a word unscrambler, anagram and Wordle solvers, Scrabble/Wordfeud helpers, a dictionary checker, random word generation, a 60-second Anagram Blitz game, and about 130 programmatic word-list pages (words by starting/ending letter and by length). The user interface supports nine languages, while page metadata is English. Four editorial guides support long-tail intent."));
bodyChildren.push(body(
  "This report was commissioned to answer one question: how can the existing Google Search Console data be exploited to grow organic traffic as fast as possible? The objectives are to (a) quantify where demand and rankings already exist, (b) diagnose why current rankings do not convert into visits, (c) ship the highest-leverage fixes immediately, and (d) lay out a prioritized roadmap for the following quarter. The scope covers Google organic search only; paid channels, social, and backlink audits are out of scope for this report."));

// 3. Methodology
bodyChildren.push(h1("3. Data Sources, Scope and Methodology"));
bodyChildren.push(body(
  "The analysis is based on two Google Analytics 4 exports of the linked Search Console property for the 28-day window October 13 - November 9, 2026: a landing-page report (141 URLs with clicks, impressions, CTR, average position and GA4 engagement metrics) and a query report (2,357 named queries). All 2,357 queries were programmatically classified into 21 intent clusters (for example wordle-solver, anagram-solver including the large family of misspellings, wordfeud, starts-with, best-wordle-starting-words)."));
bodyChildren.push(body(
  "To judge whether CTRs are abnormal, each page and query was compared against a benchmark CTR-by-position curve blended from widely published SEO CTR studies (roughly 27% at position 1, 5.5% at position 5, 2.2% at position 10, 1% at position 15, and lower beyond). \"Striking distance\" is defined as average position 4-15 — the range where realistic on-page improvements can plausibly move a result onto the visible part of the first page. All potential-impact figures in this report are estimates derived from that curve, not measurements."));
bodyChildren.push(bodyRuns([
  { t: "Three caveats apply. ", b: true },
  { t: "First, about 12,000 impressions (40% of the total) come from anonymized queries that Search Console does not disclose, so named-query cluster totals undercount real demand. Second, GA4 was only installed on October 30, and its engagement columns show almost no engaged organic users in the overlap window — engagement figures are therefore not yet reliable and were not used for conclusions. Third, an average position can hide a bimodal distribution (some impressions at position 2, many at position 20), which is one reason CTRs can look extreme." },
]));

// 4. Core findings
bodyChildren.push(h1("4. Core Findings"));
bodyChildren.push(h2("4.1 Site-Level Picture"));
bodyChildren.push(body(
  "Table 1 lists the ten highest-impression landing pages. The homepage (the Word Unscrambler) and /wordle alone carry 52% of all impressions. Only 13 pages receive more than 100 impressions, while the long tail of 128 pages — mostly letter-specific word lists — receives between 1 and 100 impressions each."));
bodyChildren.push(tableTitle("Table 1: Top landing pages by impressions (Oct 13 - Nov 9, 2026)"));
bodyChildren.push(dataTable({
  headers: ["Landing page", "Clicks", "Impr.", "CTR", "Avg pos"],
  rows: TOP_PAGES, widths: [44, 12, 14, 14, 16], alignRight: [1, 2, 3, 4],
}));
bodyChildren.push(h2("4.2 The CTR Gap: Rankings Exist, Clicks Do Not"));
bodyChildren.push(body(
  "Figure 1 compares each major page's actual CTR with the benchmark CTR for its own average position. Every head page earns a small fraction of its expected clicks: /wordle converts 0.22% where 2.06% would be normal at position 10.3 (11% of benchmark); /dictionary converts 0.05% versus 0.70% (7% of benchmark); and /wordfeud earned literally zero clicks from 1,084 impressions at position 8.3, where roughly 28 clicks would be expected. The two exceptions prove the rule: /wordstarts earns 1.08% at position 34.8 (eight times benchmark) because a handful of highly specific queries like \"words that start with a to z\" match its title almost word for word, and /blitz earns 10.7% on branded game queries. Exact-match, specific-intent titles win clicks even from weak positions."));
bodyChildren.push(...chart(`${ASSETS}/chart1-ctr-gap.png`,
  "Figure 1: Actual CTR vs benchmark CTR at the same average position (pages with 100+ impressions)."));
bodyChildren.push(h2("4.3 Query Demand by Intent Cluster"));
bodyChildren.push(body(
  "Figure 2 and Table 2 aggregate named queries into intent clusters. The wordle-solver cluster (solver, helper, answer, pattern variants) is the site's center of gravity: 5,701 named impressions at an average position of 9.2 — yet only 9 clicks. The wordfeud cluster is the starkest anomaly: 886 impressions at position 8.2 with zero clicks, despite an exact-match \"Wordfeud Helper\" title. The anagram cluster, including more than sixty misspellings (anagam solver, annagram, anafram...), shows the same pattern at position 12.6. Two clusters reveal demand the site serves poorly today: the best-wordle-starting-words cluster (696 impressions, average position 44.7 — the guide ranks on page 5) and the generic starts-with/ends-with word-list clusters (positions 40-50, facing WordHippo-class competitors)."));
bodyChildren.push(...chart(`${ASSETS}/chart2-clusters.png`,
  "Figure 2: Impressions by intent cluster with impression-weighted average position (named queries only)."));
bodyChildren.push(tableTitle("Table 2: Top intent clusters (named queries, 28 days)"));
bodyChildren.push(dataTable({
  headers: ["Cluster", "Queries", "Impr.", "Clicks", "Avg pos"],
  rows: CLUSTERS, widths: [46, 12, 14, 12, 16], alignRight: [1, 2, 3, 4],
}));
bodyChildren.push(h2("4.4 The Striking-Distance Pool"));
bodyChildren.push(body(
  "Table 3 lists the largest queries currently ranking in positions 4-15. Together this pool contains 189 queries and 12,008 impressions. Applying the benchmark curve at position 5 to each query yields an estimated ceiling of roughly 380 additional clicks per 28 days if the pool moved onto the visible part of page one. The pool is dominated by the head terms already discussed, but it also contains precisely-phrased helpers such as \"wordfeud unscrambler\" (148 impressions at 6.8) and \"unscramble letters\" (138 at 6.3) that convert to zero — these were primary targets of the title rewrite."));
bodyChildren.push(tableTitle("Table 3: Largest striking-distance queries (position 4-15)"));
bodyChildren.push(dataTable({
  headers: ["Query", "Impr.", "Clicks", "Avg pos"],
  rows: STRIKING, widths: [52, 16, 14, 18], alignRight: [1, 2, 3],
}));
bodyChildren.push(h2("4.5 Page-Family Performance"));
bodyChildren.push(body(
  "Grouping the 141 pages into families exposes where the structural problems sit (Table 4). The 51 Wordle letter pages rank well (weighted position 12.5) but convert almost nothing — a family-wide CTR defect, consistent with the diagnosis in 4.2. The 59 general letter pages rank at position 40 on average because the family still contains legacy starts-by/ends-by URL variants that Google indexes separately from the canonical starts-with/ends-with URLs (for example /words-starts-by-n held 112 impressions at position 71.6 while /words-starts-with-n fought for the same queries). The four guides, despite sitewide footer links, average position 24 — a content-depth problem rather than a linking problem."));
bodyChildren.push(tableTitle("Table 4: Page families (28 days)"));
bodyChildren.push(dataTable({
  headers: ["Family", "Impr.", "Clicks", "Wtd pos"],
  rows: FAMILIES, widths: [52, 16, 14, 18], alignRight: [1, 2, 3],
}));

// 5. Root causes
bodyChildren.push(h1("5. Root-Cause Diagnosis"));
bodyChildren.push(h2("5.1 Positions 7-12 Sit Below the Fold in Feature-Heavy SERPs"));
bodyChildren.push(body(
  "Mobile devices account for roughly two thirds of these queries, and the SERPs for wordle solver, unscramble and wordfeud helper are saturated: Google's own widgets, app packs, People-Also-Ask accordions and dictionary instant answers routinely push organic results seven and lower below the first screen. Search Console still counts those below-fold renderings as impressions, which inflates impressions while suppressing clicks. The site's own data supports this: the pages that DO earn strong CTR (/blitz 10.7% at position 8.9, /about 2.5% at 7.0, /wordstarts 30% on exact-match long-tails) compete in less feature-heavy results. The practical implication is that positions 7-12 are worth far less than the benchmark curve assumes, and that both CTR optimization and genuine top-5 movement are needed."));
bodyChildren.push(h2("5.2 Title Tags Did Not Mirror Query Phrasing"));
bodyChildren.push(body(
  "Searchers typed \"words that start with t\" while the page title read \"Words Starting With T\"; they typed \"word scrambler tool\" (64 impressions, position 7.0) against \"Word Scramble Solver\"; \"wordfeud unscrambler\" (148 impressions, position 6.8) against \"Wordfeud Helper\". The letter pages also gave no concrete reason to click — no count, no length hook — while competitors display counts and 5-letter hooks. Because these pages sat at positions 6-9 with 0% CTR, the downside of rewriting was effectively zero and the upside material."));
bodyChildren.push(h2("5.3 Ranking Signals Split Across Legacy Duplicate URLs"));
bodyChildren.push(body(
  "Before this fix, /words-starts-by-j, /words-starting-with-j and /unscramble/words-starting-with-j all returned HTTP 200 alongside the canonical /words-starts-with-j, differing only by a canonical-tag hint that Google demonstrably did not consolidate: Search Console shows both variant families accumulating impressions and positions independently (the starts-by pages at positions 50-96). Every inbound link, every crawl budget unit, and every ranking signal landing on a legacy variant was being split away from the canonical page."));
bodyChildren.push(h2("5.4 Soft-404: Any Unknown URL Rendered the Homepage"));
bodyChildren.push(body(
  "Verification against production confirmed that a request for any nonexistent path — for example /nonexistent-page-xyz or /Wordle — returned HTTP 200 with the full homepage content and an index,follow robots directive. This is a textbook soft-404 duplicate-content defect: any externally-created junk URL (typos, case variants, trailing segments, attack links) could enter Google's index as another copy of the homepage, diluting its signals. GA4 even recorded a landing page of \"/?gtm_latency=1\" (tag-preview traffic) in the organic report, illustrating how freely non-canonical URLs flowed into measurement."));
bodyChildren.push(h2("5.5 International Demand Sees English-Only Snippets"));
bodyChildren.push(body(
  "Named queries already include wordle oplosser (Dutch, 20 impressions at position 9.1), wørdle solver (Norwegian, 8 at 8.8), wordle hjælper (Danish, 4 at 9.0), wordle löser deutsch (German, 15 across variants at positions 28-69) and dictionnaire wordfeud (French, 21 at 15.6) — all with zero clicks. The site switches language client-side, so Google only ever indexes the English version and these searchers see English titles. Wordfeud's core markets are the Nordic countries and the Netherlands, which makes this a genuine traffic reservoir rather than noise."));
bodyChildren.push(h2("5.6 Measurement Caveats"));
bodyChildren.push(body(
  "GA4 was installed on October 30, so engagement columns cover only 11 of the 28 days, and they show essentially no engaged organic users in that overlap. This is either genuine rapid-bounce behavior on tool pages (plausible for solver utilities) or a measurement artifact of the GA4-Search Console join; either way it should be re-evaluated in the next reporting cycle before drawing conclusions. The ~40% anonymized-query share also means every named-query figure in this report is a floor, not a ceiling."));

// 6. Actions implemented
bodyChildren.push(h1("6. Actions Implemented on November 11, 2026"));
bodyChildren.push(body(
  "All changes below were built, verified against a production build (168 statically generated pages, 39 routes returning 200, 13 redirect patterns returning 308, unknown URLs returning 404) and deployed to production on November 11, 2026."));
bodyChildren.push(h2("6.1 Title and Description Rewrites (CTR Recovery)"));
bodyChildren.push(body(
  "Nine core tool pages and roughly 130 programmatic word-list pages received new titles and meta descriptions. Word-list titles are now count-enriched from the live dictionary store — real counts computed at render time — because a number is the strongest click trigger available in a word-list SERP. Table 5 shows the key before/after pairs."));
bodyChildren.push(tableTitle("Table 5: Title rewrites shipped November 11, 2026"));
bodyChildren.push(dataTable({
  headers: ["Page", "Old title", "New title"],
  rows: TITLES_BEFORE_AFTER, widths: [18, 40, 42], fontSize: 17,
}));
bodyChildren.push(h2("6.2 Legacy URL Consolidation (301/308 Redirects)"));
bodyChildren.push(body(
  "Fifteen redirect patterns now permanently forward every legacy word-list variant to its canonical URL, folding all accumulated signals onto one address per page. Two broken aliases were fixed in passing: bare /unscramble previously served the homepage with no canonical (it now redirects to /), and /game served homepage content while carrying the game's VideoGame structured data (it now redirects to /blitz)."));
bodyChildren.push(tableTitle("Table 6: Redirect patterns (all permanent)"));
bodyChildren.push(dataTable({
  headers: ["Legacy pattern", "Redirects to"],
  rows: REDIRECTS, widths: [50, 50], fontSize: 18,
}));
bodyChildren.push(h2("6.3 Soft-404 Elimination and Full Static Pre-Rendering"));
bodyChildren.push(body(
  "The catch-all route now enumerates every valid slug (141 pages: homepage, 20 registry tools and info pages, 2 hidden owner views, 104 letter pages, 14 length pages) and disables on-demand rendering, so any unknown URL receives a real 404 status and the styled not-found page. As a side benefit, all 141 pages are statically pre-rendered and CDN-cached, improving Core Web Vitals. The owner-only /inbox and /dashboard pages are now marked noindex,nofollow."));
bodyChildren.push(h2("6.4 Re-Crawl Acceleration"));
bodyChildren.push(body(
  "The sitemap last-modified timestamp was bumped to the deploy date, and IndexNow was re-pinged for all 142 sitemap URLs. During the re-ping, the original IndexNow key — a UUID containing dashes — was found to violate the IndexNow specification (keys must be 8-128 hexadecimal characters only) and was being rejected with HTTP 403 by both api.indexnow.org and bing.com/indexnow. A compliant 32-character hex key was generated, deployed, and the ping now succeeds."));

// 7. Roadmap
bodyChildren.push(h1("7. Conclusions and Growth Roadmap"));
bodyChildren.push(h2("7.1 What Was Fixed Today (P0 — Deployed)"));
bodyChildren.push(body(
  "The November 11 deploy addressed every defect that was directly controllable in code: snippet appeal (titles and descriptions across ~140 pages), signal consolidation (redirects), index hygiene (real 404s, noindex on owner pages), delivery (full static pre-render) and crawl acceleration (sitemap bump, IndexNow). No further engineering action is required for these items; the next step for them is measurement."));
bodyChildren.push(h2("7.2 P1 — Next Two to Four Weeks (Content Depth)"));
bodyChildren.push(body(
  "Three content plays attack the largest under-exploited demand pockets. First, rebuild /guides/best-wordle-starter-words into a genuinely comprehensive resource (data tables of top starters by letter frequency and vowel coverage, a second-guess framework, FAQ schema): its cluster carries 696 named impressions currently ranking at position 44.7, and the queries are informational enough that content depth moves them. Second, launch an \"Is [word] a valid Scrabble word?\" programmatic page set — the query data shows more than a hundred such lookups (is zave a scrabble word, izy scrabble word, is ez a scrabble word...) reaching /dictionary at positions 8-11 with almost no clicks; dedicated per-word pages would both rank and convert. Third, add length-targeted sections to the Wordle solver page for \"5/6/7/8 letter wordle solver\" queries (43 combined named impressions, positions 7.8-25)."));
bodyChildren.push(h2("7.3 P2 — Structural Bets (Next Quarter)"));
bodyChildren.push(body(
  "Internationalization is the largest untapped reservoir: localized subpaths (for example /de/, /fr/, /nl/, /da/, /no/) with proper hreflang alternates would let the already-ranking Dutch, German, Danish, Norwegian and French queries finally see native-language snippets — particularly valuable for Wordfeud, whose demand is concentrated in exactly those markets. Second, authority building: Bing Webmaster Tools has flagged weak backlinks, and the site ranks 9-10 for competitor-brand queries (\"capitalize my title wordle\", 328 impressions) without earning clicks — a signature of low brand trust that only external signals will change. Third, expand the crossword-tips programmatic pattern, which already ranks positions 1-10 for roughly twenty persona long-tails (103 impressions at average position ~6) but at negligible volume per query."));
bodyChildren.push(h2("7.4 Expected Impact and Measurement Plan"));
bodyChildren.push(body(
  "Two estimates frame the upside, both derived from the benchmark curve and therefore directional rather than promised. CTR normalization alone — bringing each head page to the benchmark CTR for its current position — implies roughly 250-400 additional clicks per 28 days from the existing impression base. Moving the striking-distance pool (12,008 impressions) onto the visible first page implies up to roughly 380 additional clicks. Realistically the fixes interact (better titles also improve rankings, redirects recover cannibalized positions), so the combined ceiling is on the order of 600-800 clicks per 28 days at full execution."));
bodyChildren.push(...chart(`${ASSETS}/chart3-opportunity.png`,
  "Figure 3: Click opportunity by page — current clicks vs expected clicks at benchmark CTR (same rank) vs potential at position ~5."));
bodyChildren.push(body(
  "Measurement should compare the 28-day window starting roughly November 18 (allowing a week for re-crawling) against the October 13 - November 9 baseline. The key indicators, in order: average CTR for the nine rewritten tool pages (target: double or more); impressions and positions of the canonical letter pages as legacy variants drop out of the index; index coverage (the count of indexed pages should converge toward 141 plus guides, with soft-404s disappearing); and clicks on the ten money queries of Table 3. GA4 engaged sessions from organic should be re-baselined from November 11, since the property now has a clean start with the new deployment."));

// 8. Appendix
bodyChildren.push(h1("8. Appendix: Data Tables"));
bodyChildren.push(h2("8.1 All Clusters"));
const clustersFull = [
  ["wordle-solver", "155", "5,701", "9", "9.2"],
  ["unscramble-jumble", "405", "2,902", "5", "18.3"],
  ["wordle-cheat", "30", "1,824", "5", "12.3"],
  ["anagram-solver", "158", "1,584", "1", "12.6"],
  ["starts-with", "305", "1,200", "7", "50.0"],
  ["wordfeud", "17", "886", "0", "8.2"],
  ["ends-with", "236", "788", "1", "41.1"],
  ["wordle-starting-words", "154", "696", "0", "44.7"],
  ["make-words-from-letters", "278", "650", "0", "39.9"],
  ["wordle-other", "112", "458", "1", "23.6"],
  ["other (uncategorized)", "218", "428", "0", "26.4"],
  ["scrabble-checker", "125", "373", "1", "38.9"],
  ["competitor-brand", "21", "328", "1", "10.5"],
  ["crossword", "37", "149", "0", "12.3"],
  ["letter-words-other", "58", "95", "0", "40.9"],
  ["quordle", "6", "53", "1", "11.1"],
  ["random-generator", "18", "49", "0", "16.7"],
  ["is-it-a-word", "8", "34", "0", "25.5"],
  ["dictionary", "14", "21", "0", "63.6"],
  ["brand (wordizy / worldzy)", "1", "6", "1", "6.5"],
  ["wordle-pattern", "1", "1", "0", "6.0"],
];
bodyChildren.push(tableTitle("Table 7: All 21 intent clusters (named queries, 28 days)"));
bodyChildren.push(dataTable({
  headers: ["Cluster", "Queries", "Impr.", "Clicks", "Avg pos"],
  rows: clustersFull, widths: [46, 12, 14, 12, 16], alignRight: [1, 2, 3, 4], fontSize: 18,
}));
bodyChildren.push(h2("8.2 Notable Zero-Click Anomalies (Impressions ≥ 40)"));
const anomalies = [
  ["unscramble", "1,248", "8.3", "≈ 33 expected clicks"],
  ["wordfeud helper", "577", "7.9", "≈ 16 expected clicks"],
  ["anagram", "472", "9.5", "≈ 11 expected clicks"],
  ["yourdictionary unscramble", "108", "3.6", "competitor-brand query"],
  ["wordle starts with", "152", "6.6", "≈ 5 expected clicks"],
  ["wordfeud unscrambler", "148", "6.8", "≈ 5 expected clicks"],
  ["unscramble letters", "138", "6.3", "≈ 5 expected clicks"],
  ["scrabble word checker", "79", "46.1", "ranking problem, not CTR"],
  ["word scrambler tool", "64", "7.0", "≈ 2 expected clicks"],
  ["unscrambler", "46", "7.7", "≈ 1 expected click"],
];
bodyChildren.push(tableTitle("Table 8: Zero-click anomalies and their diagnosis"));
bodyChildren.push(dataTable({
  headers: ["Query", "Impr.", "Avg pos", "Diagnosis"],
  rows: anomalies, widths: [34, 12, 14, 40], alignRight: [1, 2], fontSize: 18,
}));
bodyChildren.push(body(
  "Source data: Google Search Console / GA4 organic search exports, property wordizy, October 13 - November 9, 2026. Analysis scripts and intermediate JSON are preserved in the project repository (scripts/analyze-gsc.py, scripts/gsc_*.json).", { italics: true }));

// ───────────────────────────── document assembly ─────────────────────────────
const pgSize = { width: 11906, height: 16838 };
const pgMargin = { top: 1440, bottom: 1440, left: 1701, right: 1417 };

function pageFooter(markerColor) {
  return new Footer({
    children: [new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [new TextRun({ children: [PageNumber.CURRENT], size: 18, color: markerColor, font: EN_FONT })],
    })],
  });
}
const bodyHeader = new Header({
  children: [new Paragraph({
    alignment: AlignmentType.CENTER,
    border: { bottom: { style: BorderStyle.SINGLE, size: 2, color: "C8DDE2", space: 4 } },
    children: [new TextRun({ text: "wordIzy — Organic Search Traffic Analysis", size: 18, color: "808080", font: EN_FONT })],
  })],
});

const doc = new Document({
  creator: "wordIzy",
  title: "wordIzy Organic Search Traffic Analysis & Growth Plan",
  description: "Google Search Console deep-dive and growth plan for wordizy.com",
  styles: {
    default: {
      document: {
        run: { font: EN_FONT, size: 24, color: PAL.body },
        paragraph: { spacing: { line: 312 } },
      },
      heading1: {
        run: { font: H_FONT, size: 30, bold: true, color: PAL.h1 },
        paragraph: { spacing: { before: 400, after: 180, line: 312 }, outlineLevel: 0 },
      },
      heading2: {
        run: { font: H_FONT, size: 26, bold: true, color: PAL.h2 },
        paragraph: { spacing: { before: 280, after: 130, line: 312 }, outlineLevel: 1 },
      },
      heading3: {
        run: { font: H_FONT, size: 24, bold: true, color: PAL.h3 },
        paragraph: { spacing: { before: 220, after: 110, line: 312 }, outlineLevel: 2 },
      },
    },
  },
  sections: [
    { // Section 1: cover — margin 0, no footer, no page numbers
      properties: { page: { size: pgSize, margin: { top: 0, bottom: 0, left: 0, right: 0 } } },
      children: buildCoverR1({
        title: "Organic Search Traffic Analysis & Growth Plan",
        subtitle: "A Google Search Console deep-dive for wordizy.com — where demand already exists, why it does not convert, and what was done about it",
        englishLabel: "ORGANIC SEARCH ANALYSIS",
        metaLines: [
          "Property: wordizy.com",
          "Data window: October 13 – November 9, 2026 (28 days)",
          "Source: Google Search Console × GA4 organic search",
          "Prepared: November 11, 2026",
        ],
        footerLeft: "wordIzy — Word Tools",
        footerRight: "November 2026",
        palette: { bg: PAL.bg, accent: PAL.accent, ...PAL.cover },
      }),
    },
    { // Section 2: TOC — Roman numerals
      properties: {
        type: SectionType.NEXT_PAGE,
        page: { size: pgSize, margin: pgMargin, pageNumbers: { start: 1, formatType: NumberFormat.UPPER_ROMAN } },
      },
      footers: { default: pageFooter("888889") },
      children: [
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 480, after: 360 },
          children: [new TextRun({ text: "Table of Contents", bold: true, size: 32, font: H_FONT, color: PAL.h1 })],
        }),
        new TableOfContents("Table of Contents", { hyperlink: true, headingStyleRange: "1-2" }),
        new Paragraph({
          spacing: { before: 200 },
          children: [new TextRun({
            text: "Note: This Table of Contents is generated via field codes. To ensure page number accuracy after editing, please right-click the TOC and select \"Update Field.\"",
            italics: true, size: 18, color: "888888", font: EN_FONT,
          })],
        }),
        // NOTE: no trailing PageBreak here — the body section below uses
        // SectionType.NEXT_PAGE, which already forces the page break. Adding
        // a PageBreak too would create a blank page (postcheck flags it).
      ],
    },
    { // Section 3: body — Arabic from 1
      properties: {
        type: SectionType.NEXT_PAGE,
        page: { size: pgSize, margin: pgMargin, pageNumbers: { start: 1, formatType: NumberFormat.DECIMAL } },
      },
      headers: { default: bodyHeader },
      footers: { default: pageFooter("808080") },
      children: bodyChildren,
    },
  ],
});

Packer.toBuffer(doc).then((buf) => {
  fs.writeFileSync(OUT, buf);
  console.log("written:", OUT, buf.length, "bytes");
});
