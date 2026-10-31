import {
  Result,
  UseCase,
  UseCaseDependencies,
  UseCaseError,
  UseCaseOptions,
} from "@basecraft/types";
import {
  AuthenticationRequiredError,
  AuthorizationError,
  DomainError,
  InvalidRequestError,
  UnexpectedError,
} from "@basecraft/errors";
import { userHasRole } from "./user-has-role.core.js";
import { createValidator } from "./create-validator.core.js";

export function createUseCase<
  Dependencies extends UseCaseDependencies,
  Request extends object,
  Response,
  CustomError extends DomainError = never,
>(
  options: UseCaseOptions<Dependencies, Request, Response, CustomError>,
): UseCase<Dependencies, Request, Response, CustomError> {
  const requestValidator = createValidator(options.requestShape);

  const roleAuthRequired = options.allowedRoles !== undefined;
  const authRequired = options.authRequired || roleAuthRequired;

  return {
    execute: async (
      dependencies: Dependencies,
      request: Request,
    ): Promise<Result<Response, UseCaseError<CustomError>>> => {
      const isRequestValid = requestValidator.isValid(request);

      if (!isRequestValid) {
        return new InvalidRequestError();
      }

      const { currentUser } = dependencies;

      if (!currentUser) {
        if (authRequired) {
          return new AuthenticationRequiredError();
        }
      } else if (roleAuthRequired) {
        const allowedRoles = options.allowedRoles as readonly (
          string | number
        )[];

        if (
          !userHasRole(currentUser) ||
          !allowedRoles.includes(currentUser.role)
        ) {
          return new AuthorizationError();
        }
      }

      try {
        return await options.handler(dependencies, request);
      } catch (error: unknown) {
        if (error instanceof DomainError) {
          return error as UseCaseError<CustomError>;
        }

        return new UnexpectedError();
      }
    },
  };
}
