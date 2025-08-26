import isFutureDate from "./isFutureDate.js";
import standardizeDate from "./standardizeDate.js";
import getDateToByDateFrom from "../../periodUtils/index.js";

var checkDateTo = async (dateTo, validDateFrom) => {
  if (!dateTo) {
    dateTo = await getDateToByDateFrom(validDateFrom);
  }

  var standardizedDateTo = await standardizeDate(dateTo);

  if (await isFutureDate(standardizedDateTo)) {
    alert("Отчет еще не готов...");
    return;
  }

  if (!standardizedDateTo) {
    alert("Конец периода введен некорректно");
    return;
  }

  return standardizedDateTo;
};

export default checkDateTo;
