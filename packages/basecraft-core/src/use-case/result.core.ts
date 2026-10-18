export const result = {
  isError(value: unknown): value is Error {
    return value instanceof Error;
  },

	isSuccess<Value>(value: Value | Error): value is Value {
		return !(value instanceof Error);
	},
};