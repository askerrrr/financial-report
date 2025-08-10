var { Schema } = require("mongoose");

var usersSchema = new Schema({
  userId: { type: String, required: true },
  login: { type: String, required: true },
  passwd: { type: String, required: true },
});

module.exports = usersSchema;
