import { BaseSchema } from "./base-schema.type.js";

export interface NumberSchema extends BaseSchema<number> {
  int(): NumberSchema;
  positive(): NumberSchema;
  negative(): NumberSchema;
  decimal(places: number): NumberSchema;
  equal(target: number): NumberSchema;
  gt(target: number): NumberSchema;
  gte(target: number): NumberSchema;
  lt(target: number): NumberSchema;
  lte(target: number): NumberSchema;
}
