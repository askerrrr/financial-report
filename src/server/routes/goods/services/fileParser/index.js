var Exceljs = require("exceljs");

var fileParser = async (buffer) => {
  var wb = new Exceljs.Workbook();
  await wb.xlsx.load(buffer);
  var ws = wb.getWorksheet("Лист1");
};

module.exports = fileParser;
