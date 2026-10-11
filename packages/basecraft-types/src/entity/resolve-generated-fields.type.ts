import { Entity } from "./entity.type.js";

export type ResolveGeneratedFields<CustomEntity extends Entity<CustomEntity["id"]>> = {
  [Field in keyof CustomEntity]-?: Exclude<CustomEntity[Field], undefined>;
};