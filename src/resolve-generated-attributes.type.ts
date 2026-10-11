import { Entity } from "./entity.type";

export type ResolveGeneratedAttributes<EntityType extends Entity<EntityType["id"]>> = {
  [Key in keyof EntityType]-?: Exclude<EntityType[Key], undefined>;
};