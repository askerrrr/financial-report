var { Schema } = require("mongoose");
var reportSchema = require("./report");

var strOptions = { type: String, required: true };

var userSchema = new Schema({
  userId: strOptions,
  login: strOptions,
  passwd: strOptions,
});

var reportSchema = new Schema({
  userId: strOptions,
  reports: { type: [reportSchema], required: false },
});

module.exports = { userSchema, reportSchema };
