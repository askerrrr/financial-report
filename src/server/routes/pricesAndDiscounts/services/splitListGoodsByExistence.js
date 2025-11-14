var splitListGoodsByExistence = (listGoodsIds, newListGoodsData) => {
  var newSkus = [];
  var updatedListGoods = [];

  for (var sku of newListGoodsData) {
    var existSku = listGoodsIds.find((item) => item.id === sku.id);

    if (existSku) {
      updatedListGoods.push(sku);
    } else {
      newSkus.push(sku);
    }
  }

  return { newSkus, updatedListGoods };
};

module.exports = splitListGoodsByExistence;
