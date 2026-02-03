var Exceljs = require("exceljs");
var writeSkuDataToCells = require("./writeSkuDataToCells");
var setStylesToSkuNameCell = require("./setStylesToSkuNameCell");
var setStylesToFirstColumn = require("./setStylesToFirstColumn");
var writeCellNamesToFirstColumn = require("./writeCellNamesToFirstColumn");

var generageSKusMetricsFile = async (listGoods) => {
  var wb = new Exceljs.Workbook();
  var ws = wb.addWorksheet("Лист1");

  ws = setStylesToFirstColumn(ws);

  var indentToNextSku = 1;

  for (var sku of listGoods) {
    ws = writeCellNamesToFirstColumn(ws, sku, indentToNextSku);
    ws = setStylesToSkuNameCell(ws, indentToNextSku);
    ws = writeSkuDataToCells(ws, sku, indentToNextSku);
    indentToNextSku += 16;
  }

  var skusMetricsFileBuffer = await wb.xlsx.writeBuffer("file.xlsx");
  return { skusMetricsFileBuffer };
};

module.exports = generageSKusMetricsFile;
