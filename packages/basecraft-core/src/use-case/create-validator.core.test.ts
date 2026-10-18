import { describe, expect, test } from "vitest";
import { createValidator } from "./create-validator.core.js";
import { string } from "../schema/string/string.core.js";

describe("create-validator", () => {
  describe("validation method", () => {
    test("should approve a value that matches the shape", () => {
      const validator = createValidator({
        name: string(),
      });

      const value = {
        name: "juan",
      };

      const result = validator.isValid(value);

      expect(result).toBe(true);
    });

    test("should reject a value with missing required fields", () => {
      const validator = createValidator({
        name: string(),
      });

      const value = {};

      const result = validator.isValid(value);

      expect(result).toBe(false);
    });

    test("should reject a value with invalid field types", () => {
      const validator = createValidator({
        name: string(),
      });

      const value = {
        name: 123,
      };

      const result = validator.isValid(value);

      expect(result).toBe(false);
    });

    test("should reject a value with additional fields", () => {
      const validator = createValidator({
        name: string(),
      });

      const value = {
        name: "juan",
        age: 25,
      };

      const result = validator.isValid(value);

      expect(result).toBe(false);
    });

    test("should reject non-object values", () => {
      const validator = createValidator({
        name: string(),
      });

      const invalidValues = [
        null,
        undefined,
        [],
        ["first-example"],
        "first-example",
        123,
        0,
        true,
        false,
        NaN,
        Infinity,
        -Infinity,
        Symbol("name"),
        123n,
      ];

      invalidValues.forEach((value) => {
        const result = validator.isValid(value);

        expect(result).toBe(false);
      });
    });

    test("should approve an empty object when the shape is empty", () => {
      const validator = createValidator({});

      const value = {};

      const result = validator.isValid(value);

      expect(result).toBe(true);
    });

    test("should reject a value with additional fields when the shape is empty", () => {
      const validator = createValidator({});

      const value = {
        name: "juan",
      };

      const result = validator.isValid(value);

      expect(result).toBe(false);
    });
  });
});