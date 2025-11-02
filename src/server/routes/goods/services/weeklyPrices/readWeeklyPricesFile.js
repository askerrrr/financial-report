var Exceljs = require("exceljs");
var mergeArrays = require("./utils/mergeArrays");

var readWeeklyPricesFile = async (buffer, listGoods) => {
  var wb = new Exceljs.Workbook();
  await wb.xlsx.load(buffer);

  var ws = wb.getWorksheet("Лист1");

  var skuNamesAndIds = [];
  var skuNameIndent = 4;
  var firstColumnName = "A";
  var skuNameCellAddress = firstColumnName + skuNameIndent;

  while (true) {
    var cell = ws.getCell(skuNameCellAddress);

    if (cell?.value) {
      var { id } = listGoods.find((sku) => sku.skuName === cell.value);

      skuNamesAndIds.push({ skuName: cell.value, nmID: id });
      skuNameIndent += 5;
      skuNameCellAddress = firstColumnName + skuNameIndent;
      continue;
    }

    break;
  }

  var k = 0;
  var columnNum = 2;
  var priceIndent = 5;
  var priceCellAddress;
  var discountIndent = 6;
  var discountCellAddress;
  var pricesAndDiscounts = [];
  var columns = ["B", "C", "D", "E", "F", "G", "H"];

  while (columnNum < 9) {
    var data = [];

    for (var i = 0; i < skuNamesAndIds.length; i++) {
      priceCellAddress = columns[k] + priceIndent;
      var price = ws.getCell(priceCellAddress)?.value;
      var discountCellAddress = columns[k] + discountIndent;
      discount = ws.getCell(discountCellAddress)?.value;

      priceIndent += 5;
      discountIndent += 5;
      data.push({
        nmID: skuNamesAndIds[i].nmID,
        skuName: skuNamesAndIds[i].skuName,
        price,
        discount,
      });

      if (i == skuNamesAndIds.length - 1) {
        priceIndent = 5;
        discountIndent = 5;
      }
    }

    k++;
    columnNum++;
    pricesAndDiscounts.push(data);

    if (k === columns.length) {
      k = 0;
    }
  }

  return { pricesAndDiscounts };
};

module.exports = readWeeklyPricesFile;
