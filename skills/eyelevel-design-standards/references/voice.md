# Voice & Tone

This is how EyeLevel sounds. The visual system in this skill makes a surface look like EyeLevel; the voice makes the words on that surface read like EyeLevel. Apply both — a beautifully-typeset slide that opens with "Unleash the power of next-generation AI" has lost the brand as completely as one with a drop shadow.

## The spine, one sentence

EyeLevel sounds like a senior engineer briefing an exec: confident, specific, quiet. Hedge-free where there's evidence; plainly trustworthy where there isn't. Mechanism over magic.

## 1. Calm, not loud

Same posture the visual system enforces — see `brand-principles.md` rule 1. Where competitors in AI infrastructure reach for neon ("revolutionary", "magical", "next-generation"), EyeLevel reaches for the boring-on-purpose word that's actually true ("structural", "auditable", "operational"). A reader should finish a paragraph thinking *"that's a serious tool"*, not *"that's a serious launch event"*.

The cost of this is that EyeLevel copy never sounds exciting in the marketing sense. The benefit is that it sounds *credible*. Enterprise buyers and developers — EyeLevel's two audiences — both filter for credibility. Hype is anti-credibility.

## 2. Specific over superlative

When something is good, prove it with a number, a mechanism, or a timeframe. When you can't, drop the claim — don't fill the space with a superlative.

> "Petabyte-ready ingest" is fine — it names a scale.
> "Sub-200ms retrieval" is fine — it names a number.
> "Three steps, two weeks to production" is fine — it names a path and a clock.
> "Best-in-class retrieval" is **wrong** — it claims a ranking nobody verified.
> "Industry-leading accuracy" is **wrong** — same problem.

Numbers and mechanisms persuade. Adjectives don't.

## 3. Reframe with X, not Y

The brand's most-used rhetorical move, at every altitude. Strategic: "assured intelligence, not probabilistic AI." "Long-term infrastructure partner, not a tool vendor." Tactical: "A working integration, not a slide." "$0 if the eval fails." Even the eyebrow pattern is X / Y — "THE PROBLEM" / "THE ANSWER".

The reframe works because it tells the reader two things at once: what EyeLevel is, and what category of competitor it's refusing to be confused with. Use it for headlines, eyebrows, and pull quotes — not for body copy (where it gets exhausting).

### 3a. Built for X (the parallel-commitment scaffold)

A close cousin of "X, not Y", used as a closing rhetorical scaffold. Three commitments held under one promise:

> *Built for your environment* — On-prem, air-gapped, secure.
> *Built for the problem* — Visual document understanding.
> *Built for the scale* — Hybrid search that holds up.

The parallelism does the work. The repetition of "Built for…" turns three feature claims into three commitments — which reads as "we've thought about who you are" rather than "here's a feature list". Use it on summary / closing slides, in the closing section of a white paper, in an executive briefing's wrap. The slide-system layout that pairs with this scaffold is `summary-built-for` (see `eyelevel-slides/references/layouts.md` § 11).

### 3b. Two-part eyebrows with the middle dot

Eyebrows can carry two clauses joined by a U+00B7 middle dot — "DIFFERENTIATION · CAPABILITIES", "SCOPE · FULL PIPELINE", "OBSERVABILITY · INSPECTABLE". The first half names the topic; the second half names the angle. The middle dot is typed literally; no `text-transform`, no special CSS.

Use this on Q&A panels (where each answer needs a topic + angle), on RFP-response slides, on white-paper section openings where one eyebrow can't carry the load. Don't use it on every eyebrow in the deck — the convention loses its meaning if it's everywhere.

### 3c. Pain named plainly

When opening a section about a problem, name the problem in plain language — no euphemism, no apology, no preamble. Existing examples:

> "Generic RAG misses what matters."
> "Complex documents are breaking AI."
> "Vector databases lose accuracy at scale."
> "Your documents are breaking your AI."

These read confrontationally, but the confrontation is the point — it earns the right to propose a solution. The rhythm: 4–8 words, declarative, present-tense. Avoid softeners like *"may", "sometimes", "can occasionally"* — they undercut the next sentence.

## 4. Sentence shape

Short, declarative, verb-forward. Em dashes are the workhorse punctuation — they let a sentence pause, clarify, and continue without resorting to a sub-clause swamp. Every example below is from copy already in this repo:

> "Generic RAG misses what matters."
> "Ingest like a person reads."
> "Three steps, two weeks to production."
> "Point GroundX at a document source — S3, SharePoint, an API feed."
> "Tables, captions, and section hierarchies are preserved end-to-end."

Body paragraphs run two to four sentences. Open with the claim, then explain the mechanism, then (optionally) name the outcome. Don't open with a soft preamble ("In today's enterprise landscape, organizations face increasing pressure to..."). Get to the verb.

Long, multi-clause sentences belong at investor altitude — not on a developer-facing surface.

### 4a. Italics for quoted questions only

Italics are reserved for one job: marking a question being quoted, not a claim being made. The slide system's Q&A layout uses italicized questions and bold answers — *"How are tables and charts represented after ingestion?"* / **"Both — structured (JSON) and unstructured (narrative) — simultaneously."** That's the only place italics appear in a slide or product surface. Don't italicize for emphasis (use weight instead), don't italicize titles (write them in roman with the title's own typography), don't italicize inline foreign words (the brand isn't multilingual on the surface).

### 4b. The em-dash as a standalone divider

Em-dashes are the brand's workhorse punctuation in prose. They also have a typographic role on certain layouts: a standalone em-dash on its own line, between an eyebrow + headline pair on top and a body sentence below, acts as a quiet vertical pause inside a card. The slide system's `findings-grid` layout uses this convention. The dash is typed literally as `—` in the content — never inserted via CSS `content`, never replaced with an `<hr>`. Use sparingly; the standalone-dash convention is layout-specific, not a default option for every card.

## 5. Vocabulary that does work

These words appear repeatedly in the existing copy and the strategy material. They're load-bearing — keep them on the table:

*trusted, assured, accountable, auditable, governed, operational, end-to-end, structural, structurally, evals, model-agnostic, deployment-agnostic, enterprise-grade, infrastructure, retrieval, ingestion, chunks, parsing, foundational, indispensable, embedded.*

They form what the strategy doc calls the "trust stack." When you reach for an adjective, prefer one of these over a generic intensifier.

## 6. Vocabulary to avoid

These words don't appear in any current EyeLevel surface and shouldn't start. Most are AI-category filler that's been inflated past meaning:

*revolutionary, cutting-edge, world-class, best-in-class, industry-leading, unleash, magical, seamless, next-generation, transformative* (as a marketing adjective), *leverage, empower, harness, supercharge, game-changing, paradigm-shifting.*

Also avoid AI-as-a-vague-modifier ("AI-powered solution", "AI-driven platform") — say what the AI actually does instead. *"Structural document parsing"* is a real claim; *"AI-powered document understanding"* is filler.

Avoid hedge tells: *"we believe", "we're excited to", "we're proud to announce"*. EyeLevel doesn't narrate its own emotional state.

Avoid exclamation points entirely. The voice doesn't shout.

## 7. Audience altitudes

Same voice tuned by who's reading.

**Practitioner altitude** — GroundX dashboard, SDK docs, developer-facing slides. The voice is at its plainest here. Imperatives. Code-shaped explanations. Concrete mechanisms named with the words an engineer would use ("retrieval", "chunks", "endpoints", "schema"). Hedge-free.

> "Point GroundX at a document source — S3, SharePoint, an API feed. Ingestion starts immediately; no schema design required."

**Enterprise-buyer altitude** — white papers, customer-response decks (e.g., the Dell deck), executive briefings. Trust-stack vocabulary leads. SLAs, governance, audit, regulated-vertical specifics (IL6, HIPAA, SOC 2). Sentences slightly longer to accommodate the proof, but no preamble and no hype.

> "GroundX delivers structurally-aware retrieval with assured accuracy, audit trails per query, and IL6-eligible deployment."

**Company-level / leadership altitude** — the eyelevel.ai homepage, hiring pages, leadership posts. Closer to the strategy-doc register. Platform-economics language is allowed here; abstract claims are allowed if backed by the company-level proof. Still no hype.

> "EyeLevel builds the data foundation enterprises need to deploy AI thoughtfully — structurally-aware retrieval that AI agents can actually trust."

The shift between altitudes is mostly **density of jargon and length of sentence**, not personality. The voice itself is constant.

## 8. Naming and pronouns

**EyeLevel** is the company. **GroundX** is the product. Use the right one for the right claim. *"EyeLevel was founded in…"* is correct; *"EyeLevel parses tables structurally"* is not — that's GroundX. Conversely, *"GroundX is hiring"* is wrong — that's EyeLevel.

The Valantor co-sign lives in the logo, not in body copy. Don't typeset *"a Valantor company"* alongside the wordmark — it's already in the lockup PNG. In long-form copy (white paper bylines, legal footers, company-level "about" sections) it's fine to write *"EyeLevel, a Valantor company"* once, near the top, as a contextual anchor. Don't repeat it.

For pronouns, prefer the product name or the company name over *"we"*. *"GroundX preserves table structure"* is stronger than *"We preserve table structure"*. *"We"* is fine in conversational contexts (a blog post, a customer email) but should be sparse in product copy. Never use *"our solution"* or *"our platform"* — name the product.

Outcome plug-ins follow `[Outcome]X` per the strategy doc (FraudX, ClaimsX, ComplianceX). Don't invent new wordmarks; if a new vertical needs a name, route it back to brand owners.

### 8a. Canonical concept names

These are the proper-noun concepts the brand uses to describe what GroundX actually does. Use them as written — same casing, same hyphenation. Do not rephrase, do not invent synonyms, do not localize on the fly. They are the brand's own vocabulary, and they're how the audience will recognize repeat surfaces as part of the same story.

| Concept | When to use |
| --- | --- |
| **Visual Intelligence** | Valantor's category-defining concept and the umbrella for everything GroundX does. The category EyeLevel claims. Use as the noun for "what GroundX delivers"; capitalized always. |
| **GroundX** | The product. Always one word, capital G + X. Never "Ground X", "groundX", or "GroundX™" — no trademark glyph in body copy. |
| **GroundX Workflows** | The schema-customization layer — agentic extraction with up to 100 configurable parameters per document type. |
| **Dual-Model Architecture** | The fine-tuned vision model + VLM pairing. Capitalize both halves; hyphenate "Dual-Model". |
| **Semantic Objects** | The unit of retrieval. Always plural, always capitalized. Pairs with the reframe "Semantic Objects, not text chunks". |
| **Pixel-Level Provenance** | The audit-trail claim — every output traces back to the exact document, page, and pixel coordinates. Capitalize as written. |
| **Element-Level Provenance** | The same claim at element granularity (table, figure, section, key-value pair). Use when the audience cares about element-typing more than coordinates. |
| **Hybrid Search** | The retrieval engine — vector + structural + relevance scoring. Capitalize both halves; do not write "hybrid search" mid-sentence. |
| **DocBench RAG Benchmark** | The third-party benchmark GroundX ranks #1 on. Always cite as "DocBench" with the qualifier on first mention. |
| **fine-tunable VLM** | A capability claim, not a product name — lowercase, hyphenated. The phrase "the only RAG platform with a fine-tunable VLM in production" is the canonical use. |
| **A Valantor company** | Co-sign for EyeLevel. Already baked into the lockup PNG; only typeset in long-form copy bylines, never alongside the wordmark. See § 8 above. |

When introducing one of these concepts for the first time on a surface, give it a one-line definition the first time it appears. After that, use the canonical name without redefinition — the audience can carry the term once they've seen it once.

## 9. Numbers and proof

Numbers should always be specific and always be earned. *"99% accuracy"* is a real benchmark; *"near-perfect accuracy"* is a hedge dressed as a claim. If a number requires a footnote, include the footnote — better to be precise and qualified than vague.

Format: numerals over spelled-out numbers when a number is doing persuasive work (*"99%"* not *"ninety-nine percent"*). Spelled-out numbers are fine in flowing prose where the number isn't the point.

Avoid:

- *"up to X"* — it's the most common hedge in AI marketing and EyeLevel doesn't use it.
- *"as much as"*, *"as little as"* — same problem.
- Round numbers without sourcing (*"saves millions of hours"* — whose millions?).

Strong examples already in the copy: *"85% fewer hallucinations"*, *"3× retrieval precision"*, *"14 days to first eval"*, *"$0 if the eval fails"*.

## 10. Tone in failure and uncertainty

When something doesn't work, say so directly. Status copy, error states, and degraded-mode banners use the same calm voice as the rest of the surface — not apologetic, not euphemistic, not jovial.

> "Re-ingestion failed for 3 documents. View the report."  ← right.
> "Oops! Something went wrong. We're on it!"  ← wrong.
> "An unexpected error occurred."  ← wrong (vague).

When uncertainty is honest, name it: *"Confidence: medium"*, *"This match was inferred from a similar document"*. EyeLevel sells trust, and overstating certainty is the fastest way to break the trust contract.

## Don'ts (quick list)

- Don't open with a preamble. Get to the verb.
- Don't reach for a superlative when a number, mechanism, or timeframe would do.
- Don't narrate the company's emotional state ("we're excited to…").
- Don't use AI as a vague modifier — say what it does.
- Don't stack adjectives. *"Trusted, assured, governed, accountable enterprise-grade Visual Intelligence"* is six promises and zero claims. Pick one.
- Don't shout (no exclamation points; no all-caps in body copy — ALL-CAPS is reserved for the typed eyebrow pattern, which is a shape, not emphasis; see `brand-principles.md` rule 7).
- Don't use the Valantor co-sign as standalone text. It's in the logo.
- Don't introduce a new "X" wordmark for a feature or vertical. Outcome names route through brand owners.

## When you're stuck

If a sentence isn't working, try these in order:

1. **Cut the preamble.** Most weak copy has a soft 10-word lead before the actual point. Delete it.
2. **Replace the adjective with a number or a mechanism.** "*Fast* retrieval" → "*Sub-200ms* retrieval". "*Powerful* parsing" → "*Structural* parsing".
3. **Rephrase as X, not Y.** Especially for headlines and eyebrows.
4. **Read it aloud.** If it sounds like a press release, it's wrong. If it sounds like the engineer who built the thing explaining it, it's right.

When in real doubt, look at the copy in `../../eyelevel-slides/templates/slides/*.html` and the body of `brand-principles.md`. Both are calibrated to this voice.
