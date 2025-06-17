var calcDeliveryCostPerSKU = async (data, skuName) => {
  var sku = data.filter((e) => e.sa_name == skuName);

  var deliveryCostPerSKU = sku.reduce((acc, i) => acc + i.delivery_rub, 0);

  return deliveryCostPerSKU;
};

module.exports = calcDeliveryCostPerSKU;
