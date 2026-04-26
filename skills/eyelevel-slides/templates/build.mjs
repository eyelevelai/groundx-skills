// EyeLevel slide deck builder.
//
// Reads templates/slides/*.html in lexicographic order, renders each at
// 1920×1080 via headless Chrome, and writes a single out/deck.pdf.
//
// Usage: `node build.mjs` (or `npm run build`).

import puppeteer from "puppeteer";
import { PDFDocument } from "pdf-lib";
import serveHandler from "serve-handler";
import { readdir, writeFile, mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import http from "node:http";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PORT = 4173;

async function startServer() {
  const server = http.createServer((req, res) =>
    serveHandler(req, res, { public: __dirname })
  );
  await new Promise((resolve) => server.listen(PORT, resolve));
  return server;
}

async function listSlideFiles() {
  const slidesDir = join(__dirname, "slides");
  const entries = await readdir(slidesDir);
  return entries
    .filter((f) => f.endsWith(".html") && f !== "index.html")
    .sort(); // numeric prefixes (01-, 02-, …) keep insertion order
}

async function renderSlide(browser, filename) {
  const page = await browser.newPage();
  await page.setViewport({
    width: 1920,
    height: 1080,
    deviceScaleFactor: 1,
  });

  const url = `http://localhost:${PORT}/slides/${filename}`;
  await page.goto(url, { waitUntil: "networkidle0" });

  // Wait for Inter (and any other webfonts) to finish loading, then force a
  // layout pass. Google Fonts serves separate files per weight; if printing
  // fires before the 700/800 weights resolve, headlines render in the
  // system-ui fallback and the deck ships inconsistent.
  await page.evaluate(async () => {
    await document.fonts.ready;
    await Promise.all([
      document.fonts.load("400 16px Inter"),
      document.fonts.load("600 16px Inter"),
      document.fonts.load("700 64px Inter"),
      document.fonts.load("800 88px Inter"),
    ]);
  });

  const pdfBytes = await page.pdf({
    width: "1920px",
    height: "1080px",
    printBackground: true,
    pageRanges: "1",
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
  });

  await page.close();
  return pdfBytes;
}

async function build() {
  const server = await startServer();
  const slides = await listSlideFiles();

  if (slides.length === 0) {
    console.error("No slides found in templates/slides/. Add at least one .html file.");
    server.close();
    process.exit(1);
  }

  console.log(`Building ${slides.length} slide${slides.length === 1 ? "" : "s"}…`);

  const browser = await puppeteer.launch({
    headless: true,
    executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || undefined,
    args: ["--no-sandbox", "--disable-dev-shm-usage"],
  });
  const mergedPdf = await PDFDocument.create();

  for (const filename of slides) {
    process.stdout.write(`  ${filename} … `);
    const pdfBytes = await renderSlide(browser, filename);
    const slidePdf = await PDFDocument.load(pdfBytes);
    const [slidePage] = await mergedPdf.copyPages(slidePdf, [0]);
    mergedPdf.addPage(slidePage);
    process.stdout.write("ok\n");
  }

  await browser.close();

  const outDir = join(__dirname, "out");
  await mkdir(outDir, { recursive: true });
  const outPath = join(outDir, "deck.pdf");
  await writeFile(outPath, await mergedPdf.save());

  server.close();
  console.log(`✓ ${outPath} (${slides.length} slide${slides.length === 1 ? "" : "s"})`);
}

build().catch((err) => {
  console.error(err);
  process.exit(1);
});
