var wbapi = require("../../reports/services/WBAPI");

var checkProcessingOfPricesAndDiscounts = async (req, res, next) => {
  var { getWBTokenByUserId } = req.app.locals.tokenCollectionServices;
  var { setPriceUpdateTimestampAndUpdateStatus } = req.app.locals.goodsCollectionServices;
  var { getAllUserWeeklyPricesAndDiscounts } = req.app.locals.weeklyPricesAndDiscountsCollectionServices;

  var data = await getAllUserWeeklyPricesAndDiscounts();

  for (var { userId, uploadId } of data) {
    var token = await getWBTokenByUserId(userId);
    var { historyGoods } = await wbapi.getPriceUploadDetails(userId, uploadId, token);
    await setPriceUpdateTimestampAndUpdateStatus(userId, historyGoods);
  }
};

module.exports = checkProcessingOfPricesAndDiscounts;
