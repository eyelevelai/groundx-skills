# Logos & Brand Marks

The brand ships **two logo files** — one EyeLevel + Valantor Company lockup in two surface treatments. Pick the file that matches the background and you're done.

> **Brand relationship.** EyeLevel is the AI company. Valantor is the parent. GroundX is one of EyeLevel's products. The "A VALANTOR COMPANY" co-sign is **baked into the logo PNG** — you do not render it as a separate text element, and there is no `.tagline` class.

## The two files

Both live at `../assets/logos/` relative to this file.

| File | What's in it | Use on |
| --- | --- | --- |
| `eyelevel-logo-white.png` | EyeLevel wordmark in white + colored speech-bubble mark, with "A VALANTOR COMPANY" beneath, set in white. | **Dark surfaces** — navy, green, coral, any full-bleed photograph with a dark wash. |
| `eyelevel-logo-color.png` | EyeLevel wordmark in black + colored speech-bubble mark, with "A VALANTOR COMPANY" beneath, set with the red Valantor letters baked in. | **Light surfaces** — white, tint, cyan, gray, any pale canvas. |

That's the whole logo system. There is no standalone wordmark, no grayscale variant, no separate tagline asset, no icon-only mark. If a medium needs something else (favicon, app-icon mark, vector SVG for print), request it from the design team rather than improvising.

## Which to use where

```
Is the background dark (navy, green, coral, dark photo)?
├── Yes → eyelevel-logo-white.png
└── No  → eyelevel-logo-color.png
```

On mid-tone backgrounds pick the variant with better contrast. **Never apply a colored overlay, blend mode, or recolor to a logo to "make it work"** — switch the file, or switch the background.

## Placement rules

### Sidebar / app chrome (web)

- Centered in the drawer's top area.
- Fixed size — the sidebar is always navy, so the logo is always `eyelevel-logo-white.png`.

### Marketing / auth pages (web)

- Upper-left, roughly 220px wide on desktop.
- `eyelevel-logo-color.png` on white; `eyelevel-logo-white.png` on a navy hero.

### Slide deck (HTML → PDF)

- Top-left, 80px from the edge, 72px tall. Fixed size across every slide — no small/large variants.
- Surface-aware swap is done in CSS on the `.slide-logo` class. The HTML is identical on every slide:
  ```html
  <div class="slide-logo" role="img" aria-label="EyeLevel, a Valantor company"></div>
  ```
  The CSS rule swaps to `eyelevel-logo-white.png` when an ancestor carries `.slide--navy`, `.slide--green`, or `.slide--coral`; otherwise the default `eyelevel-logo-color.png` stays.
- Section-break slides (`.slide--section-break`) intentionally omit the logo — the deck is already established.

### Documents (Word, PDF)

- Top-of-document or header, color variant on a white page, white variant on any navy cover panel.

### Email signatures, social avatars, favicons

- For very small renderings where the full wordmark would be illegible, crop the speech-bubble mark from either PNG and use it as a standalone square mark. This is the sanctioned substitute until a dedicated icon asset exists.

## What a "wordmark" is

A wordmark is a logo made of stylized text. Both files above are **lockups**: the EyeLevel wordmark, the colored bracket/speech-bubble mark, and the Valantor co-sign assembled into one raster. Treat them as single units — don't crop, recolor, or reassemble the pieces.

## Don'ts

- **Don't stretch or skew the logo.** Scale proportionally. If it doesn't fit, change the layout.
- **Don't apply effects** — no drop shadows, glows, outlines, reflections, or color-adjusted versions. If the file doesn't work in a context, the context is wrong.
- **Don't place on busy photographic backgrounds.** Either flatten the background, or place the logo on a solid panel (white or navy) that sits on top of the photo.
- **Don't render the "A VALANTOR COMPANY" text separately** in HTML, CSS, or PowerPoint. It is part of the PNG. There is no `.tagline` class; don't reintroduce one.
- **Don't re-typeset the wordmark** in Inter (or any other typeface) and treat that as a logo. Use the provided PNG.
- **Don't mix the two files** — if you need the wordmark on a gradient or duotone, pick the surface side (dark or light) that dominates and use the matching file.
- **Don't combine logos with other company marks** side-by-side without a clear "partnership with" context.

## Medium-specific notes

- **`eyelevel-web-ui`** references these files from `public/assets/` in the dashboard repo. The skill's `templates/` copy doesn't ship the logos directly — they come from `../eyelevel-design-standards/assets/logos/`.
- **`eyelevel-slides`** copies both PNGs into `templates/assets/logos/` and `examples/minimal-deck/assets/logos/` so the build can resolve `url("/assets/logos/…")` at render time.
- For **high-DPI or print contexts**, the PNGs provided may not be sufficient. If a vector version (SVG) is needed, request one from the design team rather than tracing the PNG.
