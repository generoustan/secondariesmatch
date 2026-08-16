import { describe, it, expect } from "vitest";
import { assembleDocument, signOff, isReadyToTransmit, requestClauseReview, redlineDistance } from "../src/documents/generator.js";
import { getClause } from "../src/documents/clauseLibrary.js";

describe("assembleDocument", () => {
  it("fills variable slots and inserts approved clauses verbatim", () => {
    const doc = assembleDocument("nda", {
      counterpartyLegalName: "Meridian Capital Partners VII, L.P.",
      effectiveDate: "2026-08-10",
    });

    expect(doc.templateType).toBe("nda");
    expect(doc.fullText).toContain("Meridian Capital Partners VII, L.P.");
    expect(doc.fullText).toContain(getClause("confidentiality-standard").text);
    expect(doc.signedOffBy).toBeUndefined();
  });

  it("throws when a required variable is missing rather than silently omitting it", () => {
    expect(() => assembleDocument("nda", { effectiveDate: "2026-08-10" })).toThrow(/counterpartyLegalName/);
  });

  it("cannot reference a clause outside the approved library", () => {
    expect(() => getClause("free-text-anything")).toThrow(/not in the approved library/);
  });

  it("is not transmittable until a named reviewer signs off", () => {
    const doc = assembleDocument("teaser", {
      fundOrCompanyName: "Northbridge Buyout Fund IV",
      assetClass: "buyout",
      overview: "Diversified North American buyout fund, 2017 vintage.",
      keyMetrics: "$84.2M NAV, 93% ask.",
    });
    expect(isReadyToTransmit(doc)).toBe(false);

    const signed = signOff(doc, "analyst-jane-doe");
    expect(isReadyToTransmit(signed)).toBe(true);
    expect(signed.signedOffBy).toBe("analyst-jane-doe");
  });
});

describe("requestClauseReview", () => {
  it("routes an unapproved term to counsel instead of generating it", () => {
    const request = requestClauseReview(
      "Buyer shall indemnify seller for any and all claims arising from...",
      "analyst-jane-doe",
    );
    expect(request.status).toBe("pending-counsel-review");
    expect(request.requestedBy).toBe("analyst-jane-doe");
  });
});

describe("redlineDistance", () => {
  it("is zero when the transmitted text exactly matches the generated draft", () => {
    const doc = assembleDocument("nda", {
      counterpartyLegalName: "Acme LP",
      effectiveDate: "2026-08-10",
    });
    expect(redlineDistance(doc, doc.fullText)).toBe(0);
  });

  it("increases with the number of edited words", () => {
    const doc = assembleDocument("nda", {
      counterpartyLegalName: "Acme LP",
      effectiveDate: "2026-08-10",
    });
    const lightlyEdited = doc.fullText.replace("Acme LP", "Acme Capital LP");
    const heavilyEdited = "This is an entirely different document with almost no overlapping words at all.";

    const lightDistance = redlineDistance(doc, lightlyEdited);
    const heavyDistance = redlineDistance(doc, heavilyEdited);

    expect(lightDistance).toBeGreaterThan(0);
    expect(heavyDistance).toBeGreaterThan(lightDistance);
  });
});
