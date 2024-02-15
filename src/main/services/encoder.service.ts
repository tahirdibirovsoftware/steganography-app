import { IEncrypter } from '../repository/encrypter.interface';
import { decodeMessage, encodeMessage } from '../lib/steganographer';
import { saveFile } from '../lib/saveFile';

class EncoderService {
  constructor(private encrypter: IEncrypter) {}

  public async encodeFile(
    secretKey: string,
    privateMessage: string,
    filePath: string
  ): Promise<string> {
    try {
      const encryptedData = this.encrypter.encrypt(secretKey, privateMessage);
      const encodedFile = await encodeMessage(filePath, encryptedData);
      const savedFilePath = await saveFile(encodedFile);
      return savedFilePath;
    } catch (error) {
      console.error('Error encoding file:', error);
      throw error; // Or handle it as per your application's error handling policy
    }
  }

  public async decodeFile(secretKey: string, filePath: string): Promise<string> {
    try {
      const encryptedData: string = await decodeMessage(filePath);
      const decryptedMessage = this.encrypter.decrypt(secretKey, encryptedData);
      return decryptedMessage;
    } catch (error) {
      console.error('Error decoding file:', error);
      throw error; // Or handle it as per your application's error handling policy
    }
  }
}

export default EncoderService;
