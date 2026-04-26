# Brand Principles

These are the invariants that make something feel like EyeLevel regardless of the medium. If you're staring at a new surface (a slide, a landing page, an email header, a doc cover) and you're not sure what to do, work from this list down.

## 1. Calm, not loud

EyeLevel is an AI company in a category (AI infrastructure, RAG tooling) that's full of neon gradients and dramatic hero pages — and GroundX, EyeLevel's developer-facing product, lives in the noisiest corner of that category. The brand deliberately goes the other way: quiet, composed, professional. A visitor should feel like they're looking at a well-engineered tool, not an event sponsorship.

Practical consequences:

- No gradients on surfaces. The single exception is the `gx-premium-button` pink→orange gradient, which is loud *on purpose* to mark the one upsell CTA.
- No drop shadows, no Material elevation, no layered glass effects.
- No ambient color washes behind body content. No full-bleed photography on interior content slides or in-app dashboard surfaces.

**Imagery is opt-in, not proactive.** A photographic background is allowed — but only when the user has explicitly asked for one, and only on a *surface* slide: a deck cover, a section break, a closing slide, a marketing landing-page hero. Never on an interior content slide, never in a dashboard. When a photo is used, apply a flat navy scrim (around 70% opacity) so white headline text holds contrast — never a gradient overlay. The slide systems (`eyelevel-slides`) ship a dedicated `photo-cover` layout for exactly this case; reach for the standard solid-navy `cover` layout otherwise. If unsure, default to no imagery — the brand's calm posture survives without it.

This same posture extends to the words on the surface — see `voice.md`. A beautifully-typeset slide that opens with "Unleash the power of next-generation AI" has lost the brand as completely as one with a drop shadow.

## 2. Two accents, one primary — green, with coral as a highlight

The primary CTA color is `Green`. Every submit button, success chip, hover-go-state, and "active" affordance uses it. Green is the "alive / go" color and it carries the primary brand moment on every surface.

`Coral` is the *secondary* accent — eyebrows, highlight pills, the occasional alt-CTA on a surface where green would collide with nearby green (e.g., a green success chip already present). Coral is for calling-out, not for submitting.

Don't invent a third accent. If you feel tempted to introduce blue or orange variants, use a neutral (white, gray, navy) instead.

## 3. Navy, not black

Headings and dark surfaces use `Navy`; body text uses `Body Text`, a slightly-warmer navy tuned for reading. True black (`#000`) is never correct. The difference is subtle on a single element but cumulative across a page. A page rendered in `#000` reads "utilitarian software from 2004"; navy reads "considered".

If an export target can't reproduce navy faithfully (black-and-white print, some grayscale conversions), pick the next-darkest neutral rather than true black.

## 4. Section canvases, white surfaces

EyeLevel uses six canonical section backgrounds — White, Gray, Tint, Cyan, Green, and Navy (hex values in `tokens.md` § 1.1). Cards on top of those sections are white (or green / navy for a feature card). You can tell an EyeLevel surface from a screenshot thumbnail by this rhythm: calm surfaces alternating through the palette, never overlapping gradients.

Don't tint a surface to match its canvas (soft-tint cards on the tint canvas). Don't invent a new section background — pick one of the six.

## 5. Flat, hairline-bordered

Every card, panel, input, and modal has the same treatment: white fill, a `1px` hairline `Border` (navy at 10%), and a corner radius from the shared radius scale (`tokens.md` § 5) — the `card` radius for top-level cards, `input` for inputs and nested surfaces, `lg` for dropdowns / toasts, `pill` for buttons + pills.

There are no 2px borders, no dashed borders (except the drag-drop empty state), no double borders, no gradient borders. The solid `#d9d9d9` hairline is deprecated — use the `Border` token.

## 6. Type hierarchy through weight, not size jumps

Inter ships a full weight range but the practical ladder is narrow: `400 / 600 / 700 / 800`. Use that range — not outsized type — to create hierarchy. A `600` label over a `400` body paragraph reads as a clear hierarchy at the same font size; a 32px body paragraph next to a 14px caption reads as a mess.

Body copy lives at 400; labels and CTAs at 600; headlines at 700; the cover-slide headline and display-stat numerals at 800. Weight 500 is indecisive — don't use it. Weight 900 is retired from the system (reads poster-heavy at display sizes).

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

The one place a gradient is acceptable — beyond the single `gx-premium-button` CTA — is as a **thin horizontal accent bar** that runs across the top or bottom of a slide, a white-paper cover, or a marketing hero. The gradient moves left-to-right through the brand's three accent-adjacent colors: Green → Cyan → Coral (values in `tokens.md` § 1.1).

Rules:

- **Thin.** 4–8px on web, ~0.1" on slides. It's a hairline, not a band.
- **One per surface.** Either a top accent or a bottom accent, not both.
- **Never on an interior card.** This is a page/slide-level decorator — it defines an edge, not a surface.
- **Never in-app.** Reserved for marketing-oriented surfaces: cover slides, white-paper front pages, landing pages. Dashboard UI does not use it.

Use sparingly. The default for any EyeLevel surface is no gradient at all.

## 11. Co-brand with Valantor honestly

EyeLevel is an AI company; Valantor is the parent. The parent-brand co-sign — "A VALANTOR COMPANY" — is **baked into the EyeLevel logo PNG itself**. There is no separate tagline asset to place, no `.tagline` class to drop next to the wordmark. Use the single EyeLevel lockup file that matches the surface (`eyelevel-logo-white.png` on dark, `eyelevel-logo-color.png` on light) and the co-sign comes with it.

Don't render "A VALANTOR COMPANY" as a standalone text element anywhere. Don't re-typeset it in Inter and pair it with the wordmark — the lockup's typography is fixed.

Product names — GroundX and any future EyeLevel product — appear *inside* the surface (headlines, body copy, product UI), never inside the logo. The lockup expresses the EyeLevel ↔ Valantor relationship; the surface content expresses the EyeLevel ↔ product relationship.

## Don'ts

- **Don't add a second accent** ("we need a blue for secondary CTAs"). Use neutral outlined buttons instead.
- **Don't use true black.** `Navy` for headings, `Body Text` for paragraphs.
- **Don't elevate surfaces.** No `box-shadow`, no PowerPoint default shape shadow, no Keynote inset glow.
- **Don't size up to create hierarchy.** Use weight.
- **Don't `text-transform: uppercase`** for section labels — write them uppercase.
- **Don't mint new hexes locally.** New colors go into this skill's `tokens.json` first (with a matching row in `references/tokens.md` § 1), then re-run `scripts/generate-mirrors.mjs` so medium skills pick them up. Never into a one-off component.
