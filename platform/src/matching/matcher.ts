/**
 * W1 — mandate intelligence & semantic matching.
 *
 * Phase 1 doctrine (docs/technical-roadmap.md §3.6, W1): hard constraints are
 * deterministic pre-filters (architecture principle P5); only the eligible
 * set is then scored. There is no learned ranker here — that graduates to
 * Phase 2 once label volume (bids/passes/closes) clears the §8 threshold.
 * Every match carries reason codes: explainability is the product, not a
 * compliance afterthought.
 */

import type { AssetClass, Mandate } from "../domain/entities.js";

export interface ListingProfile {
  listingId: string;
  assetClass: AssetClass;
  vintageYear: number;
  geography: string;
  sectorFocus: string[];
  navUsd: number;
  askPctOfNav: number;
}

export interface FailedConstraint {
  constraint: "asset-class" | "geography" | "vintage" | "check-size" | "sector-exclude";
  detail: string;
}

export interface MatchReason {
  code:
    | "asset-class-match"
    | "geography-match"
    | "vintage-in-range"
    | "sector-overlap"
    | "within-check-size"
    | "within-discount-tolerance"
    | "discount-wider-than-tolerance";
  detail: string;
}

export interface MatchResult {
  mandateId: string;
  listingId: string;
  eligible: boolean;
  failedConstraints: FailedConstraint[];
  score: number;
  reasons: MatchReason[];
}

function hardFilter(mandate: Mandate, listing: ListingProfile): FailedConstraint[] {
  const failures: FailedConstraint[] = [];

  if (!mandate.assetClasses.includes(listing.assetClass)) {
    failures.push({
      constraint: "asset-class",
      detail: `Mandate covers ${mandate.assetClasses.join(", ")}; listing is ${listing.assetClass}.`,
    });
  }

  if (mandate.geography.length > 0 && !mandate.geography.includes(listing.geography)) {
    failures.push({
      constraint: "geography",
      detail: `Mandate targets ${mandate.geography.join(", ")}; listing is ${listing.geography}.`,
    });
  }

  if (mandate.vintageMin !== undefined && listing.vintageYear < mandate.vintageMin) {
    failures.push({
      constraint: "vintage",
      detail: `Listing vintage ${listing.vintageYear} is before mandate minimum ${mandate.vintageMin}.`,
    });
  }
  if (mandate.vintageMax !== undefined && listing.vintageYear > mandate.vintageMax) {
    failures.push({
      constraint: "vintage",
      detail: `Listing vintage ${listing.vintageYear} is after mandate maximum ${mandate.vintageMax}.`,
    });
  }

  if (listing.navUsd < mandate.checkSizeMin || listing.navUsd > mandate.checkSizeMax) {
    failures.push({
      constraint: "check-size",
      detail: `Listing NAV $${listing.navUsd.toLocaleString()} is outside mandate range $${mandate.checkSizeMin.toLocaleString()}–$${mandate.checkSizeMax.toLocaleString()}.`,
    });
  }

  if (mandate.sectorExclude?.some((s) => listing.sectorFocus.includes(s))) {
    failures.push({
      constraint: "sector-exclude",
      detail: `Listing sector overlaps a mandate exclusion.`,
    });
  }

  return failures;
}

function scoreEligible(mandate: Mandate, listing: ListingProfile): { score: number; reasons: MatchReason[] } {
  const reasons: MatchReason[] = [];
  let score = 0;

  reasons.push({ code: "asset-class-match", detail: `Matches stated asset class focus (${listing.assetClass}).` });
  score += 0.3;

  if (mandate.geography.includes(listing.geography)) {
    reasons.push({ code: "geography-match", detail: `Matches stated geography (${listing.geography}).` });
    score += 0.15;
  }

  reasons.push({
    code: "vintage-in-range",
    detail: `Vintage ${listing.vintageYear} is within stated mandate range.`,
  });
  score += 0.1;

  const sectorOverlap = mandate.sectorInclude
    ? mandate.sectorInclude.filter((s) => listing.sectorFocus.includes(s))
    : [];
  if (mandate.sectorInclude && mandate.sectorInclude.length > 0) {
    if (sectorOverlap.length > 0) {
      reasons.push({
        code: "sector-overlap",
        detail: `Overlaps stated sector focus: ${sectorOverlap.join(", ")}.`,
      });
      score += 0.2;
    }
  } else {
    // No sector preference stated — neutral, not penalized.
    score += 0.1;
  }

  reasons.push({
    code: "within-check-size",
    detail: `NAV size within stated check-size band.`,
  });
  score += 0.15;

  const discountBp = Math.round((100 - listing.askPctOfNav) * 100);
  if (discountBp <= mandate.discountToNavToleranceBp) {
    reasons.push({
      code: "within-discount-tolerance",
      detail: `Discount to NAV (${(discountBp / 100).toFixed(1)}%) is within your stated tolerance.`,
    });
    score += 0.1;
  } else {
    reasons.push({
      code: "discount-wider-than-tolerance",
      detail: `Discount to NAV (${(discountBp / 100).toFixed(1)}%) is wider than your stated tolerance — priced above your comfort band.`,
    });
  }

  return { score: Math.min(1, Number(score.toFixed(3))), reasons };
}

export function matchMandateToListing(mandate: Mandate, listing: ListingProfile): MatchResult {
  if (!mandate.active) {
    return {
      mandateId: mandate.id,
      listingId: listing.listingId,
      eligible: false,
      failedConstraints: [{ constraint: "asset-class", detail: "Mandate is inactive." }],
      score: 0,
      reasons: [],
    };
  }

  const failedConstraints = hardFilter(mandate, listing);
  if (failedConstraints.length > 0) {
    return {
      mandateId: mandate.id,
      listingId: listing.listingId,
      eligible: false,
      failedConstraints,
      score: 0,
      reasons: [],
    };
  }

  const { score, reasons } = scoreEligible(mandate, listing);
  return {
    mandateId: mandate.id,
    listingId: listing.listingId,
    eligible: true,
    failedConstraints: [],
    score,
    reasons,
  };
}

/** Buyer-facing: rank listings for a given standing mandate. */
export function rankListingsForMandate(mandate: Mandate, listings: ListingProfile[]): MatchResult[] {
  return listings
    .map((listing) => matchMandateToListing(mandate, listing))
    .filter((r) => r.eligible)
    .sort((a, b) => b.score - a.score);
}

/** Seller-facing: rank mandates for a candidate listing. */
export function rankMandatesForListing(mandates: Mandate[], listing: ListingProfile): MatchResult[] {
  return mandates
    .map((mandate) => matchMandateToListing(mandate, listing))
    .filter((r) => r.eligible)
    .sort((a, b) => b.score - a.score);
}

/**
 * Reverse matching for sellers (W1): show the count and profile of
 * qualifying live mandates *before* the seller commits to list. This
 * directly attacks the incumbent's "we know who the buyers are" pitch.
 */
export function reverseMatchPreview(
  mandates: Mandate[],
  candidateListing: ListingProfile,
): { qualifyingMandateCount: number; topReasons: MatchReason[] } {
  const results = rankMandatesForListing(mandates, candidateListing);
  return {
    qualifyingMandateCount: results.length,
    topReasons: results[0]?.reasons ?? [],
  };
}
