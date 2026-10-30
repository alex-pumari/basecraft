import { describe, expect, test } from "vitest";
import { emailRule } from "./email-rule.core.js";

describe("email-rule", () => {
  test("should accept valid email addresses", () => {
    const validValues = [
      "test@example.com",
      "user.name+tag@example.co.uk",
      "user_name@sub.domain.com",
      "a@b.co",
      "first-last@example-domain.com",
    ];

    validValues.forEach((value) => {
      expect(emailRule(value)).toBe(true);
    });
  });

  test("should reject values without an at sign", () => {
    const invalidValues = ["", "plainaddress", "test.example.com"];

    invalidValues.forEach((value) => {
      expect(emailRule(value)).toBe(false);
    });
  });

  test("should reject values without a local part", () => {
    const invalidValues = ["@example.com", "@"];

    invalidValues.forEach((value) => {
      expect(emailRule(value)).toBe(false);
    });
  });

  test("should reject values without a domain", () => {
    const invalidValues = ["user@", "user@.com"];

    invalidValues.forEach((value) => {
      expect(emailRule(value)).toBe(false);
    });
  });

  test("should reject values without a top-level domain", () => {
    const invalidValues = ["user@example", "user@example."];

    invalidValues.forEach((value) => {
      expect(emailRule(value)).toBe(false);
    });
  });

  test("should reject a top-level domain shorter than two characters", () => {
    const invalidValues = ["user@example.c", "user@example.1"];

    invalidValues.forEach((value) => {
      expect(emailRule(value)).toBe(false);
    });
  });

  test("should reject values containing whitespace", () => {
    const invalidValues = [
      " user@example.com",
      "user@example.com ",
      "user @example.com",
    ];

    invalidValues.forEach((value) => {
      expect(emailRule(value)).toBe(false);
    });
  });

  test("should reject values with more than one at sign", () => {
    const invalidValues = ["user@@example.com", "user@example@com"];

    invalidValues.forEach((value) => {
      expect(emailRule(value)).toBe(false);
    });
  });
});
