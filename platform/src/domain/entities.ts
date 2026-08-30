/**
 * W0 — canonical entity model for the deal graph.
 * See docs/technical-roadmap.md §4 (W0) for the source spec.
 */

export type Id = string;

export type AssetClass =
  | "buyout"
  | "venture"
  | "growth"
  | "credit"
  | "real-estate"
  | "infrastructure";

export type DealKind = "lp-interest" | "gp-led-continuation" | "direct-stake";

export interface Counterparty {
  id: Id;
  legalName: string;
  kind: "lp" | "gp" | "fund-of-funds" | "family-office" | "sovereign" | "direct-buyer";
  jurisdiction: string;
  verified: boolean;
}

export interface Fund {
  id: Id;
  name: string;
  gpManagerId: Id;
  assetClass: AssetClass;
  vintageYear: number;
  geography: string;
  sectorFocus: string[];
}

export interface LPInterest {
  id: Id;
  fundId: Id;
  sellerCounterpartyId: Id;
  reportedNav: number;
  navReferenceDate: string;
  unfundedCommitment: number;
}

export interface PortfolioCompany {
  id: Id;
  name: string;
  sector: string;
  lastPrimaryRoundValuation: number;
}

/** Structured mandate object — the machine-readable substitute for "the Rolodex" (W1). */
export interface Mandate {
  id: Id;
  buyerCounterpartyId: Id;
  assetClasses: AssetClass[];
  geography: string[];
  vintageMin?: number;
  vintageMax?: number;
  checkSizeMin: number;
  checkSizeMax: number;
  sectorInclude?: string[];
  sectorExclude?: string[];
  discountToNavToleranceBp: number;
  active: boolean;
}

export type ListingStatus = "open" | "under-offer" | "closing-soon" | "closed" | "withdrawn";

export interface Listing {
  id: Id;
  dealKind: DealKind;
  assetRef: { lpInterestId?: Id; portfolioCompanyId?: Id };
  askPricePctOfNav: number;
  status: ListingStatus;
  listedAt: string;
  illustrative: boolean;
}

export interface Bid {
  id: Id;
  listingId: Id;
  buyerCounterpartyId: Id;
  pricePctOfNav: number;
  submittedAt: string;
  withdrawn: boolean;
}

export type DealOutcome = "closed" | "withdrawn";

export interface Deal {
  id: Id;
  listingId: Id;
  winningBidId?: Id;
  outcome: DealOutcome;
  closePricePctOfNav?: number;
  daysListedToFirstBid?: number;
  daysListedToClose?: number;
  closedAt?: string;
}

/**
 * S1 (docs/category-strategy.md §2.2) — the minimum position record: a client's
 * own book, held in the Position Ledger, independent of any listing or sale.
 * This is the category-defining artifact — it must exist, fully cited, before
 * a client has decided to sell anything. Every field that came from a source
 * document carries its citation; nothing is displayed without one
 * (docs/category-strategy.md §2.2, "No cell is displayed without a citation").
 */

export type TransferabilityState = "permitted" | "consent-required" | "rofr" | "restricted";
export type ConsentState = "not-required" | "pending" | "obtained" | "denied";
export type RofrState = "not-applicable" | "pending" | "waived" | "exercised";
export type RecordStatus = "draft" | "confirmed" | "stale" | "archived";

export interface Position {
  positionId: Id;
  counterpartyId: Id;
  fundId: Id;
  managerId: Id;
  vehicleId?: Id;

  commitment: number;
  paidIn: number;
  distributions: number;
  reportedNav: number;
  navAsOf: string;
  unfunded: number;
  currency: string;

  vintage: number;
  strategy: AssetClass;
  geography: string;
  /** Sector weights; keys are sector names, values are fractional weights (should sum to ~1). */
  sectorMix: Record<string, number>;

  /** Provenance — required for any field sourced from a client document (§2.2). */
  sourceDocId?: Id;
  sourcePage?: number;
  sourceSpan?: string;
  extractionConfidence?: number;
  confirmedBy?: string;
  confirmedAt?: string;

  transferabilityState: TransferabilityState;
  consentState: ConsentState;
  rofrState: RofrState;
  restrictionExpiry?: string;
  noticePeriodDays?: number;

  /** Which counterparty/role may view this record — enforced by the entitlements module. */
  entitlementScope: Id;
  recordStatus: RecordStatus;
}

export interface DocumentRecord {
  id: Id;
  dealId?: Id;
  listingId?: Id;
  kind:
    | "lpa"
    | "side-letter"
    | "capital-account-statement"
    | "quarterly-report"
    | "transfer-agreement"
    | "subscription-doc"
    | "k-1"
    | "nda";
  filename: string;
}
