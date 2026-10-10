import { Entity } from "../entity.type";

export interface ReadRepository<EntityType extends Entity<EntityType["id"]>> {
  findById(id: EntityType["id"]): Promise<EntityType | null>;

  findAll(): Promise<EntityType[]>;
}