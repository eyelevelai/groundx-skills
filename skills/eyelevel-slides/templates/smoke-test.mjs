#!/usr/bin/env node
/**
 * smoke-test.mjs — assert the slide build produces a deck.pdf whose page
 * count matches the number of slide files on disk.
 *
 * Catches the class of regression where new slides are added but the build
 * silently lags behind, or where a CSS / styles regression breaks Puppeteer
 * rendering without any other test surfacing it.
 *
 * Pre-requisite: build.mjs has been run successfully (or the CI runs it as
 * a prior step). This script reads `out/deck.pdf` and asserts on it; it
 * does not run the build itself, so it doesn't need Chromium.
 *
 * Run: node smoke-test.mjs (after `npm run build`)
 */

import { readdir, readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { PDFDocument } from "pdf-lib";

const HERE = dirname(fileURLToPath(import.meta.url));
const PDF_PATH = join(HERE, "out/deck.pdf");
const SLIDES_DIR = join(HERE, "slides");

async function main() {
  // Count the .html files in slides/ (excluding any index.html).
  const entries = await readdir(SLIDES_DIR);
  const slideFiles = entries
    .filter((f) => f.endsWith(".html") && f !== "index.html")
    .sort();
  const expected = slideFiles.length;

  // Read the PDF and count pages.
  let pdfBytes;
  try {
    pdfBytes = await readFile(PDF_PATH);
  } catch (e) {
    console.error(`✗ ${PDF_PATH} not found.`);
    console.error("Run \`npm run build\` first.");
    process.exit(1);
  }
  const pdf = await PDFDocument.load(pdfBytes);
  const actual = pdf.getPageCount();

  // Assert the page count matches the slide-file count.
  if (actual !== expected) {
    console.error(`✗ Page count mismatch:`);
    console.error(`   slides/ has ${expected} .html files (${slideFiles.join(", ")})`);
    console.error(`   out/deck.pdf has ${actual} pages`);
    console.error(`Run \`npm run build\` to regenerate.`);
    process.exit(1);
  }

  console.log(`✓ deck.pdf has ${actual} pages, matching ${expected} slide files.`);
}

main().catch((err) => {
  console.error("smoke-test crashed:", err);
  process.exit(2);
});
