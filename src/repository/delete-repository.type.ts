export interface DeleteRepository<Identifier> {
  delete(id: Identifier): Promise<void>;
}

export interface BulkDeleteRepository<Identifier> {
  deleteMany(ids: Identifier[]): Promise<void>;
}