#!/usr/bin/env tsx
// One-off script: ping all sitemap URLs to IndexNow using the OLD key
// (4c390b55...) which is still verified. The new key (6fc8ac9f...) is deployed
// but returns 403 "UserForbiddedToAccessSite" — it needs to be verified in
// Bing Webmaster Tools first.
//
// This script reads the sitemap, chunks URLs into 10k batches, and POSTs
// directly to api.indexnow.org using the old key. Run once after deploying
// the P1 content (Task 36).
//
// Usage: bunx tsx scripts/ping-indexnow-old-key.ts

import sitemap from "../src/app/sitemap";

const OLD_KEY = "4c390b55a43e0c71cd0f29c2a11b444f";
const OLD_KEY_LOCATION = `https://wordizy.com/${OLD_KEY}.txt`;

async function main() {
  console.log("Reading sitemap generator...");
  const entries = await sitemap();
  const urls = entries.map((entry) => entry.url);

  console.log(`Found ${urls.length} URLs to ping.`);
  console.log(`Using OLD key: ${OLD_KEY}`);
  console.log(`Key location: ${OLD_KEY_LOCATION}`);
  console.log(`First 5 URLs: ${urls.slice(0, 5).join(", ")}`);
  console.log(`Last 5 URLs: ${urls.slice(-5).join(", ")}`);
  console.log("");

  const BATCH_SIZE = 10000;
  const batches: string[][] = [];
  for (let i = 0; i < urls.length; i += BATCH_SIZE) {
    batches.push(urls.slice(i, i + BATCH_SIZE));
  }

  console.log(`Submitting in ${batches.length} batch(es) of up to ${BATCH_SIZE} URLs each...`);

  for (let i = 0; i < batches.length; i++) {
    const batch = batches[i];
    const batchLabel = batches.length > 1 ? ` (batch ${i + 1}/${batches.length})` : "";

    const payload = {
      host: "wordizy.com",
      key: OLD_KEY,
      keyLocation: OLD_KEY_LOCATION,
      urlList: batch,
    };

    try {
      const response = await fetch("https://api.indexnow.org/indexnow", {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: JSON.stringify(payload),
      });

      const ok = response.status === 200 || response.status === 202;
      const body = await response.text().catch(() => "");
      console.log(`  Response${batchLabel}: HTTP ${response.status} ${ok ? "✓ OK" : "✗ FAIL"}`);
      console.log(`  Submitted: ${batch.length} URLs`);
      if (!ok && body) {
        console.log(`  Error body: ${body.slice(0, 200)}`);
      }
    } catch (err) {
      console.error(`  Error${batchLabel}:`, err);
    }

    if (i < batches.length - 1) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }

  console.log("");
  console.log("Done. Search engines will re-crawl the submitted URLs within ~minutes.");
}

main().catch((err) => {
  console.error("Ping failed:", err);
  process.exit(1);
});
