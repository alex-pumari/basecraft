export type IdentifierField = "id"; 

export type Entity<IdentifierValue> = {
  [Field in IdentifierField]: IdentifierValue;
};