import { describe, expect, test } from "vitest";
import { isFiniteNumber } from "./is-finite-number.core.js";

describe("is-finite-number", () => {
  test("should accept finite numbers", () => {
    const validValues = [
      0,
      -0,
      1,
      -1,
      3.14,
      Number.MAX_SAFE_INTEGER,
      Number.MIN_SAFE_INTEGER,
    ];

    validValues.forEach((value) => {
      expect(isFiniteNumber(value)).toBe(true);
    });
  });

  test("should reject non-finite numbers", () => {
    const invalidValues = [NaN, Infinity, -Infinity];

    invalidValues.forEach((value) => {
      expect(isFiniteNumber(value)).toBe(false);
    });
  });

  test("should reject values that are not numbers", () => {
    const invalidValues = [undefined, null, "1", true, {}, [], Symbol("1")];

    invalidValues.forEach((value) => {
      expect(isFiniteNumber(value)).toBe(false);
    });
  });
});
