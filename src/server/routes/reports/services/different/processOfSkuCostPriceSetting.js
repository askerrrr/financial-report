import calc from "../calcServices/index.js";
import truncateNum from "../reportParsing/truncateNum.js";
import recalculateFinalSkuMetrics from "./recalculateFinalSkuMetrics.js";

var processOfSkuCostPriceSetting = async (sku, skuFromListGoods, taxParams, prevSkuData, postfix) => {
  var { year } = taxParams;

  if (postfix) {
    var { skuWithCalculatedParams, updatedTaxParams } = calc.sku.restParams(sku, taxParams, postfix);

    skuFromListGoods = recalculateFinalSkuMetrics(year, skuFromListGoods, skuWithCalculatedParams, prevSkuData, postfix);

    var recalculatedPreTaxProfit = skuWithCalculatedParams.preTaxProfitInCurrentYear + skuWithCalculatedParams.preTaxProfitInNextYear;
    skuWithCalculatedParams.preTaxProfit = truncateNum(recalculatedPreTaxProfit);

    var recalculatedFinalProfit = skuWithCalculatedParams.finalProfitInCurrentYear + skuWithCalculatedParams.finalProfitInNextYear;
    skuWithCalculatedParams.finalProfit = truncateNum(recalculatedFinalProfit);

    var recalculatedInsuranceFee = skuWithCalculatedParams.insuranceFeeInCurrentYear + skuWithCalculatedParams.insuranceFeeInNextYear;
    skuWithCalculatedParams.insuranceFee = truncateNum(recalculatedInsuranceFee);

    skuWithCalculatedParams.profitMargin = calc.profitMargin(skuWithCalculatedParams.finalProfit, skuWithCalculatedParams.retailAmount);

    return { updatedSkuMetrics: skuFromListGoods.metrics, taxParams: updatedTaxParams, updatedSku: skuWithCalculatedParams };
  } else {
    var { skuWithCalculatedParams, updatedTaxParams } = calc.sku.restParams(sku, taxParams);

    skuFromListGoods = recalculateFinalSkuMetrics(year, skuFromListGoods, skuWithCalculatedParams, prevSkuData);

    return { updatedSkuMetrics: skuFromListGoods.metrics, taxParams: updatedTaxParams, updatedSku: skuWithCalculatedParams };
  }
};

export default processOfSkuCostPriceSetting;
