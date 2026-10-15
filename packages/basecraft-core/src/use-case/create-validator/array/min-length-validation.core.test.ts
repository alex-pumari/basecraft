import { describe, expect, test } from "vitest";
import { createValidator } from "../../create-validator.core.js";
import { array } from "../../../schema/array.core.js";

describe("min-length-validation", () => {
  test("should accept arrays whose length equals the minimum", () => {
    const validator = createValidator({
      field: array().minLength(2),
    }).isValid;

    expect(validator({ field: [1, 2] })).toBe(true);
  });

  test("should accept arrays whose length exceeds the minimum", () => {
    const validator = createValidator({
      field: array().minLength(2),
    }).isValid;

    expect(validator({ field: [1, 2, 3] })).toBe(true);
  });

  test("should reject arrays whose length is below the minimum", () => {
    const validator = createValidator({
      field: array().minLength(2),
    }).isValid;

    const invalidValues = [[], [1]];

    invalidValues.forEach((value) => {
      expect(validator({ field: value })).toBe(false);
    });
  });

  test("should accept empty arrays when the minimum length is zero", () => {
    const validator = createValidator({
      field: array().minLength(0),
    }).isValid;

    expect(validator({ field: [] })).toBe(true);
  });
});