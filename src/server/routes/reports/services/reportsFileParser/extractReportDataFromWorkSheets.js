import ExcelJs from "exceljs";
import getReportPeriod from "./getReportPeriod.js";
import aggregateSkuData from "./aggregateSkuData.js";
import getSkuNamesAndIds from "./getSkuNamesAndIds.js";
import generateColumnNames from "./generateColumnNames.js";
import calculateTotalStoragecost from "./calculateTotalStorageCost.js";
import checkReportExistsInTree from "../different/checkReportExistsInTree.js";
import aggregatePaidStorageReportData from "./aggregatePaidStorageReportData.js";
import aggregateWeeklyFinancialReports from "./aggregateWeeklyFinancialReports.js";
import getRequiredColumnsNameFromWeeklyFinanfialReportFile from "./getRequiredColumnsNameFromWeeklyFinanfialReportFile.js";

var extractReportDataFromWorkSheets = async (userId, onePeriodReports) => {
  var reportIsNotEmpty = true;

  var { paidStorageReport } = aggregatePaidStorageReportData(onePeriodReports?.paidStorageReports);

  var { weeklyFinancialReport, paidStorageReport } = aggregateWeeklyFinancialReports(onePeriodReports.weeklyFinancialReports, paidStorageReport);

  return {
    reportPeriodIsEmpty: !weeklyFinancialReport.length,
    reports: { weeklyFinancialReport, paidStorageReport, advertisingReport: [] },
  };
};

export default extractReportDataFromWorkSheets;
