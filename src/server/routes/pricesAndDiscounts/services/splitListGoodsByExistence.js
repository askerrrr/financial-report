var splitListGoodsByExistence = (listGoodsIds, newListGoodsData) => {
  var newSkus = [];
  var updatedSkus = [];

  for (var sku of newListGoodsData) {
    var existSku = listGoodsIds.find((item) => item.id === sku.id);

    if (existSku) {
      updatedSkus.push(sku);
    } else {
      newSkus.push(sku);
    }
  }

  return { newSkus, updatedSkus };
};

module.exports = splitListGoodsByExistence;
