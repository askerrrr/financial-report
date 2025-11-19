var { goodsCollection } = require("../../connections");
var updateSingleSku = require("./services/updateSingleSku");
var updateSkusFields = require("./services/updateSkusFields");
var saveListGoodsToDb = require("./services/saveListGoodsToDb");
var getListGoodsFromDb = require("./services/getListGoodsFromDb");
var addNewSkusToListGoods = require("./services/addNewSkusToListGoods");
var getAllUserListGoodsIds = require("./services/getAllUserListGoodsIds");
var updateSkuDisableStatus = require("./services/updateSkuDisableStatus");
var setPriceUpdateTimestampAndUpdateStatus = require("./services/setPriceUpdateTimestampAndUpdateStatus");

var createListGoodsCollectionEntity = require("./services/createListGoodsCollectionEntity");

var goodsCollectionServices = {
  getAllUserListGoodsIds: () => getAllUserListGoodsIds(goodsCollection),

  getListGoodsFromDb: (userId) => getListGoodsFromDb(goodsCollection, userId),

  saveListGoodsToDb: (userId, listGoods) => saveListGoodsToDb(goodsCollection, userId, listGoods),

  addNewSkusToListGoods: (userId, newSkus) => addNewSkusToListGoods(goodsCollection, userId, newSkus),

  updateSingleSku: (userId, sku) => updateSingleSku(goodsCollection, userId, sku),

  updateSkusFields: (userId, updatedSkus) => updateSkusFields(goodsCollection, userId, updatedSkus),

  updateSkuDisableStatusToDb: (userId, skuName, disabled) => updateSkuDisableStatus(goodsCollection, userId, skuName, disabled),

  createListGoodsCollectionEntity: (userId) => createListGoodsCollectionEntity(goodsCollection, userId),

  setPriceUpdateTimestampAndUpdateStatus: (userId, priceData) => setPriceUpdateTimestampAndUpdateStatus(goodsCollection, userId, priceData),
};

module.exports = goodsCollectionServices;
