# Logos & Brand Marks

GroundX has four logo files — a wordmark in three color treatments plus the Valantor co-brand tagline. Use the right one for the right background, and always co-brand with Valantor when the wordmark is the primary element on a page.

> **Brand relationship.** GroundX is the product. EyeLevel is the AI company that makes it. Valantor is the parent company. The tagline under the wordmark reads "A VALANTOR COMPANY" — the EyeLevel name lives in company-level contexts (author bylines, legal, `eyelevel.ai`), not in the logo lockup.

> **Asset handoff pending.** `assets/logos/valantor-tagline.png` was renamed from `eyelevel.png` but the raster still shows the old "AN EYELEVEL PRODUCT" text. Replace the file with the new Valantor-branded PNG before shipping any medium that renders the tagline as an image (most slides use a live `<span class="tagline">` and are unaffected).

## The four files

All live at `../assets/logos/` relative to this file.

| File | Preview content | Use |
| --- | --- | --- |
| `groundx-ai-log.png` | White + coral "groundX.ai" wordmark | **Default sidebar/dark-panel logo.** Reads on the navy sidebar background. Use anywhere the surface behind the logo is dark. |
| `groundX-logo-color.png` | Full-color wordmark on transparent | **Light backgrounds** — marketing pages, docs, emails, white slide covers. |
| `groundx-logo-black.png` | Black-ink wordmark | **Print + grayscale**. Monochrome collateral, ink-only exports, fax-grade documents. |
| `valantor-tagline.png` | "A VALANTOR COMPANY" tagline | **Co-brand tagline** — pair with the GroundX wordmark on cover pages, footers, auth screens, deck title slides. |

## Which to use where

```
Is the background dark (navy, black, dark photo)?
├── Yes → groundx-ai-log.png
└── No
    Is the export monochrome (print, grayscale, fax)?
    ├── Yes → groundx-logo-black.png
    └── No → groundX-logo-color.png
```

When in doubt on a mid-tone background, pick the variant with better contrast. **Never apply a colored overlay or blend mode to a logo to "make it work"** on a difficult background — switch the logo file or switch the background.

## Placement rules

### Sidebar / app chrome (web)

- Centered in the drawer's top area.
- Responsive sizing: `maxWidth: xs=100, md=150, lg=180` (in px) — the sidebar gets wider at larger breakpoints, and the logo grows to match.
- File: `groundx-ai-log.png` (always — the sidebar is always navy).

### Marketing / auth pages (web)

- Upper-left, roughly 180px wide on desktop.
- File: `groundX-logo-color.png` on white background; `groundx-ai-log.png` on navy hero.
- Pair with `valantor-tagline.png` tucked below (centered) or to the right (baseline-aligned).

### Slide deck cover (pptx)

- Top-left or centered, depending on layout.
- File: color logo on light backgrounds, white logo on dark.
- Always include `valantor-tagline.png` — smaller, immediately below or to the right of the wordmark.
- Minimum size: the wordmark's height should be at least 40pt at a 1920×1080 render (~3% of slide height). Smaller than that, it becomes decorative rather than identifying.

### Slide deck interior (pptx)

- Optional — not every slide needs the logo.
- If present, use the color variant in a corner at small size (footer area). Don't repeat at cover size.

### Documents (Word, PDF)

- Top-of-document or header.
- Color logo on white; black logo in grayscale exports.
- Tagline placement: below the wordmark for a centered cover; to the right for a header.

### Email signatures, social avatars, favicons

- Use the color logo if rendering at any meaningful size.
- For very small renderings (favicon, social avatar, app icon): crop the "G" from the color logo and use it as a standalone square mark. (There is no dedicated icon-mark file at this time; this is the sanctioned substitute.)

## Co-branding with Valantor

GroundX is a Valantor company product. When the GroundX wordmark is the primary brand element on a canvas, the Valantor tagline should be present nearby. This is a brand rule, not a decoration.

Layout options:

- **Stacked**: Valantor tagline directly below the wordmark, centered, slightly smaller.
- **Side**: tagline to the right of the wordmark, baseline-aligned, with a small gap.
- **Corner**: tagline in the opposite corner from the wordmark (e.g., logo top-left, tagline bottom-right) for larger canvases like slides.

Don't use the tagline alone without the wordmark. It exists to qualify the wordmark, not to substitute for it.

## What a "wordmark" is

A wordmark is a logo made of stylized text (as opposed to an abstract icon). All four files above are wordmarks — there is no standalone iconic mark in the current brand system. When a medium requires an icon-only mark (favicon, iOS home screen icon, small social avatar), use the "G" letterform cropped from the color logo.

## Don'ts

- **Don't stretch or skew the logo.** Scale proportionally. If it doesn't fit, change the layout.
- **Don't apply effects** — no drop shadows, glows, outlines, reflections, or color-adjusted versions. If the file doesn't work in a context, the context is wrong.
- **Don't place on busy photographic backgrounds.** Either flatten the background, or place the logo on a solid panel (white or navy) that sits on top of the photo.
- **Don't approximate the color logo with a single hex recolor.** The color version has specific coral + navy ink; don't recreate it by coloring `groundx-logo-black.png`.
- **Don't use the Valantor tagline as a standalone brand.** It qualifies the wordmark.
- **Don't re-typeset the wordmark** in THICCCBOI and treat that as a logo. Use the provided PNG.
- **Don't combine logos with other company marks** side-by-side without a clear "partnership with" context.

## Medium-specific notes

- **`groundx-web-ui`** references these files from `public/assets/` in the dashboard repo. The skill's `templates/` copy doesn't ship the logos directly — they come from `../groundx-design-standards/assets/logos/`.
- **`groundx-slides` (planned)** embeds the logo(s) in the slide master so every slide inherits the correct placement.
- For **high-DPI contexts** (print, Retina), the PNGs provided may not be sufficient. If a vector version (SVG) is needed, request one from the design team rather than tracing the PNG.
