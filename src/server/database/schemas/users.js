var { Schema } = require("mongoose");

var usersSchema = new Schema({
  userId: { type: String, required: true },
  login: { type: String, required: true },
  passwd: { type: String, required: true },
  role: { type: String, required: true, default: "user" },
});

module.exports = usersSchema;
