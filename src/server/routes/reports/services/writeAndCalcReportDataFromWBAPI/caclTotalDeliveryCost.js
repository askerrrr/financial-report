var caclTotalDeliveryCost = async (data) =>
  data.map((e) => e.delivery_rub).reduce((acc, item) => acc + item, 0);

module.exports = caclTotalDeliveryCost;
