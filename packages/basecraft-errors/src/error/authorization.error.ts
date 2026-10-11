import { DomainError } from "./domain.error";

export class AuthorizationError extends DomainError {
  readonly code = "AUTHORIZATION_ERROR";

  constructor(
    message = "The user is not authorized to perform this operation.",
  ) {
    super(message);
  }
}