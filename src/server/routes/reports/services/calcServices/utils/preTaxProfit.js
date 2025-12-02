var calcPreTaxProfitPerSKU = ({ qty, profit, costPrice }) => {
  if (profit === 0 || qty === 0) {
    return 0;
  }

  var preTaxProfit = profit - qty * costPrice;
  return preTaxProfit;
};

module.exports = calcPreTaxProfitPerSKU;
