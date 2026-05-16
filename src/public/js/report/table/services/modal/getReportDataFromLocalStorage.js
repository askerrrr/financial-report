var getRequiredSkuProperties = ({
  tax,
  qty,
  profit,
  finalProfit,
  profitMargin,
  retailAmount,
  insuranceFee,
  preTaxProfit,
  otherExpenses,
  isCostPriceSet,
  isInsuranceFeeIncluded,
  additionalInsuranceFee,
}) => {
  return {
    tax,
    qty,
    profit,
    finalProfit,
    profitMargin,
    retailAmount,
    insuranceFee,
    preTaxProfit,
    otherExpenses,
    isCostPriceSet,
    isInsuranceFeeIncluded,
    additionalInsuranceFee,
    costPrice: 0,
  };
};

var getRequiredReportTotalsProperties = ({
  totalRetailAmount,
  totalFinalProfit,
  totalProfitMargin,
  totalProductCosts,
  totalInsuranceFee,
  totalPreTaxProfit,
  totalOtherExpenses,
}) => {
  return { totalRetailAmount, totalFinalProfit, totalProfitMargin, totalProductCosts, totalInsuranceFee, totalPreTaxProfit, totalOtherExpenses };
};

var getReportDataFromLocalStorage = ({ userId, skuIndex }) => {
  var reportAsJSON = localStorage.getItem(userId);
  var report = JSON.parse(reportAsJSON);

  var data = {};

  data.skus = report.skus.map((sku) => getRequiredSkuProperties(sku));

  data.sku = report.skus[skuIndex];

  data.totals = getRequiredReportTotalsProperties(report);

  return data;
};

export default getReportDataFromLocalStorage;
