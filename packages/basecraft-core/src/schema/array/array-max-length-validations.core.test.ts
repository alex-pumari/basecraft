import { describe, expect, test } from "vitest";
import { array } from "./array.core.js";

describe("array-max-length-validations", () => {
  test("should accept arrays whose length equals the maximum", () => {
    const validator = array().maxLength(2).isValid;

    expect(validator([1, 2])).toBe(true);
  });

  test("should accept arrays whose length is below the maximum", () => {
    const validator = array().maxLength(2).isValid;

    const validValues = [[], [1]];

    validValues.forEach((value) => {
      expect(validator(value)).toBe(true);
    });
  });

  test("should reject arrays whose length exceeds the maximum", () => {
    const validator = array().maxLength(2).isValid;

    expect(validator([1, 2, 3])).toBe(false);
  });

  test("should accept empty arrays when the maximum length is zero", () => {
    const validator = array().maxLength(0).isValid;

    expect(validator([])).toBe(true);
  });

  test("should reject non-empty arrays when the maximum length is zero", () => {
    const validator = array().maxLength(0).isValid;

    expect(validator([1])).toBe(false);
  });
});
