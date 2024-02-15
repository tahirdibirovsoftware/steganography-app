import { decryptData, encryptData } from '../lib/gcmEncryption'
import { IEncrypter } from '../repository/encrypter.interface'


class EncrypterService implements IEncrypter {
  
  encrypt = (secretKey: string, privateMessage: string): string => {
    
    return encryptData(secretKey, privateMessage)

  }
  decrypt = (secretKey: string, encryptedMessage: string): string => {
    
    return decryptData(secretKey, encryptedMessage)

}}

export default EncrypterService
