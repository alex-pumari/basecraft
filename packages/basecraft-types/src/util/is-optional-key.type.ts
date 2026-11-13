export type IsOptionalKey<Object extends object, Key extends keyof Object> =
  {} extends Pick<Object, Key> ? true : false;
