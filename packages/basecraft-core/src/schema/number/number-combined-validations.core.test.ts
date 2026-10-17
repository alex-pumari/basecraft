import { describe, expect, test } from "vitest";
import { number } from "./number.core.js";

describe("number-combined-validations", () => {
  describe("greater than and integer", () => {
    const validator = number().integer().greaterThan(10).isValid;

    test("should accept integers greater than the target", () => {
      const validValues = [11, 12, 20, 100];

      validValues.forEach((value) => {
        expect(validator(value)).toBe(true);
      });
    });

    test("should reject values that are not integers greater than the target", () => {
      const invalidValues = [10, 9, 10.5, 11.5, NaN, Infinity];

      invalidValues.forEach((value) => {
        expect(validator(value)).toBe(false);
      });
    });
  });

  describe("greater than and decimal", () => {
    const validator = number().decimal().greaterThan(10).isValid;

    test("should accept decimals greater than the target", () => {
      const validValues = [10.1, 10.5, 11.5, 12.75, 100.99];

      validValues.forEach((value) => {
        expect(validator(value)).toBe(true);
      });
    });

    test("should reject values that are not greater than the target", () => {
      const invalidValues = [10, 9.5, 0, NaN, Infinity];

      invalidValues.forEach((value) => {
        expect(validator(value)).toBe(false);
      });
    });
  });

  describe("less than and integer", () => {
    const validator = number().integer().lessThan(10).isValid;

    test("should accept integers less than the target", () => {
      const validValues = [-10, -1, 0, 1, 9];

      validValues.forEach((value) => {
        expect(validator(value)).toBe(true);
      });
    });

    test("should reject values that are not integers less than the target", () => {
      const invalidValues = [10, 11, 9.5, 10.5, NaN, -Infinity];

      invalidValues.forEach((value) => {
        expect(validator(value)).toBe(false);
      });
    });
  });

  describe("less than and decimal", () => {
    const validator = number().decimal().lessThan(10).isValid;

    test("should accept decimals less than the target", () => {
      const validValues = [-10.5, -1.5, 0.5, 1.75, 9.99, 9];

      validValues.forEach((value) => {
        expect(validator(value)).toBe(true);
      });
    });

    test("should reject values that are not less than the target", () => {
      const invalidValues = [10, 10.1, 11, 11.5, NaN, -Infinity];

      invalidValues.forEach((value) => {
        expect(validator(value)).toBe(false);
      });
    });
  });

  describe("negative and integer", () => {
    const validator = number().integer().negative().isValid;
  
    test("should accept negative integers", () => {
      const validValues = [-1, -2, -42, -100];
  
      validValues.forEach((value) => {
        expect(validator(value)).toBe(true);
      });
    });
  
    test("should reject values that are not negative integers", () => {
      const invalidValues = [1, 0, -1.5, 1.5, NaN, -Infinity];
  
      invalidValues.forEach((value) => {
        expect(validator(value)).toBe(false);
      });
    });
  });

  describe("negative and decimal", () => {
    const validator = number().decimal().negative().isValid;
  
    test("should accept negative decimals", () => {
      const validValues = [-0.1, -1.5, -3.14, -10.25];
  
      validValues.forEach((value) => {
        expect(validator(value)).toBe(true);
      });
    });
  
    test("should reject values that are not negative decimals", () => {
      const invalidValues = [0.1, 1.5, 0, 1, -1, NaN, -Infinity];
  
      invalidValues.forEach((value) => {
        expect(validator(value)).toBe(false);
      });
    });
  });

  describe("positive and integer", () => {
    const validator = number().integer().positive().isValid;
  
    test("should accept positive integers", () => {
      const validValues = [1, 2, 42, 100];
  
      validValues.forEach((value) => {
        expect(validator(value)).toBe(true);
      });
    });
  
    test("should reject values that are not positive integers", () => {
      const invalidValues = [-1, 0, 1.5, -1.5, NaN, Infinity];
  
      invalidValues.forEach((value) => {
        expect(validator(value)).toBe(false);
      });
    });
  });

  describe("positive and decimal", () => {
    const validator = number().decimal().positive().isValid;
  
    test("should accept positive decimals", () => {
      const validValues = [0.1, 1.5, 3.14, 10.25];
  
      validValues.forEach((value) => {
        expect(validator(value)).toBe(true);
      });
    });
  
    test("should reject values that are not positive decimals", () => {
      const invalidValues = [-0.1, -1.5, 0, 1, -1, NaN, Infinity];
  
      invalidValues.forEach((value) => {
        expect(validator(value)).toBe(false);
      });
    });
  });
});