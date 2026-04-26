#!/usr/bin/env node
/**
 * verify-mirrors.mjs — fail loudly if the mirrors drift from tokens.json.
 *
 * Runs the same render pipeline as generate-mirrors.mjs but DOES NOT write to
 * disk. Instead, it compares what the generator would produce against what is
 * currently committed in:
 *
 *   ../../eyelevel-web-ui/templates/constants.generated.ts
 *   ../../eyelevel-slides/templates/styles.css  (only the :root block between
 *                                                BEGIN GENERATED TOKENS /
 *                                                END GENERATED TOKENS markers)
 *
 * On drift the script prints a unified-ish diff and exits 1. Clean runs exit 0.
 *
 * Intended use:
 *   - `node scripts/verify-mirrors.mjs` as a pre-commit or CI gate.
 *   - Run manually after editing tokens.json to confirm the generator was run
 *     and the mirrors landed in the commit.
 *
 * Run: node scripts/verify-mirrors.mjs (from the eyelevel-design-standards dir)
 */

import { readFileSync } from "node:fs";
import { OUTPUT_PATHS, renderTs, spliceCss } from "./generate-mirrors.mjs";

const { TS_OUT_PATH, CSS_OUT_PATH } = OUTPUT_PATHS;

function miniDiff(label, actual, expected) {
  const a = actual.split("\n");
  const e = expected.split("\n");
  const max = Math.max(a.length, e.length);
  const changes = [];
  for (let i = 0; i < max; i++) {
    if (a[i] !== e[i]) {
      changes.push(`  line ${i + 1}:`);
      if (a[i] !== undefined) changes.push(`    on disk:   ${a[i]}`);
      if (e[i] !== undefined) changes.push(`    expected:  ${e[i]}`);
      if (changes.length > 40) {
        changes.push("  … (more differences truncated)");
        break;
      }
    }
  }
  return `${label}\n${changes.join("\n")}`;
}

let failed = false;

// ─── constants.generated.ts ───────────────────────────────────────────────
{
  const onDisk = readFileSync(TS_OUT_PATH, "utf8");
  const expected = renderTs();
  if (onDisk !== expected) {
    failed = true;
    console.error(`✗ ${TS_OUT_PATH} is out of date.`);
    console.error(miniDiff("  Differences:", onDisk, expected));
    console.error("");
  } else {
    console.log(`✓ ${TS_OUT_PATH} is in sync with tokens.json`);
  }
}

// ─── styles.css (spliced :root block) ─────────────────────────────────────
{
  const onDisk = readFileSync(CSS_OUT_PATH, "utf8");
  const expected = spliceCss(); // splices against the current on-disk file
  if (onDisk !== expected) {
    failed = true;
    console.error(`✗ ${CSS_OUT_PATH} :root block is out of date.`);
    console.error(miniDiff("  Differences:", onDisk, expected));
    console.error("");
  } else {
    console.log(`✓ ${CSS_OUT_PATH} :root block is in sync with tokens.json`);
  }
}

if (failed) {
  console.error("");
  console.error("One or more mirrors drifted from tokens.json.");
  console.error("Run: node scripts/generate-mirrors.mjs");
  console.error("then commit the regenerated files.");
  process.exit(1);
}

console.log("");
console.log("All mirrors are in sync with tokens.json.");
