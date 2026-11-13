export type RequireAtLeastOne<Object extends object> = {
  [Key in keyof Object]-?: Required<Pick<Object, Key>> &
    Partial<Omit<Object, Key>>;
}[keyof Object];
