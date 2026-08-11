var getSkuFromListGoods = async (collection, userId, skuId, skuName, session) => {
  var data = await collection.findOne({ userId, "listGoods.id": skuId, "listGoods.skuName": skuName }, { "listGoods.$": 1 }, { session: session });

  return { skuFromListGoods: data?.listGoods[0] };
};

export default getSkuFromListGoods;
