#!/usr/bin/env node
/**
 * Build-time JSON-LD validation.
 * Parses index.html, extracts every <script type="application/ld+json"> block,
 * confirms each parses as JSON, and asserts that the WebSite, Organization,
 * and Book schemas are present with their required fields.
 *
 * Exits non-zero on failure so `prebuild` blocks the deploy.
 */
import { readFileSync } from "node:fs";

const REQUIRED = {
  WebSite: ["@type", "url", "name"],
  Organization: ["@type", "name", "url"],
  Book: ["@type", "name", "author"],
};

const html = readFileSync("index.html", "utf8");
const blocks = [...html.matchAll(/<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)];

if (blocks.length === 0) {
  console.error("❌ No JSON-LD blocks found in index.html");
  process.exit(1);
}

const nodes = [];
blocks.forEach((m, i) => {
  let parsed;
  try {
    parsed = JSON.parse(m[1]);
  } catch (e) {
    console.error(`❌ JSON-LD block #${i + 1} is not valid JSON: ${e.message}`);
    process.exit(1);
  }
  const graph = Array.isArray(parsed) ? parsed : parsed["@graph"] || [parsed];
  nodes.push(...graph);
});

const errors = [];
for (const [type, fields] of Object.entries(REQUIRED)) {
  const node = nodes.find((n) => n && n["@type"] === type);
  if (!node) {
    errors.push(`Missing @type "${type}"`);
    continue;
  }
  for (const f of fields) {
    if (!node[f]) errors.push(`${type} is missing required field "${f}"`);
  }
}

if (errors.length) {
  console.error("❌ JSON-LD validation failed:");
  errors.forEach((e) => console.error(`  - ${e}`));
  process.exit(1);
}

console.log(`✅ JSON-LD valid — ${nodes.length} node(s), all required schemas present (WebSite, Organization, Book).`);
