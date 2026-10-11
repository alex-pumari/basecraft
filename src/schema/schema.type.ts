import { StringSchema } from "./string-schema.type";
import { ArraySchema } from "./array-schema.type";
import { BooleanSchema } from "./boolean-schema.type";
import { NumberSchema } from "./number-schema.type";
import { ObjectSchema } from "./object-schema.type";

export type Schema<Type> =
  Type extends number ? NumberSchema :
  Type extends string ? StringSchema :
  Type extends boolean ? BooleanSchema :
  Type extends Array<infer Item> ? ArraySchema<Item> :
  Type extends object ? ObjectSchema<Type> :
  never;