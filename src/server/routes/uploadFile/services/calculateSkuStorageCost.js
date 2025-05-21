var shorteningStr = (str) => {
  var [start, end] = str.split(".");

  return start + "." + end.slice(0, 3);
};

var calculateSkuStorageCost = async (data) => {
  var skuStorageCost = data.qty.map((qty) => {
    var result = (data.summaryData.storageCost / data.totalProducts) * qty + "";

    var cost = shorteningStr(result);

    return +cost;
  });

  data.skuStorageCost = skuStorageCost;

  return data;
};

module.exports = calculateSkuStorageCost;
