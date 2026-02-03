var generageSKusMetricsFile = require("../services/skusMetrics");

var getSkusMetricsFile = async (req, res, next) => {
  var { userId } = req.app.locals;
  var { getListGoodsFromDb } = req.app.locals.goodsCollectionServices;

  var { listGoods } = await getListGoodsFromDb(userId);
  var { skusMetricsFileBuffer } = await generageSKusMetricsFile(listGoods);

  res.set({
    "Content-Disposition": 'attachment; filename="file.xlsx"',
    "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });

  res.send(skusMetricsFileBuffer);
};

module.exports = getSkusMetricsFile;
