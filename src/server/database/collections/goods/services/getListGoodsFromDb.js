var { WBAPIError } = require("../../../../customError");

var getListGoodsFromDb = async (collection, userId, session) => {
  try {
    var data;

    if (session) {
      data = await collection.findOne({ userId }, null, { session: session });
    } else {
      data = await collection.findOne({ userId });
    }

    return { listGoods: data.listGoods };
  } catch (e) {
    throw new WBAPIError(userId, 500, e);
  }
};

module.exports = getListGoodsFromDb;
