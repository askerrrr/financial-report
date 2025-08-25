var { randomBytes } = require("node:crypto");
var parseReports = require("../../reports/services/writeAndCalcReportDataFromWBAPI");
var getReportByPeriodFromWBAPI = require("../../reports/services/different/getReportByPeriodFromWBAPI");
var createPaidStorageReportTask = require("../../reports/services/different/createPaidStorageReportTask");
var getAdvertisingCostsForPeriod = require("../../reports/services/different/getAdvertisingCostsForPeriod");
var checkPaidStorageReportCreationStatus = require("../../reports/services/different/checkPaidStorageReportCreationStatus");
var getPaidStorageReportByTaskIdFromWBAPI = require("../../reports/services/different/getPaidStorageReportByTaskIdFromWBAPI");

var getReportFromWBAPI = async (req, res, next) => {
  var { dateFrom, dateTo, token, taxRate } = req.body;

  var taskId = await createPaidStorageReportTask(dateFrom, dateTo, token, "");
  var statusIsDone = await checkPaidStorageReportCreationStatus(taskId, token);

  if (!statusIsDone) {
    return res.sendStatus(304);
  }

  var mainReport = await getReportByPeriodFromWBAPI(dateFrom, dateTo, token, "");
  var storageReport = await getPaidStorageReportByTaskIdFromWBAPI(taskId, token, "");
  var totalAdvertisingCosts = await getAdvertisingCostsForPeriod(dateFrom, dateTo, token, "");

  var reports = { mainReport, storageReport, totalAdvertisingCosts };

  var report = await parseReports({ taxRate }, reports);

  report.dateTo = dateTo;
  report.dateFrom = dateFrom;
  report.totalFinalProfit = 0;
  report.totalProductCosts = 0;
  report.totalProfitMargin = 0;
  report.reportId = mainReport[0].realizationreport_id;

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
