var changeSkuDisableStatus = async (req, res, next) => {
  var { updateSkuDisableStatusToDb } = req.app.locals.goodsCollectionServices;
  var { userId, skuName, disableStatus } = req.body;
  var success = await updateSkuDisableStatusToDb(userId, skuName, disableStatus);

  if (!success) {
    return res.sendStatus(304);
  }

  return res.sendStatus(200);
};

module.exports = changeSkuDisableStatus;
