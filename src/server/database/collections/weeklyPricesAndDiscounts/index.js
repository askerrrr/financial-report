var { weeklyPricesAndDiscountsCollection } = require("../../connections/");
var getWeeklyPricesAndDiscounts = require("./services/getWeeklyPricesAndDiscounts");
var setWeeklyPricesAndDiscounts = require("./services/setWeeklyPricesAndDiscounts");

var weeklyPricesAndDiscountsCollectionServices = {
  getWeeklyPricesAndDiscountsFromDb: (userId) => getWeeklyPricesAndDiscounts(weeklyPricesAndDiscountsCollection, userId),
  setWeeklyPricesAndDiscountsToDb: (userId, weeklyPricesAndDiscounts) =>
    setWeeklyPricesAndDiscounts(weeklyPricesAndDiscountsCollection, userId, weeklyPricesAndDiscounts),
};

module.exports = weeklyPricesAndDiscountsCollectionServices;
