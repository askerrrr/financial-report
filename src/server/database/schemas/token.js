import { Schema } from "mongoose";

var tokenSchema = new Schema({
  userId: { type: String, required: true },
  token: { type: String, required: false, default: "" },
  tokenHasBeenRemoved: { type: Boolean, default: false, required: true },
  schemaVersion: { type: Number },
});

export default tokenSchema;
