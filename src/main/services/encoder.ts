class Encoder {
  private imagePath: string
  private encryptedData?: string
  constructor(imagePath: string, encryptedData?: string) {
    this.imagePath = imagePath
    this.encryptedData = encryptedData
  }
  public encode = (): string => {
    return 'Encoded File Path'
  }
  public decode = (): string => {
    return 'Decoded File Path'
  }
}

export default Encoder
