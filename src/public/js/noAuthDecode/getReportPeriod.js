import getDateToByDateFrom from "../index/services/periodUtils/index.js";
import { isMonday } from "../index/services/periodUtils/services/getWeekDaysFromMonth.js";
import isFutureDate from "../index/services/reportPeriodUploader/services/isFutureDate.js";
import validateReportPeriod from "../index/services/reportPeriodUploader/services/validateReportPeriod.js";

var getDateFrom = async () => {
  var dateFrom = document.getElementById("dateFrom").value;
  var validDateFrom = await validateReportPeriod(dateFrom);

  if (!dateFrom) {
    alert("Начало периода введено некорректно");
    throw new Error("dateFrom is not valid");
  }

  if (await isFutureDate(validDateFrom)) {
    alert("Период введен некорректно");
    throw new Error("dateFrom is not valid");
  }

  if (!(await isMonday(validDateFrom))) {
    alert("Начало периода не является понедельником");
    throw new Error("dateFrom is not monday");
  }

  return validDateFrom;
};

var getDateTo = async (dateFrom) => {
  var dateTo = document.getElementById("dateTo").value;

  if (!dateTo) {
    dateTo = await getDateToByDateFrom(dateFrom);
  }

  var validDateTo = await validateReportPeriod(dateTo);

  if (await isFutureDate(validDateTo)) {
    alert("Отчет еще не готов...");
    throw new Error("the report is not ready");
  }

  if (!validDateTo) {
    alert("Конец периода введен некорректно");
    throw new Error("the report is not ready");
  }

  return validDateTo;
};

var getReportPeriod = async () => {
  var dateFrom = await getDateFrom();

  var dateTo = await getDateTo(dateFrom);

  return { dateFrom, dateTo };
};

export default getReportPeriod;
