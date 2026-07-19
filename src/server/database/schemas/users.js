import { Schema } from "mongoose";
import { dataKeyId } from "../keyManager.js";

var usersSchema = new Schema(
  {
    schemaVersion: { type: Number },
    login: { type: String, required: true },
    userId: { type: String, required: true },
    registeredAt: { type: Date, required: true },
    role: { type: String, required: true, default: "user", enum: ["user", "admin"] },
    passwd: { type: String, required: true, encrypt: { keyId: [dataKeyId], algorithm: "AEAD_AES_256_CBC_HMAC_SHA_512-Deterministic" } },
  },
  { encryptionType: "queryableEncryption" },
);

export default usersSchema;
