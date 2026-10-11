import { Entity } from "./entity.type";

export type OmitGeneratedAttributes<EntityType extends Entity<EntityType["id"]>> =
  {
    [Key in keyof EntityType as
      undefined extends EntityType[Key] ? never : Key
    ]: EntityType[Key];
  } & {
    [Key in keyof EntityType as
      undefined extends EntityType[Key] ? Key : never
    ]?: never;
  };