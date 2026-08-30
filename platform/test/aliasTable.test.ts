import { describe, it, expect } from "vitest";
import { AliasTable, normalizeEntityName, nameSimilarity } from "../src/resolution/aliasTable.js";

describe("normalizeEntityName", () => {
  it("collapses case, punctuation, and legal-suffix variants to the same key", () => {
    expect(normalizeEntityName("Meridian Capital Partners VII, L.P.")).toBe(
      normalizeEntityName("meridian capital partners vii lp"),
    );
    expect(normalizeEntityName("Acme Holdings, Inc.")).toBe(normalizeEntityName("ACME HOLDINGS INC"));
  });

  it("does not collapse genuinely different names", () => {
    expect(normalizeEntityName("Meridian Capital Partners VII")).not.toBe(
      normalizeEntityName("Meridian Capital Partners VIII"),
    );
  });
});

describe("nameSimilarity", () => {
  it("is 1 for exact matches after normalization", () => {
    expect(nameSimilarity("Meridian Capital Partners VII, L.P.", "Meridian Capital Partners VII LP")).toBe(1);
  });

  it("is high but not 1 for a near-miss typo", () => {
    const score = nameSimilarity("Meridian Capital Partners VII", "Meridain Capital Partners VII");
    expect(score).toBeGreaterThan(0.85);
    expect(score).toBeLessThan(1);
  });

  it("is low for unrelated names", () => {
    expect(nameSimilarity("Meridian Capital Partners VII", "Blackstone Real Estate Fund IX")).toBeLessThan(0.4);
  });
});

describe("AliasTable — deterministic normalization resolves automatically", () => {
  it("resolves a punctuation/suffix variant of a registered canonical name with no human step", () => {
    const table = new AliasTable();
    table.registerCanonical("gp-1", "Meridian Capital Partners VII, L.P.");

    expect(table.resolve("Meridian Capital Partners VII LP")).toBe("gp-1");
    expect(table.resolve("meridian capital partners vii")).toBe("gp-1");
  });
});

describe("AliasTable — fuzzy matches never auto-resolve", () => {
  it("does not resolve an unconfirmed near-miss, even at high similarity", () => {
    const table = new AliasTable();
    table.registerCanonical("gp-1", "Meridian Capital Partners VII");

    expect(table.resolve("Meridain Capital Partners VII")).toBeUndefined();
  });

  it("surfaces the near-miss as a ranked candidate for human review", () => {
    const table = new AliasTable();
    table.registerCanonical("gp-1", "Meridian Capital Partners VII");
    table.registerCanonical("gp-2", "Blackstone Real Estate Fund IX");

    const candidates = table.generateCandidates("Meridain Capital Partners VII");
    expect(candidates[0]!.canonicalId).toBe("gp-1");
    expect(candidates.some((c) => c.canonicalId === "gp-2")).toBe(false);
  });

  it("resolves only after a named human confirms the alias", () => {
    const table = new AliasTable();
    table.registerCanonical("gp-1", "Meridian Capital Partners VII");

    table.confirmAlias("Meridain Capital Partners VII", "gp-1", "analyst-jane-doe");

    expect(table.resolve("Meridain Capital Partners VII")).toBe("gp-1");
    expect(table.confirmations()).toHaveLength(1);
    expect(table.confirmations()[0]!.confirmedBy).toBe("analyst-jane-doe");
  });

  it("refuses to confirm an alias against an unregistered canonical entity", () => {
    const table = new AliasTable();
    expect(() => table.confirmAlias("Some Fund", "unknown-gp", "analyst-1")).toThrow();
  });
});
