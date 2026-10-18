import { describe, expect, test } from "vitest";
import { result } from "./result.core.js";
import {
  AuthenticationRequiredError,
  AuthorizationError,
  DomainError,
  InvalidRequestError,
  UnexpectedError,
} from "basecraft-errors";

class CustomDomainError extends DomainError<"CUSTOM_DOMAIN_ERROR"> {
  readonly code = "CUSTOM_DOMAIN_ERROR";

  constructor(message = "An custom domain error occurred.") {
    super(message);
  }
}

describe("result", () => {
  describe("is-error method", () => {
    test("should return true when the value is an instance of error", () => {
      const value = new Error("request failed");

      const actual = result.isError(value);

      expect(actual).toBe(true);
    });

    test("should return true when the value is an instance of a custom error", () => {
      const errors = [
        new AuthenticationRequiredError(),
        new AuthorizationError(),
        new InvalidRequestError(),
        new UnexpectedError(),
        new CustomDomainError(),
      ];

      errors.forEach((value) => {
        const actual = result.isError(value);

        expect(actual).toBe(true);
      });
    });

    test("should return false when the value is not an instance of error", () => {
      const values = [
        "request failed",
        42,
        true,
        { message: "request failed" },
        [],
        null,
        undefined,
        Symbol("request"),
        123n,
        () => undefined,
      ];

      values.forEach((value) => {
        const actual = result.isError(value);

        expect(actual).toBe(false);
      });
    });
  });

  describe("is-success method", () => {
    test("should return true when the value is a successful result", () => {
      const validValues = [
        { id: 1, name: "alex" },
        "request completed",
        42,
        true,
        false,
        0,
        "",
        [],
        {},
        null,
        undefined,
        Symbol("request"),
        123n,
        () => undefined,
      ];

      validValues.forEach((value) => {
        const actual = result.isSuccess(value);

        expect(actual).toBe(true);
      });
    });

    test("should return false when the value is an instance of error", () => {
      const value = new Error("request failed");

      const actual = result.isSuccess(value);

      expect(actual).toBe(false);
    });

    test("should return false when the value is an instance of a custom error", () => {
      const errors = [
        new AuthenticationRequiredError(),
        new AuthorizationError(),
        new InvalidRequestError(),
        new UnexpectedError(),
        new CustomDomainError(),
      ];

      errors.forEach((value) => {
        const actual = result.isSuccess(value);

        expect(actual).toBe(false);
      });
    });
  });
});