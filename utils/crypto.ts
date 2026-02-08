// biome-ignore lint/style/useNodejsImportProtocol: it's ok
import { Buffer } from "buffer";
import { createDecipheriv } from "react-native-quick-crypto";

global.Buffer = global.Buffer || Buffer;

type Encrypted = {
	iv: string;
	authTag: string;
	encrypted: string;
};

type DecryptParams = {
	encrypted: Encrypted;
	secretKey: string;
};

export function decrypt({ encrypted, secretKey }: DecryptParams) {
	const key = Buffer.from(secretKey, "hex");
	const iv = Buffer.from(encrypted.iv, "hex");
	const authTag = Buffer.from(encrypted.authTag, "hex");
	const encryptedText = Buffer.from(encrypted.encrypted, "hex");

	const decipher = createDecipheriv("aes-256-gcm", key, iv);
	// @ts-expect-error
	decipher.setAuthTag(authTag);

	const plainText = Buffer.concat([
		decipher.update(encryptedText),
		decipher.final(),
	]);

	return plainText.toString("utf8");
}
