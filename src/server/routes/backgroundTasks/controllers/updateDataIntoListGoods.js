var wbapi = require("../../reports/services/WBAPI");
var splitListGoodsByExistence = require("../services/splitListGoodsByExistence");
var extractRequiredListGoodsData = require("../../goods/services/extractRequiredListGoodsData");

var updateDataIntoListGoods = async (req, res, next) => {
  var { getWBTokenByUserId } = req.app.locals.tokenCollectionServices;
  var { getAllUserListGoodsIds, addNewSkusToListGoods, updateSkusFields } = req.app.locals.goodsCollectionServices;

  var data = await getAllUserListGoodsIds();

  for (var { userId, listGoodsIds } of data) {
    if (listGoodsIds.length) {
      var { token } = await getWBTokenByUserId(userId);

      var { rawListGoods } = await wbapi.getPricesAndDiscountsByListGoods(userId, token, listGoodsIds);

      var { listGoods } = await extractRequiredListGoodsData(rawListGoods);
      var { newSkus, updatedSkus } = splitListGoodsByExistence(listGoodsIds, listGoods);

      if (newSkus.length) {
        await addNewSkusToListGoods(userId, newSkus);
      }

      await updateSkusFields(userId, updatedSkus);
    }
  }

  return res.sendStatus(200);
};

module.exports = updateDataIntoListGoods;
