import everyIsNum from "./everyIsNum.js";
import isFutureDate from "./isFutureDate.js";
import isMonday from "../../utils/dateUtils/services/isMonday.js";

var startDayFromMS = new Date("2024-01-29").getTime();

var checkDateFrom = (dateFrom) => {
  if (!dateFrom) {
    return { validDateFrom: "", errorText: "Неккоректный период" };
  }

  if (!everyIsNum(dateFrom)) {
    return { validDateFrom: "", errorText: "Неккоректный период" };
  }

  var dateFromMs = new Date(dateFrom).getTime();

  if (dateFromMs < startDayFromMS) {
    return {
      validDateFrom: "",
      errorText: "Начало периода введено некорректно",
    };
  }

  if (isFutureDate(dateFrom)) {
    return { validDateFrom: "", errorText: "Отчетный период еще не наступил" };
  }

  if (!isMonday(dateFrom)) {
    return {
      validDateFrom: "",
      errorText: "Начало периода не является понедельником",
    };
  }

  return { validDateFrom: dateFrom, errorText: "" };
};

export default checkDateFrom;
