import { randomBytes, scryptSync, createCipheriv, createDecipheriv } from "crypto";

class EncryptionError extends Error {
    constructor(message: string) {
        super(`Encryption Error: ${message}`);
        this.name = 'EncryptionError';
    }
}

class DecryptionError extends Error {
    constructor(message: string) {
        super(`Decryption Error: ${message}`);
        this.name = 'DecryptionError';
    }
}

const encryptData = (secretKey: string, message: string) => {
    try {
        const iv = randomBytes(12);
        const hashedSecretKey = scryptSync(secretKey, 'salt', 32);
        const cipher = createCipheriv('aes-256-gcm', hashedSecretKey, iv);
        let encryptedData = cipher.update(message, 'utf-8', 'hex');
        encryptedData += cipher.final('hex');
        encryptedData += `@${iv.toString('hex')}`;
        const authTag = cipher.getAuthTag().toString('hex');
        encryptedData += `@${authTag}`;
        return encryptedData;
    } catch (error) {
        if (error instanceof Error) {
            throw new EncryptionError(error.message);
        } else {
            // Handle non-Error throwables
            throw new EncryptionError('An unexpected error occurred');
        }
    }
};

const decryptData = (secretKey: string, encryptedData: string) => {
    try {
        const [encryptedMessage, ivHex, authTagHex] = encryptedData.split('@');
        const hashedSecretKey = scryptSync(secretKey, 'salt', 32);
        const iv = Buffer.from(ivHex, 'hex');
        const authTag = Buffer.from(authTagHex, 'hex');
        const decipher = createDecipheriv('aes-256-gcm', hashedSecretKey, iv);
        decipher.setAuthTag(authTag);
        let decrypted = decipher.update(encryptedMessage, 'hex', 'utf-8');
        decrypted += decipher.final('utf-8');
        return decrypted;
    } catch (error) {
        if (error instanceof Error) {
            throw new DecryptionError(error.message);
        } else {
            // Handle non-Error throwables
            throw new DecryptionError('An unexpected error occurred');
        }
    }
};

export { encryptData, decryptData };
