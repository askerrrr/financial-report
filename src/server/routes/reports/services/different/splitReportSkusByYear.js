var splitReportSkusByYear = (report) => {
  var startYearSkus = [];
  var endYearSkus = [];

  for (var sku of report) {
    var startYear = sku.date_from.split("-")[0];
    var saleYear = sku.sale_dt.split("-")[0];

    if (startYear === saleYear) {
      startYearSkus.push(sku);
    } else {
      endYearSkus.push(sku);
    }
  }

  return { startYearSkus, endYearSkus };
};

export default splitReportSkusByYear;
