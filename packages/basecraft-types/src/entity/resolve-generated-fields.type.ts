import { Entity, IdentifierField } from "./entity.type.js";
import { IsGeneratedField } from "./is-generated-field.type.js";

export type ResolveGeneratedFields<
  CustomEntity extends Entity<CustomEntity[IdentifierField]>,
> = {
  [Field in keyof CustomEntity]: IsGeneratedField<
    CustomEntity,
    Field
  > extends true
    ? Exclude<CustomEntity[Field], undefined>
    : CustomEntity[Field];
};
