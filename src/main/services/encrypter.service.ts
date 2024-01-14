import { EncryptType, IEncrypter } from './encrypter.interface'
import crypto, { DecipherGCM, CipherGCM } from 'crypto'

class EncrypterService implements IEncrypter {
  private iv: string = 'dbrv-not-secure'
  private hashedIv: Buffer = crypto.createHash('sha256').update(this.iv).digest().slice(0, 12)
  encrypt = (secretKey: string, privateMessage: string): EncryptType => {
    const hashedKey: Buffer = crypto.createHash('sha256').update(secretKey).digest()
    const chiper: CipherGCM = crypto.createCipheriv('aes-256-gcm', hashedKey, this.hashedIv)
    let encrypted: string = chiper.update(privateMessage, 'utf-8', 'hex')
    encrypted += chiper.final('hex')

    const authTag: Buffer = chiper.getAuthTag()

    return {
      encrypted,
      iv: this.hashedIv.toString('hex'),
      authTag: authTag.toString('hex')
    }
  }
  decrypt = (secretKey: string, encryptedMessage: EncryptType): string => {
    const hashedKey: Buffer = crypto.createHash('sha256').update(secretKey).digest()
    const dechiper: DecipherGCM = crypto.createDecipheriv('aes-256-gcm', hashedKey, this.hashedIv)
    dechiper.setAuthTag(Buffer.from(encryptedMessage.authTag, 'hex'))
    const decrypted = dechiper.update(encryptedMessage.encrypted, 'hex', 'utf8')
    return decrypted
  }
}

export default EncrypterService
