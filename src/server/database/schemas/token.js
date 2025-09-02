var { Schema } = require("mongoose");

var tokenSchema = new Schema(
  {
    userId: { type: String, required: true },
    token: { type: String, required: false, default: "" },
  },
  { version: 1 }
);

module.exports = tokenSchema;
