import { ElectronAPI } from '@electron-toolkit/preload'

declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      sendDataToMainEnc: (data: EncDataType) => Promise<string | void>
    }
  }
}
