import crypto from "crypto";

const KEY = Buffer.from(process.env.TOKEN_ENC_KEY_BASE64 || "", "base64");
if (KEY.length !== 32) {
  throw new Error("TOKEN_ENC_KEY_BASE64 must be 32 bytes (base64)");
}
const ALGO = "aes-256-gcm";
const IV_LEN = 12;

export function encryptToken(plain: string): string {
  const iv = crypto.randomBytes(IV_LEN);
  const cipher = crypto.createCipheriv(ALGO, KEY, iv);
  const ct = Buffer.concat([cipher.update(plain, "utf8"), cipher.final()]);
  const tag = cipher.getAuthTag();
  return Buffer.concat([iv, tag, ct]).toString("base64");
}

export function decryptToken(enc: string): string {
  const data = Buffer.from(enc, "base64");
  const iv = data.slice(0, IV_LEN);
  const tag = data.slice(IV_LEN, IV_LEN + 16);
  const ct = data.slice(IV_LEN + 16);
  const decipher = crypto.createDecipheriv(ALGO, KEY, iv);
  decipher.setAuthTag(tag);
  return Buffer.concat([decipher.update(ct), decipher.final()]).toString("utf8");
}
