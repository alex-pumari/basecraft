import { describe, expect, test } from "vitest";
import { createValidator } from "../../create-validator.core.js";
import { array } from "../../../schema/array.core.js";

describe("max-length-validation", () => {
  test("should accept arrays whose length equals the maximum", () => {
    const validator = createValidator({
      field: array().maxLength(2),
    }).isValid;

    expect(validator({ field: [1, 2] })).toBe(true);
  });

  test("should accept arrays whose length is below the maximum", () => {
    const validator = createValidator({
      field: array().maxLength(2),
    }).isValid;

    const validValues = [[], [1]];

    validValues.forEach((value) => {
      expect(validator({ field: value })).toBe(true);
    });
  });

  test("should reject arrays whose length exceeds the maximum", () => {
    const validator = createValidator({
      field: array().maxLength(2),
    }).isValid;

    expect(validator({ field: [1, 2, 3] })).toBe(false);
  });

  test("should accept empty arrays when the maximum length is zero", () => {
    const validator = createValidator({
      field: array().maxLength(0),
    }).isValid;

    expect(validator({ field: [] })).toBe(true);
  });

  test("should reject non-empty arrays when the maximum length is zero", () => {
    const validator = createValidator({
      field: array().maxLength(0),
    }).isValid;

    expect(validator({ field: [1] })).toBe(false);
  });
});