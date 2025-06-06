var calcTotalRetailAmount = async (report) => {
  var totalRetailAmount = report.reduce((acc, i) => acc + i.retail_amount, 0);

  return totalRetailAmount;
};

module.exports = calcTotalRetailAmount;
