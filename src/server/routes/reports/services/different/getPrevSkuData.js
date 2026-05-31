var getPrevSkuData = (sku) => {
  var prevSkuData = {};

  prevSkuData.costPrice = sku.costPrice;

  prevSkuData.qty = sku.qty;
  prevSkuData.profitMargin = sku.profitMargin;
  prevSkuData.finalProfit = sku.finalProfit;
  prevSkuData.preTaxProfit = sku.preTaxProfit;
  prevSkuData.insuranceFee = sku.insuranceFee;
  prevSkuData.otherExpenses = sku.otherExpenses;

  prevSkuData.qtyInCurrentYear = sku.qtyInCurrentYear;
  prevSkuData.finalProfitInCurrentYear = sku.finalProfitInCurrentYear;
  prevSkuData.preTaxProfitInCurrentYear = sku.preTaxProfitInCurrentYear;
  prevSkuData.insuranceFeeInCurrentYear = sku.insuranceFeeInCurrentYear;
  prevSkuData.profitMarginInCurrentYear = sku.profitMarginInCurrentYear;
  prevSkuData.otherExpensesInCurrentYear = sku.otherExpensesInCurrentYear;

  prevSkuData.qtyInNextYear = sku.qtyInNextYear;
  prevSkuData.finalProfitInNextYear = sku.finalProfitInNextYear;
  prevSkuData.preTaxProfitInNextYear = sku.preTaxProfitInNextYear;
  prevSkuData.otherExpensesInNextYear = sku.otherExpensesInNextYear;
  prevSkuData.profitMarginInNextYear = sku.profitMarginInNextYear;
  prevSkuData.insuranceFeeInNextYear = sku.insuranceFeeInNextYear;

  return prevSkuData;
};

export default getPrevSkuData;
