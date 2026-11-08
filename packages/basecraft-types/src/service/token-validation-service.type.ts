export interface TokenValidationService<Token = string> {
  validate(token: Token): Promise<boolean>;
}
