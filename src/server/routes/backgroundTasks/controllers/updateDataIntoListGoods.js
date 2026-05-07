import wbapi from "../../reports/services/WBAPI/index.js";
import dbUtils from "../../../database/collections/index.js";
import splitListGoodsByExistence from "../services/splitListGoodsByExistence.js";
import extractRequiredListGoodsData from "../../goods/services/extractRequiredListGoodsData.js";

var updateDataIntoListGoods = async (req, res, next) => {
  var { getWBTokenByUserId } = dbUtils.tokenCollectionServices;
  var { getAllUserListGoodsIds, saveNewSkusToDb, updateSkusFields } = dbUtils.goodsCollectionServices;

  var data = await getAllUserListGoodsIds();

  for (var { userId, listGoodsIds } of data) {
    if (listGoodsIds.length) {
      var { token } = await getWBTokenByUserId(userId);

      var { rawListGoods } = await wbapi.getPricesAndDiscountsByListGoods(userId, token, listGoodsIds);

      var { listGoods } = await extractRequiredListGoodsData(rawListGoods);
      var { newSkus, updatedSkus } = splitListGoodsByExistence(listGoodsIds, listGoods);

      if (newSkus.length) {
        await saveNewSkusToDb(userId, newSkus);
      }

      await updateSkusFields(userId, updatedSkus);
    }
  }

  return res.sendStatus(200);
};

export default updateDataIntoListGoods;
