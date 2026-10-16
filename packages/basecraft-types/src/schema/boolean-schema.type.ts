import { BaseSchema } from "./base-schema.type.js";

export interface BooleanSchema extends BaseSchema<boolean> {
  equal(target: boolean): BooleanSchema;
}