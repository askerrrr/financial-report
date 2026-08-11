import { dbClient } from "../index.js";
import usersSchema from "../schemas/users.js";
import goodsSchema from "../schemas/goods.js";
import tokenSchema from "../schemas/token.js";
import reportsSchema from "../schemas/reports.js";
import taxParamsSchema from "../schemas/taxParams.js";
import reportsTreeSchema from "../schemas/reportsTree.js";
import reportLoadingStatesSchema from "../schemas/reportLoadingState.js";
import weeklyPricesAndDiscountsSchema from "../schemas/weeklyPricesAndDiscounts.js";

var userCollection = dbClient.model("User", usersSchema);
var goodsCollection = dbClient.model("Goods", goodsSchema);
var tokenCollection = dbClient.model("Token", tokenSchema);
var reportCollection = dbClient.model("Report", reportsSchema);
var taxParamsCollection = dbClient.model("Tax_Param", taxParamsSchema);
var reportsTreeCollection = dbClient.model("Reports_Tree", reportsTreeSchema);
var reportLoadingStatesCollection = dbClient.model("Report_Loading_State", reportLoadingStatesSchema);
var weeklyPricesAndDiscountsCollection = dbClient.model("Weekly_prices_and_discounts", weeklyPricesAndDiscountsSchema);

export {
  userCollection,
  goodsCollection,
  reportCollection,
  tokenCollection,
  taxParamsCollection,
  reportsTreeCollection,
  reportLoadingStatesCollection,
  weeklyPricesAndDiscountsCollection,
};
