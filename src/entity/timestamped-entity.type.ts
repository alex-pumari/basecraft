import { Entity } from "./entity.type";

export type TimestampedEntity<
  IdentifierValue,
  IdentifierField extends string = "id"
> = Entity<IdentifierValue, IdentifierField> & {
  createdAt: Date;
  updatedAt: Date;
};