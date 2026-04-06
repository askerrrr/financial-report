import { WBAPIError } from "../../../../customError/index.js";

var getListGoodsFromDb = async (collection, userId, session) => {
  var sessionOption = session ? { session } : {};
  try {
    var data = await collection.findOne({ userId }, null, { ...sessionOption });

    return { listGoods: data.listGoods.toObject() };
  } catch (e) {
    throw new WBAPIError(userId, 500, e);
  }
};

export default getListGoodsFromDb;
