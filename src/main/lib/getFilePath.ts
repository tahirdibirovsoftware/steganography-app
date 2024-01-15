import { BrowserWindow, OpenDialogOptions, dialog } from 'electron'

export const getFilePath = async (win: BrowserWindow): Promise<string | void> => {
  const options: OpenDialogOptions = {
    // Add your desired options here
    properties: ['openFile'],
    filters: [{
      name: 'Images',
      extensions: ['png']
    }]
  }

  const { canceled, filePaths } = await dialog.showOpenDialog(options)
  if (!canceled) {
    win.focus()
    return filePaths[0]
  }
}
