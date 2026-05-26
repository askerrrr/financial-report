import dbUtils from "../../../database/collections/index.js";

var changeSkuDisableStatus = async (req, res, next) => {
  var { updateSkuDisableStatusToDb } = dbUtils.goodsCollectionServices;
  var { userId, skuName, disableStatus } = req.body;
  var success = await updateSkuDisableStatusToDb(userId, skuName, disableStatus);

  if (!success) {
    return res.sendStatus(304);
  }

  return res.sendStatus(200);
};

export default changeSkuDisableStatus;
