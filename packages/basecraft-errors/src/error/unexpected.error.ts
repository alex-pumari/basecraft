import { DomainError } from "./domain.error.js";

export class UnexpectedError extends DomainError<"UNEXPECTED_ERROR"> {
  readonly code = "UNEXPECTED_ERROR";

  constructor(message = "An unexpected error occurred.") {
    super(message);
  }
}