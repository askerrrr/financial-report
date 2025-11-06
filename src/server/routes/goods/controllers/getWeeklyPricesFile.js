var { generageWeeklyPricesFile } = require("../services/weeklyPrices");

var getWeeklyPricesFile = async (req, res, next) => {
  var { userId } = req.params;
  var { getListGoodsFromDb } = req.app.locals.goodsCollectionServices;
  var { getWeeklyPricesAndDiscountsFromDb } =
    req.app.locals.weeklyPricesAndDiscountsCollectionServices;

  var { listGoods } = await getListGoodsFromDb(userId);
  var { buffer } = await generageWeeklyPricesFile(listGoods);

  res.set({
    "Content-Disposition": 'attachment; filename="weeklyPrices.xlsx"',
    "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });

  return res.send(buffer);
};

module.exports = getWeeklyPricesFile;
