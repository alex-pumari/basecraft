import { describe, expect, test } from "vitest";
import { countDecimalPlaces } from "./count-decimal-places.core.js";

describe("count-decimal-places", () => {
  test("should return zero for integers", () => {
    const values = [0, 1, -1, 42, -42];

    values.forEach((value) => {
      expect(countDecimalPlaces(value)).toBe(0);
    });
  });

  test("should return the number of decimal places", () => {
    const cases = [
      { value: 0.1, places: 1 },
      { value: -0.1, places: 1 },
      { value: 3.14, places: 2 },
      { value: -3.141, places: 3 },
      { value: 0.001, places: 3 },
    ];

    cases.forEach(({ value, places }) => {
      expect(countDecimalPlaces(value)).toBe(places);
    });
  });

  test("should return zero for whole numbers written with a decimal part", () => {
    const result = countDecimalPlaces(7.0);

    expect(result).toBe(0);
  });

  test("should count decimal places in scientific notation", () => {
    const cases = [
      { value: 1e-7, places: 7 },
      { value: 1.23e-7, places: 9 },
    ];

    cases.forEach(({ value, places }) => {
      expect(countDecimalPlaces(value)).toBe(places);
    });
  });

  test("should return zero when the exponent removes every decimal place", () => {
    const result = countDecimalPlaces(1.5e21);

    expect(result).toBe(0);
  });
});
