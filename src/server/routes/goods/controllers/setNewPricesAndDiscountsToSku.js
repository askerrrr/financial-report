import { dbClient } from "../../../database/index.js";
import wbapi from "../../reports/services/WBAPI/index.js";
import dbUtils from "../../../database/collections/index.js";

var setNewPricesAndDiscountsToSku = async (req, res, next) => {
  var { error } = schema.validate(req.body);

  if (error) {
    return res.sendStatus(400);
  }

  var { updateSingleSku } = dbUtils.goodsCollectionServices;
  var { getWBTokenByUserId, updateLastUsedTimestamp } = dbUtils.tokenCollectionServices;
  var { userId, sku, setNewPriceNow, expectedPriceExists } = req.body;

  var session = await dbClient.startSession();

  try {
    await session.withTransaction(async () => {});
    if (setNewPriceNow) {
      var { token } = await getWBTokenByUserId(userId, session);
      var data = [{ ...sku }];

      await updateSingleSku(userId, sku, session);
      await updateLastUsedTimestamp(userId, session);
      await wbapi.setPricesAndDiscounts(userId, token, data);
    }
  } catch (e) {
    return res.sendStatus(304);
  } finally {
    if (session) {
      await session.endSession();
    }
  }

  if (!expectedPriceExists) {
    return res.sendStatus(200);
  }

  next();
};

export default setNewPricesAndDiscountsToSku;
