var totalTitles = [
  "ID отчета",
  "Начало отчетного периода",
  "Конец отчетного периода",
  "Сумма продаж",
  "К перечислению за товар",
  "Логистика",
  "Хранение",
  "Приемка",
  "Штрафы",
  "Удержания/выплаты",
  "Реклама",
  "Налоги",
  "Маржинальность %",
  "Итого",
];

var titleStyles = { vertical: "middle", horizontal: "left" };

var writeTitleToTotalsSheet = async (sheet, cellNum) => {
  var cellName = "A";

  for (var title of totalTitles) {
    var currentCell = cellName + cellNum;

    sheet.getCell(currentCell).value = title;
    sheet.getCell(currentCell).alignment = titleStyles;

    cellNum++;
  }

  return sheet;
};

module.exports = writeTitleToTotalsSheet;
