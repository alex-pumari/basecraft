import { BaseSchema } from "./base-schema.type.js";

export interface StringSchema extends BaseSchema<string> {
  contains(substring: string): StringSchema;
  min(length: number): StringSchema;
  max(length: number): StringSchema;
}
