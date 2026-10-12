import { describe, expect, test } from "vitest";
import { createValidator } from "../../create-validator.core.js";
import { number } from "../../../schema/number.core.js";

describe("equal-validation", () => {
  test("should accept values equal to the target", () => {
    const validator = createValidator({
      field: number().equal(10),
    }).isValid;

    expect(validator({ field: 10 })).toBe(true);
  });

  test("should reject values different from the target", () => {
    const validator = createValidator({
      field: number().equal(10),
    }).isValid;

    const invalidValues = ["10", "-10", 9, 9.9, 11, 10.1, -10, 0];

    invalidValues.forEach((value) => {
      expect(validator({ field: value })).toBe(false);
    });
  });
});