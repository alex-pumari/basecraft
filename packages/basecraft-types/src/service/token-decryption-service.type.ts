export type DecryptOptions = Record<string, unknown>;

export interface TokenDecryptionService<
  TokenPayload extends object,
  Token = string,
  CustomDecryptOptions extends DecryptOptions = DecryptOptions,
> {
  decrypt(token: Token, options?: CustomDecryptOptions): Promise<TokenPayload>;
}
