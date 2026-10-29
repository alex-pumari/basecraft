import { describe, expect, test } from "vitest";
import { boolean } from "./boolean.core.js";

describe("boolean-combined-validations", () => {
  describe("equal and optional", () => {
    const validator = boolean().equal(true).optional().isValid;

    test("should accept an optional value and the target boolean", () => {
      const validValues = [undefined, true];

      validValues.forEach((value) => {
        expect(validator(value)).toBe(true);
      });
    });

    test("should reject invalid values and booleans different from the target", () => {
      const invalidValues = [null, false, 0, 1, "true"];

      invalidValues.forEach((value) => {
        expect(validator(value)).toBe(false);
      });
    });
  });
});
