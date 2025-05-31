var calcTotalDeliveryCost = async (data) => {
  var totalDeliveryCost = data.reduce((acc, i) => acc + i, 0);

  return totalDeliveryCost;
};
