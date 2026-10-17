import { describe, expect, test } from "vitest";
import { number } from "./number.core.js";

describe("number-comparison-validations", () => {
  describe("equal", () => {
    test("should accept values equal to the target", () => {
      const validator = number().equal(10).isValid;

      expect(validator(10)).toBe(true);
    });

    test("should reject values different from the target", () => {
      const validator = number().equal(10).isValid;

      const invalidValues = ["10", "-10", 9, 9.9, 11, 10.1, -10, 0];

      invalidValues.forEach((value) => {
        expect(validator(value)).toBe(false);
      });
    });
  });

  describe("greater than", () => {
    test("should accept values greater than the target", () => {
      const validator = number().greaterThan(10).isValid;

      const validValues = [10.1, 11, 20, 100];

      validValues.forEach((value) => {
        expect(validator(value)).toBe(true);
      });
    });

    test("should reject values less than or equal to the target", () => {
      const validator = number().greaterThan(10).isValid;

      const invalidValues = [10, 9.9, 9, 0, -10];

      invalidValues.forEach((value) => {
        expect(validator(value)).toBe(false);
      });
    });
  });

  describe("less than", () => {
    test("should accept values less than the target", () => {
      const validator = number().lessThan(10).isValid;

      const validValues = [-100, -1, 0, 9, 9.9];

      validValues.forEach((value) => {
        expect(validator(value)).toBe(true);
      });
    });

    test("should reject values greater than or equal to the target", () => {
      const validator = number().lessThan(10).isValid;

      const invalidValues = [10, 10.1, 11, 100];

      invalidValues.forEach((value) => {
        expect(validator(value)).toBe(false);
      });
    });
  });
});