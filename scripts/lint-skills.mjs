#!/usr/bin/env node
/**
 * lint-skills.mjs — structural lint that fails CI on brand-contract violations.
 *
 * Codifies every audit assertion the skills enforce: no hex literals in
 * components, no raw fontSize on icons, no @media strings, every IconButton
 * has aria-label, every relative import resolves, every required file exists,
 * voice-avoid words don't leak into content, etc.
 *
 * Pure Node, zero npm deps. Companion to `eyelevel-design-standards/scripts/
 * verify-mirrors.mjs` (which checks tokens.json → mirror drift). This script
 * checks everything else.
 *
 * Run: node scripts/lint-skills.mjs (from the repo root)
 * Exits 0 on clean, 1 on any violation.
 */

import { execSync } from "node:child_process";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { basename, dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(HERE, "..");

const WEB       = join(ROOT, "skills/eyelevel-web-ui");
const SLIDES    = join(ROOT, "skills/eyelevel-slides");
const STANDARDS = join(ROOT, "skills/eyelevel-design-standards");

// ─── Violation collector ───────────────────────────────────────────────────
const violations = [];
function flag(check, file, line, message) {
  violations.push({ check, file: relative(ROOT, file), line, message });
}

// ─── File walking ──────────────────────────────────────────────────────────
function walkFiles(dir, predicate) {
  const out = [];
  if (!existsSync(dir)) return out;
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === "node_modules" || entry.name === ".git" || entry.name === "out") continue;
    const full = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walkFiles(full, predicate));
    else if (predicate(full)) out.push(full);
  }
  return out;
}
function readLines(file) {
  return readFileSync(file, "utf8").split("\n");
}
// True if a code line is comment-only (single-line // or jsdoc-style * line).
function isCommentLine(line) {
  const t = line.trimStart();
  return t.startsWith("//") || t.startsWith("*") || t.startsWith("/*");
}

// ─── A. Web-UI: no hex literals in components or examples ─────────────────
function checkA_hexInComponents() {
  const files = [
    ...walkFiles(join(WEB, "templates/shared/components"), f => f.endsWith(".tsx")),
    ...walkFiles(join(WEB, "examples"), f => f.endsWith(".tsx")),
    join(WEB, "templates/theme.ts"),
    join(WEB, "templates/ThemeProvider.tsx"),
  ].filter(existsSync);
  const pat = /#[0-9a-fA-F]{3,6}\b/;
  for (const f of files) {
    readLines(f).forEach((line, i) => {
      if (isCommentLine(line)) return;
      // Skip content inside string interpolations that legitimately reference
      // a hex (rare; component code shouldn't have these).
      const m = line.match(pat);
      if (!m) return;
      flag("A. hex-in-component", f, i + 1, `hex literal "${m[0]}" — import a token from constants instead`);
    });
  }
}

// ─── B. Web-UI: no raw fontSize: <number> in tsx ──────────────────────────
function checkB_rawFontSizePx() {
  const files = [
    ...walkFiles(join(WEB, "templates/shared/components"), f => f.endsWith(".tsx")),
    ...walkFiles(join(WEB, "examples"), f => f.endsWith(".tsx")),
  ];
  // Match `fontSize: 32` or `fontSize: 32,` etc. Do not match `fontSize: "small"`,
  // `fontSize: FONT_SIZE_BODY`, or `fontSize: { xs: ... }`.
  const pat = /fontSize:\s*[0-9]+\b/;
  for (const f of files) {
    readLines(f).forEach((line, i) => {
      if (isCommentLine(line)) return;
      if (pat.test(line)) {
        flag("B. icon-fontsize-px", f, i + 1, `raw fontSize: <number> — use fontSize="small|medium|large" or a FONT_SIZE_* token`);
      }
    });
  }
}

// ─── C. Web-UI: no fontWeight literal ──────────────────────────────────────
function checkC_fontWeightLiteral() {
  const files = [
    ...walkFiles(join(WEB, "templates/shared/components"), f => f.endsWith(".tsx")),
    ...walkFiles(join(WEB, "examples"), f => f.endsWith(".tsx")),
  ];
  const pat = /fontWeight:\s*[1-9][0-9]{2}\b/;
  for (const f of files) {
    readLines(f).forEach((line, i) => {
      if (isCommentLine(line)) return;
      if (pat.test(line)) {
        flag("C. fontweight-literal", f, i + 1, `raw fontWeight literal — use FONT_WEIGHT_* token`);
      }
    });
  }
}

// ─── D. Web-UI: no hardcoded @media strings ──────────────────────────────
function checkD_hardcodedMedia() {
  const files = [
    ...walkFiles(join(WEB, "templates"), f => /\.(tsx?|css)$/.test(f)),
    ...walkFiles(join(WEB, "examples"), f => f.endsWith(".tsx")),
  ];
  const pat = /@media\s*\((max|min)-width:/;
  for (const f of files) {
    readLines(f).forEach((line, i) => {
      if (isCommentLine(line)) return;
      // The skills' own rule statements quote the forbidden form back; skip those.
      if (line.includes("never hardcode") || line.includes("don't hardcode")) return;
      if (pat.test(line)) {
        flag("D. hardcoded-media", f, i + 1, `hardcoded @media (max-width:...) — use theme.breakpoints`);
      }
    });
  }
}

// ─── E. Web-UI: no boxShadow other than "none" ────────────────────────────
function checkE_boxShadow() {
  const files = [
    ...walkFiles(join(WEB, "templates"), f => /\.tsx?$/.test(f)),
    ...walkFiles(join(WEB, "examples"), f => f.endsWith(".tsx")),
  ];
  for (const f of files) {
    readLines(f).forEach((line, i) => {
      if (isCommentLine(line)) return;
      const m = line.match(/boxShadow:\s*["'`]([^"'`]+)["'`]/);
      if (m && m[1] !== "none") {
        flag("E. boxshadow-not-none", f, i + 1, `boxShadow="${m[1]}" — flat is the brand`);
      }
    });
  }
}

// ─── F. Web-UI: every <IconButton> has aria-label ─────────────────────────
function checkF_iconButtonAria() {
  const files = [
    ...walkFiles(join(WEB, "templates/shared/components"), f => f.endsWith(".tsx")),
    ...walkFiles(join(WEB, "examples"), f => f.endsWith(".tsx")),
  ];
  for (const f of files) {
    const text = readFileSync(f, "utf8");
    // Match opening <IconButton ...> tags. Skip <IconButtonProps> (TS type).
    const re = /<IconButton(\b[^>]*)>/g;
    let m;
    while ((m = re.exec(text)) !== null) {
      const attrs = m[1] ?? "";
      // Skip TS type usage like <IconButtonProps,
      if (attrs.startsWith("Props") || attrs.startsWith("Props,")) continue;
      // Has aria-label or {...spread} (could be passing aria-label through props)
      if (/\baria-label\b|\.\.\.props\b|\.\.\.rest\b/.test(attrs)) continue;
      const lineNum = text.slice(0, m.index).split("\n").length;
      flag("F. iconbutton-no-aria", f, lineNum, `<IconButton> without aria-label`);
    }
  }
}

// ─── G. Web-UI: every relative import resolves ────────────────────────────
function checkG_importsResolve() {
  const ext = ["", ".ts", ".tsx", ".css", "/index.ts", "/index.tsx"];
  const files = [
    ...walkFiles(join(WEB, "templates"), f => /\.(tsx?|mjs|js)$/.test(f)),
    ...walkFiles(join(WEB, "examples"), f => /\.tsx?$/.test(f)),
  ];
  // Match `from "..."`, `import "..."`, `} from "..."`, `export * from "..."`.
  const pat = /(?:^|[\s;])(?:export\s+\*\s+from|import|from)\s+"(\.{1,2}\/[^"]+)"/gm;
  // Also: `} from "..."` on its own line (multi-line import close).
  const trailingPat = /^\s*\}\s+from\s+"(\.{1,2}\/[^"]+)"/gm;

  for (const f of files) {
    const text = readFileSync(f, "utf8");
    const seen = new Set();
    for (const re of [pat, trailingPat]) {
      let m;
      // Reset lastIndex since we reuse the regex
      re.lastIndex = 0;
      while ((m = re.exec(text)) !== null) {
        const importPath = m[1];
        if (seen.has(importPath)) continue;
        seen.add(importPath);
        const target = resolve(dirname(f), importPath);
        const found = ext.some(e => existsSync(target + e));
        if (!found) {
          const lineNum = text.slice(0, m.index).split("\n").length;
          flag("G. broken-import", f, lineNum, `import "${importPath}" doesn't resolve`);
        }
      }
    }
  }
}

// ─── H. Web-UI: evals.json required_files exist ───────────────────────────
function checkH_webEvalsRequiredFiles() {
  const evalsPath = join(WEB, "evals/evals.json");
  if (!existsSync(evalsPath)) return;
  const evals = JSON.parse(readFileSync(evalsPath, "utf8"));
  const required = evals?.sanity_checks?.required_files_this_skill ?? [];
  for (const path of required) {
    if (!existsSync(join(WEB, path))) {
      flag("H. evals-missing-file", evalsPath, 0, `required_files_this_skill: "${path}" doesn't exist`);
    }
  }
}

// ─── I. Web-UI: canonical radii in named components ───────────────────────
// Each of these components has a single canonical radius per the docs and
// styleguide.html; flag if a regression slips back in.
const CANONICAL_RADII = {
  "CommonSubmitButton.tsx": "BORDER_RADIUS_PILL",
  "CommonCancelButton.tsx": "BORDER_RADIUS_PILL",
  "GxButtonGroup.tsx":      "BORDER_RADIUS_PILL",
  "GxPill.tsx":             "BORDER_RADIUS_PILL",
  "CommonTextField.tsx":    "BORDER_RADIUS",
  "GxCard.tsx":             "BORDER_RADIUS_CARD",
};
function checkI_canonicalRadii() {
  for (const [name, expected] of Object.entries(CANONICAL_RADII)) {
    const f = join(WEB, "templates/shared/components", name);
    if (!existsSync(f)) continue;
    const text = readFileSync(f, "utf8");
    // Find all top-level borderRadius assignments. Allow other radius tokens
    // for nested concerns (e.g., GxCard's radius="sm" branch uses BORDER_RADIUS
    // for nested surfaces). The check: the expected token must appear at least
    // once; no "wrong" token should appear at top level for these specific files.
    if (!new RegExp(`\\b${expected}\\b`).test(text)) {
      flag("I. wrong-radius", f, 0, `${name}: expected use of ${expected} not found`);
    }
    // Also flag the specific past-bug token (BORDER_RADIUS_2X) on the four
    // button/input/group files where it was the regression.
    if (
      ["CommonSubmitButton.tsx", "CommonCancelButton.tsx", "GxButtonGroup.tsx", "CommonTextField.tsx"].includes(name) &&
      /\bBORDER_RADIUS_2X\b/.test(text)
    ) {
      flag("I. wrong-radius", f, 0, `${name}: should not use BORDER_RADIUS_2X (past regression)`);
    }
  }
}

// ─── J. Slides: no inline raw rgba/hex/px in slide HTML ───────────────────
function checkJ_slideInlineStyles() {
  const files = [
    ...walkFiles(join(SLIDES, "templates/slides"), f => f.endsWith(".html")),
    ...walkFiles(join(SLIDES, "examples"), f => f.endsWith(".html")),
    join(SLIDES, "templates/base.html"),
  ].filter(existsSync);
  const pat = /style="[^"]*(rgba\(|#[0-9a-fA-F]{3,6}|[0-9]+px)/;
  for (const f of files) {
    readLines(f).forEach((line, i) => {
      if (!pat.test(line)) return;
      // Sanctioned exception: photo-cover background-image url for user content.
      if (basename(f) === "09-photo-cover.html" && line.includes("background-image: url(")) return;
      flag("J. slide-inline-style", f, i + 1, `inline style with raw color/px — move to layout class in styles.css`);
    });
  }
}

// ─── K. Slides: no font-size:/font-weight:/url( literals outside :root ────
function checkK_slidesStylesCss() {
  const f = join(SLIDES, "templates/styles.css");
  if (!existsSync(f)) return;
  const text = readFileSync(f, "utf8");
  const begin = "/* BEGIN GENERATED TOKENS";
  const end = "/* END GENERATED TOKENS */";
  const beginIdx = text.indexOf(begin);
  const endIdx = text.indexOf(end);
  if (beginIdx === -1 || endIdx === -1) {
    flag("K. styles-no-generated-block", f, 0, "missing /* BEGIN GENERATED TOKENS / END markers");
    return;
  }
  const beginLine = text.slice(0, beginIdx).split("\n").length;
  const endLine   = text.slice(0, endIdx).split("\n").length + 1;

  // Walk lines while tracking multi-line /* ... */ comment state. CSS
  // comments span multiple lines; line.startsWith("*") only catches the
  // continuation lines, not lines whose content sits inside a still-open
  // block.
  let inBlockComment = false;
  readLines(f).forEach((line, i) => {
    const lineNum = i + 1;
    const lineWithCommentState = line; // capture before mutating

    // Update comment state for *next* line. We use a copy to also detect
    // open-and-close-on-same-line.
    let s = line;
    while (true) {
      if (!inBlockComment) {
        const open = s.indexOf("/*");
        if (open === -1) break;
        const close = s.indexOf("*/", open + 2);
        if (close === -1) {
          inBlockComment = true;
          break;
        }
        // close on same line — strip the comment span and continue scanning
        s = s.slice(0, open) + s.slice(close + 2);
      } else {
        const close = s.indexOf("*/");
        if (close === -1) {
          // entire line consumed by an open block comment
          s = "";
          break;
        }
        inBlockComment = false;
        s = s.slice(close + 2);
      }
    }
    // `s` is now the non-comment portion of the line. If it's all whitespace,
    // there's nothing executable on this line.
    const codePart = s.trim();
    if (codePart === "") return;

    // Inside the generated :root block — let it through (it owns the tokens).
    if (lineNum >= beginLine && lineNum <= endLine) return;

    // `@import url(...)` is a CSS-level directive, not a brand decoration.
    // It's how we load Inter from Google Fonts.
    if (/^@import\s+url\(/.test(codePart)) return;

    if (/font-size:\s*[0-9]/.test(codePart) && !codePart.includes("var(--gx-")) {
      flag("K. styles-font-size-literal", f, lineNum, "raw font-size literal — use var(--gx-size-*)");
    }
    if (/font-weight:\s*[0-9]/.test(codePart) && !codePart.includes("var(--gx-")) {
      flag("K. styles-font-weight-literal", f, lineNum, "raw font-weight literal — use var(--gx-weight-*)");
    }
    if (/url\(/.test(codePart)) {
      flag("K. styles-url-outside-root", f, lineNum, "url() outside generated :root block — define a token in tokens.json");
    }
  });
}

// ─── L. Slides: every numbered slide 00-14 exists ─────────────────────────
function checkL_slideFilesPresent() {
  const expected = [
    "00-section-break", "01-cover", "02-hero-with-stats", "03-split-problem-solution",
    "04-three-card-grid", "05-numbered-steps", "06-display-stat", "07-cta",
    "08-detail-grid-with-sidebar", "09-photo-cover", "10-qa-panel", "11-summary-built-for",
    "12-findings-grid", "13-numbered-solutions-anchor", "14-grid-with-stat-sidebar",
  ];
  const dir = join(SLIDES, "templates/slides");
  for (const slug of expected) {
    if (!existsSync(join(dir, `${slug}.html`))) {
      flag("L. slide-file-missing", dir, 0, `expected ${slug}.html`);
    }
  }
}

// ─── M. Slides: evals.json required_files exist ───────────────────────────
function checkM_slidesEvalsRequiredFiles() {
  const evalsPath = join(SLIDES, "evals/evals.json");
  if (!existsSync(evalsPath)) return;
  const evals = JSON.parse(readFileSync(evalsPath, "utf8"));
  const required = evals?.sanity_checks?.required_files_this_skill ?? [];
  for (const path of required) {
    if (!existsSync(join(SLIDES, path))) {
      flag("M. evals-missing-file", evalsPath, 0, `required_files_this_skill: "${path}" doesn't exist`);
    }
  }
}

// ─── N. Standards: tokens.json parses cleanly ─────────────────────────────
function checkN_tokensJsonParses() {
  const f = join(STANDARDS, "tokens.json");
  if (!existsSync(f)) {
    flag("N. tokens-missing", f, 0, "tokens.json not found");
    return;
  }
  try {
    JSON.parse(readFileSync(f, "utf8"));
  } catch (e) {
    flag("N. tokens-json-parse", f, 0, `tokens.json doesn't parse: ${e.message}`);
  }
}

// ─── O. Standards: mirrors in sync (delegates to verify-mirrors.mjs) ──────
function checkO_mirrorsInSync() {
  const verify = join(STANDARDS, "scripts/verify-mirrors.mjs");
  if (!existsSync(verify)) return;
  try {
    execSync(`node ${verify}`, { cwd: STANDARDS, stdio: "pipe" });
  } catch (e) {
    flag("O. mirrors-out-of-sync", verify, 0, "verify-mirrors.mjs failed — run generate-mirrors.mjs and commit");
  }
}

// ─── P. Cross-skill voice avoid-list ──────────────────────────────────────
const AVOID_WORDS = [
  "industry-leading", "cutting-edge", "world-class", "best-in-class",
  "unleash", "magical", "next-generation", "transformative",
  "supercharge", "game-changing", "paradigm-shifting",
];
function checkP_voiceAvoidWords() {
  const files = [
    ...walkFiles(join(SLIDES, "templates/slides"), f => f.endsWith(".html")),
    ...walkFiles(join(SLIDES, "examples"), f => f.endsWith(".html")),
    ...walkFiles(join(WEB, "examples"), f => f.endsWith(".tsx")),
  ];
  const re = new RegExp(`\\b(${AVOID_WORDS.join("|")})\\b`, "i");
  for (const f of files) {
    readLines(f).forEach((line, i) => {
      const m = line.match(re);
      if (m) flag("P. voice-avoid-word", f, i + 1, `avoid-list word "${m[1]}" — see voice.md`);
    });
  }
}

// ─── Main ─────────────────────────────────────────────────────────────────
async function main() {
  console.log("Running structural lint…\n");

  checkA_hexInComponents();
  checkB_rawFontSizePx();
  checkC_fontWeightLiteral();
  checkD_hardcodedMedia();
  checkE_boxShadow();
  checkF_iconButtonAria();
  checkG_importsResolve();
  checkH_webEvalsRequiredFiles();
  checkI_canonicalRadii();
  checkJ_slideInlineStyles();
  checkK_slidesStylesCss();
  checkL_slideFilesPresent();
  checkM_slidesEvalsRequiredFiles();
  checkN_tokensJsonParses();
  checkO_mirrorsInSync();
  checkP_voiceAvoidWords();

  if (violations.length === 0) {
    console.log("✓ All structural lint checks passed.");
    process.exit(0);
  }

  // Group by check id for readable output.
  const byCheck = new Map();
  for (const v of violations) {
    if (!byCheck.has(v.check)) byCheck.set(v.check, []);
    byCheck.get(v.check).push(v);
  }
  for (const [check, vs] of byCheck) {
    console.error(`✗ ${check} (${vs.length})`);
    for (const v of vs) {
      console.error(`  ${v.file}:${v.line || "?"}  ${v.message}`);
    }
    console.error("");
  }
  console.error(`${violations.length} violation${violations.length === 1 ? "" : "s"} total.`);
  process.exit(1);
}

main().catch((e) => {
  console.error("lint script crashed:", e);
  process.exit(2);
});
