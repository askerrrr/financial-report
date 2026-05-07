import wbapi from "../../reports/services/WBAPI/index.js";
import dbUtils from "../../../database/collections/index.js";
import getCurrentDayMSK from "../services/getCurrentDayMSK.js";

var uploadToWBAPITodayPricesAndDiscounts = async (req, res, next) => {
  var { getWBTokenByUserId } = dbUtils.tokenCollectionServices;
  var { getAllUserWeeklyPricesAndDiscounts, setUploadId } = dbUtils.weeklyPricesAndDiscountsCollectionServices;

  var { currentDayIndex } = getCurrentDayMSK();
  var data = await getAllUserWeeklyPricesAndDiscounts();

  for (var { userId, weeklyPricesAndDiscounts } of data) {
    if (weeklyPricesAndDiscounts.length) {
      var currentDayPricesAndDiscounts = weeklyPricesAndDiscounts[currentDayIndex].map(({ data }) => data);

      if (currentDayPricesAndDiscounts) {
        var { token } = await getWBTokenByUserId(userId);
        var { id, alreadyExists } = await wbapi.setPricesAndDiscounts(userId, token, currentDayPricesAndDiscounts);

        if (!alreadyExists) {
          await setUploadId(userId, id);
        }
      }
    }
  }

  return res.sendStatus(200);
};

export default uploadToWBAPITodayPricesAndDiscounts;
