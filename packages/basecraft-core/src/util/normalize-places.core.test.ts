import { describe, expect, test } from "vitest";
import { normalizePlaces } from "./normalize-places.core.js";

describe("normalize-places", () => {
  test("should keep a positive integer unchanged", () => {
    const result = normalizePlaces(3);

    expect(result).toBe(3);
  });

  test("should truncate a positive decimal", () => {
    const result = normalizePlaces(3.9);

    expect(result).toBe(3);
  });

  test("should normalize zero to zero", () => {
    const result = normalizePlaces(0);

    expect(result).toBe(0);
  });

  test("should normalize negative values to zero", () => {
    const result = normalizePlaces(-3);

    expect(result).toBe(0);
  });

  test("should normalize non-finite values to zero", () => {
    const invalidValues = [Infinity, -Infinity, NaN];

    invalidValues.forEach((value) => {
      expect(normalizePlaces(value)).toBe(0);
    });
  });
});
