import Exceljs from "exceljs";
import writeSKU from "./utils/writeSKU.js";
import writeTitles from "./utils/writeTitles.js";
import setStylesToSheet from "./utils/setStylesToSheet.js";
import setFormulaToCells from "./utils/setFormulaToCells.js";

var generateWeeklyPricesFile = async (listGoods) => {
  var wb = new Exceljs.Workbook();

  var ws = wb.addWorksheet("Лист1");
  ws = writeTitles(ws);

  ws.addRow([]); //empty array is a indent
  ws.addRow([]);

  var cellNumOfSkuName = 4;

  var listGoodsFilteredByNonDeletedSku = listGoods.filter((sku) => !sku.deleted && !sku.disabled);
  var skusQty = listGoodsFilteredByNonDeletedSku.length;

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

export default generateWeeklyPricesFile;
