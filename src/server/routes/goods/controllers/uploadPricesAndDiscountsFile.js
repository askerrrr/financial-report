var { dbClient } = require("../../../database");
var { readWeeklyPricesFile } = require("../services/weeklyPrices/");

var uploadPricesAndDiscountsFile = async (req, res, next) => {
  var { userId } = req.params;
  var { getListGoodsFromDb } = req.app.locals.goodsCollectionServices;
  var { setWeeklyPricesAndDiscountsToDb } = req.app.locals.weeklyPricesAndDiscountsCollectionServices;

  var session = await dbClient.startSession();

  try {
    await session.withTransaction(async () => {
      var { listGoods } = await getListGoodsFromDb(userId, session);

      if (!listGoods.length) {
        return res.sendStatus(400);
      }

      var fileBuffer = req.file.buffer;

      var { weeklyPricesAndDiscounts } = await readWeeklyPricesFile(fileBuffer, listGoods);
      await setWeeklyPricesAndDiscountsToDb(userId, weeklyPricesAndDiscounts, session);

      return res.json({ weeklyPricesAndDiscounts });
    });
  } catch (e) {
    throw e;
  } finally {
    await session.endSession();
  }
};

module.exports = uploadPricesAndDiscountsFile;
