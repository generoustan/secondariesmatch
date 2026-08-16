import { describe, it, expect } from "vitest";
import { AuditLedger } from "../src/domain/auditLedger.js";

describe("AuditLedger", () => {
  it("chains records and verifies as valid when untampered", () => {
    const ledger = new AuditLedger();
    ledger.append({
      capabilityId: "mandate-matching",
      riskTier: "T1",
      dealId: "d1",
      actorId: "system",
      action: "generated-match-ranking",
    });
    ledger.append({
      capabilityId: "pricing-evidence",
      riskTier: "T1",
      dealId: "d1",
      actorId: "system",
      action: "generated-evidence-sheet",
      reviewerId: "analyst-1",
      reviewAction: "accept",
    });

    const check = ledger.verifyChain();
    expect(check.valid).toBe(true);
    expect(ledger.all()).toHaveLength(2);
    expect(ledger.all()[1]!.prevHash).toBe(ledger.all()[0]!.hash);
  });

  it("detects tampering when a record is mutated after the fact", () => {
    const ledger = new AuditLedger();
    ledger.append({
      capabilityId: "doc-generation",
      riskTier: "T2",
      dealId: "d1",
      actorId: "system",
      action: "generated-nda-draft",
      reviewerId: "counsel-1",
      reviewAction: "edit",
    });
    ledger.append({
      capabilityId: "doc-generation",
      riskTier: "T2",
      dealId: "d1",
      actorId: "system",
      action: "transmitted-nda",
    });

    // Individual records are frozen (mutation throws), so a real tamper attempt
    // has to *replace* a record wholesale, forging every field except the hash
    // it can't recompute correctly. That's exactly what verifyChain must catch.
    const records = ledger.all() as any[];
    records[0] = { ...records[0], action: "generated-nda-draft-BACKDATED" };

    const check = ledger.verifyChain();
    expect(check.valid).toBe(false);
    expect(check.brokenAtSeq).toBe(0);
  });

  it("computes reviewer override rate per capability", () => {
    const ledger = new AuditLedger();
    for (const reviewAction of ["accept", "accept", "edit", "reject"] as const) {
      ledger.append({
        capabilityId: "doc-generation",
        riskTier: "T2",
        actorId: "system",
        action: "generated-draft",
        reviewerId: "r1",
        reviewAction,
      });
    }

    expect(ledger.overrideRate("doc-generation")).toBe(0.5);
    expect(ledger.overrideRate("unused-capability")).toBe(0);
  });
});
