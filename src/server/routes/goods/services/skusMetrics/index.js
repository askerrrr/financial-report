import Exceljs from "exceljs";
import writeSkuDataToCells from "./writeSkuDataToCells.js";
import setColumnHeaderWidths from "./setColumnHeaderWidths.js";
import setStylesToSkuNameCell from "./setStylesToSkuNameCell.js";
import setStylesToFirstColumn from "./setStylesToFirstColumn.js";
import writeCellNamesToFirstColumn from "./writeCellNamesToFirstColumn.js";

var generageSKusMetricsFile = async (listGoods) => {
  var wb = new Exceljs.Workbook();
  var ws = wb.addWorksheet("Лист1");

  ws = setStylesToFirstColumn(ws);
  ws = setColumnHeaderWidths(ws, listGoods);

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

export default generageSKusMetricsFile;
