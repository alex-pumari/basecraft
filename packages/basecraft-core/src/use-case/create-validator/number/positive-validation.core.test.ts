import { describe, expect, test } from "vitest";
import { createValidator } from "../../create-validator.core.js";
import { number } from "../../../schema/number.core.js";

describe("positive-validation", () => {
  describe("positive", () => {
    const validator = createValidator({
      field: number().positive(),
    }).isValid;

    test("should accept positive values", () => {
      const validValues = [1, 0.1, 42, 3.14, Number.MIN_VALUE];

      validValues.forEach((value) => {
        expect(validator({ field: value })).toBe(true);
      });
    });

    test("should reject non-positive values", () => {
      const invalidValues = [0, -0, -1, -0.1, NaN, Infinity, -Infinity];

      invalidValues.forEach((value) => {
        expect(validator({ field: value })).toBe(false);
      });
    });
  });

  describe("positive and integer", () => {
    const validator = createValidator({
      field: number().integer().positive(),
    }).isValid;
  
    test("should accept positive integers", () => {
      const validValues = [1, 2, 42, 100];
  
      validValues.forEach((value) => {
        expect(validator({ field: value })).toBe(true);
      });
    });
  
    test("should reject values that are not positive integers", () => {
      const invalidValues = [-1, 0, 1.5, -1.5, NaN, Infinity];
  
      invalidValues.forEach((value) => {
        expect(validator({ field: value })).toBe(false);
      });
    });
  });

  describe("positive and decimal", () => {
    const validator = createValidator({
      field: number().decimal().positive(),
    }).isValid;
  
    test("should accept positive decimals", () => {
      const validValues = [0.1, 1.5, 3.14, 10.25];
  
      validValues.forEach((value) => {
        expect(validator({ field: value })).toBe(true);
      });
    });
  
    test("should reject values that are not positive decimals", () => {
      const invalidValues = [-0.1, -1.5, 0, 1, -1, NaN, Infinity];
  
      invalidValues.forEach((value) => {
        expect(validator({ field: value })).toBe(false);
      });
    });
  });
});