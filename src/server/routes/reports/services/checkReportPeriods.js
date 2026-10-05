import checkDateTo from "./utils/different/checkDateTo.js";
import checkDateFrom from "./utils/different/checkDateFrom.js";

var checkReportPeriodsService = (dateFrom, dateTo) => {
  var { errorText } = checkDateFrom(dateFrom);

  if (errorText) {
    return { errorText };
  }

  var { errorText } = checkDateTo(dateTo);

  if (errorText) {
    return { errorText };
  }

  if (new Date(dateFrom) >= new Date(dateTo)) {
    return { errorText: "Неккоректный период" };
  }

  return { errorText: "" };
};

export default checkReportPeriodsService;
