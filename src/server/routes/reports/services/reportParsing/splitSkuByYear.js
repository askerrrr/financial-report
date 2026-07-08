var splitSkuByYear = (skuFilteredReport, startYear) => {
  var startYearSku = [];
  var endYearSku = [];

  for (var sku of skuFilteredReport) {
    var saleYear = +sku.saleDt.split("-")[0];

    if (saleYear === startYear) {
      startYearSku.push(sku);
    } else {
      endYearSku.push(sku);
    }
  }

  return { startYearSku, endYearSku };
};

export default splitSkuByYear;
