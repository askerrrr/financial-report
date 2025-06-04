var calcTotalRevenue = async (data) => {
  var items = data.map((e) => e.ppvz_for_pay);

  var totalRevenue = items.reduce((acc, item) => acc + item, 0);

  return totalRevenue;
};
module.exports = calcTotalRevenue;
