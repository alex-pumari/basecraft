import { describe, expect, test } from "vitest";
import { isNumber } from "./is-number.core.js";

describe("is-number", () => {
  test("should accept numbers", () => {
    const validValues = [
      0,
      -0,
      1,
      -1,
      3.14,
      NaN,
      Infinity,
      -Infinity,
      Number.MAX_SAFE_INTEGER,
      Number.MIN_SAFE_INTEGER,
    ];

    validValues.forEach((value) => {
      expect(isNumber(value)).toBe(true);
    });
  });

  test("should reject values that are not numbers", () => {
    const invalidValues = [undefined, null, "1", true, {}, [], Symbol("1")];

    invalidValues.forEach((value) => {
      expect(isNumber(value)).toBe(false);
    });
  });
});
