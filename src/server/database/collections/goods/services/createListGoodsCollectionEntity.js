var { WBAPIError } = require("../../../../customError");

var createListGoodsCollectionEntity = async (collection, userId, session) => {
  var sessionOpt = session ? { session: session } : {};
  try {
    await collection.insertOne({ userId, listGoods: [] }, sessionOpt);
  } catch (e) {
    throw new WBAPIError(userId, 500, e);
  }
};

module.exports = createListGoodsCollectionEntity;
