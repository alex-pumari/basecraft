import { describe, expect, test } from "vitest";
import { maxLengthRule } from "./max-length-rule.core.js";

describe("max-length-rule", () => {
  test("should accept values shorter than the maximum length", () => {
    const rule = maxLengthRule(5);

    const result = rule("abc");

    expect(result).toBe(true);
  });

  test("should accept values with exactly the maximum length", () => {
    const rule = maxLengthRule(5);

    const result = rule("abcde");

    expect(result).toBe(true);
  });

  test("should reject values longer than the maximum length", () => {
    const rule = maxLengthRule(5);

    const invalidValues = ["abcdef", "value-example"];

    invalidValues.forEach((value) => {
      expect(rule(value)).toBe(false);
    });
  });

  test("should reject non-empty values when the maximum length is zero", () => {
    const rule = maxLengthRule(0);

    const result = rule("a");

    expect(result).toBe(false);
  });
});
