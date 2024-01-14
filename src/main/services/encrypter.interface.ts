export type EncryptType = {
    encrypted: string,
      iv: string
      authTag: string
}

export interface IEncrypter {
  encrypt: (secretKey: string, privateMessage: string) => EncryptType
  decrypt: (secretKey: string, encryptedMessage: EncryptType) => string
}
