import showNoReportsMessage from "./services/showNoReportsMessage.js";
import createReportsTree from "./services/reportTreeBuilder/createReportTree/index.js";
import createReportsTable from "./services/reportTreeBuilder/createReportTree/createReportsTable.js";
import createMonthlyReportDownloadButton from "./services/reportTreeBuilder/createReportTree/createMonthlyReportDownloadButton.js";

var sendMonthForDeletion = async (userId, monthsForDeletion) => {
  var res = await fetch("/report/delete-empty-month/", {
    method: "DELETE",
    body: JSON.stringify(monthsForDeletion),
  });

  if (!res.ok) {
    return;
  }
};

var insertLastReportsToTree = async (tree, lastReports, lastMonthData) => {
  var { year } = tree[0];
  var { month, reportIds } = lastMonthData;

  var table = await createReportsTable(year, month, reportIds, lastReports);

  var summary = document.createElement("summary");
  summary.append(month);

  var monthReportsContainerId = `reports_container_${year}_${month}`;
  var monthReportsContainer = document.createElement("details");
  monthReportsContainer.id = monthReportsContainerId;

  var lastReportIds = lastReports.map(({ reportId }) => reportId);
  var downloadBtn = await createMonthlyReportDownloadButton(lastReportIds, year, month);

  monthReportsContainer.append(summary, table, downloadBtn);
  monthReportsContainer.open = true;

  var monthsContainerId = `months_container_${year}`;
  var monthsContainer = document.getElementById(monthsContainerId);
  monthsContainer.prepend(monthReportsContainer);

  var lastYearDetailsId = year;
  var lastYearDetails = document.getElementById(lastYearDetailsId);
  lastYearDetails.open = true;
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

  //await sendMonthForDeletion(userId, monthsForDeletion);
};

var buildReportTree = async (userId, lastReports, reportTree) => {
  if (!reportTree.length) {
    return showNoReportsMessage();
  }

  var lastMonthData = reportTree[0].months.shift();

  await createReportsTree(reportTree).then(() => insertLastReportsToTree(reportTree, lastReports, lastMonthData));

  await deleteEmptyMonth(userId);
};

export default buildReportTree;
