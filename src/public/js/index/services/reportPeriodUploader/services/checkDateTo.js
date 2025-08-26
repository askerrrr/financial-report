import isFutureDate from "./isFutureDate.js";
import standardizeDate from "./standardizeDate.js";
import getDateToByDateFrom from "../../periodUtils/index.js";

var checkDateTo = async (dateTo, validDateFrom) => {
  if (!dateTo) {
    dateTo = await getDateToByDateFrom(validDateFrom);
  }

  var standardizedDateTo = await standardizeDate(dateTo);

  if (await isFutureDate(standardizedDateTo)) {
    throw new Error("Отчет еще не готов...");
  }

  if (!standardizedDateTo) {
    throw new Error("Конец периода введен некорректно");
  }

  return { validDateTo: standardizedDateTo };
};

export default checkDateTo;
