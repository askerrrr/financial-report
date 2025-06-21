var mongoose = require("mongoose");
var tokenSchema = require("../schemas/token");
var { userSchema, reportSchema } = require("../schemas/index");
var reportingPeriodsSchema = require("../schemas/reportingPeriodsSchema");

var reportDB = mongoose.createConnection("mongodb://127.0.0.1:27017/reports");

var userCollection = reportDB.model("User", userSchema);

var reportCollection = reportDB.model("Report", reportSchema);

var tokenCollection = reportDB.model("Token", tokenSchema);

var reportingPeriod = reportDB.model("ReportingPeriod", reportingPeriodsSchema);

module.exports = {
  userCollection,
  reportCollection,
  tokenCollection,
  reportingPeriod,
};
