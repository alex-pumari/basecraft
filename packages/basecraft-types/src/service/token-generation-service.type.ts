export type GenerateOptions = {
  length?: number;
};

export interface TokenGenerationService<
  Token = string,
  CustomGenerateOptions extends GenerateOptions = GenerateOptions,
> {
  generate(options?: CustomGenerateOptions): Promise<Token>;
}
