import { describe, it, expect } from "vitest";
import { computeBenchmarkSeries, platformDataShare } from "../src/pricing/benchmark.js";
import type { ClosedDealRecord } from "../src/pricing/evidenceEngine.js";

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

describe("computeBenchmarkSeries", () => {
  it("suppresses any segment below the k-anonymity threshold", () => {
    const corpus = [deal({ dealId: "d1" }), deal({ dealId: "d2" })];
    const series = computeBenchmarkSeries(corpus, 5);
    expect(series).toHaveLength(0);
  });

  it("publishes a segment once it clears the threshold, with correct percentiles", () => {
    const prices = [80, 85, 90, 95, 100];
    const corpus = prices.map((p, i) => deal({ dealId: `d${i}`, closePricePctOfNav: p }));
    const series = computeBenchmarkSeries(corpus, 5);

    expect(series).toHaveLength(1);
    expect(series[0]!.n).toBe(5);
    expect(series[0]!.medianPctOfNav).toBe(90);
    expect(series[0]!.vintageBucket).toBe("2016-2018");
  });

  it("segments independently by asset class, vintage bucket, and geography", () => {
    const buyoutNA = [80, 85, 90, 95, 100].map((p, i) => deal({ dealId: `bna${i}`, closePricePctOfNav: p }));
    const ventureEU = [60, 65, 70, 75, 80].map((p, i) =>
      deal({ dealId: `veu${i}`, assetClass: "venture", geography: "Europe", closePricePctOfNav: p }),
    );
    const tooFewCredit = [deal({ dealId: "c1", assetClass: "credit" })];

    const series = computeBenchmarkSeries([...buyoutNA, ...ventureEU, ...tooFewCredit], 5);
    expect(series).toHaveLength(2);
    expect(series.map((s) => s.assetClass).sort()).toEqual(["buyout", "venture"]);
  });

  it("uses a custom minK threshold when provided", () => {
    const corpus = [90, 92, 94].map((p, i) => deal({ dealId: `d${i}`, closePricePctOfNav: p }));
    expect(computeBenchmarkSeries(corpus, 5)).toHaveLength(0);
    expect(computeBenchmarkSeries(corpus, 3)).toHaveLength(1);
  });
});

describe("platformDataShare", () => {
  it("is zero with no data at all", () => {
    expect(platformDataShare(0, 0)).toBe(0);
  });

  it("computes the fraction of platform-realized vs. external-prior evidence", () => {
    expect(platformDataShare(3, 7)).toBe(0.3);
    expect(platformDataShare(10, 0)).toBe(1);
  });
});
