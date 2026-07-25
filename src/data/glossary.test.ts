import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

type GlossaryTerm = { term: string; definition: string };
type GlossaryData = { totalTerms: number; terms: GlossaryTerm[]; lastUpdated: string };

const glossary: GlossaryData = JSON.parse(
  readFileSync(resolve(process.cwd(), "public/data/gcc-glossary.json"), "utf-8"),
);

describe("glossary data", () => {
  it("declares a totalTerms count that matches the actual term list", () => {
    expect(glossary.terms.length).toBe(glossary.totalTerms);
  });

  it("has no empty terms or definitions", () => {
    for (const t of glossary.terms) {
      expect(t.term.trim().length).toBeGreaterThan(0);
      expect(t.definition.trim().length).toBeGreaterThan(10);
    }
  });

  it("has no duplicate terms (case-insensitive)", () => {
    const keys = glossary.terms.map((t) => t.term.trim().toLowerCase());
    expect(new Set(keys).size).toBe(keys.length);
  });

  it("is sorted alphabetically so the A–Z grouping renders in order", () => {
    const keys = glossary.terms.map((t) => t.term.trim().toLowerCase());
    expect(keys).toEqual([...keys].sort());
  });

  it("covers the 2025-26 regulatory concepts introduced in Chapter 144", () => {
    const terms = glossary.terms.map((t) => t.term);
    for (const expected of [
      "DPDP Act, 2023",
      "DPDP Rules, 2025",
      "Data Fiduciary",
      "Labour Codes (Four)",
      "Safe Harbour (Transfer Pricing)",
    ]) {
      expect(terms).toContain(expected);
    }
  });

  it("retains the core GCC operating-model vocabulary", () => {
    const terms = glossary.terms.map((t) => t.term);
    for (const expected of ["BOT (Build-Operate-Transfer)", "GCCaaS (GCC as a Service)"]) {
      expect(terms).toContain(expected);
    }
  });

  it("states the verified DPDP dates in its definitions", () => {
    const dpdp = glossary.terms.find((t) => t.term === "DPDP Rules, 2025");
    expect(dpdp?.definition).toContain("13 November 2025");
    expect(dpdp?.definition).toContain("13 May 2027");
  });
});
