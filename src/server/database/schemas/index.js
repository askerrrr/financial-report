var { Schema } = require("mongoose");

var schema = new Schema({
  userId,
  login: { type: String, required: true },
  passwd: { type: String, required: true },
  reports: { type: [], required: false },
});

module.exports = schema;
