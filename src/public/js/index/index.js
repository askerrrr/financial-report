import createYearsDetails from "./details/index.js";
import getReportsData from "./services/getReportsData.js";
import openLastDetails from "./services/openLastDetails.js";

var showReportsTable = async () => {
  var { years } = await getReportsData();

  await createYearsDetails(years);

  await openLastDetails(years);
};

showReportsTable();
