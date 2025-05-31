var calcTotalDeliveryCost = async (data) => {
  var totalDeliveryCost = data.deliveryCost.reduce((acc, i) => acc + i, 0);

  return totalDeliveryCost;
};

module.exports = calcTotalDeliveryCost;
