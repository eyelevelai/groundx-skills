# Implementation: HTML → PDF

The build pipeline takes a folder of HTML slides and produces a single PDF. The core idea is simple:

1. Start a static file server pointing at the slides directory.
2. Launch headless Chrome (Puppeteer) at 1920×1080.
3. For each slide file, `goto(file)`, wait for fonts, call `page.pdf()` with a fixed page size.
4. Concatenate the per-slide PDFs into one (optional — Puppeteer can also render a single HTML file containing all slides).

This file specifies how `templates/build.mjs` implements it and what a user needs to install to run it.

## Project setup

```bash
# From the repo root where you dropped the templates/ folder:
cd templates
npm install
npm run build         # produces out/deck.pdf
```

`package.json` provides two scripts:

- `npm run dev` — starts a local server at `http://localhost:4173` and opens `slides/index.html` (a slide-navigator). Use while authoring.
- `npm run build` — runs `build.mjs`, which writes `out/deck.pdf`.

Dependencies (already declared in the template `package.json`):

- `puppeteer` (headless Chrome driver).
- `serve` (static file server).
- `pdf-lib` (combine per-slide PDFs).
- `npm-run-all` (for the `dev` script).

The first `npm install` downloads a Chromium binary via Puppeteer. Honor that — do not switch to `puppeteer-core` with a system Chrome unless the user has a specific reason, because the shipped Chromium version is pinned to what Puppeteer expects.

## Slide file structure

Each slide lives in its own file under `templates/slides/`:

```
slides/
├── 01-cover.html
├── 02-hero-with-stats.html
├── 03-split-problem-solution.html
├── 04-three-card-grid.html
├── 05-numbered-steps.html
├── 06-display-stat.html
└── 07-cta.html
```

Every slide file is a **full HTML document** — `<!doctype html>`, `<head>`, `<body>`. They share a single stylesheet via `<link rel="stylesheet" href="/styles.css">`. Each file's `<body>` contains exactly one `<div class="slide slide--{layout}">` that's 1920×1080.

Keeping slides as separate files makes diffs clean, makes per-slide preview trivial, and lets `build.mjs` render them in order.

## The slide container

```html
<body>
  <div class="slide slide--cover">
    <!-- slide content -->
  </div>
</body>
```

`.slide` is `width: 1920px; height: 1080px; overflow: hidden;` — any content that exceeds those dimensions is clipped, which is correct behavior (slides shouldn't scroll).

Puppeteer's viewport is set to exactly 1920×1080, so one HTML page = one PDF page at 16:9.

## build.mjs — the build script

```js
import puppeteer from "puppeteer";
import { PDFDocument } from "pdf-lib";
import { readdir, writeFile, readFile, mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import serve from "serve-handler";
import http from "node:http";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PORT = 4173;

// Start the static server pointing at ./ so /slides/*.html and /styles.css both resolve.
const server = http.createServer((req, res) =>
  serve(req, res, { public: __dirname })
);
await new Promise((r) => server.listen(PORT, r));

const slidesDir = join(__dirname, "slides");
const slideFiles = (await readdir(slidesDir))
  .filter((f) => f.endsWith(".html") && f !== "index.html")
  .sort(); // lexicographic order → numeric prefixes keep order

const browser = await puppeteer.launch({
  defaultViewport: { width: 1920, height: 1080, deviceScaleFactor: 1 },
});

const mergedPdf = await PDFDocument.create();

for (const file of slideFiles) {
  const page = await browser.newPage();
  await page.goto(`http://localhost:${PORT}/slides/${file}`, {
    waitUntil: "networkidle0",
  });
  // Belt-and-suspenders: wait for custom fonts to be ready.
  await page.evaluate(() => document.fonts.ready);

  const pdfBytes = await page.pdf({
    width: "1920px",
    height: "1080px",
    printBackground: true,
    pageRanges: "1",
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
  });

  const slidePdf = await PDFDocument.load(pdfBytes);
  const [slidePage] = await mergedPdf.copyPages(slidePdf, [0]);
  mergedPdf.addPage(slidePage);
  await page.close();
}

await browser.close();
await mkdir(join(__dirname, "out"), { recursive: true });
await writeFile(join(__dirname, "out/deck.pdf"), await mergedPdf.save());

server.close();
console.log(`✓ out/deck.pdf (${slideFiles.length} slides)`);
```

The key correctness points in this script:

1. **`document.fonts.ready`** — wait for the webfont to finish loading before printing. Without this, the first slide can render with the `system-ui` fallback and the rest are fine, resulting in a mismatched cover.
2. **`width: "1920px", height: "1080px"`** — passed directly to `page.pdf()` so the PDF page exactly matches the HTML canvas.
3. **`printBackground: true`** — honor CSS backgrounds. Without this, navy slides come out white.
4. **`margin: 0` on all sides** — the HTML canvas *is* the slide; no extra PDF margins.
5. **`networkidle0`** — wait for all images (logos, icons) to load before printing.

## Font loading caveat

Inter is served from Google Fonts (`fonts.googleapis.com`). In air-gapped environments, the font won't load, and Puppeteer's `document.fonts.ready` will still resolve (fallback counts as "ready"). If reproducibility offline matters, download the Inter weights (400 / 600 / 700 / 800) from `rsms.me/inter` or the Google Fonts download bundle, drop them under `templates/fonts/`, and switch the `@import` in `styles.css` to local `@font-face` declarations.

## Preview while authoring

`npm run dev` runs a local server plus an auto-refresh watcher. Open `http://localhost:4173/slides/01-cover.html` and toggle through slides. There's no custom presenter app — just refresh the page after each edit. This is deliberate: the goal is to keep the toolchain as close to "a folder of HTML files" as possible.

For a thumbnail index of all slides at once, open `http://localhost:4173/` (root) — `templates/index.html` renders every slide in a responsive grid at 40% scale.

## Troubleshooting

| Symptom | Likely cause | Fix |
| --- | --- | --- |
| Cover slide shows the wrong font; other slides are fine | `document.fonts.ready` not awaited | Already in the reference script. Verify the `await` is in place. |
| Navy slides are printed as white | `printBackground: false` | Set `printBackground: true` in `page.pdf()`. |
| PDF is the wrong aspect ratio | Puppeteer using default `Letter` size | Explicit `width: "1920px"` and `height: "1080px"` override that. |
| Slides are cut off on the right | Viewport narrower than 1920 | `defaultViewport.width = 1920` at launch, not post-launch. |
| Slide numbers are missing | The `.slide-number` element is rendered with a `position: absolute` value outside the 1920×1080 box | Check `styles.css`; should be `position: absolute; right: 80px; bottom: 80px;` inside `.slide`. |

## Converting a deck to PowerPoint

If a stakeholder needs the deck as `.pptx` (editable), the recommended path is:

1. Render the PDF with this skill.
2. Use the built-in `pptx` skill to build a parallel deck from the same content, applying the GroundX palette/typography from `../groundx-design-standards/`.

Do **not** attempt to auto-convert the PDF to PowerPoint slides (Acrobat's converter, `pdf2pptx`, etc.). The resulting slides are uneditable in practice — each slide becomes a giant image or a tangle of positioned text boxes. Rebuild from content, not from pixels.
