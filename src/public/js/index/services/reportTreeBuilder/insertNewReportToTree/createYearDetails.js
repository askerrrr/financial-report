import createMonthDetails from "./createMonthDetails.js";

var createYearDetails = (reportData) => {
  var { year } = reportData;

  var summary = document.createElement("summary");
  summary.append(year);

  var monthDetails = createMonthDetails(reportData);

  var monthsContainerId = `months_container_${year}`;
  var monthsContainer = document.getElementById(monthsContainerId);

  if (!monthsContainer) {
    monthsContainer = document.createElement("div");
    monthsContainer.id = monthsContainerId;
  }

  monthsContainer.append(monthDetails);

  var details = document.createElement("details");
  details.id = year;
  details.append(summary, monthsContainer);

  return details;
};

export default createYearDetails;
