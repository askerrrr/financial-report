import { Schema } from "mongoose";

var tokenSchema = new Schema({
  userId: { type: String, required: true },
  addedAt: { type: Date, required: false },
  lastUsed: { type: Date, required: false },
  bitmask: { type: Number, required: false },
  token: { type: String, required: false, default: "" },
  tokenHasBeenRemoved: { type: Boolean, default: false, required: true },
  type: {
    type: String,
    required: false,
    default: "read",
    enum: ["read", "set"],
  },
});

export default tokenSchema;
