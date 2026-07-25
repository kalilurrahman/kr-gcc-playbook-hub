#!/usr/bin/env node
/**
 * Resource link-health sweep.
 *
 * Checks every external URL referenced by the resource library and the dashboard
 * cards, and classifies the result. Designed to run in CI (which has outbound
 * network) rather than locally, and to be *advisory*: it exits 0 unless --strict
 * is passed, so a flaky third-party host can never block a build.
 *
 * Classification matters more than raw status codes here. Many authoritative GCC
 * sources sit behind bot protection and answer 403/429 to any automated client
 * while being perfectly healthy in a browser (BCG, Zinnov and NASSCOM all do
 * this). Treating those as broken would produce a permanently noisy report, so
 * they are reported separately from genuine failures.
 *
 *   ok      — 2xx/3xx
 *   blocked — 401/403/429, or a bot-wall: live, not actionable
 *   broken  — 404/410: actionable, the link is genuinely gone
 *   error   — DNS failure, connection reset, timeout: needs a human look
 *
 * Usage:
 *   node scripts/check-links.mjs             # advisory, exit 0
 *   node scripts/check-links.mjs --strict    # exit 1 if any `broken`
 *   node scripts/check-links.mjs --limit=25  # sample the first N (smoke test)
 */
import { readFileSync, mkdirSync, writeFileSync } from "node:fs";

const args = process.argv.slice(2);
const STRICT = args.includes("--strict");
const LIMIT = Number((args.find((a) => a.startsWith("--limit=")) || "").split("=")[1]) || 0;
const CONCURRENCY = 8;
const TIMEOUT_MS = 20000;
const UA =
  "Mozilla/5.0 (compatible; gcc-playbook-linkcheck/1.0; +https://gcc-playbook.kalilurrahman.com)";

// --- Collect URLs with enough context to make the report actionable ----------

/** @type {Map<string, {url:string, label:string, source:string}>} */
const targets = new Map();

const addTarget = (url, label, source) => {
  const clean = url.replace(/[.,);]+$/, "");
  if (!/^https?:\/\//i.test(clean)) return;
  if (!targets.has(clean)) targets.set(clean, { url: clean, label, source });
};

// resourcesData.ts — structured entries: { category, type, url, name }
const resources = readFileSync("src/data/resourcesData.ts", "utf8");
for (const line of resources.split(/\r?\n/)) {
  const url = line.match(/url:\s*"([^"]+)"/)?.[1];
  if (!url) continue;
  const name = line.match(/name:\s*"([^"]+)"/)?.[1] || "";
  const category = line.match(/category:\s*"([^"]+)"/)?.[1] || "";
  addTarget(url, name || category, `resourcesData.ts${category ? ` · ${category}` : ""}`);
}

// gccData.ts — URLs embedded in card detail strings.
const gccData = readFileSync("src/data/gccData.ts", "utf8");
for (const line of gccData.split(/\r?\n/)) {
  for (const m of line.matchAll(/https?:\/\/[^\s"'<>)]+/g)) {
    const before = line.slice(0, m.index).match(/"([^"]{0,90})$/)?.[1] || "";
    addTarget(m[0], before.replace(/\s*[:—-]\s*$/, "").trim() || "dashboard card", "gccData.ts");
  }
}

let list = [...targets.values()].sort((a, b) => a.url.localeCompare(b.url));
if (LIMIT) list = list.slice(0, LIMIT);

// --- Check ------------------------------------------------------------------

const BOT_WALL = /captcha|are you a human|access denied|request unsuccessful|cf-browser-verification/i;

async function once(url, method) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(url, {
      method,
      redirect: "follow",
      signal: ctrl.signal,
      headers: {
        "user-agent": UA,
        accept: "text/html,application/xhtml+xml,application/pdf,*/*",
        // Ask for only the first bytes on GET so we never pull whole PDFs.
        ...(method === "GET" ? { range: "bytes=0-2048" } : {}),
      },
    });
    let body = "";
    if (method === "GET" && res.headers.get("content-type")?.includes("text/html")) {
      body = (await res.text()).slice(0, 2048);
    }
    return { status: res.status, finalUrl: res.url, body };
  } finally {
    clearTimeout(timer);
  }
}

function classify(status, body) {
  if (status >= 200 && status < 400) {
    return BOT_WALL.test(body || "") ? "blocked" : "ok";
  }
  if (status === 404 || status === 410) return "broken";
  if (status === 401 || status === 403 || status === 429) return "blocked";
  return "error";
}

async function check(target) {
  let last = null;
  for (const method of ["HEAD", "GET"]) {
    try {
      const r = await once(target.url, method);
      last = r;
      // Some servers reject HEAD outright — retry with GET before judging.
      if (method === "HEAD" && [403, 404, 405, 429, 501].includes(r.status)) continue;
      return { ...target, status: r.status, verdict: classify(r.status, r.body), finalUrl: r.finalUrl };
    } catch (e) {
      last = { error: e?.name === "AbortError" ? "timeout" : String(e?.cause?.code || e?.message || e) };
    }
  }
  if (last?.status) {
    return { ...target, status: last.status, verdict: classify(last.status, last.body), finalUrl: last.finalUrl };
  }
  return { ...target, status: 0, verdict: "error", detail: last?.error || "unknown" };
}

async function run(items, worker, concurrency) {
  const out = [];
  let i = 0;
  await Promise.all(
    Array.from({ length: Math.min(concurrency, items.length) }, async () => {
      while (i < items.length) {
        const idx = i++;
        out[idx] = await worker(items[idx]);
      }
    }),
  );
  return out;
}

console.log(`Checking ${list.length} URLs (concurrency ${CONCURRENCY}, timeout ${TIMEOUT_MS}ms)…`);
const results = await run(list, check, CONCURRENCY);

const by = (v) => results.filter((r) => r.verdict === v);
const broken = by("broken");
const errored = by("error");
const blocked = by("blocked");
const ok = by("ok");

// --- Report -----------------------------------------------------------------

mkdirSync("reports", { recursive: true });

const summary = {
  generatedAt: new Date().toISOString(),
  checked: results.length,
  counts: { ok: ok.length, blocked: blocked.length, broken: broken.length, error: errored.length },
  note:
    "`blocked` (401/403/429 or a bot wall) means the host refuses automated clients; " +
    "those links are typically healthy in a browser and are not actionable. " +
    "Only `broken` (404/410) and `error` (DNS/timeout) need attention.",
  broken,
  error: errored,
  blocked: blocked.map(({ url, label, status }) => ({ url, label, status })),
};
writeFileSync("reports/link-health.json", JSON.stringify(summary, null, 2) + "\n");

const rows = (items) =>
  items.length
    ? items
        .map((r) => `| ${r.status || r.detail || "—"} | [${(r.label || "").slice(0, 60)}](${r.url}) | \`${r.source}\` |`)
        .join("\n")
    : "| — | _none_ | |";

const md = `# Resource link health

Checked **${results.length}** URLs — ${ok.length} ok · ${blocked.length} blocked (bot protection) · **${broken.length} broken** · ${errored.length} errors.

> \`blocked\` means the host refuses automated clients (401/403/429 or a CAPTCHA wall).
> Those links are usually fine in a browser and need no action. Only **broken** and
> **error** entries below are actionable.

## Broken (404/410) — action needed

| Status | Resource | Source |
| --- | --- | --- |
${rows(broken)}

## Errors (DNS / timeout / reset) — needs a look

| Status | Resource | Source |
| --- | --- | --- |
${rows(errored)}

<details>
<summary>Blocked by bot protection (${blocked.length}) — informational</summary>

| Status | Resource | Source |
| --- | --- | --- |
${rows(blocked)}

</details>
`;
writeFileSync("reports/link-health.md", md);

console.log(
  `\n${ok.length} ok · ${blocked.length} blocked · ${broken.length} broken · ${errored.length} error`,
);
if (broken.length) {
  console.log("\nBroken links:");
  for (const r of broken) console.log(`  [${r.status}] ${r.url}  (${r.label})`);
}
if (errored.length) {
  console.log("\nErrors:");
  for (const r of errored) console.log(`  [${r.detail || r.status}] ${r.url}`);
}
console.log("\nReports written to reports/link-health.{json,md}");

if (STRICT && broken.length) {
  console.error(`\n${broken.length} broken link(s) — failing because --strict was passed.`);
  process.exit(1);
}
