import { Entity } from "../entity/entity.type.js";

export interface CreateRepository<CustomEntity extends Entity<CustomEntity["id"]>, Input> {
  create(input: Input): Promise<CustomEntity>;
}

export interface BulkCreateRepository<CustomEntity extends Entity<CustomEntity["id"]>, Input> {
  createMany(inputs: Input[]): Promise<CustomEntity[]>;
}