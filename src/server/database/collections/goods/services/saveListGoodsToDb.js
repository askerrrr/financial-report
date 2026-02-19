var { WBAPIError } = require("../../../../customError");

var saveListGoodsToDb = async (collection, userId, listGoods, session) => {
  try {
    var sessionOpt = session ? { session: session } : {};
    var result = await collection.updateOne({ userId }, { $set: { listGoods } }, { ...sessionOpt });

    return result;
  } catch (e) {
    throw new WBAPIError(userId, 500, e);
  }
};

module.exports = saveListGoodsToDb;
