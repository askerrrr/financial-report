var saveUpdatedSkuMetrics = async (collection, userId, skuId, metrics, session) => {
  var result = await collection.updateOne(
    { userId, "listGoods.id": skuId },
    { $set: { "listGoods.$[sku].metrics": metrics } },
    { arrayFilters: [{ "sku.id": skuId }], session: session }
  );

  return result;
};

export default saveUpdatedSkuMetrics;
