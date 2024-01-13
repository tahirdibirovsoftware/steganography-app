class Encrypter {
  private data: string
  private secretKey: string

  constructor(data: string, secretKey: string) {
    this.data = data
    this.secretKey = secretKey
  }
  public encrypt = (): string => {
    return 'Encrypted Data'
  }
  public decrypt = (): string => {
    return 'Decrypted Data'
  }
}

export default Encrypter
