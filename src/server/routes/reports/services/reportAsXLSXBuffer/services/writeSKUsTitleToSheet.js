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

var writeSKUsTitleToSheet = async (sheet) => {
  var cellNum = 1;

  for (var i = 0; i < columns.length; i++) {
    var cellName = columns[i] + cellNum;

    sheet.getCell(cellName).value = titles[i];
  }

  return sheet;
};

module.exports = writeSKUsTitleToSheet;
