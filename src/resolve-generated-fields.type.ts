import { Entity } from "./entity.type";

export type ResolveGeneratedFields<EntityType extends Entity<EntityType["id"]>> = {
  [Field in keyof EntityType]-?: Exclude<EntityType[Field], undefined>;
};