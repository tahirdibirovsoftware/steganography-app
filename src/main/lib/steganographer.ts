import Jimp from 'jimp'

async function encodeMessage(imagePath: string, message: string | object): Promise<Jimp> {
  const image = await Jimp.read(imagePath)
  const messageString = typeof message === 'object' ? JSON.stringify(message) : message
  // Adding a special delimiter to indicate the end of the message
  const fullMessage = messageString + '#' // "#" as a delimiter
  const binaryMessage = fullMessage
    .split('')
    .map((char) => char.charCodeAt(0).toString(2).padStart(8, '0'))
    .join('')

  let index = 0
  image.scan(0, 0, image.bitmap.width, image.bitmap.height, function (x, y, idx) {
    if (index < binaryMessage.length) {
      const bit = binaryMessage[index] === '1' ? 1 : 0
      this.bitmap.data[idx] = (this.bitmap.data[idx] & 0xfe) | bit
      index++
    }
  })

  return image
}

async function decodeMessage(imagePath: string): Promise<string> {
  const image = await Jimp.read(imagePath)
  let binaryData = ''

  image.scan(0, 0, image.bitmap.width, image.bitmap.height, function (x, y, idx) {
    const bit = this.bitmap.data[idx] & 0x1
    binaryData += bit
  })

  let message = ''
  for (let i = 0; i < binaryData.length; i += 8) {
    const byte = binaryData.slice(i, i + 8)
    const charCode = parseInt(byte, 2)
    const char = String.fromCharCode(charCode)
    if (char === '#') break // Stop at the delimiter
    message += char
  }

  return message
}

export { decodeMessage, encodeMessage }
