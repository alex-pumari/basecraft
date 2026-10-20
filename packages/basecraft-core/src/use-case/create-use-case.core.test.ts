import { describe, expect, test, vi } from "vitest";
import {
  AuthenticationRequiredError,
  AuthorizationError,
  InvalidRequestError,
  UnexpectedError,
} from "@basecraft/errors";
import { createUseCase } from "./create-use-case.core.js";
import { string } from "../schema/string/string.core.js";

describe("create-use-case", () => {
  describe("use case execution", () => {
    test("should return the response when the request is valid and the handler succeeds", async () => {
      const request = {
        name: "john",
      };

      const response = {
        id: "user-id",
      };

      const handler = vi.fn().mockResolvedValue(response);

      const useCase = createUseCase({
        requestShape: {
          name: string(),
        },
        authenticationRequired: false,
        handler,
      });

      const dependencies = {};

      const result = await useCase.execute(dependencies, request);

      expect(result).toEqual(response);
      expect(handler).toHaveBeenCalledOnce();
      expect(handler).toHaveBeenCalledWith(dependencies, request);
    });

    test("should return an invalid request error when the request does not match the expected shape", async () => {
      const handler = vi.fn();

      const useCase = createUseCase({
        requestShape: {
          name: string(),
        },
        authenticationRequired: false,
        handler,
      });

      const dependencies = {};

      const request = {
        name: 123,
      };

      const result = await useCase.execute(dependencies, request);

      expect(result).toBeInstanceOf(InvalidRequestError);
      expect(handler).not.toHaveBeenCalled();
    });

    test("should return an invalid request error when a required property is missing", async () => {
      const handler = vi.fn();

      const useCase = createUseCase({
        requestShape: {
          name: string(),
        },
        authenticationRequired: false,
        handler,
      });

      const dependencies = {};

      const request = {};

      const result = await useCase.execute(dependencies, request);

      expect(result).toBeInstanceOf(InvalidRequestError);
      expect(handler).not.toHaveBeenCalled();
    });

    test("should accept an empty request when the request shape is empty", async () => {
      const response = {
        success: true,
      };

      const handler = vi.fn().mockResolvedValue(response);

      const useCase = createUseCase({
        requestShape: {},
        authenticationRequired: false,
        handler,
      });

      const dependencies = {};

      const request = {};

      const result = await useCase.execute(dependencies, request);

      expect(result).toEqual(response);
      expect(handler).toHaveBeenCalledOnce();
      expect(handler).toHaveBeenCalledWith(dependencies, request);
    });

    test("should return an invalid request error when the request contains extra properties and the request shape is empty", async () => {
      const handler = vi.fn();

      const useCase = createUseCase({
        requestShape: {},
        authenticationRequired: false,
        handler,
      });

      const dependencies = {};

      const request = {
        name: "john",
      };

      const result = await useCase.execute(dependencies, request);

      expect(result).toBeInstanceOf(InvalidRequestError);
      expect(handler).not.toHaveBeenCalled();
    });

    test("should execute the handler when authentication is not required and no user is authenticated", async () => {
      const request = {
        name: "john",
      };

      const response = {
        id: "user-id",
      };

      const handler = vi.fn().mockResolvedValue(response);

      const useCase = createUseCase({
        requestShape: {
          name: string(),
        },
        authenticationRequired: false,
        handler,
      });

      const dependencies = {};

      const result = await useCase.execute(dependencies, request);

      expect(result).toEqual(response);
      expect(handler).toHaveBeenCalledOnce();
      expect(handler).toHaveBeenCalledWith(dependencies, request);
    });

    test("should execute the handler when authentication is optional and a user is authenticated", async () => {
      const request = {
        name: "john",
      };

      const response = {
        id: "user-id",
      };

      const handler = vi.fn().mockResolvedValue(response);

      const useCase = createUseCase({
        requestShape: {
          name: string(),
        },
        authenticationRequired: false,
        handler,
      });

      const dependencies = {
        currentUser: {
          id: "user-id",
          role: "customer",
        },
      };

      const result = await useCase.execute(dependencies, request);

      expect(result).toEqual(response);
      expect(handler).toHaveBeenCalledOnce();
      expect(handler).toHaveBeenCalledWith(dependencies, request);
    });

    test("should return an authentication required error when authentication is required and no user is authenticated", async () => {
      const handler = vi.fn();

      const useCase = createUseCase({
        requestShape: {
          name: string(),
        },
        authenticationRequired: true,
        handler,
      });

      const dependencies = {};

      const request = {
        name: "john",
      };

      const result = await useCase.execute(dependencies, request);

      expect(result).toBeInstanceOf(AuthenticationRequiredError);
      expect(handler).not.toHaveBeenCalled();
    });

    test("should require authentication when allowed roles are configured and no user is authenticated", async () => {
      const handler = vi.fn();

      const useCase = createUseCase({
        requestShape: {
          name: string(),
        },
        authenticationRequired: false,
        allowedRoles: ["admin"],
        handler,
      });

      const dependencies = {};

      const request = {
        name: "john",
      };

      const result = await useCase.execute(dependencies, request);

      expect(result).toBeInstanceOf(AuthenticationRequiredError);
      expect(handler).not.toHaveBeenCalled();
    });

    test("should require authentication when no roles are allowed and no user is authenticated", async () => {
      const handler = vi.fn();

      const useCase = createUseCase({
        requestShape: {
          name: string(),
        },
        authenticationRequired: false,
        allowedRoles: [],
        handler,
      });

      const dependencies = {};

      const request = {
        name: "john",
      };

      const result = await useCase.execute(dependencies, request);

      expect(result).toBeInstanceOf(AuthenticationRequiredError);
      expect(handler).not.toHaveBeenCalled();
    });

    test("should return an authorization error when the authenticated user does not have an allowed role", async () => {
      const handler = vi.fn();

      const useCase = createUseCase({
        requestShape: {
          name: string(),
        },
        authenticationRequired: true,
        allowedRoles: ["admin"],
        handler,
      });

      const dependencies = {
        currentUser: {
          id: "user-id",
          role: "customer",
        },
      };

      const request = {
        name: "john",
      };

      const result = await useCase.execute(dependencies, request);

      expect(result).toBeInstanceOf(AuthorizationError);
      expect(handler).not.toHaveBeenCalled();
    });

    test("should execute the handler when the authenticated user has an allowed role", async () => {
      const request = {
        name: "john",
      };

      const response = {
        id: "user-id",
      };

      const handler = vi.fn().mockResolvedValue(response);

      const useCase = createUseCase({
        requestShape: {
          name: string(),
        },
        authenticationRequired: true,
        allowedRoles: ["admin", "manager"],
        handler,
      });

      const dependencies = {
        currentUser: {
          id: "user-id",
          role: "manager",
        },
      };

      const result = await useCase.execute(dependencies, request);

      expect(result).toEqual(response);
      expect(handler).toHaveBeenCalledOnce();
      expect(handler).toHaveBeenCalledWith(dependencies, request);
    });

    test("should return an authorization error when no roles are allowed", async () => {
      const handler = vi.fn();

      const useCase = createUseCase({
        requestShape: {
          name: string(),
        },
        authenticationRequired: true,
        allowedRoles: [],
        handler,
      });

      const dependencies = {
        currentUser: {
          id: "user-id",
          role: "admin",
        },
      };

      const request = {
        name: "john",
      };

      const result = await useCase.execute(dependencies, request);

      expect(result).toBeInstanceOf(AuthorizationError);
      expect(handler).not.toHaveBeenCalled();
    });

    test("should return the domain error when the handler throws a domain error", async () => {
      const domainError = new AuthorizationError();
      const handler = vi.fn().mockRejectedValue(domainError);

      const useCase = createUseCase({
        requestShape: {
          name: string(),
        },
        authenticationRequired: false,
        handler,
      });

      const dependencies = {};

      const request = {
        name: "john",
      };

      const result = await useCase.execute(dependencies, request);

      expect(result).toBe(domainError);
      expect(handler).toHaveBeenCalledOnce();
    });

    test("should return an unexpected error when the handler throws an unexpected value", async () => {
      const unexpectedValues = [
        new Error("unexpected error"),
        "unexpected value",
        { message: "unexpected object" },
        null,
        undefined,
      ];

      for (const value of unexpectedValues) {
        const handler = vi.fn().mockRejectedValue(value);

        const useCase = createUseCase({
          requestShape: {
            name: string(),
          },
          authenticationRequired: false,
          handler,
        });

        const dependencies = {};

        const request = {
          name: "john",
        };

        const result = await useCase.execute(dependencies, request);

        expect(result).toBeInstanceOf(UnexpectedError);
        expect(handler).toHaveBeenCalledOnce();
      }
    });
  });
});