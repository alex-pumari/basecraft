import { describe, expect, test } from "vitest";
import { createValidator } from "../../create-validator.core.js";
import { number } from "../../../schema/number.core.js";

describe("negative-validation", () => {
  describe("negative", () => {
    const validator = createValidator({
      field: number().negative(),
    }).isValid;

    test("should accept negative values", () => {
      const validValues = [-1, -0.1, -42, -3.14, -Number.MIN_VALUE, -Number.MAX_VALUE];

      validValues.forEach((value) => {
        expect(validator({ field: value })).toBe(true);
      });
    });

    test("should reject non-negative values", () => {
      const invalidValues = [0, -0, 1, 0.1, NaN, Infinity, -Infinity];

      invalidValues.forEach((value) => {
        expect(validator({ field: value })).toBe(false);
      });
    });
  });

  describe("negative and integer", () => {
    const validator = createValidator({
      field: number().integer().negative(),
    }).isValid;
  
    test("should accept negative integers", () => {
      const validValues = [-1, -2, -42, -100];
  
      validValues.forEach((value) => {
        expect(validator({ field: value })).toBe(true);
      });
    });
  
    test("should reject values that are not negative integers", () => {
      const invalidValues = [1, 0, -1.5, 1.5, NaN, -Infinity];
  
      invalidValues.forEach((value) => {
        expect(validator({ field: value })).toBe(false);
      });
    });
  });

  describe("negative and decimal", () => {
    const validator = createValidator({
      field: number().decimal().negative(),
    }).isValid;
  
    test("should accept negative decimals", () => {
      const validValues = [-0.1, -1.5, -3.14, -10.25];
  
      validValues.forEach((value) => {
        expect(validator({ field: value })).toBe(true);
      });
    });
  
    test("should reject values that are not negative decimals", () => {
      const invalidValues = [0.1, 1.5, 0, 1, -1, NaN, -Infinity];
  
      invalidValues.forEach((value) => {
        expect(validator({ field: value })).toBe(false);
      });
    });
  });
});