var calcTotalSold = async (data, skuNames) => {
  var totalSold = [];

  for (var i = 0; i < skuNames.length; i++) {
    var skus = data.filter((e) => e.sa_name == skuNames[i]);

    totalSold.push(...skus);
  }

  return totalSold.reduce((acc, i) => acc + i.quantity, 0);
};

module.exports = calcTotalSold;
