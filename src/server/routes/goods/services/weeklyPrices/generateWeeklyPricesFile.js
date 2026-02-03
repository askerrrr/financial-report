var Exceljs = require("exceljs");
var writeSKU = require("./utils/writeSKU");
var writeTitles = require("./utils/writeTitles");
var setStylesToSheet = require("./utils/setStylesToSheet");
var setFormulaToCells = require("./utils/setFormulaToCells");

var generateWeeklyPricesFile = async (listGoods) => {
  var wb = new Exceljs.Workbook();

  var ws = wb.addWorksheet("Лист1");
  ws = writeTitles(ws);

  ws.addRow([]); //empty array is a indent
  ws.addRow([]);

  var cellNumOfSkuName = 4;
  var skusQty = listGoods.length;

  var listGoodsFilteredByNonDeletedSku = listGoods.filter((sku) => !sku.deleted);

  while (listGoodsFilteredByNonDeletedSku.length) {
    var sku = listGoodsFilteredByNonDeletedSku.shift();

    if (!sku.disabled) {
      ws = writeSKU(sku, ws, cellNumOfSkuName);
      ws.addRow([]);

      cellNumOfSkuName += 5;
    }
  }
  ws = setStylesToSheet(ws);
  ws = setFormulaToCells(ws, skusQty);

  var buffer = await wb.xlsx.writeBuffer("weeklyPrices.xlsx");
  return { buffer };
};

module.exports = generateWeeklyPricesFile;
