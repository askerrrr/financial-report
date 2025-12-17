var wbapi = require("../../reports/services/WBAPI");

var newPriceApplyController = async (req, res, next) => {
  var { updateSingleSku } = req.app.locals.goodsCollectionServices;
  var { getWBTokenByUserId } = req.app.locals.tokenCollectionServices;
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

module.exports = newPriceApplyController;
