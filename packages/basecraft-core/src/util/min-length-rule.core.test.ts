import { describe, expect, test } from "vitest";
import { minLengthRule } from "./min-length-rule.core.js";

describe("min-length-rule", () => {
  test("should accept values longer than the minimum length", () => {
    const rule = minLengthRule(3);

    const result = rule("value-example");

    expect(result).toBe(true);
  });

  test("should accept values with exactly the minimum length", () => {
    const rule = minLengthRule(3);

    const result = rule("abc");

    expect(result).toBe(true);
  });

  test("should reject values shorter than the minimum length", () => {
    const rule = minLengthRule(3);

    const invalidValues = ["", "a", "ab"];

    invalidValues.forEach((value) => {
      expect(rule(value)).toBe(false);
    });
  });

  test("should accept empty values when the minimum length is zero", () => {
    const rule = minLengthRule(0);

    const result = rule("");

    expect(result).toBe(true);
  });
});
