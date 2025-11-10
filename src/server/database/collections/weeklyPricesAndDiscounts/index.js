var { weeklyPricesAndDiscountsCollection } = require("../../connections/");
var updatePriceAnddDiscount = require("./services/updatePriceAnddDiscount");
var getWeeklyPricesAndDiscounts = require("./services/getWeeklyPricesAndDiscounts");
var setWeeklyPricesAndDiscounts = require("./services/setWeeklyPricesAndDiscounts");
var createWeeklyPricesAndDiscountsCollectionEntity = require("./services/createWeeklyPricesAndDiscountsCollectionEntity");

var weeklyPricesAndDiscountsCollectionServices = {
  getWeeklyPricesAndDiscountsFromDb: (userId) => getWeeklyPricesAndDiscounts(weeklyPricesAndDiscountsCollection, userId),

  updatePriceAnddDiscount: (userId, nmID, price, discount, checkedWeekDays) =>
    updatePriceAnddDiscount(weeklyPricesAndDiscountsCollection, userId, nmID, price, discount, checkedWeekDays),

  setWeeklyPricesAndDiscountsToDb: (userId, weeklyPricesAndDiscounts) =>
    setWeeklyPricesAndDiscounts(weeklyPricesAndDiscountsCollection, userId, weeklyPricesAndDiscounts),

  createWeeklyPricesAndDiscountsCollectionEntity: (userId) =>
    createWeeklyPricesAndDiscountsCollectionEntity(weeklyPricesAndDiscountsCollection, userId),
};

module.exports = weeklyPricesAndDiscountsCollectionServices;
