# THICCCBOI Font Files

This folder is the canonical location for THICCCBOI font binaries used by non-web mediums (PowerPoint, Word, print). Web usage pulls the font from `cdn.eyelevel.ai` directly — see `../../references/typography.md`.

## Expected files

| File | Weight | Required for |
| --- | --- | --- |
| `THICCCBOI-Thin.ttf` | 100 | Rarely used; include for completeness. |
| `THICCCBOI-ExtraLight.ttf` | 200 | Rarely used. |
| `THICCCBOI-Light.ttf` | 300 | Light captions. |
| `THICCCBOI-Regular.ttf` | 400 | **Required** — body default. |
| `THICCCBOI-Medium.ttf` | 500 | Optional. |
| `THICCCBOI-SemiBold.ttf` | 600 | **Required** — labels, CTAs, table headers. |
| `THICCCBOI-Bold.ttf` | 700 | **Required** — section headings. |
| `THICCCBOI-ExtraBold.ttf` | 800 | Display headings. |
| `THICCCBOI-Black.ttf` | 900 | Hero / cover headings. |

At minimum, ship **Regular (400)**, **SemiBold (600)**, and **Bold (700)** — those three cover 95% of in-app and in-deck usage. Fuller sets are preferable when the skill will be used for marketing collateral.

## Sources

The THICCCBOI family is hosted on EyeLevel's CDN at `cdn.eyelevel.ai/THICCCBOI/*.woff2` for web use. For binary `.ttf` / `.otf` files suitable for PowerPoint embedding and print, request them from the EyeLevel design team — they're not committed to this repo by default because they're licensed assets.

## How medium-specific skills use these

- **`groundx-slides` (planned)**: copies the required weights into the `.pptx` package's embedded-font section so the deck renders correctly on a machine without THICCCBOI installed.
- **Word / PDF generation**: loads the `.ttf` files into the generator (python-docx, ReportLab, etc.) at document-build time.

## Not in scope for web

`groundx-web-ui`'s `templates/fonts.css` uses `@font-face` pointing at the CDN — it doesn't consume these files. If you're extending the web skill to run fully offline (rare), copy the `.woff2` files from the CDN into `groundx-web-ui/templates/fonts/` and update the `@font-face src` URLs.

## If the files aren't here

If you're producing a PowerPoint deck or Word doc and these files haven't been committed to the skill yet:

1. Note the dependency in your response and ask the user for the font files.
2. Fall back to the closest system-available geometric sans-serif (e.g., Inter, Nunito Sans) as a placeholder — **mark the placeholder in the deliverable** so it's obvious a swap is required before the artifact ships.
3. Never fall back to a *different-category* font (serif, script, condensed). Geometric sans only.
