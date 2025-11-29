var getSkusLastCostPrice = async (collection, userId) => {
  var data = await collection.findOne({ userId }, { "listGoods.lastCostPrice": 1, "listGoods.id": 1, "listGoods.skuName": 1, _id: 0 });

  return { skusLastCostPrice: data.listGoods };
};

module.exports = getSkusLastCostPrice;
