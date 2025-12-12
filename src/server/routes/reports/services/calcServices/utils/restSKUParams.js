var calcFinalProfit = require("./finalProfit");
var calcProfitMargin = require("./profitMargin");
var calcInsuranceFee = require("./insuranceFee");
var calcPreTaxProfit = require("./preTaxProfit");

var calcRestSKUParams = (sku, taxParams) => {
  sku.preTaxProfit = calcPreTaxProfit(sku.qty, sku.profit, sku.costPrice);

  if (taxParams.isInsuranceFeePaid) {
    sku.insuranceFee = 0;
    sku.isInsuranceFeeIncluded = false;
    sku.finalProfit = calcFinalProfit(sku.preTaxProfit, sku.insuranceFee, sku.tax);
  } else {
    sku.previousInsuranceFee = sku.insuranceFee;
    sku.insuranceFee = calcInsuranceFee(sku.preTaxProfit, taxParams.insuranceFeePercentage);
    sku.isInsuranceFeeIncluded = true;

    taxParams.paidInsuranceFee =
      taxParams.paidInsuranceFee - sku.previousInsuranceFee + sku.insuranceFee;

    if (taxParams.paidInsuranceFee >= taxParams.mandatoryInsuranceFee) {
      taxParams.paidInsuranceFee = taxParams.mandatoryInsuranceFee;
      taxParams.isInsuranceFeePaid = true;
      taxParams.insuranceFeePercentage = 0;

      sku.insuranceFee = 0;
      sku.isInsuranceFeeIncluded = false;
      sku.finalProfit = calcFinalProfit(sku.preTaxProfit, sku.insuranceFee, sku.tax);
    } else {
      sku.tax = 0;
      sku.finalProfit = calcFinalProfit(sku.preTaxProfit, sku.insuranceFee, sku.tax);
    }
  }

  sku.isCostPriceSet = true;
  sku.profitMargin = calcProfitMargin(sku.finalProfit, sku.retailAmount);

  return { updatedTaxParams: taxParams, skuWithCalculatedParams: sku };
};

module.exports = calcRestSKUParams;
