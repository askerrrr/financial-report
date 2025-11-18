var { weeklyPricesAndDiscountsCollection } = require("../../connections/");
var setUploadId  = require('./services/setUploadId')
var getUploadId = require('./services/getUploadId'  )
var updatePriceAndDiscount = require("./services/updatePriceAndDiscount");
var getWeeklyPricesAndDiscounts = require("./services/getWeeklyPricesAndDiscounts");
var setWeeklyPricesAndDiscounts = require("./services/setWeeklyPricesAndDiscounts");
var deleteWeeklyPricesAndDiscounts = require('./services/deleteWeeklyPricesAndDiscounts')
var getAllUserWeeklyPricesAndDiscounts = require('./services/getAllUserWeeklyPricesAndDiscounts')
var createWeeklyPricesAndDiscountsCollectionEntity = require("./services/createWeeklyPricesAndDiscountsCollectionEntity");

var weeklyPricesAndDiscountsCollectionServices = {
  getWeeklyPricesAndDiscountsFromDb: (userId) => getWeeklyPricesAndDiscounts(weeklyPricesAndDiscountsCollection, userId),
  getAllUserWeeklyPricesAndDiscounts: () => getAllUserWeeklyPricesAndDiscounts(weeklyPricesAndDiscountsCollection),

  updatePriceAndDiscount: (userId, nmID, price, discount, checkedWeekDays) =>
    updatePriceAndDiscount(weeklyPricesAndDiscountsCollection, userId, nmID, price, discount, checkedWeekDays),

  getUploadId: (userId) => getUploadId(weeklyPricesAndDiscountsCollection, userId),
  setUploadId: (userId, uploadId) => setUploadId(weeklyPricesAndDiscountsCollection, userId, uploadId),

  setWeeklyPricesAndDiscountsToDb: (userId, weeklyPricesAndDiscounts) =>
    setWeeklyPricesAndDiscounts(weeklyPricesAndDiscountsCollection, userId, weeklyPricesAndDiscounts),

  createWeeklyPricesAndDiscountsCollectionEntity: (userId) =>
    createWeeklyPricesAndDiscountsCollectionEntity(weeklyPricesAndDiscountsCollection, userId),

  deleteWeeklyPricesAndDiscountsFromDb: (userId) => deleteWeeklyPricesAndDiscounts(weeklyPricesAndDiscountsCollection, userId)
};

module.exports = weeklyPricesAndDiscountsCollectionServices;
