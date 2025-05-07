var getColumnData = require("./getColumnData");
var Exceljs = require("exceljs");

var getXLSXData = async (filePath) => {
  try {
    var wb = new Exceljs.Workbook();

    await wb.xlsx.readFile(filePath);

    var ws = wb.getWorksheet("Sheet1");

    var item = await getColumnData(1, ws);

    var article = await getColumnData(2, ws);
    var WBSalesAmount = await getColumnData(3, ws);
    var qty = await getColumnData(4, ws);
    var buyoutPrice = await getColumnData(5, ws);
    var deliveryCost = await getColumnData(6, ws);
    var refundCost = await getColumnData(7, ws);
    var numberOfReturns = await getColumnData(8, ws);
    var fines = await getColumnData(9, ws);
    var allowances = await getColumnData(10, ws);

    var totalAmount = await getColumnData(11, ws, true);
    var averageCost = await getColumnData(12, ws);

    return {
      item,
      article,
      WBSalesAmount,
      qty,
      buyoutPrice,
      deliveryCost,
      refundCost,
      numberOfReturns,
      fines,
      allowances,
      totalAmount,
      averageCost,
    };
  } catch (e) {
    throw e;
  }
};

module.exports = getXLSXData;
