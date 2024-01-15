import Jimp from 'jimp'
import { homedir } from 'os'
import { resolve } from 'path'
import { uid } from 'uid'

const homeDirectory = homedir()
const folderName = 'Steganography'
const folderPath = resolve(homeDirectory, folderName)
const fileName = `encoded-${uid()}.png`
const filePath = resolve(folderPath, fileName)

export const saveFile = async (file: Jimp): Promise<string> => {
  await file.writeAsync(filePath)
  return filePath
}
