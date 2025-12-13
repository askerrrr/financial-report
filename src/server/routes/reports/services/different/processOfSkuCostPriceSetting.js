var calc = require("../calcServices");

var processOfSkuCostPriceSetting = async (sku, taxParams, isCrossYearReport) => {
  if (isCrossYearReport) {
    var { startYearTaxParams, endYearTaxParams } = taxParams;

    var updatingOfStartYear = calc.sku.restParams(sku, startYearTaxParams, "InCurrentYear");

    var skuWithCalculatedParamsOfStartYear = updatingOfStartYear.skuWithCalculatedParams;
    startYearTaxParams = updatingOfStartYear.updatedTaxParams;

    var updatingOfEndYear = calc.sku.restParams(
      skuWithCalculatedParamsOfStartYear,
      endYearTaxParams,
      "InNextYear"
    );

    var skuWithCalculatedParamsOfEndYear = updatingOfEndYear.skuWithCalculatedParams;
    endYearTaxParams = updatingOfEndYear.updatedTaxParams;

    var updatedSku = skuWithCalculatedParamsOfEndYear;

    updatedSku.finalProfit =
      skuWithCalculatedParamsOfStartYear.finalProfitInCurrentYear +
      skuWithCalculatedParamsOfEndYear.finalProfitInNextYear;

    updatedSku.insuranceFee =
      skuWithCalculatedParamsOfStartYear.insuranceFeeInCurrentYear +
      skuWithCalculatedParamsOfEndYear.insuranceFeeInNextYear;

    updatedSku.profitMargin =
      (skuWithCalculatedParamsOfStartYear.profitMarginInCurrentYear =
        skuWithCalculatedParamsOfEndYear.profitMarginInNextYear) / 2;

    return { taxParams: { startYearTaxParams, endYearTaxParams }, updatedSku };
  } else {
    var result = calc.sku.restParams(updatedSku, taxParams);

    return { taxParams: result.updatedTaxParams, updatedSku: result.skuWithCalculatedParams };
  }
};

module.exports = processOfSkuCostPriceSetting;
