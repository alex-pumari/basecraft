export interface SuccessResult<Value> {
  success: true;
  value: Value;
}

export interface ErrorResult<CustomError extends Error> {
  success: false;
  error: CustomError;
}

export type Result<Data, CustomError extends Error> =
  | SuccessResult<Data>
  | ErrorResult<CustomError>;