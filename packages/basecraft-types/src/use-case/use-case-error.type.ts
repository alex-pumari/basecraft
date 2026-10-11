import { AuthenticationRequiredError } from "../../packages/basecraft-errors/src/error/authentication-required.error";
import { AuthorizationError } from "../../packages/basecraft-errors/src/error/authorization.error";
import { DomainError } from "../../packages/basecraft-errors/src/error/domain.error";
import { InvalidRequestError } from "../../packages/basecraft-errors/src/error/invalid-request.error";
import { UnexpectedError } from "../../packages/basecraft-errors/src/error/unexpected.error";

export type UseCaseError<CustomError extends DomainError> =
  | CustomError
  | InvalidRequestError
  | AuthenticationRequiredError
  | AuthorizationError
  | UnexpectedError;