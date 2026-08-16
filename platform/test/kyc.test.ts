import { describe, it, expect } from "vitest";
import {
  meetsAccreditation,
  screenAgainstSanctionsList,
  kycCompleteness,
  evaluateCounterparty,
} from "../src/verification/kyc.js";

describe("meetsAccreditation", () => {
  it("passes an institutional qualified purchaser", () => {
    expect(meetsAccreditation({ isQualifiedPurchaser: true, isAccreditedInvestor: false, entityType: "institutional" })).toBe(true);
  });

  it("fails an individual who is not accredited", () => {
    expect(meetsAccreditation({ isQualifiedPurchaser: false, isAccreditedInvestor: false, entityType: "individual" })).toBe(false);
  });
});

describe("screenAgainstSanctionsList", () => {
  const list = [{ normalizedName: "example blocked entity", listName: "OFAC-SDN" }];

  it("matches on normalized name regardless of casing/punctuation", () => {
    const result = screenAgainstSanctionsList("Example Blocked Entity, Inc.".replace(", Inc.", ""), list);
    expect(result.matched).toBe(true);
  });

  it("does not match an unrelated name", () => {
    const result = screenAgainstSanctionsList("Meridian Capital Partners", list);
    expect(result.matched).toBe(false);
  });
});

describe("kycCompleteness", () => {
  it("reports full completeness when every field is present", () => {
    const result = kycCompleteness({
      hasLegalEntityDocuments: true,
      hasBeneficialOwnershipDisclosure: true,
      hasAccreditationEvidence: true,
      hasSanctionsScreeningOnFile: true,
    });
    expect(result.complete).toBe(true);
    expect(result.score).toBe(1);
  });

  it("lists missing fields and a partial score", () => {
    const result = kycCompleteness({
      hasLegalEntityDocuments: true,
      hasBeneficialOwnershipDisclosure: false,
      hasAccreditationEvidence: true,
      hasSanctionsScreeningOnFile: false,
    });
    expect(result.complete).toBe(false);
    expect(result.missing).toEqual(["hasBeneficialOwnershipDisclosure", "hasSanctionsScreeningOnFile"]);
    expect(result.score).toBe(0.5);
  });
});

describe("evaluateCounterparty", () => {
  const accreditation = { isQualifiedPurchaser: true, isAccreditedInvestor: false, entityType: "institutional" as const };
  const cleanScreening = { matched: false, matchedEntries: [] };
  const completeFile = {
    score: 1,
    missing: [],
    complete: true,
  };

  it("approves a fully verified, clean counterparty", () => {
    const result = evaluateCounterparty(accreditation, cleanScreening, completeFile);
    expect(result.decision).toBe("approved");
  });

  it("blocks on any sanctions/PEP match regardless of everything else", () => {
    const dirtyScreening = { matched: true, matchedEntries: [{ normalizedName: "x", listName: "OFAC-SDN" }] };
    const result = evaluateCounterparty(accreditation, dirtyScreening, completeFile);
    expect(result.decision).toBe("blocked");
    expect(result.reasons[0]).toMatch(/sanctions/);
  });

  it("returns incomplete before adjudicating accreditation when KYC file is incomplete", () => {
    const incompleteFile = { score: 0.5, missing: ["hasBeneficialOwnershipDisclosure" as const], complete: false };
    const result = evaluateCounterparty(accreditation, cleanScreening, incompleteFile);
    expect(result.decision).toBe("incomplete");
  });

  it("blocks a clean, complete file that still fails accreditation", () => {
    const unaccredited = { isQualifiedPurchaser: false, isAccreditedInvestor: false, entityType: "institutional" as const };
    const result = evaluateCounterparty(unaccredited, cleanScreening, completeFile);
    expect(result.decision).toBe("blocked");
  });
});
