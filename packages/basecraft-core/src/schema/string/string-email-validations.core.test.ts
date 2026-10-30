import { describe, expect, test } from "vitest";
import { string } from "./string.core.js";

describe("string-email-validations", () => {
  test("should accept valid email addresses", () => {
    const validator = string().email().isValid;

    const validValues = [
      "test@example.com",
      "user.name+tag@example.co.uk",
      "user_name@sub.domain.com",
      "a@b.co",
    ];

    validValues.forEach((value) => {
      expect(validator(value)).toBe(true);
    });
  });

  test("should reject values that are not valid email addresses", () => {
    const validator = string().email().isValid;

    const invalidValues = [
      "",
      "plainaddress",
      "@example.com",
      "user@",
      "user@example",
      "user@example.c",
      "user @example.com",
      "user@@example.com",
    ];

    invalidValues.forEach((value) => {
      expect(validator(value)).toBe(false);
    });
  });

  test("should reject values that are not strings", () => {
    const validator = string().email().isValid;

    const invalidValues = [undefined, null, 1, true, {}, []];

    invalidValues.forEach((value) => {
      expect(validator(value)).toBe(false);
    });
  });
});
