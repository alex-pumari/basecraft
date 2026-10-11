import { Entity } from "./entity.type";

export type ResolveGeneratedFields<CustomEntity extends Entity<CustomEntity["id"]>> = {
  [Field in keyof CustomEntity]-?: Exclude<CustomEntity[Field], undefined>;
};