import wbapi from "../../reports/services/WBAPI/index.js";
import dbUtils from "../../../database/collections/index.js";

var checkProcessingOfPricesAndDiscounts = async (req, res, next) => {
  var { getWBTokenByUserId } = dbUtils.tokenCollectionServices;
  var { setPriceUpdateTimestampAndUpdateStatus } = dbUtils.goodsCollectionServices;
  var { getAllUserWeeklyPricesAndDiscounts } = dbUtils.weeklyPricesAndDiscountsCollectionServices;

  var data = await getAllUserWeeklyPricesAndDiscounts();

  for (var { userId, uploadId } of data) {
    if (!uploadId) {
      continue;
    }

    var { token } = await getWBTokenByUserId(userId);
    var { historyGoods } = await wbapi.getPriceUploadDetails(userId, uploadId, token);
    await setPriceUpdateTimestampAndUpdateStatus(userId, historyGoods);
  }

  return res.sendStatus(200);
};

export default checkProcessingOfPricesAndDiscounts;
