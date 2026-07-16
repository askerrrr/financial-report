import aggregateSkuData from "./aggregateSkuData.js";
import getSkuNamesAndIds from "./getSkuNamesAndIds.js";
import calculateTotalStorageCost from "./calculateTotalStorageCost.js";
import checkReportExistsInTree from "../different/checkReportExistsInTree.js";
import calculateAvrgStorageCostForEachReportItem from "./calculateAvrgStorageCostForEachReportItem.js";

var buybackReportType = 2;

var aggregateWeeklyFinancialReports = (weeklyFinancialReports, paidStorageReport) => {
  var weeklyFinancialReport = [];

  if (!weeklyFinancialReports || !weeklyFinancialReports.length) {
    return { weeklyFinancialReport, paidStorageReport };
  }

  for (var { dateFrom, dateTo, reportId, workSheet, workSheetData } of weeklyFinancialReports) {
    var { columnsNames, requiredColumnsName } = workSheetData;

    var { skuNamesAndIds } = getSkuNamesAndIds(workSheet, columnsNames);

    if (!paidStorageReport.length) {
      var { totalStorageCost } = calculateTotalStorageCost(workSheet, requiredColumnsName.storageCostColumn);
      var { avrgStorageCostForEachItem } = calculateAvrgStorageCostForEachReportItem(totalStorageCost, skuNamesAndIds);

      var { skus, avrgStorageDataForEachSku } = aggregateSkuData(
        workSheet,
        skuNamesAndIds,
        reportId,
        requiredColumnsName,
        dateFrom,
        dateTo,
        avrgStorageCostForEachItem,
      );

      paidStorageReport.push(...avrgStorageDataForEachSku);
      weeklyFinancialReport.push(...skus);
    } else {
      var { skus } = aggregateSkuData(workSheet, skuNamesAndIds, reportId, requiredColumnsName, dateFrom, dateTo);
      weeklyFinancialReport.push(...skus);
    }
  }

  if (weeklyFinancialReports.length > 1) {
    weeklyFinancialReport[0].reportType = buybackReportType;
  }

  return { weeklyFinancialReport, paidStorageReport };
};

export default aggregateWeeklyFinancialReports;
