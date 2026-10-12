import { Entity, IdentifierField } from "../entity/entity.type.js";

export interface CreateRepository<CustomEntity extends Entity<CustomEntity[IdentifierField]>, Input> {
  create(input: Input): Promise<CustomEntity>;
}

export interface BulkCreateRepository<CustomEntity extends Entity<CustomEntity[IdentifierField]>, Input> {
  createMany(inputs: Input[]): Promise<CustomEntity[]>;
}