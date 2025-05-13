var { Schema } = require("mongoose");
var reportDetailSchema = require("./reportSchems");

var userSchema = new Schema({
  userId: { type: String, required: true },
  login: { type: String, required: true },
  passwd: { type: String, required: true },
  reports: { type: [reportDetailSchema], required: false },
});

var reportSchema = new Schema({
  userId: { type: String, required: true },
  reports: { type: [reportDetailSchema], required: false },
});

module.exports = { userSchema, reportSchema };
