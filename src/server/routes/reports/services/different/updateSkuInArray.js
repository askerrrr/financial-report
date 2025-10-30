var updateSkuInArray = (skus, { skuIndex, costPrice, fieldName }) => {
  var sku = skus[skuIndex];

  sku[fieldName] = costPrice;

  skus[skuIndex] = sku;

  return { updatedSKUS: skus, updatedSKU: sku };
};

module.exports = updateSkuInArray;
