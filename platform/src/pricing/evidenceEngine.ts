/**
 * W2 Stage 1 — indicative pricing evidence sheets.
 *
 * Phase 1 doctrine (docs/technical-roadmap.md §3.6, §4 W2): "no predictive
 * pricing model in Phase 1." This module deliberately does NOT produce a
 * point estimate or a model-generated band. It retrieves and summarizes
 * comparable closed transactions with full provenance — the same evidence
 * a banker would cite, plus the citations a banker would not give a client.
 *
 * A suppression rule is enforced in code (not policy): below the minimum
 * comparable count, the sheet reports zero evidence rather than a thin,
 * misleading sample. "We don't have enough data to price this yet" is a
 * trust-building sentence incumbents cannot say, and we should say it
 * whenever it's true.
 */

import type { AssetClass } from "../domain/entities.js";

export interface ClosedDealRecord {
  dealId: string;
  assetClass: AssetClass;
  vintageYear: number;
  geography: string;
  sectorFocus: string[];
  navUsd: number;
  closePricePctOfNav: number;
  closedAt: string;
}

export interface PricingQuery {
  assetClass: AssetClass;
  vintageYear: number;
  geography: string;
  sectorFocus: string[];
  navUsd: number;
}

export interface EvidenceCitation {
  dealId: string;
  closePricePctOfNav: number;
  closedAt: string;
  vintageYear: number;
}

export interface EvidenceSheet {
  suppressed: boolean;
  sampleSize: number;
  minimumSampleSize: number;
  medianPctOfNav?: number;
  lowPctOfNav?: number;
  highPctOfNav?: number;
  citations: EvidenceCitation[];
  disclosure: string;
}

const MINIMUM_SAMPLE_SIZE = 5;
const VINTAGE_WINDOW_YEARS = 2;
const NAV_SIZE_BAND = 0.5; // comparable if within +/-50% of NAV size, widened deliberately (small corpus)

function median(values: number[]): number {
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  const midVal = sorted[mid] as number;
  const prevVal = sorted[mid - 1] as number;
  return sorted.length % 2 !== 0 ? midVal : (prevVal + midVal) / 2;
}

function findComparables(corpus: ClosedDealRecord[], query: PricingQuery): ClosedDealRecord[] {
  return corpus.filter((deal) => {
    if (deal.assetClass !== query.assetClass) return false;
    if (Math.abs(deal.vintageYear - query.vintageYear) > VINTAGE_WINDOW_YEARS) return false;
    const navRatio = deal.navUsd / query.navUsd;
    if (navRatio < 1 - NAV_SIZE_BAND || navRatio > 1 + NAV_SIZE_BAND) return false;
    return true;
  });
}

export function buildEvidenceSheet(
  corpus: ClosedDealRecord[],
  query: PricingQuery,
  minimumSampleSize: number = MINIMUM_SAMPLE_SIZE,
): EvidenceSheet {
  const comparables = findComparables(corpus, query);

  if (comparables.length < minimumSampleSize) {
    return {
      suppressed: true,
      sampleSize: comparables.length,
      minimumSampleSize,
      citations: [],
      disclosure:
        `We don't have enough comparable closed transactions to show pricing evidence yet ` +
        `(${comparables.length} found, ${minimumSampleSize} required). This is not a gap we paper over with a model guess.`,
    };
  }

  const prices = comparables.map((d) => d.closePricePctOfNav);
  const sorted = [...prices].sort((a, b) => a - b);

  return {
    suppressed: false,
    sampleSize: comparables.length,
    minimumSampleSize,
    medianPctOfNav: Number(median(prices).toFixed(2)),
    lowPctOfNav: sorted[0] as number,
    highPctOfNav: sorted.at(-1) as number,
    citations: comparables
      .slice()
      .sort((a, b) => b.closedAt.localeCompare(a.closedAt))
      .map((d) => ({
        dealId: d.dealId,
        closePricePctOfNav: d.closePricePctOfNav,
        closedAt: d.closedAt,
        vintageYear: d.vintageYear,
      })),
    disclosure:
      `Indicative range derived from ${comparables.length} comparable closed transactions on this platform. ` +
      `Not a quote, valuation, or offer.`,
  };
}
