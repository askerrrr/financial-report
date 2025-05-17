import createLinkToTheReport from "./createLinkToTheReport.js";

var td = document.createElement("td");

var getReportCreationDate = async (id, date) => {
  td.append(date);

  return td;
};

export default getReportCreationDate;
