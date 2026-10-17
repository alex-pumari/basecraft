import {
  Result,
  UseCase,
  UseCaseDependencies,
  UseCaseError,
  UseCaseOptions,
} from "basecraft-types";
import {
  AuthenticationRequiredError,
  AuthorizationError,
  DomainError,
  InvalidRequestError,
  UnexpectedError
} from "basecraft-errors";
import { createValidator } from "./create-validator.core.js";

export function createUseCase<
  Dependencies extends UseCaseDependencies,
  Request extends object,
  Response,
  CustomError extends DomainError = DomainError,
>(
  options: UseCaseOptions<
    Dependencies,
    Request,
    Response,
    CustomError
  >,
): UseCase<Dependencies, Request, Response, CustomError> {
  const requestValidator = createValidator(options.requestShape);

  const roleAuthorizationRequired = options.allowedRoles !== undefined;
  const authenticationRequired = options.authenticationRequired || roleAuthorizationRequired;

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

      if (authenticationRequired && !currentUser) {
        return new AuthenticationRequiredError();
      }

      if (
        roleAuthorizationRequired &&
        !options.allowedRoles!.includes(currentUser!.role)
      ) {
        return new AuthorizationError();
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