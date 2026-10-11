import { describe, expect, it } from "vitest";
import { createResult } from "./create-result.core.js";

describe("create-result", () => {
  describe("success", () => {
    it("should return a successful result containing the provided value", () => {
      const value = { id: 1, name: "juan" };

      const result = createResult.success(value);

      expect(result).toEqual({
        success: true,
        value,
      });
    });

    it("should return a successful result when the provided value is null", () => {
      const value = null;

      const result = createResult.success(value);

      expect(result).toEqual({
        success: true,
        value: null,
      });
    });

    it("should return a successful result when the provided value is undefined", () => {
      const value = undefined;

      const result = createResult.success(value);

      expect(result).toEqual({
        success: true,
        value: undefined,
      });
    });
  });

  describe("failure", () => {
    it("should return a failed result containing the provided error", () => {
      const error = new Error("something went wrong");

      const result = createResult.failure(error);

      expect(result).toEqual({
        success: false,
        error,
      });
    });

    it("should preserve the identity of the provided error", () => {
      const error = new Error("something went wrong");

      const result = createResult.failure(error);

      expect(result.error).toBe(error);
    });

    it("should preserve the identity of a custom error", () => {
      class CustomError extends Error {
        constructor() {
          super("custom error");
          this.name = "CustomError";
        }
      }

      const error = new CustomError();

      const result = createResult.failure(error);

      expect(result.success).toBe(false);
      expect(result.error).toBe(error);
      expect(result.error).toBeInstanceOf(CustomError);
    });
  });
});