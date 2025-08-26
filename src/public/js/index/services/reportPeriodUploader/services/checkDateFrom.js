import isFutureDate from "./isFutureDate.js";
import standardizeDate from "./standardizeDate.js";
import { isMonday } from "../../periodUtils/services/getWeekDaysFromMonth.js";

var checkDateFrom = async (dateFrom) => {
  var standardizedDateFrom = await standardizeDate(dateFrom);

  if (!standardizedDateFrom) {
    alert("Начало периода введено некорректно");
    return;
  }

  if (await isFutureDate(standardizedDateFrom)) {
    alert("Период введен некорректно");
    return;
  }

  if (!(await isMonday(standardizedDateFrom))) {
    alert("Начало периода не является понедельником");
    return;
  }

  return standardizedDateFrom;
};

export default checkDateFrom;
