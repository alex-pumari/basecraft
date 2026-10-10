export type RequireAtLeastOne<ObjectType> = {
  [Key in keyof ObjectType]-?: Required<Pick<ObjectType, Key>> &
    Partial<Omit<ObjectType, Key>>;
}[keyof ObjectType];