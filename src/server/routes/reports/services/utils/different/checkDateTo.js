import isSunday from "./isSunday.js";
import everyIsNum from "./everyIsNum.js";
import isFutureDate from "./isFutureDate.js";

var checkDateTo = (dateTo) => {
  if (!dateTo) {
    return { errorText: "Конец отчетного периода не является воскресеньем" };
  }

  if (!everyIsNum(dateTo)) {
    return {
      errorText: "Неккоректный период",
    };
  }

  if (isFutureDate(dateTo)) {
    return {
      errorText: "Отчетный период еще не наступил",
    };
  }

  if (!isSunday(dateTo)) {
    return { errorText: "Конец отчетного периода не является воскресеньем" };
  }

  return { errorText: "" };
};

export default checkDateTo;
