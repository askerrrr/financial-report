var calc = require("../calcServices");
var recalculateFinalSkuMetrics = require("./recalculateFinalSkuMetrics");

var processOfSkuCostPriceSetting = async (sku, skuFromListGoods, taxParams, isCrossYearReport, previousFinalSkuData = null) => {
  if (isCrossYearReport) {
    var currentYearPropPostfix = "InCurrentYear";
    var nextYearPropPostfix = "InNextYear";

    if (!previousFinalSkuData) {
      var previousFinalSkuData = {};
      previousFinalSkuData["finalProfit" + currentYearPropPostfix] = sku["finalProfit" + currentYearPropPostfix] ?? 0;
      previousFinalSkuData["insuranceFee" + currentYearPropPostfix] = sku["insuranceFee" + currentYearPropPostfix] ?? 0;
      previousFinalSkuData["otherExpenses" + currentYearPropPostfix] = sku["otherExpenses" + currentYearPropPostfix];
      previousFinalSkuData["finalProfit" + nextYearPropPostfix] = sku["finalProfit" + nextYearPropPostfix] ?? 0;
      previousFinalSkuData["insuranceFee" + nextYearPropPostfix] = sku["insuranceFee" + nextYearPropPostfix] ?? 0;
      previousFinalSkuData["otherExpenses" + nextYearPropPostfix] = sku["otherExpenses" + nextYearPropPostfix];
    }

    var { startYearTaxParams, endYearTaxParams } = taxParams;

    var updatingOfStartYear = calc.sku.restParams(sku, startYearTaxParams, currentYearPropPostfix);

    var skuWithCalculatedParamsOfStartYear = updatingOfStartYear.skuWithCalculatedParams;
    startYearTaxParams = updatingOfStartYear.updatedTaxParams;

    var startYear = startYearTaxParams.year;

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
    if (!previousFinalSkuData) {
      var previousFinalSkuData = {};

      previousFinalSkuData.finalProfit = sku.finalProfit ?? 0;
      previousFinalSkuData.insuranceFee = sku.insuranceFee ?? 0;
      previousFinalSkuData.otherExpenses = sku.otherExpenses;
    }

    var { year } = taxParams;
    var result = calc.sku.restParams(sku, taxParams);

    skuFromListGoods = recalculateFinalSkuMetrics(year, skuFromListGoods, result.skuWithCalculatedParams, previousFinalSkuData);

    return { updatedSkuMetrics: skuFromListGoods.metrics, taxParams: result.updatedTaxParams, updatedSku: result.skuWithCalculatedParams };
  }
};

module.exports = processOfSkuCostPriceSetting;
