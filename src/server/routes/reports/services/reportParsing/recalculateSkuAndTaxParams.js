var calcInsuranceFee = require("../calcServices/utils/insuranceFee");

var recalculateSkuAndTaxParams = (sku, taxParams, skuPropPostfix = "") => {
  taxParams.paidTaxAmount += sku["tax" + skuPropPostfix];
  taxParams.retailAmount += sku["retailAmount" + skuPropPostfix];

  if (taxParams.retailAmount > taxParams.excessIncomeForInsurance) {
    taxParams.hasExcessIncomeForInsurance = true;

    var oldRetailAmount = taxParams.retailAmount - sku["retailAmount" + skuPropPostfix];
    var difference = taxParams.excessIncomeForInsurance - oldRetailAmount;

    var additionalInsuranceFeeFromSku;

    if (difference > 0) {
      difference = sku["retailAmount" + skuPropPostfix] - difference;
      additionalInsuranceFeeFromSku = calcInsuranceFee(difference, taxParams.excessInsuranceRate);
    } else {
      additionalInsuranceFeeFromSku = calcInsuranceFee(
        sku["retailAmount" + skuPropPostfix],
        taxParams.excessInsuranceRate
      );
    }

    taxParams.additionalInsuranceFee += additionalInsuranceFeeFromSku;
  }

  if (taxParams.paidTaxAmount <= 0) {
    sku["tax" + skuPropPostfix] = 0;
  } else {
    var difference = taxParams.paidTaxAmount - sku["tax" + skuPropPostfix];

    if (difference < 0) {
      sku["tax" + skuPropPostfix] += difference;
    }
  }

  return { updatedSku: sku, recalculatedTaxParams: taxParams };
};

module.exports = recalculateSkuAndTaxParams;
