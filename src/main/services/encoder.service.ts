import { EncryptType, IEncrypter } from './encrypter.interface'
import { decodeMessage, encodeMessage } from '../lib/steganographer'
import { saveFile } from '../lib/saveFile'

class EncoderService {
  private encrypter: IEncrypter

  constructor(Encrypter: IEncrypter) {
    this.encrypter = Encrypter
  }

  public encodeFile = async (
    secretKey: string,
    privateMessage: string,
    filePath: string
  ): Promise<string> => {
    const encryptedData = this.encrypter.encrypt(secretKey, privateMessage)
    const encodedFile = await encodeMessage(filePath, encryptedData)
    const savedFilePath = await saveFile(encodedFile)
    return savedFilePath
  }
  public decodeFile = async (secretKey: string, filePath: string): Promise<string | void> => {
    const encryptedData: EncryptType | string = JSON.parse(await decodeMessage(filePath))
    if (typeof encryptedData !== 'string') {
      const decryptedMessage = this.encrypter.decrypt(secretKey, encryptedData)
      return decryptedMessage
    }
  }
}

export default EncoderService
