var Exceljs = require("exceljs");
var getColumnData = require("./getColumnData");
var { randomBytes } = require("crypto");

var getReportDataFromXLSX = async (filePath) => {
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

    return {
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
  } catch (e) {
    throw e;
  }
};

module.exports = getReportDataFromXLSX;
