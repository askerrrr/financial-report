import getReportPeriod from "./services/getReportPeriod.js";
import createLinkToTheReport from "./services/createLinkToTheReport.js";
import getReportCreationDate from "./services/getReportCreationDate.js";

var table = document.getElementById("reports");
var tbody = document.createElement("tbody");
var tr = document.createElement("tr");

var createRowForReports = async (reports) => {
  for (var report of reports) {
  }
};

export default createRowForReports;
