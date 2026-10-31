import {
  AuthenticationRequiredError,
  AuthorizationError,
  DomainError,
  InvalidRequestError,
  UnexpectedError,
} from "@basecraft/errors";

export type UseCaseError<CustomError extends DomainError = never> =
  | CustomError
  | InvalidRequestError
  | AuthenticationRequiredError
  | AuthorizationError
  | UnexpectedError;
