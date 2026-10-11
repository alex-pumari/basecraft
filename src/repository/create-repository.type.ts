import { Entity } from "../entity/entity.type";

export interface CreateRepository<EntityType extends Entity<EntityType["id"]>, Input> {
  create(input: Input): Promise<EntityType>;
}

export interface BulkCreateRepository<EntityType extends Entity<EntityType["id"]>, Input> {
  createMany(inputs: Input[]): Promise<EntityType[]>;
}