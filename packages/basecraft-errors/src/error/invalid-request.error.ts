import { DomainError } from "./domain.error.js";

export class InvalidRequestError extends DomainError {
  readonly code = "INVALID_REQUEST";

  constructor(message = "The request is invalid.") {
    super(message);
  }
}