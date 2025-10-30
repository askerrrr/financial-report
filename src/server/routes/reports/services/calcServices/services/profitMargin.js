var shortNum = require("../../writeAndCalcReportDataFromWBAPI/shortNum");

var calcProfitMargin = ({ finalProfitPerSKU, retailAmount }) => {
  if (finalProfitPerSKU === 0) {
    return 0;
  }

  var profitMargin = (finalProfitPerSKU * 100) / retailAmount;

  return shortNum(profitMargin);
};

module.exports = calcProfitMargin;
