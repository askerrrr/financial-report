var getSkuFromListGoods = async (collection, userId, skuId, session) => {
  var data = await collection.findOne({ userId, "listGoods.id": skuId }, { "listGoods.$": 1 }, { session: session });

  var skuFromListGoods = data.listGoods[0];
  return { skuFromListGoods };
};

module.exports = getSkuFromListGoods;
