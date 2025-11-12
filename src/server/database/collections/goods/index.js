var { goodsCollection } = require("../../connections");
var getListGoodsFromDb = require("./services/getListGoodsFromDb");
var saveListGoodsToDb = require("./services/saveListGoodsToDb");
var updateSkuDisableStatus = require("./services/updateSkuDisableStatus");

var createListGoodsCollectionEntity = require("./services/createListGoodsCollectionEntity");

var goodsCollectionServices = {
  getListGoodsFromDb: (userId) => getListGoodsFromDb(goodsCollection, userId),

  saveListGoodsToDb: (userId, listGoods) => saveListGoodsToDb(goodsCollection, userId, listGoods),

  updateSkuDisableStatusToDb: (userId, skuName, disabled) =>
    updateSkuDisableStatus(goodsCollection, userId, skuName, disabled),

  createListGoodsCollectionEntity: (userId) =>
    createListGoodsCollectionEntity(goodsCollection, userId),
};

module.exports = goodsCollectionServices;
