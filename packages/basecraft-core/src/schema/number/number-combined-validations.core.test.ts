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

  describe("greater than and decimal places", () => {
    const validator = number().decimalPlaces(2).greaterThan(10).isValid;

    test("should accept values greater than the target within the decimal places", () => {
      const validValues = [10.1, 10.25, 11, 12.75, 100.99];

      validValues.forEach((value) => {
        expect(validator(value)).toBe(true);
      });
    });

    test("should reject values that are not greater than the target or exceed the decimal places", () => {
      const invalidValues = [10, 9.99, 0, 10.123, 11.001, NaN, Infinity];

      invalidValues.forEach((value) => {
        expect(validator(value)).toBe(false);
      });
    });
  });

  describe("less than and decimal places", () => {
    const validator = number().decimalPlaces(2).lessThan(10).isValid;

    test("should accept values less than the target within the decimal places", () => {
      const validValues = [-10.5, -1.5, 0.5, 1.75, 9.99, 9];

      validValues.forEach((value) => {
        expect(validator(value)).toBe(true);
      });
    });

    test("should reject values that are not less than the target or exceed the decimal places", () => {
      const invalidValues = [10, 10.1, 11, 9.999, -1.123, NaN, -Infinity];

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


  describe("negative and decimal places", () => {
    const validator = number().decimalPlaces(2).negative().isValid;

    test("should accept negative values within the decimal places", () => {
      const validValues = [-0.1, -1, -3.14, -10.25];

      validValues.forEach((value) => {
        expect(validator(value)).toBe(true);
      });
    });

    test("should reject values that are not negative or exceed the decimal places", () => {
      const invalidValues = [0.1, 0, 1, -3.141, -0.001, NaN, -Infinity];

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

  describe("positive and decimal places", () => {
    const validator = number().decimalPlaces(2).positive().isValid;

    test("should accept positive values within the decimal places", () => {
      const validValues = [0.1, 1, 3.14, 10.25];

      validValues.forEach((value) => {
        expect(validator(value)).toBe(true);
      });
    });

    test("should reject values that are not positive or exceed the decimal places", () => {
      const invalidValues = [-0.1, 0, -1, 3.141, 0.001, NaN, Infinity];

      invalidValues.forEach((value) => {
        expect(validator(value)).toBe(false);
      });
    });
  });
});