import { Schema } from "./schema.type.js";

export type Shape<ObjectType extends object> = {
  [Key in keyof ObjectType]: Schema<ObjectType[Key]>;
};