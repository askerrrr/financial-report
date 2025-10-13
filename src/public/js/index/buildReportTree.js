import getReportsData from "./services/getReportsData.js";
import openLastDetails from "./services/openLastDetails.js";
import showNoReportsMessage from "./services/showNoReportsMessage.js";
import createReportsTree from "./services/reportTreeBuilder/createReportTree/index.js";

var sendMonthForDeletion = async (userId, monthsForDeletion) => {
  var res = await fetch("/reports/delete-empty-month/", {
    method: "DELETE",
    body: JSON.stringify(monthsForDeletion),
  });

  if (!res.ok) {
    return;
  }
};

var deleteEmptyMonth = async (userId) => {
  var tableBodies = document.querySelectorAll("tbody");

  var year,
    month,
    monthsForDeletion = [];

  for (var tbody of tableBodies) {
    if (tbody.childNodes.length === 0) {
      year = tbody.id.split("_")[2];
      month = tbody.id.split("_")[4];

      monthsForDeletion.push({ year, month });

      document.getElementById(`reports_container_${year}_${month}`).remove();
    }
  }

  await sendMonthForDeletion(userId, monthsForDeletion);
};

var buildReportTree = async () => {
  var { reports, reportTree } = await getReportsData();

  if (!reportTree.length) {
    return showNoReportsMessage();
  }

  var userId = document.cookie.split("=")[1];

  await createReportsTree(reportTree, reports);

  await openLastDetails(reportTree);

  await deleteEmptyMonth(userId);
};

export default buildReportTree;
