import { Schema } from "mongoose";
import { dataKeyId } from "../keyManager.js";

var tokenSchema = new Schema(
  {
    userId: { type: String, required: true },
    lastUsed: { type: Date, required: false },
    tokenHasBeenRemoved: { type: Boolean, default: false, required: true },
    schemaVersion: { type: Number },
    token: { type: String, required: false, default: "", encrypt: { keyId: [dataKeyId], algorithm: "AEAD_AES_256_CBC_HMAC_SHA_512-Deterministic" } },
  },
  { encryptionType: "queryableEncryption" },
);

export default tokenSchema;
