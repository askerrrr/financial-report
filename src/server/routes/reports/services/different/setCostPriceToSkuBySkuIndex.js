var setCostPriceToSkuBySkuIndex = (skus, skuIndex, costPrice) => {
  var sku = skus[skuIndex];

  sku.costPrice = costPrice;

  skus[skuIndex] = sku;

  return { updatedSKUS: skus, updatedSKU: sku };
};

module.exports = setCostPriceToSkuBySkuIndex;
