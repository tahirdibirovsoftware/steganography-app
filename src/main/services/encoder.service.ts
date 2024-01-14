import { IEncrypter } from "./encrypter.interface"

class EncoderService {
  private imagePath: string
  private encryptedData?: string
  private encrypter: IEncrypter
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

export default EncoderService
