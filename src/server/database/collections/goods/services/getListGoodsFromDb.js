var { WBAPIError } = require("../../../../customError");

var getListGoodsFromDb = async (collection, userId) => {
  try {
    var { listGoods } = await collection.findOne({ userId });

    return { listGoods };
  } catch (e) {
    throw new WBAPIError(userId, 500, e);
  }
};

module.exports = getListGoodsFromDb;
