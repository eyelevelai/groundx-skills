# Dell response deck — full pattern tour

An 11-slide reproduction of the "Built for Dell" customer response deck that pattern-covers every layout in this skill at least once. Use it as the reference when you need a full, fleshed-out deck and want to see how the patterns compose over a whole narrative arc.

## Narrative arc

```
01 cover                    (layout: cover)                     "WHITE PAPER · RESPONSE TO DELL"
02 the problem              (layout: hero-with-stats)           your docs are lying to your AI
03 section break            (layout: section-break)             "the approach"
04 structural ingestion     (layout: split-problem-solution)    light/dark split
05 built for the problem    (layout: three-card-grid)           scale · security · speed
06 proof                    (layout: display-stat)              99% precision
07 section break            (layout: section-break)             "how it lands"
08 rollout plan             (layout: detail-grid-with-sidebar)  14-day POC
09 what we'll ship          (layout: three-card-grid)           connector · parse · retrieval
10 next steps               (layout: numbered-steps)            four steps, three weeks
11 cta close                (layout: cta)                       "let's build this together"
```

Every slide in this example maps directly to one of the layouts in `../../references/layouts.md`. Rewriting the content into a different deck is a content exercise — the layouts stay the same.

## Not included

The slide files themselves aren't duplicated into this folder — they're near-identical to the archetypes in `../../templates/slides/` with different copy. To produce your own Dell-style deck:

1. Copy `../../templates/` to a new folder.
2. Use this README as a sequencing reference.
3. Rewrite the copy in each slide, keeping the class names and structure intact.
4. Run `npm run build`.

## Why reproduce this in full?

Because the "Built for Dell" deck was the proving ground for the HTML → PDF pipeline. Every layout and every pattern in the skill was validated against it. When a future reader of this skill wants to see "what does a complete GroundX deck actually look like", this arc is the answer.
