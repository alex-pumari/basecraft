export type EncryptOptions = Record<string, unknown>;

export interface TokenEncryptionService<
  TokenPayload extends object,
  Token = string,
  CustomEncryptOptions extends EncryptOptions = EncryptOptions,
> {
  encrypt(
    payload: TokenPayload,
    options?: CustomEncryptOptions,
  ): Promise<Token>;
}
