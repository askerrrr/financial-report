var generageSKusMetricsFile = require("../services/skusMetrics");

var downloadSkusMetrics = async (req, res, next) => {
  var { userId } = req.app.locals;
  var { getListGoodsFromDb } = req.app.locals.goodsCollectionServices;

  var { listGoods } = await getListGoodsFromDb(userId);
  var skusMetricsFileBuffer = await generageSKusMetricsFile(listGoods);
};

module.exports = downloadSkusMetrics;
