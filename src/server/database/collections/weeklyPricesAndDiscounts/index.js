var { weeklyPricesAndDiscountsCollection } = require("../../connections/");
var getWeeklyPricesAndDiscounts = require("./services/getWeeklyPricesAndDiscounts");
var setWeeklyPricesAndDiscounts = require("./services/setWeeklyPricesAndDiscounts");
var createWeeklyPricesAndDiscountsCollectionEntity = require("./services/createWeeklyPricesAndDiscountsCollectionEntity");

var weeklyPricesAndDiscountsCollectionServices = {
  getWeeklyPricesAndDiscountsFromDb: (userId) => getWeeklyPricesAndDiscounts(weeklyPricesAndDiscountsCollection, userId),

  setWeeklyPricesAndDiscountsToDb: (userId, weeklyPricesAndDiscounts) =>
    setWeeklyPricesAndDiscounts(weeklyPricesAndDiscountsCollection, userId, weeklyPricesAndDiscounts),

  createWeeklyPricesAndDiscountsCollectionEntity: (userId) =>
    createWeeklyPricesAndDiscountsCollectionEntity(weeklyPricesAndDiscountsCollection, userId),
};

module.exports = weeklyPricesAndDiscountsCollectionServices;
