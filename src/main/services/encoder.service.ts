import { readFileSync } from "fs"
import { EncryptType, IEncrypter } from "./encrypter.interface"
import { decode, encode  } from 'ts-steganography'
import { decodeMessage, encodeMessage } from "../lib/steganographer"

class EncoderService {
  private encrypter: IEncrypter


  constructor(Encrypter: IEncrypter){
    this.encrypter = Encrypter
  }

  public encodeFile = async (secretKey: string, privateMessage: string, filePath: string) => {
      const encryptedData = this.encrypter.encrypt(secretKey, privateMessage)
      return await encodeMessage(filePath, encryptedData)

  }
  public decodeFile = async (filePath: string) => {
      return await decodeMessage(filePath)
  }
}

export default new EncoderService() as EncoderService
