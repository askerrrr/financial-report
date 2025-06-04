var caclTotalDeliveryCost = async (data) => {
  var items = data.map((e) => e.delivery_rub);

  var totalDeliveryCost = items.reduce((acc, item) => acc + item, 0);

  return totalDeliveryCost;
};
module.exports = caclTotalDeliveryCost;
