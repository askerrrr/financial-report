var calcTotalFines = async (data) => {
  var totalFines = data.reduce((acc, sku) => acc + sku.penalty, 0);

  return totalFines;
};

module.exports = calcTotalFines;
