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
