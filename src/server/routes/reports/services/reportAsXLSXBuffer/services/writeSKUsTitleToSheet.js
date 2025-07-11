var { columns } = require("./writeSKUsToSheet");

var titles = [
  "Артикул",
  "Кол-во",
  "Возвраты",
  "Себестоимость",
  "Средняя розничная \nцена",
  "Доставка",
  "Удержания/    выплаты",
  "Хранение",
  "Приемка",
  "Выплата с вычетом всех услуг WB",
  "Маржинальность %",
  "Итого",
];

var fontStyles = {
  bold: true,
  font: 10,
};

var alignmentStyles = {
  vertical: "middle",
  horizontal: "center",
  wrapText: true,
};

var writeSKUsTitleToSheet = async (sheet) => {
  var cellNum = 1;
  var columnNum = 1;
  for (var i = 0; i < columns.length; i++) {
    var cellName = columns[i] + cellNum;

    sheet.getColumn(columnNum).width = 17;

    sheet.getCell(cellName).font = fontStyles;
    sheet.getCell(cellName).alignment = alignmentStyles;

    sheet.getCell(cellName).value = titles[i];

    columnNum++;
  }

  return sheet;
};

module.exports = writeSKUsTitleToSheet;
