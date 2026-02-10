var { goodsCollection } = require("../../connections");
var updateSingleSku = require("./services/updateSingleSku");
var deleteListGoods = require("./services/deleteListGoods");
var updateSkusFields = require("./services/updateSkusFields");
var saveListGoodsToDb = require("./services/saveListGoodsToDb");
var getListGoodsFromDb = require("./services/getListGoodsFromDb");
var getSkuFromListGoods = require("./services/getSkuFromListGoods");
var getSkusLastCostPrice = require("./services/getSkusLastCostPrice");
var addNewSkusToListGoods = require("./services/addNewSkusToListGoods");
var saveUpdatedSkuMetrics = require("./services/saveUpdatedSkuMetrics");
var getAllUserListGoodsIds = require("./services/getAllUserListGoodsIds");
var updateSkuDisableStatus = require("./services/updateSkuDisableStatus");
var updateSkuInListGoods = require("./services/updateSkuInListGoods");
var setPriceUpdateTimestampAndUpdateStatus = require("./services/setPriceUpdateTimestampAndUpdateStatus");

var createListGoodsCollectionEntity = require("./services/createListGoodsCollectionEntity");

var goodsCollectionServices = {
  getAllUserListGoodsIds: () => getAllUserListGoodsIds(goodsCollection),

  getSkusLastCostPrice: (userId) => getSkusLastCostPrice(goodsCollection, userId),

  getListGoodsFromDb: (userId, session) => getListGoodsFromDb(goodsCollection, userId, session),

  getSkuFromListGoods: (userId, skuId, skuName, session) => getSkuFromListGoods(goodsCollection, userId, skuId, skuName, session),

  saveListGoodsToDb: (userId, listGoods, session) => saveListGoodsToDb(goodsCollection, userId, listGoods, session),

  addNewSkusToListGoods: (userId, newSkus) => addNewSkusToListGoods(goodsCollection, userId, newSkus),

  updateSingleSku: (userId, sku) => updateSingleSku(goodsCollection, userId, sku),

  updateSkusFields: (userId, updatedSkus) => updateSkusFields(goodsCollection, userId, updatedSkus),

  updateSkuInListGoods: (userId, skuId, costPrice, session) => updateSkuInListGoods(goodsCollection, userId, skuId, costPrice, session),

  updateSkuDisableStatusToDb: (userId, skuName, disabled) => updateSkuDisableStatus(goodsCollection, userId, skuName, disabled),

  createListGoodsCollectionEntity: (userId) => createListGoodsCollectionEntity(goodsCollection, userId),

  setPriceUpdateTimestampAndUpdateStatus: (userId, priceData) => setPriceUpdateTimestampAndUpdateStatus(goodsCollection, userId, priceData),

  saveUpdatedSkuMetrics: (userId, skuId, metrics, session) => saveUpdatedSkuMetrics(goodsCollection, userId, skuId, metrics, session),

  deleteListGoodsFromDb: (userId, session) => deleteListGoods(goodsCollection, userId, session),
};

module.exports = goodsCollectionServices;
