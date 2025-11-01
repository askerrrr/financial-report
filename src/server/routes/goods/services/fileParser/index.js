var Exceljs = require("exceljs");

var fileParser = async (buffer) => {
  var wb = new Exceljs.Workbook();
  await wb.xlsx.load(buffer);
  var ws = wb.getWorksheet("Лист1");

  columnNum = 2;
  var pricesAndDiscounts = [];

  while (columnNum) {
    var row = [];

    ws.getRow(columnNum).eachCell((cell) => {
      var cellData = cell?.text;

      if (typeof +cellData === "number" && !isNaN(+cellData)) {
        row.push(+cellData);
      } else {
        row.push(cellData);
      }
    });

    if (!row.length) {
      break;
    }

    pricesAndDiscounts.push({ skuName: row[0], price: row[1], discount: row[2] });
    columnNum++;
  }

  return { pricesAndDiscounts };
};

module.exports = fileParser;
