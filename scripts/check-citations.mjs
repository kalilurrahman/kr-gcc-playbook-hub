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

/** @typedef {{file:string,line:number,severity:'error'|'warning',rule:string,message:string,snippet:string}} Finding */
/** @type {Finding[]} */
const findings = [];
const push = (severity, rule, file, line, message, snippet) =>
  findings.push({ severity, rule, file, line, message, snippet: snippet.trim().slice(0, 280) });

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
        push("error", "flagship-year", f, lineNo, "Flagship Zinnov-Nasscom citation missing 2026", line);
      }
    }

    if (citationLine.test(line) && sourceAttribution.test(line) && fullCitationCue.test(line)) {
      if (!requiredSubtitle.test(line)) {
        push("error", "missing-subtitle", f, lineNo, "Full citation missing 'Delivery Engine to Enterprise Nerve Centre' subtitle", line);
      }
      if (!requiredDate.test(line)) {
        push("error", "missing-date", f, lineNo, "Full citation missing 'May 6, 2026' publication date", line);
      }
    }

    if (legacyFigure.test(line) && !quotedHistorical.test(line)) {
      push("error", "legacy-1800", f, lineNo, "Legacy '1,800 GCC' figure used without historical/quoted framing", line);
    } else if (legacyFigure.test(line)) {
      push("warning", "legacy-1800-historical", f, lineNo, "Legacy '1,800' kept (historical framing detected)", line);
    }
  });
}

const errors = findings.filter((x) => x.severity === "error");
const warnings = findings.filter((x) => x.severity === "warning");

// --- Reports -----------------------------------------------------------------
mkdirSync("reports", { recursive: true });

const summary = {
  generatedAt: new Date().toISOString(),
  scannedFiles: files.length,
  errorCount: errors.length,
  warningCount: warnings.length,
  status: errors.length === 0 ? "pass" : "fail",
  rules: {
    "flagship-year": "Flagship Zinnov-Nasscom citation must include 2026.",
    "missing-subtitle": "Long-form source attributions must include the report subtitle.",
    "missing-date": "Long-form source attributions must include 'May 6, 2026'.",
    "legacy-1800": "Legacy '1,800 GCC' figures must not appear as current claims.",
    "legacy-1800-historical": "Legacy '1,800 GCC' kept with explicit historical framing.",
  },
  findings,
};

writeFileSync("reports/citation-report.json", JSON.stringify(summary, null, 2) + "\n");

const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const rowsHtml = findings
  .map(
    (x) => `      <tr class="${x.severity}">
        <td><span class="badge ${x.severity}">${x.severity}</span></td>
        <td><code>${esc(x.rule)}</code></td>
        <td><code>${esc(x.file)}:${x.line}</code></td>
        <td>${esc(x.message)}</td>
        <td><code class="snippet">${esc(x.snippet)}</code></td>
      </tr>`
  )
  .join("\n");

const html = `<!doctype html>
<html lang="en"><head><meta charset="utf-8" />
<title>Citation Report — GCC Playbook</title>
<style>
  :root { color-scheme: dark; }
  body { font: 14px/1.5 -apple-system, BlinkMacSystemFont, "Inter", sans-serif; background: #0F172A; color: #F8FAFC; margin: 0; padding: 2rem; }
  h1 { margin: 0 0 .25rem; font-size: 1.4rem; }
  .meta { color: #94A3B8; margin-bottom: 1.5rem; }
  .stats { display: flex; gap: 1rem; margin-bottom: 1.5rem; }
  .card { background: #1E293B; border: 1px solid #334155; border-radius: 12px; padding: 1rem 1.25rem; min-width: 140px; }
  .card .num { font-size: 1.6rem; font-weight: 700; }
  .pass { color: #34A853; } .fail { color: #ef4444; }
  table { width: 100%; border-collapse: collapse; background: #1E293B; border: 1px solid #334155; border-radius: 12px; overflow: hidden; }
  th, td { padding: .6rem .75rem; text-align: left; border-bottom: 1px solid #334155; vertical-align: top; }
  th { background: #0F172A; font-weight: 600; color: #94A3B8; text-transform: uppercase; font-size: 11px; letter-spacing: .05em; }
  tr.error td { background: rgba(239,68,68,.05); }
  tr.warning td { background: rgba(244,180,0,.05); }
  .badge { display: inline-block; padding: 2px 8px; border-radius: 999px; font-size: 11px; font-weight: 600; text-transform: uppercase; }
  .badge.error { background: #ef4444; color: #fff; }
  .badge.warning { background: #F4B400; color: #0F172A; }
  code { font: 12px "JetBrains Mono", Menlo, monospace; color: #F8FAFC; }
  code.snippet { color: #94A3B8; white-space: pre-wrap; word-break: break-word; }
  footer { margin-top: 1.5rem; color: #475569; font-size: 12px; }
</style></head>
<body>
  <h1>Citation Report — Zinnov-Nasscom FY2026 Consistency</h1>
  <div class="meta">Generated ${esc(summary.generatedAt)} · Scanned ${summary.scannedFiles} files</div>
  <div class="stats">
    <div class="card"><div>Status</div><div class="num ${summary.status === "pass" ? "pass" : "fail"}">${summary.status.toUpperCase()}</div></div>
    <div class="card"><div>Errors</div><div class="num fail">${summary.errorCount}</div></div>
    <div class="card"><div>Warnings</div><div class="num">${summary.warningCount}</div></div>
  </div>
  ${findings.length === 0 ? "<p>No findings. ✅</p>" : `<table>
    <thead><tr><th>Severity</th><th>Rule</th><th>Location</th><th>Message</th><th>Snippet</th></tr></thead>
    <tbody>
${rowsHtml}
    </tbody>
  </table>`}
  <footer>Generated by <code>scripts/check-citations.mjs</code> · GCC Playbook</footer>
</body></html>
`;
writeFileSync("reports/citation-report.html", html);

// --- Console output ----------------------------------------------------------
const fmt = (arr) => arr.map((m) => `  - ${m.file}:${m.line} [${m.rule}] ${m.message}`).join("\n");
console.log(`Scanned ${files.length} files. Reports written to reports/citation-report.{json,html}`);
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
