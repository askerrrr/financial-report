var mergeData = (idsAndDisableStatuses, newListGoodsData) => {
  var updatedListGoods = [];

  for (var sku of newListGoodsData) {
    var existSku = idsAndDisableStatuses.find((item) => item.id === sku.id);

    if (existSku) {
      sku.disabled = existSku.disabled;
      updatedListGoods.push(sku);
    } else {
      updatedListGoods.push(sku);
    }
  }

  return { updatedListGoods };
};

module.exports = mergeData;
