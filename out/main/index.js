"use strict";
const electron = require("electron");
const path = require("path");
const utils = require("@electron-toolkit/utils");
const fs = require("fs");
const os = require("os");
const dotenv = require("dotenv");
const Jimp = require("jimp");
const uid = require("uid");
const crypto = require("crypto");
const getFilePath = async (win) => {
  const options = {
    // Add your desired options here
    properties: ["openFile"],
    filters: [{
      name: "Images",
      extensions: ["png"]
    }]
  };
  const { canceled, filePaths } = await electron.dialog.showOpenDialog(options);
  if (!canceled) {
    win.focus();
    return filePaths[0];
  }
};
const homeDirectory$1 = os.homedir();
const makeDirectory = async (directoryName) => {
  const targetDirectory = path.resolve(homeDirectory$1, directoryName);
  await fs.access(targetDirectory, fs.constants.F_OK, (err) => {
    if (err) {
      fs.mkdir(targetDirectory, { recursive: true }, (err2) => {
        if (err2) {
          console.log("Error while making the folder");
        } else {
          console.log("Folder made successfully!");
        }
      });
    } else {
      console.log("Folder already exists");
    }
  });
};
async function encodeMessage(imagePath, message) {
  const image = await Jimp.read(imagePath);
  const messageString = typeof message === "object" ? JSON.stringify(message) : message;
  const fullMessage = messageString + "#";
  const binaryMessage = fullMessage.split("").map((char) => char.charCodeAt(0).toString(2).padStart(8, "0")).join("");
  let index = 0;
  image.scan(0, 0, image.bitmap.width, image.bitmap.height, function(x, y, idx) {
    if (index < binaryMessage.length) {
      const bit = binaryMessage[index] === "1" ? 1 : 0;
      this.bitmap.data[idx] = this.bitmap.data[idx] & 254 | bit;
      index++;
    }
  });
  return image;
}
async function decodeMessage(imagePath) {
  const image = await Jimp.read(imagePath);
  let binaryData = "";
  image.scan(0, 0, image.bitmap.width, image.bitmap.height, function(x, y, idx) {
    const bit = this.bitmap.data[idx] & 1;
    binaryData += bit;
  });
  let message = "";
  for (let i = 0; i < binaryData.length; i += 8) {
    const byte = binaryData.slice(i, i + 8);
    const charCode = parseInt(byte, 2);
    const char = String.fromCharCode(charCode);
    if (char === "#")
      break;
    message += char;
  }
  return message;
}
const homeDirectory = os.homedir();
const folderName = "Steganography";
const folderPath = path.resolve(homeDirectory, folderName);
const fileName = `encoded-${uid.uid()}.png`;
const filePath = path.resolve(folderPath, fileName);
const saveFile = async (file) => {
  await file.writeAsync(filePath);
  return filePath;
};
class EncoderService {
  constructor(Encrypter) {
    this.encodeFile = async (secretKey, privateMessage, filePath2) => {
      const encryptedData = this.encrypter.encrypt(secretKey, privateMessage);
      const encodedFile = await encodeMessage(filePath2, encryptedData);
      const savedFilePath = await saveFile(encodedFile);
      return savedFilePath;
    };
    this.decodeFile = async (secretKey, filePath2) => {
      try {
        const encryptedData = JSON.parse(await decodeMessage(filePath2));
        if (typeof encryptedData !== "string") {
          const decryptedMessage = this.encrypter.decrypt(secretKey, encryptedData);
          return decryptedMessage;
        }
      } catch (err) {
        throw new Error("error");
      }
    };
    this.encrypter = Encrypter;
  }
}
class EncrypterService {
  constructor() {
    this.iv = "dbrv-not-secure";
    this.hashedIv = crypto.createHash("sha256").update(this.iv).digest().slice(0, 12);
    this.encrypt = (secretKey, privateMessage) => {
      const hashedKey = crypto.createHash("sha256").update(secretKey).digest();
      const chiper = crypto.createCipheriv("aes-256-gcm", hashedKey, this.hashedIv);
      let encrypted = chiper.update(privateMessage, "utf-8", "hex");
      encrypted += chiper.final("hex");
      const authTag = chiper.getAuthTag();
      return {
        encrypted,
        iv: this.hashedIv.toString("hex"),
        authTag: authTag.toString("hex")
      };
    };
    this.decrypt = (secretKey, encryptedMessage) => {
      try {
        const hashedKey = crypto.createHash("sha256").update(secretKey).digest();
        const dechiper = crypto.createDecipheriv("aes-256-gcm", hashedKey, this.hashedIv);
        dechiper.setAuthTag(Buffer.from(encryptedMessage.authTag, "hex"));
        const decrypted = dechiper.update(encryptedMessage.encrypted, "hex", "utf8");
        return decrypted;
      } catch (err) {
        throw new Error("error");
      }
    };
  }
}
dotenv.config();
const encodingService = new EncoderService(new EncrypterService());
function createWindow() {
  const mainWindow = new electron.BrowserWindow({
    width: 900,
    height: 800,
    show: false,
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, "../preload/index.js"),
      sandbox: false
    }
  });
  mainWindow.on("ready-to-show", () => {
    mainWindow.show();
  });
  mainWindow.webContents.setWindowOpenHandler((details) => {
    electron.shell.openExternal(details.url);
    return { action: "deny" };
  });
  if (utils.is.dev && process.env["ELECTRON_RENDERER_URL"]) {
    mainWindow.loadURL(process.env["ELECTRON_RENDERER_URL"]);
  } else {
    mainWindow.loadFile(path.join(__dirname, "../renderer/index.html"));
  }
  eventHandler(mainWindow);
}
electron.app.whenReady().then(() => {
  utils.electronApp.setAppUserModelId("com.electron");
  electron.app.on("browser-window-created", (_, window) => {
    utils.optimizer.watchWindowShortcuts(window);
  });
  createWindow();
  makeDirectory(process.env.DATA_SAVE_DIRECTORY || "Steganography");
  electron.app.on("activate", function() {
    if (electron.BrowserWindow.getAllWindows().length === 0)
      createWindow();
  });
});
electron.app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    electron.app.quit();
  }
});
const eventHandler = (win) => {
  electron.ipcMain.handle("encrypt-it", async (_event, data) => {
    const filePath2 = await getFilePath(win);
    const { secretKey, privateMessage } = data;
    if (filePath2) {
      const savedFilePath = await encodingService.encodeFile(secretKey, privateMessage, filePath2);
      console.log(savedFilePath);
      return savedFilePath;
    }
  });
  electron.ipcMain.handle("decrypt-it", async (_event, data) => {
    const filePath2 = await getFilePath(win);
    const { secretKey } = data;
    if (filePath2) {
      const message = await encodingService.decodeFile(secretKey, filePath2);
      return message;
    }
  });
};
