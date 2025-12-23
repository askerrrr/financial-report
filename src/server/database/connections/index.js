var { dbClient } = require("../index");

var userCollection = dbClient.model("User", require("../schemas/users"));
var goodsCollection = dbClient.model("Goods", require("../schemas/goods"));
var tokenCollection = dbClient.model("Token", require("../schemas/token"));
var taxParamsCollection = dbClient.model("Tax_Param", require("../schemas/taxParams"));
var reportCollection = dbClient.model("Report", require("../schemas/reports").reportsSchema);
var reportsTreeCollection = dbClient.model("Reports_Tree", require("../schemas/reportsTree"));
var reportLoadingStatesCollection = dbClient.model("Report_Loading_States", require("../schemas/reportLoadingStates"));
var weeklyPricesAndDiscountsCollection = dbClient.model("Weekly_prices_and_discounts", require("../schemas/weeklyPricesAndDiscounts"));

module.exports = {
  userCollection,
  goodsCollection,
  reportCollection,
  tokenCollection,
  taxParamsCollection,
  reportsTreeCollection,
  reportLoadingStatesCollection,
  weeklyPricesAndDiscountsCollection,
};
