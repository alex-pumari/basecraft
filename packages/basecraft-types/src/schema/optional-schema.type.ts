import { BaseSchema } from "./base-schema.type.js";

export interface OptionalSchema<Type> extends BaseSchema<Type | undefined> {
  readonly _optional: true;
}
