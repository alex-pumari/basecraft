export type Entity<
  IdentifierValue,
  IdentifierField extends string = "id"
> = {
  [Field in IdentifierField]: IdentifierValue;
};