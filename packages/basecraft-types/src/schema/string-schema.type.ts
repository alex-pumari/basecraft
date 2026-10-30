import { BaseSchema } from "./base-schema.type.js";
import { OptionalSchema } from "./optional-schema.type.js";

export interface StringSchema extends BaseSchema<string> {
  contains(substring: string): StringSchema;
  email(): StringSchema;
  min(length: number): StringSchema;
  max(length: number): StringSchema;
  optional(): OptionalSchema<string>;
}
