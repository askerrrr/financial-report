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
var updateSkuLastCostPrice = require("./services/updateSkuLastCostPrice");
var setPriceUpdateTimestampAndUpdateStatus = require("./services/setPriceUpdateTimestampAndUpdateStatus");

var createListGoodsCollectionEntity = require("./services/createListGoodsCollectionEntity");

var goodsCollectionServices = {
  getAllUserListGoodsIds: () => getAllUserListGoodsIds(goodsCollection),

  getSkusLastCostPrice: (userId) => getSkusLastCostPrice(goodsCollection, userId),

  getListGoodsFromDb: (userId, session) => getListGoodsFromDb(goodsCollection, userId, session),

  getSkuFromListGoods: (userId, skuId, session) => getSkuFromListGoods(goodsCollection, userId, skuId, session),

  saveListGoodsToDb: (userId, listGoods, session) => saveListGoodsToDb(goodsCollection, userId, listGoods, session),

  addNewSkusToListGoods: (userId, newSkus) => addNewSkusToListGoods(goodsCollection, userId, newSkus),

  updateSingleSku: (userId, sku) => updateSingleSku(goodsCollection, userId, sku),

  updateSkusFields: (userId, updatedSkus) => updateSkusFields(goodsCollection, userId, updatedSkus),

  updateSkuLastCostPrice: (userId, skuId, costPrice, session) => updateSkuLastCostPrice(goodsCollection, userId, skuId, costPrice, session),

  updateSkuDisableStatusToDb: (userId, skuName, disabled) => updateSkuDisableStatus(goodsCollection, userId, skuName, disabled),

  createListGoodsCollectionEntity: (userId) => createListGoodsCollectionEntity(goodsCollection, userId),

  setPriceUpdateTimestampAndUpdateStatus: (userId, priceData) => setPriceUpdateTimestampAndUpdateStatus(goodsCollection, userId, priceData),

  saveUpdatedSkuMetrics: (userId, skuId, metrics, session) => saveUpdatedSkuMetrics(goodsCollection, userId, skuId, metrics, session),

  deleteListGoodsFromDb: (userId, session) => deleteListGoods(goodsCollection, userId, session),
};

module.exports = goodsCollectionServices;
