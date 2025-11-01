var fileParser = require("../services/fileParser");

var uploadPricesAndDiscountsFile = async (req, res, next) => {
  var { userId } = req.params;
  var { getListGoodsFromDb } = req.app.locals.goodsCollectionServices;
  var { listGoods } = await getListGoodsFromDb(userId);

  var fileBuffer = req.file.buffer;

  var { pricesAndDiscounts } = await fileParser(fileBuffer, listGoods);
  return res.json({ pricesAndDiscounts });
};

module.exports = uploadPricesAndDiscountsFile;
