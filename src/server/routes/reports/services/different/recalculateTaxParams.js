var recalculateTaxParams = function (report, taxParams, propPostfix = "") {
  taxParams.paidTaxAmount += report["totalTaxAmount" + propPostfix];
  taxParams.retailAmount += report["totalRetailAmount" + propPostfix];

  if (taxParams.paidTaxAmount >= 0) {
    taxParams.isInsuranceFeePaid = true;
    taxParams.insuranceFeePercentage = 0;
  }

  return taxParams;
};

module.exports = recalculateTaxParams;
