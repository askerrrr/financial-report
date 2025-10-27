var { goodsCollection } = require("../../connections");
var getListGoodsFromDb = require("./services/getListGoodsFromDb");
var saveListGoodsToDb = require("./services/saveListGoodsToDb");
var createListGoodsCollectionEntity = require("./services/createListGoodsCollectionEntity");

var goodsCollectionServices = {
  getListGoodsFromDb: (userId) => getListGoodsFromDb(goodsCollection, userId),

  saveListGoodsToDb: (userId, listGoods) => saveListGoodsToDb(goodsCollection, userId, listGoods),

  createListGoodsCollectionEntity: (userId) => createListGoodsCollectionEntity(goodsCollection, userId),
};

module.exports = goodsCollectionServices;
