import {
  ObjectSchema,
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
import { createResult } from "./create-result.core.js";

export declare function createValidator<Request extends object>(schema: ObjectSchema<Request>): { isValid: (request: Request) => boolean };

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
  const requestValidator = createValidator<Request>(options.requestSchema);

  const roleAuthorizationRequired = options.allowedRoles !== undefined;
  const authenticationRequired = options.authenticationRequired || roleAuthorizationRequired;

  return {
    execute: async (
      dependencies: Dependencies,
      request: Request,
    ): Promise<Result<Response, UseCaseError<CustomError>>> => {
      const isRequestValid = requestValidator.isValid(request);

      if (!isRequestValid) {
        return createResult.failure(new InvalidRequestError());
      }

      const { currentUser } = dependencies;

      if (authenticationRequired && !currentUser) {
        return createResult.failure(new AuthenticationRequiredError());
      }

      if (
        roleAuthorizationRequired &&
        !options.allowedRoles!.includes(currentUser!.role)
      ) {
        return createResult.failure(new AuthorizationError());
      }

      try {
        return await options.handler(dependencies, request);
      } catch (error: unknown) {

        if (error instanceof DomainError) {
          return createResult.failure(error as UseCaseError<CustomError>);
        }

        return createResult.failure(new UnexpectedError());
      }
    },
  };
}