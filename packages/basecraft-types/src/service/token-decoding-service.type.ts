export interface TokenDecodingService<
  TokenPayload extends object,
  Token = string,
> {
  decode(token: Token): Promise<TokenPayload | null>;
}
