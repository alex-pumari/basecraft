import { OptionalSchema } from "./optional-schema.type.js";
import { Schema } from "./schema.type.js";

type OptionalKeys<ObjectType> = {
  [Key in keyof ObjectType]-?: undefined extends ObjectType[Key] ? Key : never;
}[keyof ObjectType];

export type Shape<ObjectType extends object> = {
  [Key in Exclude<keyof ObjectType, OptionalKeys<ObjectType>>]-?: Schema<
    ObjectType[Key]
  >;
} & {
  [Key in OptionalKeys<ObjectType>]-?: OptionalSchema<
    Exclude<ObjectType[Key], undefined>
  >;
};
