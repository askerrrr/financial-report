import getReportsData from "./services/getReportsData.js";
import openLastDetails from "./services/openLastDetails.js";
import showNoReportsMessage from "./services/showNoReportsMessage.js";
import createReportsTree from "./services/reportTreeBuilder/createReportTree/index.js";

var deleteEmptyMonth = async () => {
  var tableBodies = document.querySelectorAll("tbody");

  var year, month;

  for (var tbody of tableBodies) {
    if (tbody.childNodes.length === 0) {
      year = tbody.id.split("_")[2];
      month = tbody.id.split("_")[4];

      document.getElementById(`reports_container_${year}_${month}`).remove();
    }
  }
};

var showReportsTree = async () => {
  var { reports, years } = await getReportsData();

  if (!years.length) {
    return showNoReportsMessage();
  }

  await createReportsTree(years, reports);

  await openLastDetails(years);

  await deleteEmptyMonth();
};

export default showReportsTree;
