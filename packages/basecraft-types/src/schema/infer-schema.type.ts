import { BaseSchema } from "./base-schema.type.js";

export type InferSchema<SchemaType> =
  SchemaType extends BaseSchema<infer Type> ? Type : never;
