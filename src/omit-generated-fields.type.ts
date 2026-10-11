import { Entity } from "./entity.type";

export type OmitGeneratedFields<EntityType extends Entity<EntityType["id"]>> =
  {
    [Field in keyof EntityType as
      undefined extends EntityType[Field] ? never : Field
    ]: EntityType[Field];
  } & {
    [Field in keyof EntityType as
      undefined extends EntityType[Field] ? Field : never
    ]?: never;
  };