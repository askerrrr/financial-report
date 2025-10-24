var { goodsCollection } = require("../../connections");
var getListGoodsFromDb = require("./services/getListGoodsFromDb");
var saveListGoodsToDb = require("./services/saveListGoodsToDb");

var goodsCollectionServices = {
  getListGoodsFromDb: (userId) => getListGoodsFromDb(goodsCollection, userId),

  saveListGoodsToDb: (userId, listGoods) => saveListGoodsToDb(goodsCollection, userId, listGoods),
};

module.exports = goodsCollectionServices;
