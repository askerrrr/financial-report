import isFutureDate from "./isFutureDate.js";
import standardizeDate from "./standardizeDate.js";
import { isMonday } from "../../periodUtils/services/getWeekDaysFromMonth.js";

var checkDateFrom = async (dateFrom) => {
  var standardizedDateFrom = await standardizeDate(dateFrom);

  if (!standardizedDateFrom) {
    throw new Error("Начало периода введено некорректно");
  }

  if (await isFutureDate(standardizedDateFrom)) {
    throw new Error("Период введен некорректно");
  }

  if (!(await isMonday(standardizedDateFrom))) {
    throw new Error("Начало периода не является понедельником");
  }

  return { validDateFrom: standardizedDateFrom };
};

export default checkDateFrom;
