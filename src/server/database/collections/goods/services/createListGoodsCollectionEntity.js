var { WBAPIError } = require("../../../../customError");

var createListGoodsCollectionEntity = async (collection, userId) => {
  try {
    await collection.insertOne({ userId, listGoods: [] });
  } catch (e) {
    throw new WBAPIError(userId, 500, e);
  }
};

module.exports = createListGoodsCollectionEntity;
