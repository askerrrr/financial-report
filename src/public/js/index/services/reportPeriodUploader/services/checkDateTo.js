import isFutureDate from "./isFutureDate.js";
import standardizeDate from "./standardizeDate.js";
import getDateToByDateFrom from "../../periodUtils/index.js";

var checkDateTo = async (dateTo, dateFrom) => {
  var standardizedDateTo;

  if (dateTo) {
    standardizedDateTo = await standardizeDate(dateTo);
  }

  standardizedDateTo = await getDateToByDateFrom(dateFrom);

  if (await isFutureDate(standardizedDateTo)) {
    throw new Error("Отчет еще не готов...");
  }

  if (!standardizedDateTo) {
    throw new Error("Конец периода введен некорректно");
  }

  return { validDateTo: standardizedDateTo };
};

export default checkDateTo;
