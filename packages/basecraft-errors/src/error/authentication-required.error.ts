import { DomainError } from "./domain.error.js";

export class AuthenticationRequiredError extends DomainError {
  readonly code = "AUTHENTICATION_REQUIRED";

  constructor(message = "Authentication is required.") {
    super(message);
  }
}