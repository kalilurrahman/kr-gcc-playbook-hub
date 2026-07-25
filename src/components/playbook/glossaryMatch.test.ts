import { describe, it, expect } from "vitest";
import { aliasesFor, buildTermEntries, annotateText } from "./glossaryMatch";
import type { GlossaryTerm } from "./types";

const terms: GlossaryTerm[] = [
  { term: "BOT (Build-Operate-Transfer)", definition: "A GCC setup model." },
  { term: "BOT 2.0", definition: "An evolved BOT model." },
  { term: "GCCaaS (GCC as a Service)", definition: "Managed GCC service." },
  { term: "DPDP Rules, 2025", definition: "Notified 13 November 2025." },
  { term: "GCC (Global Capability Centre)", definition: "Too generic to annotate." },
];

const entries = buildTermEntries(terms);

describe("aliasesFor", () => {
  it("keeps the full term and the segment before a parenthetical", () => {
    expect(aliasesFor("GCCaaS (GCC as a Service)")).toEqual(
      expect.arrayContaining(["GCCaaS (GCC as a Service)", "GCCaaS"]),
    );
  });

  it("returns the term itself when there is no parenthetical", () => {
    expect(aliasesFor("DPDP Rules, 2025")).toEqual(["DPDP Rules, 2025"]);
  });

  it("drops aliases that are too generic to annotate in prose", () => {
    expect(aliasesFor("GCC (Global Capability Centre)")).not.toContain("GCC");
  });

  it("drops aliases shorter than the minimum length", () => {
    expect(aliasesFor("AI")).toEqual([]);
  });
});

describe("buildTermEntries", () => {
  it("orders longer aliases first so the most specific term wins", () => {
    const lengths = entries.map((e) => e.alias.length);
    expect(lengths).toEqual([...lengths].sort((a, b) => b - a));
  });

  it("does not produce duplicate aliases", () => {
    const keys = entries.map((e) => e.alias.toLowerCase());
    expect(new Set(keys).size).toBe(keys.length);
  });
});

describe("annotateText", () => {
  const termsIn = (text: string) =>
    annotateText(text, entries).filter((s) => s.kind === "term");

  it("returns a single text segment when nothing matches", () => {
    expect(annotateText("nothing here matches", entries)).toEqual([
      { kind: "text", value: "nothing here matches" },
    ]);
  });

  it("annotates a matched term and preserves surrounding text", () => {
    const segs = annotateText("The GCCaaS model works.", entries);
    expect(segs[0]).toEqual({ kind: "text", value: "The " });
    expect(segs[1]).toMatchObject({ kind: "term", value: "GCCaaS", term: "GCCaaS (GCC as a Service)" });
    expect(segs[2]).toEqual({ kind: "text", value: " model works." });
  });

  it("reassembles to the original text exactly", () => {
    const text = "Choosing BOT 2.0 over GCCaaS depends on DPDP Rules, 2025 exposure.";
    expect(annotateText(text, entries).map((s) => s.value).join("")).toBe(text);
  });

  it("annotates only the first occurrence of a term", () => {
    const matches = termsIn("GCCaaS is one option; GCCaaS again; and GCCaaS once more.");
    expect(matches).toHaveLength(1);
  });

  it("prefers the more specific term (BOT 2.0 over BOT)", () => {
    const segs = termsIn("The BOT 2.0 arrangement.");
    expect(segs[0]).toMatchObject({ value: "BOT 2.0", term: "BOT 2.0" });
  });

  it("does not match inside a larger word", () => {
    expect(termsIn("The ROBOTIC process is unrelated.")).toHaveLength(0);
  });

  it("matches case-insensitively", () => {
    expect(termsIn("the gccaas option")).toHaveLength(1);
  });

  it("skips generic aliases like a bare GCC", () => {
    expect(termsIn("Every GCC leader knows this.")).toHaveLength(0);
  });

  it("handles empty input and empty entry lists safely", () => {
    expect(annotateText("", entries)).toEqual([]);
    expect(annotateText("some text", [])).toEqual([{ kind: "text", value: "some text" }]);
  });

  // The compiled pattern is cached against the entries array and the regex is
  // global, so a stateful lastIndex would make later blocks silently lose
  // matches. Annotating the same text repeatedly must be idempotent.
  it("is idempotent across repeated calls with the same entries", () => {
    const text = "Choosing BOT 2.0 over GCCaaS.";
    const first = annotateText(text, entries);
    for (let i = 0; i < 5; i++) {
      expect(annotateText(text, entries)).toEqual(first);
    }
  });

  it("annotates every block independently when reusing one entries array", () => {
    const blocks = ["GCCaaS is one option.", "GCCaaS again in a new block.", "And GCCaaS here."];
    for (const b of blocks) {
      const marks = annotateText(b, entries).filter((s) => s.kind === "term");
      expect(marks).toHaveLength(1);
    }
  });
});
