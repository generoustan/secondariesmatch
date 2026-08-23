import { describe, it, expect } from "vitest";
import { HashChainedLog } from "../src/domain/hashChainedLog.js";

describe("HashChainedLog", () => {
  it("chains entries and verifies valid when untampered", () => {
    const log = new HashChainedLog<{ note: string }>();
    log.append({ note: "first" });
    log.append({ note: "second" });

    expect(log.all()).toHaveLength(2);
    expect(log.all()[1]!.prevHash).toBe(log.all()[0]!.hash);
    expect(log.verifyChain().valid).toBe(true);
  });

  it("freezes the entry envelope so its own fields can't be reassigned", () => {
    const log = new HashChainedLog<{ note: string }>();
    const entry = log.append({ note: "first" });
    expect(Object.isFrozen(entry)).toBe(true);
    expect(() => {
      entry.hash = "tampered";
    }).toThrow();
  });

  it("detects tampering when an entry is wholesale-replaced", () => {
    const log = new HashChainedLog<{ note: string }>();
    log.append({ note: "first" });
    log.append({ note: "second" });

    const entries = log.all() as any[];
    entries[0] = { ...entries[0], payload: { note: "BACKDATED" } };

    const check = log.verifyChain();
    expect(check.valid).toBe(false);
    expect(check.brokenAtSeq).toBe(0);
  });

  it("is generic and works for any payload shape", () => {
    const log = new HashChainedLog<number>();
    log.append(1);
    log.append(2);
    log.append(3);
    expect(log.all().map((e) => e.payload)).toEqual([1, 2, 3]);
    expect(log.verifyChain().valid).toBe(true);
  });
});
