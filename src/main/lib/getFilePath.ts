import { OpenDialogOptions, dialog } from 'electron'

export const getFilePath = async (): Promise<string | void> => {
  const options: OpenDialogOptions = {
    // Add your desired options here
    properties: ['openFile']
  }

  const { canceled, filePaths } = await dialog.showOpenDialog(options)
  if (!canceled) {
    return filePaths[0]
  }
}
