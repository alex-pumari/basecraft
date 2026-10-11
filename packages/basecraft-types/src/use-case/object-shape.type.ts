import { Schema } from "../schema/schema.type.js";

export type ObjectShape<ObjectType extends object> = {
  [Key in keyof ObjectType]: Schema<ObjectType[Key]>;
};