var splitSkuByYear = (skuFilteredReport, startYear) => {
  var startYearSku = [];
  var endYearSku = [];

  for (var sku of skuFilteredReport) {
    var saleYear = +sku.sale_dt.split("T")[0].split("-")[0];

    if (saleYear === startYear) {
      startYearSku.push(sku);
    } else {
      endYearSku.push(sku);
    }
  }

  return { startYearSku, endYearSku };
};

module.exports = splitSkuByYear;
