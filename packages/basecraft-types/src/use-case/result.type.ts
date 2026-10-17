import { DomainError } from "basecraft-errors";

export type Result<Value, CustomError extends DomainError> = Value | CustomError;