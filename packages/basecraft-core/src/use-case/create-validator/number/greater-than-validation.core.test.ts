import { describe, expect, test } from "vitest";
import { createValidator } from "../../create-validator.core.js";
import { number } from "../../../schema/number.core.js";

describe("greater-than-validation", () => {
  describe("greater than", () => {
    test("should accept values greater than the target", () => {
      const validator = createValidator({
        field: number().greaterThan(10),
      }).isValid;

      const validValues = [10.1, 11, 20, 100];

      validValues.forEach((value) => {
        expect(validator({ field: value })).toBe(true);
      });
    });

    test("should reject values less than or equal to the target", () => {
      const validator = createValidator({
        field: number().greaterThan(10),
      }).isValid;

      const invalidValues = [10, 9.9, 9, 0, -10];

      invalidValues.forEach((value) => {
        expect(validator({ field: value })).toBe(false);
      });
    });
  });

  describe("greater than and integer", () => {
    const validator = createValidator({
      field: number().integer().greaterThan(10),
    }).isValid;

    test("should accept integers greater than the target", () => {
      const validValues = [11, 12, 20, 100];

      validValues.forEach((value) => {
        expect(validator({ field: value })).toBe(true);
      });
    });

    test("should reject values that are not integers greater than the target", () => {
      const invalidValues = [10, 9, 10.5, 11.5, NaN, Infinity];

      invalidValues.forEach((value) => {
        expect(validator({ field: value })).toBe(false);
      });
    });
  });

  describe("greater than and decimal", () => {
    const validator = createValidator({
      field: number().decimal().greaterThan(10),
    }).isValid;

    test("should accept decimals greater than the target", () => {
      const validValues = [10.1, 10.5, 11.5, 12.75, 100.99];

      validValues.forEach((value) => {
        expect(validator({ field: value })).toBe(true);
      });
    });

    test("should reject values that are not greater than the target", () => {
      const invalidValues = [10, 9.5, 0, NaN, Infinity];

      invalidValues.forEach((value) => {
        expect(validator({ field: value })).toBe(false);
      });
    });
  });
});