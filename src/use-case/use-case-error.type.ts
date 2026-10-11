import { AuthenticationRequiredError } from "../helpers/error/authentication-required.error";
import { AuthorizationError } from "../helpers/error/authorization.error";
import { DomainError } from "../helpers/error/domain.error";
import { InvalidRequestError } from "../helpers/error/invalid-request.error";
import { UnexpectedError } from "../helpers/error/unexpected.error";

export type UseCaseError<CustomError extends DomainError> =
  | CustomError
  | InvalidRequestError
  | AuthenticationRequiredError
  | AuthorizationError
  | UnexpectedError;