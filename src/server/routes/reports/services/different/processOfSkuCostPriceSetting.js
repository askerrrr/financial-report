var calc = require("../calcServices");
var recalculateFinalSkuMetrics = require("./recalculateFinalSkuMetrics");

var processOfSkuCostPriceSetting = async (sku, skuFromListGoods, taxParams, isCrossYearReport) => {
  var previousFinalSkuData = {};

  if (isCrossYearReport) {
    var currentYearPropPostfix = "InCurrentYear";
    var nextYearPropPostfix = "InNextYear";

    var { startYearTaxParams, endYearTaxParams } = taxParams;

    var updatingOfStartYear = calc.sku.restParams(sku, startYearTaxParams, currentYearPropPostfix);

    var skuWithCalculatedParamsOfStartYear = updatingOfStartYear.skuWithCalculatedParams;
    startYearTaxParams = updatingOfStartYear.updatedTaxParams;

    var startYear = startYearTaxParams.year;
    previousFinalSkuData["finalProfit" + currentYearPropPostfix] = skuWithCalculatedParamsOfStartYear["finalProfit" + currentYearPropPostfix];
    previousFinalSkuData["insuranceFee" + currentYearPropPostfix] = skuWithCalculatedParamsOfStartYear["insuranceFee" + currentYearPropPostfix];

    skuFromListGoods = recalculateFinalSkuMetrics(
      startYear,
      skuFromListGoods,
      skuWithCalculatedParamsOfStartYear,
      previousFinalSkuData,
      currentYearPropPostfix,
    );

    var updatingOfEndYear = calc.sku.restParams(skuWithCalculatedParamsOfStartYear, endYearTaxParams, nextYearPropPostfix);

    var skuWithCalculatedParamsOfEndYear = updatingOfEndYear.skuWithCalculatedParams;
    endYearTaxParams = updatingOfEndYear.updatedTaxParams;

    var endYear = endYearTaxParams.year;
    previousFinalSkuData["insuranceFee" + nextYearPropPostfix] = skuWithCalculatedParamsOfEndYear["insuranceFee" + nextYearPropPostfix];
    previousFinalSkuData["finalProfit" + nextYearPropPostfix] = skuWithCalculatedParamsOfEndYear["finalProfit" + nextYearPropPostfix];

    skuFromListGoods = recalculateFinalSkuMetrics(
      endYear,
      skuFromListGoods,
      skuWithCalculatedParamsOfEndYear,
      previousFinalSkuData,
      nextYearPropPostfix,
    );

    var updatedSku = skuWithCalculatedParamsOfEndYear;

    updatedSku.finalProfit = skuWithCalculatedParamsOfStartYear.finalProfitInCurrentYear + skuWithCalculatedParamsOfEndYear.finalProfitInNextYear;

    updatedSku.insuranceFee = skuWithCalculatedParamsOfStartYear.insuranceFeeInCurrentYear + skuWithCalculatedParamsOfEndYear.insuranceFeeInNextYear;

    updatedSku.profitMargin =
      (skuWithCalculatedParamsOfStartYear.profitMarginInCurrentYear = skuWithCalculatedParamsOfEndYear.profitMarginInNextYear) / 2;

    return { updatedSkuMetrics: skuFromListGoods.metrics, taxParams: { startYearTaxParams, endYearTaxParams }, updatedSku };
  } else {
    var { year } = taxParams;
    var result = calc.sku.restParams(sku, taxParams);

    previousFinalSkuData.finalProfit = result.skuWithCalculatedParams.finalProfit;
    previousFinalSkuData.insuranceFee = result.skuWithCalculatedParams.insuranceFee;

    skuFromListGoods = recalculateFinalSkuMetrics(year, skuFromListGoods, result.skuWithCalculatedParams, previousFinalSkuData);

    return { updatedSkuMetrics: skuFromListGoods.metrics, taxParams: result.updatedTaxParams, updatedSku: result.skuWithCalculatedParams };
  }
};

module.exports = processOfSkuCostPriceSetting;
