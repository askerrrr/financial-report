var { WBAPIError } = require("../../../../customError");

var saveListGoodsToDb = async (collection, userId, listGoods) => {
  try {
    var result = await collection.updateOne({ userId }, { $set: { listGoods } });

    return result;
  } catch (e) {
    throw new WBAPIError(userId, 500, e);
  }
};

module.exports = saveListGoodsToDb;
