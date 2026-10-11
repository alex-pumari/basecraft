export interface SuccessResult<Data> {
  success: true;
  data: Data;
}

export interface ErrorResult<ErrorType> {
  success: false;
  error: ErrorType;
}

export type Result<Data, ErrorType = Error> =
  | SuccessResult<Data>
  | ErrorResult<ErrorType>;