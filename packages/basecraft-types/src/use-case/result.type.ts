import { DomainError } from "basecraft-errors";

export type Result<Value, CustomError extends DomainError> = Value | CustomError;

export type AsyncResult<Value, CustomError extends DomainError> = Promise<
  Result<Value, CustomError>
>;