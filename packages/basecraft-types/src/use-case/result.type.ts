import { DomainError } from "@basecraft/errors";

export type Result<Value, CustomError extends DomainError = never> =
  Value | CustomError;

export type AsyncResult<
  Value,
  CustomError extends DomainError = never,
> = Promise<Result<Value, CustomError>>;
