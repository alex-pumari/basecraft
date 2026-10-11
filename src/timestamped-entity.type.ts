import { Entity } from "./entity.type";

export type TimestampedEntity<
  Identifier,
  IdentifierKey extends string = "id"
> = Entity<Identifier, IdentifierKey> & {
  createdAt: Date;
  updatedAt: Date;
};