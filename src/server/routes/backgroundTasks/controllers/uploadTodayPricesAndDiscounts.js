import wbapi from "../../reports/services/WBAPI/index.js";
import getCurrentDayMSK from "../services/getCurrentDayMSK.js";

var uploadTodayPricesAndDiscounts = async (req, res, next) => {
  var { getWBTokenByUserId } = req.app.locals.tokenCollectionServices;
  var { getAllUserWeeklyPricesAndDiscounts, setUploadId } = req.app.locals.weeklyPricesAndDiscountsCollectionServices;

  var { currentDayIndex } = getCurrentDayMSK();
  var data = await getAllUserWeeklyPricesAndDiscounts();

  for (var { userId, weeklyPricesAndDiscounts } of data) {
    if (!weeklyPricesAndDiscounts.length) {
      continue;
    }

    var currentDayData = weeklyPricesAndDiscounts[currentDayIndex];

    if (currentDayData) {
      var { token } = await getWBTokenByUserId(userId);
      var { id, alreadyExists } = await wbapi.setPricesAndDiscounts(userId, token, currentDayData);

      if (!alreadyExists) {
        await setUploadId(userId, id);
      }
    }
  }

  return res.sendStatus(200);
};

export default uploadTodayPricesAndDiscounts;
