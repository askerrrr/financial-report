var shortNum = require("../shortNum");

var calcProfitMargin = async ({ finalProfitPerSKU, retailAmountPerSKU }) => {
  if (finalProfitPerSKU === 0) {
    return 0;
  }

  var profitMargin = (finalProfitPerSKU * 100) / retailAmountPerSKU;

  return await shortNum(profitMargin);
};

module.exports = calcProfitMargin;
