#!/usr/bin/env tsx
// Ping IndexNow with ALL sitemap URLs — run this once after deploying new
// content to tell Bing/Yandex/Naver "these URLs changed, re-crawl them".
//
// Usage:
//   bunx tsx scripts/ping-indexnow.ts           # ping via production API
//   bunx tsx scripts/ping-indexnow.ts --local   # ping via localhost:3000
//
// The script reads the same sitemap generator that Next.js uses to produce
// /sitemap.xml, so the URL list always matches what's in the live sitemap.

import sitemap from "../src/app/sitemap";

async function main() {
  // Determine target — production API by default, localhost with --local flag.
  const args = process.argv.slice(2);
  const isLocal = args.includes("--local");
  const baseUrl = isLocal ? "http://localhost:3000" : "https://wordizy.com";

  console.log(`Reading sitemap generator...`);
  const entries = await sitemap();
  const urls = entries.map((entry) => entry.url);

  console.log(`Found ${urls.length} URLs to ping.`);
  console.log(`Target: ${baseUrl}/api/indexnow`);
  console.log(`First 5 URLs: ${urls.slice(0, 5).join(", ")}`);
  console.log(`Last 5 URLs: ${urls.slice(-5).join(", ")}`);
  console.log("");

  // IndexNow accepts up to 10,000 URLs per request. Our sitemap has ~141 URLs,
  // well under the limit. For larger sites, chunk into batches of 10,000.
  const BATCH_SIZE = 10000;
  const batches: string[][] = [];
  for (let i = 0; i < urls.length; i += BATCH_SIZE) {
    batches.push(urls.slice(i, i + BATCH_SIZE));
  }

  console.log(`Submitting in ${batches.length} batch(es) of up to ${BATCH_SIZE} URLs each...`);

  for (let i = 0; i < batches.length; i++) {
    const batch = batches[i];
    const batchLabel = batches.length > 1 ? ` (batch ${i + 1}/${batches.length})` : "";

    try {
      const response = await fetch(`${baseUrl}/api/indexnow`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ urls: batch }),
      });

      const result = await response.json();
      console.log(`  Response${batchLabel}: HTTP ${response.status}`);
      console.log(`  Submitted: ${result.submitted ?? 0} URLs`);
      console.log(`  OK: ${result.ok ?? false}`);
      console.log(`  Message: ${result.message ?? result.error ?? "(no message)"}`);
    } catch (err) {
      console.error(`  Error${batchLabel}:`, err);
    }

    if (i < batches.length - 1) {
      // Be polite — wait 1s between batches.
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }

  console.log("");
  console.log("Done. Search engines will re-crawl the submitted URLs within ~minutes.");
  console.log("Verify at: https://www.bing.com/webmasters → URL Inspection → check 'Last crawled' date.");
}

main().catch((err) => {
  console.error("Ping failed:", err);
  process.exit(1);
});
