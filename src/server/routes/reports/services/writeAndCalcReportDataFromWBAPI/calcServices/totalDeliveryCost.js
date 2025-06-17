var shortNum = require("../shortNum");

var calcTotalDeliveryCost = async (data) => {
  var skus = data.map((e) => e.delivery_rub);

  var totalDeliveryCost = skus.reduce((acc, item) => acc + item, 0);

  return await shortNum(totalDeliveryCost);
};
module.exports = calcTotalDeliveryCost;
