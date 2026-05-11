#!/usr/bin/env node
/**
 * Automated citation consistency check.
 * Verifies all Zinnov-Nasscom citations across src/ and public/data/ use:
 *   - "2026" year
 *   - "GCC Value Orbit" title fragment
 *   - "Delivery Engine to Enterprise Nerve Centre" subtitle (in full citations)
 *   - "May 6, 2026" publication date (in full citations)
 *
 * Also flags any non-quoted "1,800 GCCs" claims that read as current FY2026 stats.
 *
 * Exits non-zero on failure so CI can gate on it.
 */
import { readdirSync, readFileSync, statSync, mkdirSync, writeFileSync } from "node:fs";
import { join, extname } from "node:path";

const ROOTS = ["src", "public/data"];
const EXTS = new Set([".ts", ".tsx", ".js", ".jsx", ".json", ".md"]);
const SKIP_FILES = new Set(["gcc-content_old.json"]);

const files = [];
const walk = (dir) => {
  for (const entry of readdirSync(dir)) {
    const p = join(dir, entry);
    if (SKIP_FILES.has(entry)) continue;
    const st = statSync(p);
    if (st.isDirectory()) walk(p);
    else if (EXTS.has(extname(entry))) files.push(p);
  }
};
ROOTS.forEach(walk);

const errors = [];
const warnings = [];

// Patterns that mention Zinnov+Nasscom together (citation-bearing line).
const citationLine = /(zinnov[-\s]?nasscom|nasscom[-\s]?zinnov)/i;
// Year detection — accept 2026; flag stale years 2023/2024/2025 in same line as a Zinnov-Nasscom citation
// unless the citation is clearly a historical/older report (e.g. "5-Year", "H1 2023", "Q3 CY2023").
const staleYear = /\b(2023|2024|2025)\b/;
const historicalReportMarkers = /(5-?year|H1 20\d{2}|Q[1-4] ?CY?20\d{2}|Annual Report 20\d{2}|2024-2029|2024-202[0-9])/i;

// Long-form citation must include the subtitle + date.
const fullCitationCue = /GCC Value Orbit/i;
const requiredSubtitle = /Delivery Engine to Enterprise Nerve Centre/i;
const requiredDate = /May 6,\s*2026/i;
// Flag lines that look like a prose source attribution but lack date/subtitle.
const sourceAttribution = /(^|[^a-z])(Source:|published)/i;

// Legacy figure check: 1,800 in non-quoted current-tense claim.
const legacyFigure = /1,?800\s+GCCs?|1,?800-?Center/i;
const quotedHistorical = /(['"`])[^'"`]*1,?800[^'"`]*\1|FY202[0-4]|earlier|historically|previously|past|prior/i;

for (const f of files) {
  const text = readFileSync(f, "utf8");
  const lines = text.split(/\r?\n/);
  lines.forEach((line, i) => {
    const lineNo = i + 1;

    // Only treat as a "flagship" citation when the line names the FY2026 report.
    const isFlagshipCitation = citationLine.test(line) && /(GCC Value Orbit|GCC Landscape in India|Landscape Report)/i.test(line);
    if (isFlagshipCitation) {
      if (staleYear.test(line) && !historicalReportMarkers.test(line) && !/2026/.test(line)) {
        errors.push(`${f}:${lineNo} Flagship Zinnov-Nasscom citation missing 2026: ${line.trim().slice(0, 200)}`);
      }
    }

    // Long-form attributions ("Source: Zinnov-Nasscom ... published ...") must contain subtitle + date.
    if (citationLine.test(line) && sourceAttribution.test(line) && fullCitationCue.test(line)) {
      if (!requiredSubtitle.test(line)) {
        errors.push(`${f}:${lineNo} Full citation missing 'Delivery Engine to Enterprise Nerve Centre' subtitle: ${line.trim().slice(0, 200)}`);
      }
      if (!requiredDate.test(line)) {
        errors.push(`${f}:${lineNo} Full citation missing 'May 6, 2026' publication date: ${line.trim().slice(0, 200)}`);
      }
    }

    // Legacy 1,800 figure used as current claim.
    if (legacyFigure.test(line) && !quotedHistorical.test(line)) {
      errors.push(`${f}:${lineNo} Legacy '1,800 GCC' figure used without historical/quoted framing: ${line.trim().slice(0, 200)}`);
    } else if (legacyFigure.test(line)) {
      warnings.push(`${f}:${lineNo} Legacy '1,800' kept (historical framing detected)`);
    }
  });
}

const fmt = (arr) => arr.map((m) => `  - ${m}`).join("\n");

console.log(`Scanned ${files.length} files.`);
if (warnings.length) {
  console.log(`\n${warnings.length} historical reference(s) preserved:`);
  console.log(fmt(warnings));
}
if (errors.length) {
  console.error(`\n${errors.length} citation issue(s) detected:`);
  console.error(fmt(errors));
  process.exit(1);
}
console.log("\nAll Zinnov-Nasscom citations are FY2026-consistent. ✅");
