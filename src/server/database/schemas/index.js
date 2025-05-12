var { Schema } = require("mongoose");
var reportSchema = require("./reportSchems");

var schema = new Schema({
  login: { type: String, required: true },
  passwd: { type: String, required: true },
  reports: { type: [reportSchema], required: false },
});

module.exports = schema;
