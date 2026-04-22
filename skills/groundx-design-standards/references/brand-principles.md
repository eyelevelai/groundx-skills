# Brand Principles

These are the invariants that make something feel like GroundX regardless of the medium. If you're staring at a new surface (a slide, a landing page, an email header, a doc cover) and you're not sure what to do, work from this list down.

## 1. Calm, not loud

GroundX is a developer-facing product in a category (AI infrastructure, RAG tooling) that's full of neon gradients and dramatic hero pages. The brand deliberately goes the other way: quiet, composed, professional. A visitor should feel like they're looking at a well-engineered tool, not an event sponsorship.

Practical consequences:

- No gradients on surfaces. The single exception is the `gx-premium-button` pink→orange gradient, which is loud *on purpose* to mark the one upsell CTA.
- No drop shadows, no Material elevation, no layered glass effects.
- No ambient color washes or full-bleed photographic backgrounds behind content.

## 2. Two accents, one primary — green, with coral as a highlight

The primary CTA color is green `#a1ec83`. Every submit button, success chip, hover-go-state, and "active" affordance uses it. Green is the "alive / go" color and it carries the primary brand moment on every surface.

Coral `#f3663f` is the *secondary* accent — eyebrows, highlight pills, the occasional alt-CTA on a surface where green would collide with nearby green (e.g., a green success chip already present). Coral is for calling-out, not for submitting.

Don't invent a third accent. If you feel tempted to introduce blue or orange variants, use a neutral (white, gray, navy) instead.

## 3. Navy, not black

Headings and dark surfaces use navy `#29335c`; body text uses a slightly-warmer navy `#40496b` (`BODY_TEXT`), tuned for reading. True black (`#000`) is never correct. The difference is subtle on a single element but cumulative across a page. A page rendered in `#000` reads "utilitarian software from 2004"; navy reads "considered".

If an export target can't reproduce navy faithfully (black-and-white print, some grayscale conversions), pick the next-darkest neutral rather than true black.

## 4. Section canvases, white surfaces

GroundX uses six canonical section backgrounds — White, Gray (`#f2f4f5`), Tint (`#eff9fb`), Cyan (`#c1e8ee`), Green (`#a1ec83`), and Navy (`#29335c`). Cards on top of those sections are white (or green / navy for a feature card). You can tell a GroundX page from a screenshot thumbnail by this rhythm: calm surfaces alternating through the palette, never overlapping gradients.

Don't tint a surface to match its canvas (soft-tint cards on the tint canvas). Don't invent a new section background — pick one of the six.

## 5. Flat, hairline-bordered

Every card, panel, input, and modal has the same treatment: white fill, `1px solid rgba(41, 51, 92, 0.1)` hairline border (the `--border` token, navy at 10%), `20px` corner radius for top-level cards (`6px` for inputs and nested inner surfaces, `12px` for dropdowns / toasts, `200px` for buttons + pills).

There are no 2px borders, no dashed borders (except the drag-drop empty state), no double borders, no gradient borders. The solid `#d9d9d9` hairline is deprecated — use the `--border` token.

## 6. Type hierarchy through weight, not size jumps

THICCCBOI ships a full weight range but the practical ladder is narrow: `400 / 600 / 700 / 800`. Use that range — not outsized type — to create hierarchy. A `600` label over a `400` body paragraph reads as a clear hierarchy at the same font size; a 32px body paragraph next to a 14px caption reads as a mess.

Body copy lives at 400; labels and CTAs at 600; headlines at 700; the cover-slide headline and display-stat numerals at 800. Weight 500 is indecisive — don't use it. Weight 900 is retired from the system (reads poster-heavy on THICCCBOI).

## 7. ALL-CAPS labels are literal

Section labels like "TUTORIAL", "CONTENT", "YOUR BUCKETS", "X-RAY" are typed in uppercase in the source content — never rendered via `text-transform: uppercase` at the styling layer. This matters because:

- Translations: `text-transform` breaks many non-Latin scripts.
- Screen readers: some announce `text-transform: uppercase` text letter-by-letter.
- Portability: content moving from web to slides to PDF preserves its shape.

Button component internals can uppercase their own labels (the existing `CommonSubmitButton` does), but *free-standing* label text is written uppercase.

## 8. Icons are consistent in density, not size-specific

Icons come in three densities: small, medium, large. These map to real pixel sizes per medium (on web: MUI's `fontSize` tokens; in slides: a fixed px height at 1920×1080). Don't pick a custom size because "this icon feels a bit big" — adjust the layout around the icon instead.

## 9. Accessibility is a brand attribute

Color is never the only signal. A red pill says "Failed"; the pill also contains the word "Failed". A green active-nav state also has a different weight and a leading indicator dot — a color-blind user can still navigate. Brand compliance and accessibility compliance are the same thing here.

## 10. Optional: a thin brand-gradient accent bar

The one place a gradient is acceptable — beyond the single `gx-premium-button` CTA — is as a **thin horizontal accent bar** that runs across the top or bottom of a slide, a white-paper cover, or a marketing hero. The gradient moves left-to-right through the brand's three accent-adjacent colors: Green → Cyan → Coral (`#a1ec83` → `#c1e8ee` → `#f3663f`).

Rules:

- **Thin.** 4–8px on web, ~0.1" on slides. It's a hairline, not a band.
- **One per surface.** Either a top accent or a bottom accent, not both.
- **Never on an interior card.** This is a page/slide-level decorator — it defines an edge, not a surface.
- **Never in-app.** Reserved for marketing-oriented surfaces: cover slides, white-paper front pages, landing pages. Dashboard UI does not use it.

Use sparingly. The default for any GroundX surface is no gradient at all.

## 11. Co-brand with Valantor honestly

GroundX is built by EyeLevel, an AI company acquired by Valantor. The parent-brand co-sign lives in the tagline: whenever the GroundX wordmark is the primary brand element on a page or slide, the "A VALANTOR COMPANY" tagline (`assets/logos/valantor-tagline.png`) should be present nearby — tucked under the wordmark, or to its right in small type. Don't hide it; don't over-emphasize it. It's a fact, rendered neutrally.

The EyeLevel name still appears in company-level contexts — author bylines, legal footers, the `eyelevel.ai` domain — but the tagline under the wordmark expresses the Valantor parent relationship, not the EyeLevel product relationship.

## Don'ts

- **Don't add a second accent** ("we need a blue for secondary CTAs"). Use neutral outlined buttons instead.
- **Don't use true black.** Navy `#29335c` for headings, Body Text `#40496b` for paragraphs.
- **Don't elevate surfaces.** No `box-shadow`, no PowerPoint default shape shadow, no Keynote inset glow.
- **Don't size up to create hierarchy.** Use weight.
- **Don't `text-transform: uppercase`** for section labels — write them uppercase.
- **Don't mint new hexes locally.** New colors go into this skill's `references/colors.md`, not into a one-off component.
