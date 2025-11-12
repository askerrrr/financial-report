var { connection } = require("../index");

var skuCollection = connection.model("Sku", require("../schemas/skus"));
var userCollection = connection.model("User", require("../schemas/users"));
var goodsCollection = connection.model("Goods", require("../schemas/goods"));
var tokenCollection = connection.model("Token", require("../schemas/token"));
var taxParamsCollection = connection.model("Tax_Param", require("../schemas/taxParams"));
var reportCollection = connection.model("Report", require("../schemas/reports").reportsSchema);
var reportsTreeCollection = connection.model("Reports_Tree", require("../schemas/reportsTree"));
var reportLoadingStatesCollection = connection.model("Report_Loading_States", require("../schemas/reportLoadingStates"));
var weeklyPricesAndDiscountsCollection = connection.model("Weekly_prices_and_discounts", require("../schemas/weeklyPricesAndDiscounts"));

module.exports = {
  skuCollection,
  userCollection,
  goodsCollection,
  reportCollection,
  tokenCollection,
  taxParamsCollection,
  reportsTreeCollection,
  reportLoadingStatesCollection,
  weeklyPricesAndDiscountsCollection,
};
