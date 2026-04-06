import { Schema } from "mongoose";

var tokenSchema = new Schema({
  userId: { type: String, required: true },
  token: { type: String, required: false, default: "" },
  schemaVersion: { type: Number },
});

export default tokenSchema;
