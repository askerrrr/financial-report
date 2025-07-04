import createYearsDetails from "./details/index.js";
import getReportsData from "./services/getReportsData.js";
import openLastDetails from "./services/openLastDetails.js";
import showNoReportsMessage from "./services/showNoReportsMessage.js";

var showReportsTable = async () => {
  var { years } = await getReportsData();

  if (!years.length) {
    return showNoReportsMessage();
  }

  await createYearsDetails(years);

  await openLastDetails(years);
};

showReportsTable();
