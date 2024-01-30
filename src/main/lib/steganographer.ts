import Jimp from 'jimp';

class ImageProcessingError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ImageProcessingError';
  }
}

function messageToBinary(message: string | object): string {
  const messageString = typeof message === 'object' ? JSON.stringify(message) : message;
  return messageString
    .split('')
    .map(char => char.charCodeAt(0).toString(2).padStart(8, '0'))
    .join('') + '00100011'; // Adding '#' as a delimiter in binary
}

function binaryToMessage(binaryData: string): string {
  let message = '';
  for (let i = 0; i < binaryData.length; i += 8) {
    const byte = binaryData.slice(i, i + 8);
    if (byte === '00100011') break; // Stop at the binary for '#'
    message += String.fromCharCode(parseInt(byte, 2));
  }
  return message;
}

async function encodeMessage(imagePath: string, message: string | object): Promise<Jimp> {
  try {
    const image = await Jimp.read(imagePath);
    const binaryMessage = messageToBinary(message);

    let index = 0;
    image.scan(0, 0, image.bitmap.width, image.bitmap.height, function (_x, _y, idx) {
      if (index < binaryMessage.length) {
        const bit = binaryMessage[index++] === '1' ? 1 : 0;
        this.bitmap.data[idx] = (this.bitmap.data[idx] & 0xfe) | bit;
      }
    });

    return image;
  } catch (error) {
    throw new ImageProcessingError(`Failed to encode message: ${error instanceof Error ? error.message : error}`);
  }
}

async function decodeMessage(imagePath: string): Promise<string> {
  try {
    const image = await Jimp.read(imagePath);
    let binaryData = '';

    image.scan(0, 0, image.bitmap.width, image.bitmap.height, function (_x, _y, idx) {
      binaryData += this.bitmap.data[idx] & 0x1;
    });

    return binaryToMessage(binaryData);
  } catch (error) {
    throw new ImageProcessingError(`Failed to decode message: ${error instanceof Error ? error.message : error}`);
  }
}

export { decodeMessage, encodeMessage };
