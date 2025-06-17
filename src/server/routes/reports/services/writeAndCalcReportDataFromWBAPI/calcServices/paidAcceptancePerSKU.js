var calcPaidAcceptancePerSKU = (skuName, report) => {
  var sku = report.filter((e) => e.sa_name == skuName);

  var acceptancePerSKU = sku.reduce((acc, i) => acc + i.acceptance, 0);

  return acceptancePerSKU;
};

module.exports = calcPaidAcceptancePerSKU;
