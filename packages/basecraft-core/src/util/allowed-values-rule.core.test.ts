import { describe, expect, test } from "vitest";
import { allowedValuesRule } from "./allowed-values-rule.core.js";

describe("allowed-values-rule", () => {
  test("should accept values included in the list", () => {
    const rule = allowedValuesRule([1, 2, 3]);

    expect(rule(1)).toBe(true);
    expect(rule(2)).toBe(true);
    expect(rule(3)).toBe(true);
  });

  test("should reject values not included in the list", () => {
    const rule = allowedValuesRule([1, 2, 3]);

    expect(rule(4)).toBe(false);
    expect(rule(-1)).toBe(false);
    expect(rule(1.5)).toBe(false);
  });

  test("should ignore invalid elements in the list", () => {
    const rule = allowedValuesRule([NaN, Infinity, 1]);

    expect(rule(NaN)).toBe(false);
    expect(rule(Infinity)).toBe(false);
    expect(rule(1)).toBe(true);
  });

  test("should keep number and string elements independently", () => {
    const rule = allowedValuesRule([1, "1"]);

    expect(rule(1)).toBe(true);
    expect(rule("1")).toBe(true);
    expect(rule(2)).toBe(false);
    expect(rule("2")).toBe(false);
  });

  test("should reject every value when the list is empty", () => {
    const rule = allowedValuesRule([]);

    expect(rule(0)).toBe(false);
    expect(rule(1)).toBe(false);
    expect(rule(null)).toBe(false);
    expect(rule(undefined)).toBe(false);
  });
});
