var changeSkuDisableStatus = async (req, res, next) => {
  var { updateSkuDisableStatusToDb } = req.app.locals.goodsCollectionServices;
  var { userId, skuName, disableStatus } = req.body;
  var result = await updateSkuDisableStatusToDb(userId, skuName, disableStatus);
  console.log({ result });
  return res.sendStatus(200);
};

module.exports = changeSkuDisableStatus;
