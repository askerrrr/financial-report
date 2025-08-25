var shortNum = require("../shortNum");

var calcTotalSellerPayoutAmount = async (skus) => {
  var totalSellerPayoutAmount = skus.reduce((acc, sku) => acc + sku.sellerPayoutAmountPerSKU, 0);

  return await shortNum(totalSellerPayoutAmount);
};

module.exports = calcTotalSellerPayoutAmount;
