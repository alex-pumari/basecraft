import { describe, expect, test } from "vitest";
import { createValidator } from "../../create-validator.core.js";
import { number } from "../../../schema/number.core.js";

describe("less-than-validation", () => {
  describe("less than", () => {
    test("should accept values less than the target", () => {
      const validator = createValidator({
        field: number().lessThan(10),
      }).isValid;

      const validValues = [-100, -1, 0, 9, 9.9];

      validValues.forEach((value) => {
        expect(validator({ field: value })).toBe(true);
      });
    });

    test("should reject values greater than or equal to the target", () => {
      const validator = createValidator({
        field: number().lessThan(10),
      }).isValid;

      const invalidValues = [10, 10.1, 11, 100];

      invalidValues.forEach((value) => {
        expect(validator({ field: value })).toBe(false);
      });
    });
  });

  describe("less than and integer", () => {
    const validator = createValidator({
      field: number().integer().lessThan(10),
    }).isValid;

    test("should accept integers less than the target", () => {
      const validValues = [-10, -1, 0, 1, 9];

      validValues.forEach((value) => {
        expect(validator({ field: value })).toBe(true);
      });
    });

    test("should reject values that are not integers less than the target", () => {
      const invalidValues = [10, 11, 9.5, 10.5, NaN, -Infinity];

      invalidValues.forEach((value) => {
        expect(validator({ field: value })).toBe(false);
      });
    });
  });

  describe("less than and decimal", () => {
    const validator = createValidator({
      field: number().decimal().lessThan(10),
    }).isValid;

    test("should accept decimals less than the target", () => {
      const validValues = [-10.5, -1.5, 0.5, 1.75, 9.99];

      validValues.forEach((value) => {
        expect(validator({ field: value })).toBe(true);
      });
    });

    test("should reject values that are not less than the target", () => {
      const invalidValues = [10, 10.1, 11.5, NaN, -Infinity];

      invalidValues.forEach((value) => {
        expect(validator({ field: value })).toBe(false);
      });
    });
  });
});