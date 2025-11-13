var { goodsCollection } = require("../../connections");
var saveListGoodsToDb = require("./services/saveListGoodsToDb");
var getListGoodsFromDb = require("./services/getListGoodsFromDb");
var getAllUserListGoods = require("./services/getAllUserListGoods");
var updateSkuDisableStatus = require("./services/updateSkuDisableStatus");

var createListGoodsCollectionEntity = require("./services/createListGoodsCollectionEntity");

var goodsCollectionServices = {
  getAllUserListGoods: () => getAllUserListGoods(goodsCollection),

  getListGoodsFromDb: (userId) => getListGoodsFromDb(goodsCollection, userId),

  saveListGoodsToDb: (userId, listGoods) => saveListGoodsToDb(goodsCollection, userId, listGoods),

  updateSkuDisableStatusToDb: (userId, skuName, disabled) =>
    updateSkuDisableStatus(goodsCollection, userId, skuName, disabled),

  createListGoodsCollectionEntity: (userId) =>
    createListGoodsCollectionEntity(goodsCollection, userId),
};

module.exports = goodsCollectionServices;
