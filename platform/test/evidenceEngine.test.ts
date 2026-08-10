import { describe, it, expect } from "vitest";
import { buildEvidenceSheet, type ClosedDealRecord, type PricingQuery } from "../src/pricing/evidenceEngine.js";

function deal(overrides: Partial<ClosedDealRecord> = {}): ClosedDealRecord {
  return {
    dealId: "d1",
    assetClass: "buyout",
    vintageYear: 2017,
    geography: "North America",
    sectorFocus: ["Healthcare"],
    navUsd: 40_000_000,
    closePricePctOfNav: 90,
    closedAt: "2026-01-01T00:00:00.000Z",
    ...overrides,
  };
}

const query: PricingQuery = {
  assetClass: "buyout",
  vintageYear: 2017,
  geography: "North America",
  sectorFocus: ["Healthcare"],
  navUsd: 40_000_000,
};

describe("buildEvidenceSheet", () => {
  it("suppresses output below the minimum comparable count rather than guessing", () => {
    const corpus = [deal({ dealId: "d1" }), deal({ dealId: "d2" })];
    const sheet = buildEvidenceSheet(corpus, query);

    expect(sheet.suppressed).toBe(true);
    expect(sheet.sampleSize).toBe(2);
    expect(sheet.citations).toHaveLength(0);
    expect(sheet.medianPctOfNav).toBeUndefined();
  });

  it("produces a band with citations once the minimum sample size is met", () => {
    const corpus = [88, 90, 91, 93, 95].map((price, i) =>
      deal({ dealId: `d${i}`, closePricePctOfNav: price }),
    );
    const sheet = buildEvidenceSheet(corpus, query);

    expect(sheet.suppressed).toBe(false);
    expect(sheet.sampleSize).toBe(5);
    expect(sheet.medianPctOfNav).toBe(91);
    expect(sheet.lowPctOfNav).toBe(88);
    expect(sheet.highPctOfNav).toBe(95);
    expect(sheet.citations).toHaveLength(5);
    expect(sheet.citations.every((c) => typeof c.dealId === "string")).toBe(true);
  });

  it("excludes deals outside the vintage window even if everything else matches", () => {
    const corpus = [88, 90, 91, 93, 95].map((price, i) =>
      deal({ dealId: `d${i}`, closePricePctOfNav: price, vintageYear: 2010 }),
    );
    const sheet = buildEvidenceSheet(corpus, query);
    expect(sheet.suppressed).toBe(true);
    expect(sheet.sampleSize).toBe(0);
  });

  it("excludes deals with wildly different NAV size (outside the comparable size band)", () => {
    const corpus = [88, 90, 91, 93, 95].map((price, i) =>
      deal({ dealId: `d${i}`, closePricePctOfNav: price, navUsd: 500_000_000 }),
    );
    const sheet = buildEvidenceSheet(corpus, query);
    expect(sheet.suppressed).toBe(true);
  });

  it("respects a custom minimum sample size", () => {
    const corpus = [88, 90, 91].map((price, i) => deal({ dealId: `d${i}`, closePricePctOfNav: price }));
    const sheet = buildEvidenceSheet(corpus, query, 3);
    expect(sheet.suppressed).toBe(false);
    expect(sheet.sampleSize).toBe(3);
  });

  it("never returns a point estimate field — only a band and citations", () => {
    const corpus = [88, 90, 91, 93, 95].map((price, i) =>
      deal({ dealId: `d${i}`, closePricePctOfNav: price }),
    );
    const sheet = buildEvidenceSheet(corpus, query);
    const keys = Object.keys(sheet);
    expect(keys).not.toContain("predictedPrice");
    expect(keys).not.toContain("pointEstimate");
  });
});
