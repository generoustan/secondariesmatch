import { describe, it, expect } from "vitest";
import { PositionLedger, PositionLedgerError, applyPositionEvents } from "../src/ledger/positionLedger.js";
import type { PositionCoreFields, Citation } from "../src/ledger/positionEvents.js";

function coreFields(overrides: Partial<PositionCoreFields> = {}): PositionCoreFields {
  return {
    counterpartyId: "cp-1",
    fundId: "fund-1",
    managerId: "gp-1",
    commitment: 50_000_000,
    paidIn: 42_000_000,
    distributions: 8_000_000,
    reportedNav: 40_000_000,
    navAsOf: "2026-06-30T00:00:00.000Z",
    unfunded: 8_000_000,
    currency: "USD",
    vintage: 2018,
    strategy: "buyout",
    geography: "North America",
    sectorMix: { Healthcare: 0.6, Consumer: 0.4 },
    transferabilityState: "consent-required",
    consentState: "pending",
    rofrState: "not-applicable",
    entitlementScope: "cp-1",
    ...overrides,
  };
}

function citation(overrides: Partial<Citation> = {}): Citation {
  return { sourceDocId: "doc-1", sourcePage: 3, sourceSpan: "Schedule A, line 4", ...overrides };
}

describe("PositionLedger — creation and citation enforcement", () => {
  it("creates a draft position when a valid citation is provided", () => {
    const ledger = new PositionLedger();
    const position = ledger.createPosition("pos-1", coreFields(), citation());

    expect(position.recordStatus).toBe("draft");
    expect(position.sourceDocId).toBe("doc-1");
    expect(ledger.currentPositions()).toHaveLength(1);
  });

  it("refuses to create a position without a well-formed citation", () => {
    const ledger = new PositionLedger();
    expect(() => ledger.createPosition("pos-1", coreFields(), citation({ sourceSpan: "" }))).toThrow(
      PositionLedgerError,
    );
    expect(() => ledger.createPosition("pos-1", coreFields(), citation({ sourcePage: 0 }))).toThrow(
      PositionLedgerError,
    );
    expect(ledger.currentPositions()).toHaveLength(0);
  });

  it("refuses to create the same position twice", () => {
    const ledger = new PositionLedger();
    ledger.createPosition("pos-1", coreFields(), citation());
    expect(() => ledger.createPosition("pos-1", coreFields(), citation())).toThrow(PositionLedgerError);
  });
});

describe("PositionLedger — confirmation and updates", () => {
  it("confirms a position with a named reviewer", () => {
    const ledger = new PositionLedger();
    ledger.createPosition("pos-1", coreFields(), citation());
    const confirmed = ledger.confirmPosition("pos-1", "analyst-jane-doe");

    expect(confirmed.recordStatus).toBe("confirmed");
    expect(confirmed.confirmedBy).toBe("analyst-jane-doe");
    expect(confirmed.confirmedAt).toBeTruthy();
  });

  it("refuses to confirm a position that does not exist", () => {
    const ledger = new PositionLedger();
    expect(() => ledger.confirmPosition("ghost", "analyst-1")).toThrow(PositionLedgerError);
  });

  it("updates transferability state with a fresh citation", () => {
    const ledger = new PositionLedger();
    ledger.createPosition("pos-1", coreFields(), citation());
    const updated = ledger.updateTransferability(
      "pos-1",
      { transferabilityState: "rofr", consentState: "not-required", rofrState: "pending", noticePeriodDays: 30 },
      citation({ sourcePage: 12, sourceSpan: "LPA §8.2" }),
      "analyst-jane-doe",
    );

    expect(updated.transferabilityState).toBe("rofr");
    expect(updated.noticePeriodDays).toBe(30);
    expect(updated.sourcePage).toBe(12);
  });

  it("refuses a transferability update without a citation", () => {
    const ledger = new PositionLedger();
    ledger.createPosition("pos-1", coreFields(), citation());
    expect(() =>
      ledger.updateTransferability(
        "pos-1",
        { transferabilityState: "rofr", consentState: "not-required", rofrState: "pending" },
        citation({ sourceSpan: "" }),
        "analyst-1",
      ),
    ).toThrow(PositionLedgerError);
  });

  it("updates NAV with its own citation", () => {
    const ledger = new PositionLedger();
    ledger.createPosition("pos-1", coreFields(), citation());
    const updated = ledger.updateNav("pos-1", 41_500_000, "2026-09-30T00:00:00.000Z", citation({ sourcePage: 2 }));
    expect(updated.reportedNav).toBe(41_500_000);
    expect(updated.navAsOf).toBe("2026-09-30T00:00:00.000Z");
  });

  it("archives a position", () => {
    const ledger = new PositionLedger();
    ledger.createPosition("pos-1", coreFields(), citation());
    const archived = ledger.archive("pos-1", "client requested deletion under intake agreement");
    expect(archived.recordStatus).toBe("archived");
  });
});

describe("PositionLedger — the S1 gate: rebuild from events matches live state", () => {
  it("holds after a realistic sequence of operations", () => {
    const ledger = new PositionLedger();
    ledger.createPosition("pos-1", coreFields(), citation());
    ledger.createPosition("pos-2", coreFields({ fundId: "fund-2" }), citation({ sourceDocId: "doc-2" }));
    ledger.confirmPosition("pos-1", "analyst-jane-doe");
    ledger.updateTransferability(
      "pos-1",
      { transferabilityState: "rofr", consentState: "not-required", rofrState: "waived" },
      citation({ sourcePage: 9, sourceSpan: "LPA §8.2" }),
      "analyst-jane-doe",
    );
    ledger.updateNav("pos-2", 12_000_000, "2026-09-30T00:00:00.000Z", citation({ sourceDocId: "doc-2" }));
    ledger.archive("pos-2", "position fully redeemed");

    expect(ledger.rebuildMatchesLiveState()).toBe(true);

    // Independently recompute from the raw event log and compare directly —
    // this is the actual gate, not just a boolean the class asserts about itself.
    const rebuilt = applyPositionEvents(ledger.events().map((e) => e.payload));
    expect(rebuilt.size).toBe(ledger.currentPositions().length);
    for (const position of ledger.currentPositions()) {
      expect(rebuilt.get(position.positionId)).toEqual(position);
    }
  });

  it("fails after tampering with the underlying event log", () => {
    const ledger = new PositionLedger();
    ledger.createPosition("pos-1", coreFields(), citation());
    ledger.confirmPosition("pos-1", "analyst-jane-doe");

    const events = ledger.events() as any[];
    events[1] = { ...events[1], payload: { ...events[1].payload, confirmedBy: "someone-else" } };

    // The hash chain itself should now be broken...
    expect(ledger.verifyChain().valid).toBe(false);
    // ...and a rebuild from the (now-tampered) event list no longer matches
    // what the ledger's own live state says happened.
    expect(ledger.rebuildMatchesLiveState()).toBe(false);
  });
});
