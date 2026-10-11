import { Result } from "../../../basecraft-types/src/use-case/result.type";

export const createResult = {
  success<Value>(
    value: Value
  ): Result<Value, never> {
    return {
      success: true,
      value,
    };
  },

  failure<CustomError extends Error>(
    error: CustomError,
  ): Result<never, CustomError> {
    return {
      success: false,
      error,
    };
  },
};