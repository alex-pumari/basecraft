import { Shape, UseCaseDependencies } from "@basecraft/types";
import {
  AuthenticationRequiredError,
  AuthorizationError,
  InvalidRequestError,
  UnexpectedError,
} from "@basecraft/errors";
import { describe, expect, test, vi } from "vitest";
import { createUseCase } from "./create-use-case.core.js";
import { string } from "../schema/string/string.core.js";

type Request = {
  name: string;
};

type Handler = (
  dependencies: UseCaseDependencies,
  request: Request,
) => Promise<unknown>;

type EmptyRequestHandler = (
  dependencies: UseCaseDependencies,
  request: {},
) => Promise<unknown>;

type NumericRole = 1 | 2;

type NumericRoleDependencies = UseCaseDependencies<{
  id: string;
  role: NumericRole;
}>;

type NumericRoleHandler = (
  dependencies: NumericRoleDependencies,
  request: Request,
) => Promise<unknown>;

type SuccessCase = {
  testName: string;
  authRequired?: boolean;
  allowedRoles?: readonly string[];
  dependencies: UseCaseDependencies<{ id: string; role?: string }>;
};

type AuthenticationRequiredErrorCase = {
  testName: string;
  authRequired?: boolean;
  allowedRoles?: readonly string[];
};

type AuthorizationErrorCase = {
  testName: string;
  authRequired?: boolean;
  allowedRoles: readonly (string | number)[];
  dependencies: UseCaseDependencies<{
    id: string;
    role?: string | number | boolean;
  }>;
};

type InvalidRequestCase = {
  testName: string;
  requestShape: object;
  request: unknown;
};

describe("create-use-case", () => {
  describe("use case execution", () => {
    test.each<SuccessCase>([
      {
        testName:
          "should return the response when the request is valid and the handler succeeds",
        authRequired: false,
        dependencies: {},
      },
      {
        testName:
          "should execute the handler when authentication is not required and no user is authenticated",
        authRequired: false,
        dependencies: {},
      },
      {
        testName:
          "should execute the handler when authentication is optional and a user is authenticated",
        authRequired: false,
        dependencies: {
          currentUser: { id: "user-id", role: "customer" },
        },
      },
      {
        testName:
          "should execute the handler when authentication required is omitted and no user is authenticated",
        dependencies: {},
      },
      {
        testName:
          "should execute the handler when the authenticated user has an allowed role",
        authRequired: true,
        allowedRoles: ["admin", "manager"],
        dependencies: {
          currentUser: { id: "user-id", role: "manager" },
        },
      },
      {
        testName:
          "should execute the handler when allowed roles contain duplicate roles",
        authRequired: true,
        allowedRoles: ["admin", "admin"],
        dependencies: {
          currentUser: { id: "user-id", role: "admin" },
        },
      },
      {
        testName:
          "should execute the handler when authentication is required and the authenticated user has no role and no roles are configured",
        authRequired: true,
        dependencies: {
          currentUser: { id: "user-id" },
        },
      },
      {
        testName:
          "should execute the handler when authentication is not required and the authenticated user has no role and no roles are configured",
        authRequired: false,
        dependencies: {
          currentUser: { id: "user-id" },
        },
      },
      {
        testName:
          "should execute the handler when authentication required is omitted and the authenticated user has no role and no roles are configured",
        dependencies: {
          currentUser: { id: "user-id" },
        },
      },
      {
        testName:
          "should execute the handler when authentication is required and no roles are configured",
        authRequired: true,
        dependencies: {
          currentUser: { id: "user-id", role: "admin" },
        },
      },
    ])("$testName", async ({ authRequired, allowedRoles, dependencies }) => {
      const request = {
        name: "john",
      };

      const response = {
        id: "user-id",
      };

      const handler = vi.fn<Handler>().mockResolvedValue(response);

      const useCase = createUseCase({
        requestShape: {
          name: string(),
        },
        authRequired,
        allowedRoles,
        handler,
      });

      const result = await useCase.execute(dependencies, request);

      expect(result).toEqual(response);
      expect(handler).toHaveBeenCalledOnce();
      expect(handler).toHaveBeenCalledWith(dependencies, request);
    });

    test.each<InvalidRequestCase>([
      {
        testName:
          "should return an invalid request error when the request does not match the expected shape",
        requestShape: {
          name: string(),
        },
        request: {
          name: 123,
        },
      },
      {
        testName:
          "should return an invalid request error when a required property is missing",
        requestShape: {
          name: string(),
        },
        request: {},
      },
      {
        testName:
          "should return an invalid request error when the request contains extra properties and the request shape is empty",
        requestShape: {},
        request: {
          name: "john",
        },
      },
      {
        testName:
          "should return an invalid request error when the request contains properties not defined in the request shape",
        requestShape: {
          name: string(),
        },
        request: {
          name: "john",
          age: 25,
        },
      },
    ])("$testName", async ({ requestShape, request }) => {
      const handler = vi.fn<Handler>();

      const useCase = createUseCase<UseCaseDependencies, Request, unknown>({
        requestShape: requestShape as Shape<Request>,
        authRequired: false,
        handler,
      });

      const dependencies = {};

      const result = await useCase.execute(dependencies, request as Request);

      expect(result).toBeInstanceOf(InvalidRequestError);
      expect(handler).not.toHaveBeenCalled();
    });

    test("should accept an empty request when the request shape is empty", async () => {
      const response = {
        success: true,
      };

      const handler = vi.fn<EmptyRequestHandler>().mockResolvedValue(response);

      const useCase = createUseCase({
        requestShape: {},
        authRequired: false,
        handler,
      });

      const dependencies = {};

      const request = {};

      const result = await useCase.execute(dependencies, request);

      expect(result).toEqual(response);
      expect(handler).toHaveBeenCalledOnce();
      expect(handler).toHaveBeenCalledWith(dependencies, request);
    });

    test.each<AuthenticationRequiredErrorCase>([
      {
        testName:
          "should require authentication when authentication required is omitted but allowed roles are configured and no user is authenticated",
        allowedRoles: ["admin"],
      },
      {
        testName:
          "should return an authentication required error when authentication is required and no user is authenticated",
        authRequired: true,
      },
      {
        testName:
          "should require authentication when allowed roles are configured and no user is authenticated",
        authRequired: false,
        allowedRoles: ["admin"],
      },
      {
        testName:
          "should require authentication when no roles are allowed and no user is authenticated",
        allowedRoles: [],
      },
      {
        testName:
          "should require authentication when authentication is not required but no roles are allowed and no user is authenticated",
        authRequired: false,
        allowedRoles: [],
      },
    ])("$testName", async ({ authRequired, allowedRoles }) => {
      const handler = vi.fn<Handler>();

      const useCase = createUseCase({
        requestShape: {
          name: string(),
        },
        authRequired,
        allowedRoles,
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

    test.each<AuthorizationErrorCase>([
      {
        testName:
          "should return an authorization error when the authenticated user does not have an allowed role",
        authRequired: true,
        allowedRoles: ["admin"],
        dependencies: {
          currentUser: { id: "user-id", role: "customer" },
        },
      },
      {
        testName:
          "should return an authorization error when no roles are allowed",
        authRequired: true,
        allowedRoles: [],
        dependencies: {
          currentUser: { id: "user-id", role: "admin" },
        },
      },
      {
        testName:
          "should return an authorization error when no roles are allowed and authentication required is omitted",
        allowedRoles: [],
        dependencies: {
          currentUser: { id: "user-id", role: "admin" },
        },
      },
      {
        testName:
          "should return an authorization error when the authenticated user has no role and roles are allowed",
        authRequired: true,
        allowedRoles: ["admin"],
        dependencies: {
          currentUser: { id: "user-id" },
        },
      },
      {
        testName:
          "should return an authorization error when the authenticated user has no role and no roles are allowed",
        authRequired: true,
        allowedRoles: [],
        dependencies: {
          currentUser: { id: "user-id" },
        },
      },
      {
        testName:
          "should return an authorization error when allowed roles are configured and authentication is not required",
        authRequired: false,
        allowedRoles: ["admin"],
        dependencies: {
          currentUser: { id: "user-id" },
        },
      },
      {
        testName:
          "should return an authorization error when the authenticated user role is neither a string nor a number",
        authRequired: true,
        allowedRoles: [1],
        dependencies: {
          currentUser: { id: "user-id", role: true },
        },
      },
    ])("$testName", async ({ authRequired, allowedRoles, dependencies }) => {
      const handler = vi.fn<Handler>();

      const useCase = createUseCase({
        requestShape: {
          name: string(),
        },
        authRequired,
        allowedRoles,
        handler,
      });

      const request = {
        name: "john",
      };

      const result = await useCase.execute(dependencies, request);

      expect(result).toBeInstanceOf(AuthorizationError);
      expect(handler).not.toHaveBeenCalled();
    });

    test("should execute the handler when the authenticated user has an allowed numeric role", async () => {
      const request = {
        name: "john",
      };

      const response = {
        id: "user-id",
      };

      const handler = vi.fn<NumericRoleHandler>().mockResolvedValue(response);

      const useCase = createUseCase<NumericRoleDependencies, Request, unknown>({
        requestShape: {
          name: string(),
        },
        authRequired: true,
        allowedRoles: [1],
        handler,
      });

      const dependencies: NumericRoleDependencies = {
        currentUser: {
          id: "user-id",
          role: 1,
        },
      };

      const result = await useCase.execute(dependencies, request);

      expect(result).toEqual(response);
      expect(handler).toHaveBeenCalledOnce();
      expect(handler).toHaveBeenCalledWith(dependencies, request);
    });

    test("should accept special numeric values as valid numeric roles", async () => {
      const roles = [NaN, Infinity, -Infinity];

      for (const role of roles) {
        const request = {
          name: "john",
        };

        const response = {
          id: "user-id",
        };

        const handler = vi.fn<Handler>().mockResolvedValue(response);

        const useCase = createUseCase({
          requestShape: {
            name: string(),
          },
          authRequired: true,
          allowedRoles: [role],
          handler,
        });

        const dependencies = {
          currentUser: {
            id: "user-id",
            role,
          },
        };

        const result = await useCase.execute(dependencies, request);

        expect(result).toEqual(response);
        expect(handler).toHaveBeenCalledOnce();
        expect(handler).toHaveBeenCalledWith(dependencies, request);
      }
    });

    test("should return an authorization error when the authenticated user has a numeric role that is not allowed", async () => {
      const handler = vi.fn<NumericRoleHandler>();

      const useCase = createUseCase<NumericRoleDependencies, Request, unknown>({
        requestShape: {
          name: string(),
        },
        authRequired: true,
        allowedRoles: [1],
        handler,
      });

      const dependencies: NumericRoleDependencies = {
        currentUser: {
          id: "user-id",
          role: 2,
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
      const handler = vi.fn<Handler>().mockRejectedValue(domainError);

      const useCase = createUseCase({
        requestShape: {
          name: string(),
        },
        authRequired: false,
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
        const handler = vi.fn<Handler>().mockRejectedValue(value);

        const useCase = createUseCase({
          requestShape: {
            name: string(),
          },
          authRequired: false,
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
