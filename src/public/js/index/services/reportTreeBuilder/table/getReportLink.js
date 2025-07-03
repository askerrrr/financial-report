import createLinkToTheReport from "./createLinkToTheReport.js";

var getReportLink = async (reportId) => {
  var td = document.createElement("td");

  var linkToTheReport = await createLinkToTheReport(reportId);

  td.append(linkToTheReport);

  return td;
};

export default getReportLink;
