var env = require("../../env");
var mongoose = require("mongoose");
var tokenSchema = require("../schemas/token");
var optionsSchema = require("../schemas/options");
var { userSchema, reportSchema } = require("../schemas/index");
var reportsTreeSchema = require("../schemas/reportsTreeCollection");

var reportDB = mongoose.createConnection(
  env.getMongoURI(),
  env.mongoose_options
);

var userCollection = reportDB.model("User", userSchema);

var reportCollection = reportDB.model("Report", reportSchema);

var tokenCollection = reportDB.model("Token", tokenSchema);

var optionsCollection = reportDB.model("Option", optionsSchema);

var reportsTreeCollection = reportDB.model("Reports_Tree", reportsTreeSchema);

module.exports = {
  userCollection,
  reportCollection,
  tokenCollection,
  optionsCollection,
  reportsTreeCollection,
};
