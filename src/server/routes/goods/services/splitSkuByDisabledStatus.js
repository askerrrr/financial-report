var splitSkuByDisabledStatus = (listGoods) => {
  var enabledSku = [];
  var disabledSku = [];

  for (var sku of listGoods) {
    if (sku.disabled) {
      disabledSku.push(sku);
    } else {
      enabledSku.push(sku);
    }
  }

  return { listGoods: { enabledSku, disabledSku } };
};

module.exports = splitSkuByDisabledStatus;
