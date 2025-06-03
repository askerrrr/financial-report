var calcTotalRevenuePerItem = async (data, itemName) => {
  var item = data.filter((e) => e.sa_name == itemName);

  var totalRevenuePerItem = item.reduce((acc, i) => acc + i.ppvz_for_pay, 0);

  return Math.round(totalRevenuePerItem);
};

module.exports = calcTotalRevenuePerItem;
