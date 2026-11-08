export type SignOptions = {
  expiresIn?: number | string;
  issuer?: string;
  audience?: string;
};

export interface TokenSigningService<
  TokenPayload extends object,
  Token = string,
  CustomSignOptions extends SignOptions = SignOptions,
> {
  sign(payload: TokenPayload, options?: CustomSignOptions): Promise<Token>;
}
