import { BaseSchema } from "./base-schema.type.js";

export interface StringSchema extends BaseSchema<string> {
  contains(substring: string): StringSchema;
  minLength(length: number): StringSchema;
  maxLength(length: number): StringSchema;
}