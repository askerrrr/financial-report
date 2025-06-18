var shortNum = require("../shortNum");

var calcTotalRetailAmount = async (report) => {
  var totalRetailAmount = report.reduce((acc, i) => acc + i.retail_amount, 0);

  return await shortNum(totalRetailAmount);
};

module.exports = calcTotalRetailAmount;
