export interface UpdateRepository<Identifier, Input> {
  update(id: Identifier, input: Input): Promise<void>;
}

export interface BulkUpdateRepository<Identifier, Input> {
  updateMany(
    items: Array<{ id: Identifier; input: Input }>
  ): Promise<void>;
}