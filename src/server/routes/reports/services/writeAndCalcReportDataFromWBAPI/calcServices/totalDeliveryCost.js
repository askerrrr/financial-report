var shortNum = require("../shortNum");

var calcTotalDeliveryCost = async (data) => {
  var skus = data.map((sku) => sku.delivery_rub);

  var totalDeliveryCost = skus.reduce(
    (acc, deliveryCost) => acc + deliveryCost,
    0
  );

  return await shortNum(totalDeliveryCost);
};
module.exports = calcTotalDeliveryCost;
