var { weeklyPricesAndDiscountsCollection } = require("../../connections/");
var getWeeklyPricesAndDiscounts = require("./services/getWeeklyPricesAndDiscounts");

var weeklyPricesAndDiscountsCollectionServices = {
  getWeeklyPricesAndDiscountsFromDb: (userId) => getWeeklyPricesAndDiscounts(weeklyPricesAndDiscountsCollection, userId),
};

module.exports = weeklyPricesAndDiscountsCollectionServices;
