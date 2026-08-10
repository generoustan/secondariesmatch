import { describe, it, expect } from "vitest";
import {
  verifyChecklist,
  checkNavStaleness,
  checkCapitalAccountReconciliation,
} from "../src/diligence/checklist.js";
import type { DocumentRecord } from "../src/domain/entities.js";

function doc(kind: DocumentRecord["kind"]): DocumentRecord {
  return { id: `${kind}-1`, kind, filename: `${kind}.pdf` };
}

describe("verifyChecklist", () => {
  it("reports complete when all required documents for the deal kind are present", () => {
    const result = verifyChecklist("lp-interest", [
      doc("lpa"),
      doc("capital-account-statement"),
      doc("quarterly-report"),
      doc("nda"),
    ]);
    expect(result.complete).toBe(true);
    expect(result.missing).toHaveLength(0);
  });

  it("lists exactly what's missing for an incomplete data room", () => {
    const result = verifyChecklist("lp-interest", [doc("lpa")]);
    expect(result.complete).toBe(false);
    expect(result.missing).toEqual(["capital-account-statement", "quarterly-report", "nda"]);
  });

  it("uses a different required set per deal kind", () => {
    const direct = verifyChecklist("direct-stake", [doc("subscription-doc"), doc("nda")]);
    expect(direct.missing).toEqual(["capital-account-statement"]);
  });
});

describe("checkNavStaleness", () => {
  it("flags a NAV reference date older than the freshness threshold", () => {
    const flag = checkNavStaleness("2025-01-01T00:00:00.000Z", new Date("2026-06-01T00:00:00.000Z"));
    expect(flag).not.toBeNull();
    expect(flag!.code).toBe("nav-stale");
  });

  it("does not flag a recent NAV reference date", () => {
    const flag = checkNavStaleness("2026-05-01T00:00:00.000Z", new Date("2026-06-01T00:00:00.000Z"));
    expect(flag).toBeNull();
  });
});

describe("checkCapitalAccountReconciliation", () => {
  it("flags a mismatch beyond tolerance", () => {
    const flag = checkCapitalAccountReconciliation(40_000_000, 35_000_000);
    expect(flag).not.toBeNull();
    expect(flag!.code).toBe("capital-account-mismatch");
  });

  it("does not flag a difference within tolerance", () => {
    const flag = checkCapitalAccountReconciliation(40_000_000, 39_900_000);
    expect(flag).toBeNull();
  });
});
