import { BaseSchema } from "./base-schema.type.js";

export interface NumberSchema extends BaseSchema<number> {
  integer(): NumberSchema;
  decimal(): NumberSchema;
  positive(): NumberSchema;
  negative(): NumberSchema;
  equal(target: number): NumberSchema;
  greaterThan(target: number): NumberSchema;
  lessThan(target: number): NumberSchema;
}