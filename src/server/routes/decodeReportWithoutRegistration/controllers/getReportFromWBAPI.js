var { randomBytes } = require("node:crypto");
var getReports = require("../../reports//services/different/getReports");
var parseReports = require("../../reports/services/writeAndCalcReportDataFromWBAPI");

var getReportFromWBAPI = async (req, res, next) => {
  var { dateFrom, dateTo, token, taxRate } = req.body;

  var reports = await getReports("decode-without-auth", dateFrom, dateTo, token);

  var { report } = await parseReports(taxRate, reports);

  report.dateTo = dateTo;
  report.dateFrom = dateFrom;
  report.totalFinalProfit = 0;
  report.totalProductCosts = 0;
  report.totalProfitMargin = 0;
  report.reportId = reports.mainReport[0].realizationreport_id;

  report.skus.map((sku) => {
    (sku.costPrice = 0), (sku.finalProfitPerSKU = 0), (sku.profitMargin = 0);
  });

  var id = randomBytes(15).toString("hex");

  req.app.locals.reports = [{ id, taxRate, report }];

  var setCostPriceLink = "/decode-report-without-registration/report/set-cost-price";
  var downloadReportLink = "/decode-report-without-registration/xlsx/" + id + "/" + report.reportId;

  return res.json({ id, report, setCostPriceLink, downloadReportLink });
};

module.exports = getReportFromWBAPI;
