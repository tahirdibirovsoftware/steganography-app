import { contextBridge, ipcRenderer, shell } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

// Custom APIs for renderer

type EncDataType = { privateMessage: string; secretKey: string }

const api = {
  sendDataToMainEnc: async (data: EncDataType): Promise<string | void> =>
    await ipcRenderer.invoke('encrypt-it', data),
  sendDataToMainDec: async (data: EncDataType): Promise<string | void> =>
    await ipcRenderer.invoke('decrypt-it', data),
  showTheFile: (filePath:string): void => shell.showItemInFolder(filePath)
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
