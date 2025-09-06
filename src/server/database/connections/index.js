var env = require("../../env");
var mongoose = require("mongoose");

var connection = mongoose.createConnection(env.getMongoURI(), env.mongoose_options);

var userCollection = connection.model("User", require("../schemas/users"));
var tokenCollection = connection.model("Token", require("../schemas/token"));
var taxParamsCollection = connection.model("Tax_Param", require("../schemas/taxParams"));
var reportCollection = connection.model("Report", require("../schemas/reports").reportsSchema);
var reportsTreeCollection = connection.model("Reports_Tree", require("../schemas/reportsTree"));

module.exports = {
  userCollection,
  reportCollection,
  tokenCollection,
  taxParamsCollection,
  reportsTreeCollection,
};
