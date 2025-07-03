import createYearsDetails from "./details/index.js";
import getReportsData from "./services/getReportsData.js";

var showReportsTable = async () => {
  var { years } = await getReportsData();

  await createYearsDetails(years);
};

showReportsTable();
