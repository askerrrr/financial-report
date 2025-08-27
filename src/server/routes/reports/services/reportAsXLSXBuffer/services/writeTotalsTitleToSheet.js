var totalTitles = [
  "ID отчета",
  "Начало отчетного периода",
  "Конец отчетного периода",
  "Сумма продаж",
  "К перечислению за товар",
  "Продано шт.",
  "Возвратов шт.",
  "Логистика",
  "Хранение",
  "Приемка",
  "Штрафы",
  "Удержания/выплаты",
  "Реклама",
  "Себестоимость",
  "Налоги",
  "Маржинальность %",
  "Итого",
];

var fontStyles = { bold: true, font: 10 };

var alignmentStyles = { vertical: "middle", horizontal: "left" };

var writeTotalsTitleToSheet = async (sheet, cellNum) => {
  var cellName = "A";

  sheet.getColumn(1).width = 27;
  sheet.getColumn(1).font = fontStyles;
  sheet.getColumn(1).alignment = alignmentStyles;

  for (var title of totalTitles) {
    var currentCell = cellName + cellNum;

    sheet.getCell(currentCell).value = title;

    cellNum++;
  }

  return sheet;
};

module.exports = writeTotalsTitleToSheet;
