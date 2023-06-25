// decrypt.js
// 参考: https://zenn.dev/terrierscript/articles/2021-02-18-openssl-node-create-decipheriv

import * as crypto from "crypto";
import * as fs from "fs";

/**
 * 暗号化キーを複合化する
 */
export function decryptGCPServiceAccount() {
  const algorithm = "aes-256-cbc";
  const key = process.env.DECRYPT_KEY!;
  const iv = process.env.DECRYPT_IV!;
  const decipher = crypto.createDecipheriv(
    algorithm,
    Buffer.from(key, "hex"),
    Buffer.from(iv, "hex")
  );

  const source = process.env.ENCRYPTED_KEY!;
  const data = Buffer.from(source, "base64").slice(16);
  const start = decipher.update(data);
  const final = decipher.final();
  const result = Buffer.concat([start, final]).toString("utf8");

  return result;
}
