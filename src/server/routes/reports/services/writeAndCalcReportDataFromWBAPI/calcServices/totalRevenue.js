var shortNum = require("../shortNum");

var calcTotalRevenue = async (data) => {
  var skus = data.map((e) => e.ppvz_for_pay);

  var totalRevenue = skus.reduce((acc, sku) => acc + sku, 0);

  return await shortNum(totalRevenue);
};
module.exports = calcTotalRevenue;
