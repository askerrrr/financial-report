var mongoose = require("mongoose");
var reportSchema = require("../schemas/index");

var reportDB = mongoose.createConnection("mongodb://127.0.0.1:27017/reports");

var reportCollection = reportDB.model("Report", reportSchema);

module.exports = reportCollection;
