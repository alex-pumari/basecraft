import { Schema } from "./schema.type";

export type ObjectSchema<ObjectType extends object> = {
  [Key in keyof ObjectType]: Schema<ObjectType[Key]>;
};