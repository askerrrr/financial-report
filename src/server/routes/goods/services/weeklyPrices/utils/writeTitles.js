var { fontStyles, alignmentStyles } = require("./styles");

var titles = [
  "Артикул",
  "Понедельник",
  "Вторник",
  "Среда",
  "Четверг",
  "Пятница",
  "Суббота",
  "Воскресенье",
];

var writeTitles = (ws) => {
  ws.addRow(titles).font = fontStyles;
  ws.getRow(1).alignment = alignmentStyles;

  return ws;
};

module.exports = writeTitles;
