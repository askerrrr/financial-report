import calc from "../calcServices/index.js";
import truncateNum from "../reportParsing/truncateNum.js";
import recalculateFinalSkuMetrics from "./recalculateFinalSkuMetrics.js";

var currentYearPostfix = "InCurrentYear";
var nextYearPostfix = "InNextYear";

var processOfSkuCostPriceSetting = async (sku, skuFromListGoods, taxParams, isCrossYearPeriod, prevSkuData) => {
  if (isCrossYearPeriod) {
    var { startYearTaxParams, endYearTaxParams } = taxParams;

    var updatingOfStartYear = calc.sku.restParams(sku, startYearTaxParams, currentYearPostfix);

    var skuWithCalculatedParamsOfStartYear = updatingOfStartYear.skuWithCalculatedParams;
    startYearTaxParams = updatingOfStartYear.updatedTaxParams;

    var startYear = startYearTaxParams.year;

    skuFromListGoods = recalculateFinalSkuMetrics(startYear, skuFromListGoods, skuWithCalculatedParamsOfStartYear, prevSkuData, currentYearPostfix);

    var updatingOfEndYear = calc.sku.restParams(skuWithCalculatedParamsOfStartYear, endYearTaxParams, nextYearPostfix);

    var skuWithCalculatedParamsOfEndYear = updatingOfEndYear.skuWithCalculatedParams;
    endYearTaxParams = updatingOfEndYear.updatedTaxParams;

    var endYear = endYearTaxParams.year;

    skuFromListGoods = recalculateFinalSkuMetrics(endYear, skuFromListGoods, skuWithCalculatedParamsOfEndYear, prevSkuData, nextYearPostfix);

    var updatedSku = skuWithCalculatedParamsOfEndYear;

    var recalculatedPreTaxProfit = skuWithCalculatedParamsOfStartYear.preTaxProfitInCurrentYear + skuWithCalculatedParamsOfEndYear.preTaxProfitInNextYear;
    updatedSku.preTaxProfit = truncateNum(recalculatedPreTaxProfit);

    var recalculatedFinalProfit = skuWithCalculatedParamsOfStartYear.finalProfitInCurrentYear + skuWithCalculatedParamsOfEndYear.finalProfitInNextYear;
    updatedSku.finalProfit = truncateNum(recalculatedFinalProfit);

    var recalculatedInsuranceFee = skuWithCalculatedParamsOfStartYear.insuranceFeeInCurrentYear + skuWithCalculatedParamsOfEndYear.insuranceFeeInNextYear;
    updatedSku.insuranceFee = truncateNum(recalculatedInsuranceFee);

    updatedSku.profitMargin = calc.profitMargin(updatedSku.finalProfit, updatedSku.retailAmount);

    return { updatedSkuMetrics: skuFromListGoods.metrics, taxParams: { startYearTaxParams, endYearTaxParams }, updatedSku };
  } else {
    var result = calc.sku.restParams(sku, taxParams);

    skuFromListGoods = recalculateFinalSkuMetrics(taxParams.year, skuFromListGoods, result.skuWithCalculatedParams, prevSkuData);

    return { updatedSkuMetrics: skuFromListGoods.metrics, taxParams: result.updatedTaxParams, updatedSku: result.skuWithCalculatedParams };
  }
};

export default processOfSkuCostPriceSetting;
