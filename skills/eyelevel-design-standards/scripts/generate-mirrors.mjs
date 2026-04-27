#!/usr/bin/env node
/**
 * generate-mirrors.mjs — single source of truth → runtime mirrors.
 *
 * Reads ../tokens.json and emits:
 *   - ../../eyelevel-web-ui/templates/constants/constants.generated.ts
 *     (brand-token exports for React/MUI consumers)
 *   - Replaces the :root block in ../../eyelevel-slides/templates/styles.css
 *     (bounded by BEGIN GENERATED TOKENS / END GENERATED TOKENS markers)
 *
 * The TS file is always fully regenerated. The CSS file is edited in place:
 * only the block between the markers is replaced so hand-written layout rules
 * stay untouched.
 *
 * Adding a new consumer (e.g., a future eyelevel-docs / eyelevel-social /
 * eyelevel-email skill that needs a programmatic mirror of the brand tokens):
 *   1. Decide the output format the new medium consumes (CSS vars? a JSON
 *      file for the python-docx generator? inline-style snippets for email?).
 *   2. Add an OUTPUT_PATH constant for the new file (next to TS_OUT_PATH /
 *      CSS_OUT_PATH below).
 *   3. Write a render function (e.g., renderDocxStyles, renderEmailInline)
 *      that walks `leaves` (the flattened token tree built below) and emits
 *      the target format. Reuse `tokenPathToTsConst` / `tokenPathToCssVar` as
 *      patterns; add a new path-to-name helper if the medium uses different
 *      naming (e.g., XML element names for DOCX).
 *   4. Wire the new render into the CLI write block at the bottom and into
 *      the exports for verify-mirrors.mjs to diff-check.
 *
 * The walk and resolveRef helpers are medium-agnostic — they only depend on
 * tokens.json's DTCG shape — so the pattern repeats cleanly per consumer.
 *
 * Run: node scripts/generate-mirrors.mjs (from the eyelevel-design-standards dir)
 */

import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const HERE = dirname(fileURLToPath(import.meta.url));
const STANDARDS_DIR = resolve(HERE, "..");
const SKILLS_DIR = resolve(STANDARDS_DIR, "..");

const TOKENS_PATH  = resolve(STANDARDS_DIR, "tokens.json");
const TS_OUT_PATH  = resolve(SKILLS_DIR, "eyelevel-web-ui/templates/constants/constants.generated.ts");
const CSS_OUT_PATH = resolve(SKILLS_DIR, "eyelevel-slides/templates/styles.css");

const tokens = JSON.parse(readFileSync(TOKENS_PATH, "utf8"));

// ─── Token reference resolution ────────────────────────────────────────────
// DTCG allows "{path.to.token}" references. We resolve them once at generate
// time so mirrors contain concrete values.
function resolveRef(value, root) {
  if (typeof value !== "string") return value;
  const m = value.match(/^\{([^}]+)\}$/);
  if (!m) return value;
  const parts = m[1].split(".");
  let node = root;
  for (const p of parts) node = node[p];
  if (node && typeof node === "object" && "$value" in node) {
    return resolveRef(node.$value, root);
  }
  throw new Error(`Could not resolve token reference ${value}`);
}
function resolveCssRef(value) {
  // For CSS we keep the reference as var(--gx-...) so downstream CSS cascades work.
  if (typeof value !== "string") return value;
  const m = value.match(/^\{([^}]+)\}$/);
  if (!m) return value;
  const cssName = tokenPathToCssVar(m[1].split("."));
  return `var(${cssName})`;
}

// ─── Path → name helpers ──────────────────────────────────────────────────
function camelToSnakeUpper(s) {
  return s.replace(/([a-z0-9])([A-Z])/g, "$1_$2").toUpperCase();
}
function camelToKebab(s) {
  return s.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
}
function tokenPathToCssVar(pathParts) {
  // color.brand.navy → --gx-navy
  // color.support.errorRed → --gx-error-red
  // color.surfaceAlias.eyebrowOnLight → --gx-eyebrow-on-light
  // size.slide.headlineCover → --gx-size-headline-cover
  // size.web.h1 → (web tokens have no CSS mirror by default)
  // radius.card → --gx-radius-card
  // slide.width → --gx-slide-width
  // logo.dark → --gx-logo-dark
  // typography.fontFamily → --gx-font
  // typography.fontFeatures → --gx-font-features
  // typography.weight.body → --gx-weight-body
  const [group, ...rest] = pathParts;
  const last = rest[rest.length - 1];
  const leaf = camelToKebab(last);

  if (group === "color") {
    return `--gx-${leaf}`;
  }
  if (group === "typography") {
    if (rest[0] === "fontFamily")   return "--gx-font";
    if (rest[0] === "fontFeatures") return "--gx-font-features";
    if (rest[0] === "weight")       return `--gx-weight-${leaf}`;
    if (rest[0] === "letterSpacing") return `--gx-track-${leaf}`;
    if (rest[0] === "lineHeight")    return `--gx-line-${leaf}`;
  }
  if (group === "size") {
    if (rest[0] === "slide") return `--gx-size-${leaf}`;
    if (rest[0] === "web")   return `--gx-web-size-${leaf}`;
  }
  if (group === "radius") {
    return `--gx-radius-${leaf}`;
  }
  if (group === "slide") {
    if (last === "accentBarHeight") return "--gx-accent-bar-height";
    return `--gx-slide-${leaf}`;
  }
  if (group === "logo") {
    return `--gx-logo-${leaf}`;
  }
  throw new Error(`No CSS var mapping for token path ${pathParts.join(".")}`);
}
function tokenPathToTsConst(pathParts) {
  // color.brand.navy → NAVY
  // color.brand.bodyText → BODY_TEXT
  // color.support.errorRed → ERROR_RED
  // color.support.darkGrey → DARK_GREY
  // size.web.h1 → FONT_SIZE_H1
  // size.web.bodySm → FONT_SIZE_BODY_SM
  // radius.card → BORDER_RADIUS_CARD
  // radius.sm → BORDER_RADIUS_SM
  // radius.md → BORDER_RADIUS
  // radius.lg → BORDER_RADIUS_2X
  // typography.fontFamily → FONT_FAMILY
  // typography.fontFeatures → FONT_FEATURE_SETTINGS
  // typography.weight.body → FONT_WEIGHT_BODY
  // typography.letterSpacing.label → LETTER_SPACING_LABEL
  // typography.lineHeight.body → LINE_HEIGHT_BODY
  const [group, ...rest] = pathParts;
  const last = rest[rest.length - 1];
  const LEAF = camelToSnakeUpper(last);

  if (group === "color") {
    if (rest[0] === "brand" || rest[0] === "support") return LEAF;
    return null; // surfaceAlias is not exported to TS from this generator
  }
  if (group === "typography") {
    if (rest[0] === "fontFamily")    return "FONT_FAMILY";
    if (rest[0] === "fontFeatures")  return "FONT_FEATURE_SETTINGS";
    if (rest[0] === "weight")        return `FONT_WEIGHT_${LEAF}`;
    if (rest[0] === "letterSpacing") return `LETTER_SPACING_${LEAF}`;
    if (rest[0] === "lineHeight")    return `LINE_HEIGHT_${LEAF}`;
  }
  if (group === "size" && rest[0] === "web") {
    // Map h1..h6 to FONT_SIZE_H1..H6; other leaves to FONT_SIZE_<LEAF>
    return `FONT_SIZE_${LEAF}`;
  }
  if (group === "radius") {
    if (last === "sm")   return "BORDER_RADIUS_SM";
    if (last === "md")   return "BORDER_RADIUS";
    if (last === "lg")   return "BORDER_RADIUS_2X";
    if (last === "card") return "BORDER_RADIUS_CARD";
    if (last === "pill") return "BORDER_RADIUS_PILL";
  }
  if (group === "spacing") {
    if (last === "padding")              return "PADDING";
    if (last === "mainContentPadding")   return "MAIN_CONTENT_PADDING";
    if (last === "mainContentTopMargin") return "MAIN_CONTENT_TOP_MARGIN";
  }
  if (group === "duration") {
    if (last === "messageBar") return "MESSAGE_BAR_DURATION";
  }
  return null;
}

// ─── Flatten the tree ─────────────────────────────────────────────────────
function walk(node, path, out) {
  if (node && typeof node === "object" && "$value" in node) {
    out.push({ path, node });
    return;
  }
  if (node && typeof node === "object") {
    for (const [k, v] of Object.entries(node)) {
      if (k.startsWith("$")) continue;
      walk(v, [...path, k], out);
    }
  }
}
const leaves = [];
walk(tokens, [], leaves);

// ─── TS emission ──────────────────────────────────────────────────────────
function tsValue(path, raw) {
  // Colors and string tokens become quoted. Numbers stay numeric.
  const [group, ...rest] = path;
  if (group === "color")      return JSON.stringify(resolveRef(raw, tokens));
  if (group === "typography") {
    if (rest[0] === "weight" || rest[0] === "lineHeight") return String(raw);
    return JSON.stringify(raw);
  }
  if (group === "size")       return JSON.stringify(raw);
  if (group === "radius")     return JSON.stringify(raw);
  if (group === "spacing")    return String(raw);
  if (group === "duration")   return String(raw);
  return JSON.stringify(raw);
}
function renderTs() {
  const lines = [];
  lines.push("/**");
  lines.push(" * AUTO-GENERATED by eyelevel-design-standards/scripts/generate-mirrors.mjs");
  lines.push(" * Source of truth: eyelevel-design-standards/tokens.json");
  lines.push(" *");
  lines.push(" * DO NOT EDIT THIS FILE BY HAND. Re-run the generator instead:");
  lines.push(" *   cd eyelevel-design-standards && node scripts/generate-mirrors.mjs");
  lines.push(" *");
  lines.push(" * Hand-written chrome tokens (drawerWidth, NAV_ICON_GREY, etc.) live in");
  lines.push(" * constants.chrome.ts. The barrel constants.ts re-exports both.");
  lines.push(" */");
  lines.push("");

  const groups = [
    ["Colors — brand palette",       (p) => p[0] === "color" && p[1] === "brand"],
    ["Colors — support palette",     (p) => p[0] === "color" && p[1] === "support"],
    ["Typography — family & features", (p) => p[0] === "typography" && (p[1] === "fontFamily" || p[1] === "fontFeatures")],
    ["Typography — weight ladder",   (p) => p[0] === "typography" && p[1] === "weight"],
    ["Typography — letter spacing",  (p) => p[0] === "typography" && p[1] === "letterSpacing"],
    ["Typography — line height",     (p) => p[0] === "typography" && p[1] === "lineHeight"],
    ["Web size scale",               (p) => p[0] === "size" && p[1] === "web"],
    ["Border radii (webflow scale)", (p) => p[0] === "radius"],
    ["Spacing (MUI units, 1 = 8px)", (p) => p[0] === "spacing"],
    ["Durations",                    (p) => p[0] === "duration"],
  ];

  for (const [title, pred] of groups) {
    const section = leaves.filter(({ path }) => pred(path));
    if (section.length === 0) continue;

    lines.push("// " + "─".repeat(72));
    lines.push(`// ${title}`);
    lines.push("// " + "─".repeat(72));
    lines.push("");

    for (const { path, node } of section) {
      const name = tokenPathToTsConst(path);
      if (!name) continue;
      const desc = node.$description;
      const px = node.$px ? ` (${node.$px}px)` : "";
      if (desc) lines.push(`/** ${desc}${px} */`);
      else if (px) lines.push(`/**${px.slice(1)} */`);
      lines.push(`export const ${name} = ${tsValue(path, node.$value)};`);
    }
    lines.push("");
  }

  return lines.join("\n");
}

// ─── CSS emission ─────────────────────────────────────────────────────────
function cssValue(path, node) {
  const raw = node.$value;
  return resolveCssRef(raw);
}
function renderCssRoot() {
  const lines = [];
  lines.push("/* BEGIN GENERATED TOKENS — do not edit by hand. */");
  lines.push("/* Regenerate via: (cd eyelevel-design-standards && node scripts/generate-mirrors.mjs) */");
  lines.push("/* Source of truth: eyelevel-design-standards/tokens.json */");
  lines.push(":root {");

  const sections = [
    ["Brand palette (tokens.md §1.1)",          (p) => p[0] === "color" && p[1] === "brand"],
    ["Support palette (tokens.md §1.2)",        (p) => p[0] === "color" && p[1] === "support"],
    ["Surface-aware color aliases (§1.3)",      (p) => p[0] === "color" && p[1] === "surfaceAlias"],
    ["Typography — family & OpenType features", (p) => p[0] === "typography" && (p[1] === "fontFamily" || p[1] === "fontFeatures")],
    ["Typography — weight ladder (§2.2)",       (p) => p[0] === "typography" && p[1] === "weight"],
    ["Typography — letter spacing",             (p) => p[0] === "typography" && p[1] === "letterSpacing"],
    ["Slide size scale (§3)",                   (p) => p[0] === "size" && p[1] === "slide"],
    ["Radii (§5)",                              (p) => p[0] === "radius"],
    ["Slide canvas (§6)",                       (p) => p[0] === "slide"],
    ["Logo lockup (§7)",                        (p) => p[0] === "logo"],
  ];

  for (const [title, pred] of sections) {
    const section = leaves.filter(({ path }) => pred(path));
    if (section.length === 0) continue;
    lines.push("");
    lines.push(`  /* ── ${title} ── */`);
    for (const { path, node } of section) {
      let name;
      try { name = tokenPathToCssVar(path); } catch { continue; }
      const v = cssValue(path, node);
      const pad = " ".repeat(Math.max(1, 32 - name.length));
      lines.push(`  ${name}:${pad}${v};`);
    }
  }

  // CSS-only shorthand tokens. These are convenience composites used by many
  // class rules (e.g. --gx-border-hairline is the canonical hairline border
  // shorthand). They compose from primitives above but are not individual
  // values worth first-class entries in tokens.json.
  lines.push("");
  lines.push("  /* ── CSS-only shorthands (composed from primitives above) ── */");
  const shorthands = [
    ["--gx-border-hairline", "1px solid var(--gx-border)", "Canonical hairline border. Use everywhere a 1px navy-at-10% edge is needed."],
  ];
  for (const [name, value, desc] of shorthands) {
    if (desc) lines.push(`  /* ${desc} */`);
    const pad = " ".repeat(Math.max(1, 32 - name.length));
    lines.push(`  ${name}:${pad}${value};`);
  }

  lines.push("");
  lines.push("  /* Apply Inter OpenType features at the document root so children inherit. */");
  lines.push("  font-feature-settings: var(--gx-font-features);");
  lines.push("}");
  lines.push("/* END GENERATED TOKENS */");
  return lines.join("\n");
}

// ─── Splice CSS into styles.css ───────────────────────────────────────────
function spliceCss() {
  const existing = readFileSync(CSS_OUT_PATH, "utf8");
  const begin = "/* BEGIN GENERATED TOKENS";
  const end = "/* END GENERATED TOKENS */";
  const generated = renderCssRoot();

  if (existing.includes(begin) && existing.includes(end)) {
    const before = existing.slice(0, existing.indexOf(begin));
    const afterIdx = existing.indexOf(end) + end.length;
    const after = existing.slice(afterIdx);
    return before + generated + after;
  }
  // First run: replace the existing :root { ... } block.
  const rootStart = existing.indexOf(":root {");
  if (rootStart === -1) throw new Error("styles.css: no :root block found");
  // Find the matching closing brace at the top level of the :root rule.
  let depth = 0;
  let i = rootStart;
  for (; i < existing.length; i++) {
    const c = existing[i];
    if (c === "{") depth++;
    else if (c === "}") {
      depth--;
      if (depth === 0) { i++; break; }
    }
  }
  // Trim trailing whitespace/newline after the old block so we don't accumulate blanks.
  while (existing[i] === "\n" || existing[i] === "\r") i++;
  const before = existing.slice(0, rootStart);
  const after = existing.slice(i);
  return before + generated + "\n\n" + after;
}

// ─── Public API (for verify script) ───────────────────────────────────────
// Exported so scripts/verify-mirrors.mjs can regenerate in memory and diff
// against on-disk mirrors without writing anything.
export const OUTPUT_PATHS = { TS_OUT_PATH, CSS_OUT_PATH };
export { renderTs, spliceCss };

// ─── CLI entry: only write when invoked directly, not when imported ────────
const isMain = import.meta.url === `file://${process.argv[1]}`;
if (isMain) {
  writeFileSync(TS_OUT_PATH, renderTs());
  writeFileSync(CSS_OUT_PATH, spliceCss());

  console.log(`wrote ${TS_OUT_PATH}`);
  console.log(`updated ${CSS_OUT_PATH} (:root block)`);
}
