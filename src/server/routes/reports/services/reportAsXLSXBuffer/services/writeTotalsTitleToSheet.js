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
  "Прочите расходы",
  "Штрафы",
  "Удержания/выплаты",
  "Реклама",
  "Себестоимость",
  "Налоги",
  "Cтраховые взносы",
  "Доп. страховые взносы",
  "Маржинальность %",
  "Итого",
];

var fontStyles = { bold: true, font: 10 };
var alignmentStyles = { vertical: "middle", horizontal: "left" };

var writeTotalsTitleToSheet = async (sheet, cellNum) => {
  var cellName = "A";
  var firstColumnNum = 1;

  sheet.getColumn(firstColumnNum).width = 27;
  sheet.getColumn(firstColumnNum).font = fontStyles;
  sheet.getColumn(firstColumnNum).alignment = alignmentStyles;

  for (var title of totalTitles) {
    var currentCell = cellName + cellNum;

    sheet.getCell(currentCell).value = title;

    cellNum++;
  }

  return sheet;
};

module.exports = writeTotalsTitleToSheet;
