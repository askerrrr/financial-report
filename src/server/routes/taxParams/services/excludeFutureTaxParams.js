var excludeFutureTaxParams = (taxParams) => {
  var currentYear = new Date().getFullYear();
  var filteredTaxParams = taxParams.filter((item) => item.year <= currentYear);
  return { filteredTaxParams };
};

module.exports = excludeFutureTaxParams;
