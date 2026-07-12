import ExcelJs from "exceljs";
import getReportPeriod from "./getReportPeriod.js";
import aggregateSkuData from "./aggregateSkuData.js";
import getSkuNamesAndIds from "./getSkuNamesAndIds.js";
import generateColumnNames from "./generateColumnNames.js";
import getRequiredColumnsName from "./getRequiredColumnsName.js";
import calculateTotalStoragecost from "./calculateTotalStorageCost.js";
import checkReportExistsInTree from "../different/checkReportExistsInTree.js";

var buybackReportType = 2;

var extractWeeklyFinancialReportDataFromFile = async (userId, fileData, reportTree) => {
  var report = [];

  var paidStorageReportStub = [];
  var advertisingReportStub = [];

  var reportIsNotEmpty = true;
  var { reportId, buffers, buybackReportIsExist } = fileData;
  console.log({ buffersLength: buffer.length });
  for (var buffer of buffers) {
    var wb = new ExcelJs.Workbook();

    await wb.xlsx.load(buffer);

    var workSheet = wb.getWorksheet("Sheet1" || "Лист1");

    if (workSheet) {
      var { columnsNames } = generateColumnNames(workSheet.actualColumnCount);
      var { requiredColumnsName } = getRequiredColumnsName(workSheet, columnsNames);

      var { dateFrom, dateTo } = getReportPeriod(workSheet, requiredColumnsName);

      var { reportIsExist } = checkReportExistsInTree(dateFrom, reportTree);

      if (!reportIsExist) {
        var { skuNamesAndIds } = getSkuNamesAndIds(workSheet, columnsNames);
        var { totalStorageCost } = calculateTotalStoragecost(workSheet, requiredColumnsName.storageCostColumn);

        var { skus, avrgStorageDataForEachSku } = aggregateSkuData(workSheet, skuNamesAndIds, reportId, requiredColumnsName, totalStorageCost, dateFrom, dateTo);

        report.push(...skus);
        paidStorageReportStub.push(...avrgStorageDataForEachSku);
      }
    }
  }

  var dateFrom;
  var dateTo;

  if (!report.length) {
    var dateFrom = "";
    var dateTo = "";

    reportIsNotEmpty = false;
  } else {
    dateFrom = report[0].dateFrom;
    dateTo = report[0].dateTo;
  }

  if (buybackReportIsExist) {
    report[0].reportType = buybackReportType;
  }

  return {
    reportIsNotEmpty,
    reportData: { dateFrom, dateTo, data: { weeklyFinancialReport: report, paidStorageReport: paidStorageReportStub, advertisingReport: advertisingReportStub } },
  };
};

export default extractWeeklyFinancialReportDataFromFile;
