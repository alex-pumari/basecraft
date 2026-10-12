import { StringSchema } from "./string-schema.type.js";
import { ArraySchema } from "./array-schema.type.js";
import { BooleanSchema } from "./boolean-schema.type.js";
import { NumberSchema } from "./number-schema.type.js";
import { ObjectSchema } from "./object-schema.type.js";

export type InferSchema<SchemaType> =
  SchemaType extends StringSchema ? string :
  SchemaType extends NumberSchema ? number :
  SchemaType extends BooleanSchema ? boolean :
  SchemaType extends ArraySchema<infer ItemType> ? ItemType[] :
  SchemaType extends ObjectSchema<infer ObjectType> ? {
    [Key in keyof ObjectType]: InferSchema<ObjectType[Key]>;
  } :
  never;