var Exceljs = require("exceljs");
var getColumnData = require("./getColumnData");
var { randomBytes } = require("crypto");
var extractSummaryFields = require("./extractSummaryFields ");
var transformReportStructure = require("./transformReportStructure");
var sumProductQuantities = require("./sumProductQuantities");
var calculateSkuStorageCost = require("./calculateSkuStorageCost");

var getReportDataFromXLSX = async (filePath, userId) => {
  try {
    var wb = new Exceljs.Workbook();

    await wb.xlsx.readFile(filePath);

    var ws = wb.getWorksheet("Sheet1" || "Лист1");

    var itemName = await getColumnData(1, ws);

    var article = await getColumnData(2, ws);

    var WBSalesAmount = await getColumnData(3, ws);

    var qty = await getColumnData(4, ws);

    var buyoutPrice = await getColumnData(5, ws);

    var deliveryCost = await getColumnData(6, ws);

    var refundCost = await getColumnData(7, ws);

    var numberOfReturns = await getColumnData(8, ws);

    var fines = await getColumnData(9, ws);

    var allowances = await getColumnData(10, ws);

    var summaryData = await getColumnData(11, ws, true);

    var averageCost = await getColumnData(12, ws);

    var id = randomBytes(10).toString("hex");

    var data = {
      id,
      itemName,
      article,
      WBSalesAmount,
      qty,
      buyoutPrice,
      deliveryCost,
      refundCost,
      numberOfReturns,
      fines,
      allowances,
      summaryData,
      averageCost,
    };

    data = await sumProductQuantities(data);

    data = await calculateSkuStorageCost(data);

    var report = await extractSummaryFields(data);

    report = await transformReportStructure(report, userId);

    return report;
  } catch (e) {
    throw e;
  }
};

module.exports = getReportDataFromXLSX;
