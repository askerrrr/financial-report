var calcTotalFinesPerSKU = async (data, skuName) => {
  var sku = data.filter((e) => e.sa_name == skuName);

  var totalFinesPerSKU = sku.reduce((acc, i) => acc + i.penalty, 0);

  return totalFinesPerSKU;
};

module.exports = calcTotalFinesPerSKU;
