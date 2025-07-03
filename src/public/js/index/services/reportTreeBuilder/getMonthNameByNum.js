var monthsList = [
  "декабрь",
  "ноябрь",
  "октябрь",
  "сентябрь",
  "август",
  "июль",
  "июнь",
  "май",
  "апрель",
  "март",
  "февраль",
  "январь",
];

var getMonthNameByNum = async (monthNum) =>
  monthsList[monthsList.length - monthNum];

export default getMonthNameByNum;
