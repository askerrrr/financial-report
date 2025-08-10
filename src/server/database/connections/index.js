var env = require("../../env");
var mongoose = require("mongoose");
var tokenSchema = require("../schemas/token");
var taxParamsSchema = require("../schemas/taxParams");
var { userSchema, reportSchema } = require("../schemas/index");
var reportsTreeSchema = require("../schemas/reportsTree");

var reportDB = mongoose.createConnection(
  env.getMongoURI(),
  env.mongoose_options
);

var userCollection = reportDB.model("User", userSchema);

var reportCollection = reportDB.model("Report", reportSchema);

var tokenCollection = reportDB.model("Token", tokenSchema);

var taxParamsCollection = reportDB.model("Tax_Param", taxParamsSchema);

var reportsTreeCollection = reportDB.model("Reports_Tree", reportsTreeSchema);

module.exports = {
  userCollection,
  reportCollection,
  tokenCollection,
  taxParamsCollection,
  reportsTreeCollection,
};
