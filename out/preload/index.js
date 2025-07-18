"use strict";
const electron = require("electron");
const preload = require("@electron-toolkit/preload");
const api = {
  sendDataToMainEnc: async (data) => await electron.ipcRenderer.invoke("encrypt-it", data),
  sendDataToMainDec: async (data) => await electron.ipcRenderer.invoke("decrypt-it", data),
  showTheFile: (filePath) => electron.shell.showItemInFolder(filePath)
};
if (process.contextIsolated) {
  try {
    electron.contextBridge.exposeInMainWorld("electron", preload.electronAPI);
    electron.contextBridge.exposeInMainWorld("api", api);
  } catch (error) {
    console.error(error);
  }
} else {
  window.electron = preload.electronAPI;
  window.api = api;
}
