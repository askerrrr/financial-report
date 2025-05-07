var mongoose = require("mongoose");
var schema = require("../schemas/index");

var reportDB = mongoose.createConnection("mongodb://127.0.0.1:27017/reports");

var reportCollection = reportDB.model("Report", schema);

module.exports = reportCollection;
