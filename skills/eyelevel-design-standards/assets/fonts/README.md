# Inter Font Files (optional local mirror)

This folder is reserved for local Inter font binaries in case a non-web medium (PowerPoint, Word, print) can't reach Google Fonts at render time, or a deliverable needs embedded fonts. Day-to-day, both the web UI (`eyelevel-web-ui`, used by every EyeLevel-styled web project — dashboards, marketing sites, internal tools) and the slide deck (`eyelevel-slides`) load Inter directly from Google Fonts — see `../../references/typography.md`.

## When local files matter

- **Air-gapped builds.** If Puppeteer or a web project runs without network access, local `.woff2` / `.ttf` files keep Inter rendering instead of falling back to the system sans stack.
- **PowerPoint / Word embedding.** The built-in `pptx` and `docx` skills can embed `.ttf` files so the deck or document ships with fonts baked in.
- **Print production.** Exporting a PDF for commercial printing typically requires the outline form of each glyph; embed the `.ttf` or `.otf` at PDF-generation time.

## Expected files (when committed)

| File | Weight | Required for |
| --- | --- | --- |
| `Inter-Regular.ttf` | 400 | **Required** — body default. |
| `Inter-SemiBold.ttf` | 600 | **Required** — labels, CTAs, table headers. |
| `Inter-Bold.ttf` | 700 | **Required** — headings. |
| `Inter-ExtraBold.ttf` | 800 | Display headings (cover + display-stat numerals). |

The brand weight ladder stops at 800; no need to mirror 100/200/300/500/900.

## Sources

Download the full variable Inter family from `rsms.me/inter` or the [Google Fonts downloader](https://fonts.google.com/specimen/Inter). Both are free under the SIL Open Font License.

## How medium-specific skills use these

- **`eyelevel-slides`**: `templates/styles.css` `@import`s Inter from Google Fonts. To run offline, swap the `@import` for local `@font-face` declarations pointing at files in this folder (or mirror into `eyelevel-slides/templates/fonts/`).
- **`eyelevel-web-ui`**: `templates/fonts.css` also uses a Google Fonts `@import`. Same offline swap applies.
- **Word / PDF generation**: load the `.ttf` files into the generator (python-docx, python-pptx, ReportLab, etc.) at document-build time.

## Historical note

The brand previously used THICCCBOI (self-hosted at `cdn.eyelevel.ai/THICCCBOI/*.woff2`). That typeface has been retired in favor of Inter for a more professional, enterprise-legible feel. If you find stale references to THICCCBOI in third-party material, migrate them.
