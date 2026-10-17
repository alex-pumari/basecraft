import { describe, expect, test } from "vitest";
import { number } from "./number.core.js";

describe("decimal-places-validations", () => {
  test("should accept integers regardless of decimal places", () => {
    const validator = number().decimalPlaces(2).isValid;
    const validValues = [0, 1, -1, 7, -7, 42, -42, 100];

    validValues.forEach((value) => {
      expect(validator(value)).toBe(true);
    });
  });

  test("should accept decimals within the specified places", () => {
    const validator = number().decimalPlaces(2).isValid;
    const validValues = [
      0.1,
      -0.1,
      1.5,
      -1.5,
      3.14,
      -3.14,
      7.12,
      -7.12,
      0.01,
      -0.01,
      99.99,
    ];

    validValues.forEach((value) => {
      expect(validator(value)).toBe(true);
    });
  });

  test("should reject decimals exceeding the specified places", () => {
    const validator = number().decimalPlaces(2).isValid;
    const invalidValues = [
      1.234,
      -1.234,
      3.141,
      -3.141,
      0.001,
      -0.001,
      99.999,
    ];

    invalidValues.forEach((value) => {
      expect(validator(value)).toBe(false);
    });
  });

  test("should accept integers when places is zero", () => {
    const validator = number().decimalPlaces(0).isValid;
    const validValues = [0, 1, -1, 7, -7, 7.0, -7.0, 42, -42, 100];

    validValues.forEach((value) => {
      expect(validator(value)).toBe(true);
    });
  });

  test("should reject non-integer values when places is zero", () => {
    const validator = number().decimalPlaces(0).isValid;
    const invalidValues = [
      0.1,
      -0.1,
      1.5,
      -1.5,
      3.14,
      -3.14,
      0.001,
      -0.001,
    ];

    invalidValues.forEach((value) => {
      expect(validator(value)).toBe(false);
    });
  });

  test("should accept integers when places is a decimal number", () => {
    const validator = number().decimalPlaces(2.9).isValid;
    const validValues = [0, 1, -1, 7, 7.1, 7.12, -7.12];

    validValues.forEach((value) => {
      expect(validator(value)).toBe(true);
    });
  });

  test("should use only the integer part of decimal places", () => {
    const validator = number().decimalPlaces(2.9).isValid;
    const validValues = [1.23, -1.23, 7.12, -7.12];
    const invalidValues = [1.234, -1.234, 7.123, -7.123];

    validValues.forEach((value) => {
      expect(validator(value)).toBe(true);
    });

    invalidValues.forEach((value) => {
      expect(validator(value)).toBe(false);
    });
  });

  test("should treat negative places as zero", () => {
    const validator = number().decimalPlaces(-2).isValid;
    const validValues = [0, 1, -1, 7, -7, 42, -42];
    const invalidValues = [0.1, -0.1, 1.5, -1.5, 3.14, -3.14];

    validValues.forEach((value) => {
      expect(validator(value)).toBe(true);
    });

    invalidValues.forEach((value) => {
      expect(validator(value)).toBe(false);
    });
  });

  test("should treat non-finite places as zero", () => {
    const invalidPlaces = [NaN, Infinity, -Infinity];
    const validValues = [0, 1, -1, 7, -7, 42];
    const invalidValues = [0.1, -0.1, 1.5, -1.5, 3.14, -3.14];

    invalidPlaces.forEach((places) => {
      const validator = number().decimalPlaces(places).isValid;

      validValues.forEach((value) => {
        expect(validator(value)).toBe(true);
      });

      invalidValues.forEach((value) => {
        expect(validator(value)).toBe(false);
      });
    });
  });

  test("should reject non-finite values regardless of places", () => {
    const validators = [
      number().decimalPlaces(0).isValid,
      number().decimalPlaces(2).isValid,
      number().decimalPlaces(10).isValid,
    ];

    const invalidValues = [NaN, Infinity, -Infinity];

    validators.forEach((validator) => {
      invalidValues.forEach((value) => {
        expect(validator(value)).toBe(false);
      });
    });
  });

  test("should validate scientific notation according to its mathematical value", () => {
    const validator = number().decimalPlaces(6).isValid;

    expect(validator(1e-6)).toBe(true);
    expect(validator(-1e-6)).toBe(true);

    expect(validator(1e-7)).toBe(false);
    expect(validator(-1e-7)).toBe(false);

    expect(validator(1e2)).toBe(true);
    expect(validator(-1e2)).toBe(true);
  });

  test("should not round values before validation", () => {
    const validator = number().decimalPlaces(2).isValid;

    expect(validator(1.234)).toBe(false);
    expect(validator(1.235)).toBe(false);
    expect(validator(1.236)).toBe(false);

    expect(validator(1.23)).toBe(true);
    expect(validator(1.24)).toBe(true);
  });

  test("should accept zero regardless of places", () => {
    const placesValues = [0, 1, 2, 2.9, -1, -Infinity, Infinity, NaN];

    placesValues.forEach((places) => {
      expect(number().decimalPlaces(places).isValid(0)).toBe(true);
      expect(number().decimalPlaces(places).isValid(-0)).toBe(true);
    });
  });
});