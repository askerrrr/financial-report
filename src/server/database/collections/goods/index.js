var { goodsCollection } = require("../../connections");
var getListGoodsFromDb = require("./services/getListGoodsFromDb");

var goodsCollectionServices = {
  getListGoodsFromDb: (userId) => getListGoodsFromDb(goodsCollection, userId),
};

module.exports = goodsCollectionServices;
