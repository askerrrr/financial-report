var calculateSkuStorageCost = async (data) => {
  var skuStorageCost = data.qty.map((qty) => {
    var result = (data.summaryData.storageCost / data.totalProducts) * qty + "";

    return +result.slice(0, 5);
  });

  data.skuStorageCost = skuStorageCost;

  return data;
};

module.exports = calculateSkuStorageCost;
