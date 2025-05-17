import createLinkToTheReport from "./createLinkToTheReport.js";

var td = document.createElement("td");

var getReportCreationDate = async (id, date) => {
  var linkToTheReport = await createLinkToTheReport(id, date);

  return td;
};

export default getReportCreationDate;
