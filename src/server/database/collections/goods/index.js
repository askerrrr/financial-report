var { goodsCollection } = require("../../connections");
var getListGoodsFromDb = require("./services/getListGoodsFromDb");
var saveListGoodsToDb = require("./services/saveListGoodsToDb");
var setWeeklyPricesAndDiscounts = require("./services/setWeeklyPricesAndDiscounts");
var createListGoodsCollectionEntity = require("./services/createListGoodsCollectionEntity");

var goodsCollectionServices = {
  getListGoodsFromDb: (userId) => getListGoodsFromDb(goodsCollection, userId),

  saveListGoodsToDb: (userId, listGoods) => saveListGoodsToDb(goodsCollection, userId, listGoods),

  setWeeklyPricesAndDiscounts: (userId, weeklyPricesAndDiscounts) =>
    setWeeklyPricesAndDiscounts(goodsCollection, userId, weeklyPricesAndDiscounts),

  createListGoodsCollectionEntity: (userId) =>
    createListGoodsCollectionEntity(goodsCollection, userId),
};

module.exports = goodsCollectionServices;
