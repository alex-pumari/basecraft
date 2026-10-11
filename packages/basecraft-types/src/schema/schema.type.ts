import { StringSchema } from "./string-schema.type.js";
import { ArraySchema } from "./array-schema.type.js";
import { BooleanSchema } from "./boolean-schema.type.js";
import { NumberSchema } from "./number-schema.type.js";
import { ObjectSchema } from "./object-schema.type.js";

export type Schema<Type> =
  Type extends number ? NumberSchema :
  Type extends string ? StringSchema :
  Type extends boolean ? BooleanSchema :
  Type extends Array<infer Item> ? ArraySchema<Item> :
  Type extends object ? ObjectSchema<Type> :
  never;