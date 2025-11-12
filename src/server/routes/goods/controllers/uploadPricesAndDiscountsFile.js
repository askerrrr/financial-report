var { readWeeklyPricesFile } = require("../services/weeklyPrices/");

var uploadPricesAndDiscountsFile = async (req, res, next) => {
  var { userId } = req.params;
  var { getListGoodsFromDb } = req.app.locals.goodsCollectionServices;
  var { setWeeklyPricesAndDiscountsToDb } = req.app.locals.weeklyPricesAndDiscountsCollectionServices;
  var { listGoods } = await getListGoodsFromDb(userId);

  if (!listGoods.length) {
    return res.sendStatus(400);
  }

  var fileBuffer = req.file.buffer;

  var { weeklyPricesAndDiscounts } = await readWeeklyPricesFile(fileBuffer, listGoods);
  var success = await setWeeklyPricesAndDiscountsToDb(userId, weeklyPricesAndDiscounts);

  console.log({ success });
  return res.json({ weeklyPricesAndDiscounts });
};

module.exports = uploadPricesAndDiscountsFile;
