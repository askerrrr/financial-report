var recalculateSkuAndTaxParams = (sku, taxParams, skuPropPostfix = "") => {
  taxParams.retailAmount += sku["retailAmount" + skuPropPostfix];
  taxParams.paidTaxAmount += sku["tax" + skuPropPostfix];

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
