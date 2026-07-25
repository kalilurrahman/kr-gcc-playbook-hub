import { describe, it, expect } from "vitest";
import { locations, overlapScore, sortVal, englishScore } from "./locationsData";

const REGIONS = ["Asia", "Europe (EU)", "Europe", "LATAM", "EMEA", "Middle East"];
const FITS = [
  "Scale & ownership", "EU access", "US nearshore", "Services & BPO",
  "Cost arbitrage", "EMEA nearshore", "Deep-tech", "Strategic / AI",
];
const OVERLAPS = ["High", "Medium", "Low"];

describe("locationsData integrity", () => {
  it("has a non-empty catalogue with unique names", () => {
    expect(locations.length).toBeGreaterThanOrEqual(10);
    const names = locations.map((l) => l.name);
    expect(new Set(names).size).toBe(names.length);
  });

  it("every location has valid, well-formed fields", () => {
    for (const l of locations) {
      expect(l.name.trim().length).toBeGreaterThan(0);
      expect(l.flag.trim().length).toBeGreaterThan(0);
      expect(REGIONS).toContain(l.region);
      expect(FITS).toContain(l.fit);
      expect(["Established", "Emerging"]).toContain(l.tier);
      expect(l.talentLabel.trim().length).toBeGreaterThan(0);
      expect(l.costLabel.trim().length).toBeGreaterThan(0);
      expect(l.tzLabel.trim().length).toBeGreaterThan(0);
      expect(l.bestFor.trim().length).toBeGreaterThan(0);
      expect(Number.isFinite(l.talentNum)).toBe(true);
      expect(l.talentNum).toBeGreaterThan(0);
      expect(Number.isFinite(l.costPct)).toBe(true);
      expect(l.costPct).toBeGreaterThanOrEqual(0);
      expect(Number.isFinite(l.gmt)).toBe(true);
      expect(OVERLAPS).toContain(l.usOverlap);
      expect(OVERLAPS).toContain(l.euOverlap);
      expect(l.cities.length).toBeGreaterThan(0);
      expect(l.strengths.length).toBeGreaterThan(0);
    }
  });

  it("includes India and flags the Gulf as a strategic (non-arbitrage) play", () => {
    expect(locations.find((l) => l.name === "India")).toBeDefined();
    const gulf = locations.find((l) => l.name.includes("UAE"));
    expect(gulf?.fit).toBe("Strategic / AI");
    expect(gulf?.note).toBeTruthy();
  });
});

describe("overlapScore", () => {
  it("maps overlap levels to a strict ordering", () => {
    expect(overlapScore.High).toBeGreaterThan(overlapScore.Medium);
    expect(overlapScore.Medium).toBeGreaterThan(overlapScore.Low);
    expect(overlapScore).toEqual({ High: 3, Medium: 2, Low: 1 });
  });
});

describe("sortVal", () => {
  const india = locations.find((l) => l.name === "India")!;

  it("returns the name for the name key", () => {
    expect(sortVal(india, "name")).toBe("India");
  });

  it("returns numeric values for numeric keys", () => {
    expect(sortVal(india, "talentNum")).toBe(india.talentNum);
    expect(typeof sortVal(india, "costPct")).toBe("number");
    expect(typeof sortVal(india, "gmt")).toBe("number");
  });

  it("maps overlap keys through overlapScore", () => {
    expect(sortVal(india, "usOverlap")).toBe(overlapScore[india.usOverlap]);
    expect(sortVal(india, "euOverlap")).toBe(overlapScore[india.euOverlap]);
  });

  it("orders locations by talent depth with India on top", () => {
    const sorted = [...locations].sort(
      (a, b) => (sortVal(b, "talentNum") as number) - (sortVal(a, "talentNum") as number),
    );
    expect(sorted[0].name).toBe("India");
  });
});

describe("secondary decision metrics", () => {
  it("every location carries a complete metrics block", () => {
    for (const l of locations) {
      const m = l.metrics;
      expect(m.officeLabel.trim().length).toBeGreaterThan(0);
      expect(Number.isFinite(m.officeUsdSqFt)).toBe(true);
      expect(m.officeUsdSqFt).toBeGreaterThan(0);
      expect(["Very high", "High", "Working", "Moderate"]).toContain(m.englishLevel);
      expect(m.ipPosture.trim().length).toBeGreaterThan(10);
      expect([1, 2, 3]).toContain(m.ipRank);
      expect(m.setupLabel).toMatch(/week/i);
      expect(m.setupWeeks).toBeGreaterThan(0);
    }
  });

  it("englishScore orders the bands correctly", () => {
    expect(englishScore["Very high"]).toBeGreaterThan(englishScore.High);
    expect(englishScore.High).toBeGreaterThan(englishScore.Working);
    expect(englishScore.Working).toBeGreaterThan(englishScore.Moderate);
  });

  it("sortVal resolves each new metric column", () => {
    const l = locations[0];
    expect(sortVal(l, "officeUsdSqFt")).toBe(l.metrics.officeUsdSqFt);
    expect(sortVal(l, "ipRank")).toBe(l.metrics.ipRank);
    expect(sortVal(l, "setupWeeks")).toBe(l.metrics.setupWeeks);
    expect(sortVal(l, "englishLevel")).toBe(englishScore[l.metrics.englishLevel]);
  });

  it("EU members are rated strong on IP protection", () => {
    for (const name of ["Poland", "Romania"]) {
      const l = locations.find((x) => x.name === name)!;
      expect(l.metrics.ipRank).toBe(3);
      expect(l.metrics.englishLevel).toBe("Very high");
    }
  });

  it("the Gulf shows the fastest setup and India the deepest talent", () => {
    const fastest = [...locations].sort((a, b) => a.metrics.setupWeeks - b.metrics.setupWeeks)[0];
    expect(fastest.name).toContain("UAE");
    const deepest = [...locations].sort((a, b) => b.talentNum - a.talentNum)[0];
    expect(deepest.name).toBe("India");
  });
});
