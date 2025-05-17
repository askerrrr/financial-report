import createLinkToTheReport from "./createLinkToTheReport.js";

var getReportCreationDate = async (id, date) => {
  var td = document.createElement("td");

  var linkToTheReport = await createLinkToTheReport(id, date);

  td.append(linkToTheReport);

  return td;
};

export default getReportCreationDate;
