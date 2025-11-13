var splitSkuByDisabledStatus = require("../services/splitSkuByDisabledStatus");

var getListGoodsAndWeeklyPrices = async (req, res, next) => {
  var userId = req.params.userId;
  var { getListGoodsFromDb, getAllUserListGoodsIds } = req.app.locals.goodsCollectionServices;
  var { getWeeklyPricesAndDiscountsFromDb } =
    req.app.locals.weeklyPricesAndDiscountsCollectionServices;
  var data = await getAllUserListGoodsIds();

  console.log(...data);
  var { listGoods } = await getListGoodsFromDb(userId);
  var { listGoods } = splitSkuByDisabledStatus(listGoods);
  var { weeklyPricesAndDiscounts } = await getWeeklyPricesAndDiscountsFromDb(userId);

  return res.json({ listGoods, weeklyPricesAndDiscounts });
};

module.exports = getListGoodsAndWeeklyPrices;
