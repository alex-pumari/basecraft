import { Entity, IdentifierField } from "./entity.type.js";

export type ResolveGeneratedFields<CustomEntity extends Entity<CustomEntity[IdentifierField]>> = {
  [Field in keyof CustomEntity]-?: Exclude<CustomEntity[Field], undefined>;
};