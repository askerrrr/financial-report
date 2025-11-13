var { weeklyPricesAndDiscountsCollection } = require("../../connections/");
var updatePriceAndDiscount = require("./services/updatePriceAndDiscount");
var getWeeklyPricesAndDiscounts = require("./services/getWeeklyPricesAndDiscounts");
var setWeeklyPricesAndDiscounts = require("./services/setWeeklyPricesAndDiscounts");
var getAllUserWeeklyPricesAndDiscounts = require('./services/getAllUserWeeklyPricesAndDiscounts')
var createWeeklyPricesAndDiscountsCollectionEntity = require("./services/createWeeklyPricesAndDiscountsCollectionEntity");

var weeklyPricesAndDiscountsCollectionServices = {
  getWeeklyPricesAndDiscountsFromDb: (userId) => getWeeklyPricesAndDiscounts(weeklyPricesAndDiscountsCollection, userId),
  getAllUserWeeklyPricesAndDiscounts: () => getAllUserWeeklyPricesAndDiscounts(weeklyPricesAndDiscountsCollection),

  updatePriceAndDiscount: (userId, nmID, price, discount, checkedWeekDays) =>
    updatePriceAndDiscount(weeklyPricesAndDiscountsCollection, userId, nmID, price, discount, checkedWeekDays),

  setWeeklyPricesAndDiscountsToDb: (userId, weeklyPricesAndDiscounts) =>
    setWeeklyPricesAndDiscounts(weeklyPricesAndDiscountsCollection, userId, weeklyPricesAndDiscounts),

  createWeeklyPricesAndDiscountsCollectionEntity: (userId) =>
    createWeeklyPricesAndDiscountsCollectionEntity(weeklyPricesAndDiscountsCollection, userId),
};

module.exports = weeklyPricesAndDiscountsCollectionServices;
