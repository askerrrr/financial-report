var calcTotalRevenue = async (data) =>
  data.map((e) => e.ppvz_for_pay).reduce((acc, item) => acc + item, 0);

module.exports = calcTotalRevenue;
