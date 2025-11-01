var Exceljs = require("exceljs");
var mergeArrays = require("./utils/mergeArrays");

var fileParser = async (buffer, listGoods) => {
  try {
    var wb = new Exceljs.Workbook();
    await wb.xlsx.load(buffer);
    var ws = wb.getWorksheet("Лист1");

    var indent = 4;
    var ignition = 1;
    var pricesAndDiscounts = [];

    var firstColumn;

    while (ignition) {
      firstColumn = "A" + indent;
      var cell = ws.getCell(firstColumn);

      if (cell.name === "skuName") {
        var prices = [];
        var discounts = [];

        var { id, skuName } = listGoods.find((sku) => sku.skuName === cell.value);

        ws.getRow(indent + 1).eachCell((cell) => prices.push(+cell.text));
        ws.getRow(indent + 2).eachCell((cell) => discounts.push(+cell.text));

        prices.shift();
        discounts.shift();

        var mergedArrays = mergeArrays(prices, discounts, id);
        pricesAndDiscounts.push({ skuName, data: mergedArrays });
      }

      if (!cell.value) break;

      indent += 5;
    }
  } catch (e) {
    throw new Error("File read error");
  }

  return { pricesAndDiscounts };
};

module.exports = fileParser;
