var mergeData = require("../services/mergeData");
var wbapi = require("../../reports/services/WBAPI");
var extractRequiredListGoodsData = require("../../goods/services/extractRequiredListGoodsData");

var updateDataIntoListGoods = async (req, res, next) => {
  var { getWBTokenByUserId } = req.app.locals.tokenCollectionServices;
  var { getAllUserListGoodsIds, saveListGoodsToDb } = req.app.locals.goodsCollectionServices;

  var data = await getAllUserListGoodsIds();

  for (var { userId, listGoodsIds, listGoodsIdsAndDisableStatuses } of data) {
    if (listGoodsIds.length) {
      var token = await getWBTokenByUserId(userId);

      var { rawListGoods } = await wbapi.getPricesAndDiscountsByListGoods(
        userId,
        token,
        listGoodsIds
      );

      var { listGoods } = await extractRequiredListGoodsData(rawListGoods);
      var { updatedListGoods } = mergeData(listGoodsIdsAndDisableStatuses, listGoods);
      await saveListGoodsToDb(userId, updatedListGoods);
    }
  }
};

module.exports = updateDataIntoListGoods;
