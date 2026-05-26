import wbapi from "../../reports/services/WBAPI/index.js";
import dbUtils from "../../../database/collections/index.js";

var setNewPricesAndDiscountsToSku = async (req, res, next) => {
  var { error } = schema.validate(req.body);

  if (error) {
    return res.sendStatus(400);
  }

  var { updateSingleSku } = dbUtils.goodsCollectionServices;
  var { getWBTokenByUserId } = dbUtils.tokenCollectionServices;
  var { userId, sku, setNewPriceNow, expectedPriceExists } = req.body;

  if (setNewPriceNow) {
    var { token } = await getWBTokenByUserId(userId);
    var data = [{ ...sku }];

    await updateSingleSku(userId, sku);
    await wbapi.setPricesAndDiscounts(userId, token, data);
  }

  if (!expectedPriceExists) {
    return res.sendStatus(200);
  }

  next();
};

export default setNewPricesAndDiscountsToSku;
