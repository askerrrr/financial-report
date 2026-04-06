import { goodsCollection } from "../../connections/index.js";
import updateSingleSku from "./services/updateSingleSku.js";
import deleteListGoods from "./services/deleteListGoods.js";
import updateSkusFields from "./services/updateSkusFields.js";
import saveListGoodsToDb from "./services/saveListGoodsToDb.js";
import getListGoodsFromDb from "./services/getListGoodsFromDb.js";
import getSkuFromListGoods from "./services/getSkuFromListGoods.js";
import getSkusLastCostPrice from "./services/getSkusLastCostPrice.js";
import addNewSkusToListGoods from "./services/addNewSkusToListGoods.js";
import saveUpdatedSkuMetrics from "./services/saveUpdatedSkuMetrics.js";
import getAllUserListGoodsIds from "./services/getAllUserListGoodsIds.js";
import updateSkuDisableStatus from "./services/updateSkuDisableStatus.js";
import updateSkuInListGoods from "./services/updateSkuInListGoods.js";
import setPriceUpdateTimestampAndUpdateStatus from "./services/setPriceUpdateTimestampAndUpdateStatus.js";

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

  setPriceUpdateTimestampAndUpdateStatus: (userId, priceData) => setPriceUpdateTimestampAndUpdateStatus(goodsCollection, userId, priceData),

  saveUpdatedSkuMetrics: (userId, skuId, metrics, session) => saveUpdatedSkuMetrics(goodsCollection, userId, skuId, metrics, session),

  deleteListGoodsFromDb: (userId, session) => deleteListGoods(goodsCollection, userId, session),
};

export default goodsCollectionServices;
