import { Schema } from "./schema.type.js";

export type ObjectSchema<ObjectType extends object> = {
  readonly _brand: "OBJECT";
} & {
  [Key in keyof ObjectType]: Schema<ObjectType[Key]>;
};