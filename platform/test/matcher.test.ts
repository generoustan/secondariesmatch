import { describe, it, expect } from "vitest";
import {
  matchMandateToListing,
  rankListingsForMandate,
  rankMandatesForListing,
  reverseMatchPreview,
  type ListingProfile,
} from "../src/matching/matcher.js";
import type { Mandate } from "../src/domain/entities.js";

function baseMandate(overrides: Partial<Mandate> = {}): Mandate {
  return {
    id: "m1",
    buyerCounterpartyId: "buyer-1",
    assetClasses: ["buyout"],
    geography: ["North America"],
    vintageMin: 2015,
    vintageMax: 2020,
    checkSizeMin: 10_000_000,
    checkSizeMax: 100_000_000,
    sectorInclude: ["Healthcare"],
    discountToNavToleranceBp: 1500,
    active: true,
    ...overrides,
  };
}

function baseListing(overrides: Partial<ListingProfile> = {}): ListingProfile {
  return {
    listingId: "l1",
    assetClass: "buyout",
    vintageYear: 2017,
    geography: "North America",
    sectorFocus: ["Healthcare"],
    navUsd: 40_000_000,
    askPctOfNav: 90,
    ...overrides,
  };
}

describe("matchMandateToListing", () => {
  it("matches when all hard constraints are satisfied", () => {
    const result = matchMandateToListing(baseMandate(), baseListing());
    expect(result.eligible).toBe(true);
    expect(result.failedConstraints).toHaveLength(0);
    expect(result.score).toBeGreaterThan(0);
    expect(result.reasons.some((r) => r.code === "sector-overlap")).toBe(true);
  });

  it("fails on asset-class mismatch with a specific reason", () => {
    const result = matchMandateToListing(baseMandate({ assetClasses: ["venture"] }), baseListing());
    expect(result.eligible).toBe(false);
    expect(result.failedConstraints[0]!.constraint).toBe("asset-class");
  });

  it("fails on geography mismatch", () => {
    const result = matchMandateToListing(baseMandate(), baseListing({ geography: "Europe" }));
    expect(result.eligible).toBe(false);
    expect(result.failedConstraints.map((f) => f.constraint)).toContain("geography");
  });

  it("fails on vintage out of range", () => {
    const result = matchMandateToListing(baseMandate({ vintageMax: 2016 }), baseListing({ vintageYear: 2019 }));
    expect(result.eligible).toBe(false);
    expect(result.failedConstraints.map((f) => f.constraint)).toContain("vintage");
  });

  it("fails on check size out of band", () => {
    const result = matchMandateToListing(baseMandate({ checkSizeMax: 20_000_000 }), baseListing({ navUsd: 40_000_000 }));
    expect(result.eligible).toBe(false);
    expect(result.failedConstraints.map((f) => f.constraint)).toContain("check-size");
  });

  it("fails on an explicit sector exclusion even if included sectors overlap", () => {
    const result = matchMandateToListing(
      baseMandate({ sectorExclude: ["Healthcare"] }),
      baseListing({ sectorFocus: ["Healthcare", "Consumer"] }),
    );
    expect(result.eligible).toBe(false);
    expect(result.failedConstraints.map((f) => f.constraint)).toContain("sector-exclude");
  });

  it("never matches an inactive mandate", () => {
    const result = matchMandateToListing(baseMandate({ active: false }), baseListing());
    expect(result.eligible).toBe(false);
  });

  it("flags a discount wider than the buyer's stated tolerance as a reason, not a hard failure", () => {
    const result = matchMandateToListing(
      baseMandate({ discountToNavToleranceBp: 500 }),
      baseListing({ askPctOfNav: 90 }),
    );
    expect(result.eligible).toBe(true);
    expect(result.reasons.some((r) => r.code === "discount-wider-than-tolerance")).toBe(true);
  });

  it("is deterministic: identical inputs always produce identical scores", () => {
    const a = matchMandateToListing(baseMandate(), baseListing());
    const b = matchMandateToListing(baseMandate(), baseListing());
    expect(a.score).toBe(b.score);
  });
});

describe("rankListingsForMandate / rankMandatesForListing", () => {
  it("ranks eligible listings by descending score and excludes ineligible ones", () => {
    const mandate = baseMandate();
    const listings = [
      baseListing({ listingId: "far-sector", sectorFocus: ["Consumer"] }),
      baseListing({ listingId: "on-thesis" }),
      baseListing({ listingId: "wrong-geo", geography: "Asia" }),
    ];

    const ranked = rankListingsForMandate(mandate, listings);
    expect(ranked.map((r) => r.listingId)).toEqual(["on-thesis", "far-sector"]);
    expect(ranked[0]!.score).toBeGreaterThanOrEqual(ranked[1]!.score);
  });

  it("ranks eligible mandates for a candidate listing (seller-facing view)", () => {
    const mandates = [baseMandate({ id: "m-a" }), baseMandate({ id: "m-b", checkSizeMax: 20_000_000 })];
    const ranked = rankMandatesForListing(mandates, baseListing());
    expect(ranked.map((r) => r.mandateId)).toEqual(["m-a"]);
  });
});

describe("reverseMatchPreview", () => {
  it("shows a seller the count and top reasons for qualifying mandates before they list", () => {
    const mandates = [baseMandate({ id: "m-a" }), baseMandate({ id: "m-b" }), baseMandate({ id: "m-c", assetClasses: ["venture"] })];
    const preview = reverseMatchPreview(mandates, baseListing());
    expect(preview.qualifyingMandateCount).toBe(2);
    expect(preview.topReasons.length).toBeGreaterThan(0);
  });

  it("reports zero qualifying mandates honestly rather than a synthetic minimum", () => {
    const preview = reverseMatchPreview([baseMandate({ assetClasses: ["venture"] })], baseListing());
    expect(preview.qualifyingMandateCount).toBe(0);
    expect(preview.topReasons).toEqual([]);
  });
});
