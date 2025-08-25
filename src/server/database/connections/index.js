var env = require("../../env");
var mongoose = require("mongoose");
var usersSchema = require("../schemas/users");
var tokenSchema = require("../schemas/token");
var reportsSchema = require("../schemas/reports");
var taxParamsSchema = require("../schemas/taxParams");
var reportsTreeSchema = require("../schemas/reportsTree");

var reportsDB = mongoose.createConnection(env.getMongoURI(), env.mongoose_options);

var userCollection = reportsDB.model("User", usersSchema);

var reportCollection = reportsDB.model("Report", reportsSchema);

var tokenCollection = reportsDB.model("Token", tokenSchema);

var taxParamsCollection = reportsDB.model("Tax_Param", taxParamsSchema);

var reportsTreeCollection = reportsDB.model("Reports_Tree", reportsTreeSchema);

module.exports = {
  userCollection,
  reportCollection,
  tokenCollection,
  taxParamsCollection,
  reportsTreeCollection,
};
