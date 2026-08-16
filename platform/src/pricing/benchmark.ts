/**
 * W9 / W2 Stage 3 — published benchmark series.
 *
 * Aggregates the closed-deal corpus into segments (asset class x vintage
 * bucket x geography) with a hard k-anonymity threshold enforced in code,
 * per docs/technical-roadmap.md §4 (W9): "aggregation thresholds enforced
 * in code, not policy; re-identification testing before every release."
 * A segment below the threshold is omitted entirely from the published
 * series rather than shown with a caveat — small-cell suppression is the
 * whole point.
 */

import type { ClosedDealRecord } from "./evidenceEngine.js";

export interface BenchmarkSegment {
  assetClass: string;
  vintageBucket: string;
  geography: string;
  n: number;
  medianPctOfNav: number;
  p25PctOfNav: number;
  p75PctOfNav: number;
}

export const DEFAULT_MIN_K = 5;

function vintageBucket(year: number): string {
  const bucketStart = Math.floor(year / 3) * 3;
  return `${bucketStart}-${bucketStart + 2}`;
}

function percentile(sorted: number[], p: number): number {
  if (sorted.length === 1) return sorted[0] as number;
  const idx = (sorted.length - 1) * p;
  const lo = Math.floor(idx);
  const hi = Math.ceil(idx);
  const loVal = sorted[lo] as number;
  const hiVal = sorted[hi] as number;
  if (lo === hi) return loVal;
  return loVal + (hiVal - loVal) * (idx - lo);
}

export function computeBenchmarkSeries(
  corpus: ClosedDealRecord[],
  minK: number = DEFAULT_MIN_K,
): BenchmarkSegment[] {
  const groups = new Map<string, ClosedDealRecord[]>();

  for (const deal of corpus) {
    const key = `${deal.assetClass}|${vintageBucket(deal.vintageYear)}|${deal.geography}`;
    const bucket = groups.get(key) ?? [];
    bucket.push(deal);
    groups.set(key, bucket);
  }

  const series: BenchmarkSegment[] = [];
  for (const [key, deals] of groups) {
    if (deals.length < minK) continue; // hard suppression — no exceptions

    const [assetClass = "", vintage = "", geography = ""] = key.split("|");
    const prices = deals.map((d) => d.closePricePctOfNav).sort((a, b) => a - b);

    series.push({
      assetClass,
      vintageBucket: vintage,
      geography,
      n: deals.length,
      medianPctOfNav: Number(percentile(prices, 0.5).toFixed(2)),
      p25PctOfNav: Number(percentile(prices, 0.25).toFixed(2)),
      p75PctOfNav: Number(percentile(prices, 0.75).toFixed(2)),
    });
  }

  return series.sort((a, b) =>
    a.assetClass.localeCompare(b.assetClass) || a.vintageBucket.localeCompare(b.vintageBucket),
  );
}

/**
 * Platform-data share: what fraction of a query's evidence rests on
 * platform-realized transactions vs. an externally-sourced prior. Per
 * §7 (Cold-Start Reality Check), publishing this share — and watching it
 * climb toward 100% — is the credibility metric the whole benchmark rests on.
 */
export function platformDataShare(platformRealizedCount: number, externalPriorCount: number): number {
  const total = platformRealizedCount + externalPriorCount;
  if (total === 0) return 0;
  return Number((platformRealizedCount / total).toFixed(4));
}
