import { Schema } from "./schema.type";

export type ObjectSchema<ObjectType extends object> = {
  readonly _brand: "OBJECT";
} & {
  [Key in keyof ObjectType]: Schema<ObjectType[Key]>;
};