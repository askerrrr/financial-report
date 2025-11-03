var { readWeeklyPricesFile } = require("../services/weeklyPrices/");

var uploadPricesAndDiscountsFile = async (req, res, next) => {
  var { userId } = req.params;
  var { getListGoodsFromDb, setWeeklyPricesAndDiscounts } = req.app.locals.goodsCollectionServices;
  var { listGoods } = await getListGoodsFromDb(userId);

  var fileBuffer = req.file.buffer;

  var { weeklyPricesAndDiscounts } = await readWeeklyPricesFile(fileBuffer, listGoods);
  var success = await setWeeklyPricesAndDiscounts(userId, weeklyPricesAndDiscounts);
  console.log({ success });
  return res.json({ weeklyPricesAndDiscounts });
};

module.exports = uploadPricesAndDiscountsFile;
