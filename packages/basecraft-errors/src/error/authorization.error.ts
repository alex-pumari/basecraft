import { DomainError } from "./domain.error.js";

export class AuthorizationError extends DomainError<"AUTHORIZATION_ERROR"> {
  readonly code = "AUTHORIZATION_ERROR";

  constructor(
    message = "The user is not authorized to perform this operation.",
  ) {
    super(message);
  }
}