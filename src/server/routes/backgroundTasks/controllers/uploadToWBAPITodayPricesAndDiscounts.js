import { dbClient } from "../../../database/index.js";
import wbapi from "../../reports/services/WBAPI/index.js";
import dbUtils from "../../../database/collections/index.js";
import getCurrentDayMSK from "../services/getCurrentDayMSK.js";

var updateLastUsedTimestampNow = true;

var uploadToWBAPITodayPricesAndDiscounts = async (req, res, next) => {
  var { getWBTokenByUserId } = dbUtils.tokenCollectionServices;
  var { getTodayPricesAndDiscountsByDayIndex, setUploadId } = dbUtils.weeklyPricesAndDiscountsCollectionServices;

  var { currentDayIndex } = getCurrentDayMSK();
  var data = await getTodayPricesAndDiscountsByDayIndex(currentDayIndex);

  var session = await dbClient.startSession();

  for (var { userId, currentDayPricesAndDiscounts } of data) {
    try {
      if (currentDayPricesAndDiscounts) {
        currentDayPricesAndDiscounts = currentDayPricesAndDiscounts.map(({ data }) => data);

        var { token } = await getWBTokenByUserId(userId, session, updateLastUsedTimestampNow);
        var { id, alreadyExists } = await wbapi.setPricesAndDiscounts(userId, token, currentDayPricesAndDiscounts);

        if (!alreadyExists) {
          await setUploadId(userId, id, session);
        }
      }
    } catch (e) {
    } finally {
      if (session) {
        await session.endSession();
      }
    }
  }

  return res.sendStatus(200);
};

export default uploadToWBAPITodayPricesAndDiscounts;
