var shortNum = require("../../reportParsing/shortNum");

var calcTotalDeliveryCost = (skus) => {
  var totalDeliveryCost = skus.reduce((acc, sku) => acc + sku.deliveryCost, 0);
  return shortNum(totalDeliveryCost);
};

module.exports = calcTotalDeliveryCost;
