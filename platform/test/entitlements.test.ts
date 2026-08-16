import { describe, it, expect } from "vitest";
import { issueGrant, checkAccess, isExpired, EntitlementError, type EntitlementGrant } from "../src/entitlements/entitlements.js";

describe("issueGrant", () => {
  it("issues a grant within the role's action ceiling", () => {
    const grant = issueGrant({
      id: "g1",
      counterpartyId: "buyer-1",
      dealId: "d1",
      role: "buyer",
      actions: ["view-listing", "view-data-room"],
    });
    expect(grant.grantedAt).toBeTruthy();
  });

  it("refuses to issue a grant that exceeds the role's ceiling", () => {
    expect(() =>
      issueGrant({
        id: "g1",
        counterpartyId: "buyer-1",
        dealId: "d1",
        role: "buyer",
        actions: ["view-bids"],
      }),
    ).toThrow(EntitlementError);
  });
});

describe("checkAccess", () => {
  const activeGrant: EntitlementGrant = {
    id: "g1",
    counterpartyId: "buyer-1",
    dealId: "d1",
    role: "buyer",
    actions: ["view-listing", "view-data-room"],
    grantedAt: "2026-01-01T00:00:00.000Z",
  };

  it("allows an action covered by an active grant", () => {
    const result = checkAccess([activeGrant], "buyer-1", "d1", "view-data-room");
    expect(result.allowed).toBe(true);
  });

  it("denies when no grant exists at all for the counterparty/deal pair", () => {
    const result = checkAccess([activeGrant], "buyer-2", "d1", "view-listing");
    expect(result.allowed).toBe(false);
    expect(result.reason).toMatch(/No entitlement grant/);
  });

  it("denies access to a different deal even for an otherwise-entitled counterparty", () => {
    const result = checkAccess([activeGrant], "buyer-1", "d2", "view-listing");
    expect(result.allowed).toBe(false);
  });

  it("denies an action not covered even when other actions are granted", () => {
    const result = checkAccess([activeGrant], "buyer-1", "d1", "submit-bid");
    expect(result.allowed).toBe(false);
    expect(result.reason).toMatch(/No active grant authorizes/);
  });

  it("denies access once a grant has expired", () => {
    const expiring: EntitlementGrant = {
      ...activeGrant,
      expiresAt: "2026-02-01T00:00:00.000Z",
    };
    const result = checkAccess([expiring], "buyer-1", "d1", "view-data-room", new Date("2026-03-01T00:00:00.000Z"));
    expect(result.allowed).toBe(false);
    expect(result.reason).toMatch(/expired/);
  });

  it("this is the fix for the single worst failure mode: cross-deal isolation holds under multiple grants", () => {
    const grantDealA: EntitlementGrant = { ...activeGrant, dealId: "deal-A" };
    const grantDealB: EntitlementGrant = { ...activeGrant, id: "g2", dealId: "deal-B", actions: ["view-listing"] };

    // Same counterparty, entitled on both deals, but only for what each grant specifically covers.
    expect(checkAccess([grantDealA, grantDealB], "buyer-1", "deal-A", "view-data-room").allowed).toBe(true);
    expect(checkAccess([grantDealA, grantDealB], "buyer-1", "deal-B", "view-data-room").allowed).toBe(false);
  });
});

describe("isExpired", () => {
  it("treats a grant with no expiry as never expiring", () => {
    const grant: EntitlementGrant = {
      id: "g1",
      counterpartyId: "buyer-1",
      dealId: "d1",
      role: "buyer",
      actions: ["view-listing"],
      grantedAt: "2026-01-01T00:00:00.000Z",
    };
    expect(isExpired(grant, new Date("2099-01-01T00:00:00.000Z"))).toBe(false);
  });
});
