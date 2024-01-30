export type EncryptType = {
    encrypted: string,
      iv: string
      authTag: string
}

export interface IEncrypter {
  encrypt: (secretKey: string, privateMessage: string) => string
  decrypt: (secretKey: string, encryptedMessage: string) => string
}
