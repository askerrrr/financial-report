import Exceljs from "exceljs-community";
import checkPriceAndDiscount from "./utils/checkPriceAndDiscount.js";

var firstColumnName = "A";
var MAX_NUMBER_COLUMNS_FOR_READING = 8;
var columns = ["B", "C", "D", "E", "F", "G", "H"];

var readWeeklyPricesFile = async (xlsxFileBuffer, listGoods) => {
  var wb = new Exceljs.Workbook();
  await wb.xlsx.load(xlsxFileBuffer);

  var ws = wb.getWorksheet("Лист1");

  var skuNameIndent = 5;
  var skuNamesAndIds = [];
  var skusQty = listGoods.length;
  var skuNameCellAddress = firstColumnName + skuNameIndent;
  var weeklyPricesAndDiscounts = [[], [], [], [], [], [], []];

  var colCount = 0;
  var startColNum = 2;

  var price;
  var priceIndent = 6;
  var priceCellAddress;

  var discount;
  var discountIndent = 7;
  var discountCellAddress;

  while (skusQty) {
    var skuNameCell = ws.getCell(skuNameCellAddress);

    if (skuNameCell?.value) {
      var skuNameFromCell = skuNameCell.value;

      var existSku = listGoods.find((sku) => sku.skuName === skuNameFromCell);

      if (existSku && !existSku?.disabled) {
        while (startColNum <= MAX_NUMBER_COLUMNS_FOR_READING) {
          priceCellAddress = columns[colCount] + priceIndent;
          discountCellAddress = columns[colCount] + discountIndent;

          price = ws.getCell(priceCellAddress)?.value;
          discount = ws.getCell(discountCellAddress)?.value;

          var nmID = existSku.id;
          var dayIndex = colCount;
          var data = { nmID, price, discount };

          var { dataIsValid } = checkPriceAndDiscount(price, discount);

          colCount++;
          startColNum++;

          if (dataIsValid) {
            var currentDayArr = weeklyPricesAndDiscounts[dayIndex];

            currentDayArr.push({ dayIndex, nmID, data });
          }
        }

        var needResetIndents = startColNum >= MAX_NUMBER_COLUMNS_FOR_READING;

        if (needResetIndents) {
          colCount = 0;
          startColNum = 2;

          priceIndent = 6;
          discountIndent = 7;
        } else {
          priceIndent += 6;
          discountIndent += 6;
        }

        skuNamesAndIds.push({ nmID: existSku.id, skuName: skuNameFromCell });
      }
    }

    skusQty--;
    skuNameIndent += 6;
    skuNameCellAddress = firstColumnName + skuNameIndent;
  }

  return {
    weeklyPricesAndDiscounts: weeklyPricesAndDiscounts.filter((i) => i.length),
  };
};

export default readWeeklyPricesFile;
