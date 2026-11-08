export type VerifyOptions = {
  issuer?: string;
  audience?: string;
};

export interface TokenVerificationService<
  TokenPayload extends object,
  Token = string,
  CustomVerifyOptions extends VerifyOptions = VerifyOptions,
> {
  verify(token: Token, options?: CustomVerifyOptions): Promise<TokenPayload>;
}
