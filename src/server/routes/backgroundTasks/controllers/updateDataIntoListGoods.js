import { dbClient } from "../../../database/index.js";
import wbapi from "../../reports/services/WBAPI/index.js";
import dbUtils from "../../../database/collections/index.js";
import splitListGoodsByExistence from "../services/splitListGoodsByExistence.js";
import extractRequiredListGoodsData from "../../goods/services/extractRequiredListGoodsData.js";

var updateLastUsedTimestampNow = true;

var updateDataIntoListGoods = async (req, res, next) => {
  var { getWBTokenByUserId } = dbUtils.tokenCollectionServices;
  var { getAllUserListGoodsIds, saveNewSkusToDb, updateSkusFields } = dbUtils.goodsCollectionServices;

  var data = await getAllUserListGoodsIds();

  var session = await dbClient.startSession();

  for (var { userId, listGoodsIds } of data) {
    try {
      if (listGoodsIds.length) {
        var { token } = await getWBTokenByUserId(userId, session, updateLastUsedTimestampNow);

        var { rawListGoods } = await wbapi.getPricesAndDiscountsByListGoods(userId, token, listGoodsIds);

        var { listGoods } = await extractRequiredListGoodsData(rawListGoods);
        var { newSkus, updatedSkus } = splitListGoodsByExistence(listGoodsIds, listGoods);

        if (newSkus.length) {
          await saveNewSkusToDb(userId, newSkus, session);
        }

        await updateSkusFields(userId, updatedSkus, session);
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

export default updateDataIntoListGoods;
