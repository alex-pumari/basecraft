import type { BaseSchema } from "./base-schema.type.js";
import type { Shape } from "./shape.type.js";

export type ObjectSchema<ObjectType extends object> =
  BaseSchema<ObjectType> & Shape<ObjectType>;