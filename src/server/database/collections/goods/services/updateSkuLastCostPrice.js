var updateSkuLastCostPrice = async (collection, userId, skuId, costPrice, session) => {
  var result = await collection.updateOne(
    { userId },
    { $set: { "listGoods.$[sku].lastCostPrice": costPrice } },
    { arrayFilters: [{ "sku.id": skuId }], session: session }
  );

  return result;
};

module.exports = updateSkuLastCostPrice;
