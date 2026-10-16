export type Brand<Type> =
  Type extends string ? "STRING" :
  Type extends number ? "NUMBER" :
  Type extends boolean ? "BOOLEAN" :
  Type extends readonly unknown[] ? "ARRAY" :
  Type extends object ? "OBJECT" :
  never;