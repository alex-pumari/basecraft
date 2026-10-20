export type RequireAtLeastOne<ObjectType extends object> = {
  [Key in keyof ObjectType]-?: Required<Pick<ObjectType, Key>> &
    Partial<Omit<ObjectType, Key>>;
}[keyof ObjectType];