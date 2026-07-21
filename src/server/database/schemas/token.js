import { Schema } from "mongoose";
import { dataKeyId } from "../keyManager.js";

var tokenSchema = new Schema({
  userId: { type: String, required: true },
  lastUsed: { type: Date, required: false },
  token: { type: String, required: false, default: "" },
  tokenHasBeenRemoved: { type: Boolean, default: false, required: true },
  schemaVersion: { type: Number },
});

export default tokenSchema;
