import { Entity } from "../entity.type";

export interface UpdateRepository<Identifier, Input, EntityType extends Entity<EntityType["id"]>> {
  update(id: Identifier, input: Input): Promise<EntityType>;
}

export interface BulkUpdateRepository<Identifier, Input> {
  updateMany(
    items: Array<{ id: Identifier; input: Input }>
  ): Promise<void>;
}