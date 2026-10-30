import { describe, expect, test } from "vitest";
import { isString } from "./is-string.core.js";

describe("is-string", () => {
  test("should accept strings", () => {
    const validValues = ["", " ", "admin"];

    validValues.forEach((value) => {
      expect(isString(value)).toBe(true);
    });
  });

  test("should reject values that are not strings", () => {
    const invalidValues = [undefined, null, 1, true, {}, [], Symbol("1")];

    invalidValues.forEach((value) => {
      expect(isString(value)).toBe(false);
    });
  });
});
