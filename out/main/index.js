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
class ImageProcessingError extends Error {
  constructor(message) {
    super(message);
    this.name = "ImageProcessingError";
  }
}
function messageToBinary(message) {
  const messageString = typeof message === "object" ? JSON.stringify(message) : message;
  return messageString.split("").map((char) => char.charCodeAt(0).toString(2).padStart(8, "0")).join("") + "00100011";
}
function binaryToMessage(binaryData) {
  let message = "";
  for (let i = 0; i < binaryData.length; i += 8) {
    const byte = binaryData.slice(i, i + 8);
    if (byte === "00100011")
      break;
    message += String.fromCharCode(parseInt(byte, 2));
  }
  return message;
}
async function encodeMessage(imagePath, message) {
  try {
    const image = await Jimp.read(imagePath);
    const binaryMessage = messageToBinary(message);
    let index = 0;
    image.scan(0, 0, image.bitmap.width, image.bitmap.height, function(_x, _y, idx) {
      if (index < binaryMessage.length) {
        const bit = binaryMessage[index++] === "1" ? 1 : 0;
        this.bitmap.data[idx] = this.bitmap.data[idx] & 254 | bit;
      }
    });
    return image;
  } catch (error) {
    throw new ImageProcessingError(`Failed to encode message: ${error instanceof Error ? error.message : error}`);
  }
}
async function decodeMessage(imagePath) {
  try {
    const image = await Jimp.read(imagePath);
    let binaryData = "";
    image.scan(0, 0, image.bitmap.width, image.bitmap.height, function(_x, _y, idx) {
      binaryData += this.bitmap.data[idx] & 1;
    });
    return binaryToMessage(binaryData);
  } catch (error) {
    throw new ImageProcessingError(`Failed to decode message: ${error instanceof Error ? error.message : error}`);
  }
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
  constructor(encrypter) {
    this.encrypter = encrypter;
  }
  async encodeFile(secretKey, privateMessage, filePath2) {
    try {
      const encryptedData = this.encrypter.encrypt(secretKey, privateMessage);
      const encodedFile = await encodeMessage(filePath2, encryptedData);
      const savedFilePath = await saveFile(encodedFile);
      return savedFilePath;
    } catch (error) {
      console.error("Error encoding file:", error);
      throw error;
    }
  }
  async decodeFile(secretKey, filePath2) {
    try {
      const encryptedData = await decodeMessage(filePath2);
      const decryptedMessage = this.encrypter.decrypt(secretKey, encryptedData);
      return decryptedMessage;
    } catch (error) {
      console.error("Error decoding file:", error);
      throw error;
    }
  }
}
class EncryptionError extends Error {
  constructor(message) {
    super(`Encryption Error: ${message}`);
    this.name = "EncryptionError";
  }
}
class DecryptionError extends Error {
  constructor(message) {
    super(`Decryption Error: ${message}`);
    this.name = "DecryptionError";
  }
}
const encryptData = (secretKey, message) => {
  try {
    const iv = crypto.randomBytes(12);
    const hashedSecretKey = crypto.scryptSync(secretKey, "salt", 32);
    const cipher = crypto.createCipheriv("aes-256-gcm", hashedSecretKey, iv);
    let encryptedData = cipher.update(message, "utf-8", "hex");
    encryptedData += cipher.final("hex");
    encryptedData += `@${iv.toString("hex")}`;
    const authTag = cipher.getAuthTag().toString("hex");
    encryptedData += `@${authTag}`;
    return encryptedData;
  } catch (error) {
    if (error instanceof Error) {
      throw new EncryptionError(error.message);
    } else {
      throw new EncryptionError("An unexpected error occurred");
    }
  }
};
const decryptData = (secretKey, encryptedData) => {
  try {
    const [encryptedMessage, ivHex, authTagHex] = encryptedData.split("@");
    const hashedSecretKey = crypto.scryptSync(secretKey, "salt", 32);
    const iv = Buffer.from(ivHex, "hex");
    const authTag = Buffer.from(authTagHex, "hex");
    const decipher = crypto.createDecipheriv("aes-256-gcm", hashedSecretKey, iv);
    decipher.setAuthTag(authTag);
    let decrypted = decipher.update(encryptedMessage, "hex", "utf-8");
    decrypted += decipher.final("utf-8");
    return decrypted;
  } catch (error) {
    if (error instanceof Error) {
      throw new DecryptionError(error.message);
    } else {
      throw new DecryptionError("An unexpected error occurred");
    }
  }
};
class EncrypterService {
  constructor() {
    this.encrypt = (secretKey, privateMessage) => {
      return encryptData(secretKey, privateMessage);
    };
    this.decrypt = (secretKey, encryptedMessage) => {
      return decryptData(secretKey, encryptedMessage);
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
    return 0;
  });
  electron.ipcMain.handle("decrypt-it", async (_event, data) => {
    const filePath2 = await getFilePath(win);
    const { secretKey } = data;
    if (filePath2) {
      const message = await encodingService.decodeFile(secretKey, filePath2);
      return message;
    }
    return 0;
  });
};
