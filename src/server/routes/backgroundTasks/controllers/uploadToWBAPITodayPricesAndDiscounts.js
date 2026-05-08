import wbapi from "../../reports/services/WBAPI/index.js";
import dbUtils from "../../../database/collections/index.js";
import getCurrentDayMSK from "../services/getCurrentDayMSK.js";

var uploadToWBAPITodayPricesAndDiscounts = async (req, res, next) => {
  var { getWBTokenByUserId } = dbUtils.tokenCollectionServices;
  var { getTodayPricesAndDiscountsByDayIndex, setUploadId } = dbUtils.weeklyPricesAndDiscountsCollectionServices;

  var { currentDayIndex } = getCurrentDayMSK();
  var data = await getTodayPricesAndDiscountsByDayIndex(currentDayIndex);

  for (var { userId, currentDayPricesAndDiscounts } of data) {
    if (currentDayPricesAndDiscounts) {
      currentDayPricesAndDiscounts = currentDayPricesAndDiscounts.map(({ data }) => data);

      var { token } = await getWBTokenByUserId(userId);
      var { id, alreadyExists } = await wbapi.setPricesAndDiscounts(userId, token, currentDayPricesAndDiscounts);

      if (!alreadyExists) {
        await setUploadId(userId, id);
      }
    }
  }

  return res.sendStatus(200);
};

export default uploadToWBAPITodayPricesAndDiscounts;
