import getDateToByDateFrom from "../index/services/periodUtils/index.js";
import { isMonday } from "../index/services/periodUtils/services/getWeekDaysFromMonth.js";
import isFutureDate from "../index/services/reportPeriodUploader/services/isFutureDate.js";
import standardizeDate from "../index/services/reportPeriodUploader/services/standardizeDate.js";

var checkDateFrom = async (dateFrom) => {
  var standardizedDateFrom = await standardizeDate(dateFrom);

  if (await isFutureDate(standardizedDateFrom)) {
    alert("Период введен некорректно");
    throw new Error("dateFrom is not valid");
  }

  if (!(await isMonday(standardizedDateFrom))) {
    alert("Начало периода не является понедельником");
    throw new Error("dateFrom is not monday");
  }

  return { dateFrom: standardizedDateFrom };
};

var checkDateTo = async (dateFrom) => {
  var dateTo = document.getElementById("dateTo").value;

  if (!dateTo) {
    dateTo = await getDateToByDateFrom(dateFrom);
  }

  var standardizedDateTo = await standardizeDate(dateTo);

  if (await isFutureDate(standardizedDateTo)) {
    alert("Отчет еще не готов...");
    throw new Error("the report is not ready");
  }

  if (!standardizedDateTo) {
    alert("Конец периода введен некорректно");
    throw new Error("the report is not ready");
  }

  return { dateTo: standardizedDateTo };
};

export { checkDateFrom, checkDateTo };
