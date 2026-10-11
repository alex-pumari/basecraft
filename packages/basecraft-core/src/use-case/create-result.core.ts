import { SuccessResult, ErrorResult } from "basecraft-types";

export const createResult = {
  success<Value>(
    value: Value
  ): SuccessResult<Value> {
    return {
      success: true,
      value,
    };
  },

  failure<CustomError extends Error>(
    error: CustomError,
  ): ErrorResult<CustomError> {
    return {
      success: false,
      error,
    };
  },
};