export type Entity<
  Identifier,
  IdentifierKey extends string = "id"
> = {
  [key in IdentifierKey]: Identifier;
};