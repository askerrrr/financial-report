var shortNum = require("../../reportParsing/shortNum");

var calcTotalSellerPayoutAmount = (skus) => {
  var totalSellerPayoutAmount = skus.reduce((acc, sku) => acc + sku.sellerPayoutAmount, 0);

  return shortNum(totalSellerPayoutAmount);
};

module.exports = calcTotalSellerPayoutAmount;
