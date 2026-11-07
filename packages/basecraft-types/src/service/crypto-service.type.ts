export interface CryptoService {
  hashSecret(secret: string): Promise<string>;

  compareSecret(secret: string, hashedSecret: string): Promise<boolean>;

  hash(value: string): Promise<string>;

  encrypt(value: string): Promise<string>;

  decrypt(encryptedValue: string): Promise<string>;

  randomBytes(length: number): Promise<Uint8Array>;
}
