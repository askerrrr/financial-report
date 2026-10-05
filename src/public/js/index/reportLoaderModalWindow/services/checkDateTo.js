import everyIsNum from "./everyIsNum.js";
import isFutureDate from "./isFutureDate.js";
import getDateToByDateFrom from "../../utils/dateUtils/index.js";

var checkDateTo = (dateTo, dateFrom) => {
  var expectedDateTo = getDateToByDateFrom(dateFrom);

  if (!dateTo) {
    if (isFutureDate(expectedDateTo)) {
      return {
        validDateFrom: "",
        isPeriodWithinSameWeek: false,
        errorText: "Отчетный период еще не наступил",
      };
    }

    return {
      validDateTo: expectedDateTo,
      isPeriodWithinSameWeek: true,
      errorText: "",
    };
  }

  if (!everyIsNum(dateTo)) {
    return {
      validDateTo: "",
      isPeriodWithinSameWeek: true,
      errorText: "Неккоректный период",
    };
  }

  if (isFutureDate(dateTo)) {
    return {
      validDateFrom: "",
      isPeriodWithinSameWeek: false,
      errorText: "Отчетный период еще не наступил",
    };
  }

  if (dateTo === expectedDateTo) {
    return {
      validDateTo: expectedDateTo,
      isPeriodWithinSameWeek: true,
      errorText: "",
    };
  }

  return { validDateTo: dateTo, isPeriodWithinSameWeek: false, errorText: "" };
};

export default checkDateTo;
