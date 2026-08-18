// scripts/process-logo.mjs
// Generate all favicon / icon sizes from /home/z/my-project/upload/logo.png.
// Removes near-white background, writes outputs to wordIzy-1/public/.
//
// Usage:  node scripts/process-logo.mjs   (or: bun run scripts/process-logo.mjs)

import sharp from "sharp";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SRC = "/home/z/my-project/upload/logo.png";
const OUT = path.resolve(__dirname, "..", "public");

// Ensure output directory exists.
if (!fs.existsSync(OUT)) fs.mkdirSync(OUT, { recursive: true });

if (!fs.existsSync(SRC)) {
  console.error(`Source logo not found: ${SRC}`);
  process.exit(1);
}

// Helper: remove near-white pixels (alpha → 0) so background becomes transparent.
async function removeWhiteBackground(inputBuffer) {
  const image = sharp(inputBuffer);
  const { data, info } = await image
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const channels = info.channels;
  const threshold = 230; // anything brighter than this is treated as white.

  for (let i = 0; i < data.length; i += channels) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    if (r >= threshold && g >= threshold && b >= threshold) {
      // Transparent (and pull down the brightness so neighbours blend cleanly).
      data[i] = 0;
      data[i + 1] = 0;
      data[i + 2] = 0;
      data[i + 3] = 0; // alpha = 0
    }
  }

  return sharp(data, {
    raw: { width: info.width, height: info.height, channels },
  });
}

async function writePng(pipeline, size, name) {
  const target = path.join(OUT, name);
  await pipeline
    .clone()
    .resize(size, size, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png({ compressionLevel: 9 })
    .toFile(target);
  console.log(`✓ ${name}  (${size}×${size})`);
}

async function buildIco(sizes, outName) {
  // Build a multi-image .ico file with PNG-encoded entries.
  const pngs = [];
  for (const s of sizes) {
    const buf = await sharp(SRC)
      .ensureAlpha()
      .resize(s, s, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png()
      .toBuffer();
    pngs.push({ size: s, buf });
  }

  // ICO file format (simplified, PNG-based entries).
  const headerSize = 6;
  const entrySize = 16;
  const numImages = pngs.length;
  const header = Buffer.alloc(headerSize);
  header.writeUInt16LE(0, 0);      // reserved
  header.writeUInt16LE(1, 2);      // type: 1 = icon
  header.writeUInt16LE(numImages, 4);

  let offset = headerSize + entrySize * numImages;
  const entries = [];
  for (const { size, buf } of pngs) {
    const entry = Buffer.alloc(entrySize);
    entry.writeUInt8(size >= 256 ? 0 : size, 0);   // width
    entry.writeUInt8(size >= 256 ? 0 : size, 1);   // height
    entry.writeUInt8(0, 2);                         // colors (0 = no palette)
    entry.writeUInt8(0, 3);                         // reserved
    entry.writeUInt16LE(1, 4);                      // color planes
    entry.writeUInt16LE(32, 6);                     // bits per pixel
    entry.writeUInt32LE(buf.length, 8);             // image size
    entry.writeUInt32LE(offset, 12);                // image offset
    entries.push(entry);
    offset += buf.length;
  }

  const ico = Buffer.concat([header, ...entries, ...pngs.map((p) => p.buf)]);
  const target = path.join(OUT, outName);
  fs.writeFileSync(target, ico);
  console.log(`✓ ${outName}  (${sizes.join("+")})`);
}

(async () => {
  console.log(`Source: ${SRC}`);
  console.log(`Output: ${OUT}\n`);

  const rawBuffer = fs.readFileSync(SRC);
  const transparent = await removeWhiteBackground(rawBuffer);

  // Standard PNG icons.
  await writePng(transparent, 512, "logo.png");
  await writePng(transparent, 512, "icon-512.png");
  await writePng(transparent, 192, "icon-192.png");
  await writePng(transparent, 180, "apple-touch-icon.png");
  await writePng(transparent, 32, "favicon-32.png");
  await writePng(transparent, 16, "favicon-16.png");

  // Open Graph image (1200x630 — letterboxed onto a transparent canvas).
  const ogTarget = path.join(OUT, "og-image.png");
  await transparent
    .clone()
    .resize(1000, 1000, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .extend({
      top: 0, bottom: 0, left: 100, right: 100,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .resize(1200, 630, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png({ compressionLevel: 9 })
    .toFile(ogTarget);
  console.log("✓ og-image.png  (1200×630)");

  // .ico (multi-size).
  await buildIco([16, 32, 48], "favicon.ico");

  console.log("\nDone.");
})().catch((err) => {
  console.error("Failed:", err);
  process.exit(1);
});
