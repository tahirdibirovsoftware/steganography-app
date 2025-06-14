import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import { getFilePath } from './lib/getFilePath'
import { makeDirectory } from './lib/folderCheck'
import { config } from 'dotenv'
import EncoderService from './services/encoder.service'
import EncrypterService from './services/encrypter.service'
config()

const encodingService = new EncoderService(new EncrypterService())

function createWindow(): void {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 800,
    show: false,
    autoHideMenuBar: true,
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }

  eventHandler(mainWindow)

}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  createWindow()
  makeDirectory(process.env.DATA_SAVE_DIRECTORY || 'Steganography')
  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.

const eventHandler = (win: BrowserWindow):void => {
  ipcMain.handle('encrypt-it', async (_event, data) => {
    const filePath = await getFilePath(win)
    const { secretKey, privateMessage } = data
    if (filePath) {
     const savedFilePath = await encodingService.encodeFile(secretKey, privateMessage, filePath)
     console.log(savedFilePath)
     return savedFilePath
    }
    return 0
  })

  ipcMain.handle('decrypt-it', async (_event, data) => {
    const filePath = await getFilePath(win)
    const { secretKey } = data
    if (filePath) {
      const message = await encodingService.decodeFile(secretKey, filePath)
      return message
    }
    return 0
  })
}
