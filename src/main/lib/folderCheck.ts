import { resolve } from 'path'
import { mkdir, access, constants } from 'fs'
import { homedir } from 'os'

const homeDirectory = homedir()

const makeDirectory = async (directoryName: string) => {
  const targetDirectory = resolve(homeDirectory, directoryName)
  await access(targetDirectory, constants.F_OK, (err) => {
    if (err) {
      mkdir(targetDirectory, { recursive: true }, (err) => {
        if (err) {
          console.log('Error while making the folder')
        } else {
          console.log('Folder made successfully!')
        }
      })
    } else {
      console.log('Folder already exists')
    }
  })
}


export {makeDirectory}