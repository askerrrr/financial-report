import { Schema } from "mongoose";

var usersSchema = new Schema({
  userId: { type: String, required: true },
  login: { type: String, required: true },
  passwd: { type: String, required: true },
  registeredAt: { type: Date, required: true },
  role: { type: String, required: true, default: "user" },
  schemaVersion: { type: Number },
});

export default usersSchema;
