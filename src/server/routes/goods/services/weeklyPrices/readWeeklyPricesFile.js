var Exceljs = require("exceljs");
var checkPriceAndDiscount = require("./utils/checkPriceAndDiscount");

var readWeeklyPricesFile = async (buffer, listGoods) => {
  var wb = new Exceljs.Workbook();
  await wb.xlsx.load(buffer);

  var ws = wb.getWorksheet("Лист1");

  var skuNamesAndIds = [];
  var skuNameIndent = 4;
  var firstColumnName = "A";
  var skusQty = listGoods.length;
  var skuNameCellAddress = firstColumnName + skuNameIndent;

  while (skusQty) {
    var cell = ws.getCell(skuNameCellAddress);

    if (cell?.value) {
      var existSku = listGoods.find((sku) => sku.skuName === cell.value);

      if (existSku && !existSku?.disabled) {
        skuNamesAndIds.push({ skuName: cell.value, nmID: existSku.id });
      }
    }

    skusQty--;
    skuNameIndent += 5;
    skuNameCellAddress = firstColumnName + skuNameIndent;
  }

  if (!skuNamesAndIds.length) {
    throw new Error("Не удалось прочитать наименования артикулов");
  }

  var columnCount = 0;
  var columnNum = 2;
  var price;
  var priceIndent = 5;
  var priceCellAddress;
  var discount;
  var discountIndent = 6;
  var discountCellAddress;
  var weeklyPricesAndDiscounts = [];
  var columns = ["B", "C", "D", "E", "F", "G", "H"];

  while (columnNum < 9) {
    var data = [];

    for (var i = 0; i < skuNamesAndIds.length; i++) {
      priceCellAddress = columns[columnCount] + priceIndent;
      discountCellAddress = columns[columnCount] + discountIndent;
      price = ws.getCell(priceCellAddress)?.value;
      discount = ws.getCell(discountCellAddress)?.value;

      priceIndent += 5;
      discountIndent += 5;

      if (i == skuNamesAndIds.length - 1) {
        priceIndent = 5;
        discountIndent = 6;
      }

      var priceOrDiscountIsValid = checkPriceAndDiscount(price, discount);

      if (!priceOrDiscountIsValid) {
        continue;
      }

      data.push({
        price,
        discount,
        nmID: skuNamesAndIds[i].nmID,
        skuName: skuNamesAndIds[i].skuName,
      });
    }

    columnNum++;
    columnCount++;
    weeklyPricesAndDiscounts.push(data);

    if (columnCount === columns.length) {
      columnCount = 0;
    }
  }

  return { weeklyPricesAndDiscounts };
};

module.exports = readWeeklyPricesFile;
