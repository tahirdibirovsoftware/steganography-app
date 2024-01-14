import { readFileSync } from "fs"
import { EncryptType, IEncrypter } from "./encrypter.interface"
import { decode, encode  } from 'ts-steganography'
import { decodeMessage, encodeMessage } from "../lib/steganographer"

class EncoderService {
  private filePath: string
  private encryptedData?: string
  private encrypter: IEncrypter
  // constructor(imagePath: string, encryptedData?: string) {
  //   this.imagePath = imagePath
  //   this.encryptedData = encryptedData
  // }
  public encodeFile = async (filePath: string) => {
      return await encodeMessage(filePath, {namer: 'Tahir'})
  }
  public decodeFile = async (filePath: string) => {
      return await decodeMessage(filePath)
  }
}

export default new EncoderService() as EncoderService
