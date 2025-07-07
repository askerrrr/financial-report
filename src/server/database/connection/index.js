var env = require("../../env");
var mongoose = require("mongoose");
var tokenSchema = require("../schemas/token");
var { userSchema, reportSchema } = require("../schemas/index");
var reportingPeriodsSchema = require("../schemas/reportingPeriodsSchema");

var reportDB = mongoose.createConnection(env.mongo_uri, env.mongoose_options);

var userCollection = reportDB.model("User", userSchema);

var reportCollection = reportDB.model("Report", reportSchema);

var tokenCollection = reportDB.model("Token", tokenSchema);

var reportingPeriodsCollection = reportDB.model(
  "ReportingPeriod",
  reportingPeriodsSchema
);

module.exports = {
  userCollection,
  reportCollection,
  tokenCollection,
  reportingPeriodsCollection,
};
