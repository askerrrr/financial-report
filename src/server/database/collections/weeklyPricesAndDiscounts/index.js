var { weeklyPricesAndDiscountsCollection } = require("../../connections/");
var setUploadId = require("./services/setUploadId");
var getUploadId = require("./services/getUploadId");
var updatePriceAndDiscount = require("./services/updatePriceAndDiscount");
var getWeeklyPricesAndDiscounts = require("./services/getWeeklyPricesAndDiscounts");
var setWeeklyPricesAndDiscounts = require("./services/setWeeklyPricesAndDiscounts");
var deleteWeeklyPricesAndDiscounts = require("./services/deleteWeeklyPricesAndDiscounts");
var getAllUserWeeklyPricesAndDiscounts = require("./services/getAllUserWeeklyPricesAndDiscounts");
var createWeeklyPricesAndDiscountsCollectionEntity = require("./services/createWeeklyPricesAndDiscountsCollectionEntity");

var weeklyPricesAndDiscountsCollectionServices = {
  getWeeklyPricesAndDiscountsFromDb: (userId) => getWeeklyPricesAndDiscounts(weeklyPricesAndDiscountsCollection, userId),
  getAllUserWeeklyPricesAndDiscounts: () => getAllUserWeeklyPricesAndDiscounts(weeklyPricesAndDiscountsCollection),

  updatePriceAndDiscount: (userId, sku, checkedWeekDays) => updatePriceAndDiscount(weeklyPricesAndDiscountsCollection, userId, sku, checkedWeekDays),

  getUploadId: (userId) => getUploadId(weeklyPricesAndDiscountsCollection, userId),
  setUploadId: (userId, uploadId) => setUploadId(weeklyPricesAndDiscountsCollection, userId, uploadId),

  setWeeklyPricesAndDiscountsToDb: (userId, weeklyPricesAndDiscounts, session) =>
    setWeeklyPricesAndDiscounts(weeklyPricesAndDiscountsCollection, userId, weeklyPricesAndDiscounts, session),

  createWeeklyPricesAndDiscountsCollectionEntity: (userId, session) =>
    createWeeklyPricesAndDiscountsCollectionEntity(weeklyPricesAndDiscountsCollection, userId, session),

  deleteWeeklyPricesAndDiscountsFromDb: (userId) => deleteWeeklyPricesAndDiscounts(weeklyPricesAndDiscountsCollection, userId),
};

module.exports = weeklyPricesAndDiscountsCollectionServices;
