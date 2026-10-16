import { describe, expect, test } from "vitest";
import { array } from "./array.core.js";

describe("array-min-length-validations", () => {
  test("should accept arrays whose length equals the minimum", () => {
    const validator = array().minLength(2).isValid;

    expect(validator([1, 2])).toBe(true);
  });

  test("should accept arrays whose length exceeds the minimum", () => {
    const validator = array().minLength(2).isValid;

    expect(validator([1, 2, 3])).toBe(true);
  });

  test("should reject arrays whose length is below the minimum", () => {
    const validator = array().minLength(2).isValid;

    const invalidValues = [[], [1]];

    invalidValues.forEach((value) => {
      expect(validator(value)).toBe(false);
    });
  });

  test("should accept empty arrays when the minimum length is zero", () => {
    const validator = array().minLength(0).isValid;

    expect(validator([])).toBe(true);
  });
});
